import { translations } from '../i18n';
import { useGameStore } from '../store/useGameStore';
import { usePlayerStore } from '../store/usePlayerStore';

export type QuestId = 'wolf_hunt_1' | 'goblin_slayer' | 'forest_explorer' | 'shadow_secret';
export type QuestType = 'kill' | 'explore' | 'tavern';

export interface QuestDefinition {
  id: QuestId;
  type: QuestType;
  target: string;
  amount: number;
  reward: {
    xp: number;
    gold: number;
    item?: string;
  };
  autoAccept: boolean;
  hidden?: boolean;
}

export interface QuestProgress {
  id: QuestId;
  progress: number;
  completed: boolean;
  completedAt?: string;
  unlocked: boolean;
}

export interface QuestState {
  active: Record<QuestId, QuestProgress>;
  completed: Record<QuestId, QuestProgress>;
}


const getLang = () => {
  if (typeof window === 'undefined') {
    return 'en-US' as const;
  }

  const saved = window.localStorage.getItem('eclipsia_lang');

  return saved === 'pt-BR' || saved === 'en-US' || saved === 'es-ES' || saved === 'ja-JP' ? saved : 'en-US';
};

const t = (path: string) => {
  const value = path.split('.').reduce<unknown>((current, key) => {
    if (!current || typeof current === 'string') {
      return undefined;
    }

    return (current as Record<string, unknown>)[key];
  }, translations[getLang()]);

  return typeof value === 'string' ? value : path;
};

const STORAGE_KEY = 'eclipsia_quests';

export const questDefinitions: QuestDefinition[] = [
  {
    id: 'wolf_hunt_1',
    type: 'kill',
    target: 'mist_wolf',
    amount: 10,
    reward: {
      xp: 500,
      gold: 300,
      item: 'w1h_1003'
    },
    autoAccept: true
  },
  {
    id: 'goblin_slayer',
    type: 'kill',
    target: 'goblin',
    amount: 15,
    reward: {
      xp: 800,
      gold: 500,
      item: 'er_5100'
    },
    autoAccept: true
  },
  {
    id: 'forest_explorer',
    type: 'explore',
    target: 'nythera',
    amount: 5,
    reward: {
      xp: 600,
      gold: 400
    },
    autoAccept: true
  },
  {
    id: 'shadow_secret',
    type: 'explore',
    target: 'nythera',
    amount: 3,
    reward: {
      xp: 1500,
      gold: 1000,
      item: 'am_7001'
    },
    autoAccept: false,
    hidden: true
  }
];

const createProgress = (id: QuestId, unlocked = true): QuestProgress => ({
  id,
  progress: 0,
  completed: false,
  unlocked
});

const emptyState = (): QuestState => ({
  active: {} as Record<QuestId, QuestProgress>,
  completed: {} as Record<QuestId, QuestProgress>
});

const readState = (): QuestState => {
  if (typeof window === 'undefined') {
    return emptyState();
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    return emptyState();
  }

  try {
    return JSON.parse(raw) as QuestState;
  } catch {
    return emptyState();
  }
};

const writeState = (state: QuestState) => {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    window.dispatchEvent(new CustomEvent('eclipsia:quests-updated', { detail: state }));
  }
};

const getDefinition = (questId: QuestId) => questDefinitions.find((quest) => quest.id === questId);

const completeIfReady = (state: QuestState, questId: QuestId) => {
  const quest = getDefinition(questId);
  const progress = state.active[questId];

  if (!quest || !progress || progress.completed || progress.progress < quest.amount) {
    return state;
  }

  return questSystem.complete(questId, state);
};

export const questSystem = {
  getState: readState,

  getActive() {
    return Object.values(readState().active).filter((quest) => quest.unlocked && !quest.completed);
  },

  getCompleted() {
    return Object.values(readState().completed);
  },

  autoAccept() {
    const state = readState();

    questDefinitions.forEach((quest) => {
      if (quest.autoAccept && !state.active[quest.id] && !state.completed[quest.id]) {
        state.active[quest.id] = createProgress(quest.id, true);
      }
    });

    writeState(state);
    return state;
  },

  unlockHidden(questId: QuestId) {
    const state = readState();

    if (!state.active[questId] && !state.completed[questId]) {
      state.active[questId] = createProgress(questId, true);
    } else if (state.active[questId]) {
      state.active[questId].unlocked = true;
    }

    writeState(state);
    return state;
  },

  onKill(monsterId: string) {
    let state = readState();

    questDefinitions
      .filter((quest) => quest.type === 'kill' && quest.target === monsterId)
      .forEach((quest) => {
        const current = state.active[quest.id];

        if (!current || !current.unlocked || current.completed) {
          return;
        }

        current.progress = Math.min(quest.amount, current.progress + 1);
        state = completeIfReady(state, quest.id);
      });

    writeState(state);
    return state;
  },

  onExplore(region: string) {
    let state = readState();

    questDefinitions
      .filter((quest) => quest.type === 'explore' && quest.target === region)
      .forEach((quest) => {
        const current = state.active[quest.id];

        if (!current || !current.unlocked || current.completed) {
          return;
        }

        current.progress = Math.min(quest.amount, current.progress + 1);
        state = completeIfReady(state, quest.id);
      });

    writeState(state);
    return state;
  },

  onTavern(eventLink: string) {
    let state = readState();

    questDefinitions
      .filter((quest) => quest.type === 'tavern' && quest.target === eventLink)
      .forEach((quest) => {
        const current = state.active[quest.id];

        if (!current || !current.unlocked || current.completed) {
          return;
        }

        current.progress = Math.min(quest.amount, current.progress + 1);
        state = completeIfReady(state, quest.id);
      });

    writeState(state);
    return state;
  },

  complete(questId: QuestId, inputState?: QuestState) {
    const state = inputState ?? readState();
    const quest = getDefinition(questId);
    const progress = state.active[questId];

    if (!quest || !progress) {
      return state;
    }

    const completedProgress: QuestProgress = {
      ...progress,
      progress: quest.amount,
      completed: true,
      completedAt: new Date().toISOString()
    };

    delete state.active[questId];
    state.completed[questId] = completedProgress;

    const playerStore = usePlayerStore.getState();
    const { leveledUp } = playerStore.gainXp(quest.reward.xp);
    playerStore.gainGold(quest.reward.gold);

    if (leveledUp) {
      useGameStore.getState().addNotification('NÍVEL AUMENTOU!', 'gold');
    }

    if (quest.reward.item) {
      playerStore.addItem(quest.reward.item, 1);
    }

    useGameStore.getState().addNotification(t('notifications.questComplete'), 'gold');

    if (!inputState) {
      writeState(state);
    }

    return state;
  },

  updateUI() {
    const state = readState();

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('eclipsia:quests-updated', { detail: state }));
    }

    return state;
  }
};

export const onKill = questSystem.onKill.bind(questSystem);
export const onExplore = questSystem.onExplore.bind(questSystem);
export const onTavern = questSystem.onTavern.bind(questSystem);
export const complete = questSystem.complete.bind(questSystem);
export const unlockHidden = questSystem.unlockHidden.bind(questSystem);
export const autoAccept = questSystem.autoAccept.bind(questSystem);
export const updateUI = questSystem.updateUI.bind(questSystem);

export const Quests = {
  init: questSystem.autoAccept.bind(questSystem),
  onKill,
  onExplore,
  onTavern,
  complete,
  unlockHidden,
  autoAccept,
  updateUI
};
