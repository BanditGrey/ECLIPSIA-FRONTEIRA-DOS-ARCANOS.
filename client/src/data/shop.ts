export type ShopCategory = 'weapon' | 'armor' | 'accessory' | 'pet' | 'mount';

export interface ShopEntry {
  itemId: string;
  price: number;
  category: ShopCategory;
  requireLevel?: number;
}

export const shop: ShopEntry[] = [
  {
    itemId: 'sword_one_basic',
    price: 120,
    category: 'weapon',
    requireLevel: 1
  },
  {
    itemId: 'dagger_basic',
    price: 100,
    category: 'weapon',
    requireLevel: 1
  },
  {
    itemId: 'staff_one_basic',
    price: 140,
    category: 'weapon',
    requireLevel: 1
  },
  {
    itemId: 'great_sword_basic_2h',
    price: 260,
    category: 'weapon',
    requireLevel: 5
  },
  {
    itemId: 'bow_long_basic_2h',
    price: 260,
    category: 'weapon',
    requireLevel: 5
  },
  {
    itemId: 'sword_one_uncommon',
    price: 420,
    category: 'weapon',
    requireLevel: 10
  },
  {
    itemId: 'staff_two_uncommon_2h',
    price: 520,
    category: 'weapon',
    requireLevel: 10
  },
  {
    itemId: 'head_basic_armor',
    price: 90,
    category: 'armor',
    requireLevel: 1
  },
  {
    itemId: 'chest_basic_armor',
    price: 160,
    category: 'armor',
    requireLevel: 1
  },
  {
    itemId: 'legs_basic_armor',
    price: 130,
    category: 'armor',
    requireLevel: 1
  },
  {
    itemId: 'gloves_basic_armor',
    price: 80,
    category: 'armor',
    requireLevel: 1
  },
  {
    itemId: 'boots_basic_armor',
    price: 90,
    category: 'armor',
    requireLevel: 1
  },
  {
    itemId: 'earring_basic_accessory',
    price: 140,
    category: 'accessory',
    requireLevel: 1
  },
  {
    itemId: 'necklace_basic_accessory',
    price: 180,
    category: 'accessory',
    requireLevel: 1
  },
  {
    itemId: 'belt_basic_accessory',
    price: 120,
    category: 'accessory',
    requireLevel: 1
  },
  {
    itemId: 'resistance_basic_accessory',
    price: 220,
    category: 'accessory',
    requireLevel: 5
  },
  {
    itemId: 'amulet_basic_accessory',
    price: 260,
    category: 'accessory',
    requireLevel: 5
  },
  {
    itemId: 'spirit_stone_fire_basic',
    price: 350,
    category: 'accessory',
    requireLevel: 10
  },
  {
    itemId: 'spirit_stone_ice_basic',
    price: 350,
    category: 'accessory',
    requireLevel: 10
  },
  {
    itemId: 'wolf_pup_pet',
    price: 800,
    category: 'pet',
    requireLevel: 1
  },
  {
    itemId: 'forest_sprite_pet',
    price: 1400,
    category: 'pet',
    requireLevel: 10
  },
  {
    itemId: 'brown_horse',
    price: 1200,
    category: 'mount',
    requireLevel: 1
  },
  {
    itemId: 'forest_deer',
    price: 2200,
    category: 'mount',
    requireLevel: 10
  }
];
