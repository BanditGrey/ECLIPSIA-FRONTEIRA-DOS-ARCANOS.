import { useState } from 'react';
import { calculateTowerRewards } from '../../systems/tower';
import { Button } from '../ui/Button';

export const TowerPanel = () => {
  const [floor, setFloor] = useState(1);
  const [results, setResults] = useState<Array<{ floor: number; materials: number; gold: number; xp: number }>>([]);

  const startRun = () => {
    const result = calculateTowerRewards(floor);
    setResults((prev) => [...prev, result]);
    setFloor((prev) => prev + 1);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold text-game-gold mb-4">Torre Infinita</h2>
      <div className="mb-4 text-sm text-game-muted">
        Andar atual: <span className="font-bold text-game-gold">{floor}</span>
        <br />
        Recompensa progressiva: matérias, ouro, XP (aumenta a cada andar)
      </div>

      <Button onClick={startRun} className="mb-4">
        Avançar para o Andar {floor}
      </Button>

      <div className="space-y-2">
        <h3 className="font-title text-sm text-game-gold">Resultados</h3>
        {results.map((r, i) => (
          <div key={i} className="rounded-lg border border-night-600 bg-night-900/40 px-3 py-2 text-xs">
            Andar {r.floor}: {r.materials} matérias, {r.gold} 🪙, {r.xp} XP
          </div>
        ))}
      </div>
    </div>
  );
};
