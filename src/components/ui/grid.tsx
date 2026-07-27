import { cn } from "@/lib/utils";
import type { PolymorphicProps } from "@/types";

/**
 * Grid — the 12-column grid referenced throughout Creative Direction §12.
 * A thin, explicit wrapper around CSS grid rather than a class-name convention,
 * so every chapter lays content out on the same underlying structure.
 */
type GridProps = PolymorphicProps<{
  /** Number of columns at the `lg` breakpoint and above. Defaults to the site's 12-col grid. */
  columns?: 12 | 6 | 4;
  gap?: "sm" | "md" | "lg";
}>;

const gapClasses: Record<NonNullable<GridProps["gap"]>, string> = {
  sm: "gap-4",
  md: "gap-6 lg:gap-8",
  lg: "gap-8 lg:gap-12",
};

const columnClasses: Record<NonNullable<GridProps["columns"]>, string> = {
  12: "grid-cols-4 md:grid-cols-8 lg:grid-cols-12",
  6: "grid-cols-2 md:grid-cols-4 lg:grid-cols-6",
  4: "grid-cols-2 lg:grid-cols-4",
};

export function Grid({ columns = 12, gap = "md", className, children }: GridProps) {
  return (
    <div className={cn("grid", columnClasses[columns], gapClasses[gap], className)}>
      {children}
    </div>
  );
}

/**
 * GridItem — optional column-span helper for direct children of `Grid`.
 * Purely a convenience; consumers may also just use Tailwind's `col-span-*` directly.
 */
type GridItemProps = PolymorphicProps<{
  span?: number;
}>;

export function GridItem({ span, className, children }: GridItemProps) {
  return (
    <div
      className={className}
      style={span ? { gridColumn: `span ${span} / span ${span}` } : undefined}
    >
      {children}
    </div>
  );
}
