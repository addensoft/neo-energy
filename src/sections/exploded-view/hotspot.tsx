"use client";

import { useState, type CSSProperties } from "react";

import { RevealWrapper } from "@/components/motion/reveal-wrapper";
import { cn } from "@/lib/utils";

/**
 * Hotspot — Creative Direction §10: "small pulsing Ion Blue dots... hover/tap
 * reveals a technical callout card." Click-to-toggle (not hover-only) so it
 * works identically on touch and mouse — hover-only affordances don't exist
 * on the devices most fleet/insurance visitors are likely browsing on.
 */
type HotspotProps = {
  style: CSSProperties;
  label: string;
  detail: string;
  cardSide?: "left" | "right";
};

export function Hotspot({ style, label, detail, cardSide = "right" }: HotspotProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="absolute" style={style}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={label}
        className="border-ion/60 bg-ion/20 relative flex h-3 w-3 items-center justify-center rounded-full border"
      >
        <span className="bg-ion absolute h-full w-full animate-ping rounded-full opacity-60" />
        <span className="bg-ion-light relative h-1.5 w-1.5 rounded-full" />
      </button>

      <RevealWrapper
        show={open}
        variant="fade"
        duration={0.2}
        className={cn(
          "border-border bg-graphite/95 absolute top-1/2 w-56 -translate-y-1/2 rounded-sm border p-3 shadow-[var(--shadow-elevation-md)] backdrop-blur-sm",
          cardSide === "right" ? "left-5" : "right-5",
          open ? "pointer-events-auto" : "pointer-events-none",
        )}
      >
        <p className="text-foreground font-mono text-[11px] tracking-[0.08em] uppercase">
          {label}
        </p>
        <p className="text-muted font-body mt-1.5 text-xs leading-relaxed">{detail}</p>
      </RevealWrapper>
    </div>
  );
}
