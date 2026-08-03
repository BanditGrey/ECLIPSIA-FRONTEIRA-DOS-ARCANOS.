import { create } from 'zustand';
import { countEffects } from '../data/effectRegistry';
import { resolveEffects, resolvedToItemStats } from '../systems/effectEngine';
import type { Item, ItemStats, Slot } from '../types/item.types';
import type { Equipment, InventoryItem, PlayerData, Stats } from '../types/player.types';

type EquipmentSlot = keyof Equipment;
type RegisteredItem = Pick<Item, 'id' | 'slot' | 'isTwoHanded' | 'stats' | 'effects'>;

const MAX_LUCK = 200;
const DEFAULT_MAX_INVENTORY = 20;

const equipmentSlots: EquipmentSlot[] = [
  'weapon_main',
  'weapon_off',
  'head',
  'chest',
  'legs',
  'gloves',
  'boots',
  'earring',
  'necklace',
  'belt',
  'resistance',
  'amulet',
  'spirit_stone',
  'pet',
  'mount'
];

const itemRegistry = new Map<string, RegisteredItem>();

export const registerPlayerItems = (items: RegisteredItem[]) => {
  items.forEach((item) => itemRegistry.set(item.id, item));
};

const isEquipmentSlot = (slot: Slot): slot is EquipmentSlot => {
  return equipmentSlots.includes(slot as EquipmentSlot);
};

const inferEquipmentSlot = (itemId: string): EquipmentSlot | null => {
  const normalized = itemId.toLowerCase();

  const directSlot = equipmentSlots.find(
    (slot) => normalized === slot || normalized.startsWith(`${slot}_`) || normalized.includes(`_${slot}_`)
  );

  if (directSlot) {
    return directSlot;
  }

  if (normalized.includes('shield') || normalized.includes('orb') || normalized.includes('tome') || normalized.includes('dagger_off')) {
    return 'weapon_off';
  }

  if (
    normalized.includes('sword') ||
    normalized.includes('dagger') ||
    normalized.includes('hammer') ||
    normalized.includes('spear') ||
    normalized.includes('bow') ||
    normalized.includes('staff')
  ) {
    return 'weapon_main';
  }

  return null;
};

const isInferredTwoHanded = (itemId: string) => {
  const normalized = itemId.toLowerCase();

  return (
    normalized.includes('two') ||
    normalized.includes('2h') ||
    normalized.includes('great_sword') ||
    normalized.includes('bow_long') ||
    normalized.includes('staff_two')
  );
};

const getRegisteredItem = (itemId: string): RegisteredItem | null => {
  const registered = itemRegistry.get(itemId);

  if (registered) {
    return registered;
  }

  const slot = inferEquipmentSlot(itemId);

  if (!slot) {
    return null;
  }

  return {
    id: itemId,
    slot,
    isTwoHanded: isInferredTwoHanded(itemId)
  };
};

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

const getMaxInventory = (data: PlayerData) => Math.min(data.maxInventory || DEFAULT_MAX_INVENTORY, DEFAULT_MAX_INVENTORY);

const hasInventoryItem = (inventory: InventoryItem[], itemId: string) => inventory.some((item) => item.id === itemId && item.qty > 0);

const getEquipmentItemStats = (equipment: Equipment): ItemStats => {
  return equipmentSlots.reduce<ItemStats>((total, slot) => {
    const itemId = equipment[slot];

    if (!itemId) {
      return total;
    }

    const item = getRegisteredItem(itemId);

    if (!item) {
      return total;
    }

    // `effects` é a fonte de verdade dos bônus; `stats` é o fallback legado.
    const stats = item.effects && countEffects(item.effects) > 0
      ? resolvedToItemStats(resolveEffects(item))
      : item.stats;

    if (!stats) {
      return total;
    }

    return {
      ...total,
      atk: (total.atk ?? 0) + (stats.atk ?? 0),
      def: (total.def ?? 0) + (stats.def ?? 0),
      luck: (total.luck ?? 0) + (stats.luck ?? 0),
      strength: (total.strength ?? 0) + (stats.strength ?? 0),
      agility: (total.agility ?? 0) + (stats.agility ?? 0),
      vitality: (total.vitality ?? 0) + (stats.vitality ?? 0),
      arcana: (total.arcana ?? 0) + (stats.arcana ?? 0),
      perception: (total.perception ?? 0) + (stats.perception ?? 0),
      will: (total.will ?? 0) + (stats.will ?? 0),
      hp: (total.hp ?? 0) + (stats.hp ?? 0),
      mp: (total.mp ?? 0) + (stats.mp ?? 0),
      critChance: (total.critChance ?? 0) + (stats.critChance ?? 0),
      critDmg: (total.critDmg ?? 0) + (stats.critDmg ?? 0)
    };
  }, {});
};

const getEquipmentLuck = (equipment: Equipment) => getEquipmentItemStats(equipment).luck ?? 0;

interface XpResult {
  xpGained: number;
  leveledUp: boolean;
}

interface PlayerState {
  data: PlayerData | null;
  isLoaded: boolean;
  setPlayer: (data: PlayerData) => void;
  clearPlayer: () => void;
  gainXp: (amount: number) => XpResult;
  gainGold: (amount: number) => number;
  spendGold: (amount: number) => boolean;
  addStat: (stat: keyof Stats, amount?: number) => boolean;
  addItem: (itemId: string, qty?: number) => boolean;
  removeItem: (itemId: string, qty?: number) => boolean;
  equip: (itemId: string) => boolean;
  unequip: (slot: EquipmentSlot) => boolean;
  takeDamage: (amount: number) => number;
  recoverHp: (percent: number) => void;
  recoverMp: (percent: number) => void;
  restoreAll: () => void;
  addKill: (monsterId: string) => void;
  getTotalAtk: () => number;
  getTotalDef: () => number;
  getLuck: () => number;
  isDead: () => boolean;
  isInvFull: () => boolean;
  recalcLuck: () => void;
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
  data: null,
  isLoaded: false,
  setPlayer: (data) => set({ data, isLoaded: true }),
  clearPlayer: () => set({ data: null, isLoaded: false }),
  gainXp: (amount) => {
    const xpGained = Math.max(0, amount);
    let leveledUp = false;

    set((state) => {
      if (!state.data || xpGained <= 0) {
        return state;
      }

      let xp = state.data.xp + xpGained;
      let xpToNext = state.data.xpToNext;
      let level = state.data.level;
      let freePoints = state.data.freePoints;

      while (xp >= xpToNext) {
        xp -= xpToNext;
        level += 1;
        freePoints += 5;
        xpToNext = Math.floor(xpToNext * 1.15 + 25);
        leveledUp = true;
      }

      return {
        data: {
          ...state.data,
          level,
          xp,
          xpToNext,
          freePoints,
          hp: state.data.maxHp,
          mp: state.data.maxMp
        }
      };
    });

    return { xpGained, leveledUp };
  },
  gainGold: (amount) => {
    const goldGained = Math.max(0, amount);

    set((state) => {
      if (!state.data || goldGained <= 0) {
        return state;
      }

      return {
        data: {
          ...state.data,
          gold: state.data.gold + goldGained
        }
      };
    });

    return goldGained;
  },
  spendGold: (amount) => {
    const cost = Math.max(0, amount);
    const data = get().data;

    if (!data || data.gold < cost) {
      return false;
    }

    set({
      data: {
        ...data,
        gold: data.gold - cost
      }
    });

    return true;
  },
  addStat: (stat, amount = 1) => {
    const data = get().data;
    const points = Math.max(1, amount);

    if (!data || data.freePoints < points) {
      return false;
    }

    set({
      data: {
        ...data,
        freePoints: data.freePoints - points,
        stats: {
          ...data.stats,
          [stat]: data.stats[stat] + points
        }
      }
    });

    return true;
  },
  addItem: (itemId, qty = 1) => {
    const data = get().data;
    const amount = Math.max(1, qty);

    if (!data) {
      return false;
    }

    const inventory = [...data.inventory];
    const existingIndex = inventory.findIndex((item) => item.id === itemId);

    if (existingIndex >= 0) {
      inventory[existingIndex] = {
        ...inventory[existingIndex],
        qty: inventory[existingIndex].qty + amount
      };
    } else {
      if (inventory.length >= getMaxInventory(data)) {
        return false;
      }

      inventory.push({ id: itemId, qty: amount });
    }

    set({
      data: {
        ...data,
        inventory
      }
    });

    return true;
  },
  removeItem: (itemId, qty = 1) => {
    const data = get().data;
    const amount = Math.max(1, qty);

    if (!data) {
      return false;
    }

    const inventory = [...data.inventory];
    const existingIndex = inventory.findIndex((item) => item.id === itemId);

    if (existingIndex < 0 || inventory[existingIndex].qty < amount) {
      return false;
    }

    const nextQty = inventory[existingIndex].qty - amount;

    if (nextQty <= 0) {
      inventory.splice(existingIndex, 1);
    } else {
      inventory[existingIndex] = {
        ...inventory[existingIndex],
        qty: nextQty
      };
    }

    set({
      data: {
        ...data,
        inventory
      }
    });

    return true;
  },
  equip: (itemId) => {
    const data = get().data;

    if (!data || !hasInventoryItem(data.inventory, itemId)) {
      return false;
    }

    const item = getRegisteredItem(itemId);

    if (!item || !isEquipmentSlot(item.slot)) {
      return false;
    }

    if (item.slot === 'weapon_off') {
      const mainWeaponId = data.equipment.weapon_main;
      const mainWeapon = mainWeaponId ? getRegisteredItem(mainWeaponId) : null;

      if (mainWeapon?.isTwoHanded) {
        return false;
      }
    }

    const equipment: Equipment = {
      ...data.equipment,
      [item.slot]: itemId
    };

    if (item.slot === 'weapon_main' && item.isTwoHanded) {
      equipment.weapon_off = null;
    }

    set({
      data: {
        ...data,
        equipment,
        luck: {
          ...data.luck,
          equipment: getEquipmentLuck(equipment)
        }
      }
    });

    return true;
  },
  unequip: (slot) => {
    const data = get().data;

    if (!data || data.equipment[slot] === null) {
      return false;
    }

    const equipment: Equipment = {
      ...data.equipment,
      [slot]: null
    };

    set({
      data: {
        ...data,
        equipment,
        luck: {
          ...data.luck,
          equipment: getEquipmentLuck(equipment)
        }
      }
    });

    return true;
  },
  takeDamage: (amount) => {
    const data = get().data;
    const damage = Math.max(0, amount);

    if (!data || damage <= 0) {
      return 0;
    }

    const realDamage = Math.min(data.hp, damage);

    set({
      data: {
        ...data,
        hp: data.hp - realDamage
      }
    });

    return realDamage;
  },
  recoverHp: (percent) => {
    const data = get().data;

    if (!data) {
      return;
    }

    const recovered = Math.floor(data.maxHp * Math.max(0, percent) / 100);

    set({
      data: {
        ...data,
        hp: clamp(data.hp + recovered, 0, data.maxHp)
      }
    });
  },
  recoverMp: (percent) => {
    const data = get().data;

    if (!data) {
      return;
    }

    const recovered = Math.floor(data.maxMp * Math.max(0, percent) / 100);

    set({
      data: {
        ...data,
        mp: clamp(data.mp + recovered, 0, data.maxMp)
      }
    });
  },
  restoreAll: () => {
    const data = get().data;

    if (!data) {
      return;
    }

    set({
      data: {
        ...data,
        hp: data.maxHp,
        mp: data.maxMp
      }
    });
  },
  addKill: (monsterId) => {
    const data = get().data;

    if (!data) {
      return;
    }

    set({
      data: {
        ...data,
        kills: {
          ...data.kills,
          [monsterId]: (data.kills[monsterId] ?? 0) + 1
        }
      }
    });
  },
  getTotalAtk: () => {
    const data = get().data;

    if (!data) {
      return 0;
    }

    const equipmentStats = getEquipmentItemStats(data.equipment);

    return data.stats.strength * 2.5 + (equipmentStats.atk ?? 0);
  },
  getTotalDef: () => {
    const data = get().data;

    if (!data) {
      return 0;
    }

    const equipmentStats = getEquipmentItemStats(data.equipment);

    return data.stats.vitality * 1.5 + (equipmentStats.def ?? 0);
  },
  getLuck: () => {
    const data = get().data;

    if (!data) {
      return 0;
    }

    const totalLuck = data.luck.base + data.luck.equipment + data.luck.titles + data.luck.impulse + data.luck.events;

    return Math.min(totalLuck, MAX_LUCK);
  },
  isDead: () => {
    const data = get().data;

    return !data || data.hp <= 0;
  },
  isInvFull: () => {
    const data = get().data;

    if (!data) {
      return false;
    }

    return data.inventory.length >= getMaxInventory(data);
  },
  recalcLuck: () => {
    const data = get().data;

    if (!data) {
      return;
    }

    set({
      data: {
        ...data,
        luck: {
          ...data.luck,
          equipment: getEquipmentLuck(data.equipment)
        }
      }
    });
  }
}));
