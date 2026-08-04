import { scaleItemByLevelAndQuality, addDropVariation } from './client/src/systems/loot';

const testCases = [
  '1005', // dagger comum
  '1500', // arma de nível médio
  '2500', // arma rara
  '5000', // arma epic
];

console.log('=== TESTE DO SISTEMA DE BALANCEAMENTO ===');
for (const id of testCases) {
  const base = id;
  const itemInfo = require('./client/src/data/items').ITEMS[base] || { id: base, effects: {}, type: 'unknown', rarity: 'common' };
  const varied = addDropVariation(base);
  const scaled = scaleItemByLevelAndQuality(varied);
  console.log(`Item base: ${base} (rarity: ${(itemInfo as any)?.rarity || 'unknown'})`);
  console.log(`  → Variação: ${varied}`);
  console.log(`  → Balanceado: ${scaled}`);
  console.log(`  → Efeitos base: ${JSON.stringify((itemInfo as any)?.effects || {})}`);
  console.log('');
}

console.log('Teste concluído. Todos os items foram processados.');
