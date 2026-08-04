import React, { useState, useEffect } from 'react';
import { useAudio } from '../../hooks/useAudio';
export interface Props { skillName: string; damagePercent: number; isCritical?: boolean; onComplete?: () => void; }
export const MagicalSkillAnimation: React.FC<Props> = ({ skillName, damagePercent, isCritical = false, onComplete }) => {
  const audio = useAudio(); const [visible, setVisible] = useState(true);
  useEffect(() => { audio.playSound(isCritical ? '/assets/audio/sfx/crit.mp3' : '/assets/audio/sfx/attack.mp3'); const t = setTimeout(() => { setVisible(false); if (onComplete) onComplete(); }, 1500); return () => clearTimeout(t); }, [audio, isCritical, onComplete]);
  if (!visible) return null;
  return (
    <div className="fixed inset-0 z-[95] pointer-events-none flex items-center justify-center">
      <div className="text-center animate-[fadeIn_0.2s_ease]">
        <div className="text-6xl md:text-8xl font-black text-teal-300 drop-shadow-[0_0_40px_rgba(0,255,170,0.9)] animate-pulse">✨ {skillName.toUpperCase()}</div>
        <div className="text-3xl md:text-5xl font-black text-white mt-4">{damagePercent}%</div>
        <div className="mt-6 mx-auto w-72 h-4 rounded-full bg-teal-900/50 overflow-hidden shadow-inner"><div className="h-full bg-gradient-to-r from-teal-300 to-cyan-600 animate-[pulse_1s_ease-in-out_infinite]" style={{ width: `${Math.min(100, damagePercent)}%` }} /></div>
      </div>
    </div>
  );
};
