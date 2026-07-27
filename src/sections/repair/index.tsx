"use client";

import { CircuitBoard, ClipboardCheck, Gauge, ShieldCheck, Wrench } from "lucide-react";

import { RevealWrapper } from "@/components/motion/reveal-wrapper";
import { Section } from "@/components/section";
import { Container, Heading, Paragraph } from "@/components/ui";
import { BusbarsLayer } from "@/sections/exploded-view/pack-layers";

import { CapabilityCard } from "./capability-card";

const CAPABILITIES = [
  {
    icon: CircuitBoard,
    title: "Component-Level Repair",
    description:
      "Down to individual cells, busbars, and BMS boards — not just pack swaps.",
  },
  {
    icon: ClipboardCheck,
    title: "Preventive Maintenance",
    description:
      "Scheduled inspection and servicing that catches issues before they become failures.",
  },
  {
    icon: Wrench,
    title: "Corrective Maintenance",
    description: "Diagnostics-led repair that restores packs to factory specification.",
  },
  {
    icon: Gauge,
    title: "Diagnostics & Testing",
    description:
      "Cell-level and pack-level testing against the same standards as the original manufacturer.",
  },
  {
    icon: ShieldCheck,
    title: "Safety & Quality Assurance",
    description:
      "Every repair verified against GB 38031-2020 and manufacturer tolerances.",
  },
] as const;

/**
 * Component-Level Repair. Creative Direction §2 Chapter 5 ("The Differentiator"),
 * reframed per the locked content order to sit right after the exploded
 * engineering view rather than after a manifesto beat.
 *
 * "Tonal shift from 'product' to 'craft'" (§2) — but craft rendered the same
 * way the rest of the site renders the flagship pack: the busbar layer from
 * Chapter 2's exploded view, reused read-only, faint in the background,
 * because the object being repaired is the same object shown everywhere else.
 */
export function Repair() {
  return (
    <Section id="repair" className="bg-void">
      <RevealWrapper
        variant="fade"
        duration={1.2}
        className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.08]"
      >
        <div className="aspect-[860/604] w-[min(70vw,780px)]">
          <BusbarsLayer className="h-full w-full" />
        </div>
      </RevealWrapper>

      <Container className="relative z-10 flex flex-col items-center gap-16 py-24 text-center">
        <div className="flex flex-col items-center gap-4">
          <RevealWrapper variant="fade">
            <span className="text-ion font-mono text-xs tracking-[0.16em] uppercase">
              Component-Level Repair
            </span>
          </RevealWrapper>
          <RevealWrapper variant="blur" delay={0.1} duration={1}>
            <Heading as="h2" size="xl" className="max-w-4xl uppercase">
              Most Workshops Swap the Pack. We Repair the Component.
            </Heading>
          </RevealWrapper>
          <RevealWrapper variant="fade" delay={0.3}>
            <Paragraph size="lead" className="max-w-xl text-balance">
              From cell to busbar to BMS — Singapore&apos;s only authorised team certified
              to go this deep.
            </Paragraph>
          </RevealWrapper>
        </div>

        <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {CAPABILITIES.map((capability, index) => (
            <CapabilityCard
              key={capability.title}
              icon={capability.icon}
              title={capability.title}
              description={capability.description}
              delay={index * 0.08}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
