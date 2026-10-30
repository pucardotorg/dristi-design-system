# Pucar Design System

**The source of truth for how Pucar looks and behaves in product.**

This repository is the living design system for Pucar — tokens, foundations, and UI components — documented as a site so product, design, engineering, and AI coding agents all build against the same language instead of inventing one per screen.

> Live docs: [pucar-design-system-five.vercel.app](https://pucar-design-system-five.vercel.app)

---

## Why this exists

Design systems fail when they live only in Figma, only in Slack threads, or only in one team’s head. Pucar’s system is intentionally **code-backed**:

- **Tokens** are real CSS variables, not screenshots of a palette.
- **Components** are production primitives (shadcn/ui + Radix), themed — not restyled copies.
- **Documentation** is interactive: light/dark, live previews, when-to-use guidance.

The goal is consistency at speed. When the brand, density, and interaction patterns are settled here, every feature team (and every agent) ships UI that still feels like Pucar.

---

## What you’ll find

| Area | Purpose |
| --- | --- |
| **Foundations** | Color, typography, spacing, radius, elevation, motion, status & feedback, icons, accessibility, laws |
| **Components** | Documented UI primitives with previews, usage notes, and token coupling |
| **Principles** | Non-negotiable rules that keep the system coherent as it grows |
| **Getting started** | How to run the docs and how to consume the system in product work |

### Brand

Primary is **teal** — `#007e7e` (light) / `#0eb39e` (dark). Abhiram’s live
**Rajini 2.0** Figma file is the design contract; this repository is its
production implementation.

Typography for product UI uses the zero-download system stack
**Helvetica Neue, Helvetica, Arial, system-ui**.

---

## Principles

Four rules protect the system. Break them and the brand fragments.

1. **Tokens over inventing** — never a hex, an `oklch()`, or an arbitrary value like `bg-[#007e7e]`.
2. **Reuse before create** — check `src/components/ui/` first; prefer composition.
3. **Install, don’t hand-write** — new shadcn components come from `npx shadcn@latest add`.
4. **Light and dark are equal** — every color token exists in both `:root` and `.dark`.

The enforceable version of these, with the recipes and the checks that back them, lives in
[`AGENTS.md`](./AGENTS.md). The first and fourth are verified by `npm run lint`.

---

## Standards

These are part of the design contract, not per-app decisions. A Pucar component is only
correct if it meets them.

| Document | Covers |
| --- | --- |
| [`ACCESSIBILITY.md`](./ACCESSIBILITY.md) | WCAG 2.1 AA, WAI-ARIA 1.2, keyboard, contrast, 40×40px touch targets, visible labels, session timeouts, 200% zoom, Indic scripts |
| [`RESPONSIVE.md`](./RESPONSIVE.md) | Mobile-first composition, breakpoints, overlay choice, table overflow |
| [`AGENTS.md`](./AGENTS.md) | Token rules, the Laws, and how to add or change a component |
| [`CHANGELOG.md`](./CHANGELOG.md) | Reconciliation history against the Figma contract |

Accessibility and the Laws are also on the docs site, at `/foundations/accessibility` and
`/foundations/laws`.

---

## Stack

| Layer | Choice |
| --- | --- |
| App / docs | Next.js (App Router) + TypeScript |
| Styling | Tailwind CSS v4 |
| Tokens | CSS custom properties in `src/app/globals.css`, mapped via `@theme inline` |
| Components | shadcn/ui (Radix) in `src/components/ui/` |
| Icons | Lucide |
| Theming | `next-themes` (class-based `.dark`) |

Tokens, component dimensions, states, and usage rules are reconciled against the live
**Pucar Design System — Abhiram** Figma file (cover: *Pucar · ON Court — Design system ·
Rajini 2.0*). Components combine maintained shadcn/Radix primitives with Pucar-specific
components and Rajini-aligned adaptations.

---

## Tokens

Every token is a CSS custom property in [`src/app/globals.css`](./src/app/globals.css),
defined in both light and dark mode and exposed to Tailwind through `@theme inline`.

What each family means, plus the full generated inventory, lives in
[`AGENTS.md`](./AGENTS.md#tokens). Swatches and specimens are in the Foundations section of
the docs site. Those two are the only places tokens are described — deliberately, so a
third copy cannot drift.

---

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Use the header control to switch light and dark.

```bash
npm run build        # production build
npm run start        # serve production build
npm run lint         # eslint, plus the token and coverage checks
npm run sync:tokens  # regenerate the token inventory in AGENTS.md from globals.css
```

`npm run lint` is the gate. Beyond eslint it fails on a hardcoded color, a token missing
from either theme, spacing off the ladder, a translucent status fill, a raw-pixel height, a
new component that is undocumented or unreachable from the docs nav (ten older gaps are
listed as exempt in `scripts/check-ds.mjs`), and a stale token inventory.

---

## Deployment

The docs site deploys automatically from `main`. Merging a pull request rebuilds
[pucar-design-system-five.vercel.app](https://pucar-design-system-five.vercel.app) — no manual
step, and nothing to remember.

This was not always true. Until 2026-08-25 the Vercel project had no Git connection, so the
site only updated when someone ran a deploy from their own machine. It silently fell twelve
days behind the code, and the docs spent that time describing a version of the system that no
longer existed. If the site ever looks stale again, check that the Git connection is still in
place (Vercel → project → Settings → Git) before assuming the documentation is wrong.

To deploy by hand — a rollback, or a check before merging:

```bash
npx vercel --prod       # deploy the working tree to production
npx vercel ls           # recent deployments, newest first
```

---

## Repository layout

```text
src/
  app/
    (docs)/          # Documentation routes (foundations, components, principles)
    globals.css      # Design tokens (light + dark) — the only place raw values belong
  components/
    docs/            # Docs chrome, page primitives, and the component registry
    ui/              # Design system components (shadcn + Pucar)
  lib/
    docs-nav.ts      # Sidebar information architecture, and the component route list
    icons.ts         # Allowlisted Lucide icon names from Figma
    utils.ts         # cn() and shared helpers
scripts/             # Token generation and the checks that run in `npm run lint`
```

---

## Who this is for

- **Designers** — Confirm that what ships matches the system, not a one-off mock.
- **Engineers** — Pull tokens and components instead of reinventing UI per feature.
- **Product / stakeholders** — Walk foundations and components in a shareable live site.
- **AI coding agents** — Follow [`AGENTS.md`](./AGENTS.md); it is the rulebook for working in this repo.

---

## Status

This is an early but usable **v0.1**: foundations and a curated component library documented for day-to-day product work. Expect the docs and patterns to deepen (forms, accessibility, distribution) as we ship.

Questions about contribution, versioning, or consuming this from other apps should be resolved against this repo — not against stale Figma notes or side branches of “temporary” styles.
