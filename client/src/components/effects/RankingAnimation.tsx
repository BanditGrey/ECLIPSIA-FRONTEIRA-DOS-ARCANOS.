import React from 'react';
export interface Props { position: number; name: string; score: number; classType: string; }
export const RankingAnimation: React.FC<Props> = ({ position, name, score, classType }) => {
  const highlight = position <= 3 ? 'border-yellow-400 shadow-[0_0_15px_rgba(255,215,0,0.5)]' : 'border-game-border';
  return (
    <div className={`flex items-center gap-3 p-2 rounded-lg border ${highlight} bg-game-card`}>
      <span className="w-6 h-6 rounded-full bg-game-gold text-black font-black text-xs flex items-center justify-center">{position}</span>
      <span className="text-sm font-bold">{name}</span>
      <span className="text-xs text-game-muted">{classType}</span>
      <span className="text-sm font-mono text-game-gold">{score}</span>
    </div>
  );
};
