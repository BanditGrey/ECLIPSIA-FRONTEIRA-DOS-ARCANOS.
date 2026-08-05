export interface Stats {
  strength: number;
  agility: number;
  vitality: number;
  arcana: number;
  perception: number;
  will: number;
}

export interface Luck {
  base: number;
  equipment: number;
  titles: number;
  impulse: number;
  events: number;
}

export interface Equipment {
  weapon_main: string | null;
  weapon_off: string | null;
  head: string | null;
  chest: string | null;
  legs: string | null;
  gloves: string | null;
  boots: string | null;
  earring: string | null;
  necklace: string | null;
  belt: string | null;
  resistance: string | null;
  amulet: string | null;
  spirit_stone: string | null;
  pet: string | null;
  mount: string | null;
}

/**
 * Entrada de inventário no formato do sistema ItemEffects.
 * `itemStr` ("numId|e1:v1|...") é o formato canônico (correio/mercado);
 * `id` (id de catálogo) é mantido por retrocompatibilidade.
 */
export interface InventoryItem {
  itemStr?: string;
  id?: string;
  qty: number;
}

export interface Proficiencies {
  [category: string]: number | undefined;
}

/** Progresso das missões diárias (reinicia por data). */
export interface DailyProgress {
  /** Data no formato YYYY-MM-DD do ciclo atual. */
  date: string;
  /** Progresso por quest id (ex.: { kill_count: 12 }). */
  progress: Record<string, number>;
  /** Ids das diárias já resgatadas hoje. */
  claimed: string[];
}

export interface PlayerData {
  name: string;
  archetype: string;
  gender?: 'male' | 'female';
  level: number;
  xp: number;
  xpToNext: number;
  gold: number;
  /** Moeda premium (paga) — usada no mercado mundial; separada do ouro. */
  crystals: number;
  hp: number;
  maxHp: number;
  mp: number;
  maxMp: number;
  stats: Stats;
  luck: Luck;
  freePoints: number;
  equipment: Equipment;
  inventory: InventoryItem[];
  maxInventory: number;
  /** Baú do personagem (armazenamento estendido). */
  storage: InventoryItem[];
  maxStorage?: number;
  skills: string[];
  skillCooldowns: Record<string, number>;
  titles: string[];
  activeTitle: string | null;
  proficiencies: Proficiencies;
  kills: Record<string, number>;
  discoveries: string[];
  weakPointHits: number;
  rareDrops: number;
  daily?: DailyProgress;
  createdAt: string;
  lastLogin: string;
}
