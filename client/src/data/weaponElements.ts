/**
 * ELEMENTOS DE ARMA — roda oficial de 6 (decisão do usuário)
 * ----------------------------------------------------------
 *   BÁSICOS (anel de counter — ver elementSynergy.ts):
 *     fire · earth · water · wind   (água>fogo>vento>terra>água)
 *   AVANÇADOS (rivais mútuos):
 *     dark ↔ light
 *
 * Cada elemento é um EFFECT próprio no registry (12–17) e o `value` é o
 * PODER do elemento na instância — tiers sugeridos p/ visual/balanceamento:
 *   <25 = T1 · <50 = T2 · 50+ = T3   (valores de exemplo, balancear depois)
 *
 * Toda arma pode nascer com qualquer elemento (stamp no loot/craft = PENDENTE);
 * sem stamp vale a atribuição DESENHADA (CURATED) e, por fim, numId % 6.
 * RELIC = visual próprio por arma (sem arte, cai no T3 do elemento).
 */
import { EFFECT } from './effectRegistry';
import type { Item } from '../types/item.types';

export type WeaponElement = 'fire' | 'earth' | 'water' | 'wind' | 'dark' | 'light';

export const ELEMENTS: WeaponElement[] = ['fire', 'earth', 'water', 'wind', 'dark', 'light'];

/** effectId de cada elemento (registry 12–17). */
export const ELEMENT_EFFECT_ID: Record<WeaponElement, number> = {
  fire: EFFECT.ELEMENT_FIRE,
  earth: EFFECT.ELEMENT_EARTH,
  water: EFFECT.ELEMENT_WATER,
  wind: EFFECT.ELEMENT_WIND,
  dark: EFFECT.ELEMENT_DARK,
  light: EFFECT.ELEMENT_LIGHT,
};

export const ELEMENT_BY_EFFECT_ID: Record<number, WeaponElement> = Object.fromEntries(
  Object.entries(ELEMENT_EFFECT_ID).map(([el, id]) => [id, el as WeaponElement]),
);

/** Poder → tier de visual/balanceamento (exemplo: <25 T1 · <50 T2 · 50+ T3). */
export const tierOfElementValue = (value: number): 1 | 2 | 3 =>
  value >= 50 ? 3 : value >= 25 ? 2 : 1;

/** Lê o elemento gravado na instância (effect 12–17 na itemStr), se houver. */
export const elementOfItemInstance = (
  item: Item | undefined,
): { element: WeaponElement; power: number; tier: 1 | 2 | 3 } | null => {
  if (!item?.effects) return null;
  const e = item.effects as Record<string, unknown>;
  for (let i = 1; i <= 10; i++) {
    const id = Number(e[`e${i}`]);
    const element = ELEMENT_BY_EFFECT_ID[id];
    if (element) {
      const power = Number(e[`v${i}`]) || 1;
      return { element, power, tier: tierOfElementValue(power) };
    }
  }
  return null;
};

/**
 * Atribuições DESENHADAS (elemento faz parte do design da linha):
 * espadas 1002-1009 ÁGUA · cajados 1151-1154 FOGO · adagas 1102-1105 VENTO ·
 * arcos 1201-1204 TERRA · espadões 1501-1504 SOMBRIO · lanças 1651-1654 LUZ ·
 * arcos longos 1701-1704 ÁGUA · tomos 2200-2203 SOMBRIO.
 */
const CURATED: Record<string, WeaponElement> = {
  w1h_1002: 'water', w1h_1003: 'water', w1h_1004: 'water', w1h_1006: 'water', w1h_1008: 'water', w1h_1009: 'water',
  w1h_1151: 'fire', w1h_1152: 'fire', w1h_1153: 'fire', w1h_1154: 'fire',
  w1h_1102: 'wind', w1h_1103: 'wind', w1h_1104: 'wind', w1h_1105: 'wind',
  w1h_1201: 'earth', w1h_1202: 'earth', w1h_1203: 'earth', w1h_1204: 'earth',
  w2h_1501: 'dark', w2h_1502: 'dark', w2h_1503: 'dark', w2h_1504: 'dark',
  w2h_1651: 'light', w2h_1652: 'light', w2h_1653: 'light', w2h_1654: 'light',
  w2h_1701: 'water', w2h_1702: 'water', w2h_1703: 'water', w2h_1704: 'water',
  oh_2200: 'dark', oh_2201: 'dark', oh_2202: 'dark', oh_2203: 'dark',
};

/**
 * Elemento de uma arma: 1) effect da instância (12–17) · 2) curated ·
 * 3) derivação determinística numId % 6.
 */
export const elementOfWeapon = (
  itemId: string | null | undefined,
  item?: Item,
): WeaponElement | null => {
  const inst = elementOfItemInstance(item);
  if (inst) return inst.element;
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
