import { Router } from 'express';
import { Player } from '../models/Player.js';

export const rankingRoutes = Router();

const PAGE_SIZE = 20;

const flattenCharacters = (players) => {
  return players.flatMap((player) =>
    player.characters.map((character) => ({
      playerId: player._id.toString(),
      characterId: character._id.toString(),
      name: character.name,
      level: character.level,
      xp: character.xp,
      title: character.activeTitle,
      discoveries: Array.isArray(character.discoveries) ? character.discoveries.length : character.discoveries ?? 0
    }))
  );
};

rankingRoutes.get('/level', async (req, res) => {
  try {
    const page = Math.max(Number(req.query.page ?? 1), 1);
    const players = await Player.find({ 'characters.0': { $exists: true } }).select('characters');
    const entries = flattenCharacters(players)
      .sort((a, b) => b.level - a.level || b.xp - a.xp)
      .slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
      .map((entry, index) => ({
        position: (page - 1) * PAGE_SIZE + index + 1,
        name: entry.name,
        level: entry.level,
        xp: entry.xp,
        title: entry.title
      }));

    return res.json({ page, pageSize: PAGE_SIZE, entries });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao buscar ranking de nível', error: error.message });
  }
});

rankingRoutes.get('/discoveries', async (_req, res) => {
  try {
    const players = await Player.find({ 'characters.0': { $exists: true } }).select('characters');
    const entries = flattenCharacters(players)
      .sort((a, b) => b.discoveries - a.discoveries)
      .slice(0, PAGE_SIZE)
      .map((entry, index) => ({
        position: index + 1,
        name: entry.name,
        level: entry.level,
        title: entry.title,
        discoveries: entry.discoveries
      }));

    return res.json({ entries });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao buscar ranking de descobertas', error: error.message });
  }
});
