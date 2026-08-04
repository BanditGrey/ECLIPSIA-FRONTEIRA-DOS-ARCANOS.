import React, { useState } from 'react';
import { PASSIVE_BRANCHES, type PassiveNode } from '../../data/passives';
import { usePassiveStore } from '../../store/usePassiveStore';
import { ArcaneIcon } from '../ui/ArcaneIcon';
import { ParticleSystem } from '../effects/ParticleSystem';

const BRANCH_THEME: Record<string, { ring: string; glow: string; particle: string; icon: 'sword' | 'shield' | 'soul' }> = {
  offensive: { ring: 'border-gold-400', glow: 'shadow-[0_0_18px_rgba(212,175,55,0.5)]', particle: 'crit', icon: 'sword' },
  defensive: { ring: 'border-teal-400', glow: 'shadow-[0_0_18px_rgba(0,204,170,0.5)]', particle: 'heal', icon: 'shield' },
  utility: { ring: 'border-violet-400', glow: 'shadow-[0_0_18px_rgba(170,85,255,0.5)]', particle: 'void', icon: 'soul' }
};

interface TreeNodeProps {
  node: PassiveNode;
  selected: boolean;
  selectable: boolean;
  locked: boolean;
  points: number;
  onSelect: (id: string) => void;
  isKeystone?: boolean;
}

const TreeNode: React.FC<TreeNodeProps> = ({ node, selected, selectable, locked, points, onSelect, isKeystone = false }) => {
  const theme = BRANCH_THEME[node.branch];
  const [burst, setBurst] = useState(false);

  const handleClick = () => {
    if (!selected && selectable) {
      setBurst(true);
      setTimeout(() => setBurst(false), 800);
      onSelect(node.id);
    }
  };

  return (
    <div className="relative flex items-center gap-3">
      {burst && <ParticleSystem trigger={burst} type={theme.particle} className="pointer-events-none absolute -inset-6 z-10" />}

      <button
        type="button"
        disabled={locked || selected || points < 1}
        onClick={handleClick}
        className={[
          'relative grid h-12 w-12 shrink-0 place-items-center rounded-full border-2 transition-all duration-200 active:scale-90',
          theme.ring,
          selected ? `bg-night-800 ${theme.glow} text-game-gold` : '',
          selectable && !selected ? 'bg-night-800/70 text-game-text hover:scale-110 cursor-pointer' : '',
          locked ? 'bg-night-900/40 text-night-600 border-night-700 cursor-not-allowed' : ''
        ].join(' ')}
        title={`${node.name} — ${node.description}`}
      >
        <ArcaneIcon name={theme.icon} size={isKeystone ? 24 : 18} glow={selected} />
        {selected && <span className="absolute -top-1 -right-1 grid h-4 w-4 place-items-center rounded-full bg-game-gold text-[9px] font-black text-night-900">✓</span>}
        {isKeystone && <span className="absolute -top-2 left-1/2 -translate-x-1/2 h-1 w-6 rounded-full bg-gradient-to-r from-transparent via-game-gold to-transparent" />}
      </button>

      <div className={['min-w-0 flex-1 rounded-lg border px-3 py-1.5', selected ? 'border-night-500 bg-night-800/60' : locked ? 'border-night-800 bg-night-900/30 opacity-50' : 'border-night-700 bg-night-800/40'].join(' ')}>
        <div className={['font-title text-sm', selected ? 'text-game-gold' : locked ? 'text-night-500' : 'text-game-text'].join(' ')}>
          {node.name}
        </div>
        <div className="truncate font-mono text-[11px] text-game-muted">{node.description}</div>
      </div>
    </div>
  );
};

export const PassivePanel = () => {
  const { availablePoints, selectedPassives, selectPassive, canSelect } = usePassiveStore();
  const [toggled, setToggled] = useState<Record<string, boolean>>({});

  const handleSelect = (id: string) => {
    selectPassive(id);
    setToggled((p) => ({ ...p, [id]: true }));
  };

  return (
    <div className="p-4">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-title text-2xl font-black text-game-gold">Skill Tree</h2>
        <div className="rounded-lg border border-night-600 bg-night-900/70 px-4 py-2 font-mono text-sm">
          Pontos disponíveis: <span className="font-black text-game-gold">{availablePoints}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {PASSIVE_BRANCHES.map((branch) => {
          const theme = BRANCH_THEME[branch.id];
          const ordered = [...branch.nodes].sort((a, b) => a.tier - b.tier);

          return (
            <section key={branch.id} className="rounded-2xl border border-night-700 bg-night-900/60 p-4 shadow-panel">
              <h3 className="mb-4 flex items-center gap-2 font-title text-lg font-bold text-game-gold">
                <span className="grid h-8 w-8 place-items-center rounded-lg border border-night-600 bg-night-800/60">
                  <ArcaneIcon name={theme.icon} size={17} />
                </span>
                {branch.name}
              </h3>

              <div className="relative flex flex-col gap-0">
                {ordered.map((node) => (
                  <div key={node.id} className="relative">
                    {/* conector vertical energizado */}
                    {node.tier < ordered.length && (
                      <span className={[
                        'absolute left-6 top-12 bottom-0 w-[2px]',
                        selectedPassives.includes(node.id) ? `bg-gradient-to-b ${theme.glow} bg-game-gold` : 'bg-night-700'
                      ].join(' ')} style={{ height: 18 }} />
                    )}
                    <div className="relative py-1.5">
                      <TreeNode
                        node={node}
                        selected={selectedPassives.includes(node.id)}
                        selectable={canSelect(node.id)}
                        locked={!canSelect(node.id) && !selectedPassives.includes(node.id)}
                        points={availablePoints}
                        onSelect={handleSelect}
                        isKeystone={node.tier === 10}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-3 rounded-lg border border-game-gold/30 bg-night-800/30 p-3">
                <h4 className="font-title text-sm font-bold text-game-gold">{branch.keystone.name}</h4>
                <p className="mt-1 font-mono text-xs text-game-muted">{branch.keystone.effect}</p>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
};

export default PassivePanel;
