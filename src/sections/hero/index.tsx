"use client";

import { useHeroPhase } from "@/components/providers/hero-phase-provider";
import { Section } from "@/components/section";

import { HeroCopy } from "./hero-copy";
import { ScrollCue } from "./scroll-cue";
import { useHeroScroll } from "./use-hero-scroll";

/**
 * Chapter 0 — Hero, scroll-scrubbed. Creative Direction §2, §5, §9 (revised).
 *
 * The real Hero film (herovideo.mp4 → 289-frame WebP sequence) plays back
 * entirely under scroll control: darkness/macro engineering detail → the
 * battery's reveal → a light-bloom finale the headline materialises out of.
 * See use-hero-scroll.ts for why this is a canvas frame sequence rather than
 * `<video>.currentTime` scrubbing, and hero-frames.ts for the source specs.
 */
export function Hero() {
  const {
    canvasRef,
    headlineRef,
    sublineRef,
    signatureRef,
    scrimRef,
    loadProgress,
    ready,
  } = useHeroScroll();
  const { phase } = useHeroPhase();

  return (
    <Section id="hero" className="bg-void">
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 h-full w-full"
      />

      {!ready && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-muted font-mono text-xs tracking-[0.16em] uppercase">
            Loading {Math.round(loadProgress * 100)}%
          </span>
        </div>
      )}

      <HeroCopy
        scrimRef={scrimRef}
        headlineRef={headlineRef}
        sublineRef={sublineRef}
        signatureRef={signatureRef}
      />

      <ScrollCue visible={phase === "settled"} />
    </Section>
  );
}
