import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { Player } from '../models/Player.js';

export const playerRoutes = Router();

/**
 * Concessão de crystals (moeda paga). Protegida por ADMIN_KEY —
 * usar para vendas out-of-band (PIX, loja externa etc.).
 */
playerRoutes.post('/crystals/grant', async (req, res) => {
  try {
    const adminKey = process.env.ADMIN_KEY;
    const providedKey = String(req.headers['x-admin-key'] ?? req.body?.adminKey ?? '');

    if (!adminKey || providedKey !== adminKey) {
      return res.status(403).json({ message: 'Chave de administração inválida' });
    }

    const { charName } = req.body ?? {};
    const amount = Math.floor(Number(req.body?.amount));

    if (!Number.isFinite(amount) || amount < 1 || amount > 1_000_000) {
      return res.status(400).json({ message: 'Quantidade inválida' });
    }

    const player = await Player.findOne({ 'characters.name': String(charName ?? '').trim() });
    const character = player?.characters.find((c) => c.name === String(charName ?? '').trim());

    if (!character) {
      return res.status(404).json({ message: 'Personagem não encontrado' });
    }

    character.crystals = (character.crystals ?? 0) + amount;
    await player.save();

    return res.json({ charName: character.name, crystals: character.crystals });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao conceder crystals', error: error.message });
  }
});

const MAX_CHARACTERS = 5;

// ORIGENS são cosméticas (retrato/sigilo/identidade) — não dão atributos.
// Atributos iniciais são neutros; o jogador molda o personagem com pontos
// livres e PROEFICIÊNCIAS DE ARMA.
const ORIGINS = ['blade', 'arcane', 'druid', 'vanguard', 'ranger', 'spectre'];

const NEUTRAL_DEFAULTS = {
  stats: { strength: 8, agility: 8, vitality: 8, arcana: 8, perception: 8, will: 8 },
  luck: { base: 5, equipment: 0, titles: 0, impulse: 0, events: 0 },
  hp: 480,
  mp: 300,
  skills: []
};

// Armas iniciais oferecidas na criação (nível 1) — a proficiência da arma
// escolhida começa com STARTING_PROFICIENCY pontos.
// itemStr usa o numId (formato validado pelo modelo: "numId" ou "numId|e:v").
const STARTING_WEAPONS = {
  w1h_1000: { category: 'sword_one', itemStr: '1000' },
  w1h_1100: { category: 'dagger', itemStr: '1100' },
  w1h_1150: { category: 'staff_one', itemStr: '1150' },
  w1h_1200: { category: 'bow_short', itemStr: '1200' }
};
const STARTING_PROFICIENCY = 5;

const emptyEquipment = {
  weapon_main: null,
  weapon_off: null,
  head: null,
  chest: null,
  legs: null,
  gloves: null,
  boots: null,
  earring: null,
  necklace: null,
  belt: null,
  resistance: null,
  amulet: null,
  spirit_stone: null,
  pet: null,
  mount: null
};

const emptyProficiencies = {};

const sanitizePlayer = (player) => {
  const plain = player.toObject();
  delete plain.password;
  return plain;
};

const getActiveCharacter = (player) => {
  return player.characters.find((character) => character._id.toString() === player.activeCharId) ?? player.characters[0] ?? null;
};

playerRoutes.use(authMiddleware);

playerRoutes.get('/me', async (req, res) => {
  try {
    const player = await Player.findById(req.playerId);

    if (!player) {
      return res.status(404).json({ message: 'Player não encontrado' });
    }

    return res.json(sanitizePlayer(player));
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao buscar player', error: error.message });
  }
});

playerRoutes.post('/create', async (req, res) => {
  try {
    const { name, archetype = 'blade', startingWeapon } = req.body;
    const player = await Player.findById(req.playerId);

    if (!player) {
      return res.status(404).json({ message: 'Player não encontrado' });
    }

    if (!name || name.trim().length < 3 || name.trim().length > 20) {
      return res.status(400).json({ message: 'Nome inválido' });
    }

    if (!ORIGINS.includes(archetype)) {
      return res.status(400).json({ message: 'Origem inválida' });
    }

    const startingWeaponDef = STARTING_WEAPONS[startingWeapon];

    if (startingWeapon && !startingWeaponDef) {
      return res.status(400).json({ message: 'Arma inicial inválida' });
    }

    if (player.characters.length >= MAX_CHARACTERS) {
      return res.status(400).json({ message: 'Limite de personagens atingido' });
    }

    const characterNameExists = await Player.exists({ 'characters.name': name.trim() });

    if (characterNameExists) {
      return res.status(409).json({ message: 'Nome de personagem já existe' });
    }

    const defaults = NEUTRAL_DEFAULTS;
    const equipment = startingWeaponDef
      ? { ...emptyEquipment, weapon_main: startingWeaponDef.itemStr }
      : emptyEquipment;
    const proficiencies = startingWeaponDef ? { [startingWeaponDef.category]: STARTING_PROFICIENCY } : {};
    const inventory = startingWeaponDef
      ? [{ itemStr: startingWeaponDef.itemStr, qty: 1 }]
      : [];
    const character = {
      name: name.trim(),
      archetype,
      level: 1,
      xp: 0,
      xpToNext: 100,
      gold: 100,
      crystals: 0,
      daily: null,
      hp: defaults.hp,
      maxHp: defaults.hp,
      mp: defaults.mp,
      maxMp: defaults.mp,
      stats: defaults.stats,
      luck: defaults.luck,
      freePoints: 5,
      equipment,
      inventory,
      maxInventory: 60,
      storage: [],
      maxStorage: 500,
      skills: defaults.skills,
      skillCooldowns: {},
      titles: [],
      activeTitle: null,
      proficiencies,
      kills: {},
      discoveries: [],
      weakPointHits: 0,
      rareDrops: 0,
      progress: {},
      createdAt: new Date(),
      lastLogin: new Date()
    };

    player.characters.push(character);
    const createdCharacter = player.characters[player.characters.length - 1];
    player.activeCharId = createdCharacter._id.toString();
    await player.save();

    return res.status(201).json({ character: createdCharacter, playerData: createdCharacter, player: sanitizePlayer(player) });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao criar personagem', error: error.message });
  }
});

playerRoutes.put('/save', async (req, res) => {
  try {
    const { playerData } = req.body;
    const player = await Player.findById(req.playerId);

    if (!player) {
      return res.status(404).json({ message: 'Player não encontrado' });
    }

    const activeCharacter = getActiveCharacter(player);

    if (!activeCharacter) {
      return res.status(404).json({ message: 'Personagem ativo não encontrado' });
    }

    const allowedFields = [
      'name',
      'archetype',
      'level',
      'xp',
      'xpToNext',
      'gold',
      'crystals',
      'daily',
      'hp',
      'maxHp',
      'mp',
      'maxMp',
      'stats',
      'luck',
      'freePoints',
      'equipment',
      'inventory',
      'maxInventory',
      'storage',
      'maxStorage',
      'skills',
      'skillCooldowns',
      'titles',
      'activeTitle',
      'proficiencies',
      'kills',
      'discoveries',
      'weakPointHits',
      'rareDrops',
      'progress'
    ];

    Object.entries(playerData ?? {}).forEach(([key, value]) => {
      if (allowedFields.includes(key)) {
        activeCharacter[key] = value;
      }
    });

    activeCharacter.lastLogin = new Date();
    player.activeCharId = activeCharacter._id.toString();
    await player.save();

    return res.json({ character: activeCharacter, player: sanitizePlayer(player) });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao salvar personagem', error: error.message });
  }
});


playerRoutes.post('/character/:id/select', async (req, res) => {
  try {
    const player = await Player.findById(req.playerId);

    if (!player) {
      return res.status(404).json({ message: 'Player não encontrado' });
    }

    const character = player.characters.id(req.params.id);

    if (!character) {
      return res.status(404).json({ message: 'Personagem não encontrado' });
    }

    character.lastLogin = new Date();
    player.activeCharId = character._id.toString();
    await player.save();

    return res.json({ character, playerData: character });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao selecionar personagem', error: error.message });
  }
});

playerRoutes.delete('/character/:id', async (req, res) => {
  try {
    const player = await Player.findById(req.playerId);

    if (!player) {
      return res.status(404).json({ message: 'Player não encontrado' });
    }

    if (player.characters.length <= 1) {
      return res.status(400).json({ message: 'Não é possível remover o último personagem' });
    }

    const character = player.characters.id(req.params.id);

    if (!character) {
      return res.status(404).json({ message: 'Personagem não encontrado' });
    }

    character.deleteOne();

    if (player.activeCharId === req.params.id) {
      player.activeCharId = player.characters[0]?._id.toString() ?? null;
    }

    await player.save();

    return res.json({ success: true, player: sanitizePlayer(player) });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao remover personagem', error: error.message });
  }
});
