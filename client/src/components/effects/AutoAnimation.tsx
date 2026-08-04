import React, { useState, useEffect } from 'react';
export interface Props { isActive: boolean; }
export const AutoAnimation: React.FC<Props> = ({ isActive }) => {
  const [pulse, setPulse] = useState(false);
  useEffect(() => { if (isActive) { setPulse(true); const t = setInterval(() => setPulse((p) => !p), 500); return () => clearInterval(t); } else { setPulse(false); } }, [isActive]);
  return isActive ? <span className={`inline-block w-2 h-2 rounded-full bg-green-400 ${pulse ? 'shadow-[0_0_10px_rgba(0,255,0,0.8)]' : ''} animate-pulse`} /> : null;
};
