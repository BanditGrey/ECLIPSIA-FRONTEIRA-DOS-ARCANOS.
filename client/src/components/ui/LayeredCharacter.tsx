import React, { useEffect, useState, useRef } from 'react';

export type CharState = 'idle' | 'walk' | 'attack' | 'hit' | 'death' | 'cast' | 'dash' | 'victory';
type Gender = 'male' | 'female';

const AVAILABLE: Record<string, Record<CharState, number[]>> = {
  male:   { idle: [1, 2], walk: [1], attack: [1], hit: [1], cast: [1], death: [], dash: [], victory: [] },
  female: { idle: [1, 2], walk: [1], attack: [1], hit: [1], cast: [], death: [], dash: [], victory: [] },
};

const getSprite = (gender: Gender, state: CharState, frame: number = 0): string => {
  const frames = AVAILABLE[gender]?.[state] ?? [];
  if (frames.length === 0) return `/assets/sprites/base_${gender}_idle_1.png`;
  const idx = (frame % frames.length);
  return `/assets/sprites/base_${gender}_${state}_${frames[idx]}.png`;
};

interface Props {
  gender: Gender;
  state: CharState;
  size?: number;
  className?: string;
  flip?: boolean;
  onAnimationEnd?: () => void;
  glowColor?: string;
  armorId?: string;
  weaponId?: string;
}

export const LayeredCharacter: React.FC<Props> = ({
  gender, state, size = 128, className = '', flip = false,
  onAnimationEnd, glowColor,
}) => {
  const [src, setSrc] = useState('');
  const [frame, setFrame] = useState(0);
  const animEndRef = useRef<ReturnType<typeof setTimeout>>();
  const frameRef = useRef<ReturnType<typeof setInterval>>();

  // Frame cycling for idle animation
  useEffect(() => {
    if (frameRef.current) clearInterval(frameRef.current);
    const frames = AVAILABLE[gender]?.[state] ?? [];
    if (frames.length > 1) {
      frameRef.current = setInterval(() => {
        setFrame((f) => (f + 1) % frames.length);
      }, 500); // 2 FPS
    } else {
      setFrame(0);
    }
    return () => { if (frameRef.current) clearInterval(frameRef.current); };
  }, [state, gender]);

  useEffect(() => {
    setSrc(getSprite(gender, state, frame));
    if (animEndRef.current) clearTimeout(animEndRef.current);
    const oneShot = ['attack', 'hit', 'death', 'cast', 'dash', 'victory'];
    if (oneShot.includes(state) && onAnimationEnd) {
      animEndRef.current = setTimeout(onAnimationEnd, 600);
    }
    return () => { if (animEndRef.current) clearTimeout(animEndRef.current); };
  }, [state, gender, frame, onAnimationEnd]);

  // Preload
  useEffect(() => {
    ['idle', 'attack', 'hit'].forEach((s) => {
      const img = new Image();
      img.src = `/assets/sprites/base_${gender}_${s}_1.png`;
    });
  }, [gender]);

  const getFilter = (): string => {
    switch (state) {
      case 'hit': return 'brightness(2) sepia(1) hue-rotate(-30deg) saturate(5)';
      case 'death': return 'brightness(0.3) saturate(0.1)';
      case 'cast': return 'brightness(1.2) drop-shadow(0 0 10px rgba(63,217,196,0.6))';
      default: return '';
    }
  };

  const getAnim = (): string => {
    switch (state) {
      case 'idle': return 'lcIdle 3s ease-in-out infinite';
      case 'walk': return 'lcWalk 0.6s ease-in-out infinite';
      case 'attack': return 'lcAttack 0.5s cubic-bezier(0.22,0.61,0.36,1) forwards';
      case 'hit': return 'lcHit 0.35s ease-out forwards';
      case 'death': return 'lcDeath 1.5s ease-in forwards';
      case 'cast': return 'lcCast 0.8s ease-in-out forwards';
      case 'victory': return 'lcVictory 1.5s ease-in-out forwards';
      default: return '';
    }
  };

  return (
    <div className={`relative inline-flex items-end justify-center ${className}`}
      style={{ width: size, height: size * 1.3, transform: flip ? 'scaleX(-1)' : undefined }}>
      
      {glowColor && (
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 rounded-full blur-2xl opacity-25"
          style={{ width: size * 0.5, height: size * 0.15, backgroundColor: glowColor }} />
      )}

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full bg-black/40 blur-sm"
        style={{ width: size * 0.3, height: size * 0.04 }} />

      {src && (
        <img src={src} alt="" draggable={false} className="select-none"
          style={{
            width: size, height: size * 1.2,
            objectFit: 'contain', objectPosition: 'bottom',
            animation: getAnim(), filter: getFilter(),
          }}
        />
      )}

      {/* Attack slash VFX */}
      {state === 'attack' && (
        <div className="absolute inset-0 pointer-events-none overflow-visible z-20">
          <svg className="absolute" style={{ top: '10%', right: '-40%', width: size * 0.8, height: size * 0.6, animation: 'lcSlash 0.4s ease-out forwards' }} viewBox="0 0 80 60" fill="none">
            <path d="M5 30 L75 12" stroke="rgba(255,255,255,0.85)" strokeWidth="3" strokeLinecap="round" />
            <path d="M10 42 L65 27" stroke="rgba(255,220,100,0.6)" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M15 52 L60 40" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
      )}

      {/* Cast aura */}
      {state === 'cast' && (
        <div className="absolute inset-0 pointer-events-none z-20">
          <div className="absolute inset-0 rounded-full" style={{
            background: 'radial-gradient(circle at 50% 35%, rgba(63,217,196,0.35) 0%, transparent 55%)',
            animation: 'lcCastAura 0.8s ease-out forwards',
          }} />
        </div>
      )}

      {/* Hit flash */}
      {state === 'hit' && (
        <div className="absolute inset-0 pointer-events-none z-20 mix-blend-overlay"
          style={{ background: 'linear-gradient(to top, rgba(255,0,0,0.5), transparent)', animation: 'lcHitFlash 0.35s ease-out forwards' }} />
      )}

      <style>{`
        @keyframes lcIdle { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-3px)} }
        @keyframes lcWalk { 0%,100%{transform:translateY(0) rotate(0)} 25%{transform:translateY(-4px) rotate(-1.5deg)} 75%{transform:translateY(-4px) rotate(1.5deg)} }
        @keyframes lcAttack { 0%{transform:translateX(0) rotate(0)} 12%{transform:translateX(-5px) rotate(-2deg)} 35%{transform:translateX(${size*0.18}px) rotate(4deg) scale(1.05)} 55%{transform:translateX(${size*0.12}px) rotate(2deg)} 100%{transform:translateX(0) rotate(0) scale(1)} }
        @keyframes lcHit { 0%{transform:translateX(0)} 15%{transform:translateX(-${size*0.1}px)} 35%{transform:translateX(${size*0.05}px)} 100%{transform:translateX(0)} }
        @keyframes lcDeath { 0%{transform:rotate(0);opacity:1} 50%{transform:rotate(-30deg);opacity:0.5} 100%{transform:rotate(-90deg) translateY(20px);opacity:0} }
        @keyframes lcCast { 0%{transform:translateY(0)} 30%{transform:translateY(-8px)} 60%{transform:translateY(-12px)} 100%{transform:translateY(0)} }
        @keyframes lcVictory { 0%{transform:translateY(0)} 20%{transform:translateY(-12px)} 50%{transform:translateY(-4px)} 80%{transform:translateY(-8px)} 100%{transform:translateY(0)} }
        @keyframes lcSlash { 0%{opacity:0;transform:translateX(-8px)} 15%{opacity:1} 100%{opacity:0;transform:translateX(8px)} }
        @keyframes lcCastAura { 0%{transform:scale(0.5);opacity:0} 35%{transform:scale(1.2);opacity:0.8} 100%{transform:scale(1.6);opacity:0} }
        @keyframes lcHitFlash { 0%{opacity:0.7} 40%{opacity:0.4} 100%{opacity:0} }
      `}</style>
    </div>
  );
};

export default LayeredCharacter;
