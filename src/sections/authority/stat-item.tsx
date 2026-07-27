"use client";

import type { LucideIcon } from "lucide-react";

type StatItemProps = {
  icon: LucideIcon;
  value: string;
  label: string;
  innerRef: (el: HTMLDivElement | null) => void;
};

export function StatItem({ icon: Icon, value, label, innerRef }: StatItemProps) {
  return (
    <div ref={innerRef} className="flex flex-1 items-center gap-3 px-2 py-6 lg:px-6">
      <Icon className="text-ion h-7 w-7 shrink-0" strokeWidth={1.5} />
      <div className="flex flex-col gap-0.5">
        <span className="text-spec-value font-display">{value}</span>
        <span className="text-label-sm font-body">{label}</span>
      </div>
    </div>
  );
}
