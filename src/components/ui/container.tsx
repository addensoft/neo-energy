import { cva, type VariantProps } from "class-variance-authority";
import type { ElementType } from "react";

import { cn } from "@/lib/utils";
import type { PolymorphicProps } from "@/types";

/**
 * Container — Creative Direction §12 Premium UI Layout.
 *
 * "12-column grid, generous outer margin (min 64–96px desktop), max content width
 * capped (~1440–1600px) so the experience stays cinematic on ultrawide monitors
 * rather than stretching thin."
 *
 * `full` intentionally has no max-width or padding — it's for full-bleed cinematic
 * backgrounds (hero film, chapter video layers) that content containers sit inside of.
 */
const containerVariants = cva("mx-auto w-full", {
  variants: {
    size: {
      default: "max-w-[1600px] px-gutter lg:px-gutter-lg",
      narrow: "max-w-[900px] px-gutter lg:px-gutter-lg",
      full: "max-w-none",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

type ContainerProps<T extends ElementType> = PolymorphicProps<{
  as?: T;
}> &
  VariantProps<typeof containerVariants>;

export function Container<T extends ElementType = "div">({
  as,
  size,
  className,
  children,
}: ContainerProps<T>) {
  const Component = as ?? "div";

  return (
    <Component className={cn(containerVariants({ size }), className)}>
      {children}
    </Component>
  );
}
