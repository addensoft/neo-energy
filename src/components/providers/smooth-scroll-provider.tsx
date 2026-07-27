"use client";

import Lenis from "lenis";
import { useEffect } from "react";

import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import type { WithChildren } from "@/types";

/**
 * SmoothScrollProvider — wires Lenis smooth scrolling into GSAP's ScrollTrigger
 * so both libraries agree on scroll position. This is library *configuration*
 * (Sprint 1 scope, item 2), not chapter animation — no chapter-level scroll
 * choreography (§3 scroll-jacking, §9 timelines) is implemented here.
 *
 * Respects `prefers-reduced-motion`: Lenis is never instantiated for users who
 * have opted out, so the page falls back to native browser scrolling — the
 * correct accessible default for a scroll-jacked, cinematic experience.
 */
export function SmoothScrollProvider({ children }: WithChildren) {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      autoRaf: false,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const syncLenisToGsapTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(syncLenisToGsapTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(syncLenisToGsapTicker);
    };
  }, [prefersReducedMotion]);

  return <>{children}</>;
}
