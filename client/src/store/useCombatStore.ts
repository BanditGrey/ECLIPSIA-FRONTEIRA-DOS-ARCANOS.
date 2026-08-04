import { create } from 'zustand';
import type { AutoConfig, CombatPhase, CombatState, Effect, Enemy, LogEntry } from '../types/combat.types';

const initialAutoConfig: AutoConfig = {
  mpThreshold: 20,
  stopBoss: true,
  stopEvent: true,
  lootFilter: []
};

const initialCombatState: CombatState = {
  active: false,
  phase: 'idle',
  turn: 0,
  region: '',
  floor: 0,
  maxFloor: 0,
  isDungeon: false,
  dungeonId: null,
  isBoss: false,
  enemy: null,
  enemyHp: 0,
  enemyMaxHp: 0,
  enemyEffects: [],
  playerEffects: [],
  isDefending: false,
  autoFight: false,
  autoAdvance: false,
  autoConfig: initialAutoConfig,
  log: [],
  phase2Triggered: false,
  phase3Triggered: false,
  enraged: false,
  shieldPool: 0,
  barrierPool: 0
};

export interface SkillEffect {
  skillId: string;
  skillName: string;
  damageType?: 'physical' | 'magical' | 'void';
  damagePercent?: number;
  isCritical?: boolean;
}

interface CombatStoreState extends CombatState {
  skillCooldowns: Record<string, number>;
  skillEffect: SkillEffect | null;
  playerHit: number;
  setSkillEffect: (effect: SkillEffect | null) => void;
  bumpPlayerHit: () => void;
  setEnemy: (enemy: Enemy | null) => void;
  setEnemyHp: (hp: number) => void;
  setPhase: (phase: CombatPhase) => void;
  addLog: (entry: LogEntry | Omit<LogEntry, 'turn'> | string, message?: string) => void;
  clearLog: () => void;
  addEnemyEffect: (effect: Effect) => void;
  addPlayerEffect: (effect: Effect) => void;
  tickEffects: () => void;
  toggleAutoFight: () => void;
  toggleAutoAdvance: () => void;
  setAutoConfig: (config: Partial<AutoConfig>) => void;
  resetCombat: () => void;
  setCooldown: (skillId: string, turns: number) => void;
  tickCooldowns: () => void;
}

const tickEffectList = (effects: Effect[]) => {
  return effects
    .map((effect) => ({
      ...effect,
      turns: effect.turns - 1
    }))
    .filter((effect) => effect.turns > 0);
};

export const useCombatStore = create<CombatStoreState>((set, get) => ({
  ...initialCombatState,
  skillCooldowns: {},
  skillEffect: null,
  playerHit: 0,
  setSkillEffect: (effect) => set({ skillEffect: effect }),
  bumpPlayerHit: () => set((state) => ({ playerHit: state.playerHit + 1 })),
  setEnemy: (enemy) => {
    set({
      enemy,
      enemyHp: enemy?.hp ?? 0,
      enemyMaxHp: enemy?.maxHp ?? 0,
      isBoss: Boolean(enemy?.mechanics),
      active: Boolean(enemy)
    });
  },
  setEnemyHp: (hp) => {
    set((state) => ({
      enemyHp: Math.max(0, Math.min(hp, state.enemyMaxHp || hp))
    }));
  },
  setPhase: (phase) => set({ phase }),
  addLog: (entry, message) => {
    const turn = get().turn;
    const logEntry: LogEntry = typeof entry === 'string'
      ? { type: entry, message: message ?? '', turn }
      : { ...entry, turn: 'turn' in entry ? entry.turn : turn };

    set((state) => ({
      log: [...state.log, logEntry]
    }));
  },
  clearLog: () => set({ log: [] }),
  addEnemyEffect: (effect) => {
    set((state) => ({
      enemyEffects: [...state.enemyEffects, effect]
    }));
  },
  addPlayerEffect: (effect) => {
    set((state) => ({
      playerEffects: [...state.playerEffects, effect]
    }));
  },
  tickEffects: () => {
    set((state) => ({
      enemyEffects: tickEffectList(state.enemyEffects),
      playerEffects: tickEffectList(state.playerEffects)
    }));
  },
  toggleAutoFight: () => {
    set((state) => {
      const autoFight = !state.autoFight;

      return {
        autoFight,
        autoAdvance: autoFight ? state.autoAdvance : false
      };
    });
  },
  toggleAutoAdvance: () => {
    set((state) => {
      const autoAdvance = !state.autoAdvance;

      return {
        autoAdvance,
        autoFight: autoAdvance ? true : state.autoFight
      };
    });
  },
  setAutoConfig: (config) => {
    set((state) => ({
      autoConfig: {
        ...state.autoConfig,
        ...config
      }
    }));
  },
  resetCombat: () => {
    set((state) => ({
      ...initialCombatState,
      autoConfig: state.autoConfig,
      skillCooldowns: {},
      skillEffect: null,
      playerHit: 0,
      shieldPool: 0,
      barrierPool: 0
    }));
  },
  setCooldown: (skillId, turns) => {
    set((state) => ({
      skillCooldowns: {
        ...state.skillCooldowns,
        [skillId]: Math.max(0, turns)
      }
    }));
  },
  tickCooldowns: () => {
    set((state) => {
      const skillCooldowns = Object.entries(state.skillCooldowns).reduce<Record<string, number>>((cooldowns, [skillId, turns]) => {
        const nextTurns = Math.max(0, turns - 1);

        if (nextTurns > 0) {
          cooldowns[skillId] = nextTurns;
        }

        return cooldowns;
      }, {});

      return { skillCooldowns };
    });
  }
}));
