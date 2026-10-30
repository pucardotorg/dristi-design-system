# Changelog

All notable changes to the Pucar Design System docs and components.

## 2026-10-30 — Side panel, from the product's case peek

**New: `side-panel`** (`SidePanel`, `SidePanelRegion`, `SIDE_PANEL_PUSH`). A docked,
non-modal panel beside the page for looking at one record while the list stays usable,
promoted from the product's case peek (owner: the peek and Sheet do different jobs, so the
system offers both).

- From `sm` the page makes room: elements given `SIDE_PANEL_PUSH` step aside by the panel's
  27rem while wide tables keep their width and the panel slides over their right edge (the
  product's Sept 11 fix for a table re-flowing on every frame).
- Slides in and out over 300ms with no fade, staying mounted through the exit.
- A bottom drawer on phones. Escape closes it; focus moves in on open and back to the
  opener on close. No scrim and no focus trap, by design.
- Sheet's docs now point here for the peek case.

## 2026-10-30 — Owner review round 2: primitives catch up with the product

The product's copies of these primitives are identical to the design system's; where the
product looked right, each screen had patched it by hand. The fixes now live here, and the
product's per-screen patches can go on upgrade.

- **Table:** the product's table treatment (`table-plate`) is the default: hairline rows,
  a `surface-sunken` header strip with rounded ends, a rounded warm-well hover that hides
  the neighbouring rule, rounded selected runs. The old default drew dark `border` rules.
- **Tabs:** the line variant is `h-10`, flush, with the underline on the bottom edge and
  square triggers (the product re-patched this 29 times). Pill triggers fill the list and
  sit concentric: 7px inside the 10px list.
- **Segmented control:** the pill sits the same inset from the well on every side and from
  its neighbours (was 2px, 3px and 4px), so the curves run parallel.
- **Sheet:** slides fully in and out over 300ms with no fade, as the product's filter
  sheets and case peek do. The scrim still fades.
- **Toggle / Toggle group:** the default has an edge (an edgeless toggle read as a letter);
  `pill` is the product's filter pill with the brand tint when on; `ghost` keeps the
  edgeless look for toolbars that are themselves the edge. On upgrade, the rich-text
  toolbar moves to `ghost`.
- **Switch:** the knob travels to an even 2px inset (it stopped 5px short, a teal halo).
- **Menubar:** hairline edge, triggers concentric with the bar.
- **Card:** on `raised`, the footer drops its fill and keeps the hairline divider; a muted
  band merged with the tinted page.
- **Card footer buttons sit on the right** (owner, 2026-10-30), with an 8px gap.
- **Alert Dialog page:** the preview is the real pattern: Confirm mark, the act named on
  the button, soft destructive.

## 2026-10-30 — Owner review of the docs: four fixes

- **`AlertDialog` with an icon:** the header set no column widths, so the icon's column
  grew to 65px for a 40px icon and the title sat 41px away. It is now `auto 1fr`, a 16px
  gap. Every confirm with an icon in the product had the same gap; it closes on upgrade.
- **`Stepper` connectors join the circles and labels centre under them** by default (owner,
  2026-09-01). The product built this as an override (`FlowStepper`); two product screens
  still on the old gapped default (registration flow, vakalatnama wizard) come right on
  upgrade.
- **Toast page** is now "Toast (primitive)": the Sonner layer Notify draws into, never
  called directly. Its preview shows the primitive's old pale variants for reference only.
- **Status line docs:** the badge row shows one badge animating ("just changed") beside the
  still ones, so Replay demonstrates the rule instead of appearing broken.

## 2026-10-30 — Card: the background decides

**`Card` gets `variant`: `outline` (default) and `raised`.** Outline is the existing look, a
defined `border`. Raised is a `hairline` edge plus `shadow-raised`. Owner ruling: the
background decides. Raised on a warm or tinted surface (the `muted` page, dialog stages,
wells), outline on white; media frames stay outline anywhere. This narrows the 2026-08-25
ruling that every panel lifts.

**Measured across the product before deciding:** cards on the warm page and in dialogs
already lift (the filing dashboard, case page, court dialogs), cards on white pages and in
white side panels stay outlined (citizen home, bond signing, the case peek). The product
builds the lift by hand today (`border-hairline shadow-raised` and shared constants); on
upgrade those become `variant="raised"`. The onboarding modal, on the warm surface, was the
one place breaking the rule and was fixed in the product (dristi-fe-design#176).

The Card docs no longer say "don't add shadow-raised" and "the raised shadow says panel"
side by side; AGENTS and the Laws page state the rule.

## 2026-10-30 — Agent guidance: wrong facts fixed, three rules enforced

From an audit of what agents read on every build, each mismatch checked against the design
system's code and the product app's `main`.

**Eight facts corrected:** the component count (AGENTS, llms.txt) and contrast-pair count
(AGENTS) are no longer stated as numbers that drift; the Laws page now describes prefilled
as it ships (amber fill, dashed `warning-ink` edge, hidden label); RESPONSIVE gives Dialog's
real `sm:max-w-90`; llms.txt sends wells to `surface-sunken`, not `track`, and links to the
real files; README lists the Motion and Status foundations and says which checks lint runs.

**Three prose rules are now checks** in `check:tokens`: spacing off the ladder (rule 7a),
a translucent status fill such as `bg-destructive/10` (rule 6; focus rings on invalid
controls stay translucent on purpose), and a raw-pixel height such as `h-[42px]`. Spacing
that predates the check (upstream primitives left as installed, and docs chrome) is listed
in `SPACING_BACKLOG`; new code cannot add to it.

**Not changed, open for decision:** whether `Card` lifts with `shadow-raised` (the Aug 25
ruling says panels do; in the product 11 of 102 cards and 35 hand-built panels do), and
whether side `Sheet`s go full width on phones (the product's advocate side already does).

## 2026-10-30 — Status & feedback: one mark, three weights

Success, failure and warning were expressed 71 ways across Dristi, in 11 patterns, with
no shared component. 23 of those moments were a toast or nothing. The Dristi rollout
(pucardotorg/dristi-fe-design#174, merged 2026-10-30) moved every flow onto one set of
pieces, tested on phone, iPad and desktop, light and dark, with reduced motion. This
brings those pieces into the system unchanged, so screens compose them instead of
copying them.

**New components** (Status & feedback): `status-mark`, `outcome`, `status-line`,
`confirm-mark`, `notify` and `feedback-toaster`. Each has a docs page with live previews.

**New foundations:** Motion (the budget by size, every duration and curve, reduced
motion) and Status & feedback (tones, which piece, the rules, retired patterns).

**Motion lives in `src/app/feedback.css`**, imported by `globals.css`. Only the status
components use its classes.

**Decided with the product owner during the rollout,** now component defaults:
- The title sits under the mark; every outcome closes on a `surface-sunken` footer band.
- Hero marks wait 160ms and hold until painted. Success rings once; loops and three
  pulses were tried and dropped.
- Small success ticks draw themselves; other small glyphs scale in.
- Toasts last 2.75s and leave on any page press. Error toasts stay until closed, carry
  a close button, and a repeated error re-enters from the bottom instead of stacking.
- Partial results are neutral with a checklist icon, with a tally underneath.
- Removals use the soft red `destructive` button, never `destructive-solid`.

**`sonner` 2.0.7 → 2.0.8.** In 2.0.7, `toast.dismiss` does not remove a custom toast, so a
repeated error stacked a second card. 2.0.8 (the version Dristi already runs) fixes it.

**Fixed after an independent review (2026-10-30):**
- `notify.error` waited for any `role="dialog"`, so an open popover or date picker held an
  error back indefinitely. It now waits only for a modal (dialog, alert dialog, sheet,
  drawer), and for 30s at most.
- A fast double repeat of the same error could still stack two cards; a repeat during the
  120ms gap now replaces the pending one.
- Badge marks: guidance and previews pass `still`, so a list of badges does not animate on load.
- Button, Toast, Alert, Banner and ACCESSIBILITY.md text now points at Notify, Outcome and
  soft destructive instead of contradicting them.
- Stale docblocks (toaster, status line, outcome), the skill's lock-line name, and the Motion
  page's durations corrected; every motion class is now listed. Dead `fb-chip` removed.
- The public registry ships `feedback.css` with each status component.

**Decided on review (owner and lead designer, 2026-10-30):**
- **Code leads for these components until the team decides on Figma.** Precedence puts the
  Figma master first; these components have no master yet. The ruling is scoped to Status &
  feedback and reversible: if Figma leads again, the components are built there from these
  pages (every size, tone, colour and timing is documented) and Figma resumes first place.
- **One footer grey: `surface-sunken`.** `DialogFooter` and `AlertDialogFooter` move from
  `bg-muted` to `bg-surface-sunken` with a `hairline` top edge. This changes every dialog
  footer, barely visible in light and a touch clearer in dark. `CardFooter` is unchanged.
- **`Badge` fits a 14px status mark itself** (`has-data-[slot=status-mark]`), so the
  `BADGE_WITH_MARK` workaround is gone. Products that used it drop the class on upgrade.
- **`DialogContent pinned` and `DialogBody`:** header and footer stay put and only the body
  scrolls, replacing the five classes every long dialog repeated by hand.
- **The rule 6 exception is granted for three places only:** the outcome band fade, the page
  outcome glow and the tally stripes. Everywhere else the three treatments stay strict.
- **The check script for retired patterns ships with the product's DS upgrade,** where those
  patterns lived. The design system lists them; the product enforces them.


## 2026-08-25 — Docs site catches up with the warm ramp

The warm-neutral PR changed the tokens and the AGENTS contract but never touched
`src/app/(docs)/`, so the deployed site kept describing the tinted-canvas model
that the same PR reverted. Everything below was stating something false to every
reader of the live docs.

**Foundations / colors.** `background` and `card` now read `#ffffff` instead of
`surface-sunken` / `neutral-1`; `surface-sunken` corrects to the warm `#f5f4f1`;
`accent` corrects to neutral-3 and `accent-strong` to neutral-4 (both were still
listed a step high from the pre-warm ramp). The `track` row now says what the
role narrowed to — tiny countable marks only. Notes that explained the
page/card fill split are replaced by the edge-and-lift model.

**`brand-canvas` and `paper` were invisible.** Nine tokens shipped with no
presence on the docs site at all — not in the mapping table, not as swatches.
Both families now have mapping rows with their measured ratios, a "Fixed
surfaces" swatch section, and rows in Roles at a glance, with the
does-not-invert rule stated on each.

**Foundations / elevation, Laws, Principles.** The Card guidance and the
grouped-content law dropped the fill-contrast claim for the hairline + raised
shadow model. The grey ladder in Principles was off by a step from `accent`
onward; it now reads muted (2) → surface-sunken (2½) → accent (3) →
accent-strong (4) → secondary (5) → track (6) → border (8) → input (9).

**SegmentedControl's own docs described the version before its correction.**
The component moved to `surface-sunken` + hairline in the same PR, but its
registry entry still said "raised chip on a recessed track", still listed
`track` / `background` / `primary` as its tokens (the component uses none of
the three — the teal was removed when the selected label went to weight 600),
and still quoted 1.28:1 for a chip that now measures **1.10:1 in light and
1.13:1 in dark**. Corrected, with the weaker measured separation stated plainly
so the shadow, hairline, ink and weight all read as load-bearing.

**AGENTS.md.** Three semantics-table rows still asserted the sunken page.


## 2026-08-25 — The neutrals go warm; wells stop being tracks

Two rulings from the owner's scrutiny-v4-beige exploration, landed together
because the second is what makes the first read right.

**Warm neutral ramp (light mode).** Every light neutral step is replaced by a
warm twin at locked luminance (max drift 2.4 points, on the track step the
exploration itself pinned). The lightness ladder is untouched — only the
temperature moves — so no layering relationship changes. Duty steps keep their
measured ratios: neutral-9 3.42:1 on white, neutral-11 5.70:1, neutral-12
17.35:1. The page returns to true white (`--background`/`--card`/`--surface`:
#ffffff): panels read by hairline + raised shadow, and the 2026-08-11
tinted-canvas page/card split is reverted — warmth replaces the grey stage as
the answer to "white on white doesn't read". The raised shadow tint warms to
match. Hover steps down to neutral-3 and pressed to neutral-4 (the warm hue
shift carries perceptibility that pure luminance never did). Dark mode stays on
the cool ramp; its warm twins are a recorded follow-up.

**Track is for marks; wells are for controls.** `track` now means tiny
countable marks only — progress, slider, skeleton. Control-sized wells stop
using it: the Tabs list, the SegmentedControl well, and the Attachment tile
become `surface-sunken` + a hairline stroke, the exploration's slot recipe —
you feel the boundary rather than see a block of colour. The selected
segmented chip lifts with `shadow-raised` over its own hairline edge.

## 2026-08-25 — Promotions from Dristi: segmented control, canvas tokens, two props

Four things Dristi had built privately, promoted here so the app stops carrying
forks. All four came out of a component audit of the merged
`scrutiny-back-adv` + `case-access-management` branches.

**`SegmentedControl` (new).** Replaces two separate implementations that had
grown in Dristi — one for filing forms, one for sign-in — which answered the
touch-target question differently. One component, two sizes:

- `default` — 40px well, 36px pill (2px inset), for forms.
- `compact` — 32px well, 26px pill (3px inset), for secondary choices in dense
  chrome.

Both keep a **40px hit target**; only the visible well and pill shrink. That is
the reason this exists rather than `ToggleGroup size="sm"`, whose 28px target is
below the 40x40 floor. Measured on the running docs page: default 64x40,
compact 55x40.

Selection is a raised chip on a recessed track, following Tabs. Measured at
1.28:1 against `track`, so the fill is deliberately *not* the only signal —
`shadow-raised`, foreground text colour, and (compact) a weight step carry it
too. Worth revisiting whether `track` should sit a step darker; that is a token
question, not a component one.

**`--brand-canvas` family (new).** The deep-teal plate behind full-height
sign-in and marketing panels: `brand-canvas`, `-deep`, `-foreground`,
`-muted-foreground`. Tuned stops rather than ramp steps — the light stop sits
between dark brand-5 and brand-6, the deep stop below dark brand-1. Repeated
verbatim in `.dark`: the plate is a fixed institutional surface and must not
invert. Measured: white on canvas 8.78:1, muted pair 5.63:1.

**`DocumentSlot`: `copy` and `disabled`.** `copy` overrides the built-in
strings, so a slot can say "Add cheque" instead of "Choose file" and speak the
caller's language; `disabled` locks it while a scan is in flight. Five call
sites in Dristi already depend on both.

**`StepperItem`: `onActivate` and `activateLabel`.** Makes a completed step
navigable so a flow can offer back-navigation. The indicator becomes a button;
the title mirrors it at `tabIndex={-1}` so the step exposes one stop, not two.
Unset, the step stays a static marker exactly as before.

Dristi's fork also carried an `alignment` variant on `StepperItem`. It is not
promoted — no call site used it.

## 2026-08-13 — Tabs active label is primary

Active `TabsTrigger` text uses `text-primary` (brand teal) instead of
`text-foreground`. The colour is bound with `data-[state=active]` — shadcn's
`data-active:` variant wraps the attribute in `:where()`, so it lost to the
inactive `text-muted-foreground` / `hover:text-foreground` utilities. Hover no
longer snaps the active label back to ink. The line variant's underline uses
`brand-accent`, the non-text mark token.

## 2026-08-11 — Page/card fill split (stronger)

Default pages no longer share a fill with Card. Product UI needed panels to
read without relying on border alone.

### Divergence from the Rajini 2.0 master

The live Figma Card master keeps card fill flat with the page (both
`neutral-1`). This change puts the page on the tuned sunken well so default
Cards pop clearly by fill.

| Token | Was | Now (light only) |
| --- | --- | --- |
| `--background` / `--surface` | `neutral-1` | `surface-sunken` (`#f4f4f7`) |
| `--card` / `--popover` | `neutral-1` | `neutral-1` (unchanged) |
| `--muted` / `--surface-raised` | `neutral-2` | `neutral-2` (between sunken page and card) |
| `--accent` / `--secondary` | `neutral-4` | `neutral-5` |
| `--accent-strong` | `neutral-5` | `neutral-6` |

**Light only.** Dark keeps the flat model (`background` / `card` / `surface` =
`neutral-1`; accent/secondary stay at `neutral-4` / strong at `neutral-5`) —
dark never had the invisible-panel problem. Subtle option (page → `neutral-2`)
was tried first; stronger confirmed for light.

- **Laws / AGENTS.md / Card / Colors** — default Card on the page has fill
  contrast; border still required; unbordered muted remains a defect.
- **Form chrome on the page** — Input, Select, Textarea, InputGroup, outline
  Button/Toggle use `bg-card` so fields read as white against the sunken page
  (transparent fills looked disabled; `bg-background` would match the page).
- **Tabs** active pill uses `bg-card` (panel fill) instead of `bg-background`.
- **Item** `outline` variant adds `bg-card` — border-only items were invisible
  panels once the page left `neutral-1`.
- **Item** hover wash moves from nested `[a]:hover:bg-accent` onto the Item
  itself (`hover:bg-accent`), matching `TableRow` — stretched row/card links
  never painted the tile, only the text-sized anchor.
- **Card** gets the same `hover:bg-accent` wash (footer follows via
  `group-hover/card`) so selectable cards match table rows and Items.
- Needs Abhiram ratification against the Figma master.

## 2026-08-03 — Muted stage + flat Card (preferred for multi-panel stages)

Locks the composition confirmed in Dristi accused onboarding: stage behind panels
is `bg-muted` (neutral-2); Cards stay default `bg-card` (neutral-1) so the panel
fill reads. Border still required — unbordered muted remains a defect.

- **Laws / AGENTS.md / Card / Colors** — prefer muted stage + default Card for
  multi-panel dialogs, wizards, and review stages. Alternate: neutral-1 stage +
  Card with `bg-muted` when only one panel needs soft fill.
- Default flat pages stay `background` / `bg-card` (both neutral-1); do not mute
  every product page.

## 2026-08-03 — Spacing & radius foundations match Figma

Rebuilt from the Abhiram Figma **Spacing & radius** page
(`node 17:2`). The old spacing page was thin, named the wrong product, and did
not teach the ladder agents must follow.

- **Spacing** — full ladder table with visual scale bars; control-metrics
  callouts (40px fields, 24px card padding, 24px chips, ≥40 touch); recipes;
  Do/Don’t for off-ladder steps (`p-5`, `gap-10`, arbitraries). States clearly
  that code ships no custom spacing tokens — Tailwind’s default scale is SoT.
- **Radius** — horizontal swatches matching Figma roles; derivation multipliers
  from the single `--radius` (10px) knob in `globals.css`; role table
  (container xl · control lg · inset md/sm · chip full); corrected `full` to
  `999px`.
- **Laws / AGENTS.md** — new “Stay on the spacing ladder” law and rule **7a**
  so coding agents compose on-ladder gaps/padding by default.
- Nav order: Spacing before Radius.

## 2026-08-03 — Grouped content surface guidance

Closes the invisible grey-panel pattern found in Dristi accused onboarding.

- **Laws** — new "Grouped content gets a border" section: Card + Description list
  for bounded panels; `surface-sunken` for nested media wells; `bg-muted` alone is a
  defect for self-contained groups.
- **Card / Description list docs** — dontItems call out `rounded-xl bg-muted` as a
  wrong stand-in for Card.
- **Colors / Elevation / AGENTS.md** — muted is not a panel edge; Card border is;
  `surface-raised` and `muted` stay ~1.01:1 against the page by design.

## 2026-08-01 — Colors mapping table role honesty

The foundations/colors semantic → primitive table was teaching the wrong mental
model even after the Aug 1 value corrections.

- Split `surface-raised` from `card / popover / surface` — raised is
  `neutral-2`, not flat with the page.
- Split `secondary` and `accent` into separate rows (same step, different
  roles) and stopped labeling secondary as a hover fill.
- Split status `*-ink` from `*-muted-foreground` so the three treatments stay
  visible; documented coinciding values explicitly.
- Alias vs literal consistency: `ring` → `brand-solid`, charts list real hex,
  hover composites documented as `color-mix`.
- Added hairline, focus rings, scrim, disabled-fill, halo, sidebar aliases,
  and surface / surface-raised swatches.
- Section copy now states that identical light/dark step names are intentional.

Generating this table from `globals.css` remains an open follow-up.

## 2026-08-01 — Accessibility, gate honesty, and agent endpoints

Closes the remaining high-severity findings from the Aug 1 audit after the
contrast/token pass earlier the same day.

### Accessibility

- **FieldError is programmatically bound.** `Field` provides context; `FieldError`
  and `FieldDescription` mount with stable ids; `Input` / `Textarea` inside a
  Field receive `aria-describedby` and `aria-invalid` automatically. Docs preview
  no longer hand-wires a disconnected error.
- **`prefilled` is no longer colour-alone.** Dashed `warning-ink` border plus a
  visually hidden “Machine filled, not yet verified” description.
- **Touch targets ≥ 40×40.** Switch, Checkbox, Radio, and Slider thumb expand
  hit areas via `after:` insets; Switch geometry moved to token scale (`h-5` /
  `w-9`).
- **Progress docs model the required pattern** — visible percent +
  `aria-labelledby`. Checkbox gains an indeterminate indicator.
- **Overlay focus.** Dialog and Alert Dialog keep `outline-none` but add a
  visible `focus-visible` ring. `DirectionProvider` is mounted at the root with
  `dir="ltr"`.
- **Alert** gains `success` / `warning` / `info` variants; **Banner** gains
  `error`; **Toaster** enables `richColors` so typed toasts use their tokens.
- **Read-only fields** get a muted fill distinct from disabled.

### Governance / agent-readability

- `check-tokens.mjs` now fails on `bg-white` / `text-black` and on raw-unit
  arbitrary spacing/radius (`rounded-[7px]`, `p-[13px]`), matching what rule 1
  claimed. Slider thumb uses `bg-background`.
- GitHub Actions CI runs `npm run lint` and `npm run build` on every PR.
- `extendTailwindMerge` registers the custom `text-*` and `shadow-*` tokens.
- `public/llms.txt`, `public/robots.txt`, `src/app/sitemap.ts`, and
  `public/r/registry.json` (via `npm run build:registry`) make the docs
  discoverable to agents.
- `surface-raised` steps to `neutral-2` so the elevation ladder is not five
  names for one value; `card` / `popover` stay flat with the Figma master.

## 2026-08-01 — Contrast and token-derivation reconciliation

Triggered by the "Aug 1st Iteration" review and its Claude-assisted audit section.
Every claim in that document was re-measured against the repo; all three of its
contrast figures reproduced exactly, and five more failures were found alongside
them.

### Divergences from the Rajini 2.0 master

These change values the live Figma file specifies, so they need Abhiram's
ratification. The Figma MCP could not be read during this pass (it requires a
layer selected in the desktop app), so nothing here was cross-checked against the
master.

- **Neutral role assignments shifted one step.** `accent` and `secondary`
  neutral-3 → neutral-4, `accent-strong` neutral-4 → neutral-5, `track`
  neutral-5 → neutral-6, `border` neutral-7 → neutral-8, `sidebar-border`
  neutral-5 → neutral-6. Radix Slate assumes step 1 is the app background; we set
  `--background` to neutral-1 *and* pointed hovers at neutral-2/3, so every
  interaction state sat 1.03–1.19:1 against the page. The ramp itself is
  unchanged — only which step each role points at.
- **`chart-4` darkened** from `#e2a336` (2.15:1) to `#bd7b00` (3.42:1) in light.
  A chart series conveys meaning, so WCAG 1.4.11 applies. Dark is unchanged.
- **Warning solid button gains a `warning-ink` border.** The Rajini yellow is
  1.54:1 on the page, so the fill alone cannot delimit the control. Bordering it
  preserves the exact brand yellow, which the alternatives did not.

### Token architecture

- `border-hairline`, `disabled-fill`, `halo` and both `focus-ring` tokens were
  flattened hex carrying baked alpha — transcribed from Figma, which drops paint
  opacity on a bound variable. They now derive via `color-mix` from their source
  token. `scrim` stays literal: its pre-`color-mix` fallback would turn a 50%
  backdrop opaque.
- Twelve tokens that were literal hex duplicating an existing ramp step now alias
  it (`brand-accent`, `warning`, the four status inks, the dark solids, `chart-1`,
  `chart-2`). Genuinely off-ramp values — the brand teal, the light status solids
  and inks tuned for 4.5:1, `surface-sunken` — stay literal and say why.
- **The radius ladder now actually derives from `--radius`.** Two comments claimed
  it did while all ten steps were hardcoded pixels; only `sonner` and
  `input-group` ever read the knob. Steps are now `calc(var(--radius) * N)`.

### Components

Re-pointed to the token whose documented role they were already claiming:
Button, Badge, Toggle, Table, Menubar, Navigation menu, Item, Attachment,
Message scroller, Calendar, Bubble and Command now use `accent` for hover and
`accent-strong` for pressed, engaged and selected. Progress, Skeleton, Tabs list,
Slider and the Attachment thumbnail well now use `track`. `hover:bg-accent` had
zero occurrences before this change and `bg-track` had zero anywhere. Alpha fills
(`bg-muted/50`) on Card footer, Table footer and Item are now opaque per rule 6.

### Governance

- New `scripts/check-contrast.mjs`, wired into `npm run lint`. Measures 54 pairs
  in both modes — text at 4.5:1, chart series, field borders and the focus ring at
  3:1 — and fails the build below the floor. `ACCESSIBILITY.md` had asked humans to
  "prove with a contrast checker, do not eyeball" since July; nothing enforced it.
- The same script applies rule 1 to `globals.css`, which `check-tokens.mjs`
  explicitly exempts from its own no-hardcoded-colour scan. That exemption is why
  the baked-alpha primitives and duplicated literals were never caught.
- AGENTS.md gains rule 9 (measure, never assert) and rule 10 (use the token the
  role names), and now states plainly that a green gate is not a good design.

### Known open items

- The `foundations/colors` semantic mapping table is still hand-maintained.
  Role conflations and the `surface-raised` mis-map were corrected on Aug 1,
  but the table should eventually be generated from `globals.css` like the
  AGENTS.md token inventory so drift cannot return.
- Card remains flat with the Figma master (`card` == `background`); use
  `surface-raised` or a border when a product surface needs an edge.
- Full Playwright / axe suite and a versioned Figma↔token mapping artifact are
  still follow-ups — CI now gates lint + build, not visual regression.

## 2026-07-31 — Rajini 2.0 live-contract reconciliation

### Foundations
- Reconciled the repo against all 208 live variables in Abhiram’s Rajini 2.0
  file.
- Added engineered state, focus, scrim, hairline, disabled, halo, and
  theme-specific elevation primitives.
- Corrected Input and Sidebar aliases, status inks, full radius, and opaque
  hover composites.
- Made Abhiram’s live Rajini 2.0 file the explicit design contract throughout
  governance and site copy.

### Components
- Corrected Card density/elevation, Badge height, Banner anatomy, Document slot
  surfaces, modal geometry, Session timeout width, and all modal scrims.
- Added Date Picker and Date Range Picker compositions from installed Calendar,
  Popover, and Button primitives.
- Bound Timeline’s current-state halo and interactive Bubble states to Rajini
  tokens.

### Documentation and release quality
- Added 12 missing component pages and navigation entries, bringing the site to
  57 statically generated component routes.
- Replaced stale typography, spacing, color, elevation, and provenance guidance.
- Fixed React 19 effect patterns in Docs Shell, Carousel, and `useIsMobile`.
- ESLint, TypeScript, and the Next.js production build pass.

## 2026-07-31 — Accessibility standards

- Authoritative checklist: `ACCESSIBILITY.md` + `/foundations/accessibility`
- Conformance: **WCAG 2.1 Level AA** + **WAI-ARIA 1.2**
- Full list: screen readers, keyboard, focus, 4.5:1 contrast, no hover-only critical UI, **40×40px** touch targets, voice control, 200% zoom, session timeouts, visible labels, Indic scripts
- Core subset always enforced: WCAG 2.1 AA, WAI-ARIA 1.2, focus, contrast, 40×40 touch, 200% zoom, multilingual scripts

## 2026-07-31 — Abhiram parity (Milestones 1–5)

### Law compliance & forms
- Replaced alpha status fills (`bg-destructive/10`, etc.) with opaque `*-muted` tokens across Button, Badge, Bubble, Attachment, menus, Callout, and Do/Don't.
- Input and Textarea support `prefilled` (amber `bg-prefilled`, border stays `input`).
- Field docs: vertical / horizontal / invalid / prefilled compositions.

### New components
- **Banner** — standing page-load notice (`info` | `warning` | `success` | `neutral`)
- **Description list** — key/value scrutiny rows
- **Stepper** — complete / current / upcoming
- **Timeline** — past / current / future
- **Document slot** — e-filing upload states
- **Session timeout** — Alert Dialog + countdown well

### Foundations & docs IA
- `/foundations/icons` — 146 Lucide allowlist from Figma
- `/foundations/laws` — hard constraints mirrored from Abhiram
- `/blocks/sign-in` — auth composition pattern
- Nav: Status & feedback, Pucar, Icons, Laws
- Toast (Sonner) docs: success / info / warning / error / loading + when-to-use vs Alert / Banner

### Other
- Table docs: selected row + Badge status patterns
- `ROADMAP.md` remaining items closed for Milestones 1–5 core scope
