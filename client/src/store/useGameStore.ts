import { create } from 'zustand';

export type GameScreen = 'login' | 'char-create' | 'char-select' | 'game' | 'wiki';

export type GamePanel =
  | 'hub'
  | 'travel'
  | 'combat'
  | 'boss'
  | 'city'
  | 'items'
  | 'profile'
  | 'quest'
  | 'ranking'
  | 'guild'
  | 'chat'
  | 'party';

export type NotifyType = 'success' | 'error' | 'warning' | 'info' | 'gold';

export interface Notification {
  id: string;
  message: string;
  type: NotifyType;
}

interface GameState {
  screen: GameScreen;
  panel: GamePanel;
  history: GamePanel[];
  activeModal: string | null;
  notifications: Notification[];
  onlineCount: number;
  setScreen: (screen: GameScreen) => void;
  setPanel: (panel: GamePanel) => void;
  goBack: () => void;
  openModal: (modal: string) => void;
  closeModal: () => void;
  addNotification: (message: string, type: NotifyType) => void;
  removeNotification: (id: string) => void;
  setOnlineCount: (count: number) => void;
}

const createNotificationId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

export const useGameStore = create<GameState>((set, get) => ({
  screen: 'login',
  panel: 'hub',
  history: [],
  activeModal: null,
  notifications: [],
  onlineCount: 0,
  setScreen: (screen) => set({ screen }),
  setPanel: (panel) => {
    const current = get().panel;

    if (current === panel) {
      return;
    }

    set((state) => ({
      panel,
      history: [...state.history, current]
    }));
  },
  goBack: () => {
    const { history } = get();

    if (history.length === 0) {
      return;
    }

    const previous = history[history.length - 1];

    set({
      panel: previous,
      history: history.slice(0, -1)
    });
  },
  openModal: (modal) => set({ activeModal: modal }),
  closeModal: () => set({ activeModal: null }),
  addNotification: (message, type) => {
    const notification: Notification = {
      id: createNotificationId(),
      message,
      type
    };

    set(() => ({
      notifications: [notification]
    }));
  },
  removeNotification: (id) => {
    set((state) => ({
      notifications: state.notifications.filter((notification) => notification.id !== id)
    }));
  },
  setOnlineCount: (count) => set({ onlineCount: Math.max(0, count) })
}));
