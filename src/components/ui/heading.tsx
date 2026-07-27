import { cva, type VariantProps } from "class-variance-authority";
import type { ElementType } from "react";

import { cn } from "@/lib/utils";
import type { PolymorphicProps } from "@/types";

/**
 * Heading — the display/headline voice. Creative Direction §6 Typography System.
 *
 * "Display / Headline voice — Geometric Grotesk... tight tracking on large sizes,
 * all-caps for hero statements, upper/lowercase for manifesto-style lines."
 *
 * `size` is purely visual; `as` controls the semantic HTML heading level. The two
 * are deliberately decoupled — a chapter's biggest headline is not always an <h1>,
 * and screen-reader heading order must follow document structure, not scale.
 */
const headingVariants = cva("font-display text-balance text-foreground", {
  variants: {
    size: {
      hero: "text-[10vw] leading-[0.95] tracking-tight lg:text-[8vw]",
      xl: "text-5xl leading-[1.05] tracking-tight lg:text-7xl",
      lg: "text-4xl leading-tight tracking-tight lg:text-5xl",
      md: "text-2xl leading-tight tracking-tight lg:text-3xl",
      sm: "text-lg leading-snug tracking-tight lg:text-xl",
    },
  },
  defaultVariants: {
    size: "lg",
  },
});

type HeadingProps<T extends ElementType> = PolymorphicProps<{
  as?: T;
}> &
  VariantProps<typeof headingVariants>;

export function Heading<T extends ElementType = "h2">({
  as,
  size,
  className,
  children,
}: HeadingProps<T>) {
  const Component = as ?? "h2";

  return (
    <Component className={cn(headingVariants({ size }), className)}>{children}</Component>
  );
}
