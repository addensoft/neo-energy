"use client";

import { ShieldCheck } from "lucide-react";
import { useRef } from "react";

import { Section } from "@/components/section";
import { Container } from "@/components/ui";

import { PartnerMark } from "./partner-mark";
import { useTrustBarReveal } from "./use-trust-bar-reveal";

const PARTNERS = [
  { name: "CATL" },
  { name: "CALB" },
  { name: "BYD", ringed: true },
  { name: "NIO" },
  { name: "MAZDA", suffix: "(TBC)" },
] as const;

/**
 * Trust & Technology Bar — sits directly beneath the (frozen) Hero, ahead of
 * Chapter 1. A slim credibility strip, not a full-viewport chapter: overrides
 * `Section`'s default `min-h-screen` down to a compact bar. Partner marks are
 * rendered as typographic wordmarks (see partner-mark.tsx) rather than
 * fetched brand logo files, since none exist in this project.
 */
export function TrustBar() {
  const sectionRef = useRef<HTMLElement>(null);
  const shieldGroupRef = useRef<HTMLDivElement>(null);
  const sweepRef = useRef<HTMLDivElement>(null);
  const trustGroupRef = useRef<HTMLDivElement>(null);
  const logosRef = useRef<HTMLDivElement[]>([]);

  useTrustBarReveal({ sectionRef, shieldGroupRef, sweepRef, logosRef, trustGroupRef });

  return (
    <Section
      id="trust-bar"
      ref={sectionRef}
      className="border-border bg-void/95 relative min-h-0 justify-center border-y py-8 backdrop-blur-md lg:py-10"
    >
      {/* Ambient blue lighting */}
      <div
        aria-hidden="true"
        className="bg-ion/20 pointer-events-none absolute top-1/2 left-1/2 h-40 w-[60%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px]"
      />
      {/* Entrance light sweep */}
      <div
        ref={sweepRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 [mix-blend-mode:screen]"
        style={{
          background:
            "linear-gradient(75deg, transparent 42%, rgba(90,200,255,0.5) 50%, transparent 58%)",
        }}
      />

      <Container className="relative z-10 flex flex-col items-center gap-6 lg:flex-row lg:items-center lg:gap-10">
        {/* Left — Worldwide Authorized Agent */}
        <div
          ref={shieldGroupRef}
          className="lg:border-border flex shrink-0 items-center gap-3 lg:border-r lg:pr-8"
        >
          <ShieldCheck className="text-ion h-6 w-6 shrink-0" strokeWidth={1.5} />
          <span className="text-label-sm font-display block leading-tight text-white">
            Worldwide
            <br />
            Authorized Agent
          </span>
        </div>

        {/* Center — partner marks, horizontally swipeable on mobile */}
        <div
          className="flex w-full items-center gap-x-12 overflow-x-auto px-1 py-1 [-webkit-overflow-scrolling:touch] lg:justify-between lg:gap-x-10 lg:overflow-visible lg:px-0 [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {PARTNERS.map((partner, index) => (
            <PartnerMark
              key={partner.name}
              name={partner.name}
              ringed={"ringed" in partner ? partner.ringed : undefined}
              suffix={"suffix" in partner ? partner.suffix : undefined}
              innerRef={(el) => {
                if (el) logosRef.current[index] = el;
              }}
            />
          ))}
        </div>

        {/* Right — Direct Agent */}
        <div
          ref={trustGroupRef}
          className="lg:border-border flex shrink-0 flex-col items-center gap-0.5 text-center lg:items-end lg:border-l lg:pl-8 lg:text-right"
        >
          <span className="text-label-sm font-display block text-white">
            Direct Agent
          </span>
          <span className="text-label-sm block font-mono leading-tight">
            2 of the Top 3
            <br />
            Technology
          </span>
        </div>
      </Container>
    </Section>
  );
}
