import { useI18n } from '../../hooks/useI18n';
import { useGameStore } from '../../store/useGameStore';
import type { GamePanel } from '../../store/useGameStore';

const navItems: Array<{ panel: GamePanel; icon: string; labelKey: string }> = [
  { panel: 'hub', icon: '🏠', labelKey: 'nav.hub' },
  { panel: 'travel', icon: '🗺', labelKey: 'nav.travel' },
  { panel: 'combat', icon: '⚔', labelKey: 'nav.hunt' },
  { panel: 'items', icon: '🎒', labelKey: 'nav.items' },
  { panel: 'profile', icon: '👤', labelKey: 'nav.profile' }
];

export const Navbar = () => {
  const { t } = useI18n();
  const panel = useGameStore((state) => state.panel);
  const setPanel = useGameStore((state) => state.setPanel);

  return (
    <nav className="grid h-nav shrink-0 grid-cols-5 border-t border-game-border bg-game-primary">
      {navItems.map((item) => {
        const isActive = panel === item.panel;

        return (
          <button
            key={item.panel}
            type="button"
            className={[
              'flex flex-col items-center justify-center gap-0.5 font-mono text-xs transition-colors active:scale-95',
              isActive ? 'bg-game-card text-game-gold' : 'text-game-muted hover:bg-game-hover hover:text-game-text'
            ].join(' ')}
            onClick={() => setPanel(item.panel)}
          >
            <span className="text-lg leading-none">{item.icon}</span>
            <span>{t(item.labelKey)}</span>
          </button>
        );
      })}
    </nav>
  );
};
