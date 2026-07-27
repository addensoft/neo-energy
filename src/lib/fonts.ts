import { Geist, Geist_Mono, Inter } from "next/font/google";

/**
 * Type system — Creative Direction §6.
 *
 * Three voices, never mixed:
 *  - `--font-display` (Geist)      → headline / hero voice. Geometric grotesk substitute
 *                                     for the recommended Neue Haas Grotesk Display /
 *                                     Founders Grotesk (self-hostable, zero licensing cost).
 *  - `--font-mono`    (Geist Mono) → technical / data voice. Reserved exclusively for
 *                                     numerals, specs, units, callout labels.
 *  - `--font-body`    (Inter)      → humanist sans body voice. Paragraph copy, UI labels.
 */

// Raw variable names are intentionally distinct from the `--font-display` /
// `--font-mono` / `--font-body` theme tokens they feed in globals.css — Tailwind
// v4's `@theme inline` maps one to the other; giving both layers the same name
// would create a self-referential CSS variable.
export const fontDisplay = Geist({
  variable: "--font-geist-display",
  subsets: ["latin"],
  display: "swap",
});

export const fontMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const fontBody = Inter({
  variable: "--font-inter-body",
  subsets: ["latin"],
  display: "swap",
});

export const fontVariables = `${fontDisplay.variable} ${fontMono.variable} ${fontBody.variable}`;
