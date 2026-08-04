import React, { useState, useEffect } from 'react';
export interface LogEntry { turn: number; message: string; type: 'damage' | 'heal' | 'defend' | 'skill' | 'loot'; }
export interface Props { entries: LogEntry[]; }
export const CombatLogAnimation: React.FC<Props> = ({ entries }) => {
  const [visibleEntries, setVisibleEntries] = useState<LogEntry[]>([]);
  useEffect(() => { setVisibleEntries(entries.slice(-5)); }, [entries]);
  return (
    <div className="max-h-80 overflow-auto pr-1 font-mono text-sm grid gap-2">
      {visibleEntries.map((entry, i) => {
        const colorClass = entry.type === 'damage' ? 'text-red-400' : entry.type === 'heal' ? 'text-green-400' : entry.type === 'skill' ? 'text-yellow-300' : entry.type === 'loot' ? 'text-cyan-300' : 'text-white';
        return (
          <div key={`${entry.turn}-${i}`} className={`rounded border border-game-border bg-game-card p-2 animate-[fadeIn_0.2s_ease] ${colorClass}`}>
            <span className="text-game-faded">#{entry.turn}</span> {entry.message}
          </div>
        );
      })}
    </div>
  );
};
