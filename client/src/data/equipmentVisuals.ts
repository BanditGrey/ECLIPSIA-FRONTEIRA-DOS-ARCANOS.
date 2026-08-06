import type { CharState } from '../components/ui/LayeredCharacter';

export type Gender = 'male' | 'female';

/**
 * SISTEMA DE VISUAIS DE EQUIPAMENTO (v1)
 * -------------------------------------
 * Itens do catálogo mapeados para uma chave visual (`key`) que possui sprites
 * full-body em `client/public/assets/sprites/eq_<key>_<gender>_<state>_<n>.png`.
 *
 * v1 usa variantes FULL-BODY exclusivas (prioridade: armadura > arma > base),
 * pois as sprites são folhas inteiras e não overlays combináveis.
 * Estado/pose sem variante cai no fallback da sprite base — por design.
 */

export interface ItemVisual {
  kind: 'weapon' | 'armor';
  key: string;
}

/** Mapeamento item do catálogo → visual. */
export const ITEM_VISUALS: Record<string, ItemVisual> = {
  // Armaduras (peito)
  ch_3000: { kind: 'armor', key: 'leather' }, // Vestimenta de Couro
  ch_3002: { kind: 'armor', key: 'iron' }, // Cota de Ferro
  // Armas (mão principal)
  w1h_1001: { kind: 'weapon', key: 'sword' }, // Espada de Ferro
  w1h_1150: { kind: 'weapon', key: 'staff' }, // Cajado Simples
};

/** Sprites que EXISTEM em disco por visual/gênero/estado. */
const SPRITES: Record<string, Partial<Record<Gender, Partial<Record<CharState, number[]>>>>> = {
  leather: {
    female: { idle: [1], attack: [1] },
    male: { idle: [1] },
  },
  iron: {
    female: { idle: [1] },
    male: { idle: [1] },
  },
  sword: {
    male: { idle: [1] },
  },
  staff: {
    female: { idle: [1] },
    male: { idle: [1] },
  },
};

/** Aceita id de catálogo OU itemStr ("w1h_1150|1:120|99:5" → "w1h_1150"). */
const itemIdOf = (ref: string | null | undefined): string | null => {
  if (!ref) return null;
  const id = ref.split('|')[0];
  return ITEM_VISUALS[id] ? id : null;
};

export const visualForItem = (ref: string | null | undefined): ItemVisual | null => {
  const id = itemIdOf(ref);
  return id ? ITEM_VISUALS[id] : null;
};

/**
 * Resolve a sprite de equipamento para o estado/pose pedidos.
 * Prioridade: armadura > arma. Retorna '' quando não há variante
 * (o chamador usa a sprite base).
 */
export const resolveEquippedSprite = (
  gender: Gender,
  state: CharState,
  frame: number,
  armorRef: string | null | undefined,
  weaponRef: string | null | undefined,
): string => {
  const candidates = [visualForItem(armorRef), visualForItem(weaponRef)].filter(
    (v): v is ItemVisual => Boolean(v),
  );

  for (const visual of candidates) {
    const byState = SPRITES[visual.key]?.[gender];
    // Pose pedida > idle do equipamento (mantém a armadura visível em
    // cast/hit/walk) — só então o fallback p/ sprite base do chamador.
    const pose: CharState | null = byState?.[state]?.length ? state : byState?.idle?.length ? 'idle' : null;
    if (pose && byState) {
      const frames = byState[pose]!;
      return `/assets/sprites/eq_${visual.key}_${gender}_${pose}_${frames[frame % frames.length]}.png`;
    }
  }

  return '';
};
