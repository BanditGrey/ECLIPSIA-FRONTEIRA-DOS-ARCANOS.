import { useI18n } from '../../hooks/useI18n';
import { useGameStore } from '../../store/useGameStore';
import { usePlayerStore } from '../../store/usePlayerStore';
import { ART } from '../../data/art';
import { ArcaneIcon } from '../ui/ArcaneIcon';

export const Header = () => {
  const { t } = useI18n();
  const player = usePlayerStore((state) => state.data);
  const openModal = useGameStore((state) => state.openModal);

  return (
    <header className="relative flex h-header shrink-0 items-center justify-between border-b border-night-700 bg-night-900/85 px-4 backdrop-blur">
      <div className="flex min-w-0 items-center gap-2">
        <img src={ART.emblem} alt="" className="h-7 w-7 rounded-full opacity-90" draggable={false} />
        <span className="title-gold text-glow truncate font-title text-base font-black tracking-[0.18em]">
          {t('game.title')}
        </span>
      </div>

      <div className="min-w-0 flex-1 px-4 text-center">
        {player && (
          <div className="flex items-center justify-center gap-2 truncate font-mono text-sm text-game-text">
            <span className="truncate text-game-text">{player.name}</span>
            <span className="chip !px-2 !py-0 text-[10px] text-gold-300">
              {t('game.lvl')} {player.level}
            </span>
            {player.activeTitle && (
              <span className="hidden truncate italic text-gold-400/90 sm:inline">{player.activeTitle}</span>
            )}
          </div>
        )}
      </div>

      <div className="flex shrink-0 items-center gap-2 font-mono text-sm">
        <span className="chip gap-1 text-gold-300" title={t('header.gold')}>
          <ArcaneIcon name="coin" size={15} glow />
          <span className="tabular-nums">{player?.gold ?? 0}</span>
        </span>
        <button type="button" className="chip gap-1 text-arcane-300 hover:text-cyan-300 transition-colors" title={t('header.crystalsHint')} onClick={() => openModal('modal-shop')}>
          <ArcaneIcon name="gem" size={15} glow />
          <span className="tabular-nums">{player?.crystals ?? 0}</span>
        </button>
        <button
          type="button"
          className="icon-tile grid h-8 w-8 place-items-center rounded-lg text-game-muted transition-all hover:text-gold-300 active:scale-95"
          onClick={() => openModal('modal-settings')}
          aria-label={t('header.settings')}
        >
          <ArcaneIcon name="settings" size={17} />
        </button>
      </div>
    </header>
  );
};
