/* eslint-disable */
// ⚙️ GERADOR — cria client/src/data/skills.ts + bloco i18n "skills" (4 idiomas)
// Uso: node tools/gen_skills.mjs  (da raiz do repo)
// As 29 skills existentes + 69 novas = 98 skills (7 por arma).

import fs from 'fs';

// [id, req, icon, mp, cd, campos..., nomes PT/EN/ES/JA]
const N = (id, prof, req, icon, mp, cd, data, pt, en, es, ja) => ({ id, prof, req, icon, mp, cd, data, pt, en, es, ja });

const SKILLS = [
  // ── ESPADA 1H ──
  N('spin_slash','sword_one',10,'⚔',30,2,{damageType:'physical',damagePercent:150},'Corte Giratório','Spin Slash','Tajo Giratorio','スピンスラッシュ'),
  N('slash','sword_one',5,'⚔',20,1,{damageType:'physical',damagePercent:130},'Corte Rápido','Quick Slash','Tajo Rápido','クイックスラッシュ'),
  N('dash_cut','sword_one',25,'💨',45,3,{damageType:'physical',damagePercent:200},'Corte Veloz','Dash Cut','Corte Veloz','ダッシュカット'),
  N('parry_counter','sword_one',35,'🛡',35,4,{damageType:'physical',damagePercent:120,stunTurns:1},'Contra-Apara','Parry Counter','Contraparada','パリーカウンター'),
  N('war_cry','sword_one',50,'📣',40,5,{defUpPercent:25,defUpTurns:3,healPercent:10},'Grito de Guerra','War Cry','Grito de Guerra','ウォークライ'),
  N('blade_flurry','sword_one',60,'🌀',70,5,{damageType:'physical',damagePercent:45,hits:4},'Flurry de Lâminas','Blade Flurry','Ráfaga de Hojas','ブレイドフラリー'),
  N('thousand_cuts','sword_one',80,'⚔',80,5,{damageType:'physical',damagePercent:40,hits:5},'Mil Cortes','Thousand Cuts','Mil Cortes','サウザンドカッツ'),

  // ── ESPADA LONGA ──
  N('long_swipe','sword_two',15,'🗡',30,2,{damageType:'physical',damagePercent:140},'Golpe Largo','Long Swipe','Golpe Largo','ロングスワイプ'),
  N('bleed','sword_two',40,'🩸',50,3,{dotDamage:40,dotTurns:3},'Sangramento','Bleed','Sangrado','ブリード'),
  N('iron_will','sword_two',45,'💪',40,5,{defUpPercent:35,defUpTurns:3},'Vontade de Ferro','Iron Will','Voluntad de Hierro','アイアンウィル'),
  N('deep_wound','sword_two',55,'🩸',55,4,{dotDamage:60,dotTurns:3},'Ferida Profunda','Deep Wound','Herida Profunda','ディープワウンド'),
  N('counter_gambit','sword_two',70,'⚔',50,5,{damageType:'physical',damagePercent:180,dodgeNext:true},'Gambito Contra','Counter Gambit','Gambito Contra','カウンターギャンビット'),
  N('cross_slash','sword_two',80,'❌',55,4,{damageType:'physical',damagePercent:180},'Corte Cruzado','Cross Slash','Tajo Cruzado','クロススラッシュ'),
  N('crescent_slash','sword_two',100,'🌙',75,6,{damageType:'physical',damagePercent:60,hits:3},'Corte Crescente','Crescent Slash','Tajo Creciente','クレセントスラッシュ'),

  // ── ESPADÃO ──
  N('brutal_slam','great_sword',15,'💥',35,3,{damageType:'physical',damagePercent:170,stunTurns:1},'Golpe Brutal','Brutal Slam','Golpe Brutal','ブルータルスラム'),
  N('cleave','great_sword',30,'⚔',45,4,{damageType:'physical',damagePercent:110,hits:2},'Fender','Cleave','Tajo Amplio','クリーブ'),
  N('battle_fury','great_sword',50,'🔥',45,5,{defUpPercent:25,defUpTurns:3,healPercent:15},'Fúria de Batalha','Battle Fury','Furia de Batalla','バトルフューリー'),
  N('execute','great_sword',60,'💀',100,8,{damageType:'physical',damagePercent:400,executeBelowHpPercent:20},'Executar','Execute','Ejecutar','エグゼキュート'),
  N('colossus_smash','great_sword',90,'🏔',85,7,{damageType:'physical',damagePercent:300},'Esmagada do Colosso','Colossus Smash','Golpe del Coloso','コロッサススマッシュ'),
  N('blade_storm','great_sword',120,'🌀',90,6,{damageType:'physical',damagePercent:90,hits:3},'Tempestade de Lâminas','Blade Storm','Tormenta de Hojas','ブレイドストーム'),
  N('onslaught','great_sword',140,'⚔',100,8,{damageType:'physical',damagePercent:35,hits:5},'Investida','Onslaught','Asalto','オンズロート'),

  // ── ADAGA ──
  N('stab','dagger',15,'🔪',25,2,{damageType:'physical',damagePercent:120,dotDamage:25,dotTurns:2},'Estocada','Stab','Estocada','スタブ'),
  N('smoke_bomb','dagger',35,'💨',35,5,{dodgeNext:true,defUpPercent:20,defUpTurns:2},'Bomba de Fumaça','Smoke Bomb','Bomba de Humo','スモークボム'),
  N('death_mark','dagger',10,'💀',40,4,{markDamageBonus:0.5,markTurns:3},'Marca da Morte','Death Mark','Marca de Muerte','デスマーク'),
  N('eviscerate','dagger',45,'🔪',50,4,{damageType:'physical',damagePercent:200},'Eviscerar','Eviscerate','Eviscerar','エビセレイト'),
  N('shadow_step','dagger',60,'👤',60,5,{damageType:'physical',damagePercent:180,dodgeNext:true},'Passo Sombrio','Shadow Step','Paso Sombrío','シャドウステップ'),
  N('fan_of_knives','dagger',80,'🎴',60,5,{damageType:'physical',damagePercent:50,hits:3},'Leque de Adagas','Fan of Knives','Abanico de Dagas','ファンオブナイフ'),
  N('assassinate','dagger',100,'🗡',90,7,{damageType:'physical',damagePercent:320,executeBelowHpPercent:25},'Assassinar','Assassinate','Asesinar','アサシネイト'),

  // ── ADAGA DE APOIO ──
  N('feint','dagger_off',15,'💨',25,2,{damageType:'physical',damagePercent:100,slowTurns:2},'Finta','Feint','Finta','フェイント'),
  N('double_slash','dagger_off',25,'⚔',35,3,{damageType:'physical',damagePercent:90,hits:2},'Corte Duplo','Double Slash','Tajo Doble','ダブルスラッシュ'),
  N('riposte','dagger_off',30,'🗡',35,3,{damageType:'physical',damagePercent:140,dodgeNext:true},'Riposta','Riposte','Riposta','リポスト'),
  N('lacerate','dagger_off',50,'🩸',45,4,{damageType:'physical',damagePercent:100,dotDamage:50,dotTurns:3},'Lacerar','Lacerate','Lacerar','ラセレイト'),
  N('twin_fang','dagger_off',70,'🦷',45,4,{damageType:'physical',damagePercent:80,hits:2},'Presas Gêmeas','Twin Fang','Colmillos Gemelos','ツインファング'),
  N('whirl_dagger','dagger_off',90,'🌀',65,5,{damageType:'physical',damagePercent:45,hits:4},'Adaga Giratória','Whirl Dagger','Daga Giratoria','ワールダガー'),
  N('shadow_parry','dagger_off',110,'🌑',70,6,{damageType:'physical',damagePercent:160,stunTurns:1,dodgeNext:true},'Apara Sombria','Shadow Parry','Parada Sombría','シャドウパリー'),

  // ── ARCO CURTO ──
  N('piercing_shot','bow_short',10,'🏹',30,2,{damageType:'physical',damagePercent:160,ignoreDef:true},'Disparo Perfurante','Piercing Shot','Disparo Perforante','ピアシングショット'),
  N('aimed_shot','bow_short',20,'🎯',35,3,{damageType:'physical',damagePercent:170,ignoreDef:true},'Disparo Mirado','Aimed Shot','Disparo Apuntado','エイムドショット'),
  N('quick_shot','bow_short',40,'💨',30,2,{damageType:'physical',damagePercent:100,slowTurns:1},'Disparo Rápido','Quick Shot','Disparo Rápido','クイックショット'),
  N('hunters_mark','bow_short',50,'🎯',35,4,{markDamageBonus:0.4,markTurns:3},'Marca do Caçador','Hunter\'s Mark','Marca del Cazador','ハンターズマーク'),
  N('scatter_shot','bow_short',70,'💥',55,5,{damageType:'physical',damagePercent:40,hits:3},'Disparo Disperso','Scatter Shot','Disparo Disperso','スキャッターショット'),
  N('kiting_shot','bow_short',90,'🏹',45,3,{damageType:'physical',damagePercent:110,slowTurns:2},'Disparo de Fuga','Kiting Shot','Disparo de Fuga','キティングショット'),
  N('rapid_fire','bow_short',110,'⚡',70,6,{damageType:'physical',damagePercent:35,hits:5},'Fogo Rápido','Rapid Fire','Fuego Rápido','ラピッドファイア'),

  // ── ARCO LONGO ──
  N('precision_shot','bow_long',25,'🎯',40,3,{damageType:'physical',damagePercent:180,ignoreDef:true},'Tiro de Precisão','Precision Shot','Tiro de Precisión','プレシジョンショット'),
  N('rain_of_arrows','bow_long',50,'🌧',70,5,{damageType:'physical',damagePercent:55,hits:4},'Chuva de Flechas','Rain of Arrows','Lluvia de Flechas','レインオブアローズ'),
  N('volley','bow_long',60,'🏹',60,5,{damageType:'physical',damagePercent:55,hits:3},'Rajada','Volley','Ráfaga','ボレー'),
  N('eagle_eye','bow_long',75,'🦅',40,5,{markDamageBonus:0.45,markTurns:3},'Olho de Águia','Eagle Eye','Ojo de Águila','イーグルアイ'),
  N('sniper_shot','bow_long',90,'🎯',65,5,{damageType:'physical',damagePercent:220,ignoreDef:true},'Tiro de Sniper','Sniper Shot','Disparo de Francotirador','スナイプショット'),
  N('wind_arrow','bow_long',100,'💨',50,4,{damageType:'physical',damagePercent:140,slowTurns:1},'Flecha do Vento','Wind Arrow','Flecha de Viento','ウィンドアロー'),
  N('dead_eye','bow_long',130,'☠',95,8,{damageType:'physical',damagePercent:260,executeBelowHpPercent:30},'Olho Morto','Dead Eye','Ojo Muerto','デッドアイ'),

  // ── CAJADO ──
  N('arcane_burst','staff_one',10,'💥',30,2,{damageType:'magical',damagePercent:150},'Rajada Arcana','Arcane Burst','Ráfaga Arcana','アーケインバースト'),
  N('arcane_missile','staff_one',20,'✨',30,2,{damageType:'magical',damagePercent:130},'Míssil Arcano','Arcane Missile','Misil Arcano','アーケインミサイル'),
  N('heal_pulse','staff_one',40,'💚',50,4,{healPercent:45},'Pulso de Cura','Heal Pulse','Pulso de Cura','ヒールパルス'),
  N('arcane_bind','staff_one',55,'🔗',45,5,{damageType:'magical',damagePercent:80,stunTurns:1},'Ligação Arcana','Arcane Bind','Vínculo Arcano','アーケインバインド'),
  N('mana_shield','staff_one',65,'💠',40,5,{defUpPercent:30,defUpTurns:3,healPercent:15},'Escudo de Mana','Mana Shield','Escudo de Maná','マナシールド'),
  N('greater_heal','staff_one',90,'💖',80,6,{healPercent:70},'Cura Maior','Greater Heal','Cura Mayor','グレーターヒール'),
  N('arcane_blast','staff_one',120,'🔮',85,7,{damageType:'magical',damagePercent:60,hits:3},'Explosão Arcana','Arcane Blast','Explosión Arcana','アーケインブラスト'),

  // ── CAJADO ARCANO ──
  N('frost_bolt','staff_two',20,'❄',35,3,{damageType:'magical',damagePercent:140,slowTurns:1},'Projétil de Gelo','Frost Bolt','Proyectil de Hielo','フロストボルト'),
  N('ice_nova','staff_two',40,'❄',55,4,{damageType:'magical',damagePercent:130,slowTurns:2},'Nova de Gelo','Ice Nova','Nova de Hielo','アイスノヴァ'),
  N('blizzard','staff_two',60,'🌨',70,6,{damageType:'magical',damagePercent:40,hits:4,slowTurns:1},'Nevasca','Blizzard','Ventisca','ブリザード'),
  N('arcane_armor','staff_two',75,'🛡',45,5,{defUpPercent:40,defUpTurns:3},'Armadura Arcana','Arcane Armor','Armadura Arcana','アーケインアーマー'),
  N('chain_lightning','staff_two',100,'⚡',90,6,{damageType:'magical',damagePercent:170},'Raio em Cadeia','Chain Lightning','Cadena de Rayos','チェーンライトニング'),
  N('elemental_chaos','staff_two',110,'🌪',80,7,{damageType:'magical',damagePercent:240},'Caos Elemental','Elemental Chaos','Caos Elemental','エレメンタルカオス'),
  N('time_warp','staff_two',140,'⏳',85,7,{markDamageBonus:0.5,markTurns:3},'Distorção Temporal','Time Warp','Distorsión Temporal','タイムワープ'),

  // ── ORBE ──
  N('void_bolt','orb',20,'🌑',35,3,{damageType:'void',damagePercent:150},'Projétil do Vazio','Void Bolt','Proyectil del Vacío','ヴォイドボルト'),
  N('void_rupture','orb',50,'💥',50,4,{damageType:'void',damagePercent:120,dotDamage:45,dotTurns:3},'Ruptura do Vazio','Void Rupture','Ruptura del Vacío','ヴォイドラプチャー'),
  N('astral_barrier','orb',60,'🔮',40,5,{defUpPercent:35,defUpTurns:3},'Barreira Astral','Astral Barrier','Barrera Astral','アストラルバリア'),
  N('gravity_well','orb',80,'🕳',55,5,{damageType:'void',damagePercent:100,stunTurns:1},'Poço Gravitacional','Gravity Well','Pozo Gravitatorio','グラビティウェル'),
  N('void_armor','orb',100,'🛡',45,5,{defUpPercent:35,defUpTurns:3,healPercent:10},'Armadura do Vazio','Void Armor','Armadura del Vacío','ヴォイドアーマー'),
  N('void_gate','orb',120,'🌑',110,8,{damageType:'void',damagePercent:300},'Portal do Vazio','Void Gate','Portal del Vacío','ヴォイドゲート'),
  N('cosmic_burst','orb',150,'🌟',100,8,{damageType:'void',damagePercent:40,hits:5},'Explosão Cósmica','Cosmic Burst','Explosión Cósmica','コズミックバースト'),

  // ── GRIMÓRIO ──
  N('arcane_mark','tome',15,'📖',30,3,{markDamageBonus:0.4,markTurns:3},'Marca Arcana','Arcane Mark','Marca Arcana','アーケインマーク'),
  N('root','tome',25,'🌿',40,4,{damageType:'magical',damagePercent:60,stunTurns:1},'Raízes','Root','Raíces','ルート'),
  N('petrify','tome',45,'🗿',55,6,{damageType:'magical',damagePercent:90,stunTurns:1},'Petrificar','Petrify','Petrificar','ペトリファイ'),
  N('arcane_ward','tome',60,'📖',45,4,{defUpPercent:30,defUpTurns:3,healPercent:25},'Guarda Arcano','Arcane Ward','Guardia Arcana','アーケインウォード'),
  N('rune_shield','tome',70,'🔷',45,5,{defUpPercent:45,defUpTurns:2},'Escudo Rúnico','Rune Shield','Escudo Rúnico','ルーンシールド'),
  N('draining_tome','tome',90,'📕',60,5,{damageType:'magical',damagePercent:100,healPercent:30},'Grimório Drenante','Draining Tome','Grimorio Drenante','ドレイニングトーム'),
  N('forbidden_knowledge','tome',130,'📜',95,8,{damageType:'magical',damagePercent:300},'Conhecimento Proibido','Forbidden Knowledge','Conocimiento Prohibido','フォービドゥンナレッジ'),

  // ── MARTELO ──
  N('crushing_blow','hammer',15,'🔨',30,2,{damageType:'physical',damagePercent:160},'Golpe Esmagador','Crushing Blow','Golpe Aplastante','クラッシングブロウ'),
  N('fortress','hammer',40,'🏰',45,5,{defUpPercent:40,defUpTurns:3},'Fortaleza','Fortress','Fortaleza','フォートレス'),
  N('earth_shake','hammer',50,'🌋',60,5,{damageType:'physical',damagePercent:50,hits:3,slowTurns:1},'Tremor de Terra','Earth Shake','Sacudida de Tierra','アースシェイク'),
  N('unbreakable','hammer',70,'⛓',40,5,{defUpPercent:50,defUpTurns:2},'Inquebrável','Unbreakable','Inquebrantable','アンブレイカブル'),
  N('war_stomp','hammer',85,'👢',55,5,{damageType:'physical',damagePercent:90,stunTurns:1},'Pisão de Guerra','War Stomp','Pisotón de Guerra','ウォースタンプ'),
  N('seismic_slam','hammer',100,'🌋',80,6,{damageType:'physical',damagePercent:250,stunTurns:1},'Impacto Sísmico','Seismic Slam','Impacto Sísmico','サイズミックスラム'),
  N('titan_fall','hammer',130,'🗿',90,7,{damageType:'physical',damagePercent:280},'Queda do Titã','Titan Fall','Caída del Titán','タイタンフォール'),

  // ── LANÇA ──
  N('precise_thrust','spear',15,'🔱',30,2,{damageType:'physical',damagePercent:150,ignoreDef:true},'Estocada Precisa','Precise Thrust','Estocada Precisa','プレサイズスラスト'),
  N('thorns','spear',30,'🌵',40,4,{reflectPercent:35,reflectTurns:3},'Espinhos','Thorns','Espinas','ソーンズ'),
  N('sweeping_strike','spear',40,'🔱',45,4,{damageType:'physical',damagePercent:85,hits:2},'Golpe Varrente','Sweeping Strike','Golpe Barrido','スウィーピングストライク'),
  N('serpent_spike','spear',60,'🐍',50,4,{damageType:'physical',damagePercent:100,dotDamage:40,dotTurns:3},'Espinho de Serpente','Serpent Spike','Espina de Serpiente','サーペントスパイク'),
  N('nature_burst','spear',80,'🌿',75,5,{damageType:'magical',damagePercent:200},'Explosão Natural','Nature Burst','Explosión Natural','ネイチャーバースト'),
  N('phalanx_ward','spear',90,'🏛',40,5,{defUpPercent:35,defUpTurns:3},'Guarda Falange','Phalanx Ward','Guardia Falange','ファランクスウォード'),
  N('dragon_lance','spear',120,'🐉',85,7,{damageType:'physical',damagePercent:260,slowTurns:1},'Lança do Dragão','Dragon Lance','Lanza del Dragón','ドラゴンランス'),

  // ── ESCUDO ──
  N('shield_bash','shield',10,'🛡',25,3,{damageType:'physical',damagePercent:120,stunTurns:1},'Investida de Escudo','Shield Bash','Embestida de Escudo','シールドバッシュ'),
  N('shield_slam','shield',20,'🛡',25,2,{damageType:'physical',damagePercent:130,slowTurns:1},'Esmagada de Escudo','Shield Slam','Golpe de Escudo','シールドスラム'),
  N('provoke','shield',35,'😡',30,4,{markDamageBonus:0.3,markTurns:3},'Provocar','Provoke','Provocar','プロヴォーク'),
  N('bastion','shield',50,'🏰',40,5,{defUpPercent:60,defUpTurns:2},'Bastião','Bastion','Bastión','バスティオン'),
  N('aegis_guard','shield',60,'🏛',50,6,{defUpPercent:50,defUpTurns:2,healPercent:15},'Guarda de Égide','Aegis Guard','Guardia de Égida','イージスガード'),
  N('shield_charge','shield',80,'💨',55,5,{damageType:'physical',damagePercent:180,stunTurns:1},'Carga de Escudo','Shield Charge','Carga de Escudo','シールドチャージ'),
  N('holy_aegis','shield',110,'✨',70,6,{healPercent:50,defUpPercent:20,defUpTurns:2},'Égide Sagrada','Holy Aegis','Égida Sagrada','ホーリーイージス'),
];

// ══ GERA skills.ts ══
const fmt = (s) => {
  const lines = [
    `  {\n    id: '${s.id}',`,
    `    proficiency: '${s.prof}',`,
    `    requireProficiency: ${s.req},`,
    `    icon: '${s.icon}',`,
    `    mp: ${s.mp},`,
    `    cd: ${s.cd},`
  ];
  for (const [k, v] of Object.entries(s.data)) {
    lines.push(`    ${k}: ${typeof v === 'string' ? `'${v}'` : v},`);
  }
  lines.push('  },');
  return lines.join('\n');
};

let ts = `import type { WeaponCategory } from '../types/item.types';\n\nexport type SkillDamageType = 'physical' | 'magical' | 'void';\n\nexport interface PlayerSkillData {\n  id: string;\n  /** Proficiência de arma que desbloqueia esta skill. */\n  proficiency: WeaponCategory;\n  /** Pontos de proficiência necessários para desbloquear. */\n  requireProficiency: number;\n  icon: string;\n  mp: number;\n  cd: number;\n  damageType?: SkillDamageType;\n  damagePercent?: number;\n  hits?: number;\n  dotDamage?: number;\n  dotTurns?: number;\n  healPercent?: number;\n  stunTurns?: number;\n  slowTurns?: number;\n  reflectPercent?: number;\n  reflectTurns?: number;\n  defUpPercent?: number;\n  defUpTurns?: number;\n  ignoreDef?: boolean;\n  markDamageBonus?: number;\n  markTurns?: number;\n  dodgeNext?: boolean;\n  executeBelowHpPercent?: number;\n}\n\n/**\n * SKILLS POR ARMA (98 — 7 por proficiência).\n * O jogador desbloqueia as skills das armas equipadas conforme a\n * proficiência sobe — trocou de arma, trocou de arsenal.\n */\nexport const skills: PlayerSkillData[] = [\n${SKILLS.map(fmt).join('\n')}\n];\n`;
fs.writeFileSync('client/src/data/skills.ts', ts);
console.log('skills.ts:', SKILLS.length, 'skills');

// ══ GERA i18n (bloco skills, 4 idiomas) ══
const LANGS = ['pt-BR','en-US','es-ES','ja-JP'];
const langKey = { 'pt-BR':'pt', 'en-US':'en', 'es-ES':'es', 'ja-JP':'ja' };
let out = fs.readFileSync('client/src/i18n/index.ts', 'utf8');

function sectionBounds(s, lang) {
  const start = s.indexOf(`"${lang}": {`);
  if (start === -1) return null;
  let end = s.length;
  for (const other of LANGS) {
    if (other === lang) continue;
    const idx = s.indexOf(`"${other}": {`, start + 10);
    if (idx !== -1 && idx < end) end = idx;
  }
  return [start, end];
}
function blockEnd(s, openPos) {
  let depth = 0, inStr = false, esc = false;
  for (let i = openPos; i < s.length; i++) {
    const ch = s[i];
    if (inStr) { if (esc) esc = false; else if (ch === '\\') esc = true; else if (ch === '"') inStr = false; continue; }
    if (ch === '"') { inStr = true; continue; }
    if (ch === '{') depth++;
    else if (ch === '}') { depth--; if (depth === 0) return i; }
  }
  return -1;
}

const T = {
  'pt-BR': {
    dmg: (d, tipo) => `Causa ${d}% do ATK ${tipo}.`,
    hits: (h, d, tipo) => `Causa ${h} golpes de ${d}% do ATK ${tipo}.`,
    dot: (d, t) => `Causa ${d} de dano por ${t} turnos.`,
    heal: (p) => `Restaura ${p}% do HP máximo.`,
    def: (p, t) => `Aumenta a defesa em ${p}% por ${t} turnos.`,
    reflect: (p, t) => `Reflete ${p}% do dano recebido por ${t} turnos.`,
    mark: (p, t) => `Marca o alvo: +${Math.round(p * 100)}% de dano recebido por ${t} turnos.`,
    stun: (t) => `Atordoa o alvo por ${t} turno(s).`,
    slow: (t) => `Retarda o alvo por ${t} turno(s).`,
    dodge: 'Esquiva o próximo golpe.',
    ignoreDef: ' Ignora a defesa do inimigo.',
    execute: (p) => ` Executa alvos abaixo de ${p}% de HP.`
  },
  'en-US': {
    dmg: (d, tipo) => `Deals ${d}% of ${tipo} ATK damage.`,
    hits: (h, d, tipo) => `Deals ${h} hits of ${d}% ${tipo} ATK damage.`,
    dot: (d, t) => `Deals ${d} damage per turn for ${t} turns.`,
    heal: (p) => `Restores ${p}% of max HP.`,
    def: (p, t) => `Increases defense by ${p}% for ${t} turns.`,
    reflect: (p, t) => `Reflects ${p}% of damage taken for ${t} turns.`,
    mark: (p, t) => `Marks the target: +${Math.round(p * 100)}% damage taken for ${t} turns.`,
    stun: (t) => `Stuns the target for ${t} turn(s).`,
    slow: (t) => `Slows the target for ${t} turn(s).`,
    dodge: 'Dodges the next incoming hit.',
    ignoreDef: ' Ignores enemy defense.',
    execute: (p) => ` Executes targets below ${p}% HP.`
  },
  'es-ES': {
    dmg: (d, tipo) => `Causa ${d}% de ATQ ${tipo}.`,
    hits: (h, d, tipo) => `Causa ${h} golpes de ${d}% de ATQ ${tipo}.`,
    dot: (d, t) => `Causa ${d} de daño por ${t} turnos.`,
    heal: (p) => `Restaura ${p}% del HP máximo.`,
    def: (p, t) => `Aumenta la defensa un ${p}% por ${t} turnos.`,
    reflect: (p, t) => `Refleja ${p}% del daño recibido por ${t} turnos.`,
    mark: (p, t) => `Marca al objetivo: +${Math.round(p * 100)}% de daño recibido por ${t} turnos.`,
    stun: (t) => `Aturde al objetivo por ${t} turno(s).`,
    slow: (t) => `Ralentiza al objetivo por ${t} turno(s).`,
    dodge: 'Esquiva el próximo golpe.',
    ignoreDef: ' Ignora la defensa del enemigo.',
    execute: (p) => ` Ejecuta objetivos con menos de ${p}% de HP.`
  },
  'ja-JP': {
    dmg: (d, tipo) => `${tipo}ATKの${d}%のダメージ。`,
    hits: (h, d, tipo) => `${tipo}ATKの${d}%で${h}回攻撃。`,
    dot: (d, t) => `${t}ターンの間、毎ターン${d}のダメージ。`,
    heal: (p) => `最大HPの${p}%を回復。`,
    def: (p, t) => `${t}ターンの間、防御力+${p}%。`,
    reflect: (p, t) => `${t}ターンの間、受けたダメージの${p}%を反射。`,
    mark: (p, t) => `目標をマーク：${t}ターンの間、受けるダメージ+${Math.round(p * 100)}%。`,
    stun: (t) => `${t}ターン気絶させる。`,
    slow: (t) => `${t}ターン鈍足にする。`,
    dodge: '次の攻撃を回避する。',
    ignoreDef: ' 敵の防御を無視する。',
    execute: (p) => ` HPが${p}%以下の敵を即死させる。`
  }
};

const buildDesc = (s, lang) => {
  const t = T[lang];
  const d = s.data;
  const tipo = d.damageType === 'magical' ? 'mágico' : d.damageType === 'void' ? 'do vazio' : 'físico';
  const tipoEn = d.damageType === 'magical' ? 'magic' : d.damageType === 'void' ? 'void' : 'physical';
  const tipoEs = d.damageType === 'magical' ? 'mágico' : d.damageType === 'void' ? 'del vacío' : 'físico';
  const tipoJa = d.damageType === 'magical' ? '魔法' : d.damageType === 'void' ? '虚無' : '物理';
  const tipoMap = { 'pt-BR': tipo, 'en-US': tipoEn, 'es-ES': tipoEs, 'ja-JP': tipoJa };

  const parts = [];
  if (d.damagePercent && d.hits) parts.push(t.hits(d.hits, d.damagePercent, tipoMap[lang]));
  else if (d.damagePercent) parts.push(t.dmg(d.damagePercent, tipoMap[lang]));
  if (d.dotDamage && d.dotTurns) parts.push(t.dot(d.dotDamage, d.dotTurns));
  if (d.healPercent && !d.defUpPercent) parts.push(t.heal(d.healPercent));
  if (d.defUpPercent) {
    const defText = t.def(d.defUpPercent, d.defUpTurns);
    parts.push(d.healPercent ? defText + ' e ' + t.heal(d.healPercent).toLowerCase() : defText);
  }
  if (d.reflectPercent && d.reflectTurns) parts.push(t.reflect(d.reflectPercent, d.reflectTurns));
  if (d.markDamageBonus && d.markTurns) parts.push(t.mark(d.markDamageBonus, d.markTurns));
  if (d.stunTurns) parts.push(t.stun(d.stunTurns));
  if (d.slowTurns) parts.push(t.slow(d.slowTurns));
  if (d.dodgeNext) parts.push(t.dodge);
  if (d.ignoreDef) parts[parts.length - 1] = (parts[parts.length - 1] ?? '') + t.ignoreDef;
  if (d.executeBelowHpPercent) parts[parts.length - 1] = (parts[parts.length - 1] ?? '') + t.execute(d.executeBelowHpPercent);

  return parts.join(' ');
};

for (const lang of LANGS) {
  const [start, end] = sectionBounds(out, lang);
  const skStart = out.indexOf('"skills": {', start);
  if (skStart === -1 || skStart > end) { console.error('skills não encontrado em', lang); process.exit(1); }
  const skEnd = blockEnd(out, skStart + 9);
  if (skEnd === -1) { console.error('blockEnd falhou em', lang); process.exit(1); }

  let rebuilt = '    "skills": {\n';
  for (const s of SKILLS) {
    rebuilt += `      "${s.id}": {\n        "name": "${s[langKey[lang]]}",\n        "desc": "${buildDesc(s, lang)}"\n      },\n`;
  }
  rebuilt = rebuilt.replace(/,\n$/, '\n') + '    }';

  // substitui mantendo a vírgula seguinte se houver
  let suffix = out.slice(skEnd + 1);
  const keepComma = suffix.startsWith(',');
  if (keepComma) suffix = suffix.slice(1);
  out = out.slice(0, skStart) + rebuilt + (keepComma ? ',' : '') + suffix;
  console.log(`${lang}: bloco skills substituído (${SKILLS.length})`);
}

fs.writeFileSync('client/src/i18n/index.ts', out);
console.log('GERADOR CONCLUÍDO');
