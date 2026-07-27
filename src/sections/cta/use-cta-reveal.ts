"use client";

import { useEffect, type RefObject } from "react";

import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { gsap } from "@/lib/gsap";
import { EASE_ENGINEERED_CSS } from "@/lib/motion-tokens";

type Refs = {
  sectionRef: RefObject<HTMLElement | null>;
  headingRef: RefObject<HTMLDivElement | null>;
  paragraphRef: RefObject<HTMLDivElement | null>;
  /** Outer node — continuous slow float only. */
  imageFloatRef: RefObject<HTMLDivElement | null>;
  /** Inner node — entrance fade/scale, then a continuous slow Ken Burns
   * scale once the entrance settles (same element, sequential GSAP tweens —
   * safe, since nothing else ever touches this element's scale). */
  imageScaleRef: RefObject<HTMLDivElement | null>;
  glowRef: RefObject<HTMLDivElement | null>;
  sweepRef: RefObject<HTMLDivElement | null>;
  ctaRef: RefObject<HTMLDivElement | null>;
};

/**
 * One-shot GSAP entrance (`once: true`) — Earth image fades in and settles
 * from a slight over-scale, headline reveals, paragraph fades upward, CTA
 * settles in last. Once that timeline completes, three independent
 * continuous idle tweens take over: a slow Ken Burns scale on the image, a
 * gentle float on its wrapper, and a periodic light sweep — each on its own
 * element/property so none of them ever contend with each other or with the
 * entrance.
 */
export function useCtaReveal({
  sectionRef,
  headingRef,
  paragraphRef,
  imageFloatRef,
  imageScaleRef,
  glowRef,
  sweepRef,
  ctaRef,
}: Refs) {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (prefersReducedMotion) {
      gsap.set(
        [
          headingRef.current,
          paragraphRef.current,
          imageScaleRef.current,
          glowRef.current,
          ctaRef.current,
        ],
        { opacity: 1, y: 0, scale: 1 },
      );
      return;
    }

    const idleTweens: gsap.core.Tween[] = [];

    const ctx = gsap.context(() => {
      gsap.set(imageScaleRef.current, { opacity: 0, scale: 1.08 });
      gsap.set(headingRef.current, { opacity: 0, y: 26 });
      gsap.set(paragraphRef.current, { opacity: 0, y: 18 });
      gsap.set(glowRef.current, { opacity: 0 });
      gsap.set(ctaRef.current, { opacity: 0, y: 14 });
      gsap.set(sweepRef.current, { xPercent: -130, autoAlpha: 0 });

      // Gentle perpetual float — independent element, runs from mount
      // (invisible until the entrance reveals it, so starting early is fine).
      idleTweens.push(
        gsap.to(imageFloatRef.current, {
          y: 14,
          duration: 6,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        }),
      );

      const tl = gsap.timeline({
        scrollTrigger: { trigger: section, start: "top 70%", once: true },
        defaults: { ease: EASE_ENGINEERED_CSS },
        onComplete: () => {
          // Slow Ken Burns hold — same element the entrance just settled,
          // picking up cleanly since the entrance tween has already finished.
          idleTweens.push(
            gsap.to(imageScaleRef.current, {
              scale: 1.03,
              duration: 16,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
            }),
          );
          idleTweens.push(
            gsap.to(glowRef.current, {
              opacity: 0.85,
              duration: 5,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
            }),
          );
          idleTweens.push(
            gsap.to(sweepRef.current, {
              xPercent: 130,
              autoAlpha: 0.3,
              duration: 2.6,
              ease: "power1.inOut",
              repeat: -1,
              repeatDelay: 4,
            }),
          );
        },
      });

      tl.to(imageScaleRef.current, { opacity: 1, scale: 1, duration: 1.6 })
        .to(headingRef.current, { opacity: 1, y: 0, duration: 1 }, "-=1")
        .to(paragraphRef.current, { opacity: 1, y: 0, duration: 0.8 }, "-=0.55")
        .to(glowRef.current, { opacity: 0.6, duration: 1.2 }, "-=0.7")
        .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.7 }, "-=0.3");
    }, section);

    return () => {
      idleTweens.forEach((tween) => tween.kill());
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefersReducedMotion]);
}
