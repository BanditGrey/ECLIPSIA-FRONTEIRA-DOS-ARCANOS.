import React, { useEffect, useState, useRef } from 'react';

export type MonsterState = 'idle' | 'walk' | 'attack' | 'hit' | 'death' | 'skill_1' | 'skill_2' | 'spawn';
export type MonsterId =
  | 'cloud_titan' | 'storm_harpy' | 'goblin' | 'rat' | 'wolf_pup'
  | 'mist_wolf' | 'shadow_sprite' | 'sand_scorpion' | 'mirage_beast'
  | 'dune_crawler' | 'sea_wraith' | 'deep_leviathan_jr' | 'forest_golem'
  | 'bandit_leader' | 'root_guardian' | 'void_mirror' | 'azhur' | 'thal_mora' | 'velkaryn';

/**
 * Helper: escolhe sprite com fallback em cascata.
 * Se um estado específico não existir, cai para idle.
 */
const resolveSprite = (id: MonsterId, state: string): string => {
  // Mapa de sprites. Se um monstro não tiver sprite para um estado, o helper
  // de resolução faz fallback para o 'idle' (ou goblin_idle como último recurso).
  // Os monstros marcados com // TODO ainda não têm sprites próprias em disco —
  // caem para fallback até serem gerados.
  const map: Record<MonsterId, Partial<Record<string, string>>> = {
    goblin:            { idle: 'monster_goblin_idle_1', attack: 'monster_goblin_attack_1', hit: 'monster_goblin_hit_1' },
    rat:               { idle: 'monster_rat_idle_1', attack: 'monster_rat_attack_1', hit: 'monster_rat_hit_1' },
    wolf_pup:          { idle: 'monster_wolf_pup_idle_1', attack: 'monster_wolf_pup_attack_1', hit: 'monster_wolf_pup_hit_1', walk: 'monster_wolf_pup_walk_1' },
    mist_wolf:         { idle: 'monster_mist_wolf_idle_1', attack: 'monster_mist_wolf_attack_1', hit: 'monster_mist_wolf_hit_1' },
    shadow_sprite:     { idle: 'monster_shadow_sprite_idle_1', attack: 'monster_shadow_sprite_attack_1', hit: 'monster_shadow_sprite_hit_1' },
    sand_scorpion:     { idle: 'monster_sand_scorpion_idle_1', attack: 'monster_sand_scorpion_attack_1', hit: 'monster_sand_scorpion_hit_1' },
    mirage_beast:      { idle: 'monster_mirage_beast_idle_1', attack: 'monster_mirage_beast_attack_1', hit: 'monster_mirage_beast_hit_1' },
    dune_crawler:      { idle: 'monster_dune_crawler_idle_1', attack: 'monster_dune_crawler_attack_1', hit: 'monster_dune_crawler_hit_1' },
    storm_harpy:       { idle: 'monster_storm_harpy_idle_1', attack: 'monster_storm_harpy_attack_1', hit: 'monster_storm_harpy_hit_1' },
    cloud_titan:       { idle: 'monster_cloud_titan_idle_1', attack: 'monster_cloud_titan_attack_1', hit: 'monster_cloud_titan_hit_1' },
    sea_wraith:        { idle: 'monster_sea_wraith_idle_1', attack: 'monster_sea_wraith_attack_1', hit: 'monster_sea_wraith_hit_1' },
    deep_leviathan_jr: { idle: 'monster_deep_leviathan_jr_idle_1', attack: 'monster_deep_leviathan_jr_attack_1', hit: 'monster_deep_leviathan_jr_hit_1' },
    forest_golem:      { idle: 'monster_forest_golem_idle_1', attack: 'monster_forest_golem_attack_1', hit: 'monster_forest_golem_hit_1' },
    bandit_leader:     { idle: 'monster_bandit_leader_idle_1', attack: 'monster_bandit_leader_attack_1', hit: 'monster_bandit_leader_hit_1' },
    root_guardian:     { idle: 'monster_root_guardian_idle_1', attack: 'monster_root_guardian_attack_1', hit: 'monster_root_guardian_hit_1' },
    void_mirror:       { idle: 'monster_void_mirror_idle_1', attack: 'monster_void_mirror_attack_1', hit: 'monster_void_mirror_hit_1' },
    azhur:             { idle: 'monster_azhur_idle_1', attack: 'monster_azhur_attack_1', hit: 'monster_azhur_hit_1' },
    thal_mora:         { idle: 'monster_thal_mora_idle_1', attack: 'monster_thal_mora_attack_1', hit: 'monster_thal_mora_hit_1' },
    velkaryn:          { idle: 'monster_velkaryn_idle_1', attack: 'monster_velkaryn_attack_1', hit: 'monster_velkaryn_hit_1' },
  };
  const base = state.startsWith('skill_') ? 'attack' : state === 'spawn' ? 'idle' : state;
  const rec = map[id] ?? {};
  return rec[base] ?? rec.idle ?? 'monster_goblin_idle_1';
};

const getSpritePath = (id: MonsterId, state: MonsterState): string =>
  `/assets/sprites/${resolveSprite(id, state)}.png`;

/** Cor elemental do glow por monstro (usado no skill_2 / aura). */
export const MONSTER_GLOW: Record<MonsterId, string> = {
  goblin: '#ef4444', rat: '#84cc16', wolf_pup: '#94a3b8', mist_wolf: '#67e8f9',
  shadow_sprite: '#a855f7', sand_scorpion: '#f59e0b', mirage_beast: '#fde68a',
  dune_crawler: '#b45309', storm_harpy: '#60a5fa', cloud_titan: '#e0e7ff',
  sea_wraith: '#22d3ee', deep_leviathan_jr: '#0ea5e9', forest_golem: '#22c55e',
  bandit_leader: '#ef4444', root_guardian: '#4ade80', void_mirror: '#c084fc',
  azhur: '#f97316', thal_mora: '#a855f7', velkaryn: '#ef4444'
};

export interface MonsterSkill {
  id: string;
  name: string;
  description: string;
  damage: number;
  type: 'physical' | 'magic' | 'buff';
  state: MonsterState;
  cooldown: number;
  icon: string;
}

export const MONSTER_SKILLS: Record<MonsterId, MonsterSkill[]> = {
  goblin:             [{ id: 'claw_slash', name: 'Golpe de Garra', description: 'Ataque rápido', damage: 15, type: 'physical', state: 'skill_1', cooldown: 0, icon: 'slash' }, { id: 'war_cry', name: 'Grito de Guerra', description: 'ATK +20%', damage: 0, type: 'buff', state: 'skill_2', cooldown: 3, icon: 'roar' }],
  rat:                [{ id: 'vicious_bite', name: 'Mordida Feroz', description: 'Sangramento', damage: 12, type: 'physical', state: 'skill_1', cooldown: 0, icon: 'slash' }, { id: 'poison_bite', name: 'Mordida Venenosa', description: 'DoT', damage: 8, type: 'magic', state: 'skill_2', cooldown: 4, icon: 'poison' }],
  wolf_pup:           [{ id: 'pounce', name: 'Bote', description: 'Salto', damage: 18, type: 'physical', state: 'skill_1', cooldown: 1, icon: 'slash' }, { id: 'howl', name: 'Uivo', description: 'Speed', damage: 0, type: 'buff', state: 'skill_2', cooldown: 3, icon: 'howl' }],
  mist_wolf:          [{ id: 'spectral_bite', name: 'Mordida Espectral', description: 'Ignora def', damage: 22, type: 'magic', state: 'skill_1', cooldown: 1, icon: 'shadow_bolt' }, { id: 'frost_breath', name: 'Sopro Gélido', description: 'Slow', damage: 15, type: 'magic', state: 'skill_2', cooldown: 4, icon: 'ice_shard' }],
  shadow_sprite:      [{ id: 'shadow_claw', name: 'Garras Sombrias', description: 'Drain', damage: 18, type: 'magic', state: 'skill_1', cooldown: 0, icon: 'shadow_bolt' }, { id: 'shadow_bolt', name: 'Raio das Sombras', description: 'Def debuff', damage: 25, type: 'magic', state: 'skill_2', cooldown: 3, icon: 'shadow_bolt' }],
  sand_scorpion:      [{ id: 'pincer_crush', name: 'Pinça', description: 'Bleed', damage: 20, type: 'physical', state: 'skill_1', cooldown: 1, icon: 'slash' }, { id: 'stinger_strike', name: 'Ferroada', description: 'Paralyze', damage: 15, type: 'magic', state: 'skill_2', cooldown: 3, icon: 'poison' }],
  mirage_beast:       [{ id: 'illusion_strike', name: 'Golpe Ilusório', description: 'Hard to dodge', damage: 22, type: 'physical', state: 'skill_1', cooldown: 1, icon: 'slash' }, { id: 'clone_split', name: 'Clones', description: '+50% dmg', damage: 0, type: 'buff', state: 'skill_2', cooldown: 4, icon: 'summon' }],
  dune_crawler:       [{ id: 'mandible_bite', name: 'Mandíbula', description: 'Brutal', damage: 24, type: 'physical', state: 'skill_1', cooldown: 1, icon: 'slash' }, { id: 'sand_burrow', name: 'Emboscada', description: 'Unavoidable', damage: 28, type: 'physical', state: 'skill_2', cooldown: 4, icon: 'smash' }],
  storm_harpy:        [{ id: 'diving_talons', name: 'Mergulho', description: 'Electric', damage: 28, type: 'physical', state: 'skill_1', cooldown: 1, icon: 'lightning' }, { id: 'lightning_storm', name: 'Raios', description: 'AoE', damage: 30, type: 'magic', state: 'skill_2', cooldown: 4, icon: 'lightning' }],
  cloud_titan:        [{ id: 'thunder_smash', name: 'Trovão', description: 'Stun', damage: 45, type: 'physical', state: 'skill_1', cooldown: 3, icon: 'smash' }, { id: 'divine_storm', name: 'Tempestade', description: 'AoE', damage: 40, type: 'magic', state: 'skill_2', cooldown: 5, icon: 'lightning' }],
  sea_wraith:         [{ id: 'tidal_wave', name: 'Onda', description: 'Push', damage: 20, type: 'magic', state: 'skill_1', cooldown: 1, icon: 'buff_atk' }, { id: 'drowning_embrace', name: 'Abraço', description: 'DoT', damage: 15, type: 'magic', state: 'skill_2', cooldown: 4, icon: 'drain' }],
  deep_leviathan_jr:  [{ id: 'devouring_bite', name: 'Mordida', description: 'Massive', damage: 35, type: 'physical', state: 'skill_1', cooldown: 2, icon: 'smash' }, { id: 'tsunami', name: 'Tsunami', description: 'AoE', damage: 40, type: 'magic', state: 'skill_2', cooldown: 5, icon: 'buff_atk' }],
  forest_golem:       [{ id: 'root_slam', name: 'Raio Esmagador', description: 'Raízes pesadas', damage: 26, type: 'physical', state: 'skill_1', cooldown: 1, icon: 'smash' }, { id: 'natures_wrath', name: 'Fúria da Natureza', description: 'Stun', damage: 20, type: 'magic', state: 'skill_2', cooldown: 4, icon: 'poison' }],
  bandit_leader:      [{ id: 'dual_strike', name: 'Ataque Duplo', description: 'Ataca duas vezes', damage: 25, type: 'physical', state: 'skill_1', cooldown: 2, icon: 'slash' }, { id: 'rally', name: 'Incitamento', description: 'ATK +20%', damage: 0, type: 'buff', state: 'skill_2', cooldown: 4, icon: 'roar' }],
  root_guardian:      [{ id: 'vine_whip', name: 'Chicote de Vinhas', description: 'Prende o alvo', damage: 30, type: 'physical', state: 'skill_1', cooldown: 2, icon: 'nature' }, { id: 'nature_heal', name: 'Síntese Natural', description: 'Cura HP', damage: 0, type: 'buff', state: 'skill_2', cooldown: 5, icon: 'heal' }],
  void_mirror:        [{ id: 'void_ray', name: 'Raio do Vazio', description: 'Dano massivo', damage: 40, type: 'magic', state: 'skill_1', cooldown: 3, icon: 'shadow_bolt' }, { id: 'reflect', name: 'Reflexão', description: 'Reflete dano', damage: 0, type: 'buff', state: 'skill_2', cooldown: 4, icon: 'barrier' }],
  azhur:              [{ id: 'sand_storm', name: 'Tempestade de Areia', description: 'Dano em área', damage: 35, type: 'magic', state: 'skill_1', cooldown: 3, icon: 'whirlwind' }, { id: 'desert_fury', name: 'Fúria do Deserto', description: 'ATK +30%', damage: 0, type: 'buff', state: 'skill_2', cooldown: 4, icon: 'roar' }],
  thal_mora:          [{ id: 'illusion_strike', name: 'Golpe Ilusório', description: 'Ignora armadura', damage: 45, type: 'magic', state: 'skill_1', cooldown: 2, icon: 'pierce' }, { id: 'mind_control', name: 'Controle Mental', description: 'Confusão', damage: 15, type: 'magic', state: 'skill_2', cooldown: 5, icon: 'shadow_bolt' }],
  velkaryn:           [{ id: 'blood_slash', name: 'Corte de Sangue', description: 'Rouba HP', damage: 35, type: 'physical', state: 'skill_1', cooldown: 2, icon: 'drain' }, { id: 'vampiric_aura', name: 'Aura Vampírica', description: 'Regen', damage: 0, type: 'buff', state: 'skill_2', cooldown: 6, icon: 'heal' }],
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
  onAnimationEnd, glowColor: glowOverride,
}) => {
  const [src, setSrc] = useState('');
  const animEndRef = useRef<ReturnType<typeof setTimeout>>();

  // Glow color: override prop > tabela por monstro > padrão vermelho
  const glowColor = glowOverride ?? MONSTER_GLOW[monsterId] ?? '#ef4444';

  useEffect(() => {
    setSrc(getSpritePath(monsterId, state));
    if (animEndRef.current) clearTimeout(animEndRef.current);
    const oneShot = ['attack', 'hit', 'death', 'skill_1', 'skill_2', 'spawn'];
    if (oneShot.includes(state) && onAnimationEnd) {
      animEndRef.current = setTimeout(onAnimationEnd, 600);
    }
    return () => { if (animEndRef.current) clearTimeout(animEndRef.current); };
  }, [state, monsterId, onAnimationEnd]);

  // Preload idle + attack
  useEffect(() => {
    const img = new Image();
    img.src = getSpritePath(monsterId, 'idle');
    if (resolveSprite(monsterId, 'attack') !== resolveSprite(monsterId, 'idle')) {
      const img2 = new Image();
      img2.src = getSpritePath(monsterId, 'attack');
    }
    if (resolveSprite(monsterId, 'hit') !== resolveSprite(monsterId, 'idle')) {
      const img3 = new Image();
      img3.src = getSpritePath(monsterId, 'hit');
    }
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
          <img 
            src="/assets/sprites/vfx_slash.png" 
            alt="slash" 
            className="absolute"
            style={{ 
                top: '15%', left: '-35%', width: size * 0.7, height: size * 0.5, 
                animation: 'mlSlash 0.4s ease-out forwards',
                objectFit: 'contain',
                transform: 'scaleX(-1)' // Inverte horizontalmente pro monstro
            }} 
          />
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
