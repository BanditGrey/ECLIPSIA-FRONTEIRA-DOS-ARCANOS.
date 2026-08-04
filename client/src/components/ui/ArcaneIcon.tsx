import React from 'react';

/**
 * ÍCONES ARCANOS (SVG) — substituem emojis nos botões/HUD principais (A08/A09).
 * Stroke herda a cor atual (`currentColor`), glow opcional via `glow`.
 */
export type ArcaneIconName =
  | 'sword' | 'shield' | 'magic' | 'flee' | 'auto' | 'advance'
  | 'gem' | 'coin' | 'mail' | 'chest' | 'map' | 'star' | 'quest'
  | 'bag' | 'tower' | 'scroll' | 'flame' | 'potion' | 'soul'
  | 'guild' | 'party' | 'hub' | 'profile' | 'market' | 'hammer'
  | 'settings' | 'volume' | 'muted'
  | 'helm' | 'armor' | 'greaves' | 'gloves' | 'boots' | 'earring'
  | 'necklace' | 'belt' | 'ward' | 'amulet' | 'spirit' | 'pet' | 'mount';

interface ArcaneIconProps {
  name: ArcaneIconName;
  size?: number;
  className?: string;
  glow?: boolean;
  strokeWidth?: number;
}

const F = (children: React.ReactNode) => <>{children}</>;

const ICONS: Record<ArcaneIconName, React.ReactNode> = {
  sword: F(<><path d="M4 20 L13 11" /><path d="M16 4l4 4-1 1-2 2-4-4 1-1z" /><path d="M15 5l4 4" /></>),
  shield: F(<path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z" />),
  magic: F(<><path d="M12 4l1.5 3.5L17 9l-3.5 1.5L12 14l-1.5-3.5L7 9l3.5-1.5z" /><path d="M17 14l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8z" /></>),
  flee: F(<><path d="M5 18l4-4 3 1 4-3-3-1 2-2" /><path d="M19 5l-3 3 3 3" /></>),
  auto: F(<><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1" /></>),
  advance: F(<path d="M5 4v16l11-8z" />),
  gem: F(<><path d="M6 3h12l4 6-10 12L2 9z" /><path d="M2 9h20M9 3l3 6 3-6M12 9l0 12" /></>),
  coin: F(<><circle cx="12" cy="12" r="9" /><path d="M12 7v10M9 9.5c.5-1 1.8-1.5 3-1.5 1.5 0 2.5.7 2.5 1.7 0 2.3-5.5 1-5.5 3.3 0 1 1 1.7 2.5 1.7 1.2 0 2.5-.5 3-1.5" /></>),
  mail: F(<><path d="M3 5h18v14H3z" /><path d="M3 6l9 7 9-7" /></>),
  chest: F(<><path d="M4 10h16v10H4zM8 10V7a4 4 0 018 0v3" /><path d="M12 13v4M10 15h4" /></>),
  map: F(<><path d="M3 6l6-3 6 3 6-3v15l-6 3-6-3-6 3z" /><path d="M9 3v15M15 6v15" /></>),
  star: F(<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z" />),
  quest: F(<path d="M12 3a7 7 0 010 14c-1.5 0-2.8-.5-4-1.2L5 17l.9-3A7 7 0 0112 3z" />),
  bag: F(<path d="M6 7h12l1 14H5zM9 7a3 3 0 016 0" />),
  tower: F(<path d="M7 3h10l1 4H6zM8 7l-1 14h10l-1-14M9 7v14M15 7v14" />),
  scroll: F(<><path d="M6 3h11a2 2 0 012 2v14H8a2 2 0 01-2-2V3z" /><path d="M6 17H5a2 2 0 000 4h12" /></>),
  flame: F(<path d="M12 3c1 3-4 5-4 9a4 4 0 008 0c0-1.5-.5-2.5-1-3.5-.5 1-1.5 1.5-2 1.5C13 8 12 5 12 3z" />),
  potion: F(<path d="M10 3h4M11 3v5l-4 7a3 3 0 006 0l-4-7V3" />),
  soul: F(<path d="M12 3l2.5 5 5.5.8-4 3.9.9 5.5L12 20l-4.9-2.8.9-5.5-4-3.9 5.5-.8z" />),
  guild: F(<path d="M3 21V10l9-6 9 6v11M9 21v-6h6v6" />),
  party: F(<><circle cx="8" cy="8" r="3" /><circle cx="17" cy="9" r="2.5" /><path d="M3 20c0-3 2.5-5 5-5s5 2 5 5M14 20c0-2 1.5-3.5 3.5-3.5" /></>),
  hub: F(<><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2" /></>),
  profile: F(<><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 3.6-6 8-6s8 2 8 6" /></>),
  market: F(<path d="M4 7h16l-1 13H5zM8 7a4 4 0 008 0" />),
  hammer: F(<path d="M4 20l8-8M15 9l4-4-1-1-4 4 1 1zM17 7l3 3" />),
  settings: F(<><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1" /></>),
  volume: F(<><path d="M3 9v6h4l5 4V5L7 9z" /><path d="M17 9a4 4 0 010 6M19.5 6.5a8 8 0 010 11" /></>),
  muted: F(<><path d="M3 9v6h4l5 4V5L7 9z" /><path d="M17 9l5 6M22 9l-5 6" /></>),
  helm: F(<><path d="M12 4l6 3v4c0 4.5-2.5 7.5-6 9-3.5-1.5-6-4.5-6-9V7z" /><path d="M10 4.5h4M10 4.5V7M14 4.5V7" /></>),
  armor: F(<path d="M12 3l7 3v6c0 4-3 7.5-7 9-4-1.5-7-5-7-9V6z" />),
  greaves: F(<><path d="M12 12l5-4 3 4-5 5z" /><path d="M4 13l4 1M7 15l4 1M9 17l4 1" /></>),
  gloves: F(<><path d="M6 4h9l2 4-2 3v7H6V7z" /><path d="M8 8v9M11 8v9" /></>),
  boots: F(<><path d="M5 4h14v7l-3 3H9l-4-4z" /><path d="M8 14l-2 6h12l-2-6M5 20h14" /></>),
  earring: F(<><circle cx="12" cy="12" r="3" /><path d="M12 9V5M12 15v3" /></>),
  necklace: F(<path d="M12 5a3 3 0 00-3 3c0 2 3 3 3 6 0-3 3-4 3-6a3 3 0 00-3-3z" />),
  belt: F(<><path d="M4 12h16M7 10v4M17 10v4" /></>),
  ward: F(<><path d="M12 3l8 3v6c0 5-3 8-8 9-5-1-8-4-8-9V6z" /><path d="M9 12l2 2 4-4" /></>),
  amulet: F(<><path d="M12 4l2 2-2 2-2-2z" /><path d="M12 8v4M12 12a4 4 0 100 8 4 4 0 000-8" /></>),
  spirit: F(<path d="M12 3l1.8 4 4.2.8-3 2.9.7 4.3L12 16l-3.7 2 .7-4.3-3-2.9 4.2-.8z" />),
  pet: F(<><path d="M12 8c-2.5 0-4.5 2-4.5 4.5 0 2 1.5 3.5 4.5 3.5s4.5-1.5 4.5-3.5C16.5 10 14.5 8 12 8z" /><path d="M8 11l-2-1M16 11l2-1" /></>),
  mount: F(<path d="M4 20c2-4 4-5 6-6l1-6c-1-2-1-3 1-4 2 0 2 2 3 3l4 2 2 2-2 2-4 1-2 6H6z" />)
};

export const ArcaneIcon: React.FC<ArcaneIconProps> = ({ name, size = 20, className = '', glow = false, strokeWidth = 1.8 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`inline-block shrink-0 ${glow ? 'animate-[eclipsiaPulseGlow_2s_ease-in-out_infinite]' : ''} ${className}`}
      aria-hidden="true"
    >
      {ICONS[name]}
    </svg>
  );
};

export default ArcaneIcon;
