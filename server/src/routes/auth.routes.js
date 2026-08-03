import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Player } from '../models/Player.js';

export const authRoutes = Router();

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const createToken = (player) => {
  return jwt.sign({ id: player._id.toString() }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

authRoutes.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || username.length < 3 || username.length > 20) {
      return res.status(400).json({ message: 'Username inválido' });
    }

    if (!email || !isValidEmail(email)) {
      return res.status(400).json({ message: 'Email inválido' });
    }

    if (!password || password.length < 6) {
      return res.status(400).json({ message: 'Senha inválida' });
    }

    const existingEmail = await Player.findOne({ email: email.toLowerCase() });

    if (existingEmail) {
      return res.status(409).json({ message: 'Email já cadastrado' });
    }

    const existingUsername = await Player.findOne({ username });

    if (existingUsername) {
      return res.status(409).json({ message: 'Username já cadastrado' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const player = await Player.create({
      username,
      email: email.toLowerCase(),
      password: hashedPassword
    });

    const token = createToken(player);

    return res.status(201).json({
      success: true,
      token,
      hasCharacters: false,
      characters: []
    });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao registrar', error: error.message });
  }
});

authRoutes.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email e senha são obrigatórios' });
    }

    const player = await Player.findOne({ email: email.toLowerCase() });

    if (!player) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    const passwordMatches = await bcrypt.compare(password, player.password);

    if (!passwordMatches) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    const token = createToken(player);

    return res.json({
      token,
      hasCharacters: player.characters.length > 0,
      characters: player.characters.map((character) => ({
        id: character._id.toString(),
        name: character.name,
        archetype: character.archetype,
        level: character.level,
        activeTitle: character.activeTitle
      }))
    });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao autenticar', error: error.message });
  }
});
