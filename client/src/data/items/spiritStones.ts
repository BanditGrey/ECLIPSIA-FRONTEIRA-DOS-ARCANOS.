import type { Item } from '../../types/item.types';

export const spiritStones = {
  "spirit_stone_fire_basic": {
    "id": "spirit_stone_fire_basic",
    "numId": 7500,
    "icon": "🔥",
    "rarity": "uncommon",
    "type": "spirit_stone",
    "slot": "spirit_stone",
    "requireLevel": 10,
    "nameKey": "itemNames.spirit_stone_fire_basic.name",
    "descKey": "itemNames.spirit_stone_fire_basic.desc",
    "spiritStone": {
      "element": "fire",
      "level": 1,
      "maxLevel": 10,
      "effect": "burn",
      "effectChance": 0.12
    },
    "effects": {
      "e1": 61,
      "v1": 12
    }
  },
  "spirit_stone_ice_basic": {
    "id": "spirit_stone_ice_basic",
    "numId": 7501,
    "icon": "❄",
    "rarity": "uncommon",
    "type": "spirit_stone",
    "slot": "spirit_stone",
    "requireLevel": 10,
    "nameKey": "itemNames.spirit_stone_ice_basic.name",
    "descKey": "itemNames.spirit_stone_ice_basic.desc",
    "spiritStone": {
      "element": "ice",
      "level": 1,
      "maxLevel": 10,
      "effect": "freeze",
      "effectChance": 0.12
    },
    "effects": {
      "e1": 62,
      "v1": 12
    }
  },
  "spirit_stone_lightning_basic": {
    "id": "spirit_stone_lightning_basic",
    "numId": 7502,
    "icon": "⚡",
    "rarity": "uncommon",
    "type": "spirit_stone",
    "slot": "spirit_stone",
    "requireLevel": 10,
    "nameKey": "itemNames.spirit_stone_lightning_basic.name",
    "descKey": "itemNames.spirit_stone_lightning_basic.desc",
    "spiritStone": {
      "element": "lightning",
      "level": 1,
      "maxLevel": 10,
      "effect": "paralyze",
      "effectChance": 0.12
    },
    "effects": {
      "e1": 65,
      "v1": 12
    }
  },
  "spirit_stone_nature_basic": {
    "id": "spirit_stone_nature_basic",
    "numId": 7503,
    "icon": "🌿",
    "rarity": "uncommon",
    "type": "spirit_stone",
    "slot": "spirit_stone",
    "requireLevel": 10,
    "nameKey": "itemNames.spirit_stone_nature_basic.name",
    "descKey": "itemNames.spirit_stone_nature_basic.desc",
    "spiritStone": {
      "element": "nature",
      "level": 1,
      "maxLevel": 10,
      "effect": "regenerate",
      "effectChance": 0.12
    },
    "effects": {
      "e1": 55,
      "v1": 8
    }
  },
  "spirit_stone_shadow_basic": {
    "id": "spirit_stone_shadow_basic",
    "numId": 7504,
    "icon": "🌑",
    "rarity": "uncommon",
    "type": "spirit_stone",
    "slot": "spirit_stone",
    "requireLevel": 10,
    "nameKey": "itemNames.spirit_stone_shadow_basic.name",
    "descKey": "itemNames.spirit_stone_shadow_basic.desc",
    "spiritStone": {
      "element": "shadow",
      "level": 1,
      "maxLevel": 10,
      "effect": "bleed",
      "effectChance": 0.12
    },
    "effects": {
      "e1": 63,
      "v1": 12
    }
  },
  "spirit_stone_arcane_basic": {
    "id": "spirit_stone_arcane_basic",
    "numId": 7505,
    "icon": "🔮",
    "rarity": "uncommon",
    "type": "spirit_stone",
    "slot": "spirit_stone",
    "requireLevel": 10,
    "nameKey": "itemNames.spirit_stone_arcane_basic.name",
    "descKey": "itemNames.spirit_stone_arcane_basic.desc",
    "spiritStone": {
      "element": "arcane",
      "level": 1,
      "maxLevel": 10,
      "effect": "mana_drain",
      "effectChance": 0.12
    },
    "effects": {
      "e1": 49,
      "v1": 20
    }
  },
  "spirit_stone_pure_basic": {
    "id": "spirit_stone_pure_basic",
    "numId": 7506,
    "icon": "✨",
    "rarity": "uncommon",
    "type": "spirit_stone",
    "slot": "spirit_stone",
    "requireLevel": 10,
    "nameKey": "itemNames.spirit_stone_pure_basic.name",
    "descKey": "itemNames.spirit_stone_pure_basic.desc",
    "spiritStone": {
      "element": "pure",
      "level": 1,
      "maxLevel": 10,
      "effect": "all_boost",
      "effectChance": 0.12
    },
    "effects": {
      "e1": 3,
      "v1": 2,
      "e2": 4,
      "v2": 2,
      "e3": 5,
      "v3": 2,
      "e4": 6,
      "v4": 2,
      "e5": 24,
      "v5": 5
    }
  }
} satisfies Record<string, Item>;
