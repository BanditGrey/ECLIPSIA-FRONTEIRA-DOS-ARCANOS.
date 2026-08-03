import { create } from 'zustand';
import type { PetAbilityType, PetData } from '../types/item.types';

export interface PetActionResult {
  acted: boolean;
  abilityType?: PetAbilityType;
  damage?: number;
  heal?: number;
  value?: number;
  tanked?: number;
  detected?: boolean;
}

const petRegistry = new Map<string, PetData>();

export const registerPetData = (itemId: string, petData: PetData) => {
  petRegistry.set(itemId, petData);
};

const createDefaultPetData = (itemId: string): PetData => ({
  hp: 50,
  maxHp: 50,
  atk: 5,
  def: 2,
  level: 1,
  maxLevel: 50,
  xp: 0,
  xpToNext: 100,
  abilityType: 'attack',
  abilityValue: 5,
  abilityKey: `pets.${itemId}.ability`,
  isAlive: true,
  cooldown: 0
});

const revivePet = (pet: PetData): PetData => ({
  ...pet,
  hp: Math.max(1, Math.floor(pet.maxHp * 0.5)),
  isAlive: true,
  cooldown: 0
});

interface PetStoreState {
  activePetId: string | null;
  petState: PetData | null;
  equipPet: (itemId: string) => void;
  unequipPet: () => void;
  petAct: (enemyAtk: number) => PetActionResult;
  petTakeDmg: (amount: number) => void;
  petRevive: () => void;
  gainPetXp: (amount: number) => void;
  tickCooldown: () => void;
}

export const usePetStore = create<PetStoreState>((set, get) => ({
  activePetId: null,
  petState: null,
  equipPet: (itemId) => {
    set({
      activePetId: itemId,
      petState: petRegistry.get(itemId) ?? createDefaultPetData(itemId)
    });
  },
  unequipPet: () => set({ activePetId: null, petState: null }),
  petAct: (enemyAtk) => {
    const pet = get().petState;

    if (!pet || !pet.isAlive || pet.cooldown > 0) {
      return { acted: false };
    }

    const result: PetActionResult = {
      acted: true,
      abilityType: pet.abilityType
    };

    let nextPet: PetData = {
      ...pet,
      cooldown: 1
    };

    switch (pet.abilityType) {
      case 'attack':
        result.damage = pet.atk + pet.abilityValue;
        break;
      case 'heal': {
        const heal = pet.abilityValue;
        nextPet = {
          ...nextPet,
          hp: Math.min(pet.maxHp, pet.hp + heal)
        };
        result.heal = heal;
        break;
      }
      case 'buff':
      case 'loot_boost':
      case 'xp_boost':
      case 'luck_boost':
        result.value = pet.abilityValue;
        break;
      case 'detect':
        result.detected = true;
        result.value = pet.abilityValue;
        break;
      case 'tank': {
        const tanked = Math.min(Math.max(0, enemyAtk), pet.abilityValue);
        result.tanked = tanked;
        break;
      }
    }

    set({ petState: nextPet });

    return result;
  },
  petTakeDmg: (amount) => {
    const pet = get().petState;

    if (!pet || !pet.isAlive) {
      return;
    }

    const damage = Math.max(0, amount - pet.def);
    const hp = Math.max(0, pet.hp - damage);

    set({
      petState: {
        ...pet,
        hp,
        isAlive: hp > 0,
        cooldown: hp > 0 ? pet.cooldown : 3
      }
    });
  },
  petRevive: () => {
    const pet = get().petState;

    if (!pet || pet.isAlive || pet.cooldown > 0) {
      return;
    }

    set({ petState: revivePet(pet) });
  },
  gainPetXp: (amount) => {
    const pet = get().petState;
    const xpGained = Math.max(0, amount);

    if (!pet || xpGained <= 0 || pet.level >= pet.maxLevel) {
      return;
    }

    let xp = pet.xp + xpGained;
    let xpToNext = pet.xpToNext;
    let level = pet.level;
    let maxHp = pet.maxHp;
    let atk = pet.atk;
    let def = pet.def;
    let abilityValue = pet.abilityValue;

    while (xp >= xpToNext && level < pet.maxLevel) {
      xp -= xpToNext;
      level += 1;
      maxHp += 5;
      atk += 2;
      def += 1;
      abilityValue += 1;
      xpToNext = Math.floor(xpToNext * 1.2 + 20);
    }

    set({
      petState: {
        ...pet,
        xp,
        xpToNext,
        level,
        maxHp,
        atk,
        def,
        abilityValue,
        hp: pet.isAlive ? Math.min(maxHp, pet.hp + 5) : pet.hp
      }
    });
  },
  tickCooldown: () => {
    const pet = get().petState;

    if (!pet) {
      return;
    }

    if (!pet.isAlive && pet.cooldown <= 0) {
      set({ petState: revivePet(pet) });
      return;
    }

    if (pet.cooldown <= 0) {
      return;
    }

    const cooldown = Math.max(0, pet.cooldown - 1);
    const nextPet = {
      ...pet,
      cooldown
    };

    set({
      petState: !nextPet.isAlive && cooldown === 0 ? revivePet(nextPet) : nextPet
    });
  }
}));
