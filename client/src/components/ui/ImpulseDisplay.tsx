import { usePetStore } from '../../store/usePetStore';
import { usePlayerStore } from '../../store/usePlayerStore';
import { useI18n } from '../../hooks/useI18n';

type PlayerWithImpulse = {
  impulseCharges?: number;
  charges?: number;
  impulse?: {
    charges?: number;
    active?: boolean;
  };
};

export const ImpulseDisplay = () => {
  const { t } = useI18n();
  const player = usePlayerStore((state) => state.data);
  const activePetId = usePetStore((state) => state.activePetId);
  const impulseData = player as (typeof player & PlayerWithImpulse);
  const charges = impulseData?.impulse?.charges ?? impulseData?.impulseCharges ?? impulseData?.charges ?? 0;
  const isActive = Boolean(impulseData?.impulse?.active || charges > 0 || activePetId);

  return (
    <div
      className={[
        'flex h-9 items-center gap-2 rounded-lg border bg-game-card px-3 font-mono text-sm text-game-text',
        isActive ? 'border-game-gold shadow-[0_0_12px_rgb(240_192_64_/_0.25)]' : 'border-game-border'
      ].join(' ')}
      title={t('impulse.charges')}
    >
      <span className={isActive ? 'anim-pulse text-game-gold' : 'text-game-muted'}>⚡</span>
      <span>{charges}</span>
    </div>
  );
};
