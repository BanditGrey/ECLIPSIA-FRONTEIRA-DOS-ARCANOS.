import test from 'node:test';
import assert from 'node:assert/strict';
import mongoose from 'mongoose';
import '../src/models/Mail.js';
import '../src/models/MarketListing.js';

const Mail = mongoose.model('Mail');
const MarketListing = mongoose.model('MarketListing');

test('Mail: itemStr válido passa na validação', async () => {
  const mail = new Mail({ fromName: 'A', toName: 'B', itemStr: '1005|1:65|4:5|7:3', gold: 10 });
  const error = mail.validateSync();
  assert.equal(error, undefined);
});

test('Mail: itemStr inválida falha na validação', () => {
  const mail = new Mail({ fromName: 'A', toName: 'B', itemStr: 'abc|xyz' });
  const error = mail.validateSync();
  assert.ok(error);
  assert.ok(String(error.errors.itemStr).includes('itemStr inválida'));
});

test('Mail: sem anexos é válido', async () => {
  const mail = new Mail({ fromName: 'A', toName: 'B', message: 'oi', gold: 0 });
  const error = mail.validateSync();
  assert.equal(error, undefined);
});

test('MarketListing: exige itemStr válido e preço >= 1', () => {
  const ok = new MarketListing({ sellerId: 'x', sellerName: 'A', itemStr: '1005|1:65', numId: 1005, price: 100 });
  assert.equal(ok.validateSync(), undefined);

  const badItem = new MarketListing({ sellerId: 'x', sellerName: 'A', itemStr: 'abc', numId: 0, price: 100 });
  assert.ok(badItem.validateSync());

  const badPrice = new MarketListing({ sellerId: 'x', sellerName: 'A', itemStr: '1005', numId: 1005, price: 0 });
  assert.ok(badPrice.validateSync());
});

test('MarketListing: status enum restrito', () => {
  const bad = new MarketListing({ sellerId: 'x', sellerName: 'A', itemStr: '1005', numId: 1005, price: 5, status: 'hacked' });
  assert.ok(bad.validateSync());
});
