import {
  Authority,
  CTA,
  FlagshipBattery,
  Hero,
  Repair,
  TrustBar,
  WhyChooseUs,
} from "@/sections";

/**
 * Homepage — locked content order (see `lib/site-config.ts`'s `chapters` registry):
 * Hero → Trust & Technology Bar → Flagship Battery Overview → Component-Level
 * Repair → Why Choose NEO Energy → Trust & Key Statistics → Final CTA. The
 * Object, Exploded View, and Industries are on hold (Flagship Battery
 * Overview now covers The Object/Exploded View's ground; Industries/"For
 * Business" was pulled, nav item and section both, per direct instruction)
 * — see `lib/site-config.ts`. Navbar/Footer are rendered once in the root
 * layout, not per-page, since they're global chrome rather than homepage
 * chapters.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <FlagshipBattery />
      <Repair />
      <WhyChooseUs />
      <Authority />
      <CTA />
    </>
  );
}
