import type { WithChildren } from "@/types";

import { HeroPhaseProvider } from "./hero-phase-provider";
import { SmoothScrollProvider } from "./smooth-scroll-provider";

/**
 * AppProviders — single composition point for app-wide client providers.
 * Root layout stays declarative; new providers (e.g. a future analytics or
 * theme provider) get added here, not threaded individually through layout.tsx.
 */
export function AppProviders({ children }: WithChildren) {
  return (
    <HeroPhaseProvider>
      <SmoothScrollProvider>{children}</SmoothScrollProvider>
    </HeroPhaseProvider>
  );
}
