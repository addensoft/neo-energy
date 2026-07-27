"use client";

import { BatteryGlyph } from "@/components/battery/battery-glyph";
import { RevealWrapper } from "@/components/motion/reveal-wrapper";
import { Section } from "@/components/section";

import { useObjectRotation } from "./use-object-rotation";

/**
 * Chapter 1 — The Object (Battery Rotation). Creative Direction §2, §10.
 *
 * Wordless by design: "No stat row, no paragraph, no UI chrome competing for
 * attention — this chapter's entire job is to let the audience keep admiring
 * the hardware a little longer before anything is explained." The only text
 * on screen is the single museum-placard-style mono label §2 allows.
 */
export function TheObject() {
  const { stageRef, dragRef, dragHandlers } = useObjectRotation();

  return (
    <Section id="the-object" className="bg-void items-center">
      <RevealWrapper
        variant="blur"
        duration={1.2}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div
          ref={stageRef}
          className="relative aspect-[860/604] w-[min(70vw,820px)] cursor-grab touch-none select-none [transform-style:preserve-3d] active:cursor-grabbing"
          style={{ willChange: "transform" }}
          {...dragHandlers}
        >
          <div ref={dragRef} className="h-full w-full [transform-style:preserve-3d]">
            <BatteryGlyph className="h-full w-full drop-shadow-[0_24px_64px_rgba(0,0,0,0.6)]" />
          </div>
        </div>
      </RevealWrapper>

      <RevealWrapper
        variant="fade"
        delay={0.4}
        className="absolute inset-x-0 bottom-10 flex justify-center md:inset-x-auto md:bottom-12 md:left-12 md:justify-start"
      >
        <span className="text-muted/70 font-mono text-[11px] tracking-[0.16em] uppercase">
          77.94 kWh · 1P116S · Singapore Engineered
        </span>
      </RevealWrapper>
    </Section>
  );
}
