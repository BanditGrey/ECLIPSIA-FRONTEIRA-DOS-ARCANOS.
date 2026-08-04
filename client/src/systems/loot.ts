import { itemNames } from '../data/itemNames';
import { ITEMS } from '../data/items';
import { resolveItemRef, getItemByNumId } from '../utils/itemSerializer';
import { buildItemEffect, EFFECT, getEffectPairs, MAX_EFFECTS_PER_ITEM } from '../data/effectRegistry';
import { translations } from '../i18n';
import { useGameStore } from '../store/useGameStore';
import { usePlayerStore } from '../store/usePlayerStore';
import { notifyItemFound } from './notifications';
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
  // Tenta buscar pelo id do catálogo (ex.: "w1h_1005")
  const byId = (ITEMS as Record<string, Item>)[itemId];
  if (byId) return byId;

  // Tenta buscar pelo numId (ex.: "1005")
  const numId = Number(itemId);
  if (!isNaN(numId) && numId > 0) {
    return getItemByNumId(numId);
  }

  return undefined;
};

const getItemRarity = (itemId: string): Rarity => getItem(itemId)?.rarity ?? 'common';

const getItemName = (itemId: string) => {
  const lang = getLang();
  const localized = itemNames[itemId]?.[lang]?.name ?? itemNames[itemId]?.['en-US']?.name;

  return localized ?? itemId;
};

export const getRarityChances = (luck: number): RarityChances => {
  // Sorte: teto 1000. Cada ponto = 0,1% do caminho entre as chances mín. e máx.
  const factor = Math.min(Math.max(luck, 0), 1000) / 1000;

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

/** Multiplicadores de qualidade para os effects dos itens. */
const QUALITY_MULTIPLIERS: Record<string, number> = {
  'divine': 2.0,
  'relic': 1.8,
  'legendary': 1.5,
  'epic': 1.2,
  'rare': 1.1,
  'uncommon': 1.0,
  'common': 0.9
};

/**
 * Calcula o nível de um item com base na raridade:
 * common = 5-15, uncommon = 10-25, rare = 20-40, epic = 40-70,
 * legendary = 70-100, relic = 90-120.
 */
const calculateItemLevel = (rarity: Rarity): number => {
  const ranges: Record<Rarity, [number, number]> = {
    common: [5, 15],
    uncommon: [10, 25],
    rare: [20, 40],
    epic: [40, 70],
    legendary: [70, 100],
    relic: [90, 120]
  };
  const [min, max] = ranges[rarity] ?? [1, 10];
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Calcula o qualityScore de um item com base na soma dos valores
 * dos effects (stats primários 1-11) e no level.
 */
const calculateQualityScore = (itemStr: string, level: number): number => {
  const pairs = itemStr.includes('|') ? itemStr.split('|').slice(1).map((seg) => {
    const [e, v] = seg.split(':');
    return { effectId: Number(e), value: Number(v) };
  }) : [];

  // Soma os stats primários (1-11) e adiciona um bônus pelo level
  const primarySum = pairs
    .filter((p) => p.effectId >= 1 && p.effectId <= 11)
    .reduce((sum, p) => sum + p.value, 0);

  return primarySum + (level * 2);
};

/**
 * Determina a qualidade (tier) de um item com base no score e no level.
 * Chance de "broken" em level baixo (ex.: <20) = 0,1% (extremamente baixa).
 */
const determineQuality = (qualityScore: number, level: number): string => {
  // Se o level é baixo (<20) e o score é muito alto para o level,
  // há uma chance extremamente baixa de "broken" (0,1%)
  if (level < 20 && qualityScore > level * 15 && Math.random() < 0.001) {
    return 'divine';
  }

  // Chance de relic/legendary aumenta com o score, mas ainda é baixa
  // para items de level baixo
  const ratio = qualityScore / Math.max(1, level * 10);

  if (ratio >= 2.5 && Math.random() < 0.05) return 'relic';
  if (ratio >= 2.0 && Math.random() < 0.08) return 'legendary';
  if (ratio >= 1.5 && Math.random() < 0.15) return 'epic';
  if (ratio >= 1.0 && Math.random() < 0.25) return 'rare';
  if (ratio >= 0.5 && Math.random() < 0.4) return 'uncommon';

  return 'common';
};

/**
 * Aplica o balanceamento por level e qualidade a um item:
 * - Calcula o level com base na raridade
 * - Calcula o qualityScore
 * - Determina a qualidade (tier)
 * - Escala os effects: value * (level / 10) * qualityMultiplier
 * - Adiciona uma variação aleatória de ±(5% + qualityTier%)
 * - Serializa como itemStr com a variação aplicada
 */
export const scaleItemByLevelAndQuality = (itemStr: string): string => {
  if (!itemStr.includes('|')) return itemStr;

  const [numIdStr, ...pairStrs] = itemStr.split('|');
  const numId = Number(numIdStr);
  const item = getItem(numIdStr);
  if (!item) return itemStr;

  const rarity = getItemRarity(numIdStr);
  const level = calculateItemLevel(rarity);
  const qualityScore = calculateQualityScore(itemStr, level);
  const quality = determineQuality(qualityScore, level);
  const qualityMult = QUALITY_MULTIPLIERS[quality] ?? 1.0;

  // Variação aleatória: ±(5% + bonus de qualidade)
  const qualityBonusPercent = quality === 'divine' ? 0.2 : quality === 'relic' ? 0.15 : quality === 'legendary' ? 0.1 : quality === 'epic' ? 0.08 : quality === 'rare' ? 0.05 : 0;
  const rollVariation = 1 + (qualityBonusPercent - (Math.random() * qualityBonusPercent * 2));

  const scaledPairs = pairStrs.map((seg) => {
    const [eStr, vStr] = seg.split(':');
    const effectId = Number(eStr);
    const value = Number(vStr);
    const scaledValue = Math.max(1, Math.round(value * (level / 10) * qualityMult * rollVariation));
    return `${eStr}:${scaledValue}`;
  });

  return [numIdStr, ...scaledPairs].join('|');
};

/** Lista de effects que podem aparecer aleatoriamente nos drops (stats de combate). */
const DROP_VARIATION_EFFECTS = [21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40];

/**
 * Adiciona variação aleatória aos effects de um item quando dropado:
 *  - Modifica os valores dos effects existentes em ±15% (arredondado)
 *  - Se há espaço (menos de 10 effects), adiciona 0-1 effect aleatório
 *    de uma lista de stats de combate (21-40) com valor entre 3-15.
 *  - Serializa como itemStr para preservar a variação.
 */
export const addDropVariation = (itemId: string): string => {
  const item = getItem(itemId);
  if (!item) return itemId;

  // Não aplica variação em materiais ou itens especiais
  if (item.type === 'material' || item.type === 'special') return itemId;

  const basePairs = getEffectPairs(item.effects);
  const variedPairs = basePairs.map((pair) => ({
    ...pair,
    value: Math.max(1, Math.round(pair.value * (0.85 + Math.random() * 0.3)))
  }));

  // Adiciona 0-1 effect aleatório se há espaço
  let extraPairs = variedPairs;
  if (variedPairs.length < MAX_EFFECTS_PER_ITEM && Math.random() < 0.35) {
    const randomEffectId = DROP_VARIATION_EFFECTS[Math.floor(Math.random() * DROP_VARIATION_EFFECTS.length)];
    const randomValue = Math.floor(Math.random() * 13) + 3; // 3-15
    extraPairs = [...variedPairs, { effectId: randomEffectId, value: randomValue }];
  }

  const effects = buildItemEffect(extraPairs);
  const serialized = `${item.numId}${extraPairs.map((p) => `|${p.effectId}:${p.value}`).join('')}`;
  return serialized;
};

/** Effects exclusivos (e11) para itens lendários, relics e divine. */
const EXCLUSIVE_EFFECTS = [31, 32, 33, 34, 35, 36, 37, 38, 39, 40];

/**
 * Adiciona o effect exclusivo (e11) a itens de alta qualidade:
 * - legendary, relic, divine recebem e11 com um dos effects 31-40
 * - Valor fixo entre 15 e 25 (+15% a +25% no bônus)
 * - ENTRA DE QUALQUER FORMA (independente de ter 10 effects ou não)
 */
export const addExclusiveEffect = (itemStr: string, quality: string): string => {
  if (!['legendary', 'relic', 'divine'].includes(quality)) return itemStr;

  const numId = itemStr.split('|')[0];
  const item = getItem(numId);

  // Se o item tem um exclusiveEffect definido nos arquivos de dados, usa ele
  if (item && item.exclusiveEffect) {
    return `${itemStr}|${item.exclusiveEffect}:20`;
  }

  // Caso contrário, usa um aleatório entre 31-40
  const randomEffectId = EXCLUSIVE_EFFECTS[Math.floor(Math.random() * EXCLUSIVE_EFFECTS.length)];
  return `${itemStr}|${randomEffectId}:20`;
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
      const scaledStr = scaleItemByLevelAndQuality(addDropVariation(entry.item));
      // Se o item recebeu qualidade alta (legendary, relic, divine),
      // adiciona o effect exclusivo (e11) — apenas se ainda há espaço
      const hasExclusiveEffect = scaledStr.split('|').length < 11 && (rarity === 'legendary' || rarity === 'relic');
      const finalStr = hasExclusiveEffect ? addExclusiveEffect(scaledStr, rarity === 'legendary' ? 'legendary' : rarity === 'relic' ? 'relic' : 'divine') : scaledStr;

      const result = {
        itemId: finalStr,
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


// Notificação de item encontrado (integrado ao sistema de loot)
export const notifyLootItem = (itemName: string, rarity: string): void => {
  if (rarity === 'rare' || rarity === 'epic' || rarity === 'legendary' || rarity === 'relic' || rarity === 'divine') {
    notifyItemFound(itemName, rarity);
  }
};
