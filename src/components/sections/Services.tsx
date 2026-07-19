"use client";

import { Reveal, WordsReveal } from "@/components/motion/Reveal";
import { Eyebrow } from "@/components/site/SectionHeading";
import { GlassButton } from "@/components/motion/GlassButton";
import { services, profile, showFreelance, sectionEyebrow } from "@/lib/content";

/**
 * Freelance & Consultancy — gated by `showFreelance` in content.ts /
 * NEXT_PUBLIC_SHOW_FREELANCE. When false, this component returns null.
 */
export default function Services() {
  if (!showFreelance) return null;

  return (
    <section id="services" className="relative overflow-hidden py-24 md:py-36">
      {/* Distinct band — charcoal wash + blue accent (Living Stack, not flat ivory) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, rgba(74,21,75,0.04) 0%, rgba(74,21,75,0.07) 50%, rgba(74,21,75,0.03) 100%), radial-gradient(ellipse 55% 45% at 85% 15%, rgba(224,30,90,0.08), transparent 55%), radial-gradient(ellipse 40% 35% at 10% 90%, rgba(54,197,240,0.08), transparent 50%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-[3px] bg-gradient-to-b from-transparent via-blue/50 to-transparent md:w-1"
      />

      <div className="container-x">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <Eyebrow index={sectionEyebrow.services}>Engagements</Eyebrow>
            <h2 className="display-xl mt-6 text-cream">
              <WordsReveal text="How we can" />
              <br />
              <span className="accent-text">
                <WordsReveal text="work together." />
              </span>
            </h2>
          </div>
          <Reveal delay={0.15}>
            <p className="max-w-md text-[15px] leading-relaxed text-sand md:text-right">
              {profile.servicesLead}
            </p>
          </Reveal>
        </div>

        {/* Editorial stack — distinct from card grids elsewhere */}
        <ul className="mt-14 border-y border-black/[0.08]">
          {services.map((s, i) => (
            <li
              key={s.title}
              className="border-b border-black/[0.06] last:border-b-0"
            >
              <Reveal delay={i * 0.07}>
                <div className="group grid gap-3 py-7 sm:grid-cols-[4.5rem_1fr] sm:items-baseline sm:gap-8 md:py-8">
                  <span className="font-mono text-sm text-blue transition-colors group-hover:text-cream">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0 sm:grid sm:grid-cols-[minmax(0,14rem)_1fr] sm:gap-8 lg:grid-cols-[minmax(0,18rem)_1fr]">
                    <h3 className="text-[18px] font-semibold tracking-tight text-cream md:text-[19px]">
                      {s.title}
                    </h3>
                    <p className="mt-2 text-[13.5px] leading-relaxed text-sand sm:mt-0">
                      {s.detail}
                    </p>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal delay={0.2}>
          <div className="mt-12 flex flex-col items-stretch justify-between gap-6 border-l-2 border-blue/40 pl-6 md:flex-row md:items-center md:pl-8">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-blue">
                Work with me
              </p>
              <h3 className="mt-2 text-2xl font-semibold tracking-tight text-cream md:text-3xl">
                Tell me what you&apos;re building.
              </h3>
              <p className="mt-2 max-w-lg text-[14px] leading-relaxed text-sand">
                Architecture reviews, AI integration, lead roles, or a full product
                build — I take on engagements where senior software development makes
                a clear difference.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <GlassButton
                href={`mailto:${profile.email}?subject=Opportunity%20—%20Haneen%20Abou%20Hamdan`}
                variant="primary"
              >
                Work with me
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </GlassButton>
              <GlassButton href={profile.bookingUrl} variant="ghost">
                Book a call
              </GlassButton>
              <GlassButton href={profile.linkedin} variant="ghost" external>
                LinkedIn
              </GlassButton>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
