import { useMemo } from 'react';
import { bosses } from '../../data/bosses';
import { checkBossAccess } from '../../systems/bossRoom';
import { combatEngine } from '../../systems/combat';
import { useI18n } from '../../hooks/useI18n';
import { usePlayerStore } from '../../store/usePlayerStore';
import { useGameStore } from '../../store/useGameStore';
import { Button } from '../ui/Button';
import { Portrait } from '../ui/Portrait';
import { ArcaneIcon } from '../ui/ArcaneIcon';

/**
 * SALA DE BOSS — lista os colossos do jogo com retratos, nível de acesso
 * (a cada 20 níveis), drop bônus lendário e entrada no combate via
 * combatEngine.start({ bossId }).
 */
export const BossPanel = () => {
  const { t } = useI18n();
  const player = usePlayerStore((state) => state.data);
  const setPanel = useGameStore((state) => state.setPanel);
  const access = checkBossAccess(player?.level ?? 0);

  const challengable = useMemo(() => bosses.filter((b) => b.colossus), []);

  const enterBoss = (bossId: string, region: string) => {
    combatEngine.start(region, { bossId });
    setPanel('combat');
  };

  if (!player) {
    return (
      <div className="flex h-full items-center justify-center overflow-hidden bg-game-dark text-game-muted">
        {t('game.unknown')}
      </div>
    );
  }

  return (
    <div className="grid h-full grid-rows-[auto_auto_1fr] gap-3 overflow-hidden bg-game-dark p-3 text-game-text">
      <header className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-night-600 bg-night-900/70 px-4 py-3 shadow-panel">
        <h2 className="font-title text-2xl font-black text-game-gold">Sala de Boss</h2>
        <div className="flex items-center gap-2 font-mono text-sm">
          <span className="chip">{t('game.lvl')} {player.level}</span>
          <span className="chip text-game-muted">
            Próximo acesso: <span className="font-bold text-game-gold">{access.levelRequirement}</span>
          </span>
        </div>
      </header>

      <div className="rounded-xl border border-game-gold/25 bg-gradient-to-r from-night-800/50 to-night-900/50 px-4 py-2 font-mono text-xs text-game-muted">
        <ArcaneIcon name="star" size={14} className="mr-1 text-game-gold" />
        Acesso a cada 20 níveis · drop lendário/acima <span className="text-game-gold">+{Math.round(access.dropBonus * 100)}%</span> · recarga 10 min após cada boss
      </div>

      <section className="grid min-h-0 grid-cols-1 gap-3 overflow-auto pr-1 sm:grid-cols-2 lg:grid-cols-3">
        {challengable.map((boss) => {
          const tier = Math.floor(boss.level / 20) * 20;
          const unlocked = player.level >= boss.level;

          return (
            <article
              key={boss.id}
              className={[
                'flex flex-col gap-3 overflow-hidden rounded-2xl border bg-gradient-to-b from-night-800/60 to-night-950/80 p-4 transition-all',
                unlocked ? 'border-night-600 hover:border-gold-600/60 hover:shadow-glow-sm' : 'border-night-800 opacity-80'
              ].join(' ')}
            >
              <div className="flex items-center gap-3">
                <Portrait kind="boss" id={boss.id} size={72} fallbackIcon={boss.icon} ring={unlocked ? 'gold' : 'gold'} dim={!unlocked} />
                <div className="min-w-0">
                  <h3 className="title-gold truncate font-title text-lg font-bold">{t(boss.nameKey)}</h3>
                  <p className="font-mono text-xs text-game-muted">
                    {t('game.lvl')} {boss.level} · {boss.race}
                  </p>
                  <p className="font-mono text-xs text-game-muted">
                    Nv. mínimo <span className="font-bold text-game-gold">{tier}</span>
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 font-mono text-xs">
                <div className="rounded-lg border border-night-700 bg-night-900/50 p-2 text-center">
                  <div className="text-game-faded">HP</div>
                  <div className="font-bold text-game-text">{boss.hp.toLocaleString()}</div>
                </div>
                <div className="rounded-lg border border-night-700 bg-night-900/50 p-2 text-center">
                  <div className="text-game-faded">ATK</div>
                  <div className="font-bold text-game-text">{boss.atk}</div>
                </div>
                <div className="rounded-lg border border-night-700 bg-night-900/50 p-2 text-center">
                  <div className="text-game-faded">XP</div>
                  <div className="font-bold text-game-gold">+{boss.xp.toLocaleString()}</div>
                </div>
              </div>

              <div className="mt-auto">
                <Button
                  variant={unlocked ? 'danger' : 'secondary'}
                  fullWidth
                  disabled={!unlocked || !access.available}
                  onClick={() => enterBoss(boss.id, t('bossRoom.arena'))}
                >
                  <ArcaneIcon name="sword" size={16} />
                  {unlocked ? t('bossRoom.fight') : t('bossRoom.lockedLevel')}
                </Button>
                {unlocked && !access.available && (
                  <p className="mt-1 text-center font-mono text-[11px] text-game-muted">
                    {t('bossRoom.cooldown')}: {Math.ceil(access.cooldownRemaining / 60)}min
                  </p>
                )}
              </div>
            </article>
          );
        })}
      </section>
    </div>
  );
};

export default BossPanel;
