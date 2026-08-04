import React, { useState, useEffect } from 'react';
import { useAudio } from '../../hooks/useAudio';
import { ParticleSystem } from './ParticleSystem';
import { playAttack, playCrit, playHeal, playLoot, playLevelUp } from '../../systems/audio/SFXEngine';

export interface SkillEffectConfig {
  skillId: string;
  skillName: string;
  damageType?: 'physical' | 'magical' | 'void';
  damagePercent?: number;
  isCritical?: boolean;
  showParticles?: boolean;
  playSound?: boolean;
  narrate?: boolean;
  onComplete?: () => void;
}

const TYPE_META: Record<'physical' | 'magical' | 'void', { label: string; icon: string; color: string; text: string; bar: string; particle: string }> = {
  physical: {
    label: 'FÍSICO', icon: '⚔', color: '#FFC94D', text: 'text-yellow-300',
    bar: 'from-yellow-300 via-yellow-500 to-orange-600', particle: 'physical'
  },
  magical: {
    label: 'MÁGICO', icon: '✨', color: '#66E8FF', text: 'text-teal-300',
    bar: 'from-teal-300 via-cyan-500 to-blue-600', particle: 'magical'
  },
  void: {
    label: 'VAZIO', icon: '🌑', color: '#D9B8FF', text: 'text-purple-300',
    bar: 'from-purple-400 via-violet-500 to-fuchsia-600', particle: 'void'
  },
};

export const SkillEffectPanel: React.FC<SkillEffectConfig> = ({
  skillId, skillName = 'Skill', damageType = 'physical', damagePercent = 100,
  isCritical = false, showParticles = true, playSound = true, narrate = false, onComplete
}) => {
  const audio = useAudio();
  const [visible, setVisible] = useState(true);
  const [shake, setShake] = useState(false);
  const [floatKey, setFloatKey] = useState(0);
  const meta = TYPE_META[damageType] ?? TYPE_META.physical;

  useEffect(() => {
    if (playSound) {
      if (isCritical) playCrit(); else playAttack();
      if (narrate) playLevelUp();
    }
    if (isCritical) { setShake(true); setTimeout(() => setShake(false), 500); }
    setFloatKey((k) => k + 1);
    const timer = setTimeout(() => { setVisible(false); if (onComplete) onComplete(); }, 2000);
    return () => clearTimeout(timer);
  }, [skillId, audio, playSound, isCritical, damageType, narrate, onComplete]);

  if (!visible) return null;

  return (
    <div className={`fixed inset-0 z-[90] pointer-events-none flex items-center justify-center overflow-hidden ${shake ? 'animate-[eclipsiaShake_0.5s_ease]' : ''}`}>
      {showParticles && (
        <ParticleSystem trigger={visible} type={meta.particle} className="absolute inset-0 w-full h-full" />
      )}
      <div className="relative text-center">
        <h2 className={`text-5xl md:text-7xl font-black tracking-widest drop-shadow-[0_0_30px_rgba(255,215,0,0.9)] ${isCritical ? 'text-yellow-300 animate-pulse' : 'text-white animate-bounce'}`}>
          {skillName.toUpperCase()}
        </h2>
        <p className="text-xl md:text-3xl font-bold text-game-gold drop-shadow-[0_0_15px_rgba(255,215,0,0.6)] mt-4">
          {meta.icon} {meta.label}
        </p>
        <div
          key={floatKey}
          className="text-3xl md:text-5xl font-black text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] mt-2 animate-[eclipsiaFloat_1.5s_ease-out]"
          style={{ textShadow: `0 0 18px ${meta.color}` }}
        >
          {isCritical ? `${damagePercent}% ✦` : `${damagePercent}%`}
        </div>
        <div className="mt-6 mx-auto w-64 h-3 rounded-full bg-game-border overflow-hidden shadow-inner">
          <div className={`h-full rounded-full bg-gradient-to-r ${meta.bar} ${isCritical ? 'animate-[pulse_1s_ease-in-out_infinite]' : ''}`} style={{ width: `${Math.min(100, damagePercent)}%` }} />
        </div>
      </div>
    </div>
  );
};

export default SkillEffectPanel;
