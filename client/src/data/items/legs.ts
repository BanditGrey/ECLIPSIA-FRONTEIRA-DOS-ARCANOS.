import type { Item } from '../../types/item.types';

export const legs = {
  "legs_basic_armor": {
    "id": "legs_basic_armor",
    "numId": 3500,
    "icon": "👖",
    "rarity": "common",
    "type": "armor",
    "slot": "legs",
    "requireLevel": 1,
    "nameKey": "itemNames.legs_basic_armor.name",
    "descKey": "itemNames.legs_basic_armor.desc",
    "stats": {
      "def": 8,
      "hp": 20
    },
    "effects": {
      "e1": 2,
      "v1": 8,
      "e2": 10,
      "v2": 20
    }
  }
} satisfies Record<string, Item>;
