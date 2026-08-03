import { useI18n } from '../../hooks/useI18n';
import { usePetStore } from '../../store/usePetStore';
import { usePlayerStore } from '../../store/usePlayerStore';
import { ProgressBar } from './ProgressBar';

type PlayerWithMount = {
  mountData?: {
    exploreReduction?: number;
  };
};

export const PetDisplay = () => {
  const { t } = useI18n();
  const activePetId = usePetStore((state) => state.activePetId);
  const petState = usePetStore((state) => state.petState);
  const player = usePlayerStore((state) => state.data);
  const playerMount = player as (typeof player & PlayerWithMount);
  const activeMountId = player?.equipment.mount;
  const exploreReduction = playerMount?.mountData?.exploreReduction ?? 0;

  const petStatus = !petState
    ? t('pet.noActive')
    : !petState.isAlive
      ? t('combat.defeat')
      : petState.cooldown > 0
        ? `${t('pet.reviving')} ${petState.cooldown}`
        : t('pet.ready');

  return (
    <div className="grid gap-2 rounded-lg border border-game-border bg-game-card p-3 text-sm text-game-text">
      <div className="flex items-center justify-between gap-3">
        <strong className="font-title text-game-gold">{t('pet.title')}</strong>
        <span className="font-mono text-xs text-game-muted">{petStatus}</span>
      </div>

      {petState && activePetId ? (
        <div className="grid gap-1">
          <div className="flex items-center justify-between font-mono text-xs">
            <span>{activePetId}</span>
            <span>
              {t('pet.level')} {petState.level}
            </span>
          </div>
          <ProgressBar current={petState.hp} max={petState.maxHp} type="hp" showText />
          <ProgressBar current={petState.xp} max={petState.xpToNext} type="xp" showText />
        </div>
      ) : (
        <span className="font-mono text-xs text-game-muted">{t('pet.noActive')}</span>
      )}

      <div className="border-t border-game-border pt-2">
        <div className="flex items-center justify-between gap-3">
          <strong className="font-title text-game-gold">{t('mount.title')}</strong>
          <span className="font-mono text-xs text-game-muted">
            {activeMountId ? `${exploreReduction}% ${t('mount.exploreTime')}` : t('mount.noActive')}
          </span>
        </div>
      </div>
    </div>
  );
};
