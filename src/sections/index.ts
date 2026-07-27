/**
 * Homepage chapter shells, in the locked content-order (see `lib/site-config.ts`'s
 * `chapters` registry). `page.tsx` composes these directly — this barrel exists
 * so the render order in page.tsx visually matches the order they're exported here.
 *
 * "The Object", "Exploded View", "Manifesto", "Engineering", and "Industries"
 * remain as unused shells (on hold, not deleted) and are intentionally not
 * exported here while they're out of the active order — Flagship Battery
 * Overview now covers the same ground The Object / Exploded View did, and
 * Industries ("For Business") was pulled, nav item and section both, per
 * direct instruction.
 */
export { Hero } from "./hero";
export { TrustBar } from "./trust-bar";
export { FlagshipBattery } from "./flagship-battery";
export { Repair } from "./repair";
export { WhyChooseUs } from "./why-choose-us";
export { Authority } from "./authority";
export { CTA } from "./cta";
