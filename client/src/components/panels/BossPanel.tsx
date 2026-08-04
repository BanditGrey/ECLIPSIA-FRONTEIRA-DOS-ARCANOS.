import { useState } from 'react';
import { checkBossAccess } from '../../systems/bossRoom';
import { Button } from '../ui/Button';

export const BossPanel = () => {
  const [playerLevel] = useState(1);
  const access = checkBossAccess(playerLevel);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold text-game-gold mb-4">Sala de Boss</h2>
      <div className="mb-4 text-sm text-game-muted">
        Acesso: <span className="font-bold text-game-gold">a cada 20 níveis</span> (20, 40, 60, 80, 100, ...)
        <br />
        <span className="text-game-gold">Drops lendário/acima com +50% de frequência</span>
      </div>

      <div className="rounded-xl border border-night-600 bg-night-900/60 p-4 shadow-panel">
        <h3 className="font-title text-game-gold mb-2">Status do Acesso</h3>
        <p>Nível atual: <span className="font-bold">{playerLevel}</span></p>
        <p>Próximo acesso: <span className="font-bold">{access.levelRequirement}</span></p>
        <p className="text-xs text-game-muted">Drop bônus lendário/acima: <span className="font-bold text-game-gold">+{Math.round(access.dropBonus * 100)}%</span></p>
      </div>

      <Button disabled={!access.available} className="mt-4">
        {access.available ? 'Entrar na Sala de Boss' : 'Acesso Bloqueado'}
      </Button>
    </div>
  );
};
