"use client";

import Image from "next/image";
import { useRef } from "react";

import { Section } from "@/components/section";
import { Button, Container, Heading } from "@/components/ui";

import { AdvantageItem } from "./advantage-item";
import { useWhyChooseUsReveal } from "./use-why-choose-us-reveal";

const ADVANTAGES = [
  "Singapore's authorised EV battery engineering specialist",
  "Component-level battery diagnostics and repair",
  "Partnerships with leading global battery manufacturers",
  "Advanced battery testing and thermal management",
  "Safety-first engineering and certified repair standards",
  "Trusted by fleets, dealerships and enterprise customers",
] as const;

/**
 * Why Choose NEO ENERGY — differentiators checklist (left) + the client-
 * supplied circuit-board/battery-chip artwork (right), continuing straight
 * from the locked Component-Level Repair section.
 */
export function WhyChooseUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const artworkRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLLIElement[]>([]);

  useWhyChooseUsReveal({ sectionRef, headingRef, artworkRef, itemsRef, ctaRef });

  return (
    <Section id="why-choose-us" ref={sectionRef} className="bg-void py-24 lg:py-32">
      <div
        aria-hidden="true"
        className="bg-ion/15 pointer-events-none absolute top-1/2 right-1/4 h-[36rem] w-[36rem] translate-x-1/2 -translate-y-1/2 rounded-full blur-[140px]"
      />

      <Container className="relative z-10 grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
        {/* Left — heading, checklist, CTA */}
        <div className="flex flex-col gap-8">
          <div ref={headingRef}>
            <Heading as="h2" size="h2" className="uppercase">
              Why Choose NEO ENERGY?
            </Heading>
          </div>

          <ul className="flex flex-col gap-4">
            {ADVANTAGES.map((text, index) => (
              <AdvantageItem
                key={text}
                text={text}
                innerRef={(el) => {
                  if (el) itemsRef.current[index] = el;
                }}
              />
            ))}
          </ul>

          <div ref={ctaRef}>
            <Button href="#cta" variant="primary">
              Learn More About NEO ENERGY
            </Button>
          </div>
        </div>

        {/* Right — circuit-board / battery-chip artwork. No frame/border/shadow
            on purpose: a soft radial fade dissolves the image into the
            section's own void background instead of reading as a boxed
            photo, so it feels like ambient scene lighting, not a card. */}
        <div ref={artworkRef} className="relative">
          <div
            className="relative aspect-[7/5] overflow-hidden"
            style={{
              maskImage:
                "radial-gradient(ellipse 75% 75% at center, black 45%, transparent 100%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 75% 75% at center, black 45%, transparent 100%)",
            }}
          >
            <Image
              src="/images/why-choose-chip.webp"
              alt="NEO ENERGY battery cell glowing on a circuit board chip"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
              priority={false}
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}
