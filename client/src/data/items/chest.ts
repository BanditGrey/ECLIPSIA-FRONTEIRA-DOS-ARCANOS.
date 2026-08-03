import type { Item } from '../../types/item.types';

export const chest = {
  "chest_basic_armor": {
    "id": "chest_basic_armor",
    "numId": 3000,
    "icon": "🥋",
    "rarity": "common",
    "type": "armor",
    "slot": "chest",
    "requireLevel": 1,
    "nameKey": "itemNames.chest_basic_armor.name",
    "descKey": "itemNames.chest_basic_armor.desc",
    "stats": {
      "def": 12,
      "hp": 35
    },
    "effects": {
      "e1": 2,
      "v1": 12,
      "e2": 10,
      "v2": 35
    }
  },
  "chest_uncommon_shop": {
    "id": "chest_uncommon_shop",
    "numId": 3001,
    "icon": "🥋",
    "rarity": "uncommon",
    "type": "armor",
    "slot": "chest",
    "requireLevel": 5,
    "nameKey": "itemNames.chest_uncommon_shop.name",
    "descKey": "itemNames.chest_uncommon_shop.desc",
    "stats": {
      "def": 22,
      "vitality": 2
    },
    "effects": {
      "e1": 2,
      "v1": 22,
      "e2": 5,
      "v2": 2
    }
  }
} satisfies Record<string, Item>;
