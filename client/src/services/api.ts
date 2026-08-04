export type ApiMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export type ApiResult<T = unknown> =
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      error: string;
    };

const env = (import.meta as unknown as { env?: { DEV?: boolean; VITE_API_URL?: string } }).env;
const isDev = env?.DEV ?? (typeof window !== 'undefined' && ['localhost', '127.0.0.1'].includes(window.location.hostname));

const normalizeBaseUrl = (url: string) => {
  const trimmed = url.replace(/\/$/, '');

  return trimmed.endsWith('/api') ? trimmed : `${trimmed}/api`;
};

export const BASE_URL = normalizeBaseUrl(
  env?.VITE_API_URL ?? (isDev ? 'http://localhost:5000/api' : 'https://eclipsia-server.railway.app/api')
);
export const SERVER_URL = BASE_URL.replace(/\/api\/?$/, '');

const TOKEN_KEY = 'eclipsia_token';

const getToken = () => {
  if (typeof window === 'undefined') {
    return null;
  }

  return window.localStorage.getItem(TOKEN_KEY);
};

const setToken = (token: string) => {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(TOKEN_KEY, token);
  }
};

const clearToken = () => {
  if (typeof window !== 'undefined') {
    window.localStorage.removeItem(TOKEN_KEY);
  }
};

export const API = {
  BASE_URL,

  get token() {
    return getToken();
  },

  setToken,
  clearToken,

  getHeaders(auth = true) {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json'
    };

    const token = getToken();

    if (auth && token) {
      headers.Authorization = `Bearer ${token}`;
    }

    return headers;
  },

  async request<T = unknown>(method: ApiMethod, endpoint: string, body?: unknown, auth = true): Promise<ApiResult<T>> {
    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        method,
        headers: this.getHeaders(auth),
        body: body === undefined ? undefined : JSON.stringify(body)
      });

      const contentType = response.headers.get('content-type') ?? '';
      const data = contentType.includes('application/json') ? await response.json() : await response.text();

      if (!response.ok) {
        const error = typeof data === 'object' && data && 'message' in data ? String((data as { message: unknown }).message) : String(data || response.statusText);

        return {
          success: false,
          error
        };
      }

      return {
        success: true,
        data: data as T
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Network error'
      };
    }
  },

  get<T = unknown>(endpoint: string, auth = true) {
    return this.request<T>('GET', endpoint, undefined, auth);
  },

  post<T = unknown>(endpoint: string, body?: unknown, auth = true) {
    return this.request<T>('POST', endpoint, body, auth);
  },

  put<T = unknown>(endpoint: string, body?: unknown, auth = true) {
    return this.request<T>('PUT', endpoint, body, auth);
  },

  delete<T = unknown>(endpoint: string, auth = true) {
    return this.request<T>('DELETE', endpoint, undefined, auth);
  },

  auth: {
    register(username: string, email: string, password: string) {
      return API.post('/auth/register', { username, email, password }, false);
    },

    login(email: string, password: string) {
      return API.post('/auth/login', { email, password }, false);
    },

    logout() {
      clearToken();
      return Promise.resolve({ success: true, data: null } as ApiResult<null>);
    }
  },

  mail: {
    inbox(charName: string) {
      return API.get<{ mails: unknown[] }>(`/mail/inbox?charName=${encodeURIComponent(charName)}`);
    },
    send(payload: { charName: string; toName: string; subject?: string; message?: string; itemRef?: string | null; gold?: number; crystals?: number }) {
      return API.post('/mail/send', payload);
    },
    read(mailId: string) {
      return API.post('/mail/read', { mailId });
    },
    claim(mailId: string, charName: string) {
      return API.post<{ character?: { gold: number; inventory: unknown[] } }>('/mail/claim', { mailId, charName });
    },
    remove(mailId: string) {
      return API.delete(`/mail/${mailId}`);
    }
  },

  market: {
    listings(params: { rarity?: string; numId?: number } = {}) {
      const query = new URLSearchParams();
      if (params.rarity) query.set('rarity', params.rarity);
      if (params.numId) query.set('numId', String(params.numId));
      const suffix = query.toString() ? `?${query.toString()}` : '';
      return API.get<{ listings: unknown[] }>(`/market/listings${suffix}`);
    },
    my(sellerName: string) {
      return API.get<{ listings: unknown[] }>(`/market/my?sellerName=${encodeURIComponent(sellerName)}`);
    },
    list(payload: { charName: string; itemRef: string; price: number; rarity?: string }) {
      return API.post('/market/list', payload);
    },
    buy(payload: { listingId: string; charName: string }) {
      return API.post<{ character?: { gold: number; inventory: unknown[] } }>('/market/buy', payload);
    },
    cancel(payload: { listingId: string; charName: string }) {
      return API.post('/market/cancel', payload);
    }
  },

  auction: {
    list() {
      return API.get('/auction/list');
    },
    my(sellerName: string) {
      return API.get(`/auction/my?sellerName=${encodeURIComponent(sellerName)}`);
    },
    create(payload: { charName: string; itemRef: string; startPrice: number; minIncrement?: number; durationHours?: number }) {
      return API.post('/auction/create', payload);
    },
    bid(payload: { auctionId: string; charName: string; amount: number }) {
      return API.post('/auction/bid', payload);
    },
    cancel(payload: { auctionId: string; charName: string }) {
      return API.post('/auction/cancel', payload);
    }
  },

  guild: {
    list() {
      return API.get('/guild/list');
    },
    my(charName: string) {
      return API.get(`/guild/my?charName=${encodeURIComponent(charName)}`);
    },
    create(payload: { charName: string; name: string }) {
      return API.post('/guild/create', payload);
    },
    join(payload: { charName: string; guildId: string }) {
      return API.post('/guild/join', payload);
    },
    leave(payload: { charName: string }) {
      return API.post('/guild/leave', payload);
    },
    kick(payload: { charName: string; targetName: string }) {
      return API.post('/guild/kick', payload);
    },
    promote(payload: { charName: string; targetName: string }) {
      return API.post('/guild/promote', payload);
    },
    motd(payload: { charName: string; motd: string }) {
      return API.post('/guild/motd', payload);
    },
    disband(payload: { charName: string }) {
      return API.post('/guild/disband', payload);
    }
  },

  player: {
    get<T = unknown>() {
      return API.get<T>('/player/me');
    },

    save(playerData: unknown) {
      return API.put('/player/save', { playerData });
    },

    create<T = unknown>(characterData: unknown) {
      return API.post<T>('/player/create', characterData);
    },

    deleteCharacter<T = unknown>(characterId: string) {
      return API.delete<T>(`/player/character/${characterId}`);
    },

    selectCharacter<T = unknown>(characterId: string) {
      return API.post<T>(`/player/character/${characterId}/select`);
    }
  },

  ranking: {
    getByLevel(page = 1) {
      return API.get(`/ranking/level?page=${page}`);
    },

    getByDiscoveries(page = 1) {
      return API.get(`/ranking/discoveries?page=${page}`);
    }
  },

  world: {
    getState() {
      return API.get('/world/state');
    }
  }
};
