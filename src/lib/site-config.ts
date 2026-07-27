/**
 * Single source of truth for site-wide identity, navigation, and SEO defaults.
 * Sourced from the approved Creative Direction document (§1 Brand Foundation, §12 Premium UI Layout).
 *
 * NOTE: `siteConfig.url` is a placeholder pending the client's production domain —
 * confirm before this value is used in canonical URLs / sitemap / robots at launch.
 */

export const siteConfig = {
  name: "NEO ENERGY",
  legalName: "NEO Energy Battery Services Pte. Ltd.",
  tagline: "Powering the Future",
  description:
    "Singapore's authorised EV battery engineering and component-level repair specialist.",
  url: "https://www.neoenergy.sg",
  locale: "en-SG",
  themeColor: "#05070A",
} as const;

export type NavLink = {
  label: string;
  href: string;
};

/**
 * Primary navigation — per Creative Direction §12: five items maximum.
 */
export const primaryNav: readonly NavLink[] = [
  { label: "Battery Packs", href: "#exploded-view" },
  { label: "Repair Services", href: "#repair" },
  { label: "For Business", href: "#industries" },
  { label: "Certifications", href: "#why-choose-us" },
  { label: "Contact", href: "#cta" },
] as const;

/**
 * "manifesto" and "engineering" stay in the type union (their Sprint 1 shell
 * files still reference them) but are deliberately absent from the active
 * `chapters` registry below — they're on hold per the locked content-order
 * revision, not deleted. `why-choose-us` is the one net-new slot that
 * revision introduced.
 */
export type ChapterId =
  | "hero"
  | "the-object"
  | "exploded-view"
  | "manifesto"
  | "engineering"
  | "repair"
  | "industries"
  | "why-choose-us"
  | "authority"
  | "cta";

export type Chapter = {
  id: ChapterId;
  index: number;
  label: string;
};

/**
 * Homepage chapter registry — drives the section anchor order and each
 * Section's landmark label. Order here is authoritative and reflects the
 * locked content structure (Hero → The Object → Engineering Battery Overview
 * → Component-Level Repair → Industries We Serve → Why Choose NEO ENERGY →
 * Trust & Key Statistics → Final CTA). "Manifesto" and the original
 * "Engineering" deep-dive chapter are on hold and intentionally omitted here.
 */
export const chapters: readonly Chapter[] = [
  { id: "hero", index: 0, label: "Hero" },
  { id: "the-object", index: 1, label: "The Object" },
  { id: "exploded-view", index: 2, label: "Engineering Battery Overview" },
  { id: "repair", index: 3, label: "Component-Level Repair" },
  { id: "industries", index: 4, label: "Industries We Serve" },
  { id: "why-choose-us", index: 5, label: "Why Choose NEO Energy" },
  { id: "authority", index: 6, label: "Trust & Key Statistics" },
  { id: "cta", index: 7, label: "Final Call to Action" },
] as const;
