import { useI18n } from '../../hooks/useI18n';
import { wikiTranslations } from '../../i18n/wiki';
import { useGameStore } from '../../store/useGameStore';
import { usePetStore } from '../../store/usePetStore';
import { usePlayerStore } from '../../store/usePlayerStore';
import type { GamePanel } from '../../store/useGameStore';
import { ART } from '../../data/art';
import { ImpulseDisplay } from '../ui/ImpulseDisplay';
import { PetDisplay } from '../ui/PetDisplay';
import { ProgressBar } from '../ui/ProgressBar';

const hubButtons: Array<{ icon: string; labelKey: string; panel: GamePanel }> = [
  { icon: '🗺', labelKey: 'hub.travel', panel: 'travel' },
  { icon: '⚔', labelKey: 'hub.hunt', panel: 'combat' },
  { icon: '🏰', labelKey: 'hub.city', panel: 'city' },
  { icon: '🎒', labelKey: 'hub.items', panel: 'items' },
  { icon: '👤', labelKey: 'hub.profile', panel: 'profile' },
  { icon: '📜', labelKey: 'hub.quests', panel: 'quest' },
  { icon: '🏆', labelKey: 'hub.ranking', panel: 'ranking' },
  { icon: '👥', labelKey: 'hub.guild', panel: 'guild' },
  { icon: '💬', labelKey: 'hub.chat', panel: 'chat' }
];

export const HubPanel = () => {
  const { lang, t } = useI18n();
  const wiki = wikiTranslations[lang];
  const player = usePlayerStore((state) => state.data);
  const setPanel = useGameStore((state) => state.setPanel);
  const setScreen = useGameStore((state) => state.setScreen);
  const activePetId = usePetStore((state) => state.activePetId);
  const hasPetOrMount = Boolean(activePetId || player?.equipment.pet || player?.equipment.mount);

  return (
    <div className="grid h-full grid-rows-[auto_1fr] gap-3 overflow-hidden p-3 text-game-text">
      {/* Faixa hero: a cidade ao fundo */}
      <section className="relative shrink-0 overflow-hidden rounded-xl border border-night-600 shadow-panel">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${ART.bg.hub})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-night-950/92 via-night-950/70 to-night-950/40" />
        <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-gold-400/70 to-transparent" />

        <div className="relative grid gap-3 p-4">
          <div className="grid grid-cols-[1fr_auto_auto] items-center gap-3">
            <div className="min-w-0">
              <h2 className="title-gold text-glow truncate font-title text-xl font-black tracking-wide">
                {player?.name ?? '—'}
              </h2>
              <p className="font-mono text-xs text-game-muted">
                {t('game.lvl')} {player?.level ?? 0}
                {player?.activeTitle && <span className="ml-2 italic text-gold-400/90">{player.activeTitle}</span>}
              </p>
            </div>
            <ImpulseDisplay />
            <button
              type="button"
              className="icon-tile h-9 rounded-lg px-3 font-mono text-xs text-game-muted transition-all hover:text-gold-300 active:scale-95"
              onClick={() => setScreen('wiki')}
            >
              {String(wiki.ui.open)}
            </button>
          </div>

          <div className="grid max-w-md gap-1.5">
            <ProgressBar current={player?.hp ?? 0} max={player?.maxHp ?? 1} type="hp" showText />
            <ProgressBar current={player?.mp ?? 0} max={player?.maxMp ?? 1} type="mp" showText />
          </div>

          {hasPetOrMount && <PetDisplay />}
        </div>
      </section>

      {/* Atalhos */}
      <section className="grid min-h-0 grid-cols-3 grid-rows-3 gap-3 overflow-hidden">
        {hubButtons.map((button) => (
          <button
            key={button.panel}
            type="button"
            className="group relative flex flex-col items-center justify-center gap-2 overflow-hidden rounded-xl border border-night-600 bg-gradient-to-b from-night-700/70 to-night-900/90 font-title text-sm font-bold text-game-text transition-all duration-200 hover:-translate-y-0.5 hover:border-gold-600/70 hover:shadow-glow-sm active:scale-95"
            onClick={() => setPanel(button.panel)}
          >
            <span className="pointer-events-none absolute inset-x-6 top-0 h-[2px] bg-gradient-to-r from-transparent via-gold-400/0 to-transparent transition-all group-hover:via-gold-400/80" />
            <span className="icon-tile text-2xl leading-none transition-transform group-hover:scale-110" style={{ width: 52, height: 52 }}>
              {button.icon}
            </span>
            <span className="transition-colors group-hover:text-gold-300">{t(button.labelKey)}</span>
          </button>
        ))}
      </section>
    </div>
  );
};
