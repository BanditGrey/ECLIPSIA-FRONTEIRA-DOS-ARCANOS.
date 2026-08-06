import type { CharState } from '../components/ui/LayeredCharacter';
import type { Gender } from './equipmentVisuals';
import { resolveItemRef } from '../utils/itemSerializer';
import { elementOfItemInstance, tierOfRarity } from './weaponElements';

/**
 * OVERLAYS DE ARMA (sistema v2 de camadas)
 * ----------------------------------------
 * Arma renderizada como camada SEPARADA do corpo: qualquer armadura combina
 * com qualquer arma/elemento/raridade. Coordenadas do anchor relativas ao
 * container do LayeredCharacter (largura = size, altura = size * 1.3):
 *   x/y = canto sup-esq do overlay · w = largura · rot = rotação (graus).
 *
 * Chave: ov_<itemId-especial> ou ov_<elemento>_t<tier> (fallback de tier).
 * Itens com visual full-body próprio (ITEM_VISUALS) NÃO usam overlay.
 */

export interface OverlayAnchor {
  x: number;
  y: number;
  w: number;
  rot?: number;
}

export interface WeaponOverlayDef {
  file: string;
  anchors: Partial<Record<Gender, Partial<Record<CharState, OverlayAnchor>>>>;
}

export const WEAPON_OVERLAYS: Record<string, WeaponOverlayDef> = {
  ov_sword: {
    file: 'ov_sword_steel',
    anchors: {
      female: { idle: { x: 0.22, y: 0.49, w: 0.18, rot: 8 } },
      male: { idle: { x: 0.22, y: 0.49, w: 0.18, rot: 8 } },
    },
  },
  ov_ice_t1: {
    file: 'ov_el_ice_t1',
    anchors: {
      female: { idle: { x: 0.22, y: 0.49, w: 0.18, rot: 8 } },
      male: { idle: { x: 0.22, y: 0.49, w: 0.18, rot: 8 } },
    },
  },
  ov_ice_t2: {
    file: 'ov_el_ice_t2',
    anchors: {
      female: { idle: { x: 0.22, y: 0.48, w: 0.22, rot: 8 } },
      male: { idle: { x: 0.22, y: 0.48, w: 0.22, rot: 8 } },
    },
  },
  ov_ice_t3: {
    file: 'ov_el_ice_t3',
    anchors: {
      female: { idle: { x: 0.20, y: 0.46, w: 0.26, rot: 8 } },
      male: { idle: { x: 0.20, y: 0.46, w: 0.26, rot: 8 } },
    },
  },
  ov_fire_t1: {
    file: 'ov_el_fire_t1',
    anchors: {
      female: { idle: { x: 0.22, y: 0.49, w: 0.18, rot: 8 } },
      male: { idle: { x: 0.22, y: 0.49, w: 0.18, rot: 8 } },
    },
  },
  ov_fire_t2: {
    file: 'ov_el_fire_t2',
    anchors: {
      female: { idle: { x: 0.22, y: 0.48, w: 0.22, rot: 8 } },
      male: { idle: { x: 0.22, y: 0.48, w: 0.22, rot: 8 } },
    },
  },
  ov_fire_t3: {
    file: 'ov_el_fire_t3',
    anchors: {
      female: { idle: { x: 0.20, y: 0.46, w: 0.26, rot: 8 } },
      male: { idle: { x: 0.20, y: 0.46, w: 0.26, rot: 8 } },
    },
  },
  // t2 dos demais elementos da roda de 8 (fallback de tier cobre t1/t3)
  ov_lightning_t2: {
    file: 'ov_el_lightning_t2',
    anchors: { female: { idle: { x: 0.22, y: 0.48, w: 0.22, rot: 8 } }, male: { idle: { x: 0.22, y: 0.48, w: 0.22, rot: 8 } } },
  },
  ov_nature_t2: {
    file: 'ov_el_nature_t2',
    anchors: { female: { idle: { x: 0.22, y: 0.48, w: 0.22, rot: 8 } }, male: { idle: { x: 0.22, y: 0.48, w: 0.22, rot: 8 } } },
  },
  ov_shadow_t2: {
    file: 'ov_el_shadow_t2',
    anchors: { female: { idle: { x: 0.22, y: 0.48, w: 0.22, rot: 8 } }, male: { idle: { x: 0.22, y: 0.48, w: 0.22, rot: 8 } } },
  },
  ov_holy_t2: {
    file: 'ov_el_holy_t2',
    anchors: { female: { idle: { x: 0.22, y: 0.48, w: 0.22, rot: 8 } }, male: { idle: { x: 0.22, y: 0.48, w: 0.22, rot: 8 } } },
  },
  ov_void_t2: {
    file: 'ov_el_void_t2',
    anchors: { female: { idle: { x: 0.22, y: 0.48, w: 0.22, rot: 8 } }, male: { idle: { x: 0.22, y: 0.48, w: 0.22, rot: 8 } } },
  },
  ov_blood_t2: {
    file: 'ov_el_blood_t2',
    anchors: { female: { idle: { x: 0.22, y: 0.48, w: 0.22, rot: 8 } }, male: { idle: { x: 0.22, y: 0.48, w: 0.22, rot: 8 } } },
  },
};

/** Itens com overlay específico (fora da regra por elemento). */
const ITEM_OVERLAY: Record<string, string> = {
  w1h_1001: 'ov_sword', // Espada de Ferro
};

const hasOverlayKey = (key: string) => Boolean(WEAPON_OVERLAYS[key]);

export interface ResolvedOverlay {
  file: string;
  anchor: OverlayAnchor;
}

/**
 * Resolve o overlay de arma do item (elemento × tier com fallback).
 * Retorna null se o item não tem overlay (usa full-body ou base).
 */
export const resolveWeaponOverlay = (
  gender: Gender,
  state: CharState,
  weaponRef: string | null | undefined,
): ResolvedOverlay | null => {
  const item = weaponRef ? resolveItemRef(weaponRef) : undefined;
  if (!item) return null;

  // Overlay só para elemento CARIMBADO na instância (meta-par 101):
  // é isso que garante "QUALQUER arma × QUALQUER elemento".
  let key: string | null = ITEM_OVERLAY[item.id] ?? null;
  if (!key || !hasOverlayKey(key)) {
    const element = elementOfItemInstance(item);
    if (element) {
      const tier = tierOfRarity(item.rarity);
      for (let t = tier; t >= 1; t--) {
        if (hasOverlayKey(`ov_${element}_t${t}`)) {
          key = `ov_${element}_t${t}`;
          break;
        }
      }
    }
  }
  if (!key || !hasOverlayKey(key)) return null;

  const def = WEAPON_OVERLAYS[key];
  const anchor = def.anchors[gender]?.[state] ?? def.anchors[gender]?.idle;
  if (!anchor) return null;

  return { file: `/assets/sprites/${def.file}.png`, anchor };
};
