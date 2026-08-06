/**
 * ════════════════════════════════════════════════════════════════
 *  ITEM SERIALIZER — serialização compacta de itens
 *  (Parte 5 do sistema ItemEffects)
 *
 * Formato: "numId|e1:v1|e2:v2|...|e10:v10"
 * Exemplo: "1005|1:65|4:5|7:3"
 *
 * Usado para:
 *  - Sistema de correio entre jogadores
 *  - Mercado de itens / leilão
 *  - Trades
 *  - Links de itens no chat
 *  - Armazenamento eficiente no banco
 *
 * Exemplo de item no banco de dados:
 *   { itemStr: "1005|1:65|4:5|7:3", owner: "playerId", slot: "weapon_main" }
 * ════════════════════════════════════════════════════════════════
 */

import { ITEMS } from '../data/items';
import { buildItemEffect, getEffectPairs, isValidEffectId, MAX_EFFECTS_PER_ITEM, RESERVED_EFFECT_ID } from '../data/effectRegistry';
import { META_ELEMENT_ID } from '../data/weaponElements';
import type { Item, ItemEffect } from '../types/item.types';

/** Índice numId → item base (dados estáticos do catálogo). */
const NUM_ID_INDEX: Map<number, Item> = new Map(Object.values(ITEMS).map((item) => [item.numId, item]));

/** Busca um item do catálogo pelo numId. */
export const getItemByNumId = (numId: number): Item | undefined => NUM_ID_INDEX.get(numId);

/**
 * Serializa um item para o formato compacto.
 * `effects` opcionais sobrescrevem os effects do item (útil para
 * itens com roll customizado, ex.: mercado/crafting).
 */
export const serializeItem = (item: Item, effects?: ItemEffect): string => {
  const pairs = getEffectPairs(effects ?? item.effects);
  const segments = pairs.map(({ effectId, value }) => `${effectId}:${value}`);

  return [String(item.numId), ...segments].join('|');
};

/** Resultado do parse de uma itemStr. */
export interface ParsedItemStr {
  numId: number;
  pairs: Array<{ effectId: number; value: number }>;
}

/**
 * Faz o parse de uma itemStr sem validar contra o catálogo.
 * Lança erro em formato inválido (numId não numérico, pares mal
 * formados, effectId 0/reservado ou effectId desconhecido).
 */
export const parseItemStr = (str: string): ParsedItemStr => {
  if (typeof str !== 'string' || str.trim() === '') {
    throw new Error('itemStr vazia');
  }

  const segments = str.split('|');
  const numId = Number(segments[0]);

  if (!Number.isInteger(numId) || numId <= 0) {
    throw new Error(`itemStr inválida (numId): "${str}"`);
  }

  const pairs: Array<{ effectId: number; value: number }> = [];

  for (const segment of segments.slice(1)) {
    const [effectPart, valuePart] = segment.split(':');
    const effectId = Number(effectPart);
    const value = Number(valuePart);

    if (!Number.isInteger(effectId) || valuePart === undefined || !Number.isFinite(value)) {
      throw new Error(`itemStr inválida (par "${segment}"): "${str}"`);
    }

    // META_ELEMENT_ID (101) é meta-dado de elemento da instância — fora do
    // registry de effects do spec, mas aceito na itemStr.
    if (effectId === RESERVED_EFFECT_ID || (!isValidEffectId(effectId) && effectId !== META_ELEMENT_ID)) {
      throw new Error(`itemStr inválida (effectId ${effectId} desconhecido): "${str}"`);
    }

    if (pairs.length >= MAX_EFFECTS_PER_ITEM) {
      throw new Error(`itemStr inválida (mais de ${MAX_EFFECTS_PER_ITEM} effects): "${str}"`);
    }

    pairs.push({ effectId, value });
  }

  return { numId, pairs };
};

/**
 * Converte uma itemStr de volta para um Item completo:
 *  → Busca os dados base pelo numId
 *  → Aplica os effects customizados da string (fonte de verdade)
 */
export const deserializeItem = (str: string): Item => {
  const { numId, pairs } = parseItemStr(str);
  const base = getItemByNumId(numId);

  if (!base) {
    throw new Error(`Item desconhecido para numId ${numId}: "${str}"`);
  }

  const effects = buildItemEffect(pairs);

  return {
    ...base,
    effects: getEffectPairs(effects).length > 0 ? effects : base.effects
  };
};

/** Verdadeiro quando a string está no formato serializado "numId|e:v|...". */
export const isSerializedItemStr = (value: string): boolean => /^\d+(\|[1-9]\d*:-?\d+)*$/.test(value);

/**
 * Resolve uma referência de item que pode ser:
 *  - um id de catálogo (ex.: "w1h_1005")
 *  - uma itemStr serializada (ex.: "1005|1:65|4:5|7:3")
 */
export const resolveItemRef = (ref: string): Item | undefined => {
  if (isSerializedItemStr(ref)) {
    try {
      return deserializeItem(ref);
    } catch {
      return undefined;
    }
  }

  return (ITEMS as Record<string, Item>)[ref];
};
