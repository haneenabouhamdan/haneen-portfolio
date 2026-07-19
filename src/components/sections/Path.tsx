"use client";

import { Reveal, WordsReveal } from "@/components/motion/Reveal";
import { Eyebrow } from "@/components/site/SectionHeading";
import { experience, education, sectionEyebrow } from "@/lib/content";

export default function Path() {
  return (
    <section id="path" className="relative py-24 md:py-36">
      <div className="container-x">
        <div className="mb-14">
          <Eyebrow index={sectionEyebrow.path}>The path</Eyebrow>
          <h2 className="display-xl mt-6 text-cream">
            <WordsReveal text="Experience that" />{" "}
            <span className="accent-text">
              <WordsReveal text="compounds." />
            </span>
          </h2>
        </div>

        <div className="relative">
          <div className="absolute left-0 top-0 hidden h-full w-px bg-black/[0.08] md:block" />
          <div className="space-y-4">
            {experience.map((e, i) => (
              <Reveal key={`${e.company}-${e.period}`} delay={i * 0.08}>
                <div className="group relative grid gap-6 rounded-3xl border border-black/[0.07] bg-white/70 p-7 transition-all duration-500 hover:shadow-soft md:grid-cols-12 md:pl-12">
                  <span className="absolute left-[-5px] top-9 hidden h-2.5 w-2.5 rounded-full border-2 border-blue bg-white transition-colors group-hover:bg-blue md:block" />
                  <div className="md:col-span-4">
                    <div className="text-xl font-semibold tracking-tight text-cream">{e.role}</div>
                    <div className="mt-1 text-[15px] text-blue">{e.company}</div>
                    <div className="mt-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                      {e.period} · {e.location}
                    </div>
                  </div>
                  <ul className="space-y-2.5 md:col-span-8">
                    {e.points.map((p) => (
                      <li key={p} className="flex gap-3 text-[14px] leading-relaxed text-sand">
                        <span className="mt-2 h-px w-4 shrink-0 bg-blue/50" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={0.1}>
          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 rounded-3xl border border-black/[0.07] bg-white/70 p-7 md:pl-12">
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
              Education
            </span>
            <span className="text-[15px] font-medium text-cream">{education.degree}</span>
            <span className="text-sand">· {education.school}</span>
            <span className="font-mono text-[12px] text-muted">{education.period}</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
