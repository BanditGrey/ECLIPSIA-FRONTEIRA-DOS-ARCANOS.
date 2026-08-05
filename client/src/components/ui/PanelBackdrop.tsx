import React from 'react';

type Theme = 'ranking' | 'travel' | 'wiki';

interface Props {
  theme: Theme;
  className?: string;
}

/**
 * Overlay de fundo temático para paineis, usando gradientes CSS + orbes de luz.
 */
export const PanelBackdrop: React.FC<Props> = ({ theme, className = '' }) => {
  if (theme === 'ranking') {
    return (
      <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
        <div className="absolute bottom-0 left-[10%] top-0 w-32 bg-gradient-to-t from-gold-500/20 via-gold-400/5 to-transparent blur-sm" />
        <div className="absolute bottom-0 right-[10%] top-0 w-32 bg-gradient-to-t from-gold-500/20 via-gold-400/5 to-transparent blur-sm" />
        <div className="absolute bottom-0 left-[30%] top-0 w-16 bg-gradient-to-t from-gold-500/10 via-gold-400/5 to-transparent blur-sm" />
        <div className="absolute bottom-0 right-[30%] top-0 w-16 bg-gradient-to-t from-gold-500/10 via-gold-400/5 to-transparent blur-sm" />
        <div className="absolute left-1/2 top-0 h-full w-[60%] -translate-x-1/2 bg-gradient-to-b from-gold-300/10 via-transparent to-transparent blur-2xl" />
        <div className="absolute left-1/2 top-8 h-24 w-24 -translate-x-1/2 rounded-full bg-gold-400/20 blur-3xl" />
        <div className="absolute inset-0 bg-gradient-to-t from-night-950/90 via-night-950/40 to-night-950/70" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-gold-900/20 to-transparent" />
      </div>
    );
  }

  if (theme === 'travel') {
    return (
      <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
        <div className="absolute left-1/2 top-1/4 h-56 w-56 -translate-x-1/2 rounded-full bg-amber-500/15 blur-3xl" />
        <div className="absolute left-1/2 top-1/4 h-28 w-28 -translate-x-1/2 rounded-full bg-amber-300/20 blur-xl" />
        <div className="absolute bottom-0 left-0 right-0 h-60 bg-gradient-to-t from-emerald-950/80 via-emerald-900/30 to-transparent" />
        <div className="absolute bottom-20 left-0 right-0 h-40 bg-gradient-to-t from-night-950/90 to-transparent" style={{ clipPath: 'polygon(0 100%, 20% 60%, 40% 80%, 60% 45%, 75% 70%, 100% 55%, 100% 100%)' }} />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-teal-900/30 to-transparent blur-xl" />
        <div className="absolute inset-0 bg-gradient-to-t from-night-950/90 via-transparent to-night-950/60" />
      </div>
    );
  }

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <div className="absolute left-[15%] top-[20%] h-40 w-40 rounded-full bg-arcane-400/15 blur-3xl" />
      <div className="absolute right-[10%] top-[30%] h-56 w-56 rounded-full bg-purple-500/10 blur-3xl" />
      <div className="absolute left-[40%] bottom-[10%] h-48 w-48 rounded-full bg-gold-400/10 blur-3xl" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-arcane-400/30 to-transparent" />
      <div className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            radial-gradient(1px 1px at 20% 30%, rgba(240,192,74,0.6), transparent),
            radial-gradient(1px 1px at 70% 60%, rgba(63,217,196,0.5), transparent),
            radial-gradient(1px 1px at 40% 80%, rgba(168,85,247,0.4), transparent),
            radial-gradient(1px 1px at 85% 20%, rgba(240,192,74,0.5), transparent),
            radial-gradient(1px 1px at 10% 70%, rgba(63,217,196,0.4), transparent)
          `,
          backgroundSize: '240px 240px',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-night-950/70 via-transparent to-night-950/50" />
    </div>
  );
};

export default PanelBackdrop;
