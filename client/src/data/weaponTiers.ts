/**
 * TIERS VISUAIS DE ARMA
 * ---------------------
 * O sistema de evolução (tiers com efeitos chamativos) vai até o lendário:
 *   t1 (comum/incomum), t2 (raro/épico), t3 (lendário).
 *
 * Acima disso, RELÍQUIA usa um SPRINT GENÉRICO, sem muito chamar atenção
 * (sem aura arco-íris nem runas piscando) — visual limpo e sóbrio.
 *
 * O tier é decidido pela raridade do item; um nível de upgrade alto
 * (effect 99) pode promover o tier visual (a cada +5 níveis, até t3).
 *
 * As sprites de t1/t2/t3 são geradas por `tools/gen_weapon_tiers.py`.
 * A sprite de sprint (`ov_<cat>_sprint.png`) é uma variante limpa,
 * derivada da base com leve brilho.
 */
import type { Rarity } from '../types/item.types';

/** Tier visual canônico. */
export type WeaponTier = 't1' | 't2' | 't3' | 'sprint';

/** Raridade → tier visual base. */
export const TIER_BY_RARITY: Record<Rarity, WeaponTier> = {
  common: 't1',
  uncommon: 't1',
  rare: 't2',
  epic: 't2',
  legendary: 't3',
  relic: 'sprint',
};

/**
 * Resolve o tier visual de um item.
 * Relíquias sempre ficam no sprint genérico (upgrade não muda isso).
 * @param rarity   raridade do item
 * @param upgrade  nível de upgrade (0-10), lido do effect 99
 */
export const tierOfItem = (rarity: string, upgrade = 0): WeaponTier => {
  const base = TIER_BY_RARITY[rarity as Rarity] ?? 't1';
  if (base === 'sprint') return 'sprint';
  // A cada 5 níveis de upgrade, sobe um tier de evolução (até t3)
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
