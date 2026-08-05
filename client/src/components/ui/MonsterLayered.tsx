import React, { useEffect, useState, useRef } from 'react';

export type MonsterState = 'idle' | 'walk' | 'attack' | 'hit' | 'death' | 'skill_1' | 'skill_2' | 'spawn';
export type MonsterId = 'cloud_titan' | 'storm_harpy' | 'goblin' | 'rat' | 'wolf_pup' | 'mist_wolf' | 'shadow_sprite' | 'sand_scorpion' | 'mirage_beast' | 'dune_crawler' | 'sea_wraith' | 'deep_leviathan_jr';

const SPRITES: Record<MonsterId, Record<string, string>> = {
  goblin:            { idle: 'monster_goblin_idle_1', attack: 'monster_goblin_attack_1', hit: 'monster_goblin_idle_1', death: 'monster_goblin_idle_1', walk: 'monster_goblin_idle_1' },
  rat:               { idle: 'monster_rat_idle_1', attack: 'monster_rat_idle_1', hit: 'monster_rat_idle_1', death: 'monster_rat_idle_1', walk: 'monster_rat_idle_1' },
  wolf_pup:          { idle: 'monster_wolf_pup_idle_1', attack: 'monster_wolf_pup_attack_1', hit: 'monster_wolf_pup_idle_1', death: 'monster_wolf_pup_idle_1', walk: 'monster_wolf_pup_idle_1' },
  mist_wolf:         { idle: 'monster_goblin_idle_1', attack: 'monster_goblin_attack_1', hit: 'monster_goblin_idle_1', death: 'monster_goblin_idle_1', walk: 'monster_goblin_idle_1' },
  shadow_sprite:     { idle: 'monster_goblin_idle_1', attack: 'monster_goblin_attack_1', hit: 'monster_goblin_idle_1', death: 'monster_goblin_idle_1', walk: 'monster_goblin_idle_1' },
  sand_scorpion:     { idle: 'monster_goblin_idle_1', attack: 'monster_goblin_attack_1', hit: 'monster_goblin_idle_1', death: 'monster_goblin_idle_1', walk: 'monster_goblin_idle_1' },
  mirage_beast:      { idle: 'monster_goblin_idle_1', attack: 'monster_goblin_attack_1', hit: 'monster_goblin_idle_1', death: 'monster_goblin_idle_1', walk: 'monster_goblin_idle_1' },
  dune_crawler:      { idle: 'monster_goblin_idle_1', attack: 'monster_goblin_attack_1', hit: 'monster_goblin_idle_1', death: 'monster_goblin_idle_1', walk: 'monster_goblin_idle_1' },
  storm_harpy:       { idle: 'monster_goblin_idle_1', attack: 'monster_goblin_attack_1', hit: 'monster_goblin_idle_1', death: 'monster_goblin_idle_1', walk: 'monster_goblin_idle_1' },
  cloud_titan:       { idle: 'monster_goblin_idle_1', attack: 'monster_goblin_attack_1', hit: 'monster_goblin_idle_1', death: 'monster_goblin_idle_1', walk: 'monster_goblin_idle_1' },
  sea_wraith:        { idle: 'monster_goblin_idle_1', attack: 'monster_goblin_attack_1', hit: 'monster_goblin_idle_1', death: 'monster_goblin_idle_1', walk: 'monster_goblin_idle_1' },
  deep_leviathan_jr: { idle: 'monster_goblin_idle_1', attack: 'monster_goblin_attack_1', hit: 'monster_goblin_idle_1', death: 'monster_goblin_idle_1', walk: 'monster_goblin_idle_1' },
};

const getSpritePath = (id: MonsterId, state: MonsterState): string => {
  const baseState = state.startsWith('skill_') ? 'attack' : state === 'spawn' ? 'idle' : state;
  const name = SPRITES[id]?.[baseState] ?? SPRITES[id]?.idle ?? 'monster_goblin_idle_1';
  return `/assets/sprites/${name}.png`;
};

export interface MonsterSkill { id: string; name: string; description: string; damage: number; type: 'physical' | 'magic' | 'buff'; state: MonsterState; cooldown: number; icon: string; }

export const MONSTER_SKILLS: Record<MonsterId, MonsterSkill[]> = {
  goblin:             [{ id: 'claw_slash', name: 'Golpe de Garra', description: 'Ataque rápido', damage: 15, type: 'physical', state: 'skill_1', cooldown: 0, icon: 'slash' }, { id: 'war_cry', name: 'Grito de Guerra', description: 'ATK +20%', damage: 0, type: 'buff', state: 'skill_2', cooldown: 3, icon: 'volume' }],
  rat:                [{ id: 'vicious_bite', name: 'Mordida Feroz', description: 'Sangramento', damage: 12, type: 'physical', state: 'skill_1', cooldown: 0, icon: 'slash' }, { id: 'poison_bite', name: 'Mordida Venenosa', description: 'DoT', damage: 8, type: 'magic', state: 'skill_2', cooldown: 4, icon: 'potion' }],
  wolf_pup:           [{ id: 'pounce', name: 'Bote', description: 'Salto', damage: 18, type: 'physical', state: 'skill_1', cooldown: 1, icon: 'slash' }, { id: 'howl', name: 'Uivo', description: 'Speed', damage: 0, type: 'buff', state: 'skill_2', cooldown: 3, icon: 'volume' }],
  mist_wolf:          [{ id: 'spectral_bite', name: 'Mordida Espectral', description: 'Ignora def', damage: 22, type: 'magic', state: 'skill_1', cooldown: 1, icon: 'magic' }, { id: 'frost_breath', name: 'Sopro Gélido', description: 'Slow', damage: 15, type: 'magic', state: 'skill_2', cooldown: 4, icon: 'droplet' }],
  shadow_sprite:      [{ id: 'shadow_claw', name: 'Garras Sombrias', description: 'Drain', damage: 18, type: 'magic', state: 'skill_1', cooldown: 0, icon: 'magic' }, { id: 'shadow_bolt', name: 'Raio das Sombras', description: 'Def debuff', damage: 25, type: 'magic', state: 'skill_2', cooldown: 3, icon: 'void' }],
  sand_scorpion:      [{ id: 'pincer_crush', name: 'Pinça', description: 'Bleed', damage: 20, type: 'physical', state: 'skill_1', cooldown: 1, icon: 'slash' }, { id: 'stinger_strike', name: 'Ferroada', description: 'Paralyze', damage: 15, type: 'magic', state: 'skill_2', cooldown: 3, icon: 'potion' }],
  mirage_beast:       [{ id: 'illusion_strike', name: 'Golpe Ilusório', description: 'Hard to dodge', damage: 22, type: 'physical', state: 'skill_1', cooldown: 1, icon: 'slash' }, { id: 'clone_split', name: 'Clones', description: '+50% dmg', damage: 0, type: 'buff', state: 'skill_2', cooldown: 4, icon: 'sparkles' }],
  dune_crawler:       [{ id: 'mandible_bite', name: 'Mandíbula', description: 'Brutal', damage: 24, type: 'physical', state: 'skill_1', cooldown: 1, icon: 'slash' }, { id: 'sand_burrow', name: 'Emboscada', description: 'Unavoidable', damage: 28, type: 'physical', state: 'skill_2', cooldown: 4, icon: 'earth' }],
  storm_harpy:        [{ id: 'diving_talons', name: 'Mergulho', description: 'Electric', damage: 28, type: 'physical', state: 'skill_1', cooldown: 1, icon: 'lightning' }, { id: 'lightning_storm', name: 'Raios', description: 'AoE', damage: 30, type: 'magic', state: 'skill_2', cooldown: 4, icon: 'lightning' }],
  cloud_titan:        [{ id: 'thunder_smash', name: 'Trovão', description: 'Stun', damage: 45, type: 'physical', state: 'skill_1', cooldown: 3, icon: 'hammer' }, { id: 'divine_storm', name: 'Tempestade', description: 'AoE', damage: 40, type: 'magic', state: 'skill_2', cooldown: 5, icon: 'lightning' }],
  sea_wraith:         [{ id: 'tidal_wave', name: 'Onda', description: 'Push', damage: 20, type: 'magic', state: 'skill_1', cooldown: 1, icon: 'wave' }, { id: 'drowning_embrace', name: 'Abraço', description: 'DoT', damage: 15, type: 'magic', state: 'skill_2', cooldown: 4, icon: 'droplet' }],
  deep_leviathan_jr:  [{ id: 'devouring_bite', name: 'Mordida', description: 'Massive', damage: 35, type: 'physical', state: 'skill_1', cooldown: 2, icon: 'slash' }, { id: 'tsunami', name: 'Tsunami', description: 'AoE', damage: 40, type: 'magic', state: 'skill_2', cooldown: 5, icon: 'wave' }],
};

interface Props {
  monsterId: MonsterId;
  state: MonsterState;
  size?: number;
  className?: string;
  flip?: boolean;
  onAnimationEnd?: () => void;
  glowColor?: string;
  buffs?: string[];
}

export const MonsterLayered: React.FC<Props> = ({
  monsterId, state, size = 128, className = '', flip = true,
  onAnimationEnd, glowColor = '#ef4444',
}) => {
  const [src, setSrc] = useState('');
  const animEndRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    setSrc(getSpritePath(monsterId, state));
    if (animEndRef.current) clearTimeout(animEndRef.current);
    const oneShot = ['attack', 'hit', 'death', 'skill_1', 'skill_2', 'spawn'];
    if (oneShot.includes(state) && onAnimationEnd) {
      animEndRef.current = setTimeout(onAnimationEnd, 600);
    }
    return () => { if (animEndRef.current) clearTimeout(animEndRef.current); };
  }, [state, monsterId, onAnimationEnd]);

  // Preload
  useEffect(() => {
    const img = new Image();
    img.src = getSpritePath(monsterId, 'idle');
  }, [monsterId]);

  const getFilter = (): string => {
    switch (state) {
      case 'hit': return 'brightness(2.5) sepia(1) hue-rotate(-30deg) saturate(5)';
      case 'death': return 'brightness(0.3) saturate(0.1)';
      case 'skill_2': return `brightness(1.3) saturate(1.5) drop-shadow(0 0 10px ${glowColor}99)`;
      case 'skill_1': return 'brightness(1.1) contrast(1.1)';
      default: return '';
    }
  };

  const getAnim = (): string => {
    switch (state) {
      case 'idle': return 'mlIdle 3.5s ease-in-out infinite';
      case 'walk': return 'mlWalk 0.6s ease-in-out infinite';
      case 'attack': case 'skill_1': return `mlAttack 0.5s cubic-bezier(0.22,0.61,0.36,1) forwards`;
      case 'skill_2': return 'mlSkill2 0.8s ease-in-out forwards';
      case 'hit': return 'mlHit 0.35s ease-out forwards';
      case 'death': return 'mlDeath 1.5s ease-in forwards';
      case 'spawn': return 'mlSpawn 0.8s ease-out forwards';
      default: return '';
    }
  };

  return (
    <div className={`relative inline-flex items-end justify-center ${className}`}
      style={{ width: size, height: size * 1.2, transform: flip ? 'scaleX(-1)' : undefined }}>
      
      <div className={`absolute bottom-1 left-1/2 -translate-x-1/2 rounded-full blur-2xl ${
        state === 'skill_2' ? 'opacity-50 animate-pulse' : 'opacity-25'
      }`} style={{ width: size * 0.45, height: size * 0.15, backgroundColor: glowColor }} />

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full bg-black/40 blur-sm"
        style={{ width: size * 0.3, height: size * 0.04 }} />

      {src && (
        <img src={src} alt="" draggable={false} className="select-none"
          style={{ width: size, height: size * 1.1, objectFit: 'contain', objectPosition: 'bottom', animation: getAnim(), filter: getFilter() }}
        />
      )}

      {/* Attack slash VFX */}
      {(state === 'attack' || state === 'skill_1') && (
        <div className="absolute inset-0 pointer-events-none overflow-visible z-20">
          <svg className="absolute" style={{ top: '15%', left: '-35%', width: size * 0.7, height: size * 0.5, animation: 'mlSlash 0.4s ease-out forwards' }} viewBox="0 0 70 50" fill="none">
            <path d="M5 25 L65 10" stroke="rgba(255,255,255,0.85)" strokeWidth="3" strokeLinecap="round" />
            <path d="M10 35 L55 22" stroke="rgba(255,200,80,0.6)" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </div>
      )}

      {/* Skill 2 aura */}
      {state === 'skill_2' && (
        <div className="absolute inset-0 pointer-events-none z-20">
          <div className="absolute inset-0 rounded-full" style={{
            background: `radial-gradient(circle at 50% 40%, ${glowColor}55 0%, transparent 55%)`,
            animation: 'mlAura 0.8s ease-out forwards',
          }} />
        </div>
      )}

      {/* Hit flash */}
      {state === 'hit' && (
        <div className="absolute inset-0 pointer-events-none z-20 mix-blend-overlay"
          style={{ background: 'linear-gradient(to top, rgba(255,0,0,0.5), transparent)', animation: 'mlHitFlash 0.35s ease-out forwards' }} />
      )}

      <style>{`
        @keyframes mlIdle { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-2px)} }
        @keyframes mlWalk { 0%,100%{transform:translateY(0) rotate(0)} 25%{transform:translateY(-3px) rotate(-1deg)} 75%{transform:translateY(-3px) rotate(1deg)} }
        @keyframes mlAttack { 0%{transform:translateX(0) rotate(0)} 12%{transform:translateX(4px) rotate(2deg)} 35%{transform:translateX(-${size*0.18}px) rotate(-4deg) scale(1.05)} 55%{transform:translateX(-${size*0.12}px)} 100%{transform:translateX(0) rotate(0) scale(1)} }
        @keyframes mlSkill2 { 0%{transform:translateY(0) scale(1)} 30%{transform:translateY(-8px) scale(1.05)} 60%{transform:translateY(-10px) scale(1.08)} 100%{transform:translateY(0) scale(1)} }
        @keyframes mlHit { 0%{transform:translateX(0)} 20%{transform:translateX(${size*0.08}px)} 40%{transform:translateX(-${size*0.04}px)} 100%{transform:translateX(0)} }
        @keyframes mlDeath { 0%{transform:rotate(0);opacity:1} 50%{transform:rotate(25deg);opacity:0.5} 100%{transform:rotate(70deg) translateY(20px);opacity:0} }
        @keyframes mlSpawn { 0%{transform:scale(0.3) translateY(20px);opacity:0} 40%{transform:scale(1.1);opacity:1} 100%{transform:scale(1) translateY(0)} }
        @keyframes mlSlash { 0%{opacity:0;transform:translateX(8px)} 15%{opacity:1} 100%{opacity:0;transform:translateX(-8px)} }
        @keyframes mlAura { 0%{transform:scale(0.5);opacity:0} 35%{transform:scale(1.2);opacity:0.8} 100%{transform:scale(1.6);opacity:0} }
        @keyframes mlHitFlash { 0%{opacity:0.7} 40%{opacity:0.4} 100%{opacity:0} }
      `}</style>
    </div>
  );
};

export default MonsterLayered;
