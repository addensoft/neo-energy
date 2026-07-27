import { cva, type VariantProps } from "class-variance-authority";
import type { ElementType } from "react";

import { cn } from "@/lib/utils";
import type { PolymorphicProps } from "@/types";

/**
 * Heading — the display/headline voice, driven by the site-wide typography
 * system (globals.css `.text-h2/h3/h4`). `size` is purely visual; `as`
 * controls the semantic HTML heading level — the two are deliberately
 * decoupled, since a chapter's biggest headline is not always an <h1> and
 * screen-reader heading order must follow document structure, not scale.
 *
 * `hero` is the one exception: Hero's headline is approved and frozen, so
 * this variant's values are intentionally left exactly as they were rather
 * than migrated to the new scale — it's the only thing still consuming it.
 * Every other section uses h2/h3/h4.
 */
const headingVariants = cva("font-display text-balance text-foreground", {
  variants: {
    size: {
      hero: "text-[10vw] leading-[0.95] tracking-tight lg:text-[8vw]",
      h2: "text-h2",
      h3: "text-h3",
      h4: "text-h4",
    },
  },
  defaultVariants: {
    size: "h2",
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
