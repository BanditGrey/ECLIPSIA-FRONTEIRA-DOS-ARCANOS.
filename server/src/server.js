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

      const hunt = partyHunts.get(leaverParty.id);

      if (hunt && !hunt.ended) {
        endPartyHunt(hunt, { aborted: true });
      }
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

// ────────────────────────────────────────────────────────────────
//  CAÇADA DE PARTY (Modo A — sessão paralela sincronizada):
//  cada membro luta no próprio cliente contra a mesma região; o
//  servidor agrega contribuições, aplica auras coletivas e paga
//  bônus de trabalho em equipe ao final.
// ────────────────────────────────────────────────────────────────
const MAX_TURN_DAMAGE = 200_000; // sanity cap por reporte
const TEAMWORK_XP_PER_KILL = 8; // xp extra dividido entre membros
const HUNT_SUMMARY_INTERVAL_MS = 1500;

// Bônus de grupo por membro NA SESSÃO (ex.: 3 membros → +30% XP, +15% ouro, +9% loot)
const SIZE_BONUS_PER_MEMBER = { xp: 10, gold: 5, loot: 3 };

const computeSizeBonus = (memberCount) => ({
  xp: memberCount * SIZE_BONUS_PER_MEMBER.xp,
  gold: memberCount * SIZE_BONUS_PER_MEMBER.gold,
  loot: memberCount * SIZE_BONUS_PER_MEMBER.loot
});

const partyHunts = new Map(); // partyId -> sessão

const huntSnapshot = (hunt) => ({
  partyId: hunt.partyId,
  region: hunt.region,
  dungeonId: hunt.dungeonId ?? null,
  leader: hunt.leader,
  round: hunt.round,
  auraAtk: hunt.auraAtk,
  auraDef: hunt.auraDef,
  sizeBonus: computeSizeBonus(hunt.contributions.size),
  members: [...hunt.contributions.entries()].map(([name, entry]) => ({
    name,
    dmg: entry.dmg,
    taken: entry.taken,
    kills: entry.kills
  }))
});

const broadcastHunt = (hunt, event = 'party_combat:updated') => {
  const party = parties.get(hunt.partyId);
  const targets = party ? party.members : [...hunt.contributions.keys()];

  targets.forEach((name) => notifyPlayer(name, event, huntSnapshot(hunt)));
};

const clampReportNumber = (value) => {
  const parsed = Math.floor(Number(value) || 0);

  return Math.max(0, Math.min(MAX_TURN_DAMAGE, parsed));
};

const endPartyHunt = (hunt, { aborted = false } = {}) => {
  if (hunt.ended) {
    return;
  }

  hunt.ended = true;

  const memberCount = Math.max(1, hunt.contributions.size);
  const totalKills = [...hunt.contributions.values()].reduce((sum, entry) => sum + entry.kills, 0);
  const xpBonus = aborted ? 0 : Math.floor((totalKills * TEAMWORK_XP_PER_KILL) / memberCount);

  const party = parties.get(hunt.partyId);
  const targets = party ? party.members : [...hunt.contributions.keys()];

  targets.forEach((name) => notifyPlayer(name, 'party_combat:ended', { ...huntSnapshot(hunt), xpBonus, aborted }));
  partyHunts.delete(hunt.partyId);
};

const partyHuntHandlers = (socket) => {
  // Líder inicia a caçada para a party
  socket.on('party_combat:start', (payload = {}) => {
    const who = socket.data.playerId;
    const region = sanitizeMessage(payload.region ?? '');
    const dungeonId = sanitizeMessage(payload.dungeonId ?? '') || null;

    if (!who || !region) return;

    const party = findPartyOf(who);

    if (!party || party.leader !== who) {
      notifyPlayer(who, 'party_combat:failed', { reason: 'not_leader' });
      return;
    }

    if (partyHunts.has(party.id)) {
      notifyPlayer(who, 'party_combat:failed', { reason: 'already' });
      return;
    }

    const hunt = {
      partyId: party.id,
      region,
      dungeonId,
      leader: who,
      round: 0,
      auraAtk: 0,
      auraDef: 0,
      contributions: new Map(),
      lastSummaryAt: 0,
      ended: false
    };

    partyHunts.set(party.id, hunt);
    party.members.forEach((name) => notifyPlayer(name, 'party_combat:started', huntSnapshot(hunt)));
  });

  // Membro entra na sessão enviando seu snapshot de auras
  socket.on('party_combat:join', (payload = {}) => {
    const who = socket.data.playerId;
    const hunt = partyHunts.get(payload.partyId) ?? [...partyHunts.values()].find((entry) => {
      const party = parties.get(entry.partyId);
      return party && party.members.includes(who);
    });

    if (!hunt || hunt.ended || !who) return;

    const party = parties.get(hunt.partyId);

    if (!party || !party.members.includes(who)) return;

    const existing = hunt.contributions.get(who) ?? { dmg: 0, taken: 0, kills: 0 };
    hunt.contributions.set(who, existing);

    // Auras coletivas: soma dos effects 79/80 de todos os membros
    hunt.auraAtk = Math.max(0, Math.min(100, Math.floor(Number(payload.auraAtk) || 0)));
    hunt.auraDef = Math.max(0, Math.min(100, Math.floor(Number(payload.auraDef) || 0)));
    hunt.memberAuras = hunt.memberAuras ?? new Map();
    hunt.memberAuras.set(who, { atk: hunt.auraAtk, def: hunt.auraDef });

    let auraAtk = 0;
    let auraDef = 0;

    for (const aura of hunt.memberAuras.values()) {
      auraAtk += aura.atk;
      auraDef += aura.def;
    }

    hunt.auraAtk = Math.min(100, auraAtk);
    hunt.auraDef = Math.min(100, auraDef);

    broadcastHunt(hunt);
  });

  // Reporte de turno: dano causado/sofrido e kills
  socket.on('party_combat:turn', (payload = {}) => {
    const who = socket.data.playerId;

    if (!who) return;

    const hunt = [...partyHunts.values()].find((entry) => entry.contributions.has(who));

    if (!hunt || hunt.ended) return;

    const entry = hunt.contributions.get(who);
    entry.dmg += clampReportNumber(payload.dmgDealt);
    entry.taken += clampReportNumber(payload.dmgTaken);
    entry.kills += payload.killed ? 1 : 0;
    hunt.round += 1;

    const now = Date.now();

    if (now - hunt.lastSummaryAt >= HUNT_SUMMARY_INTERVAL_MS) {
      hunt.lastSummaryAt = now;
      broadcastHunt(hunt);
    }
  });

  // Líder encerra a caçada
  socket.on('party_combat:end', () => {
    const who = socket.data.playerId;
    const hunt = [...partyHunts.values()].find((entry) => entry.contributions.has(who) || entry.leader === who);

    if (!hunt || hunt.ended || hunt.leader !== who) return;

    endPartyHunt(hunt);
  });

  // Membro sai da sessão
  socket.on('party_combat:leave', () => {
    const who = socket.data.playerId;
    const hunt = [...partyHunts.values()].find((entry) => entry.contributions.has(who));

    if (!hunt || hunt.ended) return;

    hunt.contributions.delete(who);
    hunt.memberAuras?.delete(who);

    if (hunt.leader === who) {
      const nextLeader = [...hunt.contributions.keys()][0];

      if (!nextLeader) {
        endPartyHunt(hunt, { aborted: true });
        return;
      }

      hunt.leader = nextLeader;
    }

    broadcastHunt(hunt);
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
  partyHuntHandlers(socket);

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

      const leaverHunt = [...partyHunts.values()].find((entry) => entry.contributions.has(leaver) || entry.leader === leaver);

      if (leaverHunt && !leaverHunt.ended) {
        leaverHunt.contributions.delete(leaver);
        leaverHunt.memberAuras?.delete(leaver);

        if (leaverHunt.contributions.size === 0) {
          endPartyHunt(leaverHunt, { aborted: true });
        } else {
          if (leaverHunt.leader === leaver) {
            leaverHunt.leader = [...leaverHunt.contributions.keys()][0];
          }

          broadcastHunt(leaverHunt);
        }
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
