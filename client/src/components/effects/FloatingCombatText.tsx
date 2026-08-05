import React, { useState, useEffect, memo } from 'react';
import { useCombatStore } from '../../store/useCombatStore';
import type { LogEntry } from '../../types/combat.types';

interface FloatingText {
  id: number;
  text: string;
  type: string;
  x: number;
  y: number;
}

const parseDamage = (msg: string) => {
  const match = msg.match(/\d+/);
  return match ? match[0] : null;
};

export const FloatingCombatText = memo(() => {
  const log = useCombatStore(state => state.log);
  const [texts, setTexts] = useState<FloatingText[]>([]);

  useEffect(() => {
    if (log.length === 0) return;
    const lastLog = log[log.length - 1];
    
    // Filtramos apenas os eventos que queremos exibir como texto flutuante
    let dmg = parseDamage(lastLog.message);
    if (!dmg && !['parry', 'defend', 'flee', 'flee_failed'].includes(lastLog.type)) return;

    // Dependendo do tipo, o texto sobe de um lado ou de outro (inimigo ou jogador)
    const isPlayerTarget = ['enemy'].includes(lastLog.type);
    const isEnemyTarget = ['attack', 'dot', 'skill', 'execute', 'pet'].includes(lastLog.type);
    const isNeutral = ['defend', 'parry', 'flee', 'flee_failed'].includes(lastLog.type);

    if (!isPlayerTarget && !isEnemyTarget && !isNeutral) return;

    let textContent = dmg ? dmg : lastLog.type.toUpperCase();
    if (lastLog.type === 'parry' || lastLog.type === 'defend') textContent = 'BLOCK';
    if (lastLog.type === 'flee' || lastLog.type === 'flee_failed') textContent = 'MISS';

    let colorClass = 'text-white';
    if (lastLog.type === 'enemy') colorClass = 'text-red-500';
    if (lastLog.type === 'heal' || lastLog.type === 'recover') colorClass = 'text-green-400';
    if (lastLog.type === 'attack') colorClass = 'text-yellow-400';
    if (lastLog.type === 'dot' || lastLog.type === 'skill') colorClass = 'text-purple-400';
    if (lastLog.type === 'pet') colorClass = 'text-teal-300';
    if (isNeutral) colorClass = 'text-gray-400';

    const id = Date.now() + Math.random();
    
    // x, y ranges para fazer aparecer na tela
    const x = isPlayerTarget ? 20 + Math.random() * 20 : isEnemyTarget ? 60 + Math.random() * 20 : 40 + Math.random() * 20;
    const y = 30 + Math.random() * 20;

    const newText = { id, text: textContent, type: colorClass, x, y };

    setTexts(prev => [...prev, newText]);

    setTimeout(() => {
      setTexts(prev => prev.filter(t => t.id !== id));
    }, 1200);

  }, [log]);

  return (
    <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden">
      {texts.map(t => (
        <div
          key={t.id}
          className={`absolute font-black text-3xl drop-shadow-[0_4px_4px_rgba(0,0,0,1)] ${t.type} animate-[eclipsiaFloat_1s_ease-out_forwards]`}
          style={{ left: `${t.x}%`, top: `${t.y}%` }}
        >
          {t.text}
        </div>
      ))}
    </div>
  );
});
