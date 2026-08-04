/**
 * ════════════════════════════════════════════════════════════════
 *  EFFECT REGISTRY — Tabela central de efeitos numéricos
 *  ECLIPSIA: FRONTEIRA DOS ARCANOS
 * ════════════════════════════════════════════════════════════════
 *
 * Todo effect é identificado por um NÚMERO e o `value` é sempre
 * numérico. Isso permite serializar um item de forma compacta:
 *
 *    { id: 1005, e1: 1, v1: 65, e2: 4, v2: 5, e3: 7, v3: 3 }
 *
 * Em vez de strings longas. Benefícios:
 *  - Sistema de correio entre jogadores
 *  - Mercado / leilão de itens
 *  - Serialização eficiente no banco de dados
 *  - Comparação rápida de itens
 *  - Base para crafting e upgrade
 *
 * Convenções de `value`:
 *  - Percentual  → inteiro: 15 = 15%
 *  - Flat        → número direto: 65 = 65 de ATK
 *  - Penalidade  → número negativo: -2 = reduz 2 de AGI
 *  - effectId 0  → RESERVADO (não existe)
 */

import type { ItemEffect } from '../types/item.types';

/** Unidade/semântica do `value` de um effect. */
export type EffectUnit =
  | 'flat' // valor direto (ex.: 65 = 65 ATK, ou dano/turno)
  | 'percent' // inteiro como porcentagem (15 = 15%)
  | 'turns' // duração em turnos
  | 'id' // referencia outro id (questId, setId)
  | 'flag'; // 0/1 (liga/desliga)

/** Categoria/faixa numérica do effect. */
export type EffectCategory =
  | 'primary' // 1–20   stats primários
  | 'combat' // 21–40  stats de combate
  | 'status' // 41–60  efeitos de status em combate
  | 'conditional' // 61–80  efeitos condicionais
  | 'pet' // 81–90  efeitos de pet
  | 'mount' // 91–95  efeitos de montaria
  | 'special'; // 96–100 efeitos especiais

export interface EffectDefinition {
  id: number;
  /** Código curto estável (usado em lógica e serialização). */
  code: string;
  category: EffectCategory;
  unit: EffectUnit;
  /** Descrição curta (pt-BR) para documentação/ferramentas. */
  description: string;
}

/**
 * IDs nomeados — prefira usar estas constantes em vez de números
 * literais na lógica de jogo.
 */
export const EFFECT = {
  // ── STATS PRIMÁRIOS (1–20) ────────────────────────────
  ATK: 1,
  DEF: 2,
  STR: 3,
  AGI: 4,
  VIT: 5,
  ARC: 6,
  PER: 7,
  WIL: 8,
  LCK: 9,
  HP: 10,
  MP: 11,

  // ── STATS DE COMBATE (21–40) ──────────────────────────
  CRIT_CHANCE: 21,
  CRIT_DMG: 22,
  ELEM_RES: 23,
  DMG_BONUS: 24,
  DEF_BONUS: 25,
  HEAL_BONUS: 26,
  XP_BONUS: 27,
  GOLD_BONUS: 28,
  LOOT_BONUS: 29,
  SPEED: 30,

  // ── EFEITOS DE SKILL/ARMA (31–40) ─────────────────────
  SKILL_DMG: 31,
  BASIC_ATK_DMG: 32,
  SKILL_CD_REDUCE: 33,
  SKILL_MP_REDUCE: 34,
  DOT_DMG_BONUS: 35,
  SKILL_HEAL_BONUS: 36,
  CONTROL_DURATION: 37,
  EXECUTE_THRESHOLD: 38,
  REFLECT_BONUS: 39,
  CRIT_SKILL_DMG: 40,

  // ── EFEITOS DE STATUS EM COMBATE (41–60) ──────────────
  BURN: 41,
  FREEZE: 42,
  PARALYZE: 43,
  BLEED: 44,
  POISON: 45,
  STUN: 46,
  SLOW: 47,
  SILENCE: 48,
  MANA_DRAIN: 49,
  WEAKEN: 50,
  BLIND: 51,
  SLEEP: 52,
  FEAR: 53,
  CURSE: 54,
  REGENERATE: 55,
  REFLECT: 56,
  SHIELD: 57,
  BARRIER: 58,
  HASTE: 59,
  BERSERK: 60,

  // ── EFEITOS CONDICIONAIS (61–80) ──────────────────────
  ON_HIT_BURN: 61,
  ON_HIT_FREEZE: 62,
  ON_HIT_BLEED: 63,
  ON_HIT_POISON: 64,
  ON_HIT_STUN: 65,
  ON_HIT_SLOW: 66,
  ON_KILL_HEAL: 67,
  ON_KILL_MP: 68,
  ON_LOW_HP_ATK: 69,
  ON_LOW_HP_DEF: 70,
  ON_CRIT_BLEED: 71,
  ON_CRIT_DMG: 72,
  ON_BLOCK_COUNTER: 73,
  ON_DODGE_ATK: 74,
  VS_BEAST_DMG: 75,
  VS_UNDEAD_DMG: 76,
  VS_BOSS_DMG: 77,
  VS_WEAK_DMG: 78,
  PARTY_ATK_AURA: 79,
  PARTY_DEF_AURA: 80,

  // ── EFEITOS DE PET (81–90) ────────────────────────────
  PET_ATK_BONUS: 81,
  PET_HP_BONUS: 82,
  PET_CD_REDUCE: 83,
  PET_XP_BONUS: 84,
  PET_REVIVE_SPEED: 85,

  // ── EFEITOS DE MONTARIA (91–95) ───────────────────────
  MOUNT_SPEED: 91,
  MOUNT_LOOT: 92,
  MOUNT_XP: 93,

  // ── EFEITOS ESPECIAIS (96–100) ────────────────────────
  SOUL_BIND: 96,
  QUEST_ITEM: 97,
  ENCHANT_SLOT: 98,
  UPGRADE_LEVEL: 99,
  SET_ID: 100
} as const;

export type EffectCode = keyof typeof EFFECT;

/** Máximo de effects por item (e1–e10 / v1–v10). */
export const MAX_EFFECTS_PER_ITEM = 10;

/** effectId 0 é reservado — nunca usar. */
export const RESERVED_EFFECT_ID = 0;

/**
 * Tabela completa de efeitos. Fonte única de verdade para
 * metadados (categoria + unidade) de cada effectId.
 */
export const EFFECT_REGISTRY: Record<number, EffectDefinition> = {
  // ═══════════════ STATS PRIMÁRIOS — 1 a 20 ═══════════════
  [EFFECT.ATK]: { id: 1, code: 'ATK', category: 'primary', unit: 'flat', description: 'Ataque físico' },
  [EFFECT.DEF]: { id: 2, code: 'DEF', category: 'primary', unit: 'flat', description: 'Defesa física' },
  [EFFECT.STR]: { id: 3, code: 'STR', category: 'primary', unit: 'flat', description: 'Força' },
  [EFFECT.AGI]: { id: 4, code: 'AGI', category: 'primary', unit: 'flat', description: 'Agilidade' },
  [EFFECT.VIT]: { id: 5, code: 'VIT', category: 'primary', unit: 'flat', description: 'Vitalidade' },
  [EFFECT.ARC]: { id: 6, code: 'ARC', category: 'primary', unit: 'flat', description: 'Arcana' },
  [EFFECT.PER]: { id: 7, code: 'PER', category: 'primary', unit: 'flat', description: 'Percepção' },
  [EFFECT.WIL]: { id: 8, code: 'WIL', category: 'primary', unit: 'flat', description: 'Vontade' },
  [EFFECT.LCK]: { id: 9, code: 'LCK', category: 'primary', unit: 'flat', description: 'Sorte' },
  [EFFECT.HP]: { id: 10, code: 'HP', category: 'primary', unit: 'flat', description: 'Vida máxima' },
  [EFFECT.MP]: { id: 11, code: 'MP', category: 'primary', unit: 'flat', description: 'Mana máxima' },

  // ═══════════════ STATS DE COMBATE — 21 a 40 ═══════════════
  [EFFECT.CRIT_CHANCE]: { id: 21, code: 'CRIT_CHANCE', category: 'combat', unit: 'percent', description: 'Chance de crítico (%)' },
  [EFFECT.CRIT_DMG]: { id: 22, code: 'CRIT_DMG', category: 'combat', unit: 'percent', description: 'Dano crítico (%)' },
  [EFFECT.ELEM_RES]: { id: 23, code: 'ELEM_RES', category: 'combat', unit: 'flat', description: 'Resistência elemental' },
  [EFFECT.DMG_BONUS]: { id: 24, code: 'DMG_BONUS', category: 'combat', unit: 'percent', description: 'Bônus de dano geral (%)' },
  [EFFECT.DEF_BONUS]: { id: 25, code: 'DEF_BONUS', category: 'combat', unit: 'percent', description: 'Bônus de defesa geral (%)' },
  [EFFECT.HEAL_BONUS]: { id: 26, code: 'HEAL_BONUS', category: 'combat', unit: 'percent', description: 'Bônus de cura (%)' },
  [EFFECT.XP_BONUS]: { id: 27, code: 'XP_BONUS', category: 'combat', unit: 'percent', description: 'Bônus de XP (%)' },
  [EFFECT.GOLD_BONUS]: { id: 28, code: 'GOLD_BONUS', category: 'combat', unit: 'percent', description: 'Bônus de ouro (%)' },
  [EFFECT.LOOT_BONUS]: { id: 29, code: 'LOOT_BONUS', category: 'combat', unit: 'percent', description: 'Bônus de loot (%)' },
  [EFFECT.SPEED]: { id: 30, code: 'SPEED', category: 'combat', unit: 'percent', description: 'Velocidade de exploração (%)' },
  [EFFECT.SKILL_DMG]: { id: 31, code: 'SKILL_DMG', category: 'combat', unit: 'percent', description: 'Bônus de dano de skills (%)' },
  [EFFECT.BASIC_ATK_DMG]: { id: 32, code: 'BASIC_ATK_DMG', category: 'combat', unit: 'percent', description: 'Bônus de dano de ataque básico (%)' },
  [EFFECT.SKILL_CD_REDUCE]: { id: 33, code: 'SKILL_CD_REDUCE', category: 'combat', unit: 'percent', description: 'Redução de cooldown de skills (%)' },
  [EFFECT.SKILL_MP_REDUCE]: { id: 34, code: 'SKILL_MP_REDUCE', category: 'combat', unit: 'percent', description: 'Redução de custo de MP de skills (%)' },
  [EFFECT.DOT_DMG_BONUS]: { id: 35, code: 'DOT_DMG_BONUS', category: 'combat', unit: 'percent', description: 'Bônus de dano de DoT (%)' },
  [EFFECT.SKILL_HEAL_BONUS]: { id: 36, code: 'SKILL_HEAL_BONUS', category: 'combat', unit: 'percent', description: 'Bônus de cura de skills (%)' },
  [EFFECT.CONTROL_DURATION]: { id: 37, code: 'CONTROL_DURATION', category: 'combat', unit: 'percent', description: 'Bônus de duração de stun/slow (%)' },
  [EFFECT.EXECUTE_THRESHOLD]: { id: 38, code: 'EXECUTE_THRESHOLD', category: 'combat', unit: 'percent', description: 'Bônus de limiar de execução (%)' },
  [EFFECT.REFLECT_BONUS]: { id: 39, code: 'REFLECT_BONUS', category: 'combat', unit: 'percent', description: 'Bônus de reflexo (%)' },
  [EFFECT.CRIT_SKILL_DMG]: { id: 40, code: 'CRIT_SKILL_DMG', category: 'combat', unit: 'percent', description: 'Bônus de dano crítico de skills (%)' },

  // ═══════════════ EFEITOS DE STATUS EM COMBATE — 41 a 60 ═══════════════
  [EFFECT.BURN]: { id: 41, code: 'BURN', category: 'status', unit: 'flat', description: 'Queima (dano por turno)' },
  [EFFECT.FREEZE]: { id: 42, code: 'FREEZE', category: 'status', unit: 'turns', description: 'Congela (turnos de stun)' },
  [EFFECT.PARALYZE]: { id: 43, code: 'PARALYZE', category: 'status', unit: 'turns', description: 'Paralisa (turnos)' },
  [EFFECT.BLEED]: { id: 44, code: 'BLEED', category: 'status', unit: 'flat', description: 'Sangramento (dano por turno)' },
  [EFFECT.POISON]: { id: 45, code: 'POISON', category: 'status', unit: 'flat', description: 'Veneno (dano por turno)' },
  [EFFECT.STUN]: { id: 46, code: 'STUN', category: 'status', unit: 'turns', description: 'Atordoa (turnos)' },
  [EFFECT.SLOW]: { id: 47, code: 'SLOW', category: 'status', unit: 'percent', description: 'Lentidão (% redução velocidade)' },
  [EFFECT.SILENCE]: { id: 48, code: 'SILENCE', category: 'status', unit: 'turns', description: 'Silêncio (turnos sem skill)' },
  [EFFECT.MANA_DRAIN]: { id: 49, code: 'MANA_DRAIN', category: 'status', unit: 'flat', description: 'Drena mana (MP drenado)' },
  [EFFECT.WEAKEN]: { id: 50, code: 'WEAKEN', category: 'status', unit: 'percent', description: 'Enfraquece (% redução ATK)' },
  [EFFECT.BLIND]: { id: 51, code: 'BLIND', category: 'status', unit: 'percent', description: 'Cega (% chance de errar)' },
  [EFFECT.SLEEP]: { id: 52, code: 'SLEEP', category: 'status', unit: 'turns', description: 'Dorme (turnos)' },
  [EFFECT.FEAR]: { id: 53, code: 'FEAR', category: 'status', unit: 'percent', description: 'Medo (% chance de fugir)' },
  [EFFECT.CURSE]: { id: 54, code: 'CURSE', category: 'status', unit: 'percent', description: 'Maldição (% redução de todos os stats)' },
  [EFFECT.REGENERATE]: { id: 55, code: 'REGENERATE', category: 'status', unit: 'flat', description: 'Regenera HP por turno' },
  [EFFECT.REFLECT]: { id: 56, code: 'REFLECT', category: 'status', unit: 'percent', description: 'Reflete dano (%)' },
  [EFFECT.SHIELD]: { id: 57, code: 'SHIELD', category: 'status', unit: 'flat', description: 'Escudo absorve (HP)' },
  [EFFECT.BARRIER]: { id: 58, code: 'BARRIER', category: 'status', unit: 'flat', description: 'Barreira mágica (MP absorvido)' },
  [EFFECT.HASTE]: { id: 59, code: 'HASTE', category: 'status', unit: 'percent', description: 'Acelera (% redução de cooldown)' },
  [EFFECT.BERSERK]: { id: 60, code: 'BERSERK', category: 'status', unit: 'percent', description: 'Berserk (% aumento ATK e dano recebido)' },

  // ═══════════════ EFEITOS CONDICIONAIS — 61 a 80 ═══════════════
  [EFFECT.ON_HIT_BURN]: { id: 61, code: 'ON_HIT_BURN', category: 'conditional', unit: 'percent', description: 'Ao acertar aplica queima (chance %)' },
  [EFFECT.ON_HIT_FREEZE]: { id: 62, code: 'ON_HIT_FREEZE', category: 'conditional', unit: 'percent', description: 'Ao acertar aplica freeze (chance %)' },
  [EFFECT.ON_HIT_BLEED]: { id: 63, code: 'ON_HIT_BLEED', category: 'conditional', unit: 'percent', description: 'Ao acertar aplica sangramento (chance %)' },
  [EFFECT.ON_HIT_POISON]: { id: 64, code: 'ON_HIT_POISON', category: 'conditional', unit: 'percent', description: 'Ao acertar aplica veneno (chance %)' },
  [EFFECT.ON_HIT_STUN]: { id: 65, code: 'ON_HIT_STUN', category: 'conditional', unit: 'percent', description: 'Ao acertar aplica stun (chance %)' },
  [EFFECT.ON_HIT_SLOW]: { id: 66, code: 'ON_HIT_SLOW', category: 'conditional', unit: 'percent', description: 'Ao acertar aplica slow (chance %)' },
  [EFFECT.ON_KILL_HEAL]: { id: 67, code: 'ON_KILL_HEAL', category: 'conditional', unit: 'percent', description: 'Ao matar cura (% HP)' },
  [EFFECT.ON_KILL_MP]: { id: 68, code: 'ON_KILL_MP', category: 'conditional', unit: 'percent', description: 'Ao matar restaura MP (% MP)' },
  [EFFECT.ON_LOW_HP_ATK]: { id: 69, code: 'ON_LOW_HP_ATK', category: 'conditional', unit: 'percent', description: 'Com HP baixo aumenta ATK (% bônus)' },
  [EFFECT.ON_LOW_HP_DEF]: { id: 70, code: 'ON_LOW_HP_DEF', category: 'conditional', unit: 'percent', description: 'Com HP baixo aumenta DEF (% bônus)' },
  [EFFECT.ON_CRIT_BLEED]: { id: 71, code: 'ON_CRIT_BLEED', category: 'conditional', unit: 'flat', description: 'Ao criticar aplica sangramento (dano)' },
  [EFFECT.ON_CRIT_DMG]: { id: 72, code: 'ON_CRIT_DMG', category: 'conditional', unit: 'percent', description: 'Ao criticar bônus de dano (%)' },
  [EFFECT.ON_BLOCK_COUNTER]: { id: 73, code: 'ON_BLOCK_COUNTER', category: 'conditional', unit: 'percent', description: 'Ao bloquear contra-ataca (% dano)' },
  [EFFECT.ON_DODGE_ATK]: { id: 74, code: 'ON_DODGE_ATK', category: 'conditional', unit: 'percent', description: 'Ao esquivar ataca (% dano)' },
  [EFFECT.VS_BEAST_DMG]: { id: 75, code: 'VS_BEAST_DMG', category: 'conditional', unit: 'percent', description: 'Dano vs bestas (% bônus)' },
  [EFFECT.VS_UNDEAD_DMG]: { id: 76, code: 'VS_UNDEAD_DMG', category: 'conditional', unit: 'percent', description: 'Dano vs mortos-vivos (% bônus)' },
  [EFFECT.VS_BOSS_DMG]: { id: 77, code: 'VS_BOSS_DMG', category: 'conditional', unit: 'percent', description: 'Dano vs bosses (% bônus)' },
  [EFFECT.VS_WEAK_DMG]: { id: 78, code: 'VS_WEAK_DMG', category: 'conditional', unit: 'percent', description: 'Dano vs ponto fraco (% bônus)' },
  [EFFECT.PARTY_ATK_AURA]: { id: 79, code: 'PARTY_ATK_AURA', category: 'conditional', unit: 'percent', description: 'Aura de ATK para a party (% bônus)' },
  [EFFECT.PARTY_DEF_AURA]: { id: 80, code: 'PARTY_DEF_AURA', category: 'conditional', unit: 'percent', description: 'Aura de DEF para a party (% bônus)' },

  // ═══════════════ EFEITOS DE PET — 81 a 90 ═══════════════
  [EFFECT.PET_ATK_BONUS]: { id: 81, code: 'PET_ATK_BONUS', category: 'pet', unit: 'flat', description: 'Bônus de ATK do pet' },
  [EFFECT.PET_HP_BONUS]: { id: 82, code: 'PET_HP_BONUS', category: 'pet', unit: 'flat', description: 'Bônus de HP do pet' },
  [EFFECT.PET_CD_REDUCE]: { id: 83, code: 'PET_CD_REDUCE', category: 'pet', unit: 'turns', description: 'Reduz cooldown do pet (turnos)' },
  [EFFECT.PET_XP_BONUS]: { id: 84, code: 'PET_XP_BONUS', category: 'pet', unit: 'percent', description: 'Bônus de XP do pet (%)' },
  [EFFECT.PET_REVIVE_SPEED]: { id: 85, code: 'PET_REVIVE_SPEED', category: 'pet', unit: 'turns', description: 'Pet revive mais rápido (turnos)' },

  // ═══════════════ EFEITOS DE MONTARIA — 91 a 95 ═══════════════
  [EFFECT.MOUNT_SPEED]: { id: 91, code: 'MOUNT_SPEED', category: 'mount', unit: 'percent', description: 'Velocidade de exploração montado (%)' },
  [EFFECT.MOUNT_LOOT]: { id: 92, code: 'MOUNT_LOOT', category: 'mount', unit: 'percent', description: 'Loot bonus montado (%)' },
  [EFFECT.MOUNT_XP]: { id: 93, code: 'MOUNT_XP', category: 'mount', unit: 'percent', description: 'XP bonus montado (%)' },

  // ═══════════════ EFEITOS ESPECIAIS — 96 a 100 ═══════════════
  [EFFECT.SOUL_BIND]: { id: 96, code: 'SOUL_BIND', category: 'special', unit: 'flag', description: 'Item ligado à alma (1/0)' },
  [EFFECT.QUEST_ITEM]: { id: 97, code: 'QUEST_ITEM', category: 'special', unit: 'id', description: 'Item de quest (questId)' },
  [EFFECT.ENCHANT_SLOT]: { id: 98, code: 'ENCHANT_SLOT', category: 'special', unit: 'flat', description: 'Slots de encantamento (quantidade)' },
  [EFFECT.UPGRADE_LEVEL]: { id: 99, code: 'UPGRADE_LEVEL', category: 'special', unit: 'flat', description: 'Nível de upgrade (0–10)' },
  [EFFECT.SET_ID]: { id: 100, code: 'SET_ID', category: 'special', unit: 'id', description: 'ID do conjunto de itens (setId)' }
};

/** Retorna a definição de um effectId, ou `undefined` se inválido/reservado. */
export const getEffect = (effectId: number): EffectDefinition | undefined => {
  if (effectId === RESERVED_EFFECT_ID) return undefined;
  return EFFECT_REGISTRY[effectId];
};

/** Um effectId é considerado válido quando possui definição registrada. */
export const isValidEffectId = (effectId: number): boolean => getEffect(effectId) !== undefined;

/** Faixa [min,max] de cada categoria — útil para ferramentas e validação. */
export const EFFECT_CATEGORY_RANGES: Record<EffectCategory, { min: number; max: number }> = {
  primary: { min: 1, max: 20 },
  combat: { min: 21, max: 40 },
  status: { min: 41, max: 60 },
  conditional: { min: 61, max: 80 },
  pet: { min: 81, max: 90 },
  mount: { min: 91, max: 95 },
  special: { min: 96, max: 100 }
};

/**
 * Extrai os pares [effectId, value] de um `ItemEffect`, em ordem
 * (e1..e10). Interrompe no primeiro "gap" (eN ausente), garantindo
 * a regra "sem gaps". Pares incompletos (eN sem vN) são ignorados.
 */
export const getEffectPairs = (effects?: ItemEffect): Array<{ effectId: number; value: number }> => {
  if (!effects) return [];

  const pairs: Array<{ effectId: number; value: number }> = [];

  for (let i = 1; i <= MAX_EFFECTS_PER_ITEM; i += 1) {
    const effectId = effects[`e${i}` as keyof ItemEffect];
    const value = effects[`v${i}` as keyof ItemEffect];

    if (effectId === undefined || effectId === null) break; // gap → para
    if (value === undefined || value === null) continue; // par incompleto

    pairs.push({ effectId, value });
  }

  return pairs;
};

/** Constrói um `ItemEffect` a partir de uma lista de pares (e+v). */
export const buildItemEffect = (pairs: Array<{ effectId: number; value: number }>): ItemEffect => {
  const result: ItemEffect = {};

  pairs.slice(0, MAX_EFFECTS_PER_ITEM).forEach(({ effectId, value }, index) => {
    const slot = index + 1;
    result[`e${slot}` as keyof ItemEffect] = effectId;
    result[`v${slot}` as keyof ItemEffect] = value;
  });

  return result;
};

/** Quantidade de effects presentes em um `ItemEffect`. */
export const countEffects = (effects?: ItemEffect): number => getEffectPairs(effects).length;
