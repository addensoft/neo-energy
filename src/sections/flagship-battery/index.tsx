"use client";

import {
  BatteryCharging,
  BatteryFull,
  Droplets,
  LayoutGrid,
  Timer,
  TrendingUp,
  Weight,
  Zap,
} from "lucide-react";
import { useRef } from "react";

import { VideoWrapper } from "@/components/media";
import { Section } from "@/components/section";
import { Button, Container, Heading, Paragraph } from "@/components/ui";

import { SpecItem } from "./spec-item";
import { useFlagshipBatteryReveal } from "./use-flagship-battery-reveal";

const SPECS = [
  { icon: BatteryFull, value: "77.94 kWh", label: "Total Energy" },
  { icon: BatteryCharging, value: "214 Ah", label: "Rated Capacity" },
  { icon: Zap, value: "364.24 V", label: "Nominal Voltage" },
  { icon: Weight, value: "≤ 550 kg", label: "Total Weight" },
  { icon: TrendingUp, value: "140+ Wh/kg", label: "Energy Density" },
  { icon: Timer, value: "15 min", label: "Fast Charge (30–80%)" },
  { icon: Droplets, value: "Liquid", label: "Cooling System" },
  { icon: LayoutGrid, value: "1P116S", label: "Configuration" },
] as const;

/**
 * Flagship Battery Overview — the next scene after the Trust & Technology Bar,
 * before The Object. Engineering-excellence framing throughout (per the brand
 * positioning correction): NEO ENERGY as the company that builds this pack, not
 * a repair-services pitch. Reuses the `VideoWrapper` scaffold built (and
 * unused) since Sprint 1 — an ambient autoplay/muted/loop video, not a
 * scroll-scrubbed frame sequence like Hero.
 */
export function FlagshipBattery() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoParallaxRef = useRef<HTMLDivElement>(null);
  const videoRevealRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const specsRef = useRef<HTMLDivElement[]>([]);

  useFlagshipBatteryReveal({
    sectionRef,
    videoParallaxRef,
    videoRevealRef,
    headlineRef,
    descriptionRef,
    specsRef,
    ctaRef,
  });

  return (
    <Section id="flagship-battery" ref={sectionRef} className="bg-void py-24 lg:py-32">
      {/* Ambient blue lighting */}
      <div
        aria-hidden="true"
        className="bg-ion/15 pointer-events-none absolute top-1/2 left-1/4 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[140px]"
      />

      <Container className="relative z-10 grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:items-stretch lg:gap-20">
        {/* Left — flagship battery video. Fixed aspect on mobile (its own row,
            sized to content); stretches to match the content column's full
            height on desktop so it reads as one cinematic panel rather than a
            small box floating in dead space. */}
        <div ref={videoParallaxRef} className="relative lg:h-full">
          <div
            ref={videoRevealRef}
            className="border-border relative aspect-video min-h-[22rem] overflow-hidden rounded-lg border shadow-[var(--shadow-elevation-lg)] lg:aspect-auto lg:h-full lg:min-h-0"
          >
            <VideoWrapper
              src="/videos/flagship-battery.mp4"
              poster="/videos/flagship-battery-poster.webp"
              alt="NEO ENERGY's flagship 77.94kWh EV battery pack"
              className="rounded-lg"
            />
            {/* Cinematic grade — subtle bottom vignette, matches Hero's scrim treatment */}
            <div
              aria-hidden="true"
              className="from-void/50 pointer-events-none absolute inset-0 bg-gradient-to-t via-transparent to-transparent"
            />
          </div>
        </div>

        {/* Right — headline, spec grid, CTA */}
        <div className="flex flex-col gap-10">
          <div ref={headlineRef} className="flex flex-col gap-5">
            <span className="text-ion text-spec-value font-display">77.94 kWh</span>
            <Heading as="h2" size="h2" className="uppercase">
              High Performance
              <br />
              Battery System
            </Heading>
          </div>

          <div ref={descriptionRef}>
            <Paragraph size="body" className="max-w-xl">
              Engineered in-house from cell chemistry to enclosure — validated through CFD
              thermal simulation and CAE vibration testing before a single pack ships.
              This is the flagship 77.94kWh LFP system built for the energy density,
              fast-charge performance, and thermal control modern EV fleets demand.
            </Paragraph>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-5">
            {SPECS.map((spec, index) => (
              <SpecItem
                key={spec.label}
                icon={spec.icon}
                value={spec.value}
                label={spec.label}
                innerRef={(el) => {
                  if (el) specsRef.current[index] = el;
                }}
              />
            ))}
          </div>

          <div ref={ctaRef}>
            <Button href="#repair" variant="primary">
              Explore Battery Technology
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
