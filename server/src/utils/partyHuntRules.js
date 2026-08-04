/**
 * Regras puras da caçada de party (testáveis sem socket/mongo).
 * Usadas pelo server.js e cobertas por server/tests/partyHuntRules.test.js.
 */

export const MAX_TURN_DAMAGE = 200_000; // sanity cap por reporte
export const TEAMWORK_XP_PER_KILL = 8; // xp extra dividido entre membros
export const HUNT_SUMMARY_INTERVAL_MS = 1500;

// Bônus de grupo por membro NA SESSÃO (ex.: 3 membros → +30% XP, +15% ouro, +9% loot)
export const SIZE_BONUS_PER_MEMBER = { xp: 10, gold: 5, loot: 3 };

export const MAX_PARTY_SIZE = 5;

/** Sanitiza números reportados pelo client (NaN/negativos/abusivos). */
export const clampReportNumber = (value) => {
  const num = Number(value);

  if (!Number.isFinite(num)) {
    // +Infinity → teto; NaN/-Infinity → 0
    return num === Number.POSITIVE_INFINITY ? MAX_TURN_DAMAGE : 0;
  }

  const parsed = Math.floor(num);

  return Math.max(0, Math.min(MAX_TURN_DAMAGE, parsed));
};

/** Bônus por tamanho do grupo (0 membros → bônus zero). */
export const computeSizeBonus = (memberCount) => {
  const count = Math.max(0, Math.min(MAX_PARTY_SIZE, Math.floor(Number(memberCount) || 0)));

  return {
    xp: count * SIZE_BONUS_PER_MEMBER.xp,
    gold: count * SIZE_BONUS_PER_MEMBER.gold,
    loot: count * SIZE_BONUS_PER_MEMBER.loot
  };
};

/** XP de trabalho em equipe ao fim da caçada (dividido entre membros). */
export const computeTeamworkXp = (totalKills, memberCount) => {
  const kills = Math.max(0, Math.floor(Number(totalKills) || 0));
  const members = Math.max(1, Math.floor(Number(memberCount) || 1));

  return Math.floor((kills * TEAMWORK_XP_PER_KILL) / members);
};
