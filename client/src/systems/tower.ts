/**
 * SISTEMA DA TORRE INFINITA — Recompensas progressivas (matérias)
 *
 * O jogador avança infinitamente, ganhando matérias principalmente.
 * A cada andar, a recompensa aumenta progressivamente.
 * A dificuldade aumenta com base no andar atual.
 */

export interface TowerResult {
  floor: number;
  rewards: Array<{ itemId: string; qty: number }>;
  materials: number; // quantidade de matérias ganhas
  gold: number; // ouro ganho
  xp: number; // XP ganho
}

const TOWER_REWARD_MULTIPLIER = 1.15; // aumenta 15% por andar

export const calculateTowerRewards = (floor: number): TowerResult => {
  const baseMaterials = Math.floor(10 + (floor * 2));
  const materials = Math.floor(baseMaterials * Math.pow(TOWER_REWARD_MULTIPLIER, floor / 10));
  const gold = Math.floor(50 + (floor * 3) * Math.pow(1.1, floor / 5));
  const xp = Math.floor(100 + (floor * 5) * Math.pow(1.15, floor / 10));

  // A cada 10 andares, adiciona uma matéria especial
  const specialMaterialQty = Math.floor(floor / 10) + 1;

  return {
    floor,
    rewards: [
      { itemId: 'mat_5000', qty: specialMaterialQty }, // material básico (usando numId de exemplo)
      { itemId: 'mat_5100', qty: Math.max(0, specialMaterialQty - 1) }
    ],
    materials,
    gold,
    xp
  };
};

export const isTowerAvailable = (playerLevel: number): boolean => true; // sempre disponível
