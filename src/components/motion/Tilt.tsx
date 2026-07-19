"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

/**
 * Pointer-reactive 3D tilt with spring physics. Wrap device mockups / cards to
 * give them weight and depth. No-ops gracefully when the pointer leaves.
 */
export function Tilt({
  children,
  className = "",
  max = 8,
  glare = false,
}: {
  children: React.ReactNode;
  className?: string;
  max?: number;
  glare?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [max, -max]), { stiffness: 150, damping: 18 });
  const ry = useSpring(useTransform(mx, [0, 1], [-max, max]), { stiffness: 150, damping: 18 });
  const gx = useTransform(mx, [0, 1], ["0%", "100%"]);
  const gy = useTransform(my, [0, 1], ["0%", "100%"]);
  const glareBg = useTransform(
    [gx, gy],
    ([x, y]) => `radial-gradient(400px circle at ${x} ${y}, rgba(255,255,255,0.35), transparent 55%)`
  );

  function onMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  }
  function reset() {
    mx.set(0.5);
    my.set(0.5);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d", perspective: 1200 }}
      className={`relative ${className}`}
    >
      {children}
      {glare && (
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-0 z-20 rounded-[inherit] opacity-0 transition-opacity duration-300"
          style={{ background: glareBg }}
        />
      )}
    </motion.div>
  );
}
