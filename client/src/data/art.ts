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
    // TODO: gerar arte dedicada do reino Fragmento (limite de geração atingido)
    fragmento: '/assets/bg-world.jpg'
  }
} as const;
