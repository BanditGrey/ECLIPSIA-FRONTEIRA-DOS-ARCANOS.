import React, { useState, useEffect, memo } from 'react';
import { useCombatStore } from '../../store/useCombatStore';

interface FloatingText {
  id: number;
  text: string;
  type: string;
  side: 'enemy' | 'player' | 'center';
  offsetX: number;
  crit?: boolean;
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

    let dmg = parseDamage(lastLog.message);
    if (!dmg && !['parry', 'defend', 'flee', 'flee_failed', 'heal', 'buff', 'miss'].includes(lastLog.type)) return;

    // Player na ESQUERDA, monstro na DIREITA
    // 'enemy' = monstro atacou o player → texto na ESQUERDA
    // 'attack'/'skill'/'dot'/'execute'/'pet' = player atacou o monstro → texto na DIREITA
    // 'heal'/'buff' = no player → ESQUERDA
    const isPlayerHit = ['enemy'].includes(lastLog.type);
    const isEnemyHit = ['attack', 'dot', 'skill', 'execute', 'pet'].includes(lastLog.type);
    const isPlayerBuff = ['heal', 'recover', 'buff'].includes(lastLog.type);
    const isNeutral = ['defend', 'parry', 'flee', 'flee_failed', 'miss'].includes(lastLog.type);

    if (!isPlayerHit && !isEnemyHit && !isNeutral && !isPlayerBuff) return;

    let textContent = dmg ? dmg : lastLog.type.toUpperCase();
    if (lastLog.type === 'parry' || lastLog.type === 'defend') textContent = 'BLOCK';
    if (lastLog.type === 'flee' || lastLog.type === 'flee_failed' || lastLog.type === 'miss') textContent = 'MISS';
    if (lastLog.type === 'heal' || lastLog.type === 'recover') textContent = '+' + (dmg ?? 'HP');

    // player = esquerda, enemy = direita
    const side: FloatingText['side'] = isEnemyHit ? 'enemy' : isPlayerHit || isPlayerBuff ? 'player' : 'center';

    // Detecta crítico
    const isCrit = /cr[ií]t|critical/i.test(lastLog.message);

    let colorClass = 'text-white';
    if (lastLog.type === 'enemy') colorClass = 'text-red-400';
    if (lastLog.type === 'heal' || lastLog.type === 'recover') colorClass = 'text-green-400';
    if (lastLog.type === 'attack') colorClass = isCrit ? 'text-yellow-300' : 'text-yellow-200';
    if (lastLog.type === 'dot') colorClass = 'text-purple-300';
    if (lastLog.type === 'skill') colorClass = isCrit ? 'text-fuchsia-300' : 'text-purple-400';
    if (lastLog.type === 'execute') colorClass = 'text-orange-400';
    if (lastLog.type === 'pet') colorClass = 'text-teal-300';
    if (isNeutral) colorClass = 'text-gray-300';

    const id = Date.now() + Math.random();
    const offsetX = (Math.random() - 0.5) * 80;

    const newText: FloatingText = { id, text: textContent, type: colorClass, side, offsetX, crit: isCrit };

    setTexts(prev => [...prev, newText]);

    setTimeout(() => {
      setTexts(prev => prev.filter(t => t.id !== id));
    }, isCrit ? 1600 : 1200);

  }, [log]);

  const positionClass = (side: FloatingText['side']) => {
    switch (side) {
      case 'enemy':  return 'right-[25%]';
      case 'player': return 'left-[25%]';
      case 'center': return 'left-1/2 -translate-x-1/2';
    }
  };

  return (
    <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden">
      {texts.map(t => (
        <div
          key={t.id}
          className={`absolute ${positionClass(t.side)} top-[30%] ${t.type} ${t.crit ? 'text-5xl' : 'text-3xl'} font-black drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]`}
          style={{
            transform: `translateX(${t.offsetX}px)`,
            animation: `eclipsiaFloat${t.crit ? 'Crit' : ''} ${t.crit ? 1.5 : 1}s ease-out forwards`,
            textShadow: t.crit ? '0 0 12px currentColor, 0 0 20px currentColor' : undefined,
          }}
        >
          {t.crit && <span className="text-orange-400 mr-1 text-2xl">CRIT!</span>}
          {t.text}
        </div>
      ))}
    </div>
  );
});
