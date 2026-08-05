import React, { useState, useEffect } from 'react';
import { useAudio } from '../../hooks/useAudio';
import { ParticleSystem } from './ParticleSystem';
import { playSkillPhysical, playSkillMagic, playSkillVoid, playCrit, playLevelUp } from '../../systems/audio/SFXEngine';
import { skills } from '../../data/skills';

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

const TYPE_META: Record<'physical' | 'magical' | 'void', { label: string; color: string; text: string; bar: string; particle: string }> = {
  physical: {
    label: 'FÍSICO', color: '#FFC94D', text: 'text-yellow-300',
    bar: 'from-yellow-300 via-yellow-500 to-orange-600', particle: 'physical'
  },
  magical: {
    label: 'MÁGICO', color: '#66E8FF', text: 'text-teal-300',
    bar: 'from-teal-300 via-cyan-500 to-blue-600', particle: 'magical'
  },
  void: {
    label: 'VAZIO', color: '#D9B8FF', text: 'text-purple-300',
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

  const skillData = skills.find(s => s.id === skillId);
  const skillIcon = skillData?.icon ?? '💥';

  useEffect(() => {
    if (playSound) {
      if (damageType === 'void') playSkillVoid();
      else if (damageType === 'magical') playSkillMagic();
      else playSkillPhysical();

      if (isCritical) setTimeout(playCrit, 150);
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
        <div className="absolute inset-0 bg-black/40 blur-3xl rounded-full" />
        <h2 className={`relative text-5xl md:text-7xl font-black tracking-widest drop-shadow-[0_0_30px_rgba(255,215,0,0.9)] ${isCritical ? 'text-yellow-300 animate-pulse' : 'text-white animate-bounce'}`}>
          {skillName.toUpperCase()}
        </h2>
        <p className={`relative text-xl md:text-3xl font-bold ${meta.text} drop-shadow-[0_0_15px_currentColor] mt-4 flex items-center justify-center gap-2`}>
          <span className="text-4xl">{skillIcon}</span> {meta.label}
        </p>
        <div
          key={floatKey}
          className="relative text-3xl md:text-5xl font-black text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] mt-2 animate-[eclipsiaFloat_1.5s_ease-out]"
          style={{ textShadow: `0 0 18px ${meta.color}` }}
        >
          {isCritical ? `${damagePercent}% ✦` : `${damagePercent}%`}
        </div>
        <div className="relative mt-6 mx-auto w-64 h-3 rounded-full bg-game-border overflow-hidden shadow-inner">
          <div className={`h-full rounded-full bg-gradient-to-r ${meta.bar} ${isCritical ? 'animate-[pulse_1s_ease-in-out_infinite]' : ''}`} style={{ width: `${Math.min(100, damagePercent)}%` }} />
        </div>
      </div>
    </div>
  );
};

export default SkillEffectPanel;
