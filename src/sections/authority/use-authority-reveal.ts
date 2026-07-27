"use client";

import { useEffect, type RefObject } from "react";

import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { gsap } from "@/lib/gsap";
import { EASE_ENGINEERED_CSS } from "@/lib/motion-tokens";

/**
 * One-shot GSAP reveal for the statistics bar — each stat lifts/fades in
 * sequentially, gated on this bar's own scroll-into-view (which, sitting
 * immediately below Why Choose NEO ENERGY, naturally fires only once that
 * section has scrolled by).
 */
export function useAuthorityReveal(
  sectionRef: RefObject<HTMLElement | null>,
  statsRef: RefObject<HTMLDivElement[]>,
) {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (prefersReducedMotion) {
      gsap.set(statsRef.current, { opacity: 1, y: 0 });
      return;
    }

    const stats = statsRef.current;

    const ctx = gsap.context(() => {
      gsap.set(stats, { opacity: 0, y: 16 });

      gsap.to(stats, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: EASE_ENGINEERED_CSS,
        scrollTrigger: { trigger: section, start: "top 85%", once: true },
      });
    }, section);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefersReducedMotion]);
}
