"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

/**
 * HeroPhaseProvider — the one piece of cross-component state the Hero film
 * needs to share: whether Chapter 0's 18-second sequence has finished.
 *
 * Creative Direction §5: the nav stays fully hidden for the entire film and
 * only fades in (still logo-less, "Contact" only) once the hold completes.
 * Hero calls `setPhase("settled")` from its GSAP timeline's completion
 * callback; Navbar reads `phase` to decide whether to render at all.
 */
type HeroPhase = "film" | "settled";

type HeroPhaseContextValue = {
  phase: HeroPhase;
  setPhase: (phase: HeroPhase) => void;
};

const HeroPhaseContext = createContext<HeroPhaseContextValue | null>(null);

export function HeroPhaseProvider({ children }: { children: ReactNode }) {
  const [phase, setPhase] = useState<HeroPhase>("film");
  const value = useMemo(() => ({ phase, setPhase }), [phase]);

  return <HeroPhaseContext.Provider value={value}>{children}</HeroPhaseContext.Provider>;
}

export function useHeroPhase(): HeroPhaseContextValue {
  const ctx = useContext(HeroPhaseContext);
  if (!ctx) {
    throw new Error("useHeroPhase must be used within HeroPhaseProvider");
  }
  return ctx;
}
