import { cva, type VariantProps } from "class-variance-authority";
import type { ElementType } from "react";

import { cn } from "@/lib/utils";
import type { PolymorphicProps } from "@/types";

/**
 * Paragraph — the humanist body voice, driven by the site-wide typography
 * system (globals.css `.text-body`: one size, one color, one max-width,
 * everywhere — no per-section paragraph scales).
 *
 * `lead` is the one exception: Hero's subline is approved and frozen, so
 * this variant's values are intentionally left exactly as they were rather
 * than migrated to the new scale — it's the only thing still consuming it.
 * Every other section uses `body`.
 */
const paragraphVariants = cva("font-body", {
  variants: {
    size: {
      lead: "text-muted text-xl leading-relaxed lg:text-2xl",
      body: "text-body",
    },
  },
  defaultVariants: {
    size: "body",
  },
});

type ParagraphProps<T extends ElementType> = PolymorphicProps<{
  as?: T;
}> &
  VariantProps<typeof paragraphVariants>;

export function Paragraph<T extends ElementType = "p">({
  as,
  size,
  className,
  children,
}: ParagraphProps<T>) {
  const Component = as ?? "p";

  return (
    <Component className={cn(paragraphVariants({ size }), className)}>
      {children}
    </Component>
  );
}
