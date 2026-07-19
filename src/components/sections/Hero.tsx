"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { profile, showFreelance } from "@/lib/content";

const EASE = [0.16, 1, 0.3, 1] as const;
/** Bust CDN/browser cache when hero media is replaced. */
const HERO_MEDIA_V = "20260719h";

/**
 * Full-bleed cinematic hero — the VIDEO is the design.
 * Sticky scroll runway: media zooms / drifts through the architecture
 * before the next section lands.
 */
export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Travel into the skyline — scale + Y + slight X drift (parallax depth)
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.48]);
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const videoX = useTransform(scrollYProgress, [0, 1], ["0%", "-3%"]);
  const videoBlur = useTransform(scrollYProgress, [0, 0.55, 1], [0, 0.5, 2.5]);
  const videoFilter = useTransform(videoBlur, (b) => `blur(${b}px)`);

  const contentY = useTransform(scrollYProgress, [0, 0.85], ["0%", "28%"]);
  // Keep hero copy readable longer — previous curve faded text out too early
  const contentOpacity = useTransform(scrollYProgress, [0, 0.55, 0.85], [1, 1, 0]);
  // Light veil at rest for contrast; deepens for exit
  const veil = useTransform(scrollYProgress, [0, 0.85], [0.15, 0.86]);
  const scrollCueOpacity = useTransform(scrollYProgress, [0, 0.18], [1, 0]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative h-[155svh] min-h-[900px] w-full bg-[#080C14]"
    >
      <div className="sticky top-0 h-[100svh] min-h-[640px] w-full overflow-hidden">
        {/* Perspective stage — transforms read as depth, not flat zoom */}
        <div
          className="absolute inset-0"
          style={{ perspective: "1400px", perspectiveOrigin: "58% 42%" }}
        >
          {/* Mid / far field — primary hero video */}
          <motion.div
            style={{
              scale: videoScale,
              x: videoX,
              y: videoY,
              filter: videoFilter,
              transformOrigin: "58% 42%",
              willChange: "transform, filter",
            }}
            className="absolute inset-[-8%]"
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              poster={`/media/hero-poster.jpg?v=${HERO_MEDIA_V}`}
              preload="auto"
              className="absolute inset-0 h-full w-full object-cover"
            >
              <source src={`/media/hero.mp4?v=${HERO_MEDIA_V}`} type="video/mp4" />
            </video>
          </motion.div>
        </div>

        {/* Light readability veil — neutral, no color grade */}
        <motion.div
          style={{ opacity: veil }}
          className="hero-readability-veil pointer-events-none absolute inset-0"
        />

        {/* Content — bottom-weighted, editorial */}
        <motion.div
          style={{ y: contentY, opacity: contentOpacity }}
          className="relative z-10 flex h-full flex-col justify-end px-6 pb-16 pt-28 sm:px-10 lg:px-16 lg:pb-20"
        >
          <div className="mx-auto w-full max-w-[1600px]">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
              className="font-mono text-[11px] uppercase tracking-[0.28em] text-white/55"
            >
              Senior Software Engineer · Engineering Lead · Dubai
            </motion.p>

            <h1 className="sr-only">{profile.name}</h1>

            {/* Kinetic concept line — NOT the name filling the frame */}
            <div className="mt-5 overflow-hidden">
              <motion.p
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1.15, delay: 0.35, ease: EASE }}
                className="font-display text-[clamp(2.8rem,9vw,7.5rem)] font-medium leading-[0.92] tracking-[-0.03em] text-white"
              >
                Precision
              </motion.p>
            </div>
            <div className="overflow-hidden">
              <motion.p
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1.15, delay: 0.48, ease: EASE }}
                className="font-display text-[clamp(2.8rem,9vw,7.5rem)] font-medium leading-[0.92] tracking-[-0.03em] text-white/90"
              >
                at <span className="italic text-white/70">scale.</span>
              </motion.p>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.85, ease: EASE }}
              className="mt-7 max-w-xl text-[16px] leading-relaxed text-white/65 sm:text-[17px]"
            >
              I lead web, mobile and AI platforms at Emaar — and I&apos;m available
              as a senior software developer for selected consultancy and delivery.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 1, ease: EASE }}
              className="mt-10 flex flex-wrap items-center gap-3"
            >
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
            </motion.div>
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
