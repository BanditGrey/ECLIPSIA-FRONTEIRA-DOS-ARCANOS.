import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { Guild } from '../models/Guild.js';
import { notifyPlayer } from '../utils/notify.js';

export const guildRoutes = Router();
guildRoutes.use(authMiddleware);

const sanitize = (value, max = 160) => String(value ?? '').replace(/[<>]/g, '').trim().slice(0, max);

/** Localiza a guilda de um personagem (ou null). */
const findGuildOf = (charName) => Guild.findOne({ 'members.name': charName });

const publicGuild = (guild) => ({
  id: guild._id.toString(),
  name: guild.name,
  leaderName: guild.leaderName,
  motd: guild.motd,
  members: guild.members.map((member) => ({ name: member.name, role: member.role, joinedAt: member.joinedAt })),
  maxMembers: guild.maxMembers,
  memberCount: guild.members.length
});

const getRole = (guild, charName) => guild.members.find((member) => member.name === charName)?.role ?? null;

/** GET /api/guild/list — diretório de guildas */
guildRoutes.get('/list', async (_req, res) => {
  try {
    const guilds = await Guild.find().sort({ createdAt: -1 }).limit(50).lean();

    return res.json({
      guilds: guilds.map((guild) => ({
        id: guild._id.toString(),
        name: guild.name,
        leaderName: guild.leaderName,
        motd: guild.motd,
        memberCount: guild.members.length,
        maxMembers: guild.maxMembers
      }))
    });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao listar guildas', error: error.message });
  }
});

/** GET /api/guild/my?charName= — guilda do personagem */
guildRoutes.get('/my', async (req, res) => {
  try {
    const charName = sanitize(req.query.charName ?? '', 20);

    if (!charName) {
      return res.status(400).json({ message: 'charName obrigatório' });
    }

    const guild = await findGuildOf(charName);

    return res.json({ guild: guild ? publicGuild(guild) : null });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao buscar guilda', error: error.message });
  }
});

/** POST /api/guild/create — criar guilda */
guildRoutes.post('/create', async (req, res) => {
  try {
    const { charName } = req.body ?? {};
    const name = sanitize(req.body?.name ?? '', 24);
    const owner = sanitize(charName, 20);

    if (!owner) {
      return res.status(400).json({ message: 'charName obrigatório' });
    }

    if (name.length < 3) {
      return res.status(400).json({ message: 'Nome da guilda deve ter 3 a 24 caracteres' });
    }

    const existing = await findGuildOf(owner);

    if (existing) {
      return res.status(400).json({ message: 'Você já está em uma guilda' });
    }

    const nameTaken = await Guild.exists({ name });

    if (nameTaken) {
      return res.status(409).json({ message: 'Nome de guilda já existe' });
    }

    const guild = await Guild.create({
      name,
      leaderName: owner,
      members: [{ name: owner, role: 'leader' }]
    });

    return res.status(201).json({ guild: publicGuild(guild) });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao criar guilda', error: error.message });
  }
});

/** POST /api/guild/join — entrar em guilda */
guildRoutes.post('/join', async (req, res) => {
  try {
    const { guildId } = req.body ?? {};
    const charName = sanitize(req.body?.charName, 20);

    if (!charName) {
      return res.status(400).json({ message: 'charName obrigatório' });
    }

    const existing = await findGuildOf(charName);

    if (existing) {
      return res.status(400).json({ message: 'Você já está em uma guilda' });
    }

    const guild = await Guild.findById(guildId);

    if (!guild) {
      return res.status(404).json({ message: 'Guilda não encontrada' });
    }

    if (guild.members.length >= guild.maxMembers) {
      return res.status(400).json({ message: 'Guilda cheia' });
    }

    guild.members.push({ name: charName, role: 'member' });
    await guild.save();

    guild.members.forEach((member) => notifyPlayer(member.name, 'guild:updated', { guild: publicGuild(guild) }));

    return res.json({ guild: publicGuild(guild) });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao entrar na guilda', error: error.message });
  }
});

/** POST /api/guild/leave — sair (líder transfere ou dissolve) */
guildRoutes.post('/leave', async (req, res) => {
  try {
    const charName = sanitize(req.body?.charName, 20);

    if (!charName) {
      return res.status(400).json({ message: 'charName obrigatório' });
    }

    const guild = await findGuildOf(charName);

    if (!guild) {
      return res.status(404).json({ message: 'Você não está em uma guilda' });
    }

    guild.members = guild.members.filter((member) => member.name !== charName);

    if (guild.members.length === 0) {
      await guild.deleteOne();
      return res.json({ guild: null, disbanded: true });
    }

    if (guild.leaderName === charName) {
      const successor = [...guild.members].sort((a, b) => new Date(a.joinedAt) - new Date(b.joinedAt))[0];
      successor.role = 'leader';
      guild.leaderName = successor.name;
    }

    await guild.save();

    guild.members.forEach((member) => notifyPlayer(member.name, 'guild:updated', { guild: publicGuild(guild) }));

    return res.json({ guild: publicGuild(guild) });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao sair da guilda', error: error.message });
  }
});

/** POST /api/guild/kick — expulsar (líder expulsa todos; oficial só membros) */
guildRoutes.post('/kick', async (req, res) => {
  try {
    const { targetName } = req.body ?? {};
    const charName = sanitize(req.body?.charName, 20);
    const target = sanitize(targetName, 20);

    if (!charName || !target || charName === target) {
      return res.status(400).json({ message: 'Alvo inválido' });
    }

    const guild = await findGuildOf(charName);

    if (!guild) {
      return res.status(404).json({ message: 'Você não está em uma guilda' });
    }

    const requesterRole = getRole(guild, charName);
    const targetRole = getRole(guild, target);

    if (!targetRole) {
      return res.status(404).json({ message: 'Alvo não está na guilda' });
    }

    if (targetRole === 'leader') {
      return res.status(400).json({ message: 'O líder não pode ser expulso (use dissolver)' });
    }

    if (requesterRole === 'member' || (requesterRole === 'officer' && targetRole === 'officer')) {
      return res.status(403).json({ message: 'Sem permissão para expulsar este membro' });
    }

    guild.members = guild.members.filter((member) => member.name !== target);
    await guild.save();

    guild.members.forEach((member) => notifyPlayer(member.name, 'guild:updated', { guild: publicGuild(guild) }));
    notifyPlayer(target, 'guild:kicked', { guildName: guild.name });

    return res.json({ guild: publicGuild(guild) });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao expulsar membro', error: error.message });
  }
});

/** POST /api/guild/promote — líder alterna officer/member */
guildRoutes.post('/promote', async (req, res) => {
  try {
    const { targetName } = req.body ?? {};
    const charName = sanitize(req.body?.charName, 20);
    const target = sanitize(targetName, 20);

    const guild = await findGuildOf(charName);

    if (!guild || guild.leaderName !== charName) {
      return res.status(403).json({ message: 'Apenas o líder pode promover/rebaixar' });
    }

    const member = guild.members.find((entry) => entry.name === target);

    if (!member || member.role === 'leader') {
      return res.status(404).json({ message: 'Membro não encontrado' });
    }

    member.role = member.role === 'officer' ? 'member' : 'officer';
    await guild.save();

    guild.members.forEach((entry) => notifyPlayer(entry.name, 'guild:updated', { guild: publicGuild(guild) }));

    return res.json({ guild: publicGuild(guild) });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao alterar cargo', error: error.message });
  }
});

/** POST /api/guild/motd — líder/oficial define a mensagem do dia */
guildRoutes.post('/motd', async (req, res) => {
  try {
    const charName = sanitize(req.body?.charName, 20);
    const motd = sanitize(req.body?.motd ?? '', 160);

    const guild = await findGuildOf(charName);

    if (!guild) {
      return res.status(404).json({ message: 'Você não está em uma guilda' });
    }

    const role = getRole(guild, charName);

    if (role === 'member') {
      return res.status(403).json({ message: 'Apenas líder/oficiais podem editar a mensagem' });
    }

    guild.motd = motd;
    await guild.save();

    guild.members.forEach((member) => notifyPlayer(member.name, 'guild:updated', { guild: publicGuild(guild) }));

    return res.json({ guild: publicGuild(guild) });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao salvar mensagem', error: error.message });
  }
});

/** POST /api/guild/disband — líder dissolve a guilda */
guildRoutes.post('/disband', async (req, res) => {
  try {
    const charName = sanitize(req.body?.charName, 20);
    const guild = await findGuildOf(charName);

    if (!guild || guild.leaderName !== charName) {
      return res.status(403).json({ message: 'Apenas o líder pode dissolver' });
    }

    const snapshot = publicGuild(guild);
    await guild.deleteOne();

    snapshot.members.forEach((member) => notifyPlayer(member.name, 'guild:disbanded', { guildName: snapshot.name }));

    return res.json({ guild: null, disbanded: true });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao dissolver guilda', error: error.message });
  }
});
