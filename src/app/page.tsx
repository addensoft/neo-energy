import {
  Authority,
  CTA,
  ExplodedView,
  Hero,
  Industries,
  Repair,
  TheObject,
  WhyChooseUs,
} from "@/sections";

/**
 * Homepage — locked content order (see `lib/site-config.ts`'s `chapters` registry):
 * Hero → The Object → Engineering Battery Overview → Component-Level Repair →
 * Industries We Serve → Why Choose NEO Energy → Trust & Key Statistics → Final CTA.
 * Navbar/Footer are rendered once in the root layout, not per-page, since
 * they're global chrome rather than homepage chapters.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <TheObject />
      <ExplodedView />
      <Repair />
      <Industries />
      <WhyChooseUs />
      <Authority />
      <CTA />
    </>
  );
}
