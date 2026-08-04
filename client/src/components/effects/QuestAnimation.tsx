import React from 'react';
export const QuestAnimation: React.FC<{ isActive?: boolean }> = ({ isActive }) => (
  <span className={`inline-block w-3 h-3 rounded-full bg-yellow-400 ${isActive ? 'shadow-[0_0_15px_rgba(255,215,0,0.9)] animate-pulse' : ''}`} />
);
