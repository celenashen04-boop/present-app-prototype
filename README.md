# PRESENT — app prototype

A clickable React prototype of PRESENT, a speculative companion service for families of people with late-stage Alzheimer's. Shown at true phone size (402 × 874).

## Run it

Open `index.html` in a browser. It is self-contained apart from React and fonts, which load from CDNs, and the
home-screen icons in `icons/`. On a computer it shows just the phone; on a phone (500px wide or less) the app fills the screen.

## Use it on a phone like an app

Host the folder over HTTPS, open it in Safari (iPhone) or Chrome (Android), and choose Add to Home Screen.
It then opens full screen with its own icon. `manifest.webmanifest` and the tags `build.mjs` adds to `index.html` set this up.

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
