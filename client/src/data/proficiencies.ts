import type { WeaponCategory } from '../types/item.types';
import { getItemByNumId } from '../utils/itemSerializer';

/**
 * PROEFICIÊNCIAS DE ARMA (14) — o novo sistema de progressão de armas.
 * Cada categoria de arma do catálogo é uma proficiência. O jogador sobe
 * proficiência usando a arma (ataques/skills/kills) e desbloqueia skills
 * e bônus passivos conforme o nível.
 *
 * NOTA: glyph NÃO é proficiência — glifos são ferramentas de off-hand
 * (selam 2º elemento/fusão). Não sobem nível nem concedem skills.
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
  shield: '🛡',
  glyph: '🔯'
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

/* ────────────────────────────────────────────────────────────────
   PASSIVAS DE PROEFICIÊNCIA
   Cada arma concede bônus passivos em marcos de pontos (50/150/300).
   - dmgBonus    : fração somada ao dano (0.02 = +2%)
   - critChance  : fração somada à chance de crítico
   - critDamage  : fração somada ao dano crítico
   - healBonus   : fração somada à cura recebida
   - defBonus    : fração multiplicativa sobre a defesa total
   ──────────────────────────────────────────────────────────────── */
export interface ProficiencyPassiveTier {
  at: number;
  dmgBonus?: number;
  critChance?: number;
  critDamage?: number;
  healBonus?: number;
  defBonus?: number;
}

export const PROFICIENCY_PASSIVES: Record<WeaponCategory, ProficiencyPassiveTier[]> = {
  // TETOS (somados nos 3 tiers): dmg ≤ 12% · crit ≤ 8% · critDmg ≤ 25% · def ≤ 12% · heal ≤ 10%
  sword_one: [
    { at: 50, critChance: 0.02, critDamage: 0.05 },
    { at: 150, critChance: 0.03, critDamage: 0.07 },
    { at: 300, critChance: 0.03, critDamage: 0.08 }
  ],
  sword_two: [
    { at: 50, dmgBonus: 0.03, critChance: 0.01 },
    { at: 150, dmgBonus: 0.04, critChance: 0.01 },
    { at: 300, dmgBonus: 0.05, critChance: 0.01 }
  ],
  great_sword: [
    { at: 50, dmgBonus: 0.04, critDamage: 0.05 },
    { at: 150, dmgBonus: 0.04, critDamage: 0.07 },
    { at: 300, dmgBonus: 0.04, critDamage: 0.08 }
  ],
  dagger: [
    { at: 50, critChance: 0.02, critDamage: 0.05 },
    { at: 150, critChance: 0.03, critDamage: 0.05, dmgBonus: 0.01 },
    { at: 300, critChance: 0.03, critDamage: 0.05, dmgBonus: 0.01 }
  ],
  dagger_off: [
    { at: 50, critChance: 0.02, dmgBonus: 0.02 },
    { at: 150, critChance: 0.02, dmgBonus: 0.03 },
    { at: 300, critChance: 0.02, dmgBonus: 0.04 }
  ],
  bow_short: [
    { at: 50, dmgBonus: 0.03, critChance: 0.01 },
    { at: 150, dmgBonus: 0.03, critChance: 0.01 },
    { at: 300, dmgBonus: 0.04, critChance: 0.02 }
  ],
  bow_long: [
    { at: 50, critDamage: 0.08, dmgBonus: 0.02 },
    { at: 150, critDamage: 0.08, dmgBonus: 0.02 },
    { at: 300, critDamage: 0.09, dmgBonus: 0.02 }
  ],
  staff_one: [
    { at: 50, healBonus: 0.03, dmgBonus: 0.02 },
    { at: 150, healBonus: 0.03, dmgBonus: 0.03 },
    { at: 300, healBonus: 0.04, dmgBonus: 0.03 }
  ],
  staff_two: [
    { at: 50, dmgBonus: 0.04, critChance: 0.01 },
    { at: 150, dmgBonus: 0.04, critChance: 0.01 },
    { at: 300, dmgBonus: 0.04, critChance: 0.01 }
  ],
  orb: [
    { at: 50, critDamage: 0.07, dmgBonus: 0.02 },
    { at: 150, critDamage: 0.08, dmgBonus: 0.02 },
    { at: 300, critDamage: 0.1, dmgBonus: 0.02 }
  ],
  tome: [
    { at: 50, healBonus: 0.03, defBonus: 0.02 },
    { at: 150, healBonus: 0.03, defBonus: 0.03 },
    { at: 300, healBonus: 0.04, defBonus: 0.04 }
  ],
  hammer: [
    { at: 50, defBonus: 0.04, dmgBonus: 0.02 },
    { at: 150, defBonus: 0.04, dmgBonus: 0.02 },
    { at: 300, defBonus: 0.04, dmgBonus: 0.03 }
  ],
  spear: [
    { at: 50, dmgBonus: 0.03, critChance: 0.01 },
    { at: 150, dmgBonus: 0.04, critChance: 0.01 },
    { at: 300, dmgBonus: 0.05, critChance: 0.01 }
  ],
  shield: [
    { at: 50, defBonus: 0.04, healBonus: 0.02 },
    { at: 150, defBonus: 0.04, healBonus: 0.02 },
    { at: 300, defBonus: 0.04, healBonus: 0.02 }
  ],
  // GLIFO de off-hand: ferramenta arcana (2º elemento/fusão), sem bônus de
  // combate próprio — o poder vem do elemento que ele carimba na arma.
  glyph: []
};

export interface ProficiencyPassiveTotals {
  dmgBonus: number;
  critChance: number;
  critDamage: number;
  healBonus: number;
  defBonus: number;
}

const EMPTY_PASSIVES: ProficiencyPassiveTotals = { dmgBonus: 0, critChance: 0, critDamage: 0, healBonus: 0, defBonus: 0 };

/**
 * Soma as passivas de todas as armas equipadas conforme os pontos de
 * proficiência de cada categoria (marcos 50/150/300).
 */
export const getProficiencyPassiveTotals = (equipment: { weapon_main?: string | null; weapon_off?: string | null }, proficiencies: Record<string, number | undefined>): ProficiencyPassiveTotals => {
  const totals = { ...EMPTY_PASSIVES };

  for (const category of equippedWeaponCategories(equipment)) {
    const points = proficiencies[category] ?? 0;
    const tiers = PROFICIENCY_PASSIVES[category];

    if (!tiers) {
      continue;
    }

    for (const tier of tiers) {
      if (points >= tier.at) {
        totals.dmgBonus += tier.dmgBonus ?? 0;
        totals.critChance += tier.critChance ?? 0;
        totals.critDamage += tier.critDamage ?? 0;
        totals.healBonus += tier.healBonus ?? 0;
        totals.defBonus += tier.defBonus ?? 0;
      }
    }
  }

  return totals;
};
