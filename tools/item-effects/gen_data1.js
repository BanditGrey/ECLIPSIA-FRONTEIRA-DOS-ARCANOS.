// Catálogo do spec (Prompt 19) — dados para o gerador
// item: [id, numId, raridade, nivel, icone, [pt,en,es,ja], pairs(e,v,...)]
const R = { c: 'common', u: 'uncommon', r: 'rare', e: 'epic', l: 'legendary', R: 'relic' };

const W1H = [
  // ── Espadas 1H ──
  ['w1h_1000', 1000, 'c', 1, '⚔', ['Espada Enferrujada', 'Rusted Sword', 'Espada Oxidada', '錆びた剣'], [1, 10]],
  ['w1h_1001', 1001, 'c', 3, '⚔', ['Espada de Ferro', 'Iron Sword', 'Espada de Hierro', '鉄の剣'], [1, 15]],
  ['w1h_1002', 1002, 'u', 8, '⚔', ['Espada do Soldado', "Soldier's Sword", 'Espada del Soldado', '兵士の剣'], [1, 22, 3, 1]],
  ['w1h_1003', 1003, 'u', 12, '⚔', ['Espada Longa', 'Longsword', 'Espada Larga', '長剣'], [1, 35, 3, 3]],
  ['w1h_1004', 1004, 'r', 18, '⚔', ['Espada da Guarda', "Guard's Sword", 'Espada de la Guardia', '衛兵の剣'], [1, 48, 3, 5]],
  ['w1h_1005', 1005, 'r', 22, '⚔', ['Lâmina Sombria', 'Shadow Blade', 'Hoja Sombría', '影の刃'], [1, 65, 4, 5, 7, 3]],
  ['w1h_1006', 1006, 'e', 28, '⚔', ['Espada de Nythera', 'Sword of Nythera', 'Espada de Nythera', 'ニセラの剣'], [1, 80, 3, 10, 4, 5]],
  ['w1h_1007', 1007, 'e', 32, '⚔', ['Espada do Eclipse', 'Sword of the Eclipse', 'Espada del Eclipse', '日食の剣'], [1, 110, 3, 15, 21, 6, 22, 20]],
  ['w1h_1008', 1008, 'l', 38, '⚔', ['Lâmina do Vazio', 'Blade of the Void', 'Hoja del Vacío', '虚空の刃'], [1, 140, 3, 20, 4, 10, 21, 8]],
  ['w1h_1009', 1009, 'l', 42, '⚔', ['Espada Lendária', 'Legendary Sword', 'Espada Legendaria', '伝説の剣'], [1, 200, 3, 30, 21, 12, 22, 40]],
  ['w1h_1010', 1010, 'R', 50, '⚔', ['Lâmina do Fragmento', 'Blade of the Fragment', 'Hoja del Fragmento', '欠片の刃'], [1, 280, 3, 40, 4, 20, 21, 15, 22, 60]],
  // ── Adagas ──
  ['w1h_1100', 1100, 'c', 1, '🗡', ['Faca de Bolso', 'Pocket Knife', 'Cuchilla de Bolsillo', '懐中ナイフ'], [1, 8, 4, 3]],
  ['w1h_1101', 1101, 'c', 3, '🗡', ['Adaga Enferrujada', 'Rusty Dagger', 'Daga Oxidada', '錆びた短剣'], [1, 12, 4, 2]],
  ['w1h_1102', 1102, 'u', 10, '🗡', ["Adaga do Ladrão", "Thief's Dagger", 'Daga del Ladrón', '盗賊の短剣'], [1, 28, 4, 8, 7, 3]],
  ['w1h_1103', 1103, 'r', 20, '🗡', ['Adaga Sombria', 'Shadow Dagger', 'Daga Sombría', '影の短剣'], [1, 55, 4, 12, 7, 5, 21, 5]],
  ['w1h_1104', 1104, 'e', 30, '🗡', ["Adaga do Espectro", "Specter's Dagger", 'Daga del Espectro', '幽霊の短剣'], [1, 90, 4, 20, 7, 12, 21, 10, 22, 30]],
  ['w1h_1105', 1105, 'l', 40, '🗡', ['Adaga da Lua Negra', 'Black Moon Dagger', 'Daga de la Luna Negra', '黒月の短剣'], [1, 150, 4, 30, 7, 20, 21, 15, 22, 50, 63, 25]],
  // ── Cajados 1H ──
  ['w1h_1150', 1150, 'c', 1, '🪄', ['Cajado Simples', 'Simple Staff', 'Bastón Simple', '素朴な杖'], [1, 8, 6, 12]],
  ['w1h_1151', 1151, 'u', 8, '🪄', ['Cajado de Aprendiz', "Apprentice's Staff", 'Bastón del Aprendiz', '見習いの杖'], [1, 15, 6, 28, 8, 3]],
  ['w1h_1152', 1152, 'r', 16, '🪄', ['Cajado Arcano', 'Arcane Staff', 'Bastón Arcano', '秘法の杖'], [1, 22, 6, 48, 8, 8, 11, 80]],
  ['w1h_1153', 1153, 'e', 28, '🪄', ['Cajado do Eclipse', 'Staff of the Eclipse', 'Bastón del Eclipse', '日食の杖'], [1, 35, 6, 80, 8, 15, 11, 200]],
  ['w1h_1154', 1154, 'l', 40, '🪄', ['Cajado Lendário', 'Legendary Staff', 'Bastón Legendario', '伝説の杖'], [1, 50, 6, 130, 8, 25, 11, 400, 26, 20]],
  // ── Arcos curtos ──
  ['w1h_1200', 1200, 'c', 1, '🏹', ['Arco de Madeira', 'Wooden Bow', 'Arco de Madera', '木の弓'], [1, 9, 4, 4]],
  ['w1h_1201', 1201, 'u', 8, '🏹', ['Arco da Floresta', 'Forest Bow', 'Arco del Bosque', '森の弓'], [1, 32, 4, 8, 7, 4]],
  ['w1h_1202', 1202, 'r', 18, '🏹', ['Arco Sombrio', 'Shadow Bow', 'Arco Sombrío', '影の弓'], [1, 58, 4, 14, 7, 8, 21, 4]],
  ['w1h_1203', 1203, 'e', 30, '🏹', ['Arco do Eclipse', 'Bow of the Eclipse', 'Arco del Eclipse', '日食の弓'], [1, 95, 4, 22, 7, 15, 21, 8, 22, 25]],
  ['w1h_1204', 1204, 'l', 40, '🏹', ['Arco Lendário', 'Legendary Bow', 'Arco Legendario', '伝説の弓'], [1, 160, 4, 35, 7, 25, 21, 12, 22, 45]]
];
const W1H_META = { file: 'weapons1h', category: 'sword_one', groups: { 1000: 'sword_one', 1100: 'dagger', 1150: 'staff_one', 1200: 'bow_short' } };

const W2H = [
  // ── Espadas grandes ──
  ['w2h_1500', 1500, 'c', 5, '⚔', ['Espada Larga', 'Broadsword', 'Espada Ancha', '幅広剣'], [1, 28, 3, 3]],
  ['w2h_1501', 1501, 'u', 12, '⚔', ['Espada de Dois Gumes', 'Two-Edged Sword', 'Espada de Dos Filos', '両刃の剣'], [1, 70, 3, 10]],
  ['w2h_1502', 1502, 'r', 20, '⚔', ['Claymore', 'Claymore', 'Claymore', 'クレイモア'], [1, 115, 3, 18, 21, 4]],
  ['w2h_1503', 1503, 'e', 30, '⚔', ['Espada Colossal', 'Colossal Sword', 'Espada Colosal', '巨大剣'], [1, 170, 3, 28, 21, 7, 22, 25]],
  ['w2h_1504', 1504, 'l', 40, '⚔', ['Espada Lendária 2H', 'Legendary Greatsword', 'Gran Espada Legendaria', '伝説の大剣'], [1, 250, 3, 40, 21, 10, 22, 40]],
  ['w2h_1505', 1505, 'R', 50, '⚔', ['Lâmina de Azhur', 'Blade of Azhur', 'Hoja de Azhur', 'アズールの刃'], [1, 380, 3, 55, 4, 15, 21, 15, 22, 60, 77, 30]],
  // ── Martelos ──
  ['w2h_1600', 1600, 'c', 5, '🔨', ['Marreto', 'Sledgehammer', 'Mazo', '大鎚'], [1, 32, 3, 5, 4, -2]],
  ['w2h_1601', 1601, 'u', 12, '🔨', ['Martelo de Guerra', 'War Hammer', 'Martillo de Guerra', '戦鎚'], [1, 78, 3, 15, 4, -3]],
  ['w2h_1602', 1602, 'r', 20, '🔨', ['Martelo da Ruína', 'Hammer of Ruin', 'Martillo de la Ruina', '廃墟の鎚'], [1, 125, 3, 25, 5, 8, 4, -5, 65, 20]],
  ['w2h_1603', 1603, 'e', 30, '🔨', ['Martelo do Abismo', 'Hammer of the Abyss', 'Martillo del Abismo', '深淵の鎚'], [1, 190, 3, 38, 5, 15, 4, -5, 65, 30]],
  ['w2h_1604', 1604, 'l', 40, '🔨', ['Martelo Lendário', 'Legendary Hammer', 'Martillo Legendario', '伝説の鎚'], [1, 280, 3, 55, 5, 25, 4, -5, 65, 40, 77, 20]],
  // ── Lanças ──
  ['w2h_1650', 1650, 'c', 5, '🔱', ['Lança de Madeira', 'Wooden Spear', 'Lanza de Madera', '木の槍'], [1, 26, 4, 4, 3, 2]],
  ['w2h_1651', 1651, 'u', 12, '🔱', ['Lança de Ferro', 'Iron Spear', 'Lanza de Hierro', '鉄の槍'], [1, 65, 4, 8, 3, 6]],
  ['w2h_1652', 1652, 'r', 20, '🔱', ['Lança da Névoa', 'Spear of the Mist', 'Lanza de la Niebla', '霧の槍'], [1, 105, 4, 15, 3, 10, 21, 4]],
  ['w2h_1653', 1653, 'e', 30, '🔱', ['Tridente Abissal', 'Abyssal Trident', 'Tridente Abisal', '深淵の三叉槍'], [1, 165, 4, 22, 3, 18, 21, 7, 63, 15]],
  ['w2h_1654', 1654, 'l', 40, '🔱', ["Tridente de Thal'Mora", "Trident of Thal'Mora", "Tridente de Thal'Mora", 'サル＝モーラの三叉槍'], [1, 240, 4, 30, 3, 25, 21, 10, 22, 35, 63, 25]],
  // ── Arcos longos ──
  ['w2h_1700', 1700, 'c', 5, '🏹', ['Arco de Madeira Longo', 'Long Wooden Bow', 'Arco Largo de Madera', '木の長弓'], [1, 24, 4, 5, 7, 3]],
  ['w2h_1701', 1701, 'u', 12, '🏹', ['Arco de Ferro', 'Ironbow', 'Arco de Hierro', '鉄の弓'], [1, 62, 4, 10, 7, 7]],
  ['w2h_1702', 1702, 'r', 20, '🏹', ['Arco da Floresta Longo', 'Long Forest Bow', 'Arco Largo del Bosque', '森の長弓'], [1, 100, 4, 18, 7, 12, 21, 6]],
  ['w2h_1703', 1703, 'e', 30, '🏹', ['Arco Élfico', 'Elven Bow', 'Arco Élfico', 'エルフの弓'], [1, 155, 4, 28, 7, 20, 21, 10, 22, 30]],
  ['w2h_1704', 1704, 'l', 40, '🏹', ['Arco Lendário Longo', 'Legendary Longbow', 'Arco Largo Legendario', '伝説の長弓'], [1, 230, 4, 40, 7, 30, 21, 14, 22, 50]],
  // ── Cajados 2H ──
  ['w2h_1750', 1750, 'c', 5, '🪄', ['Cajado de Nogueira', 'Walnut Staff', 'Bastón de Nogal', 'クルミの杖'], [1, 10, 6, 20, 8, 3]],
  ['w2h_1751', 1751, 'u', 12, '🪄', ['Cajado do Mago', "Mage's Staff", 'Bastón del Mago', '魔法使いの杖'], [1, 18, 6, 45, 8, 8, 11, 100]],
  ['w2h_1752', 1752, 'r', 20, '🪄', ['Cajado Arcano Maior', 'Greater Arcane Staff', 'Bastón Arcano Mayor', '大秘法の杖'], [1, 28, 6, 80, 8, 15, 11, 200]],
  ['w2h_1753', 1753, 'e', 30, '🪄', ['Cajado do Eclipse', 'Staff of the Eclipse', 'Bastón del Eclipse', '日食の杖'], [1, 40, 6, 130, 8, 25, 11, 350, 26, 15]],
  ['w2h_1754', 1754, 'l', 40, '🪄', ['Cajado Lendário', 'Legendary Staff', 'Bastón Legendario', '伝説の杖'], [1, 60, 6, 200, 8, 40, 11, 600, 26, 25]],
  ['w2h_1755', 1755, 'R', 50, '🪄', ['Cajado de Velkaryn', 'Staff of Velkaryn', 'Bastón de Velkaryn', 'ヴェルカリンの杖'], [1, 80, 6, 300, 8, 60, 11, 1000, 26, 35, 80, 10]]
];
const W2H_META = { file: 'weapons2h', groups: { 1500: 'great_sword', 1600: 'hammer', 1650: 'spear', 1700: 'bow_long', 1750: 'staff_two' } };

const OH = [
  ['oh_2000', 2000, 'c', 1, '🛡', ['Tábua de Madeira', 'Wooden Plank', 'Tabla de Madera', '木の板'], [2, 12], 'shield'],
  ['oh_2001', 2001, 'c', 3, '🛡', ['Escudo de Madeira', 'Wooden Shield', 'Escudo de Madera', '木の盾'], [2, 20], 'shield'],
  ['oh_2002', 2002, 'u', 10, '🛡', ['Escudo de Ferro', 'Iron Shield', 'Escudo de Hierro', '鉄の盾'], [2, 35, 5, 5], 'shield'],
  ['oh_2003', 2003, 'r', 20, '🛡', ['Escudo Arcano', 'Arcane Shield', 'Escudo Arcano', '秘法の盾'], [2, 55, 5, 10, 23, 10], 'shield'],
  ['oh_2004', 2004, 'e', 30, '🛡', ['Escudo do Eclipse', 'Shield of the Eclipse', 'Escudo del Eclipse', '日食の盾'], [2, 85, 5, 18, 23, 20, 73, 20], 'shield'],
  ['oh_2005', 2005, 'l', 40, '🛡', ['Escudo Lendário', 'Legendary Shield', 'Escudo Legendario', '伝説の盾'], [2, 130, 5, 30, 23, 35, 10, 300, 73, 30], 'shield'],
  ['oh_2100', 2100, 'u', 8, '🗡', ['Adaga Off-Hand', 'Off-Hand Dagger', 'Daga Secundaria', '副手の短剣'], [1, 18, 4, 5], 'dagger_off'],
  ['oh_2101', 2101, 'r', 20, '🗡', ['Adaga das Sombras Off', 'Off-Hand Shadow Dagger', 'Daga Sombría Secundaria', '副手の影の短剣'], [1, 42, 4, 10, 7, 5], 'dagger_off'],
  ['oh_2102', 2102, 'e', 32, '🗡', ['Adaga do Eclipse Off', 'Off-Hand Eclipse Dagger', 'Daga del Eclipse Secundaria', '副手の日食の短剣'], [1, 75, 4, 18, 7, 10, 21, 5], 'dagger_off'],
  ['oh_2150', 2150, 'u', 8, '🔮', ['Orbe Arcano', 'Arcane Orb', 'Orbe Arcano', '秘法のオーブ'], [6, 18, 11, 60], 'orb'],
  ['oh_2151', 2151, 'r', 18, '🔮', ['Orbe das Trevas', 'Orb of Darkness', 'Orbe de las Tinieblas', '闇のオーブ'], [6, 38, 11, 120, 8, 5], 'orb'],
  ['oh_2152', 2152, 'e', 30, '🔮', ['Orbe do Eclipse', 'Orb of the Eclipse', 'Orbe del Eclipse', '日食のオーブ'], [6, 65, 11, 220, 8, 12], 'orb'],
  ['oh_2153', 2153, 'l', 40, '🔮', ['Orbe Lendário', 'Legendary Orb', 'Orbe Legendario', '伝説のオーブ'], [6, 100, 11, 380, 8, 22, 26, 15], 'orb'],
  ['oh_2200', 2200, 'u', 10, '📖', ['Tomo Antigo', 'Ancient Tome', 'Tomo Antiguo', '古の書'], [6, 25, 8, 6, 11, 80], 'tome'],
  ['oh_2201', 2201, 'r', 20, '📖', ['Tomo das Ruínas', 'Tome of the Ruins', 'Tomo de las Ruinas', '遺跡の書'], [6, 45, 8, 12, 11, 160], 'tome'],
  ['oh_2202', 2202, 'e', 30, '📖', ['Tomo do Eclipse', 'Tome of the Eclipse', 'Tomo del Eclipse', '日食の書'], [6, 75, 8, 20, 11, 280, 26, 10], 'tome'],
  ['oh_2203', 2203, 'l', 40, '📖', ['Tomo Lendário', 'Legendary Tome', 'Tomo Legendario', '伝説の書'], [6, 115, 8, 32, 11, 450, 26, 20], 'tome']
];

const HEAD = [
  ['hd_2500', 2500, 'c', 1, '🪖', ['Elmo Simples', 'Simple Helm', 'Yelmo Simple', '素朴な兜'], [2, 12]],
  ['hd_2501', 2501, 'c', 3, '🪖', ['Elmo de Couro', 'Leather Helm', 'Yelmo de Cuero', '革の兜'], [2, 20, 5, 2]],
  ['hd_2502', 2502, 'u', 8, '🪖', ['Elmo de Ferro', 'Iron Helm', 'Yelmo de Hierro', '鉄の兜'], [2, 35, 5, 5]],
  ['hd_2503', 2503, 'r', 16, '🪖', ['Elmo da Guarda', "Guard's Helm", 'Yelmo de la Guardia', '衛兵の兜'], [2, 55, 5, 10, 3, 5]],
  ['hd_2504', 2504, 'e', 28, '🪖', ['Elmo Sombrio', 'Shadow Helm', 'Yelmo Sombrío', '影の兜'], [2, 85, 5, 18, 3, 10, 10, 150]],
  ['hd_2505', 2505, 'l', 38, '🪖', ['Elmo Lendário', 'Legendary Helm', 'Yelmo Legendario', '伝説の兜'], [2, 130, 5, 28, 3, 18, 10, 300]],
  ['hd_2506', 2506, 'R', 50, '🪖', ['Elmo do Fragmento', 'Helm of the Fragment', 'Yelmo del Fragmento', '欠片の兜'], [2, 200, 5, 40, 3, 25, 10, 500, 57, 200]],
  ['hd_2600', 2600, 'c', 2, '🧢', ['Capuz de Couro', 'Leather Hood', 'Capucha de Cuero', '革の頭巾'], [2, 8, 4, 3]],
  ['hd_2601', 2601, 'u', 10, '🧢', ['Capuz Sombrio', 'Shadow Hood', 'Capucha Sombría', '影の頭巾'], [2, 22, 4, 8, 7, 4]],
  ['hd_2602', 2602, 'r', 20, '🧢', ['Capuz da Névoa', 'Mist Hood', 'Capucha de la Niebla', '霧の頭巾'], [2, 38, 4, 14, 7, 8]],
  ['hd_2603', 2603, 'e', 30, '🧢', ['Capuz do Eclipse', 'Eclipse Hood', 'Capucha del Eclipse', '日食の頭巾'], [2, 60, 4, 22, 7, 15, 21, 4]],
  ['hd_2700', 2700, 'u', 8, '👑', ['Tiara Mágica', 'Magic Tiara', 'Tiara Mágica', '魔法のティアラ'], [2, 18, 6, 12, 11, 60]],
  ['hd_2701', 2701, 'r', 18, '👑', ['Coroa Arcana', 'Arcane Crown', 'Corona Arcana', '秘法の冠'], [2, 30, 6, 28, 11, 150, 8, 5]],
  ['hd_2702', 2702, 'e', 30, '👑', ['Coroa do Eclipse', 'Crown of the Eclipse', 'Corona del Eclipse', '日食の冠'], [2, 48, 6, 50, 11, 280, 8, 12]],
  ['hd_2703', 2703, 'l', 40, '👑', ['Coroa Lendária', 'Legendary Crown', 'Corona Legendaria', '伝説の冠'], [2, 70, 6, 80, 11, 480, 8, 22, 26, 10]]
];

const CHEST = [
  ['ch_3000', 3000, 'c', 1, '🥋', ['Vestimenta de Couro', 'Leather Garb', 'Atuendo de Cuero', '革の服'], [2, 20]],
  ['ch_3001', 3001, 'c', 4, '🥋', ['Vestimenta Acolchoada', 'Padded Garb', 'Atuendo Acolchado', '綿入りの服'], [2, 30, 5, 2]],
  ['ch_3002', 3002, 'u', 10, '🥋', ['Cota de Ferro', 'Iron Mail', 'Cota de Hierro', '鉄の鎧'], [2, 48, 5, 5]],
  ['ch_3003', 3003, 'r', 18, '🥋', ['Cota da Guarda', "Guard's Mail", 'Cota de la Guardia', '衛兵の鎧'], [2, 75, 5, 10, 3, 5]],
  ['ch_3004', 3004, 'e', 28, '🥋', ['Cota Sombria', 'Shadow Mail', 'Cota Sombría', '影の鎧'], [2, 110, 5, 18, 3, 10, 10, 200]],
  ['ch_3005', 3005, 'l', 38, '🥋', ['Cota Lendária', 'Legendary Mail', 'Cota Legendaria', '伝説の鎧'], [2, 165, 5, 28, 3, 18, 10, 400]],
  ['ch_3006', 3006, 'R', 50, '🥋', ['Cota do Fragmento', 'Mail of the Fragment', 'Cota del Fragmento', '欠片の鎧'], [2, 240, 5, 40, 3, 28, 10, 700, 57, 300]],
  ['ch_3100', 3100, 'c', 2, '🧥', ['Veste de Couro', 'Leather Vest', 'Vestidura de Cuero', '革の衣'], [2, 14, 4, 4]],
  ['ch_3101', 3101, 'u', 10, '🧥', ['Veste Sombria', 'Shadow Vest', 'Vestidura Sombría', '影の衣'], [2, 28, 4, 10, 7, 4]],
  ['ch_3102', 3102, 'r', 20, '🧥', ['Veste da Névoa', 'Mist Vest', 'Vestidura de la Niebla', '霧の衣'], [2, 48, 4, 18, 7, 8]],
  ['ch_3103', 3103, 'e', 30, '🧥', ['Veste do Eclipse', 'Eclipse Vest', 'Vestidura del Eclipse', '日食の衣'], [2, 75, 4, 28, 7, 15, 21, 4]],
  ['ch_3104', 3104, 'l', 40, '🧥', ['Veste Lendária', 'Legendary Vest', 'Vestidura Legendaria', '伝説の衣'], [2, 110, 4, 40, 7, 25, 21, 8]],
  ['ch_3200', 3200, 'c', 3, '👘', ['Robe de Aprendiz', "Apprentice's Robe", 'Túnica del Aprendiz', '見習いのローブ'], [2, 12, 6, 10, 11, 50]],
  ['ch_3201', 3201, 'u', 10, '👘', ['Robe Arcano', 'Arcane Robe', 'Túnica Arcana', '秘法のローブ'], [2, 22, 6, 25, 11, 120, 8, 4]],
  ['ch_3202', 3202, 'r', 20, '👘', ['Robe das Ruínas', 'Robe of the Ruins', 'Túnica de las Ruinas', '遺跡のローブ'], [2, 35, 6, 45, 11, 220, 8, 10]],
  ['ch_3203', 3203, 'e', 30, '👘', ['Robe do Eclipse', 'Robe of the Eclipse', 'Túnica del Eclipse', '日食のローブ'], [2, 55, 6, 75, 11, 380, 8, 18]],
  ['ch_3204', 3204, 'l', 40, '👘', ['Robe Lendário', 'Legendary Robe', 'Túnica Legendaria', '伝説のローブ'], [2, 80, 6, 120, 11, 600, 8, 30]],
  ['ch_3205', 3205, 'R', 50, '👘', ['Robe de Velkaryn', 'Robe of Velkaryn', 'Túnica de Velkaryn', 'ヴェルカリンのローブ'], [2, 110, 6, 180, 11, 900, 8, 45, 26, 15]]
];

const LEGS = [
  ['lg_3500', 3500, 'c', 1, '👖', ['Calça de Couro', 'Leather Pants', 'Pantalones de Cuero', '革のズボン'], [2, 14]],
  ['lg_3501', 3501, 'c', 4, '👖', ['Calça Acolchoada', 'Padded Pants', 'Pantalones Acolchados', '綿入りのズボン'], [2, 22, 5, 2]],
  ['lg_3502', 3502, 'u', 10, '👖', ['Calça de Ferro', 'Iron Pants', 'Pantalones de Hierro', '鉄のズボン'], [2, 36, 5, 5]],
  ['lg_3503', 3503, 'r', 18, '👖', ['Calça da Guarda', "Guard's Pants", 'Pantalones de la Guardia', '衛兵のズボン'], [2, 58, 5, 10, 3, 4]],
  ['lg_3504', 3504, 'e', 28, '👖', ['Calça Sombria', 'Shadow Pants', 'Pantalones Sombríos', '影のズボン'], [2, 88, 5, 16, 3, 8, 10, 150]],
  ['lg_3505', 3505, 'l', 38, '👖', ['Calça Lendária', 'Legendary Pants', 'Pantalones Legendarios', '伝説のズボン'], [2, 130, 5, 25, 3, 15, 10, 300]],
  ['lg_3600', 3600, 'c', 2, '🩳', ['Perneiras de Couro', 'Leather Leggings', 'Polainas de Cuero', '革の脚当て'], [2, 10, 4, 4]],
  ['lg_3601', 3601, 'u', 10, '🩳', ['Perneiras Sombrias', 'Shadow Leggings', 'Polainas Sombrías', '影の脚当て'], [2, 20, 4, 10, 7, 3]],
  ['lg_3602', 3602, 'r', 20, '🩳', ['Perneiras da Névoa', 'Mist Leggings', 'Polainas de la Niebla', '霧の脚当て'], [2, 34, 4, 18, 7, 7]],
  ['lg_3603', 3603, 'e', 30, '🩳', ['Perneiras do Eclipse', 'Eclipse Leggings', 'Polainas del Eclipse', '日食の脚当て'], [2, 55, 4, 28, 7, 14, 21, 3]],
  ['lg_3700', 3700, 'c', 3, '🎐', ['Calça Mágica', 'Magic Pants', 'Pantalones Mágicos', '魔法のズボン'], [2, 10, 6, 8, 11, 40]],
  ['lg_3701', 3701, 'u', 10, '🎐', ['Calça Arcana', 'Arcane Pants', 'Pantalones Arcanos', '秘法のズボン'], [2, 18, 6, 20, 11, 100, 8, 3]],
  ['lg_3702', 3702, 'r', 20, '🎐', ['Calça das Ruínas', 'Pants of the Ruins', 'Pantalones de las Ruinas', '遺跡のズボン'], [2, 28, 6, 36, 11, 180, 8, 8]],
  ['lg_3703', 3703, 'e', 30, '🎐', ['Calça do Eclipse', 'Eclipse Pants', 'Pantalones del Eclipse', '日食のズボン'], [2, 44, 6, 60, 11, 300, 8, 15]],
  ['lg_3704', 3704, 'l', 40, '🎐', ['Calça Mágica Lendária', 'Legendary Magic Pants', 'Pantalones Mágicos Legendarios', '伝説の魔法ズボン'], [2, 65, 6, 95, 11, 480, 8, 24, 26, 8]]
];

const GLOVES = [
  ['gl_4000', 4000, 'c', 1, '🧤', ['Luvas de Couro', 'Leather Gloves', 'Guantes de Cuero', '革の手袋'], [2, 8, 3, 2]],
  ['gl_4001', 4001, 'c', 4, '🧤', ['Luvas Acolchoadas', 'Padded Gloves', 'Guantes Acolchados', '綿入り手袋'], [2, 14, 3, 4]],
  ['gl_4002', 4002, 'u', 10, '🧤', ['Luvas de Ferro', 'Iron Gloves', 'Guantes de Hierro', '鉄の手袋'], [2, 24, 3, 7, 5, 3]],
  ['gl_4003', 4003, 'r', 18, '🧤', ['Luvas da Guarda', "Guard's Gloves", 'Guantes de la Guardia', '衛兵の手袋'], [2, 38, 3, 12, 5, 6, 21, 3]],
  ['gl_4004', 4004, 'e', 28, '🧤', ['Luvas Sombrias', 'Shadow Gloves', 'Guantes Sombríos', '影の手袋'], [2, 58, 3, 20, 5, 10, 21, 5, 22, 15]],
  ['gl_4005', 4005, 'l', 38, '🧤', ['Luvas Lendárias', 'Legendary Gloves', 'Guantes Legendarios', '伝説の手袋'], [2, 88, 3, 30, 5, 15, 21, 8, 22, 25]],
  ['gl_4100', 4100, 'c', 2, '🧤', ['Luvas Leves', 'Light Gloves', 'Guantes Ligeros', '軽量手袋'], [2, 6, 4, 4]],
  ['gl_4101', 4101, 'u', 10, '🧤', ['Luvas do Espectro', 'Specter Gloves', 'Guantes del Espectro', '幽霊の手袋'], [2, 14, 4, 10, 7, 4]],
  ['gl_4102', 4102, 'r', 20, '🧤', ['Luvas da Névoa', 'Mist Gloves', 'Guantes de la Niebla', '霧の手袋'], [2, 24, 4, 18, 7, 8, 21, 4]],
  ['gl_4103', 4103, 'e', 30, '🧤', ['Luvas do Eclipse', 'Eclipse Gloves', 'Guantes del Eclipse', '日食の手袋'], [2, 38, 4, 28, 7, 15, 21, 8, 22, 20]],
  ['gl_4200', 4200, 'c', 3, '🧤', ['Luvas Mágicas', 'Magic Gloves', 'Guantes Mágicos', '魔法の手袋'], [2, 6, 6, 8, 11, 30]],
  ['gl_4201', 4201, 'u', 10, '🧤', ['Luvas Arcanas', 'Arcane Gloves', 'Guantes Arcanos', '秘法の手袋'], [2, 12, 6, 18, 11, 80, 8, 3]],
  ['gl_4202', 4202, 'r', 20, '🧤', ['Luvas das Ruínas', 'Gloves of the Ruins', 'Guantes de las Ruinas', '遺跡の手袋'], [2, 20, 6, 32, 11, 150, 8, 7]],
  ['gl_4203', 4203, 'e', 30, '🧤', ['Manoplas do Eclipse', 'Eclipse Gauntlets', 'Guanteletes del Eclipse', '日食の籠手'], [2, 32, 6, 55, 11, 260, 8, 14]],
  ['gl_4204', 4204, 'l', 40, '🧤', ['Luvas Mágicas Lendárias', 'Legendary Magic Gloves', 'Guantes Mágicos Legendarios', '伝説の魔法手袋'], [2, 48, 6, 85, 11, 400, 8, 22, 26, 10]]
];

const BOOTS = [
  ['bt_4500', 4500, 'c', 1, '🥾', ['Botas de Couro', 'Leather Boots', 'Botas de Cuero', '革の靴'], [2, 10, 4, 2]],
  ['bt_4501', 4501, 'c', 4, '🥾', ['Botas Acolchoadas', 'Padded Boots', 'Botas Acolchadas', '綿入りの靴'], [2, 16, 4, 3, 5, 2]],
  ['bt_4502', 4502, 'u', 10, '🥾', ['Botas de Ferro', 'Iron Boots', 'Botas de Hierro', '鉄の靴'], [2, 26, 4, 5, 5, 5]],
  ['bt_4503', 4503, 'r', 18, '🥾', ['Botas da Guarda', "Guard's Boots", 'Botas de la Guardia', '衛兵の靴'], [2, 42, 4, 8, 5, 10]],
  ['bt_4504', 4504, 'e', 28, '🥾', ['Botas Sombrias', 'Shadow Boots', 'Botas Sombrías', '影の靴'], [2, 64, 4, 12, 5, 16, 10, 120]],
  ['bt_4505', 4505, 'l', 38, '🥾', ['Botas Lendárias', 'Legendary Boots', 'Botas Legendarias', '伝説の靴'], [2, 95, 4, 18, 5, 25, 10, 250]],
  ['bt_4600', 4600, 'c', 2, '👟', ['Botas Leves', 'Light Boots', 'Botas Ligeras', '軽量靴'], [2, 7, 4, 5]],
  ['bt_4601', 4601, 'u', 10, '👟', ['Botas do Espectro', 'Specter Boots', 'Botas del Espectro', '幽霊の靴'], [2, 15, 4, 12, 7, 3]],
  ['bt_4602', 4602, 'r', 20, '👟', ['Botas da Névoa', 'Mist Boots', 'Botas de la Niebla', '霧の靴'], [2, 25, 4, 20, 7, 7]],
  ['bt_4603', 4603, 'e', 30, '👟', ['Botas do Eclipse', 'Eclipse Boots', 'Botas del Eclipse', '日食の靴'], [2, 40, 4, 30, 7, 14, 21, 3]],
  ['bt_4700', 4700, 'c', 3, '🩴', ['Botas Mágicas', 'Magic Boots', 'Botas Mágicas', '魔法の靴'], [2, 7, 6, 6, 11, 30]],
  ['bt_4701', 4701, 'u', 10, '🩴', ['Botas Arcanas', 'Arcane Boots', 'Botas Arcanas', '秘法の靴'], [2, 14, 6, 14, 11, 80, 8, 3]],
  ['bt_4702', 4702, 'r', 20, '🩴', ['Botas das Ruínas', 'Boots of the Ruins', 'Botas de las Ruinas', '遺跡の靴'], [2, 22, 6, 26, 11, 150, 8, 7]],
  ['bt_4703', 4703, 'e', 30, '🩴', ['Sandálias do Eclipse', 'Eclipse Sandals', 'Sandalias del Eclipse', '日食のサンダル'], [2, 35, 6, 45, 11, 260, 8, 14]],
  ['bt_4704', 4704, 'l', 40, '🩴', ['Botas de Velkaryn', 'Boots of Velkaryn', 'Botas de Velkaryn', 'ヴェルカリンの靴'], [2, 52, 6, 70, 11, 400, 8, 22, 26, 8]]
];

const EARRINGS = [
  ['er_5000', 5000, 'c', 1, '💠', ['Brinco de Bronze', 'Bronze Earring', 'Pendiente de Bronce', '青銅の耳飾り'], [7, 3, 9, 1]],
  ['er_5001', 5001, 'u', 8, '💠', ['Brinco de Prata', 'Silver Earring', 'Pendiente de Plata', '銀の耳飾り'], [7, 6, 9, 2, 4, 3]],
  ['er_5002', 5002, 'r', 18, '💠', ['Brinco de Ouro', 'Gold Earring', 'Pendiente de Oro', '金の耳飾り'], [7, 12, 9, 5, 4, 6, 21, 3]],
  ['er_5003', 5003, 'e', 28, '💠', ['Brinco Sombrio', 'Shadow Earring', 'Pendiente Sombrío', '影の耳飾り'], [7, 20, 9, 10, 4, 10, 21, 6, 22, 15]],
  ['er_5004', 5004, 'l', 38, '💠', ['Brinco Lendário', 'Legendary Earring', 'Pendiente Legendario', '伝説の耳飾り'], [7, 30, 9, 18, 4, 15, 21, 10, 22, 25]],
  ['er_5100', 5100, 'u', 10, '💠', ['Brinco da Sorte', 'Lucky Earring', 'Pendiente de la Suerte', '幸運の耳飾り'], [9, 8, 7, 2]],
  ['er_5101', 5101, 'r', 20, '💠', ['Brinco da Fortuna', 'Fortune Earring', 'Pendiente de la Fortuna', '運命の耳飾り'], [9, 15, 7, 5, 8, 4]],
  ['er_5102', 5102, 'e', 30, '💠', ['Brinco do Destino', 'Destiny Earring', 'Pendiente del Destino', '宿命の耳飾り'], [9, 25, 7, 10, 8, 8]],
  ['er_5200', 5200, 'r', 15, '💠', ['Brinco de Fogo', 'Fire Earring', 'Pendiente de Fuego', '炎の耳飾り'], [1, 8, 6, 5, 23, 5]],
  ['er_5201', 5201, 'r', 15, '💠', ['Brinco de Gelo', 'Ice Earring', 'Pendiente de Hielo', '氷の耳飾り'], [2, 8, 6, 5, 23, 8]],
  ['er_5202', 5202, 'e', 25, '💠', ['Brinco de Raio', 'Lightning Earring', 'Pendiente del Rayo', '雷の耳飾り'], [4, 10, 6, 8, 23, 12]],
  ['er_5203', 5203, 'l', 35, '💠', ['Brinco do Vazio', 'Void Earring', 'Pendiente del Vacío', '虚空の耳飾り'], [1, 15, 6, 15, 23, 20, 7, 8]]
];

const NECKLACES = [
  ['nk_5500', 5500, 'c', 1, '📿', ['Colar de Couro', 'Leather Necklace', 'Collar de Cuero', '革の首飾り'], [5, 5, 10, 50]],
  ['nk_5501', 5501, 'u', 8, '📿', ['Colar de Ferro', 'Iron Necklace', 'Collar de Hierro', '鉄の首飾り'], [5, 10, 10, 120, 3, 4]],
  ['nk_5502', 5502, 'r', 18, '📿', ['Colar de Aço', 'Steel Necklace', 'Collar de Acero', '鋼の首飾り'], [5, 18, 10, 220, 3, 8, 2, 10]],
  ['nk_5503', 5503, 'e', 28, '📿', ['Colar da Guarda', "Guard's Necklace", 'Collar de la Guardia', '衛兵の首飾り'], [5, 28, 10, 380, 3, 14, 2, 18]],
  ['nk_5504', 5504, 'l', 38, '📿', ['Colar Lendário', 'Legendary Necklace', 'Collar Legendario', '伝説の首飾り'], [5, 40, 10, 580, 3, 22, 2, 28, 55, 15]],
  ['nk_5600', 5600, 'c', 3, '📿', ['Colar Arcano', 'Arcane Necklace', 'Collar Arcano', '秘法の首飾り'], [6, 8, 11, 60, 8, 2]],
  ['nk_5601', 5601, 'u', 10, '📿', ['Colar das Ruínas', 'Necklace of the Ruins', 'Collar de las Ruinas', '遺跡の首飾り'], [6, 18, 11, 140, 8, 5]],
  ['nk_5602', 5602, 'r', 20, '📿', ['Colar do Eclipse', 'Necklace of the Eclipse', 'Collar del Eclipse', '日食の首飾り'], [6, 32, 11, 250, 8, 10]],
  ['nk_5603', 5603, 'e', 30, '📿', ['Colar do Véu', 'Necklace of the Veil', 'Collar del Velo', 'ヴェールの首飾り'], [6, 52, 11, 420, 8, 18]],
  ['nk_5604', 5604, 'l', 40, '📿', ['Colar Mágico Lendário', 'Legendary Magic Necklace', 'Collar Mágico Legendario', '伝説の魔法首飾り'], [6, 80, 11, 650, 8, 28, 26, 10]],
  ['nk_5605', 5605, 'R', 50, '📿', ['Colar de Velkaryn', 'Necklace of Velkaryn', 'Collar de Velkaryn', 'ヴェルカリンの首飾り'], [6, 120, 11, 1000, 8, 42, 26, 20]],
  ['nk_5700', 5700, 'u', 8, '📿', ['Colar da Sorte', 'Lucky Necklace', 'Collar de la Suerte', '幸運の首飾り'], [9, 8, 7, 3]],
  ['nk_5701', 5701, 'r', 18, '📿', ['Colar da Fortuna', 'Fortune Necklace', 'Collar de la Fortuna', '運命の首飾り'], [9, 18, 7, 7, 8, 4]],
  ['nk_5702', 5702, 'l', 35, '📿', ['Colar do Destino', 'Destiny Necklace', 'Collar del Destino', '宿命の首飾り'], [9, 35, 7, 15, 6, 15, 8, 10]]
];

const BELTS = [
  ['bt_6000', 6000, 'c', 1, '🧷', ['Cinto de Couro', 'Leather Belt', 'Cinturón de Cuero', '革の帯'], [5, 4, 3, 2]],
  ['bt_6001', 6001, 'u', 8, '🧷', ['Cinto de Ferro', 'Iron Belt', 'Cinturón de Hierro', '鉄の帯'], [5, 8, 3, 6, 10, 80]],
  ['bt_6002', 6002, 'r', 18, '🧷', ['Cinto de Aço', 'Steel Belt', 'Cinturón de Acero', '鋼の帯'], [5, 14, 3, 10, 10, 160, 2, 8]],
  ['bt_6003', 6003, 'e', 28, '🧷', ['Cinto da Guarda', "Guard's Belt", 'Cinturón de la Guardia', '衛兵の帯'], [5, 22, 3, 16, 10, 280, 2, 14]],
  ['bt_6004', 6004, 'l', 38, '🧷', ['Cinto Lendário', 'Legendary Belt', 'Cinturón Legendario', '伝説の帯'], [5, 32, 3, 24, 10, 440, 2, 22, 55, 10]],
  ['bt_6100', 6100, 'c', 3, '🧷', ['Cinto Arcano', 'Arcane Belt', 'Cinturón Arcano', '秘法の帯'], [6, 6, 11, 50, 8, 2]],
  ['bt_6101', 6101, 'r', 18, '🧷', ['Cinto das Ruínas', 'Belt of the Ruins', 'Cinturón de las Ruinas', '遺跡の帯'], [6, 20, 11, 160, 8, 8]],
  ['bt_6102', 6102, 'l', 35, '🧷', ['Cinto do Eclipse', 'Belt of the Eclipse', 'Cinturón del Eclipse', '日食の帯'], [6, 50, 11, 400, 8, 20, 26, 12]]
];

const RESIST = [
  ['rs_6500', 6500, 'c', 2, '🔰', ['Proteção de Couro', 'Leather Protection', 'Protección de Cuero', '革の護り'], [2, 8, 23, 8]],
  ['rs_6501', 6501, 'u', 10, '🔰', ['Proteção de Ferro', 'Iron Protection', 'Protección de Hierro', '鉄の護り'], [2, 16, 23, 18, 5, 5]],
  ['rs_6502', 6502, 'r', 20, '🔰', ['Proteção de Aço', 'Steel Protection', 'Protección de Acero', '鋼の護り'], [2, 28, 23, 30, 5, 10]],
  ['rs_6503', 6503, 'l', 35, '🔰', ['Proteção Lendária', 'Legendary Protection', 'Protección Legendaria', '伝説の護り'], [2, 42, 23, 45, 5, 16]],
  ['rs_6600', 6600, 'r', 15, '🔰', ['Proteção de Fogo', 'Fire Protection', 'Protección de Fuego', '炎の護り'], [23, 15, 6, 4]],
  ['rs_6601', 6601, 'e', 25, '🔰', ['Proteção de Gelo', 'Ice Protection', 'Protección de Hielo', '氷の護り'], [23, 28, 6, 10, 2, 8]],
  ['rs_6700', 6700, 'r', 20, '🔰', ['Proteção Arcana', 'Arcane Protection', 'Protección Arcana', '秘法の護り'], [23, 20, 6, 15, 8, 6]],
  ['rs_6701', 6701, 'e', 30, '🔰', ['Proteção do Eclipse', 'Protection of the Eclipse', 'Protección del Eclipse', '日食の護り'], [23, 35, 6, 25, 8, 12, 2, 14]],
  ['rs_6702', 6702, 'R', 45, '🔰', ['Proteção de Velkaryn', 'Protection of Velkaryn', 'Protección de Velkaryn', 'ヴェルカリンの護り'], [23, 55, 6, 40, 8, 20, 2, 25, 5, 15]]
];

const AMULETS = [
  ['am_7000', 7000, 'c', 1, '🧿', ['Amuleto Simples', 'Simple Amulet', 'Amuleto Simple', '素朴な護符'], [9, 4]],
  ['am_7001', 7001, 'u', 8, '🧿', ['Amuleto da Sorte', 'Lucky Amulet', 'Amuleto de la Suerte', '幸運の護符'], [9, 8, 7, 3]],
  ['am_7002', 7002, 'r', 15, '🧿', ['Amuleto da Fortuna', 'Fortune Amulet', 'Amuleto de la Fortuna', '運命の護符'], [9, 15, 7, 6, 4, 4]],
  ['am_7003', 7003, 'e', 25, '🧿', ['Amuleto do Destino', 'Destiny Amulet', 'Amuleto del Destino', '宿命の護符'], [9, 25, 7, 12, 4, 8, 8, 5]],
  ['am_7004', 7004, 'l', 35, '🧿', ['Amuleto Lendário', 'Legendary Amulet', 'Amuleto Legendario', '伝説の護符'], [9, 38, 7, 20, 4, 12, 8, 10]],
  ['am_7005', 7005, 'R', 45, '🧿', ['Amuleto do Fragmento', 'Amulet of the Fragment', 'Amuleto del Fragmento', '欠片の護符'], [9, 50, 7, 30, 4, 18, 8, 15, 6, 10]],
  ['am_7100', 7100, 'u', 8, '🧿', ['Amuleto do Poder', 'Amulet of Power', 'Amuleto del Poder', '力の護符'], [3, 8, 1, 10]],
  ['am_7101', 7101, 'r', 18, '🧿', ['Amuleto da Fúria', 'Amulet of Fury', 'Amuleto de la Furia', '憤怒の護符'], [3, 15, 1, 20, 21, 4]],
  ['am_7102', 7102, 'e', 30, '🧿', ['Amuleto da Devastação', 'Amulet of Devastation', 'Amuleto de la Devastación', '破壊の護符'], [3, 24, 1, 32, 21, 7, 22, 20]],
  ['am_7200', 7200, 'r', 15, '🧿', ['Amuleto de Fogo', 'Fire Amulet', 'Amuleto de Fuego', '炎の護符'], [6, 15, 1, 8, 23, 10]],
  ['am_7201', 7201, 'r', 15, '🧿', ['Amuleto de Gelo', 'Ice Amulet', 'Amuleto de Hielo', '氷の護符'], [6, 15, 2, 10, 23, 12]],
  ['am_7202', 7202, 'l', 35, '🧿', ['Amuleto do Vazio', 'Void Amulet', 'Amuleto del Vacío', '虚空の護符'], [6, 35, 9, 20, 23, 30, 8, 12]]
];

module.exports = { R, W1H, W1H_META, W2H, W2H_META, OH, HEAD, CHEST, LEGS, GLOVES, BOOTS, EARRINGS, NECKLACES, BELTS, RESIST, AMULETS };
