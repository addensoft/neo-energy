"use client";

import Image from "next/image";
import { useRef } from "react";

import { Section } from "@/components/section";
import { Button, Heading, Paragraph } from "@/components/ui";
import { siteConfig } from "@/lib/site-config";

import { useCtaReveal } from "./use-cta-reveal";

/**
 * Final CTA — the approved Earth image (unmodified — same asset, same
 * animation) now spans the entire section instead of a 56% column, with the
 * headline/paragraph/CTA floating over it on the left, protected by a
 * left-to-right dark gradient rather than sitting in a separate solid
 * column. One full-width cinematic scene, not a two-column layout.
 */
export function CTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const paragraphRef = useRef<HTMLDivElement>(null);
  const imageFloatRef = useRef<HTMLDivElement>(null);
  const imageScaleRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const sweepRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useCtaReveal({
    sectionRef,
    headingRef,
    paragraphRef,
    imageFloatRef,
    imageScaleRef,
    glowRef,
    sweepRef,
    ctaRef,
  });

  return (
    <Section id="cta" ref={sectionRef} className="bg-void relative overflow-hidden">
      {/* Earth image — full-width/height, the scene's background, not a
          column. Absolutely positioned against Section's own box (not a
          flex/grid sibling) so its height is never at the mercy of
          flex-stretch vs. percentage-height resolution against an
          auto-height container. */}
      <div
        ref={imageFloatRef}
        className="relative h-[46vh] w-full lg:absolute lg:inset-0 lg:h-auto lg:w-full"
      >
        <div ref={imageScaleRef} className="absolute inset-0 overflow-hidden">
          <Image
            src="/images/cta-earth.webp"
            alt="Earth at night from orbit, illuminated by connected global city lights"
            fill
            sizes="100vw"
            className="object-cover object-[58%_42%]"
            priority={false}
          />
          {/* Soft atmosphere glow */}
          <div
            ref={glowRef}
            aria-hidden="true"
            className="bg-ion/40 pointer-events-none absolute -top-1/4 right-0 h-[70%] w-[45%] rounded-full blur-[120px]"
          />
          {/* Light sweep across the horizon */}
          <div
            ref={sweepRef}
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-0 [mix-blend-mode:screen]"
            style={{
              background:
                "linear-gradient(75deg, transparent 42%, rgba(120,190,255,0.35) 50%, transparent 58%)",
            }}
          />
        </div>
      </div>

      {/* Left-to-right dark gradient — readability only, image stays visible through it */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(90deg, var(--palette-void) 0%, rgba(5,7,10,0.88) 28%, rgba(5,7,10,0.45) 50%, rgba(5,7,10,0.05) 68%, transparent 80%)",
        }}
      />

      {/* Content — floats over the image/gradient, no separate solid column */}
      <div className="px-gutter lg:px-gutter-lg relative z-10 flex flex-col justify-center gap-8 py-20 lg:max-w-[38vw] lg:py-0">
        <div ref={headingRef}>
          <Heading as="h2" size="h2" className="uppercase">
            Let&apos;s Build the Future Together
          </Heading>
        </div>

        <div ref={paragraphRef}>
          <Paragraph size="body" className="max-w-md text-balance">
            From flagship battery engineering to component-level repair, NEO ENERGY
            partners with fleets, dealerships, and enterprises building Singapore&apos;s
            electric future — reliable technology, backed by long-term engineering
            support.
          </Paragraph>
        </div>

        <div ref={ctaRef}>
          <Button href={`mailto:${siteConfig.contactEmail}`} variant="primary">
            Request Assessment
          </Button>
        </div>
      </div>
    </Section>
  );
}
