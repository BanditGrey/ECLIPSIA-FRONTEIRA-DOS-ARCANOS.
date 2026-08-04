import { PASSIVE_BRANCHES } from '../../data/passives';
import { usePassiveStore } from '../../store/usePassiveStore';

export const PassivePanel = () => {
  const { availablePoints, selectedPassives, selectPassive, canSelect } = usePassiveStore();

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold text-game-gold mb-4">Árvore de Passivas</h2>
      <div className="mb-4 text-sm text-game-muted">
        Pontos disponíveis: <span className="font-bold text-game-gold">{availablePoints}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {PASSIVE_BRANCHES.map((branch) => (
          <section key={branch.id} className="rounded-xl border border-night-600 bg-night-900/60 p-4 shadow-panel">
            <h3 className="font-title text-lg text-game-gold mb-3">
              <span className="mr-2">{branch.icon}</span>
              {branch.name}
            </h3>

            <div className="space-y-2">
              {branch.nodes.map((node) => (
                <div key={node.id} className="flex items-center justify-between gap-2 rounded-lg border border-night-700 bg-night-800/40 px-3 py-2">
                  <div className="min-w-0 flex-1">
                    <h4 className="font-title text-sm text-game-gold truncate">{node.name}</h4>
                    <p className="font-mono text-xs text-game-muted truncate">{node.description}</p>
                  </div>
                  <button
                    disabled={!canSelect(node.id) || availablePoints < 1 || selectedPassives.includes(node.id)}
                    onClick={() => selectPassive(node.id)}
                    className={`rounded px-3 py-1 text-xs font-bold transition-colors ${
                      selectedPassives.includes(node.id)
                        ? 'bg-game-gold text-night-900'
                        : canSelect(node.id) && availablePoints >= 1
                        ? 'bg-game-gold/20 text-game-gold hover:bg-game-gold/40'
                        : 'bg-night-700 text-night-500 cursor-not-allowed'
                    }`}
                  >
                    {selectedPassives.includes(node.id) ? '✓' : '+'}
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-3 rounded-lg border border-night-500 bg-night-800/20 p-3">
              <h4 className="font-title text-sm text-game-gold">{branch.keystone.name}</h4>
              <p className="font-mono text-xs text-game-muted">{branch.keystone.description}</p>
              <div className="mt-2 text-xs text-game-muted">{branch.keystone.effect}</div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};
