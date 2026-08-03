type ProgressBarType = 'hp' | 'mp' | 'xp' | 'luck' | 'quest';

interface ProgressBarProps {
  current: number;
  max: number;
  type: ProgressBarType;
  showText?: boolean;
  className?: string;
}

const colorClasses: Record<ProgressBarType, string> = {
  hp: 'bg-bar-hp',
  mp: 'bg-bar-mp',
  xp: 'bg-bar-xp',
  luck: 'bg-bar-luck',
  quest: 'bg-game-gold'
};

export const ProgressBar = ({ current, max, type, showText = false, className = '' }: ProgressBarProps) => {
  const safeMax = Math.max(1, max);
  const safeCurrent = Math.min(Math.max(0, current), safeMax);
  const percent = Math.round((safeCurrent / safeMax) * 100);

  return (
    <div className={["relative h-3 overflow-hidden rounded-full border border-game-border bg-game-dark", className].join(' ')}>
      <div
        className={["h-full rounded-full transition-all duration-300", colorClasses[type]].join(' ')}
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
