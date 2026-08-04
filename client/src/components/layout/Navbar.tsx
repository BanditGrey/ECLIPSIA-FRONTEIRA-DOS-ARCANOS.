import { useI18n } from '../../hooks/useI18n';
import { useGameStore } from '../../store/useGameStore';
import { ArcaneIcon, type ArcaneIconName } from '../ui/ArcaneIcon';
import type { GamePanel } from '../../store/useGameStore';

const navItems: Array<{ panel: GamePanel; icon: ArcaneIconName; labelKey: string }> = [
  { panel: 'hub', icon: 'hub', labelKey: 'nav.hub' },
  { panel: 'travel', icon: 'map', labelKey: 'nav.travel' },
  { panel: 'combat', icon: 'sword', labelKey: 'nav.hunt' },
  { panel: 'items', icon: 'bag', labelKey: 'nav.items' },
  { panel: 'profile', icon: 'profile', labelKey: 'nav.profile' }
];

export const Navbar = () => {
  const { t } = useI18n();
  const panel = useGameStore((state) => state.panel);
  const setPanel = useGameStore((state) => state.setPanel);

  return (
    <nav className="relative grid h-nav shrink-0 grid-cols-5 border-t border-night-700 bg-night-900/90 backdrop-blur">
      {navItems.map((item) => {
        const isActive = panel === item.panel;

        return (
          <button
            key={item.panel}
            type="button"
            className={[
              'group relative flex flex-col items-center justify-center gap-1 font-mono text-[11px] transition-all active:scale-95',
              isActive ? 'text-gold-300' : 'text-game-muted hover:bg-night-800/70 hover:text-game-text'
            ].join(' ')}
            onClick={() => setPanel(item.panel)}
          >
            {/* indicador ativo */}
            <span
              className={[
                'pointer-events-none absolute inset-x-4 top-0 h-[2px] rounded-full bg-gradient-to-r from-transparent via-gold-400 to-transparent transition-opacity',
                isActive ? 'opacity-100 shadow-glow-sm' : 'opacity-0'
              ].join(' ')}
            />
            <span
              className={[
                'icon-tile flex items-center justify-center transition-all',
                isActive ? '!border-gold-400 text-gold-300 shadow-glow-sm' : 'opacity-80 group-hover:opacity-100'
              ].join(' ')}
              style={{ width: 34, height: 34 }}
            >
              <ArcaneIcon name={item.icon} size={19} glow={isActive} />
            </span>
            <span>{t(item.labelKey)}</span>
          </button>
        );
      })}
    </nav>
  );
};
