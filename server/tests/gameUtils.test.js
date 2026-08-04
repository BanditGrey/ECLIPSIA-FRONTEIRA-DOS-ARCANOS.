import test from 'node:test';
import assert from 'node:assert/strict';
import {
  ITEM_STR_REGEX,
  isValidItemRef,
  getNumId,
  addToInventory,
  removeFromInventory,
  getCharacter
} from '../src/utils/gameUtils.js';

test('ITEM_STR_REGEX aceita formatos válidos', () => {
  assert.ok(ITEM_STR_REGEX.test('1000'));
  assert.ok(ITEM_STR_REGEX.test('1005|1:65|4:5|7:3'));
  assert.ok(ITEM_STR_REGEX.test('1600|1:32|3:5|4:-2'));
});

test('ITEM_STR_REGEX rejeita formatos inválidos', () => {
  assert.ok(!ITEM_STR_REGEX.test('abc|xyz'));
  assert.ok(!ITEM_STR_REGEX.test('1005|1'));
  assert.ok(!ITEM_STR_REGEX.test('1005|0:5'));
  assert.ok(!ITEM_STR_REGEX.test(''));
  assert.ok(!ITEM_STR_REGEX.test('1005|1:abc'));
});

test('isValidItemRef/getNumId', () => {
  assert.equal(isValidItemRef('1005|1:65'), true);
  assert.equal(isValidItemRef('sword_one_basic'), false);
  assert.equal(getNumId('1005|1:65'), 1005);
  assert.equal(getNumId('inválido'), null);
});

const makeChar = () => ({ inventory: [], maxInventory: 2, gold: 0 });

test('addToInventory: novo item, merge e limite de capacidade', () => {
  const char = makeChar();
  assert.equal(addToInventory(char, '1005|1:65', 1), true);
  assert.equal(char.inventory.length, 1);
  assert.equal(char.inventory[0].itemStr, '1005|1:65');

  assert.equal(addToInventory(char, '1005|1:65', 2), true);
  assert.equal(char.inventory.length, 1);
  assert.equal(char.inventory[0].qty, 3);

  assert.equal(addToInventory(char, 'w1h_1001', 1), true);
  assert.equal(char.inventory[1].id, 'w1h_1001');

  assert.equal(addToInventory(char, '2000', 1), false); // cheio
});

test('removeFromInventory: parcial, total e insuficiente', () => {
  const char = makeChar();
  addToInventory(char, '1005', 3);

  assert.equal(removeFromInventory(char, '1005', 2), true);
  assert.equal(char.inventory[0].qty, 1);

  assert.equal(removeFromInventory(char, '1005', 5), false);

  assert.equal(removeFromInventory(char, '1005', 1), true);
  assert.equal(char.inventory.length, 0);

  assert.equal(removeFromInventory(char, '9999', 1), false);
});

test('getCharacter: por charId e fallback para ativo', () => {
  const charA = { _id: { toString: () => 'a' }, name: 'A' };
  const charB = { _id: { toString: () => 'b' }, name: 'B' };
  const player = { characters: { id: (id) => (id === 'a' ? charA : charB) }, activeCharId: 'b', charactersList: null };
  player.characters = Object.assign([charA, charB], { id: (id) => (id === 'a' ? charA : charB) });

  assert.equal(getCharacter(player, 'a'), charA);
  assert.equal(getCharacter(player, null), charB);
  assert.equal(getCharacter(null, 'a'), null);
});
