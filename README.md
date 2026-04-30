# Civic Sports Consulting

Website for Civic Sports Consulting — elite sports consulting for student-athletes and families. NIL strategy, recruitment roadmaps, and compliance-grade guidance.

## Tech Stack

- **Framework:** React 19 + Vite 8
- **Styling:** Tailwind CSS v4 (via `@tailwindcss/vite`)
- **Fonts:** Cormorant Garamond (display) + DM Sans (body) via Google Fonts

## Local Development

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:5173)
npm run dev

# Lint
npm run lint

# Production build
npm run build

# Preview production build locally
npm run preview
```

## Project Structure

```
src/
  App.jsx        — All pages and components (single-file SPA)
  index.css      — Global styles, Tailwind @theme tokens, component classes
  main.jsx       — React root entry point
public/
  favicon.svg    — Site favicon
  robots.txt     — Search engine crawl rules
  sitemap.xml    — XML sitemap (update URLs before deploy)
  logo.png       — Brand logo (add actual asset here)
  og-image.jpg   — Open Graph share image (1200×630, add before deploy)
index.html       — HTML shell with metadata, OG tags, Google Fonts
```

## Design Token Locations

All brand colors and fonts are defined in `src/index.css` inside the `@theme {}` block:

| Token family | Role |
|---|---|
| `ink-*` | Dominant dark navy palette |
| `gold-*` | Primary accent (CTAs, highlights) |
| `sage-*` | Secondary accent (success, checkmarks) |
| `cream-*` | Neutral background palette |
| `--font-display` | Cormorant Garamond (headings) |
| `--font-body` | DM Sans (body copy) |

## Content Update Locations

| Content | Location |
|---|---|
| Nav links | `Navbar` component in `src/App.jsx` |
| Hero headline/CTA | `Home` component, hero section |
| Service pricing & features | `Services` component, `plans` array |
| About / founder bio | `About` component |
| FAQ entries | `FAQ` component, `faqs` array |
| Contact info (email, city) | `Contact` component + `Footer` component |
| Footer links | `Footer` component |
| JSON-LD schema | `JsonLd` component |

## Before Launch Checklist

- [ ] Add `public/logo.png` (brand logo, ~72×72px)
- [ ] Add `public/og-image.jpg` (1200×630px share image)
- [ ] Add `public/apple-touch-icon.png` (180×180px)
- [ ] Update `sitemap.xml` with real deployed URLs
- [ ] Update `index.html` canonical URL and OG URLs
- [ ] Update `JsonLd` component with real phone number and social links
- [ ] Wire contact form to a real endpoint (Formspree, Netlify Forms, etc.)
- [ ] Copy `.env.example` to `.env.local` and fill in values
- [ ] Remove demo login bypass in `Login` component — implement real auth

## Deployment

This is a static SPA. Deploy the `dist/` folder (after `npm run build`) to any static host:

- **Netlify:** Connect GitHub repo, build command `npm run build`, publish dir `dist`
- **Vercel:** Same settings, zero-config for Vite
- **Cloudflare Pages:** Build command `npm run build`, output `dist`

For client-side routing to work on Netlify/Vercel, add a redirect rule:
- Netlify: add `public/_redirects` with `/* /index.html 200`
- Vercel: add `vercel.json` with rewrites rule

## Repository Hygiene Notes

- Removed obsolete scratch files from the repo root that duplicated CSS/config/app code and were not part of the Vite build.
- Active source of truth is `src/` + `public/` + standard config files.
