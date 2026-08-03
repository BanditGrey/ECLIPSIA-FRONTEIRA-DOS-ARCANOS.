import type { Item } from '../../types/item.types';

export const amulets = {
  "amulet_basic_accessory": {
    "id": "amulet_basic_accessory",
    "numId": 7000,
    "icon": "🔮",
    "rarity": "common",
    "type": "accessory",
    "slot": "amulet",
    "requireLevel": 5,
    "nameKey": "itemNames.amulet_basic_accessory.name",
    "descKey": "itemNames.amulet_basic_accessory.desc",
    "stats": {
      "luck": 2,
      "arcana": 1
    },
    "effects": {
      "e1": 6,
      "v1": 1,
      "e2": 9,
      "v2": 2
    }
  },
  "fortune_amulet": {
    "id": "fortune_amulet",
    "numId": 7001,
    "icon": "🍀",
    "rarity": "rare",
    "type": "accessory",
    "slot": "amulet",
    "requireLevel": 20,
    "nameKey": "itemNames.fortune_amulet.name",
    "descKey": "itemNames.fortune_amulet.desc",
    "stats": {
      "luck": 12,
      "perception": 2
    },
    "effects": {
      "e1": 7,
      "v1": 2,
      "e2": 9,
      "v2": 12
    }
  }
} satisfies Record<string, Item>;
