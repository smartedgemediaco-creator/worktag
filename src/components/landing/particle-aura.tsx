"use client";

import { useRef, useEffect } from "react";

interface P {
  x: number; y: number;
  bx: number; by: number;
  vx: number; vy: number;
  s: number; o: number;
}

export function ParticleAura() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const parent = canvas.parentElement;
    const w = parent?.clientWidth ?? 500;
    const h = parent?.clientHeight ?? 500;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.scale(dpr, dpr);

    const cx = w / 2;
    const cy = h / 2;
    const RADIUS = Math.min(w, h) * 0.38;
    const COUNT = 120;

    const parts: P[] = [];
    for (let i = 0; i < COUNT; i++) {
      const angle = Math.random() * Math.PI * 2;
      const dist = RADIUS + (Math.random() - 0.5) * RADIUS * 0.6;
      parts.push({
        x: cx + Math.cos(angle) * dist,
        y: cy + Math.sin(angle) * dist,
        bx: cx + Math.cos(angle) * dist,
        by: cy + Math.sin(angle) * dist,
        vx: 0, vy: 0,
        s: Math.random() * 1.5 + 0.5,
        o: Math.random() * 0.3 + 0.06,
      });
    }

    let frame: number;
    let t = 0;
    const CONNECT = 80;

    function tick() {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, w, h);
      t += 0.003;

      for (const p of parts) {
        const orbit = t + parts.indexOf(p) * 0.05;
        const dx = Math.cos(orbit) * 4;
        const dy = Math.sin(orbit) * 4;
        const tx = p.bx + dx;
        const ty = p.by + dy;

        p.vx += (tx - p.x) * 0.02;
        p.vy += (ty - p.y) * 0.02;
        p.vx *= 0.92;
        p.vy *= 0.92;
        p.x += p.vx;
        p.y += p.vy;
      }

      for (let i = 0; i < parts.length; i += 2) {
        const a = parts[i];
        for (let j = i + 1; j < Math.min(i + 20, parts.length); j += 1) {
          const b = parts[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = dx * dx + dy * dy;
          if (d < CONNECT * CONNECT) {
            const o = (1 - d / (CONNECT * CONNECT)) * 0.04;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(10,61,145,${o})`;
            ctx.lineWidth = 0.3;
            ctx.stroke();
          }
        }
      }

      for (const p of parts) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.s, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(10,61,145,${p.o})`;
        ctx.fill();
      }

      frame = requestAnimationFrame(tick);
    }
    tick();

    return () => cancelAnimationFrame(frame);
  }, []);

  return <canvas ref={ref} className="absolute inset-0 w-full h-full pointer-events-none" />;
}
