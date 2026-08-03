/**
 * Missões diárias: reiniciam a cada dia (por data local do save).
 * O progresso é rastreado client-side em PlayerData.daily e os eventos
 * são registrados via usePlayerStore.recordDailyEvent().
 */

export type DailyEvent = 'kill' | 'explore' | 'craft' | 'dungeon_floor';

export interface DailyQuestDef {
  id: string;
  event: DailyEvent;
  goal: number;
  rewards: {
    gold?: number;
    xp?: number;
    items?: Array<{ itemId: string; qty: number }>;
  };
}

export const dailyQuests: DailyQuestDef[] = [
  {
    id: 'daily_kills',
    event: 'kill',
    goal: 20,
    rewards: { gold: 500, xp: 300 }
  },
  {
    id: 'daily_explorer',
    event: 'explore',
    goal: 15,
    rewards: { gold: 300, xp: 200 }
  },
  {
    id: 'daily_crafts',
    event: 'craft',
    goal: 2,
    rewards: { gold: 400, xp: 250, items: [{ itemId: 'mat_9350', qty: 1 }] }
  },
  {
    id: 'daily_dungeon',
    event: 'dungeon_floor',
    goal: 3,
    rewards: { gold: 800, xp: 400 }
  }
];

export const getDailyQuest = (questId: string): DailyQuestDef | undefined =>
  dailyQuests.find((quest) => quest.id === questId);
