import { useEffect, type ReactNode } from 'react';
import { EFFECT } from '../../data/effectRegistry';
import { useI18n } from '../../hooks/useI18n';
import { socketService } from '../../services/socket';
import { calculatePlayerStats, getConditionalValue } from '../../systems/effectEngine';
import { useGameStore } from '../../store/useGameStore';
import { usePartyCombatStore, type PartyHuntSnapshot } from '../../store/usePartyCombatStore';
import { usePlayerStore } from '../../store/usePlayerStore';
import { ART } from '../../data/art';
import { Header } from './Header';
import { Navbar } from './Navbar';
import { CrystalShopModal } from '../panels/shop/CrystalShopModal';

import { AmbientDust } from '../effects/AmbientDust';

import { LevelUpAnimation } from '../effects/LevelUpAnimation';

interface GameLayoutProps {
  children: ReactNode;
}

/**
 * Ponte global da caçada de party: recebe os eventos socket
 * party_combat:*, mantém o usePartyCombatStore e aplica o bônus
 * de trabalho em equipe ao final. Montada uma única vez aqui para
 * funcionar em qualquer painel.
 */
const PartyCombatBridge = () => {
  const { t } = useI18n();
  const addNotification = useGameStore((state) => state.addNotification);

  useEffect(() => {
    const onStarted = (event: Event) => {
      const snapshot = (event as CustomEvent<PartyHuntSnapshot>).detail;

      usePartyCombatStore.getState().startSession(snapshot);
      addNotification(`${t('partyCombat.started')} — ${snapshot.region}`, 'gold');

      // Auto-join com snapshot das auras do membro (effects 79/80)
      const player = usePlayerStore.getState().data;

      if (player) {
        const resolved = calculatePlayerStats(player.stats, player.equipment);
        const auraAtk = Math.round(getConditionalValue(resolved, EFFECT.PARTY_ATK_AURA) * 100);
        const auraDef = Math.round(getConditionalValue(resolved, EFFECT.PARTY_DEF_AURA) * 100);

        socketService.joinPartyHunt(snapshot.partyId, auraAtk, auraDef);
      }
    };

    const onUpdated = (event: Event) => {
      const snapshot = (event as CustomEvent<PartyHuntSnapshot>).detail;

      usePartyCombatStore.getState().updateSession(snapshot);
    };

    const onEnded = (event: Event) => {
      const detail = (event as CustomEvent<PartyHuntSnapshot & { xpBonus?: number; aborted?: boolean }>).detail;

      if (!detail.aborted && (detail.xpBonus ?? 0) > 0) {
        const { leveledUp } = usePlayerStore.getState().gainXp(detail.xpBonus ?? 0);
        addNotification(`${t('partyCombat.ended')} +${detail.xpBonus} XP`, 'gold');

        if (leveledUp) {
          addNotification('NÍVEL AUMENTOU!', 'gold');
        }
      } else {
        addNotification(t('partyCombat.aborted'), 'warning');
      }

      usePartyCombatStore.getState().endSession();
    };

    const onFailed = (event: Event) => {
      const detail = (event as CustomEvent<{ reason?: string }>).detail;

      addNotification(`${t('partyCombat.failed')}: ${t(`partyCombat.reason.${detail?.reason ?? 'already'}`)}`, 'error');
    };

    window.addEventListener('eclipsia:party_combat:started', onStarted);
    window.addEventListener('eclipsia:party_combat:updated', onUpdated);
    window.addEventListener('eclipsia:party_combat:ended', onEnded);
    window.addEventListener('eclipsia:party_combat:failed', onFailed);

    return () => {
      window.removeEventListener('eclipsia:party_combat:started', onStarted);
      window.removeEventListener('eclipsia:party_combat:updated', onUpdated);
      window.removeEventListener('eclipsia:party_combat:ended', onEnded);
      window.removeEventListener('eclipsia:party_combat:failed', onFailed);
    };
  }, [addNotification, t]);

  return null;
};

export const GameLayout = ({ children }: GameLayoutProps) => {
  const panel = useGameStore((state) => state.panel);

  return (
    <div className="bg-eclipsia relative flex h-screen flex-col overflow-hidden text-game-text">
      {/* Atmosfera: arte da cidade ao fundo + véus */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.13]"
        style={{ backgroundImage: `url(${ART.bg.hub})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-night-950/60 via-transparent to-night-950/80" />
      <AmbientDust />

      {/* filetes dourados (moldura do HUD) */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-30 h-[2px] bg-gradient-to-r from-transparent via-gold-400/80 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-[2px] bg-gradient-to-r from-transparent via-gold-400/60 to-transparent" />

      <div className="relative z-10 flex h-full flex-col">
        <PartyCombatBridge />
        <Header />
        {/* Transição cinematográfica entre painéis (A15) */}
        <main className="relative flex-1 overflow-hidden">
          <div key={panel} className="h-full animate-[eclipsiaPanelIn_260ms_ease-out_both]">
            {children}
          </div>
        </main>
        <Navbar />
      </div>
      <LevelUpAnimation />
      <CrystalShopModal />
    </div>
  );
};
