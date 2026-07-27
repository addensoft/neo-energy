import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Compile-time-checked `href`s (Link, redirect, etc.) — catches broken
  // in-app links (e.g. a stale chapter anchor) at build time.
  typedRoutes: true,

  experimental: {
    // Narrows barrel imports from these packages to only the modules actually
    // used, keeping GSAP/Framer/icon imports out of bundles that don't need them.
    optimizePackageImports: ["gsap", "framer-motion", "lucide-react"],
  },

  images: {
    // No remote image sources yet — every asset ships from /public until a
    // CMS or CDN is introduced. Revisit once real chapter media lands.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
