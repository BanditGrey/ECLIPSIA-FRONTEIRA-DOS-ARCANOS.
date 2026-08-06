/**
 * GLIFOS (off-hand) — coleção de selos elementais
 * -----------------------------------------------
 * Glifos são itens de mão secundária que selam um SEGUNDO elemento na arma
 * principal. Quando a arma já tem um elemento diferente e o par funde,
 * nasce uma aura elemental ao redor da lâmina (sem trocar a arte da arma).
 *
 * RARIDADES:
 *   - common    : poder 15  → aura T1, bônus pequeno
 *   - uncommon  : poder 25  → aura T2
 *   - rare      : poder 35  → aura T2/T3
 *   - epic      : poder 50  → aura T3
 *   - legendary : poder 70  → aura T3, bônus forte
 *   - relic    : poder 90  → aura T3, bônus muito forte (acima de lendário)
 *
 * ELEMENTO NEUTRO (element: null): glifo sem elemento — NÃO cria fusão.
 * Serve para builds que querem o bônus de stats do glifo sem se prender a
 * uma combinação elemental.
 */

import type { WeaponElement } from './weaponElements';

export type GlyphRarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary' | 'relic';

export interface GlyphEffect {
  /** ID do efeito (ver effectRegistry: ATK=1, DEF=2, HP=10, CRIT_CHANCE=21, DMG_BONUS=24...). */
  eid: number;
  /** Valor do efeito (flat para stats primários, percentual para combat). */
  value: number;
}

export interface GlyphDefinition {
  /** itemId no catálogo (ex.: 'gl_2250'). */
  itemId: string;
  /** Elemento selado; null = NEUTRO (sem fusão). */
  element: WeaponElement | null;
  rarity: GlyphRarity;
  /** Poder elemental (define o tier da aura: <25 T1, <50 T2, 50+ T3). */
  power: number;
  /** Bônus concedidos pelo glifo. */
  effects: GlyphEffect[];
}

/** Poder elemental por raridade. */
export const GLYPH_POWER: Record<GlyphRarity, number> = {
  common: 15,
  uncommon: 25,
  rare: 35,
  epic: 50,
  legendary: 70,
  relic: 90
};

/** Cor/identidade visual do glifo na UI (sem depender do elemento). */
export const GLYPH_RARITY_COLORS: Record<GlyphRarity, string> = {
  common: '#94a3b8',
  uncommon: '#22c55e',
  rare: '#3b82f6',
  epic: '#a855f7',
  legendary: '#f59e0b',
  relic: '#f43f5e'
};

/**
 * Catálogo de glifos.
 *
 * Padrão de IDs (off-hand = 2250-2299):
 *   Elementais (6 elementos × raridades) — veja GLYPH_ELEMENT_IDS.
 *   Neutros 2280-2299.
 *
 * Efeitos usados:
 *   1  ATK (flat), 2 DEF (flat), 10 HP (flat), 11 MP (flat),
 *   21 CRIT_CHANCE (%), 22 CRIT_DMG (%), 24 DMG_BONUS (%),
 *   25 DEF_BONUS (%), 31 SKILL_DMG (%), 27 XP_BONUS (%), 28 GOLD_BONUS (%)
 */
export const GLYPHS: GlyphDefinition[] = [
  // ── Elementais: FOGO ──
  { itemId: 'gl_2240', element: 'fire', rarity: 'common', power: 15, effects: [{ eid: 1, value: 4 }] },
  { itemId: 'gl_2250', element: 'fire', rarity: 'rare', power: 35, effects: [{ eid: 1, value: 8 }, { eid: 22, value: 6 }] },
  { itemId: 'gl_2260', element: 'fire', rarity: 'epic', power: 50, effects: [{ eid: 24, value: 5 }] },
  { itemId: 'gl_2270', element: 'fire', rarity: 'legendary', power: 70, effects: [{ eid: 24, value: 8 }, { eid: 22, value: 10 }] },
  { itemId: 'gl_2290', element: 'fire', rarity: 'relic', power: 90, effects: [{ eid: 24, value: 10 }, { eid: 40, value: 12 }] },

  // ── Elementais: TERRA ──
  { itemId: 'gl_2241', element: 'earth', rarity: 'common', power: 15, effects: [{ eid: 2, value: 4 }] },
  { itemId: 'gl_2251', element: 'earth', rarity: 'rare', power: 35, effects: [{ eid: 2, value: 8 }, { eid: 25, value: 4 }] },
  { itemId: 'gl_2261', element: 'earth', rarity: 'epic', power: 50, effects: [{ eid: 25, value: 6 }] },
  { itemId: 'gl_2271', element: 'earth', rarity: 'legendary', power: 70, effects: [{ eid: 25, value: 8 }, { eid: 10, value: 120 }] },
  { itemId: 'gl_2291', element: 'earth', rarity: 'relic', power: 90, effects: [{ eid: 25, value: 10 }, { eid: 39, value: 8 }] },

  // ── Elementais: ÁGUA ──
  { itemId: 'gl_2242', element: 'water', rarity: 'common', power: 15, effects: [{ eid: 11, value: 15 }] },
  { itemId: 'gl_2252', element: 'water', rarity: 'rare', power: 35, effects: [{ eid: 26, value: 5 }] },
  { itemId: 'gl_2262', element: 'water', rarity: 'epic', power: 50, effects: [{ eid: 26, value: 7 }] },
  { itemId: 'gl_2272', element: 'water', rarity: 'legendary', power: 70, effects: [{ eid: 26, value: 10 }, { eid: 34, value: 6 }] },
  { itemId: 'gl_2292', element: 'water', rarity: 'relic', power: 90, effects: [{ eid: 26, value: 12 }, { eid: 33, value: 8 }] },

  // ── Elementais: VENTO ──
  { itemId: 'gl_2243', element: 'wind', rarity: 'common', power: 15, effects: [{ eid: 4, value: 3 }] },
  { itemId: 'gl_2253', element: 'wind', rarity: 'rare', power: 35, effects: [{ eid: 21, value: 3 }] },
  { itemId: 'gl_2263', element: 'wind', rarity: 'epic', power: 50, effects: [{ eid: 21, value: 5 }, { eid: 32, value: 6 }] },
  { itemId: 'gl_2273', element: 'wind', rarity: 'legendary', power: 70, effects: [{ eid: 32, value: 10 }, { eid: 21, value: 5 }] },
  { itemId: 'gl_2293', element: 'wind', rarity: 'relic', power: 90, effects: [{ eid: 32, value: 14 }, { eid: 33, value: 8 }] },

  // ── Elementais: SOMBRIO ──
  { itemId: 'gl_2244', element: 'dark', rarity: 'common', power: 15, effects: [{ eid: 35, value: 5 }] },
  { itemId: 'gl_2254', element: 'dark', rarity: 'rare', power: 35, effects: [{ eid: 35, value: 8 }] },
  { itemId: 'gl_2264', element: 'dark', rarity: 'epic', power: 50, effects: [{ eid: 31, value: 6 }, { eid: 35, value: 6 }] },
  { itemId: 'gl_2274', element: 'dark', rarity: 'legendary', power: 70, effects: [{ eid: 31, value: 10 }, { eid: 40, value: 8 }] },
  { itemId: 'gl_2294', element: 'dark', rarity: 'relic', power: 90, effects: [{ eid: 31, value: 14 }, { eid: 37, value: 10 }] },

  // ── Elementais: LUZ ──
  { itemId: 'gl_2245', element: 'light', rarity: 'common', power: 15, effects: [{ eid: 9, value: 3 }] },
  { itemId: 'gl_2255', element: 'light', rarity: 'rare', power: 35, effects: [{ eid: 9, value: 6 }, { eid: 27, value: 5 }] },
  { itemId: 'gl_2265', element: 'light', rarity: 'epic', power: 50, effects: [{ eid: 27, value: 8 }, { eid: 28, value: 8 }] },
  { itemId: 'gl_2275', element: 'light', rarity: 'legendary', power: 70, effects: [{ eid: 27, value: 12 }, { eid: 29, value: 10 }] },
  { itemId: 'gl_2295', element: 'light', rarity: 'relic', power: 90, effects: [{ eid: 27, value: 15 }, { eid: 29, value: 15 }] },

  // ── NEUTROS (sem elemento, sem fusão — só bônus) ──
  { itemId: 'gl_2280', element: null, rarity: 'common', power: 15, effects: [{ eid: 1, value: 3 }, { eid: 2, value: 3 }] },
  { itemId: 'gl_2281', element: null, rarity: 'uncommon', power: 25, effects: [{ eid: 10, value: 60 }, { eid: 11, value: 20 }] },
  { itemId: 'gl_2282', element: null, rarity: 'rare', power: 35, effects: [{ eid: 24, value: 4 }] },
  { itemId: 'gl_2283', element: null, rarity: 'epic', power: 50, effects: [{ eid: 24, value: 5 }, { eid: 25, value: 5 }] },
  { itemId: 'gl_2284', element: null, rarity: 'legendary', power: 70, effects: [{ eid: 24, value: 6 }, { eid: 21, value: 4 }, { eid: 25, value: 6 }] },
  { itemId: 'gl_2285', element: null, rarity: 'relic', power: 90, effects: [{ eid: 24, value: 8 }, { eid: 31, value: 8 }, { eid: 27, value: 10 }] }
];

const BY_ID = new Map(GLYPHS.map((g) => [g.itemId, g]));

/** Busca um glifo pelo itemId. */
export const getGlyph = (itemId: string): GlyphDefinition | undefined => BY_ID.get(itemId);

/** Cor do elemento para o selo do glifo (usado pelo OffHandLayer). */
export const GLYPH_ELEMENT_COLORS: Record<WeaponElement, { core: string; edge: string }> = {
  fire: { core: '#f97316', edge: '#fde68a' },
  earth: { core: '#a16207', edge: '#fde68a' },
  water: { core: '#0ea5e9', edge: '#bae6fd' },
  wind: { core: '#22c55e', edge: '#bbf7d0' },
  dark: { core: '#7c3aed', edge: '#c4b5fd' },
  light: { core: '#facc15', edge: '#fef9c3' }
};

/** Cor do glifo neutro (cinza). */
export const NEUTRAL_GLYPH_COLOR = { core: '#94a3b8', edge: '#e2e8f0' };
