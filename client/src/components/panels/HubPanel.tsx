import { useI18n } from '../../hooks/useI18n';
import { wikiTranslations } from '../../i18n/wiki';
import { useGameStore } from '../../store/useGameStore';
import { usePetStore } from '../../store/usePetStore';
import { usePlayerStore } from '../../store/usePlayerStore';
import type { GamePanel } from '../../store/useGameStore';
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
    <div className="grid h-full grid-rows-[auto_1fr] gap-3 overflow-hidden bg-game-dark p-3 text-game-text">
      <section className="grid shrink-0 gap-3 rounded-xl border border-game-border bg-game-panel p-3">
        <div className="grid grid-cols-[1fr_auto_auto] items-center gap-3">
          <div className="grid gap-2">
            <ProgressBar current={player?.hp ?? 0} max={player?.maxHp ?? 1} type="hp" showText />
            <ProgressBar current={player?.mp ?? 0} max={player?.maxMp ?? 1} type="mp" showText />
          </div>
          <ImpulseDisplay />
          <button
            type="button"
            className="h-9 rounded-lg border border-game-border bg-game-card px-3 font-mono text-sm text-game-gold transition-colors hover:bg-game-hover active:scale-95"
            onClick={() => setScreen('wiki')}
          >
            {String(wiki.ui.open)}
          </button>
        </div>
        {hasPetOrMount && <PetDisplay />}
      </section>

      <section className="grid min-h-0 grid-cols-3 grid-rows-3 gap-3 overflow-hidden">
        {hubButtons.map((button) => (
          <button
            key={button.panel}
            type="button"
            className="flex flex-col items-center justify-center gap-2 rounded-xl border border-game-border bg-game-card font-title text-lg font-bold text-game-text transition-all hover:border-game-gold hover:bg-game-hover hover:text-game-gold active:scale-95"
            onClick={() => setPanel(button.panel)}
          >
            <span className="text-4xl">{button.icon}</span>
            <span>{t(button.labelKey)}</span>
          </button>
        ))}
      </section>
    </div>
  );
};
