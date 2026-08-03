import { itemNames } from '../data/itemNames';
import { ITEMS } from '../data/items';
import { translations } from '../i18n';
import { useGameStore } from '../store/useGameStore';
import { usePlayerStore } from '../store/usePlayerStore';
import type { Enemy, LootEntry } from '../types/combat.types';
import type { Item, Rarity } from '../types/item.types';

export type LootFilter = 'all' | 'uncommon' | 'rare' | 'epic' | Rarity;

export interface LootResult {
  itemId: string;
  qty: number;
  rarity: Rarity;
}

export type RarityChances = Record<Rarity, number>;

const minChances: RarityChances = {
  common: 0.6,
  uncommon: 0.25,
  rare: 0.1,
  epic: 0.04,
  legendary: 0.009,
  relic: 0.001
};

const maxChances: RarityChances = {
  common: 0.27,
  uncommon: 0.26,
  rare: 0.23,
  epic: 0.17,
  legendary: 0.06,
  relic: 0.01
};

const rarityOrder: Rarity[] = ['common', 'uncommon', 'rare', 'epic', 'legendary', 'relic'];

const getLang = () => {
  if (typeof window === 'undefined') {
    return 'en-US' as const;
  }

  const saved = window.localStorage.getItem('eclipsia_lang');

  return saved === 'pt-BR' || saved === 'en-US' || saved === 'es-ES' || saved === 'ja-JP' ? saved : 'en-US';
};

const t = (path: string) => {
  const lang = getLang();
  const read = (dictionary: unknown) =>
    path.split('.').reduce<unknown>((value, key) => {
      if (!value || typeof value === 'string') {
        return undefined;
      }

      return (value as Record<string, unknown>)[key];
    }, dictionary);

  const value = read(translations[lang]) ?? read(translations['en-US']);

  return typeof value === 'string' ? value : path;
};

const getItem = (itemId: string): Item | undefined => {
  return (ITEMS as Record<string, Item>)[itemId];
};

const getItemRarity = (itemId: string): Rarity => getItem(itemId)?.rarity ?? 'common';

const getItemName = (itemId: string) => {
  const lang = getLang();
  const localized = itemNames[itemId]?.[lang]?.name ?? itemNames[itemId]?.['en-US']?.name;

  return localized ?? itemId;
};

export const getRarityChances = (luck: number): RarityChances => {
  const factor = Math.min(Math.max(luck, 0), 200) / 200;

  return rarityOrder.reduce<RarityChances>((chances, rarity) => {
    chances[rarity] = minChances[rarity] + (maxChances[rarity] - minChances[rarity]) * factor;
    return chances;
  }, {} as RarityChances);
};

export const passesFilter = (rarity: Rarity, filter: LootFilter | string | string[]) => {
  const normalized = Array.isArray(filter) ? filter[0] ?? 'all' : filter;

  if (!normalized || normalized === 'all' || normalized === 'lootAll') {
    return true;
  }

  const minimum = normalized === 'lootUncommon'
    ? 'uncommon'
    : normalized === 'lootRare'
      ? 'rare'
      : normalized === 'lootEpic'
        ? 'epic'
        : normalized;

  return rarityOrder.indexOf(rarity) >= rarityOrder.indexOf(minimum as Rarity);
};

const rollQty = (entry: LootEntry) => {
  const min = Math.max(1, entry.qty.min);
  const max = Math.max(min, entry.qty.max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const rarityLuckMultiplier = (rarity: Rarity, chances: RarityChances) => {
  const base = minChances[rarity];

  return base <= 0 ? 1 : chances[rarity] / base;
};

export const rollLoot = (enemy: Pick<Enemy, 'lootTable'>, playerLuck: number, filter: LootFilter | string | string[] = 'all'): LootResult[] => {
  const chances = getRarityChances(playerLuck);
  const results: LootResult[] = [];

  enemy.lootTable.forEach((entry) => {
    const rarity = getItemRarity(entry.item);
    const chance = Math.min(1, entry.chance * rarityLuckMultiplier(rarity, chances));

    if (Math.random() <= chance && passesFilter(rarity, filter)) {
      const result = {
        itemId: entry.item,
        qty: rollQty(entry),
        rarity
      };

      results.push(result);

      if (rarityOrder.indexOf(rarity) >= rarityOrder.indexOf('epic')) {
        useGameStore.getState().addNotification(`${t('notifications.itemFound')}: ${getItemName(entry.item)}`, 'gold');
      }

      if (rarityOrder.indexOf(rarity) >= rarityOrder.indexOf('rare')) {
        usePlayerStore.setState((state) => ({
          data: state.data
            ? {
                ...state.data,
                rareDrops: state.data.rareDrops + 1
              }
            : state.data
        }));
      }
    }
  });

  return results;
};
