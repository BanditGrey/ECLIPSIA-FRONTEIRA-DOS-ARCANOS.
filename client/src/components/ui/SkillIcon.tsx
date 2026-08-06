import React from 'react';

export type SkillIconName =
  | 'slash' | 'pierce' | 'smash' | 'whirlwind' | 'backstab'
  | 'fireball' | 'ice_shard' | 'lightning' | 'shadow_bolt' | 'nature'
  | 'heal' | 'barrier' | 'buff_atk' | 'buff_def' | 'buff_speed'
  | 'poison' | 'bleed' | 'stun' | 'slow' | 'drain'
  | 'summon' | 'teleport' | 'stealth' | 'roar' | 'howl'
  | 'skill_generic';

interface Props { name: SkillIconName; size?: number; className?: string; }

export const SkillIcon: React.FC<Props> = ({ name, size = 24, className = '' }) => {
  return (
    <div 
        className={`inline-block shrink-0 ${className} relative overflow-hidden rounded-full`}
        style={{ 
            width: size, 
            height: size,
            backgroundColor: '#1f2937'
        }}
        aria-hidden="true"
    >
        <img 
            src={`/assets/sprites/icon_skill_${name}.png`} 
            alt={name}
            onError={(e) => { e.currentTarget.src = '/assets/sprites/icon_skill_skill_generic.png'; }}
            className="w-full h-full object-cover"
        />
    </div>
  );
};

export default SkillIcon;
