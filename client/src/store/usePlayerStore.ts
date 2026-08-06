import { create } from 'zustand';
import { countEffects } from '../data/effectRegistry';
import { getProficiencyPassiveTotals, PROFICIENCY_CAP, weaponCategoryOf } from '../data/proficiencies';
import { skills } from '../data/skills';
import { resolveEffects, resolvedToItemStats } from '../systems/effectEngine';
import type { Item, ItemStats, Slot, WeaponCategory } from '../types/item.types';
import type { Equipment, InventoryItem, PlayerData, Stats } from '../types/player.types';
import { buildItemEffect, EFFECT } from '../data/effectRegistry';
import { isSerializedItemStr, resolveItemRef, parseItemStr, serializeItem } from '../utils/itemSerializer';
import { getDailyQuest } from '../data/dailyQuests';
import { usePassiveStore } from './usePassiveStore';

type EquipmentSlot = keyof Equipment;
type RegisteredItem = Pick<Item, 'id' | 'slot' | 'isTwoHanded' | 'stats' | 'effects'>;

const MAX_LUCK = 1000;
const DEFAULT_MAX_INVENTORY = 60;
const DEFAULT_MAX_STORAGE = 500;

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

  // itemStr serializada ("1005|1:65|4:5|7:3") — resolve pelo serializer,
  // permitindo equipamento vindo de correio/mercado/trades.
  if (isSerializedItemStr(itemId)) {
    const item = resolveItemRef(itemId);

    if (item) {
      return {
        id: itemId,
        slot: item.slot,
        isTwoHanded: Boolean(item.isTwoHanded),
        stats: item.stats,
        effects: item.effects
      };
    }
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

const getMaxStorage = (data: PlayerData) => Math.min(data.maxStorage || DEFAULT_MAX_STORAGE, DEFAULT_MAX_STORAGE);

/** Referência canônica de uma entrada de inventário (itemStr ou id legado). */
export const refOf = (entry: InventoryItem): string => entry.itemStr ?? entry.id ?? '';

const makeInventoryEntry = (ref: string, qty: number): InventoryItem =>
  isSerializedItemStr(ref) ? { itemStr: ref, qty } : { id: ref, qty };

const hasInventoryItem = (inventory: InventoryItem[], ref: string) => inventory.some((item) => refOf(item) === ref && item.qty > 0);

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
  addItem: (itemRef: string, qty?: number) => boolean;
  removeItem: (itemRef: string, qty?: number) => boolean;
  depositItem: (itemRef: string, qty?: number) => boolean;
  withdrawItem: (itemRef: string, qty?: number) => boolean;
  isStorageFull: () => boolean;
  recordDailyEvent: (event: string, amount?: number) => void;
  claimDaily: (questId: string) => boolean;
  equip: (itemId: string, preferredSlot?: 'weapon_main' | 'weapon_off') => boolean;
  unequip: (slot: EquipmentSlot) => boolean;
  upgradeEquippedItem: (slot: EquipmentSlot, cost: number) => boolean;
  takeDamage: (amount: number) => number;
  recoverHp: (percent: number) => void;
  recoverMp: (percent: number) => void;
  restoreAll: () => void;
  addKill: (monsterId: string) => void;
  addProficiency: (category: string, amount?: number) => void;
  getProficiency: (category: string) => number;
  getUsableSkillIds: () => string[];
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
    // SORTE no leveling: +0,1% de XP por ponto (teto 1000 = +100%).
    const luck = get().getLuck();
    const xpGained = Math.max(0, Math.floor(amount * (1 + luck * 0.001)));
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
        // Sistema de passivas: 1 ponto por nível + 5 pontos a cada 10 níveis
        usePassiveStore.getState().addPoint();
        if (level % 10 === 0) {
          for (let i = 0; i < 5; i++) usePassiveStore.getState().addPoint();
        }
        xpToNext = Math.floor(xpToNext * 1.15 + 25);
        leveledUp = true;
      }

      if (leveledUp && typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('eclipsia:levelup', { detail: { level } }));
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
  addItem: (itemRef, qty = 1) => {
    const data = get().data;
    const amount = Math.max(1, qty);

    if (!data) {
      return false;
    }

    const inventory = [...data.inventory];
    const existingIndex = inventory.findIndex((item) => refOf(item) === itemRef);

    if (existingIndex >= 0) {
      inventory[existingIndex] = {
        ...inventory[existingIndex],
        qty: inventory[existingIndex].qty + amount
      };
    } else {
      if (inventory.length >= getMaxInventory(data)) {
        return false;
      }

      inventory.push(makeInventoryEntry(itemRef, amount));
    }

    set({
      data: {
        ...data,
        inventory
      }
    });

    return true;
  },
  removeItem: (itemRef, qty = 1) => {
    const data = get().data;
    const amount = Math.max(1, qty);

    if (!data) {
      return false;
    }

    const inventory = [...data.inventory];
    const existingIndex = inventory.findIndex((item) => refOf(item) === itemRef);

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
  depositItem: (itemRef, qty = 1) => {
    const data = get().data;
    const amount = Math.max(1, qty);

    if (!data) {
      return false;
    }

    // Remove do inventário (valida posse)
    const inventory = [...data.inventory];
    const invIndex = inventory.findIndex((item) => refOf(item) === itemRef);

    if (invIndex < 0 || inventory[invIndex].qty < amount) {
      return false;
    }

    // Capacidade do baú (entradas distintas)
    const storage = [...(data.storage ?? [])];
    const stoIndex = storage.findIndex((item) => refOf(item) === itemRef);

    if (stoIndex < 0 && storage.length >= getMaxStorage(data)) {
      return false;
    }

    inventory[invIndex] = { ...inventory[invIndex], qty: inventory[invIndex].qty - amount };

    if (inventory[invIndex].qty <= 0) {
      inventory.splice(invIndex, 1);
    }

    if (stoIndex >= 0) {
      storage[stoIndex] = { ...storage[stoIndex], qty: storage[stoIndex].qty + amount };
    } else {
      storage.push(makeInventoryEntry(itemRef, amount));
    }

    set({ data: { ...data, inventory, storage } });
    return true;
  },
  withdrawItem: (itemRef, qty = 1) => {
    const data = get().data;
    const amount = Math.max(1, qty);

    if (!data) {
      return false;
    }

    const storage = [...(data.storage ?? [])];
    const stoIndex = storage.findIndex((item) => refOf(item) === itemRef);

    if (stoIndex < 0 || storage[stoIndex].qty < amount) {
      return false;
    }

    const inventory = [...data.inventory];
    const invIndex = inventory.findIndex((item) => refOf(item) === itemRef);

    if (invIndex < 0 && inventory.length >= getMaxInventory(data)) {
      return false;
    }

    storage[stoIndex] = { ...storage[stoIndex], qty: storage[stoIndex].qty - amount };

    if (storage[stoIndex].qty <= 0) {
      storage.splice(stoIndex, 1);
    }

    if (invIndex >= 0) {
      inventory[invIndex] = { ...inventory[invIndex], qty: inventory[invIndex].qty + amount };
    } else {
      inventory.push(makeInventoryEntry(itemRef, amount));
    }

    set({ data: { ...data, inventory, storage } });
    return true;
  },
  isStorageFull: () => {
    const data = get().data;

    if (!data) {
      return false;
    }

    return (data.storage ?? []).length >= getMaxStorage(data);
  },
  recordDailyEvent: (event, amount = 1) => {
    const data = get().data;

    if (!data || amount <= 0) {
      return;
    }

    const today = new Date().toISOString().slice(0, 10);
    const current = data.daily && data.daily.date === today ? data.daily : { date: today, progress: {}, claimed: [] };

    set({
      data: {
        ...data,
        daily: {
          ...current,
          progress: {
            ...current.progress,
            [event]: (current.progress[event] ?? 0) + amount
          }
        }
      }
    });
  },
  claimDaily: (questId) => {
    const data = get().data;
    const quest = getDailyQuest(questId);

    if (!data || !quest) {
      return false;
    }

    const today = new Date().toISOString().slice(0, 10);
    const daily = data.daily && data.daily.date === today ? data.daily : { date: today, progress: {}, claimed: [] };

    if (daily.claimed.includes(questId) || (daily.progress[quest.event] ?? 0) < quest.goal) {
      return false;
    }

    // Recompensas (ouro, xp e itens entram pelos fluxos normais do store)
    if (quest.rewards.gold) {
      get().gainGold(quest.rewards.gold);
    }

    if (quest.rewards.xp) {
      get().gainXp(quest.rewards.xp);
    }

    quest.rewards.items?.forEach(({ itemId, qty }) => {
      get().addItem(itemId, qty);
    });

    const fresh = get().data;

    if (!fresh) {
      return true;
    }

    set({
      data: {
        ...fresh,
        daily: {
          ...daily,
          claimed: [...daily.claimed, questId]
        }
      }
    });

    return true;
  },
  equip: (itemId, preferredSlot) => {
    const data = get().data;

    if (!data || !hasInventoryItem(data.inventory, itemId)) {
      return false;
    }

    const item = getRegisteredItem(itemId);

    if (!item || !isEquipmentSlot(item.slot)) {
      return false;
    }

    // ARMAS: podem ir em QUALQUER mão (main ou off) — escolha do jogador.
    // Regra: a MESMA categoria de arma não pode ocupar as duas mãos.
    const weaponCategory = weaponCategoryOf(itemId);
    const isWeapon = Boolean(weaponCategory);

    if (isWeapon) {
      // GLIFOS são exclusivos de mão secundária (selam o 2º elemento/fusão).
      if (weaponCategory === 'glyph' && preferredSlot === 'weapon_main') {
        return false;
      }
      const requestedSlot = preferredSlot === 'weapon_main' || preferredSlot === 'weapon_off'
        ? preferredSlot
        : (weaponCategory === 'glyph'
          ? 'weapon_off'
          : (item.slot === 'weapon_main' || item.slot === 'weapon_off' ? item.slot : 'weapon_main'));
      const otherSlot = requestedSlot === 'weapon_main' ? 'weapon_off' : 'weapon_main';
      const otherId = data.equipment[otherSlot];
      const otherCategory = otherId ? weaponCategoryOf(otherId) : null;

      if (otherCategory && otherCategory === weaponCategory) {
        return false;
      }

      const equipment: Equipment = {
        ...data.equipment,
        [requestedSlot]: itemId
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
    }

    // ARMADURAS/ACESSÓRIOS: slot fixo (comportamento original).
    const equipment: Equipment = {
      ...data.equipment,
      [item.slot]: itemId
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
  upgradeEquippedItem: (slot, cost) => {
    const data = get().data;

    if (!data || data.gold < cost) return false;

    const itemStr = data.equipment[slot];
    if (!itemStr) return false;

    let parsed;
    try {
      parsed = isSerializedItemStr(itemStr) 
        ? parseItemStr(itemStr)
        : { numId: resolveItemRef(itemStr)!.numId, pairs: [] };
    } catch {
      return false;
    }

    let upgradeLevel = 0;
    const filteredPairs = parsed.pairs.filter(p => {
      if (p.effectId === EFFECT.UPGRADE_LEVEL) {
        upgradeLevel = p.value;
        return false;
      }
      return true;
    });

    if (upgradeLevel >= 10) return false;

    filteredPairs.push({ effectId: EFFECT.UPGRADE_LEVEL, value: upgradeLevel + 1 });
    const effects = buildItemEffect(filteredPairs);
    
    // Fake the item ref to re-serialize it correctly
    const baseItem = resolveItemRef(itemStr);
    if (!baseItem) return false;

    const newStr = serializeItem(baseItem, effects);

    const equipment: Equipment = {
      ...data.equipment,
      [slot]: newStr
    };

    set({
      data: {
        ...data,
        gold: data.gold - cost,
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
  addProficiency: (category, amount = 1) => {
    const data = get().data;

    if (!data) {
      return;
    }

    const current = data.proficiencies[category] ?? 0;
    const next = Math.min(PROFICIENCY_CAP, current + Math.max(0, amount));

    if (next === current) {
      return;
    }

    set({
      data: {
        ...data,
        proficiencies: {
          ...data.proficiencies,
          [category]: next
        }
      }
    });
  },
  getProficiency: (category) => {
    return get().data?.proficiencies[category] ?? 0;
  },
  getUsableSkillIds: () => {
    const data = get().data;

    if (!data) {
      return [];
    }

    const mainCategory = data.equipment.weapon_main ? resolveItemRef(data.equipment.weapon_main)?.weaponCategory : undefined;
    const offCategory = data.equipment.weapon_off ? resolveItemRef(data.equipment.weapon_off)?.weaponCategory : undefined;
    const categories = new Set<WeaponCategory>([mainCategory, offCategory].filter((category): category is WeaponCategory => Boolean(category)));

    return skills
      .filter((skill) => categories.has(skill.proficiency))
      .filter((skill) => (data.proficiencies[skill.proficiency] ?? 0) >= skill.requireProficiency)
      .map((skill) => skill.id);
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
    const baseDef = data.stats.vitality * 1.5 + (equipmentStats.def ?? 0);

    // PASSIVA de proficiência (escudo/martelo/grimório): defesa multiplicativa.
    const passiveDef = getProficiencyPassiveTotals(data.equipment, data.proficiencies).defBonus;

    return Math.floor(baseDef * (1 + passiveDef));
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
