import React from 'react';
export interface Props { price: number; currency?: 'gold' | 'crystal'; status?: string; }
export const MarketAnimation: React.FC<Props> = ({ price, currency = 'gold', status }) => (
  <div className="rounded-lg border border-cyan-400 bg-cyan-900/10 p-3 shadow-[0_0_15px_rgba(0,200,255,0.2)]">
    <p className="font-mono text-sm text-cyan-300">{currency === 'gold' ? '🪙' : '💎'} {price}</p>
    {status && <p className="text-xs text-game-muted">{status}</p>}
  </div>
);
