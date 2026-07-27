import { primaryNav, siteConfig } from "@/lib/site-config";

/**
 * Footer — Creative Direction §12 Premium UI Layout / §8 (Section Order, item 10).
 *
 * "Dark, quiet, information-dense but visually calm — registered entity name,
 * islandwide service note, certifications restated in small mono type, partner
 * marks, social links, legal."
 *
 * Sprint 1 ships the structural rows that already have approved copy (legal
 * entity name, tagline, utility nav). Certification badges, partner marks, and
 * social links are left as marked slots — they depend on assets/URLs that don't
 * exist yet, not on further design direction.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-border bg-background border-t">
      <div className="px-gutter py-section-sm lg:px-gutter-lg mx-auto flex w-full max-w-[1600px] flex-col gap-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <span className="font-display text-foreground text-lg">{siteConfig.name}</span>
          <ul className="flex flex-wrap gap-6">
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
        </div>

        {/* Certification badges + partner marks — Creative Direction §12, §2 Ch.7 — slot in once assets are confirmed. */}
        {/* Social links — slot in once accounts are confirmed. */}

        <div className="border-border text-muted flex flex-col gap-2 border-t pt-6 font-mono text-xs tracking-[0.1em] uppercase md:flex-row md:items-center md:justify-between">
          <span>
            © {year} {siteConfig.legalName}
          </span>
          <span>Singapore · Islandwide Service</span>
        </div>
      </div>
    </footer>
  );
}
