import { useEffect, type ReactNode } from 'react';
import { EFFECT } from '../../data/effectRegistry';
import { useI18n } from '../../hooks/useI18n';
import { socketService } from '../../services/socket';
import { calculatePlayerStats, getConditionalValue } from '../../systems/effectEngine';
import { useGameStore } from '../../store/useGameStore';
import { usePartyCombatStore, type PartyHuntSnapshot } from '../../store/usePartyCombatStore';
import { usePlayerStore } from '../../store/usePlayerStore';
import { Notifications } from '../ui/Notifications';
import { Header } from './Header';
import { Navbar } from './Navbar';

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
        usePlayerStore.getState().gainXp(detail.xpBonus ?? 0);
        addNotification(`${t('partyCombat.ended')} +${detail.xpBonus} XP`, 'gold');
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
  return (
    <div className="flex h-screen flex-col overflow-hidden bg-game-dark text-game-text">
      <PartyCombatBridge />
      <Header />
      <main className="relative flex-1 overflow-hidden">{children}</main>
      <Navbar />
      <Notifications />
    </div>
  );
};
