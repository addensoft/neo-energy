"use client";

import { useEffect, type RefObject } from "react";

import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { gsap } from "@/lib/gsap";
import { EASE_ENGINEERED_CSS } from "@/lib/motion-tokens";

type Refs = {
  sectionRef: RefObject<HTMLElement | null>;
  headingRef: RefObject<HTMLDivElement | null>;
  artworkRef: RefObject<HTMLDivElement | null>;
  itemsRef: RefObject<HTMLLIElement[]>;
  ctaRef: RefObject<HTMLDivElement | null>;
};

/**
 * One-shot GSAP entrance (`once: true`), sequenced per spec: left heading
 * first → right artwork fades/scales in → bullets stagger one by one → CTA
 * last. Same `EASE_ENGINEERED`, no-bounce discipline as every other reveal
 * on this page.
 */
export function useWhyChooseUsReveal({
  sectionRef,
  headingRef,
  artworkRef,
  itemsRef,
  ctaRef,
}: Refs) {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (prefersReducedMotion) {
      gsap.set(
        [headingRef.current, artworkRef.current, ctaRef.current, ...itemsRef.current],
        { opacity: 1, y: 0, scale: 1 },
      );
      return;
    }

    const items = itemsRef.current;

    const ctx = gsap.context(() => {
      gsap.set(headingRef.current, { opacity: 0, y: 24 });
      gsap.set(artworkRef.current, { opacity: 0, scale: 0.94 });
      gsap.set(items, { opacity: 0, y: 12 });
      gsap.set(ctaRef.current, { opacity: 0, y: 12 });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: section, start: "top 75%", once: true },
        defaults: { ease: EASE_ENGINEERED_CSS },
      });

      tl.to(headingRef.current, { opacity: 1, y: 0, duration: 0.9 })
        .to(artworkRef.current, { opacity: 1, scale: 1, duration: 1.1 }, "-=0.6")
        .to(items, { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 }, "-=0.7")
        .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.6 }, "-=0.1");
    }, section);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefersReducedMotion]);
}
