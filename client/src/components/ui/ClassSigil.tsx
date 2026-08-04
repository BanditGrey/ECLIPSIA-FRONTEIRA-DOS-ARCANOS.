import { useId } from 'react';
import type { ArchetypeId } from '../../data/archetypes';

interface ClassSigilProps {
  archetype: ArchetypeId;
  size?: number;
  className?: string;
  glow?: 'gold' | 'arcane' | 'violet';
}

/**
 * Sigilo de classe — insígnia SVG desenhada para cada arquétipo.
 * Estilo "heráldica arcana": traço dourado sobre disco noturno.
 */
export const ClassSigil = ({ archetype, size = 96, className = '', glow = 'gold' }: ClassSigilProps) => {
  const uid = useId().replace(/:/g, '');
  const stroke = `url(#sig-${uid})`;
  const accentColor = glow === 'arcane' ? '#3fd9c4' : glow === 'violet' ? '#a78bfa' : '#fbe8b7';

  const common = {
    fill: 'none',
    stroke,
    strokeWidth: 4,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const
  };

  const renderGlyph = () => {
    switch (archetype) {
      case 'blade':
        return (
          <g>
            {/* lâmina */}
            <path d="M50 12 L50 54" {...common} />
            <path d="M50 8 L56 22 L50 32 L44 22 Z" fill={stroke} stroke="none" />
            {/* guarda */}
            <path d="M30 48 L70 48" {...common} />
            <circle cx="30" cy="48" r="3" fill={stroke} stroke="none" />
            <circle cx="70" cy="48" r="3" fill={stroke} stroke="none" />
            {/* cabo */}
            <path d="M50 54 L50 70" {...common} />
            <circle cx="50" cy="78" r="5" fill={stroke} stroke="none" />
            <path d="M50 62 L38 70 M50 62 L62 70" {...common} strokeWidth={2.5} />
          </g>
        );

      case 'arcane':
        return (
          <g>
            <circle cx="50" cy="50" r="15" {...common} />
            <path d="M50 36 L58 50 L50 64 L42 50 Z" fill={stroke} stroke="none" />
            <ellipse cx="50" cy="50" rx="33" ry="11" {...common} transform="rotate(-22 50 50)" strokeWidth={2.5} />
            <ellipse cx="50" cy="50" rx="11" ry="33" {...common} transform="rotate(24 50 50)" strokeWidth={2.5} />
            <circle cx="78" cy="32" r="3.5" fill={accentColor} stroke="none" />
            <circle cx="26" cy="68" r="3.5" fill={accentColor} stroke="none" />
          </g>
        );

      case 'druid':
        return (
          <g>
            <path d="M50 86 C 18 62 22 28 50 12 C 78 28 82 62 50 86 Z" {...common} />
            <path d="M50 82 L50 22" {...common} strokeWidth={2.5} />
            <path d="M50 64 L36 52 M50 46 L64 36" {...common} strokeWidth={2.5} />
            <circle cx="40" cy="84" r="3" fill={accentColor} stroke="none" />
            <circle cx="60" cy="84" r="3" fill={accentColor} stroke="none" />
          </g>
        );

      case 'vanguard':
        return (
          <g>
            <path d="M50 10 L82 22 L82 52 C 82 72 68 86 50 94 C 32 86 18 72 18 52 L18 22 Z" {...common} />
            <path d="M36 46 L50 60 L64 46" {...common} strokeWidth={3} />
            <path d="M50 60 L50 80" {...common} strokeWidth={3} />
            <circle cx="50" cy="86" r="3" fill={accentColor} stroke="none" />
          </g>
        );

      case 'ranger':
        return (
          <g>
            <path d="M20 18 C 8 52 20 84 42 94" {...common} strokeWidth={3.5} />
            <path d="M80 18 C 92 52 80 84 58 94" {...common} strokeWidth={3.5} />
            <path d="M24 24 L76 24" {...common} strokeWidth={2} />
            <path d="M34 68 L68 40" {...common} strokeWidth={4} />
            <path d="M68 40 L58 42 L64 32 Z" fill={stroke} stroke="none" />
            <path d="M34 68 L26 74 M34 68 L30 78" {...common} strokeWidth={2} />
          </g>
        );

      case 'spectre':
        return (
          <g>
            <path d="M26 26 L50 50" {...common} strokeWidth={3.5} />
            <path d="M74 26 L50 50" {...common} strokeWidth={3.5} />
            <circle cx="50" cy="50" r="6.5" {...common} />
            <path d="M50 56 L62 72 M50 56 L38 72" {...common} strokeWidth={3.5} />
            <path d="M40 14 q4 -6 8 0 q4 6 8 0" {...common} strokeWidth={2.5} />
          </g>
        );

      default:
        return null;
    }
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      style={{ filter: `drop-shadow(0 0 ${size / 9}px rgb(240 192 74 / 0.35))`, display: 'block' }}
      role="img"
      aria-label={`sigil-${archetype}`}
    >
      <defs>
        <linearGradient id={`sig-${uid}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fbe8b7" />
          <stop offset="55%" stopColor="#f0c04a" />
          <stop offset="100%" stopColor="#b57f1c" />
        </linearGradient>
        <radialGradient id={`disc-${uid}`} cx="50%" cy="32%" r="75%">
          <stop offset="0%" stopColor="#1c2948" />
          <stop offset="60%" stopColor="#0c1326" />
          <stop offset="100%" stopColor="#070b16" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill={`url(#disc-${uid})`} />
      <circle cx="50" cy="50" r="44" fill="none" stroke={stroke} strokeWidth="1.6" opacity="0.75" />
      <circle cx="50" cy="50" r="39.5" fill="none" stroke={stroke} strokeWidth="0.8" opacity="0.4" strokeDasharray="2 5" />
      {renderGlyph()}
    </svg>
  );
};
