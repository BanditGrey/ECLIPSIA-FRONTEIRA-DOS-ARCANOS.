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
    void_mirror: '/assets/boss-void_mirror.jpg'
    // azhur, thal_mora e velkaryn ainda sem pintura (limite de geração
    // por sessão) — o componente Portrait usa o anel de sigilo como fallback.
  }
} as const;

export type ClassArtId = keyof typeof ART.classes;
export type BossArtId = keyof typeof ART.bosses;
