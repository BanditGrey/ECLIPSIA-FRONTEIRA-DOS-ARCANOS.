export interface MonsterLootEntry {
  item: string;
  chance: number;
  qty: {
    min: number;
    max: number;
  };
}

export interface MonsterGoldRange {
  min: number;
  max: number;
}

export interface MonsterData {
  id: string;
  icon: string;
  level: number;
  hp: number;
  atk: number;
  def: number;
  xp: number;
  gold: MonsterGoldRange;
  skills: string[];
  lootTable: MonsterLootEntry[];
  boss?: boolean;
  phases?: number;
}

const loot = (items: string[]): MonsterLootEntry[] =>
  items.map((item) => ({
    item,
    chance: 0.35,
    qty: {
      min: 1,
      max: 2
    }
  }));

export const monsters: MonsterData[] = [
  {
    id: 'rat',
    icon: '🐀',
    level: 1,
    hp: 80,
    atk: 8,
    def: 2,
    xp: 20,
    gold: {
      min: 3,
      max: 8
    },
    skills: [],
    lootTable: loot(['mat_9000', 'mat_9001'])
  },
  {
    id: 'goblin',
    icon: '👺',
    level: 3,
    hp: 150,
    atk: 16,
    def: 6,
    xp: 45,
    gold: {
      min: 8,
      max: 18
    },
    skills: ['quick_stab'],
    lootTable: loot(['mat_9002', 'mat_9003'])
  },
  {
    id: 'wolf_pup',
    icon: '🐺',
    level: 5,
    hp: 200,
    atk: 24,
    def: 8,
    xp: 70,
    gold: {
      min: 12,
      max: 25
    },
    skills: ['bite'],
    lootTable: loot(['mat_9004', 'mat_9005'])
  },
  {
    id: 'bandit_leader',
    icon: '🗡',
    level: 8,
    hp: 1200,
    atk: 55,
    def: 28,
    xp: 450,
    gold: {
      min: 120,
      max: 220
    },
    skills: ['double_slash', 'battle_cry'],
    lootTable: loot(['long_sword', 'mat_9003']),
    boss: true,
    phases: 2
  },
  {
    id: 'mist_wolf',
    icon: '🐺',
    level: 12,
    hp: 800,
    atk: 70,
    def: 35,
    xp: 180,
    gold: {
      min: 35,
      max: 75
    },
    skills: ['mist_bite'],
    lootTable: loot(['mat_9050', 'mat_9051'])
  },
  {
    id: 'shadow_sprite',
    icon: '👻',
    level: 14,
    hp: 600,
    atk: 85,
    def: 25,
    xp: 210,
    gold: {
      min: 40,
      max: 80
    },
    skills: ['shadow_rush'],
    lootTable: loot(['mat_9052', 'mat_9053'])
  },
  {
    id: 'forest_golem',
    icon: '🪨',
    level: 18,
    hp: 1500,
    atk: 105,
    def: 80,
    xp: 320,
    gold: {
      min: 70,
      max: 140
    },
    skills: ['root_slam'],
    lootTable: loot(['mat_9053', 'mat_9054', 'mat_9055'])
  },
  {
    id: 'root_guardian',
    icon: '🌳',
    level: 20,
    hp: 3500,
    atk: 140,
    def: 110,
    xp: 1200,
    gold: {
      min: 350,
      max: 650
    },
    skills: ['vine_whip', 'root_slam', 'spore_cloud'],
    lootTable: loot(['mat_9055', 'root_guardian_core']),
    boss: true,
    phases: 3
  },
  {
    id: 'sand_scorpion',
    icon: '🦂',
    level: 22,
    hp: 1300,
    atk: 150,
    def: 70,
    xp: 360,
    gold: {
      min: 80,
      max: 150
    },
    skills: ['poison_sting'],
    lootTable: loot(['mat_9100', 'mat_9101'])
  },
  {
    id: 'mirage_beast',
    icon: '🐆',
    level: 26,
    hp: 1800,
    atk: 190,
    def: 85,
    xp: 460,
    gold: {
      min: 100,
      max: 190
    },
    skills: ['mirage_step'],
    lootTable: loot(['mat_9102', 'mat_9103'])
  },
  {
    id: 'dune_crawler',
    icon: '🪱',
    level: 30,
    hp: 2400,
    atk: 210,
    def: 120,
    xp: 560,
    gold: {
      min: 130,
      max: 240
    },
    skills: ['sand_burrow'],
    lootTable: loot(['mat_9104', 'mat_9105'])
  },
  {
    id: 'sea_wraith',
    icon: '👻',
    level: 42,
    hp: 3600,
    atk: 310,
    def: 150,
    xp: 900,
    gold: {
      min: 220,
      max: 420
    },
    skills: ['abyss_coil'],
    lootTable: loot(['mat_9200', 'mat_9201'])
  },
  {
    id: 'deep_leviathan_jr',
    icon: '🐍',
    level: 48,
    hp: 5200,
    atk: 380,
    def: 220,
    xp: 1250,
    gold: {
      min: 300,
      max: 560
    },
    skills: ['tidal_crush'],
    lootTable: loot(['mat_9202', 'mat_9203'])
  },
  {
    id: 'storm_harpy',
    icon: '🦅',
    level: 56,
    hp: 4800,
    atk: 470,
    def: 210,
    xp: 1500,
    gold: {
      min: 350,
      max: 650
    },
    skills: ['storm_dive'],
    lootTable: loot(['mat_9300', 'mat_9301'])
  },
  {
    id: 'cloud_titan',
    icon: '☁',
    level: 64,
    hp: 9000,
    atk: 590,
    def: 340,
    xp: 2200,
    gold: {
      min: 500,
      max: 900
    },
    skills: ['cloud_crush'],
    lootTable: loot(['mat_9302', 'mat_9303'])
  }
];
