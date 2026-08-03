import type { Item } from '../../types/item.types';

export const weapons2h = {
  "great_sword_basic_2h": {
    "id": "great_sword_basic_2h",
    "numId": 1500,
    "icon": "🗡",
    "rarity": "common",
    "type": "weapon_main",
    "slot": "weapon_main",
    "requireLevel": 5,
    "nameKey": "itemNames.great_sword_basic_2h.name",
    "descKey": "itemNames.great_sword_basic_2h.desc",
    "isTwoHanded": true,
    "weaponCategory": "great_sword",
    "stats": {
      "atk": 28,
      "strength": 3
    }
  },
  "bow_long_basic_2h": {
    "id": "bow_long_basic_2h",
    "numId": 1501,
    "icon": "🏹",
    "rarity": "common",
    "type": "weapon_main",
    "slot": "weapon_main",
    "requireLevel": 5,
    "nameKey": "itemNames.bow_long_basic_2h.name",
    "descKey": "itemNames.bow_long_basic_2h.desc",
    "isTwoHanded": true,
    "weaponCategory": "bow_long",
    "stats": {
      "atk": 26,
      "perception": 3
    }
  },
  "hammer_basic_2h": {
    "id": "hammer_basic_2h",
    "numId": 1502,
    "icon": "🔨",
    "rarity": "common",
    "type": "weapon_main",
    "slot": "weapon_main",
    "requireLevel": 6,
    "nameKey": "itemNames.hammer_basic_2h.name",
    "descKey": "itemNames.hammer_basic_2h.desc",
    "isTwoHanded": true,
    "weaponCategory": "hammer",
    "stats": {
      "atk": 30,
      "def": 3
    }
  },
  "spear_basic_2h": {
    "id": "spear_basic_2h",
    "numId": 1503,
    "icon": "🔱",
    "rarity": "common",
    "type": "weapon_main",
    "slot": "weapon_main",
    "requireLevel": 6,
    "nameKey": "itemNames.spear_basic_2h.name",
    "descKey": "itemNames.spear_basic_2h.desc",
    "isTwoHanded": true,
    "weaponCategory": "spear",
    "stats": {
      "atk": 27,
      "agility": 1,
      "perception": 1
    }
  },
  "staff_two_uncommon_2h": {
    "id": "staff_two_uncommon_2h",
    "numId": 1504,
    "icon": "🪄",
    "rarity": "uncommon",
    "type": "weapon_main",
    "slot": "weapon_main",
    "requireLevel": 10,
    "nameKey": "itemNames.staff_two_uncommon_2h.name",
    "descKey": "itemNames.staff_two_uncommon_2h.desc",
    "isTwoHanded": true,
    "weaponCategory": "staff_two",
    "stats": {
      "atk": 35,
      "arcana": 5,
      "mp": 80
    }
  },
  "great_sword_rare_2h": {
    "id": "great_sword_rare_2h",
    "numId": 1505,
    "icon": "🗡",
    "rarity": "rare",
    "type": "weapon_main",
    "slot": "weapon_main",
    "requireLevel": 20,
    "nameKey": "itemNames.great_sword_rare_2h.name",
    "descKey": "itemNames.great_sword_rare_2h.desc",
    "isTwoHanded": true,
    "weaponCategory": "great_sword",
    "stats": {
      "atk": 58,
      "strength": 6,
      "critDmg": 12
    }
  },
  "eclipse_halberd_epic_2h": {
    "id": "eclipse_halberd_epic_2h",
    "numId": 1506,
    "icon": "🌘",
    "rarity": "epic",
    "type": "weapon_main",
    "slot": "weapon_main",
    "requireLevel": 35,
    "nameKey": "itemNames.eclipse_halberd_epic_2h.name",
    "descKey": "itemNames.eclipse_halberd_epic_2h.desc",
    "isTwoHanded": true,
    "weaponCategory": "spear",
    "stats": {
      "atk": 90,
      "strength": 7,
      "arcana": 4,
      "critChance": 5
    }
  }
} satisfies Record<string, Item>;
