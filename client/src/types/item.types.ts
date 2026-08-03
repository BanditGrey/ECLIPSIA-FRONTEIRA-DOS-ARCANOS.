export type Rarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary' | 'relic';

export type ItemType =
  | 'weapon_main'
  | 'weapon_off'
  | 'armor'
  | 'accessory'
  | 'spirit_stone'
  | 'material'
  | 'pet'
  | 'mount'
  | 'special';

export type WeaponCategory =
  | 'sword_one'
  | 'sword_two'
  | 'dagger'
  | 'great_sword'
  | 'hammer'
  | 'spear'
  | 'bow_short'
  | 'bow_long'
  | 'staff_one'
  | 'staff_two'
  | 'shield'
  | 'orb'
  | 'tome'
  | 'dagger_off';

export type Slot =
  | 'weapon_main'
  | 'weapon_off'
  | 'head'
  | 'chest'
  | 'legs'
  | 'gloves'
  | 'boots'
  | 'earring'
  | 'necklace'
  | 'belt'
  | 'resistance'
  | 'amulet'
  | 'spirit_stone'
  | 'pet'
  | 'mount'
  | 'material'
  | 'special';

export type SpiritStoneElement =
  | 'fire'
  | 'ice'
  | 'lightning'
  | 'nature'
  | 'shadow'
  | 'arcane'
  | 'pure';

export type PetAbilityType =
  | 'attack'
  | 'heal'
  | 'buff'
  | 'loot_boost'
  | 'xp_boost'
  | 'luck_boost'
  | 'detect'
  | 'tank';

export interface ItemStats {
  atk?: number;
  def?: number;
  luck?: number;
  strength?: number;
  agility?: number;
  vitality?: number;
  arcana?: number;
  perception?: number;
  will?: number;
  hp?: number;
  mp?: number;
  critChance?: number;
  critDmg?: number;
  elementRes?: Partial<Record<SpiritStoneElement, number>>;
}

export interface SpiritStoneData {
  element: SpiritStoneElement;
  level: number;
  maxLevel: number;
  effect: string;
  effectChance: number;
}

export interface PetData {
  hp: number;
  maxHp: number;
  atk: number;
  def: number;
  level: number;
  maxLevel: number;
  xp: number;
  xpToNext: number;
  abilityType: PetAbilityType;
  abilityValue: number;
  abilityKey: string;
  isAlive: boolean;
  cooldown: number;
  element?: SpiritStoneElement;
}

export interface MountData {
  exploreReduction: number;
  element?: SpiritStoneElement;
  bonusStats?: ItemStats;
}

export interface Item {
  id: string;
  numId: number;
  icon: string;
  rarity: Rarity;
  type: ItemType;
  slot: Slot;
  isTwoHanded?: boolean;
  weaponCategory?: WeaponCategory;
  requireLevel?: number;
  stats?: ItemStats;
  spiritStone?: SpiritStoneData;
  petData?: PetData;
  mountData?: MountData;
  nameKey: string;
  descKey: string;
}
