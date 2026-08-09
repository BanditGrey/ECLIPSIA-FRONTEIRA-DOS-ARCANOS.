import { buildItemEffect, getEffectPairs } from './effectRegistry';
import { rollElementForWeapon } from './weaponElements';
import { resolveItemRef, serializeItem } from '../utils/itemSerializer';

/**
 * Adiciona um stamp elemental a uma arma recebida fora do crafting.
 * Retorna a referência original quando não é arma, o roll não acontece ou não
 * existe espaço entre os 10 effects. Assim, fontes antigas de recompensa seguem
 * seguras e podem optar pelo stamp sem conhecer o formato itemStr.
 */
export const stampWeaponReward = (ref: string, chance: number): string => {
  const item = resolveItemRef(ref);
  if (!item?.weaponCategory || item.weaponCategory === 'glyph' || Math.random() >= chance) return ref;

  const pairs = getEffectPairs(item.effects);
  if (pairs.length >= 10) return ref;

  const roll = rollElementForWeapon(item.rarity);
  return serializeItem(item, buildItemEffect([...pairs, { effectId: roll.effectId, value: roll.power }]));
};

/** Chances deliberadamente moderadas por origem (craft continua garantido). */
export const ELEMENT_REWARD_CHANCE = {
  shop: 0.18,
  quest: 0.35,
  chest: 0.25,
} as const;
