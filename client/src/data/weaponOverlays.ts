import type { CharState } from '../components/ui/LayeredCharacter';
import type { Gender } from './equipmentVisuals';
import { resolveItemRef } from '../utils/itemSerializer';
import { elementOfItemInstance } from './weaponElements';
import { EFFECT } from './effectRegistry';
import { tierOfItem, weaponCategoryKey } from './weaponTiers';

/**
 * OVERLAYS DE ARMA (sistema v2 de camadas)
 * ----------------------------------------
 * Arma renderizada como camada SEPARADA do corpo: qualquer armadura combina
 * com qualquer arma/elemento. Coordenadas do anchor relativas ao container
 * do LayeredCharacter (largura = size, altura = size * 1.3).
 *
 * Chave: ov_<itemId-especial> ou ov_<elemento>_t<tier>, onde tier vem do
 * PODER carimbado no effect do elemento (12–17), com fallback descendente.
 * Arte de elemento que ainda não existe como overlay próprio reusa a arte
 * mais próxima (água→gelo, sombrio→sombra antiga, luz→sagrada antiga).
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

const IDLE_ANCHOR: OverlayAnchor = { x: 0.22, y: 0.48, w: 0.22, rot: 8 };
const BOTH = { female: { idle: IDLE_ANCHOR }, male: { idle: IDLE_ANCHOR } };

export const WEAPON_OVERLAYS: Record<string, WeaponOverlayDef> = {
  // Overlays elementais (legados)
  ov_fire_t1: { file: 'ov_el_fire_t1', anchors: { female: { idle: { x: 0.22, y: 0.48, w: 0.22, rot: 8 } }, male: { idle: { x: 0.22, y: 0.48, w: 0.22, rot: 8 } } } },
  ov_fire_t2: { file: 'ov_el_fire_t2', anchors: { female: { idle: { x: 0.22, y: 0.48, w: 0.22, rot: 8 } }, male: { idle: { x: 0.22, y: 0.48, w: 0.22, rot: 8 } } } },
  ov_fire_t3: { file: 'ov_el_fire_t3', anchors: { female: { idle: { x: 0.2, y: 0.46, w: 0.26, rot: 8 } }, male: { idle: { x: 0.2, y: 0.46, w: 0.26, rot: 8 } } } },
  ov_earth_t2: { file: 'ov_el_earth_t2', anchors: { female: { idle: { x: 0.22, y: 0.48, w: 0.22, rot: 8 } }, male: { idle: { x: 0.22, y: 0.48, w: 0.22, rot: 8 } } } },
  ov_wind_t2: { file: 'ov_el_wind_t2', anchors: { female: { idle: { x: 0.22, y: 0.48, w: 0.22, rot: 8 } }, male: { idle: { x: 0.22, y: 0.48, w: 0.22, rot: 8 } } } },
  ov_water_t2: { file: 'ov_el_water_t2', anchors: { female: { idle: { x: 0.22, y: 0.48, w: 0.22, rot: 8 } }, male: { idle: { x: 0.22, y: 0.48, w: 0.22, rot: 8 } } } },
  ov_dark_t2: { file: 'ov_el_shadow_t2', anchors: { female: { idle: { x: 0.22, y: 0.48, w: 0.22, rot: 8 } }, male: { idle: { x: 0.22, y: 0.48, w: 0.22, rot: 8 } } } },
  ov_light_t2: { file: 'ov_el_holy_t2', anchors: { female: { idle: { x: 0.22, y: 0.48, w: 0.22, rot: 8 } }, male: { idle: { x: 0.22, y: 0.48, w: 0.22, rot: 8 } } } },
  // TIERS DE RARIDADE POR CATEGORIA (gerados por tools/gen_base_overlays.py + gen_weapon_tiers.py)
  ov_sword: { file: 'ov_sword_steel', anchors: {female:{idle:{x:0.22,y:0.48,w:0.22,rot:8},attack:{x:0.22,y:0.48,w:0.22,rot:8}},male:{idle:{x:0.22,y:0.48,w:0.22,rot:8},attack:{x:0.22,y:0.48,w:0.22,rot:8}}} },
  ov_sword_t1: { file: 'ov_sword_t1', anchors: {female:{idle:{x:0.22,y:0.48,w:0.22,rot:8},attack:{x:0.22,y:0.48,w:0.22,rot:8}},male:{idle:{x:0.22,y:0.48,w:0.22,rot:8},attack:{x:0.22,y:0.48,w:0.22,rot:8}}} },
  ov_sword_t2: { file: 'ov_sword_t2', anchors: {female:{idle:{x:0.22,y:0.48,w:0.22,rot:8},attack:{x:0.22,y:0.48,w:0.22,rot:8}},male:{idle:{x:0.22,y:0.48,w:0.22,rot:8},attack:{x:0.22,y:0.48,w:0.22,rot:8}}} },
  ov_sword_t3: { file: 'ov_sword_t3', anchors: {female:{idle:{x:0.22,y:0.46,w:0.26,rot:8},attack:{x:0.22,y:0.46,w:0.26,rot:8}},male:{idle:{x:0.22,y:0.46,w:0.26,rot:8},attack:{x:0.22,y:0.46,w:0.26,rot:8}}} },
  ov_sword_relic: { file: 'ov_sword_relic', anchors: {female:{idle:{x:0.22,y:0.46,w:0.26,rot:8},attack:{x:0.22,y:0.46,w:0.26,rot:8}},male:{idle:{x:0.22,y:0.46,w:0.26,rot:8},attack:{x:0.22,y:0.46,w:0.26,rot:8}}} },
  ov_dagger: { file: 'ov_dagger', anchors: {female:{idle:{x:0.24,y:0.5,w:0.18,rot:8},attack:{x:0.24,y:0.5,w:0.18,rot:8}},male:{idle:{x:0.24,y:0.5,w:0.18,rot:8},attack:{x:0.24,y:0.5,w:0.18,rot:8}}} },
  ov_dagger_t1: { file: 'ov_dagger_t1', anchors: {female:{idle:{x:0.24,y:0.5,w:0.18,rot:8},attack:{x:0.24,y:0.5,w:0.18,rot:8}},male:{idle:{x:0.24,y:0.5,w:0.18,rot:8},attack:{x:0.24,y:0.5,w:0.18,rot:8}}} },
  ov_dagger_t2: { file: 'ov_dagger_t2', anchors: {female:{idle:{x:0.24,y:0.5,w:0.18,rot:8},attack:{x:0.24,y:0.5,w:0.18,rot:8}},male:{idle:{x:0.24,y:0.5,w:0.18,rot:8},attack:{x:0.24,y:0.5,w:0.18,rot:8}}} },
  ov_dagger_t3: { file: 'ov_dagger_t3', anchors: {female:{idle:{x:0.24,y:0.48,w:0.21,rot:8},attack:{x:0.24,y:0.48,w:0.21,rot:8}},male:{idle:{x:0.24,y:0.48,w:0.21,rot:8},attack:{x:0.24,y:0.48,w:0.21,rot:8}}} },
  ov_dagger_relic: { file: 'ov_dagger_relic', anchors: {female:{idle:{x:0.24,y:0.48,w:0.21,rot:8},attack:{x:0.24,y:0.48,w:0.21,rot:8}},male:{idle:{x:0.24,y:0.48,w:0.21,rot:8},attack:{x:0.24,y:0.48,w:0.21,rot:8}}} },
  ov_greatsword: { file: 'ov_greatsword', anchors: {female:{idle:{x:0.2,y:0.46,w:0.28,rot:8},attack:{x:0.2,y:0.46,w:0.28,rot:8}},male:{idle:{x:0.2,y:0.46,w:0.28,rot:8},attack:{x:0.2,y:0.46,w:0.28,rot:8}}} },
  ov_greatsword_t1: { file: 'ov_greatsword_t1', anchors: {female:{idle:{x:0.2,y:0.46,w:0.28,rot:8},attack:{x:0.2,y:0.46,w:0.28,rot:8}},male:{idle:{x:0.2,y:0.46,w:0.28,rot:8},attack:{x:0.2,y:0.46,w:0.28,rot:8}}} },
  ov_greatsword_t2: { file: 'ov_greatsword_t2', anchors: {female:{idle:{x:0.2,y:0.46,w:0.28,rot:8},attack:{x:0.2,y:0.46,w:0.28,rot:8}},male:{idle:{x:0.2,y:0.46,w:0.28,rot:8},attack:{x:0.2,y:0.46,w:0.28,rot:8}}} },
  ov_greatsword_t3: { file: 'ov_greatsword_t3', anchors: {female:{idle:{x:0.2,y:0.44,w:0.33,rot:8},attack:{x:0.2,y:0.44,w:0.33,rot:8}},male:{idle:{x:0.2,y:0.44,w:0.33,rot:8},attack:{x:0.2,y:0.44,w:0.33,rot:8}}} },
  ov_greatsword_relic: { file: 'ov_greatsword_relic', anchors: {female:{idle:{x:0.2,y:0.44,w:0.33,rot:8},attack:{x:0.2,y:0.44,w:0.33,rot:8}},male:{idle:{x:0.2,y:0.44,w:0.33,rot:8},attack:{x:0.2,y:0.44,w:0.33,rot:8}}} },
  ov_spear: { file: 'ov_spear', anchors: {female:{idle:{x:0.22,y:0.42,w:0.2,rot:6},attack:{x:0.22,y:0.42,w:0.2,rot:6}},male:{idle:{x:0.22,y:0.42,w:0.2,rot:6},attack:{x:0.22,y:0.42,w:0.2,rot:6}}} },
  ov_spear_t1: { file: 'ov_spear_t1', anchors: {female:{idle:{x:0.22,y:0.42,w:0.2,rot:6},attack:{x:0.22,y:0.42,w:0.2,rot:6}},male:{idle:{x:0.22,y:0.42,w:0.2,rot:6},attack:{x:0.22,y:0.42,w:0.2,rot:6}}} },
  ov_spear_t2: { file: 'ov_spear_t2', anchors: {female:{idle:{x:0.22,y:0.42,w:0.2,rot:6},attack:{x:0.22,y:0.42,w:0.2,rot:6}},male:{idle:{x:0.22,y:0.42,w:0.2,rot:6},attack:{x:0.22,y:0.42,w:0.2,rot:6}}} },
  ov_spear_t3: { file: 'ov_spear_t3', anchors: {female:{idle:{x:0.22,y:0.4,w:0.24,rot:6},attack:{x:0.22,y:0.4,w:0.24,rot:6}},male:{idle:{x:0.22,y:0.4,w:0.24,rot:6},attack:{x:0.22,y:0.4,w:0.24,rot:6}}} },
  ov_spear_relic: { file: 'ov_spear_relic', anchors: {female:{idle:{x:0.22,y:0.4,w:0.24,rot:6},attack:{x:0.22,y:0.4,w:0.24,rot:6}},male:{idle:{x:0.22,y:0.4,w:0.24,rot:6},attack:{x:0.22,y:0.4,w:0.24,rot:6}}} },
  ov_staff: { file: 'ov_staff', anchors: {female:{idle:{x:0.22,y:0.42,w:0.2,rot:4},attack:{x:0.22,y:0.42,w:0.2,rot:4}},male:{idle:{x:0.22,y:0.42,w:0.2,rot:4},attack:{x:0.22,y:0.42,w:0.2,rot:4}}} },
  ov_staff_t1: { file: 'ov_staff_t1', anchors: {female:{idle:{x:0.22,y:0.42,w:0.2,rot:4},attack:{x:0.22,y:0.42,w:0.2,rot:4}},male:{idle:{x:0.22,y:0.42,w:0.2,rot:4},attack:{x:0.22,y:0.42,w:0.2,rot:4}}} },
  ov_staff_t2: { file: 'ov_staff_t2', anchors: {female:{idle:{x:0.22,y:0.42,w:0.2,rot:4},attack:{x:0.22,y:0.42,w:0.2,rot:4}},male:{idle:{x:0.22,y:0.42,w:0.2,rot:4},attack:{x:0.22,y:0.42,w:0.2,rot:4}}} },
  ov_staff_t3: { file: 'ov_staff_t3', anchors: {female:{idle:{x:0.22,y:0.4,w:0.24,rot:4},attack:{x:0.22,y:0.4,w:0.24,rot:4}},male:{idle:{x:0.22,y:0.4,w:0.24,rot:4},attack:{x:0.22,y:0.4,w:0.24,rot:4}}} },
  ov_staff_relic: { file: 'ov_staff_relic', anchors: {female:{idle:{x:0.22,y:0.4,w:0.24,rot:4},attack:{x:0.22,y:0.4,w:0.24,rot:4}},male:{idle:{x:0.22,y:0.4,w:0.24,rot:4},attack:{x:0.22,y:0.4,w:0.24,rot:4}}} },
  ov_greatstaff: { file: 'ov_greatstaff', anchors: {female:{idle:{x:0.2,y:0.42,w:0.24,rot:4},attack:{x:0.2,y:0.42,w:0.24,rot:4}},male:{idle:{x:0.2,y:0.42,w:0.24,rot:4},attack:{x:0.2,y:0.42,w:0.24,rot:4}}} },
  ov_greatstaff_t1: { file: 'ov_greatstaff_t1', anchors: {female:{idle:{x:0.2,y:0.42,w:0.24,rot:4},attack:{x:0.2,y:0.42,w:0.24,rot:4}},male:{idle:{x:0.2,y:0.42,w:0.24,rot:4},attack:{x:0.2,y:0.42,w:0.24,rot:4}}} },
  ov_greatstaff_t2: { file: 'ov_greatstaff_t2', anchors: {female:{idle:{x:0.2,y:0.42,w:0.24,rot:4},attack:{x:0.2,y:0.42,w:0.24,rot:4}},male:{idle:{x:0.2,y:0.42,w:0.24,rot:4},attack:{x:0.2,y:0.42,w:0.24,rot:4}}} },
  ov_greatstaff_t3: { file: 'ov_greatstaff_t3', anchors: {female:{idle:{x:0.2,y:0.4,w:0.28,rot:4},attack:{x:0.2,y:0.4,w:0.28,rot:4}},male:{idle:{x:0.2,y:0.4,w:0.28,rot:4},attack:{x:0.2,y:0.4,w:0.28,rot:4}}} },
  ov_greatstaff_relic: { file: 'ov_greatstaff_relic', anchors: {female:{idle:{x:0.2,y:0.4,w:0.28,rot:4},attack:{x:0.2,y:0.4,w:0.28,rot:4}},male:{idle:{x:0.2,y:0.4,w:0.28,rot:4},attack:{x:0.2,y:0.4,w:0.28,rot:4}}} },
  ov_hammer: { file: 'ov_hammer', anchors: {female:{idle:{x:0.2,y:0.46,w:0.28,rot:6},attack:{x:0.2,y:0.46,w:0.28,rot:6}},male:{idle:{x:0.2,y:0.46,w:0.28,rot:6},attack:{x:0.2,y:0.46,w:0.28,rot:6}}} },
  ov_hammer_t1: { file: 'ov_hammer_t1', anchors: {female:{idle:{x:0.2,y:0.46,w:0.28,rot:6},attack:{x:0.2,y:0.46,w:0.28,rot:6}},male:{idle:{x:0.2,y:0.46,w:0.28,rot:6},attack:{x:0.2,y:0.46,w:0.28,rot:6}}} },
  ov_hammer_t2: { file: 'ov_hammer_t2', anchors: {female:{idle:{x:0.2,y:0.46,w:0.28,rot:6},attack:{x:0.2,y:0.46,w:0.28,rot:6}},male:{idle:{x:0.2,y:0.46,w:0.28,rot:6},attack:{x:0.2,y:0.46,w:0.28,rot:6}}} },
  ov_hammer_t3: { file: 'ov_hammer_t3', anchors: {female:{idle:{x:0.2,y:0.44,w:0.33,rot:6},attack:{x:0.2,y:0.44,w:0.33,rot:6}},male:{idle:{x:0.2,y:0.44,w:0.33,rot:6},attack:{x:0.2,y:0.44,w:0.33,rot:6}}} },
  ov_hammer_relic: { file: 'ov_hammer_relic', anchors: {female:{idle:{x:0.2,y:0.44,w:0.33,rot:6},attack:{x:0.2,y:0.44,w:0.33,rot:6}},male:{idle:{x:0.2,y:0.44,w:0.33,rot:6},attack:{x:0.2,y:0.44,w:0.33,rot:6}}} },
  ov_bowshort: { file: 'ov_bowshort', anchors: {female:{idle:{x:0.22,y:0.42,w:0.22,rot:4},attack:{x:0.22,y:0.42,w:0.22,rot:4}},male:{idle:{x:0.22,y:0.42,w:0.22,rot:4},attack:{x:0.22,y:0.42,w:0.22,rot:4}}} },
  ov_bowshort_t1: { file: 'ov_bowshort_t1', anchors: {female:{idle:{x:0.22,y:0.42,w:0.22,rot:4},attack:{x:0.22,y:0.42,w:0.22,rot:4}},male:{idle:{x:0.22,y:0.42,w:0.22,rot:4},attack:{x:0.22,y:0.42,w:0.22,rot:4}}} },
  ov_bowshort_t2: { file: 'ov_bowshort_t2', anchors: {female:{idle:{x:0.22,y:0.42,w:0.22,rot:4},attack:{x:0.22,y:0.42,w:0.22,rot:4}},male:{idle:{x:0.22,y:0.42,w:0.22,rot:4},attack:{x:0.22,y:0.42,w:0.22,rot:4}}} },
  ov_bowshort_t3: { file: 'ov_bowshort_t3', anchors: {female:{idle:{x:0.22,y:0.4,w:0.26,rot:4},attack:{x:0.22,y:0.4,w:0.26,rot:4}},male:{idle:{x:0.22,y:0.4,w:0.26,rot:4},attack:{x:0.22,y:0.4,w:0.26,rot:4}}} },
  ov_bowshort_relic: { file: 'ov_bowshort_relic', anchors: {female:{idle:{x:0.22,y:0.4,w:0.26,rot:4},attack:{x:0.22,y:0.4,w:0.26,rot:4}},male:{idle:{x:0.22,y:0.4,w:0.26,rot:4},attack:{x:0.22,y:0.4,w:0.26,rot:4}}} },
  ov_bowlong: { file: 'ov_bowlong', anchors: {female:{idle:{x:0.22,y:0.4,w:0.22,rot:3},attack:{x:0.22,y:0.4,w:0.22,rot:3}},male:{idle:{x:0.22,y:0.4,w:0.22,rot:3},attack:{x:0.22,y:0.4,w:0.22,rot:3}}} },
  ov_bowlong_t1: { file: 'ov_bowlong_t1', anchors: {female:{idle:{x:0.22,y:0.4,w:0.22,rot:3},attack:{x:0.22,y:0.4,w:0.22,rot:3}},male:{idle:{x:0.22,y:0.4,w:0.22,rot:3},attack:{x:0.22,y:0.4,w:0.22,rot:3}}} },
  ov_bowlong_t2: { file: 'ov_bowlong_t2', anchors: {female:{idle:{x:0.22,y:0.4,w:0.22,rot:3},attack:{x:0.22,y:0.4,w:0.22,rot:3}},male:{idle:{x:0.22,y:0.4,w:0.22,rot:3},attack:{x:0.22,y:0.4,w:0.22,rot:3}}} },
  ov_bowlong_t3: { file: 'ov_bowlong_t3', anchors: {female:{idle:{x:0.22,y:0.38,w:0.26,rot:3},attack:{x:0.22,y:0.38,w:0.26,rot:3}},male:{idle:{x:0.22,y:0.38,w:0.26,rot:3},attack:{x:0.22,y:0.38,w:0.26,rot:3}}} },
  ov_bowlong_relic: { file: 'ov_bowlong_relic', anchors: {female:{idle:{x:0.22,y:0.38,w:0.26,rot:3},attack:{x:0.22,y:0.38,w:0.26,rot:3}},male:{idle:{x:0.22,y:0.38,w:0.26,rot:3},attack:{x:0.22,y:0.38,w:0.26,rot:3}}} },
};

/** Itens com overlay específico (fora da regra por elemento). */
const ITEM_OVERLAY: Record<string, string> = {};

const hasOverlayKey = (key: string) => Boolean(WEAPON_OVERLAYS[key]);

/** ID do efeito de nível de upgrade (ver effectRegistry: UPGRADE_LEVEL=99). */

export interface ResolvedOverlay {
  file: string;
  anchor: OverlayAnchor;
}

/**
 * Resolve o overlay de arma da instância.
 * Prioridade:
 *   1. ITEM_OVERLAY (item específico)
 *   2. TIER DE RARIDADE (ov_<categoria>_t<1|2|3|relic>) — upgrade pode subir
 *   3. ELEMENTO carimbado (ov_<elemento>_t<poder>)
 *   4. sprite base da categoria (ov_<categoria>)
 *   5. ov_sword (fallback legado)
 */
export const resolveWeaponOverlay = (
  gender: Gender,
  state: CharState,
  weaponRef: string | null | undefined,
): ResolvedOverlay | null => {
  const item = weaponRef ? resolveItemRef(weaponRef) : undefined;
  if (!item) return null;

  let key: string | null = null;

  // 1) Tier de raridade (tem precedência sobre ITEM_OVERLAY)
  if (!key || !hasOverlayKey(key)) {
    const catKey = weaponCategoryKey(item.weaponCategory);
    if (catKey) {
      const effects = item.effects as Record<string, unknown> | undefined;
      let upgrade = 0;
      if (effects) {
        for (let i = 1; i <= 10; i++) {
          if (Number(effects[`e${i}`]) === EFFECT.UPGRADE_LEVEL) {
            upgrade = Number(effects[`v${i}`]) || 0;
            break;
          }
        }
      }
      const tier = tierOfItem(item.rarity, upgrade);
      const tierKey = `ov_${catKey}_${tier}`;
      if (hasOverlayKey(tierKey)) key = tierKey;
    }
  }

  // 2) Elemento carimbado
  if (!key || !hasOverlayKey(key)) {
    const inst = elementOfItemInstance(item);
    if (inst) {
      for (let t = inst.tier; t >= 1; t--) {
        if (hasOverlayKey(`ov_${inst.element}_t${t}`)) {
          key = `ov_${inst.element}_t${t}`;
          break;
        }
      }
    }
  }

  // 3) base da categoria
  if (!key || !hasOverlayKey(key)) {
    const catKey = weaponCategoryKey(item.weaponCategory);
    if (catKey && hasOverlayKey(`ov_${catKey}`)) key = `ov_${catKey}`;
  }

  // 5) item específico (ITEM_OVERLAY)
  if ((!key || !hasOverlayKey(key)) && ITEM_OVERLAY[item.id] && hasOverlayKey(ITEM_OVERLAY[item.id])) {
    key = ITEM_OVERLAY[item.id];
  }

  // 6) fallback
  if ((!key || !hasOverlayKey(key)) && hasOverlayKey('ov_sword')) key = 'ov_sword';
  if (!key || !hasOverlayKey(key)) return null;

  const def = WEAPON_OVERLAYS[key];
  const anchor = def.anchors[gender]?.[state] ?? def.anchors[gender]?.idle;
  if (!anchor) return null;

  return { file: `/assets/sprites/${def.file}.png`, anchor };
};
