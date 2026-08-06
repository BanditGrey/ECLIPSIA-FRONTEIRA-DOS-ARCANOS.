import React from 'react';
import { resolveItemRef } from '../../utils/itemSerializer';
import { elementOfItemInstance } from '../../data/weaponElements';
import { getGlyph, GLYPH_ELEMENT_COLORS, NEUTRAL_GLYPH_COLOR, GLYPH_RARITY_COLORS } from '../../data/glyphs';

/**
 * OFF-HAND LAYER (visual do slot de mão secundária)
 * -------------------------------------------------
 * Desenha um SVG simples para o item da mão secundária:
 *  - ESCUDO: brasão metálico.
 *  - GLIFO: selo elemental que gira/pulsa, com cor do elemento (ou cinza
 *    para glifos NEUTROS). O aro usa a cor da raridade.
 * Sem sprites novas — tudo em SVG, combina com qualquer armadura/gênero.
 */

export interface OffHandVisual {
  kind: 'shield' | 'glyph';
  element?: 'fire' | 'earth' | 'water' | 'wind' | 'dark' | 'light' | null;
  rarity?: string;
}

/** Descobre o que renderizar no slot off-hand a partir da itemRef. */
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

const Glyph: React.FC<{ color: { core: string; edge: string }; rarity: string }> = ({ color, rarity }) => {
  const ring = GLYPH_RARITY_COLORS[rarity as keyof typeof GLYPH_RARITY_COLORS] ?? '#94a3b8';
  const gradId = `g-${color.core.replace('#', '')}`;
  return (
    <svg viewBox="0 0 64 64" className="h-full w-full" aria-hidden>
      <defs>
        <radialGradient id={gradId} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={color.edge} stopOpacity="0.95" />
          <stop offset="55%" stopColor={color.core} stopOpacity="0.85" />
          <stop offset="100%" stopColor={color.core} stopOpacity="0.1" />
        </radialGradient>
      </defs>
      <circle cx="32" cy="32" r="27" fill="none" stroke={ring} strokeWidth="2.5" opacity="0.9" />
      <circle cx="32" cy="32" r="23" fill={`url(#${gradId})`} />
      <g fill="none" stroke={color.edge} strokeWidth="2" strokeLinecap="round" opacity="0.9">
        <path d="M32 12 L32 52 M12 32 L52 32 M18 18 L46 46 M46 18 L18 46" />
      </g>
      <circle cx="32" cy="32" r="5" fill={color.edge} />
    </svg>
  );
};

const Shield: React.FC = () => (
  <svg viewBox="0 0 64 72" className="h-full w-full" aria-hidden>
    <defs>
      <linearGradient id="oh-shield" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#e2e8f0" />
        <stop offset="55%" stopColor="#94a3b8" />
        <stop offset="100%" stopColor="#475569" />
      </linearGradient>
    </defs>
    <path
      d="M32 4 L56 14 V36 C56 52 45 64 32 68 C19 64 8 52 8 36 V14 Z"
      fill="url(#oh-shield)"
      stroke="#fcd34d"
      strokeWidth="2.5"
    />
    <path d="M32 14 L46 20 V34 C46 44 40 52 32 56 C24 52 18 44 18 34 V20 Z" fill="#1e293b" opacity="0.55" />
    <path d="M32 20 L40 24 V34 C40 40 36 45 32 48 C28 45 24 40 24 34 V24 Z" fill="#fcd34d" opacity="0.85" />
  </svg>
);

interface Props {
  visual: OffHandVisual;
  size: number;
}

/**
 * Camada do item da mão secundária. Posicionada no lado ESQUERDO do container
 * (a arma principal fica à direita), relativa à largura/altura do personagem.
 */
export const OffHandLayer: React.FC<Props> = ({ visual, size }) => {
  const w = size * 0.26;
  const h = size * 0.3;
  const left = size * 0.1;
  const top = size * 0.52;

  return (
    <div
      className="pointer-events-none absolute z-10 select-none"
      style={{
        width: w,
        height: visual.kind === 'shield' ? h : w,
        left,
        top,
        animation: visual.kind === 'glyph' ? 'ohGlyphFloat 3s ease-in-out infinite' : 'ohShieldIdle 4s ease-in-out infinite',
        filter: visual.kind === 'glyph' ? `drop-shadow(0 0 ${size * 0.06}px var(--oh-glow, #a78bfa))` : undefined
      }}
    >
      {visual.kind === 'shield' ? (
        <Shield />
      ) : (
        <div
          style={
            {
              '--oh-glow': (visual.element
                ? GLYPH_ELEMENT_COLORS[visual.element as keyof typeof GLYPH_ELEMENT_COLORS]
                : NEUTRAL_GLYPH_COLOR
              ).core
            } as React.CSSProperties
          }
          className="h-full w-full"
        >
          <Glyph
            color={
              visual.element
                ? GLYPH_ELEMENT_COLORS[visual.element as keyof typeof GLYPH_ELEMENT_COLORS]
                : NEUTRAL_GLYPH_COLOR
            }
            rarity={visual.rarity ?? 'common'}
          />
        </div>
      )}
    </div>
  );
};

export default OffHandLayer;
