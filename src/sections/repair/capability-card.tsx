"use client";

import type { LucideIcon } from "lucide-react";
import { useRef } from "react";

import { RevealWrapper } from "@/components/motion/reveal-wrapper";
import { gsap } from "@/lib/gsap";

/**
 * CapabilityCard — one repair-service capability. Hover treatment splits
 * across two systems deliberately: simple property changes (lift, border,
 * icon scale) run on a plain CSS transition using the site's `ease-engineered`
 * token; the light-sweep is a one-shot GSAP tween fired on pointer-enter,
 * matching how Hero's own light sweep is built.
 */
type CapabilityCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  delay?: number;
};

export function CapabilityCard({
  icon: Icon,
  title,
  description,
  delay = 0,
}: CapabilityCardProps) {
  const sweepRef = useRef<HTMLDivElement>(null);

  const handlePointerEnter = () => {
    const el = sweepRef.current;
    if (!el) return;
    gsap.fromTo(
      el,
      { xPercent: -140, autoAlpha: 0.6 },
      { xPercent: 140, autoAlpha: 0, duration: 0.9, ease: "power2.out", overwrite: true },
    );
  };

  return (
    <RevealWrapper variant="blur" delay={delay} duration={0.7}>
      <div
        onPointerEnter={handlePointerEnter}
        className="group border-border bg-graphite/60 hover:border-ion/50 ease-engineered relative flex h-full flex-col gap-4 overflow-hidden rounded-md border p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-ion-glow)]"
      >
        <div
          ref={sweepRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 [mix-blend-mode:screen]"
          style={{
            background:
              "linear-gradient(75deg, transparent 40%, rgba(90,200,255,0.45) 50%, transparent 60%)",
          }}
        />

        <Icon
          className="text-ion ease-engineered h-6 w-6 transition-transform duration-300 group-hover:scale-110"
          strokeWidth={1.5}
        />
        <div className="flex flex-col gap-1.5">
          <h3 className="font-display text-foreground text-base">{title}</h3>
          <p className="font-body text-muted text-sm leading-relaxed">{description}</p>
        </div>
      </div>
    </RevealWrapper>
  );
}
