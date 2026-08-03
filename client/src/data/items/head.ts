import type { Item } from '../../types/item.types';

export const head = {
  "head_basic_armor": {
    "id": "head_basic_armor",
    "numId": 2500,
    "icon": "🎩",
    "rarity": "common",
    "type": "armor",
    "slot": "head",
    "requireLevel": 1,
    "nameKey": "itemNames.head_basic_armor.name",
    "descKey": "itemNames.head_basic_armor.desc",
    "stats": {
      "def": 6,
      "hp": 20
    },
    "effects": {
      "e1": 2,
      "v1": 6,
      "e2": 10,
      "v2": 20
    }
  },
  "hood_nythera_uncommon": {
    "id": "hood_nythera_uncommon",
    "numId": 2501,
    "icon": "🧢",
    "rarity": "uncommon",
    "type": "armor",
    "slot": "head",
    "requireLevel": 10,
    "nameKey": "itemNames.hood_nythera_uncommon.name",
    "descKey": "itemNames.hood_nythera_uncommon.desc",
    "stats": {
      "def": 10,
      "perception": 2
    },
    "effects": {
      "e1": 2,
      "v1": 10,
      "e2": 7,
      "v2": 2
    }
  }
} satisfies Record<string, Item>;
