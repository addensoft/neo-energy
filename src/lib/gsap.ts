import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Central GSAP registration point. Import `gsap` from this module (not directly
 * from the `gsap` package) anywhere a plugin-dependent tween is needed, so plugin
 * registration always happens exactly once, before first use.
 *
 * Guarded for SSR: GSAP itself is isomorphic, but ScrollTrigger touches `window`
 * and must only register in the browser.
 */
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };
