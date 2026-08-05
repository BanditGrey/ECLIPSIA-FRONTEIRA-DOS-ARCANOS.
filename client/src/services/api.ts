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
const isLocalhost = typeof window !== 'undefined' && ['localhost', '127.0.0.1'].includes(window.location.hostname);
const isViteDev = env?.DEV === true;

const normalizeBaseUrl = (url: string) => {
  const trimmed = url.replace(/\/$/, '');

  return trimmed.endsWith('/api') ? trimmed : `${trimmed}/api`;
};

// Resolução da URL da API (nesta ordem):
// 1. VITE_API_URL explícita (produção: Vercel → Railway) tem prioridade.
// 2. Dev (vite) fora de localhost (ex.: preview online) → caminho relativo,
//    proxied pelo vite dev server (ver vite.config.ts → server.proxy).
// 3. Dev local em localhost → API local direta.
// 4. Build de produção sem env → default Railway documentado.
export const BASE_URL = normalizeBaseUrl(
  env?.VITE_API_URL ??
    (isViteDev && !isLocalhost ? '/api' : isLocalhost ? 'http://localhost:5000/api' : 'https://eclipsia-server.railway.app/api')
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

  async handleMockRequest<T>(method: ApiMethod, endpoint: string, body?: unknown): Promise<ApiResult<T>> {
    console.log(`[Offline Mock] Interceptado: ${method} ${endpoint}`, body);
    
    return new Promise((resolve) => {
      setTimeout(() => {
        // Se for leitura de chat global, devolve vazio
        if (endpoint.includes('/world/state')) {
          return resolve({ success: true, data: { online: 1 } as T });
        }
        if (endpoint.includes('/mail/inbox')) {
          return resolve({ success: true, data: { mails: [] } as T });
        }
        if (endpoint.includes('/market/listings') || endpoint.includes('/market/my') || endpoint.includes('/auction/list') || endpoint.includes('/auction/bids')) {
          return resolve({ success: true, data: { listings: [], auctions: [] } as T });
        }
        if (endpoint.includes('/guild/list') || endpoint.includes('/guild/my')) {
          return resolve({ success: true, data: { guilds: [], guild: null } as T });
        }
        if (endpoint.includes('/ranking/')) {
          return resolve({ success: true, data: { rankings: [] } as T });
        }
        
        // Simular sucessos genéricos para vendas/criações sem limpar o inventário
        resolve({ success: true, data: { message: "Mock Success", listing: {} } as T });
      }, 300);
    });
  },

  async request<T = unknown>(method: ApiMethod, endpoint: string, body?: unknown, auth = true): Promise<ApiResult<T>> {
    if (typeof window !== 'undefined' && window.localStorage.getItem('eclipsia_offline_mode') === 'true' && !endpoint.includes('/auth/login') && !endpoint.includes('/auth/register')) {
      return this.handleMockRequest<T>(method, endpoint, body);
    }
    
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
    myBids(name: string) {
      return API.get(`/auction/bids?name=${encodeURIComponent(name)}`);
    },
    cancel(payload: { auctionId: string; charName: string }) {
      return API.post('/auction/cancel', payload);
    }
  },

  whisper: {
    inbox(charName: string) {
      return API.get(`/whisper/inbox?charName=${encodeURIComponent(charName)}`);
    },
    send(payload: { fromName: string; toName: string; text: string }) {
      return API.post('/whisper/send', payload);
    },
    read(charName: string, fromName?: string) {
      return API.post('/whisper/read', { charName, fromName });
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
