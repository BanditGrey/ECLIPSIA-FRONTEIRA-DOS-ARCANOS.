import type { CharState } from '../components/ui/LayeredCharacter';
import { resolveItemRef } from '../utils/itemSerializer';
import { elementOfWeapon, tierOfRarity } from './weaponElements';

export type Gender = 'male' | 'female';

/**
 * SISTEMA DE VISUAIS DE EQUIPAMENTO (v1)
 * -------------------------------------
 * Itens do catálogo mapeados para uma chave visual (`key`) que possui sprites
 * full-body em `client/public/assets/sprites/eq_<key>_<gender>_<state>_<n>.png`.
 *
 * v1 usa variantes FULL-BODY exclusivas (prioridade: arma > armadura > base),
 * pois as sprites são folhas inteiras e não overlays combináveis. As sprites de
 * arma foram geradas SOBRE a armadura de couro, então "arma equipada" já mostra
 * couro+arma juntos. Estado/pose sem variante cai no idle do equipamento e só
 * então na sprite base — por design.
 */

export interface ItemVisual {
  kind: 'weapon' | 'armor';
  key: string;
}

/** Mapeamento item do catálogo → visual. */
export const ITEM_VISUALS: Record<string, ItemVisual> = {
  // Armaduras (peito)
  ch_3000: { kind: 'armor', key: 'leather' }, // Vestimenta de Couro
  ch_3001: { kind: 'armor', key: 'padded' }, // Vestimenta Acolchoada
  ch_3002: { kind: 'armor', key: 'iron' }, // Cota de Ferro
  ch_3003: { kind: 'armor', key: 'guard' }, // Cota da Guarda
  ch_3004: { kind: 'armor', key: 'shadow' }, // Cota Sombria
  ch_3005: { kind: 'armor', key: 'legendary' }, // Cota Lendária
  ch_3102: { kind: 'armor', key: 'mist' }, // Veste da Névoa
  // Armas (mão principal) — 10 categorias com visual
  w1h_1001: { kind: 'weapon', key: 'sword' }, // Espada de Ferro (sword_one)
  w1h_1005: { kind: 'weapon', key: 'eclipse' }, // Lâmina do Eclipse (sword_one épica)
  w1h_1100: { kind: 'weapon', key: 'dagger' }, // Adaga (dagger)
  w1h_1200: { kind: 'weapon', key: 'bowshort' }, // Arco Curto (bow_short)
  w1h_1150: { kind: 'weapon', key: 'staff' }, // Cajado Simples (staff_one)
  w2h_1500: { kind: 'weapon', key: 'greatsword' }, // Espadão (great_sword)
  w2h_1600: { kind: 'weapon', key: 'hammer' }, // Martelo (hammer)
  w2h_1650: { kind: 'weapon', key: 'spear' }, // Lança (spear)
  w2h_1700: { kind: 'weapon', key: 'bowlong' }, // Arco Longo (bow_long)
  w2h_1750: { kind: 'weapon', key: 'greatstaff' }, // Cajado de Batalha (staff_two)
  // RELIC: visual próprio (a última raridade foge da tabela de tiers)
  w1h_1010: { kind: 'weapon', key: 'relic_eclipse' }, // Lâmina do Eclipse (relic)
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
  padded: {
    female: { idle: [1] },
    male: { idle: [1] },
  },
  guard: {
    female: { idle: [1] },
    male: { idle: [1] },
  },
  shadow: {
    female: { idle: [1] },
    male: { idle: [1] },
  },
  legendary: {
    female: { idle: [1] },
    male: { idle: [1] },
  },
  mist: {
    female: { idle: [1] },
    male: { idle: [1] },
  },
  sword: {
    female: { idle: [1] },
    male: { idle: [1] },
  },
  staff: {
    female: { idle: [1] },
    male: { idle: [1] },
  },
  // Elemento × tier (female por enquanto; male = fallback)
  el_ice_t1: { female: { idle: [1] } },
  el_ice_t2: { female: { idle: [1] } },
  el_ice_t3: { female: { idle: [1] } },
  el_fire_t1: { female: { idle: [1] } },
  el_fire_t2: { female: { idle: [1] } },
  el_fire_t3: { female: { idle: [1] } },
  el_lightning_t1: { female: { idle: [1] } },
  el_lightning_t2: { female: { idle: [1] } },
  el_lightning_t3: { female: { idle: [1] } },
  el_nature_t1: { female: { idle: [1] } },
  el_nature_t2: { female: { idle: [1] } },
  el_nature_t3: { female: { idle: [1] } },
  el_shadow_t1: { female: { idle: [1] } },
  el_shadow_t2: { female: { idle: [1] } },
  el_shadow_t3: { female: { idle: [1] } },
  el_arcane_t1: { female: { idle: [1] } },
  el_arcane_t2: { female: { idle: [1] } },
  el_arcane_t3: { female: { idle: [1] } },
  relic_eclipse: { female: { idle: [1] } },
  // Armas geradas com a heroína de couro segurando o item
  dagger: { female: { idle: [1] } },
  eclipse: { female: { idle: [1] } },
  bowshort: { female: { idle: [1] } },
  bowlong: { female: { idle: [1] } },
  greatsword: { female: { idle: [1] } },
  hammer: { female: { idle: [1] } },
  spear: { female: { idle: [1] } },
  greatstaff: { female: { idle: [1] } },
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
 * Prioridade: arma > armadura. Retorna '' quando não há variante
 * (o chamador usa a sprite base).
 */
export const resolveEquippedSprite = (
  gender: Gender,
  state: CharState,
  frame: number,
  armorRef: string | null | undefined,
  weaponRef: string | null | undefined,
): string => {
  const candidates: ItemVisual[] = [];

  // Arma: 1) visual único do item · 2) elemento × tier de raridade
  const weaponUnique = visualForItem(weaponRef);
  if (weaponUnique) candidates.push(weaponUnique);
  const weaponItem = weaponRef ? resolveItemRef(weaponRef) : undefined;
  if (weaponItem) {
    const element = elementOfWeapon(weaponItem.id);
    if (element) {
      // Fallback de tier: sem arte no tier da raridade, desce p/ o anterior
      const tier = tierOfRarity(weaponItem.rarity);
      for (let t = tier; t >= 1; t--) {
        candidates.push({ kind: 'weapon', key: `el_${element}_t${t}` });
      }
    }
  }

  // Armadura por último
  const armorUnique = visualForItem(armorRef);
  if (armorUnique) candidates.push(armorUnique);

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
