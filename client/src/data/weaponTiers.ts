/**
 * TIERS VISUAIS DE ARMA
 * ---------------------
 * Cada categoria de arma tem variantes de sprite por raridade:
 *   t1 (comum/incomum), t2 (raro/épico), t3 (lendário), relic (rélica).
 *
 * O tier é decidido pela raridade do item; um nível de upgrade alto
 * (effect 99) pode promover o tier visual (a cada +5 níveis).
 *
 * As sprites são geradas por `tools/gen_weapon_tiers.py` a partir da
 * overlay base `ov_<categoria>.png` (ou ov_<categoria>_steel.png).
 */
import type { Rarity } from '../types/item.types';

/** Tier visual canônico. */
export type WeaponTier = 't1' | 't2' | 't3' | 'relic';

/** Raridade → tier visual base. */
export const TIER_BY_RARITY: Record<Rarity, WeaponTier> = {
  common: 't1',
  uncommon: 't1',
  rare: 't2',
  epic: 't2',
  legendary: 't3',
  relic: 'relic',
};

/**
 * Categorias de arma que possuem variantes de tier geradas.
 * (outras caem no overlay elemental/genérico)
 */
export const WEAPON_TIER_CATEGORIES = new Set([
  'sword',
]);

/**
 * Resolve o tier visual de um item.
 * @param rarity   raridade do item
 * @param upgrade  nível de upgrade (0-10), lido do effect 99
 */
export const tierOfItem = (rarity: string, upgrade = 0): WeaponTier => {
  const base = TIER_BY_RARITY[rarity as Rarity] ?? 't1';
  if (base === 'relic') return 'relic';
  // A cada 5 níveis de upgrade, sobe um tier visual (até t3)
  if (upgrade >= 10) return 't3';
  if (upgrade >= 5 && base === 't1') return 't2';
  if (upgrade >= 5 && base === 't2') return 't3';
  return base;
};

/**
 * Converte a categoria de arma do item para a chave de overlay de tier.
 * Ex.: 'sword_one' -> 'sword'.
 */
export const weaponCategoryKey = (weaponCategory: string | undefined): string | null => {
  if (!weaponCategory) return null;
  // normaliza: sword_one -> sword, great_sword -> greatsword etc.
  const map: Record<string, string> = {
    sword_one: 'sword',
    sword_two: 'sword',
    great_sword: 'greatsword',
    dagger: 'dagger',
    dagger_off: 'dagger',
    bow_short: 'bowshort',
    bow_long: 'bowlong',
    staff_one: 'staff',
    staff_two: 'greatstaff',
    hammer: 'hammer',
    spear: 'spear',
    orb: 'orb',
    tome: 'tome',
  };
  return map[weaponCategory] ?? null;
};
