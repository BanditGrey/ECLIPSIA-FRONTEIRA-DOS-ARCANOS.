import { translations } from '../i18n';
import { useGameStore } from '../store/useGameStore';
import { usePlayerStore } from '../store/usePlayerStore';
import { questSystem } from './quests';

export type HiddenEventId =
  | 'cursed_dungeon'
  | 'ghost_npc'
  | 'hidden_weapon'
  | 'forbidden_boss'
  | 'monthly_eclipse'
  | 'wolf_tracks'
  | 'dungeon_failure';

export interface HiddenEventTracker {
  deathsByLocation: Record<string, number>;
  dungeonDeaths: Record<string, number>;
  explores: Record<string, number>;
  cursedItemsUsed: number;
  triggered: Record<string, number>;
}

export interface HiddenEventDefinition {
  id: HiddenEventId;
  cooldownMs?: number;
  check: (tracker: HiddenEventTracker) => boolean;
  reward: () => void;
}

const STORAGE_KEY = 'eclipsia_hidden_events';
const MONTH_MS = 30 * 24 * 60 * 60 * 1000;

const emptyTracker = (): HiddenEventTracker => ({
  deathsByLocation: {},
  dungeonDeaths: {},
  explores: {},
  cursedItemsUsed: 0,
  triggered: {}
});

const readTracker = (): HiddenEventTracker => {
  if (typeof window === 'undefined') {
    return emptyTracker();
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    return emptyTracker();
  }

  try {
    return JSON.parse(raw) as HiddenEventTracker;
  } catch {
    return emptyTracker();
  }
};

const writeTracker = (tracker: HiddenEventTracker) => {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tracker));
  }
};

const getLang = () => {
  if (typeof window === 'undefined') {
    return 'en-US' as const;
  }

  const saved = window.localStorage.getItem('eclipsia_lang');

  return saved === 'pt-BR' || saved === 'en-US' || saved === 'es-ES' || saved === 'ja-JP' ? saved : 'en-US';
};

const t = (path: string) => {
  const read = (obj: unknown) =>
    path.split('.').reduce<unknown>((current, key) => {
      if (!current || typeof current === 'string') {
        return undefined;
      }

      return (current as Record<string, unknown>)[key];
    }, obj);

  const value = read(translations[getLang()]) ?? read(translations['en-US']);

  return typeof value === 'string' ? value : path;
};

const triggerEvent = (tracker: HiddenEventTracker, event: HiddenEventDefinition) => {
  const now = Date.now();
  const lastTriggered = tracker.triggered[event.id];

  if (lastTriggered && (!event.cooldownMs || now - lastTriggered < event.cooldownMs)) {
    return false;
  }

  if (!event.check(tracker)) {
    return false;
  }

  tracker.triggered[event.id] = now;
  event.reward();
  useGameStore.getState().openModal(`modal-hidden-${event.id}`);
  useGameStore.getState().addNotification(`${t(`hiddenEvents.${event.id}.name`)}: ${t(`hiddenEvents.${event.id}.desc`)}`, 'gold');

  return true;
};

export const hiddenEventDefinitions: HiddenEventDefinition[] = [
  {
    id: 'cursed_dungeon',
    check: (tracker) => Object.values(tracker.deathsByLocation).some((count) => count >= 3),
    reward: () => usePlayerStore.getState().addItem('mat_9055', 1)
  },
  {
    id: 'ghost_npc',
    check: (tracker) => (tracker.explores.nythera ?? 0) >= 5,
    reward: () => {
      const { leveledUp } = usePlayerStore.getState().gainXp(250);
      if (leveledUp) useGameStore.getState().addNotification('NÍVEL AUMENTOU!', 'gold');
    }
  },
  {
    id: 'hidden_weapon',
    check: (tracker) => (tracker.explores.valedouro ?? 0) >= 10,
    reward: () => usePlayerStore.getState().addItem('w1h_1002', 1)
  },
  {
    id: 'forbidden_boss',
    check: (tracker) => tracker.cursedItemsUsed >= 2,
    reward: () => usePlayerStore.getState().gainGold(500)
  },
  {
    id: 'monthly_eclipse',
    cooldownMs: MONTH_MS,
    check: () => new Date().getDate() === 1,
    reward: () => usePlayerStore.getState().addItem('cosmetic_eclipse_cloak', 1)
  },
  {
    id: 'wolf_tracks',
    check: (tracker) => (tracker.explores.nythera ?? 0) >= 8,
    reward: () => usePlayerStore.getState().addItem('azhur_fang', 1)
  },
  {
    id: 'dungeon_failure',
    check: (tracker) => Object.values(tracker.dungeonDeaths).some((count) => count >= 3),
    reward: () => questSystem.unlockHidden('shadow_secret')
  }
];

export const hiddenEventsSystem = {
  getTracker: readTracker,

  checkAll() {
    const tracker = readTracker();
    const triggered = hiddenEventDefinitions.filter((event) => triggerEvent(tracker, event)).map((event) => event.id);

    writeTracker(tracker);

    return triggered;
  },

  recordDeath(location: string) {
    const tracker = readTracker();
    tracker.deathsByLocation[location] = (tracker.deathsByLocation[location] ?? 0) + 1;
    writeTracker(tracker);
    return this.checkAll();
  },

  recordDungeonDeath(dungeonId: string) {
    const tracker = readTracker();
    tracker.dungeonDeaths[dungeonId] = (tracker.dungeonDeaths[dungeonId] ?? 0) + 1;
    writeTracker(tracker);
    return this.checkAll();
  },

  recordExplore(region: string) {
    const tracker = readTracker();
    tracker.explores[region] = (tracker.explores[region] ?? 0) + 1;
    writeTracker(tracker);
    return this.checkAll();
  },

  recordCursedItemUse(amount = 1) {
    const tracker = readTracker();
    tracker.cursedItemsUsed += amount;
    writeTracker(tracker);
    return this.checkAll();
  },

  reset() {
    const tracker = emptyTracker();
    writeTracker(tracker);
    return tracker;
  }
};

export const checkHiddenEvents = hiddenEventsSystem.checkAll.bind(hiddenEventsSystem);
export const recordHiddenDeath = hiddenEventsSystem.recordDeath.bind(hiddenEventsSystem);
export const recordHiddenExplore = hiddenEventsSystem.recordExplore.bind(hiddenEventsSystem);
export const recordDungeonFailure = hiddenEventsSystem.recordDungeonDeath.bind(hiddenEventsSystem);

export const HiddenEvents = {
  init: hiddenEventsSystem.checkAll.bind(hiddenEventsSystem),
  checkAll: hiddenEventsSystem.checkAll.bind(hiddenEventsSystem),
  recordDeath: hiddenEventsSystem.recordDeath.bind(hiddenEventsSystem),
  recordExplore: hiddenEventsSystem.recordExplore.bind(hiddenEventsSystem),
  recordDungeonDeath: hiddenEventsSystem.recordDungeonDeath.bind(hiddenEventsSystem),
  recordCursedItemUse: hiddenEventsSystem.recordCursedItemUse.bind(hiddenEventsSystem)
};
