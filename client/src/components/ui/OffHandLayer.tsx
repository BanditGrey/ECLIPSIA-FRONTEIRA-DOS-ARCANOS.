import React from 'react';
import { resolveItemRef } from '../../utils/itemSerializer';
import { elementOfItemInstance } from '../../data/weaponElements';
import { getGlyph, GLYPH_ELEMENT_COLORS, NEUTRAL_GLYPH_COLOR, GLYPH_RARITY_COLORS } from '../../data/glyphs';

/**
 * OFF-HAND LAYER (visual do slot de mão secundária)
 * -------------------------------------------------
 * Renderiza a sprite da mão secundária usando imagens PNG:
 *  - ESCUDO: oh_shield.png
 *  - GLIFO: oh_glyph_<elemento>.png (ou oh_glyph_neutral.png)
 */

export interface OffHandVisual {
  kind: 'shield' | 'glyph';
  element?: 'fire' | 'earth' | 'water' | 'wind' | 'dark' | 'light' | null;
  rarity?: string;
}

export function resolveOffHandVisual(offRef: string | null | undefined): OffHandVisual | null {
  if (!offRef) return null;
  const item = resolveItemRef(offRef);
  if (!item) return null;
  const cat = item.weaponCategory;
  if (cat === 'glyph') {
    const glyph = getGlyph(item.id);
    return {
      kind: 'glyph',
      element: glyph?.element ?? elementOfItemInstance(item)?.element ?? null,
      rarity: glyph?.rarity ?? item.rarity
    };
  }
  if (cat === 'shield') return { kind: 'shield' };
  return null;
}

interface Props {
  visual: OffHandVisual;
  size: number;
}

export const OffHandLayer: React.FC<Props> = ({ visual, size }) => {
  const w = size * 0.26;
  const h = size * 0.3;
  const left = size * 0.1;
  const top = size * 0.52;

  let spritePath = '';
  if (visual.kind === 'shield') {
    spritePath = '/assets/sprites/oh_shield.png';
  } else {
    const el = visual.element || 'neutral';
    spritePath = `/assets/sprites/oh_glyph_${el}.png`;
  }

  const glowColor = visual.kind === 'glyph' ? 
      ((visual.element ? GLYPH_ELEMENT_COLORS[visual.element as keyof typeof GLYPH_ELEMENT_COLORS] : NEUTRAL_GLYPH_COLOR).core) 
      : undefined;

  const ringColor = visual.kind === 'glyph' && visual.rarity ? 
      (GLYPH_RARITY_COLORS[visual.rarity as keyof typeof GLYPH_RARITY_COLORS] ?? '#94a3b8')
      : undefined;

  return (
    <div
      className="pointer-events-none absolute z-10 select-none"
      style={{
        width: w,
        height: visual.kind === 'shield' ? h : w,
        left,
        top,
        animation: visual.kind === 'glyph' ? 'ohGlyphFloat 3s ease-in-out infinite' : 'ohShieldIdle 4s ease-in-out infinite',
        filter: visual.kind === 'glyph' ? `drop-shadow(0 0 ${size * 0.06}px ${glowColor}) drop-shadow(0 0 2px ${ringColor})` : undefined
      }}
    >
      <img src={spritePath} alt="Off-hand" className="h-full w-full object-contain" />
    </div>
  );
};

export default OffHandLayer;
