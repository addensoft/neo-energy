"use client";

import { motion, type Variants } from "framer-motion";

import { DURATION, EASE_ENGINEERED } from "@/lib/motion-tokens";
import type { PolymorphicProps } from "@/types";

/**
 * RevealWrapper — Creative Direction §4's kinetic reveal language ("mask-reveal",
 * "blur-to-focus resolve" — never a bounce or slide-in).
 *
 * Two modes:
 *  - Controlled (`show` prop passed): animates between hidden/visible whenever
 *    `show` changes — for time-driven sequences like the Hero film, where
 *    visibility is decided by a GSAP timeline, not scroll position.
 *  - Uncontrolled (`show` omitted): reveals once via `whileInView` the first
 *    time the element enters the viewport — the default for scroll-triggered
 *    chapter content in later sprints.
 */
type RevealVariant = "fade" | "mask" | "blur";

const VARIANTS: Record<RevealVariant, Variants> = {
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  mask: {
    hidden: { opacity: 0, clipPath: "inset(0 100% 0 0)" },
    visible: { opacity: 1, clipPath: "inset(0 0% 0 0)" },
  },
  blur: {
    hidden: { opacity: 0, filter: "blur(20px)" },
    visible: { opacity: 1, filter: "blur(0px)" },
  },
};

type RevealWrapperProps = PolymorphicProps<{
  variant?: RevealVariant;
  delay?: number;
  duration?: number;
  /** Controlled visibility — omit to fall back to scroll-triggered `whileInView`. */
  show?: boolean;
}>;

export function RevealWrapper({
  variant = "fade",
  delay = 0,
  duration = DURATION.slow,
  show,
  className,
  children,
}: RevealWrapperProps) {
  const transition = { duration, delay, ease: EASE_ENGINEERED };
  const isControlled = show !== undefined;

  return (
    <motion.div
      data-reveal-variant={variant}
      className={className}
      variants={VARIANTS[variant]}
      initial="hidden"
      viewport={{ once: true, amount: 0.4 }}
      {...(isControlled
        ? { animate: show ? "visible" : "hidden" }
        : { whileInView: "visible" })}
      transition={transition}
    >
      {children}
    </motion.div>
  );
}
