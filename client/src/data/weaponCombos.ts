import type { WeaponCategory } from '../types/item.types';

/**
 * COMBINAÇÕES DE EQUIPAMENTO
 * --------------------------
 * A mão secundária é exclusiva de glifos. Não há mais armas ou escudos de
 * off-hand; por isso cada arma principal possui somente os estados sem glifo
 * e com glifo selado.
 */
export const COMBO_CATS: Array<WeaponCategory | 'none'> = [
  'none', 'sword_one', 'sword_two', 'great_sword', 'dagger', 'bow_short',
  'bow_long', 'staff_one', 'staff_two', 'hammer', 'spear', 'glyph',
];

const MAIN_WEAPONS: WeaponCategory[] = [
  'sword_one', 'sword_two', 'great_sword', 'dagger', 'bow_short', 'bow_long',
  'staff_one', 'staff_two', 'hammer', 'spear',
];

/** Chave "main_off" → i18n. */
export const COMBO_NAME_KEYS: Record<string, string> = Object.fromEntries(
  MAIN_WEAPONS.flatMap((main) => [
    [`${main}_none`, `combos.${main}_none.name`],
    [`${main}_glyph`, `combos.${main}_glyph.name`],
  ]),
);

export const comboKeyOf = (
  main: WeaponCategory | null | undefined,
  off: WeaponCategory | null | undefined,
): string => `${main && MAIN_WEAPONS.includes(main) ? main : 'none'}_${off === 'glyph' ? 'glyph' : 'none'}`;

export const comboNameKeyOf = (
  main: WeaponCategory | null | undefined,
  off: WeaponCategory | null | undefined,
): string => COMBO_NAME_KEYS[comboKeyOf(main, off)] ?? 'combos.none_none.name';

/** Compatibilidade para os painéis que exibem a chave da combinação. */
export const getComboKey = comboKeyOf;
