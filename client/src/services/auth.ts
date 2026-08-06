import { translations } from '../i18n';
import { useGameStore } from '../store/useGameStore';
import { usePlayerStore } from '../store/usePlayerStore';
import type { Equipment, PlayerData, Proficiencies, Stats } from '../types/player.types';
import { API } from './api';
import type { ApiResult } from './api';
import { socketService } from './socket';
import { syncService } from './sync';

interface AuthPayload {
  token?: string;
  hasCharacters?: boolean;
  characters?: ServerCharacter[];
  player?: ServerAccount | PlayerData;
}

interface ServerAccount {
  _id: string;
  username: string;
  email: string;
  characters: ServerCharacter[];
  activeCharId?: string | null;
}

interface ServerCharacter {
  _id?: string;
  id?: string;
  name: string;
  archetype: string;
  level?: number;
  xp?: number;
  xpToNext?: number;
  gold?: number;
  crystals?: number;
  daily?: { date: string; progress: Record<string, number>; claimed: string[] };
  hp?: number;
  maxHp?: number;
  mp?: number;
  maxMp?: number;
  stats?: Partial<Stats>;
  luck?: Partial<PlayerData['luck']>;
  freePoints?: number;
  equipment?: Partial<Equipment>;
  storage?: Array<{ itemStr?: string; id?: string; qty: number }>;
  inventory?: PlayerData['inventory'];
  skills?: string[];
  skillCooldowns?: Record<string, number>;
  titles?: string[];
  activeTitle?: string | null;
  proficiencies?: Partial<Proficiencies>;
  kills?: Record<string, number> | Map<string, number>;
  discoveries?: string[] | number;
  weakPointHits?: number;
  rareDrops?: number;
  createdAt?: string;
  lastLogin?: string;
}

const defaultEquipment: Equipment = {
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

const defaultStats: Stats = {
  strength: 5,
  agility: 5,
  vitality: 5,
  arcana: 5,
  perception: 5,
  will: 5
};

const defaultProficiencies: Proficiencies = {};

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

const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const normalizeKills = (kills: ServerCharacter['kills']) => {
  if (!kills) {
    return {};
  }

  if (kills instanceof Map) {
    return Object.fromEntries(kills.entries());
  }

  return kills;
};

const normalizeDiscoveries = (discoveries: ServerCharacter['discoveries']) => {
  if (Array.isArray(discoveries)) {
    return discoveries;
  }

  const count = typeof discoveries === 'number' ? discoveries : 0;

  return Array.from({ length: count }, (_, index) => `discovery_${index + 1}`);
};

const characterToPlayerData = (character: ServerCharacter): PlayerData => {
  const now = new Date().toISOString();

  return {
    name: character.name,
    archetype: character.archetype,
    level: character.level ?? 1,
    xp: character.xp ?? 0,
    xpToNext: character.xpToNext ?? 100,
    gold: character.gold ?? 100,
    crystals: character.crystals ?? 0,
    daily: character.daily ?? { date: '', progress: {}, claimed: [] },
    hp: character.hp ?? character.maxHp ?? 100,
    maxHp: character.maxHp ?? character.hp ?? 100,
    mp: character.mp ?? character.maxMp ?? 50,
    maxMp: character.maxMp ?? character.mp ?? 50,
    stats: {
      ...defaultStats,
      ...character.stats
    },
    luck: {
      base: 0,
      equipment: 0,
      titles: 0,
      impulse: 0,
      events: 0,
      ...character.luck
    },
    freePoints: character.freePoints ?? 3,
    equipment: {
      ...defaultEquipment,
      ...character.equipment
    },
    inventory: character.inventory ?? [],
    maxInventory: 60,
    storage: character.storage ?? [],
    maxStorage: 500,
    skills: character.skills ?? [],
    skillCooldowns: character.skillCooldowns ?? {},
    titles: character.titles ?? [],
    activeTitle: character.activeTitle ?? null,
    proficiencies: {
      ...defaultProficiencies,
      ...character.proficiencies
    },
    kills: normalizeKills(character.kills),
    discoveries: normalizeDiscoveries(character.discoveries),
    weakPointHits: character.weakPointHits ?? 0,
    rareDrops: character.rareDrops ?? 0,
    createdAt: character.createdAt ?? now,
    lastLogin: character.lastLogin ?? now
  };
};

const isServerAccount = (value: unknown): value is ServerAccount => {
  return Boolean(value && typeof value === 'object' && 'characters' in value && Array.isArray((value as ServerAccount).characters));
};

const getActiveCharacter = (account: ServerAccount) => {
  return account.characters.find((character) => (character._id ?? character.id) === account.activeCharId) ?? account.characters[0] ?? null;
};

const enterFromAccount = (account: ServerAccount) => {
  const gameStore = useGameStore.getState();
  const activeCharacter = getActiveCharacter(account);

  if (activeCharacter) {
    usePlayerStore.getState().setPlayer(characterToPlayerData(activeCharacter));
    gameStore.setScreen('game');
    gameStore.setPanel('hub');
    syncService.start();
    socketService.connect();
    return;
  }

  gameStore.setScreen(account.characters.length > 0 ? 'char-select' : 'char-create');
};

const loadAccount = async () => {
  const response = await API.player.get<ServerAccount>();

  if (!response.success) {
    return response;
  }

  enterFromAccount(response.data);
  return response;
};

export const AuthService = {
  async init() {
    return this.checkSession();
  },

  async login(email: string, password: string): Promise<ApiResult<AuthPayload>> {
    const response = await API.auth.login(email, password) as ApiResult<AuthPayload>;

    if (!response.success) {
      return response;
    }

    if (response.data.token) {
      API.setToken(response.data.token);
    }

    const accountResponse = await loadAccount();

    if (!accountResponse.success) {
      useGameStore.getState().setScreen((response.data.hasCharacters || (response.data.characters?.length ?? 0) > 0) ? 'char-select' : 'char-create');
    }

    syncService.start();
    socketService.connect();

    return response;
  },

  async register(username: string, email: string, password: string): Promise<ApiResult<AuthPayload>> {
    if (username.length < 3 || username.length > 20) {
      return {
        success: false,
        error: t('auth.invalidUsername')
      };
    }

    if (!isValidEmail(email)) {
      return {
        success: false,
        error: t('auth.invalidEmail')
      };
    }

    if (password.length < 6) {
      return {
        success: false,
        error: t('auth.invalidPassword')
      };
    }

    const response = await API.auth.register(username, email, password) as ApiResult<AuthPayload>;

    if (!response.success) {
      return response;
    }

    if (response.data.token) {
      API.setToken(response.data.token);
    } else {
      const loginResponse = await this.login(email, password);

      if (!loginResponse.success) {
        return loginResponse;
      }
    }

    useGameStore.getState().setScreen('char-create');
    syncService.start();
    socketService.connect();

    return response;
  },

  async logout() {
    await syncService.saveNow();
    API.clearToken();
    await API.auth.logout();
    syncService.stop();
    socketService.disconnect();
    usePlayerStore.getState().clearPlayer();
    useGameStore.getState().setScreen('login');
    useGameStore.getState().setPanel('hub');
  },

  playOfflineMock() {
    const mockData: PlayerData = {
      name: "Arena Tester",
      archetype: "blade",
      gender: "female",
      level: 99,
      xp: 0,
      xpToNext: 999999,
      gold: 50000,
      crystals: 5000,
      hp: 8500,
      maxHp: 8500,
      mp: 2000,
      maxMp: 2000,
      daily: undefined,
      stats: { strength: 150, agility: 90, vitality: 120, arcana: 40, perception: 50, will: 60 },
      luck: { base: 10, equipment: 50, titles: 0, impulse: 0, events: 0 },
      freePoints: 0,
      equipment: {
        weapon_main: "w1h_1150|1:120|99:5",
        weapon_off: null,
        head: "hd_2500",
        chest: "ch_3000", // Vestimenta de Couro (visual ativo no sandbox)
        legs: "lg_3500",
        gloves: null,
        boots: null,
        earring: null,
        necklace: null,
        belt: null,
        resistance: null,
        amulet: null,
        spirit_stone: null,
        pet: "pt_8001",
        mount: "mt_8501"
      },
      inventory: [
        { itemStr: "mat_9000", id: "mat_9000", qty: 99 },
        { itemStr: "mat_9050", id: "mat_9050", qty: 10 },
        { itemStr: "w2h_1600", id: "w2h_1600", qty: 1 },
        // Itens com visual (teste do sistema de visuais): 2 armaduras + 10 armas
        { itemStr: "ch_3002", id: "ch_3002", qty: 1 }, // Cota de Ferro
        { itemStr: "w1h_1001", id: "w1h_1001", qty: 1 }, // Espada de Ferro
        { itemStr: "w1h_1005", id: "w1h_1005", qty: 1 }, // Lâmina do Eclipse
        { itemStr: "w1h_1100", id: "w1h_1100", qty: 1 }, // Adaga
        { itemStr: "w1h_1150", id: "w1h_1150", qty: 1 }, // Cajado Simples
        { itemStr: "w1h_1200", id: "w1h_1200", qty: 1 }, // Arco Curto
        { itemStr: "w2h_1500", id: "w2h_1500", qty: 1 }, // Espadão
        { itemStr: "w2h_1650", id: "w2h_1650", qty: 1 }, // Lança
        { itemStr: "w2h_1700", id: "w2h_1700", qty: 1 }, // Arco Longo
        { itemStr: "w2h_1750", id: "w2h_1750", qty: 1 }, // Cajado de Batalha
      ],
      maxInventory: 100,
      storage: [],
      maxStorage: 500,
      skills: ["slash", "heavy_strike", "vital_strike", "eclipse_slash"],
      skillCooldowns: {},
      titles: ["beta_tester"],
      activeTitle: "beta_tester",
      proficiencies: {
        sword_one: 5000,
        sword_two: 2000,
        great_sword: 0,
        dagger: 0,
        dagger_off: 0,
        bow_short: 0,
        bow_long: 0,
        staff_one: 0,
        staff_two: 0,
        orb: 0,
        tome: 0,
        hammer: 0,
        spear: 0,
        shield: 0
      },
      kills: {},
      discoveries: [],
      weakPointHits: 150,
      rareDrops: 12,
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString()
    };

    usePlayerStore.getState().setPlayer(mockData);
    useGameStore.getState().setScreen('game');
    useGameStore.getState().addNotification("Modo Sandbox Ativado!", "success");
  },

  async checkSession() {
    if (!API.token) {
      useGameStore.getState().setScreen('login');
      return false;
    }

    const response = await loadAccount();

    if (!response.success) {
      API.clearToken();
      syncService.stop();
      socketService.disconnect();
      usePlayerStore.getState().clearPlayer();
      useGameStore.getState().setScreen('login');
      return false;
    }

    syncService.start();
    socketService.connect();
    return true;
  }
};

export const Auth = AuthService;
