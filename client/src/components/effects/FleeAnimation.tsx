import React, { useState, useEffect } from 'react';
export interface Props { trigger: boolean; onComplete?: () => void; }
export const FleeAnimation: React.FC<Props> = ({ trigger, onComplete }) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => { if (trigger) { setVisible(true); const t = setTimeout(() => { setVisible(false); if (onComplete) onComplete(); }, 800); return () => clearTimeout(t); } }, [trigger, onComplete]);
  if (!visible) return null;
  return <div className="fixed inset-0 z-[95] pointer-events-none flex items-center justify-center"><div className="text-6xl font-black text-gray-400 animate-[fadeIn_0.2s_ease] tracking-widest">🏃 FUGINDO...</div></div>;
};
