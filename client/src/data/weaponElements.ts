/**
 * ELEMENTOS DE ARMA (sistema de visuais por elemento × raridade)
 * --------------------------------------------------------------
 * 🎡 RODA REDUZIDA (decisão do usuário p/ viabilizar arte de TODAS as armas):
 *   6 BÁSICOS: fire · ice · lightning · nature · shadow · holy
 *   2 ULTRA-RAROS: void · blood (só deveriam dropar em loot épico+)
 *
 * ⚡ TODA ARMA PODE TER TODO ELEMENTO: o elemento é propriedade da INSTÂNCIA,
 * gravado no itemStr como META-PAR `101:<índice>` (índice = posição em
 * ELEMENTS + 1). O 101 fica FORA do registry de effects do spec (1-100) — é
 * meta-dado visual/elemental: o regex genérico do server já aceita, auditorias
 * não são afetadas e a tabela de effects da UI ignora o par.
 * Sem meta-par, vale a atribuição DESENHADA (CURATED) e, por fim, derivação
 * determinística numId % 8.
 *
 * RARIDADE → tier de beleza: t1 common/uncommon · t2 rare/epic · t3 legendary.
 * RELIC = visual próprio por arma (sem arte, cai no t3 do elemento).
 * Identidade de cor/VFX: fire laranja/brasas · ice ciano/cristais ·
 * lightning amarelo/faiscas · nature verde/folhas · shadow violeta/névoa ·
 * holy dourado/halos · void roxo-preto/fendas · blood carmesim/gotas.
 */
import type { Item } from '../types/item.types';

export type WeaponElement =
  | 'fire'
  | 'ice'
  | 'lightning'
  | 'nature'
  | 'shadow'
  | 'holy'
  | 'void'
  | 'blood';

export const ELEMENTS: WeaponElement[] = [
  'fire',
  'ice',
  'lightning',
  'nature',
  'shadow',
  'holy',
  'void',
  'blood',
];

/** Meta-par no itemStr: `101:<1-8>` = elemento da instância (fora do spec 1-100). */
export const META_ELEMENT_ID = 101;

/** Lê o elemento gravado na instância (itemStr), se houver. */
export const elementOfItemInstance = (item: Item | undefined): WeaponElement | null => {
  if (!item?.effects) return null;
  const e = item.effects as Record<string, unknown>;
  for (let i = 1; i <= 10; i++) {
    if (Number(e[`e${i}`]) === META_ELEMENT_ID) {
      const idx = Number(e[`v${i}`]) - 1;
      return ELEMENTS[idx] ?? null;
    }
  }
  return null;
};

/**
 * Atribuições DESENHADAS (elemento faz parte do design da linha):
 * espadas 1002-1009 GELO · cajados 1151-1154 FOGO · adagas 1102-1105 RAIO ·
 * arcos 1201-1204 NATUREZA · espadões 1501-1504 SOMBRA · lanças 1551? NÃO —
 * lanças 1651-1654 SAGRADO · arcos longos 1701-1704 VAZIO · tomos 2200-2203 SANGUE.
 */
const CURATED: Record<string, WeaponElement> = {
  w1h_1002: 'ice', w1h_1003: 'ice', w1h_1004: 'ice', w1h_1006: 'ice', w1h_1008: 'ice', w1h_1009: 'ice',
  w1h_1151: 'fire', w1h_1152: 'fire', w1h_1153: 'fire', w1h_1154: 'fire',
  w1h_1102: 'lightning', w1h_1103: 'lightning', w1h_1104: 'lightning', w1h_1105: 'lightning',
  w1h_1201: 'nature', w1h_1202: 'nature', w1h_1203: 'nature', w1h_1204: 'nature',
  w2h_1501: 'shadow', w2h_1502: 'shadow', w2h_1503: 'shadow', w2h_1504: 'shadow',
  w2h_1651: 'holy', w2h_1652: 'holy', w2h_1653: 'holy', w2h_1654: 'holy',
  w2h_1701: 'void', w2h_1702: 'void', w2h_1703: 'void', w2h_1704: 'void',
  oh_2200: 'blood', oh_2201: 'blood', oh_2202: 'blood', oh_2203: 'blood',
};

/**
 * Elemento de uma arma: 1) meta-par da instância (TODA arma pode ter TODO
 * elemento) · 2) atribuição desenhada · 3) derivação determinística numId % 8.
 */
export const elementOfWeapon = (
  itemId: string | null | undefined,
  item?: Item,
): WeaponElement | null => {
  const fromInstance = elementOfItemInstance(item);
  if (fromInstance) return fromInstance;
  if (itemId && CURATED[itemId]) return CURATED[itemId];
  const n = Number(itemId?.replace(/\D+/g, ''));
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
