/**
 * SISTEMA DE PASSIVAS — Árvore tipo Path of Exile
 *
 * 3 ramos principais:
 * - Ofensiva (atk, crit, skill dmg, basic atk dmg)
 * - Defensiva (def, hp, shield, barrier, reflect, dodge)
 * - Utilidade (speed, loot, xp, pet, mount, skill cd/mp reduce)
 *
 * Cada ramo tem 10 nós + 1 keystone no final.
 * Cada nó custa 1 ponto de passiva.
 * Pontos ganhos: 1 por nível do jogador.
 * Passivas são permanentes até reset (com custo em ouro/item).
 */

export interface PassiveNode {
  id: string;
  name: string;
  description: string;
  branch: 'offensive' | 'defensive' | 'utility';
  tier: number; // 1-10 (10 é o keystone)
  parent?: string | null; // id do nó pai (null para o primeiro de cada ramo)
  requires?: string[]; // ids de passivas necessárias
  effect: string; // descrição do efeito aplicado ao jogador
}

export interface PassiveBranch {
  id: 'offensive' | 'defensive' | 'utility';
  name: string;
  icon: string;
  nodes: PassiveNode[];
  keystone: PassiveNode;
}

export const PASSIVE_NODES: PassiveNode[] = [
  // RAMO OFENSIVO
  { id: 'atk_1', name: '+5% ATK', description: 'Aumenta o ataque base em 5%.', branch: 'offensive', tier: 1, parent: null, effect: 'atk +0.05' },
  { id: 'atk_2', name: '+8% ATK', description: 'Aumenta o ataque base em 8%.', branch: 'offensive', tier: 2, parent: 'atk_1', requires: ['atk_1'], effect: 'atk +0.08' },
  { id: 'crit_chance_1', name: '+3% Crit Chance', description: 'Aumenta a chance de crítico em 3%.', branch: 'offensive', tier: 3, parent: 'atk_2', requires: ['atk_2'], effect: 'critChance +0.03' },
  { id: 'crit_dmg_1', name: '+10% Crit Dmg', description: 'Aumenta o dano crítico em 10%.', branch: 'offensive', tier: 4, parent: 'crit_chance_1', requires: ['crit_chance_1'], effect: 'critDmg +0.10' },
  { id: 'skill_dmg_1', name: '+8% Skill Dmg', description: 'Aumenta o dano de skills em 8%.', branch: 'offensive', tier: 5, parent: 'crit_dmg_1', requires: ['crit_dmg_1'], effect: 'skillDmg +0.08' },
  { id: 'basic_atk_dmg_1', name: '+7% Basic Atk Dmg', description: 'Aumenta o dano do ataque básico em 7%.', branch: 'offensive', tier: 6, parent: 'skill_dmg_1', requires: ['skill_dmg_1'], effect: 'basicAtkDmg +0.07' },
  { id: 'dot_dmg_1', name: '+6% DoT Dmg', description: 'Aumenta o dano de DoT em 6%.', branch: 'offensive', tier: 7, parent: 'basic_atk_dmg_1', requires: ['basic_atk_dmg_1'], effect: 'dotDmgBonus +0.06' },
  { id: 'execute_1', name: '+5% Execute Threshold', description: 'Aumenta o limiar de execução em 5%.', branch: 'offensive', tier: 8, parent: 'dot_dmg_1', requires: ['dot_dmg_1'], effect: 'executeThreshold +0.05' },
  { id: 'skill_heal_1', name: '+6% Skill Heal', description: 'Aumenta a cura de skills em 6%.', branch: 'offensive', tier: 9, parent: 'execute_1', requires: ['execute_1'], effect: 'skillHealBonus +0.06' },
  // KEYSTONE OFENSIVO
  { id: 'offensive_keystone', name: 'Fúria dos Arcanos', description: 'Dobra todos os bônus de dano e crítico. Reduz MP em 15%.', branch: 'offensive', tier: 10, parent: 'skill_heal_1', requires: ['skill_heal_1'], effect: 'dmgBonus +1.0, critDmg +1.0, mpReduce +0.15' },

  // RAMO DEFENSIVO
  { id: 'def_1', name: '+6% DEF', description: 'Aumenta a defesa base em 6%.', branch: 'defensive', tier: 1, parent: null, effect: 'def +0.06' },
  { id: 'def_2', name: '+10% DEF', description: 'Aumenta a defesa base em 10%.', branch: 'defensive', tier: 2, parent: 'def_1', requires: ['def_1'], effect: 'def +0.10' },
  { id: 'hp_1', name: '+8% HP', description: 'Aumenta a vida máxima em 8%.', branch: 'defensive', tier: 3, parent: 'def_2', requires: ['def_2'], effect: 'hp +0.08' },
  { id: 'shield_1', name: '+5% Shield Pool', description: 'Aumenta o pool de escudo absorvente em 5%.', branch: 'defensive', tier: 4, parent: 'hp_1', requires: ['hp_1'], effect: 'shieldBonus +0.05' },
  { id: 'barrier_1', name: '+5% Barrier Pool', description: 'Aumenta o pool de barreira mágica em 5%.', branch: 'defensive', tier: 5, parent: 'shield_1', requires: ['shield_1'], effect: 'barrierBonus +0.05' },
  { id: 'reflect_1', name: '+7% Reflect', description: 'Aumenta o reflexo de dano em 7%.', branch: 'defensive', tier: 6, parent: 'barrier_1', requires: ['barrier_1'], effect: 'reflectBonus +0.07' },
  { id: 'dodge_1', name: '+3% Dodge', description: 'Aumenta a esquiva em 3%.', branch: 'defensive', tier: 7, parent: 'reflect_1', requires: ['reflect_1'], effect: 'dodgeBonus +0.03' },
  { id: 'low_hp_def_1', name: '+6% Low HP DEF', description: 'Aumenta a defesa com HP baixo em 6%.', branch: 'defensive', tier: 8, parent: 'dodge_1', requires: ['dodge_1'], effect: 'lowHpDefBonus +0.06' },
  { id: 'heal_1', name: '+8% Heal Bonus', description: 'Aumenta o bônus de cura em 8%.', branch: 'defensive', tier: 9, parent: 'low_hp_def_1', requires: ['low_hp_def_1'], effect: 'healBonus +0.08' },
  // KEYSTONE DEFENSIVO
  { id: 'defensive_keystone', name: 'Muralha dos Arcanos', description: 'Dobra todos os bônus de defesa e cura. Aumenta o pool de escudo e barreira em 20%.', branch: 'defensive', tier: 10, parent: 'heal_1', requires: ['heal_1'], effect: 'defBonus +1.0, healBonus +1.0, shieldBonus +0.20, barrierBonus +0.20' },

  // RAMO UTILIDADE
  { id: 'speed_1', name: '+8% Speed', description: 'Aumenta a velocidade de exploração em 8%.', branch: 'utility', tier: 1, parent: null, effect: 'speed +0.08' },
  { id: 'loot_1', name: '+7% Loot', description: 'Aumenta o bônus de loot em 7%.', branch: 'utility', tier: 2, parent: 'speed_1', requires: ['speed_1'], effect: 'lootBonus +0.07' },
  { id: 'xp_1', name: '+6% XP', description: 'Aumenta o bônus de XP em 6%.', branch: 'utility', tier: 3, parent: 'loot_1', requires: ['loot_1'], effect: 'xpBonus +0.06' },
  { id: 'pet_1', name: '+5% Pet Bonus', description: 'Aumenta o bônus de pet em 5%.', branch: 'utility', tier: 4, parent: 'xp_1', requires: ['xp_1'], effect: 'petBonus +0.05' },
  { id: 'mount_1', name: '+6% Mount Bonus', description: 'Aumenta o bônus de montaria em 6%.', branch: 'utility', tier: 5, parent: 'pet_1', requires: ['pet_1'], effect: 'mountBonus +0.06' },
  { id: 'cd_1', name: '+5% Skill CD Reduce', description: 'Reduz o cooldown de skills em 5%.', branch: 'utility', tier: 6, parent: 'mount_1', requires: ['mount_1'], effect: 'skillCdReduce +0.05' },
  { id: 'mp_1', name: '+4% Skill MP Reduce', description: 'Reduz o custo de MP de skills em 4%.', branch: 'utility', tier: 7, parent: 'cd_1', requires: ['cd_1'], effect: 'skillMpReduce +0.04' },
  { id: 'dot_1', name: '+6% DoT Dmg', description: 'Aumenta o dano de DoT em 6%.', branch: 'utility', tier: 8, parent: 'mp_1', requires: ['mp_1'], effect: 'dotDmgBonus +0.06' },
  { id: 'execute_2', name: '+5% Execute Threshold', description: 'Aumenta o limiar de execução em 5%.', branch: 'utility', tier: 9, parent: 'dot_1', requires: ['dot_1'], effect: 'executeThreshold +0.05' },
  // KEYSTONE UTILIDADE
  { id: 'utility_keystone', name: 'Oráculo dos Arcanos', description: 'Dobra todos os bônus de utilidade. Aumenta a sorte (luck) em 50%.', branch: 'utility', tier: 10, parent: 'execute_2', requires: ['execute_2'], effect: 'speed +1.0, lootBonus +1.0, xpBonus +1.0, petBonus +1.0, mountBonus +1.0, luck +0.50' },
];

export const PASSIVE_BRANCHES: PassiveBranch[] = [
  {
    id: 'offensive',
    name: 'Ofensiva',
    icon: '⚔️',
    nodes: PASSIVE_NODES.filter((n) => n.branch === 'offensive'),
    keystone: PASSIVE_NODES.find((n) => n.id === 'offensive_keystone') as PassiveNode
  },
  {
    id: 'defensive',
    name: 'Defensiva',
    icon: '🛡️',
    nodes: PASSIVE_NODES.filter((n) => n.branch === 'defensive'),
    keystone: PASSIVE_NODES.find((n) => n.id === 'defensive_keystone') as PassiveNode
  },
  {
    id: 'utility',
    name: 'Utilidade',
    icon: '✨',
    nodes: PASSIVE_NODES.filter((n) => n.branch === 'utility'),
    keystone: PASSIVE_NODES.find((n) => n.id === 'utility_keystone') as PassiveNode
  }
];
