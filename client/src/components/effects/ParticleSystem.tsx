import React, { useEffect, useRef } from 'react';

/**
 * SISTEMA DE PARTÍCULAS (canvas) — reutilizável, com POOLING, blend aditivo (glow)
 * e configuração por tipo de efeito. Usa requestAnimationFrame; o pool recicla
 * objetos de partícula (zero alocação por frame depois do warmup).
 *
 * Uso:
 *   <ParticleSystem trigger={bool} type="attack|crit|heal|magical|physical|void|loot|levelup|hit"
 *     onComplete={() => setTrigger(false)} className="absolute inset-0" />
 */

export interface ParticleSystemProps {
  trigger: boolean;
  type: string;
  durationMs?: number;
  onComplete?: () => void;
  className?: string;
}

interface Particle {
  active: boolean;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
  gravity: number;
  drag: number;
  glow: boolean;
  shrink: boolean;
}

const GOLD = '#FFD700';
const TEAL = '#00CCAA';
const VIOLET = '#AA55FF';
const WHITE = '#FFFFFF';
const ORANGE = '#FF6B35';

type Palette = { colors: string[]; count: number; speed: number; spread: number; size: [number, number]; glow: boolean; gravity: number; shrink: boolean; shapes: ('circle' | 'spark' | 'shard')[] };

const PALETTES: Record<string, Palette> = {
  attack: { colors: [GOLD, ORANGE, WHITE], count: 28, speed: 220, spread: 220, size: [2, 6], glow: true, gravity: 90, shrink: true, shapes: ['circle', 'spark'] },
  hit: { colors: [ORANGE, WHITE, GOLD], count: 24, speed: 180, spread: 260, size: [2, 5], glow: true, gravity: 160, shrink: true, shapes: ['spark', 'shard'] },
  crit: { colors: [GOLD, WHITE, ORANGE, '#FFE27A'], count: 46, speed: 320, spread: 300, size: [2, 7], glow: true, gravity: 40, shrink: true, shapes: ['circle', 'spark', 'shard'] },
  heal: { colors: [TEAL, '#7CF5D4', WHITE], count: 34, speed: 130, spread: 160, size: [2, 6], glow: true, gravity: -50, shrink: true, shapes: ['circle'] },
  physical: { colors: [GOLD, '#FFC94D', ORANGE], count: 30, speed: 240, spread: 230, size: [2, 6], glow: true, gravity: 120, shrink: true, shapes: ['spark', 'shard', 'circle'] },
  magical: { colors: [TEAL, '#66E8FF', '#B8FFF4'], count: 40, speed: 200, spread: 260, size: [2, 7], glow: true, gravity: -30, shrink: true, shapes: ['circle', 'spark'] },
  void: { colors: [VIOLET, '#D9B8FF', '#7A3DFF'], count: 42, speed: 200, spread: 300, size: [2, 7], glow: true, gravity: -20, shrink: true, shapes: ['circle', 'spark', 'shard'] },
  loot: { colors: [GOLD, '#FFE27A', WHITE], count: 30, speed: 150, spread: 220, size: [2, 5], glow: true, gravity: -80, shrink: true, shapes: ['circle', 'spark'] },
  levelup: { colors: [GOLD, WHITE, TEAL], count: 50, speed: 260, spread: 360, size: [2, 6], glow: true, gravity: -40, shrink: true, shapes: ['circle', 'spark'] },
  magic: { colors: [TEAL, '#66E8FF', WHITE], count: 36, speed: 190, spread: 260, size: [2, 7], glow: true, gravity: -30, shrink: true, shapes: ['circle', 'spark'] },
  slash: { colors: [WHITE, '#E8E8FF', GOLD], count: 26, speed: 260, spread: 200, size: [2, 6], glow: true, gravity: 0, shrink: true, shapes: ['spark', 'shard'] },
};

const DEFAULT_PALETTE: Palette = { colors: [GOLD, WHITE], count: 28, speed: 200, spread: 240, size: [2, 6], glow: true, gravity: 0, shrink: true, shapes: ['circle', 'spark'] };

const rand = (min: number, max: number) => min + Math.random() * (max - min);

export const ParticleSystem: React.FC<ParticleSystemProps> = ({ trigger, type, durationMs = 900, onComplete, className }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    if (!trigger) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Dimensiona o buffer de desenho ao tamanho do contêiner (pai)
    const parent = canvas.parentElement as HTMLElement | null;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const cw = (parent?.clientWidth || canvas.clientWidth || 600);
    const ch = (parent?.clientHeight || canvas.clientHeight || 400);
    canvas.width = Math.max(1, cw * dpr);
    canvas.height = Math.max(1, ch * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Pool de partículas (warmup = capacidade fixa, reutilizada em cada frame)
    const pool: Particle[] = Array.from({ length: 90 }, () => ({
      active: false, x: 0, y: 0, vx: 0, vy: 0, life: 0, maxLife: 0, size: 0, color: '#fff', gravity: 0, drag: 0, glow: true, shrink: true
    }));
    let cursor = 0;
    const nextParticle = (): Particle => {
      const p = pool[cursor];
      cursor = (cursor + 1) % pool.length;
      return p;
    };

    const pal = PALETTES[type] ?? DEFAULT_PALETTE;
    const w = cw;
    const h = ch;
    const originX = w / 2;
    const originY = h / 2;

    const spawn = (p: Particle) => {
      p.active = true;
      p.x = originX + rand(-40, 40);
      p.y = originY + rand(-30, 30);
      const ang = rand(0, Math.PI * 2);
      const speed = rand(pal.speed * 0.4, pal.speed);
      p.vx = Math.cos(ang) * speed;
      p.vy = Math.sin(ang) * speed - pal.speed * 0.25;
      p.maxLife = rand(durationMs * 0.5, durationMs);
      p.life = p.maxLife;
      p.size = rand(pal.size[0], pal.size[1]);
      p.color = pal.colors[Math.floor(Math.random() * pal.colors.length)];
      p.gravity = pal.gravity;
      p.drag = 0.92;
      p.glow = pal.glow;
      p.shrink = pal.shrink;
    };

    for (let i = 0; i < pal.count; i++) spawn(nextParticle());

    const shapes = pal.shapes;
    const drawParticle = (p: Particle, alpha: number) => {
      const shape = shapes[Math.floor(Math.random() * shapes.length)];
      ctx.save();
      ctx.globalCompositeOperation = p.glow ? 'lighter' : 'source-over';
      ctx.globalAlpha = alpha;
      ctx.fillStyle = p.color;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = p.glow ? 12 : 0;
      const r = p.size;
      if (shape === 'circle') {
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fill();
      } else if (shape === 'spark') {
        ctx.strokeStyle = p.color;
        ctx.lineWidth = Math.max(1, r * 0.6);
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x - p.vx * 0.05, p.y - p.vy * 0.05);
        ctx.stroke();
      } else {
        // shard — losango
        ctx.beginPath();
        ctx.moveTo(p.x, p.y - r);
        ctx.lineTo(p.x + r, p.y);
        ctx.lineTo(p.x, p.y + r);
        ctx.lineTo(p.x - r, p.y);
        ctx.closePath();
        ctx.fill();
      }
      ctx.restore();
    };

    let raf = 0;
    let start = performance.now();
    const frame = (now: number) => {
      const elapsed = now - start;
      ctx.clearRect(0, 0, w, h);
      let alive = 0;
      for (const p of pool) {
        if (!p.active) continue;
        p.vx *= p.drag;
        p.vy = p.vy * p.drag + p.gravity * 0.016;
        p.x += p.vx * 0.016;
        p.y += p.vy * 0.016;
        p.life -= 16;
        if (p.life <= 0) { p.active = false; continue; }
        alive++;
        const alpha = Math.max(0, Math.min(1, p.life / p.maxLife));
        if (p.shrink && p.size > 0.5) p.size *= 0.985;
        drawParticle(p, alpha);
      }
      if (alive > 0) {
        raf = requestAnimationFrame(frame);
      } else {
        onCompleteRef.current?.();
      }
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [trigger, type, durationMs]);

  return <canvas ref={canvasRef} className={className} />;
};

export default ParticleSystem;
