"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
};

/**
 * Scroll reveal that must never leave content permanently hidden.
 * A safety timeout forces visibility if intersection observers miss
 * (common with sticky heroes / odd viewports).
 */
export function Reveal({ children, className, delay = 0, y = 28, once = true }: RevealProps) {
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (reduce) {
      setVisible(true);
      return;
    }
    const t = window.setTimeout(() => setVisible(true), 1600);
    return () => window.clearTimeout(t);
  }, [reduce]);

  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      animate={visible ? { opacity: 1, y: 0 } : undefined}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.12, margin: "40px 0px -5% 0px" }}
      onViewportEnter={() => setVisible(true)}
      transition={{ duration: 0.75, delay: visible ? 0 : delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** Word-by-word reveal for large headlines. */
export function WordsReveal({
  text,
  className,
  wordClassName,
  once = true,
}: {
  text: string;
  className?: string;
  wordClassName?: string;
  once?: boolean;
}) {
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const words = text.split(" ");

  useEffect(() => {
    if (reduce) {
      setVisible(true);
      return;
    }
    const t = window.setTimeout(() => setVisible(true), 1600);
    return () => window.clearTimeout(t);
  }, [reduce]);

  if (reduce || visible) {
    // Once revealed (or reduced motion), render plain text — no clip masks.
    return <span className={className}>{text}</span>;
  }

  return (
    <span className={className} style={{ display: "inline-block" }}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          style={{
            display: "inline-block",
            overflow: "hidden",
            verticalAlign: "bottom",
            paddingBottom: "0.22em",
            marginBottom: "-0.18em",
            paddingTop: "0.08em",
            marginTop: "-0.04em",
          }}
        >
          <motion.span
            className={wordClassName}
            style={{ display: "inline-block", willChange: "transform", lineHeight: 1.15 }}
            initial={{ y: "110%" }}
            whileInView={{ y: "0%" }}
            viewport={{ once, amount: 0.15, margin: "40px 0px -5% 0px" }}
            onViewportEnter={() => setVisible(true)}
            transition={{ duration: 0.8, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </span>
  );
}
