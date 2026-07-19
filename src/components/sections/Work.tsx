"use client";

import { Reveal, WordsReveal } from "@/components/motion/Reveal";
import { Eyebrow } from "@/components/site/SectionHeading";
import ProjectCase from "@/components/projects/ProjectCase";
import { projects, sectionEyebrow } from "@/lib/content";

export default function Work() {
  return (
    <section id="work" className="relative pt-24 md:pt-36">
      <div className="container-x">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow index={sectionEyebrow.work}>Selected work · Emaar</Eyebrow>
            <h2 className="display-xl mt-6 text-cream">
              <WordsReveal text="Enterprise platforms." />
              <br />
              <span className="accent-text">
                <WordsReveal text="One standard." />
              </span>
            </h2>
          </div>
          <Reveal delay={0.15}>
            <p className="max-w-sm text-[15px] leading-relaxed text-sand md:text-right">
              A multi-platform portfolio across hospitality, retail and entertainment —
              from enterprise super-apps to flagship marketing sites, delivered across web and mobile.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="mt-10">
        {projects.map((p, i) => (
          <ProjectCase key={p.slug} project={p} i={i} />
        ))}
      </div>
    </section>
  );
}
