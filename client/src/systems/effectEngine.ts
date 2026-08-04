/**
 * ════════════════════════════════════════════════════════════════
 *  EFFECT ENGINE — leitura e resolução dos effects numéricos
 *  (Parte 4 do sistema ItemEffects)
 *
 * Converte os effects numéricos (e1..e10 / v1..v10) dos itens em
 * valores reais aplicados ao personagem.
 * ════════════════════════════════════════════════════════════════
 */

import { ITEMS } from '../data/items';
import { EFFECT, getEffect, getEffectPairs } from '../data/effectRegistry';
import type { Item, ItemStats } from '../types/item.types';
import type { Equipment, Stats } from '../types/player.types';
import { resolveItemRef } from '../utils/itemSerializer';
import { getItemSet } from '../data/sets';

/** Effect "ao acertar" (effectIds 61–66) já pronto para rolagem em combate. */
export interface OnHitEffect {
  effectId: number;
  /** Chance de aplicar o status (fração 0–1; ex.: 0.25 = 25%). */
  chance: number;
  /** Payload do status (turnos para controle; dano de DoT é derivado em combate). */
  value: number;
}

/** Effect condicional (67–80), defensivo (56–58) ou especial (96–100). */
export interface ConditionalEffect {
  effectId: number;
  condition: string;
  value: number;
}

/** Bônus concedidos por pets (effects 81–85). */
export interface PetBonus {
  atk: number;
  hp: number;
  cdReduce: number;
  xpBonus: number;
  reviveSpeed: number;
}

/** Todos os bônus resolvidos de um item (ou do equipamento completo). */
export interface ResolvedEffects {
  atk: number;
  def: number;
  strength: number;
  agility: number;
  vitality: number;
  arcana: number;
  perception: number;
  will: number;
  luck: number;
  hp: number;
  mp: number;
  critChance: number;
  critDmg: number;
  elemRes: number;
  dmgBonus: number;
  defBonus: number;
  healBonus: number;
  xpBonus: number;
  goldBonus: number;
  lootBonus: number;
  speed: number;
  skillDmg: number;
  basicAtkDmg: number;
  skillCdReduce: number;
  skillMpReduce: number;
  dotDmgBonus: number;
  skillHealBonus: number;
  controlDuration: number;
  executeThreshold: number;
  reflectBonus: number;
  critSkillDmg: number;
  onHitEffects: OnHitEffect[];
  conditionals: ConditionalEffect[];
  mountSpeed: number;
  petBonuses: PetBonus;
}

/** Condições usadas pelos effects condicionais (61–80). */
const CONDITIONAL_CONDITIONS: Record<number, string> = {
  [EFFECT.ON_KILL_HEAL]: 'on_kill',
  [EFFECT.ON_KILL_MP]: 'on_kill',
  [EFFECT.ON_LOW_HP_ATK]: 'low_hp',
  [EFFECT.ON_LOW_HP_DEF]: 'low_hp',
  [EFFECT.ON_CRIT_BLEED]: 'on_crit',
  [EFFECT.ON_CRIT_DMG]: 'on_crit',
  [EFFECT.ON_BLOCK_COUNTER]: 'on_block',
  [EFFECT.ON_DODGE_ATK]: 'on_dodge',
  [EFFECT.VS_BEAST_DMG]: 'vs_beast',
  [EFFECT.VS_UNDEAD_DMG]: 'vs_undead',
  [EFFECT.VS_BOSS_DMG]: 'vs_boss',
  [EFFECT.VS_WEAK_DMG]: 'vs_weak',
  [EFFECT.PARTY_ATK_AURA]: 'party_aura',
  [EFFECT.PARTY_DEF_AURA]: 'party_aura'
};

/** Payload padrão (turnos) dos status aplicados por on-hit. */
const ON_HIT_STATUS_TURNS: Partial<Record<number, number>> = {
  [EFFECT.ON_HIT_FREEZE]: 1,
  [EFFECT.ON_HIT_STUN]: 1,
  [EFFECT.ON_HIT_SLOW]: 2
};

export const emptyResolvedEffects = (): ResolvedEffects => ({
  atk: 0,
  def: 0,
  strength: 0,
  agility: 0,
  vitality: 0,
  arcana: 0,
  perception: 0,
  will: 0,
  luck: 0,
  hp: 0,
  mp: 0,
  critChance: 0,
  critDmg: 0,
  elemRes: 0,
  dmgBonus: 0,
  defBonus: 0,
  healBonus: 0,
  xpBonus: 0,
  goldBonus: 0,
  lootBonus: 0,
  speed: 0,
  skillDmg: 0,
  basicAtkDmg: 0,
  skillCdReduce: 0,
  skillMpReduce: 0,
  dotDmgBonus: 0,
  skillHealBonus: 0,
  controlDuration: 0,
  executeThreshold: 0,
  reflectBonus: 0,
  critSkillDmg: 0,
  onHitEffects: [],
  conditionals: [],
  mountSpeed: 0,
  petBonuses: { atk: 0, hp: 0, cdReduce: 0, xpBonus: 0, reviveSpeed: 0 }
});

/**
 * Aplica um par (effectId, value) em um `ResolvedEffects` (mutação).
 *
 * Convenção de saída: effects com unidade `percent` são convertidos
 * para fração 0–1 (ex.: value 15 → 0.15). Stats flat, turnos, ids e
 * flags permanecem com o valor direto.
 */
const applyEffectPair = (target: ResolvedEffects, effectId: number, rawValue: number) => {
  const definition = getEffect(effectId);
  const value = definition?.unit === 'percent' ? rawValue / 100 : rawValue;

  switch (effectId) {
    // ── Stats primários ──
    case EFFECT.ATK: target.atk += value; break;
    case EFFECT.DEF: target.def += value; break;
    case EFFECT.STR: target.strength += value; break;
    case EFFECT.AGI: target.agility += value; break;
    case EFFECT.VIT: target.vitality += value; break;
    case EFFECT.ARC: target.arcana += value; break;
    case EFFECT.PER: target.perception += value; break;
    case EFFECT.WIL: target.will += value; break;
    case EFFECT.LCK: target.luck += value; break;
    case EFFECT.HP: target.hp += value; break;
    case EFFECT.MP: target.mp += value; break;

    // ── Stats de combate ──
    case EFFECT.CRIT_CHANCE: target.critChance += value; break;
    case EFFECT.CRIT_DMG: target.critDmg += value; break;
    case EFFECT.ELEM_RES: target.elemRes += value; break;
    case EFFECT.DMG_BONUS: target.dmgBonus += value; break;
    case EFFECT.DEF_BONUS: target.defBonus += value; break;
    case EFFECT.HEAL_BONUS: target.healBonus += value; break;
    case EFFECT.XP_BONUS: target.xpBonus += value; break;
    case EFFECT.GOLD_BONUS: target.goldBonus += value; break;
    case EFFECT.LOOT_BONUS: target.lootBonus += value; break;
    case EFFECT.SPEED: target.speed += value; break;

    // ── Effects de skill/arma (31–40) ──
    case EFFECT.SKILL_DMG: target.skillDmg += value; break;
    case EFFECT.BASIC_ATK_DMG: target.basicAtkDmg += value; break;
    case EFFECT.SKILL_CD_REDUCE: target.skillCdReduce += value; break;
    case EFFECT.SKILL_MP_REDUCE: target.skillMpReduce += value; break;
    case EFFECT.DOT_DMG_BONUS: target.dotDmgBonus += value; break;
    case EFFECT.SKILL_HEAL_BONUS: target.skillHealBonus += value; break;
    case EFFECT.CONTROL_DURATION: target.controlDuration += value; break;
    case EFFECT.EXECUTE_THRESHOLD: target.executeThreshold += value; break;
    case EFFECT.REFLECT_BONUS: target.reflectBonus += value; break;
    case EFFECT.CRIT_SKILL_DMG: target.critSkillDmg += value; break;

    // ── On-hit (61–66) ──
    case EFFECT.ON_HIT_BURN:
    case EFFECT.ON_HIT_FREEZE:
    case EFFECT.ON_HIT_BLEED:
    case EFFECT.ON_HIT_POISON:
    case EFFECT.ON_HIT_STUN:
    case EFFECT.ON_HIT_SLOW:
      target.onHitEffects.push({
        effectId,
        chance: value,
        value: ON_HIT_STATUS_TURNS[effectId] ?? 0
      });
      break;

    // ── Condicionais (67–80) ──
    case EFFECT.ON_KILL_HEAL:
    case EFFECT.ON_KILL_MP:
    case EFFECT.ON_LOW_HP_ATK:
    case EFFECT.ON_LOW_HP_DEF:
    case EFFECT.ON_CRIT_BLEED:
    case EFFECT.ON_CRIT_DMG:
    case EFFECT.ON_BLOCK_COUNTER:
    case EFFECT.ON_DODGE_ATK:
    case EFFECT.VS_BEAST_DMG:
    case EFFECT.VS_UNDEAD_DMG:
    case EFFECT.VS_BOSS_DMG:
    case EFFECT.VS_WEAK_DMG:
    case EFFECT.PARTY_ATK_AURA:
    case EFFECT.PARTY_DEF_AURA:
      target.conditionals.push({ effectId, condition: CONDITIONAL_CONDITIONS[effectId] ?? 'conditional', value });
      break;

    // ── Pet (81–85) ──
    case EFFECT.PET_ATK_BONUS: target.petBonuses.atk += value; break;
    case EFFECT.PET_HP_BONUS: target.petBonuses.hp += value; break;
    case EFFECT.PET_CD_REDUCE: target.petBonuses.cdReduce += value; break;
    case EFFECT.PET_XP_BONUS: target.petBonuses.xpBonus += value; break;
    case EFFECT.PET_REVIVE_SPEED: target.petBonuses.reviveSpeed += value; break;

    // ── Montaria (91–95) ──
    case EFFECT.MOUNT_SPEED: target.mountSpeed += value; break;
    case EFFECT.MOUNT_LOOT: target.lootBonus += value; break;
    case EFFECT.MOUNT_XP: target.xpBonus += value; break;

    // ── Status defensivos/utilitários (41–60) e especiais (96–100) ──
    default:
      target.conditionals.push({
        effectId,
        condition: effectId >= 96 ? 'special' : 'status',
        value
      });
      break;
  }
};

/**
 * Lê todos os pares e1–e10 / v1–v10 de um item e mapeia cada
 * effectId para o campo correto, retornando os bônus resolvidos.
 */
export const resolveEffects = (item: Pick<Item, 'effects'>): ResolvedEffects => {
  const resolved = emptyResolvedEffects();

  for (const { effectId, value } of getEffectPairs(item.effects)) {
    applyEffectPair(resolved, effectId, value);
  }

  return resolved;
};

/** Soma os bônus de `source` em `target` (mutação). */
const mergeResolved = (target: ResolvedEffects, source: ResolvedEffects) => {
  target.atk += source.atk;
  target.def += source.def;
  target.strength += source.strength;
  target.agility += source.agility;
  target.vitality += source.vitality;
  target.arcana += source.arcana;
  target.perception += source.perception;
  target.will += source.will;
  target.luck += source.luck;
  target.hp += source.hp;
  target.mp += source.mp;
  target.critChance += source.critChance;
  target.critDmg += source.critDmg;
  target.elemRes += source.elemRes;
  target.dmgBonus += source.dmgBonus;
  target.defBonus += source.defBonus;
  target.healBonus += source.healBonus;
  target.xpBonus += source.xpBonus;
  target.goldBonus += source.goldBonus;
  target.lootBonus += source.lootBonus;
  target.speed += source.speed;
  target.skillDmg += source.skillDmg;
  target.basicAtkDmg += source.basicAtkDmg;
  target.skillCdReduce += source.skillCdReduce;
  target.skillMpReduce += source.skillMpReduce;
  target.dotDmgBonus += source.dotDmgBonus;
  target.skillHealBonus += source.skillHealBonus;
  target.controlDuration += source.controlDuration;
  target.executeThreshold += source.executeThreshold;
  target.reflectBonus += source.reflectBonus;
  target.critSkillDmg += source.critSkillDmg;
  target.mountSpeed += source.mountSpeed;
  target.onHitEffects.push(...source.onHitEffects);
  target.conditionals.push(...source.conditionals);
  target.petBonuses.atk += source.petBonuses.atk;
  target.petBonuses.hp += source.petBonuses.hp;
  target.petBonuses.cdReduce += source.petBonuses.cdReduce;
  target.petBonuses.xpBonus += source.petBonuses.xpBonus;
  target.petBonuses.reviveSpeed += source.petBonuses.reviveSpeed;
};

/** Os 15 slots de equipamento, na ordem. */
export const EQUIPMENT_SLOTS: Array<keyof Equipment> = [
  'weapon_main',
  'weapon_off',
  'head',
  'chest',
  'legs',
  'gloves',
  'boots',
  'earring',
  'necklace',
  'belt',
  'resistance',
  'amulet',
  'spirit_stone',
  'pet',
  'mount'
];

/**
 * Calcula os stats finais do jogador:
 *  → Itera por todos os 15 slots equipados
 *  → Chama resolveEffects() para cada item
 *  → Soma todos os bônus aos stats base
 *  → Retorna os stats finais
 */
export const calculatePlayerStats = (baseStats: Stats, equipment: Equipment): ResolvedEffects => {
  const resolved = emptyResolvedEffects();

  resolved.strength = baseStats.strength;
  resolved.agility = baseStats.agility;
  resolved.vitality = baseStats.vitality;
  resolved.arcana = baseStats.arcana;
  resolved.perception = baseStats.perception;
  resolved.will = baseStats.will;

  const setCounts = new Map<number, number>();

  for (const slot of EQUIPMENT_SLOTS) {
    const itemId = equipment[slot];

    if (!itemId) continue;

    // Aceita id de catálogo OU itemStr serializada ("1005|1:65|4:5|7:3"),
    // preparando correio/mercado/trades.
    const item = resolveItemRef(itemId);

    if (!item) continue;

    mergeResolved(resolved, resolveEffects(item));

    // Conta peças de conjunto (SET_ID, effect 100)
    const setPair = getEffectPairs(item.effects).find((pair) => pair.effectId === EFFECT.SET_ID);

    if (setPair) {
      setCounts.set(setPair.value, (setCounts.get(setPair.value) ?? 0) + 1);
    }
  }

  // Bônus de conjunto: aplica os tiers atingidos pelo número de peças
  for (const [setId, count] of setCounts) {
    const set = getItemSet(setId);

    if (!set) continue;

    for (const tier of set.bonuses) {
      if (count < tier.pieces) continue;

      for (const pair of tier.pairs) {
        applyEffectPair(resolved, pair.effectId, pair.value);
      }
    }
  }

  return resolved;
};

/** Soma de todos os values de um effectId específico dentro dos condicionais. */
export const getConditionalValue = (resolved: ResolvedEffects, effectId: number): number =>
  resolved.conditionals.reduce((total, entry) => (entry.effectId === effectId ? total + entry.value : total), 0);

/**
 * Converte a porção "flat" de um `ResolvedEffects` em `ItemStats`
 * (usado para manter `getTotalAtk`/`getTotalDef`/sorte compatíveis).
 */
export const resolvedToItemStats = (resolved: ResolvedEffects): ItemStats => ({
  atk: resolved.atk,
  def: resolved.def,
  strength: resolved.strength,
  agility: resolved.agility,
  vitality: resolved.vitality,
  arcana: resolved.arcana,
  perception: resolved.perception,
  will: resolved.will,
  luck: resolved.luck,
  hp: resolved.hp,
  mp: resolved.mp,
  critChance: resolved.critChance,
  critDmg: resolved.critDmg
});
