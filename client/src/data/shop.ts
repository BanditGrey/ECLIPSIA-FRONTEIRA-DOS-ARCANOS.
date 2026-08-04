export type ShopCategory = 'weapon' | 'armor' | 'accessory' | 'pet' | 'mount';

export interface ShopEntry {
  itemId: string;
  price: number;
  category: ShopCategory;
  requireLevel?: number;
}

export const shop: ShopEntry[] = [
  {
    itemId: 'w1h_1000',
    price: 120,
    category: 'weapon',
    requireLevel: 1
  },
  {
    itemId: 'w1h_1100',
    price: 100,
    category: 'weapon',
    requireLevel: 1
  },
  {
    itemId: 'w1h_1150',
    price: 140,
    category: 'weapon',
    requireLevel: 1
  },
  {
    itemId: 'w1h_1200',
    price: 120,
    category: 'weapon',
    requireLevel: 1
  },
  {
    itemId: 'w2h_1500',
    price: 260,
    category: 'weapon',
    requireLevel: 5
  },
  {
    itemId: 'w2h_1700',
    price: 260,
    category: 'weapon',
    requireLevel: 5
  },
  {
    itemId: 'w1h_1002',
    price: 420,
    category: 'weapon',
    requireLevel: 8
  },
  {
    itemId: 'w2h_1751',
    price: 520,
    category: 'weapon',
    requireLevel: 12
  },
  {
    itemId: 'w1h_1003',
    price: 650,
    category: 'weapon',
    requireLevel: 12
  },
  {
    itemId: 'w1h_1004',
    price: 1200,
    category: 'weapon',
    requireLevel: 18
  },
  {
    itemId: 'oh_2000',
    price: 160,
    category: 'weapon',
    requireLevel: 1
  },
  {
    itemId: 'oh_2002',
    price: 520,
    category: 'weapon',
    requireLevel: 10
  },
  {
    itemId: 'oh_2150',
    price: 480,
    category: 'weapon',
    requireLevel: 8
  },
  {
    itemId: 'hd_2500',
    price: 150,
    category: 'armor',
    requireLevel: 1
  },
  {
    itemId: 'ch_3000',
    price: 220,
    category: 'armor',
    requireLevel: 1
  },
  {
    itemId: 'lg_3500',
    price: 180,
    category: 'armor',
    requireLevel: 1
  },
  {
    itemId: 'gl_4000',
    price: 140,
    category: 'armor',
    requireLevel: 1
  },
  {
    itemId: 'bt_4500',
    price: 140,
    category: 'armor',
    requireLevel: 1
  },
  {
    itemId: 'hd_2502',
    price: 480,
    category: 'armor',
    requireLevel: 8
  },
  {
    itemId: 'ch_3002',
    price: 620,
    category: 'armor',
    requireLevel: 10
  },
  {
    itemId: 'lg_3502',
    price: 520,
    category: 'armor',
    requireLevel: 10
  },
  {
    itemId: 'er_5000',
    price: 200,
    category: 'accessory',
    requireLevel: 1
  },
  {
    itemId: 'nk_5500',
    price: 220,
    category: 'accessory',
    requireLevel: 1
  },
  {
    itemId: 'bt_6000',
    price: 180,
    category: 'accessory',
    requireLevel: 1
  },
  {
    itemId: 'rs_6500',
    price: 240,
    category: 'accessory',
    requireLevel: 2
  },
  {
    itemId: 'am_7000',
    price: 260,
    category: 'accessory',
    requireLevel: 1
  },
  {
    itemId: 'ss_7500',
    price: 800,
    category: 'accessory',
    requireLevel: 10
  },
  {
    itemId: 'ss_7550',
    price: 800,
    category: 'accessory',
    requireLevel: 10
  },
  {
    itemId: 'pt_8000',
    price: 400,
    category: 'pet',
    requireLevel: 1
  },
  {
    itemId: 'pt_8001',
    price: 450,
    category: 'pet',
    requireLevel: 5
  },
  {
    itemId: 'pt_8050',
    price: 900,
    category: 'pet',
    requireLevel: 10
  },
  {
    itemId: 'mt_8500',
    price: 600,
    category: 'mount',
    requireLevel: 1
  },
  {
    itemId: 'mt_8501',
    price: 1100,
    category: 'mount',
    requireLevel: 10
  },
  {
    itemId: 'mt_8502',
    price: 2400,
    category: 'mount',
    requireLevel: 20
  }
];
