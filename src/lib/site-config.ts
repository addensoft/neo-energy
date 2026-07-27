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
  // NEO Energy is a leading EV battery engineering and technology company, not a
  // repair workshop — component-level repair is one differentiator among several,
  // not the brand's core identity. Keep future copy framed accordingly.
  description:
    "Singapore's leading EV battery engineering and technology company — authorised partner across CATL, CALB, and BYD battery technologies.",
  url: "https://www.neoenergy.sg",
  // Placeholder pending the client's real inbox — same status as `url` above.
  contactEmail: "contact@neoenergy.sg",
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
  { label: "Battery Packs", href: "#flagship-battery" },
  { label: "Repair Services", href: "#repair" },
  { label: "Why Choose Us", href: "#why-choose-us" },
  { label: "Contact", href: "#cta" },
] as const;

/**
 * "the-object", "exploded-view", "manifesto", "engineering", and "industries"
 * stay in the type union (their shell/full-build files still reference them)
 * but are deliberately absent from the active `chapters` registry below — on
 * hold per the locked content-order revision, not deleted. The Object and
 * the Exploded View were pulled because Flagship Battery Overview now covers
 * that same "battery spec overview" ground; Industries ("For Business") was
 * pulled — nav item and section both — per direct instruction, since it was
 * still an unbuilt empty shell. Files are untouched and can be re-slotted
 * back in later if needed.
 */
export type ChapterId =
  | "hero"
  | "trust-bar"
  | "flagship-battery"
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
 * locked content structure (Hero → Trust & Technology Bar → Flagship Battery
 * Overview → Component-Level Repair → Why Choose NEO ENERGY → Trust & Key
 * Statistics → Final CTA). "The Object", "Exploded View", "Manifesto",
 * "Engineering", and "Industries" are on hold and intentionally omitted here.
 */
export const chapters: readonly Chapter[] = [
  { id: "hero", index: 0, label: "Hero" },
  { id: "trust-bar", index: 1, label: "Trust & Technology" },
  { id: "flagship-battery", index: 2, label: "Flagship Battery Overview" },
  { id: "repair", index: 3, label: "Component-Level Repair" },
  { id: "why-choose-us", index: 4, label: "Why Choose NEO Energy" },
  { id: "authority", index: 5, label: "Trust & Key Statistics" },
  { id: "cta", index: 6, label: "Final Call to Action" },
] as const;
