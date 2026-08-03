export type CombatPhase = 'idle' | 'player' | 'enemy' | 'victory' | 'defeat';

export interface Effect {
  type: string;
  turns: number;
  damage?: number;
  value?: number;
}

export interface LootEntry {
  item: string;
  chance: number;
  qty: {
    min: number;
    max: number;
  };
}

export interface BossMechanics {
  phaseTriggers: number[];
  atkBoosts: number[];
  enrage: boolean;
  specialAbility: string;
}

export interface Enemy {
  id: string;
  icon: string;
  nameKey: string;
  level: number;
  hp: number;
  maxHp: number;
  atk: number;
  def: number;
  xp: number;
  gold: number;
  skills: string[];
  lootTable: LootEntry[];
  mechanics?: BossMechanics;
}

export interface LogEntry {
  type: string;
  message: string;
  turn: number;
}

export interface AutoConfig {
  mpThreshold: number;
  stopBoss: boolean;
  stopEvent: boolean;
  lootFilter: string[];
}

export interface CombatState {
  active: boolean;
  phase: CombatPhase;
  turn: number;
  region: string;
  floor: number;
  maxFloor: number;
  isDungeon: boolean;
  isBoss: boolean;
  enemy: Enemy | null;
  enemyHp: number;
  enemyMaxHp: number;
  enemyEffects: Effect[];
  playerEffects: Effect[];
  isDefending: boolean;
  autoFight: boolean;
  autoAdvance: boolean;
  autoConfig: AutoConfig;
  log: LogEntry[];
  phase2Triggered: boolean;
  phase3Triggered: boolean;
  enraged: boolean;
}
