import type { RefObject } from "react";

import { Stat, StatRow } from "@/components/ui";

/**
 * SpecRow — the quantitative proof beneath the exploded diagram. Real figures
 * from the engineering dossier, not placeholder numbers — same discipline as
 * the Creative Direction's Chapter 4 stat row, applied here to the pack's
 * structural specs rather than its electrical ones.
 */
export function SpecRow({ rowRef }: { rowRef: RefObject<HTMLDivElement | null> }) {
  return (
    <div ref={rowRef}>
      <StatRow>
        <Stat value="77.94 kWh" label="Total Energy" />
        <Stat value="≤ 550 kg" label="Pack Weight" />
        <Stat value="1878 × 1320mm" label="Footprint" />
        <Stat value="22" label="Mounting Points" />
      </StatRow>
    </div>
  );
}
