export type ItemCategory =
  | 'weapon_1h'
  | 'weapon_2h'
  | 'off_hand'
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
  | 'special_cosmetic';

export interface ItemCategoryRange {
  category: ItemCategory;
  min: number;
  max: number;
  description: string;
}

export const itemCategoryRanges: ItemCategoryRange[] = [
  {
    category: 'weapon_1h',
    min: 1000,
    max: 1499,
    description: 'Armas 1H: espadas, adagas, cajados 1H, arcos curtos'
  },
  {
    category: 'weapon_2h',
    min: 1500,
    max: 1999,
    description: 'Armas 2H: espadas grandes, martelos, lanças, arcos longos, cajados 2H'
  },
  {
    category: 'off_hand',
    min: 2000,
    max: 2499,
    description: 'Off-Hand: escudos, adagas off, orbes, tomos'
  },
  {
    category: 'head',
    min: 2500,
    max: 2999,
    description: 'Elmo: físicos, capuzes, coroas'
  },
  {
    category: 'chest',
    min: 3000,
    max: 3499,
    description: 'Peito: armaduras físicas, vestes leves, robes mágicas'
  },
  {
    category: 'legs',
    min: 3500,
    max: 3999,
    description: 'Calça: físicas, leves, mágicas'
  },
  {
    category: 'gloves',
    min: 4000,
    max: 4499,
    description: 'Luva: físicas, leves, mágicas'
  },
  {
    category: 'boots',
    min: 4500,
    max: 4999,
    description: 'Bota: físicas, leves, mágicas'
  },
  {
    category: 'earring',
    min: 5000,
    max: 5499,
    description: 'Brinco: combate, utilidade, elementais'
  },
  {
    category: 'necklace',
    min: 5500,
    max: 5999,
    description: 'Colar: físicos, mágicos, sorte'
  },
  {
    category: 'belt',
    min: 6000,
    max: 6499,
    description: 'Cinto: físicos, mágicos, utilidade'
  },
  {
    category: 'resistance',
    min: 6500,
    max: 6999,
    description: 'Resistência: física, elemental, arcana'
  },
  {
    category: 'amulet',
    min: 7000,
    max: 7499,
    description: 'Amuleto: sorte, poder, elementais'
  },
  {
    category: 'spirit_stone',
    min: 7500,
    max: 7999,
    description: 'Pedra Espiritual: fogo, gelo, raio, natural, sombria, arcana, pura'
  },
  {
    category: 'pet',
    min: 8000,
    max: 8499,
    description: 'Pet: comum, incomum, raro, épico, lendário, relíquia'
  },
  {
    category: 'mount',
    min: 8500,
    max: 8999,
    description: 'Montaria: terrestre, rápida, voadora, aquática, lendária'
  },
  {
    category: 'material',
    min: 9000,
    max: 9499,
    description: 'Material: drops por região, colossos e crafting geral'
  },
  {
    category: 'special_cosmetic',
    min: 9500,
    max: 9999,
    description: 'Especial/Cosmético'
  }
];

export const getItemCategory = (numId: number): ItemCategory | null => {
  return itemCategoryRanges.find((range) => numId >= range.min && numId <= range.max)?.category ?? null;
};

export const isValidItemId = (numId: number) => {
  return Number.isInteger(numId) && getItemCategory(numId) !== null;
};
