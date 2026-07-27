/**
 * Homepage chapter shells, in the locked content-order (see `lib/site-config.ts`'s
 * `chapters` registry). `page.tsx` composes these directly — this barrel exists
 * so the render order in page.tsx visually matches the order they're exported here.
 *
 * "Manifesto" and "Engineering" remain as unused shells (on hold, not deleted)
 * and are intentionally not exported here while they're out of the active order.
 */
export { Hero } from "./hero";
export { TheObject } from "./the-object";
export { ExplodedView } from "./exploded-view";
export { Repair } from "./repair";
export { Industries } from "./industries";
export { WhyChooseUs } from "./why-choose-us";
export { Authority } from "./authority";
export { CTA } from "./cta";
