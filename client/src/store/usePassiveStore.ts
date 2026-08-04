import { create } from 'zustand';
import { PASSIVE_NODES, PASSIVE_BRANCHES } from '../data/passives';

export interface PassiveState {
  availablePoints: number;
  selectedPassives: string[]; // ids das passivas selecionadas
  addPoint: () => void;
  selectPassive: (id: string) => boolean;
  resetPassives: () => boolean;
  getSelectedEffects: () => Array<{ effect: string; value: number }>;
  canSelect: (id: string) => boolean;
}

export const usePassiveStore = create<PassiveState>((set, get) => ({
  availablePoints: 0,
  selectedPassives: [],

  addPoint: () => {
    set((state) => ({
      availablePoints: state.availablePoints + 1
    }));
  },

  selectPassive: (id: string) => {
    const { selectedPassives, availablePoints, canSelect } = get();
    if (availablePoints < 1 || !canSelect(id) || selectedPassives.includes(id)) {
      return false;
    }

    set((state) => ({
      selectedPassives: [...state.selectedPassives, id],
      availablePoints: state.availablePoints - 1
    }));
    return true;
  },

  resetPassives: () => {
    // Resetar passivas custa 500 ouro (implementação simplificada)
    const currentGold = 0; // poderá ser integrado com usePlayerStore no futuro
    if (currentGold < 500) return false;

    set({
      selectedPassives: [],
      availablePoints: 0
    });
    return true;
  },

  getSelectedEffects: () => {
    const { selectedPassives } = get();
    return selectedPassives.map((id) => {
      const node = PASSIVE_NODES.find((n) => n.id === id);
      return node ? { effect: node.effect, value: 1 } : { effect: '', value: 0 };
    }).filter((e) => e.effect);
  },

  canSelect: (id: string) => {
    const { selectedPassives } = get();
    const node = PASSIVE_NODES.find((n) => n.id === id);
    if (!node || selectedPassives.includes(id)) return false;

    // Se não tem requisitos, pode selecionar
    if (!node.requires || node.requires.length === 0) return true;

    // Se todos os requisitos estão selecionados, pode selecionar
    return node.requires.every((req) => selectedPassives.includes(req));
  }
}));
