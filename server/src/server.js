import 'dotenv/config';
import http from 'http';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { Server } from 'socket.io';
import { connectDatabase } from './config/database.js';
import { authRoutes } from './routes/auth.routes.js';
import { playerRoutes } from './routes/player.routes.js';
import { rankingRoutes } from './routes/ranking.routes.js';
import { mailRoutes } from './routes/mail.routes.js';
import { marketRoutes } from './routes/market.routes.js';

const app = express();
const server = http.createServer(app);
const onlinePlayers = new Map();

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

const io = new Server(server, {
  cors: corsOptions
});

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

io.on('connection', (socket) => {
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
  });

  socket.on('chat:message', (payload = {}) => {
    const playerId = socket.data.playerId;
    const onlinePlayer = playerId ? onlinePlayers.get(playerId) : null;
    const text = sanitizeMessage(payload.text ?? payload.message);

    if (!text) {
      return;
    }

    io.emit('chat:message', {
      id: `${Date.now()}-${socket.id}`,
      type: 'player',
      playerId: playerId ?? socket.id,
      name: onlinePlayer?.name ?? sanitizeMessage(payload.name ?? 'Unknown'),
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

startServer();
