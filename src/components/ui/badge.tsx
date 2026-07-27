import { cva, type VariantProps } from "class-variance-authority";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import type { WithClassName } from "@/types";

/**
 * Badge — small mono-caps chip. Creative Direction §2 Chapter 4 ("proof chips":
 * Nail penetration · 1m water immersion · Vibration & mechanical shock...) and
 * §7 Color System (Certified Green reserved for pass/certified badges only).
 */
const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-xs uppercase tracking-[0.1em] whitespace-nowrap",
  {
    variants: {
      variant: {
        default: "border-border text-muted",
        ion: "border-ion/40 text-ion",
        certified: "border-certified/40 text-certified",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

type BadgeProps = WithClassName<{
  children?: ReactNode;
}> &
  VariantProps<typeof badgeVariants>;

export function Badge({ variant, className, children }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)}>{children}</span>;
}
