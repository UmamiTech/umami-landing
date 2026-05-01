# umami-landing

Marketing site for Umami — lives at **https://umami.com.ph**.

Separate from the app (`app.umami.com.ph` runs on DigitalOcean and is **not affected** by anything in this repo).

---

## Quick edit cheat sheet

### To make changes

1. **Double-click `dev.bat`** — starts a local preview at http://localhost:3000
2. Edit any file in `src/` — the page hot-reloads as you save
3. When happy, **double-click `ship.bat`** — commits, runs a build check, pushes to GitHub
4. Vercel auto-deploys to **umami.com.ph** in ~60 seconds

### What lives where

| Section | File |
|---|---|
| Hero (top of page) | [src/components/sections/Hero.tsx](src/components/sections/Hero.tsx) |
| 4-card "What is Umami" | [src/components/sections/WhatIsUmami.tsx](src/components/sections/WhatIsUmami.tsx) |
| Pain points | [src/components/sections/PainPoints.tsx](src/components/sections/PainPoints.tsx) |
| Founder story + timeline | [src/components/sections/Story.tsx](src/components/sections/Story.tsx) |
| Customer order demo | [src/components/sections/CustomerDemo.tsx](src/components/sections/CustomerDemo.tsx) |
| Owner menu demo | [src/components/sections/OwnerDemo.tsx](src/components/sections/OwnerDemo.tsx) |
| Pricing tiers | [src/components/sections/Pricing.tsx](src/components/sections/Pricing.tsx) |
| Try Umami / QR | [src/components/sections/TryUmami.tsx](src/components/sections/TryUmami.tsx) |
| Contact | [src/components/sections/Contact.tsx](src/components/sections/Contact.tsx) |
| Footer | [src/components/sections/Footer.tsx](src/components/sections/Footer.tsx) |
| Top nav | [src/components/Nav.tsx](src/components/Nav.tsx) |
| Brand colors / globals | [src/app/globals.css](src/app/globals.css) |
| Demo menu items | [src/lib/demoMenu.ts](src/lib/demoMenu.ts) |
| Logos | [public/logos/](public/logos/) |

### Common edits

- **Change a price in pricing cards** → `src/components/sections/Pricing.tsx` → edit the `tiers` array near the top
- **Change demo restaurant name** → search for `Kalei Cafe Bar` and replace
- **Add/remove a customer logo** → `src/components/sections/Hero.tsx`, look for the "Powering" block + drop logo SVG into `public/logos/`
- **Change founder quote** → `src/components/sections/Story.tsx`, look for `<blockquote>`
- **Add a new contact channel** → `src/components/sections/Contact.tsx`, edit the `channels` array
- **Change brand orange** → `src/app/globals.css`, edit `--brand: #e87a1e;`

### Safety

- This repo only deploys to **umami.com.ph** (Vercel)
- The ordering app at **app.umami.com.ph** is on DigitalOcean — completely separate
- QR codes (cloud + local) point to `app.umami.com.ph` or laptop IPs — they never touch this site
- Worst case if something breaks: marketing site shows wrong content. Ordering keeps working. Roll back via Vercel dashboard with one click.

### Tech stack

Next.js 16 · TypeScript · Tailwind CSS v4 · Framer Motion · GSAP · Lenis (smooth scroll) · Vercel hosting

### Manual commands (if you skip the .bat files)

```bash
npm install      # first-time setup
npm run dev      # local dev at :3000
npm run build    # production build (also runs in CI)
npm start        # serve the production build locally
```

### Deploy log

- 2026-05-01: Initial launch — replaced "Built Different" with new dark, animated, demo-driven design
