/**
 * Motion tokens — Creative Direction §4 (Motion Design Concepts) and §9 (Animation Timeline).
 *
 * These are the JS-side counterparts to the CSS easing tokens in `globals.css`.
 * GSAP and Framer Motion both consume plain numbers/arrays for duration and easing,
 * so the canonical values live here rather than as CSS custom properties — components
 * import from this module instead of hand-rolling timing values inline.
 *
 * Single source of truth so every chapter's ambient/idle motion reads as the
 * same "camera language" (Creative Direction §14) instead of each component
 * inventing its own curve.
 */

/** The site's signature "engineered ease" — slow magnetic acceleration into a crisp, damped stop. */
export const EASE_ENGINEERED = [0.16, 1, 0.3, 1] as const;

/** GSAP-compatible cubic-bezier string form of the same curve. */
export const EASE_ENGINEERED_CSS = "cubic-bezier(0.16, 1, 0.3, 1)";

export const EASE_STANDARD = [0.4, 0, 0.2, 1] as const;

export const DURATION = {
  fast: 0.3,
  base: 0.6,
  slow: 0.9,
  cinematic: 1.2,
} as const;

/**
 * The battery's continuous idle rotation — used by Hero's post-film loop and
 * Chapter 1's ambient orbit. Same object, same "presentation, not a spin"
 * quality (§5), everywhere it idles.
 */
export const AMBIENT_ROTATION = {
  range: 6,
  duration: 6,
  ease: "sine.inOut",
} as const;

/** Chapter 1 (The Object) drag interaction — Creative Direction §10. */
export const DRAG_ROTATION = {
  maxY: 22,
  maxX: 10,
  sensitivity: 0.28,
  releaseDuration: 0.7,
  releaseEase: "power3.out",
} as const;
