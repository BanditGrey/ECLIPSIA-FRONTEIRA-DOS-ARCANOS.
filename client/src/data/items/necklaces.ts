import type { Item } from '../../types/item.types';

export const necklaces = {
  "necklace_basic_accessory": {
    "id": "necklace_basic_accessory",
    "numId": 5500,
    "icon": "📿",
    "rarity": "common",
    "type": "accessory",
    "slot": "necklace",
    "requireLevel": 1,
    "nameKey": "itemNames.necklace_basic_accessory.name",
    "descKey": "itemNames.necklace_basic_accessory.desc",
    "stats": {
      "will": 1,
      "mp": 15
    }
  }
} satisfies Record<string, Item>;
