import { ITEMS } from '../data/items';
import { calculatePlayerStats } from './effectEngine';
import { monsters } from '../data/monsters';
import { regions } from '../data/regions';
import { translations } from '../i18n';
import { useGameStore } from '../store/useGameStore';
import { usePlayerStore } from '../store/usePlayerStore';
import type { Item } from '../types/item.types';
import { combatEngine } from './combat';
import { hiddenEventsSystem } from './hiddenEvents';
import { questSystem } from './quests';
import { ELEMENT_REWARD_CHANCE, stampWeaponReward } from '../data/elementRewards';

export type ExploreEventType = 'item' | 'chest' | 'gold' | 'xp' | 'ambush' | 'rare_event' | 'secret_discovery';

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

/**
 * Redução do tempo de exploração: MOUNT_SPEED (91) da montaria +
 * SPEED (30) do equipamento (frações 0-1 resolvidas pelo effectEngine).
 */
const getMountReduction = () => {
  const player = usePlayerStore.getState().data;

  if (!player) {
    return 0;
  }

  const resolved = calculatePlayerStats(player.stats, player.equipment);

  return Math.min(0.85, resolved.mountSpeed + resolved.speed);
};

const getRegionMaterial = (regionId: string) => {
  const region = regions.find((entry) => entry.id === regionId);
  const regionMonsterIds = region?.monsters ?? [];
  const lootItems = monsters
    .filter((monster) => regionMonsterIds.includes(monster.id))
    .flatMap((monster) => monster.lootTable.map((entry) => entry.item));

  return pickRandom(lootItems.length > 0 ? lootItems : ['mat_9000']);
};

/** Baús de exploração sempre entregam arma principal; o elemento é um roll extra. */
const CHEST_WEAPONS_BY_REGION: Record<string, string[]> = {
  nythera: ['w1h_1002', 'w1h_1102', 'w1h_1201'],
  valedouro: ['w1h_1004', 'w2h_1600', 'w2h_1651'],
  ormara: ['w1h_1151', 'w2h_1501', 'w2h_1701'],
  ceupartido: ['w2h_1751', 'w2h_1652', 'w2h_1702'],
  abissal: ['w2h_1502', 'w1h_1103', 'w2h_1752'],
  fragmento: ['w1h_1005', 'w2h_1504', 'w2h_1754'],
};

const getExplorationChestWeapon = (regionId: string) =>
  pickRandom(CHEST_WEAPONS_BY_REGION[regionId] ?? CHEST_WEAPONS_BY_REGION.nythera);

const feedExplorationSystems = (region: string) => {
  questSystem.onExplore(region);
  usePlayerStore.getState().recordDailyEvent('explore');
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

    if (roll < 0.31) {
      const weaponRef = stampWeaponReward(getExplorationChestWeapon(region), ELEMENT_REWARD_CHANCE.chest);
      usePlayerStore.getState().addItem(weaponRef, 1);
      useGameStore.getState().addNotification(`✦ ${t('notifications.itemFound')}`, 'gold');
      return {
        type: 'chest',
        region,
        itemId: weaponRef,
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
      const { leveledUp } = usePlayerStore.getState().gainXp(xp);
      useGameStore.getState().addNotification(`${t('ranking.xp')} +${xp}`, 'info');

      if (leveledUp) {
        useGameStore.getState().addNotification('NÍVEL AUMENTOU!', 'gold');
      }

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
