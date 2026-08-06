import React from 'react';

export type ItemIconName =
  | 'sword' | 'greatsword' | 'greataxe' | 'dagger' | 'staff' | 'bow' | 'mace' | 'spear' | 'shield'
  | 'helmet' | 'chestplate' | 'leggings' | 'boots' | 'gloves' | 'cloak'
  | 'ring' | 'amulet' | 'earring' | 'belt' | 'bracelet'
  | 'potion_hp' | 'potion_mp' | 'potion_buff' | 'food' | 'scroll' | 'elixir'
  | 'gem' | 'crystal' | 'herb' | 'leather' | 'metal' | 'essence' | 'bone' | 'spirit_stone'
  | 'key' | 'map' | 'quest_item' | 'mount' | 'pet' | 'coin' | 'diamond'
  | 'item_generic' | 'chest' | 'gift';

interface Props { 
    name: ItemIconName; 
    size?: number; 
    className?: string; 
    rarity?: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary' | 'relic' | 'sprint'; 
}

const C = { 
    common: '#9ca3af', 
    uncommon: '#10b981', 
    rare: '#3b82f6', 
    epic: '#a855f7', 
    legendary: '#f59e0b', 
    relic: '#ef4444',
    sprint: '#f8fafc' 
};

export const ItemIcon: React.FC<Props> = ({ name, size = 24, className = '', rarity }) => {
  const color = rarity ? C[rarity] : '#d1d5db';
  return (
    <div 
        className={`inline-block shrink-0 ${className} relative overflow-hidden`}
        style={{ 
            width: size, 
            height: size, 
            borderRadius: '4px',
            border: `1px solid ${color}`,
            boxShadow: rarity ? `0 0 4px ${color}60` : undefined,
            backgroundColor: '#1f2937'
        }}
        aria-hidden="true"
    >
        <img 
            src={`/assets/sprites/icon_item_${name}.png`} 
            alt={name}
            onError={(e) => { e.currentTarget.src = '/assets/sprites/icon_item_item_generic.png'; }}
            className="w-full h-full object-cover"
        />
    </div>
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
