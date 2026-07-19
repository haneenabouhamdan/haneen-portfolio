"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { profile, showFreelance } from "@/lib/content";
import ConnectingDots from "@/components/site/ConnectingDots";

/**
 * Full-bleed cinematic hero — connecting-dots constellation as the backdrop.
 * Sticky scroll runway: media zooms / drifts before the next section lands.
 */
export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Travel into the field — scale + Y + slight X drift (parallax depth)
  const mediaScale = useTransform(scrollYProgress, [0, 1], [1, 1.48]);
  const mediaY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const mediaX = useTransform(scrollYProgress, [0, 1], ["0%", "-3%"]);
  const mediaBlur = useTransform(scrollYProgress, [0, 0.55, 1], [0, 0.5, 2.5]);
  const mediaFilter = useTransform(mediaBlur, (b) => `blur(${b}px)`);

  // Keep hero copy readable longer — fade only (no transform on copy)
  const contentOpacity = useTransform(scrollYProgress, [0, 0.55, 0.85], [1, 1, 0]);
  // Light veil at rest for contrast; deepens for exit
  const veil = useTransform(scrollYProgress, [0, 0.85], [0.15, 0.86]);
  const scrollCueOpacity = useTransform(scrollYProgress, [0, 0.18], [1, 0]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative h-[155svh] min-h-[900px] w-full bg-[#050509]"
    >
      <div className="sticky top-0 h-[100svh] min-h-[640px] w-full">
        {/* Overflow only on media — transformed headline ink must not clip
            (sticky overflow-hidden + Framer transform crops Fraunces g). */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          {/* Perspective stage — transforms read as depth, not flat zoom */}
          <div
            className="absolute inset-0"
            style={{ perspective: "1400px", perspectiveOrigin: "85% 42%" }}
          >
            <motion.div
              style={{
                scale: mediaScale,
                x: mediaX,
                y: mediaY,
                filter: mediaFilter,
                transformOrigin: "85% 42%",
                willChange: "transform, filter",
              }}
              className="absolute inset-[-8%]"
            >
              <ConnectingDots />
            </motion.div>
          </div>

          {/* Light readability veil — neutral, no color grade */}
          <motion.div
            style={{ opacity: veil }}
            className="hero-readability-veil absolute inset-0"
          />
        </div>

        {/* Content — bottom-weighted, editorial. Opacity fade only (no y
            transform) so Fraunces Softness descenders stay intact. */}
        <motion.div
          style={{ opacity: contentOpacity }}
          className="hero-copy relative z-10 flex h-full flex-col justify-end px-6 pb-16 pt-28 sm:px-10 lg:px-16 lg:pb-20"
        >
          <div className="mx-auto w-full max-w-[1600px]">
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.28em] text-white/70">
              Senior Software Engineer · Engineering Lead · Dubai
            </p>

            <h1 className="sr-only">{profile.name}</h1>

            {/* Kinetic concept line — Softness/opsz + em pad; no overflow mask. */}
            <p className="hero-concept-line mt-5 pb-[0.28em] font-display text-[clamp(2.25rem,7vw,5.75rem)] font-medium leading-[1.15] tracking-[-0.03em] text-white">
              Engineering
            </p>
            <p className="hero-concept-line pb-[0.28em] font-display text-[clamp(2.25rem,7vw,5.75rem)] font-medium leading-[1.15] tracking-[-0.03em] text-white/90">
              that <span className="italic text-white/70">ships.</span>
            </p>

            <p className="mt-7 max-w-xl text-[16px] font-semibold leading-relaxed text-white/80 sm:text-[17px]">
              I lead web, mobile and AI platforms, and I&apos;m available as a
              senior software developer for selected consultancy and delivery.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a
                href="#work"
                className="inline-flex items-center gap-2.5 rounded-full bg-white px-6 py-3.5 text-[13px] font-medium text-[#080C14] transition hover:bg-white/90"
              >
                View the work
                <span aria-hidden>→</span>
              </a>
              {showFreelance ? (
                <a
                  href="#services"
                  className="inline-flex items-center gap-2.5 rounded-full border border-white/25 bg-white/5 px-6 py-3.5 text-[13px] font-medium text-white backdrop-blur-md transition hover:border-white/50"
                >
                  Work with me
                </a>
              ) : (
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex items-center gap-2.5 rounded-full border border-white/25 bg-white/5 px-6 py-3.5 text-[13px] font-medium text-white backdrop-blur-md transition hover:border-white/50"
                >
                  Get in touch
                </a>
              )}
            </div>
          </div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          style={{ opacity: scrollCueOpacity }}
          className="absolute bottom-7 right-6 z-10 hidden sm:right-10 sm:block lg:right-16"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="flex flex-col items-center gap-2"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/40">
              Scroll
            </span>
            <span className="relative h-10 w-px overflow-hidden bg-white/20">
              <motion.span
                className="absolute inset-x-0 top-0 h-3 bg-white"
                animate={{ y: ["-100%", "300%"] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              />
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
