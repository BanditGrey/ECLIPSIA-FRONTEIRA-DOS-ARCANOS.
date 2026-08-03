import type { Item } from '../../types/item.types';

export const specials = {
  "cosmetic_eclipse_cloak": {
    "id": "cosmetic_eclipse_cloak",
    "numId": 9500,
    "icon": "🧥",
    "rarity": "epic",
    "type": "special",
    "slot": "special",
    "requireLevel": 40,
    "nameKey": "itemNames.cosmetic_eclipse_cloak.name",
    "descKey": "itemNames.cosmetic_eclipse_cloak.desc"
  },
  "emote_moonhowl": {
    "id": "emote_moonhowl",
    "numId": 9501,
    "icon": "🌕",
    "rarity": "rare",
    "type": "special",
    "slot": "special",
    "requireLevel": 20,
    "nameKey": "itemNames.emote_moonhowl.name",
    "descKey": "itemNames.emote_moonhowl.desc"
  },
  "portrait_fragmented_star": {
    "id": "portrait_fragmented_star",
    "numId": 9502,
    "icon": "🖼",
    "rarity": "legendary",
    "type": "special",
    "slot": "special",
    "requireLevel": 60,
    "nameKey": "itemNames.portrait_fragmented_star.name",
    "descKey": "itemNames.portrait_fragmented_star.desc"
  }
} satisfies Record<string, Item>;
