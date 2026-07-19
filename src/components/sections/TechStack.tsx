"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Reveal, WordsReveal } from "@/components/motion/Reveal";
import { Eyebrow } from "@/components/site/SectionHeading";
import { techStack, sectionEyebrow } from "@/lib/content";

export default function TechStack() {
  return (
    <section id="stack" className="relative overflow-hidden py-24 md:py-36">
      {/* Soft atmosphere — not flat ivory */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 15% 20%, rgba(74,21,75,0.07), transparent 55%), radial-gradient(ellipse 55% 45% at 90% 80%, rgba(54,197,240,0.08), transparent 50%), linear-gradient(180deg, transparent 0%, rgba(248,244,249,0.75) 100%)",
        }}
      />

      <div className="container-x">
        <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <Eyebrow index={sectionEyebrow.stack}>Tech stack</Eyebrow>
            <h2 className="display-xl mt-6 text-cream">
              <WordsReveal text="The tools behind" />{" "}
              <span className="accent-text">
                <WordsReveal text="the platforms." />
              </span>
            </h2>
          </div>
          <Reveal delay={0.12}>
            <p className="max-w-sm text-[15px] leading-relaxed text-sand md:text-right">
              React through Azure and OCI — the stack I use to lead delivery across web,
              mobile, services and applied AI.
            </p>
          </Reveal>
        </div>

        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8">
          {techStack.map((tech, i) => (
            <Reveal key={tech.slug} delay={0.04 + i * 0.035}>
              <motion.li
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 380, damping: 28 }}
                className="group relative list-none"
              >
                <div className="relative flex flex-col items-center gap-3 rounded-2xl border border-black/[0.06] bg-white/55 px-3 py-5 backdrop-blur-sm transition-colors duration-300 group-hover:border-black/[0.1] group-hover:bg-white/90">
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background: `radial-gradient(circle at 50% 30%, ${tech.accent}18, transparent 65%)`,
                    }}
                  />
                  <span className="relative grid h-11 w-11 place-items-center">
                    <Image
                      src={`/tech/${tech.slug}.svg`}
                      alt=""
                      width={40}
                      height={40}
                      className="h-9 w-9 object-contain transition-transform duration-500 group-hover:scale-110"
                    />
                  </span>
                  <span className="relative text-center text-[12.5px] font-medium tracking-tight text-cream">
                    {tech.name}
                  </span>
                </div>
              </motion.li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
