import type { Item } from '../../types/item.types';

export const resistances = {
  "resistance_basic_accessory": {
    "id": "resistance_basic_accessory",
    "numId": 6500,
    "icon": "🔰",
    "rarity": "common",
    "type": "accessory",
    "slot": "resistance",
    "requireLevel": 5,
    "nameKey": "itemNames.resistance_basic_accessory.name",
    "descKey": "itemNames.resistance_basic_accessory.desc",
    "stats": {
      "def": 5
    },
    "effects": {
      "e1": 2,
      "v1": 5
    }
  }
} satisfies Record<string, Item>;
