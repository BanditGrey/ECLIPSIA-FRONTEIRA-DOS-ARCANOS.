import React, { useState, useEffect } from 'react';
import { useAudio } from '../../hooks/useAudio';
import { playAttack, playCrit, playHeal, playLoot, playLevelUp } from '../systems/audio/SFXEngine';
export interface SkillEffectConfig { skillId: string; skillName: string; damageType?: 'physical'|'magical'|'void'; damagePercent?: number; isCritical?: boolean; showParticles?: boolean; playSound?: boolean; onComplete?: () => void; }
export const SkillEffectPanel: React.FC<SkillEffectConfig> = ({ skillId, skillName = 'Skill', damageType = 'physical', damagePercent = 100, isCritical = false, showParticles = true, playSound = true, onComplete }) => {
  const audio = useAudio(); const [visible, setVisible] = useState(true); const [narrationText, setNarrationText] = useState('');
  useEffect(() => { if (playSound) { if (isCritical) { playCrit(); } else { playAttack(); } }  const timer = setTimeout(() => { setVisible(false); if (onComplete) onComplete(); }, 2000); return () => clearTimeout(timer); }, [skillId, audio, playSound, isCritical, damageType, damagePercent, skillName, onComplete]);
  if (!visible) return null;
  return (
    <div className="fixed inset-0 z-[90] pointer-events-none flex items-center justify-center bg-gradient-to-b from-transparent via-black/30 to-transparent">
      <div className="relative text-center animate-[fadeIn_0.3s_ease]">
        <h2 className={`text-5xl md:text-7xl font-black tracking-widest drop-shadow-[0_0_30px_rgba(255,215,0,0.9)] ${isCritical ? 'text-yellow-300 animate-pulse' : 'text-white animate-bounce'}`}>{skillName.toUpperCase()}</h2>
        <p className="text-xl md:text-3xl font-bold text-game-gold drop-shadow-[0_0_15px_rgba(255,215,0,0.6)] mt-4">{damageType === 'magical' ? '✨ MÁGICO' : damageType === 'void' ? '🌑 VAZIO' : '⚔ FÍSICO'}</p>
        <p className="text-2xl md:text-4xl font-black text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.7)] mt-2">{damagePercent}%</p>
        <div className="mt-6 mx-auto w-64 h-3 rounded-full bg-game-border overflow-hidden shadow-inner"><div className={`h-full rounded-full ${isCritical ? 'bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-600 animate-[pulse_1s_ease-in-out_infinite]' : 'bg-gradient-to-r from-blue-400 to-teal-400'}`} style={{ width: `${Math.min(100, damagePercent)}%` }} /></div>

        {showParticles && <div className="mt-6 flex justify-center gap-2"><span className="inline-block w-3 h-3 rounded-full bg-yellow-400 animate-[bounce_1.5s_ease-in-out_infinite] shadow-[0_0_10px_rgba(255,215,0,0.8)]" /><span className="inline-block w-3 h-3 rounded-full bg-yellow-300 animate-[bounce_1.5s_ease-in-out_0.2s_infinite] shadow-[0_0_10px_rgba(255,215,0,0.8)]" /><span className="inline-block w-3 h-3 rounded-full bg-yellow-500 animate-[bounce_1.5s_ease-in-out_0.4s_infinite] shadow-[0_0_10px_rgba(255,215,0,0.8)]" /></div>}
      </div>
    </div>
  );
};
