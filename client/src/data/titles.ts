export interface TitleBonus {
  damageVsBeastsPercent?: number;
  luck?: number;
  weakDamagePercent?: number;
  mistVision?: boolean;
  soloHpPercent?: number;
  allStats?: number;
}

export interface TitleData {
  id: string;
  condition: {
    type: string;
    target?: string;
    amount?: number;
    region?: string;
    secret?: boolean;
  };
  bonus: TitleBonus;
}

export const titles: TitleData[] = [
  {
    id: 'wolf_hunter',
    condition: {
      type: 'kill',
      target: 'wolf_pup',
      amount: 10
    },
    bonus: {
      damageVsBeastsPercent: 5
    }
  },
  {
    id: 'veil_tracker',
    condition: {
      type: 'discoveries',
      amount: 5
    },
    bonus: {
      luck: 10
    }
  },
  {
    id: 'child_of_chance',
    condition: {
      type: 'rare_drop',
      amount: 1
    },
    bonus: {
      luck: 5
    }
  },
  {
    id: 'core_breaker',
    condition: {
      type: 'weak_point_hits',
      amount: 50
    },
    bonus: {
      weakDamagePercent: 15
    }
  },
  {
    id: 'mist_bearer',
    condition: {
      type: 'survive_region_minutes',
      region: 'nythera',
      amount: 60
    },
    bonus: {
      mistVision: true
    }
  },
  {
    id: 'colossus_challenger',
    condition: {
      type: 'challenge_colossus',
      amount: 1
    },
    bonus: {
      soloHpPercent: -10
    }
  },
  {
    id: 'eclipse_awakened',
    condition: {
      type: 'secret',
      secret: true
    },
    bonus: {
      allStats: 5
    }
  }
];
