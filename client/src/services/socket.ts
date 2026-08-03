import { io } from 'socket.io-client';
import type { Socket } from 'socket.io-client';
import { translations } from '../i18n';
import { useGameStore } from '../store/useGameStore';
import { usePlayerStore } from '../store/usePlayerStore';
import { API, SERVER_URL } from './api';

export interface ChatUiMessage {
  id?: string;
  type?: 'system' | 'player';
  name?: string;
  text: string;
  createdAt?: string;
}

const getLang = () => {
  if (typeof window === 'undefined') {
    return 'en-US' as const;
  }

  const saved = window.localStorage.getItem('eclipsia_lang');

  return saved === 'pt-BR' || saved === 'en-US' || saved === 'es-ES' || saved === 'ja-JP' ? saved : 'en-US';
};

const t = (path: string) => {
  const read = (dictionary: unknown) =>
    path.split('.').reduce<unknown>((current, key) => {
      if (!current || typeof current === 'string') {
        return undefined;
      }

      return (current as Record<string, unknown>)[key];
    }, dictionary);

  const value = read(translations[getLang()]) ?? read(translations['en-US']);

  return typeof value === 'string' ? value : path;
};

const sanitizeText = (value: unknown) =>
  String(value ?? '')
    .replace(/[<>]/g, '')
    .replace(/javascript:/gi, '')
    .trim()
    .slice(0, 240);

export const ChatUI = {
  addMessage(message: ChatUiMessage) {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('eclipsia:chat-message', { detail: message }));
    }
  }
};

class SocketService {
  private socket: Socket | null = null;

  connect() {
    if (this.socket?.connected) {
      return this.socket;
    }

    this.socket = io(SERVER_URL, {
      auth: {
        token: API.token
      },
      transports: ['websocket']
    });

    this.socket.on('connect', () => {
      const player = usePlayerStore.getState().data;

      this.emit('player:identify', {
        playerId: player?.name,
        name: player?.name
      });
    });

    this.socket.on('chat:message', (payload: ChatUiMessage) => {
      ChatUI.addMessage({
        ...payload,
        name: sanitizeText(payload.name),
        text: sanitizeText(payload.text)
      });
    });

    this.socket.on('world:boss_defeated', (payload: { bossId?: string; bossName?: string; playerName?: string }) => {
      const bossName = sanitizeText(payload.bossName ?? payload.bossId ?? t('game.unknown'));
      useGameStore.getState().addNotification(`${t('socket.bossDefeated')}: ${bossName}`, 'gold');
    });

    this.socket.on('world:colossus_spawned', (payload: { colossusId?: string; colossusName?: string; region?: string }) => {
      const colossusName = sanitizeText(payload.colossusName ?? payload.colossusId ?? t('game.unknown'));
      useGameStore.getState().addNotification(`${t('socket.colossusSpawned')}: ${colossusName}`, 'error');
    });

    const setOnlineCount = (payload: number | { count?: number; online?: number }) => {
      const count = typeof payload === 'number' ? payload : payload.count ?? payload.online ?? 0;

      useGameStore.getState().setOnlineCount(count);

      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('eclipsia:online-count', { detail: count }));
      }
    };

    this.socket.on('player:online', setOnlineCount);
    this.socket.on('online:count', setOnlineCount);

    return this.socket;
  }

  emit(event: string, data?: unknown) {
    const socket = this.connect();
    socket.emit(event, data);
  }

  sendChatMessage(message: string) {
    this.emit('chat:message', {
      text: sanitizeText(message)
    });
  }

  notifyBossDefeated(bossId: string) {
    this.emit('world:boss_defeated', {
      bossId
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }
}

export const socketService = new SocketService();
