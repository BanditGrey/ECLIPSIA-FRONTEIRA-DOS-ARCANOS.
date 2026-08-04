// Pedras espirituais, pets, montarias, materiais novos
const STONES = [
  // Fogo (queima) 7500-7503
  ['ss_7500', 7500, 'u', 10, '🔥', ['Pedra Espiritual de Fogo I', 'Fire Spirit Stone I', 'Piedra Espiritual de Fuego I', '炎の霊石・壱'], [1, 8, 21, 2, 61, 12], 'fire', 'burn'],
  ['ss_7501', 7501, 'r', 20, '🔥', ['Pedra Espiritual de Fogo II', 'Fire Spirit Stone II', 'Piedra Espiritual de Fuego II', '炎の霊石・弐'], [1, 18, 21, 4, 3, 5, 61, 18], 'fire', 'burn'],
  ['ss_7502', 7502, 'e', 30, '🔥', ['Pedra Espiritual de Fogo III', 'Fire Spirit Stone III', 'Piedra Espiritual de Fuego III', '炎の霊石・参'], [1, 32, 21, 7, 22, 20, 3, 10, 61, 25], 'fire', 'burn'],
  ['ss_7503', 7503, 'l', 40, '🔥', ['Pedra Espiritual de Fogo IV', 'Fire Spirit Stone IV', 'Piedra Espiritual de Fuego IV', '炎の霊石・肆'], [1, 50, 21, 10, 22, 35, 3, 18, 61, 35], 'fire', 'burn'],
  // Gelo (freeze) 7550-7552
  ['ss_7550', 7550, 'u', 10, '❄', ['Pedra Espiritual de Gelo I', 'Ice Spirit Stone I', 'Piedra Espiritual de Hielo I', '氷の霊石・壱'], [2, 10, 23, 8, 62, 10], 'ice', 'freeze'],
  ['ss_7551', 7551, 'r', 20, '❄', ['Pedra Espiritual de Gelo II', 'Ice Spirit Stone II', 'Piedra Espiritual de Hielo II', '氷の霊石・弐'], [2, 22, 23, 18, 5, 5, 62, 15], 'ice', 'freeze'],
  ['ss_7552', 7552, 'e', 30, '❄', ['Pedra Espiritual de Gelo III', 'Ice Spirit Stone III', 'Piedra Espiritual de Hielo III', '氷の霊石・参'], [2, 38, 23, 32, 5, 12, 62, 22], 'ice', 'freeze'],
  // Raio (stun) 7600-7602
  ['ss_7600', 7600, 'u', 10, '⚡', ['Pedra Espiritual do Raio I', 'Lightning Spirit Stone I', 'Piedra Espiritual del Rayo I', '雷の霊石・壱'], [4, 8, 21, 4, 65, 8], 'lightning', 'paralyze'],
  ['ss_7601', 7601, 'r', 20, '⚡', ['Pedra Espiritual do Raio II', 'Lightning Spirit Stone II', 'Piedra Espiritual del Rayo II', '雷の霊石・弐'], [4, 16, 21, 7, 7, 5, 65, 12], 'lightning', 'paralyze'],
  ['ss_7602', 7602, 'e', 30, '⚡', ['Pedra Espiritual do Raio III', 'Lightning Spirit Stone III', 'Piedra Espiritual del Rayo III', '雷の霊石・参'], [4, 28, 21, 10, 22, 25, 7, 10, 65, 18], 'lightning', 'paralyze'],
  // Natural (regeneração) 7650-7652
  ['ss_7650', 7650, 'u', 10, '🌿', ['Pedra Espiritual Natural I', 'Nature Spirit Stone I', 'Piedra Espiritual Natural I', '自然の霊石・壱'], [5, 10, 10, 80, 55, 15], 'nature', 'regenerate'],
  ['ss_7651', 7651, 'r', 20, '🌿', ['Pedra Espiritual Natural II', 'Nature Spirit Stone II', 'Piedra Espiritual Natural II', '自然の霊石・弐'], [5, 20, 10, 180, 8, 5, 55, 25], 'nature', 'regenerate'],
  ['ss_7652', 7652, 'e', 30, '🌿', ['Pedra Espiritual Natural III', 'Nature Spirit Stone III', 'Piedra Espiritual Natural III', '自然の霊石・参'], [5, 32, 10, 320, 8, 12, 55, 40], 'nature', 'regenerate'],
  // Sombria (sangramento) 7700-7702
  ['ss_7700', 7700, 'u', 10, '🌑', ['Pedra Espiritual Sombria I', 'Shadow Spirit Stone I', 'Piedra Espiritual Sombría I', '影の霊石・壱'], [7, 10, 22, 15, 63, 15], 'shadow', 'bleed'],
  ['ss_7701', 7701, 'r', 20, '🌑', ['Pedra Espiritual Sombria II', 'Shadow Spirit Stone II', 'Piedra Espiritual Sombría II', '影の霊石・弐'], [7, 20, 22, 28, 4, 8, 63, 22], 'shadow', 'bleed'],
  ['ss_7702', 7702, 'e', 30, '🌑', ['Pedra Espiritual Sombria III', 'Shadow Spirit Stone III', 'Piedra Espiritual Sombría III', '影の霊石・参'], [7, 30, 22, 42, 4, 15, 9, 8, 63, 30], 'shadow', 'bleed'],
  // Arcana (dreno de mana) 7750-7752
  ['ss_7750', 7750, 'u', 10, '💫', ['Pedra Espiritual Arcana I', 'Arcane Spirit Stone I', 'Piedra Espiritual Arcana I', '秘法の霊石・壱'], [6, 18, 11, 120, 8, 5, 49, 20], 'arcane', 'mana_drain'],
  ['ss_7751', 7751, 'r', 20, '💫', ['Pedra Espiritual Arcana II', 'Arcane Spirit Stone II', 'Piedra Espiritual Arcana II', '秘法の霊石・弐'], [6, 35, 11, 240, 8, 12, 49, 35], 'arcane', 'mana_drain'],
  ['ss_7752', 7752, 'e', 30, '💫', ['Pedra Espiritual Arcana III', 'Arcane Spirit Stone III', 'Piedra Espiritual Arcana III', '秘法の霊石・参'], [6, 55, 11, 400, 8, 22, 49, 50], 'arcane', 'mana_drain'],
  // Pura (all boost) 7800-7802
  ['ss_7800', 7800, 'e', 30, '✨', ['Pedra Espiritual Pura I', 'Pure Spirit Stone I', 'Piedra Espiritual Pura I', '純粋の霊石・壱'], [9, 12, 3, 4, 4, 4, 5, 4, 6, 4, 24, 5], 'pure', 'all_boost'],
  ['ss_7801', 7801, 'l', 40, '✨', ['Pedra Espiritual Pura II', 'Pure Spirit Stone II', 'Piedra Espiritual Pura II', '純粋の霊石・弐'], [9, 22, 3, 8, 4, 8, 5, 8, 6, 8, 7, 5, 24, 8], 'pure', 'all_boost'],
  ['ss_7802', 7802, 'R', 50, '✨', ['Pedra Espiritual Pura III', 'Pure Spirit Stone III', 'Piedra Espiritual Pura III', '純粋の霊石・参'], [9, 35, 3, 15, 4, 15, 5, 15, 6, 15, 7, 10, 8, 10, 24, 12], 'pure', 'all_boost']
];

// pets: [id, numId, rar, lvl, icone, nomes, pairs, abilityType, abilityValue, abilityKey]
const PETS = [
  ['pt_8000', 8000, 'c', 1, '🐺', ['Filhote de Lobo', 'Wolf Pup', 'Cachorro de Lobo', '狼の子'], [81, 8, 82, 80], 'attack', 25, 'wolf_bite'],
  ['pt_8001', 8001, 'c', 5, '🐇', ['Coelho Sábio', 'Wise Rabbit', 'Conejo Sabio', '賢いウサギ'], [82, 60, 84, 5], 'xp_boost', 5, 'scout'],
  ['pt_8050', 8050, 'u', 10, '🐺', ['Lobo Jovem', 'Young Wolf', 'Lobo Joven', '若狼'], [81, 20, 82, 150], 'attack', 35, 'wolf_bite'],
  ['pt_8051', 8051, 'r', 15, '🐢', ['Tartaruga de Pedra', 'Stone Turtle', 'Tortuga de Piedra', '石亀'], [82, 200, 85, 1], 'tank', 25, 'stone_wall'],
  ['pt_8052', 8052, 'r', 18, '🦝', ['Guaxinim Farejador', 'Scavenger Raccoon', 'Mapache Buscador', '宝探しアライグマ'], [29, 10, 82, 100], 'loot_boost', 10, 'shadow_nose'],
  ['pt_8100', 8100, 'e', 25, '🧚', ['Sprite Curador', 'Healing Sprite', 'Hada Sanadora', '癒しの妖精'], [82, 100, 26, 5], 'heal', 18, 'nature_heal'],
  ['pt_8101', 8101, 'e', 25, '🦡', ['Texugo do Tesouro', 'Treasure Badger', 'Tejón del Tesoro', '宝のアナグマ'], [29, 15, 82, 80], 'loot_boost', 15, 'honey_trail'],
  ['pt_8102', 8102, 'e', 28, '🐆', ['Pantera Sombria', 'Shadow Panther', 'Pantera Sombría', '影の豹'], [81, 28, 82, 120], 'attack', 60, 'eagle_dive'],
  ['pt_8103', 8103, 'e', 30, '🤖', ['Golem de Bronze', 'Bronze Golem', 'Gólem de Bronce', '青銅のゴーレム'], [82, 400, 25, 20], 'tank', 40, 'stone_wall'],
  ['pt_8150', 8150, 'l', 35, '🦉', ['Coruja Anciã', 'Elder Owl', 'Búho Anciano', '老フクロウ'], [27, 10, 84, 10, 82, 120], 'xp_boost', 10, 'arcane_wisdom'],
  ['pt_8151', 8151, 'l', 38, '🐉', ['Draco Vermelho', 'Red Drake', 'Draco Rojo', '赤い飛竜'], [81, 45, 82, 280], 'attack', 90, 'dragon_claw'],
  ['pt_8152', 8152, 'l', 35, '🦊', ['Raposa Dourada', 'Golden Fox', 'Zorro Dorado', '黄金の狐'], [9, 10, 82, 100], 'luck_boost', 10, 'lucky_paw'],
  ['pt_8200', 8200, 'l', 40, '🦅', ['Grifo Jovem', 'Young Griffin', 'Grifo Joven', '若いグリフォン'], [81, 60, 82, 500, 83, 1], 'attack', 110, 'eagle_dive'],
  ['pt_8201', 8201, 'l', 42, '🐺', ['Lobo Alfa', 'Alpha Wolf', 'Lobo Alfa', '頭狼'], [79, 15, 82, 350], 'buff', 15, 'wolf_bite'],
  ['pt_8250', 8250, 'R', 50, '🐦‍🔥', ['Fênix do Fragmento', 'Phoenix of the Fragment', 'Fénix del Fragmento', '欠片の不死鳥'], [81, 90, 82, 800, 83, 1, 84, 15], 'heal', 30, 'nature_heal']
];

// montarias: [id, numId, rar, lvl, icone, nomes, pairs]
const MOUNTS = [
  ['mt_8500', 8500, 'c', 1, '🐴', ['Cavalo Marrom', 'Brown Horse', 'Caballo Marrón', '茶色の馬'], [91, 20, 4, 5]],
  ['mt_8501', 8501, 'u', 10, '🦌', ['Cervo da Floresta', 'Forest Deer', 'Ciervo del Bosque', '森の鹿'], [91, 25, 4, 8, 5, 3]],
  ['mt_8502', 8502, 'r', 20, '🐎', ['Corcel de Guerra', 'War Steed', 'Corcel de Guerra', '軍馬'], [91, 30, 4, 10, 7, 5]],
  ['mt_8503', 8503, 'r', 18, '🐢', ['Tartaruga do Abismo', 'Abyss Turtle', 'Tortuga del Abismo', '深淵の亀'], [91, 25, 5, 15, 3, 8]],
  ['mt_8550', 8550, 'e', 25, '🐎', ['Corcel da Névoa', 'Mist Steed', 'Corcel de la Niebla', '霧の軍馬'], [91, 35, 4, 15, 7, 8]],
  ['mt_8551', 8551, 'e', 25, '🦄', ['Corcel da Fortuna', 'Fortune Steed', 'Corcel de la Fortuna', '幸運の軍馬'], [91, 35, 4, 12, 9, 5]],
  ['mt_8600', 8600, 'e', 30, '🦅', ['Grifo Celeste', 'Sky Griffin', 'Grifo Celeste', '天のグリフォン'], [91, 40, 4, 18, 7, 10]],
  ['mt_8601', 8601, 'e', 32, '🐎', ['Corcel Arcano', 'Arcane Steed', 'Corcel Arcano', '秘法の軍馬'], [91, 40, 4, 15, 6, 10]],
  ['mt_8602', 8602, 'e', 30, '🐍', ['Serpente do Eclipse', 'Eclipse Serpent', 'Serpiente del Eclipse', '日食の蛇'], [91, 38, 4, 12, 6, 15, 9, 8]],
  ['mt_8650', 8650, 'e', 28, '🦏', ['Rinoceronte de Ferro', 'Iron Rhino', 'Rinoceronte de Hierro', '鉄のサイ'], [91, 35, 4, 14, 5, 8]],
  ['mt_8651', 8651, 'u', 12, '🐗', ['Javali de Guerra', 'War Boar', 'Jabalí de Guerra', '戦いの猪'], [91, 20, 5, 20, 2, 10]],
  ['mt_8700', 8700, 'l', 40, '🐲', ['Dragão do Vazio', 'Void Dragon', 'Dragón del Vacío', '虚空の竜'], [91, 50, 4, 20, 3, 10, 6, 10]],
  ['mt_8701', 8701, 'l', 40, '🐎', ['Corcel Lendário', 'Legendary Steed', 'Corcel Legendario', '伝説の軍馬'], [91, 45, 4, 18, 9, 20, 7, 10]],
  ['mt_8702', 8702, 'l', 45, '🐉', ['Dragão do Fragmento', 'Dragon of the Fragment', 'Dragón del Fragmento', '欠片の竜'], [91, 50, 4, 25, 3, 15, 7, 15, 9, 10]]
];

// materiais novos (gerais de crafting)
const MATERIALS_NEW = [
  ['mat_9350', 9350, 'c', 1, '✨', ['Pó Arcano', 'Arcane Dust', 'Polvo Arcano', '秘法の粉'], [97, 0]],
  ['mat_9351', 9351, 'u', 10, '🌒', ['Essência de Eclipse', 'Eclipse Essence', 'Esencia de Eclipse', '日食のエッセンス'], [97, 0]],
  ['mat_9352', 9352, 'r', 20, '💎', ['Cristal de Nythera', 'Crystal of Nythera', 'Cristal de Nythera', 'ニセラの水晶'], [97, 0]]
];

module.exports = { STONES, PETS, MOUNTS, MATERIALS_NEW };
