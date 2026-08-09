import React, { useState, useEffect, useRef } from 'react';
import { ParticleSystem } from './ParticleSystem';
import { playSkillPhysical, playSkillMagic, playSkillVoid, playCrit, playLevelUp } from '../../systems/audio/SFXEngine';
import { skills } from '../../data/skills';
import { resolveSkillVisual } from './skillVisuals';

export interface SkillEffectConfig {
  skillId: string;
  skillName: string;
  damageType?: 'physical' | 'magical' | 'void';
  damagePercent?: number;
  isCritical?: boolean;
  showParticles?: boolean;
  playSound?: boolean;
  narrate?: boolean;
  castId?: number;
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
  isCritical = false, showParticles = true, playSound = true, narrate = false, castId = 0, onComplete
}) => {
  const [visible, setVisible] = useState(true);
  const [shake, setShake] = useState(false);
  const [floatKey, setFloatKey] = useState(0);
  const meta = TYPE_META[damageType] ?? TYPE_META.physical;
  const visual = resolveSkillVisual(skillId, damageType);
  const animationName = `eclipseSkill${visual.kind.charAt(0).toUpperCase()}${visual.kind.slice(1)}`;

  const skillData = skills.find(s => s.id === skillId);
  const skillIcon = skillData?.icon ?? '💥';

  // onComplete em ref: o painel pai re-renderiza muito durante o combate e
  // dependências instáveis reiniciavam o timer sem nunca deixá-lo concluir
  // (o banner "travava" e o personagem ficava preso no estado cast).
  const onCompleteRef = useRef(onComplete);
  useEffect(() => { onCompleteRef.current = onComplete; });

  useEffect(() => {
    setVisible(true);
    if (playSound) {
      if (damageType === 'void') playSkillVoid();
      else if (damageType === 'magical') playSkillMagic();
      else playSkillPhysical();

      if (isCritical) setTimeout(playCrit, 150);
      if (narrate) playLevelUp();
    }
    if (isCritical) { setShake(true); setTimeout(() => setShake(false), 500); }
    setFloatKey((k) => k + 1);
    const timer = setTimeout(() => { setVisible(false); onCompleteRef.current?.(); }, 2000);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skillId, castId]);

  if (!visible) return null;

  return (
    <div className={`fixed inset-0 z-[90] pointer-events-none flex items-center justify-center overflow-hidden ${shake ? 'animate-[eclipsiaShake_0.5s_ease]' : ''}`}>
      {showParticles && (
        <ParticleSystem trigger={visible} type={visual.particle ?? meta.particle} className="absolute inset-0 w-full h-full" />
      )}
      <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center">
        <div
          className="w-48 h-48 md:w-72 md:h-72 rounded-full opacity-60 mix-blend-screen"
          style={{
            background: `radial-gradient(circle, ${visual.glow}cc 0%, ${visual.color}66 38%, transparent 72%)`,
            boxShadow: `0 0 38px ${visual.color}`,
            animation: `${animationName} 0.85s ease-out forwards`, 
          }}
        />
      </div>
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
      <style>{`
        @keyframes eclipseSkillSlash { 0%{opacity:0;transform:translateX(-90px) rotate(-35deg) scale(.35)} 28%{opacity:1} 100%{opacity:0;transform:translateX(105px) rotate(25deg) scale(1.3)} }
        @keyframes eclipseSkillSpin { 0%{opacity:0;transform:rotate(0) scale(.2)} 35%{opacity:1} 100%{opacity:0;transform:rotate(540deg) scale(1.45)} }
        @keyframes eclipseSkillCross { 0%{opacity:0;transform:rotate(-45deg) scale(.25)} 42%{opacity:1;transform:rotate(45deg) scale(1.1)} 100%{opacity:0;transform:rotate(135deg) scale(1.4)} }
        @keyframes eclipseSkillFlurry { 0%{opacity:0;transform:scale(.25) rotate(-20deg)} 45%{opacity:1;transform:scale(1.25) rotate(18deg)} 100%{opacity:0;transform:scale(1.65) rotate(-12deg)} }
        @keyframes eclipseSkillArrow { 0%{opacity:0;transform:translateX(-130px) scaleX(.2)} 25%{opacity:1} 100%{opacity:0;transform:translateX(145px) scaleX(1.7)} }
        @keyframes eclipseSkillRain { 0%{opacity:0;transform:translateY(-105px) scaleX(1.8) scaleY(.2)} 40%{opacity:1} 100%{opacity:0;transform:translateY(85px) scaleX(.6) scaleY(1.45)} }
        @keyframes eclipseSkillArcane { 0%{opacity:0;transform:scale(.15) rotate(0)} 48%{opacity:1;transform:scale(1.05) rotate(160deg)} 100%{opacity:0;transform:scale(1.7) rotate(320deg)} }
        @keyframes eclipseSkillFrost { 0%{opacity:0;transform:translateX(-80px) scale(.2)} 42%{opacity:1;transform:translateX(10px) scale(1)} 100%{opacity:0;transform:translateX(70px) scale(1.5)} }
        @keyframes eclipseSkillLightning { 0%{opacity:0;transform:scaleY(.15) skewX(-28deg)} 32%{opacity:1;transform:scaleY(1.35) skewX(18deg)} 100%{opacity:0;transform:scaleY(1.8) skewX(-12deg)} }
        @keyframes eclipseSkillHeal { 0%{opacity:0;transform:translateY(55px) scale(.25)} 45%{opacity:1;transform:translateY(-10px) scale(1.05)} 100%{opacity:0;transform:translateY(-95px) scale(1.45)} }
        @keyframes eclipseSkillBarrier { 0%{opacity:0;transform:scale(.25)} 45%{opacity:1;transform:scale(1.15)} 100%{opacity:0;transform:scale(1.65)} }
        @keyframes eclipseSkillQuake { 0%{opacity:0;transform:translateY(-55px) scale(.3)} 42%{opacity:1;transform:translateY(28px) scaleX(1.35) scaleY(.75)} 100%{opacity:0;transform:translateY(54px) scaleX(1.8) scaleY(.32)} }
        @keyframes eclipseSkillLance { 0%{opacity:0;transform:translateX(-120px) rotate(-18deg) scaleX(.25)} 36%{opacity:1} 100%{opacity:0;transform:translateX(125px) rotate(12deg) scaleX(1.7)} }
        @keyframes eclipseSkillMark { 0%{opacity:0;transform:scale(1.7)} 38%{opacity:1;transform:scale(.85)} 100%{opacity:0;transform:scale(1.35)} }
        @keyframes eclipseSkillSmoke { 0%{opacity:0;transform:scale(.2)} 40%{opacity:.8;transform:scale(1.15)} 100%{opacity:0;transform:scale(1.9)} }
        @keyframes eclipseSkillVoid { 0%{opacity:0;transform:scale(1.5) rotate(0)} 45%{opacity:1;transform:scale(.75) rotate(210deg)} 100%{opacity:0;transform:scale(1.45) rotate(420deg)} }
        @keyframes eclipseSkillWard { 0%{opacity:0;transform:scale(.25) rotate(45deg)} 45%{opacity:1;transform:scale(1.1) rotate(45deg)} 100%{opacity:0;transform:scale(1.55) rotate(45deg)} }
        @keyframes eclipseSkillThorns { 0%{opacity:0;transform:translateY(65px) scaleX(.35)} 45%{opacity:1;transform:translateY(0) scaleX(1.2)} 100%{opacity:0;transform:translateY(-30px) scaleX(1.65)} }
      `}</style>
    </div>
  );
};

export default SkillEffectPanel;
