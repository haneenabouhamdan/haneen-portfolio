"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Magnetic } from "@/components/motion/Magnetic";
import { profile, showFreelance } from "@/lib/content";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  const links = useMemo(() => {
    const base = [
      { label: "Work", href: "#work" },
      { label: "Builds", href: "#personal" },
      { label: "About", href: "#about" },
      { label: "Stack", href: "#stack" },
    ];
    if (showFreelance) base.push({ label: "Freelance", href: "#services" });
    base.push({ label: "Contact", href: "#contact" });
    return base;
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Over the video hero: light chrome. After scroll: ivory glass.
  const onVideo = !scrolled;

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-black/[0.06] bg-white/80 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 w-full max-w-[1600px] items-center justify-between px-6 sm:px-10 md:h-[74px] lg:px-16">
        <a href="#top" className="group flex items-center gap-3">
          <span
            className={`relative grid h-8 w-8 place-items-center rounded-lg font-mono text-[13px] font-semibold transition-colors ${
              onVideo
                ? "border border-white/25 bg-white/10 text-white backdrop-blur-md"
                : "border border-black/10 bg-white text-cream shadow-soft"
            }`}
          >
            HA
          </span>
          <span
            className={`hidden text-[15px] font-medium tracking-tight sm:block ${
              onVideo ? "text-white" : "text-cream"
            }`}
          >
            {profile.name}
          </span>
        </a>

        <nav className="flex items-center gap-5 md:gap-8">
          <ul className="hidden items-center gap-7 md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <Magnetic strength={0.25}>
                  <a
                    href={l.href}
                    className={`relative text-[13px] tracking-tight transition-colors ${
                      onVideo
                        ? "text-white/70 hover:text-white"
                        : "text-sand hover:text-cream"
                    }`}
                  >
                    {l.label}
                  </a>
                </Magnetic>
              </li>
            ))}
          </ul>
          <Magnetic strength={0.3}>
            <a
              href={showFreelance ? "#services" : `mailto:${profile.email}`}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-[12px] font-medium tracking-tight transition-colors ${
                onVideo
                  ? "border border-white/25 bg-white/10 text-white backdrop-blur-md hover:bg-white/20"
                  : "glass text-cream hover:border-blue/40"
              }`}
            >
              {showFreelance ? "Work with me" : "Get in touch"}
              <span className={onVideo ? "text-white/70" : "text-blue"}>→</span>
            </a>
          </Magnetic>
        </nav>
      </div>
    </motion.header>
  );
}
