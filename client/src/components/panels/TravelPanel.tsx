import { useState } from 'react';
import { bosses } from '../../data/bosses';
import { dungeons } from '../../data/dungeons';
import type { DungeonDef } from '../../data/dungeons';
import { ITEMS } from '../../data/items';
import { useI18n } from '../../hooks/useI18n';
import { useCombatStore } from '../../store/useCombatStore';
import { useGameStore } from '../../store/useGameStore';
import { usePlayerStore } from '../../store/usePlayerStore';
import { combatEngine } from '../../systems/combat';
import type { Enemy } from '../../types/combat.types';
import type { Item } from '../../types/item.types';
import { Button } from '../ui/Button';
import { ART } from '../../data/art';

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

  const isDungeonUnlocked = (dungeon: DungeonDef) => {
    if ((player?.level ?? 0) < dungeon.requireLevel) {
      return false;
    }

    if (dungeon.requireTitle && !player?.titles.includes(dungeon.requireTitle)) {
      return false;
    }

    return true;
  };

  const enterDungeonDef = (dungeon: DungeonDef) => {
    combatEngine.start(dungeon.regionId, {
      dungeon: true,
      dungeonId: dungeon.id,
      maxFloor: dungeon.floors,
      floor: 1
    });
    setPanel('combat');
  };

  return (
    <div className="grid h-full grid-rows-[auto_1fr] gap-3 overflow-hidden bg-game-dark p-3 text-game-text">
      <div className="grid grid-cols-2 gap-2 rounded-xl border border-night-600 bg-night-900/80 p-1.5 font-mono text-sm shadow-panel">
        <button
          type="button"
          className={[tab === 'regions' ? 'btn-gold' : 'text-game-muted hover:bg-night-800/70 hover:text-game-text', 'rounded-lg py-2 transition-all active:scale-95'].join(' ')}
          onClick={() => setTab('regions')}
        >
          {t('travel.tabs.regions')}
        </button>
        <button
          type="button"
          className={[tab === 'dungeons' ? 'btn-gold' : 'text-game-muted hover:bg-night-800/70 hover:text-game-text', 'rounded-lg py-2 transition-all active:scale-95'].join(' ')}
          onClick={() => setTab('dungeons')}
        >
          {t('travel.tabs.dungeons')}
        </button>
      </div>

      <section className="min-h-0 overflow-hidden rounded-xl border border-night-600 bg-night-900/60 p-3 shadow-panel">
        {tab === 'regions' ? (
          <div className="grid h-full gap-3 overflow-auto pr-1">
            {regions.map((region) => {
              const unlocked = isUnlocked(region);

              return (
                <article
                  key={region.id}
                  className={[
                    'grid grid-cols-[1fr_auto] items-center gap-4 overflow-hidden rounded-xl border bg-gradient-to-r from-night-700/70 to-night-900/80 p-3 transition-all',
                    unlocked
                      ? 'border-night-600 hover:border-gold-600/60 hover:shadow-glow-sm'
                      : 'border-night-700 opacity-80'
                  ].join(' ')}
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="relative h-14 w-24 shrink-0 overflow-hidden rounded-lg border border-night-600">
                      <img
                        src={ART.regions[region.id]}
                        alt=""
                        className={`h-full w-full object-cover ${unlocked ? '' : 'grayscale'}`}
                        loading="lazy"
                        draggable={false}
                      />
                      <span className="absolute inset-0 bg-gradient-to-t from-night-950/70 to-transparent" />
                    </div>
                    <div className="min-w-0">
                      <h2 className="title-gold truncate font-title text-lg font-bold">
                        {t(`travel.regions.${region.id}.name`)}
                      </h2>
                      <p className="font-mono text-xs text-game-muted">{t(`travel.regionRanges.${region.id}`)}</p>
                      <p className="mt-1 truncate text-sm italic text-game-muted">{t(`travel.regions.${region.id}.desc`)}</p>
                    </div>
                  </div>
                  <div className="flex min-w-32 items-center justify-end">
                    {unlocked ? (
                      <Button size="sm" onClick={() => enterRegion(region)}>{t('travel.enter')}</Button>
                    ) : (
                      <span className="rounded-md border border-night-600 bg-night-900/90 px-3 py-2 text-center font-mono text-xs text-game-muted">
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
            {dungeons.map((dungeon) => {
              const boss = bosses.find((entry) => entry.id === dungeon.bossId);
              const regionEntry = regions.find((entry) => entry.id === dungeon.regionId);
              const unlocked = isDungeonUnlocked(dungeon);
              const rewardItems = dungeon.rewardItems
                .map((itemId) => (ITEMS as Record<string, Item>)[itemId])
                .filter(Boolean);

              return (
                <article key={dungeon.id} className="grid grid-cols-[1fr_auto] gap-3 rounded-xl border border-game-border bg-game-card p-3">
                  <div className="flex min-w-0 gap-3">
                    <span className="text-3xl">{boss?.icon ?? '🏚'}</span>
                    <div className="min-w-0">
                      <h2 className="truncate font-title text-lg font-bold text-game-gold">
                        {t(`travel.dungeons.${dungeon.id}.name`)}
                      </h2>
                      <p className="font-mono text-xs text-game-muted">
                        {regionEntry?.icon} {t(`travel.regions.${dungeon.regionId}.name`)} · {dungeon.floors} {t('travel.dungeonFloors')} ·{' '}
                        {t('travel.dungeonBoss')}: {boss ? t(boss.nameKey) : '?'}
                      </p>
                      <p className="mt-1 text-sm text-game-muted">{t(`travel.dungeons.${dungeon.id}.desc`)}</p>
                      <p className="mt-1 font-mono text-xs text-game-gold">
                        {t('travel.dungeonReward')}: {dungeon.rewardGold} 🪙{rewardItems.map((item) => ` · ${item.icon} ${t(item.nameKey)}`).join('')}
                      </p>
                    </div>
                  </div>
                  {unlocked ? (
                    <Button size="sm" onClick={() => enterDungeonDef(dungeon)}>{t('travel.enter')}</Button>
                  ) : (
                    <span className="rounded-md border border-game-border bg-game-primary px-3 py-2 text-center font-mono text-xs text-game-muted">
                      🔒 {t('travel.requireLevel')} {dungeon.requireLevel}
                      {dungeon.requireTitle ? ` + ${t('titles.' + dungeon.requireTitle)}` : ''}
                    </span>
                  )}
                </article>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};
