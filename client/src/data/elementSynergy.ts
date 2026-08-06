import type { WeaponElement } from './weaponElements';

/**
 * SINERGIAS ELEMENTAIS (design registrado c/ o usuário)
 * ------------------------------------------------------
 * BÁSICOS em anel de counter: ÁGUA > FOGO > VENTO > TERRA > ÁGUA
 * (cada elemento causa dano aumentado contra o que ele counter).
 * AVANÇADOS são RIVAIS mútuos: SOMBRIO ↔ LUZ (fortes um contra o outro).
 * Avançados NÃO entram no anel dos básicos.
 *
 * FUSÕES (sistema de GLIFOS de off-hand — PENDENTE de implementação em
 * combate/visual): arma de um elemento + glifo de outro cria um elemento
 * fundido como "buff" visual (camada de efeito ao redor da arma, sem mudar
 * a arte da arma). Ex.: ÁGUA + VENTO = GELO.
 */

/** elementCounter[X] = elemento contra o qual X é forte. */
export const ELEMENT_COUNTER: Record<WeaponElement, WeaponElement | null> = {
  water: 'fire',
  fire: 'wind',
  wind: 'earth',
  earth: 'water',
  dark: 'light',
  light: 'dark',
};

/** Multiplicador de dano contra o elemento countered (balanceável). */
export const COUNTER_MULTIPLIER = 1.25;

export const counters = (attacker: WeaponElement, defender: WeaponElement): boolean =>
  ELEMENT_COUNTER[attacker] === defender;

/**
 * Fusões de glifos (arma + glifo off-hand). Chave ordenada alfabeticamente
 * "a+b". Resultado null = sem fusão (ex.: sombrio+luz são rivais, não fundem).
 */
export const ELEMENT_FUSION: Record<string, { result: string; nameKey: string }> = {
  'fire+wind': { result: 'lightning', nameKey: 'fusions.lightning' }, // tempestade
  'earth+water': { result: 'nature', nameKey: 'fusions.nature' }, // vida/seiva
  'fire+earth': { result: 'magma', nameKey: 'fusions.magma' },
  'water+wind': { result: 'ice', nameKey: 'fusions.ice' }, // GELO (ex. do usuário)
  'fire+water': { result: 'mist', nameKey: 'fusions.mist' }, // névoa
  'earth+wind': { result: 'dust', nameKey: 'fusions.dust' }, // poeira
};

export const fusionOf = (a: WeaponElement, b: WeaponElement): { result: string; nameKey: string } | null => {
  const key = [a, b].sort().join('+');
  return ELEMENT_FUSION[key] ?? null;
};
