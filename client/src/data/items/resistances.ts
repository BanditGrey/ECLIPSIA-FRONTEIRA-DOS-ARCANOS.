import type { Item } from '../../types/item.types';

export const resistances = {
  "rs_6500": {
    "id": "rs_6500",
    "numId": 6500,
    "icon": "🔰",
    "rarity": "common",
    "type": "accessory",
    "slot": "resistance",
    "requireLevel": 2,
    "nameKey": "itemNames.rs_6500.name",
    "descKey": "itemNames.rs_6500.desc",
    "stats": {
      "def": 8
    },
    "effects": {
      "e1": 2,
      "v1": 8,
      "e2": 23,
      "v2": 8
    }
  },
  "rs_6501": {
    "id": "rs_6501",
    "numId": 6501,
    "icon": "🔰",
    "rarity": "uncommon",
    "type": "accessory",
    "slot": "resistance",
    "requireLevel": 10,
    "nameKey": "itemNames.rs_6501.name",
    "descKey": "itemNames.rs_6501.desc",
    "stats": {
      "def": 16,
      "vitality": 5
    },
    "effects": {
      "e1": 2,
      "v1": 16,
      "e2": 23,
      "v2": 18,
      "e3": 5,
      "v3": 5
    }
  },
  "rs_6502": {
    "id": "rs_6502",
    "numId": 6502,
    "icon": "🔰",
    "rarity": "rare",
    "type": "accessory",
    "slot": "resistance",
    "requireLevel": 20,
    "nameKey": "itemNames.rs_6502.name",
    "descKey": "itemNames.rs_6502.desc",
    "stats": {
      "def": 28,
      "vitality": 10
    },
    "effects": {
      "e1": 2,
      "v1": 28,
      "e2": 23,
      "v2": 30,
      "e3": 5,
      "v3": 10
    }
  },
  "rs_6503": {
    "id": "rs_6503",
    "numId": 6503,
    "icon": "🔰",
    "rarity": "legendary",
    "type": "accessory",
    "slot": "resistance",
    "requireLevel": 35,
    "nameKey": "itemNames.rs_6503.name",
    "descKey": "itemNames.rs_6503.desc",
    "stats": {
      "def": 42,
      "vitality": 16
    },
    "effects": {
      "e1": 2,
      "v1": 42,
      "e2": 23,
      "v2": 45,
      "e3": 5,
      "v3": 16
    }
  },
  "rs_6600": {
    "id": "rs_6600",
    "numId": 6600,
    "icon": "🔰",
    "rarity": "rare",
    "type": "accessory",
    "slot": "resistance",
    "requireLevel": 15,
    "nameKey": "itemNames.rs_6600.name",
    "descKey": "itemNames.rs_6600.desc",
    "stats": {
      "arcana": 4
    },
    "effects": {
      "e1": 23,
      "v1": 15,
      "e2": 6,
      "v2": 4
    }
  },
  "rs_6601": {
    "id": "rs_6601",
    "numId": 6601,
    "icon": "🔰",
    "rarity": "epic",
    "type": "accessory",
    "slot": "resistance",
    "requireLevel": 25,
    "nameKey": "itemNames.rs_6601.name",
    "descKey": "itemNames.rs_6601.desc",
    "stats": {
      "arcana": 10,
      "def": 8
    },
    "effects": {
      "e1": 23,
      "v1": 28,
      "e2": 6,
      "v2": 10,
      "e3": 2,
      "v3": 8
    }
  },
  "rs_6700": {
    "id": "rs_6700",
    "numId": 6700,
    "icon": "🔰",
    "rarity": "rare",
    "type": "accessory",
    "slot": "resistance",
    "requireLevel": 20,
    "nameKey": "itemNames.rs_6700.name",
    "descKey": "itemNames.rs_6700.desc",
    "stats": {
      "arcana": 15,
      "will": 6
    },
    "effects": {
      "e1": 23,
      "v1": 20,
      "e2": 6,
      "v2": 15,
      "e3": 8,
      "v3": 6
    }
  },
  "rs_6701": {
    "id": "rs_6701",
    "numId": 6701,
    "icon": "🔰",
    "rarity": "epic",
    "type": "accessory",
    "slot": "resistance",
    "requireLevel": 30,
    "nameKey": "itemNames.rs_6701.name",
    "descKey": "itemNames.rs_6701.desc",
    "stats": {
      "arcana": 25,
      "will": 12,
      "def": 14
    },
    "effects": {
      "e1": 23,
      "v1": 35,
      "e2": 6,
      "v2": 25,
      "e3": 8,
      "v3": 12,
      "e4": 2,
      "v4": 14
    }
  },
  "rs_6702": {
    "id": "rs_6702",
    "numId": 6702,
    "icon": "🔰",
    "rarity": "relic",
    "type": "accessory",
    "slot": "resistance",
    "requireLevel": 45,
    "nameKey": "itemNames.rs_6702.name",
    "descKey": "itemNames.rs_6702.desc",
    "stats": {
      "arcana": 40,
      "will": 20,
      "def": 25,
      "vitality": 15
    },
    "effects": {
      "e1": 23,
      "v1": 55,
      "e2": 6,
      "v2": 40,
      "e3": 8,
      "v3": 20,
      "e4": 2,
      "v4": 25,
      "e5": 5,
      "v5": 15
    }
  }
} satisfies Record<string, Item>;
