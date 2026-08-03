import type { ArchetypeId } from './archetypes';

export type SkillDamageType = 'physical' | 'magical' | 'void';

export interface PlayerSkillData {
  id: string;
  archetype: ArchetypeId;
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

export const skills: PlayerSkillData[] = [
  {
    id: 'spin_slash',
    archetype: 'blade',
    icon: '⚔',
    mp: 30,
    cd: 2,
    damageType: 'physical',
    damagePercent: 150
  },
  {
    id: 'dash_cut',
    archetype: 'blade',
    icon: '💨',
    mp: 45,
    cd: 3,
    damageType: 'physical',
    damagePercent: 200
  },
  {
    id: 'bleed',
    archetype: 'blade',
    icon: '🩸',
    mp: 50,
    cd: 3,
    dotDamage: 40,
    dotTurns: 3
  },
  {
    id: 'execute',
    archetype: 'blade',
    icon: '💀',
    mp: 100,
    cd: 8,
    damageType: 'physical',
    damagePercent: 400,
    executeBelowHpPercent: 20
  },
  {
    id: 'thousand_cuts',
    archetype: 'blade',
    icon: '⚔',
    mp: 80,
    cd: 5,
    damageType: 'physical',
    damagePercent: 40,
    hits: 5
  },
  {
    id: 'blade_storm',
    archetype: 'blade',
    icon: '🌀',
    mp: 120,
    cd: 7,
    damageType: 'physical',
    damagePercent: 350
  },
  {
    id: 'arcane_burst',
    archetype: 'arcane',
    icon: '💥',
    mp: 60,
    cd: 2,
    damageType: 'magical',
    damagePercent: 180
  },
  {
    id: 'ice_nova',
    archetype: 'arcane',
    icon: '❄',
    mp: 80,
    cd: 4,
    damageType: 'magical',
    damagePercent: 140,
    slowTurns: 2
  },
  {
    id: 'chain_lightning',
    archetype: 'arcane',
    icon: '⚡',
    mp: 90,
    cd: 4,
    damageType: 'magical',
    damagePercent: 220,
    slowTurns: 1
  },
  {
    id: 'void_gate',
    archetype: 'arcane',
    icon: '🌑',
    mp: 150,
    cd: 8,
    damageType: 'void',
    damagePercent: 400
  },
  {
    id: 'heal_pulse',
    archetype: 'druid',
    icon: '💚',
    mp: 70,
    cd: 3,
    healPercent: 25
  },
  {
    id: 'root',
    archetype: 'druid',
    icon: '🌿',
    mp: 55,
    cd: 4,
    damageType: 'magical',
    damagePercent: 80,
    stunTurns: 1
  },
  {
    id: 'thorns',
    archetype: 'druid',
    icon: '🌵',
    mp: 60,
    cd: 4,
    reflectPercent: 30,
    reflectTurns: 3
  },
  {
    id: 'nature_burst',
    archetype: 'druid',
    icon: '🌿',
    mp: 100,
    cd: 6,
    damageType: 'magical',
    damagePercent: 280,
    healPercent: 15
  },
  {
    id: 'shield_bash',
    archetype: 'vanguard',
    icon: '🛡',
    mp: 40,
    cd: 3,
    damageType: 'physical',
    damagePercent: 120,
    stunTurns: 1
  },
  {
    id: 'fortress',
    archetype: 'vanguard',
    icon: '🏰',
    mp: 80,
    cd: 6,
    defUpPercent: 50,
    defUpTurns: 4
  },
  {
    id: 'piercing_shot',
    archetype: 'ranger',
    icon: '🏹',
    mp: 55,
    cd: 3,
    damageType: 'physical',
    damagePercent: 180,
    ignoreDef: true
  },
  {
    id: 'rain_of_arrows',
    archetype: 'ranger',
    icon: '🌧',
    mp: 110,
    cd: 6,
    damageType: 'physical',
    damagePercent: 60,
    hits: 6
  },
  {
    id: 'death_mark',
    archetype: 'spectre',
    icon: '💀',
    mp: 70,
    cd: 5,
    markDamageBonus: 50,
    markTurns: 3
  },
  {
    id: 'shadow_step',
    archetype: 'spectre',
    icon: '👤',
    mp: 90,
    cd: 5,
    damageType: 'physical',
    damagePercent: 280,
    dodgeNext: true
  }
];
