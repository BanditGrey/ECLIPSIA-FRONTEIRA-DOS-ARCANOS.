import type { Item } from '../../types/item.types';

export const earrings = {
  "earring_basic_accessory": {
    "id": "earring_basic_accessory",
    "numId": 5000,
    "icon": "💠",
    "rarity": "common",
    "type": "accessory",
    "slot": "earring",
    "requireLevel": 1,
    "nameKey": "itemNames.earring_basic_accessory.name",
    "descKey": "itemNames.earring_basic_accessory.desc",
    "stats": {
      "luck": 1
    },
    "effects": {
      "e1": 9,
      "v1": 1
    }
  },
  "misty_ring": {
    "id": "misty_ring",
    "numId": 5001,
    "icon": "💍",
    "rarity": "rare",
    "type": "accessory",
    "slot": "earring",
    "requireLevel": 15,
    "nameKey": "itemNames.misty_ring.name",
    "descKey": "itemNames.misty_ring.desc",
    "stats": {
      "luck": 6,
      "perception": 3
    },
    "effects": {
      "e1": 7,
      "v1": 3,
      "e2": 9,
      "v2": 6
    }
  }
} satisfies Record<string, Item>;
