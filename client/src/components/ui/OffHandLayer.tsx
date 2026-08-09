import React from 'react';
import { resolveItemRef } from '../../utils/itemSerializer';
import { elementOfItemInstance } from '../../data/weaponElements';
import { getGlyph, GLYPH_ELEMENT_COLORS, NEUTRAL_GLYPH_COLOR, GLYPH_RARITY_COLORS } from '../../data/glyphs';
import { tierOfItem } from '../../data/weaponTiers';
import { EFFECT } from '../../data/effectRegistry';

/** Visual exclusivo da mão secundária: glifos selam o segundo elemento. */
export interface OffHandVisual {
  kind: 'glyph';
  element: 'fire' | 'earth' | 'water' | 'wind' | 'dark' | 'light' | null;
  rarity?: string;
  tier?: string;
}

export function resolveOffHandVisual(offRef: string | null | undefined): OffHandVisual | null {
  if (!offRef) return null;
  const item = resolveItemRef(offRef);
  if (!item || item.weaponCategory !== 'glyph') return null;

  let upgrade = 0;
  const effects = item.effects as Record<string, unknown> | undefined;
  for (let i = 1; effects && i <= 10; i++) {
    if (Number(effects[`e${i}`]) === EFFECT.UPGRADE_LEVEL) {
      upgrade = Number(effects[`v${i}`]) || 0;
      break;
    }
  }
  const glyph = getGlyph(item.id);
  return {
    kind: 'glyph',
    element: glyph?.element ?? elementOfItemInstance(item)?.element ?? null,
    rarity: glyph?.rarity ?? item.rarity,
    tier: tierOfItem(item.rarity, upgrade),
  };
}

export const OffHandLayer: React.FC<{ visual: OffHandVisual; size: number }> = ({ visual, size }) => {
  const width = size * 0.26;
  const element = visual.element || 'neutral';
  const core = visual.element ? GLYPH_ELEMENT_COLORS[visual.element].core : NEUTRAL_GLYPH_COLOR.core;
  const ring = visual.rarity ? (GLYPH_RARITY_COLORS[visual.rarity as keyof typeof GLYPH_RARITY_COLORS] ?? '#94a3b8') : '#94a3b8';

  return (
    <div
      className="pointer-events-none absolute z-10 select-none"
      aria-hidden="true"
      style={{
        width,
        height: width,
        left: size * 0.1,
        top: size * 0.52,
        animation: 'ohGlyphFloat 3s ease-in-out infinite',
        filter: `drop-shadow(0 0 ${size * 0.06}px ${core}) drop-shadow(0 0 2px ${ring})`,
      }}
    >
      <img src={`/assets/sprites/oh_glyph_${element}_${visual.tier || 't1'}.png`} alt="" className="h-full w-full object-contain" />
    </div>
  );
};

export default OffHandLayer;
