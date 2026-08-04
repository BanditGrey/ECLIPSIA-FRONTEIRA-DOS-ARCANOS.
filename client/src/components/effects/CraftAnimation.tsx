import React, { useState, useEffect } from 'react';
export interface Props { isCrafting: boolean; onComplete?: () => void; }
export const CraftAnimation: React.FC<Props> = ({ isCrafting, onComplete }) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => { if (isCrafting) { setVisible(true); const t = setTimeout(() => { setVisible(false); if (onComplete) onComplete(); }, 1200); return () => clearTimeout(t); } }, [isCrafting, onComplete]);
  if (!visible) return null;
  return <div className="fixed inset-0 z-[95] pointer-events-none flex items-center justify-center"><div className="animate-[spin_1s_linear_infinite] w-16 h-16 rounded-full border-4 border-teal-400 border-t-transparent shadow-[0_0_30px_rgba(0,200,150,0.8)]" /></div>;
};
