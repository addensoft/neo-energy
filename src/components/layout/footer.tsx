"use client";

import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import type { ReactNode } from "react";

import { Button } from "@/components/ui";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

import { FacebookIcon, InstagramIcon, LinkedinIcon } from "./social-icons";

/**
 * Footer — full sitemap-style footer (approved reference layout): brand
 * column, four link columns, a contact column, and a bottom legal bar.
 *
 * Most of these link columns describe pages this one-page site doesn't have
 * yet (About Us, Careers, Taxi Operators, FAQs, ...) — per the project's
 * "never fabricate fake destinations" discipline, only labels that map to a
 * real homepage section get a real anchor; everything else is `href="#"`
 * until those pages exist. Phone number is a placeholder for the same
 * reason `siteConfig.contactEmail`/`url` are — no real one has been
 * confirmed yet.
 */
const FOOTER_COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Company",
    links: [
      { label: "About Us", href: "#" },
      { label: "Our Mission", href: "#" },
      { label: "Our Team", href: "#" },
      { label: "Careers", href: "#" },
      { label: "News", href: "#" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "Battery Systems", href: "#flagship-battery" },
      { label: "Component Repair", href: "#repair" },
      { label: "Maintenance", href: "#repair" },
      { label: "Diagnostics", href: "#repair" },
      { label: "Upgrades", href: "#" },
    ],
  },
  {
    title: "Industries",
    links: [
      { label: "Taxi Operators", href: "#" },
      { label: "Car Dealers", href: "#" },
      { label: "Insurance Companies", href: "#" },
      { label: "EV Importers", href: "#" },
      { label: "Fleet Owners", href: "#" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Service Network", href: "#authority" },
      { label: "FAQs", href: "#" },
      { label: "Documentation", href: "#" },
      { label: "Contact Us", href: "#cta" },
    ],
  },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Use", href: "#" },
];

/** Sitemap-style link — soft colour shift plus a left-to-right underline draw on hover. */
function FooterLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      className="group ease-engineered text-body focus-visible:outline-ion relative inline-block w-fit py-0.5 transition-colors duration-300 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2"
    >
      {children}
      <span className="bg-ion ease-engineered absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
    </a>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      className="border-border text-muted ease-engineered hover:border-ion/50 hover:text-ion focus-visible:outline-ion flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-300 hover:scale-110 hover:shadow-[var(--shadow-ion-glow)] focus-visible:outline-2 focus-visible:outline-offset-2"
    >
      {children}
    </a>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-border bg-background border-t">
      <div className="px-gutter lg:px-gutter-lg py-section-sm mx-auto flex w-full max-w-[1600px] flex-col gap-12">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr_1fr_1.2fr] lg:gap-x-6 lg:gap-y-0">
          {/* Column 1 — brand */}
          <div className="flex flex-col gap-4 sm:col-span-2 lg:col-span-1">
            <div className="inline-flex w-fit rounded-lg bg-white p-2.5">
              <Image
                src="/images/footer-logo.webp"
                alt="NEO ENERGY — Powering the Future"
                width={1597}
                height={828}
                className="h-9 w-auto"
              />
            </div>
            <p className="text-body max-w-[26rem] sm:max-w-[22rem]">
              NEO Energy is a worldwide authorized service specialist in advanced EV
              battery solutions and component-level repair services.
            </p>
            <div className="flex items-center gap-3">
              <SocialLink href="#" label="LinkedIn">
                <LinkedinIcon className="h-4 w-4" />
              </SocialLink>
              <SocialLink href="#" label="Instagram">
                <InstagramIcon className="h-4 w-4" />
              </SocialLink>
              <SocialLink href="#" label="Facebook">
                <FacebookIcon className="h-4 w-4" />
              </SocialLink>
            </div>
          </div>

          {/* Columns 2–5 — link groups */}
          {FOOTER_COLUMNS.map((column) => (
            <div key={column.title} className="flex flex-col gap-4">
              <h3 className="text-h4 font-display text-foreground tracking-wide uppercase">
                {column.title}
              </h3>
              <ul className="flex flex-col gap-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <FooterLink href={link.href}>{link.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Column 6 — contact */}
          <div className="flex flex-col gap-4 sm:col-span-2 lg:col-span-1">
            <h3 className="text-h4 font-display text-foreground tracking-wide uppercase">
              Contact Us
            </h3>
            <ul className="flex flex-col gap-3">
              <li className="flex items-start gap-2.5">
                <MapPin className="text-ion mt-0.5 h-4 w-4 shrink-0" strokeWidth={1.5} />
                <span className="text-body">Singapore · Islandwide Service</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="text-ion h-4 w-4 shrink-0" strokeWidth={1.5} />
                <FooterLink href="tel:+65">+65 XXXX XXXX</FooterLink>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="text-ion h-4 w-4 shrink-0" strokeWidth={1.5} />
                <FooterLink href={`mailto:${siteConfig.contactEmail}`}>
                  {siteConfig.contactEmail}
                </FooterLink>
              </li>
            </ul>
            <Button
              href={`mailto:${siteConfig.contactEmail}`}
              variant="primary"
              size="sm"
              className="w-fit"
            >
              Get In Touch
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className={cn(
            "border-border flex flex-col gap-4 border-t pt-6",
            "sm:flex-row sm:items-center sm:justify-between",
          )}
        >
          <span className="text-body">
            © {year} {siteConfig.legalName}. All Rights Reserved.
          </span>
          <div className="flex items-center gap-6">
            {LEGAL_LINKS.map((link) => (
              <FooterLink key={link.label} href={link.href}>
                {link.label}
              </FooterLink>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
