import React, { useState, useEffect } from 'react';
export interface Props { archetype: string; isSelected?: boolean; }
export const ClassSigilAnimation: React.FC<Props> = ({ archetype, isSelected }) => {
  const [glow, setGlow] = useState(false);
  useEffect(() => { if (isSelected) { setGlow(true); const t = setTimeout(() => setGlow(false), 800); return () => clearTimeout(t); } }, [isSelected]);
  return (
    <div className={`w-12 h-12 rounded-full border-2 border-yellow-400 flex items-center justify-center ${glow ? 'shadow-[0_0_20px_rgba(255,215,0,0.9)] animate-pulse' : ''}`}>
      <span className="text-lg font-black text-yellow-300">{archetype?.charAt(0)?.toUpperCase() ?? 'A'}</span>
    </div>
  );
};
