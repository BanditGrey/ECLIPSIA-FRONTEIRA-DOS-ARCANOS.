import React from 'react';

/**
 * ÍCONES ARCANOS (Sprites PNG) — substituem SVGs nos botões/HUD principais.
 * Usam uma máscara CSS para herdar a cor atual do texto (currentColor).
 */
export type ArcaneIconName =
  | 'sword' | 'shield' | 'magic' | 'flee' | 'auto' | 'advance'
  | 'gem' | 'coin' | 'mail' | 'chest' | 'map' | 'star' | 'quest'
  | 'bag' | 'tower' | 'scroll' | 'flame' | 'potion' | 'soul'
  | 'guild' | 'party' | 'hub' | 'profile' | 'market' | 'hammer'
  | 'settings' | 'volume' | 'muted';

interface ArcaneIconProps {
  name: ArcaneIconName;
  size?: number;
  className?: string;
  glow?: boolean;
  strokeWidth?: number;
}

export const ArcaneIcon: React.FC<ArcaneIconProps> = ({ name, size = 20, className = '', glow = false }) => {
  return (
    <div
      className={`inline-block shrink-0 ${glow ? 'animate-[eclipsiaPulseGlow_2s_ease-in-out_infinite]' : ''} ${className}`}
      style={{
        width: size,
        height: size,
        backgroundColor: 'currentColor',
        WebkitMaskImage: `url(/assets/sprites/arcane_icon_${name}.png)`,
        WebkitMaskSize: 'contain',
        WebkitMaskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center',
        maskImage: `url(/assets/sprites/arcane_icon_${name}.png)`,
        maskSize: 'contain',
        maskRepeat: 'no-repeat',
        maskPosition: 'center',
      }}
      aria-hidden="true"
    />
  );
};

export default ArcaneIcon;
