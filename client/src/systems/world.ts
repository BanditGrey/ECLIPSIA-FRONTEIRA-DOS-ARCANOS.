import { ITEMS } from '../data/items';
import { monsters } from '../data/monsters';
import { regions } from '../data/regions';
import { translations } from '../i18n';
import { useGameStore } from '../store/useGameStore';
import { usePlayerStore } from '../store/usePlayerStore';
import type { Item } from '../types/item.types';
import { combatEngine } from './combat';
import { hiddenEventsSystem } from './hiddenEvents';
import { questSystem } from './quests';

export type ExploreEventType = 'item' | 'gold' | 'xp' | 'ambush' | 'rare_event' | 'secret_discovery';

export interface ExploreResult {
  type: ExploreEventType;
  region: string;
  value?: number;
  itemId?: string;
  explorationTimeMultiplier: number;
}

const getLang = () => {
  if (typeof window === 'undefined') {
    return 'en-US' as const;
  }

  const saved = window.localStorage.getItem('eclipsia_lang');

  return saved === 'pt-BR' || saved === 'en-US' || saved === 'es-ES' || saved === 'ja-JP' ? saved : 'en-US';
};

const t = (path: string) => {
  const read = (dictionary: unknown) =>
    path.split('.').reduce<unknown>((current, key) => {
      if (!current || typeof current === 'string') {
        return undefined;
      }

      return (current as Record<string, unknown>)[key];
    }, dictionary);

  const value = read(translations[getLang()]) ?? read(translations['en-US']);

  return typeof value === 'string' ? value : path;
};

const randomBetween = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const pickRandom = <T>(items: T[]) => items[Math.floor(Math.random() * items.length)];

const addDiscovery = (region: string, amount: number) => {
  usePlayerStore.setState((state) => {
    if (!state.data) {
      return state;
    }

    const discoveries = [...state.data.discoveries];

    for (let index = 0; index < amount; index += 1) {
      discoveries.push(`${region}_${Date.now()}_${index}`);
    }

    return {
      data: {
        ...state.data,
        discoveries
      }
    };
  });
};

const getMountReduction = () => {
  const player = usePlayerStore.getState().data;
  const mountId = player?.equipment.mount;

  if (!mountId) {
    return 0;
  }

  const mount = (ITEMS as Record<string, Item>)[mountId];

  return mount?.mountData?.exploreReduction ?? 0;
};

const getRegionMaterial = (regionId: string) => {
  const region = regions.find((entry) => entry.id === regionId);
  const regionMonsterIds = region?.monsters ?? [];
  const lootItems = monsters
    .filter((monster) => regionMonsterIds.includes(monster.id))
    .flatMap((monster) => monster.lootTable.map((entry) => entry.item));

  return pickRandom(lootItems.length > 0 ? lootItems : ['mat_9000']);
};

const feedExplorationSystems = (region: string) => {
  questSystem.onExplore(region);
  hiddenEventsSystem.recordExplore(region);
};

export const worldSystem = {
  explore(region: string): ExploreResult {
    const roll = Math.random();
    const explorationTimeMultiplier = Math.max(0.5, 1 - getMountReduction());

    feedExplorationSystems(region);

    if (roll < 0.25) {
      const itemId = getRegionMaterial(region);
      usePlayerStore.getState().addItem(itemId, 1);
      useGameStore.getState().addNotification(t('notifications.itemFound'), 'info');
      return {
        type: 'item',
        region,
        itemId,
        explorationTimeMultiplier
      };
    }

    if (roll < 0.45) {
      const gold = randomBetween(20, 120);
      usePlayerStore.getState().gainGold(gold);
      useGameStore.getState().addNotification(`${t('header.gold')} +${gold}`, 'gold');
      return {
        type: 'gold',
        region,
        value: gold,
        explorationTimeMultiplier
      };
    }

    if (roll < 0.6) {
      const xp = randomBetween(30, 180);
      usePlayerStore.getState().gainXp(xp);
      useGameStore.getState().addNotification(`${t('ranking.xp')} +${xp}`, 'info');
      return {
        type: 'xp',
        region,
        value: xp,
        explorationTimeMultiplier
      };
    }

    if (roll < 0.8) {
      combatEngine.start(region);
      useGameStore.getState().setPanel('combat');
      return {
        type: 'ambush',
        region,
        explorationTimeMultiplier
      };
    }

    if (roll < 0.95) {
      addDiscovery(region, 1);
      useGameStore.getState().addNotification(t('notifications.rareEvent'), 'gold');
      return {
        type: 'rare_event',
        region,
        value: 1,
        explorationTimeMultiplier
      };
    }

    addDiscovery(region, 2);
    useGameStore.getState().addNotification(t('notifications.rareEvent'), 'gold');
    return {
      type: 'secret_discovery',
      region,
      value: 2,
      explorationTimeMultiplier
    };
  }
};

export const explore = worldSystem.explore.bind(worldSystem);
