"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal, WordsReveal } from "@/components/motion/Reveal";
import { Eyebrow } from "@/components/site/SectionHeading";
import { certifications, sectionEyebrow, type Certification } from "@/lib/content";

function CredentialCard({
  cert,
  index,
  onOpen,
}: {
  cert: Certification;
  index: number;
  onOpen: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onOpen}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 340, damping: 28 }}
      className="group relative flex h-full min-h-[380px] w-[min(82vw,340px)] shrink-0 snap-center flex-col overflow-hidden rounded-[1.75rem] border border-black/[0.07] bg-white/80 text-left shadow-soft backdrop-blur-sm transition-[box-shadow] duration-500 hover:shadow-lift md:min-h-[400px] md:w-[360px]"
      style={{
        backgroundImage: `linear-gradient(165deg, ${cert.accent}12 0%, transparent 42%), linear-gradient(180deg, rgba(255,255,255,0.92), rgba(255,255,255,0.72))`,
      }}
    >
      {/* Paper grain */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="relative flex shrink-0 items-start justify-between gap-4 p-7 pb-5">
        <div
          className="relative grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-2xl bg-white p-2 shadow-soft ring-1 ring-black/[0.06]"
          style={{ background: `linear-gradient(180deg, #fff, ${cert.accent}10)` }}
        >
          <Image
            src={`/certs/${cert.mark}`}
            alt=""
            width={64}
            height={64}
            className="h-12 w-12 object-contain"
          />
        </div>
        <div className="flex flex-col items-end gap-2">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span
            className="whitespace-nowrap rounded-full px-3 py-1 font-mono text-[10px] font-medium tracking-wide text-white"
            style={{ background: cert.accent }}
          >
            {cert.year}
          </span>
        </div>
      </div>

      <div className="relative flex min-h-0 flex-1 flex-col px-7 pb-7 pt-1">
        <p className="text-[12px] font-medium tracking-tight" style={{ color: cert.accent }}>
          {cert.issuer}
        </p>
        <h3 className="mt-2 min-h-[3.4em] font-display text-[1.35rem] font-medium leading-[1.25] tracking-tight text-cream">
          {cert.title}
        </h3>
        <p className="mt-3 flex-1 text-[13.5px] leading-relaxed text-sand">{cert.detail}</p>
        <span className="mt-auto inline-flex items-center gap-2 pt-6 text-[12px] font-medium text-cream/70 transition-colors group-hover:text-blue">
          {cert.image ? "View credential" : "View details"}
          <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5">
            →
          </span>
        </span>
      </div>
    </motion.button>
  );
}

function Lightbox({
  cert,
  onClose,
}: {
  cert: Certification;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  const hasScan = Boolean(cert.image);

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex items-center justify-center p-5 md:p-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <button
        type="button"
        aria-label="Close credential"
        className="absolute inset-0 bg-[#0a0a0b]/45 backdrop-blur-md"
        onClick={onClose}
      />
      <motion.div
        role="dialog"
        aria-modal
        aria-labelledby="cert-lightbox-title"
        initial={{ opacity: 0, y: 28, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className={`relative w-full overflow-hidden rounded-[2rem] border border-white/20 bg-[#F8F4F9] shadow-lift ${
          hasScan ? "max-w-3xl" : "max-w-lg"
        }`}
        style={{
          backgroundImage: `linear-gradient(160deg, ${cert.accent}18 0%, transparent 50%), linear-gradient(180deg, #ffffff, #F8F4F9)`,
        }}
      >
        <div className="flex items-center justify-between border-b border-black/[0.06] px-7 py-5">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
            Credential
          </span>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-black/[0.08] bg-white px-3 py-1.5 text-[12px] font-medium text-cream transition-colors hover:border-blue/30"
          >
            Close
          </button>
        </div>
        {hasScan ? (
          <div className="px-5 py-5 md:px-7 md:py-7">
            <p id="cert-lightbox-title" className="sr-only">
              {cert.title} — {cert.issuer}
            </p>
            <div className="relative overflow-hidden rounded-2xl bg-white shadow-soft ring-1 ring-black/[0.06]">
              <Image
                src={`/certs/${cert.image}`}
                alt={`${cert.title} certificate from ${cert.issuer}`}
                width={1024}
                height={692}
                className="h-auto w-full"
                priority
              />
            </div>
            <div className="mt-5 flex flex-wrap items-baseline justify-between gap-2 px-1">
              <div>
                <p className="text-[13px] font-medium" style={{ color: cert.accent }}>
                  {cert.issuer}
                </p>
                <p className="mt-0.5 font-display text-[1.15rem] font-medium tracking-tight text-cream">
                  {cert.title}
                </p>
              </div>
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                {cert.year}
              </p>
            </div>
          </div>
        ) : (
          <div className="px-7 py-8 md:px-9 md:py-10">
            <div className="flex items-center gap-5">
              <Image
                src={`/certs/${cert.mark}`}
                alt=""
                width={72}
                height={72}
                className="h-[72px] w-[72px] rounded-2xl object-contain shadow-soft"
              />
              <div>
                <p className="text-[13px] font-medium" style={{ color: cert.accent }}>
                  {cert.issuer}
                </p>
                <p className="mt-1 font-mono text-[12px] text-muted">{cert.year}</p>
              </div>
            </div>
            <h3
              id="cert-lightbox-title"
              className="mt-7 font-display text-[1.85rem] font-medium leading-[1.2] tracking-tight text-cream"
            >
              {cert.title}
            </h3>
            <p className="mt-4 text-[15px] leading-relaxed text-sand">{cert.detail}</p>
            <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
              Verified credential · {cert.year}
            </p>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

export default function Certifications() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<Certification | null>(null);

  const scrollBy = useCallback((dir: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.72), behavior: "smooth" });
  }, []);

  return (
    <section id="certifications" className="relative overflow-hidden py-24 md:py-36">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 80% 10%, rgba(74,21,75,0.07), transparent 55%), radial-gradient(ellipse 50% 35% at 10% 90%, rgba(236,178,46,0.08), transparent 50%)",
        }}
      />

      <div className="container-x">
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <Eyebrow index={sectionEyebrow.certifications}>Certifications</Eyebrow>
            <h2 className="display-xl mt-6 text-cream">
              <WordsReveal text="Credentials that" />{" "}
              <span className="accent-text">
                <WordsReveal text="endure." />
              </span>
            </h2>
          </div>
          <Reveal delay={0.12}>
            <div className="flex items-center gap-3 md:justify-end">
              <p className="mr-2 hidden max-w-[220px] text-right text-[14px] leading-relaxed text-sand sm:block">
                Scroll the strip — tap a card for the full credential.
              </p>
              <button
                type="button"
                aria-label="Scroll certifications left"
                onClick={() => scrollBy(-1)}
                className="grid h-10 w-10 place-items-center rounded-full border border-black/[0.08] bg-white/80 text-cream transition-colors hover:border-blue/35 hover:text-blue"
              >
                ←
              </button>
              <button
                type="button"
                aria-label="Scroll certifications right"
                onClick={() => scrollBy(1)}
                className="grid h-10 w-10 place-items-center rounded-full border border-black/[0.08] bg-white/80 text-cream transition-colors hover:border-blue/35 hover:text-blue"
              >
                →
              </button>
            </div>
          </Reveal>
        </div>
      </div>

      <div
        ref={scrollerRef}
        className="flex items-stretch snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 pt-1 scrollbar-none sm:px-10 lg:px-16"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {certifications.map((cert, i) => (
          <Reveal key={cert.title} delay={i * 0.08} className="flex shrink-0 self-stretch [&_button]:h-full">
            <CredentialCard cert={cert} index={i} onOpen={() => setActive(cert)} />
          </Reveal>
        ))}
        {/* Trailing spacer so last card can center on mobile */}
        <div className="w-2 shrink-0 self-stretch md:w-8" aria-hidden />
      </div>

      <AnimatePresence>
        {active && <Lightbox cert={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </section>
  );
}
