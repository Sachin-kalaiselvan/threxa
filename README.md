# Threxa Landing Page

The marketing site for [Threxa](https://threxa.theingredientlist.com) — workflow automation infrastructure for Indian D2C brands.

## Stack

- Vite + React 18 + TypeScript
- TailwindCSS + shadcn/ui
- React Router

## Running locally

```bash
npm install
npm run dev
```

Site runs on `http://localhost:8080`.

## Build

```bash
npm run build      # production build to /dist
npm run preview    # preview the production build locally
```

## Deploy

This site is configured for Vercel — push to main and Vercel auto-deploys.

To set up:
1. Connect this repo to Vercel
2. Framework: Vite (auto-detected)
3. Build command: `npm run build`
4. Output directory: `dist`
5. Add custom domain in Vercel settings → Domains

## Structure

- `src/components/ThrexaLanding.tsx` — main landing page
- `src/pages/Index.tsx` — root route
- `public/threxa-logo.png` — full logo lockup
- `public/threxa-icon.png` — orbital-X icon (favicon, chatbot)
- `public/threxa-site.html` — standalone HTML version (backup)

## Brand

- Background: `#FAFAF7` (warm off-white)
- Text: `#0A0A0F` (near-black)
- Accent: `#7B4DF6` (purple)
- Display font: Fraunces (variable serif)
- Body font: DM Sans
- Mono: JetBrains Mono
