import { create } from 'zustand';

export interface PartyHuntMember {
  name: string;
  dmg: number;
  taken: number;
  kills: number;
}

export interface PartyHuntSnapshot {
  partyId: string;
  region: string;
  dungeonId?: string | null;
  leader: string;
  round: number;
  auraAtk: number;
  auraDef: number;
  members: PartyHuntMember[];
}

interface PartyCombatState {
  active: boolean;
  session: PartyHuntSnapshot | null;
  startSession: (snapshot: PartyHuntSnapshot) => void;
  updateSession: (snapshot: PartyHuntSnapshot) => void;
  endSession: () => void;
}

/**
 * Estado local da caçada de party (Modo A — sessão paralela sincronizada).
 * Alimentado pelos eventos socket party_combat:*.
 */
export const usePartyCombatStore = create<PartyCombatState>((set) => ({
  active: false,
  session: null,
  startSession: (snapshot) => set({ active: true, session: snapshot }),
  updateSession: (snapshot) => set({ session: snapshot }),
  endSession: () => set({ active: false, session: null })
}));
