import type { Item } from '../../types/item.types';

export const offHand = {
  // ── GLIFOS DE OFF-HAND (sistema de 2º elemento / fusão) ──
  // Glifos selam um SEGUNDO elemento (effects 12–17) na arma principal.
  // Quando o elemento da arma + do glifo formam uma fusão (água+vento=GELO
  // etc.), nasce uma camada de aura ao redor da arma sem trocar a arte.
  // Glifos NEUTROS (element: null) não fundem — só dão bônus de stats.
  // Gerado por tools/sync_glyphs.ts — editar catálogo em data/glyphs.ts.
  "gl_2240": {
    "id": "gl_2240",
    "numId": 2240,
    "icon": "🔯",
    "rarity": "common",
    "type": "weapon_off",
    "slot": "weapon_off",
    "requireLevel": 5,
    "nameKey": "itemNames.gl_2240.name",
    "descKey": "itemNames.gl_2240.desc",
    "isTwoHanded": false,
    "weaponCategory": "glyph",
    "stats": { "arcana": 6 },
    "effects": {
      "e1": 6, "v1": 6,
      "e2": 12, "v2": 15,
      "e3": 1, "v3": 4
    }
  },
  "gl_2250": {
    "id": "gl_2250",
    "numId": 2250,
    "icon": "🔯",
    "rarity": "rare",
    "type": "weapon_off",
    "slot": "weapon_off",
    "requireLevel": 15,
    "nameKey": "itemNames.gl_2250.name",
    "descKey": "itemNames.gl_2250.desc",
    "isTwoHanded": false,
    "weaponCategory": "glyph",
    "stats": { "arcana": 12 },
    "effects": {
      "e1": 6, "v1": 12,
      "e2": 12, "v2": 35,
      "e3": 1, "v3": 8,
      "e4": 22, "v4": 6
    }
  },
  "gl_2260": {
    "id": "gl_2260",
    "numId": 2260,
    "icon": "🔯",
    "rarity": "epic",
    "type": "weapon_off",
    "slot": "weapon_off",
    "requireLevel": 30,
    "nameKey": "itemNames.gl_2260.name",
    "descKey": "itemNames.gl_2260.desc",
    "isTwoHanded": false,
    "weaponCategory": "glyph",
    "stats": { "arcana": 20 },
    "effects": {
      "e1": 6, "v1": 20,
      "e2": 12, "v2": 50,
      "e3": 24, "v3": 5
    }
  },
  "gl_2270": {
    "id": "gl_2270",
    "numId": 2270,
    "icon": "🔯",
    "rarity": "legendary",
    "type": "weapon_off",
    "slot": "weapon_off",
    "requireLevel": 45,
    "nameKey": "itemNames.gl_2270.name",
    "descKey": "itemNames.gl_2270.desc",
    "isTwoHanded": false,
    "weaponCategory": "glyph",
    "stats": { "arcana": 24 },
    "effects": {
      "e1": 6, "v1": 24,
      "e2": 12, "v2": 70,
      "e3": 24, "v3": 8,
      "e4": 22, "v4": 10
    }
  },
  "gl_2290": {
    "id": "gl_2290",
    "numId": 2290,
    "icon": "🔯",
    "rarity": "relic",
    "type": "weapon_off",
    "slot": "weapon_off",
    "requireLevel": 60,
    "nameKey": "itemNames.gl_2290.name",
    "descKey": "itemNames.gl_2290.desc",
    "isTwoHanded": false,
    "weaponCategory": "glyph",
    "stats": { "arcana": 30 },
    "effects": {
      "e1": 6, "v1": 30,
      "e2": 12, "v2": 90,
      "e3": 24, "v3": 10,
      "e4": 40, "v4": 12
    }
  },
  "gl_2241": {
    "id": "gl_2241",
    "numId": 2241,
    "icon": "🔯",
    "rarity": "common",
    "type": "weapon_off",
    "slot": "weapon_off",
    "requireLevel": 5,
    "nameKey": "itemNames.gl_2241.name",
    "descKey": "itemNames.gl_2241.desc",
    "isTwoHanded": false,
    "weaponCategory": "glyph",
    "stats": { "arcana": 6 },
    "effects": {
      "e1": 6, "v1": 6,
      "e2": 13, "v2": 15,
      "e3": 2, "v3": 4
    }
  },
  "gl_2251": {
    "id": "gl_2251",
    "numId": 2251,
    "icon": "🔯",
    "rarity": "rare",
    "type": "weapon_off",
    "slot": "weapon_off",
    "requireLevel": 15,
    "nameKey": "itemNames.gl_2251.name",
    "descKey": "itemNames.gl_2251.desc",
    "isTwoHanded": false,
    "weaponCategory": "glyph",
    "stats": { "arcana": 12 },
    "effects": {
      "e1": 6, "v1": 12,
      "e2": 13, "v2": 35,
      "e3": 2, "v3": 8,
      "e4": 25, "v4": 4
    }
  },
  "gl_2261": {
    "id": "gl_2261",
    "numId": 2261,
    "icon": "🔯",
    "rarity": "epic",
    "type": "weapon_off",
    "slot": "weapon_off",
    "requireLevel": 30,
    "nameKey": "itemNames.gl_2261.name",
    "descKey": "itemNames.gl_2261.desc",
    "isTwoHanded": false,
    "weaponCategory": "glyph",
    "stats": { "arcana": 20 },
    "effects": {
      "e1": 6, "v1": 20,
      "e2": 13, "v2": 50,
      "e3": 25, "v3": 6
    }
  },
  "gl_2271": {
    "id": "gl_2271",
    "numId": 2271,
    "icon": "🔯",
    "rarity": "legendary",
    "type": "weapon_off",
    "slot": "weapon_off",
    "requireLevel": 45,
    "nameKey": "itemNames.gl_2271.name",
    "descKey": "itemNames.gl_2271.desc",
    "isTwoHanded": false,
    "weaponCategory": "glyph",
    "stats": { "arcana": 24 },
    "effects": {
      "e1": 6, "v1": 24,
      "e2": 13, "v2": 70,
      "e3": 25, "v3": 8,
      "e4": 10, "v4": 120
    }
  },
  "gl_2291": {
    "id": "gl_2291",
    "numId": 2291,
    "icon": "🔯",
    "rarity": "relic",
    "type": "weapon_off",
    "slot": "weapon_off",
    "requireLevel": 60,
    "nameKey": "itemNames.gl_2291.name",
    "descKey": "itemNames.gl_2291.desc",
    "isTwoHanded": false,
    "weaponCategory": "glyph",
    "stats": { "arcana": 30 },
    "effects": {
      "e1": 6, "v1": 30,
      "e2": 13, "v2": 90,
      "e3": 25, "v3": 10,
      "e4": 39, "v4": 8
    }
  },
  "gl_2242": {
    "id": "gl_2242",
    "numId": 2242,
    "icon": "🔯",
    "rarity": "common",
    "type": "weapon_off",
    "slot": "weapon_off",
    "requireLevel": 5,
    "nameKey": "itemNames.gl_2242.name",
    "descKey": "itemNames.gl_2242.desc",
    "isTwoHanded": false,
    "weaponCategory": "glyph",
    "stats": { "arcana": 6 },
    "effects": {
      "e1": 6, "v1": 6,
      "e2": 14, "v2": 15,
      "e3": 11, "v3": 15
    }
  },
  "gl_2252": {
    "id": "gl_2252",
    "numId": 2252,
    "icon": "🔯",
    "rarity": "rare",
    "type": "weapon_off",
    "slot": "weapon_off",
    "requireLevel": 15,
    "nameKey": "itemNames.gl_2252.name",
    "descKey": "itemNames.gl_2252.desc",
    "isTwoHanded": false,
    "weaponCategory": "glyph",
    "stats": { "arcana": 12 },
    "effects": {
      "e1": 6, "v1": 12,
      "e2": 14, "v2": 35,
      "e3": 26, "v3": 5
    }
  },
  "gl_2262": {
    "id": "gl_2262",
    "numId": 2262,
    "icon": "🔯",
    "rarity": "epic",
    "type": "weapon_off",
    "slot": "weapon_off",
    "requireLevel": 30,
    "nameKey": "itemNames.gl_2262.name",
    "descKey": "itemNames.gl_2262.desc",
    "isTwoHanded": false,
    "weaponCategory": "glyph",
    "stats": { "arcana": 20 },
    "effects": {
      "e1": 6, "v1": 20,
      "e2": 14, "v2": 50,
      "e3": 26, "v3": 7
    }
  },
  "gl_2272": {
    "id": "gl_2272",
    "numId": 2272,
    "icon": "🔯",
    "rarity": "legendary",
    "type": "weapon_off",
    "slot": "weapon_off",
    "requireLevel": 45,
    "nameKey": "itemNames.gl_2272.name",
    "descKey": "itemNames.gl_2272.desc",
    "isTwoHanded": false,
    "weaponCategory": "glyph",
    "stats": { "arcana": 24 },
    "effects": {
      "e1": 6, "v1": 24,
      "e2": 14, "v2": 70,
      "e3": 26, "v3": 10,
      "e4": 34, "v4": 6
    }
  },
  "gl_2292": {
    "id": "gl_2292",
    "numId": 2292,
    "icon": "🔯",
    "rarity": "relic",
    "type": "weapon_off",
    "slot": "weapon_off",
    "requireLevel": 60,
    "nameKey": "itemNames.gl_2292.name",
    "descKey": "itemNames.gl_2292.desc",
    "isTwoHanded": false,
    "weaponCategory": "glyph",
    "stats": { "arcana": 30 },
    "effects": {
      "e1": 6, "v1": 30,
      "e2": 14, "v2": 90,
      "e3": 26, "v3": 12,
      "e4": 33, "v4": 8
    }
  },
  "gl_2243": {
    "id": "gl_2243",
    "numId": 2243,
    "icon": "🔯",
    "rarity": "common",
    "type": "weapon_off",
    "slot": "weapon_off",
    "requireLevel": 5,
    "nameKey": "itemNames.gl_2243.name",
    "descKey": "itemNames.gl_2243.desc",
    "isTwoHanded": false,
    "weaponCategory": "glyph",
    "stats": { "arcana": 6 },
    "effects": {
      "e1": 6, "v1": 6,
      "e2": 15, "v2": 15,
      "e3": 4, "v3": 3
    }
  },
  "gl_2253": {
    "id": "gl_2253",
    "numId": 2253,
    "icon": "🔯",
    "rarity": "rare",
    "type": "weapon_off",
    "slot": "weapon_off",
    "requireLevel": 15,
    "nameKey": "itemNames.gl_2253.name",
    "descKey": "itemNames.gl_2253.desc",
    "isTwoHanded": false,
    "weaponCategory": "glyph",
    "stats": { "arcana": 12 },
    "effects": {
      "e1": 6, "v1": 12,
      "e2": 15, "v2": 35,
      "e3": 21, "v3": 3
    }
  },
  "gl_2263": {
    "id": "gl_2263",
    "numId": 2263,
    "icon": "🔯",
    "rarity": "epic",
    "type": "weapon_off",
    "slot": "weapon_off",
    "requireLevel": 30,
    "nameKey": "itemNames.gl_2263.name",
    "descKey": "itemNames.gl_2263.desc",
    "isTwoHanded": false,
    "weaponCategory": "glyph",
    "stats": { "arcana": 20 },
    "effects": {
      "e1": 6, "v1": 20,
      "e2": 15, "v2": 50,
      "e3": 21, "v3": 5,
      "e4": 32, "v4": 6
    }
  },
  "gl_2273": {
    "id": "gl_2273",
    "numId": 2273,
    "icon": "🔯",
    "rarity": "legendary",
    "type": "weapon_off",
    "slot": "weapon_off",
    "requireLevel": 45,
    "nameKey": "itemNames.gl_2273.name",
    "descKey": "itemNames.gl_2273.desc",
    "isTwoHanded": false,
    "weaponCategory": "glyph",
    "stats": { "arcana": 24 },
    "effects": {
      "e1": 6, "v1": 24,
      "e2": 15, "v2": 70,
      "e3": 32, "v3": 10,
      "e4": 21, "v4": 5
    }
  },
  "gl_2293": {
    "id": "gl_2293",
    "numId": 2293,
    "icon": "🔯",
    "rarity": "relic",
    "type": "weapon_off",
    "slot": "weapon_off",
    "requireLevel": 60,
    "nameKey": "itemNames.gl_2293.name",
    "descKey": "itemNames.gl_2293.desc",
    "isTwoHanded": false,
    "weaponCategory": "glyph",
    "stats": { "arcana": 30 },
    "effects": {
      "e1": 6, "v1": 30,
      "e2": 15, "v2": 90,
      "e3": 32, "v3": 14,
      "e4": 33, "v4": 8
    }
  },
  "gl_2244": {
    "id": "gl_2244",
    "numId": 2244,
    "icon": "🔯",
    "rarity": "common",
    "type": "weapon_off",
    "slot": "weapon_off",
    "requireLevel": 5,
    "nameKey": "itemNames.gl_2244.name",
    "descKey": "itemNames.gl_2244.desc",
    "isTwoHanded": false,
    "weaponCategory": "glyph",
    "stats": { "arcana": 6 },
    "effects": {
      "e1": 6, "v1": 6,
      "e2": 16, "v2": 15,
      "e3": 35, "v3": 5
    }
  },
  "gl_2254": {
    "id": "gl_2254",
    "numId": 2254,
    "icon": "🔯",
    "rarity": "rare",
    "type": "weapon_off",
    "slot": "weapon_off",
    "requireLevel": 15,
    "nameKey": "itemNames.gl_2254.name",
    "descKey": "itemNames.gl_2254.desc",
    "isTwoHanded": false,
    "weaponCategory": "glyph",
    "stats": { "arcana": 12 },
    "effects": {
      "e1": 6, "v1": 12,
      "e2": 16, "v2": 35,
      "e3": 35, "v3": 8
    }
  },
  "gl_2264": {
    "id": "gl_2264",
    "numId": 2264,
    "icon": "🔯",
    "rarity": "epic",
    "type": "weapon_off",
    "slot": "weapon_off",
    "requireLevel": 30,
    "nameKey": "itemNames.gl_2264.name",
    "descKey": "itemNames.gl_2264.desc",
    "isTwoHanded": false,
    "weaponCategory": "glyph",
    "stats": { "arcana": 20 },
    "effects": {
      "e1": 6, "v1": 20,
      "e2": 16, "v2": 50,
      "e3": 31, "v3": 6,
      "e4": 35, "v4": 6
    }
  },
  "gl_2274": {
    "id": "gl_2274",
    "numId": 2274,
    "icon": "🔯",
    "rarity": "legendary",
    "type": "weapon_off",
    "slot": "weapon_off",
    "requireLevel": 45,
    "nameKey": "itemNames.gl_2274.name",
    "descKey": "itemNames.gl_2274.desc",
    "isTwoHanded": false,
    "weaponCategory": "glyph",
    "stats": { "arcana": 24 },
    "effects": {
      "e1": 6, "v1": 24,
      "e2": 16, "v2": 70,
      "e3": 31, "v3": 10,
      "e4": 40, "v4": 8
    }
  },
  "gl_2294": {
    "id": "gl_2294",
    "numId": 2294,
    "icon": "🔯",
    "rarity": "relic",
    "type": "weapon_off",
    "slot": "weapon_off",
    "requireLevel": 60,
    "nameKey": "itemNames.gl_2294.name",
    "descKey": "itemNames.gl_2294.desc",
    "isTwoHanded": false,
    "weaponCategory": "glyph",
    "stats": { "arcana": 30 },
    "effects": {
      "e1": 6, "v1": 30,
      "e2": 16, "v2": 90,
      "e3": 31, "v3": 14,
      "e4": 37, "v4": 10
    }
  },
  "gl_2245": {
    "id": "gl_2245",
    "numId": 2245,
    "icon": "🔯",
    "rarity": "common",
    "type": "weapon_off",
    "slot": "weapon_off",
    "requireLevel": 5,
    "nameKey": "itemNames.gl_2245.name",
    "descKey": "itemNames.gl_2245.desc",
    "isTwoHanded": false,
    "weaponCategory": "glyph",
    "stats": { "arcana": 6 },
    "effects": {
      "e1": 6, "v1": 6,
      "e2": 17, "v2": 15,
      "e3": 9, "v3": 3
    }
  },
  "gl_2255": {
    "id": "gl_2255",
    "numId": 2255,
    "icon": "🔯",
    "rarity": "rare",
    "type": "weapon_off",
    "slot": "weapon_off",
    "requireLevel": 15,
    "nameKey": "itemNames.gl_2255.name",
    "descKey": "itemNames.gl_2255.desc",
    "isTwoHanded": false,
    "weaponCategory": "glyph",
    "stats": { "arcana": 12 },
    "effects": {
      "e1": 6, "v1": 12,
      "e2": 17, "v2": 35,
      "e3": 9, "v3": 6,
      "e4": 27, "v4": 5
    }
  },
  "gl_2265": {
    "id": "gl_2265",
    "numId": 2265,
    "icon": "🔯",
    "rarity": "epic",
    "type": "weapon_off",
    "slot": "weapon_off",
    "requireLevel": 30,
    "nameKey": "itemNames.gl_2265.name",
    "descKey": "itemNames.gl_2265.desc",
    "isTwoHanded": false,
    "weaponCategory": "glyph",
    "stats": { "arcana": 20 },
    "effects": {
      "e1": 6, "v1": 20,
      "e2": 17, "v2": 50,
      "e3": 27, "v3": 8,
      "e4": 28, "v4": 8
    }
  },
  "gl_2275": {
    "id": "gl_2275",
    "numId": 2275,
    "icon": "🔯",
    "rarity": "legendary",
    "type": "weapon_off",
    "slot": "weapon_off",
    "requireLevel": 45,
    "nameKey": "itemNames.gl_2275.name",
    "descKey": "itemNames.gl_2275.desc",
    "isTwoHanded": false,
    "weaponCategory": "glyph",
    "stats": { "arcana": 24 },
    "effects": {
      "e1": 6, "v1": 24,
      "e2": 17, "v2": 70,
      "e3": 27, "v3": 12,
      "e4": 29, "v4": 10
    }
  },
  "gl_2295": {
    "id": "gl_2295",
    "numId": 2295,
    "icon": "🔯",
    "rarity": "relic",
    "type": "weapon_off",
    "slot": "weapon_off",
    "requireLevel": 60,
    "nameKey": "itemNames.gl_2295.name",
    "descKey": "itemNames.gl_2295.desc",
    "isTwoHanded": false,
    "weaponCategory": "glyph",
    "stats": { "arcana": 30 },
    "effects": {
      "e1": 6, "v1": 30,
      "e2": 17, "v2": 90,
      "e3": 27, "v3": 15,
      "e4": 29, "v4": 15
    }
  },
  "gl_2280": {
    "id": "gl_2280",
    "numId": 2280,
    "icon": "🔯",
    "rarity": "common",
    "type": "weapon_off",
    "slot": "weapon_off",
    "requireLevel": 5,
    "nameKey": "itemNames.gl_2280.name",
    "descKey": "itemNames.gl_2280.desc",
    "isTwoHanded": false,
    "weaponCategory": "glyph",
    "stats": { "arcana": 6 },
    "effects": {
      "e1": 6, "v1": 6,
      "e2": 1, "v2": 3,
      "e3": 2, "v3": 3
    }
  },
  "gl_2281": {
    "id": "gl_2281",
    "numId": 2281,
    "icon": "🔯",
    "rarity": "uncommon",
    "type": "weapon_off",
    "slot": "weapon_off",
    "requireLevel": 10,
    "nameKey": "itemNames.gl_2281.name",
    "descKey": "itemNames.gl_2281.desc",
    "isTwoHanded": false,
    "weaponCategory": "glyph",
    "stats": { "arcana": 10 },
    "effects": {
      "e1": 6, "v1": 10,
      "e2": 1, "v2": 5,
      "e3": 10, "v3": 60,
      "e4": 11, "v4": 20
    }
  },
  "gl_2282": {
    "id": "gl_2282",
    "numId": 2282,
    "icon": "🔯",
    "rarity": "rare",
    "type": "weapon_off",
    "slot": "weapon_off",
    "requireLevel": 15,
    "nameKey": "itemNames.gl_2282.name",
    "descKey": "itemNames.gl_2282.desc",
    "isTwoHanded": false,
    "weaponCategory": "glyph",
    "stats": { "arcana": 12 },
    "effects": {
      "e1": 6, "v1": 12,
      "e2": 1, "v2": 7,
      "e3": 24, "v3": 4
    }
  },
  "gl_2283": {
    "id": "gl_2283",
    "numId": 2283,
    "icon": "🔯",
    "rarity": "epic",
    "type": "weapon_off",
    "slot": "weapon_off",
    "requireLevel": 30,
    "nameKey": "itemNames.gl_2283.name",
    "descKey": "itemNames.gl_2283.desc",
    "isTwoHanded": false,
    "weaponCategory": "glyph",
    "stats": { "arcana": 20 },
    "effects": {
      "e1": 6, "v1": 20,
      "e2": 1, "v2": 9,
      "e3": 24, "v3": 5,
      "e4": 25, "v4": 5
    }
  },
  "gl_2284": {
    "id": "gl_2284",
    "numId": 2284,
    "icon": "🔯",
    "rarity": "legendary",
    "type": "weapon_off",
    "slot": "weapon_off",
    "requireLevel": 45,
    "nameKey": "itemNames.gl_2284.name",
    "descKey": "itemNames.gl_2284.desc",
    "isTwoHanded": false,
    "weaponCategory": "glyph",
    "stats": { "arcana": 24 },
    "effects": {
      "e1": 6, "v1": 24,
      "e2": 1, "v2": 12,
      "e3": 24, "v3": 6,
      "e4": 21, "v4": 4,
      "e5": 25, "v5": 6
    }
  },
  "gl_2285": {
    "id": "gl_2285",
    "numId": 2285,
    "icon": "🔯",
    "rarity": "relic",
    "type": "weapon_off",
    "slot": "weapon_off",
    "requireLevel": 60,
    "nameKey": "itemNames.gl_2285.name",
    "descKey": "itemNames.gl_2285.desc",
    "isTwoHanded": false,
    "weaponCategory": "glyph",
    "stats": { "arcana": 30 },
    "effects": {
      "e1": 6, "v1": 30,
      "e2": 1, "v2": 16,
      "e3": 24, "v3": 8,
      "e4": 31, "v4": 8,
      "e5": 27, "v5": 10
    }
  }
,
} satisfies Record<string, Item>;
