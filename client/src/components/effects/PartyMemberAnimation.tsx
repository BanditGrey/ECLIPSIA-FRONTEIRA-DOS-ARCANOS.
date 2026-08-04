import React from 'react';
export interface Props { name: string; dmg?: number; kills?: number; isActive?: boolean; }
export const PartyMemberAnimation: React.FC<Props> = ({ name, dmg = 0, kills = 0, isActive }) => (
  <div className={`flex items-center gap-2 p-2 rounded-lg border ${isActive ? 'border-green-400 bg-green-900/20' : 'border-game-border bg-game-card'}`}>
    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
    <span className="text-sm font-bold">{name}</span>
    <span className="text-xs text-game-muted">⚔ {dmg} 💀 {kills}</span>
  </div>
);
