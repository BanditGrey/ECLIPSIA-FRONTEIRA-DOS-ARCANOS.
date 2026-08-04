import React, { useEffect, useState } from 'react';
import { useAudio } from '../../hooks/useAudio';
import { useI18n } from '../../hooks/useI18n';
import { useCombatStore } from '../../store/useCombatStore';
import { usePlayerStore } from '../../store/usePlayerStore';
import { itemNames } from '../../data/itemNames';
import { getItemByNumId } from '../../utils/itemSerializer';
import { ParticleSystem } from './ParticleSystem';
import { playLevelUp, playHeal } from '../../systems/audio/SFXEngine';
import { Button } from '../ui/Button';
import { ArcaneIcon } from '../ui/ArcaneIcon';

/**
 * TELA CINEMATOGRÁFICA DE RESULTADO — Vitória (A17a) e Derrota/Game Over (A17b).
 * Overlay em tela cheia com fade, estatísticas animadas e partículas.
 */
export const CombatOutcomeScreen: React.FC = () => {
  const { t, lang } = useI18n();
  const audio = useAudio();
  const phase = useCombatStore((state) => state.phase);
  const region = useCombatStore((state) => state.region);
  const turn = useCombatStore((state) => state.turn);
  const floor = useCombatStore((state) => state.floor);
  const maxFloor = useCombatStore((state) => state.maxFloor);
  const isDungeon = useCombatStore((state) => state.isDungeon);
  const enemyName = useCombatStore((state) => state.enemy?.nameKey);
  const resetCombat = useCombatStore((state) => state.resetCombat);
  const playerName = usePlayerStore((state) => state.data?.name);
  const playerLevel = usePlayerStore((state) => state.data?.level);

  const lastLoot = useCombatStore((state) => state.lastLoot);

  const [visible, setVisible] = useState(false);
  const isVictory = phase === 'victory';

  const lootedItems = (lastLoot || []).map((entry) => {
    const item = entry.itemId ? getItemByNumId(Number(entry.itemId)) : undefined;
    const name = item ? itemNames[item.id]?.[lang]?.name ?? item.id : entry.itemId;
    return { ...entry, name, rarity: entry.rarity };
  });

  useEffect(() => {
    if (phase === 'victory' || phase === 'defeat') {
      const id = setTimeout(() => setVisible(true), 40);
      if (phase === 'victory') playLevelUp(); else playHeal();
      return () => clearTimeout(id);
    }
  }, [phase]);

  if (phase !== 'victory' && phase !== 'defeat') return null;

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center overflow-hidden transition-opacity duration-500 ${visible ? 'opacity-100' : 'opacity-0'}`}>
      <div className={`absolute inset-0 ${isVictory
        ? 'bg-gradient-to-b from-night-950 via-[#0a1428] to-night-950'
        : 'bg-gradient-to-b from-[#1a0505] via-night-950 to-black'}`} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(212,175,55,0.15),transparent_60%)]" />
      {isVictory && <ParticleSystem trigger={visible} type="victory" className="absolute inset-0 w-full h-full" />}
      {!isVictory && <ParticleSystem trigger={visible} type="void" className="absolute inset-0 w-full h-full" />}

      <div className="relative z-10 max-w-lg w-full px-6 text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border-2 border-game-gold/60 text-4xl"
          style={{ boxShadow: isVictory ? '0 0 40px rgba(212,175,55,0.5)' : '0 0 40px rgba(255,60,60,0.4)' }}>
          {isVictory ? '🏆' : '☠'}
        </div>

        <h1 className={`font-title text-4xl md:text-6xl font-black tracking-[0.2em] ${isVictory ? 'text-game-gold' : 'text-red-500'} drop-shadow-[0_0_30px_rgba(212,175,55,0.6)]`}>
          {isVictory ? t('combat.outcome.victory') : t('combat.outcome.defeat')}
        </h1>

        <p className="mt-3 font-mono text-sm text-game-muted">
          {playerName} · {t('game.lvl')} {playerLevel}
          {enemyName && <> · {t(enemyName)}</>}
        </p>

        <div className="mt-8 grid grid-cols-3 gap-3">
          {[
            { label: t('combat.outcome.region'), value: region || t('game.unknown') },
            { label: t('combat.outcome.turns'), value: String(turn) },
            { label: isDungeon ? t('combat.floor') : t('combat.outcome.foe'), value: isDungeon ? `${floor}/${maxFloor}` : (isVictory ? '✓' : '✗') }
          ].map((stat) => (
            <div key={stat.label} className="rounded-xl border border-night-600 bg-night-900/70 p-3">
              <div className="font-mono text-[10px] uppercase tracking-wider text-game-faded">{stat.label}</div>
              <div className="mt-1 font-title text-lg font-bold text-game-text">{stat.value}</div>
            </div>
          ))}
        </div>

        {isVictory && lootedItems.length > 0 && (
          <div className="mt-6 rounded-xl border border-game-gold/30 bg-night-900/70 p-3">
            <div className="mb-2 font-mono text-[10px] uppercase tracking-wider text-game-faded">{t('combat.outcome.loot')}</div>
            <div className="flex flex-wrap justify-center gap-2">
              {lootedItems.map((entry, i) => (
                <span key={i} className="chip gap-1 border-game-gold/40 text-game-text">
                  <ArcaneIcon name="chest" size={14} className="text-game-gold" glow />
                  {entry.name} ×{entry.qty}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8 flex justify-center">
          <Button variant={isVictory ? 'primary' : 'danger'} size="lg" onClick={() => { audio.playBgm(); resetCombat(); }}>
            {isVictory ? t('combat.outcome.continue') : t('combat.outcome.retry')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CombatOutcomeScreen;
