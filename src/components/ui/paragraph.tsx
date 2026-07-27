import { cva, type VariantProps } from "class-variance-authority";
import type { ElementType } from "react";

import { cn } from "@/lib/utils";
import type { PolymorphicProps } from "@/types";

/**
 * Paragraph — the humanist body voice. Creative Direction §6 Typography System.
 *
 * "A neutral, highly legible sans... for paragraph copy, audience descriptions,
 * and UI labels — quiet and functional, never competing with the display face."
 */
const paragraphVariants = cva("font-body text-muted", {
  variants: {
    size: {
      lead: "text-xl leading-relaxed lg:text-2xl",
      base: "text-base leading-relaxed",
      sm: "text-sm leading-relaxed",
    },
  },
  defaultVariants: {
    size: "base",
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
