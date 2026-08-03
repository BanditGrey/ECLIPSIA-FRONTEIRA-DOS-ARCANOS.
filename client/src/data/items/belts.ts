import type { Item } from '../../types/item.types';

export const belts = {
  "belt_basic_accessory": {
    "id": "belt_basic_accessory",
    "numId": 6000,
    "icon": "🧷",
    "rarity": "common",
    "type": "accessory",
    "slot": "belt",
    "requireLevel": 1,
    "nameKey": "itemNames.belt_basic_accessory.name",
    "descKey": "itemNames.belt_basic_accessory.desc",
    "stats": {
      "vitality": 1
    },
    "effects": {
      "e1": 5,
      "v1": 1
    }
  }
} satisfies Record<string, Item>;
