"use client";

import { useEffect, useRef } from "react";

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  c: string;
  ph: number;
};

const PALETTE = ["#8B6CFF", "#FF4D8D", "#FF7A45", "#FFC24B", "#33E4D6"];
const FADE = 190;
const LINK = 150;

type Variant = "hero" | "finale";

type Props = {
  /**
   * hero — right-weighted band, calm left for copy.
   * finale — sparser full field for centered contact footer.
   */
  variant?: Variant;
};

/**
 * Full-bleed connecting-dots constellation (canvas 2D).
 * Ported from public/media/connecting-dots.html — nodes/links sit in the
 * right band so the left stays calm for hero copy.
 */
export default function ConnectingDots({ variant = "hero" }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    const isFinale = variant === "finale";
    // Left fraction kept empty for copy (hero); finale uses a thin calm edge.
    const REGION = isFinale ? 0.06 : 0.42;
    const densityDivisor = isFinale ? 14000 : 9500;
    const nodeMin = isFinale ? 18 : 30;
    const nodeMax = isFinale ? 42 : 72;
    const speed = isFinale ? 0.18 : 0.28;
    const linkAlpha = isFinale ? 0.55 : 0.85;

    let W = 0;
    let H = 0;
    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    let nodes: Node[] = [];
    let t = 0;
    let xMin = 0;
    let raf = 0;
    const REDUCE = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function edge(x: number) {
      const left = Math.max(0, Math.min(1, (x - xMin) / FADE));
      if (!isFinale) return left;
      // Soft fade on both sides so centered copy stays readable.
      const right = Math.max(0, Math.min(1, (W - x) / FADE));
      return Math.min(left, right);
    }

    function build() {
      xMin = W * REGION;
      const bandW = W - xMin;
      const count = Math.round((bandW * H) / densityDivisor);
      const n = Math.max(nodeMin, Math.min(nodeMax, count));
      nodes = [];
      for (let i = 0; i < n; i++) {
        nodes.push({
          x: xMin + Math.random() * bandW,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * (REDUCE ? 0 : speed),
          vy: (Math.random() - 0.5) * (REDUCE ? 0 : speed),
          r: (isFinale ? 1.2 : 1.6) + Math.random() * (isFinale ? 1.6 : 2.2),
          c: PALETTE[i % PALETTE.length],
          ph: Math.random() * Math.PI * 2,
        });
      }
    }

    function resize() {
      const r = cv!.getBoundingClientRect();
      W = r.width;
      H = r.height;
      cv!.width = W * DPR;
      cv!.height = H * DPR;
      ctx!.setTransform(DPR, 0, 0, DPR, 0, 0);
      build();
    }

    function frame() {
      t += 0.016;
      ctx!.clearRect(0, 0, W, H);

      for (const p of nodes) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < xMin - 20) p.x = W + 20;
        else if (p.x > W + 20) p.x = xMin - 20;
        if (p.y < -20) p.y = H + 20;
        else if (p.y > H + 20) p.y = -20;
      }

      const sweep = (((t * 0.16) % 1.4) - 0.2) * W;

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d < LINK) {
            let alpha = (1 - d / LINK) * linkAlpha;
            const midx = (a.x + b.x) / 2;
            const near = 1 - Math.min(1, Math.abs(midx - sweep) / 260);
            alpha += near * near * (isFinale ? 0.4 : 0.7);
            alpha *= edge((a.x + b.x) / 2);
            if (alpha <= 0.01) continue;
            const g = ctx!.createLinearGradient(a.x, a.y, b.x, b.y);
            g.addColorStop(0, a.c);
            g.addColorStop(1, b.c);
            ctx!.strokeStyle = g;
            ctx!.lineWidth = 1.1 + near * 1.6;
            ctx!.globalAlpha = Math.min(1, alpha);
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.stroke();
          }
        }
      }

      ctx!.globalAlpha = 1;
      for (const p of nodes) {
        const tw = 0.6 + 0.4 * Math.sin(t * 2 + p.ph);
        const near = 1 - Math.min(1, Math.abs(p.x - sweep) / 220);
        const ef = edge(p.x);
        const rr = p.r * (1 + near * 0.9);
        const gg = ctx!.createRadialGradient(p.x, p.y, 0, p.x, p.y, rr * 7);
        gg.addColorStop(0, p.c);
        gg.addColorStop(1, "transparent");
        ctx!.globalAlpha = (0.3 + near * 0.45) * tw * ef;
        ctx!.fillStyle = gg;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, rr * 7, 0, Math.PI * 2);
        ctx!.fill();
        ctx!.globalAlpha = ef;
        ctx!.fillStyle = p.c;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, rr, 0, Math.PI * 2);
        ctx!.fill();
        ctx!.globalAlpha = Math.min(1, 0.5 + near * 0.5) * ef;
        ctx!.fillStyle = "#fff";
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, rr * 0.45, 0, Math.PI * 2);
        ctx!.fill();
      }
      ctx!.globalAlpha = 1;
      raf = requestAnimationFrame(frame);
    }

    const ro = new ResizeObserver(resize);
    ro.observe(cv);
    resize();
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [variant]);

  const isFinale = variant === "finale";

  return (
    <div
      className="absolute inset-0"
      aria-hidden
      style={{
        background: isFinale
          ? "radial-gradient(110% 120% at 50% 20%, rgba(30,30,66,.5) 0%, rgba(8,10,24,.78) 48%, #060816 100%)"
          : "radial-gradient(120% 130% at 68% 25%, rgba(30,30,66,.55) 0%, rgba(12,12,30,.7) 45%, #050509 100%)",
      }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: isFinale
            ? "radial-gradient(70% 55% at 50% 48%, rgba(6,8,22,.55) 0%, transparent 62%), radial-gradient(120% 120% at 50% 50%, transparent 55%, rgba(0,0,0,.42) 100%)"
            : "radial-gradient(120% 120% at 60% 45%, transparent 60%, rgba(0,0,0,.32) 100%)",
        }}
      />
    </div>
  );
}
