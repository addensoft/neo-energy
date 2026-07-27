import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import type { WithClassName } from "@/types";

/**
 * Stat — the technical/data voice. Creative Direction §6 and §12.
 *
 * "Stat rows use the mono type voice in a horizontal card rail with thin 1px
 * dividers — same visual grammar as a Rimac or DJI spec sheet."
 *
 * Renders statically for now. §4 specifies stat numerals count up from 0 on
 * scroll-into-view — that behaviour is a Sprint 2+ motion concern layered on
 * top of this component, not part of its Sprint 1 structure.
 */
type StatProps = WithClassName<{
  value: string;
  label: string;
}>;

export function Stat({ value, label, className }: StatProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <span className="text-spec-value font-mono">{value}</span>
      <span className="text-label-sm font-mono">{label}</span>
    </div>
  );
}

/**
 * StatRow — the horizontal card rail wrapper with thin dividers between `Stat` children.
 */
export function StatRow({ className, children }: WithClassName<{ children: ReactNode }>) {
  return (
    <div
      className={cn(
        "divide-border flex flex-col divide-y sm:flex-row sm:divide-x sm:divide-y-0",
        className,
      )}
    >
      {Array.isArray(children)
        ? children.map((child, index) => (
            <div key={index} className="flex-1 py-4 sm:px-6 sm:py-0 first:sm:pl-0">
              {child}
            </div>
          ))
        : children}
    </div>
  );
}
