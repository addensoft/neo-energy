"use client";

import { cva, type VariantProps } from "class-variance-authority";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { useRef } from "react";

import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

/**
 * Button — Creative Direction §12 Premium UI Layout.
 *
 * "One primary style only — thin-bordered, dark fill, Ion Blue on hover, magnetic
 * micro-interaction (§4). No secondary button styles competing for attention."
 *
 * `ghost` exists for understated secondary actions (e.g. Chapter 8's "Talk to Our
 * Engineers") — it reads as a text affordance, not a competing button treatment,
 * so it deliberately stays free of the sweep/glow below rather than violating the
 * one-primary-style rule by competing for attention.
 *
 * Single premium hover language, applied here once so every call site inherits it
 * for free: border + text shift to Ion Blue, a soft shared `--shadow-ion-glow`
 * (same token `CapabilityCard` uses — one glow style site-wide), and a one-shot
 * light sweep on pointer-enter (the same mechanic as `CapabilityCard`/`PartnerMark`).
 * All on `EASE_ENGINEERED` timing via the shared `duration-300 ease-engineered`
 * classes below.
 */
const buttonVariants = cva(
  "ease-engineered relative inline-flex items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-sm font-mono text-[0.9rem] font-semibold tracking-[0.08em] uppercase transition-[color,border-color,box-shadow] duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ion disabled:pointer-events-none disabled:opacity-50 lg:text-[0.95rem]",
  {
    variants: {
      variant: {
        primary:
          "border border-border bg-graphite px-8 py-4 text-foreground hover:border-ion hover:text-ion hover:shadow-[var(--shadow-ion-glow)]",
        ghost: "px-2 py-3 text-muted transition-colors hover:text-foreground",
      },
      size: {
        sm: "px-5 py-2.5 text-[0.8rem] lg:text-[0.85rem]",
        md: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

type CommonProps = VariantProps<typeof buttonVariants> & {
  className?: string;
  children?: ReactNode;
};

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

// Every current call site targets an in-page chapter anchor (`#hero`, `#cta`, ...),
// not a routed page — so this renders a native `<a>` rather than `next/link`.
// `next/link`'s prefetch/transition behaviour has no benefit for same-page hash
// scrolling, and `typedRoutes` (next.config.ts) only validates real App Router
// routes, not arbitrary hash fragments. Revisit if Button ever needs to target an
// actual routed page.
export function Button({ variant, size, className, children, ...props }: ButtonProps) {
  const classes = cn(buttonVariants({ variant, size }), className);
  const sweepRef = useRef<HTMLSpanElement>(null);
  const isPrimary = (variant ?? "primary") === "primary";

  const handlePointerEnter = () => {
    const el = sweepRef.current;
    if (!el) return;
    gsap.fromTo(
      el,
      { xPercent: -140, autoAlpha: 0.4 },
      { xPercent: 140, autoAlpha: 0, duration: 0.8, ease: "power2.out", overwrite: true },
    );
  };

  const sweep = isPrimary ? (
    <span
      ref={sweepRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 opacity-0 [mix-blend-mode:screen]"
      style={{
        background:
          "linear-gradient(75deg, transparent 40%, rgba(90,200,255,0.45) 50%, transparent 60%)",
      }}
    />
  ) : null;

  if ("href" in props && props.href) {
    return (
      <a className={classes} onPointerEnter={handlePointerEnter} {...props}>
        {sweep}
        {children}
      </a>
    );
  }

  return (
    <button
      className={classes}
      onPointerEnter={handlePointerEnter}
      {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {sweep}
      {children}
    </button>
  );
}
