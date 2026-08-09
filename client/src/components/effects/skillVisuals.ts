import type { SkillEffectConfig } from './SkillEffectPanel';

/**
 * Direção visual por skill.
 *
 * A configuração fica fora do painel para que cada skill tenha uma identidade
 * própria sem duplicar a mecânica de partículas, áudio e encerramento do cast.
 * Skills ainda não catalogadas usam o fallback da sua categoria de dano.
 */
export type SkillVisualKind =
  | 'slash'
  | 'spin'
  | 'cross'
  | 'flurry'
  | 'arrow'
  | 'rain'
  | 'arcane'
  | 'frost'
  | 'lightning'
  | 'heal'
  | 'barrier'
  | 'quake'
  | 'lance'
  | 'mark'
  | 'smoke'
  | 'void'
  | 'ward'
  | 'thorns';

export interface SkillVisualConfig {
  kind: SkillVisualKind;
  color: string;
  glow: string;
  particle?: 'physical' | 'magical' | 'void' | 'support';
}

/** Primeira leva: skills de maior frequência e leitura visual mais distinta. */
export const SKILL_VISUALS: Record<string, SkillVisualConfig> = {
  slash: { kind: 'slash', color: '#fb7185', glow: '#fecdd3', particle: 'physical' },
  spin_slash: { kind: 'spin', color: '#f97316', glow: '#fed7aa', particle: 'physical' },
  cross_slash: { kind: 'cross', color: '#ef4444', glow: '#fecaca', particle: 'physical' },
  blade_flurry: { kind: 'flurry', color: '#fb7185', glow: '#ffe4e6', particle: 'physical' },
  quick_shot: { kind: 'arrow', color: '#fbbf24', glow: '#fef3c7', particle: 'physical' },
  rain_of_arrows: { kind: 'rain', color: '#38bdf8', glow: '#e0f2fe', particle: 'physical' },
  arcane_burst: { kind: 'arcane', color: '#818cf8', glow: '#e0e7ff', particle: 'magical' },
  frost_bolt: { kind: 'frost', color: '#67e8f9', glow: '#ecfeff', particle: 'magical' },
  chain_lightning: { kind: 'lightning', color: '#fde047', glow: '#fef9c3', particle: 'magical' },
  heal_pulse: { kind: 'heal', color: '#4ade80', glow: '#dcfce7', particle: 'magical' },
  greater_heal: { kind: 'heal', color: '#34d399', glow: '#d1fae5', particle: 'magical' },
  earth_shake: { kind: 'quake', color: '#d6b88a', glow: '#fef3c7', particle: 'support' },
  seismic_slam: { kind: 'quake', color: '#fb923c', glow: '#ffedd5', particle: 'support' },
  dragon_lance: { kind: 'lance', color: '#f59e0b', glow: '#fef3c7', particle: 'support' },
  hunters_mark: { kind: 'mark', color: '#facc15', glow: '#fef9c3', particle: 'physical' },

  // Espada 1H
  dash_cut: { kind: 'slash', color: '#fb923c', glow: '#ffedd5', particle: 'physical' },
  parry_counter: { kind: 'cross', color: '#facc15', glow: '#fef9c3', particle: 'physical' },
  war_cry: { kind: 'mark', color: '#f59e0b', glow: '#fef3c7', particle: 'physical' },
  thousand_cuts: { kind: 'flurry', color: '#f43f5e', glow: '#fff1f2', particle: 'physical' },

  // Espada longa e espadão
  long_swipe: { kind: 'slash', color: '#f97316', glow: '#ffedd5', particle: 'physical' },
  bleed: { kind: 'mark', color: '#dc2626', glow: '#fee2e2', particle: 'physical' },
  iron_will: { kind: 'barrier', color: '#94a3b8', glow: '#f1f5f9', particle: 'support' },
  deep_wound: { kind: 'cross', color: '#b91c1c', glow: '#fecaca', particle: 'physical' },
  counter_gambit: { kind: 'cross', color: '#fbbf24', glow: '#fef3c7', particle: 'physical' },
  crescent_slash: { kind: 'spin', color: '#f59e0b', glow: '#fef3c7', particle: 'physical' },
  brutal_slam: { kind: 'quake', color: '#fb7185', glow: '#ffe4e6', particle: 'physical' },
  cleave: { kind: 'slash', color: '#ef4444', glow: '#fecaca', particle: 'physical' },
  battle_fury: { kind: 'mark', color: '#f97316', glow: '#ffedd5', particle: 'physical' },
  execute: { kind: 'lance', color: '#f43f5e', glow: '#ffe4e6', particle: 'physical' },
  colossus_smash: { kind: 'quake', color: '#fb923c', glow: '#ffedd5', particle: 'support' },
  blade_storm: { kind: 'spin', color: '#fb7185', glow: '#fff1f2', particle: 'physical' },
  onslaught: { kind: 'lance', color: '#f97316', glow: '#ffedd5', particle: 'physical' },
  death_mark: { kind: 'mark', color: '#7f1d1d', glow: '#fecaca', particle: 'void' },

  // Adagas
  stab: { kind: 'lance', color: '#e879f9', glow: '#fae8ff', particle: 'physical' },
  smoke_bomb: { kind: 'smoke', color: '#64748b', glow: '#e2e8f0', particle: 'void' },
  eviscerate: { kind: 'cross', color: '#e11d48', glow: '#ffe4e6', particle: 'physical' },
  shadow_step: { kind: 'void', color: '#7c3aed', glow: '#ede9fe', particle: 'void' },
  fan_of_knives: { kind: 'flurry', color: '#a855f7', glow: '#f3e8ff', particle: 'physical' },
  assassinate: { kind: 'lance', color: '#9333ea', glow: '#f3e8ff', particle: 'void' },

  // Arcos
  piercing_shot: { kind: 'arrow', color: '#f97316', glow: '#ffedd5', particle: 'physical' },
  aimed_shot: { kind: 'mark', color: '#fbbf24', glow: '#fef3c7', particle: 'physical' },
  scatter_shot: { kind: 'flurry', color: '#fb923c', glow: '#ffedd5', particle: 'physical' },
  kiting_shot: { kind: 'arrow', color: '#22c55e', glow: '#dcfce7', particle: 'physical' },
  rapid_fire: { kind: 'flurry', color: '#facc15', glow: '#fef9c3', particle: 'physical' },
  precision_shot: { kind: 'arrow', color: '#38bdf8', glow: '#e0f2fe', particle: 'physical' },
  volley: { kind: 'rain', color: '#60a5fa', glow: '#dbeafe', particle: 'physical' },
  eagle_eye: { kind: 'mark', color: '#facc15', glow: '#fef9c3', particle: 'physical' },
  sniper_shot: { kind: 'lance', color: '#fb7185', glow: '#ffe4e6', particle: 'physical' },
  wind_arrow: { kind: 'arrow', color: '#34d399', glow: '#d1fae5', particle: 'physical' },
  dead_eye: { kind: 'mark', color: '#ef4444', glow: '#fee2e2', particle: 'physical' },

  // Cajados
  arcane_missile: { kind: 'arcane', color: '#60a5fa', glow: '#dbeafe', particle: 'magical' },
  arcane_bind: { kind: 'ward', color: '#a78bfa', glow: '#ede9fe', particle: 'magical' },
  mana_shield: { kind: 'barrier', color: '#22d3ee', glow: '#cffafe', particle: 'magical' },
  arcane_blast: { kind: 'arcane', color: '#818cf8', glow: '#e0e7ff', particle: 'magical' },
  ice_nova: { kind: 'frost', color: '#a5f3fc', glow: '#ecfeff', particle: 'magical' },
  blizzard: { kind: 'rain', color: '#67e8f9', glow: '#ecfeff', particle: 'magical' },
  arcane_armor: { kind: 'barrier', color: '#818cf8', glow: '#e0e7ff', particle: 'magical' },
  elemental_chaos: { kind: 'spin', color: '#c084fc', glow: '#f3e8ff', particle: 'magical' },
  time_warp: { kind: 'void', color: '#c4b5fd', glow: '#f5f3ff', particle: 'void' },

  // Martelo e lança
  crushing_blow: { kind: 'quake', color: '#f97316', glow: '#ffedd5', particle: 'support' },
  fortress: { kind: 'barrier', color: '#f59e0b', glow: '#fef3c7', particle: 'support' },
  unbreakable: { kind: 'barrier', color: '#94a3b8', glow: '#f1f5f9', particle: 'support' },
  war_stomp: { kind: 'quake', color: '#d97706', glow: '#fef3c7', particle: 'support' },
  titan_fall: { kind: 'quake', color: '#ea580c', glow: '#ffedd5', particle: 'support' },
  precise_thrust: { kind: 'lance', color: '#f59e0b', glow: '#fef3c7', particle: 'support' },
  thorns: { kind: 'thorns', color: '#84cc16', glow: '#ecfccb', particle: 'support' },
  sweeping_strike: { kind: 'spin', color: '#fbbf24', glow: '#fef3c7', particle: 'support' },
  serpent_spike: { kind: 'lance', color: '#65a30d', glow: '#ecfccb', particle: 'support' },
  nature_burst: { kind: 'arcane', color: '#4ade80', glow: '#dcfce7', particle: 'magical' },
  phalanx_ward: { kind: 'ward', color: '#38bdf8', glow: '#e0f2fe', particle: 'support' },
};

const FALLBACK_KIND: Record<NonNullable<SkillEffectConfig['damageType']>, SkillVisualKind> = {
  physical: 'slash',
  magical: 'arcane',
  void: 'barrier',
};

export const resolveSkillVisual = (skillId: string, damageType: SkillEffectConfig['damageType']): SkillVisualConfig => {
  const fallbackType = damageType ?? 'physical';
  const fallback = SKILL_VISUALS[skillId];
  return fallback ?? {
    kind: FALLBACK_KIND[fallbackType],
    color: fallbackType === 'physical' ? '#fb7185' : fallbackType === 'magical' ? '#66e8ff' : '#d9b8ff',
    glow: fallbackType === 'physical' ? '#fecdd3' : fallbackType === 'magical' ? '#cffafe' : '#f3e8ff',
  };
};
