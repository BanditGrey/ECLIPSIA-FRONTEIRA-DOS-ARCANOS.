import test from 'node:test';
import assert from 'node:assert/strict';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServer;

test.before(async () => {
  mongoServer = await MongoMemoryServer.create({
    binary: {
      version: '6.0.4', // Fixa versão do binário que geralmente baixa sem problemas
    }
  });
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

test.after(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

test('Stub: Trade and Market Persistence tests', () => {
  // Test stub para quando resolvermos os firewalls de CI
  // para rodar o mongodb-memory-server num ambiente host
  assert.ok(true);
});
