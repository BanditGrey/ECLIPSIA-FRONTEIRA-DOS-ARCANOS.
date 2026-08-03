import { translations } from '../i18n';
import { useGameStore } from '../store/useGameStore';
import { usePlayerStore } from '../store/usePlayerStore';
import type { PlayerData } from '../types/player.types';
import { API } from './api';

export type SyncStatus = 'saving' | 'saved' | 'error';

const SYNC_INTERVAL_MS = 30_000;
const INDICATOR_ID = 'eclipsia-sync-indicator';

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

class SyncService {
  interval = 30;
  private intervalId: number | null = null;
  private isSaving = false;
  private beforeUnloadHandler = () => {
    void this.saveNow();
  };
  private visibilityHandler = () => {
    if (document.visibilityState === 'hidden') {
      void this.saveNow();
    }
  };

  start() {
    if (typeof window === 'undefined' || this.intervalId !== null) {
      return;
    }

    this.intervalId = window.setInterval(() => {
      void this.saveNow();
    }, SYNC_INTERVAL_MS);

    window.addEventListener('beforeunload', this.beforeUnloadHandler);
    document.addEventListener('visibilitychange', this.visibilityHandler);
  }

  stop() {
    if (typeof window === 'undefined') {
      return;
    }

    if (this.intervalId !== null) {
      window.clearInterval(this.intervalId);
      this.intervalId = null;
    }

    window.removeEventListener('beforeunload', this.beforeUnloadHandler);
    document.removeEventListener('visibilitychange', this.visibilityHandler);
  }

  async saveNow() {
    if (!API.token || this.isSaving) {
      return false;
    }

    const playerData = this.buildSaveData();

    if (!playerData) {
      return false;
    }

    this.isSaving = true;
    this.showSyncIndicator('saving');

    const result = await API.player.save(playerData);

    this.isSaving = false;

    if (result.success) {
      this.showSyncIndicator('saved');
      return true;
    }

    this.showSyncIndicator('error');
    useGameStore.getState().addNotification(t('sync.error'), 'error');
    return false;
  }

  buildSaveData(): PlayerData | null {
    return usePlayerStore.getState().data;
  }

  showSyncIndicator(status: SyncStatus) {
    if (typeof document === 'undefined') {
      return;
    }

    const existing = document.getElementById(INDICATOR_ID);
    const element = existing ?? document.createElement('div');

    element.id = INDICATOR_ID;
    element.textContent = t(`sync.${status}`);
    element.style.position = 'fixed';
    element.style.right = '12px';
    element.style.bottom = '12px';
    element.style.zIndex = '1000';
    element.style.padding = '8px 12px';
    element.style.borderRadius = '8px';
    element.style.border = '1px solid #1e2a3a';
    element.style.background = '#111827';
    element.style.color = status === 'error' ? '#fca5a5' : status === 'saved' ? '#86efac' : '#f0c040';
    element.style.fontFamily = 'Share Tech Mono, monospace';
    element.style.fontSize = '12px';
    element.style.boxShadow = '0 8px 24px rgba(0,0,0,0.35)';

    if (!existing) {
      document.body.appendChild(element);
    }

    if (status !== 'saving') {
      window.setTimeout(() => element.remove(), 1800);
    }
  }
}

export const syncService = new SyncService();
