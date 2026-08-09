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
  | 'mark';

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
  astral_barrier: { kind: 'barrier', color: '#a78bfa', glow: '#ede9fe', particle: 'void' },
  earth_shake: { kind: 'quake', color: '#d6b88a', glow: '#fef3c7', particle: 'support' },
  seismic_slam: { kind: 'quake', color: '#fb923c', glow: '#ffedd5', particle: 'support' },
  dragon_lance: { kind: 'lance', color: '#f59e0b', glow: '#fef3c7', particle: 'support' },
  hunters_mark: { kind: 'mark', color: '#facc15', glow: '#fef9c3', particle: 'physical' },
  arcane_mark: { kind: 'mark', color: '#c4b5fd', glow: '#f5f3ff', particle: 'magical' },
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
