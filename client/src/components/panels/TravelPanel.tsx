import { useState } from 'react';
import { useI18n } from '../../hooks/useI18n';
import { useCombatStore } from '../../store/useCombatStore';
import { useGameStore } from '../../store/useGameStore';
import { usePlayerStore } from '../../store/usePlayerStore';
import type { Enemy } from '../../types/combat.types';
import { Button } from '../ui/Button';

type TravelTab = 'regions' | 'dungeons';

type RegionId = 'valedouro' | 'nythera' | 'ormara' | 'abissal' | 'ceupartido' | 'fragmento';

interface RegionEntry {
  id: RegionId;
  icon: string;
  minLevel?: number;
  requiredTitle?: string;
  requiredQuest?: string;
}

const regions: RegionEntry[] = [
  { id: 'valedouro', icon: '🏙', minLevel: 1 },
  { id: 'nythera', icon: '🌲', minLevel: 10 },
  { id: 'ormara', icon: '🏜', minLevel: 20 },
  { id: 'abissal', icon: '🌊', requiredTitle: 'portador' },
  { id: 'ceupartido', icon: '☁', requiredQuest: 'specialQuest' },
  { id: 'fragmento', icon: '💀', requiredTitle: 'eclipse_awakened' }
];

const createEnemyForRegion = (region: RegionEntry): Enemy => ({
  id: `${region.id}-scout`,
  icon: region.icon,
  nameKey: `travel.regions.${region.id}.name`,
  level: region.minLevel ?? 40,
  hp: 100 + (region.minLevel ?? 20) * 10,
  maxHp: 100 + (region.minLevel ?? 20) * 10,
  atk: 10 + (region.minLevel ?? 10),
  def: 5 + Math.floor((region.minLevel ?? 10) / 2),
  xp: 25,
  gold: 10,
  skills: [],
  lootTable: []
});

export const TravelPanel = () => {
  const { t } = useI18n();
  const player = usePlayerStore((state) => state.data);
  const setPanel = useGameStore((state) => state.setPanel);
  const setEnemy = useCombatStore((state) => state.setEnemy);
  const [tab, setTab] = useState<TravelTab>('regions');

  const isUnlocked = (region: RegionEntry) => {
    if (region.id === 'valedouro') {
      return true;
    }

    if (region.minLevel && (player?.level ?? 0) < region.minLevel) {
      return false;
    }

    if (region.requiredTitle && !player?.titles.includes(region.requiredTitle)) {
      return false;
    }

    if (region.requiredQuest && !player?.discoveries.includes(region.requiredQuest)) {
      return false;
    }

    return true;
  };

  const requirementText = (region: RegionEntry) => {
    if (region.minLevel && (player?.level ?? 0) < region.minLevel) {
      return `${t('travel.requireLevel')} ${region.minLevel}`;
    }

    if (region.requiredTitle === 'portador') {
      return t('travel.requirements.portador');
    }

    if (region.requiredTitle === 'eclipse_awakened') {
      return t('travel.requirements.eclipseAwakened');
    }

    if (region.requiredQuest) {
      return t('travel.requirements.specialQuest');
    }

    return t('travel.requireUnknown');
  };

  const enterRegion = (region: RegionEntry) => {
    useCombatStore.setState({
      region: t(`travel.regions.${region.id}.name`),
      floor: 1,
      maxFloor: 1,
      isDungeon: false,
      phase: 'player'
    });
    setEnemy(createEnemyForRegion(region));
    setPanel('combat');
  };

  const enterDungeon = () => {
    const region = regions[1];
    useCombatStore.setState({
      region: t('travel.dungeonInfo.rootCrypt.name'),
      floor: 1,
      maxFloor: 10,
      isDungeon: true,
      phase: 'player'
    });
    setEnemy(createEnemyForRegion(region));
    setPanel('combat');
  };

  return (
    <div className="grid h-full grid-rows-[auto_1fr] gap-3 overflow-hidden bg-game-dark p-3 text-game-text">
      <div className="grid grid-cols-2 gap-2 rounded-xl border border-game-border bg-game-panel p-2 font-mono text-sm">
        <button
          type="button"
          className={[tab === 'regions' ? 'bg-game-gold text-game-dark' : 'text-game-muted hover:bg-game-hover', 'rounded-lg py-2 transition-colors active:scale-95'].join(' ')}
          onClick={() => setTab('regions')}
        >
          {t('travel.tabs.regions')}
        </button>
        <button
          type="button"
          className={[tab === 'dungeons' ? 'bg-game-gold text-game-dark' : 'text-game-muted hover:bg-game-hover', 'rounded-lg py-2 transition-colors active:scale-95'].join(' ')}
          onClick={() => setTab('dungeons')}
        >
          {t('travel.tabs.dungeons')}
        </button>
      </div>

      <section className="min-h-0 overflow-hidden rounded-xl border border-game-border bg-game-panel p-3">
        {tab === 'regions' ? (
          <div className="grid h-full gap-3 overflow-auto pr-1">
            {regions.map((region) => {
              const unlocked = isUnlocked(region);

              return (
                <article key={region.id} className="grid grid-cols-[1fr_auto] gap-3 rounded-xl border border-game-border bg-game-card p-3">
                  <div className="flex min-w-0 gap-3">
                    <span className="text-3xl">{region.icon}</span>
                    <div className="min-w-0">
                      <h2 className="truncate font-title text-lg font-bold text-game-gold">
                        {t(`travel.regions.${region.id}.name`)}
                      </h2>
                      <p className="font-mono text-xs text-game-muted">{t(`travel.regionRanges.${region.id}`)}</p>
                      <p className="mt-1 text-sm text-game-muted">{t(`travel.regions.${region.id}.desc`)}</p>
                    </div>
                  </div>
                  <div className="flex min-w-32 items-center justify-end">
                    {unlocked ? (
                      <Button size="sm" onClick={() => enterRegion(region)}>{t('travel.enter')}</Button>
                    ) : (
                      <span className="rounded-md border border-game-border bg-game-primary px-3 py-2 text-center font-mono text-xs text-game-muted">
                        🔒 {requirementText(region)}
                      </span>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="grid h-full gap-3 overflow-auto pr-1">
            <article className="grid grid-cols-[1fr_auto] gap-3 rounded-xl border border-game-border bg-game-card p-3">
              <div className="flex gap-3">
                <span className="text-3xl">🏚</span>
                <div>
                  <h2 className="font-title text-lg font-bold text-game-gold">{t('travel.dungeonInfo.rootCrypt.name')}</h2>
                  <p className="font-mono text-xs text-game-muted">
                    {t('travel.dungeonInfo.rootCrypt.level')} • {t('travel.dungeonInfo.rootCrypt.floors')} • {t('travel.dungeonInfo.rootCrypt.region')}
                  </p>
                </div>
              </div>
              {(player?.level ?? 0) >= 15 ? (
                <Button size="sm" onClick={enterDungeon}>{t('travel.enter')}</Button>
              ) : (
                <span className="rounded-md border border-game-border bg-game-primary px-3 py-2 text-center font-mono text-xs text-game-muted">
                  🔒 {t('travel.requireLevel')} 15
                </span>
              )}
            </article>
            <article className="grid grid-cols-[1fr_auto] gap-3 rounded-xl border border-game-border bg-game-card p-3 opacity-70">
              <div className="flex gap-3">
                <span className="text-3xl">❓</span>
                <div>
                  <h2 className="font-title text-lg font-bold text-game-gold">{t('travel.dungeonInfo.hidden.name')}</h2>
                  <p className="font-mono text-xs text-game-muted">{t('travel.dungeonInfo.hidden.condition')}</p>
                </div>
              </div>
              <span className="rounded-md border border-game-border bg-game-primary px-3 py-2 text-center font-mono text-xs text-game-muted">
                🔒 {t('travel.requirements.hidden')}
              </span>
            </article>
          </div>
        )}
      </section>
    </div>
  );
};
