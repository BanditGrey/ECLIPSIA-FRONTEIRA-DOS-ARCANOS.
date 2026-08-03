import { useState } from 'react';
import { useI18n } from '../../hooks/useI18n';
import { usePlayerStore } from '../../store/usePlayerStore';
import type { Stats } from '../../types/player.types';
import { Button } from '../ui/Button';
import { ProgressBar } from '../ui/ProgressBar';

type ProfileTab = 'status' | 'skills' | 'titles';

const statKeys: Array<keyof Stats> = ['strength', 'agility', 'vitality', 'arcana', 'perception', 'will'];
const proficiencyKeys = ['blade', 'arcane', 'druid', 'vanguard', 'ranger', 'spectre'] as const;
const lockedSlots = Array.from({ length: 6 }, (_, index) => index);

export const ProfilePanel = () => {
  const { t } = useI18n();
  const [tab, setTab] = useState<ProfileTab>('status');
  const player = usePlayerStore((state) => state.data);
  const addStat = usePlayerStore((state) => state.addStat);
  const getLuck = usePlayerStore((state) => state.getLuck);

  const equipTitle = (title: string) => {
    usePlayerStore.setState((state) => ({
      data: state.data ? { ...state.data, activeTitle: title } : state.data
    }));
  };

  if (!player) {
    return (
      <div className="flex h-full items-center justify-center overflow-hidden bg-game-dark text-game-muted">
        {t('game.unknown')}
      </div>
    );
  }

  return (
    <div className="grid h-full grid-rows-[auto_1fr] gap-3 overflow-hidden bg-game-dark p-3 text-game-text">
      <div className="grid grid-cols-3 gap-2 rounded-xl border border-game-border bg-game-panel p-2 font-mono text-sm">
        {(['status', 'skills', 'titles'] as ProfileTab[]).map((item) => (
          <button
            key={item}
            type="button"
            className={[tab === item ? 'bg-game-gold text-game-dark' : 'text-game-muted hover:bg-game-hover', 'rounded-lg py-2 transition-colors active:scale-95'].join(' ')}
            onClick={() => setTab(item)}
          >
            {t(`profile.tabs.${item}`)}
          </button>
        ))}
      </div>

      <section className="min-h-0 overflow-hidden rounded-xl border border-game-border bg-game-panel p-3">
        {tab === 'status' && (
          <div className="grid h-full gap-3 overflow-auto pr-1">
            <header className="rounded-xl border border-game-border bg-game-card p-3">
              <h1 className="font-title text-2xl font-bold text-game-gold">{player.name}</h1>
              <p className="font-mono text-sm text-game-muted">
                {t('game.level')} {player.level} • {player.activeTitle ?? t('panels.none')}
              </p>
              <ProgressBar className="mt-3" current={player.xp} max={player.xpToNext} type="xp" showText />
            </header>

            <div className="grid gap-2">
              {statKeys.map((stat) => {
                const value = player.stats[stat];

                return (
                  <div key={stat} className="grid grid-cols-[120px_1fr_auto] items-center gap-3 rounded-lg border border-game-border bg-game-card p-2">
                    <span>{t(`profile.stats.${stat}`)}</span>
                    <ProgressBar current={value} max={100} type="quest" showText />
                    <Button size="sm" disabled={player.freePoints <= 0} onClick={() => addStat(stat)}>
                      +
                    </Button>
                  </div>
                );
              })}
            </div>

            <div className="rounded-xl border border-game-border bg-game-card p-3">
              <div className="mb-2 flex items-center justify-between">
                <strong className="text-game-gold">{t('profile.stats.luck')}</strong>
                <span className="font-mono text-sm">{getLuck()}/200</span>
              </div>
              <ProgressBar current={getLuck()} max={200} type="luck" showText />
              <p className="mt-2 font-mono text-sm text-game-muted">
                {t('profile.freePoints')}: {player.freePoints}
              </p>
            </div>

            <div className="rounded-xl border border-game-border bg-game-card p-3">
              <h2 className="mb-2 font-title text-lg text-game-gold">{t('profile.proficiencies')}</h2>
              <div className="grid grid-cols-2 gap-2">
                {proficiencyKeys.map((key) => (
                  <div key={key} className="rounded border border-game-border bg-game-primary p-2">
                    <div className="mb-1 flex justify-between text-sm">
                      <span>{t(`charCreate.archetypes.${key}.name`)}</span>
                      <span className="font-mono">{player.proficiencies[key]}</span>
                    </div>
                    <ProgressBar current={player.proficiencies[key]} max={100} type="xp" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === 'skills' && (
          <div className="grid h-full gap-3 overflow-auto pr-1">
            {player.skills.length === 0 && <p className="text-game-muted">{t('combat.noSkills')}</p>}
            {player.skills.map((skillId) => (
              <article key={skillId} className="rounded-xl border border-game-border bg-game-card p-3">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="font-title text-lg text-game-gold">🔮 {t(`skills.${skillId}.name`)}</h2>
                  <span className="font-mono text-xs text-game-muted">
                    {t('profile.skillInfo.mp')}: 10 • {t('profile.skillInfo.cd')}: {player.skillCooldowns[skillId] ?? 0}
                  </span>
                </div>
                <p className="mt-1 text-sm text-game-muted">{t(`skills.${skillId}.desc`)}</p>
              </article>
            ))}
          </div>
        )}

        {tab === 'titles' && (
          <div className="grid h-full gap-3 overflow-auto pr-1">
            {player.titles.map((title) => (
              <article key={title} className="flex items-center justify-between gap-3 rounded-xl border border-game-border bg-game-card p-3">
                <div>
                  <h2 className="font-title text-lg text-game-gold">{t(`profile.titleNames.${title}`)}</h2>
                  {player.activeTitle === title && <p className="font-mono text-xs text-game-muted">{t('profile.titles.equipped')}</p>}
                </div>
                <Button size="sm" disabled={player.activeTitle === title} onClick={() => equipTitle(title)}>
                  {t('profile.titles.equip')}
                </Button>
              </article>
            ))}
            {lockedSlots.map((slot) => (
              <article key={slot} className="rounded-xl border border-dashed border-game-border bg-game-card p-3 opacity-60">
                <h2 className="font-title text-lg text-game-muted">{t('game.unknown')}</h2>
                <p className="font-mono text-xs text-game-faded">{t('profile.titles.locked')}</p>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
