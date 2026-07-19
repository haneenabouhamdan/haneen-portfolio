"use client";

import { Reveal } from "@/components/motion/Reveal";

export function Eyebrow({ children, index }: { children: React.ReactNode; index?: string }) {
  return (
    <Reveal>
      <p className="eyebrow">
        {index && <span className="text-blue">{index}</span>}
        <span className="h-px w-6 bg-gradient-to-r from-blue/70 to-transparent" />
        {children}
      </p>
    </Reveal>
  );
}
