# PRESENT — app prototype

A clickable React prototype of PRESENT, a speculative companion service for families of people with late-stage Alzheimer's. Shown at true phone size (402 × 874).

## Run it

Open `index.html` in a browser. It is self-contained apart from React and fonts, which load from CDNs.

## Build

Edit files in `src/` and `assets/`, then run from this folder:

```bash
node build.mjs
```

This bundles `src/App.jsx` with esbuild (fetched via `npx` the first time) and writes `index.html` and `build/artifact.html`.

## Layout

- `src/data.js` — companions, prices, demo data
- `src/onboarding.jsx` — welcome and the 3-step onboarding
- `src/visits.jsx` — booking a visit, quote, matching, payment
- `src/tabs.jsx` — Home, Companions, Memories, Account
- `src/ui.jsx` — shared components
- `src/App.jsx` — navigation and phone frame
- `assets/` — illustrations
