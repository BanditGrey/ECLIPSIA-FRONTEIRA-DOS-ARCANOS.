type ProgressBarType = 'hp' | 'mp' | 'xp' | 'luck' | 'quest';

interface ProgressBarProps {
  current: number;
  max: number;
  type: ProgressBarType;
  showText?: boolean;
  className?: string;
}

const gradientClasses: Record<ProgressBarType, string> = {
  hp: 'bg-gradient-to-r from-red-950 via-red-600 to-red-400 shadow-[0_0_10px_rgb(224_64_64_/_0.55)]',
  mp: 'bg-gradient-to-r from-blue-950 via-blue-600 to-sky-400 shadow-[0_0_10px_rgb(64_128_224_/_0.55)]',
  xp: 'bg-gradient-to-r from-yellow-800 via-amber-500 to-yellow-300 shadow-[0_0_10px_rgb(240_192_74_/_0.55)]',
  luck: 'bg-gradient-to-r from-purple-950 via-purple-600 to-fuchsia-400 shadow-[0_0_10px_rgb(168_85_247_/_0.55)]',
  quest: 'bg-gradient-to-r from-amber-700 via-gold-500 to-gold-300 shadow-[0_0_10px_rgb(240_192_74_/_0.5)]'
};

export const ProgressBar = ({ current, max, type, showText = false, className = '' }: ProgressBarProps) => {
  const safeMax = Math.max(1, max);
  const safeCurrent = Math.min(Math.max(0, current), safeMax);
  const percent = Math.round((safeCurrent / safeMax) * 100);

  return (
    <div
      className={[
        'relative h-3 overflow-hidden rounded-full border border-night-600 bg-night-900 shadow-[inset_0_2px_6px_rgb(0_0_0_/_0.6)]',
        className
      ].join(' ')}
    >
      <div
        className={['h-full rounded-full transition-all duration-300', gradientClasses[type]].join(' ')}
        style={{ width: `${percent}%` }}
      />
      {showText && (
        <span className="absolute inset-0 flex items-center justify-center font-mono text-[10px] font-bold leading-none text-game-text drop-shadow">
          {safeCurrent}/{safeMax}
        </span>
      )}
    </div>
  );
};
