"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Reveal, WordsReveal } from "@/components/motion/Reveal";
import { Magnetic } from "@/components/motion/Magnetic";
import { GitHubIcon } from "@/components/site/icons";
import { profile, sectionEyebrow } from "@/lib/content";

const socials = [
  { label: "LinkedIn", href: profile.linkedin },
  { label: "GitHub", href: profile.github },
  { label: "Email", href: `mailto:${profile.email}` },
  { label: "Résumé", href: profile.resume },
];

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });
  // Whole network "zooms out" and resolves into the monogram.
  const scale = useTransform(scrollYProgress, [0, 1], [1.6, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.7, 1]);
  const blur = useTransform(scrollYProgress, [0, 1], [8, 0]);
  const filter = useTransform(blur, (b) => `blur(${b}px)`);

  return (
    <footer
      ref={ref}
      id="contact"
      className="contact-finale-bg relative mt-16 overflow-hidden rounded-t-[2.5rem] text-white"
    >
      {/* Cyan + subtle Slack-green accent blooms */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(45%_38%_at_18%_72%,rgba(54,197,240,0.14),transparent_68%),radial-gradient(50%_40%_at_88%_62%,rgba(46,182,125,0.08),transparent_70%),radial-gradient(40%_32%_at_50%_100%,rgba(236,178,46,0.05),transparent_65%)]"
      />

      <div className="container-x relative">
        {/* Monogram finale */}
        <div className="flex flex-col items-center pt-24 text-center md:pt-32">
          <motion.div
            style={{ scale, opacity, filter }}
            className="relative w-[280px] [mask-image:radial-gradient(circle_at_center,black_45%,transparent_72%)] [-webkit-mask-image:radial-gradient(circle_at_center,black_45%,transparent_72%)] md:w-[440px]"
          >
            <Image
              src="/media/ha-monogram.png"
              alt="HA monogram"
              width={440}
              height={440}
              className="h-auto w-full mix-blend-screen"
            />
          </motion.div>
          <Reveal>
            <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.3em] text-white/45">
              Engineering in motion
            </p>
          </Reveal>
        </div>

        {/* Contact */}
        <div className="mx-auto max-w-4xl pb-8 pt-20 text-center md:pt-28">
          <p className="eyebrow justify-center text-white/50">
            <span className="text-blue">{sectionEyebrow.contact}</span>
            <span className="h-px w-6 bg-gradient-to-r from-blue to-transparent" />
            Contact
          </p>

          <div className="relative mx-auto mt-7 inline-block max-w-full px-2 py-6 md:px-10 md:py-10">
            <div
              aria-hidden
              className="contact-headline-bloom pointer-events-none absolute left-1/2 top-1/2 h-[140%] w-[120%] -translate-x-1/2 -translate-y-1/2 rounded-[100%]"
            />
            <h2 className="display-xl relative z-10 font-bold text-white">
              <WordsReveal text="Let's build something" />
              <br />
              <span className="text-white">
                <WordsReveal text="exceptional." />
              </span>
            </h2>
          </div>

          <Reveal delay={0.1}>
            <p className="mx-auto mt-8 max-w-xl text-[16px] leading-relaxed text-white/60">
              {profile.available} — from architecture and AI integration to hands-on
              senior delivery. Tell me what you&apos;re building.
            </p>
          </Reveal>

          <div className="mt-12 flex justify-center">
            <Magnetic strength={0.2}>
              <a
                href={`mailto:${profile.email}`}
                className="inline-block text-[clamp(1.4rem,4vw,2.8rem)] font-semibold tracking-tight text-white underline decoration-blue/50 decoration-2 underline-offset-[10px] transition-colors hover:decoration-blue"
              >
                {profile.email}
              </a>
            </Magnetic>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-x-8 gap-y-3">
            {socials.map((s) => {
              const external = s.href.startsWith("http");
              return (
                <Magnetic key={s.label} strength={0.25}>
                  <a
                    href={s.href}
                    {...(external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="group inline-flex items-center gap-2 text-[15px] text-white/60 transition-colors hover:text-white"
                  >
                    {s.label === "GitHub" && <GitHubIcon className="h-4 w-4" />}
                    <span className="h-px w-5 bg-white/30 transition-all group-hover:w-8 group-hover:bg-blue" />
                    {s.label}
                  </a>
                </Magnetic>
              );
            })}
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-3 border-t border-white/10 py-8 text-[13px] text-white/40 md:flex-row">
          <p>
            © {new Date().getFullYear()} {profile.name}. {profile.location}.
          </p>
          <p className="font-mono text-[11px] uppercase tracking-[0.16em]">
            Senior Software Engineer · Engineering Lead
          </p>
        </div>
      </div>
    </footer>
  );
}
