import type { WeaponCategory } from '../types/item.types';

export type SkillDamageType = 'physical' | 'magical' | 'void';

export interface PlayerSkillData {
  id: string;
  /** Proficiência de arma que desbloqueia esta skill. */
  proficiency: WeaponCategory;
  /** Pontos de proficiência necessários para desbloquear. */
  requireProficiency: number;
  icon: string;
  mp: number;
  cd: number;
  damageType?: SkillDamageType;
  damagePercent?: number;
  hits?: number;
  dotDamage?: number;
  dotTurns?: number;
  healPercent?: number;
  stunTurns?: number;
  slowTurns?: number;
  reflectPercent?: number;
  reflectTurns?: number;
  defUpPercent?: number;
  defUpTurns?: number;
  ignoreDef?: boolean;
  markDamageBonus?: number;
  markTurns?: number;
  dodgeNext?: boolean;
  executeBelowHpPercent?: number;
}

/**
 * Skills por proficiência de arma.
 * O jogador desbloqueia as skills da arma que está usando conforme
 * a proficiência sobe — trocou de arma, trocou de arsenal.
 */
export const skills: PlayerSkillData[] = [
  // ── Espada de uma mão ────────────────────────────────────────
  {
    id: 'spin_slash',
    proficiency: 'sword_one',
    requireProficiency: 10,
    icon: '⚔',
    mp: 30,
    cd: 2,
    damageType: 'physical',
    damagePercent: 150
  },
  {
    id: 'dash_cut',
    proficiency: 'sword_one',
    requireProficiency: 25,
    icon: '💨',
    mp: 45,
    cd: 3,
    damageType: 'physical',
    damagePercent: 200
  },
  {
    id: 'thousand_cuts',
    proficiency: 'sword_one',
    requireProficiency: 80,
    icon: '⚔',
    mp: 80,
    cd: 5,
    damageType: 'physical',
    damagePercent: 40,
    hits: 5
  },

  // ── Espada longa ─────────────────────────────────────────────
  {
    id: 'bleed',
    proficiency: 'sword_two',
    requireProficiency: 40,
    icon: '🩸',
    mp: 50,
    cd: 3,
    dotDamage: 40,
    dotTurns: 3
  },

  // ── Espadão ──────────────────────────────────────────────────
  {
    id: 'execute',
    proficiency: 'great_sword',
    requireProficiency: 60,
    icon: '💀',
    mp: 100,
    cd: 8,
    damageType: 'physical',
    damagePercent: 400,
    executeBelowHpPercent: 20
  },
  {
    id: 'blade_storm',
    proficiency: 'great_sword',
    requireProficiency: 120,
    icon: '🌀',
    mp: 90,
    cd: 6,
    damageType: 'physical',
    damagePercent: 90,
    hits: 3
  },

  // ── Adaga ────────────────────────────────────────────────────
  {
    id: 'death_mark',
    proficiency: 'dagger',
    requireProficiency: 10,
    icon: '💀',
    mp: 40,
    cd: 4,
    markDamageBonus: 0.5,
    markTurns: 3
  },
  {
    id: 'shadow_step',
    proficiency: 'dagger',
    requireProficiency: 60,
    icon: '👤',
    mp: 60,
    cd: 5,
    damageType: 'physical',
    damagePercent: 180,
    dodgeNext: true
  },

  // ── Adaga de apoio (mão secundária) ─────────────────────────
  {
    id: 'riposte',
    proficiency: 'dagger_off',
    requireProficiency: 30,
    icon: '🗡',
    mp: 35,
    cd: 3,
    damageType: 'physical',
    damagePercent: 140,
    dodgeNext: true
  },

  // ── Arco curto ───────────────────────────────────────────────
  {
    id: 'piercing_shot',
    proficiency: 'bow_short',
    requireProficiency: 10,
    icon: '🏹',
    mp: 30,
    cd: 2,
    damageType: 'physical',
    damagePercent: 160,
    ignoreDef: true
  },

  // ── Arco longo ───────────────────────────────────────────────
  {
    id: 'rain_of_arrows',
    proficiency: 'bow_long',
    requireProficiency: 50,
    icon: '🌧',
    mp: 70,
    cd: 5,
    damageType: 'physical',
    damagePercent: 55,
    hits: 4
  },

  // ── Cajado ───────────────────────────────────────────────────
  {
    id: 'arcane_burst',
    proficiency: 'staff_one',
    requireProficiency: 10,
    icon: '💥',
    mp: 30,
    cd: 2,
    damageType: 'magical',
    damagePercent: 150
  },
  {
    id: 'heal_pulse',
    proficiency: 'staff_one',
    requireProficiency: 40,
    icon: '💚',
    mp: 50,
    cd: 4,
    healPercent: 45
  },

  // ── Cajado arcano ────────────────────────────────────────────
  {
    id: 'ice_nova',
    proficiency: 'staff_two',
    requireProficiency: 40,
    icon: '❄',
    mp: 55,
    cd: 4,
    damageType: 'magical',
    damagePercent: 130,
    slowTurns: 2
  },
  {
    id: 'chain_lightning',
    proficiency: 'staff_two',
    requireProficiency: 100,
    icon: '⚡',
    mp: 90,
    cd: 6,
    damageType: 'magical',
    damagePercent: 170
  },

  // ── Orbe ─────────────────────────────────────────────────────
  {
    id: 'void_gate',
    proficiency: 'orb',
    requireProficiency: 120,
    icon: '🌑',
    mp: 110,
    cd: 8,
    damageType: 'void',
    damagePercent: 300
  },

  // ── Grimório ─────────────────────────────────────────────────
  {
    id: 'root',
    proficiency: 'tome',
    requireProficiency: 25,
    icon: '🌿',
    mp: 40,
    cd: 4,
    damageType: 'magical',
    damagePercent: 60,
    stunTurns: 1
  },

  // ── Martelo ──────────────────────────────────────────────────
  {
    id: 'fortress',
    proficiency: 'hammer',
    requireProficiency: 40,
    icon: '🏰',
    mp: 45,
    cd: 5,
    defUpPercent: 40,
    defUpTurns: 3
  },

  // ── Lança ────────────────────────────────────────────────────
  {
    id: 'thorns',
    proficiency: 'spear',
    requireProficiency: 30,
    icon: '🌵',
    mp: 40,
    cd: 4,
    reflectPercent: 35,
    reflectTurns: 3
  },
  {
    id: 'nature_burst',
    proficiency: 'spear',
    requireProficiency: 80,
    icon: '🌿',
    mp: 75,
    cd: 5,
    damageType: 'magical',
    damagePercent: 200
  },

  // ── Escudo ───────────────────────────────────────────────────
  {
    id: 'shield_bash',
    proficiency: 'shield',
    requireProficiency: 10,
    icon: '🛡',
    mp: 25,
    cd: 3,
    damageType: 'physical',
    damagePercent: 120,
    stunTurns: 1
  }
];
