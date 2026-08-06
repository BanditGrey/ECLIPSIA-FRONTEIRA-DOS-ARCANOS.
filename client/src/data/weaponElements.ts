/**
 * ELEMENTOS DE ARMA (sistema de visuais por elemento × raridade)
 * --------------------------------------------------------------
 * O elemento da arma escolhe a "família" do visual (gelo, fogo, raio...)
 * e a RARIDADE escolhe o tier de beleza:
 *   t1 = common/uncommon (runas sutis) · t2 = rare/epic (ornamentada) ·
 *   t3 = legendary (radiante).
 * RELIC ("a última") foge da tabela: cada arma relic tem visual PRÓPRIO
 * (registrado em equipmentVisuals.ITEM_VISUALS); sem arte própria, cai no t3.
 *
 * Elementos espelham as linhas das pedras espirituais do catálogo:
 * fogo 7500 · gelo 7550 · raio 7600 · natureza 7650 · sombria 7700 ·
 * arcana 7750 · pura 7800.
 */

export type WeaponElement =
  | 'fire'
  | 'ice'
  | 'lightning'
  | 'nature'
  | 'shadow'
  | 'arcane'
  | 'pure';

export const ELEMENTS: WeaponElement[] = [
  'fire',
  'ice',
  'lightning',
  'nature',
  'shadow',
  'arcane',
  'pure',
];

/**
 * Atribuições DESENHADAS (armas cujo elemento faz parte do design).
 * Linha sword_one 1002-1009 = GELO · linha cajados 1151-1154 = FOGO ·
 * linha adagas 1102-1105 = RAIO.
 */
const CURATED: Record<string, WeaponElement> = {
  // Gelo (espadas de uma mão)
  w1h_1002: 'ice',
  w1h_1003: 'ice',
  w1h_1004: 'ice',
  w1h_1006: 'ice',
  w1h_1008: 'ice',
  w1h_1009: 'ice',
  // Fogo (cajados)
  w1h_1151: 'fire',
  w1h_1152: 'fire',
  w1h_1153: 'fire',
  w1h_1154: 'fire',
  // Raio (adagas)
  w1h_1102: 'lightning',
  w1h_1103: 'lightning',
  w1h_1104: 'lightning',
  w1h_1105: 'lightning',
};

/**
 * Elemento de uma arma: atribuição desenhada ou derivação determinística
 * (numId % 7) para que TODA arma do catálogo participe do sistema — os
 * elementos sem arte ainda caem no fallback base até receberem visuais.
 */
export const elementOfWeapon = (itemId: string | null | undefined): WeaponElement | null => {
  if (!itemId) return null;
  if (CURATED[itemId]) return CURATED[itemId];
  const n = Number(itemId.replace(/\D+/g, ''));
  if (!Number.isFinite(n) || n <= 0) return null;
  return ELEMENTS[n % ELEMENTS.length];
};

/** Tier de beleza por raridade. Relic não tem tier (visual próprio). */
export const TIER_BY_RARITY: Record<string, 1 | 2 | 3> = {
  common: 1,
  uncommon: 1,
  rare: 2,
  epic: 2,
  legendary: 3,
};

export const tierOfRarity = (rarity: string): 1 | 2 | 3 =>
  TIER_BY_RARITY[rarity] ?? (rarity === 'relic' ? 3 : 1);
