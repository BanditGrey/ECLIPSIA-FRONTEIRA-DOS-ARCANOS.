import type { Item } from '../../types/item.types';

export const offHand = {
  "shield_basic": {
    "id": "shield_basic",
    "numId": 2000,
    "icon": "🛡",
    "rarity": "common",
    "type": "weapon_off",
    "slot": "weapon_off",
    "requireLevel": 1,
    "nameKey": "itemNames.shield_basic.name",
    "descKey": "itemNames.shield_basic.desc",
    "isTwoHanded": false,
    "weaponCategory": "shield",
    "stats": {
      "def": 12,
      "vitality": 1
    },
    "effects": {
      "e1": 2,
      "v1": 12,
      "e2": 5,
      "v2": 1
    }
  },
  "dagger_off_basic": {
    "id": "dagger_off_basic",
    "numId": 2001,
    "icon": "🗡",
    "rarity": "common",
    "type": "weapon_off",
    "slot": "weapon_off",
    "requireLevel": 1,
    "nameKey": "itemNames.dagger_off_basic.name",
    "descKey": "itemNames.dagger_off_basic.desc",
    "isTwoHanded": false,
    "weaponCategory": "dagger_off",
    "stats": {
      "atk": 5,
      "agility": 1
    },
    "effects": {
      "e1": 1,
      "v1": 5,
      "e2": 4,
      "v2": 1
    }
  },
  "orb_basic": {
    "id": "orb_basic",
    "numId": 2002,
    "icon": "🔮",
    "rarity": "common",
    "type": "weapon_off",
    "slot": "weapon_off",
    "requireLevel": 1,
    "nameKey": "itemNames.orb_basic.name",
    "descKey": "itemNames.orb_basic.desc",
    "isTwoHanded": false,
    "weaponCategory": "orb",
    "stats": {
      "arcana": 2,
      "mp": 30
    },
    "effects": {
      "e1": 6,
      "v1": 2,
      "e2": 11,
      "v2": 30
    }
  },
  "tome_basic": {
    "id": "tome_basic",
    "numId": 2003,
    "icon": "📘",
    "rarity": "common",
    "type": "weapon_off",
    "slot": "weapon_off",
    "requireLevel": 1,
    "nameKey": "itemNames.tome_basic.name",
    "descKey": "itemNames.tome_basic.desc",
    "isTwoHanded": false,
    "weaponCategory": "tome",
    "stats": {
      "will": 2,
      "mp": 20
    },
    "effects": {
      "e1": 8,
      "v1": 2,
      "e2": 11,
      "v2": 20
    }
  },
  "shield_valedouro_uncommon": {
    "id": "shield_valedouro_uncommon",
    "numId": 2004,
    "icon": "🛡",
    "rarity": "uncommon",
    "type": "weapon_off",
    "slot": "weapon_off",
    "requireLevel": 8,
    "nameKey": "itemNames.shield_valedouro_uncommon.name",
    "descKey": "itemNames.shield_valedouro_uncommon.desc",
    "isTwoHanded": false,
    "weaponCategory": "shield",
    "stats": {
      "def": 24,
      "vitality": 3
    },
    "effects": {
      "e1": 2,
      "v1": 24,
      "e2": 5,
      "v2": 3
    }
  }
} satisfies Record<string, Item>;
