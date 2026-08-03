import 'dotenv/config';
import http from 'http';
import express from 'express';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import helmet from 'helmet';
import { Server } from 'socket.io';
import { connectDatabase } from './config/database.js';
import { authRoutes } from './routes/auth.routes.js';
import { playerRoutes } from './routes/player.routes.js';
import { rankingRoutes } from './routes/ranking.routes.js';
import { mailRoutes } from './routes/mail.routes.js';
import { marketRoutes } from './routes/market.routes.js';
import { guildRoutes } from './routes/guild.routes.js';
import { ChatMessage } from './models/ChatMessage.js';
import { Guild } from './models/Guild.js';
import { Player } from './models/Player.js';
import { addToInventory, isValidItemRef, removeFromInventory } from './utils/gameUtils.js';
import { notifyPlayer, onlinePlayers, setIO } from './utils/notify.js';

const app = express();
const server = http.createServer(app);

const allowedOrigins = new Set([
  'http://localhost:3000',
  'http://localhost:4173',
  'http://localhost:5173',
  'https://eclipsia.vercel.app',
  process.env.CLIENT_URL
].filter(Boolean));

const isAllowedOrigin = (origin) => {
  if (!origin) {
    return true;
  }

  if (allowedOrigins.has(origin)) {
    return true;
  }

  try {
    const { hostname } = new URL(origin);
    return hostname.endsWith('.vercel.app');
  } catch {
    return false;
  }
};

const corsOptions = {
  origin(origin, callback) {
    if (isAllowedOrigin(origin)) {
      return callback(null, true);
    }

    return callback(new Error('Origem não permitida pelo CORS'));
  },
  credentials: true
};

app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json({ limit: '1mb' }));

// ── Rate limiting (hardening) ──
const TOO_MANY = { message: 'Muitas requisições. Aguarde alguns instantes.' };

// Global: 600 req / 15 min por IP
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 600,
  standardHeaders: true,
  legacyHeaders: false,
  message: TOO_MANY
});

// Auth: 20 tentativas / 15 min (login/register)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: TOO_MANY
});

// Ações de economia (enviar carta, listar/comprar): 60 / min
const actionLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 60,
  standardHeaders: true,
  legacyHeaders: false,
  message: TOO_MANY
});

app.use('/api', apiLimiter);
app.use('/api/auth/login', authLimiter);
app.use('/api/auth/register', authLimiter);
app.use('/api/mail/send', actionLimiter);
app.use('/api/market/list', actionLimiter);
app.use('/api/market/buy', actionLimiter);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', online: onlinePlayers.size });
});

app.get('/api/world/state', (_req, res) => {
  res.json({
    online: onlinePlayers.size,
    colossus: null,
    serverTime: new Date().toISOString()
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/player', playerRoutes);
app.use('/api/ranking', rankingRoutes);
app.use('/api/mail', mailRoutes);
app.use('/api/market', marketRoutes);
app.use('/api/guild', guildRoutes);

const io = new Server(server, {
  cors: corsOptions
});

setIO(io);

const broadcastOnlineCount = () => {
  io.emit('online:count', onlinePlayers.size);
};

const sanitizeMessage = (value) => {
  return String(value ?? '')
    .replace(/[<>]/g, '')
    .replace(/javascript:/gi, '')
    .trim()
    .slice(0, 240);
};

// ────────────────────────────────────────────────────────────────
//  TRADE P2P: negociação direta entre dois personagens online.
//  O servidor custodia o estado e executa a troca de forma validada.
// ────────────────────────────────────────────────────────────────
const MAX_TRADE_ITEMS = 3;
const trades = new Map();
let tradeSeq = 0;

const findTradeOf = (name) =>
  [...trades.values()].find((trade) => trade.status === 'active' && (trade.from === name || trade.to === name));

const tradeSnapshot = (trade) => ({
  tradeId: trade.id,
  from: trade.from,
  to: trade.to,
  status: trade.status,
  offers: trade.offers,
  confirmed: [...trade.confirmed]
});

const emitToBoth = (trade, event, extra = {}) => {
  notifyPlayer(trade.from, event, { ...tradeSnapshot(trade), ...extra });
  notifyPlayer(trade.to, event, { ...tradeSnapshot(trade), ...extra });
};

const cancelTradesOf = (name, reason) => {
  for (const [id, trade] of trades) {
    if (trade.status === 'active' && (trade.from === name || trade.to === name)) {
      trade.status = 'cancelled';
      emitToBoth(trade, 'trade:cancelled', { reason });
      trades.delete(id);
    }
  }
};

const sanitizeTradeOffer = (payload = {}) => {
  const items = Array.isArray(payload.items) ? payload.items.map((ref) => String(ref)).filter(isValidItemRef).slice(0, MAX_TRADE_ITEMS) : [];
  const gold = Math.max(0, Math.floor(Number(payload.gold) || 0));
  return { items, gold };
};

const executeTrade = async (trade) => {
  const [playerA, playerB] = await Promise.all([
    Player.findOne({ 'characters.name': trade.from }),
    Player.findOne({ 'characters.name': trade.to })
  ]);

  const charA = playerA?.characters.find((c) => c.name === trade.from);
  const charB = playerB?.characters.find((c) => c.name === trade.to);

  if (!charA || !charB) {
    throw new Error('Personagem não encontrado');
  }

  const offerA = trade.offers[trade.from] ?? { items: [], gold: 0 };
  const offerB = trade.offers[trade.to] ?? { items: [], gold: 0 };

  if (charA.gold < offerA.gold || charB.gold < offerB.gold) {
    throw new Error('Ouro insuficiente');
  }

  const owns = (character, ref) => character.inventory.some((entry) => (entry.itemStr ?? entry.id) === ref && entry.qty > 0);

  for (const ref of offerA.items) {
    if (!owns(charA, ref)) throw new Error('Item indisponível na troca');
  }

  for (const ref of offerB.items) {
    if (!owns(charB, ref)) throw new Error('Item indisponível na troca');
  }

  // Pré-checagem de capacidade (evita mutação parcial)
  const spaceFor = (character, incoming) => {
    const newEntries = incoming.filter((ref) => !character.inventory.some((entry) => (entry.itemStr ?? entry.id) === ref));
    return character.inventory.length + newEntries.length <= character.maxInventory;
  };

  if (!spaceFor(charA, offerB.items) || !spaceFor(charB, offerA.items)) {
    throw new Error('Inventário cheio');
  }

  // Execução
  for (const ref of offerA.items) {
    removeFromInventory(charA, ref, 1);
    addToInventory(charB, ref, 1, charB.maxInventory);
  }

  for (const ref of offerB.items) {
    removeFromInventory(charB, ref, 1);
    addToInventory(charA, ref, 1, charA.maxInventory);
  }

  charA.gold = charA.gold - offerA.gold + offerB.gold;
  charB.gold = charB.gold - offerB.gold + offerA.gold;

  await playerA.save();
  await playerB.save();

  trade.status = 'completed';
  notifyPlayer(trade.from, 'trade:completed', { tradeId: trade.id, character: charA });
  notifyPlayer(trade.to, 'trade:completed', { tradeId: trade.id, character: charB });
  trades.delete(trade.id);
};

// ────────────────────────────────────────────────────────────────
//  PARTY REAL: grupos de jogadores online (convite/aceite/leave/kick)
// ────────────────────────────────────────────────────────────────
const MAX_PARTY_SIZE = 5;
const parties = new Map();
let partySeq = 0;

const findPartyOf = (name) => [...parties.values()].find((party) => party.members.includes(name));

const partySnapshot = (party) => ({ partyId: party.id, leader: party.leader, members: [...party.members] });

const broadcastParty = (party) => {
  party.members.forEach((name) => notifyPlayer(name, 'party:updated', partySnapshot(party)));
};

/** Remove o socket do jogador da room da party (por nome). */
const leavePartyRoom = (name, partyId) => {
  const entry = onlinePlayers.get(name);

  if (!entry || !io) {
    return;
  }

  const targetSocket = io.sockets.sockets.get(entry.socketId);

  if (targetSocket) {
    targetSocket.leave(`party:${partyId}`);

    if (targetSocket.data.partyId === partyId) {
      targetSocket.data.partyId = null;
    }
  }
};

const removeFromParty = (name, notifyLeft = false) => {
  const party = findPartyOf(name);

  if (!party) return;

  party.members = party.members.filter((member) => member !== name);

  if (party.members.length === 0) {
    parties.delete(party.id);
  } else {
    if (party.leader === name) {
      party.leader = party.members[0];
    }

    broadcastParty(party);
  }

  if (notifyLeft) {
    notifyPlayer(name, 'party:left', {});
  }
};

const partyHandlers = (socket) => {
  socket.on('party:invite', (payload = {}) => {
    const fromName = socket.data.playerId;
    const toName = sanitizeMessage(payload.toName ?? '');

    if (!fromName || !toName || fromName === toName) return;

    if (!onlinePlayers.has(toName)) {
      notifyPlayer(fromName, 'party:failed', { reason: 'offline' });
      return;
    }

    const myParty = findPartyOf(fromName);

    if (myParty && myParty.leader !== fromName) {
      notifyPlayer(fromName, 'party:failed', { reason: 'not_leader' });
      return;
    }

    if (findPartyOf(toName)) {
      notifyPlayer(fromName, 'party:failed', { reason: 'busy' });
      return;
    }

    let party = myParty;

    if (!party) {
      partySeq += 1;
      party = { id: `party-${partySeq}`, leader: fromName, members: [fromName] };
      parties.set(party.id, party);
    }

    if (party.members.length >= MAX_PARTY_SIZE) {
      notifyPlayer(fromName, 'party:failed', { reason: 'full' });
      return;
    }

    notifyPlayer(toName, 'party:invited', { partyId: party.id, fromName });
  });

  socket.on('party:respond', (payload = {}) => {
    const who = socket.data.playerId;
    const party = parties.get(payload.partyId);

    if (!party || !who) return;

    if (!payload.accept) {
      notifyPlayer(party.leader, 'party:declined', { name: who });
      return;
    }

    if (findPartyOf(who)) {
      notifyPlayer(who, 'party:failed', { reason: 'busy' });
      return;
    }

    if (party.members.length >= MAX_PARTY_SIZE) {
      notifyPlayer(who, 'party:failed', { reason: 'full' });
      return;
    }

    party.members.push(who);
    socket.join(`party:${party.id}`);
    socket.data.partyId = party.id;
    broadcastParty(party);
  });

  socket.on('party:leave', () => {
    const leaverParty = findPartyOf(socket.data.playerId);

    if (leaverParty) {
      leavePartyRoom(socket.data.playerId, leaverParty.id);
    }

    removeFromParty(socket.data.playerId, true);
  });

  socket.on('party:kick', (payload = {}) => {
    const who = socket.data.playerId;
    const target = sanitizeMessage(payload.targetName ?? '');
    const party = findPartyOf(who);

    if (!party || !target || party.leader !== who || target === who) return;

    if (!party.members.includes(target)) return;

    leavePartyRoom(target, party.id);
    removeFromParty(target, false);
    notifyPlayer(target, 'party:kicked', {});
  });
};

const tradeHandlers = (socket) => {
  socket.on('trade:request', (payload = {}) => {
    const fromName = socket.data.playerId;
    const toName = sanitizeMessage(payload.toName ?? '');

    if (!fromName || !toName || fromName === toName) return;
    if (!onlinePlayers.has(toName)) {
      notifyPlayer(fromName, 'trade:failed', { reason: 'offline' });
      return;
    }
    if (findTradeOf(fromName) || findTradeOf(toName)) {
      notifyPlayer(fromName, 'trade:failed', { reason: 'busy' });
      return;
    }

    tradeSeq += 1;
    const trade = {
      id: `trade-${tradeSeq}`,
      from: fromName,
      to: toName,
      status: 'pending',
      offers: { [fromName]: { items: [], gold: 0 }, [toName]: { items: [], gold: 0 } },
      confirmed: new Set()
    };
    trades.set(trade.id, trade);
    notifyPlayer(toName, 'trade:requested', { tradeId: trade.id, fromName });
    notifyPlayer(fromName, 'trade:waiting', { tradeId: trade.id, toName });
  });

  socket.on('trade:respond', (payload = {}) => {
    const trade = trades.get(payload.tradeId);

    if (!trade || trade.status !== 'pending') return;

    if (!payload.accept) {
      trade.status = 'declined';
      emitToBoth(trade, 'trade:declined');
      trades.delete(trade.id);
      return;
    }

    trade.status = 'active';
    emitToBoth(trade, 'trade:start');
  });

  socket.on('trade:update', (payload = {}) => {
    const trade = trades.get(payload.tradeId);
    const who = socket.data.playerId;

    if (!trade || trade.status !== 'active' || (who !== trade.from && who !== trade.to)) return;

    // Throttle anti-spam: máx. 10 atualizações por 10s
    const now = Date.now();
    socket.data.tradeTimes = (socket.data.tradeTimes ?? []).filter((stamp) => now - stamp < 10_000);

    if (socket.data.tradeTimes.length >= 10) {
      return;
    }

    socket.data.tradeTimes.push(now);

    trade.offers[who] = sanitizeTradeOffer(payload);
    trade.confirmed = new Set();
    emitToBoth(trade, 'trade:updated');
  });

  socket.on('trade:confirm', async (payload = {}) => {
    const trade = trades.get(payload.tradeId);
    const who = socket.data.playerId;

    if (!trade || trade.status !== 'active' || (who !== trade.from && who !== trade.to)) return;

    trade.confirmed.add(who);
    emitToBoth(trade, 'trade:confirmed');

    if (trade.confirmed.has(trade.from) && trade.confirmed.has(trade.to)) {
      try {
        await executeTrade(trade);
      } catch (error) {
        trade.confirmed = new Set();
        emitToBoth(trade, 'trade:failed', { reason: error.message });
      }
    }
  });

  socket.on('trade:cancel', (payload = {}) => {
    const trade = trades.get(payload.tradeId);

    if (!trade || trade.status === 'completed') return;

    trade.status = 'cancelled';
    emitToBoth(trade, 'trade:cancelled', { reason: 'cancelado' });
    trades.delete(trade.id);
  });
};

io.on('connection', (socket) => {
  tradeHandlers(socket);
  partyHandlers(socket);

  socket.on('player:identify', (payload = {}) => {
    const playerId = sanitizeMessage(payload.playerId ?? payload.id ?? socket.id);
    const name = sanitizeMessage(payload.name ?? 'Unknown');

    socket.data.playerId = playerId;
    onlinePlayers.set(playerId, {
      socketId: socket.id,
      name,
      connectedAt: new Date()
    });

    broadcastOnlineCount();

    // Presença: avisa os demais que o jogador entrou na fronteira
    socket.broadcast.emit('chat:presence', { name, online: true });

    ChatMessage.find()
      .sort({ createdAt: -1 })
      .limit(50)
      .lean()
      .then((history) => {
        socket.emit('chat:history', { messages: history.reverse() });
      })
      .catch(() => {});
  });

  socket.on('chat:message', (payload = {}) => {
    // Throttle anti-spam: máx. 5 mensagens por 10s por socket
    const now = Date.now();
    socket.data.chatTimes = (socket.data.chatTimes ?? []).filter((stamp) => now - stamp < 10_000);

    if (socket.data.chatTimes.length >= 5) {
      return;
    }

    socket.data.chatTimes.push(now);

    const playerId = socket.data.playerId;
    const onlinePlayer = playerId ? onlinePlayers.get(playerId) : null;
    const text = sanitizeMessage(payload.text ?? payload.message);

    if (!text) {
      return;
    }

    const name = onlinePlayer?.name ?? sanitizeMessage(payload.name ?? 'Unknown');

    io.emit('chat:message', {
      id: `${Date.now()}-${socket.id}`,
      type: 'player',
      playerId: playerId ?? socket.id,
      name,
      text,
      createdAt: new Date().toISOString()
    });

    ChatMessage.create({ playerId: playerId ?? null, name, text }).catch(() => {});
  });

  // ── Chat de guilda: entra na room validando membership ──
  socket.on('guild:room', async (payload = {}) => {
    try {
      const charName = socket.data.playerId;
      const guildId = String(payload.guildId ?? '');

      if (!charName || !guildId) return;

      const guild = await Guild.findById(guildId).lean();

      if (!guild || !guild.members.some((member) => member.name === charName)) return;

      socket.join(`guild:${guildId}`);
      socket.data.guildId = guildId;
      socket.emit('guild:room_joined', { guildId });
    } catch {
      // guild inexistente/erro de banco: ignora silenciosamente
    }
  });

  socket.on('chat:guild', (payload = {}) => {
    const guildId = socket.data.guildId;

    if (!guildId) return;

    // Throttle anti-spam: máx. 5 mensagens por 10s
    const now = Date.now();
    socket.data.guildChatTimes = (socket.data.guildChatTimes ?? []).filter((stamp) => now - stamp < 10_000);

    if (socket.data.guildChatTimes.length >= 5) {
      return;
    }

    socket.data.guildChatTimes.push(now);

    const playerId = socket.data.playerId;
    const onlinePlayer = playerId ? onlinePlayers.get(playerId) : null;
    const text = sanitizeMessage(payload.text ?? payload.message);

    if (!text) return;

    io.to(`guild:${guildId}`).emit('chat:guild', {
      id: `${Date.now()}-${socket.id}`,
      name: onlinePlayer?.name ?? sanitizeMessage(payload.name ?? 'Unknown'),
      text,
      createdAt: new Date().toISOString()
    });
  });

  // ── Mensagens privadas (sussurros): entrega apenas ao alvo ──
  socket.on('chat:whisper', (payload = {}) => {
    const fromName = socket.data.playerId;
    const toName = sanitizeMessage(payload.toName ?? '');
    const text = sanitizeMessage(payload.text ?? payload.message);

    if (!fromName || !toName || !text || fromName === toName) return;

    // Throttle: 5 sussurros / 10s
    const now = Date.now();
    socket.data.whisperTimes = (socket.data.whisperTimes ?? []).filter((stamp) => now - stamp < 10_000);

    if (socket.data.whisperTimes.length >= 5) {
      return;
    }

    socket.data.whisperTimes.push(now);

    const targetEntry = onlinePlayers.get(toName);

    if (!targetEntry) {
      socket.emit('chat:whisper_failed', { toName, reason: 'offline' });
      return;
    }

    io.to(targetEntry.socketId).emit('chat:whisper', {
      fromName,
      toName,
      text,
      createdAt: new Date().toISOString()
    });
  });

  // ── Chat da party: restrito à room party:<id> ──
  socket.on('chat:party', (payload = {}) => {
    const partyId = socket.data.partyId;

    if (!partyId) return;

    // Throttle: 5 msgs / 10s
    const now = Date.now();
    socket.data.partyChatTimes = (socket.data.partyChatTimes ?? []).filter((stamp) => now - stamp < 10_000);

    if (socket.data.partyChatTimes.length >= 5) {
      return;
    }

    socket.data.partyChatTimes.push(now);

    const playerId = socket.data.playerId;
    const onlinePlayer = playerId ? onlinePlayers.get(playerId) : null;
    const text = sanitizeMessage(payload.text ?? payload.message);

    if (!text) return;

    io.to(`party:${partyId}`).emit('chat:party', {
      id: `${Date.now()}-${socket.id}`,
      name: onlinePlayer?.name ?? 'Unknown',
      text,
      createdAt: new Date().toISOString()
    });
  });

  socket.on('world:boss_defeated', (payload = {}) => {
    io.emit('world:boss_defeated', {
      bossId: sanitizeMessage(payload.bossId),
      bossName: sanitizeMessage(payload.bossName),
      playerName: sanitizeMessage(payload.playerName),
      createdAt: new Date().toISOString()
    });
  });

  socket.on('world:colossus_spawned', (payload = {}) => {
    io.emit('world:colossus_spawned', {
      colossusId: sanitizeMessage(payload.colossusId),
      colossusName: sanitizeMessage(payload.colossusName),
      region: sanitizeMessage(payload.region),
      createdAt: new Date().toISOString()
    });
  });

  socket.on('disconnect', () => {
    const leaver = socket.data.playerId;

    if (leaver) {
      const leaverParty = findPartyOf(leaver);

      if (leaverParty) {
        leavePartyRoom(leaver, leaverParty.id);
      }

      cancelTradesOf(leaver, 'desconectado');
      removeFromParty(leaver, false);
      io.emit('chat:presence', { name: leaver, online: false });
    }

    if (socket.data.playerId) {
      onlinePlayers.delete(socket.data.playerId);
    } else {
      [...onlinePlayers.entries()].forEach(([playerId, player]) => {
        if (player.socketId === socket.id) {
          onlinePlayers.delete(playerId);
        }
      });
    }

    broadcastOnlineCount();
  });
});

const startServer = async () => {
  await connectDatabase();

  const port = process.env.PORT || 5000;

  server.listen(port, () => {
    console.log(`Servidor Eclipsia ouvindo na porta ${port}`);
  });
};

// Graceful shutdown (Railway/Docker enviam SIGTERM)
const shutdown = (signal) => {
  console.log(`Recebido ${signal}, encerrando...`);

  server.close(() => process.exit(0));
  setTimeout(() => process.exit(0), 5000).unref();
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

startServer();
