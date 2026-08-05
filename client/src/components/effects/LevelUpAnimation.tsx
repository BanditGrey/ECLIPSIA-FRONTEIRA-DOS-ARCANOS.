import React, { useEffect, useState } from 'react';
import { ParticleSystem } from './ParticleSystem';
import { playLevelUp } from '../../systems/audio/SFXEngine';
import { useI18n } from '../../hooks/useI18n';

export const LevelUpAnimation = () => {
  const { t } = useI18n();
  const [active, setActive] = useState(false);
  const [level, setLevel] = useState(1);

  useEffect(() => {
    const handleLevelUp = (e: Event) => {
      const detail = (e as CustomEvent<{ level: number }>).detail;
      setLevel(detail.level);
      setActive(true);
      playLevelUp();
      
      setTimeout(() => setActive(false), 3500);
    };

    window.addEventListener('eclipsia:levelup', handleLevelUp);
    return () => window.removeEventListener('eclipsia:levelup', handleLevelUp);
  }, []);

  if (!active) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] flex flex-col items-center justify-center">
      <div className="absolute inset-0 bg-night-950/40 mix-blend-overlay animate-[fadeIn_0.5s_ease-out]" />
      <ParticleSystem trigger={active} type="levelup" durationMs={3000} className="absolute inset-0 w-full h-full" />
      
      <div className="relative text-center animate-[eclipsiaFloat_2s_ease-out_forwards]">
        <div className="absolute inset-0 bg-gold-400 blur-[80px] opacity-30" />
        <h2 className="title-gold text-5xl md:text-8xl font-black tracking-[0.2em] uppercase drop-shadow-[0_0_20px_rgba(255,215,0,0.8)]">
          {t('game.levelUp') ?? 'LEVEL UP'}
        </h2>
        <p className="mt-4 text-2xl md:text-4xl font-mono text-cyan-300 drop-shadow-[0_0_10px_rgba(63,217,196,0.8)]">
          {t('game.lvl')} {level}
        </p>
      </div>
    </div>
  );
};
