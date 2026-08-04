import { useI18n } from '../../hooks/useI18n';
import { useGameStore } from '../../store/useGameStore';
import { usePlayerStore } from '../../store/usePlayerStore';

export const Header = () => {
  const { t } = useI18n();
  const player = usePlayerStore((state) => state.data);
  const openModal = useGameStore((state) => state.openModal);

  return (
    <header className="flex h-header shrink-0 items-center justify-between border-b border-game-border bg-game-primary px-4">
      <div className="font-title text-lg font-black tracking-widest text-game-gold">⚔ {t('game.title')}</div>

      <div className="min-w-0 flex-1 px-4 text-center">
        {player && (
          <div className="truncate font-mono text-sm text-game-text">
            <span>{player.name}</span>
            <span className="mx-2 text-game-muted">•</span>
            <span>
              {t('game.lvl')} {player.level}
            </span>
            {player.activeTitle && (
              <>
                <span className="mx-2 text-game-muted">•</span>
                <span className="text-game-gold">{player.activeTitle}</span>
              </>
            )}
          </div>
        )}
      </div>

      <div className="flex items-center gap-3 font-mono text-sm">
        <span className="text-game-gold">
          {t('header.gold')}: {player?.gold ?? 0}
        </span>
        <span className="text-cyan-300" title={t('header.crystalsHint')}>
          💎 {player?.crystals ?? 0}
        </span>
        <button
          type="button"
          className="flex h-8 w-8 items-center justify-center rounded-md border border-game-border bg-game-card transition-colors hover:bg-game-hover active:scale-95"
          onClick={() => openModal('modal-settings')}
          aria-label={t('header.settings')}
        >
          ⚙
        </button>
      </div>
    </header>
  );
};
