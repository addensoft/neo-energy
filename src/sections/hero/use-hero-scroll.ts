"use client";

import { useEffect, useRef } from "react";

import { useHeroPhase } from "@/components/providers/hero-phase-provider";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { gsap, ScrollTrigger } from "@/lib/gsap";

import { HERO_FRAME_COUNT, HERO_TEXT_TIMING } from "./hero-frames";
import { useImageSequence } from "./use-image-sequence";

/** Scroll distance the sequence takes to scrub through, as a viewport-height multiple. */
const SCROLL_DISTANCE = "+=350%";

/** Smoothing lag (seconds) so both frame playback and text reveal ease/catch-up to the scrollbar. */
const SCRUB_SMOOTHING = 0.8;

/**
 * useHeroScroll — Chapter 0, scroll-scrubbing the real Hero film.
 *
 * Sprint 3 revision: the film exists now (`/public/hero-frames/*.webp`, a
 * 289-frame sequence extracted from `herovideo.mp4`), so this replaced the
 * Sprint 2 procedural SVG/CSS placeholder entirely. A canvas draws the frame
 * matching the current scroll position — see hero-frames.ts for why that's a
 * different technique from the pin/scrub *mechanism*, which is unchanged:
 * `pin: true` + `scrub` on a single ScrollTrigger still gives us bidirectional
 * scrubbing, "won't advance until 100%," and release/re-engage at the
 * boundary natively.
 *
 * Frame index and text opacity are both driven off the SAME tweened proxy
 * value (0→1), so both inherit the same `scrub` smoothing lag — the film and
 * the headline feel like one continuous, eased scrub, not two separate systems.
 */
export function useHeroScroll() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const sublineRef = useRef<HTMLDivElement>(null);
  const signatureRef = useRef<HTMLDivElement>(null);
  const scrimRef = useRef<HTMLDivElement>(null);

  const canvasSizeRef = useRef({ width: 0, height: 0 });
  const currentFrameRef = useRef(0);

  const { setPhase } = useHeroPhase();
  const prefersReducedMotion = useReducedMotion();
  const { imagesRef, loadedCount, total, ready } = useImageSequence();

  const drawFrame = (frameIndex: number) => {
    currentFrameRef.current = frameIndex;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const img = imagesRef.current[frameIndex];
    const { width, height } = canvasSizeRef.current;
    if (
      !canvas ||
      !ctx ||
      !img ||
      !img.complete ||
      img.naturalWidth === 0 ||
      !width ||
      !height
    ) {
      return;
    }

    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = width / height;
    let sx: number;
    let sy: number;
    let sw: number;
    let sh: number;
    if (imgRatio > canvasRatio) {
      sh = img.naturalHeight;
      sw = sh * canvasRatio;
      sx = (img.naturalWidth - sw) / 2;
      sy = 0;
    } else {
      sw = img.naturalWidth;
      sh = sw / canvasRatio;
      sx = 0;
      sy = (img.naturalHeight - sh) / 2;
    }
    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, width, height);
  };

  // Canvas sizing — independent of scroll readiness so the first frame is
  // already correctly sized the instant loading finishes.
  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;

    const resize = () => {
      const width = parent.clientWidth;
      const height = parent.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      canvas.getContext("2d")?.setTransform(dpr, 0, 0, dpr, 0, 0);
      canvasSizeRef.current = { width, height };
      drawFrame(currentFrameRef.current);
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready]);

  useEffect(() => {
    if (!ready) return;

    const heroEl = document.getElementById("hero");
    if (!heroEl) return;

    const textEls = [
      headlineRef.current,
      sublineRef.current,
      signatureRef.current,
      scrimRef.current,
    ];

    if (prefersReducedMotion) {
      drawFrame(HERO_FRAME_COUNT - 1);
      gsap.set(textEls, { autoAlpha: 1, filter: "blur(0px)" });
      setPhase("settled");
      return;
    }

    gsap.set(textEls, { autoAlpha: 0, filter: "blur(20px)" });
    drawFrame(0);

    const ctx = gsap.context(() => {
      const frameProxy = { frame: 0 };

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroEl,
          start: "top top",
          end: SCROLL_DISTANCE,
          pin: true,
          scrub: SCRUB_SMOOTHING,
          anticipatePin: 1,
          onUpdate: (self) => {
            setPhase(self.progress >= 0.995 ? "settled" : "film");
          },
        },
      });

      tl.to(
        frameProxy,
        {
          frame: HERO_FRAME_COUNT - 1,
          ease: "none",
          duration: 1,
          onUpdate: () => drawFrame(Math.round(frameProxy.frame)),
        },
        0,
      );

      tl.to(
        scrimRef.current,
        { autoAlpha: 1, filter: "blur(0px)", duration: 0.16 },
        HERO_TEXT_TIMING.scrimStart,
      );
      tl.to(
        headlineRef.current,
        { autoAlpha: 1, filter: "blur(0px)", duration: 0.14 },
        HERO_TEXT_TIMING.headlineStart,
      );
      tl.to(
        sublineRef.current,
        { autoAlpha: 1, filter: "blur(0px)", duration: 0.12 },
        HERO_TEXT_TIMING.sublineStart,
      );
      tl.to(
        signatureRef.current,
        { autoAlpha: 1, filter: "blur(0px)", duration: 0.1 },
        HERO_TEXT_TIMING.signatureStart,
      );
    }, heroEl);

    ScrollTrigger.refresh();

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, prefersReducedMotion, setPhase]);

  return {
    canvasRef,
    headlineRef,
    sublineRef,
    signatureRef,
    scrimRef,
    loadProgress: total > 0 ? loadedCount / total : 0,
    ready,
  };
}
