/**
 * sync_glyphs.ts — Regenera as entradas de glifos em offHand.ts e
 * atualiza itemNames.ts a partir do catálogo glyphs.ts.
 *
 * Uso: cd client && npx tsx ../tools/sync_glyphs.ts
 */
import * as fs from 'fs';
import * as path from 'path';
import { GLYPHS, type GlyphDefinition } from '../client/src/data/glyphs';

const CLIENT = path.join(__dirname, '..', 'client', 'src');

const RARITY_LVL: Record<string, number> = {
  common: 5, uncommon: 10, rare: 15, epic: 30, legendary: 45, relic: 60,
};

const ARC_BY_RARITY: Record<string, number> = {
  common: 6, uncommon: 10, rare: 12, epic: 20, legendary: 24, relic: 30,
};

function glyphEntry(g: GlyphDefinition): string {
  const numId = Number(g.itemId.replace('gl_', ''));
  const arc = ARC_BY_RARITY[g.rarity];
  // effects: sempre começa com ARC(6)=arc, depois elemental (12-17) se houver, depois stats
  const eff: string[] = [];
  let n = 1;
  eff.push(`      "e${n}": 6, "v${n}": ${arc}`);
  n++;
  if (g.element) {
    const ELEM_EID: Record<string, number> = { fire: 12, earth: 13, water: 14, wind: 15, dark: 16, light: 17 };
    eff.push(`      "e${n}": ${ELEM_EID[g.element]}, "v${n}": ${g.power}`);
    n++;
  }
  for (const e of g.effects) {
    eff.push(`      "e${n}": ${e.eid}, "v${n}": ${e.value}`);
    n++;
  }
  return [
    `  "${g.itemId}": {`,
    `    "id": "${g.itemId}",`,
    `    "numId": ${numId},`,
    `    "icon": "🔯",`,
    `    "rarity": "${g.rarity}",`,
    `    "type": "weapon_off",`,
    `    "slot": "weapon_off",`,
    `    "requireLevel": ${RARITY_LVL[g.rarity]},`,
    `    "nameKey": "itemNames.${g.itemId}.name",`,
    `    "descKey": "itemNames.${g.itemId}.desc",`,
    `    "isTwoHanded": false,`,
    `    "weaponCategory": "glyph",`,
    `    "stats": { "arcana": ${arc} },`,
    `    "effects": {`,
    eff.join(',\n'),
    `    }`,
    `  }`,
  ].join('\n');
}

function syncOffHand() {
  const p = path.join(CLIENT, 'data', 'items', 'offHand.ts');
  let s = fs.readFileSync(p, 'utf8');
  const marker = '  // ── GLIFOS DE OFF-HAND';
  const endMarker = '} satisfies Record<string, Item>;';
  const si = s.indexOf(marker);
  const ei = s.indexOf(endMarker);
  if (si < 0 || ei < 0) throw new Error('markers não encontrados em offHand.ts');
  const block = [
    '  // ── GLIFOS DE OFF-HAND (sistema de 2º elemento / fusão) ──',
    '  // Glifos selam um SEGUNDO elemento (effects 12–17) na arma principal.',
    '  // Quando o elemento da arma + do glifo formam uma fusão (água+vento=GELO',
    '  // etc.), nasce uma camada de aura ao redor da arma sem trocar a arte.',
    '  // Glifos NEUTROS (element: null) não fundem — só dão bônus de stats.',
    '  // Gerado por tools/sync_glyphs.ts — editar catálogo em data/glyphs.ts.',
    GLYPHS.map(glyphEntry).join(',\n'),
    ',',
  ].join('\n');
  s = s.slice(0, si) + block + '\n' + s.slice(ei);
  fs.writeFileSync(p, s);
  console.log(`offHand.ts: ${GLYPHS.length} glifos sincronizados`);
}

// Nomes i18n
const EL_PT: Record<string, string> = { fire: 'Ígneo', earth: 'Telúrico', water: 'das Marés', wind: 'Vendaval', dark: 'Sombrío', light: 'Luminoso' };
const EL_EN: Record<string, string> = { fire: 'Igneous', earth: 'Telluric', water: 'Tidal', wind: 'Gale', dark: 'Gloom', light: 'Luminous' };
const EL_ES: Record<string, string> = { fire: 'Ígneo', earth: 'Telúrico', water: 'de las Mareas', wind: 'Vendaval', dark: 'Sombrío', light: 'Luminoso' };
const EL_JA: Record<string, string> = { fire: '焔', earth: '地', water: '潮', wind: '風', dark: '闇', light: '光' };
const RAR_PT: Record<string, string> = { common: 'Comum', uncommon: 'Incomum', rare: 'Raro', epic: 'Épico', legendary: 'Lendário', relic: 'Relíquia' };
const RAR_EN: Record<string, string> = { common: 'Common', uncommon: 'Uncommon', rare: 'Rare', epic: 'Epic', legendary: 'Legendary', relic: 'Relic' };
const RAR_ES: Record<string, string> = { common: 'Común', uncommon: 'Poco común', rare: 'Raro', epic: 'Épico', legendary: 'Legendario', relic: 'Reliquia' };
const RAR_JA: Record<string, string> = { common: 'コモン', uncommon: 'アンコモン', rare: 'レア', epic: 'エピック', legendary: 'レジェンダリー', relic: 'レリック' };

function ptName(el: string | null, r: string) { return el ? `Glifo ${EL_PT[el]} (${RAR_PT[r]})` : `Glifo Apócrifo (${RAR_PT[r]})`; }
function enName(el: string | null, r: string) { return el ? `${EL_EN[el]} Glyph (${RAR_EN[r]})` : `Apocryphal Glyph (${RAR_EN[r]})`; }
function esName(el: string | null, r: string) { return el ? `Glifo ${EL_ES[el]} (${RAR_ES[r]})` : `Glifo Apócrifo (${RAR_ES[r]})`; }
function jaName(el: string | null, r: string) { return el ? `${EL_JA[el]}のグリフ（${RAR_JA[r]}）` : `異端のグリフ（${RAR_JA[r]}）`; }

function ptDesc(el: string | null, r: string) {
  const rar = RAR_PT[r].toLowerCase();
  return el ? `Glifo de mão secundária (${rar}) que sela um segundo elemento (${el}) na arma. Se o elemento da arma e o do glifo fundirem, uma aura elemental nasce ao redor da lâmina.` : `Glifo neutro de raridade ${rar}. Não sela nenhum elemento, então não cria fusão — apenas concede bônus de stats.`;
}
function enDesc(el: string | null, r: string) {
  const rar = RAR_EN[r].toLowerCase();
  return el ? `Off-hand glyph (${rar}) that seals a second element (${el}) onto your weapon. If the weapon and glyph elements fuse, an elemental aura blooms around the blade.` : `Neutral glyph (${rar} rarity). Seals no element, so it creates no fusion — it only grants stat bonuses.`;
}
function esDesc(el: string | null, r: string) {
  const rar = RAR_ES[r].toLowerCase();
  return el ? `Glifo de mano secundaria (${rar}) que sella un segundo elemento (${el}) en el arma. Si los elementos funden, un aura elemental surge alrededor de la hoja.` : `Glifo neutro (rareza ${rar}). No sella ningún elemento, así que no crea fusión — solo otorga bonus de stats.`;
}
function jaDesc(el: string | null, r: string) {
  const rar = RAR_JA[r];
  return el ? `副手のグリフ（${rar}）。武器に第二の属性（${el}）を宿す。武器とグリフの属性が融合すると、刃の周りに属性のオーラが生まれる。` : `ニュートラルグリフ（${rar}）。属性を宿さないため融合せず、ステータスボーナスのみを与える。`;
}

function nameEntry(g: GlyphDefinition): string {
  return [
    `  "${g.itemId}": {`,
    `    "pt-BR": { "name": ${JSON.stringify(ptName(g.element, g.rarity))}, "desc": ${JSON.stringify(ptDesc(g.element, g.rarity))} },`,
    `    "en-US": { "name": ${JSON.stringify(enName(g.element, g.rarity))}, "desc": ${JSON.stringify(enDesc(g.element, g.rarity))} },`,
    `    "es-ES": { "name": ${JSON.stringify(esName(g.element, g.rarity))}, "desc": ${JSON.stringify(esDesc(g.element, g.rarity))} },`,
    `    "ja-JP": { "name": ${JSON.stringify(jaName(g.element, g.rarity))}, "desc": ${JSON.stringify(jaDesc(g.element, g.rarity))} }`,
    `  }`,
  ].join('\n');
}

function syncItemNames() {
  const p = path.join(CLIENT, 'data', 'itemNames.ts');
  let s = fs.readFileSync(p, 'utf8');
  // encontra o primeiro glifo e o último glifo
  const first = s.indexOf('  "gl_2240"');
  const last = s.indexOf('  "hd_2500"');
  if (first < 0 || last < 0) throw new Error('glifo markers não encontrados em itemNames.ts');
  const block = GLYPHS.map(nameEntry).join(',\n') + ',\n';
  s = s.slice(0, first) + block + s.slice(last);
  fs.writeFileSync(p, s);
  console.log(`itemNames.ts: ${GLYPHS.length} glifos sincronizados`);
}

syncOffHand();
syncItemNames();
console.log('OK');
