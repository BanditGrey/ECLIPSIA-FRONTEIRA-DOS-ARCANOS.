import React, { useEffect, useRef } from 'react';

/**
 * CENÁRIO ARCANO ANIMADO (A12) — fundo procedural de campo de batalha:
 * névoa, motes arcanos flutuantes, brasas/runas ascendentes e um chão em
 * perspectiva com grade energizada. 100% canvas, sem assets, leve.
 */
interface Mote { x: number; y: number; r: number; vy: number; vx: number; hue: number; phase: number }
interface Rune { x: number; y: number; s: number; vy: number; vx: number; alpha: number }

export const ArcaneField: React.FC<{ className?: string; density?: number }> = ({ className = '', density = 1 }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const parent = canvas.parentElement as HTMLElement | null;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    let w = (parent?.clientWidth || 600);
    let h = (parent?.clientHeight || 400);
    const resize = () => {
      w = parent?.clientWidth || 600;
      h = parent?.clientHeight || 400;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const motes: Mote[] = Array.from({ length: Math.round(28 * density) }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: 1 + Math.random() * 2.2,
      vy: -8 - Math.random() * 22,
      vx: (Math.random() - 0.5) * 10,
      hue: Math.random() < 0.5 ? 44 : 172, // dourado ou teal
      phase: Math.random() * Math.PI * 2
    }));
    const runes: Rune[] = Array.from({ length: Math.round(10 * density) }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      s: 6 + Math.random() * 10,
      vy: -12 - Math.random() * 26,
      vx: (Math.random() - 0.5) * 8,
      alpha: 0.15 + Math.random() * 0.3
    }));

    let raf = 0;
    let t = 0;
    const drawGrid = () => {
      // piso em perspectiva (linhas diagonais da base até o horizonte)
      ctx.strokeStyle = 'rgba(212,175,55,0.10)';
      ctx.lineWidth = 1;
      const horizon = h * 0.42;
      const centerX = w / 2;
      const n = 14;
      ctx.beginPath();
      for (let i = 0; i <= n; i++) {
        const off = (i / n - 0.5) * w * 2.2;
        ctx.moveTo(centerX, horizon);
        ctx.lineTo(centerX + off, h);
      }
      ctx.stroke();
      // linhas de profundidade (horizontais)
      ctx.beginPath();
      for (let i = 1; i <= 5; i++) {
        const y = horizon + (h - horizon) * Math.pow(i / 5, 2.4);
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
      }
      ctx.stroke();
    };

    const frame = () => {
      t += 0.016;
      ctx.clearRect(0, 0, w, h);

      // névoa radial
      const grad = ctx.createRadialGradient(w / 2, h * 0.4, 20, w / 2, h * 0.45, Math.max(w, h) * 0.75);
      grad.addColorStop(0, 'rgba(42,30,78,0.25)');
      grad.addColorStop(1, 'rgba(6,8,20,0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      drawGrid();

      for (const m of motes) {
        m.y += m.vy * 0.016;
        m.x += m.vx * 0.016 + Math.sin(t + m.phase) * 0.3;
        if (m.y < -8) { m.y = h + 8; m.x = Math.random() * w; }
        if (m.x < -8) m.x = w + 8;
        if (m.x > w + 8) m.x = -8;
        const tw = 0.4 + 0.6 * Math.abs(Math.sin(t * 1.5 + m.phase));
        ctx.globalCompositeOperation = 'lighter';
        ctx.shadowColor = m.hue === 44 ? 'rgba(212,175,55,1)' : 'rgba(0,204,170,1)';
        ctx.shadowBlur = 8;
        ctx.fillStyle = m.hue === 44 ? `rgba(212,175,55,${0.5 * tw})` : `rgba(0,204,170,${0.5 * tw})`;
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalCompositeOperation = 'source-over';
      ctx.shadowBlur = 0;
      for (const r of runes) {
        r.y += r.vy * 0.016;
        r.x += r.vx * 0.016;
        if (r.y < -20) { r.y = h + 20; r.x = Math.random() * w; }
        ctx.strokeStyle = `rgba(170,85,255,${r.alpha})`;
        ctx.lineWidth = 1;
        ctx.strokeRect(r.x, r.y, r.s, r.s * 1.4);
      }

      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    window.addEventListener('resize', resize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, [density]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
};

export default ArcaneField;
