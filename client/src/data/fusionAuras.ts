/**
 * AURAS DE FUSÃO (sistema de GLIFOS de off-hand)
 * ---------------------------------------------
 * Quando a arma da mão principal tem um elemento E o glifo equipado na mão
 * secundária sela um SEGUNDO elemento, `fusionOf` pode gerar um elemento
 * fundido (ex.: ÁGUA + VENTO = GELO). A fusão se manifesta como uma camada
 * de AURA ao redor da arma (um brilho/halo), SEM trocar a arte da arma.
 *
 * Este módulo apenas descreve COMO a aura aparece (cor/intensidade) e ajuda
 * a resolver a fusão a partir das duas mãos. A resolução do elemento de cada
 * item vem de `weaponElements.ts`; a tabela de fusões, de `elementSynergy.ts`.
 */
import { fusionOf } from './elementSynergy';
import { elementOfItemInstance, type WeaponElement } from './weaponElements';
import { resolveItemRef } from '../utils/itemSerializer';
import { getGlyph } from './glyphs';
import type { Gender } from './equipmentVisuals';
import type { CharState } from '../components/ui/LayeredCharacter';

/** Resultado de uma fusão ativa (p/ render da aura + bônus de combate). */
export interface ActiveFusion {
  /** Elemento fundido (chave em `fusions.*` do i18n): ice, magma, lightning... */
  result: string;
  nameKey: string;
  /** Cor principal da aura (CSS). */
  color: string;
  /** Cor secundária/halo (CSS, mais clara para o miolo). */
  glow: string;
  /** Tier visual derivado do poder do glifo (1..3). */
  tier: 1 | 2 | 3;
}

/**
 * Cores das fusões. Cada resultado tem uma identidade própria e independe da
 * arte da arma (a aura é um overlay).
 */
export const FUSION_COLORS: Record<string, { color: string; glow: string }> = {
  ice: { color: '#7dd3fc', glow: '#e0f2fe' }, // GELO (água+vento)
  lightning: { color: '#fde047', glow: '#fef9c3' }, // TEMPESTADE (fogo+vento)
  nature: { color: '#86efac', glow: '#dcfce7' }, // SEIVA (terra+água)
  magma: { color: '#fb923c', glow: '#fed7aa' }, // MAGMA (fogo+terra)
  mist: { color: '#cbd5e1', glow: '#f1f5f9' }, // NÉVOA (fogo+água)
  dust: { color: '#d6b88a', glow: '#f0e2c8' } // POEIRA (terra+vento)
};

/**
 * Resolve o elemento carimbado numa instância de item (effect 12–17) — tanto
 * para a arma principal quanto para o glifo de off-hand.
 */
const elementOfRef = (ref: string | null | undefined): WeaponElement | null => {
  if (!ref) return null;
  const item = resolveItemRef(ref);
  return elementOfItemInstance(item)?.element ?? null;
};

/**
 * Descobre a fusão ativa a partir das duas mãos equipadas.
 * Retorna null quando não há dois elementos distintos ou quando o par não
 * funde (ex.: sombrio+luz são rivais, ou mesmo elemento nas duas mãos).
 */
export const resolveFusion = (
  weaponRef: string | null | undefined,
  offRef: string | null | undefined
): ActiveFusion | null => {
  const a = elementOfRef(weaponRef);
  const b = elementOfRef(offRef);
  if (!a || !b || a === b) return null;

  const fusion = fusionOf(a, b);
  if (!fusion) return null;

  const palette = FUSION_COLORS[fusion.result] ?? { color: '#c4b5fd', glow: '#ede9fe' };

  // Tier visual pelo poder do glifo (off-hand): <25 T1, <50 T2, 50+ T3.
  const offItem = offRef ? resolveItemRef(offRef) : undefined;
  // Poder vem do catálogo de glifos (raridade) quando disponível; senão, do
  // elemento carimbado na instância. Glifos neutros nunca chegam aqui (b=null).
  const glyphDef = offRef ? getGlyph(offRef) : undefined;
  const offPower = glyphDef?.power ?? elementOfItemInstance(offItem)?.power ?? 25;
  const tier: 1 | 2 | 3 = offPower >= 50 ? 3 : offPower >= 25 ? 2 : 1;

  return { result: fusion.result, nameKey: fusion.nameKey, ...palette, tier };
};

/**
 * Ancora da aura em relação ao container do personagem (largura = size,
 * altura = size * 1.3). A aura envolve a arma da mão principal; por padrão
 * usa o mesmo ponto da mão do overlay de arma (IDs de idle em weaponOverlays).
 */
export const FUSION_AURA_ANCHORS: Record<Gender, Partial<Record<CharState, { x: number; y: number; r: number }>>> = {
  female: {
    idle: { x: 0.33, y: 0.5, r: 0.34 },
    attack: { x: 0.46, y: 0.46, r: 0.4 }
  },
  male: {
    idle: { x: 0.33, y: 0.5, r: 0.34 },
    attack: { x: 0.46, y: 0.46, r: 0.4 }
  }
};

export const resolveFusionAuraAnchor = (
  gender: Gender,
  state: CharState
): { x: number; y: number; r: number } =>
  FUSION_AURA_ANCHORS[gender]?.[state] ?? FUSION_AURA_ANCHORS[gender]?.idle ?? { x: 0.33, y: 0.5, r: 0.34 };

/** Bônus de dano da fusão ativa (fração 0–1; balanceável). Sem fusão = 0. */
export const FUSION_DAMAGE_BONUS = 0.1;
