import React, { useState, useEffect } from 'react';
export interface Props { amount: number; type: 'gold' | 'crystal'; trigger?: boolean; }
export const CurrencyDisplayAnimation: React.FC<Props> = ({ amount, type, trigger }) => {
  const [flash, setFlash] = useState(false);
  useEffect(() => { if (trigger) { setFlash(true); const t = setTimeout(() => setFlash(false), 600); return () => clearTimeout(t); } }, [trigger]);
  const color = type === 'gold' ? 'text-yellow-400' : 'text-cyan-300';
  const icon = type === 'gold' ? '🪙' : '💎';
  return <span className={`${color} ${flash ? 'animate-[pulse_0.5s_ease-in-out] drop-shadow-[0_0_15px_rgba(255,215,0,0.8)]' : ''} font-mono font-bold`}>{icon} {amount}</span>;
};
