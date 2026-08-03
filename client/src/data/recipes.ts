/**
 * Receitas de crafting (sistema ItemEffects).
 * Outputs referenciam itens do catálogo; inputs são materiais do inventário.
 */

export interface RecipeInput {
  itemId: string;
  qty: number;
}

export interface Recipe {
  id: string;
  outputId: string;
  gold: number;
  requireLevel?: number;
  inputs: RecipeInput[];
}

export const recipes: Recipe[] = [
  {
    id: 'recipe_sword_iron',
    outputId: 'w1h_1001',
    gold: 150,
    requireLevel: 3,
    inputs: [
      { itemId: 'mat_9000', qty: 3 },
      { itemId: 'mat_9002', qty: 1 }
    ]
  },
  {
    id: 'recipe_dagger_rusty',
    outputId: 'w1h_1101',
    gold: 100,
    requireLevel: 3,
    inputs: [{ itemId: 'mat_9000', qty: 2 }]
  },
  {
    id: 'recipe_hammer_sledge',
    outputId: 'w2h_1600',
    gold: 220,
    requireLevel: 5,
    inputs: [
      { itemId: 'mat_9000', qty: 4 },
      { itemId: 'mat_9002', qty: 2 }
    ]
  },
  {
    id: 'recipe_shield_iron',
    outputId: 'oh_2002',
    gold: 200,
    requireLevel: 10,
    inputs: [
      { itemId: 'mat_9000', qty: 3 },
      { itemId: 'mat_9001', qty: 2 }
    ]
  },
  {
    id: 'recipe_helm_iron',
    outputId: 'hd_2502',
    gold: 180,
    requireLevel: 8,
    inputs: [
      { itemId: 'mat_9000', qty: 2 },
      { itemId: 'mat_9001', qty: 2 }
    ]
  },
  {
    id: 'recipe_chest_guard',
    outputId: 'ch_3003',
    gold: 400,
    requireLevel: 18,
    inputs: [
      { itemId: 'mat_9000', qty: 5 },
      { itemId: 'mat_9003', qty: 2 }
    ]
  },
  {
    id: 'recipe_stone_fire',
    outputId: 'ss_7500',
    gold: 300,
    requireLevel: 10,
    inputs: [
      { itemId: 'mat_9350', qty: 2 },
      { itemId: 'mat_9050', qty: 1 }
    ]
  },
  {
    id: 'recipe_sword_guard',
    outputId: 'w1h_1004',
    gold: 500,
    requireLevel: 18,
    inputs: [
      { itemId: 'mat_9100', qty: 3 },
      { itemId: 'mat_9350', qty: 1 }
    ]
  },
  {
    id: 'recipe_staff_arcane',
    outputId: 'w1h_1152',
    gold: 600,
    requireLevel: 16,
    inputs: [
      { itemId: 'mat_9101', qty: 3 },
      { itemId: 'mat_9350', qty: 2 }
    ]
  },
  {
    id: 'recipe_blade_azhur',
    outputId: 'w2h_1505',
    gold: 5000,
    requireLevel: 50,
    inputs: [
      { itemId: 'azhur_fang', qty: 1 },
      { itemId: 'mat_9351', qty: 2 }
    ]
  },
  {
    id: 'recipe_trident_thal_mora',
    outputId: 'w2h_1654',
    gold: 5000,
    requireLevel: 40,
    inputs: [
      { itemId: 'thal_mora_scale', qty: 1 },
      { itemId: 'mat_9351', qty: 2 }
    ]
  },
  {
    id: 'recipe_staff_velkaryn',
    outputId: 'w2h_1755',
    gold: 6000,
    requireLevel: 50,
    inputs: [
      { itemId: 'velkaryn_plate', qty: 1 },
      { itemId: 'mat_9352', qty: 2 }
    ]
  }
];

/** Custo do upgrade de nível (UPGRADE_LEVEL, effect 99): ouro + 1x Pó Arcano. */
export const upgradeCost = (currentLevel: number) => ({
  gold: 150 * (currentLevel + 1) * (currentLevel + 1),
  materialId: 'mat_9350',
  materialQty: 1
});

export const MAX_UPGRADE_LEVEL = 10;
