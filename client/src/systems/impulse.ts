import { translations } from '../i18n';
import { useGameStore } from '../store/useGameStore';
import { usePlayerStore } from '../store/usePlayerStore';

export type ImpulseBonusType = 'xp' | 'gold' | 'damage' | 'defense' | 'luck';

export interface ImpulseState {
  charges: number;
  lastSeen: number;
}

const STORAGE_KEY = 'eclipsia_impulse';
const HOUR_MS = 60 * 60 * 1000;
const MAX_CHARGES = 5;

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

const readState = (): ImpulseState => {
  if (typeof window === 'undefined') {
    return {
      charges: 0,
      lastSeen: Date.now()
    };
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    return {
      charges: 0,
      lastSeen: Date.now()
    };
  }

  try {
    const parsed = JSON.parse(raw) as Partial<ImpulseState>;

    return {
      charges: Math.min(Math.max(parsed.charges ?? 0, 0), MAX_CHARGES),
      lastSeen: parsed.lastSeen ?? Date.now()
    };
  } catch {
    return {
      charges: 0,
      lastSeen: Date.now()
    };
  }
};

const writeState = (state: ImpulseState) => {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }
};

const applyLuckBonus = (charges: number) => {
  usePlayerStore.setState((state) => ({
    data: state.data
      ? {
          ...state.data,
          luck: {
            ...state.data.luck,
            impulse: charges >= 5 ? 5 : 0
          }
        }
      : state.data
  }));
};

export const impulseSystem = {
  initialize() {
    const now = Date.now();
    const current = readState();
    const offlineHours = Math.floor(Math.max(0, now - current.lastSeen) / HOUR_MS);
    const charges = Math.min(MAX_CHARGES, current.charges + offlineHours);
    const nextState = {
      charges,
      lastSeen: now
    };

    writeState(nextState);
    applyLuckBonus(charges);

    if (offlineHours > 0 && charges > 0) {
      useGameStore.getState().openModal('modal-impulse-welcome');
      useGameStore.getState().addNotification(`${t('impulse.title')}: ${charges} ${t('impulse.charges')}`, 'gold');
    }

    return nextState;
  },

  getState: readState,

  getBonus(type: ImpulseBonusType) {
    const { charges } = readState();

    if (type === 'xp') {
      return charges >= 1 ? 1.1 : 1;
    }

    if (type === 'gold') {
      return charges >= 2 ? 1.1 : 1;
    }

    if (type === 'damage') {
      return charges >= 3 ? 1.1 : 1;
    }

    if (type === 'defense') {
      return charges >= 4 ? 1.1 : 1;
    }

    if (type === 'luck') {
      return charges >= 5 ? 5 : 0;
    }

    return 1;
  },

  consumeCharge() {
    const state = readState();
    const nextState = {
      charges: Math.max(0, state.charges - 1),
      lastSeen: Date.now()
    };

    writeState(nextState);
    applyLuckBonus(nextState.charges);

    return nextState.charges;
  },

  markOnline() {
    const state = readState();

    writeState({
      ...state,
      lastSeen: Date.now()
    });
  }
};

export const initializeImpulse = impulseSystem.initialize.bind(impulseSystem);
export const getBonus = impulseSystem.getBonus.bind(impulseSystem);
export const consumeImpulseCharge = impulseSystem.consumeCharge.bind(impulseSystem);

export const Impulse = {
  init: impulseSystem.initialize.bind(impulseSystem),
  getBonus: impulseSystem.getBonus.bind(impulseSystem),
  consumeCharge: impulseSystem.consumeCharge.bind(impulseSystem),
  markOnline: impulseSystem.markOnline.bind(impulseSystem)
};
