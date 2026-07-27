"use client";

import { useRef, useEffect } from "react";

interface P {
  x: number; y: number;
  tx: number; ty: number;
  vx: number; vy: number;
  s: number; o: number;
  color: string;
  glow: number;
}

const COLORS = [
  "10,61,145",
  "63,169,245",
  "201,215,255",
  "100,140,255",
  "244,180,0",
];

export function ParticleIdentity() {
  const ref = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = window.innerWidth;
    let h = window.innerHeight;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.scale(dpr, dpr);

    function sample() {
      const off = document.createElement("canvas");
      off.width = w;
      off.height = h;
      const oc = off.getContext("2d");
      if (!oc) return [];
      oc.fillStyle = "#fff";
      oc.font = `bold ${Math.min(w * 0.13, 170)}px Inter, system-ui, sans-serif`;
      oc.textAlign = "center";
      oc.textBaseline = "middle";
      oc.fillText("IDENTITY", w / 2, h / 2 - 20);
      const d = oc.getImageData(0, 0, w, h);
      const pts: { x: number; y: number }[] = [];
      const step = Math.max(2, Math.floor(w / 400));
      for (let y = 0; y < h; y += step) {
        for (let x = 0; x < w; x += step) {
          if (d.data[(y * w + x) * 4 + 3] > 128) pts.push({ x, y });
        }
      }
      return pts;
    }

    const targets = sample();
    const COUNT = Math.min(2500, targets.length);
    const CONNECT = 70;
    const shuffled = [...targets].sort(() => Math.random() - 0.5).slice(0, COUNT);

    const parts: P[] = shuffled.map((t) => ({
      x: Math.random() * w, y: Math.random() * h,
      tx: t.x + (Math.random() - 0.5) * 3,
      ty: t.y + (Math.random() - 0.5) * 3,
      vx: 0, vy: 0,
      s: Math.random() * 1.6 + 0.4,
      o: Math.random() * 0.25 + 0.06,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      glow: Math.random() * 4 + 2,
    }));

    let frame: number;
    let time = 0;

    function tick() {
      if (!canvas || !ctx) return;
      time += 0.005;
      ctx.clearRect(0, 0, w, h);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (const p of parts) {
        const dx = p.tx - p.x;
        const dy = p.ty - p.y;
        p.vx += dx * 0.012;
        p.vy += dy * 0.012;
        p.vx *= 0.9;
        p.vy *= 0.9;

        if (mx > 0) {
          const mdx = p.x - mx;
          const mdy = p.y - my;
          const md = Math.sqrt(mdx * mdx + mdy * mdy);
          if (md < 200) {
            const force = (200 - md) / 200 * 0.4;
            p.vx += (mdx / md) * force;
            p.vy += (mdy / md) * force;
          }
        }

        p.x += p.vx;
        p.y += p.vy;
        p.tx += (Math.random() - 0.5) * 0.3;
        p.ty += (Math.random() - 0.5) * 0.3;
      }

      for (let i = 0; i < parts.length; i += 2) {
        const a = parts[i];
        for (let j = i + 1; j < Math.min(i + 60, parts.length); j += 1) {
          const b = parts[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = dx * dx + dy * dy;
          if (d < CONNECT * CONNECT) {
            const o = (1 - d / (CONNECT * CONNECT)) * 0.06;
            const pulse = 0.5 + Math.sin(time + i * 0.01) * 0.5;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(2,65,168,${o * pulse})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      for (const p of parts) {
        const pulse = 0.8 + Math.sin(time + p.x * 0.01) * 0.2;
        const radius = p.s * pulse;

        ctx.beginPath();
        ctx.arc(p.x, p.y, radius + p.glow * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color},${p.o * 0.15})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color},${p.o})`;
        ctx.fill();
      }

      frame = requestAnimationFrame(tick);
    }
    tick();

    function onMouse(e: MouseEvent) {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    }
    function onMouseLeave() {
      mouseRef.current = { x: -1000, y: -1000 };
    }

    function resize() {
      const c = ref.current;
      if (!c) return;
      const cx = c.getContext("2d");
      if (!cx) return;
      w = window.innerWidth;
      h = window.innerHeight;
      c.width = w * dpr;
      c.height = h * dpr;
      cx.scale(dpr, dpr);
    }

    window.addEventListener("mousemove", onMouse, { passive: true });
    window.addEventListener("mouseleave", onMouseLeave, { passive: true });
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.7 }}
    />
  );
}
