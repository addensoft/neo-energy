"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import { useHeroPhase } from "@/components/providers/hero-phase-provider";
import { Button } from "@/components/ui";
import { DURATION, EASE_ENGINEERED } from "@/lib/motion-tokens";
import { primaryNav, siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

/**
 * Navbar — Creative Direction §12 Premium UI Layout / §5 Hero Section Concept.
 *
 * Three states, in order over the life of a page load:
 *  1. Hidden — the entire 18s Hero film plays with zero UI chrome (§5, §9).
 *  2. Minimal — film has settled (`HeroPhaseProvider` phase === "settled"):
 *     transparent, "Contact" only, no logo — while Chapter 0 is still in view.
 *  3. Frosted — once Chapter 0 has scrolled mostly out of view: the full
 *     lockup (logo, 5-item nav, CTA), tracked via IntersectionObserver on #hero.
 */
export function Navbar() {
  const { phase } = useHeroPhase();
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    const heroEl = document.getElementById("hero");
    if (!heroEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => setPastHero(entry.intersectionRatio < 0.6),
      { threshold: [0, 0.6, 1] },
    );
    observer.observe(heroEl);
    return () => observer.disconnect();
  }, []);

  if (phase === "film") return null;

  const frosted = pastHero;

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: DURATION.slow, ease: EASE_ENGINEERED }}
      className={cn(
        "ease-engineered fixed inset-x-0 top-0 z-50 border-b transition-colors duration-500",
        frosted
          ? "border-border bg-background/80 backdrop-blur-md"
          : "border-transparent bg-transparent",
      )}
    >
      <nav
        aria-label="Primary"
        className={cn(
          "px-gutter lg:px-gutter-lg mx-auto flex h-16 w-full max-w-[1600px] items-center",
          frosted ? "justify-between" : "justify-end",
        )}
      >
        <AnimatePresence mode="wait">
          {frosted ? (
            <motion.div
              key="frosted"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: DURATION.base, ease: EASE_ENGINEERED }}
              className="flex w-full items-center justify-between"
            >
              <a
                href="#hero"
                className="font-display text-foreground text-sm tracking-tight"
              >
                {siteConfig.name}
              </a>

              <ul className="hidden items-center gap-8 md:flex">
                {primaryNav.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-muted ease-engineered hover:text-foreground font-mono text-xs tracking-[0.1em] uppercase transition-colors duration-300"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>

              <Button href="#cta" variant="primary" size="sm">
                Request Assessment
              </Button>
            </motion.div>
          ) : (
            <motion.a
              key="minimal"
              href="#cta"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: DURATION.base, ease: EASE_ENGINEERED }}
              className="text-muted ease-engineered hover:text-foreground font-mono text-xs tracking-[0.1em] uppercase transition-colors duration-300"
            >
              Contact
            </motion.a>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}
