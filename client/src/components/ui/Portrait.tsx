import { ART, type ClassArtId, type BossArtId, type MonsterArtId } from '../../data/art';

interface PortraitProps {
  kind: 'class' | 'boss' | 'monster';
  id: string;
  size?: number;
  className?: string;
  /** Emoji de fallback quando não há pintura (ex.: bosses sem arte). */
  fallbackIcon?: string;
  /** Cor do anel. */
  ring?: 'gold' | 'red' | 'arcane';
  /** Escurece a imagem (ex.: boss em fundo claro). */
  dim?: boolean;
}

const ringClasses = {
  gold: 'border-gold-400/60 shadow-[0_0_22px_rgb(240_192_74_/_0.2)]',
  red: 'border-red-500/60 shadow-[0_0_22px_rgb(239_68_68_/_0.22)]',
  arcane: 'border-arcane-400/60 shadow-[0_0_22px_rgb(63_217_196_/_0.2)]'
} as const;

/**
 * Retrato emoldurado em anel de sigilo.
 * Usa a pintura quando existir (classes e alguns bosses); senão cai no
 * anel de sigilo com o emoji do ícone (consistente com o design system).
 */
export const Portrait = ({ kind, id, size = 96, className = '', fallbackIcon = '👾', ring = 'gold', dim = false }: PortraitProps) => {
  const map = kind === 'class' ? ART.classes : kind === 'boss' ? ART.bosses : ART.monsters;
  const src = (map as Record<string, string>)[id];
  const hasArt = Boolean(src);

  return (
    <div
      className={[
        'sigil-disc shrink-0 overflow-hidden',
        ringClasses[ring],
        className
      ].join(' ')}
      style={{ width: size, height: size }}
    >
      {hasArt ? (
        <img
          src={src as string}
          alt=""
          className={`h-full w-full object-cover ${dim ? 'opacity-80' : ''}`}
          loading="lazy"
          draggable={false}
        />
      ) : (
        <span className="text-3xl" style={{ fontSize: size * 0.38 }}>
          {fallbackIcon}
        </span>
      )}
    </div>
  );
};
