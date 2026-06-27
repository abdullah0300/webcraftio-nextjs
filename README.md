# WebCraftio — Next.js Rebuild

A pixel-for-pixel, animation-for-animation Next.js (App Router + TypeScript)
rebuild of the original single-page WebCraftio site, split into clean,
reusable components.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Project structure

```
src/
  app/
    layout.tsx        Root layout — loads Space Grotesk + JetBrains Mono via next/font/google
    globals.css        Resets, @keyframes (floaty, morph, marquee, bob, etc.), hover-state classes
    page.tsx            Orchestrates all sections + shared scroll/state logic
  components/
    Nav.tsx             Sticky nav: scroll-docking, hover indicator, scroll-progress fill
    Hero.tsx            Sticky 520vh, 5-stage scroll-driven hero with magnetic title + mouse blobs
    KineticText.tsx     Shared "magnetic letters" text renderer (used by Hero/Work/Services)
    useMagnetic.ts      Generic magnetic-hover hook (kept for reference/extension)
    Marquee.tsx         Infinite-scroll ticker between Hero and Work
    Work.tsx            Sticky 320vh 2-card project deck with flip-to-reveal interaction
    Services.tsx        4-panel hover-expand accordion grid
    Process.tsx         Sticky 500vh horizontal-scroll 5-step process track
    CTA.tsx             "What are we building" intent chips + email capture
    Footer.tsx          Giant magnetic WEBCRAFTIO wordmark + back-to-top
```

## Implementation notes

- **No CSS framework** — the original site doesn't use Tailwind/Bootstrap; all
  layout is inline styles (matching the source exactly), with a small set of
  global `:hover` classes in `globals.css` for states React inline styles
  can't express (`:hover`, animation states, etc).
- **Scroll-driven animation** — all of the original's `componentDidMount`
  scroll/resize/interval logic now lives in `page.tsx`'s `useEffect`, updating
  React state (`activeStage`, `activeProject`, `procIndex`, `scrolled`,
  `navDocked`, `activeNav`, `narrow`) and writing directly to a few refs for
  the highest-frequency transforms (nav fill bar, process track/fill,
  card-deck transforms) to avoid re-rendering on every scroll tick — exactly
  mirroring the performance approach of the original.
- **Magnetic / cursor-follow effects** (hero headline, "OUR WORK", "SERVICES",
  footer wordmark) are implemented as plain DOM-manipulation mouse handlers,
  the same technique the original used, just translated to React refs and
  `onMouseMove`/`onMouseLeave` handlers instead of vanilla event listeners.
- **Card flip / sticky deck (Work section)** and the **horizontal process
  track** reproduce the original's scroll-progress math 1:1 (same easing
  windows, same `vh`/`vw` transform formulas).
- **Fonts**: the original referenced Google Fonts (`Space Grotesk`,
  `JetBrains Mono`) by internal asset UUIDs that only resolve inside the
  original builder tool. This rebuild loads the same two font families
  properly via `next/font/google`, which self-hosts and optimizes them.

## Build

```bash
npm run build
npm start
```
