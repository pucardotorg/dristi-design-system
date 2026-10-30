# Responsive Components

**Scope:** Product UI built with Pucar components must work on mobile and desktop.
The design-system **docs site** itself does not need to be responsive — this file is about
the components and how we compose them in product.

Read this whenever you build screens, forms, overlays, or layouts with
`src/components/ui/`.

---

## Principle

Components should be **usable at phone width (~320–390px) and desktop** without
forking a separate mobile design system. Prefer fluid layout and Tailwind breakpoints
over fixed pixel widths.

Responsiveness lives in **composition and component behavior**, not in inventing new
color/spacing tokens per breakpoint.

---

## Breakpoints (Tailwind defaults)

| Prefix | Min width | Use for |
| --- | --- | --- |
| (none) | 0 | Mobile-first base styles |
| `sm:` | 640px | Larger phones / small tablets |
| `md:` | 768px | Tablet / small laptop — **Pucar mobile hook threshold** |
| `lg:` | 1024px | Desktop layouts |
| `xl:` | 1280px | Wide desktop |
| `2xl:` | 1536px | Extra-wide |

**Mobile detection in JS:** use `useIsMobile()` from `src/hooks/use-mobile.ts`
(`true` when viewport `< 768px`). Prefer this over one-off `window.innerWidth` checks.

---

## Rules when building with components

1. **Mobile-first classes.** Write the narrow layout first; layer `sm:` / `md:` / `lg:`
   for wider viewports.
2. **No fixed trap widths.** Avoid `w-[480px]`, `min-w-[900px]`, or layouts that force
   horizontal page scroll. Prefer `w-full`, `max-w-*`, `min-w-0`, and `flex-1`.
3. **Keep touch targets usable** (40×40px floor, [`ACCESSIBILITY.md`](./ACCESSIBILITY.md) §8).
   On phones, don't leave `xs` icon buttons as the only actions.
4. **Stack before splitting.** Forms, toolbars, and dialog footers should
   `flex-col` on small screens and `sm:flex-row` (or `md:`) when space allows.
5. **Overflow is intentional.** Tables and wide data: wrap in
   `overflow-x-auto` (or a ScrollArea). Never let a Table blow out the page.
6. **Choose the right overlay for the viewport.**
   - **Dialog / Alert Dialog** — focused tasks; already fluid (`max-w-[calc(100%-2rem)]`,
     `sm:max-w-90`, stacked footers on small screens).
   - **Sheet** — side panels / filters; width is constrained on larger screens
     (`sm:max-w-sm`).
   - **Drawer** — prefer for mobile-first bottom sheets and short flows on small viewports.
   - **Sidebar** — uses `useIsMobile()` to switch to an off-canvas pattern on small screens.
7. **Nothing critical behind hover** ([`ACCESSIBILITY.md`](./ACCESSIBILITY.md) §7). Use
   Dropdown Menu or Sheet for overflow.
8. **Tokens stay constant across breakpoints.** Do not invent “mobile primary” colors.
   Change layout, density, and component choice — not the brand palette.
9. **Survive 200% text zoom** ([`ACCESSIBILITY.md`](./ACCESSIBILITY.md) §10).

---

## Component patterns (expected behavior)

| Pattern | Responsive expectation |
| --- | --- |
| Button / Badge / Input / Select | Fluid width when placed in `w-full` containers; don’t assume desktop-only side-by-side fields |
| Dialog / Alert Dialog | Full-bleed margins on small screens; wider max-width from `sm:` up; footer actions stack then row |
| Sheet | Nearly full width on phones; capped width from `sm:` |
| Drawer | Bottom sheet on mobile; use for compact mobile flows |
| Sidebar | Collapses / off-canvas below `md` via `useIsMobile` |
| Table | Horizontally scrollable container; sticky header optional in product layouts |
| Tabs | Allow wrap or scroll if many triggers; don’t force equal-width tabs that crush labels |
| Forms (Label + Input + Field) | Single column by default; multi-column only from `md:` up |

Keep upstream `sm:` / `md:` classes when installing or updating primitives
([`AGENTS.md`](./AGENTS.md), "Adapt an upstream component").

---

## Do / Don’t

**Do**

- `className="flex w-full flex-col gap-4 md:flex-row"`
- `className="w-full max-w-lg"` on forms and dialogs content
- Wrap tables: `<div className="overflow-x-auto"><Table>…</Table></div>`
- Use Sheet/Drawer when a Dialog feels cramped on a phone

**Don’t**

- `className="w-[720px] grid grid-cols-3"` with no breakpoint story
- Duplicate entire “MobileButton” components — use size/variant and layout instead
- Gate essential content behind `hidden md:block` with no mobile alternative
- Hardcode breakpoint pixel values in CSS when a Tailwind prefix already exists

---

## Checklist before shipping a screen

- [ ] Usable at ~375px width without horizontal page scroll (except intentional table scroll)
- [ ] Primary actions visible without hover
- [ ] Forms readable in a single column on small screens
- [ ] Overlays (Dialog / Sheet / Drawer) chosen for the task and viewport

---

## Related

- Token and component rules: [`AGENTS.md`](./AGENTS.md)
- Mobile hook: `src/hooks/use-mobile.ts`
- Components: `src/components/ui/`
