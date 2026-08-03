/**
 * Conjuntos de itens (SET_ID, effect 100).
 * Bônus aplicados pelo effectEngine quando N peças do mesmo conjunto
 * estão equipadas simultaneamente.
 */

export interface SetBonusTier {
  /** Quantidade mínima de peças equipadas. */
  pieces: number;
  /** Pares effectId/value concedidos (mesma convenção de ItemEffect). */
  pairs: Array<{ effectId: number; value: number }>;
}

export interface ItemSet {
  id: number;
  names: Record<'pt-BR' | 'en-US' | 'es-ES' | 'ja-JP', string>;
  bonuses: SetBonusTier[];
}

export const itemSets: ItemSet[] = [
  {
    id: 1,
    names: {
      'pt-BR': 'Conjunto do Eclipse',
      'en-US': 'Eclipse Set',
      'es-ES': 'Conjunto del Eclipse',
      'ja-JP': '日食セット'
    },
    bonuses: [
      // 2 peças: +5% de dano
      { pieces: 2, pairs: [{ effectId: 24, value: 5 }] },
      // 3 peças: +5% de chance de crítico
      { pieces: 3, pairs: [{ effectId: 21, value: 5 }] }
    ]
  },
  {
    id: 2,
    names: {
      'pt-BR': 'Conjunto do Fragmento',
      'en-US': 'Fragment Set',
      'es-ES': 'Conjunto del Fragmento',
      'ja-JP': '欠片セット'
    },
    bonuses: [
      // 2 peças: +10% de defesa
      { pieces: 2, pairs: [{ effectId: 25, value: 10 }] },
      // 3 peças: escudo absorvente de 150 HP
      { pieces: 3, pairs: [{ effectId: 57, value: 150 }] }
    ]
  }
];

export const getItemSet = (setId: number): ItemSet | undefined => itemSets.find((set) => set.id === setId);
