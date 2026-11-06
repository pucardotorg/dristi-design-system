"use client";

import * as React from "react";
import { XIcon } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { StatusMark } from "@/components/ui/status-mark";

/**
 * The product's toasts, for quick acts where the page stays put. Call these instead of
 * `toast.success` / `toast.error` / `toast()`.
 *
 * - **success**: access given, a reminder sent, a task archived from a list.
 * - **error**: an act that did not happen, raised from a page. **Stays until closed** and
 *   carries a close button: an error that times out before it is read is the worst case
 *   of the problem this system fixes. A click on the page does not dismiss it.
 *   The same error again never stacks a copy: the old card leaves and the error comes up
 *   from the bottom afresh, so a retry that failed again reads as new news.
 *   Inside an open dialog, a failure is never a toast (the dialog blocks the page, so the
 *   toast could not be closed): use `StatusLine` or `OutcomeHeader` there.
 * - **warning**: only where the product already treats it as a warning.
 * - **info**: worth knowing after an act. The hourglass by default (sent, waiting on someone
 *   else); `glyph: "i"` for something the person should notice that is not waiting.
 * - **neutral**: quiet housekeeping (a draft saved, a task archived). Pass the act's `icon`.
 *
 * Look: the status line, floating (owner, 2026-11-06). One box tinted in its tone, 18px
 * corners, no rail, an edge in its own tone, the same marks and weight rule, 380px wide
 * (the screen width less 16px margins on a phone). One-line toasts are 44px, two-line 66px.
 *
 * Success, warning and neutral toasts last **2.75s** (the old default was 4s; lead
 * designer, 2026-10-29), show a thin timer on the bottom edge, pause while the pointer is over them, and
 * leave as soon as the person presses anywhere on the page outside the toasts
 * (`FeedbackToaster` listens).
 *
 * Missing input is never a toast: point at the field (`StatusFieldError`).
 */

export const TOAST_LIFE_MS = 2750;

type Tone = "success" | "error" | "warning" | "info" | "neutral";
type Options = {
  description?: React.ReactNode;
  action?: { label: string; onClick: () => void };
  icon?: React.ComponentProps<typeof StatusMark>["icon"];
  /** Info only: the hourglass (sent, waiting; the default) or the "i" (worth knowing). */
  glyph?: "hourglass" | "i";
  id?: string | number;
};

/* Toasts a page press may dismiss. Errors never join, and leave it if an id is reused. */
const clickAway = new Set<string | number>();

/** Called by `FeedbackToaster` on any pointer press outside the toasts. */
export function dismissOnPageClick() {
  for (const id of clickAway) toast.dismiss(id);
  clickAway.clear();
}

/* Error cards by what they say. The same error again replaces its card instead of stacking
   a copy (owner, 2026-10-30). An entry is either on screen (`id`) or waiting out the gap
   before it rises (`timer`), so a fast double repeat still ends in one card. */
const openErrors = new Map<string, { id?: string | number; timer?: number }>();

/* The repeat starts rising as the old card leaves (sonner's exit is about 200ms), so two
   identical cards are never both in full view. */
const REPEAT_GAP_MS = 120;

function forget(id: string | number) {
  clickAway.delete(id);
  for (const [key, open] of openErrors) if (open.id === id) openErrors.delete(key);
}

function showError(title: React.ReactNode, options: Options = {}) {
  const key = options.id != null ? `id:${String(options.id)}` : typeof title === "string" ? `title:${title}` : undefined;
  const raise = () => {
    /* A fresh id every time, so sonner plays the entrance rather than updating in place. */
    const id = show("error", title, { ...options, id: undefined });
    if (key) openErrors.set(key, { id });
  };
  const previous = key ? openErrors.get(key) : undefined;
  if (!key || !previous) return raise();
  if (previous.timer !== undefined) window.clearTimeout(previous.timer);
  if (previous.id !== undefined) toast.dismiss(previous.id);
  openErrors.set(key, { timer: window.setTimeout(raise, REPEAT_GAP_MS) });
}

/* Each show gets its own key, so reusing an id restarts the card's timer bar with
   sonner's timer instead of leaving it half drained. */
let shown = 0;

function show(tone: Tone, title: React.ReactNode, options: Options = {}) {
  const persistent = tone === "error";
  const key = ++shown;
  const id = toast.custom(
    (toastId) => (
      <ToastCard
        key={key}
        tone={tone}
        title={title}
        description={options.description}
        action={options.action}
        icon={options.icon}
        glyph={options.glyph}
        persistent={persistent}
        onClose={() => toast.dismiss(toastId)}
      />
    ),
    {
      id: options.id,
      duration: persistent ? Number.POSITIVE_INFINITY : TOAST_LIFE_MS,
      /* The card draws its own surface and shadow; the list item stays bare. */
      style: { boxShadow: "none" },
      onDismiss: (t) => forget(t.id),
      onAutoClose: (t) => forget(t.id),
    },
  );
  if (persistent) clickAway.delete(id);
  else clickAway.add(id);
  return id;
}

/* An error toast behind an open modal cannot be closed (it stays until closed, and the
   modal blocks the page). Callers should say it inside the modal; as a safety net, one
   raised while a modal is open waits for it to close. Only modal surfaces count (the DS
   modals, or a hand-built `aria-modal` dialog): a popover or date picker is also
   `role="dialog"` but leaves the page usable. */
const MODAL_OPEN = ["dialog-content", "alert-dialog-content", "sheet-content", "drawer-content"]
  .map((slot) => `[data-slot="${slot}"][data-state="open"]`)
  .concat('[role="dialog"][aria-modal="true"]')
  .join(", ");

/* The longest an error waits behind a modal. Past this it shows anyway: an error shown late
   beats an error never shown. */
const MODAL_WAIT_MS = 30_000;

function modalOpen() {
  return typeof document !== "undefined" && !!document.querySelector(MODAL_OPEN);
}

function whenNoModal(run: () => void) {
  if (!modalOpen()) return run();
  let done = false;
  const finish = () => {
    if (done) return;
    done = true;
    observer.disconnect();
    window.clearTimeout(timeout);
    run();
  };
  const observer = new MutationObserver(() => {
    if (!modalOpen()) finish();
  });
  const timeout = window.setTimeout(finish, MODAL_WAIT_MS);
  observer.observe(document.body, { subtree: true, childList: true, attributes: true, attributeFilter: ["data-state"] });
}

export const notify = {
  success: (title: React.ReactNode, options?: Options) => show("success", title, options),
  error: (title: React.ReactNode, options?: Options) => whenNoModal(() => showError(title, options)),
  warning: (title: React.ReactNode, options?: Options) => show("warning", title, options),
  info: (title: React.ReactNode, options?: Options) => show("info", title, options),
  neutral: (title: React.ReactNode, options?: Options) => show("neutral", title, options),
};

/* The toast is the status line, floating: one box in its tone's opaque tint, 18px corners,
   no rail. */
const TINT: Record<Tone, string> = {
  success: "bg-success-muted",
  error: "bg-destructive-muted",
  warning: "bg-warning-muted",
  info: "bg-info-muted",
  neutral: "bg-surface-sunken",
};

/* A detail line in the tone's own text on its tint (the measured -muted pair). */
const DETAIL: Record<Tone, string> = {
  success: "text-success-muted-foreground",
  error: "text-destructive-muted-foreground",
  warning: "text-warning-muted-foreground",
  info: "text-info-muted-foreground",
  neutral: "text-muted-foreground",
};

/* The edge in the toast's own tone, one step deeper than its tint; in dark, the border.
   A warm grey hairline around a green or red tint read as a pale beige rim. It is an inset
   ring, drawn inside the fill, so the fill never shows past it at the corners. */
const EDGE: Record<Tone, string> = {
  success: "ring-success-muted-hover",
  error: "ring-destructive-muted-hover",
  warning: "ring-warning-muted-hover",
  info: "ring-info-muted-hover",
  neutral: "ring-border",
};

/* The timer in the tone's solid. On its own tint the warning yellow barely shows, so the
   warning timer takes the warning ink. */
const TIMER: Record<Tone, string> = {
  success: "bg-success",
  error: "bg-destructive",
  warning: "bg-warning-ink",
  info: "bg-info",
  neutral: "bg-muted-foreground",
};

/* The timer runs the full width, resting on the 1px edge line. Its clip is a box one pixel
   inside the card with the corner radius less that pixel, parallel to the edge line, so the
   line sits exactly on the edge into each corner. */
const TIMER_CLIP =
  "pointer-events-none absolute inset-px overflow-hidden rounded-[calc(var(--radius-2xl)-1px)]";

/* Buttons look 32px and eat into the padding, so every one-line toast is 44px tall and every
   two-line toast 66px; on a touch screen the hit area grows to 40px (ACCESSIBILITY §8). */
const TUCK = "relative -my-1 shrink-0 pointer-coarse:after:absolute pointer-coarse:after:-inset-1";

/* A toast with an action is a step taller: 12px all round the button, and the button's
   corner (6px) concentric with the toast's 18px at that inset. */
const ACTION_BUTTON = "relative shrink-0 rounded-sm pointer-coarse:after:absolute pointer-coarse:after:-inset-1";

function ToastCard({
  tone,
  title,
  description,
  action,
  icon,
  glyph,
  persistent,
  onClose,
}: {
  tone: Tone;
  title: React.ReactNode;
  description?: React.ReactNode;
  action?: Options["action"];
  icon?: Options["icon"];
  glyph?: Options["glyph"];
  persistent: boolean;
  onClose: () => void;
}) {
  /* No live-region role here: sonner's list is already the polite live region, and a
     second one inside it makes screen readers announce the toast twice. The list item
     already rises in, so the card does not animate its own entrance. */
  return (
    <div
      data-toast-card=""
      className={cn(
        /* A custom toast's list item shrink-wraps its content, so the card takes the
           toaster's 380px measure itself. On a phone (sonner's 600px line) the toaster makes
           each slot the screen width less its margins, and the card fills that slot, so the
           stack stays centred on any phone. */
        "relative flex w-(--width) max-w-full items-center gap-3 overflow-hidden rounded-2xl p-2.5 text-foreground shadow-overlay ring-1 ring-inset in-data-[sonner-toaster]:max-[600px]:w-full dark:ring-border",
        /* With an action the toast is a step taller, 12px all round (see ACTION_BUTTON);
           the error's ghost close sits closer, its icon already well inside its own box. */
        action ? "p-3" : persistent ? "pr-2.5" : "pr-3",
        TINT[tone],
        EDGE[tone],
      )}
    >
      {/* Mark, words and buttons share one centre line. A title over a detail is taller,
          so its mark steps up to 28px. */}
      <StatusMark tone={tone} icon={tone === "neutral" ? icon : undefined} glyph={glyph} size={description ? 28 : 24} onTint />
      <div className="flex min-w-0 flex-1 flex-col gap-0.5 py-0.5">
        {/* Weight: a title over a detail is semibold; a title on its own is medium. */}
        <p className={cn("text-body-compact text-pretty", description ? "font-semibold" : "font-medium")}>{title}</p>
        {description ? <p className={cn("text-body-compact text-pretty", DETAIL[tone])}>{description}</p> : null}
      </div>
      {action ? (
        <Button size="xs" variant="outline" className={ACTION_BUTTON} onClick={action.onClick}>
          {action.label}
        </Button>
      ) : null}
      {persistent ? (
        <Button size="icon-xs" variant="ghost" className={cn(TUCK, "text-muted-foreground")} aria-label="Close" onClick={onClose}>
          <XIcon aria-hidden />
        </Button>
      ) : (
        <span aria-hidden className={TIMER_CLIP}>
          <span
            className={cn("fb-drain absolute inset-x-0 bottom-0 h-0.5", TIMER[tone])}
            style={{ ["--fb-life" as string]: `${TOAST_LIFE_MS}ms` }}
          />
        </span>
      )}
    </div>
  );
}
