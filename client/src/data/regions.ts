export type RegionId = 'valedouro' | 'nythera' | 'ormara' | 'abissal' | 'ceupartido' | 'fragmento';

export interface RegionData {
  id: RegionId;
  icon: string;
  requireLevel?: number;
  requireTitle?: string;
  secret?: boolean;
  monsters: string[];
}

export const regions: RegionData[] = [
  {
    id: 'valedouro',
    icon: '🏙',
    requireLevel: 1,
    monsters: ['rat', 'goblin', 'wolf_pup']
  },
  {
    id: 'nythera',
    icon: '🌲',
    requireLevel: 10,
    monsters: ['mist_wolf', 'shadow_sprite', 'forest_golem']
  },
  {
    id: 'ormara',
    icon: '🏜',
    requireLevel: 20,
    monsters: ['sand_scorpion', 'mirage_beast', 'dune_crawler']
  },
  {
    id: 'abissal',
    icon: '🌊',
    requireTitle: 'mist_bearer',
    monsters: ['sea_wraith', 'deep_leviathan_jr']
  },
  {
    id: 'ceupartido',
    icon: '☁',
    requireLevel: 55,
    monsters: ['storm_harpy', 'cloud_titan']
  },
  {
    id: 'fragmento',
    icon: '💀',
    requireTitle: 'eclipse_awakened',
    secret: true,
    monsters: []
  }
];
