import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site-config";

/**
 * Minimal web app manifest. Icon set is a placeholder (the scaffold favicon
 * only) — production icons (various sizes, maskable variant) are a design
 * asset dependency, not a Sprint 1 concern.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteConfig.name} — ${siteConfig.tagline}`,
    short_name: siteConfig.name,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: siteConfig.themeColor,
    theme_color: siteConfig.themeColor,
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
