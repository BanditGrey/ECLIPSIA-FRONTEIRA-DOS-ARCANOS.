/**
 * ELEMENTOS DE ARMA (sistema de visuais por elemento × raridade)
 * --------------------------------------------------------------
 * O elemento da arma escolhe a "família" do visual e a RARIDADE escolhe o
 * tier de beleza: t1 = common/uncommon (sutil) · t2 = rare/epic (ornamentada) ·
 * t3 = legendary (radiante). RELIC ("a última") foge da tabela: cada arma
 * relic tem visual PRÓPRIO (sem arte própria, cai no t3 do elemento).
 *
 * 🎡 RODA DE ELEMENTOS (12) — decidida com o usuário, gama grande:
 *   clássicos:  fire · ice · lightning · earth · wind
 *   orgânicos:  nature · poison · blood
 *   metafísicos: shadow · holy · void · arcane
 * Identidade de cor/VFX p/ arte e UI:
 *   fire laranja/brasas · ice ciano/cristais · lightning amarelo/faiscas ·
 *   earth âmbar/rocha · wind turquesa/vórtices · nature verde/folhas ·
 *   poison verde-ácido/borbulhas · blood carmesim/gotas ·
 *   shadow violeta-escuro/névoa · holy dourado/halos · void roxo-preto/fendas ·
 *   arcane teal/glifos.
 * (As pedras espirituais mantêm as 7 linhas próprias do catálogo; a roda de
 * armas é expandida.)
 */

export type WeaponElement =
  | 'fire'
  | 'ice'
  | 'lightning'
  | 'earth'
  | 'wind'
  | 'nature'
  | 'poison'
  | 'blood'
  | 'shadow'
  | 'holy'
  | 'void'
  | 'arcane';

export const ELEMENTS: WeaponElement[] = [
  'fire',
  'ice',
  'lightning',
  'earth',
  'wind',
  'nature',
  'poison',
  'blood',
  'shadow',
  'holy',
  'void',
  'arcane',
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
  // Natureza (arcos curtos)
  w1h_1201: 'nature',
  w1h_1202: 'nature',
  w1h_1203: 'nature',
  w1h_1204: 'nature',
  // Sombra (espadões)
  w2h_1501: 'shadow',
  w2h_1502: 'shadow',
  w2h_1503: 'shadow',
  w2h_1504: 'shadow',
  // Arcano (cajados de batalha)
  w2h_1751: 'arcane',
  w2h_1752: 'arcane',
  w2h_1753: 'arcane',
  w2h_1754: 'arcane',
  // Veneno (martelos)
  w2h_1601: 'poison',
  w2h_1602: 'poison',
  w2h_1603: 'poison',
  w2h_1604: 'poison',
  // Sagrado (lanças)
  w2h_1651: 'holy',
  w2h_1652: 'holy',
  w2h_1653: 'holy',
  w2h_1654: 'holy',
  // Vazio (arcos longos)
  w2h_1701: 'void',
  w2h_1702: 'void',
  w2h_1703: 'void',
  w2h_1704: 'void',
  // Terra (escudos, off-hand)
  oh_2002: 'earth',
  oh_2003: 'earth',
  oh_2004: 'earth',
  oh_2005: 'earth',
  // Vento (orbes, off-hand)
  oh_2150: 'wind',
  oh_2151: 'wind',
  oh_2152: 'wind',
  oh_2153: 'wind',
  // Sangue (tomos, off-hand)
  oh_2200: 'blood',
  oh_2201: 'blood',
  oh_2202: 'blood',
  oh_2203: 'blood',
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
