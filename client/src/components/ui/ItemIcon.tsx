import React from 'react';

export type ItemIconName =
  | 'sword' | 'greatsword' | 'dagger' | 'staff' | 'bow' | 'mace' | 'spear' | 'shield'
  | 'helmet' | 'chestplate' | 'leggings' | 'boots' | 'gloves' | 'cloak'
  | 'ring' | 'amulet' | 'earring' | 'belt' | 'bracelet'
  | 'potion_hp' | 'potion_mp' | 'potion_buff' | 'food' | 'scroll' | 'elixir'
  | 'gem' | 'crystal' | 'herb' | 'leather' | 'metal' | 'essence' | 'bone' | 'spirit_stone'
  | 'key' | 'map' | 'quest_item' | 'mount' | 'pet' | 'coin' | 'diamond'
  | 'item_generic' | 'chest' | 'gift';

interface Props { name: ItemIconName; size?: number; className?: string; rarity?: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary'; }

const C = { common: '#9ca3af', uncommon: '#10b981', rare: '#3b82f6', epic: '#a855f7', legendary: '#f59e0b' };

const I: Record<ItemIconName, React.ReactNode> = {
  sword: <><path d="M14.5 17.5L3 6V3h3l11.5 11.5" strokeWidth="2" /><path d="M13 19l6-6M16 16l4 4M19 21l2-2" strokeWidth="2" /></>,
  greatsword: <><path d="M12 2v14" strokeWidth="2.5" /><path d="M8 6h8" strokeWidth="2" /><path d="M10 16h4v4h-4z" strokeWidth="1.5" /></>,
  dagger: <><path d="M14.5 17.5L3 6V3h3l11.5 11.5" strokeWidth="1.5" /><path d="M13 19l3-3M14 18l2 2" strokeWidth="1.5" /></>,
  staff: <><path d="M12 2v20" strokeWidth="2" /><circle cx="12" cy="4" r="2.5" strokeWidth="1.5" fill="currentColor" opacity="0.3" /></>,
  bow: <><path d="M17.5 6.5c-3-3-8.5-2-11 1s-2 8.5 1 11" strokeWidth="2" /><path d="M6.5 17.5L17.5 6.5" strokeWidth="1" strokeDasharray="2 2" /></>,
  mace: <><path d="M12 10v12" strokeWidth="2.5" /><circle cx="12" cy="7" r="4" strokeWidth="2" /><path d="M10 22h4" strokeWidth="1.5" /></>,
  spear: <><path d="M12 2v20" strokeWidth="2" /><path d="M8 6l4-4 4 4" strokeWidth="1.5" fill="currentColor" opacity="0.3" /></>,
  shield: <><path d="M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-4z" strokeWidth="2" fill="currentColor" opacity="0.15" /></>,
  helmet: <><path d="M6 14c0-5 3-9 6-9s6 4 6 9" strokeWidth="2" /><path d="M4 14h16v2H4z" strokeWidth="1.5" /><path d="M6 16v2h12v-2" strokeWidth="1.5" /></>,
  chestplate: <><path d="M8 4h8l2 6v10H6V10z" strokeWidth="2" fill="currentColor" opacity="0.15" /><path d="M12 4v16M8 8h8" strokeWidth="1" opacity="0.3" /></>,
  leggings: <><path d="M8 4h8v8l-2 8h-1l-1-6-1 6h-1l-2-8V4z" strokeWidth="2" fill="currentColor" opacity="0.15" /></>,
  boots: <><path d="M7 4v10l-2 4h6v-4l1-2 1 2v4h6l-2-4V4" strokeWidth="2" fill="currentColor" opacity="0.15" /></>,
  gloves: <><path d="M6 8v6l2 4h2l1-3 1 3h2l2-4V8" strokeWidth="2" fill="currentColor" opacity="0.15" /><path d="M9 8v4M12 8v4M15 8v4" strokeWidth="1" opacity="0.3" /></>,
  cloak: <><path d="M8 4c0 0-2 6-2 12s2 4 6 4 6 0 6-4-2-12-2-12" strokeWidth="2" fill="currentColor" opacity="0.15" /><path d="M10 4h4" strokeWidth="2" /></>,
  ring: <><circle cx="12" cy="12" r="6" strokeWidth="2.5" /><circle cx="12" cy="7" r="2" fill="currentColor" opacity="0.4" strokeWidth="1" /></>,
  amulet: <><path d="M8 4c0 4 2 6 4 6s4-2 4-6" strokeWidth="1.5" /><circle cx="12" cy="14" r="4" strokeWidth="2" fill="currentColor" opacity="0.2" /><circle cx="12" cy="14" r="1.5" fill="currentColor" opacity="0.5" /></>,
  earring: <><circle cx="12" cy="6" r="2" strokeWidth="1.5" /><path d="M12 8v4" strokeWidth="1.5" /><path d="M9 14c0 2 1.5 4 3 4s3-2 3-4" strokeWidth="1.5" fill="currentColor" opacity="0.2" /></>,
  belt: <><rect x="3" y="9" width="18" height="6" rx="1" strokeWidth="2" fill="currentColor" opacity="0.15" /><rect x="10" y="8" width="4" height="8" rx="1" strokeWidth="1.5" fill="currentColor" opacity="0.3" /></>,
  bracelet: <><ellipse cx="12" cy="12" rx="7" ry="5" strokeWidth="2.5" /><circle cx="12" cy="7" r="1.5" fill="currentColor" opacity="0.5" /></>,
  potion_hp: <><path d="M10 2h4v4l3 6v8H7v-8l3-6V2z" strokeWidth="2" fill="currentColor" opacity="0.15" /><path d="M10 2h4" strokeWidth="2.5" /><circle cx="12" cy="17" r="2" fill="#ef4444" opacity="0.4" /></>,
  potion_mp: <><path d="M10 2h4v4l3 6v8H7v-8l3-6V2z" strokeWidth="2" fill="currentColor" opacity="0.15" /><path d="M10 2h4" strokeWidth="2.5" /><circle cx="12" cy="17" r="2" fill="#3b82f6" opacity="0.4" /></>,
  potion_buff: <><path d="M10 2h4v4l3 6v8H7v-8l3-6V2z" strokeWidth="2" fill="currentColor" opacity="0.15" /><path d="M10 2h4" strokeWidth="2.5" /><circle cx="12" cy="17" r="2" fill="#f59e0b" opacity="0.4" /></>,
  food: <><ellipse cx="12" cy="14" rx="8" ry="5" strokeWidth="2" fill="currentColor" opacity="0.15" /><path d="M8 10c0-2 2-4 4-4s4 2 4 4" strokeWidth="1.5" /></>,
  scroll: <><path d="M7 4h10v16H7z" strokeWidth="2" fill="currentColor" opacity="0.1" /><path d="M5 4c0-1 1-2 2-2M17 20c1 0 2 1 2 2" strokeWidth="2" /><path d="M9 8h6M9 12h6M9 16h4" strokeWidth="1" opacity="0.4" /></>,
  elixir: <><circle cx="12" cy="14" r="6" strokeWidth="2" fill="currentColor" opacity="0.15" /><path d="M10 4h4v4h-4z" strokeWidth="1.5" /><path d="M12 11v6M9 14h6" strokeWidth="1.5" opacity="0.4" /></>,
  gem: <><path d="M6 8l6-6 6 6-6 14z" strokeWidth="2" fill="currentColor" opacity="0.2" /><path d="M6 8h12" strokeWidth="1.5" /></>,
  crystal: <><path d="M12 2l5 8-5 12-5-12z" strokeWidth="2" fill="currentColor" opacity="0.15" /><path d="M7 10h10" strokeWidth="1" opacity="0.3" /></>,
  herb: <><path d="M12 22v-8" strokeWidth="2" /><path d="M12 14c-3-2-5-5-4-8 2 1 4 3 4 8" strokeWidth="1.5" fill="currentColor" opacity="0.2" /><path d="M12 14c3-2 5-5 4-8-2 1-4 3-4 8" strokeWidth="1.5" fill="currentColor" opacity="0.2" /></>,
  leather: <><path d="M5 6c0 0 3-2 7-2s7 2 7 2v12c0 0-3 2-7 2s-7-2-7-2V6z" strokeWidth="2" fill="currentColor" opacity="0.15" /></>,
  metal: <><path d="M5 8l3-4h8l3 4v8l-3 4H8l-3-4V8z" strokeWidth="2" fill="currentColor" opacity="0.2" /></>,
  essence: <><circle cx="12" cy="12" r="7" strokeWidth="2" fill="currentColor" opacity="0.1" /><circle cx="12" cy="12" r="4" strokeWidth="1.5" fill="currentColor" opacity="0.2" /><circle cx="12" cy="12" r="1.5" fill="currentColor" opacity="0.5" /></>,
  bone: <><path d="M7 7c-1-1-1-3 0-4s3 0 3 0l7 7s1 2 0 3-3 1-4 0L7 7z" strokeWidth="2" fill="currentColor" opacity="0.15" /><circle cx="7" cy="5" r="2" strokeWidth="1.5" /><circle cx="17" cy="15" r="2" strokeWidth="1.5" /></>,
  spirit_stone: <><circle cx="12" cy="12" r="7" strokeWidth="2" fill="currentColor" opacity="0.1" /><path d="M12 5l2 4 4 1-3 3 1 4-4-2-4 2 1-4-3-3 4-1z" strokeWidth="1.5" fill="currentColor" opacity="0.3" /></>,
  key: <><circle cx="8" cy="8" r="4" strokeWidth="2" /><path d="M11 11l9 9" strokeWidth="2.5" /><path d="M17 17l3-3M15 19l2-2" strokeWidth="2" /></>,
  map: <><path d="M4 6l5-2 6 2 5-2v14l-5 2-6-2-5 2V6z" strokeWidth="2" fill="currentColor" opacity="0.1" /><path d="M9 4v14M15 6v14" strokeWidth="1" opacity="0.3" /></>,
  quest_item: <path d="M12 2l2 6h6l-5 4 2 6-5-4-5 4 2-6-5-4h6z" strokeWidth="2" fill="currentColor" opacity="0.2" />,
  mount: <><path d="M4 16l3-6 4-2 5 2 2 6" strokeWidth="2" fill="currentColor" opacity="0.15" /><path d="M4 16v4h14v-4" strokeWidth="1.5" /><circle cx="14" cy="10" r="1" fill="currentColor" opacity="0.4" /></>,
  pet: <><circle cx="8" cy="8" r="2" strokeWidth="1.5" /><circle cx="16" cy="8" r="2" strokeWidth="1.5" /><path d="M7 14c0-3 2-5 5-5s5 2 5 5c0 4-3 6-5 6s-5-2-5-6z" strokeWidth="2" fill="currentColor" opacity="0.15" /></>,
  coin: <><circle cx="12" cy="12" r="8" strokeWidth="2" fill="currentColor" opacity="0.2" /><path d="M12 7v10M9 9.5c0-1 1.5-2 3-2s3 .5 3 2-1.5 2-3 2.5-3 1-3 2.5 1.5 2 3 2 3-1 3-2" strokeWidth="1.5" /></>,
  diamond: <><path d="M6 8l6-6 6 6-6 14z" strokeWidth="2" fill="currentColor" opacity="0.15" /><path d="M6 8h12" strokeWidth="1.5" /><path d="M9 8l3 6 3-6" strokeWidth="1" opacity="0.3" /></>,
  item_generic: <><rect x="4" y="4" width="16" height="16" rx="2" strokeWidth="2" fill="currentColor" opacity="0.1" /><path d="M8 12h8M12 8v8" strokeWidth="1.5" opacity="0.4" /></>,
  chest: <><rect x="3" y="8" width="18" height="12" rx="2" strokeWidth="2" fill="currentColor" opacity="0.15" /><path d="M3 14h18" strokeWidth="1.5" /><rect x="10" y="12" width="4" height="4" rx="0.5" strokeWidth="1.5" fill="currentColor" opacity="0.3" /></>,
  gift: <><rect x="3" y="8" width="18" height="14" rx="1" strokeWidth="2" fill="currentColor" opacity="0.15" /><path d="M12 8v14M3 14h18" strokeWidth="2" /><path d="M12 8c-2-3-5-4-6-2s2 4 6 2M12 8c2-3 5-4 6-2s-2 4-6 2" strokeWidth="1.5" /></>,
};

export const ItemIcon: React.FC<Props> = ({ name, size = 24, className = '', rarity }) => {
  const icon = I[name] || I.item_generic;
  const color = rarity ? C[rarity] : '#d1d5db';
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round"
      className={`inline-block shrink-0 ${className}`}
      style={rarity ? { filter: `drop-shadow(0 0 3px ${color}60)` } : undefined} aria-hidden="true">
      {icon}
    </svg>
  );
};

export const slotToIcon = (slot: string): ItemIconName => {
  const m: Record<string, ItemIconName> = {
    weapon_main: 'sword', weapon_off: 'shield', head: 'helmet', chest: 'chestplate',
    legs: 'leggings', gloves: 'gloves', boots: 'boots', earring: 'earring',
    necklace: 'amulet', belt: 'belt', resistance: 'bracelet', amulet: 'amulet',
    spirit_stone: 'spirit_stone', pet: 'pet', mount: 'mount',
  };
  return m[slot] || 'item_generic';
};

export default ItemIcon;
