import type { Item } from '../../types/item.types';

export const gloves = {
  "gloves_basic_armor": {
    "id": "gloves_basic_armor",
    "numId": 4000,
    "icon": "🧤",
    "rarity": "common",
    "type": "armor",
    "slot": "gloves",
    "requireLevel": 1,
    "nameKey": "itemNames.gloves_basic_armor.name",
    "descKey": "itemNames.gloves_basic_armor.desc",
    "stats": {
      "def": 5,
      "agility": 1
    }
  }
} satisfies Record<string, Item>;
