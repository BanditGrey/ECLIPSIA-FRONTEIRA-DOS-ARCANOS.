/**
 * Definições de dungeons (uma por boss, escalonadas por região).
 * Andares 1..N-1 usam os monstros da região; o andar N invoca o boss.
 * Recompensas garantidas ao derrotar o boss no último andar.
 */

export interface DungeonDef {
  id: string;
  regionId: string;
  bossId: string;
  floors: number;
  requireLevel: number;
  requireTitle?: string;
  /** Ouro bônus ao limpar a dungeon. */
  rewardGold: number;
  /** Itens garantidos ao derrotar o boss final. */
  rewardItems: string[];
}

export const dungeons: DungeonDef[] = [
  {
    id: 'bandit_camp',
    regionId: 'valedouro',
    bossId: 'bandit_leader',
    floors: 5,
    requireLevel: 5,
    rewardGold: 300,
    rewardItems: ['mat_9055']
  },
  {
    id: 'root_crypt',
    regionId: 'nythera',
    bossId: 'root_guardian',
    floors: 8,
    requireLevel: 15,
    rewardGold: 900,
    rewardItems: ['root_guardian_core']
  },
  {
    id: 'mirror_sanctum',
    regionId: 'nythera',
    bossId: 'void_mirror',
    floors: 12,
    requireLevel: 30,
    rewardGold: 2500,
    rewardItems: ['void_mirror_shard']
  },
  {
    id: 'azhur_pit',
    regionId: 'ormara',
    bossId: 'azhur',
    floors: 15,
    requireLevel: 40,
    rewardGold: 6000,
    rewardItems: ['azhur_fang']
  },
  {
    id: 'velkaryn_spire',
    regionId: 'ceupartido',
    bossId: 'velkaryn',
    floors: 18,
    requireLevel: 55,
    rewardGold: 9000,
    rewardItems: ['velkaryn_plate']
  },
  {
    id: 'thal_mora_abyss',
    regionId: 'abissal',
    bossId: 'thal_mora',
    floors: 20,
    requireLevel: 60,
    requireTitle: 'mist_bearer',
    rewardGold: 12000,
    rewardItems: ['thal_mora_scale']
  },
  {
    id: 'fragment_nexus',
    regionId: 'fragmento',
    bossId: 'void_mirror',
    floors: 25,
    requireLevel: 65,
    requireTitle: 'eclipse_awakened',
    rewardGold: 20000,
    rewardItems: ['last_eclipse_core']
  }
];

export const getDungeon = (dungeonId: string): DungeonDef | undefined =>
  dungeons.find((dungeon) => dungeon.id === dungeonId);
