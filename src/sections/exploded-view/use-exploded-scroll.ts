"use client";

import { useEffect, useState, type RefObject } from "react";

import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/** Scroll distance the explode sequence takes to scrub through. */
const SCROLL_DISTANCE = "+=300%";

/** Same smoothing lag as Hero — the two scroll-scrubbed chapters should feel like one system. */
const SCRUB_SMOOTHING = 0.8;

/** Below this width, skip pinning entirely (Creative Direction §12's documented mobile stance). */
const PIN_MIN_WIDTH = 1024;

type LayerKey = "tray" | "cooling" | "bdu" | "cells" | "busbars" | "topCover";

const LAYER_ORDER: LayerKey[] = [
  "tray",
  "cooling",
  "bdu",
  "cells",
  "busbars",
  "topCover",
];

/** Final exploded Y offset (px, negative = up) and the [start, end] progress window it animates over. */
const LAYER_TARGETS: Record<LayerKey, { y: number; window: [number, number] }> = {
  tray: { y: 0, window: [0, 0.1] },
  cooling: { y: -46, window: [0.08, 0.32] },
  bdu: { y: -88, window: [0.14, 0.38] },
  cells: { y: -132, window: [0.2, 0.44] },
  busbars: { y: -176, window: [0.26, 0.5] },
  topCover: { y: -224, window: [0.32, 0.56] },
};

const CALLOUT_LEAD = 0.06;
const SPEC_ROW_WINDOW: [number, number] = [0.68, 0.8];
const HOTSPOT_WINDOW: [number, number] = [0.8, 0.92];

type Refs = Record<LayerKey, RefObject<HTMLDivElement | null>>;

export function useExplodedScroll(
  layerRefs: Refs,
  calloutRefs: Record<LayerKey, RefObject<HTMLDivElement | null>>,
  lineRefs: Record<LayerKey, React.RefObject<SVGLineElement | null>>,
  stageRef: RefObject<HTMLDivElement | null>,
  specRowRef: RefObject<HTMLDivElement | null>,
  hotspotsRef: RefObject<HTMLDivElement | null>,
) {
  const [simplified, setSimplified] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const heroEl = document.getElementById("exploded-view");
    if (!heroEl) return;

    const isNarrow = window.matchMedia(`(max-width: ${PIN_MIN_WIDTH - 1}px)`).matches;
    const useSimplified = prefersReducedMotion || isNarrow;
    setSimplified(useSimplified);

    const allCalloutEls = LAYER_ORDER.map((k) => calloutRefs[k].current);
    const allLineEls = LAYER_ORDER.map((k) => lineRefs[k].current);

    if (useSimplified) {
      // Static, fully-exploded end state — no pin, no scrub. Reveals once via
      // whatever scroll-into-view behaviour the caller layers on top (plain
      // opacity here; RevealWrapper handles the fade for surrounding copy).
      LAYER_ORDER.forEach((key) => {
        gsap.set(layerRefs[key].current, { y: LAYER_TARGETS[key].y, autoAlpha: 1 });
      });
      gsap.set(allCalloutEls, { autoAlpha: 1 });
      allLineEls.forEach((line) => gsap.set(line, { strokeDashoffset: 0 }));
      gsap.set(specRowRef.current, { autoAlpha: 1 });
      gsap.set(hotspotsRef.current, { autoAlpha: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(stageRef.current, { transformPerspective: 1600, rotateX: 8 });
      // All layers start stacked at y:0 — the opaque top cover (last in DOM,
      // painted last) naturally occludes everything beneath it, so the
      // assembled state reads as a single closed pack, matching Chapter 1's
      // resting view, with no opacity trickery needed.
      LAYER_ORDER.forEach((key) => {
        gsap.set(layerRefs[key].current, { y: 0, autoAlpha: 1 });
      });
      allCalloutEls.forEach((el) => gsap.set(el, { autoAlpha: 0 }));
      allLineEls.forEach((line) => {
        gsap.set(line, { strokeDasharray: 140, strokeDashoffset: 140 });
      });
      gsap.set(specRowRef.current, { autoAlpha: 0, y: 16 });
      gsap.set(hotspotsRef.current, { autoAlpha: 0 });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: heroEl,
          start: "top top",
          end: SCROLL_DISTANCE,
          pin: true,
          scrub: SCRUB_SMOOTHING,
          anticipatePin: 1,
        },
      });

      tl.to(stageRef.current, { rotateX: 14, scale: 0.94, duration: 1 }, 0);

      LAYER_ORDER.forEach((key) => {
        const [start, end] = LAYER_TARGETS[key].window;
        const dur = end - start;
        tl.to(
          layerRefs[key].current,
          { y: LAYER_TARGETS[key].y, autoAlpha: 1, duration: dur },
          start,
        );

        const calloutStart = end;
        tl.to(
          calloutRefs[key].current,
          { autoAlpha: 1, duration: CALLOUT_LEAD },
          calloutStart,
        );
        tl.to(
          lineRefs[key].current,
          { strokeDashoffset: 0, duration: CALLOUT_LEAD },
          calloutStart,
        );
      });

      tl.to(
        specRowRef.current,
        { autoAlpha: 1, y: 0, duration: SPEC_ROW_WINDOW[1] - SPEC_ROW_WINDOW[0] },
        SPEC_ROW_WINDOW[0],
      );
      tl.to(
        hotspotsRef.current,
        { autoAlpha: 1, duration: HOTSPOT_WINDOW[1] - HOTSPOT_WINDOW[0] },
        HOTSPOT_WINDOW[0],
      );
    }, heroEl);

    // Hero's own pin (Chapter 0) is created asynchronously — its
    // ScrollTrigger waits on image preload (see use-hero-scroll.ts) — so
    // this trigger can end up *registered* with GSAP before Hero's, even
    // though Hero comes first in the DOM. ScrollTrigger calculates
    // cumulative pin-spacer offsets in registration order, so out-of-order
    // registration bakes in a start/end measured against a page that
    // doesn't yet include Hero's pin-spacer — and a plain refresh() doesn't
    // fix that ordering on its own. `sort()` re-orders triggers by DOM
    // position first, then refresh() recalculates correctly against it.
    ScrollTrigger.sort();
    ScrollTrigger.refresh();
    const refreshTimers = [100, 400, 1000].map((delay) =>
      window.setTimeout(() => {
        ScrollTrigger.sort();
        ScrollTrigger.refresh();
      }, delay),
    );

    return () => {
      refreshTimers.forEach((id) => window.clearTimeout(id));
      ctx.revert();
    };
  }, [
    prefersReducedMotion,
    layerRefs,
    calloutRefs,
    lineRefs,
    stageRef,
    specRowRef,
    hotspotsRef,
  ]);

  return { simplified };
}
