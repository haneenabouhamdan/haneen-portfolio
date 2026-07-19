"use client";

import Image from "next/image";
import { Reveal, WordsReveal } from "@/components/motion/Reveal";
import { Tilt } from "@/components/motion/Tilt";
import { Eyebrow } from "@/components/site/SectionHeading";
import { profile, capabilities, stats, sectionEyebrow } from "@/lib/content";

export default function About() {
  return (
    <section id="about" className="relative py-24 md:py-36">
      <div className="container-x">
        <div className="grid items-center gap-14 lg:grid-cols-12">
          {/* Headshot in glass frame */}
          <div className="order-1 lg:col-span-5">
            <Tilt max={5}>
              <div className="relative mx-auto max-w-sm">
                <div className="pointer-events-none absolute -inset-6 rounded-[2.4rem] bg-[radial-gradient(circle_at_30%_20%,rgba(74,21,75,0.12),transparent_60%),radial-gradient(circle_at_80%_90%,rgba(54,197,240,0.1),transparent_60%)] blur-2xl" />
                <div className="glass-panel relative overflow-hidden rounded-[2rem] p-3">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-[#F8F4F9]">
                    <Image
                      src="/haneen.png"
                      alt="Haneen Abou Hamdan"
                      fill
                      sizes="(max-width:1024px) 80vw, 420px"
                      className="object-cover object-[center_18%]"
                      priority
                    />
                  </div>
                  <div className="flex items-center justify-between px-3 pb-1 pt-3">
                    <span className="text-[13px] font-semibold text-cream">Haneen Abou Hamdan</span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                      Dubai, UAE
                    </span>
                  </div>
                </div>
              </div>
            </Tilt>
          </div>

          {/* Copy */}
          <div className="order-2 lg:col-span-7">
            <Eyebrow index={sectionEyebrow.about}>About</Eyebrow>
            <h2 className="display-lg mt-6 text-cream">
              <WordsReveal text="Senior engineering" />{" "}
              <span className="accent-text">
                <WordsReveal text="leadership." />
              </span>
            </h2>
            <Reveal delay={0.1}>
              <p className="mt-8 max-w-2xl text-[16px] leading-relaxed text-sand">
                {profile.summary}
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-sand">
                Day to day I stay hands-on across React, Next.js, React Native, Node/NestJS
                and PostgreSQL on Azure and OCI — architecture, modernization and delivery
                with teams of up to 15.
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-4">
                {stats.map((s) => (
                  <div key={s.label}>
                    <dt className="font-display text-[1.75rem] font-medium tracking-tight text-cream md:text-[2rem]">
                      {s.value}
                    </dt>
                    <dd className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                      {s.label}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <div className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2">
              {capabilities.map((c, i) => (
                <Reveal key={c.title} delay={i * 0.08}>
                  <h3 className="text-[15px] font-semibold text-cream">{c.title}</h3>
                  <ul className="mt-3 space-y-2">
                    {c.items.map((it) => (
                      <li key={it} className="flex items-center gap-2.5 text-[13.5px] text-sand">
                        <span className="h-px w-3.5 bg-blue/60" />
                        {it}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
