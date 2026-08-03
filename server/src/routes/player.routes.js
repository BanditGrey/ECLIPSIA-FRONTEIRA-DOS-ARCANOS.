import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { Player } from '../models/Player.js';

export const playerRoutes = Router();

const MAX_CHARACTERS = 5;

const archetypeDefaults = {
  blade: {
    stats: { strength: 14, agility: 13, vitality: 9, arcana: 4, perception: 8, will: 6 },
    luck: { base: 5, equipment: 0, titles: 0, impulse: 0, events: 0 },
    hp: 550,
    mp: 200,
    skills: ['spin_slash']
  },
  arcane: {
    stats: { strength: 4, agility: 7, vitality: 7, arcana: 15, perception: 8, will: 14 },
    luck: { base: 5, equipment: 0, titles: 0, impulse: 0, events: 0 },
    hp: 400,
    mp: 500,
    skills: ['arcane_burst']
  },
  druid: {
    stats: { strength: 7, agility: 8, vitality: 11, arcana: 12, perception: 9, will: 11 },
    luck: { base: 5, equipment: 0, titles: 0, impulse: 0, events: 0 },
    hp: 500,
    mp: 420,
    skills: ['heal_pulse']
  },
  vanguard: {
    stats: { strength: 10, agility: 5, vitality: 16, arcana: 4, perception: 6, will: 9 },
    luck: { base: 5, equipment: 0, titles: 0, impulse: 0, events: 0 },
    hp: 750,
    mp: 180,
    skills: ['shield_bash']
  },
  ranger: {
    stats: { strength: 9, agility: 14, vitality: 8, arcana: 5, perception: 15, will: 6 },
    luck: { base: 5, equipment: 0, titles: 0, impulse: 0, events: 0 },
    hp: 480,
    mp: 280,
    skills: ['piercing_shot']
  },
  spectre: {
    stats: { strength: 8, agility: 15, vitality: 7, arcana: 8, perception: 13, will: 6 },
    luck: { base: 5, equipment: 0, titles: 0, impulse: 0, events: 0 },
    hp: 420,
    mp: 240,
    skills: ['death_mark']
  }
};

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

const emptyProficiencies = {
  blade: 0,
  arcane: 0,
  druid: 0,
  vanguard: 0,
  ranger: 0,
  spectre: 0
};

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
    const { name, archetype } = req.body;
    const player = await Player.findById(req.playerId);

    if (!player) {
      return res.status(404).json({ message: 'Player não encontrado' });
    }

    if (!name || name.trim().length < 3 || name.trim().length > 20) {
      return res.status(400).json({ message: 'Nome inválido' });
    }

    if (!archetypeDefaults[archetype]) {
      return res.status(400).json({ message: 'Arquétipo inválido' });
    }

    if (player.characters.length >= MAX_CHARACTERS) {
      return res.status(400).json({ message: 'Limite de personagens atingido' });
    }

    const characterNameExists = await Player.exists({ 'characters.name': name.trim() });

    if (characterNameExists) {
      return res.status(409).json({ message: 'Nome de personagem já existe' });
    }

    const defaults = archetypeDefaults[archetype];
    const character = {
      name: name.trim(),
      archetype,
      level: 1,
      xp: 0,
      xpToNext: 100,
      gold: 100,
      hp: defaults.hp,
      maxHp: defaults.hp,
      mp: defaults.mp,
      maxMp: defaults.mp,
      stats: defaults.stats,
      luck: defaults.luck,
      freePoints: 3,
      equipment: emptyEquipment,
      inventory: [],
      maxInventory: 60,
      storage: [],
      maxStorage: 500,
      skills: defaults.skills,
      skillCooldowns: {},
      titles: [],
      activeTitle: null,
      proficiencies: emptyProficiencies,
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
