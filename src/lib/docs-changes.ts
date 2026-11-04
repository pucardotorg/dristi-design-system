/**
 * What changed on each updated page in the Oct 30, 2026 round. Local preview aid only:
 * items are matched by exact text, so a later edit to an item drops its star.
 */
export type DocsChange = {
  summary: string[];
  /** Exact list items (when to use, notes, do and don't, tokens) that are new or reworded. */
  items: string[];
  /** The preview, or the component it shows, changed. */
  preview: boolean;
  /** Variant section labels whose content changed. */
  sections: string[];
};

export const docsChanges: Record<string, DocsChange> = {
  badge: {
    summary: [
      "Fits a 14px status mark on its own. The BADGE_WITH_MARK workaround is gone.",
    ],
    items: [],
    preview: true,
    sections: [],
  },
  alert: {
    summary: [
      "Guidance now sends confirmations to Notify, Status line or Outcome, never Alert.",
    ],
    items: [
      "Use Banner for conditions that load with the page; Notify for quick confirmations; Status line or Outcome for results.",
      "Use Alert for a confirmation — that's Notify, Status line or Outcome.",
    ],
    preview: false,
    sections: [],
  },
  banner: {
    summary: [
      "Never a success or failure confirmation now. Guidance points to Notify, Outcome and Status line.",
    ],
    items: [
      "Prefer Alert for contextual form/page feedback; Notify for quick confirmations.",
      "Never as a success or failure confirmation: use Outcome, Status line or Notify.",
      "Use Banner for a one-time confirmation — that's Notify.",
    ],
    preview: false,
    sections: [],
  },
  sonner: {
    summary: [
      "Renamed Toast (primitive): the layer Notify draws into.",
      "Product code never calls toast() directly. Notify raises every toast.",
    ],
    items: [
      "Product toasts go through Notify and Feedback toaster, which carry the 2.75s life, click-away and persistent errors. This page documents the primitive underneath.",
      "Product code never calls toast() directly: Notify raises every toast (a draft saved is notify.neutral).",
      "Products mount Feedback toaster, not this primitive, and raise toasts through Notify.",
    ],
    preview: false,
    sections: [],
  },
  stepper: {
    summary: [
      "Connectors join the circles and labels sit centred under them, by default.",
    ],
    items: [
      "Connectors join the circles edge to edge and each label is centred under its circle (owner, 2026-09-01: no gap at either end of a line). Don't override the connector or label alignment.",
    ],
    preview: true,
    sections: [],
  },
  "alert-dialog": {
    summary: [
      "On a phone it rises from the bottom as a sheet, buttons full width.",
      "With an icon, the title sits 16px from it (was 41px).",
      "Footer is surface-sunken with a hairline top edge.",
      "Preview shows the real pattern: Confirm mark, the act named on the button, soft destructive.",
    ],
    items: [
      "Every confirm takes a Confirm mark: danger with the act's icon for removals, neutral for acts that cannot be taken back. The action button names the act and removals use the soft destructive variant.",
    ],
    preview: true,
    sections: [],
  },
  button: {
    summary: [
      "Removals use soft destructive, confirmed in an Alert Dialog with a Confirm mark.",
    ],
    items: [
      "Removals and discards use soft destructive, confirmed in an Alert Dialog with a Confirm mark. Keep destructive-solid out of confirm dialogs.",
    ],
    preview: false,
    sections: [],
  },
  card: {
    summary: [
      "New variant: outline on white, raised on a warm or tinted surface. The background decides.",
      "On raised, the footer drops its fill and keeps the hairline divider.",
      "Footer buttons sit on the right, 8px apart.",
    ],
    items: [
      'variant="outline" (default) on a white background: the defined border is the edge.',
      'variant="raised" on a warm or tinted surface (the muted page, a dialog stage, a well): a soft hairline edge and a faint shadow lift it off the tint.',
      "Media frames (a video, an image) stay outline on any background: a shadow makes a frame read as a floating card.",
      "The background decides (owner, 2026-10-30). Measured across the product: cards on the warm page and in dialogs lift; cards on white pages and in white side panels stay outlined.",
      "For nested soft fill inside a card, use surface-sunken. Never unbordered muted as a Card stand-in.",
      "Pick the variant from the background, not from taste: raised on tint, outline on white.",
      'Hand-build the lift with border-hairline shadow-raised; use variant="raised".',
      "Lift a card on white, or a video or image frame anywhere.",
      "hairline",
      "shadow-raised",
    ],
    preview: true,
    sections: [],
  },
  dialog: {
    summary: [
      "Footer is surface-sunken with a hairline top edge (was muted).",
      "New: DialogContent pinned and DialogBody, so header and footer stay put and only the body scrolls.",
    ],
    items: [],
    preview: true,
    sections: [],
  },
  menubar: {
    summary: ["Hairline edge, and triggers sit concentric with the bar."],
    items: [],
    preview: true,
    sections: [],
  },
  "segmented-control": {
    summary: [
      "The pill sits the same inset from the well on every side (was 2px, 3px and 4px).",
    ],
    items: [],
    preview: true,
    sections: [],
  },
  sheet: {
    summary: [
      "Slides fully in and out over 300ms with no fade. The scrim still fades.",
      "For looking at one record while the list stays usable, it now points to Side panel.",
    ],
    items: [
      "Sheet is modal: it floats over the page and dims it. To look at one record while the list stays usable, use Side panel instead (the case peek).",
    ],
    preview: true,
    sections: [],
  },
  switch: {
    summary: ["The knob travels to an even 2px inset (it stopped 5px short)."],
    items: [],
    preview: true,
    sections: [],
  },
  table: {
    summary: [
      "The product's table look is the default: hairline rows, a sunken header strip, rounded hover and selected rows.",
    ],
    items: [],
    preview: true,
    sections: [],
  },
  tabs: {
    summary: [
      "Line tabs are 40px tall and flush, with the underline on the bottom edge.",
      "Pill triggers fill the list and sit concentric with it.",
    ],
    items: [],
    preview: true,
    sections: [],
  },
  toggle: {
    summary: [
      "Default now has an edge. New pill variant for filter pills; ghost for toolbars.",
      "Edge matches the outline Button.",
    ],
    items: [
      "variant: default (edged; outline is the same) | pill (round filter pill, brand tint when on) | ghost (no edge: only inside a toolbar that is itself the edge). size: sm | default | lg.",
    ],
    preview: true,
    sections: [],
  },
  "toggle-group": {
    summary: [
      "Default now has an edge. New pill variant for the product's filter rows; ghost for toolbars.",
    ],
    items: [
      "variant: default (edged) | pill (filter pills; the product's filter rows) | ghost (toolbars only, where the toolbar is the edge).",
    ],
    preview: true,
    sections: ["Edged, one choice"],
  },
};
