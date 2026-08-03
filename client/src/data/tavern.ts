export interface TavernDialogue {
  id: string;
  textKey: string;
  cost: number;
  seen: boolean;
  eventLink: string;
}

export interface TavernNpc {
  id: string;
  icon: string;
  nameKey: string;
  requireLevel?: number;
  requireTitle?: string;
  dialogues: TavernDialogue[];
}

export const tavernNpcs: TavernNpc[] = [
  {
    id: 'old_merchant',
    icon: '🧓',
    nameKey: 'tavern.npcs.old_merchant',
    dialogues: [
      {
        id: 'wolf_tracks',
        textKey: 'tavern.rumors.wolf_tracks',
        cost: 0,
        seen: false,
        eventLink: 'azhur_tracks'
      },
      {
        id: 'cursed_crypt',
        textKey: 'tavern.rumors.cursed_crypt',
        cost: 25,
        seen: false,
        eventLink: 'cursed_dungeon'
      }
    ]
  },
  {
    id: 'adventurer',
    icon: '⚔',
    nameKey: 'tavern.npcs.adventurer',
    requireLevel: 10,
    dialogues: [
      {
        id: 'ghost_npc',
        textKey: 'tavern.rumors.nythera_night',
        cost: 30,
        seen: false,
        eventLink: 'ghost_npc_night'
      },
      {
        id: 'forbidden_boss',
        textKey: 'tavern.rumors.forbidden_boss',
        cost: 60,
        seen: false,
        eventLink: 'forbidden_boss'
      }
    ]
  },
  {
    id: 'mysterious',
    icon: '🌑',
    nameKey: 'tavern.npcs.mysterious',
    requireTitle: 'veil_tracker',
    dialogues: [
      {
        id: 'monthly_eclipse',
        textKey: 'tavern.rumors.monthly_eclipse',
        cost: 80,
        seen: false,
        eventLink: 'monthly_eclipse'
      },
      {
        id: 'eclipse_secret',
        textKey: 'tavern.rumors.eclipse_secret',
        cost: 120,
        seen: false,
        eventLink: 'eclipse_secret'
      }
    ]
  },
  {
    id: 'beast_tamer',
    icon: '🐾',
    nameKey: 'tavern.npcs.beast_tamer',
    requireLevel: 15,
    dialogues: [
      {
        id: 'pet_secret',
        textKey: 'tavern.rumors.pet_secret',
        cost: 40,
        seen: false,
        eventLink: 'pet_secret'
      },
      {
        id: 'mount_secret',
        textKey: 'tavern.rumors.mount_secret',
        cost: 40,
        seen: false,
        eventLink: 'mount_secret'
      }
    ]
  }
];
