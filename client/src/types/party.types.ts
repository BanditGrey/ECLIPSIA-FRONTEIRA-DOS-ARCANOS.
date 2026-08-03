import type { Equipment } from './player.types';

export interface CharacterProgress {
  unlocked: boolean;
  completed: boolean;
  bossKilled?: boolean;
  completedWith?: string;
}

export type CharacterProgressMap = Record<string, CharacterProgress>;

export interface PartyMember {
  id: string;
  name: string;
  archetype: string;
  icon: string;
  level: number;
  hp: number;
  maxHp: number;
  mp: number;
  maxMp: number;
  skills: string[];
  equipment: Equipment;
  progress: CharacterProgressMap;
  isActive: boolean;
  isAlive: boolean;
}

export interface PartyState {
  members: PartyMember[];
  activeId: string | null;
  maxSize: number;
  minLevelToJoin: number;
}
