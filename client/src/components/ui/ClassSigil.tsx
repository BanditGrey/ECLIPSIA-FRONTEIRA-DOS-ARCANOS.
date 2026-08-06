import { useId } from 'react';
import type { ArchetypeId } from '../../data/archetypes';

interface ClassSigilProps {
  archetype: ArchetypeId;
  size?: number;
  className?: string;
  glow?: 'gold' | 'arcane' | 'violet';
}

/**
 * Sigilo de classe — insígnia renderizada como Sprite PNG (Gerada pelo script de assets).
 * Estilo "heráldica arcana": traço dourado sobre disco noturno.
 */
export const ClassSigil = ({ archetype, size = 96, className = '', glow = 'gold' }: ClassSigilProps) => {
  const getGlowColor = () => {
    switch(glow) {
        case 'arcane': return 'rgb(63, 217, 196)';
        case 'violet': return 'rgb(167, 139, 250)';
        default: return 'rgb(240, 192, 74)';
    }
  };

  return (
    <div
      className={className}
      style={{ 
          width: size, 
          height: size, 
          filter: `drop-shadow(0 0 ${size / 9}px ${getGlowColor()}) opacity(0.35)`,
          display: 'inline-block' 
      }}
      role="img"
      aria-label={`sigil-${archetype}`}
    >
        <img 
            src={`/assets/sprites/sigil_${archetype}.png`} 
            alt={archetype}
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
        />
    </div>
  );
};
