"use client";

import type { LucideIcon } from "lucide-react";

/**
 * A single engineering spec entry — icon, value, label, and a thin top divider.
 * Deliberately not a bordered/shadowed "feature card" (that's CapabilityCard's
 * territory in the Repair section) — this is meant to read as a spec sheet line
 * item, closer to `Stat`'s mono data voice than to a product-marketing tile.
 */
type SpecItemProps = {
  icon: LucideIcon;
  value: string;
  label: string;
  innerRef: (el: HTMLDivElement | null) => void;
};

export function SpecItem({ icon: Icon, value, label, innerRef }: SpecItemProps) {
  return (
    <div ref={innerRef} className="border-border flex items-start gap-3 border-t pt-4">
      <Icon className="text-ion mt-0.5 h-5 w-5 shrink-0" strokeWidth={1.5} />
      <div className="flex flex-col gap-0.5">
        <span className="text-spec-label font-mono">{value}</span>
        <span className="text-label-sm font-mono">{label}</span>
      </div>
    </div>
  );
}
