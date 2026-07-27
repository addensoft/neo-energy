/**
 * hero-frames — metadata for the real Hero film, extracted to a WebP frame
 * sequence for scroll-scrubbing (Creative Direction §5/§9, Sprint 3 revision).
 *
 * Source: /herovideo.mp4 (1920×1080, H.264, 24fps, 12.04s, 289 frames).
 * Frames were extracted at 1600×900 and re-encoded as WebP (~10MB total for
 * the full sequence) — a canvas image sequence rather than `<video>.currentTime`
 * scrubbing, because native video seeking is throttled and keyframe-limited
 * and stutters under fast/reverse scroll; drawing a preloaded still frame to
 * canvas is instant and frame-accurate regardless of scroll speed or direction.
 */
export const HERO_FRAME_COUNT = 289;

export function heroFramePath(oneBasedIndex: number): string {
  const n = String(oneBasedIndex).padStart(4, "0");
  return `/hero-frames/frame-${n}.webp`;
}

/**
 * Where the headline/subline/signature land, as fractions of total scroll
 * progress (0–1) — re-tuned to the real film's pacing rather than the
 * placeholder's invented 18s beats. The film's final third dissolves into an
 * abstract light bloom, which reads beautifully as a backdrop for the
 * tagline materialising out of it.
 */
export const HERO_TEXT_TIMING = {
  scrimStart: 0.76,
  headlineStart: 0.76,
  sublineStart: 0.82,
  signatureStart: 0.9,
} as const;
