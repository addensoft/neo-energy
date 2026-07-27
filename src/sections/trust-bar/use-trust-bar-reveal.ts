"use client";

import { useEffect, type RefObject } from "react";

import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { EASE_ENGINEERED_CSS } from "@/lib/motion-tokens";

type Refs = {
  sectionRef: RefObject<HTMLElement | null>;
  shieldGroupRef: RefObject<HTMLDivElement | null>;
  sweepRef: RefObject<HTMLDivElement | null>;
  /** Populated via callback ref, one entry per partner mark, in display order. */
  logosRef: RefObject<HTMLDivElement[]>;
  trustGroupRef: RefObject<HTMLDivElement | null>;
};

/**
 * One-shot GSAP entrance timeline for the Trust & Technology Bar, gated on
 * scroll-into-view (`once: true` — this bar never re-plays once seen).
 *
 * Sequence: bar fades/lifts in → light sweep unveils it → shield + "Worldwide
 * Authorized Agent" first → partner marks stagger in left to right → the
 * "Direct Agent" trust block resolves last. All eases are the site's
 * `EASE_ENGINEERED` curve — no bounce, no overshoot.
 */
export function useTrustBarReveal({
  sectionRef,
  shieldGroupRef,
  sweepRef,
  logosRef,
  trustGroupRef,
}: Refs) {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (prefersReducedMotion) {
      gsap.set([shieldGroupRef.current, ...logosRef.current, trustGroupRef.current], {
        opacity: 1,
        y: 0,
      });
      return;
    }

    const logos = logosRef.current;

    const ctx = gsap.context(() => {
      gsap.set(section, { opacity: 0, y: 36 });
      gsap.set(shieldGroupRef.current, { opacity: 0, y: 10 });
      gsap.set(logos, { opacity: 0, y: 10 });
      gsap.set(trustGroupRef.current, { opacity: 0, y: 10 });
      gsap.set(sweepRef.current, { xPercent: -130, autoAlpha: 0 });

      // Triggered as early as the bar's first sliver enters view, and paced
      // slower than a typical reveal, so it reads as the Hero's last beat
      // continuing into this scene rather than a new element cutting in.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 97%",
          once: true,
        },
        defaults: { ease: EASE_ENGINEERED_CSS },
      });

      tl.to(section, { opacity: 1, y: 0, duration: 1.3 })
        .to(
          sweepRef.current,
          { xPercent: 130, autoAlpha: 0.45, duration: 1.3, ease: "power2.out" },
          "<0.15",
        )
        .to(shieldGroupRef.current, { opacity: 1, y: 0, duration: 0.7 }, "<0.3")
        .to(logos, { opacity: 1, y: 0, duration: 0.55, stagger: 0.11 }, "-=0.3")
        .to(trustGroupRef.current, { opacity: 1, y: 0, duration: 0.7 }, "-=0.05");
    }, section);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll()
        .filter((trigger) => trigger.trigger === section)
        .forEach((trigger) => trigger.kill());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefersReducedMotion]);
}
