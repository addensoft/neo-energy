"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

import { useHeroPhase } from "@/components/providers/hero-phase-provider";
import { Button } from "@/components/ui";
import { DURATION, EASE_ENGINEERED } from "@/lib/motion-tokens";
import { primaryNav, siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

/**
 * Navbar — Creative Direction §12 Premium UI Layout / §5 Hero Section Concept.
 *
 * Two states over the life of a page load:
 *  1. Hidden — the entire 18s Hero film plays with zero UI chrome (§5, §9).
 *  2. Visible — film has settled (`HeroPhaseProvider` phase === "settled"):
 *     one persistent lockup (logo / centered nav / CTA) that only animates its
 *     chrome — transparent while Chapter 0 is on screen, frosted once the
 *     user has scrolled past it (tracked via IntersectionObserver on #hero).
 *     Logo, links, and CTA never swap content or layout between the two.
 */
function NavLink({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active: boolean;
}) {
  return (
    <a
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "group ease-engineered relative inline-block py-2 font-mono text-[0.8rem] font-medium tracking-[0.12em] uppercase transition-colors duration-300",
        active ? "text-foreground" : "text-foreground/70 hover:text-foreground",
      )}
    >
      {label}
      <span
        aria-hidden="true"
        className={cn(
          "bg-ion ease-engineered absolute -bottom-0.5 left-0 h-px w-full origin-left transition-transform duration-300",
          active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
        )}
      />
    </a>
  );
}

export function Navbar() {
  const { phase } = useHeroPhase();
  const [frosted, setFrosted] = useState(false);
  const [activeHref, setActiveHref] = useState<string | null>(null);

  useEffect(() => {
    const heroEl = document.getElementById("hero");
    if (!heroEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => setFrosted(entry.intersectionRatio < 0.6),
      { threshold: [0, 0.6, 1] },
    );
    observer.observe(heroEl);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const targets = primaryNav
      .map((link) => document.getElementById(link.href.slice(1)))
      .filter((el): el is HTMLElement => el !== null);
    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const mostVisible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (mostVisible) setActiveHref(`#${mostVisible.target.id}`);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  if (phase === "film") return null;

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: DURATION.slow, ease: EASE_ENGINEERED }}
      className={cn(
        "ease-engineered fixed inset-x-0 top-0 z-50 border-b transition-all duration-500",
        frosted
          ? "border-border bg-background/80 backdrop-blur-md"
          : "border-transparent bg-transparent",
      )}
    >
      <nav
        aria-label="Primary"
        className={cn(
          "px-gutter lg:px-gutter-lg ease-engineered mx-auto grid w-full max-w-[1600px] grid-cols-[auto_1fr_auto] items-center gap-6 transition-all duration-500",
          frosted ? "h-16" : "h-20",
        )}
      >
        <motion.a
          href="#hero"
          aria-label={siteConfig.name}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: DURATION.slow, delay: 0.15, ease: EASE_ENGINEERED }}
          className={cn(
            "ease-engineered inline-flex w-fit shrink-0 items-center rounded-md bg-white transition-all duration-500",
            frosted ? "p-1.5" : "p-2",
          )}
        >
          <Image
            src="/images/footer-logo.webp"
            alt={siteConfig.name}
            width={1597}
            height={828}
            priority
            className={cn(
              "ease-engineered w-auto transition-all duration-500",
              frosted ? "h-7" : "h-8",
            )}
          />
        </motion.a>

        <ul className="hidden items-center justify-self-center md:flex md:gap-8 lg:gap-10">
          {primaryNav.map((link) => (
            <li key={link.href}>
              <NavLink
                href={link.href}
                label={link.label}
                active={activeHref === link.href}
              />
            </li>
          ))}
        </ul>

        <div className="justify-self-end">
          <Button href="#cta" variant="primary" size="sm">
            Request Assessment
          </Button>
        </div>
      </nav>
    </motion.header>
  );
}
