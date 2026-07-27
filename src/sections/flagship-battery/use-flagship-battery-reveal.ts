"use client";

import { useEffect, type RefObject } from "react";

import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { gsap } from "@/lib/gsap";
import { EASE_ENGINEERED_CSS } from "@/lib/motion-tokens";

type Refs = {
  sectionRef: RefObject<HTMLElement | null>;
  /** Outer node — parallax-only. Kept separate from `videoRevealRef` so the
   * continuous scrub tween and the one-shot entrance tween never fight over
   * the same element's `y` transform. */
  videoParallaxRef: RefObject<HTMLDivElement | null>;
  /** Inner node — entrance, then idle float once the entrance settles. */
  videoRevealRef: RefObject<HTMLDivElement | null>;
  headlineRef: RefObject<HTMLDivElement | null>;
  descriptionRef: RefObject<HTMLDivElement | null>;
  specsRef: RefObject<HTMLDivElement[]>;
  ctaRef: RefObject<HTMLDivElement | null>;
};

/**
 * One-shot GSAP entrance timeline (scroll-gated, `once: true`) plus two
 * independent continuous tweens on the video — a scroll-scrubbed parallax
 * (`videoParallaxRef`, outer node) and, once the entrance settles, a gentle
 * infinite idle float (`videoRevealRef`, inner node). Three different nodes/
 * properties on purpose: entrance `y`, scroll-linked `y`, and idle `y` would
 * fight each other if they ever landed on the same element mid-tween.
 *
 * Sequence, paced calmly (generous gaps, no beat overlapping the next by more
 * than ~a third of its own duration): video reveals (fade/lift/scale) →
 * headline mask-reveals → description fades → spec items stagger in one at a
 * time → CTA settles in shortly after the specs finish, not on top of them.
 */
export function useFlagshipBatteryReveal({
  sectionRef,
  videoParallaxRef,
  videoRevealRef,
  headlineRef,
  descriptionRef,
  specsRef,
  ctaRef,
}: Refs) {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    const videoReveal = videoRevealRef.current;
    if (!section || !videoReveal) return;

    if (prefersReducedMotion) {
      gsap.set(
        [
          videoReveal,
          headlineRef.current,
          descriptionRef.current,
          ctaRef.current,
          ...specsRef.current,
        ],
        { opacity: 1, y: 0, scale: 1, clipPath: "inset(0 0% 0 0)" },
      );
      return;
    }

    const specs = specsRef.current;
    let idleFloat: gsap.core.Tween | null = null;

    const ctx = gsap.context(() => {
      gsap.set(videoReveal, { opacity: 0, y: 28, scale: 0.96 });
      gsap.set(headlineRef.current, { clipPath: "inset(0 100% 0 0)", opacity: 0 });
      gsap.set(descriptionRef.current, { opacity: 0, y: 14 });
      gsap.set(specs, { opacity: 0, y: 10 });
      gsap.set(ctaRef.current, { opacity: 0, y: 10 });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: section, start: "top 75%", once: true },
        defaults: { ease: EASE_ENGINEERED_CSS },
        onComplete: () => {
          // Extremely subtle idle float, once the entrance has fully
          // settled — a separate element from the scroll-scrubbed parallax,
          // so the two never contend for the same `y`.
          idleFloat = gsap.to(videoReveal, {
            y: "+=5",
            duration: 3.6,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          });
        },
      });

      tl.to(videoReveal, { opacity: 1, y: 0, scale: 1, duration: 1.3 })
        .to(
          headlineRef.current,
          { clipPath: "inset(0 0% 0 0)", opacity: 1, duration: 1 },
          "-=0.5",
        )
        .to(descriptionRef.current, { opacity: 1, y: 0, duration: 0.7 }, "-=0.35")
        .to(specs, { opacity: 1, y: 0, duration: 0.5, stagger: 0.12 }, "-=0.1")
        .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.6 }, "+=0.15");

      // Very subtle continuous parallax — separate element, separate trigger.
      if (videoParallaxRef.current) {
        gsap.fromTo(
          videoParallaxRef.current,
          { y: -18 },
          {
            y: 18,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.6,
            },
          },
        );
      }
    }, section);

    return () => {
      idleFloat?.kill();
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefersReducedMotion]);
}
