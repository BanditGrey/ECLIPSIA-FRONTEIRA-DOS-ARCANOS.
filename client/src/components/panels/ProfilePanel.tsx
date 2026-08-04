import { useState } from 'react';
import { useI18n } from '../../hooks/useI18n';
import { usePlayerStore } from '../../store/usePlayerStore';
import type { Stats } from '../../types/player.types';
import { Button } from '../ui/Button';
import { ProgressBar } from '../ui/ProgressBar';
import { Portrait } from '../ui/Portrait';
import { PROFICIENCIES, PROFICIENCY_ICONS } from '../../data/proficiencies';
import { skills } from '../../data/skills';
import { getComboKey } from '../../data/weaponCombos';
import { resolveItemRef } from '../../utils/itemSerializer';
import { PassivePanel } from './PassivePanel';

type ProfileTab = 'status' | 'skills' | 'titles' | 'passives';

const statKeys: Array<keyof Stats> = ['strength', 'agility', 'vitality', 'arcana', 'perception', 'will'];
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

  const mainCategory = player?.equipment?.weapon_main ? resolveItemRef(player.equipment.weapon_main)?.weaponCategory : undefined;
  const offCategory = player?.equipment?.weapon_off ? resolveItemRef(player.equipment.weapon_off)?.weaponCategory : undefined;
  const equipped = new Set([mainCategory, offCategory].filter(Boolean));
  const usableSkillIds = usePlayerStore.getState().getUsableSkillIds();

  if (!player) {
    return (
      <div className="flex h-full items-center justify-center overflow-hidden bg-game-dark text-game-muted">
        {t('game.unknown')}
      </div>
    );
  }

  return (
    <div className="grid h-full grid-rows-[auto_1fr] gap-3 overflow-hidden bg-game-dark p-3 text-game-text">
      <div className="grid grid-cols-4 gap-2 rounded-xl border border-night-600 bg-night-900/80 p-1.5 font-mono text-sm shadow-panel">
        {(['status', 'skills', 'passives', 'titles'] as ProfileTab[]).map((item) => (
          <button
            key={item}
            type="button"
            className={[tab === item ? 'btn-gold' : 'text-game-muted hover:bg-night-800/70 hover:text-game-text', 'rounded-lg py-2 transition-all active:scale-95'].join(' ')}
            onClick={() => setTab(item)}
          >
            {t(`profile.tabs.${item}`)}
          </button>
        ))}
      </div>

      <section className="min-h-0 overflow-hidden rounded-xl border border-night-600 bg-night-900/60 p-3 shadow-panel">
        {tab === 'status' && (
          <div className="grid h-full gap-3 overflow-auto pr-1">
            <header className="relative overflow-hidden rounded-xl border border-night-600 bg-gradient-to-r from-night-700/70 to-night-900/80 p-3">
              <div className="flex items-center gap-4">
                <Portrait kind="class" id={player.archetype} size={84} fallbackIcon="⚔" />
                <div className="min-w-0 flex-1">
                  <h1 className="title-gold text-glow truncate font-title text-2xl font-black">{player.name}</h1>
                  <p className="font-mono text-sm text-game-muted">
                    {t('game.level')} {player.level} • {player.activeTitle ?? t('panels.none')}
                  </p>
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    {mainCategory && (
                      <span className="chip text-arcane-300">
                        <span className="text-xs">{PROFICIENCY_ICONS[mainCategory]}</span>
                        {t(`proficiencies.${mainCategory}.name`)}
                      </span>
                    )}
                    {offCategory && offCategory !== mainCategory && (
                      <>
                        <span className="text-game-faded">+</span>
                        <span className="chip text-gold-300">
                          <span className="text-xs">{PROFICIENCY_ICONS[offCategory]}</span>
                          {t(`proficiencies.${offCategory}.name`)}
                        </span>
                      </>
                    )}
                    <span className="title-gold font-title text-base font-bold">— {t(`combos.${getComboKey(mainCategory, offCategory)}.name`)}</span>
                  </div>
                  <ProgressBar className="mt-3" current={player.xp} max={player.xpToNext} type="xp" showText />
                </div>
              </div>
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

            <div className="rounded-xl border border-night-600 bg-gradient-to-b from-night-700/50 to-night-900/70 p-3">
              <div className="mb-2 flex items-center justify-between">
                <strong className="text-game-gold">{t('profile.stats.luck')}</strong>
                <span className="font-mono text-sm">{getLuck()}/1000</span>
              </div>
              <ProgressBar current={getLuck()} max={1000} type="luck" showText />
              <p className="mt-2 font-mono text-xs text-game-muted">
                {t('profile.luckHint')} · {t('profile.freePoints')}: {player.freePoints}
              </p>
            </div>

            <div className="rounded-xl border border-night-600 bg-gradient-to-b from-night-700/50 to-night-900/70 p-3">
              <h2 className="mb-1 font-title text-lg text-game-gold">{t('profile.proficiencies')}</h2>
              <p className="mb-3 font-mono text-xs text-game-muted">{t('profile.proficiencyHint')}</p>
              <div className="grid grid-cols-2 gap-2">
                {PROFICIENCIES.map((category) => {
                  const points = player.proficiencies[category] ?? 0;
                  const isEquipped = equipped.has(category);
                  const nextSkill = skills
                    .filter((skill) => skill.proficiency === category && skill.requireProficiency > points)
                    .sort((a, b) => a.requireProficiency - b.requireProficiency)[0];

                  return (
                    <div
                      key={category}
                      className={[
                        'rounded-lg border p-2',
                        isEquipped ? 'border-gold-500/60 bg-night-800/80 shadow-glow-sm' : 'border-night-600 bg-night-900/60'
                      ].join(' ')}
                    >
                      <div className="mb-1 flex items-center justify-between gap-2 text-sm">
                        <span className="flex min-w-0 items-center gap-1.5 truncate">
                          <span className="text-xs">{PROFICIENCY_ICONS[category]}</span>
                          <span className="truncate">{t(`proficiencies.${category}.name`)}</span>
                          {isEquipped && <span className="chip !px-1.5 !py-0 text-[9px] text-arcane-300">✓</span>}
                        </span>
                        <span className="shrink-0 font-mono text-xs text-game-muted">{points}</span>
                      </div>
                      <ProgressBar current={points} max={100} type="xp" />
                      {nextSkill && (
                        <p className="mt-1 font-mono text-[10px] text-game-faded">
                          {t('profile.nextSkill')}: {t(`skills.${nextSkill.id}.name`)} ({nextSkill.requireProficiency})
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {tab === 'skills' && (
          <div className="grid h-full gap-3 overflow-auto pr-1">
            {usableSkillIds.length === 0 && <p className="text-game-muted">{t('combat.noSkills')}</p>}
            {usableSkillIds.map((skillId) => {
              const skill = skills.find((entry) => entry.id === skillId);

              return (
                <article key={skillId} className="rounded-xl border border-night-600 bg-gradient-to-b from-night-700/50 to-night-900/70 p-3">
                  <div className="flex items-center justify-between gap-3">
                    <h2 className="font-title text-lg text-game-gold">
                      {skill?.icon ?? '🔮'} {t(`skills.${skillId}.name`)}
                    </h2>
                    <span className="font-mono text-xs text-game-muted">
                      {t('profile.skillInfo.mp')}: {skill?.mp ?? 10} • {t('profile.skillInfo.cd')}: {skill?.cd ?? 0}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-game-muted">{t(`skills.${skillId}.desc`)}</p>
                  {skill && (
                    <p className="mt-2 font-mono text-[10px] text-game-faded">
                      {PROFICIENCY_ICONS[skill.proficiency]} {t(`proficiencies.${skill.proficiency}.name`)}
                    </p>
                  )}
                </article>
              );
            })}
          </div>
        )}

        {tab === 'passives' && (
          <div className="h-full overflow-auto pr-1">
            <PassivePanel />
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
