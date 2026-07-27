# NEO ENERGY — Powering the Future

Marketing site for **NEO Energy Battery Services Pte. Ltd.**, Singapore's leading EV
battery engineering and technology company — authorised partner across CATL, CALB, and
BYD battery technologies, with component-level repair as one of several differentiators,
not the brand's core identity. A cinematic, scroll-driven product-launch experience built
around the flagship 77.9kWh battery pack.

## Tech stack

| Layer              | Choice                                                                   |
| ------------------ | ------------------------------------------------------------------------- |
| Framework          | [Next.js](https://nextjs.org) 15 (App Router, React 19)                   |
| Language           | TypeScript (strict mode)                                                    |
| Styling            | [Tailwind CSS v4](https://tailwindcss.com) (CSS-first `@theme` tokens)        |
| Animation          | [GSAP](https://gsap.com) 3 + ScrollTrigger, [Framer Motion](https://www.framer.com/motion/) |
| Smooth scroll      | [Lenis](https://lenis.darkroom.engineering)                                     |
| Icons              | [lucide-react](https://lucide.dev)                                                |
| Linting/formatting | ESLint 9 (flat config), Prettier + `prettier-plugin-tailwindcss`                    |

## Folder structure

```
web/
├── public/
│   └── hero-frames/        # 289-frame WebP sequence powering the Hero scrub animation
├── src/
│   ├── app/                 # Next.js App Router: layout, page, metadata, sitemap/robots
│   ├── components/
│   │   ├── ui/               # Design-system primitives (Button, Heading, Container, Stat, …)
│   │   ├── layout/             # Navbar, Footer
│   │   ├── section/              # `Section` wrapper — reads the chapter registry
│   │   ├── motion/                 # `RevealWrapper` scroll-reveal primitive
│   │   ├── media/                    # Video wrapper
│   │   ├── providers/                  # Smooth-scroll (Lenis) + hero-phase context providers
│   │   └── battery/                      # Shared battery SVG glyph
│   ├── sections/              # One folder/file per homepage chapter (see below)
│   ├── hooks/                   # `use-reduced-motion`
│   ├── lib/                       # `site-config` (nav/SEO/chapter registry), `gsap`, `fonts`, `utils`
│   └── types/
├── eslint.config.mjs
├── next.config.ts
└── tsconfig.json
```

### Homepage chapters

The homepage is composed as a sequence of "chapters," ordered and labelled by the single
source of truth at [`src/lib/site-config.ts`](src/lib/site-config.ts):

1. **Hero** — cinematic scroll-scrubbed video intro
2. **The Object** — interactive battery pack reveal
3. **Engineering Battery Overview** — scroll-exploded assembly view with real spec data
4. **Component-Level Repair** — repair/maintenance capability grid
5. **Industries We Serve** _(in progress)_
6. **Why Choose NEO Energy** _(in progress)_
7. **Trust & Key Statistics** _(in progress)_
8. **Final Call to Action** _(in progress)_

`components/section/section.tsx` looks up each section's id in the `chapters` registry —
adding a new chapter means registering it there before rendering it in
[`src/app/page.tsx`](src/app/page.tsx).

## Getting started

**Requirements:** Node.js 20+ and npm.

```bash
npm install
npm run dev
```

The dev server is pinned to **http://localhost:4321** (see the `-p 4321` flag in
`package.json` and `.claude/launch.json`) rather than the Next.js default of 3000.

## Environment variables

None are required to run the project today — there is no `.env` file in this repository.
`src/lib/site-config.ts` currently holds a **placeholder production URL**
(`https://www.neoenergy.sg`) used for canonical links, Open Graph tags, and the sitemap;
confirm the real domain before launch and update it there. If server-side integrations
(forms, analytics, a CMS) are added later, document their required variables here and add
an `.env.example` — real `.env*` files are git-ignored by default.

## Development commands

```bash
npm run dev          # start the dev server on :4321
npm run lint          # ESLint
npm run lint:fix       # ESLint with autofix
npm run typecheck       # tsc --noEmit
npm run format            # Prettier — write
npm run format:check       # Prettier — check only
```

## Build & production

```bash
npm run build   # production build
npm run start    # serve the production build on :4321
```

## Deployment

The app is a standard Next.js App Router project with no non-standard build steps or
server requirements, so it deploys cleanly to [Vercel](https://vercel.com) (recommended,
zero-config) or any Node.js host that can run `npm run build && npm run start`. There is
no database or external API dependency at this stage.

## License

Proprietary and confidential. All rights reserved — © NEO Energy Battery Services Pte.
Ltd. This source code is not licensed for reuse, redistribution, or modification outside
of work authorised by NEO Energy Battery Services Pte. Ltd.
