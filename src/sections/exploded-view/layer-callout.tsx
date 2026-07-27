import type { RefObject } from "react";

import { cn } from "@/lib/utils";

/**
 * LayerCallout — the label + leader line beside an exploded layer.
 *
 * Positioned at a fixed point (matching that layer's fully-exploded resting
 * height) rather than dynamically tracked against the live-animated layer —
 * simpler and cheaper than per-frame position measurement, and correct here
 * because the layer's final position is deterministic, not user-dragged.
 * Visibility (opacity + the leader line's draw-in) is driven by the same
 * scrubbed timeline as the layers themselves — see use-exploded-scroll.ts.
 *
 * One compact size across all breakpoints (short line, wrapping label)
 * rather than a separate mobile treatment — keeps it inside the viewport
 * down to small phones without a second layout to maintain.
 */
// Tailwind's scanner needs literal class strings, not interpolated ones — the
// `pr-[84px]` / `pl-[84px]` below must stay in sync with LINE_LENGTH by hand.
const LINE_LENGTH = 64;

type LayerCalloutProps = {
  calloutRef: RefObject<HTMLDivElement | null>;
  lineRef: RefObject<SVGLineElement | null>;
  label: string;
  side: "left" | "right";
  top: string;
  className?: string;
};

export function LayerCallout({
  calloutRef,
  lineRef,
  label,
  side,
  top,
  className,
}: LayerCalloutProps) {
  return (
    <div
      ref={calloutRef}
      style={{ top }}
      className={cn(
        "absolute flex items-center gap-2",
        side === "left" ? "right-1/2 flex-row-reverse pr-[84px]" : "left-1/2 pl-[84px]",
        className,
      )}
    >
      <svg
        width={LINE_LENGTH}
        height={2}
        className="shrink-0 overflow-visible"
        aria-hidden="true"
      >
        <line
          ref={lineRef}
          x1={side === "left" ? LINE_LENGTH : 0}
          y1={1}
          x2={side === "left" ? 0 : LINE_LENGTH}
          y2={1}
          stroke="var(--palette-ion)"
          strokeWidth={1}
          strokeOpacity={0.6}
        />
      </svg>
      <span
        className={cn(
          "text-muted w-32 font-mono text-[10px] leading-snug tracking-[0.08em] uppercase sm:w-40",
          side === "left" ? "text-right" : "text-left",
        )}
      >
        {label}
      </span>
    </div>
  );
}
