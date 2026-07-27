"use client";

import { useMemo, useRef } from "react";

import { RevealWrapper } from "@/components/motion/reveal-wrapper";
import { Section } from "@/components/section";
import { Heading, Paragraph } from "@/components/ui";

import { Hotspot } from "./hotspot";
import { LayerCallout } from "./layer-callout";
import {
  BduBmsLayer,
  BusbarsLayer,
  CellBlocksLayer,
  CoolingPlateLayer,
  TopCoverLayer,
  TrayLayer,
} from "./pack-layers";
import { SpecRow } from "./spec-row";
import { useExplodedScroll } from "./use-exploded-scroll";

const LAYERS = [
  {
    key: "tray",
    Component: TrayLayer,
    label: "Extruded Frame — AL6061-T6 · 22 Mounting Points",
    side: "left" as const,
    top: "78%",
  },
  {
    key: "cooling",
    Component: CoolingPlateLayer,
    label: "Liquid Cooling Plate — AL3003, Dual-Layer",
    side: "right" as const,
    top: "64%",
  },
  {
    key: "bdu",
    Component: BduBmsLayer,
    label: "BDU + BMS-L1.1 — One Master, One Slave",
    side: "left" as const,
    top: "50%",
  },
  {
    key: "cells",
    Component: CellBlocksLayer,
    label: "1P116S CIR Architecture — 214Ah LFP Cells",
    side: "right" as const,
    top: "36%",
  },
  {
    key: "busbars",
    Component: BusbarsLayer,
    label: "CCS + Busbars — AL1060, Laser-Welded",
    side: "left" as const,
    top: "22%",
  },
  {
    key: "topCover",
    Component: TopCoverLayer,
    label: "Top Cover — DC06 Steel, Electrophoretic Coating",
    side: "right" as const,
    top: "8%",
  },
] as const;

const HOTSPOTS = [
  {
    style: { left: "28%", top: "60%" },
    label: "Thermal Management",
    detail:
      "Dual-layer liquid cooling keeps busbar temperature under 55°C even at peak 30–80% fast-charge load.",
    cardSide: "right" as const,
  },
  {
    style: { left: "72%", top: "48%" },
    label: "Cycle Life",
    detail:
      "93.8% capacity retention after 500 cycles at 25°C — measured on the same 214Ah cell used in every pack.",
    cardSide: "left" as const,
  },
  {
    style: { left: "50%", top: "82%" },
    label: "Safety Rating",
    detail:
      "Certified to GB 38031-2020 — nail penetration, 1m water immersion, and mechanical shock, all without fire or explosion.",
    cardSide: "right" as const,
  },
];

const HEADER = (
  <>
    <span className="text-ion font-mono text-xs tracking-[0.16em] uppercase">
      The Pack
    </span>
    <Heading as="h2" size="h2" className="max-w-3xl uppercase">
      One Pack. Twenty-Two Mounting Points. Zero Compromise.
    </Heading>
    <Paragraph size="body" className="max-w-md text-balance">
      The same flagship pack from the opening film, opened layer by layer.
    </Paragraph>
  </>
);

/**
 * Chapter 2 — The Pack (Exploded Engineering View). Creative Direction §2, §10.
 *
 * The same flagship pack from Hero/Chapter 1, disassembled under scroll
 * control: tray → cooling plate → BDU/BMS → CIR cell blocks → busbars → top
 * cover. Assembled, the layers occlude into the same silhouette Chapter 1
 * rests on; exploded, each layer gets a real engineering callout, and three
 * hotspots surface deeper spec detail on demand.
 *
 * Built from an independent geometry module (pack-geometry.ts) rather than
 * importing Chapter 1's battery-glyph.tsx — that file is approved/frozen and
 * intentionally untouched.
 *
 * Two layouts, not one responsive layout: the pinned scroll-scrub with
 * side-by-side leader-line callouts genuinely doesn't fit below `lg` (the
 * callouts need room on both sides of a pack that's already using most of a
 * narrow viewport's width). Below `lg`, the exploded diagram is replaced with
 * the assembled pack, a plain readable breakdown list, and the same spec row
 * and hotspots — same content, laid out for a column instead of a stage.
 */
export function ExplodedView() {
  const stageRef = useRef<HTMLDivElement>(null);
  const specRowRef = useRef<HTMLDivElement>(null);
  const mobileSpecRowRef = useRef<HTMLDivElement>(null);
  const hotspotsRef = useRef<HTMLDivElement>(null);

  const trayRef = useRef<HTMLDivElement>(null);
  const coolingRef = useRef<HTMLDivElement>(null);
  const bduRef = useRef<HTMLDivElement>(null);
  const cellsRef = useRef<HTMLDivElement>(null);
  const busbarsRef = useRef<HTMLDivElement>(null);
  const topCoverRef = useRef<HTMLDivElement>(null);
  // Memoized: without this, the object literal is rebuilt every render, the
  // scroll hook's effect deps never settle, and the ScrollTrigger pin gets
  // torn down and recreated on every re-render instead of staying mounted.
  const layerRefs = useMemo(
    () => ({
      tray: trayRef,
      cooling: coolingRef,
      bdu: bduRef,
      cells: cellsRef,
      busbars: busbarsRef,
      topCover: topCoverRef,
    }),
    [],
  );

  const trayCalloutRef = useRef<HTMLDivElement>(null);
  const coolingCalloutRef = useRef<HTMLDivElement>(null);
  const bduCalloutRef = useRef<HTMLDivElement>(null);
  const cellsCalloutRef = useRef<HTMLDivElement>(null);
  const busbarsCalloutRef = useRef<HTMLDivElement>(null);
  const topCoverCalloutRef = useRef<HTMLDivElement>(null);
  const calloutRefs = useMemo(
    () => ({
      tray: trayCalloutRef,
      cooling: coolingCalloutRef,
      bdu: bduCalloutRef,
      cells: cellsCalloutRef,
      busbars: busbarsCalloutRef,
      topCover: topCoverCalloutRef,
    }),
    [],
  );

  const trayLineRef = useRef<SVGLineElement>(null);
  const coolingLineRef = useRef<SVGLineElement>(null);
  const bduLineRef = useRef<SVGLineElement>(null);
  const cellsLineRef = useRef<SVGLineElement>(null);
  const busbarsLineRef = useRef<SVGLineElement>(null);
  const topCoverLineRef = useRef<SVGLineElement>(null);
  const lineRefs = useMemo(
    () => ({
      tray: trayLineRef,
      cooling: coolingLineRef,
      bdu: bduLineRef,
      cells: cellsLineRef,
      busbars: busbarsLineRef,
      topCover: topCoverLineRef,
    }),
    [],
  );

  useExplodedScroll(layerRefs, calloutRefs, lineRefs, stageRef, specRowRef, hotspotsRef);

  return (
    <Section id="exploded-view" className="bg-void overflow-visible lg:overflow-hidden">
      {/* Desktop / lg+: pinned scroll-scrub, exploded diagram with leader-line callouts. */}
      <div className="hidden lg:contents">
        <RevealWrapper
          variant="blur"
          className="px-gutter absolute inset-x-0 top-[6%] z-10 flex flex-col items-center gap-3 text-center"
        >
          {HEADER}
        </RevealWrapper>

        <div
          ref={stageRef}
          className="absolute inset-x-0 bottom-[20%] flex justify-center [perspective:1600px] [transform-style:preserve-3d]"
        >
          <div className="relative aspect-[860/604] w-[min(56vw,660px)] [transform-style:preserve-3d]">
            {LAYERS.map(({ key, Component }) => (
              <div
                key={key}
                ref={layerRefs[key]}
                className="absolute inset-0 [transform-style:preserve-3d]"
                style={{ willChange: "transform, opacity" }}
              >
                <Component className="h-full w-full" />
              </div>
            ))}

            {LAYERS.map(({ key, label, side, top }) => (
              <LayerCallout
                key={key}
                calloutRef={calloutRefs[key]}
                lineRef={lineRefs[key]}
                label={label}
                side={side}
                top={top}
              />
            ))}

            <div ref={hotspotsRef}>
              {HOTSPOTS.map((h, i) => (
                <Hotspot
                  key={i}
                  style={h.style}
                  label={h.label}
                  detail={h.detail}
                  cardSide={h.cardSide}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="px-gutter absolute inset-x-0 bottom-[6%] flex justify-center">
          <SpecRow rowRef={specRowRef} />
        </div>
      </div>

      {/* Below lg: assembled pack + a readable breakdown, normal document flow. */}
      <div className="px-gutter flex flex-col items-center gap-10 py-24 text-center lg:hidden">
        <div className="flex flex-col items-center gap-3">{HEADER}</div>

        <RevealWrapper
          variant="fade"
          className="relative aspect-[860/604] w-[min(84vw,480px)]"
        >
          <TopCoverLayer className="h-full w-full" />
          {HOTSPOTS.map((h, i) => (
            <Hotspot
              key={i}
              style={h.style}
              label={h.label}
              detail={h.detail}
              cardSide={h.cardSide}
            />
          ))}
        </RevealWrapper>

        <RevealWrapper
          variant="fade"
          className="grid w-full max-w-sm grid-cols-1 gap-x-6 gap-y-3 text-left sm:grid-cols-2"
        >
          {LAYERS.slice()
            .reverse()
            .map(({ key, label }) => (
              <div key={key} className="flex items-start gap-2">
                <span className="bg-ion mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" />
                <span className="text-muted font-mono text-[11px] tracking-[0.06em] uppercase">
                  {label}
                </span>
              </div>
            ))}
        </RevealWrapper>

        <RevealWrapper variant="fade">
          <SpecRow rowRef={mobileSpecRowRef} />
        </RevealWrapper>
      </div>
    </Section>
  );
}
