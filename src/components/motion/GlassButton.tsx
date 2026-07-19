"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

type Variant = "primary" | "ghost";

/**
 * Magnetic glassmorphism CTA. The whole button drifts toward the cursor with
 * spring physics; an inner sheen tracks the pointer for a subtle reflection.
 */
export function GlassButton({
  children,
  href,
  onClick,
  variant = "primary",
  className = "",
  strength = 0.4,
  external,
  ariaLabel,
}: {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  className?: string;
  strength?: number;
  external?: boolean;
  ariaLabel?: string;
}) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sheenX = useMotionValue(50);
  const sheenY = useMotionValue(50);
  const sx = useSpring(x, { stiffness: 170, damping: 14, mass: 0.15 });
  const sy = useSpring(y, { stiffness: 170, damping: 14, mass: 0.15 });
  const sheen = useTransform(
    [sheenX, sheenY],
    ([vx, vy]) =>
      `radial-gradient(140px circle at ${vx}% ${vy}%, rgba(255,255,255,0.18), transparent 60%)`
  );

  function onMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const mx = e.clientX - (rect.left + rect.width / 2);
    const my = e.clientY - (rect.top + rect.height / 2);
    x.set(mx * strength);
    y.set(my * strength);
    sheenX.set(((e.clientX - rect.left) / rect.width) * 100);
    sheenY.set(((e.clientY - rect.top) / rect.height) * 100);
  }
  function reset() {
    x.set(0);
    y.set(0);
    sheenX.set(50);
    sheenY.set(50);
  }

  const base =
    "group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full px-6 py-3.5 text-[13px] font-medium tracking-[0.01em] transition-colors duration-300";
  const styles =
    variant === "primary"
      ? "bg-night text-white border border-white/10 shadow-[0_12px_40px_-14px_rgba(74,21,75,0.55)] hover:shadow-[0_16px_50px_-14px_rgba(224,30,90,0.45)]"
      : "glass text-cream hover:border-blue/30";

  const inner = (
    <>
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: sheen }}
      />
      {variant === "primary" && (
        <span className="pointer-events-none absolute inset-x-6 -bottom-px h-px bg-gradient-to-r from-transparent via-blue/70 to-transparent" />
      )}
      <span className="relative z-10 inline-flex items-center gap-2.5">{children}</span>
    </>
  );

  if (href) {
    return (
      <motion.a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        aria-label={ariaLabel}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        onMouseMove={onMove}
        onMouseLeave={reset}
        style={{ x: sx, y: sy }}
        className={`${base} ${styles} ${className}`}
      >
        {inner}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      className={`${base} ${styles} ${className}`}
    >
      {inner}
    </motion.button>
  );
}
