import type { Item } from '../../types/item.types';

export const boots = {
  "boots_basic_armor": {
    "id": "boots_basic_armor",
    "numId": 4500,
    "icon": "🥾",
    "rarity": "common",
    "type": "armor",
    "slot": "boots",
    "requireLevel": 1,
    "nameKey": "itemNames.boots_basic_armor.name",
    "descKey": "itemNames.boots_basic_armor.desc",
    "stats": {
      "def": 5,
      "agility": 1
    },
    "effects": {
      "e1": 2,
      "v1": 5,
      "e2": 4,
      "v2": 1
    }
  }
} satisfies Record<string, Item>;
