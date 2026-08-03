/**
 * Nomes dos effects nos 4 idiomas suportados (pt-BR, en-US, es-ES, ja-JP)
 * + helpers de formatação para exibição no UI (Parte 6 do sistema ItemEffects).
 *
 * As chaves são os effectId numéricos definidos em `effectRegistry.ts`.
 */

import type { LangCode } from '../i18n';

export const EFFECT_NAMES: Record<LangCode, Record<number, string>> = {
  'pt-BR': {
    1: 'ATK', 2: 'DEF', 3: 'Força', 4: 'Agilidade',
    5: 'Vitalidade', 6: 'Arcana', 7: 'Percepção',
    8: 'Vontade', 9: 'Sorte', 10: 'HP', 11: 'MP',
    21: 'Chance de Crítico', 22: 'Dano Crítico',
    23: 'Resistência Elemental', 24: 'Bônus de Dano',
    25: 'Bônus de Defesa', 26: 'Bônus de Cura',
    27: 'Bônus de XP', 28: 'Bônus de Ouro',
    29: 'Bônus de Loot', 30: 'Velocidade',
    41: 'Queima', 42: 'Congelamento', 43: 'Paralisia',
    44: 'Sangramento', 45: 'Veneno', 46: 'Atordoamento',
    47: 'Lentidão', 48: 'Silêncio', 49: 'Dreno de Mana',
    50: 'Enfraquecimento', 51: 'Cegueira',
    52: 'Sono', 53: 'Medo', 54: 'Maldição',
    55: 'Regeneração', 56: 'Reflexo', 57: 'Escudo',
    58: 'Barreira', 59: 'Aceleração', 60: 'Berserk',
    61: 'Ao Acertar: Queima', 62: 'Ao Acertar: Gelo',
    63: 'Ao Acertar: Sangramento', 64: 'Ao Acertar: Veneno',
    65: 'Ao Acertar: Atordoa', 66: 'Ao Acertar: Lentidão',
    67: 'Ao Matar: Cura', 68: 'Ao Matar: Restaura MP',
    69: 'HP Baixo: +ATK', 70: 'HP Baixo: +DEF',
    71: 'Crítico: Sangramento', 72: 'Crítico: +Dano',
    73: 'Ao Bloquear: Contra-ataque',
    74: 'Ao Esquivar: Ataca',
    75: 'vs Bestas: +Dano', 76: 'vs Mortos-vivos: +Dano',
    77: 'vs Bosses: +Dano', 78: 'vs Ponto Fraco: +Dano',
    79: 'Aura: +ATK Party', 80: 'Aura: +DEF Party',
    81: 'Pet: +ATK', 82: 'Pet: +HP',
    83: 'Pet: -Cooldown', 84: 'Pet: +XP',
    85: 'Pet: Revive Rápido',
    91: 'Montaria: -Exploração', 92: 'Montaria: +Loot',
    93: 'Montaria: +XP', 96: 'Vinculado à Alma',
    97: 'Material', 98: 'Slots de Encantamento',
    99: 'Nível de Upgrade', 100: 'Conjunto'
  },
  'en-US': {
    1: 'ATK', 2: 'DEF', 3: 'Strength', 4: 'Agility',
    5: 'Vitality', 6: 'Arcana', 7: 'Perception',
    8: 'Will', 9: 'Luck', 10: 'HP', 11: 'MP',
    21: 'Crit Chance', 22: 'Crit Damage',
    23: 'Elemental Resistance', 24: 'Damage Bonus',
    25: 'Defense Bonus', 26: 'Heal Bonus',
    27: 'XP Bonus', 28: 'Gold Bonus',
    29: 'Loot Bonus', 30: 'Speed',
    41: 'Burn', 42: 'Freeze', 43: 'Paralyze',
    44: 'Bleed', 45: 'Poison', 46: 'Stun',
    47: 'Slow', 48: 'Silence', 49: 'Mana Drain',
    50: 'Weaken', 51: 'Blind',
    52: 'Sleep', 53: 'Fear', 54: 'Curse',
    55: 'Regenerate', 56: 'Reflect', 57: 'Shield',
    58: 'Barrier', 59: 'Haste', 60: 'Berserk',
    61: 'On Hit: Burn', 62: 'On Hit: Freeze',
    63: 'On Hit: Bleed', 64: 'On Hit: Poison',
    65: 'On Hit: Stun', 66: 'On Hit: Slow',
    67: 'On Kill: Heal', 68: 'On Kill: Restore MP',
    69: 'Low HP: +ATK', 70: 'Low HP: +DEF',
    71: 'On Crit: Bleed', 72: 'On Crit: +Damage',
    73: 'On Block: Counter', 74: 'On Dodge: Attack',
    75: 'vs Beasts: +Dmg', 76: 'vs Undead: +Dmg',
    77: 'vs Bosses: +Dmg', 78: 'vs Weak Point: +Dmg',
    79: 'Aura: Party +ATK', 80: 'Aura: Party +DEF',
    81: 'Pet: +ATK', 82: 'Pet: +HP',
    83: 'Pet: -Cooldown', 84: 'Pet: +XP',
    85: 'Pet: Fast Revive',
    91: 'Mount: -Explore', 92: 'Mount: +Loot',
    93: 'Mount: +XP', 96: 'Soul Bound',
    97: 'Material', 98: 'Enchant Slots',
    99: 'Upgrade Level', 100: 'Set'
  },
  'es-ES': {
    1: 'ATQ', 2: 'DEF', 3: 'Fuerza', 4: 'Agilidad',
    5: 'Vitalidad', 6: 'Arcana', 7: 'Percepción',
    8: 'Voluntad', 9: 'Suerte', 10: 'HP', 11: 'MP',
    21: 'Prob. Crítico', 22: 'Daño Crítico',
    23: 'Resistencia Elemental', 24: 'Bonif. Daño',
    25: 'Bonif. Defensa', 26: 'Bonif. Curación',
    27: 'Bonif. XP', 28: 'Bonif. Oro',
    29: 'Bonif. Botín', 30: 'Velocidad',
    41: 'Quemadura', 42: 'Congelamiento',
    43: 'Parálisis', 44: 'Sangrado', 45: 'Veneno',
    46: 'Aturdimiento', 47: 'Lentitud',
    48: 'Silencio', 49: 'Robo de Maná',
    50: 'Debilitamiento', 51: 'Ceguera',
    52: 'Sueño', 53: 'Miedo', 54: 'Maldición',
    55: 'Regeneración', 56: 'Reflejo',
    57: 'Escudo', 58: 'Barrera', 59: 'Prisa',
    60: 'Berserk',
    61: 'Al Golpear: Quema', 62: 'Al Golpear: Hielo',
    63: 'Al Golpear: Sangrado', 64: 'Al Golpear: Veneno',
    65: 'Al Golpear: Aturde', 66: 'Al Golpear: Lentitud',
    67: 'Al Matar: Cura', 68: 'Al Matar: Restaura MP',
    69: 'HP Bajo: +ATQ', 70: 'HP Bajo: +DEF',
    71: 'Crítico: Sangrado', 72: 'Crítico: +Daño',
    73: 'Al Bloquear: Contraataque',
    74: 'Al Esquivar: Ataca',
    75: 'vs Bestias: +Daño', 76: 'vs No-muertos: +Daño',
    77: 'vs Jefes: +Daño', 78: 'vs Punto Débil: +Daño',
    79: 'Aura: +ATQ Party', 80: 'Aura: +DEF Party',
    81: 'Mascota: +ATQ', 82: 'Mascota: +HP',
    83: 'Mascota: -Recarga', 84: 'Mascota: +XP',
    85: 'Mascota: Revive Rápido',
    91: 'Montura: -Exploración', 92: 'Montura: +Botín',
    93: 'Montura: +XP', 96: 'Vinculado al Alma',
    97: 'Material', 98: 'Ranuras Encantamiento',
    99: 'Nivel de Mejora', 100: 'Conjunto'
  },
  'ja-JP': {
    1: 'ATK', 2: 'DEF', 3: '力', 4: '俊敏',
    5: '活力', 6: '秘法', 7: '知覚',
    8: '意志', 9: '運', 10: 'HP', 11: 'MP',
    21: 'クリ確率', 22: 'クリダメージ',
    23: '属性耐性', 24: 'ダメージボーナス',
    25: '防御ボーナス', 26: '回復ボーナス',
    27: 'XPボーナス', 28: 'ゴールドボーナス',
    29: 'ルートボーナス', 30: '速度',
    41: '燃焼', 42: '凍結', 43: '麻痺',
    44: '出血', 45: '毒', 46: 'スタン',
    47: '鈍化', 48: '沈黙', 49: 'マナ吸収',
    50: '弱体化', 51: '盲目',
    52: '睡眠', 53: '恐怖', 54: '呪い',
    55: '再生', 56: '反射', 57: 'シールド',
    58: 'バリア', 59: '加速', 60: 'バーサク',
    61: '命中時：燃焼', 62: '命中時：凍結',
    63: '命中時：出血', 64: '命中時：毒',
    65: '命中時：スタン', 66: '命中時：鈍化',
    67: '撃破時：回復', 68: '撃破時：MP回復',
    69: 'HP低下時：ATK+', 70: 'HP低下時：DEF+',
    71: 'クリ時：出血', 72: 'クリ時：ダメージ+',
    73: 'ブロック時：反撃', 74: '回避時：攻撃',
    75: 'vs野獣：ダメージ+', 76: 'vsアンデッド：ダメージ+',
    77: 'vsボス：ダメージ+', 78: 'vs弱点：ダメージ+',
    79: 'オーラ：パーティATK+', 80: 'オーラ：パーティDEF+',
    81: 'ペット：ATK+', 82: 'ペット：HP+',
    83: 'ペット：CD-', 84: 'ペット：XP+',
    85: 'ペット：復活速度+',
    91: 'マウント：探索-', 92: 'マウント：ルート+',
    93: 'マウント：XP+', 96: 'ソウルバウンド',
    97: '素材', 98: 'エンチャントスロット',
    99: 'アップグレードレベル', 100: 'セット'
  }
};

/** Sufixos/termos locais usados na formatação de effects. */
const FORMAT_TERMS: Record<LangCode, { perTurn: string; turns: string; turn: string; chance: string }> = {
  'pt-BR': { perTurn: '/turno', turns: ' turnos', turn: ' turno', chance: 'chance' },
  'en-US': { perTurn: '/turn', turns: ' turns', turn: ' turn', chance: 'chance' },
  'es-ES': { perTurn: '/turno', turns: ' turnos', turn: ' turno', chance: 'probabilidad' },
  'ja-JP': { perTurn: '/ターン', turns: ' ターン', turn: ' ターン', chance: '確率' }
};

/** Ícones por effectId para o UI. */
export const EFFECT_ICONS: Record<number, string> = {
  1: '⚔️', 2: '🛡️', 3: '💪', 4: '🏃', 5: '❤️', 6: '🔮', 7: '👁️', 8: '🧠', 9: '🍀', 10: '💖', 11: '💧',
  21: '🎯', 22: '💥', 23: '🔰', 24: '📈', 25: '🛡️', 26: '✨', 27: '⭐', 28: '💰', 29: '🎁', 30: '⚡',
  41: '🔥', 42: '❄️', 43: '⚡', 44: '🩸', 45: '☠️', 46: '💫', 47: '🐌', 48: '🤐', 49: '🌀', 50: '📉',
  51: '🕶️', 52: '😴', 53: '😱', 54: '🕯️', 55: '💚', 56: '🪞', 57: '🛡️', 58: '🔵', 59: '⏩', 60: '😡',
  61: '🔥', 62: '❄️', 63: '🩸', 64: '☠️', 65: '💫', 66: '🐌', 67: '💖', 68: '💧', 69: '🩸', 70: '🛡️',
  71: '🩸', 72: '💥', 73: '🛡️', 74: '💨', 75: '🐺', 76: '💀', 77: '👹', 78: '🎯', 79: '🚩', 80: '🚩',
  81: '🐾', 82: '🐾', 83: '🐾', 84: '🐾', 85: '🐾',
  91: '🐴', 92: '🐴', 93: '🐴',
  96: '🔗', 97: '📜', 98: '💎', 99: '⬆️', 100: '🧩'
};

/** Nome traduzido de um effectId (fallback: código "Effect #id"). */
export const getEffectName = (effectId: number, lang: LangCode): string => {
  return EFFECT_NAMES[lang]?.[effectId] ?? EFFECT_NAMES['en-US']?.[effectId] ?? `Effect #${effectId}`;
};

/** Ícone de um effectId. */
export const getEffectIcon = (effectId: number): string => EFFECT_ICONS[effectId] ?? '✨';

export interface EffectLine {
  /** Texto formatado para exibição (ex.: "+65 ATK", "25% chance: Sangramento"). */
  text: string;
  /** Classe Tailwind de cor, conforme o tipo do effect. */
  colorClass: string;
}

const GREEN = 'text-green-300';
const RED = 'text-red-300';
const YELLOW = 'text-yellow-300';
const ORANGE = 'text-orange-300';
const BLUE = 'text-sky-300';
const PURPLE = 'text-violet-300';
const CYAN = 'text-cyan-300';
const GOLD = 'text-game-gold';
const MUTED = 'text-game-muted';

/** Effects cujo value é porcentagem (regras de formatação do UI). */
const PERCENT_EFFECTS = new Set([
  21, 22, 24, 25, 26, 27, 28, 29, 30,
  47, 50, 51, 53, 54, 56, 59, 60,
  61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 72, 73, 74, 75, 76, 77, 78, 79, 80,
  84, 91, 92, 93
]);

/** Effects de duração em turnos. */
const TURN_EFFECTS = new Set([42, 43, 46, 48, 52]);

/** Effects de dano por turno (DoT). */
const DOT_EFFECTS = new Set([41, 44, 45]);

const signed = (value: number) => (value > 0 ? `+${value}` : `${value}`);

/**
 * Formata um effect para exibição no UI.
 *
 * Exemplos (pt-BR):
 *  - effect 1 (ATK)       → "+65 ATK" (verde)
 *  - effect 21 (CRIT%)    → "+6% Chance de Crítico" (amarelo)
 *  - effect 63 (ON_HIT)   → "25% chance: Ao Acertar: Sangramento" (vermelho)
 *  - effect 55 (REGEN)    → "+15 HP/turno Regeneração" (verde)
 *  - effect 91 (MOUNT)    → "-30% Montaria: -Exploração" (azul)
 */
export const describeEffect = (effectId: number, value: number, lang: LangCode): EffectLine => {
  const name = getEffectName(effectId, lang);
  const terms = FORMAT_TERMS[lang];

  // ── Stats primários (1–11): flat, verde/vermelho ──
  if (effectId >= 1 && effectId <= 11) {
    return { text: `${signed(value)} ${name}`, colorClass: value >= 0 ? GREEN : RED };
  }

  // ── Chance/dano de crítico ──
  if (effectId === 21) return { text: `${signed(value)}% ${name}`, colorClass: YELLOW };
  if (effectId === 22) return { text: `${signed(value)}% ${name}`, colorClass: ORANGE };

  // ── Resistência elemental (flat) ──
  if (effectId === 23) return { text: `${signed(value)} ${name}`, colorClass: GREEN };

  // ── Bônus percentuais de combate (24–30) ──
  if (effectId >= 24 && effectId <= 30) {
    return { text: `${signed(value)}% ${name}`, colorClass: YELLOW };
  }

  // ── DoT (dano por turno) ──
  if (DOT_EFFECTS.has(effectId)) {
    return { text: `${value}${terms.perTurn} ${name}`, colorClass: RED };
  }

  // ── Duração em turnos ──
  if (TURN_EFFECTS.has(effectId)) {
    return { text: `${value}${value === 1 ? terms.turn : terms.turns} ${name}`, colorClass: YELLOW };
  }

  // ── Regeneração: "+15 HP/turno" verde ──
  if (effectId === 55) {
    return { text: `${signed(value)} HP${terms.perTurn} ${name}`, colorClass: GREEN };
  }

  // ── Escudo / Barreira / Dreno de mana (flat) ──
  if (effectId === 49 || effectId === 57 || effectId === 58) {
    return { text: `${signed(value)} ${name}`, colorClass: CYAN };
  }

  // ── Ao acertar (61–66): "25% chance: ..." vermelho ──
  if (effectId >= 61 && effectId <= 66) {
    return { text: `${value}% ${terms.chance}: ${name}`, colorClass: RED };
  }

  // ── Crítico: sangramento (flat) ──
  if (effectId === 71) return { text: `${signed(value)} ${name}`, colorClass: RED };

  // ── Condicionais percentuais (67–80) ──
  if (PERCENT_EFFECTS.has(effectId) && effectId >= 67 && effectId <= 80) {
    return { text: `${signed(value)}% ${name}`, colorClass: PURPLE };
  }

  // ── Pet ──
  if (effectId === 83 || effectId === 85) {
    return { text: `-${value}${value === 1 ? terms.turn : terms.turns} ${name}`, colorClass: CYAN };
  }
  if (effectId >= 81 && effectId <= 85) {
    return { text: `${signed(value)} ${name}`, colorClass: GREEN };
  }

  // ── Montaria: "-30% Exploração" azul ──
  if (effectId === 91) return { text: `-${value}% ${name}`, colorClass: BLUE };
  if (effectId === 92 || effectId === 93) {
    return { text: `${signed(value)}% ${name}`, colorClass: BLUE };
  }

  // ── Especiais ──
  if (effectId === 96) return { text: name, colorClass: GOLD };
  if (effectId === 97) return { text: value > 0 ? `${name} #${value}` : name, colorClass: MUTED };
  if (effectId === 98) return { text: `${value}× ${name}`, colorClass: GOLD };
  if (effectId === 99) return { text: `${signed(value)} ${name}`, colorClass: GOLD };
  if (effectId === 100) return { text: `${name} #${value}`, colorClass: GOLD };

  // ── Fallback genérico ──
  if (PERCENT_EFFECTS.has(effectId)) {
    return { text: `${signed(value)}% ${name}`, colorClass: YELLOW };
  }

  return { text: `${signed(value)} ${name}`, colorClass: MUTED };
};
