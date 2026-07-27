"use client";

import { useLayoutEffect, useState } from "react";

/**
 * Tracks the user's `prefers-reduced-motion` OS/browser setting.
 *
 * Accessibility strategy (Creative Direction is motion-heavy by design — §4, §9):
 * every scroll-jacked, cinematic, or auto-playing sequence built in later sprints
 * must check this hook and fall back to a static or instantly-settled state rather
 * than forcing motion on users who have opted out at the system level.
 *
 * Uses `useLayoutEffect` (not `useEffect`) so the check resolves before first
 * paint — consumers like the Hero film gate an entire GSAP timeline on this
 * value, and a passive-effect delay would let one frame of full motion start
 * before correcting itself.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useLayoutEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(query.matches);

    const listener = (event: MediaQueryListEvent) => setReduced(event.matches);
    query.addEventListener("change", listener);
    return () => query.removeEventListener("change", listener);
  }, []);

  return reduced;
}
