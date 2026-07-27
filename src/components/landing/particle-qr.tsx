"use client";

import { useRef, useEffect, useState } from "react";

interface P {
  x: number; y: number;
  tx: number; ty: number;
  vx: number; vy: number;
  s: number; o: number;
}

export function ParticleQR() {
  const ref = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = "/images/qr-worktag.webp";

    img.onload = () => {
      const parent = canvas.parentElement;
      const w = parent?.clientWidth ?? 400;
      const h = parent?.clientHeight ?? 400;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.scale(dpr, dpr);

      const SAMPLE = 180;
      const off = document.createElement("canvas");
      off.width = SAMPLE;
      off.height = SAMPLE;
      const oc = off.getContext("2d");
      if (!oc) return;
      oc.drawImage(img, 0, 0, SAMPLE, SAMPLE);
      const px = oc.getImageData(0, 0, SAMPLE, SAMPLE).data;

      const dark: { x: number; y: number }[] = [];
      const step = 2;
      for (let y = 0; y < SAMPLE; y += step) {
        for (let x = 0; x < SAMPLE; x += step) {
          if (px[(y * SAMPLE + x) * 4] < 140) dark.push({ x, y });
        }
      }

      const sx = w / SAMPLE;
      const sy = h / SAMPLE;
      const COUNT = Math.min(2000, dark.length);
      const shuffled = [...dark].sort(() => Math.random() - 0.5).slice(0, COUNT);

      const parts: P[] = shuffled.map((p) => ({
        x: Math.random() * w,
        y: Math.random() * h,
        tx: p.x * sx + (Math.random() - 0.5) * 5,
        ty: p.y * sy + (Math.random() - 0.5) * 5,
        vx: 0, vy: 0,
        s: Math.random() * 1.2 + 0.3,
        o: Math.random() * 0.25 + 0.06,
      }));

      let frame: number;
      const CONNECT = 35;

      function tick() {
        if (!canvas || !ctx) return;
        ctx.clearRect(0, 0, w, h);

        for (const p of parts) {
          const dx = p.tx - p.x;
          const dy = p.ty - p.y;
          p.vx += dx * 0.015;
          p.vy += dy * 0.015;
          p.vx *= 0.88;
          p.vy *= 0.88;
          p.x += p.vx;
          p.y += p.vy;
          p.tx += (Math.random() - 0.5) * 0.3;
          p.ty += (Math.random() - 0.5) * 0.3;
        }

        for (let i = 0; i < parts.length; i += 2) {
          const a = parts[i];
          for (let j = i + 1; j < Math.min(i + 25, parts.length); j += 1) {
            const b = parts[j];
            const dx = a.x - b.x;
            const dy = a.y - b.y;
            const d = dx * dx + dy * dy;
            if (d < CONNECT * CONNECT) {
              const o = (1 - d / (CONNECT * CONNECT)) * 0.05;
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.strokeStyle = `rgba(2,65,168,${o})`;
              ctx.lineWidth = 0.3;
              ctx.stroke();
            }
          }
        }

        for (const p of parts) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.s, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(2,65,168,${p.o})`;
          ctx.fill();
        }

        frame = requestAnimationFrame(tick);
      }
      tick();
      setReady(true);
    };

    return () => {};
  }, []);

  return (
    <canvas
      ref={ref}
      className={`w-full h-full transition-opacity duration-1500 ${ready ? "opacity-100" : "opacity-0"}`}
    />
  );
}
