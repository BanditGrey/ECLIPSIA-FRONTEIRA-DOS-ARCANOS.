import type { Item } from '../../types/item.types';

export const belts = {
  "bt_6000": {
    "id": "bt_6000",
    "numId": 6000,
    "icon": "🧷",
    "rarity": "common",
    "type": "accessory",
    "slot": "belt",
    "requireLevel": 1,
    "nameKey": "itemNames.bt_6000.name",
    "descKey": "itemNames.bt_6000.desc",
    "stats": {
      "vitality": 4,
      "strength": 2
    },
    "effects": {
      "e1": 5,
      "v1": 4,
      "e2": 3,
      "v2": 2
    }
  },
  "bt_6001": {
    "id": "bt_6001",
    "numId": 6001,
    "icon": "🧷",
    "rarity": "uncommon",
    "type": "accessory",
    "slot": "belt",
    "requireLevel": 8,
    "nameKey": "itemNames.bt_6001.name",
    "descKey": "itemNames.bt_6001.desc",
    "stats": {
      "vitality": 8,
      "strength": 6,
      "hp": 80
    },
    "effects": {
      "e1": 5,
      "v1": 8,
      "e2": 3,
      "v2": 6,
      "e3": 10,
      "v3": 80
    }
  },
  "bt_6002": {
    "id": "bt_6002",
    "numId": 6002,
    "icon": "🧷",
    "rarity": "rare",
    "type": "accessory",
    "slot": "belt",
    "requireLevel": 18,
    "nameKey": "itemNames.bt_6002.name",
    "descKey": "itemNames.bt_6002.desc",
    "stats": {
      "vitality": 14,
      "strength": 10,
      "hp": 160,
      "def": 8
    },
    "effects": {
      "e1": 5,
      "v1": 14,
      "e2": 3,
      "v2": 10,
      "e3": 10,
      "v3": 160,
      "e4": 2,
      "v4": 8
    }
  },
  "bt_6003": {
    "id": "bt_6003",
    "numId": 6003,
    "icon": "🧷",
    "rarity": "epic",
    "type": "accessory",
    "slot": "belt",
    "requireLevel": 28,
    "nameKey": "itemNames.bt_6003.name",
    "descKey": "itemNames.bt_6003.desc",
    "stats": {
      "vitality": 22,
      "strength": 16,
      "hp": 280,
      "def": 14
    },
    "effects": {
      "e1": 5,
      "v1": 22,
      "e2": 3,
      "v2": 16,
      "e3": 10,
      "v3": 280,
      "e4": 2,
      "v4": 14
    }
  },
  "bt_6004": {
    "id": "bt_6004",
    "numId": 6004,
    "icon": "🧷",
    "rarity": "legendary",
    "type": "accessory",
    "slot": "belt",
    "requireLevel": 38,
    "nameKey": "itemNames.bt_6004.name",
    "descKey": "itemNames.bt_6004.desc",
    "stats": {
      "vitality": 32,
      "strength": 24,
      "hp": 440,
      "def": 22
    },
    "effects": {
      "e1": 5,
      "v1": 32,
      "e2": 3,
      "v2": 24,
      "e3": 10,
      "v3": 440,
      "e4": 2,
      "v4": 22,
      "e5": 55,
      "v5": 10
    }
  },
  "bt_6100": {
    "id": "bt_6100",
    "numId": 6100,
    "icon": "🧷",
    "rarity": "common",
    "type": "accessory",
    "slot": "belt",
    "requireLevel": 3,
    "nameKey": "itemNames.bt_6100.name",
    "descKey": "itemNames.bt_6100.desc",
    "stats": {
      "arcana": 6,
      "mp": 50,
      "will": 2
    },
    "effects": {
      "e1": 6,
      "v1": 6,
      "e2": 11,
      "v2": 50,
      "e3": 8,
      "v3": 2
    }
  },
  "bt_6101": {
    "id": "bt_6101",
    "numId": 6101,
    "icon": "🧷",
    "rarity": "rare",
    "type": "accessory",
    "slot": "belt",
    "requireLevel": 18,
    "nameKey": "itemNames.bt_6101.name",
    "descKey": "itemNames.bt_6101.desc",
    "stats": {
      "arcana": 20,
      "mp": 160,
      "will": 8
    },
    "effects": {
      "e1": 6,
      "v1": 20,
      "e2": 11,
      "v2": 160,
      "e3": 8,
      "v3": 8
    }
  },
  "bt_6102": {
    "id": "bt_6102",
    "numId": 6102,
    "icon": "🧷",
    "rarity": "legendary",
    "type": "accessory",
    "slot": "belt",
    "requireLevel": 35,
    "nameKey": "itemNames.bt_6102.name",
    "descKey": "itemNames.bt_6102.desc",
    "stats": {
      "arcana": 50,
      "mp": 400,
      "will": 20
    },
    "effects": {
      "e1": 6,
      "v1": 50,
      "e2": 11,
      "v2": 400,
      "e3": 8,
      "v3": 20,
      "e4": 26,
      "v4": 12
    }
  }
} satisfies Record<string, Item>;
