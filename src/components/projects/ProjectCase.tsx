"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { Reveal, WordsReveal } from "@/components/motion/Reveal";
import { Magnetic } from "@/components/motion/Magnetic";
import { Tilt } from "@/components/motion/Tilt";
import { MacBookMockup, IPhoneMockup } from "@/components/projects/DeviceMockup";
import type { Project } from "@/lib/content";

export default function ProjectCase({ project, i }: { project: Project; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const deviceY = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);
  const phoneY = useTransform(scrollYProgress, [0, 1], ["18%", "-12%"]);
  const flip = i % 2 === 1;

  const hasDesktop = Boolean(project.desktop);
  const hasMobile = Boolean(project.mobile);
  const hasSecondary = Boolean(project.mobileSecondary);
  // Mobile-primary projects lead with iPhone mockups (real screenshots), even if a desktop shot exists.
  const mobileFirst = project.primary === "mobile" && hasMobile;

  return (
    <section ref={ref} id={project.slug} className="relative py-16 md:py-24">
      <div className="container-x">
        <div className="glass-panel relative overflow-visible rounded-[2rem] p-6 md:p-12">
          {/* ambient corner glow — clipped so it doesn't spill; devices stay overflow-visible */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[2rem]">
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(74,21,75,0.12),transparent_70%)] blur-2xl" />
          </div>

          {/* Header */}
          <div className="relative mb-10 flex flex-wrap items-start justify-between gap-3 sm:gap-6">
            <div className="flex min-w-0 items-baseline gap-4 md:gap-5">
              <span className="font-mono text-lg text-blue md:text-xl">{project.index}</span>
              <div className="min-w-0">
                <p className="micro mb-2">
                  {project.category} · {project.year}
                </p>
                <div className="flex min-w-0 items-center gap-3 md:gap-4">
                  {project.logo && (
                    <Image
                      src={project.logo}
                      alt=""
                      width={44}
                      height={44}
                      className="h-9 w-9 shrink-0 rounded-xl object-cover md:h-11 md:w-11"
                    />
                  )}
                  <h3 className="text-3xl font-semibold tracking-tight text-cream md:text-5xl">
                    {project.name}
                  </h3>
                </div>
              </div>
            </div>
            <span className="shrink-0 rounded-full border border-black/10 bg-white/60 px-3 py-1.5 text-[10px] uppercase tracking-[0.14em] text-sand sm:px-4 sm:text-[11px]">
              {project.role}
            </span>
          </div>

          <div className="relative grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
            {/* Device workspace — extra bottom room so the overlapping phone isn't clipped */}
            <div className={`lg:col-span-7 ${flip ? "lg:order-2" : ""} ${!mobileFirst && hasMobile ? "pb-10 md:pb-14" : ""}`}>
              <motion.div style={{ y: deviceY }} className="relative">
                {mobileFirst ? (
                  <div className="relative flex items-center justify-center gap-4 sm:gap-8">
                    {hasSecondary ? (
                      <>
                        <Tilt className="w-[46%] max-w-[230px]" max={7}>
                          <div className="translate-y-4">
                            <IPhoneMockup src={project.mobileSecondary} alt={`${project.name} secondary mobile screen`} />
                          </div>
                        </Tilt>
                        <Tilt className="w-[46%] max-w-[230px]" max={7}>
                          <div className="-translate-y-4">
                            <IPhoneMockup src={project.mobile} alt={`${project.name} mobile screen`} priority={i < 2} />
                          </div>
                        </Tilt>
                      </>
                    ) : (
                      <>
                        {hasDesktop && (
                          <Tilt className="hidden w-[58%] max-w-[420px] opacity-95 md:block" max={5}>
                            <MacBookMockup src={project.desktop} alt={`${project.name} desktop interface`} />
                          </Tilt>
                        )}
                        <Tilt
                          className={`relative z-10 w-[62%] max-w-[280px] ${hasDesktop ? "md:absolute md:right-0 md:w-[34%] md:max-w-[180px] md:translate-y-8" : ""}`}
                          max={7}
                          glare
                        >
                          <IPhoneMockup src={project.mobile} alt={`${project.name} mobile interface`} priority={i < 2} />
                        </Tilt>
                      </>
                    )}
                  </div>
                ) : (
                  <div className="relative">
                    <Tilt max={6} glare>
                      <MacBookMockup src={project.desktop} alt={`${project.name} desktop interface`} priority={i < 2} />
                    </Tilt>
                    {hasMobile && (
                      <motion.div
                        style={{ y: phoneY }}
                        className={`absolute -bottom-4 z-10 w-[28%] max-w-[160px] ${
                          flip ? "left-2 md:-left-2" : "right-2 md:-right-2"
                        }`}
                      >
                        <Tilt max={9}>
                          <IPhoneMockup src={project.mobile} alt={`${project.name} mobile interface`} />
                        </Tilt>
                      </motion.div>
                    )}
                  </div>
                )}
              </motion.div>
            </div>

            {/* Copy */}
            <div className={`lg:col-span-5 ${flip ? "lg:order-1" : ""}`}>
              <h4 className="display-lg text-cream">
                <WordsReveal text={project.headline} />
              </h4>
              <Reveal delay={0.1}>
                <p className="mt-6 text-[16px] leading-relaxed text-sand">{project.summary}</p>
              </Reveal>
              <Reveal delay={0.15}>
                <ul className="mt-8 flex flex-wrap gap-2">
                  {project.stack.map((s) => (
                    <li
                      key={s}
                      className="rounded-full border border-black/10 bg-white/70 px-3.5 py-1.5 text-[12px] text-sand"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </Reveal>
              {project.liveUrl && (
                <Reveal delay={0.2}>
                  <div className="mt-8">
                    <Magnetic strength={0.25}>
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2.5 text-sm text-cream transition-colors hover:text-blue"
                      >
                        <span className="border-b border-blue/40 pb-0.5 transition-colors group-hover:border-blue">
                          Visit live site
                        </span>
                        <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
                      </a>
                    </Magnetic>
                  </div>
                </Reveal>
              )}
            </div>
          </div>

          {/* Task cards */}
          <div className="mt-16">
            <Reveal>
              <p className="micro mb-6">
                <span className="text-blue">✦</span>&nbsp;&nbsp;What I engineered
              </p>
            </Reveal>
            <div
              className={`grid gap-3 md:grid-cols-2 ${
                project.tasks.length >= 4 ? "xl:grid-cols-4" : "xl:grid-cols-3"
              }`}
            >
              {project.tasks.map((t, ti) => (
                <Reveal key={t.n} delay={ti * 0.07} className="h-full">
                  <div className="group flex h-full flex-col rounded-2xl border border-black/[0.07] bg-white/70 p-6 transition-all duration-500 hover:-translate-y-1 hover:border-blue/30 hover:shadow-soft">
                    <span className="font-mono text-2xl text-blue/80 transition-colors group-hover:text-blue">
                      {t.n}
                    </span>
                    <h5 className="mt-5 text-[17px] font-semibold text-cream">{t.title}</h5>
                    <p className="mt-2.5 text-[13.5px] leading-relaxed text-sand">{t.detail}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
