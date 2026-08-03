import type { Item } from '../../types/item.types';

export const weapons1h = {
  "sword_one_basic": {
    "id": "sword_one_basic",
    "numId": 1000,
    "icon": "⚔",
    "rarity": "common",
    "type": "weapon_main",
    "slot": "weapon_main",
    "requireLevel": 1,
    "nameKey": "itemNames.sword_one_basic.name",
    "descKey": "itemNames.sword_one_basic.desc",
    "isTwoHanded": false,
    "weaponCategory": "sword_one",
    "stats": {
      "atk": 12,
      "strength": 1
    },
    "effects": {
      "e1": 1,
      "v1": 12,
      "e2": 3,
      "v2": 1
    }
  },
  "dagger_basic": {
    "id": "dagger_basic",
    "numId": 1001,
    "icon": "🗡",
    "rarity": "common",
    "type": "weapon_main",
    "slot": "weapon_main",
    "requireLevel": 1,
    "nameKey": "itemNames.dagger_basic.name",
    "descKey": "itemNames.dagger_basic.desc",
    "isTwoHanded": false,
    "weaponCategory": "dagger",
    "stats": {
      "atk": 9,
      "agility": 2
    },
    "effects": {
      "e1": 1,
      "v1": 9,
      "e2": 4,
      "v2": 2
    }
  },
  "staff_one_basic": {
    "id": "staff_one_basic",
    "numId": 1002,
    "icon": "🪄",
    "rarity": "common",
    "type": "weapon_main",
    "slot": "weapon_main",
    "requireLevel": 1,
    "nameKey": "itemNames.staff_one_basic.name",
    "descKey": "itemNames.staff_one_basic.desc",
    "isTwoHanded": false,
    "weaponCategory": "staff_one",
    "stats": {
      "atk": 7,
      "arcana": 2
    },
    "effects": {
      "e1": 1,
      "v1": 7,
      "e2": 6,
      "v2": 2
    }
  },
  "bow_short_basic": {
    "id": "bow_short_basic",
    "numId": 1003,
    "icon": "🏹",
    "rarity": "common",
    "type": "weapon_main",
    "slot": "weapon_main",
    "requireLevel": 1,
    "nameKey": "itemNames.bow_short_basic.name",
    "descKey": "itemNames.bow_short_basic.desc",
    "isTwoHanded": false,
    "weaponCategory": "bow_short",
    "stats": {
      "atk": 10,
      "perception": 1
    },
    "effects": {
      "e1": 1,
      "v1": 10,
      "e2": 7,
      "v2": 1
    }
  },
  "sword_one_uncommon": {
    "id": "sword_one_uncommon",
    "numId": 1004,
    "icon": "⚔",
    "rarity": "uncommon",
    "type": "weapon_main",
    "slot": "weapon_main",
    "requireLevel": 5,
    "nameKey": "itemNames.sword_one_uncommon.name",
    "descKey": "itemNames.sword_one_uncommon.desc",
    "isTwoHanded": false,
    "weaponCategory": "sword_one",
    "stats": {
      "atk": 22,
      "strength": 2
    },
    "effects": {
      "e1": 1,
      "v1": 22,
      "e2": 3,
      "v2": 2
    }
  },
  "dagger_nythera_uncommon": {
    "id": "dagger_nythera_uncommon",
    "numId": 1005,
    "icon": "🗡",
    "rarity": "uncommon",
    "type": "weapon_main",
    "slot": "weapon_main",
    "requireLevel": 10,
    "nameKey": "itemNames.dagger_nythera_uncommon.name",
    "descKey": "itemNames.dagger_nythera_uncommon.desc",
    "isTwoHanded": false,
    "weaponCategory": "dagger",
    "stats": {
      "atk": 24,
      "agility": 3,
      "perception": 1
    },
    "effects": {
      "e1": 1,
      "v1": 24,
      "e2": 4,
      "v2": 3,
      "e3": 7,
      "v3": 1
    }
  },
  "arcane_rod_rare": {
    "id": "arcane_rod_rare",
    "numId": 1006,
    "icon": "🔮",
    "rarity": "rare",
    "type": "weapon_main",
    "slot": "weapon_main",
    "requireLevel": 15,
    "nameKey": "itemNames.arcane_rod_rare.name",
    "descKey": "itemNames.arcane_rod_rare.desc",
    "isTwoHanded": false,
    "weaponCategory": "staff_one",
    "stats": {
      "atk": 30,
      "arcana": 5,
      "mp": 60
    },
    "effects": {
      "e1": 1,
      "v1": 30,
      "e2": 6,
      "v2": 5,
      "e3": 11,
      "v3": 60
    }
  },
  "long_sword": {
    "id": "long_sword",
    "numId": 1007,
    "icon": "⚔",
    "rarity": "uncommon",
    "type": "weapon_main",
    "slot": "weapon_main",
    "requireLevel": 5,
    "nameKey": "itemNames.long_sword.name",
    "descKey": "itemNames.long_sword.desc",
    "isTwoHanded": false,
    "weaponCategory": "sword_one",
    "stats": {
      "atk": 24,
      "strength": 2
    },
    "effects": {
      "e1": 1,
      "v1": 24,
      "e2": 3,
      "v2": 2
    }
  }
} satisfies Record<string, Item>;
