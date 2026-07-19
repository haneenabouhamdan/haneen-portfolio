"use client";

import { Reveal, WordsReveal } from "@/components/motion/Reveal";
import { Magnetic } from "@/components/motion/Magnetic";
import { Tilt } from "@/components/motion/Tilt";
import { Eyebrow } from "@/components/site/SectionHeading";
import { GitHubIcon } from "@/components/site/icons";
import { MacBookMockup, IPhoneMockup } from "@/components/projects/DeviceMockup";
import { personalProjects, sectionEyebrow, type PersonalProject } from "@/lib/content";

export default function PersonalProjects() {
  const featured = personalProjects.filter((p) => p.tasks?.length);
  const rest = personalProjects.filter((p) => !p.tasks?.length);

  return (
    <section id="personal" className="relative py-24 md:py-36">
      <div className="container-x">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow index={sectionEyebrow.personal}>Beyond the day job</Eyebrow>
            <h2 className="display-xl mt-6 text-cream">
              <WordsReveal text="Things I build" />
              <br />
              <span className="accent-text">
                <WordsReveal text="for myself." />
              </span>
            </h2>
          </div>
          <Reveal delay={0.15}>
            <p className="max-w-sm text-[15px] leading-relaxed text-sand md:text-right">
              Personal and open-source builds — where I explore stacks, product ideas and
              end-to-end shipping on my own terms.
            </p>
          </Reveal>
        </div>

        {featured.map((p, i) => (
          <FeaturedBuild key={p.name} project={p} index={i} />
        ))}

        {rest.length > 0 && (
          <div className="mt-8 grid gap-3 md:grid-cols-3">
            {rest.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.08} className="h-full">
                <article className="group flex h-full flex-col rounded-2xl border border-black/[0.07] bg-white/70 p-7 transition-all duration-500 hover:-translate-y-1 hover:shadow-soft">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-2xl font-semibold tracking-tight text-cream">{p.name}</h3>
                    <span className="mt-1 shrink-0 font-mono text-xs text-muted">{p.year}</span>
                  </div>
                  <p className="mt-2 text-[15px] font-medium text-blue">{p.tagline}</p>
                  <p className="mt-4 text-[13.5px] leading-relaxed text-sand">{p.description}</p>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {p.stack.map((s) => (
                      <li
                        key={s}
                        className="rounded-full border border-black/10 bg-white/70 px-3 py-1 text-[11px] text-muted"
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                  {p.githubUrl && (
                    <div className="mt-auto pt-8">
                      <GitHubLink project={p} />
                    </div>
                  )}
                </article>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function FeaturedBuild({ project: p, index }: { project: PersonalProject; index: number }) {
  const hasDesktop = Boolean(p.video || p.image);
  const hasMobile = Boolean(p.mobile);
  return (
    <div className="glass-panel mt-10 overflow-hidden rounded-[2rem]">
      <div className="grid gap-10 p-8 md:p-12 lg:grid-cols-12 lg:gap-12">
        {hasDesktop && (
          <div className={`lg:col-span-6 ${hasMobile ? "pb-10 md:pb-12" : ""}`}>
            <div className="relative">
              <Tilt max={6} glare>
                <MacBookMockup
                  src={p.image}
                  videoSrc={p.video}
                  poster={p.videoPoster ?? p.image}
                  alt={p.imageAlt ?? `${p.name} storefront`}
                  priority={index === 0}
                />
              </Tilt>
              {hasMobile && (
                <div className="absolute -bottom-2 right-0 z-10 w-[28%] max-w-[150px] md:-right-3 md:-bottom-4">
                  <Tilt max={9}>
                    <IPhoneMockup
                      src={p.mobile}
                      alt={`${p.name} mobile`}
                      priority={index === 0}
                    />
                  </Tilt>
                </div>
              )}
            </div>
          </div>
        )}

        <div className={hasDesktop ? "lg:col-span-6" : "lg:col-span-12"}>
          <div className="flex items-baseline justify-between gap-4">
            <p className="micro">
              <span className="text-blue">✦</span>&nbsp;&nbsp;Featured build
            </p>
            <span className="font-mono text-xs text-muted">{p.year}</span>
          </div>
          <h3 className="mt-4 text-3xl font-semibold tracking-tight text-cream md:text-4xl">{p.name}</h3>
          <p className="mt-2.5 text-lg font-medium text-blue">{p.tagline}</p>
          <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-sand">{p.description}</p>

          <ul className="mt-6 flex flex-wrap gap-2">
            {p.stack.map((s) => (
              <li
                key={s}
                className="rounded-full border border-black/10 bg-white/70 px-3 py-1 text-[12px] text-sand"
              >
                {s}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-6">
            {p.githubUrl && <GitHubLink project={p} />}
            {p.liveUrl && (
              <Magnetic strength={0.25}>
                <a
                  href={p.liveUrl}
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
            )}
          </div>
        </div>
      </div>

      {p.tasks && p.tasks.length > 0 && (
        <div
          className={`grid gap-3 border-t border-black/[0.06] p-8 pt-8 md:grid-cols-2 md:p-12 md:pt-8 ${
            p.tasks.length >= 4 ? "xl:grid-cols-4" : "xl:grid-cols-3"
          }`}
        >
          {p.tasks.map((t, ti) => (
            <Reveal key={t.n} delay={index * 0.04 + ti * 0.07} className="h-full">
              <div className="group flex h-full flex-col rounded-2xl border border-black/[0.07] bg-white/70 p-6 transition-all duration-500 hover:-translate-y-1 hover:border-blue/30">
                <span className="font-mono text-2xl text-blue/80 transition-colors group-hover:text-blue">
                  {t.n}
                </span>
                <h5 className="mt-5 text-[17px] font-semibold text-cream">{t.title}</h5>
                <p className="mt-2.5 text-[13.5px] leading-relaxed text-sand">{t.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}

function GitHubLink({ project: p }: { project: PersonalProject }) {
  if (!p.githubUrl) return null;
  return (
    <Magnetic strength={0.25}>
      <a
        href={p.githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex items-center gap-2.5 text-sm text-cream transition-colors hover:text-blue"
        aria-label={`View ${p.name} on GitHub`}
      >
        <GitHubIcon className="h-5 w-5" />
        <span className="border-b border-blue/40 pb-0.5 transition-colors group-hover:border-blue">
          View on GitHub
        </span>
      </a>
    </Magnetic>
  );
}
