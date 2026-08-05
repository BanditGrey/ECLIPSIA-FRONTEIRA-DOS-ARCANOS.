import React from 'react';

export type SkillIconName =
  | 'slash' | 'pierce' | 'smash' | 'whirlwind' | 'backstab'
  | 'fireball' | 'ice_shard' | 'lightning' | 'shadow_bolt' | 'nature'
  | 'heal' | 'barrier' | 'buff_atk' | 'buff_def' | 'buff_speed'
  | 'poison' | 'bleed' | 'stun' | 'slow' | 'drain'
  | 'summon' | 'teleport' | 'stealth' | 'roar' | 'howl'
  | 'skill_generic';

interface Props { name: SkillIconName; size?: number; className?: string; }

const I: Record<SkillIconName, React.ReactNode> = {
  slash: <><path d="M4 20L20 4" strokeWidth="3" strokeLinecap="round" /><path d="M8 16L16 8" strokeWidth="2" opacity="0.5" /></>,
  pierce: <><path d="M12 2v20" strokeWidth="2.5" /><path d="M8 6l4-4 4 4" strokeWidth="2" fill="currentColor" opacity="0.3" /></>,
  smash: <><circle cx="12" cy="8" r="5" strokeWidth="2" /><path d="M12 13v9" strokeWidth="3" /><path d="M8 22h8" strokeWidth="2" /></>,
  whirlwind: <><path d="M12 2C6 2 2 6 2 12" strokeWidth="2.5" /><path d="M12 22c6 0 10-4 10-10" strokeWidth="2.5" /><circle cx="12" cy="12" r="2" fill="currentColor" /></>,
  backstab: <><path d="M18 4L6 16" strokeWidth="2.5" /><path d="M4 14l2 2 2-2" strokeWidth="2" fill="currentColor" opacity="0.3" /><path d="M16 6l2-2" strokeWidth="1.5" opacity="0.4" /></>,
  fireball: <><circle cx="12" cy="12" r="5" strokeWidth="2" fill="currentColor" opacity="0.2" /><path d="M12 4c2 2 4 4 3 7s-3 4-3 4-2-1-3-4 1-5 3-7z" strokeWidth="1.5" /></>,
  ice_shard: <><path d="M12 2l3 7h7l-5.5 4.5 2 7L12 16l-6.5 4.5 2-7L2 9h7z" strokeWidth="2" fill="currentColor" opacity="0.15" /></>,
  lightning: <><path d="M13 2L4 14h7l-2 8 11-12h-7z" strokeWidth="2" fill="currentColor" opacity="0.2" /></>,
  shadow_bolt: <><circle cx="12" cy="12" r="6" strokeWidth="2" fill="currentColor" opacity="0.3" /><circle cx="12" cy="12" r="3" strokeWidth="1.5" /><path d="M12 6v2M12 16v2M6 12h2M16 12h2" strokeWidth="1.5" /></>,
  nature: <><path d="M12 22v-8" strokeWidth="2" /><path d="M12 14c-4-2-6-6-4-10 3 1 5 4 4 10" strokeWidth="1.5" fill="currentColor" opacity="0.2" /><path d="M12 14c4-2 6-6 4-10-3 1-5 4-4 10" strokeWidth="1.5" fill="currentColor" opacity="0.2" /></>,
  heal: <><path d="M12 4v16M4 12h16" strokeWidth="3" strokeLinecap="round" /></>,
  barrier: <><path d="M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6z" strokeWidth="2" fill="currentColor" opacity="0.15" /><path d="M12 6v12M6 10h12" strokeWidth="1" opacity="0.3" /></>,
  buff_atk: <><path d="M4 20L20 4" strokeWidth="2.5" /><path d="M14 4h6v6" strokeWidth="2.5" /></>,
  buff_def: <><path d="M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6z" strokeWidth="2.5" fill="currentColor" opacity="0.15" /><path d="M12 8v6" strokeWidth="2" /></>,
  buff_speed: <><path d="M4 12h16" strokeWidth="2.5" /><path d="M14 6l6 6-6 6" strokeWidth="2.5" /><path d="M4 8h8M4 16h8" strokeWidth="1.5" opacity="0.4" /></>,
  poison: <><path d="M10 2h4v4l3 6v8H7v-8l3-6V2z" strokeWidth="2" fill="currentColor" opacity="0.15" /><circle cx="12" cy="17" r="2.5" fill="currentColor" opacity="0.3" /></>,
  bleed: <><path d="M12 4c-2 3-5 6-5 10a5 5 0 0010 0c0-4-3-7-5-10z" strokeWidth="2" fill="currentColor" opacity="0.2" /></>,
  stun: <><path d="M12 2l2 5h5l-4 3 1.5 5L12 12l-4.5 3L9 10 5 7h5z" strokeWidth="2" fill="currentColor" opacity="0.2" /></>,
  slow: <><circle cx="12" cy="12" r="9" strokeWidth="2" /><path d="M12 6v6l4 2" strokeWidth="2" /></>,
  drain: <><path d="M12 4c-2 3-5 6-5 10a5 5 0 0010 0c0-4-3-7-5-10z" strokeWidth="2" fill="currentColor" opacity="0.2" /><path d="M12 14v4" strokeWidth="2" /><path d="M10 16h4" strokeWidth="1.5" /></>,
  summon: <><circle cx="12" cy="12" r="8" strokeWidth="2" strokeDasharray="4 2" /><path d="M12 4v16M4 12h16" strokeWidth="1.5" opacity="0.4" /><circle cx="12" cy="12" r="3" fill="currentColor" opacity="0.3" /></>,
  teleport: <><path d="M4 4l16 16M20 4L4 20" strokeWidth="2" opacity="0.3" /><circle cx="12" cy="12" r="4" strokeWidth="2" fill="currentColor" opacity="0.2" /></>,
  stealth: <><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" strokeWidth="2" /><circle cx="12" cy="12" r="3" strokeWidth="2" /><path d="M4 20L20 4" strokeWidth="2.5" /></>,
  roar: <><path d="M12 4v4M12 16v4" strokeWidth="2" /><path d="M8 8c-2 2-2 6 0 8" strokeWidth="2" /><path d="M16 8c2 2 2 6 0 8" strokeWidth="2" /><path d="M5 6c-3 3-3 9 0 12" strokeWidth="1.5" opacity="0.5" /><path d="M19 6c3 3 3 9 0 12" strokeWidth="1.5" opacity="0.5" /><circle cx="12" cy="12" r="2" fill="currentColor" /></>,
  howl: <><path d="M12 2v6" strokeWidth="2.5" /><path d="M8 8c0-2 2-4 4-4s4 2 4 4" strokeWidth="2" /><path d="M6 12c-2 2-2 6 0 8" strokeWidth="2" /><path d="M18 12c2 2 2 6 0 8" strokeWidth="2" /><path d="M12 14v6" strokeWidth="2" /></>,
  skill_generic: <><circle cx="12" cy="12" r="8" strokeWidth="2" /><path d="M12 8v8M8 12h8" strokeWidth="2" /></>,
};

export const SkillIcon: React.FC<Props> = ({ name, size = 24, className = '' }) => {
  const icon = I[name] || I.skill_generic;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
      className={`inline-block shrink-0 ${className}`} aria-hidden="true">
      {icon}
    </svg>
  );
};

export default SkillIcon;
