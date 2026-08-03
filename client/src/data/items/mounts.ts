import type { Item } from '../../types/item.types';

export const mounts = {
  "brown_horse": {
    "id": "brown_horse",
    "numId": 8500,
    "icon": "🐴",
    "rarity": "common",
    "type": "mount",
    "slot": "mount",
    "requireLevel": 1,
    "nameKey": "itemNames.brown_horse.name",
    "descKey": "itemNames.brown_horse.desc",
    "mountData": {
      "exploreReduction": 0.2,
      "bonusStats": {
        "agility": 1
      }
    }
  },
  "forest_deer": {
    "id": "forest_deer",
    "numId": 8501,
    "icon": "🦌",
    "rarity": "uncommon",
    "type": "mount",
    "slot": "mount",
    "requireLevel": 10,
    "nameKey": "itemNames.forest_deer.name",
    "descKey": "itemNames.forest_deer.desc",
    "mountData": {
      "exploreReduction": 0.25,
      "bonusStats": {
        "perception": 2
      }
    }
  },
  "sky_griffin": {
    "id": "sky_griffin",
    "numId": 8502,
    "icon": "🦅",
    "rarity": "rare",
    "type": "mount",
    "slot": "mount",
    "requireLevel": 25,
    "nameKey": "itemNames.sky_griffin.name",
    "descKey": "itemNames.sky_griffin.desc",
    "mountData": {
      "exploreReduction": 0.35,
      "bonusStats": {
        "agility": 3,
        "will": 2
      }
    }
  },
  "abyss_turtle_mount": {
    "id": "abyss_turtle_mount",
    "numId": 8503,
    "icon": "🐢",
    "rarity": "epic",
    "type": "mount",
    "slot": "mount",
    "requireLevel": 40,
    "nameKey": "itemNames.abyss_turtle_mount.name",
    "descKey": "itemNames.abyss_turtle_mount.desc",
    "mountData": {
      "exploreReduction": 0.4,
      "bonusStats": {
        "vitality": 4,
        "def": 10
      }
    }
  },
  "eclipse_stag": {
    "id": "eclipse_stag",
    "numId": 8504,
    "icon": "🦌",
    "rarity": "legendary",
    "type": "mount",
    "slot": "mount",
    "requireLevel": 60,
    "nameKey": "itemNames.eclipse_stag.name",
    "descKey": "itemNames.eclipse_stag.desc",
    "mountData": {
      "exploreReduction": 0.5,
      "bonusStats": {
        "luck": 8,
        "agility": 5
      }
    }
  }
} satisfies Record<string, Item>;
