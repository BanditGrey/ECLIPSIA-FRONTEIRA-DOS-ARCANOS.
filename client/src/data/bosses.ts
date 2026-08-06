import type { MonsterLootEntry } from './monsters';

export interface BossMechanicsData {
  phases: number;
  phase2Trigger?: number;
  phase3Trigger?: number;
  enrageBelow?: number;
  atkBoost?: number;
  phase2AtkBoost?: number;
  enrageAtkBoost?: number;
  specialAbility?: string;
  regenPercent?: number;
  copySkillsChance?: number;
  accessCondition?: string;
  worldImpact?: string;
}

export interface BossData {
  id: string;
  /** Raça do boss — usada pelos effects VS_* (75-78). */
  race: import('./monsters').MonsterRace;
  element?: import('./weaponElements').WeaponElement;
  icon: string;
  level: number;
  hp: number;
  atk: number;
  def: number;
  xp: number;
  gold: number;
  nameKey: string;
  skills: string[];
  lootTable: MonsterLootEntry[];
  mechanics: BossMechanicsData;
  colossus?: boolean;
}

const loot = (items: string[]): MonsterLootEntry[] =>
  items.map((item) => ({
    item,
    chance: 0.25,
    qty: {
      min: 1,
      max: 1
    }
  }));

export const bosses: BossData[] = [
  {
    id: 'bandit_leader',
    race: 'humanoid',
    icon: '🗡',
    level: 8,
    hp: 1200,
    atk: 55,
    def: 28,
    xp: 450,
    gold: 220,
    nameKey: 'bosses.bandit_leader.name',
    skills: ['double_slash', 'battle_cry'],
    lootTable: loot(['w1h_1003', 'mat_9003']),
    mechanics: {
      phases: 2,
      phase2Trigger: 50,
      phase2AtkBoost: 1.4,
      enrageBelow: 20,
      enrageAtkBoost: 1.8
    }
  },
  {
    id: 'root_guardian',
    race: 'elemental',
  element: 'earth',
    icon: '🌳',
    level: 20,
    hp: 3500,
    atk: 140,
    def: 110,
    xp: 1200,
    gold: 650,
    nameKey: 'bosses.root_guardian.name',
    skills: ['vine_whip', 'root_slam', 'spore_cloud'],
    lootTable: loot(['root_guardian_core', 'mat_9055']),
    mechanics: {
      phases: 3,
      phase2Trigger: 65,
      phase3Trigger: 30,
      enrageBelow: 15,
      specialAbility: 'regenerate',
      regenPercent: 0.03
    }
  },
  {
    id: 'void_mirror',
    race: 'aberration',
  element: 'dark',
    icon: '🪞',
    level: 35,
    hp: 6000,
    atk: 260,
    def: 180,
    xp: 2400,
    gold: 1200,
    nameKey: 'bosses.void_mirror.name',
    skills: ['mirror_image', 'void_blast', 'reflect'],
    lootTable: loot(['void_mirror_shard', 'mat_9150']),
    mechanics: {
      phases: 2,
      phase2Trigger: 50,
      copySkillsChance: 0.3
    }
  },
  {
    id: 'azhur',
    race: 'beast',
  element: 'fire',
    icon: '🐺',
    level: 50,
    hp: 25000,
    atk: 650,
    def: 420,
    xp: 9000,
    gold: 5000,
    nameKey: 'bosses.azhur.name',
    skills: ['crimson_fang', 'shadow_rush', 'howl_of_ruin', 'twin_shadow'],
    lootTable: loot(['azhur_fang', 'eclipse_fur']),
    mechanics: {
      phases: 3,
      phase2Trigger: 65,
      phase3Trigger: 30,
      enrageBelow: 15,
      accessCondition: 'emote_sequence_secret',
      worldImpact: 'nythera_cleared'
    },
    colossus: true
  },
  {
    id: 'thal_mora',
    race: 'beast',
  element: 'water',
    icon: '🐍',
    level: 65,
    hp: 40000,
    atk: 900,
    def: 620,
    xp: 14000,
    gold: 8000,
    nameKey: 'bosses.thal_mora.name',
    skills: ['abyss_coil', 'tidal_crush', 'depth_charge', 'leviathan_roar'],
    lootTable: loot(['thal_mora_scale', 'abyss_pearl']),
    mechanics: {
      phases: 3,
      phase2Trigger: 65,
      phase3Trigger: 30,
      enrageBelow: 15,
      accessCondition: 'sink_boat_specific_location',
      worldImpact: 'permanent_new_island'
    },
    colossus: true
  },
  {
    id: 'velkaryn',
    race: 'aberration',
  element: 'dark',
    icon: '⚔',
    level: 55,
    hp: 18000,
    atk: 720,
    def: 520,
    xp: 11000,
    gold: 6500,
    nameKey: 'bosses.velkaryn.name',
    skills: ['eclipse_slash', 'void_parry', 'knight_charge', 'final_eclipse'],
    lootTable: loot(['velkaryn_plate', 'last_eclipse_core']),
    mechanics: {
      phases: 2,
      phase2Trigger: 50,
      accessCondition: 'complete_dungeon_without_death',
      worldImpact: 'velkaryn_armor_forgeable'
    },
    colossus: true
  }
];
