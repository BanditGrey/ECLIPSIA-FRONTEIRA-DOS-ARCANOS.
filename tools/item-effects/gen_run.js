// Gerador: escreve os arquivos de itens do catálogo do spec + itemNames + referências
const fs = require('fs');
const path = require('path');
// Execute a partir da RAIZ do repo: node tools/item-effects/gen_run.js
const ROOT = process.cwd();
const ITEMS_DIR = path.join(ROOT, 'client/src/data/items');
const { R, W1H, W2H, OH, HEAD, CHEST, LEGS, GLOVES, BOOTS, EARRINGS, NECKLACES, BELTS, RESIST, AMULETS } = require(path.join(__dirname, 'gen_data1.js'));
const { STONES, PETS, MOUNTS, MATERIALS_NEW } = require(path.join(__dirname, 'gen_data2.js'));

const STAT_BY_EFFECT = { 1: 'atk', 2: 'def', 3: 'strength', 4: 'agility', 5: 'vitality', 6: 'arcana', 7: 'perception', 8: 'will', 9: 'luck', 10: 'hp', 11: 'mp', 21: 'critChance', 22: 'critDmg' };

const pairsToObj = (flat) => {
  const pairs = [];
  for (let i = 0; i < flat.length; i += 2) pairs.push({ effectId: flat[i], value: flat[i + 1] });
  return pairs;
};
const statsFromPairs = (pairs) => {
  const stats = {};
  for (const { effectId, value } of pairs) {
    const key = STAT_BY_EFFECT[effectId];
    if (key) stats[key] = (stats[key] ?? 0) + value;
  }
  return stats;
};
const effectsFromPairs = (pairs) => {
  const eff = {};
  pairs.forEach(({ effectId, value }, i) => { eff[`e${i + 1}`] = effectId; eff[`v${i + 1}`] = value; });
  return eff;
};

const DESC = {
  weapon1h: ['Uma arma de uma mão forjada na fronteira dos arcanos.', 'A one-handed weapon forged on the arcane frontier.', 'Un arma de una mano forjada en la frontera arcana.', 'アルカナの辺境で鍛えられた片手武器。'],
  weapon2h: ['Uma arma de duas mãos pesada e devastadora.', 'A heavy, devastating two-handed weapon.', 'Un arma pesada y devastadora de dos manos.', '重く破壊的な両手武器。'],
  offhand: ['Equipamento de mão secundária para proteção ou poder.', 'Off-hand gear for protection or power.', 'Equipo secundario para protección o poder.', '防御か力を担う副手装備。'],
  armor: ['Uma peça de armadura da fronteira dos arcanos.', 'A piece of armor from the arcane frontier.', 'Una pieza de armadura de la frontera arcana.', 'アルカナの辺境の防具。'],
  accessory: ['Um acessório imbuído de poder arcano.', 'An accessory imbued with arcane power.', 'Un accesorio imbuido de poder arcano.', '秘法の力を宿した装身具。'],
  spirit_stone: ['Uma pedra espiritual que concede efeitos em combate.', 'A spirit stone that grants combat effects.', 'Una piedra espiritual que concede efectos en combate.', '戦闘で効果を発揮する霊石。'],
  pet: ['Um companheiro fiel para a batalha.', 'A loyal companion for battle.', 'Un compañero fiel para la batalla.', '頼れる戦いの仲間。'],
  mount: ['Uma montaria para cruzar a fronteira mais rápido.', 'A mount to cross the frontier faster.', 'Una montura para cruzar la frontera más rápido.', '辺境を速く駆け抜けるための乗騎。'],
  material: ['Material raro usado em crafting e melhorias.', 'Rare material used in crafting and upgrades.', 'Material raro usado en artesanía y mejoras.', ' crafting や強化に使う希少な素材。']
};

let totalNew = 0;
const allNames = {}; // id -> {pt:{name,desc},...}

const registerNames = (id, names, descKey) => {
  allNames[id] = {
    'pt-BR': { name: names[0], desc: DESC[descKey][0] },
    'en-US': { name: names[1], desc: DESC[descKey][1] },
    'es-ES': { name: names[2], desc: DESC[descKey][2] },
    'ja-JP': { name: names[3], desc: DESC[descKey][3] }
  };
};

const jstr = (v, indent) => JSON.stringify(v, null, 2).split('\n').map((l, i) => (i === 0 ? l : ' '.repeat(indent) + l)).join('\n');

const buildItemObj = (fields) => {
  const lines = [];
  for (const [k, v] of Object.entries(fields)) {
    if (v === undefined) continue;
    if (typeof v === 'object') lines.push(`    "${k}": ${jstr(v, 4)}`);
    else lines.push(`    "${k}": ${JSON.stringify(v)}`);
  }
  return `{\n${lines.join(',\n')}\n  }`;
};

const emitFile = (fileName, constName, items) => {
  const body = items.map(([id, obj]) => `  "${id}": ${obj}`).join(',\n');
  const out = `import type { Item } from '../../types/item.types';\n\nexport const ${constName} = {\n${body}\n} satisfies Record<string, Item>;\n`;
  fs.writeFileSync(path.join(ITEMS_DIR, `${fileName}.ts`), out);
  console.log(`✔ ${fileName}.ts (${items.length} itens)`);
};

// ── armas 1H ──
const w1hCategory = (numId) => (numId < 1100 ? 'sword_one' : numId < 1150 ? 'dagger' : numId < 1200 ? 'staff_one' : 'bow_short');
emitFile('weapons1h', 'weapons1h', W1H.map(([id, numId, rar, lvl, icon, names, pairs]) => {
  const P = pairsToObj(pairs);
  registerNames(id, names, 'weapon1h');
  totalNew++;
  return [id, buildItemObj({
    id, numId, icon, rarity: R[rar], type: 'weapon_main', slot: 'weapon_main', requireLevel: lvl,
    nameKey: `itemNames.${id}.name`, descKey: `itemNames.${id}.desc`,
    isTwoHanded: false, weaponCategory: w1hCategory(numId),
    stats: statsFromPairs(P), effects: effectsFromPairs(P)
  })];
}));

// ── armas 2H (+ preserva eclipse_halberd) ──
const oldW2hSrc = fs.readFileSync(path.join(ITEMS_DIR, 'weapons2h.ts'), 'utf8');
const oldW2h = eval(oldW2hSrc.replace(/import[^;]+;/g, '').replace(/export const \w+ =/, 'const X =').replace(/satisfies[^;]+;?\s*$/m, '') + '; X');
const halberd = oldW2h.eclipse_halberd_epic_2h;
const w2hCategory = (numId) => (numId < 1600 ? 'great_sword' : numId < 1650 ? 'hammer' : numId < 1700 ? 'spear' : numId < 1750 ? 'bow_long' : 'staff_two');
const w2hItems = W2H.map(([id, numId, rar, lvl, icon, names, pairs]) => {
  const P = pairsToObj(pairs);
  registerNames(id, names, 'weapon2h');
  totalNew++;
  return [id, buildItemObj({
    id, numId, icon, rarity: R[rar], type: 'weapon_main', slot: 'weapon_main', requireLevel: lvl,
    nameKey: `itemNames.${id}.name`, descKey: `itemNames.${id}.desc`,
    isTwoHanded: true, weaponCategory: w2hCategory(numId),
    stats: statsFromPairs(P), effects: effectsFromPairs(P)
  })];
});
w2hItems.push(['eclipse_halberd_epic_2h', buildItemObj(halberd)]);
emitFile('weapons2h', 'weapons2h', w2hItems);

// ── off-hand ──
emitFile('offHand', 'offHand', OH.map(([id, numId, rar, lvl, icon, names, pairs, cat]) => {
  const P = pairsToObj(pairs);
  registerNames(id, names, 'offhand');
  totalNew++;
  return [id, buildItemObj({
    id, numId, icon, rarity: R[rar], type: 'weapon_off', slot: 'weapon_off', requireLevel: lvl,
    nameKey: `itemNames.${id}.name`, descKey: `itemNames.${id}.desc`,
    isTwoHanded: false, weaponCategory: cat,
    stats: statsFromPairs(P), effects: effectsFromPairs(P)
  })];
}));

// ── armaduras/acessórios genéricos ──
const emitGear = (fileName, constName, list, slot, descKey, extra) => {
  emitFile(fileName, constName, list.map(([id, numId, rar, lvl, icon, names, pairs]) => {
    const P = pairsToObj(pairs);
    registerNames(id, names, descKey);
    totalNew++;
    return [id, buildItemObj({
      id, numId, icon, rarity: R[rar], type: extra?.type ?? (descKey === 'accessory' ? 'accessory' : 'armor'),
      slot, requireLevel: lvl,
      nameKey: `itemNames.${id}.name`, descKey: `itemNames.${id}.desc`,
      stats: statsFromPairs(P), effects: effectsFromPairs(P)
    })];
  }));
};
emitGear('head', 'head', HEAD, 'head', 'armor');
emitGear('chest', 'chest', CHEST, 'chest', 'armor');
emitGear('legs', 'legs', LEGS, 'legs', 'armor');
emitGear('gloves', 'gloves', GLOVES, 'gloves', 'armor');
emitGear('boots', 'boots', BOOTS, 'boots', 'armor');
emitGear('earrings', 'earrings', EARRINGS, 'earring', 'accessory');
emitGear('necklaces', 'necklaces', NECKLACES, 'necklace', 'accessory');
emitGear('belts', 'belts', BELTS, 'belt', 'accessory');
emitGear('resistances', 'resistances', RESIST, 'resistance', 'accessory');
emitGear('amulets', 'amulets', AMULETS, 'amulet', 'accessory');

// ── pedras espirituais ──
emitFile('spiritStones', 'spiritStones', STONES.map(([id, numId, rar, lvl, icon, names, pairs, element, effect]) => {
  const P = pairsToObj(pairs);
  registerNames(id, names, 'spirit_stone');
  totalNew++;
  const onHit = P.find((p) => [61, 62, 63, 64, 65, 66].includes(p.effectId));
  const tier = { u: 1, r: 2, e: 3, l: 4, R: 5 }[rar];
  return [id, buildItemObj({
    id, numId, icon, rarity: R[rar], type: 'spirit_stone', slot: 'spirit_stone', requireLevel: lvl,
    nameKey: `itemNames.${id}.name`, descKey: `itemNames.${id}.desc`,
    stats: statsFromPairs(P), effects: effectsFromPairs(P),
    spiritStone: { element, level: tier, maxLevel: 10, effect, effectChance: onHit ? onHit.value / 100 : 0.12 }
  })];
}));

// ── pets ──
emitFile('pets', 'pets', PETS.map(([id, numId, rar, lvl, icon, names, pairs, abilityType, abilityValue, abilityKey]) => {
  const P = pairsToObj(pairs);
  registerNames(id, names, 'pet');
  totalNew++;
  const hp = P.find((p) => p.effectId === 82)?.value ?? 60;
  const atk = P.find((p) => p.effectId === 81)?.value ?? 5;
  return [id, buildItemObj({
    id, numId, icon, rarity: R[rar], type: 'pet', slot: 'pet', requireLevel: lvl,
    nameKey: `itemNames.${id}.name`, descKey: `itemNames.${id}.desc`,
    stats: statsFromPairs(P), effects: effectsFromPairs(P),
    petData: {
      hp, maxHp: hp, atk, def: Math.max(1, Math.round(hp / 20)),
      level: 1, maxLevel: 50, xp: 0, xpToNext: 100,
      abilityType, abilityValue, abilityKey: `pet.abilities.${abilityKey}`,
      isAlive: true, cooldown: 0
    }
  })];
}));

// ── montarias ──
emitFile('mounts', 'mounts', MOUNTS.map(([id, numId, rar, lvl, icon, names, pairs]) => {
  const P = pairsToObj(pairs);
  registerNames(id, names, 'mount');
  totalNew++;
  const speed = P.find((p) => p.effectId === 91)?.value ?? 20;
  return [id, buildItemObj({
    id, numId, icon, rarity: R[rar], type: 'mount', slot: 'mount', requireLevel: lvl,
    nameKey: `itemNames.${id}.name`, descKey: `itemNames.${id}.desc`,
    stats: statsFromPairs(P), effects: effectsFromPairs(P),
    mountData: { exploreReduction: speed / 100, bonusStats: statsFromPairs(P.filter((p) => p.effectId !== 91)) }
  })];
}));

// ── materiais: preserva existentes + adiciona novos ──
const oldMatSrc = fs.readFileSync(path.join(ITEMS_DIR, 'materials.ts'), 'utf8');
const oldMat = eval(oldMatSrc.replace(/import[^;]+;/g, '').replace(/export const \w+ =/, 'const X =').replace(/satisfies[^;]+;?\s*$/m, '') + '; X');
const matItems = Object.entries(oldMat).map(([id, obj]) => [id, buildItemObj(obj)]);
for (const [id, numId, rar, lvl, icon, names, pairs] of MATERIALS_NEW) {
  const P = pairsToObj(pairs);
  registerNames(id, names, 'material');
  totalNew++;
  matItems.push([id, buildItemObj({
    id, numId, icon, rarity: R[rar], type: 'material', slot: 'material', requireLevel: lvl,
    nameKey: `itemNames.${id}.name`, descKey: `itemNames.${id}.desc`,
    effects: effectsFromPairs(P)
  })]);
}
emitFile('materials', 'materials', matItems);

// ── itemNames.ts: merge (mantém itens preservados, substitui o resto) ──
const oldNamesSrc = fs.readFileSync(path.join(ROOT, 'client/src/data/itemNames.ts'), 'utf8');
const oldNames = eval(oldNamesSrc.replace(/export const itemNames[^=]*=/, 'const X =').replace(/;\s*$/m, '') + '; X');
const keptIds = new Set([...Object.keys(oldMat), 'eclipse_halberd_epic_2h']);
// especiais: ler direto do arquivo
const specialsSrc = fs.readFileSync(path.join(ITEMS_DIR, 'specials.ts'), 'utf8');
const specials = eval(specialsSrc.replace(/import[^;]+;/g, '').replace(/export const \w+ =/, 'const X =').replace(/satisfies[^;]+;?\s*$/m, '') + '; X');
Object.keys(specials).forEach((id) => keptIds.add(id));

const mergedNames = {};
for (const id of keptIds) if (oldNames[id]) mergedNames[id] = oldNames[id];
Object.assign(mergedNames, allNames);
const namesBody = Object.entries(mergedNames).map(([id, langs]) => `  "${id}": ${JSON.stringify(langs, null, 2).split('\n').map((l, i) => (i === 0 ? l : '  ' + l)).join('\n')}`).join(',\n');
fs.writeFileSync(path.join(ROOT, 'client/src/data/itemNames.ts'), `export const itemNames: Record<string, Record<'pt-BR' | 'en-US' | 'es-ES' | 'ja-JP', { name: string; desc: string }>> = {\n${namesBody}\n};\n`);
console.log(`✔ itemNames.ts (${Object.keys(mergedNames).length} entradas)`);

// ── shop.ts ──
const SHOP = [
  ['w1h_1000', 120, 'weapon', 1], ['w1h_1100', 100, 'weapon', 1], ['w1h_1150', 140, 'weapon', 1], ['w1h_1200', 120, 'weapon', 1],
  ['w2h_1500', 260, 'weapon', 5], ['w2h_1700', 260, 'weapon', 5], ['w1h_1002', 420, 'weapon', 8], ['w2h_1751', 520, 'weapon', 12],
  ['w1h_1003', 650, 'weapon', 12], ['w1h_1004', 1200, 'weapon', 18],
  ['oh_2000', 160, 'weapon', 1], ['oh_2002', 520, 'weapon', 10], ['oh_2150', 480, 'weapon', 8],
  ['hd_2500', 150, 'armor', 1], ['ch_3000', 220, 'armor', 1], ['lg_3500', 180, 'armor', 1], ['gl_4000', 140, 'armor', 1], ['bt_4500', 140, 'armor', 1],
  ['hd_2502', 480, 'armor', 8], ['ch_3002', 620, 'armor', 10], ['lg_3502', 520, 'armor', 10],
  ['er_5000', 200, 'accessory', 1], ['nk_5500', 220, 'accessory', 1], ['bt_6000', 180, 'accessory', 1],
  ['rs_6500', 240, 'accessory', 2], ['am_7000', 260, 'accessory', 1], ['ss_7500', 800, 'accessory', 10], ['ss_7550', 800, 'accessory', 10],
  ['pt_8000', 400, 'pet', 1], ['pt_8001', 450, 'pet', 5], ['pt_8050', 900, 'pet', 10],
  ['mt_8500', 600, 'mount', 1], ['mt_8501', 1100, 'mount', 10], ['mt_8502', 2400, 'mount', 20]
];
const shopBody = SHOP.map(([itemId, price, category, requireLevel]) => `  {\n    itemId: '${itemId}',\n    price: ${price},\n    category: '${category}',\n    requireLevel: ${requireLevel}\n  }`).join(',\n');
fs.writeFileSync(path.join(ROOT, 'client/src/data/shop.ts'), `export type ShopCategory = 'weapon' | 'armor' | 'accessory' | 'pet' | 'mount';\n\nexport interface ShopEntry {\n  itemId: string;\n  price: number;\n  category: ShopCategory;\n  requireLevel?: number;\n}\n\nexport const shop: ShopEntry[] = [\n${shopBody}\n];\n`);
console.log(`✔ shop.ts (${SHOP.length} entradas)`);

console.log(`\nTotal de itens novos do spec: ${totalNew}`);
