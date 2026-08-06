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
  | 'dagger_off'
  | 'glyph';

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

/**
 * Efeitos numéricos de um item (sistema ItemEffects).
 *
 * Regras:
 * - Máximo de 10 effects por item (e1-e10 / v1-v10)
 * - Sempre em pares e+v (effect ID + value)
 * - Se eN existe, vN DEVE existir
 * - Sem gaps: não pode haver e3 sem e2
 * - Value sempre numérico (% como inteiro: 15 = 15%; flat direto: 65 = 65 ATK)
 * - Values negativos são penalidades (ex.: -2 AGI em martelos)
 * - effectId 0 não existe (reservado)
 *
 * Os IDs estão definidos em `client/src/data/effectRegistry.ts`.
 * Exemplo compacto: { e1: 1, v1: 65, e2: 4, v2: 5 } = ATK 65, AGI 5
 */
export interface ItemEffect {
  /** effect 1 ID */
  e1?: number;
  /** effect 1 value */
  v1?: number;
  /** effect 2 ID */
  e2?: number;
  /** effect 2 value */
  v2?: number;
  e3?: number;
  v3?: number;
  e4?: number;
  v4?: number;
  e5?: number;
  v5?: number;
  e6?: number;
  v6?: number;
  e7?: number;
  v7?: number;
  e8?: number;
  v8?: number;
  e9?: number;
  v9?: number;
  e10?: number;
  v10?: number;
}

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
  /**
   * Fonte de verdade dos bônus do item (IDs numéricos).
   * `stats` pode coexistir, mas `effects` tem prioridade na
   * serialização para envio/banco (correio, mercado, trades).
   */
  effects?: ItemEffect;
  /** Effect exclusivo (e11) para itens lendários/acima — definido nos arquivos de dados. */
  exclusiveEffect?: number;
  spiritStone?: SpiritStoneData;
  petData?: PetData;
  mountData?: MountData;
  nameKey: string;
  descKey: string;
}
