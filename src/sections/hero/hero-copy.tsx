import type { RefObject } from "react";

import { Heading, Paragraph } from "@/components/ui";
import { siteConfig } from "@/lib/site-config";

/**
 * HeroCopy — the headline, subline, and NEO signature mark that land on the
 * scroll-scrubbed film's hold (Creative Direction §5, virtual 15–18s).
 *
 * Unlike Sprint 2's time-based version, visibility here is NOT a boolean
 * prop animated by Framer Motion — it's a continuous opacity/blur value the
 * GSAP scroll timeline drives directly via these refs (`use-hero-scroll.ts`).
 * That's what makes scrubbing backward correctly fade the text back out
 * fractionally, instead of it snapping in/out at a fixed duration regardless
 * of scroll speed or direction.
 */
type HeroCopyProps = {
  scrimRef: RefObject<HTMLDivElement | null>;
  headlineRef: RefObject<HTMLDivElement | null>;
  sublineRef: RefObject<HTMLDivElement | null>;
  signatureRef: RefObject<HTMLDivElement | null>;
};

export function HeroCopy({
  scrimRef,
  headlineRef,
  sublineRef,
  signatureRef,
}: HeroCopyProps) {
  return (
    <div className="px-gutter absolute inset-x-0 bottom-[14%] z-10 flex flex-col items-center gap-6 text-center">
      {/*
        Legibility scrim — the headline overlays the battery composition directly,
        which sometimes lands over busy channel linework. A soft vignette keeps
        type crisp without hiding the object. Fades in with the headline, not before.
      */}
      <div
        ref={scrimRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 scale-125 bg-[radial-gradient(ellipse_at_center,rgba(5,7,10,0.82)_0%,rgba(5,7,10,0.5)_50%,transparent_78%)]"
      />

      <div ref={headlineRef}>
        <Heading as="h1" size="hero" className="uppercase">
          {siteConfig.tagline}
        </Heading>
      </div>

      <div ref={sublineRef}>
        <Paragraph size="lead" className="max-w-xl text-balance">
          {siteConfig.description}
        </Paragraph>
      </div>

      <div ref={signatureRef}>
        <span className="font-display text-muted mt-2 inline-block text-sm tracking-[0.2em] opacity-80">
          {siteConfig.name}
        </span>
      </div>
    </div>
  );
}
