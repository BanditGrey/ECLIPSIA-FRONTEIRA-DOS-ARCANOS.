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
  ov_sword: { file: 'ov_sword', anchors: {"female":{"idle":{"x":0.22,"y":0.48,"w":0.22,"rot":8},"attack":{"x":0.22,"y":0.48,"w":0.22,"rot":8}},"male":{"idle":{"x":0.22,"y":0.48,"w":0.22,"rot":8},"attack":{"x":0.22,"y":0.48,"w":0.22,"rot":8}}} },
  ov_sword_t1: { file: 'ov_sword_t1', anchors: {"female":{"idle":{"x":0.22,"y":0.48,"w":0.22,"rot":8},"attack":{"x":0.22,"y":0.48,"w":0.22,"rot":8}},"male":{"idle":{"x":0.22,"y":0.48,"w":0.22,"rot":8},"attack":{"x":0.22,"y":0.48,"w":0.22,"rot":8}}} },
  ov_sword_sprint: { file: 'ov_sword_sprint', anchors: {"female":{"idle":{"x":0.22,"y":0.48,"w":0.22,"rot":8},"attack":{"x":0.22,"y":0.48,"w":0.22,"rot":8}},"male":{"idle":{"x":0.22,"y":0.48,"w":0.22,"rot":8},"attack":{"x":0.22,"y":0.48,"w":0.22,"rot":8}}} },
  ov_sword_fire_t2: { file: 'ov_sword_fire_t2', anchors: {"female":{"idle":{"x":0.22,"y":0.48,"w":0.22,"rot":8},"attack":{"x":0.22,"y":0.48,"w":0.22,"rot":8}},"male":{"idle":{"x":0.22,"y":0.48,"w":0.22,"rot":8},"attack":{"x":0.22,"y":0.48,"w":0.22,"rot":8}}} },
  ov_sword_fire_t3: { file: 'ov_sword_fire_t3', anchors: {"female":{"idle":{"x":0.22,"y":0.48,"w":0.22,"rot":8},"attack":{"x":0.22,"y":0.48,"w":0.22,"rot":8}},"male":{"idle":{"x":0.22,"y":0.48,"w":0.22,"rot":8},"attack":{"x":0.22,"y":0.48,"w":0.22,"rot":8}}} },
  ov_sword_water_t2: { file: 'ov_sword_water_t2', anchors: {"female":{"idle":{"x":0.22,"y":0.48,"w":0.22,"rot":8},"attack":{"x":0.22,"y":0.48,"w":0.22,"rot":8}},"male":{"idle":{"x":0.22,"y":0.48,"w":0.22,"rot":8},"attack":{"x":0.22,"y":0.48,"w":0.22,"rot":8}}} },
  ov_sword_water_t3: { file: 'ov_sword_water_t3', anchors: {"female":{"idle":{"x":0.22,"y":0.48,"w":0.22,"rot":8},"attack":{"x":0.22,"y":0.48,"w":0.22,"rot":8}},"male":{"idle":{"x":0.22,"y":0.48,"w":0.22,"rot":8},"attack":{"x":0.22,"y":0.48,"w":0.22,"rot":8}}} },
  ov_sword_earth_t2: { file: 'ov_sword_earth_t2', anchors: {"female":{"idle":{"x":0.22,"y":0.48,"w":0.22,"rot":8},"attack":{"x":0.22,"y":0.48,"w":0.22,"rot":8}},"male":{"idle":{"x":0.22,"y":0.48,"w":0.22,"rot":8},"attack":{"x":0.22,"y":0.48,"w":0.22,"rot":8}}} },
  ov_sword_earth_t3: { file: 'ov_sword_earth_t3', anchors: {"female":{"idle":{"x":0.22,"y":0.48,"w":0.22,"rot":8},"attack":{"x":0.22,"y":0.48,"w":0.22,"rot":8}},"male":{"idle":{"x":0.22,"y":0.48,"w":0.22,"rot":8},"attack":{"x":0.22,"y":0.48,"w":0.22,"rot":8}}} },
  ov_sword_wind_t2: { file: 'ov_sword_wind_t2', anchors: {"female":{"idle":{"x":0.22,"y":0.48,"w":0.22,"rot":8},"attack":{"x":0.22,"y":0.48,"w":0.22,"rot":8}},"male":{"idle":{"x":0.22,"y":0.48,"w":0.22,"rot":8},"attack":{"x":0.22,"y":0.48,"w":0.22,"rot":8}}} },
  ov_sword_wind_t3: { file: 'ov_sword_wind_t3', anchors: {"female":{"idle":{"x":0.22,"y":0.48,"w":0.22,"rot":8},"attack":{"x":0.22,"y":0.48,"w":0.22,"rot":8}},"male":{"idle":{"x":0.22,"y":0.48,"w":0.22,"rot":8},"attack":{"x":0.22,"y":0.48,"w":0.22,"rot":8}}} },
  ov_sword_dark_t2: { file: 'ov_sword_dark_t2', anchors: {"female":{"idle":{"x":0.22,"y":0.48,"w":0.22,"rot":8},"attack":{"x":0.22,"y":0.48,"w":0.22,"rot":8}},"male":{"idle":{"x":0.22,"y":0.48,"w":0.22,"rot":8},"attack":{"x":0.22,"y":0.48,"w":0.22,"rot":8}}} },
  ov_sword_dark_t3: { file: 'ov_sword_dark_t3', anchors: {"female":{"idle":{"x":0.22,"y":0.48,"w":0.22,"rot":8},"attack":{"x":0.22,"y":0.48,"w":0.22,"rot":8}},"male":{"idle":{"x":0.22,"y":0.48,"w":0.22,"rot":8},"attack":{"x":0.22,"y":0.48,"w":0.22,"rot":8}}} },
  ov_sword_light_t2: { file: 'ov_sword_light_t2', anchors: {"female":{"idle":{"x":0.22,"y":0.48,"w":0.22,"rot":8},"attack":{"x":0.22,"y":0.48,"w":0.22,"rot":8}},"male":{"idle":{"x":0.22,"y":0.48,"w":0.22,"rot":8},"attack":{"x":0.22,"y":0.48,"w":0.22,"rot":8}}} },
  ov_sword_light_t3: { file: 'ov_sword_light_t3', anchors: {"female":{"idle":{"x":0.22,"y":0.48,"w":0.22,"rot":8},"attack":{"x":0.22,"y":0.48,"w":0.22,"rot":8}},"male":{"idle":{"x":0.22,"y":0.48,"w":0.22,"rot":8},"attack":{"x":0.22,"y":0.48,"w":0.22,"rot":8}}} },
  ov_dagger: { file: 'ov_dagger', anchors: {"female":{"idle":{"x":0.24,"y":0.5,"w":0.18,"rot":8},"attack":{"x":0.24,"y":0.5,"w":0.18,"rot":8}},"male":{"idle":{"x":0.24,"y":0.5,"w":0.18,"rot":8},"attack":{"x":0.24,"y":0.5,"w":0.18,"rot":8}}} },
  ov_dagger_t1: { file: 'ov_dagger_t1', anchors: {"female":{"idle":{"x":0.24,"y":0.5,"w":0.18,"rot":8},"attack":{"x":0.24,"y":0.5,"w":0.18,"rot":8}},"male":{"idle":{"x":0.24,"y":0.5,"w":0.18,"rot":8},"attack":{"x":0.24,"y":0.5,"w":0.18,"rot":8}}} },
  ov_dagger_sprint: { file: 'ov_dagger_sprint', anchors: {"female":{"idle":{"x":0.24,"y":0.5,"w":0.18,"rot":8},"attack":{"x":0.24,"y":0.5,"w":0.18,"rot":8}},"male":{"idle":{"x":0.24,"y":0.5,"w":0.18,"rot":8},"attack":{"x":0.24,"y":0.5,"w":0.18,"rot":8}}} },
  ov_dagger_fire_t2: { file: 'ov_dagger_fire_t2', anchors: {"female":{"idle":{"x":0.24,"y":0.5,"w":0.18,"rot":8},"attack":{"x":0.24,"y":0.5,"w":0.18,"rot":8}},"male":{"idle":{"x":0.24,"y":0.5,"w":0.18,"rot":8},"attack":{"x":0.24,"y":0.5,"w":0.18,"rot":8}}} },
  ov_dagger_fire_t3: { file: 'ov_dagger_fire_t3', anchors: {"female":{"idle":{"x":0.24,"y":0.5,"w":0.18,"rot":8},"attack":{"x":0.24,"y":0.5,"w":0.18,"rot":8}},"male":{"idle":{"x":0.24,"y":0.5,"w":0.18,"rot":8},"attack":{"x":0.24,"y":0.5,"w":0.18,"rot":8}}} },
  ov_dagger_water_t2: { file: 'ov_dagger_water_t2', anchors: {"female":{"idle":{"x":0.24,"y":0.5,"w":0.18,"rot":8},"attack":{"x":0.24,"y":0.5,"w":0.18,"rot":8}},"male":{"idle":{"x":0.24,"y":0.5,"w":0.18,"rot":8},"attack":{"x":0.24,"y":0.5,"w":0.18,"rot":8}}} },
  ov_dagger_water_t3: { file: 'ov_dagger_water_t3', anchors: {"female":{"idle":{"x":0.24,"y":0.5,"w":0.18,"rot":8},"attack":{"x":0.24,"y":0.5,"w":0.18,"rot":8}},"male":{"idle":{"x":0.24,"y":0.5,"w":0.18,"rot":8},"attack":{"x":0.24,"y":0.5,"w":0.18,"rot":8}}} },
  ov_dagger_earth_t2: { file: 'ov_dagger_earth_t2', anchors: {"female":{"idle":{"x":0.24,"y":0.5,"w":0.18,"rot":8},"attack":{"x":0.24,"y":0.5,"w":0.18,"rot":8}},"male":{"idle":{"x":0.24,"y":0.5,"w":0.18,"rot":8},"attack":{"x":0.24,"y":0.5,"w":0.18,"rot":8}}} },
  ov_dagger_earth_t3: { file: 'ov_dagger_earth_t3', anchors: {"female":{"idle":{"x":0.24,"y":0.5,"w":0.18,"rot":8},"attack":{"x":0.24,"y":0.5,"w":0.18,"rot":8}},"male":{"idle":{"x":0.24,"y":0.5,"w":0.18,"rot":8},"attack":{"x":0.24,"y":0.5,"w":0.18,"rot":8}}} },
  ov_dagger_wind_t2: { file: 'ov_dagger_wind_t2', anchors: {"female":{"idle":{"x":0.24,"y":0.5,"w":0.18,"rot":8},"attack":{"x":0.24,"y":0.5,"w":0.18,"rot":8}},"male":{"idle":{"x":0.24,"y":0.5,"w":0.18,"rot":8},"attack":{"x":0.24,"y":0.5,"w":0.18,"rot":8}}} },
  ov_dagger_wind_t3: { file: 'ov_dagger_wind_t3', anchors: {"female":{"idle":{"x":0.24,"y":0.5,"w":0.18,"rot":8},"attack":{"x":0.24,"y":0.5,"w":0.18,"rot":8}},"male":{"idle":{"x":0.24,"y":0.5,"w":0.18,"rot":8},"attack":{"x":0.24,"y":0.5,"w":0.18,"rot":8}}} },
  ov_dagger_dark_t2: { file: 'ov_dagger_dark_t2', anchors: {"female":{"idle":{"x":0.24,"y":0.5,"w":0.18,"rot":8},"attack":{"x":0.24,"y":0.5,"w":0.18,"rot":8}},"male":{"idle":{"x":0.24,"y":0.5,"w":0.18,"rot":8},"attack":{"x":0.24,"y":0.5,"w":0.18,"rot":8}}} },
  ov_dagger_dark_t3: { file: 'ov_dagger_dark_t3', anchors: {"female":{"idle":{"x":0.24,"y":0.5,"w":0.18,"rot":8},"attack":{"x":0.24,"y":0.5,"w":0.18,"rot":8}},"male":{"idle":{"x":0.24,"y":0.5,"w":0.18,"rot":8},"attack":{"x":0.24,"y":0.5,"w":0.18,"rot":8}}} },
  ov_dagger_light_t2: { file: 'ov_dagger_light_t2', anchors: {"female":{"idle":{"x":0.24,"y":0.5,"w":0.18,"rot":8},"attack":{"x":0.24,"y":0.5,"w":0.18,"rot":8}},"male":{"idle":{"x":0.24,"y":0.5,"w":0.18,"rot":8},"attack":{"x":0.24,"y":0.5,"w":0.18,"rot":8}}} },
  ov_dagger_light_t3: { file: 'ov_dagger_light_t3', anchors: {"female":{"idle":{"x":0.24,"y":0.5,"w":0.18,"rot":8},"attack":{"x":0.24,"y":0.5,"w":0.18,"rot":8}},"male":{"idle":{"x":0.24,"y":0.5,"w":0.18,"rot":8},"attack":{"x":0.24,"y":0.5,"w":0.18,"rot":8}}} },
  ov_greatsword: { file: 'ov_greatsword', anchors: {"female":{"idle":{"x":0.2,"y":0.46,"w":0.28,"rot":8},"attack":{"x":0.2,"y":0.46,"w":0.28,"rot":8}},"male":{"idle":{"x":0.2,"y":0.46,"w":0.28,"rot":8},"attack":{"x":0.2,"y":0.46,"w":0.28,"rot":8}}} },
  ov_greatsword_t1: { file: 'ov_greatsword_t1', anchors: {"female":{"idle":{"x":0.2,"y":0.46,"w":0.28,"rot":8},"attack":{"x":0.2,"y":0.46,"w":0.28,"rot":8}},"male":{"idle":{"x":0.2,"y":0.46,"w":0.28,"rot":8},"attack":{"x":0.2,"y":0.46,"w":0.28,"rot":8}}} },
  ov_greatsword_sprint: { file: 'ov_greatsword_sprint', anchors: {"female":{"idle":{"x":0.2,"y":0.46,"w":0.28,"rot":8},"attack":{"x":0.2,"y":0.46,"w":0.28,"rot":8}},"male":{"idle":{"x":0.2,"y":0.46,"w":0.28,"rot":8},"attack":{"x":0.2,"y":0.46,"w":0.28,"rot":8}}} },
  ov_greatsword_fire_t2: { file: 'ov_greatsword_fire_t2', anchors: {"female":{"idle":{"x":0.2,"y":0.46,"w":0.28,"rot":8},"attack":{"x":0.2,"y":0.46,"w":0.28,"rot":8}},"male":{"idle":{"x":0.2,"y":0.46,"w":0.28,"rot":8},"attack":{"x":0.2,"y":0.46,"w":0.28,"rot":8}}} },
  ov_greatsword_fire_t3: { file: 'ov_greatsword_fire_t3', anchors: {"female":{"idle":{"x":0.2,"y":0.46,"w":0.28,"rot":8},"attack":{"x":0.2,"y":0.46,"w":0.28,"rot":8}},"male":{"idle":{"x":0.2,"y":0.46,"w":0.28,"rot":8},"attack":{"x":0.2,"y":0.46,"w":0.28,"rot":8}}} },
  ov_greatsword_water_t2: { file: 'ov_greatsword_water_t2', anchors: {"female":{"idle":{"x":0.2,"y":0.46,"w":0.28,"rot":8},"attack":{"x":0.2,"y":0.46,"w":0.28,"rot":8}},"male":{"idle":{"x":0.2,"y":0.46,"w":0.28,"rot":8},"attack":{"x":0.2,"y":0.46,"w":0.28,"rot":8}}} },
  ov_greatsword_water_t3: { file: 'ov_greatsword_water_t3', anchors: {"female":{"idle":{"x":0.2,"y":0.46,"w":0.28,"rot":8},"attack":{"x":0.2,"y":0.46,"w":0.28,"rot":8}},"male":{"idle":{"x":0.2,"y":0.46,"w":0.28,"rot":8},"attack":{"x":0.2,"y":0.46,"w":0.28,"rot":8}}} },
  ov_greatsword_earth_t2: { file: 'ov_greatsword_earth_t2', anchors: {"female":{"idle":{"x":0.2,"y":0.46,"w":0.28,"rot":8},"attack":{"x":0.2,"y":0.46,"w":0.28,"rot":8}},"male":{"idle":{"x":0.2,"y":0.46,"w":0.28,"rot":8},"attack":{"x":0.2,"y":0.46,"w":0.28,"rot":8}}} },
  ov_greatsword_earth_t3: { file: 'ov_greatsword_earth_t3', anchors: {"female":{"idle":{"x":0.2,"y":0.46,"w":0.28,"rot":8},"attack":{"x":0.2,"y":0.46,"w":0.28,"rot":8}},"male":{"idle":{"x":0.2,"y":0.46,"w":0.28,"rot":8},"attack":{"x":0.2,"y":0.46,"w":0.28,"rot":8}}} },
  ov_greatsword_wind_t2: { file: 'ov_greatsword_wind_t2', anchors: {"female":{"idle":{"x":0.2,"y":0.46,"w":0.28,"rot":8},"attack":{"x":0.2,"y":0.46,"w":0.28,"rot":8}},"male":{"idle":{"x":0.2,"y":0.46,"w":0.28,"rot":8},"attack":{"x":0.2,"y":0.46,"w":0.28,"rot":8}}} },
  ov_greatsword_wind_t3: { file: 'ov_greatsword_wind_t3', anchors: {"female":{"idle":{"x":0.2,"y":0.46,"w":0.28,"rot":8},"attack":{"x":0.2,"y":0.46,"w":0.28,"rot":8}},"male":{"idle":{"x":0.2,"y":0.46,"w":0.28,"rot":8},"attack":{"x":0.2,"y":0.46,"w":0.28,"rot":8}}} },
  ov_greatsword_dark_t2: { file: 'ov_greatsword_dark_t2', anchors: {"female":{"idle":{"x":0.2,"y":0.46,"w":0.28,"rot":8},"attack":{"x":0.2,"y":0.46,"w":0.28,"rot":8}},"male":{"idle":{"x":0.2,"y":0.46,"w":0.28,"rot":8},"attack":{"x":0.2,"y":0.46,"w":0.28,"rot":8}}} },
  ov_greatsword_dark_t3: { file: 'ov_greatsword_dark_t3', anchors: {"female":{"idle":{"x":0.2,"y":0.46,"w":0.28,"rot":8},"attack":{"x":0.2,"y":0.46,"w":0.28,"rot":8}},"male":{"idle":{"x":0.2,"y":0.46,"w":0.28,"rot":8},"attack":{"x":0.2,"y":0.46,"w":0.28,"rot":8}}} },
  ov_greatsword_light_t2: { file: 'ov_greatsword_light_t2', anchors: {"female":{"idle":{"x":0.2,"y":0.46,"w":0.28,"rot":8},"attack":{"x":0.2,"y":0.46,"w":0.28,"rot":8}},"male":{"idle":{"x":0.2,"y":0.46,"w":0.28,"rot":8},"attack":{"x":0.2,"y":0.46,"w":0.28,"rot":8}}} },
  ov_greatsword_light_t3: { file: 'ov_greatsword_light_t3', anchors: {"female":{"idle":{"x":0.2,"y":0.46,"w":0.28,"rot":8},"attack":{"x":0.2,"y":0.46,"w":0.28,"rot":8}},"male":{"idle":{"x":0.2,"y":0.46,"w":0.28,"rot":8},"attack":{"x":0.2,"y":0.46,"w":0.28,"rot":8}}} },
  ov_spear: { file: 'ov_spear', anchors: {"female":{"idle":{"x":0.22,"y":0.42,"w":0.2,"rot":6},"attack":{"x":0.22,"y":0.42,"w":0.2,"rot":6}},"male":{"idle":{"x":0.22,"y":0.42,"w":0.2,"rot":6},"attack":{"x":0.22,"y":0.42,"w":0.2,"rot":6}}} },
  ov_spear_t1: { file: 'ov_spear_t1', anchors: {"female":{"idle":{"x":0.22,"y":0.42,"w":0.2,"rot":6},"attack":{"x":0.22,"y":0.42,"w":0.2,"rot":6}},"male":{"idle":{"x":0.22,"y":0.42,"w":0.2,"rot":6},"attack":{"x":0.22,"y":0.42,"w":0.2,"rot":6}}} },
  ov_spear_sprint: { file: 'ov_spear_sprint', anchors: {"female":{"idle":{"x":0.22,"y":0.42,"w":0.2,"rot":6},"attack":{"x":0.22,"y":0.42,"w":0.2,"rot":6}},"male":{"idle":{"x":0.22,"y":0.42,"w":0.2,"rot":6},"attack":{"x":0.22,"y":0.42,"w":0.2,"rot":6}}} },
  ov_spear_fire_t2: { file: 'ov_spear_fire_t2', anchors: {"female":{"idle":{"x":0.22,"y":0.42,"w":0.2,"rot":6},"attack":{"x":0.22,"y":0.42,"w":0.2,"rot":6}},"male":{"idle":{"x":0.22,"y":0.42,"w":0.2,"rot":6},"attack":{"x":0.22,"y":0.42,"w":0.2,"rot":6}}} },
  ov_spear_fire_t3: { file: 'ov_spear_fire_t3', anchors: {"female":{"idle":{"x":0.22,"y":0.42,"w":0.2,"rot":6},"attack":{"x":0.22,"y":0.42,"w":0.2,"rot":6}},"male":{"idle":{"x":0.22,"y":0.42,"w":0.2,"rot":6},"attack":{"x":0.22,"y":0.42,"w":0.2,"rot":6}}} },
  ov_spear_water_t2: { file: 'ov_spear_water_t2', anchors: {"female":{"idle":{"x":0.22,"y":0.42,"w":0.2,"rot":6},"attack":{"x":0.22,"y":0.42,"w":0.2,"rot":6}},"male":{"idle":{"x":0.22,"y":0.42,"w":0.2,"rot":6},"attack":{"x":0.22,"y":0.42,"w":0.2,"rot":6}}} },
  ov_spear_water_t3: { file: 'ov_spear_water_t3', anchors: {"female":{"idle":{"x":0.22,"y":0.42,"w":0.2,"rot":6},"attack":{"x":0.22,"y":0.42,"w":0.2,"rot":6}},"male":{"idle":{"x":0.22,"y":0.42,"w":0.2,"rot":6},"attack":{"x":0.22,"y":0.42,"w":0.2,"rot":6}}} },
  ov_spear_earth_t2: { file: 'ov_spear_earth_t2', anchors: {"female":{"idle":{"x":0.22,"y":0.42,"w":0.2,"rot":6},"attack":{"x":0.22,"y":0.42,"w":0.2,"rot":6}},"male":{"idle":{"x":0.22,"y":0.42,"w":0.2,"rot":6},"attack":{"x":0.22,"y":0.42,"w":0.2,"rot":6}}} },
  ov_spear_earth_t3: { file: 'ov_spear_earth_t3', anchors: {"female":{"idle":{"x":0.22,"y":0.42,"w":0.2,"rot":6},"attack":{"x":0.22,"y":0.42,"w":0.2,"rot":6}},"male":{"idle":{"x":0.22,"y":0.42,"w":0.2,"rot":6},"attack":{"x":0.22,"y":0.42,"w":0.2,"rot":6}}} },
  ov_spear_wind_t2: { file: 'ov_spear_wind_t2', anchors: {"female":{"idle":{"x":0.22,"y":0.42,"w":0.2,"rot":6},"attack":{"x":0.22,"y":0.42,"w":0.2,"rot":6}},"male":{"idle":{"x":0.22,"y":0.42,"w":0.2,"rot":6},"attack":{"x":0.22,"y":0.42,"w":0.2,"rot":6}}} },
  ov_spear_wind_t3: { file: 'ov_spear_wind_t3', anchors: {"female":{"idle":{"x":0.22,"y":0.42,"w":0.2,"rot":6},"attack":{"x":0.22,"y":0.42,"w":0.2,"rot":6}},"male":{"idle":{"x":0.22,"y":0.42,"w":0.2,"rot":6},"attack":{"x":0.22,"y":0.42,"w":0.2,"rot":6}}} },
  ov_spear_dark_t2: { file: 'ov_spear_dark_t2', anchors: {"female":{"idle":{"x":0.22,"y":0.42,"w":0.2,"rot":6},"attack":{"x":0.22,"y":0.42,"w":0.2,"rot":6}},"male":{"idle":{"x":0.22,"y":0.42,"w":0.2,"rot":6},"attack":{"x":0.22,"y":0.42,"w":0.2,"rot":6}}} },
  ov_spear_dark_t3: { file: 'ov_spear_dark_t3', anchors: {"female":{"idle":{"x":0.22,"y":0.42,"w":0.2,"rot":6},"attack":{"x":0.22,"y":0.42,"w":0.2,"rot":6}},"male":{"idle":{"x":0.22,"y":0.42,"w":0.2,"rot":6},"attack":{"x":0.22,"y":0.42,"w":0.2,"rot":6}}} },
  ov_spear_light_t2: { file: 'ov_spear_light_t2', anchors: {"female":{"idle":{"x":0.22,"y":0.42,"w":0.2,"rot":6},"attack":{"x":0.22,"y":0.42,"w":0.2,"rot":6}},"male":{"idle":{"x":0.22,"y":0.42,"w":0.2,"rot":6},"attack":{"x":0.22,"y":0.42,"w":0.2,"rot":6}}} },
  ov_spear_light_t3: { file: 'ov_spear_light_t3', anchors: {"female":{"idle":{"x":0.22,"y":0.42,"w":0.2,"rot":6},"attack":{"x":0.22,"y":0.42,"w":0.2,"rot":6}},"male":{"idle":{"x":0.22,"y":0.42,"w":0.2,"rot":6},"attack":{"x":0.22,"y":0.42,"w":0.2,"rot":6}}} },
  ov_staff: { file: 'ov_staff', anchors: {"female":{"idle":{"x":0.22,"y":0.42,"w":0.2,"rot":4},"attack":{"x":0.22,"y":0.42,"w":0.2,"rot":4}},"male":{"idle":{"x":0.22,"y":0.42,"w":0.2,"rot":4},"attack":{"x":0.22,"y":0.42,"w":0.2,"rot":4}}} },
  ov_staff_t1: { file: 'ov_staff_t1', anchors: {"female":{"idle":{"x":0.22,"y":0.42,"w":0.2,"rot":4},"attack":{"x":0.22,"y":0.42,"w":0.2,"rot":4}},"male":{"idle":{"x":0.22,"y":0.42,"w":0.2,"rot":4},"attack":{"x":0.22,"y":0.42,"w":0.2,"rot":4}}} },
  ov_staff_sprint: { file: 'ov_staff_sprint', anchors: {"female":{"idle":{"x":0.22,"y":0.42,"w":0.2,"rot":4},"attack":{"x":0.22,"y":0.42,"w":0.2,"rot":4}},"male":{"idle":{"x":0.22,"y":0.42,"w":0.2,"rot":4},"attack":{"x":0.22,"y":0.42,"w":0.2,"rot":4}}} },
  ov_staff_fire_t2: { file: 'ov_staff_fire_t2', anchors: {"female":{"idle":{"x":0.22,"y":0.42,"w":0.2,"rot":4},"attack":{"x":0.22,"y":0.42,"w":0.2,"rot":4}},"male":{"idle":{"x":0.22,"y":0.42,"w":0.2,"rot":4},"attack":{"x":0.22,"y":0.42,"w":0.2,"rot":4}}} },
  ov_staff_fire_t3: { file: 'ov_staff_fire_t3', anchors: {"female":{"idle":{"x":0.22,"y":0.42,"w":0.2,"rot":4},"attack":{"x":0.22,"y":0.42,"w":0.2,"rot":4}},"male":{"idle":{"x":0.22,"y":0.42,"w":0.2,"rot":4},"attack":{"x":0.22,"y":0.42,"w":0.2,"rot":4}}} },
  ov_staff_water_t2: { file: 'ov_staff_water_t2', anchors: {"female":{"idle":{"x":0.22,"y":0.42,"w":0.2,"rot":4},"attack":{"x":0.22,"y":0.42,"w":0.2,"rot":4}},"male":{"idle":{"x":0.22,"y":0.42,"w":0.2,"rot":4},"attack":{"x":0.22,"y":0.42,"w":0.2,"rot":4}}} },
  ov_staff_water_t3: { file: 'ov_staff_water_t3', anchors: {"female":{"idle":{"x":0.22,"y":0.42,"w":0.2,"rot":4},"attack":{"x":0.22,"y":0.42,"w":0.2,"rot":4}},"male":{"idle":{"x":0.22,"y":0.42,"w":0.2,"rot":4},"attack":{"x":0.22,"y":0.42,"w":0.2,"rot":4}}} },
  ov_staff_earth_t2: { file: 'ov_staff_earth_t2', anchors: {"female":{"idle":{"x":0.22,"y":0.42,"w":0.2,"rot":4},"attack":{"x":0.22,"y":0.42,"w":0.2,"rot":4}},"male":{"idle":{"x":0.22,"y":0.42,"w":0.2,"rot":4},"attack":{"x":0.22,"y":0.42,"w":0.2,"rot":4}}} },
  ov_staff_earth_t3: { file: 'ov_staff_earth_t3', anchors: {"female":{"idle":{"x":0.22,"y":0.42,"w":0.2,"rot":4},"attack":{"x":0.22,"y":0.42,"w":0.2,"rot":4}},"male":{"idle":{"x":0.22,"y":0.42,"w":0.2,"rot":4},"attack":{"x":0.22,"y":0.42,"w":0.2,"rot":4}}} },
  ov_staff_wind_t2: { file: 'ov_staff_wind_t2', anchors: {"female":{"idle":{"x":0.22,"y":0.42,"w":0.2,"rot":4},"attack":{"x":0.22,"y":0.42,"w":0.2,"rot":4}},"male":{"idle":{"x":0.22,"y":0.42,"w":0.2,"rot":4},"attack":{"x":0.22,"y":0.42,"w":0.2,"rot":4}}} },
  ov_staff_wind_t3: { file: 'ov_staff_wind_t3', anchors: {"female":{"idle":{"x":0.22,"y":0.42,"w":0.2,"rot":4},"attack":{"x":0.22,"y":0.42,"w":0.2,"rot":4}},"male":{"idle":{"x":0.22,"y":0.42,"w":0.2,"rot":4},"attack":{"x":0.22,"y":0.42,"w":0.2,"rot":4}}} },
  ov_staff_dark_t2: { file: 'ov_staff_dark_t2', anchors: {"female":{"idle":{"x":0.22,"y":0.42,"w":0.2,"rot":4},"attack":{"x":0.22,"y":0.42,"w":0.2,"rot":4}},"male":{"idle":{"x":0.22,"y":0.42,"w":0.2,"rot":4},"attack":{"x":0.22,"y":0.42,"w":0.2,"rot":4}}} },
  ov_staff_dark_t3: { file: 'ov_staff_dark_t3', anchors: {"female":{"idle":{"x":0.22,"y":0.42,"w":0.2,"rot":4},"attack":{"x":0.22,"y":0.42,"w":0.2,"rot":4}},"male":{"idle":{"x":0.22,"y":0.42,"w":0.2,"rot":4},"attack":{"x":0.22,"y":0.42,"w":0.2,"rot":4}}} },
  ov_staff_light_t2: { file: 'ov_staff_light_t2', anchors: {"female":{"idle":{"x":0.22,"y":0.42,"w":0.2,"rot":4},"attack":{"x":0.22,"y":0.42,"w":0.2,"rot":4}},"male":{"idle":{"x":0.22,"y":0.42,"w":0.2,"rot":4},"attack":{"x":0.22,"y":0.42,"w":0.2,"rot":4}}} },
  ov_staff_light_t3: { file: 'ov_staff_light_t3', anchors: {"female":{"idle":{"x":0.22,"y":0.42,"w":0.2,"rot":4},"attack":{"x":0.22,"y":0.42,"w":0.2,"rot":4}},"male":{"idle":{"x":0.22,"y":0.42,"w":0.2,"rot":4},"attack":{"x":0.22,"y":0.42,"w":0.2,"rot":4}}} },
  ov_greatstaff: { file: 'ov_greatstaff', anchors: {"female":{"idle":{"x":0.2,"y":0.42,"w":0.24,"rot":4},"attack":{"x":0.2,"y":0.42,"w":0.24,"rot":4}},"male":{"idle":{"x":0.2,"y":0.42,"w":0.24,"rot":4},"attack":{"x":0.2,"y":0.42,"w":0.24,"rot":4}}} },
  ov_greatstaff_t1: { file: 'ov_greatstaff_t1', anchors: {"female":{"idle":{"x":0.2,"y":0.42,"w":0.24,"rot":4},"attack":{"x":0.2,"y":0.42,"w":0.24,"rot":4}},"male":{"idle":{"x":0.2,"y":0.42,"w":0.24,"rot":4},"attack":{"x":0.2,"y":0.42,"w":0.24,"rot":4}}} },
  ov_greatstaff_sprint: { file: 'ov_greatstaff_sprint', anchors: {"female":{"idle":{"x":0.2,"y":0.42,"w":0.24,"rot":4},"attack":{"x":0.2,"y":0.42,"w":0.24,"rot":4}},"male":{"idle":{"x":0.2,"y":0.42,"w":0.24,"rot":4},"attack":{"x":0.2,"y":0.42,"w":0.24,"rot":4}}} },
  ov_greatstaff_fire_t2: { file: 'ov_greatstaff_fire_t2', anchors: {"female":{"idle":{"x":0.2,"y":0.42,"w":0.24,"rot":4},"attack":{"x":0.2,"y":0.42,"w":0.24,"rot":4}},"male":{"idle":{"x":0.2,"y":0.42,"w":0.24,"rot":4},"attack":{"x":0.2,"y":0.42,"w":0.24,"rot":4}}} },
  ov_greatstaff_fire_t3: { file: 'ov_greatstaff_fire_t3', anchors: {"female":{"idle":{"x":0.2,"y":0.42,"w":0.24,"rot":4},"attack":{"x":0.2,"y":0.42,"w":0.24,"rot":4}},"male":{"idle":{"x":0.2,"y":0.42,"w":0.24,"rot":4},"attack":{"x":0.2,"y":0.42,"w":0.24,"rot":4}}} },
  ov_greatstaff_water_t2: { file: 'ov_greatstaff_water_t2', anchors: {"female":{"idle":{"x":0.2,"y":0.42,"w":0.24,"rot":4},"attack":{"x":0.2,"y":0.42,"w":0.24,"rot":4}},"male":{"idle":{"x":0.2,"y":0.42,"w":0.24,"rot":4},"attack":{"x":0.2,"y":0.42,"w":0.24,"rot":4}}} },
  ov_greatstaff_water_t3: { file: 'ov_greatstaff_water_t3', anchors: {"female":{"idle":{"x":0.2,"y":0.42,"w":0.24,"rot":4},"attack":{"x":0.2,"y":0.42,"w":0.24,"rot":4}},"male":{"idle":{"x":0.2,"y":0.42,"w":0.24,"rot":4},"attack":{"x":0.2,"y":0.42,"w":0.24,"rot":4}}} },
  ov_greatstaff_earth_t2: { file: 'ov_greatstaff_earth_t2', anchors: {"female":{"idle":{"x":0.2,"y":0.42,"w":0.24,"rot":4},"attack":{"x":0.2,"y":0.42,"w":0.24,"rot":4}},"male":{"idle":{"x":0.2,"y":0.42,"w":0.24,"rot":4},"attack":{"x":0.2,"y":0.42,"w":0.24,"rot":4}}} },
  ov_greatstaff_earth_t3: { file: 'ov_greatstaff_earth_t3', anchors: {"female":{"idle":{"x":0.2,"y":0.42,"w":0.24,"rot":4},"attack":{"x":0.2,"y":0.42,"w":0.24,"rot":4}},"male":{"idle":{"x":0.2,"y":0.42,"w":0.24,"rot":4},"attack":{"x":0.2,"y":0.42,"w":0.24,"rot":4}}} },
  ov_greatstaff_wind_t2: { file: 'ov_greatstaff_wind_t2', anchors: {"female":{"idle":{"x":0.2,"y":0.42,"w":0.24,"rot":4},"attack":{"x":0.2,"y":0.42,"w":0.24,"rot":4}},"male":{"idle":{"x":0.2,"y":0.42,"w":0.24,"rot":4},"attack":{"x":0.2,"y":0.42,"w":0.24,"rot":4}}} },
  ov_greatstaff_wind_t3: { file: 'ov_greatstaff_wind_t3', anchors: {"female":{"idle":{"x":0.2,"y":0.42,"w":0.24,"rot":4},"attack":{"x":0.2,"y":0.42,"w":0.24,"rot":4}},"male":{"idle":{"x":0.2,"y":0.42,"w":0.24,"rot":4},"attack":{"x":0.2,"y":0.42,"w":0.24,"rot":4}}} },
  ov_greatstaff_dark_t2: { file: 'ov_greatstaff_dark_t2', anchors: {"female":{"idle":{"x":0.2,"y":0.42,"w":0.24,"rot":4},"attack":{"x":0.2,"y":0.42,"w":0.24,"rot":4}},"male":{"idle":{"x":0.2,"y":0.42,"w":0.24,"rot":4},"attack":{"x":0.2,"y":0.42,"w":0.24,"rot":4}}} },
  ov_greatstaff_dark_t3: { file: 'ov_greatstaff_dark_t3', anchors: {"female":{"idle":{"x":0.2,"y":0.42,"w":0.24,"rot":4},"attack":{"x":0.2,"y":0.42,"w":0.24,"rot":4}},"male":{"idle":{"x":0.2,"y":0.42,"w":0.24,"rot":4},"attack":{"x":0.2,"y":0.42,"w":0.24,"rot":4}}} },
  ov_greatstaff_light_t2: { file: 'ov_greatstaff_light_t2', anchors: {"female":{"idle":{"x":0.2,"y":0.42,"w":0.24,"rot":4},"attack":{"x":0.2,"y":0.42,"w":0.24,"rot":4}},"male":{"idle":{"x":0.2,"y":0.42,"w":0.24,"rot":4},"attack":{"x":0.2,"y":0.42,"w":0.24,"rot":4}}} },
  ov_greatstaff_light_t3: { file: 'ov_greatstaff_light_t3', anchors: {"female":{"idle":{"x":0.2,"y":0.42,"w":0.24,"rot":4},"attack":{"x":0.2,"y":0.42,"w":0.24,"rot":4}},"male":{"idle":{"x":0.2,"y":0.42,"w":0.24,"rot":4},"attack":{"x":0.2,"y":0.42,"w":0.24,"rot":4}}} },
  ov_hammer: { file: 'ov_hammer', anchors: {"female":{"idle":{"x":0.2,"y":0.46,"w":0.28,"rot":6},"attack":{"x":0.2,"y":0.46,"w":0.28,"rot":6}},"male":{"idle":{"x":0.2,"y":0.46,"w":0.28,"rot":6},"attack":{"x":0.2,"y":0.46,"w":0.28,"rot":6}}} },
  ov_hammer_t1: { file: 'ov_hammer_t1', anchors: {"female":{"idle":{"x":0.2,"y":0.46,"w":0.28,"rot":6},"attack":{"x":0.2,"y":0.46,"w":0.28,"rot":6}},"male":{"idle":{"x":0.2,"y":0.46,"w":0.28,"rot":6},"attack":{"x":0.2,"y":0.46,"w":0.28,"rot":6}}} },
  ov_hammer_sprint: { file: 'ov_hammer_sprint', anchors: {"female":{"idle":{"x":0.2,"y":0.46,"w":0.28,"rot":6},"attack":{"x":0.2,"y":0.46,"w":0.28,"rot":6}},"male":{"idle":{"x":0.2,"y":0.46,"w":0.28,"rot":6},"attack":{"x":0.2,"y":0.46,"w":0.28,"rot":6}}} },
  ov_hammer_fire_t2: { file: 'ov_hammer_fire_t2', anchors: {"female":{"idle":{"x":0.2,"y":0.46,"w":0.28,"rot":6},"attack":{"x":0.2,"y":0.46,"w":0.28,"rot":6}},"male":{"idle":{"x":0.2,"y":0.46,"w":0.28,"rot":6},"attack":{"x":0.2,"y":0.46,"w":0.28,"rot":6}}} },
  ov_hammer_fire_t3: { file: 'ov_hammer_fire_t3', anchors: {"female":{"idle":{"x":0.2,"y":0.46,"w":0.28,"rot":6},"attack":{"x":0.2,"y":0.46,"w":0.28,"rot":6}},"male":{"idle":{"x":0.2,"y":0.46,"w":0.28,"rot":6},"attack":{"x":0.2,"y":0.46,"w":0.28,"rot":6}}} },
  ov_hammer_water_t2: { file: 'ov_hammer_water_t2', anchors: {"female":{"idle":{"x":0.2,"y":0.46,"w":0.28,"rot":6},"attack":{"x":0.2,"y":0.46,"w":0.28,"rot":6}},"male":{"idle":{"x":0.2,"y":0.46,"w":0.28,"rot":6},"attack":{"x":0.2,"y":0.46,"w":0.28,"rot":6}}} },
  ov_hammer_water_t3: { file: 'ov_hammer_water_t3', anchors: {"female":{"idle":{"x":0.2,"y":0.46,"w":0.28,"rot":6},"attack":{"x":0.2,"y":0.46,"w":0.28,"rot":6}},"male":{"idle":{"x":0.2,"y":0.46,"w":0.28,"rot":6},"attack":{"x":0.2,"y":0.46,"w":0.28,"rot":6}}} },
  ov_hammer_earth_t2: { file: 'ov_hammer_earth_t2', anchors: {"female":{"idle":{"x":0.2,"y":0.46,"w":0.28,"rot":6},"attack":{"x":0.2,"y":0.46,"w":0.28,"rot":6}},"male":{"idle":{"x":0.2,"y":0.46,"w":0.28,"rot":6},"attack":{"x":0.2,"y":0.46,"w":0.28,"rot":6}}} },
  ov_hammer_earth_t3: { file: 'ov_hammer_earth_t3', anchors: {"female":{"idle":{"x":0.2,"y":0.46,"w":0.28,"rot":6},"attack":{"x":0.2,"y":0.46,"w":0.28,"rot":6}},"male":{"idle":{"x":0.2,"y":0.46,"w":0.28,"rot":6},"attack":{"x":0.2,"y":0.46,"w":0.28,"rot":6}}} },
  ov_hammer_wind_t2: { file: 'ov_hammer_wind_t2', anchors: {"female":{"idle":{"x":0.2,"y":0.46,"w":0.28,"rot":6},"attack":{"x":0.2,"y":0.46,"w":0.28,"rot":6}},"male":{"idle":{"x":0.2,"y":0.46,"w":0.28,"rot":6},"attack":{"x":0.2,"y":0.46,"w":0.28,"rot":6}}} },
  ov_hammer_wind_t3: { file: 'ov_hammer_wind_t3', anchors: {"female":{"idle":{"x":0.2,"y":0.46,"w":0.28,"rot":6},"attack":{"x":0.2,"y":0.46,"w":0.28,"rot":6}},"male":{"idle":{"x":0.2,"y":0.46,"w":0.28,"rot":6},"attack":{"x":0.2,"y":0.46,"w":0.28,"rot":6}}} },
  ov_hammer_dark_t2: { file: 'ov_hammer_dark_t2', anchors: {"female":{"idle":{"x":0.2,"y":0.46,"w":0.28,"rot":6},"attack":{"x":0.2,"y":0.46,"w":0.28,"rot":6}},"male":{"idle":{"x":0.2,"y":0.46,"w":0.28,"rot":6},"attack":{"x":0.2,"y":0.46,"w":0.28,"rot":6}}} },
  ov_hammer_dark_t3: { file: 'ov_hammer_dark_t3', anchors: {"female":{"idle":{"x":0.2,"y":0.46,"w":0.28,"rot":6},"attack":{"x":0.2,"y":0.46,"w":0.28,"rot":6}},"male":{"idle":{"x":0.2,"y":0.46,"w":0.28,"rot":6},"attack":{"x":0.2,"y":0.46,"w":0.28,"rot":6}}} },
  ov_hammer_light_t2: { file: 'ov_hammer_light_t2', anchors: {"female":{"idle":{"x":0.2,"y":0.46,"w":0.28,"rot":6},"attack":{"x":0.2,"y":0.46,"w":0.28,"rot":6}},"male":{"idle":{"x":0.2,"y":0.46,"w":0.28,"rot":6},"attack":{"x":0.2,"y":0.46,"w":0.28,"rot":6}}} },
  ov_hammer_light_t3: { file: 'ov_hammer_light_t3', anchors: {"female":{"idle":{"x":0.2,"y":0.46,"w":0.28,"rot":6},"attack":{"x":0.2,"y":0.46,"w":0.28,"rot":6}},"male":{"idle":{"x":0.2,"y":0.46,"w":0.28,"rot":6},"attack":{"x":0.2,"y":0.46,"w":0.28,"rot":6}}} },
  ov_bowshort: { file: 'ov_bowshort', anchors: {"female":{"idle":{"x":0.22,"y":0.42,"w":0.22,"rot":4},"attack":{"x":0.22,"y":0.42,"w":0.22,"rot":4}},"male":{"idle":{"x":0.22,"y":0.42,"w":0.22,"rot":4},"attack":{"x":0.22,"y":0.42,"w":0.22,"rot":4}}} },
  ov_bowshort_t1: { file: 'ov_bowshort_t1', anchors: {"female":{"idle":{"x":0.22,"y":0.42,"w":0.22,"rot":4},"attack":{"x":0.22,"y":0.42,"w":0.22,"rot":4}},"male":{"idle":{"x":0.22,"y":0.42,"w":0.22,"rot":4},"attack":{"x":0.22,"y":0.42,"w":0.22,"rot":4}}} },
  ov_bowshort_sprint: { file: 'ov_bowshort_sprint', anchors: {"female":{"idle":{"x":0.22,"y":0.42,"w":0.22,"rot":4},"attack":{"x":0.22,"y":0.42,"w":0.22,"rot":4}},"male":{"idle":{"x":0.22,"y":0.42,"w":0.22,"rot":4},"attack":{"x":0.22,"y":0.42,"w":0.22,"rot":4}}} },
  ov_bowshort_fire_t2: { file: 'ov_bowshort_fire_t2', anchors: {"female":{"idle":{"x":0.22,"y":0.42,"w":0.22,"rot":4},"attack":{"x":0.22,"y":0.42,"w":0.22,"rot":4}},"male":{"idle":{"x":0.22,"y":0.42,"w":0.22,"rot":4},"attack":{"x":0.22,"y":0.42,"w":0.22,"rot":4}}} },
  ov_bowshort_fire_t3: { file: 'ov_bowshort_fire_t3', anchors: {"female":{"idle":{"x":0.22,"y":0.42,"w":0.22,"rot":4},"attack":{"x":0.22,"y":0.42,"w":0.22,"rot":4}},"male":{"idle":{"x":0.22,"y":0.42,"w":0.22,"rot":4},"attack":{"x":0.22,"y":0.42,"w":0.22,"rot":4}}} },
  ov_bowshort_water_t2: { file: 'ov_bowshort_water_t2', anchors: {"female":{"idle":{"x":0.22,"y":0.42,"w":0.22,"rot":4},"attack":{"x":0.22,"y":0.42,"w":0.22,"rot":4}},"male":{"idle":{"x":0.22,"y":0.42,"w":0.22,"rot":4},"attack":{"x":0.22,"y":0.42,"w":0.22,"rot":4}}} },
  ov_bowshort_water_t3: { file: 'ov_bowshort_water_t3', anchors: {"female":{"idle":{"x":0.22,"y":0.42,"w":0.22,"rot":4},"attack":{"x":0.22,"y":0.42,"w":0.22,"rot":4}},"male":{"idle":{"x":0.22,"y":0.42,"w":0.22,"rot":4},"attack":{"x":0.22,"y":0.42,"w":0.22,"rot":4}}} },
  ov_bowshort_earth_t2: { file: 'ov_bowshort_earth_t2', anchors: {"female":{"idle":{"x":0.22,"y":0.42,"w":0.22,"rot":4},"attack":{"x":0.22,"y":0.42,"w":0.22,"rot":4}},"male":{"idle":{"x":0.22,"y":0.42,"w":0.22,"rot":4},"attack":{"x":0.22,"y":0.42,"w":0.22,"rot":4}}} },
  ov_bowshort_earth_t3: { file: 'ov_bowshort_earth_t3', anchors: {"female":{"idle":{"x":0.22,"y":0.42,"w":0.22,"rot":4},"attack":{"x":0.22,"y":0.42,"w":0.22,"rot":4}},"male":{"idle":{"x":0.22,"y":0.42,"w":0.22,"rot":4},"attack":{"x":0.22,"y":0.42,"w":0.22,"rot":4}}} },
  ov_bowshort_wind_t2: { file: 'ov_bowshort_wind_t2', anchors: {"female":{"idle":{"x":0.22,"y":0.42,"w":0.22,"rot":4},"attack":{"x":0.22,"y":0.42,"w":0.22,"rot":4}},"male":{"idle":{"x":0.22,"y":0.42,"w":0.22,"rot":4},"attack":{"x":0.22,"y":0.42,"w":0.22,"rot":4}}} },
  ov_bowshort_wind_t3: { file: 'ov_bowshort_wind_t3', anchors: {"female":{"idle":{"x":0.22,"y":0.42,"w":0.22,"rot":4},"attack":{"x":0.22,"y":0.42,"w":0.22,"rot":4}},"male":{"idle":{"x":0.22,"y":0.42,"w":0.22,"rot":4},"attack":{"x":0.22,"y":0.42,"w":0.22,"rot":4}}} },
  ov_bowshort_dark_t2: { file: 'ov_bowshort_dark_t2', anchors: {"female":{"idle":{"x":0.22,"y":0.42,"w":0.22,"rot":4},"attack":{"x":0.22,"y":0.42,"w":0.22,"rot":4}},"male":{"idle":{"x":0.22,"y":0.42,"w":0.22,"rot":4},"attack":{"x":0.22,"y":0.42,"w":0.22,"rot":4}}} },
  ov_bowshort_dark_t3: { file: 'ov_bowshort_dark_t3', anchors: {"female":{"idle":{"x":0.22,"y":0.42,"w":0.22,"rot":4},"attack":{"x":0.22,"y":0.42,"w":0.22,"rot":4}},"male":{"idle":{"x":0.22,"y":0.42,"w":0.22,"rot":4},"attack":{"x":0.22,"y":0.42,"w":0.22,"rot":4}}} },
  ov_bowshort_light_t2: { file: 'ov_bowshort_light_t2', anchors: {"female":{"idle":{"x":0.22,"y":0.42,"w":0.22,"rot":4},"attack":{"x":0.22,"y":0.42,"w":0.22,"rot":4}},"male":{"idle":{"x":0.22,"y":0.42,"w":0.22,"rot":4},"attack":{"x":0.22,"y":0.42,"w":0.22,"rot":4}}} },
  ov_bowshort_light_t3: { file: 'ov_bowshort_light_t3', anchors: {"female":{"idle":{"x":0.22,"y":0.42,"w":0.22,"rot":4},"attack":{"x":0.22,"y":0.42,"w":0.22,"rot":4}},"male":{"idle":{"x":0.22,"y":0.42,"w":0.22,"rot":4},"attack":{"x":0.22,"y":0.42,"w":0.22,"rot":4}}} },
  ov_bowlong: { file: 'ov_bowlong', anchors: {"female":{"idle":{"x":0.22,"y":0.4,"w":0.22,"rot":3},"attack":{"x":0.22,"y":0.4,"w":0.22,"rot":3}},"male":{"idle":{"x":0.22,"y":0.4,"w":0.22,"rot":3},"attack":{"x":0.22,"y":0.4,"w":0.22,"rot":3}}} },
  ov_bowlong_t1: { file: 'ov_bowlong_t1', anchors: {"female":{"idle":{"x":0.22,"y":0.4,"w":0.22,"rot":3},"attack":{"x":0.22,"y":0.4,"w":0.22,"rot":3}},"male":{"idle":{"x":0.22,"y":0.4,"w":0.22,"rot":3},"attack":{"x":0.22,"y":0.4,"w":0.22,"rot":3}}} },
  ov_bowlong_sprint: { file: 'ov_bowlong_sprint', anchors: {"female":{"idle":{"x":0.22,"y":0.4,"w":0.22,"rot":3},"attack":{"x":0.22,"y":0.4,"w":0.22,"rot":3}},"male":{"idle":{"x":0.22,"y":0.4,"w":0.22,"rot":3},"attack":{"x":0.22,"y":0.4,"w":0.22,"rot":3}}} },
  ov_bowlong_fire_t2: { file: 'ov_bowlong_fire_t2', anchors: {"female":{"idle":{"x":0.22,"y":0.4,"w":0.22,"rot":3},"attack":{"x":0.22,"y":0.4,"w":0.22,"rot":3}},"male":{"idle":{"x":0.22,"y":0.4,"w":0.22,"rot":3},"attack":{"x":0.22,"y":0.4,"w":0.22,"rot":3}}} },
  ov_bowlong_fire_t3: { file: 'ov_bowlong_fire_t3', anchors: {"female":{"idle":{"x":0.22,"y":0.4,"w":0.22,"rot":3},"attack":{"x":0.22,"y":0.4,"w":0.22,"rot":3}},"male":{"idle":{"x":0.22,"y":0.4,"w":0.22,"rot":3},"attack":{"x":0.22,"y":0.4,"w":0.22,"rot":3}}} },
  ov_bowlong_water_t2: { file: 'ov_bowlong_water_t2', anchors: {"female":{"idle":{"x":0.22,"y":0.4,"w":0.22,"rot":3},"attack":{"x":0.22,"y":0.4,"w":0.22,"rot":3}},"male":{"idle":{"x":0.22,"y":0.4,"w":0.22,"rot":3},"attack":{"x":0.22,"y":0.4,"w":0.22,"rot":3}}} },
  ov_bowlong_water_t3: { file: 'ov_bowlong_water_t3', anchors: {"female":{"idle":{"x":0.22,"y":0.4,"w":0.22,"rot":3},"attack":{"x":0.22,"y":0.4,"w":0.22,"rot":3}},"male":{"idle":{"x":0.22,"y":0.4,"w":0.22,"rot":3},"attack":{"x":0.22,"y":0.4,"w":0.22,"rot":3}}} },
  ov_bowlong_earth_t2: { file: 'ov_bowlong_earth_t2', anchors: {"female":{"idle":{"x":0.22,"y":0.4,"w":0.22,"rot":3},"attack":{"x":0.22,"y":0.4,"w":0.22,"rot":3}},"male":{"idle":{"x":0.22,"y":0.4,"w":0.22,"rot":3},"attack":{"x":0.22,"y":0.4,"w":0.22,"rot":3}}} },
  ov_bowlong_earth_t3: { file: 'ov_bowlong_earth_t3', anchors: {"female":{"idle":{"x":0.22,"y":0.4,"w":0.22,"rot":3},"attack":{"x":0.22,"y":0.4,"w":0.22,"rot":3}},"male":{"idle":{"x":0.22,"y":0.4,"w":0.22,"rot":3},"attack":{"x":0.22,"y":0.4,"w":0.22,"rot":3}}} },
  ov_bowlong_wind_t2: { file: 'ov_bowlong_wind_t2', anchors: {"female":{"idle":{"x":0.22,"y":0.4,"w":0.22,"rot":3},"attack":{"x":0.22,"y":0.4,"w":0.22,"rot":3}},"male":{"idle":{"x":0.22,"y":0.4,"w":0.22,"rot":3},"attack":{"x":0.22,"y":0.4,"w":0.22,"rot":3}}} },
  ov_bowlong_wind_t3: { file: 'ov_bowlong_wind_t3', anchors: {"female":{"idle":{"x":0.22,"y":0.4,"w":0.22,"rot":3},"attack":{"x":0.22,"y":0.4,"w":0.22,"rot":3}},"male":{"idle":{"x":0.22,"y":0.4,"w":0.22,"rot":3},"attack":{"x":0.22,"y":0.4,"w":0.22,"rot":3}}} },
  ov_bowlong_dark_t2: { file: 'ov_bowlong_dark_t2', anchors: {"female":{"idle":{"x":0.22,"y":0.4,"w":0.22,"rot":3},"attack":{"x":0.22,"y":0.4,"w":0.22,"rot":3}},"male":{"idle":{"x":0.22,"y":0.4,"w":0.22,"rot":3},"attack":{"x":0.22,"y":0.4,"w":0.22,"rot":3}}} },
  ov_bowlong_dark_t3: { file: 'ov_bowlong_dark_t3', anchors: {"female":{"idle":{"x":0.22,"y":0.4,"w":0.22,"rot":3},"attack":{"x":0.22,"y":0.4,"w":0.22,"rot":3}},"male":{"idle":{"x":0.22,"y":0.4,"w":0.22,"rot":3},"attack":{"x":0.22,"y":0.4,"w":0.22,"rot":3}}} },
  ov_bowlong_light_t2: { file: 'ov_bowlong_light_t2', anchors: {"female":{"idle":{"x":0.22,"y":0.4,"w":0.22,"rot":3},"attack":{"x":0.22,"y":0.4,"w":0.22,"rot":3}},"male":{"idle":{"x":0.22,"y":0.4,"w":0.22,"rot":3},"attack":{"x":0.22,"y":0.4,"w":0.22,"rot":3}}} },
  ov_bowlong_light_t3: { file: 'ov_bowlong_light_t3', anchors: {"female":{"idle":{"x":0.22,"y":0.4,"w":0.22,"rot":3},"attack":{"x":0.22,"y":0.4,"w":0.22,"rot":3}},"male":{"idle":{"x":0.22,"y":0.4,"w":0.22,"rot":3},"attack":{"x":0.22,"y":0.4,"w":0.22,"rot":3}}} },
  ov_orb: { file: 'ov_orb', anchors: {"female":{"idle":{"x":0.3,"y":0.4,"w":0.3,"rot":0},"attack":{"x":0.3,"y":0.4,"w":0.3,"rot":0}},"male":{"idle":{"x":0.3,"y":0.4,"w":0.3,"rot":0},"attack":{"x":0.3,"y":0.4,"w":0.3,"rot":0}}} },
  ov_orb_t1: { file: 'ov_orb_t1', anchors: {"female":{"idle":{"x":0.3,"y":0.4,"w":0.3,"rot":0},"attack":{"x":0.3,"y":0.4,"w":0.3,"rot":0}},"male":{"idle":{"x":0.3,"y":0.4,"w":0.3,"rot":0},"attack":{"x":0.3,"y":0.4,"w":0.3,"rot":0}}} },
  ov_orb_sprint: { file: 'ov_orb_sprint', anchors: {"female":{"idle":{"x":0.3,"y":0.4,"w":0.3,"rot":0},"attack":{"x":0.3,"y":0.4,"w":0.3,"rot":0}},"male":{"idle":{"x":0.3,"y":0.4,"w":0.3,"rot":0},"attack":{"x":0.3,"y":0.4,"w":0.3,"rot":0}}} },
  ov_orb_fire_t2: { file: 'ov_orb_fire_t2', anchors: {"female":{"idle":{"x":0.3,"y":0.4,"w":0.3,"rot":0},"attack":{"x":0.3,"y":0.4,"w":0.3,"rot":0}},"male":{"idle":{"x":0.3,"y":0.4,"w":0.3,"rot":0},"attack":{"x":0.3,"y":0.4,"w":0.3,"rot":0}}} },
  ov_orb_fire_t3: { file: 'ov_orb_fire_t3', anchors: {"female":{"idle":{"x":0.3,"y":0.4,"w":0.3,"rot":0},"attack":{"x":0.3,"y":0.4,"w":0.3,"rot":0}},"male":{"idle":{"x":0.3,"y":0.4,"w":0.3,"rot":0},"attack":{"x":0.3,"y":0.4,"w":0.3,"rot":0}}} },
  ov_orb_water_t2: { file: 'ov_orb_water_t2', anchors: {"female":{"idle":{"x":0.3,"y":0.4,"w":0.3,"rot":0},"attack":{"x":0.3,"y":0.4,"w":0.3,"rot":0}},"male":{"idle":{"x":0.3,"y":0.4,"w":0.3,"rot":0},"attack":{"x":0.3,"y":0.4,"w":0.3,"rot":0}}} },
  ov_orb_water_t3: { file: 'ov_orb_water_t3', anchors: {"female":{"idle":{"x":0.3,"y":0.4,"w":0.3,"rot":0},"attack":{"x":0.3,"y":0.4,"w":0.3,"rot":0}},"male":{"idle":{"x":0.3,"y":0.4,"w":0.3,"rot":0},"attack":{"x":0.3,"y":0.4,"w":0.3,"rot":0}}} },
  ov_orb_earth_t2: { file: 'ov_orb_earth_t2', anchors: {"female":{"idle":{"x":0.3,"y":0.4,"w":0.3,"rot":0},"attack":{"x":0.3,"y":0.4,"w":0.3,"rot":0}},"male":{"idle":{"x":0.3,"y":0.4,"w":0.3,"rot":0},"attack":{"x":0.3,"y":0.4,"w":0.3,"rot":0}}} },
  ov_orb_earth_t3: { file: 'ov_orb_earth_t3', anchors: {"female":{"idle":{"x":0.3,"y":0.4,"w":0.3,"rot":0},"attack":{"x":0.3,"y":0.4,"w":0.3,"rot":0}},"male":{"idle":{"x":0.3,"y":0.4,"w":0.3,"rot":0},"attack":{"x":0.3,"y":0.4,"w":0.3,"rot":0}}} },
  ov_orb_wind_t2: { file: 'ov_orb_wind_t2', anchors: {"female":{"idle":{"x":0.3,"y":0.4,"w":0.3,"rot":0},"attack":{"x":0.3,"y":0.4,"w":0.3,"rot":0}},"male":{"idle":{"x":0.3,"y":0.4,"w":0.3,"rot":0},"attack":{"x":0.3,"y":0.4,"w":0.3,"rot":0}}} },
  ov_orb_wind_t3: { file: 'ov_orb_wind_t3', anchors: {"female":{"idle":{"x":0.3,"y":0.4,"w":0.3,"rot":0},"attack":{"x":0.3,"y":0.4,"w":0.3,"rot":0}},"male":{"idle":{"x":0.3,"y":0.4,"w":0.3,"rot":0},"attack":{"x":0.3,"y":0.4,"w":0.3,"rot":0}}} },
  ov_orb_dark_t2: { file: 'ov_orb_dark_t2', anchors: {"female":{"idle":{"x":0.3,"y":0.4,"w":0.3,"rot":0},"attack":{"x":0.3,"y":0.4,"w":0.3,"rot":0}},"male":{"idle":{"x":0.3,"y":0.4,"w":0.3,"rot":0},"attack":{"x":0.3,"y":0.4,"w":0.3,"rot":0}}} },
  ov_orb_dark_t3: { file: 'ov_orb_dark_t3', anchors: {"female":{"idle":{"x":0.3,"y":0.4,"w":0.3,"rot":0},"attack":{"x":0.3,"y":0.4,"w":0.3,"rot":0}},"male":{"idle":{"x":0.3,"y":0.4,"w":0.3,"rot":0},"attack":{"x":0.3,"y":0.4,"w":0.3,"rot":0}}} },
  ov_orb_light_t2: { file: 'ov_orb_light_t2', anchors: {"female":{"idle":{"x":0.3,"y":0.4,"w":0.3,"rot":0},"attack":{"x":0.3,"y":0.4,"w":0.3,"rot":0}},"male":{"idle":{"x":0.3,"y":0.4,"w":0.3,"rot":0},"attack":{"x":0.3,"y":0.4,"w":0.3,"rot":0}}} },
  ov_orb_light_t3: { file: 'ov_orb_light_t3', anchors: {"female":{"idle":{"x":0.3,"y":0.4,"w":0.3,"rot":0},"attack":{"x":0.3,"y":0.4,"w":0.3,"rot":0}},"male":{"idle":{"x":0.3,"y":0.4,"w":0.3,"rot":0},"attack":{"x":0.3,"y":0.4,"w":0.3,"rot":0}}} },
  ov_tome: { file: 'ov_tome', anchors: {"female":{"idle":{"x":0.28,"y":0.42,"w":0.3,"rot":-4},"attack":{"x":0.28,"y":0.42,"w":0.3,"rot":-4}},"male":{"idle":{"x":0.28,"y":0.42,"w":0.3,"rot":-4},"attack":{"x":0.28,"y":0.42,"w":0.3,"rot":-4}}} },
  ov_tome_t1: { file: 'ov_tome_t1', anchors: {"female":{"idle":{"x":0.28,"y":0.42,"w":0.3,"rot":-4},"attack":{"x":0.28,"y":0.42,"w":0.3,"rot":-4}},"male":{"idle":{"x":0.28,"y":0.42,"w":0.3,"rot":-4},"attack":{"x":0.28,"y":0.42,"w":0.3,"rot":-4}}} },
  ov_tome_sprint: { file: 'ov_tome_sprint', anchors: {"female":{"idle":{"x":0.28,"y":0.42,"w":0.3,"rot":-4},"attack":{"x":0.28,"y":0.42,"w":0.3,"rot":-4}},"male":{"idle":{"x":0.28,"y":0.42,"w":0.3,"rot":-4},"attack":{"x":0.28,"y":0.42,"w":0.3,"rot":-4}}} },
  ov_tome_fire_t2: { file: 'ov_tome_fire_t2', anchors: {"female":{"idle":{"x":0.28,"y":0.42,"w":0.3,"rot":-4},"attack":{"x":0.28,"y":0.42,"w":0.3,"rot":-4}},"male":{"idle":{"x":0.28,"y":0.42,"w":0.3,"rot":-4},"attack":{"x":0.28,"y":0.42,"w":0.3,"rot":-4}}} },
  ov_tome_fire_t3: { file: 'ov_tome_fire_t3', anchors: {"female":{"idle":{"x":0.28,"y":0.42,"w":0.3,"rot":-4},"attack":{"x":0.28,"y":0.42,"w":0.3,"rot":-4}},"male":{"idle":{"x":0.28,"y":0.42,"w":0.3,"rot":-4},"attack":{"x":0.28,"y":0.42,"w":0.3,"rot":-4}}} },
  ov_tome_water_t2: { file: 'ov_tome_water_t2', anchors: {"female":{"idle":{"x":0.28,"y":0.42,"w":0.3,"rot":-4},"attack":{"x":0.28,"y":0.42,"w":0.3,"rot":-4}},"male":{"idle":{"x":0.28,"y":0.42,"w":0.3,"rot":-4},"attack":{"x":0.28,"y":0.42,"w":0.3,"rot":-4}}} },
  ov_tome_water_t3: { file: 'ov_tome_water_t3', anchors: {"female":{"idle":{"x":0.28,"y":0.42,"w":0.3,"rot":-4},"attack":{"x":0.28,"y":0.42,"w":0.3,"rot":-4}},"male":{"idle":{"x":0.28,"y":0.42,"w":0.3,"rot":-4},"attack":{"x":0.28,"y":0.42,"w":0.3,"rot":-4}}} },
  ov_tome_earth_t2: { file: 'ov_tome_earth_t2', anchors: {"female":{"idle":{"x":0.28,"y":0.42,"w":0.3,"rot":-4},"attack":{"x":0.28,"y":0.42,"w":0.3,"rot":-4}},"male":{"idle":{"x":0.28,"y":0.42,"w":0.3,"rot":-4},"attack":{"x":0.28,"y":0.42,"w":0.3,"rot":-4}}} },
  ov_tome_earth_t3: { file: 'ov_tome_earth_t3', anchors: {"female":{"idle":{"x":0.28,"y":0.42,"w":0.3,"rot":-4},"attack":{"x":0.28,"y":0.42,"w":0.3,"rot":-4}},"male":{"idle":{"x":0.28,"y":0.42,"w":0.3,"rot":-4},"attack":{"x":0.28,"y":0.42,"w":0.3,"rot":-4}}} },
  ov_tome_wind_t2: { file: 'ov_tome_wind_t2', anchors: {"female":{"idle":{"x":0.28,"y":0.42,"w":0.3,"rot":-4},"attack":{"x":0.28,"y":0.42,"w":0.3,"rot":-4}},"male":{"idle":{"x":0.28,"y":0.42,"w":0.3,"rot":-4},"attack":{"x":0.28,"y":0.42,"w":0.3,"rot":-4}}} },
  ov_tome_wind_t3: { file: 'ov_tome_wind_t3', anchors: {"female":{"idle":{"x":0.28,"y":0.42,"w":0.3,"rot":-4},"attack":{"x":0.28,"y":0.42,"w":0.3,"rot":-4}},"male":{"idle":{"x":0.28,"y":0.42,"w":0.3,"rot":-4},"attack":{"x":0.28,"y":0.42,"w":0.3,"rot":-4}}} },
  ov_tome_dark_t2: { file: 'ov_tome_dark_t2', anchors: {"female":{"idle":{"x":0.28,"y":0.42,"w":0.3,"rot":-4},"attack":{"x":0.28,"y":0.42,"w":0.3,"rot":-4}},"male":{"idle":{"x":0.28,"y":0.42,"w":0.3,"rot":-4},"attack":{"x":0.28,"y":0.42,"w":0.3,"rot":-4}}} },
  ov_tome_dark_t3: { file: 'ov_tome_dark_t3', anchors: {"female":{"idle":{"x":0.28,"y":0.42,"w":0.3,"rot":-4},"attack":{"x":0.28,"y":0.42,"w":0.3,"rot":-4}},"male":{"idle":{"x":0.28,"y":0.42,"w":0.3,"rot":-4},"attack":{"x":0.28,"y":0.42,"w":0.3,"rot":-4}}} },
  ov_tome_light_t2: { file: 'ov_tome_light_t2', anchors: {"female":{"idle":{"x":0.28,"y":0.42,"w":0.3,"rot":-4},"attack":{"x":0.28,"y":0.42,"w":0.3,"rot":-4}},"male":{"idle":{"x":0.28,"y":0.42,"w":0.3,"rot":-4},"attack":{"x":0.28,"y":0.42,"w":0.3,"rot":-4}}} },
  ov_tome_light_t3: { file: 'ov_tome_light_t3', anchors: {"female":{"idle":{"x":0.28,"y":0.42,"w":0.3,"rot":-4},"attack":{"x":0.28,"y":0.42,"w":0.3,"rot":-4}},"male":{"idle":{"x":0.28,"y":0.42,"w":0.3,"rot":-4},"attack":{"x":0.28,"y":0.42,"w":0.3,"rot":-4}}} },
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
    
    // Até Raro usa Base Neutro (t1 ou t2 sem elemento dependendo do tierOfItem, mas sem elemento)
    // Épico usa Elemental T2
    // Lendário/Relíquia usa Elemental T3
    
    const inst = elementOfItemInstance(item);
    const tier = tierOfItem(item.rarity, upgrade);
    
    if (inst && inst.element) {
        if (item.rarity === 'legendary' || item.rarity === 'relic') {
            const elKey = `ov_${catKey}_${inst.element}_t3`;
            if (hasOverlayKey(elKey)) key = elKey;
        } else if (item.rarity === 'epic') {
            const elKey = `ov_${catKey}_${inst.element}_t2`;
            if (hasOverlayKey(elKey)) key = elKey;
        }
    }
    
    // Fallback tier (sem elemento)
    if (!key) {
        const tKey = `ov_${catKey}_${tier}`;
        if (hasOverlayKey(tKey)) key = tKey;
    }
  }

  if (!key && catKey && hasOverlayKey(`ov_${catKey}`)) {
      key = `ov_${catKey}`;
  }

  if (!key && ITEM_OVERLAY[item.id] && hasOverlayKey(ITEM_OVERLAY[item.id])) {
      key = ITEM_OVERLAY[item.id];
  }

  if (!key && hasOverlayKey('ov_sword')) key = 'ov_sword';
  if (!key) return null;

  const def = WEAPON_OVERLAYS[key];
  const anchor = def.anchors[gender]?.[state] ?? def.anchors[gender]?.idle;
  if (!anchor) return null;

  return { file: `/assets/sprites/${def.file}.png`, anchor };
};
