import test from 'node:test';
import assert from 'node:assert/strict';
import {
  MAX_TURN_DAMAGE,
  MAX_PARTY_SIZE,
  SIZE_BONUS_PER_MEMBER,
  TEAMWORK_XP_PER_KILL,
  clampReportNumber,
  computeSizeBonus,
  computeTeamworkXp
} from '../src/utils/partyHuntRules.js';

test('clampReportNumber: aceita valores normais', () => {
  assert.equal(clampReportNumber(100), 100);
  assert.equal(clampReportNumber(0), 0);
  assert.equal(clampReportNumber(1234.9), 1234);
});

test('clampReportNumber: bloqueia abusos e lixo', () => {
  assert.equal(clampReportNumber(-50), 0);
  assert.equal(clampReportNumber(MAX_TURN_DAMAGE + 1), MAX_TURN_DAMAGE);
  assert.equal(clampReportNumber(Number.NaN), 0);
  assert.equal(clampReportNumber(undefined), 0);
  assert.equal(clampReportNumber('abc'), 0);
  assert.equal(clampReportNumber(Number.POSITIVE_INFINITY), MAX_TURN_DAMAGE);
});

test('computeSizeBonus: tabela por nº de membros', () => {
  assert.deepEqual(computeSizeBonus(0), { xp: 0, gold: 0, loot: 0 });
  assert.deepEqual(computeSizeBonus(1), { xp: 10, gold: 5, loot: 3 });
  assert.deepEqual(computeSizeBonus(2), { xp: 20, gold: 10, loot: 6 });
  assert.deepEqual(computeSizeBonus(3), { xp: 30, gold: 15, loot: 9 });
  assert.deepEqual(computeSizeBonus(4), { xp: 40, gold: 20, loot: 12 });
  assert.deepEqual(computeSizeBonus(5), { xp: 50, gold: 25, loot: 15 });
});

test('computeSizeBonus: cap no tamanho máximo e sanitiza entrada', () => {
  assert.deepEqual(computeSizeBonus(50), computeSizeBonus(MAX_PARTY_SIZE));
  assert.deepEqual(computeSizeBonus(-3), { xp: 0, gold: 0, loot: 0 });
  assert.deepEqual(computeSizeBonus('abc'), { xp: 0, gold: 0, loot: 0 });
});

test('computeTeamworkXp: divisão entre membros', () => {
  assert.equal(computeTeamworkXp(0, 3), 0);
  assert.equal(computeTeamworkXp(10, 2), Math.floor((10 * TEAMWORK_XP_PER_KILL) / 2));
  assert.equal(computeTeamworkXp(10, 1), 10 * TEAMWORK_XP_PER_KILL);
});

test('computeTeamworkXp: sanitiza entradas inválidas', () => {
  assert.equal(computeTeamworkXp(-10, 2), 0);
  assert.equal(computeTeamworkXp(Number.NaN, 2), 0);
  assert.equal(computeTeamworkXp(10, 0), Math.floor((10 * TEAMWORK_XP_PER_KILL) / 1));
  assert.equal(computeTeamworkXp(10, 'abc'), Math.floor((10 * TEAMWORK_XP_PER_KILL) / 1));
});

test('constantes de bônus coerentes entre si', () => {
  assert.ok(SIZE_BONUS_PER_MEMBER.xp > SIZE_BONUS_PER_MEMBER.gold);
  assert.ok(SIZE_BONUS_PER_MEMBER.gold > SIZE_BONUS_PER_MEMBER.loot);
  assert.ok(MAX_PARTY_SIZE >= 2 && MAX_PARTY_SIZE <= 10);
});
