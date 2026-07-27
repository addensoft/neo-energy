import type { Ref } from "react";

import { chapters, type ChapterId } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import type { WithChildren, WithClassName } from "@/types";

/**
 * Section — the full-viewport "scene" wrapper every homepage chapter is built from.
 * Creative Direction §2: "Each chapter is a full-viewport 'scene,' not a stacked
 * content block."
 *
 * Looks up its own index/label from the chapter registry (`site-config.ts`) so the
 * scroll progress rail (§3) and nav anchors always agree with a single source of
 * truth — a chapter's position in `chapters[]` IS its position on the page.
 *
 * Deliberately unstyled beyond layout/structure in Sprint 1: no background imagery,
 * no motion, no chapter-specific visual treatment. Those arrive per-chapter in later
 * sprints, layered on top of this shell via `className`.
 */
type SectionProps = WithChildren<
  WithClassName<{
    id: ChapterId;
    /** React 19 accepts `ref` as a plain prop — no `forwardRef` needed. */
    ref?: Ref<HTMLElement>;
  }>
>;

export function Section({ id, className, children, ref }: SectionProps) {
  const chapter = chapters.find((c) => c.id === id);

  if (!chapter) {
    throw new Error(`Section: unknown chapter id "${id}" — check lib/site-config.ts`);
  }

  return (
    <section
      ref={ref}
      id={id}
      aria-label={chapter.label}
      data-chapter-id={chapter.id}
      data-chapter-index={chapter.index}
      className={cn(
        "relative flex min-h-screen w-full flex-col justify-center overflow-hidden",
        className,
      )}
    >
      {children}
    </section>
  );
}
