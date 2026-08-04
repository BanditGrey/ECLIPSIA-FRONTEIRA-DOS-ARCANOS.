/**
 * MOTOR DE SONS SINTÉTICOS (SFX) — Sem direitos autorais, funcionando diretamente no navegador
 * Usa Web Audio API (AudioContext, OscillatorNode, GainNode) para gerar sons de ação.
 */
let audioCtx: AudioContext | null = null;

const getCtx = () => {
  if (!audioCtx) audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  return audioCtx;
};

const playTone = (freq: number, type: OscillatorType, duration: number, gainVal: number = 0.2) => {
  try {
    const ctx = getCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    osc.connect(gain);
    gain.connect(ctx.destination);
    gain.gain.setValueAtTime(gainVal, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch {
    // Silenciosamente falha se Web Audio API não estiver disponível
  }
};

export const playAttack = () => { playTone(440, 'square', 0.15, 0.15); playTone(880, 'square', 0.1, 0.1); };
export const playCrit = () => { playTone(880, 'triangle', 0.3, 0.2); playTone(1320, 'triangle', 0.3, 0.15); };
export const playHeal = () => { playTone(660, 'sine', 0.5, 0.15); playTone(880, 'sine', 0.5, 0.1); };
export const playLoot = () => { playTone(1100, 'triangle', 0.2, 0.15); playTone(1320, 'triangle', 0.2, 0.1); };
export const playLevelUp = () => { playTone(440, 'sine', 0.3, 0.15); playTone(880, 'sine', 0.3, 0.1); playTone(1760, 'sine', 0.5, 0.15); };
