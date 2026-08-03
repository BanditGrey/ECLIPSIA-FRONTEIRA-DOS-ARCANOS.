import { API, SERVER_URL } from './api';
import type { PlayerData } from '../types/player.types';

export const API_URL = SERVER_URL;

export type Archetype = 'blade' | 'arcane' | 'druid' | 'vanguard' | 'ranger' | 'spectre';

export interface CharacterSummary {
  id: string;
  name: string;
  archetype: Archetype;
  level: number;
  activeTitle?: string | null;
}

export interface AuthLoginPayload {
  email: string;
  password: string;
}

export interface AuthRegisterPayload {
  username: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

export interface AuthResponse {
  token?: string;
  hasCharacters?: boolean;
  characters?: CharacterSummary[];
  player?: PlayerData;
}

export interface CreateCharacterPayload {
  name: string;
  archetype: Archetype;
}

interface AccountResponse {
  characters: Array<CharacterSummary & { _id?: string }>;
}

const normalizeCharacters = (account: AccountResponse): CharacterSummary[] =>
  account.characters.map((character) => ({
    id: character.id ?? character._id ?? character.name,
    name: character.name,
    archetype: character.archetype,
    level: character.level,
    activeTitle: character.activeTitle ?? null
  }));

export class AuthService {
  static getToken() {
    return API.token;
  }

  static setToken(token: string) {
    API.setToken(token);
  }

  static clearToken() {
    API.clearToken();
  }

  static init() {
    return this.getToken();
  }

  static async login(payload: AuthLoginPayload) {
    const result = await API.auth.login(payload.email, payload.password) as { success: boolean; data?: AuthResponse; error?: string };

    if (!result.success) {
      throw new Error(result.error);
    }

    if (result.data?.token) {
      API.setToken(result.data.token);
    }

    return result.data ?? {};
  }

  static async register(payload: AuthRegisterPayload) {
    const result = await API.auth.register(payload.username, payload.email, payload.password) as { success: boolean; data?: AuthResponse; error?: string };

    if (!result.success) {
      throw new Error(result.error);
    }

    if (result.data?.token) {
      API.setToken(result.data.token);
    }

    return result.data ?? {};
  }

  static async getCharacters() {
    const result = await API.player.get<AccountResponse>();

    if (!result.success) {
      throw new Error(result.error);
    }

    return normalizeCharacters(result.data);
  }

  static async createCharacter(payload: CreateCharacterPayload) {
    const result = await API.player.create<{ playerData?: PlayerData; character?: PlayerData }>(payload);

    if (!result.success) {
      throw new Error(result.error);
    }

    const playerData = result.data.playerData ?? result.data.character;

    if (!playerData) {
      throw new Error('Player data not returned');
    }

    return playerData;
  }

  static async selectCharacter(characterId: string) {
    const result = await API.player.selectCharacter<{ playerData?: PlayerData; character?: PlayerData }>(characterId);

    if (!result.success) {
      throw new Error(result.error);
    }

    const playerData = result.data.playerData ?? result.data.character;

    if (!playerData) {
      throw new Error('Player data not returned');
    }

    return playerData;
  }

  static async deleteCharacter(characterId: string) {
    const result = await API.player.deleteCharacter(characterId);

    if (!result.success) {
      throw new Error(result.error);
    }
  }
}
