/**
 * What changed on each updated page (the Oct 30, 2026 round, plus the Nov 6 feedback round
 * for the status pieces). Local preview aid only:
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
  "status-mark": {
    summary: [
      "Nov 6: info can show an \"i\" (glyph=\"i\") for something worth taking in, with its own motion; the hourglass stays the default for sent and waiting. New 28px size; onTint for marks on a status tint.",
    ],
    items: [
      "Tones: success it happened · error it did not · warning it happened with a catch · info worth knowing (hourglass: sent and waiting; glyph=\"i\": anything else to take in) · neutral quiet housekeeping · danger the question before a removal.",
      "Info shows the hourglass by default (sent, waiting). glyph=\"i\" swaps it for a slim i, the warning's ! turned over: at 44px and up the dot drops in, then the stem draws down; smaller, it scales in.",
      "onTint: the mark sits on a status tint, so a neutral mark becomes a white chip with an edge and a slightly larger icon.",
    ],
    preview: true,
    sections: [],
  },
  "status-line": {
    summary: [
      "Nov 6: one tinted box with no rail; glyph=\"i\" for blue notes worth taking in; onWarm gives a neutral line a hairline edge on anything but white.",
    ],
    items: [
      "A neutral line on anything but white (the app's beige page, a dialog's warm stage) takes onWarm: a hairline edge, the toast's, or its grey melts into the surface. Coloured lines need none.",
      "Info lines pass glyph=\"i\" for something to take in (a scope, a consequence); the hourglass default is only for sent and waiting.",
    ],
    preview: true,
    sections: [],
  },
  notify: {
    summary: [
      "Nov 6: the toast is the status line, floating (tinted, no rail). New notify.info (the \"i\" or the hourglass). A toast with an action is 56px, with 12px round the button and matching corners.",
    ],
    items: [
      "notify.info for something worth knowing after an act: glyph: \"i\" for something to take in, the hourglass default when it was sent and is waiting on someone else.",
      "The error's close is 32px, tucked into the padding. A toast with an action is a step taller (56px): 12px all round the 32px button, whose 6px corner runs parallel to the toast's 18px. Both get a 40px hit area on touch screens.",
      "notify.neutral for quiet housekeeping (a draft saved, a task archived), with the act's icon.",
    ],
    preview: true,
    sections: [],
  },
  outcome: {
    summary: [
      "Nov 6: a blue outcome can show the \"i\" (glyph=\"i\"); a neutral header's mark is a white chip so it shows on the beige band.",
    ],
    items: [],
    preview: false,
    sections: [],
  },
  alert: {
    summary: [
      "Retired for new work (Nov 6). Every inline note is now a Status line; the docs say how each variant moves.",
    ],
    items: [
      "Do not use in new work. A note inside a page, a form or a dialog is a Status line; a condition for the whole page is a Banner.",
      "Moving an Alert: destructive to error, warning to warning, success to success; info and default to info with glyph=\"i\" when the person should take it in, neutral when it is housekeeping.",
      "Use a Status line for any note tied to the current form, page or dialog.",
      "Add a new Alert anywhere.",
    ],
    preview: false,
    sections: [],
  },
  banner: {
    summary: [
      "Rebuilt as the band (Nov 6): a whole-page condition under the page header, in the status line's family, with one underlined link on the right.",
    ],
    items: [
      "Whole-page conditions that stay while true: the court is closed that day, read-only access, filing closes at 5 pm, planned downtime.",
      "A note about one part of a page, a dialog or a card is a Status line, never a Banner (most banners in the app before Nov 2026 were such notes).",
      "inset: pass the page's own side padding, so the banner's content lines up with the page title at every width.",
      "onWarm (neutral only): on anything but white, hairlines run above and below so the grey band does not melt into the page.",
    ],
    preview: true,
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
