import React, { useEffect, useState } from 'react';
export interface Props { text?: string; lang?: string; rate?: number; pitch?: number; volume?: number; autoPlay?: boolean; onComplete?: () => void; }
export const AudioNarration: React.FC<Props> = ({ text = 'Bem-vindo a Eclipsia.', lang = 'pt-BR', rate = 1, pitch = 1, volume = 1, autoPlay = true, onComplete }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const speak = () => { if (typeof window === 'undefined' || !('speechSynthesis' in window)) return; window.speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance(text); u.lang = lang; u.rate = rate; u.pitch = pitch; u.volume = volume; u.onend = () => { setIsPlaying(false); if (onComplete) onComplete(); }; setIsPlaying(true); window.speechSynthesis.speak(u); };
  const stop = () => { if (typeof window !== 'undefined' && 'speechSynthesis' in window) { window.speechSynthesis.cancel(); setIsPlaying(false); } };
  useEffect(() => { if (autoPlay) { const t = setTimeout(speak, 100); return () => { clearTimeout(t); stop(); }; } }, [autoPlay, text]);
  return <div className="flex items-center gap-3 rounded-lg border border-game-border bg-game-card p-3"><button onClick={isPlaying ? stop : speak} className={`rounded-full px-4 py-2 text-sm font-bold ${isPlaying ? 'bg-red-500 text-white' : 'bg-game-gold text-black'}`}>{isPlaying ? '⏹ Parar' : '▶ Narrar'}</button><span className="text-sm text-game-muted">{isPlaying ? 'Narrando...' : 'Pronto'}</span></div>;
};
