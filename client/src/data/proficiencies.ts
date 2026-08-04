import type { WeaponCategory } from '../types/item.types';
import { getItemByNumId } from '../utils/itemSerializer';

/**
 * PROEFICIÊNCIAS DE ARMA (14) — o novo sistema de progressão de armas.
 * Cada categoria de arma do catálogo é uma proficiência. O jogador sobe
 * proficiência usando a arma (ataques/skills/kills) e desbloqueia skills
 * e bônus passivos conforme o nível.
 */
export const PROFICIENCIES: WeaponCategory[] = [
  'sword_one',
  'sword_two',
  'great_sword',
  'dagger',
  'dagger_off',
  'bow_short',
  'bow_long',
  'staff_one',
  'staff_two',
  'orb',
  'tome',
  'hammer',
  'spear',
  'shield'
];

/** Teto de pontos de proficiência (generoso; balanceado pelos thresholds). */
export const PROFICIENCY_CAP = 1000;

/** Bônus passivo: +0,2% de ATK por ponto (100 pts = +20%) com a arma da categoria. */
export const PROFICIENCY_ATK_BONUS_PER_POINT = 0.002;

/** XP de proficiência ganho por ação. */
export const PROF_XP = {
  attack: 1,
  skill: 2,
  kill: 3
} as const;

/** Icone de cada proficiência (exibido na UI). */
export const PROFICIENCY_ICONS: Record<WeaponCategory, string> = {
  sword_one: '⚔',
  sword_two: '🗡',
  great_sword: '⚔',
  dagger: '🔪',
  dagger_off: '🗡',
  bow_short: '🏹',
  bow_long: '🏹',
  staff_one: '🪄',
  staff_two: '🪄',
  orb: '🔮',
  tome: '📖',
  hammer: '🔨',
  spear: '🔱',
  shield: '🛡'
};

/**
 * Categoria de arma de um item (ou null se não for arma).
 * Aceita id de catálogo OU itemStr ("numId|...").
 */
export const weaponCategoryOf = (ref: string | null | undefined): WeaponCategory | null => {
  if (!ref) {
    return null;
  }

  const numId = Number(String(ref).split('|')[0]);

  if (!Number.isFinite(numId)) {
    return null;
  }

  const item = getItemByNumId(numId);

  return item?.weaponCategory ?? null;
};

/** Categorias das armas equipadas (main e off). */
export const equippedWeaponCategories = (equipment: {
  weapon_main?: string | null;
  weapon_off?: string | null;
}): WeaponCategory[] => {
  const categories = [weaponCategoryOf(equipment.weapon_main), weaponCategoryOf(equipment.weapon_off)].filter(
    (category): category is WeaponCategory => Boolean(category)
  );

  return [...new Set(categories)];
};

/** Armaduras/off-hands com categoria (escudo e adaga de apoio contam como arma). */
export const isShieldCategory = (category: WeaponCategory | null): boolean => category === 'shield';

/**
 * ARMAS INICIAIS — oferecidas na criação de personagem (nível 1).
 * As demais armas são obtidas no mundo (drops/loja) e a proficiência
 * acompanha a arma equipada — trocar de arma = trocar de build.
 */
export const STARTING_WEAPONS: Array<{ category: WeaponCategory; itemRef: string; icon: string }> = [
  { category: 'sword_one', itemRef: 'w1h_1000', icon: '⚔' },
  { category: 'dagger', itemRef: 'w1h_1100', icon: '🔪' },
  { category: 'staff_one', itemRef: 'w1h_1150', icon: '🪄' },
  { category: 'bow_short', itemRef: 'w1h_1200', icon: '🏹' }
];

/** Proficiência inicial concedida na arma escolhida. */
export const STARTING_PROFICIENCY = 5;
