import { cva, type VariantProps } from "class-variance-authority";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Button — Creative Direction §12 Premium UI Layout.
 *
 * "One primary style only — thin-bordered, dark fill, Ion Blue on hover, magnetic
 * micro-interaction (§4). No secondary button styles competing for attention."
 *
 * `ghost` exists for understated secondary actions (e.g. Chapter 8's "Talk to Our
 * Engineers") — it reads as a text affordance, not a competing button treatment,
 * so it doesn't violate the one-primary-style rule.
 *
 * The magnetic hover interaction described in §4 is intentionally NOT implemented
 * yet — Sprint 1 is structure only. It hooks into this component in a later sprint
 * without changing the public API.
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-sm font-mono text-xs uppercase tracking-[0.1em] transition-colors duration-300 ease-engineered focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ion disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "border border-border bg-graphite px-6 py-3 text-foreground hover:border-ion hover:text-ion",
        ghost: "px-2 py-3 text-muted hover:text-foreground",
      },
      size: {
        sm: "text-[11px]",
        md: "text-xs",
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

  if ("href" in props && props.href) {
    return (
      <a className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
