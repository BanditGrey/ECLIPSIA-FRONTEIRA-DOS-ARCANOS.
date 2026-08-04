import React from 'react';
export interface NavItem { label: string; icon: string; active?: boolean; panel?: string; }
export interface Props { items: NavItem[]; onSelect?: (panel: string) => void; }
export const NavigationAnimation: React.FC<Props> = ({ items, onSelect }) => (
  <nav className="flex gap-2 p-2 rounded-xl bg-game-card border border-game-border shadow-inner">
    {items.map((item) => (
      <button
        key={item.panel || item.label}
        onClick={() => onSelect?.(item.panel || '')}
        className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-bold transition-all ${item.active ? 'bg-game-gold text-black shadow-[0_0_15px_rgba(255,215,0,0.5)]' : 'text-game-text hover:text-game-gold hover:bg-game-card/50'}`}
      >
        <span>{item.icon}</span> <span>{item.label}</span>
      </button>
    ))}
  </nav>
);
