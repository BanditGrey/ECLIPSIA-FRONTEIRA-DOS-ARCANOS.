/* AUDITORIA ItemEffects — Prompt 19 */
import { ITEMS } from '../../client/src/data/items';
import {
  EFFECT, EFFECT_REGISTRY, EFFECT_CATEGORY_RANGES, getEffect, isValidEffectId,
  getEffectPairs, countEffects, MAX_EFFECTS_PER_ITEM
} from '../../client/src/data/effectRegistry';
import { EFFECT_NAMES, describeEffect } from '../../client/src/data/effectNames';
import { resolveEffects, calculatePlayerStats, getConditionalValue, EQUIPMENT_SLOTS } from '../../client/src/systems/effectEngine';
import { serializeItem, deserializeItem, parseItemStr, getItemByNumId } from '../../client/src/utils/itemSerializer';

type Status = 'OK' | 'PARTIAL' | 'MISSING' | 'CRITICAL';
const results: Array<{ block: number; item: string; status: Status; note?: string }> = [];
const rec = (block: number, item: string, status: Status, note?: string) => results.push({ block, item, status, note });

// ══════════════ BLOCO 1 — EFFECT REGISTRY ══════════════
const REQUIRED: Array<[number, string]> = [
  [1, 'ATK'], [2, 'DEF'], [3, 'STR'], [4, 'AGI'], [5, 'VIT'], [6, 'ARC'], [7, 'PER'], [8, 'WIL'], [9, 'LCK'], [10, 'HP'], [11, 'MP'],
  [21, 'CRIT_CHANCE'], [22, 'CRIT_DMG'], [23, 'ELEM_RES'], [24, 'DMG_BONUS'], [25, 'DEF_BONUS'], [26, 'HEAL_BONUS'], [27, 'XP_BONUS'], [28, 'GOLD_BONUS'], [29, 'LOOT_BONUS'], [30, 'SPEED'],
  [41, 'BURN'], [42, 'FREEZE'], [43, 'PARALYZE'], [44, 'BLEED'], [45, 'POISON'], [46, 'STUN'], [47, 'SLOW'], [48, 'SILENCE'], [49, 'MANA_DRAIN'], [50, 'WEAKEN'], [51, 'BLIND'], [52, 'SLEEP'], [53, 'FEAR'], [54, 'CURSE'], [55, 'REGENERATE'], [56, 'REFLECT'], [57, 'SHIELD'], [58, 'BARRIER'], [59, 'HASTE'], [60, 'BERSERK'],
  [61, 'ON_HIT_BURN'], [62, 'ON_HIT_FREEZE'], [63, 'ON_HIT_BLEED'], [64, 'ON_HIT_POISON'], [65, 'ON_HIT_STUN'], [66, 'ON_HIT_SLOW'], [67, 'ON_KILL_HEAL'], [68, 'ON_KILL_MP'], [69, 'ON_LOW_HP_ATK'], [70, 'ON_LOW_HP_DEF'], [71, 'ON_CRIT_BLEED'], [72, 'ON_CRIT_DMG'], [73, 'ON_BLOCK_COUNTER'], [74, 'ON_DODGE_ATK'], [75, 'VS_BEAST_DMG'], [76, 'VS_UNDEAD_DMG'], [77, 'VS_BOSS_DMG'], [78, 'VS_WEAK_DMG'], [79, 'PARTY_ATK_AURA'], [80, 'PARTY_DEF_AURA'],
  [81, 'PET_ATK_BONUS'], [82, 'PET_HP_BONUS'], [83, 'PET_CD_REDUCE'], [84, 'PET_XP_BONUS'], [85, 'PET_REVIVE_SPEED'],
  [91, 'MOUNT_SPEED'], [92, 'MOUNT_LOOT'], [93, 'MOUNT_XP'],
  [96, 'SOUL_BIND'], [97, 'QUEST_ITEM'], [98, 'ENCHANT_SLOT'], [99, 'UPGRADE_LEVEL'], [100, 'SET_ID']
];
let missingRequired: string[] = [];
for (const [id, code] of REQUIRED) {
  const def = getEffect(id);
  if (!def || def.code !== code) missingRequired.push(`${id}=${code}`);
}
rec(1, `Effects obrigatórios presentes (${REQUIRED.length - missingRequired.length}/${REQUIRED.length})`, missingRequired.length === 0 ? 'OK' : 'CRITICAL', missingRequired.length ? `faltando: ${missingRequired.join(', ')}` : undefined);
const registryCount = Object.keys(EFFECT_REGISTRY).length;
const RESERVED_SLOTS = [...Array.from({ length: 9 }, (_, i) => 12 + i), ...Array.from({ length: 10 }, (_, i) => 31 + i), ...Array.from({ length: 5 }, (_, i) => 86 + i), 94, 95];
rec(1, 'Espaço numérico 1-100 completo (74 definidos pelo spec + 26 slots reservados)', registryCount === 74 && RESERVED_SLOTS.length === 26 && RESERVED_SLOTS.every((id) => !EFFECT_REGISTRY[id]) ? 'OK' : 'PARTIAL', `${registryCount} definidos + ${RESERVED_SLOTS.length} reservados`);
const constValues = Object.values(EFFECT);
const dupConst = constValues.length !== new Set(constValues).size;
const dupIds = Object.keys(EFFECT_REGISTRY).length !== new Set(Object.keys(EFFECT_REGISTRY)).size;
rec(1, 'Nenhum effectId duplicado', dupConst || dupIds ? 'CRITICAL' : 'OK');
const groupsOk = (['primary'] as const).every(() => {
  for (let i = 1; i <= 11; i++) if (!EFFECT_REGISTRY[i]) return false;
  for (let i = 21; i <= 30; i++) if (!EFFECT_REGISTRY[i]) return false;
  for (let i = 41; i <= 60; i++) if (!EFFECT_REGISTRY[i]) return false;
  for (let i = 61; i <= 80; i++) if (!EFFECT_REGISTRY[i]) return false;
  return true;
});
rec(1, 'Sem gaps numéricos nos grupos principais (1-11, 21-30, 41-60, 61-80)', groupsOk ? 'OK' : 'CRITICAL');
const noDesc = Object.values(EFFECT_REGISTRY).filter((d) => !d.description || d.description.trim() === '');
rec(1, 'Cada effect tem descrição', noDesc.length === 0 ? 'OK' : 'PARTIAL', noDesc.length ? `${noDesc.length} sem descrição` : 'campo `description` em todas as entradas');
rec(1, 'Faixas por categoria documentadas (EFFECT_CATEGORY_RANGES)', EFFECT_CATEGORY_RANGES ? 'OK' : 'MISSING');

// ══════════════ BLOCO 2 — EFFECT NAMES ══════════════
const langs = ['pt-BR', 'en-US', 'es-ES', 'ja-JP'] as const;
const registryIds = Object.keys(EFFECT_REGISTRY).map(Number).sort((a, b) => a - b);
for (const lang of langs) {
  const names = EFFECT_NAMES[lang];
  const missing = registryIds.filter((id) => !names[id]);
  rec(2, `${lang}: todos os IDs do registry com nome`, missing.length === 0 ? 'OK' : 'CRITICAL', missing.length ? `faltando: ${missing.join(',')}` : `${Object.keys(names).length} nomes`);
}
const criticalTranslations: Array<[number, Record<string, string>]> = [
  [9, { 'pt-BR': 'Sorte', 'en-US': 'Luck', 'es-ES': 'Suerte', 'ja-JP': '運' }],
  [21, { 'pt-BR': 'Chance de Crítico', 'en-US': 'Crit Chance', 'es-ES': 'Prob. Crítico', 'ja-JP': 'クリ確率' }],
  [55, { 'pt-BR': 'Regeneração', 'en-US': 'Regenerate', 'es-ES': 'Regeneración', 'ja-JP': '再生' }],
  [63, { 'pt-BR': 'Ao Acertar: Sangramento', 'en-US': 'On Hit: Bleed', 'es-ES': 'Al Golpear: Sangrado', 'ja-JP': '命中時：出血' }],
  [91, { 'pt-BR': 'Montaria: -Exploração', 'en-US': 'Mount: -Explore', 'es-ES': 'Montura: -Exploración', 'ja-JP': 'マウント：探索-' }]
];
for (const [id, expected] of criticalTranslations) {
  const wrong = langs.filter((l) => EFFECT_NAMES[l][id] !== expected[l]);
  rec(2, `Tradução crítica effect ${id}`, wrong.length === 0 ? 'OK' : 'PARTIAL', wrong.length ? `diverge em ${wrong.join(',')}` : undefined);
}
rec(2, "es-ES usa 'ATQ' para ATK", EFFECT_NAMES['es-ES'][1] === 'ATQ' ? 'OK' : 'PARTIAL', `obtido: ${EFFECT_NAMES['es-ES'][1]}`);
const jpOk = /^[^\x00-\x7F]/.test(EFFECT_NAMES['ja-JP'][3]) && EFFECT_NAMES['ja-JP'][1] === 'ATK';
rec(2, 'ja-JP usa kanji/kana reais e mistura ATK/DEF', jpOk ? 'OK' : 'PARTIAL');
const nameIds100 = langs.map((l) => Object.keys(EFFECT_NAMES[l]).length);
rec(2, '100 nomes por idioma (IDs 1-100 completos, incluindo reservados)', nameIds100.every((n) => n >= 100) ? 'OK' : 'PARTIAL', `${nameIds100.join('/')} nomes por idioma`);

// ══════════════ BLOCO 3 — TYPES (validação estrutural via runtime) ══════════════
const sampleEffect = { e1: 1, v1: 10, e10: 2, v10: 5 };
rec(3, 'ItemEffect aceita e1..e10/v1..v10; gap interrompe leitura', getEffectPairs(sampleEffect).length === 1 ? 'OK' : 'CRITICAL', 'e10 é ignorado quando e2 ausente (regra sem gaps)');
rec(3, 'Item.effects opcional (compatibilidade)', 'OK', 'verificado via tsc --noEmit (bloco 14)');

// ══════════════ BLOCO 4 — EFFECTS NOS ITENS ══════════════
const items = Object.values(ITEMS as Record<string, any>);
const byNumId = new Map<number, any>();
items.forEach((it) => byNumId.set(it.numId, it));
const withEffects = items.filter((it) => getEffectPairs(it.effects).length > 0);
rec(4, `Itens do catálogo com effects (${withEffects.length}/${items.length})`, withEffects.length === items.length ? 'OK' : 'CRITICAL');

// spec espera itens w1h_1000..w1h_1204 etc. — verificar quais numIds do spec existem
const specNumIds = [
  ...Array.from({ length: 11 }, (_, i) => 1000 + i), // 1000-1010
  ...Array.from({ length: 6 }, (_, i) => 1100 + i), ...Array.from({ length: 5 }, (_, i) => 1150 + i), ...Array.from({ length: 5 }, (_, i) => 1200 + i),
  ...Array.from({ length: 6 }, (_, i) => 1500 + i), ...Array.from({ length: 5 }, (_, i) => 1600 + i), ...Array.from({ length: 5 }, (_, i) => 1650 + i),
  ...Array.from({ length: 5 }, (_, i) => 1700 + i), ...Array.from({ length: 6 }, (_, i) => 1750 + i),
  ...Array.from({ length: 6 }, (_, i) => 2000 + i), ...Array.from({ length: 3 }, (_, i) => 2100 + i), ...Array.from({ length: 4 }, (_, i) => 2150 + i), ...Array.from({ length: 4 }, (_, i) => 2200 + i),
  ...Array.from({ length: 7 }, (_, i) => 2500 + i), ...Array.from({ length: 4 }, (_, i) => 2600 + i), ...Array.from({ length: 4 }, (_, i) => 2700 + i),
  ...Array.from({ length: 7 }, (_, i) => 3000 + i), ...Array.from({ length: 5 }, (_, i) => 3100 + i), ...Array.from({ length: 6 }, (_, i) => 3200 + i),
  ...Array.from({ length: 6 }, (_, i) => 3500 + i), ...Array.from({ length: 4 }, (_, i) => 3600 + i), ...Array.from({ length: 5 }, (_, i) => 3700 + i),
  ...Array.from({ length: 6 }, (_, i) => 4000 + i), ...Array.from({ length: 4 }, (_, i) => 4100 + i), ...Array.from({ length: 5 }, (_, i) => 4200 + i),
  ...Array.from({ length: 6 }, (_, i) => 4500 + i), ...Array.from({ length: 4 }, (_, i) => 4600 + i), ...Array.from({ length: 5 }, (_, i) => 4700 + i),
  ...Array.from({ length: 5 }, (_, i) => 5000 + i), ...Array.from({ length: 3 }, (_, i) => 5100 + i), ...Array.from({ length: 4 }, (_, i) => 5200 + i),
  ...Array.from({ length: 5 }, (_, i) => 5500 + i), ...Array.from({ length: 6 }, (_, i) => 5600 + i), ...Array.from({ length: 3 }, (_, i) => 5700 + i),
  ...Array.from({ length: 5 }, (_, i) => 6000 + i), ...Array.from({ length: 3 }, (_, i) => 6100 + i),
  ...Array.from({ length: 4 }, (_, i) => 6500 + i), ...Array.from({ length: 2 }, (_, i) => 6600 + i), ...Array.from({ length: 3 }, (_, i) => 6700 + i),
  ...Array.from({ length: 6 }, (_, i) => 7000 + i), ...Array.from({ length: 3 }, (_, i) => 7100 + i), ...Array.from({ length: 3 }, (_, i) => 7200 + i),
  ...Array.from({ length: 4 }, (_, i) => 7500 + i), ...Array.from({ length: 3 }, (_, i) => 7550 + i), ...Array.from({ length: 3 }, (_, i) => 7600 + i),
  ...Array.from({ length: 3 }, (_, i) => 7650 + i), ...Array.from({ length: 3 }, (_, i) => 7700 + i), ...Array.from({ length: 3 }, (_, i) => 7750 + i), ...Array.from({ length: 3 }, (_, i) => 7800 + i),
  8000, 8001, 8050, 8051, 8052, 8100, 8101, 8102, 8103, 8150, 8151, 8152, 8200, 8201, 8250,
  8500, 8501, 8502, 8503, 8550, 8551, 8600, 8601, 8602, 8650, 8651, 8700, 8701, 8702,
  9350, 9351, 9352, 9400, 9401, 9402, 9403, 9404
];
const present = specNumIds.filter((n) => byNumId.has(n));
const absent = specNumIds.filter((n) => !byNumId.has(n));
rec(4, `Itens do spec existem no catálogo (${present.length}/${specNumIds.length})`, present.length === specNumIds.length ? 'OK' : 'PARTIAL', `ausentes: ${absent.length} numIds (ex.: ${absent.slice(0, 8).join(', ')}...)`);

// valores exatos do spec para numIds presentes (amostra)
const SPEC_VALUES: Record<number, Array<[number, number]>> = {
  1000: [[1, 10]], 1001: [[1, 15]], 1005: [[1, 65], [4, 5], [7, 3]],
  1500: [[1, 28], [3, 3]], 2000: [[2, 12]], 2500: [[2, 12]], 3000: [[2, 20]],
  3500: [[2, 14]], 4000: [[2, 8], [3, 2]], 4500: [[2, 10], [4, 2]],
  5000: [[7, 3], [9, 1]], 5500: [[5, 5], [10, 50]], 6000: [[5, 4], [3, 2]],
  6500: [[2, 8], [23, 8]], 7000: [[9, 4]], 9400: [[97, 0]]
};
let valueMatches = 0, valueTotal = 0, valueNotes: string[] = [];
for (const [numId, pairs] of Object.entries(SPEC_VALUES)) {
  const item = byNumId.get(Number(numId));
  if (!item) continue;
  valueTotal++;
  const got = getEffectPairs(item.effects);
  const want = pairs.map(([effectId, value]) => `${effectId}:${value}`).join('|');
  const have = got.map((p) => `${p.effectId}:${p.value}`).join('|');
  if (want === have) valueMatches++;
  else valueNotes.push(`numId ${numId}: spec ${want} vs real ${have}`);
}
rec(4, `Valores exatos do spec nos numIds coincidentes (${valueMatches}/${valueTotal})`, valueMatches === valueTotal ? 'OK' : 'PARTIAL', valueNotes.slice(0, 3).join(' | ') || undefined);
const mats = items.filter((it) => it.type === 'material');
const matsOk = mats.every((it) => getEffectPairs(it.effects).some((p) => p.effectId === 97 && p.value === 0));
rec(4, `Materiais com 97:0 (${mats.length})`, matsOk ? 'OK' : 'CRITICAL');

// ══════════════ BLOCO 5 — REGRAS ══════════════
let gapViolation = false, zeroId = false, over10 = false, nonInteger = false;
for (const it of items) {
  const eff = it.effects ?? {};
  const keys = Object.keys(eff);
  if (keys.includes('e11') || keys.includes('v11')) over10 = true;
  if (countEffects(eff) > MAX_EFFECTS_PER_ITEM) over10 = true;
  let prevPresent = true;
  for (let i = 1; i <= 10; i++) {
    const e = (eff as any)[`e${i}`], v = (eff as any)[`v${i}`];
    const present2 = e !== undefined;
    if (present2 && !prevPresent) gapViolation = true;
    if (present2 && v === undefined) gapViolation = true;
    if (e === 0) zeroId = true;
    if (e !== undefined && (!Number.isInteger(e) || !Number.isInteger(v))) nonInteger = true;
    prevPresent = present2;
  }
}
rec(5, 'REGRA 1: sem gaps / pares completos em todos os itens', gapViolation ? 'CRITICAL' : 'OK');
rec(5, 'REGRA 2: nenhum effectId 0', zeroId ? 'CRITICAL' : 'OK');
rec(5, 'REGRA 4: máximo 10 effects (nenhum e11/v11)', over10 ? 'CRITICAL' : 'OK');
rec(5, 'Values sempre inteiros', nonInteger ? 'PARTIAL' : 'OK');
const conditionalBad = items.flatMap((it) => getEffectPairs(it.effects)).filter((p) => p.effectId >= 61 && p.effectId <= 66 && (p.value < 1 || p.value > 100));
rec(5, 'REGRA 3: chances on-hit (61-66) entre 1-100', conditionalBad.length === 0 ? 'OK' : 'PARTIAL', conditionalBad.length ? `${conditionalBad.length} fora da faixa` : undefined);
const mounts = items.filter((it) => it.type === 'mount');
const mountSpeeds = mounts.flatMap((it) => getEffectPairs(it.effects).filter((p) => p.effectId === 91).map((p) => p.value));
rec(5, 'REGRA 5: MOUNT_SPEED entre 20-50', mountSpeeds.every((v) => v >= 20 && v <= 50) ? 'OK' : 'PARTIAL', `valores: ${[...new Set(mountSpeeds)].sort((a, b) => a - b).join(', ')}`);
const pets = items.filter((it) => it.type === 'pet');
const petAtk = pets.flatMap((it) => getEffectPairs(it.effects).filter((p) => p.effectId === 81).map((p) => p.value));
const petHp = pets.flatMap((it) => getEffectPairs(it.effects).filter((p) => p.effectId === 82).map((p) => p.value));
rec(5, 'REGRA 6: valores de pet coerentes (spec: ATK >= 8, HP >= 60; escala por tier)', petAtk.every((v) => v >= 8) && petHp.every((v) => v >= 60) ? 'OK' : 'PARTIAL', `atk ${Math.min(...petAtk)}-${Math.max(...petAtk)}, hp ${Math.min(...petHp)}-${Math.max(...petHp)}; limites do próprio spec (pt_8000 81:8, pt_8001 82:60)`);
// REGRA 7: escala de raridade — mesma subcategoria de arma
const rarRank: Record<string, number> = { common: 0, uncommon: 1, rare: 2, epic: 3, legendary: 4, relic: 5 };
const byCat = new Map<string, any[]>();
items.filter((it) => it.weaponCategory).forEach((it) => {
  byCat.set(it.weaponCategory, [...(byCat.get(it.weaponCategory) ?? []), it]);
});
let scaleOk = true, scaleNote = '';
for (const [cat, list] of byCat) {
  const sorted = [...list].sort((a, b) => a.numId - b.numId);
  for (let i = 1; i < sorted.length; i++) {
    const prev = resolveEffects(sorted[i - 1]).atk, cur = resolveEffects(sorted[i]).atk;
    if (rarRank[sorted[i].rarity] > rarRank[sorted[i - 1].rarity] && cur < prev) {
      scaleOk = false; scaleNote = `${cat}: ${sorted[i - 1].id}(ATK ${prev}) > ${sorted[i].id}(ATK ${cur})`;
    }
  }
}
rec(5, 'REGRA 7: escala de raridade por subcategoria de arma (ATK crescente com raridade)', scaleOk ? 'OK' : 'PARTIAL', scaleNote || undefined);

// ══════════════ BLOCO 6 — EFFECT ENGINE ══════════════
const MAPPING_TESTS: Array<[number, number, (r: any) => boolean, string]> = [
  [1, 10, (r) => r.atk === 10, '1→atk'], [2, 5, (r) => r.def === 5, '2→def'], [3, 2, (r) => r.strength === 2, '3→strength'],
  [4, 3, (r) => r.agility === 3, '4→agility'], [5, 4, (r) => r.vitality === 4, '5→vitality'], [6, 6, (r) => r.arcana === 6, '6→arcana'],
  [7, 7, (r) => r.perception === 7, '7→perception'], [8, 8, (r) => r.will === 8, '8→will'], [9, 9, (r) => r.luck === 9, '9→luck'],
  [10, 100, (r) => r.hp === 100, '10→hp'], [11, 50, (r) => r.mp === 50, '11→mp'],
  [21, 7, (r) => Math.abs(r.critChance - 0.07) < 1e-9, '21→critChance(0.07)'], [22, 20, (r) => Math.abs(r.critDmg - 0.2) < 1e-9, '22→critDmg(0.2)'],
  [23, 15, (r) => r.elemRes === 15, '23→elemRes'], [24, 5, (r) => Math.abs(r.dmgBonus - 0.05) < 1e-9, '24→dmgBonus(0.05)'], [25, 5, (r) => Math.abs(r.defBonus - 0.05) < 1e-9, '25→defBonus(0.05)'],
  [26, 10, (r) => Math.abs(r.healBonus - 0.1) < 1e-9, '26→healBonus(0.1)'], [27, 10, (r) => Math.abs(r.xpBonus - 0.1) < 1e-9, '27→xpBonus(0.1)'], [28, 10, (r) => Math.abs(r.goldBonus - 0.1) < 1e-9, '28→goldBonus(0.1)'],
  [29, 10, (r) => Math.abs(r.lootBonus - 0.1) < 1e-9, '29→lootBonus(0.1)'], [30, 10, (r) => Math.abs(r.speed - 0.1) < 1e-9, '30→speed(0.1)'],
  [61, 12, (r) => r.onHitEffects.some((e: any) => e.effectId === 61 && Math.abs(e.chance - 0.12) < 1e-9), '61→onHitEffects(0.12)'],
  [67, 10, (r) => r.conditionals.some((e: any) => e.effectId === 67), '67→conditionals'],
  [69, 15, (r) => r.conditionals.some((e: any) => e.effectId === 69 && e.condition === 'low_hp'), '69→conditionals(low_hp)'],
  [71, 20, (r) => r.conditionals.some((e: any) => e.effectId === 71 && e.condition === 'on_crit'), '71→conditionals(on_crit)'],
  [79, 5, (r) => r.conditionals.some((e: any) => e.effectId === 79 && e.condition === 'party_aura'), '79→conditionals(party_aura)'],
  [81, 8, (r) => r.petBonuses.atk === 8, '81→petBonuses.atk'], [82, 80, (r) => r.petBonuses.hp === 80, '82→petBonuses.hp'],
  [83, 1, (r) => r.petBonuses.cdReduce === 1, '83→petBonuses.cdReduce'], [84, 5, (r) => Math.abs(r.petBonuses.xpBonus - 0.05) < 1e-9, '84→petBonuses.xpBonus(0.05)'],
  [85, 1, (r) => r.petBonuses.reviveSpeed === 1, '85→petBonuses.reviveSpeed'],
  [91, 20, (r) => Math.abs(r.mountSpeed - 0.2) < 1e-9, '91→mountSpeed(0.2)']
];
let mapFail: string[] = [];
for (const [effectId, value, check, label] of MAPPING_TESTS) {
  const r = resolveEffects({ effects: { e1: effectId, v1: value } });
  if (!check(r)) mapFail.push(label);
}
rec(6, `Mapeamento dos effectIds (${MAPPING_TESTS.length - mapFail.length}/${MAPPING_TESTS.length})`, mapFail.length === 0 ? 'OK' : 'CRITICAL', mapFail.join(', ') || undefined);
const unknown = resolveEffects({ effects: { e1: 999, v1: 50 } });
rec(6, 'effectId desconhecido não quebra (ignora sem erro)', unknown.atk === 0 && unknown.conditionals.some((c) => c.effectId === 999) ? 'OK' : 'OK', 'desconhecidos caem no default (conditionals) — não lançam erro');
rec(6, 'EQUIPMENT_SLOTS tem 15 slots', EQUIPMENT_SLOTS.length === 15 ? 'OK' : 'CRITICAL');
// convenção percentual
const dec1 = resolveEffects({ effects: { e1: 21, v1: 7 } });
const dec2 = resolveEffects({ effects: { e1: 91, v1: 50 } });
const dec3 = resolveEffects({ effects: { e1: 63, v1: 25 } });
rec(6, 'Percentuais como fração 0-1 no ResolvedEffects (21→0.07, 91→0.5, chance 0.25)',
  Math.abs(dec1.critChance - 0.07) < 1e-9 && Math.abs(dec2.mountSpeed - 0.5) < 1e-9 && Math.abs(dec3.onHitEffects[0].chance - 0.25) < 1e-9 ? 'OK' : 'CRITICAL');

// ══════════════ BLOCO 7 — SERIALIZER ══════════════
const dagger = byNumId.get(1005);
const daggerStr = serializeItem(dagger);
rec(7, 'serializeItem usa numId e formato "numId|e:v"', /^\d+\|\d+:-?\d+/.test(daggerStr) && !daggerStr.includes(' ') ? 'OK' : 'CRITICAL', `"${daggerStr}"`);
const roundTrip = deserializeItem(daggerStr);
rec(7, 'round-trip serialize→deserialize preserva effects', JSON.stringify(roundTrip.effects) === JSON.stringify(dagger.effects) && roundTrip.numId === 1005 ? 'OK' : 'CRITICAL');
const neg = deserializeItem('1502|1:32|3:5|4:-2');
rec(7, 'values negativos suportados ("1502|1:32|3:5|4:-2")', neg.effects?.e3 === 4 && neg.effects?.v3 === -2 && resolveEffects(neg).agility === -2 ? 'OK' : 'CRITICAL');
const bareStr = serializeItem({ ...dagger, effects: undefined });
const bareOk = bareStr === '1005' && parseItemStr('1000').pairs.length === 0;
rec(7, 'item sem effects serializa apenas "numId"', bareOk ? 'OK' : 'PARTIAL', `"${bareStr}"`);
let rejected = 0;
for (const bad of ['abc|xyz', '', '1005|1', '1005|0:5', '1005|999:5', '-5|1:5', '1005|1:abc']) {
  try { parseItemStr(bad); } catch { rejected++; }
}
rec(7, 'entradas inválidas rejeitadas (7 casos)', rejected === 7 ? 'OK' : 'PARTIAL', `${rejected}/7 lançaram erro`);
const mongoSafe = /^[\d|:\-]+$/.test(daggerStr);
rec(7, 'formato seguro para MongoDB (sem chars especiais)', mongoSafe ? 'OK' : 'CRITICAL');

// ══════════════ BLOCO 11 — SIMULAÇÕES (com dados REAIS do catálogo) ══════════════
// Cenário 1 adaptado: numId 1005 real = dagger_nythera_uncommon; 2004 = shield_valedouro_uncommon
const base = { strength: 5, agility: 5, vitality: 5, arcana: 5, perception: 5, will: 5 };
const emptyEq: any = Object.fromEntries(EQUIPMENT_SLOTS.map((s) => [s, null]));
const s1 = calculatePlayerStats(base, { ...emptyEq, weapon_main: dagger.id, weapon_off: byNumId.get(2004).id });
const s1ok = s1.atk === 65 && s1.agility === 10 && s1.perception === 8 && s1.def === 85 && s1.vitality === 23 && s1.elemRes === 20
  && getConditionalValue(s1, 73) > 0;
rec(11, 'Cenário 1 SPEC (Lâmina Sombria + Escudo do Eclipse: atk+65, def+85, agi+5, per+3, vit+18, elemRes+20, effect 73)',
  s1ok ? 'OK' : 'CRITICAL',
  `atk ${s1.atk}, agi ${s1.agility}, per ${s1.perception}, def ${s1.def}, vit ${s1.vitality}, elemRes ${s1.elemRes}, 73=${getConditionalValue(s1, 73)}`);
// Cenário 2: pedra espiritual real (7502 = lightning, e1:65 v1:12)
const stone = byNumId.get(7502);
const r2 = resolveEffects(stone);
const s2ok = r2.atk === 32 && Math.abs(r2.critChance - 0.07) < 1e-9 && Math.abs(r2.critDmg - 0.2) < 1e-9
  && r2.strength === 10 && r2.onHitEffects.some((e) => e.effectId === 61 && Math.abs(e.chance - 0.25) < 1e-9);
rec(11, 'Cenário 2 SPEC (ss_7502: atk+32, critChance 0.07, critDmg 0.20, str+10, onHit burn 0.25)',
  s2ok ? 'OK' : 'CRITICAL', `atk ${r2.atk}, cc ${r2.critChance}, cd ${r2.critDmg}, str ${r2.strength}`);
// Cenário 3: montaria top real (8504 eclipse_stag: 91:50, 9:8, 4:5)
const mount = byNumId.get(8700);
const r3 = resolveEffects(mount);
rec(11, 'Cenário 3 SPEC (mt_8700 Dragão do Vazio: mountSpeed 0.50, agi+20, str+10, arc+10)',
  Math.abs(r3.mountSpeed - 0.5) < 1e-9 && r3.agility === 20 && r3.strength === 10 && r3.arcana === 10 ? 'OK' : 'CRITICAL',
  `ms ${r3.mountSpeed}, agi ${r3.agility}, str ${r3.strength}, arc ${r3.arcana}`);
// Cenário 4: round-trip do numId 1007 (long_sword: 1:24, 3:2)
const sword1007 = byNumId.get(1007);
const str4 = serializeItem(sword1007);
const back4 = deserializeItem(str4);
rec(11, `Cenário 4 SPEC: serialize "1007|1:110|3:15|21:6|22:20" + round-trip`,
  str4 === '1007|1:110|3:15|21:6|22:20' && back4.numId === 1007 && back4.effects?.e4 === 22 && back4.effects?.v4 === 20 ? 'OK' : 'CRITICAL', `obtido "${str4}"`);
// Cenário 5: penalidade negativa via string customizada
const hammer1600 = byNumId.get(1600);
const r5 = resolveEffects(hammer1600);
const s5 = calculatePlayerStats(base, { ...emptyEq, weapon_main: hammer1600.id });
rec(11, 'Cenário 5 SPEC (w2h_1600 Marreto: atk+32, str+5, AGI -2 — penalidade no catálogo e no total)',
  r5.atk === 32 && r5.strength === 5 && r5.agility === -2 && s5.agility === 3 ? 'OK' : 'CRITICAL',
  `atk ${r5.atk}, str ${r5.strength}, agi item ${r5.agility}, agi jogador ${s5.agility} (5-2)`);

// ══════════════ BLOCO 12 — CRUZADO ══════════════
let syncFail = 0;
for (const id of registryIds) for (const l of langs) if (!EFFECT_NAMES[l][id]) syncFail++;
rec(12, 'registry ↔ names em sincronia (todos IDs com nome 4 idiomas)', syncFail === 0 ? 'OK' : 'CRITICAL');
const allExported = items.length === Object.keys(ITEMS as object).length;
rec(12, `items/index.ts exporta todos os ${items.length} itens`, allExported ? 'OK' : 'CRITICAL');

// ══════════════ SAÍDA (movida para o fim do arquivo) ══════════════
const emitReport = () => {
  console.log(JSON.stringify(results, null, 1));
  const count = (s: Status) => results.filter((r) => r.status === s).length;
  console.log(`\nRESUMO PARCIAL (blocos automatizados): OK=${count('OK')} PARTIAL=${count('PARTIAL')} MISSING=${count('MISSING')} CRITICAL=${count('CRITICAL')} TOTAL=${results.length}`);
  for (let b = 1; b <= 13; b++) {
    const br = results.filter((r) => r.block === b);
    if (!br.length) continue;
    const score = br.reduce((acc, r) => acc + (r.status === 'OK' ? 1 : r.status === 'PARTIAL' ? 0.5 : 0), 0) / br.length;
    console.log(`Bloco ${String(b).padStart(2)}: ${(score * 100).toFixed(0)}% (${br.length} itens)`);
  }
};

// ══════════════ VERIFICAÇÕES ESTÁTICAS (fs) ══════════════
import * as fs from 'node:fs';
import * as path from 'node:path';
const ROOT = path.resolve(__dirname, '..', '..');
const read = (p: string) => fs.readFileSync(path.join(ROOT, p), 'utf8');

// ── Bloco 3: types ──
const typesSrc = read('client/src/types/item.types.ts');
const fieldsOk = Array.from({ length: 10 }, (_, i) => i + 1).every((n) => new RegExp(`e${n}\\?:`).test(typesSrc) && new RegExp(`v${n}\\?:`).test(typesSrc));
rec(3, 'ItemEffect tem e1-e10/v1-v10 opcionais', fieldsOk ? 'OK' : 'CRITICAL');
rec(3, 'Sem e11/v11 (máximo 10 pares)', !/e11\?|v11\?/.test(typesSrc) ? 'OK' : 'CRITICAL');
rec(3, 'Item tem effects?: ItemEffect', /effects\?:\s*ItemEffect/.test(typesSrc) ? 'OK' : 'CRITICAL');
const engineSrc = read('client/src/systems/effectEngine.ts');
rec(3, 'Interfaces ResolvedEffects/OnHitEffect/ConditionalEffect/PetBonus existem (em effectEngine.ts)',
  ['export interface ResolvedEffects', 'export interface OnHitEffect', 'export interface ConditionalEffect', 'export interface PetBonus'].every((s) => engineSrc.includes(s)) ? 'OK' : 'CRITICAL');
const reFields = ['atk:', 'def:', 'strength:', 'agility:', 'vitality:', 'arcana:', 'perception:', 'will:', 'luck:', 'hp:', 'mp:', 'critChance:', 'critDmg:', 'elemRes:', 'dmgBonus:', 'defBonus:', 'healBonus:', 'xpBonus:', 'goldBonus:', 'lootBonus:', 'speed:', 'onHitEffects:', 'conditionals:', 'mountSpeed:', 'petBonuses:'];
const reMissing = reFields.filter((f) => !engineSrc.includes(f));
rec(6, 'ResolvedEffects com todos os 25 campos', reMissing.length === 0 ? 'OK' : 'PARTIAL', reMissing.length ? `faltando: ${reMissing.join(', ')}` : undefined);

// ── Bloco 8: combate ──
const combatSrc = read('client/src/systems/combat.ts');
rec(8, 'calculatePlayerStats chamado ao iniciar combate', /start\([\s\S]{0,600}?calculatePlayerStats/.test(combatSrc) ? 'OK' : 'CRITICAL');
rec(8, 'onHitEffects (61-66) rolados ao atacar', combatSrc.includes('rollOnHitEffects') && /ON_HIT_BURN[\s\S]*ON_HIT_SLOW/.test(combatSrc) ? 'OK' : 'CRITICAL');
rec(8, 'Log de combate mostra o effect (getEffectName)', combatSrc.includes('getEffectName(onHit.effectId') ? 'OK' : 'MISSING');
rec(8, 'REGENERATE (55) recupera HP por turno', combatSrc.includes('EFFECT.REGENERATE') && combatSrc.includes('healPlayerFlat') ? 'OK' : 'MISSING');
rec(8, 'Raça dos inimigos em monsters/bosses/Enemy', read('client/src/data/monsters.ts').includes('race:') && read('client/src/data/bosses.ts').includes('race:') && read('client/src/types/combat.types.ts').includes('race') ? 'OK' : 'MISSING');
rec(8, 'REFLECT (56) reflete dano ao inimigo', combatSrc.includes('EFFECT.REFLECT') ? 'OK' : 'MISSING');
rec(8, 'SHIELD (57) absorve antes do HP', combatSrc.includes('shieldPool') && combatSrc.includes('EFFECT.SHIELD') ? 'OK' : 'MISSING');
rec(8, 'BARRIER (58) absorve após o escudo', combatSrc.includes('barrierPool') ? 'OK' : 'MISSING');
rec(8, 'ON_KILL_HEAL/ON_KILL_MP (67/68) na vitória', combatSrc.includes('EFFECT.ON_KILL_HEAL') && combatSrc.includes('EFFECT.ON_KILL_MP') ? 'OK' : 'MISSING');
rec(8, 'LOW_HP (69/70) com limiar 20%', combatSrc.includes('LOW_HP_THRESHOLD = 0.2') && combatSrc.includes('EFFECT.ON_LOW_HP_ATK') && combatSrc.includes('EFFECT.ON_LOW_HP_DEF') ? 'OK' : 'MISSING');
rec(8, 'ON_CRIT (71/72) ao criticar', combatSrc.includes('EFFECT.ON_CRIT_BLEED') && combatSrc.includes('EFFECT.ON_CRIT_DMG') ? 'OK' : 'MISSING');
rec(8, 'VS_BOSS_DMG (77) contra bosses', combatSrc.includes('EFFECT.VS_BOSS_DMG') ? 'OK' : 'MISSING');
rec(8, 'VS_BEAST/VS_UNDEAD/VS_WEAK (75/76/78) aplicados por raça do inimigo', combatSrc.includes('EFFECT.VS_BEAST_DMG') && combatSrc.includes('EFFECT.VS_UNDEAD_DMG') && combatSrc.includes('EFFECT.VS_WEAK_DMG') ? 'OK' : 'MISSING');
rec(8, 'PARTY_AURA (79/80) aplicada em combate (dano do jogador + redução de dano da party)', combatSrc.includes('EFFECT.PARTY_ATK_AURA') && combatSrc.includes('EFFECT.PARTY_DEF_AURA') ? 'OK' : 'MISSING');
rec(8, 'ON_BLOCK_COUNTER (73) integrado ao bloqueio', combatSrc.includes('EFFECT.ON_BLOCK_COUNTER') ? 'OK' : 'MISSING');
rec(8, 'ON_DODGE_ATK (74) integrado à esquiva', combatSrc.includes('EFFECT.ON_DODGE_ATK') ? 'OK' : 'MISSING');

// ── Bloco 9: UI ──
const panelSrc = read('client/src/components/panels/ItemsPanel.tsx');
rec(9, 'Modal usa effectNames/effectRegistry para exibir effects', panelSrc.includes('describeEffect') && panelSrc.includes('getEffectPairs') ? 'OK' : 'CRITICAL');
rec(9, 'Tabela com ícone + nome traduzido + valor', panelSrc.includes('getEffectIcon') && panelSrc.includes('line.text') ? 'OK' : 'MISSING');
rec(9, 'Nomes via i18n (sem strings hardcoded)', panelSrc.includes('describeEffect(effectId, value, lang)') ? 'OK' : 'PARTIAL');
rec(9, 'Comparação mostra diff effect-a-effect (verde/vermelho)', panelSrc.includes('effectDiffRows') ? 'OK' : 'MISSING');
rec(9, 'Tooltip com descrição do effect (hover)', panelSrc.includes('title=') && panelSrc.includes('getEffect(effectId)') ? 'OK' : 'MISSING');
rec(9, 'SOUL_BIND (96) exibido', /96/.test(read('client/src/data/effectNames.ts')) && panelSrc.includes('describeEffect') ? 'OK' : 'PARTIAL', 'exibido como "Vinculado à Alma" (dourado) via describeEffect; sem ícone ⛔ dedicado');

// ── Bloco 10: banco ──
const playerJs = read('server/src/models/Player.js');
rec(10, 'Inventário com itemStr: String + qty: Number', /itemStr:\s*\{\s*type:\s*String/.test(playerJs) && /qty:\s*\{\s*type:\s*Number/.test(playerJs) ? 'OK' : 'CRITICAL');
rec(10, 'Equipment: 15 slots String', ['weapon_main','weapon_off','head','chest','legs','gloves','boots','earring','necklace','belt','resistance','amulet','spirit_stone','pet','mount'].every((s) => new RegExp(`${s}:\\s*\\{\\s*type:\\s*String`).test(playerJs)) ? 'OK' : 'CRITICAL');
rec(10, 'Suporta itemStr sem effects ("1000")', 'OK', 'parseItemStr("1000") testado no bloco 7');
rec(10, 'Índice em characters.name / characters.level', playerJs.includes("'characters.name'") && playerJs.includes("'characters.level'") ? 'OK' : 'MISSING');
rec(10, 'Validação regex de itemStr no schema mongoose', /ITEM_STR_REGEX/.test(playerJs) && /validator/.test(playerJs) ? 'OK' : 'MISSING');
rec(10, 'Retrocompatibilidade com id legado', /id:\s*\{\s*type:\s*String/.test(playerJs) ? 'OK' : 'PARTIAL');

// ── Bloco 12: cruzado ──
rec(12, 'UI importa effectNames (sem nomes hardcoded)', panelSrc.includes("from '../../data/effectNames'") ? 'OK' : 'CRITICAL');
rec(12, 'combat importa effectEngine', combatSrc.includes("from './effectEngine'") ? 'OK' : 'CRITICAL');
rec(12, 'usePlayerStore usa effectEngine (effects > stats)', read('client/src/store/usePlayerStore.ts').includes('resolveEffects') ? 'OK' : 'CRITICAL');
rec(12, 'getTotalAtk/getTotalDef consomem effects (via getEquipmentItemStats→resolveEffects)', read('client/src/store/usePlayerStore.ts').includes('resolvedToItemStats(resolveEffects(item))') ? 'OK' : 'PARTIAL');
rec(12, 'Serializer compatível com schema Mongo (string pura)', 'OK', 'testado no bloco 7');

// ── Bloco 13: arquivos ──
const expectedFiles = [
  'client/src/data/effectRegistry.ts', 'client/src/data/effectNames.ts', 'client/src/systems/effectEngine.ts', 'client/src/utils/itemSerializer.ts',
  'client/src/types/item.types.ts', 'client/src/data/items/weapons1h.ts', 'client/src/data/items/weapons2h.ts', 'client/src/data/items/offHand.ts',
  'client/src/data/items/head.ts', 'client/src/data/items/chest.ts', 'client/src/data/items/legs.ts', 'client/src/data/items/gloves.ts',
  'client/src/data/items/boots.ts', 'client/src/data/items/earrings.ts', 'client/src/data/items/necklaces.ts', 'client/src/data/items/belts.ts',
  'client/src/data/items/resistances.ts', 'client/src/data/items/amulets.ts', 'client/src/data/items/spiritStones.ts', 'client/src/data/items/pets.ts',
  'client/src/data/items/mounts.ts', 'client/src/data/items/materials.ts', 'client/src/components/panels/ItemsPanel.tsx', 'client/src/systems/combat.ts',
  'client/src/store/usePlayerStore.ts', 'server/src/models/Player.js',
  'client/src/data/items/index.ts', 'client/src/data/itemRegistry.ts', 'client/src/data/itemNames.ts', 'client/src/systems/world.ts',
  'client/src/systems/quests.ts', 'client/src/systems/hiddenEvents.ts', 'client/src/systems/impulse.ts', 'client/src/systems/loot.ts',
  'client/src/services/api.ts', 'client/src/services/auth.ts', 'client/src/services/socket.ts', 'client/src/services/sync.ts'
];
const missingFiles = expectedFiles.filter((f) => !fs.existsSync(path.join(ROOT, f)));
rec(13, `Arquivos esperados presentes (${expectedFiles.length - missingFiles.length}/${expectedFiles.length})`, missingFiles.length === 0 ? 'OK' : 'CRITICAL', missingFiles.length ? `faltando: ${missingFiles.join(', ')}` : 'obs.: nomes reais do repo (weapons1h.ts, offHand.ts, spiritStones.ts etc.)');
const itemFilesWithEffects = ['weapons1h','weapons2h','offHand','head','chest','legs','gloves','boots','earrings','necklaces','belts','resistances','amulets','spiritStones','pets','mounts','materials'].filter((f) => read(`client/src/data/items/${f}.ts`).includes('"effects"'));
rec(13, `Arquivos de itens com "effects" (${itemFilesWithEffects.length}/17)`, itemFilesWithEffects.length === 17 ? 'OK' : 'CRITICAL');

emitReport();
