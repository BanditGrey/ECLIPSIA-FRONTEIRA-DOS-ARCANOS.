import React from 'react';
export interface Props { isOnline: boolean; name?: string; }
export const PresenceIndicator: React.FC<Props> = ({ isOnline, name }) => (
  <span className="flex items-center gap-1 text-xs">
    <span className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-400 shadow-[0_0_8px_rgba(0,255,0,0.8)] animate-pulse' : 'bg-gray-400'}`} />
    <span className={isOnline ? 'text-game-text' : 'text-game-muted'}>{name ?? 'Jogador'}</span>
  </span>
);
