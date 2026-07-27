/**
 * Minimal stroke-based social glyphs, matching lucide's own visual language
 * (1.5 stroke, rounded joins) since lucide-react doesn't ship brand icons in
 * the version pinned here. Generic, widely-recognised platform marks, not
 * bespoke artwork.
 */
type IconProps = { className?: string };

export function LinkedinIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <line x1="7" y1="10.5" x2="7" y2="17" />
      <circle cx="7" cy="6.75" r="0.75" fill="currentColor" stroke="none" />
      <line x1="11" y1="10.5" x2="11" y2="17" />
      <path d="M11 13.25a2.5 2.5 0 0 1 5 0V17" />
    </svg>
  );
}

export function InstagramIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.25" cy="6.75" r="0.75" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function FacebookIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="4" />
      <path d="M14 8.5h-1.25c-.83 0-1.25.42-1.25 1.25V11.5H14l-.3 2.25h-2.2V19" />
    </svg>
  );
}
