/**
 * SISTEMA DA SALA DE BOSS — Acesso a cada 20 níveis, drops lendário/acima com +frequência
 */

export interface BossRoomAccess {
  available: boolean;
  levelRequirement: number; // a cada 20 níveis
  dropBonus: number; // multiplicador de chance para lendário/acima
  cooldownRemaining: number; // segundos restantes (10 minutos = 600s)
}

const BOSS_COOLDOWN_MS = 10 * 60 * 1000; // 10 minutos
let lastBossKillTime = 0;

export const recordBossKill = () => {
  lastBossKillTime = Date.now();
};

export const checkBossAccess = (playerLevel: number): BossRoomAccess => {
  const levelRequirement = Math.floor(playerLevel / 20) * 20;
  const available = playerLevel >= levelRequirement && playerLevel > 0;
  // Bônus de drop gradual: +2.5% a cada 20 níveis
  const dropBonus = isAvailable ? 1.0 + (levelRequirement / 20) * 0.05 : 0;

  // Cooldown de 10 minutos entre renascimentos
  const timeSinceLastKill = Date.now() - lastBossKillTime;
  const cooldownRemaining = Math.max(0, (BOSS_COOLDOWN_MS - timeSinceLastKill) / 1000);
  const isAvailable = available && (timeSinceLastKill >= BOSS_COOLDOWN_MS || lastBossKillTime === 0);

  return {
    available: isAvailable,
    levelRequirement: Math.max(20, levelRequirement),
    dropBonus: isAvailable ? dropBonus : 0,
    cooldownRemaining
  };
};
