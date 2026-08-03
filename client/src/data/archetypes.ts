export type ArchetypeId = 'blade' | 'arcane' | 'druid' | 'vanguard' | 'ranger' | 'spectre';

export interface ArchetypeData {
  id: ArchetypeId;
  icon: string;
  stats: {
    strength: number;
    agility: number;
    vitality: number;
    arcana: number;
    perception: number;
    will: number;
    luck: number;
  };
  startHp: number;
  startMp: number;
  atkBar: number;
  defBar: number;
  arcBar: number;
}

export const archetypes: ArchetypeData[] = [
  {
    id: 'blade',
    icon: '⚔',
    stats: {
      strength: 14,
      agility: 13,
      vitality: 9,
      arcana: 4,
      perception: 8,
      will: 6,
      luck: 5
    },
    startHp: 550,
    startMp: 200,
    atkBar: 85,
    defBar: 45,
    arcBar: 25
  },
  {
    id: 'arcane',
    icon: '🔮',
    stats: {
      strength: 4,
      agility: 7,
      vitality: 7,
      arcana: 15,
      perception: 8,
      will: 14,
      luck: 5
    },
    startHp: 400,
    startMp: 500,
    atkBar: 35,
    defBar: 30,
    arcBar: 95
  },
  {
    id: 'druid',
    icon: '🌿',
    stats: {
      strength: 7,
      agility: 8,
      vitality: 11,
      arcana: 12,
      perception: 9,
      will: 11,
      luck: 5
    },
    startHp: 500,
    startMp: 420,
    atkBar: 45,
    defBar: 60,
    arcBar: 75
  },
  {
    id: 'vanguard',
    icon: '🛡',
    stats: {
      strength: 10,
      agility: 5,
      vitality: 16,
      arcana: 4,
      perception: 6,
      will: 9,
      luck: 5
    },
    startHp: 750,
    startMp: 180,
    atkBar: 55,
    defBar: 95,
    arcBar: 25
  },
  {
    id: 'ranger',
    icon: '🏹',
    stats: {
      strength: 9,
      agility: 14,
      vitality: 8,
      arcana: 5,
      perception: 15,
      will: 6,
      luck: 5
    },
    startHp: 480,
    startMp: 280,
    atkBar: 75,
    defBar: 40,
    arcBar: 35
  },
  {
    id: 'spectre',
    icon: '🗡',
    stats: {
      strength: 8,
      agility: 15,
      vitality: 7,
      arcana: 8,
      perception: 13,
      will: 6,
      luck: 5
    },
    startHp: 420,
    startMp: 240,
    atkBar: 80,
    defBar: 35,
    arcBar: 50
  }
];
