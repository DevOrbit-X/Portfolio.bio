import { useEffect, useRef } from "react";

/** Lightweight interactive particle field (particles.js-style): links nearby dots, repels from the cursor. */
export function Particles() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current!;
    const ctx = c.getContext("2d")!;
    const color = getComputedStyle(document.documentElement).getPropertyValue("--primary").trim();
    let w = 0, h = 0, raf = 0;
    const mouse = { x: -999, y: -999 };
    type P = { x: number; y: number; vx: number; vy: number };
    let ps: P[] = [];
    const resize = () => {
      w = c.width = innerWidth; h = c.height = innerHeight;
      const n = Math.min(90, Math.floor((w * h) / 16000));
      ps = Array.from({ length: n }, () => ({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4 }));
    };
    const move = (e: PointerEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = ctx.strokeStyle = color;
      for (const p of ps) {
        const dx = p.x - mouse.x, dy = p.y - mouse.y, d = Math.hypot(dx, dy);
        if (d < 120) { p.vx += (dx / d) * 0.15; p.vy += (dy / d) * 0.15; }
        p.vx *= 0.98; p.vy *= 0.98;
        p.vx += (Math.random() - 0.5) * 0.02; p.vy += (Math.random() - 0.5) * 0.02;
        p.x = (p.x + p.vx + w) % w; p.y = (p.y + p.vy + h) % h;
        ctx.globalAlpha = 0.7; ctx.beginPath(); ctx.arc(p.x, p.y, 1.6, 0, 7); ctx.fill();
      }
      for (let i = 0; i < ps.length; i++) for (let j = i + 1; j < ps.length; j++) {
        const d = Math.hypot(ps[i].x - ps[j].x, ps[i].y - ps[j].y);
        if (d < 110) { ctx.globalAlpha = (1 - d / 110) * 0.25; ctx.beginPath(); ctx.moveTo(ps[i].x, ps[i].y); ctx.lineTo(ps[j].x, ps[j].y); ctx.stroke(); }
      }
      raf = requestAnimationFrame(tick);
    };
    resize(); tick();
    addEventListener("resize", resize); addEventListener("pointermove", move);
    return () => { cancelAnimationFrame(raf); removeEventListener("resize", resize); removeEventListener("pointermove", move); };
  }, []);
  return <canvas ref={ref} aria-hidden className="pointer-events-none fixed inset-0 -z-10" />;
}
