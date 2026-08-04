/**
 * Mapa centralizado das artes do jogo.
 * Os arquivos ficam em `client/public/assets/` (servidos em `/assets/...`).
 */
export const ART = {
  emblem: '/assets/emblem.png',
  bg: {
    login: '/assets/bg-login.jpg',
    hub: '/assets/bg-hub.jpg',
    combat: '/assets/bg-combat.jpg',
    world: '/assets/bg-world.jpg'
  },
  regions: {
    valedouro: '/assets/region-valedouro.jpg',
    nythera: '/assets/region-nythera.jpg',
    ormara: '/assets/region-ormara.jpg',
    abissal: '/assets/region-abissal.jpg',
    ceupartido: '/assets/region-ceupartido.jpg',
    fragmento: '/assets/region-fragmento.jpg'
  },
  classes: {
    blade: '/assets/class-blade.jpg',
    arcane: '/assets/class-arcane.jpg',
    druid: '/assets/class-druid.jpg',
    vanguard: '/assets/class-vanguard.jpg',
    ranger: '/assets/class-ranger.jpg',
    spectre: '/assets/class-spectre.jpg'
  },
  bosses: {
    bandit_leader: '/assets/boss-bandit_leader.jpg',
    root_guardian: '/assets/boss-root_guardian.jpg',
    void_mirror: '/assets/boss-void_mirror.jpg',
    azhur: '/assets/boss-azhur.jpg',
    thal_mora: '/assets/boss-thal_mora.jpg',
    velkaryn: '/assets/boss-velkaryn.jpg'
  },
  monsters: {
    rat: '/assets/monster-rat.jpg',
    goblin: '/assets/monster-goblin.jpg',
    wolf_pup: '/assets/monster-wolf_pup.jpg',
    bandit_leader: '/assets/monster-bandit_leader.jpg',
    mist_wolf: '/assets/monster-mist_wolf.jpg',
    shadow_sprite: '/assets/monster-shadow_sprite.jpg',
    forest_golem: '/assets/monster-forest_golem.jpg',
    root_guardian: '/assets/monster-root_guardian.jpg',
    sand_scorpion: '/assets/monster-sand_scorpion.jpg',
    mirage_beast: '/assets/monster-mirage_beast.jpg',
    dune_crawler: '/assets/monster-dune_crawler.jpg',
    sea_wraith: '/assets/monster-sea_wraith.jpg',
    deep_leviathan_jr: '/assets/monster-deep_leviathan_jr.jpg',
    storm_harpy: '/assets/monster-storm_harpy.jpg',
    cloud_titan: '/assets/monster-cloud_titan.jpg'
  }
} as const;

export type ClassArtId = keyof typeof ART.classes;
export type BossArtId = keyof typeof ART.bosses;
export type MonsterArtId = keyof typeof ART.monsters;
