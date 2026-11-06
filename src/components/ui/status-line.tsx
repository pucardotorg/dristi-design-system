"use client";

import * as React from "react";
import { CircleXIcon } from "lucide-react";

import { FieldError } from "@/components/ui/field";
import { cn } from "@/lib/utils";

import { StatusMark, type MarkTone } from "@/components/ui/status-mark";

/**
 * Feedback inside a page or an open dialog.
 *
 * - `StatusLine`: one shape for every inline note (success, error, warning, info,
 *   neutral). One box tinted in its tone (the opaque `-muted` fill), no rail, no divider.
 *   A title and its detail stack with no rule between; the detail is in the tone's own
 *   text. Mark, words and action share one centre line, and the action stays on the right
 *   at every width. It replaces the success and failure uses of `Banner` and `Alert`.
 * - `StatusField*`: the field error. The field's red ring grows in, the line opens its own
 *   room, and the cross and the words drop in together from under the field. A repeat press
 *   shakes the field once and plays the line again (`useRefusal`).
 * - `LANDING`: the row a dialog acted on glows once when the dialog closes onto it.
 *
 * A mark inside a `Badge` needs nothing from here: `Badge` sets its inset itself.
 */

/* The tone's opaque tint: a status fill, never alpha. Neutral is the warm well. */
const TINT: Record<MarkTone, string> = {
  success: "bg-success-muted",
  error: "bg-destructive-muted",
  danger: "bg-destructive-muted",
  warning: "bg-warning-muted",
  info: "bg-info-muted",
  neutral: "bg-surface-sunken",
};

/* A title's detail, in the tone's own text on its tint (the measured -muted pair). */
const DETAIL: Record<MarkTone, string> = {
  success: "text-success-muted-foreground",
  error: "text-destructive-muted-foreground",
  danger: "text-destructive-muted-foreground",
  warning: "text-warning-muted-foreground",
  info: "text-info-muted-foreground",
  neutral: "text-muted-foreground",
};

/* The action keeps a 32px look (pass `Button size="xs"`), concentric with the 18px corner
   at the 10px inset; on a touch screen an invisible ring takes its hit area to 40px. */
const ACTION =
  "shrink-0 [&>*]:relative pointer-coarse:[&>*]:after:absolute pointer-coarse:[&>*]:after:-inset-1";

export function StatusLine({
  tone,
  title,
  children,
  action,
  icon,
  still,
  role,
  className,
}: {
  tone: MarkTone;
  title?: React.ReactNode;
  children: React.ReactNode;
  /** One button, `size="xs"`, `variant="outline"`. It stays on the right at every width. */
  action?: React.ReactNode;
  icon?: React.ComponentProps<typeof StatusMark>["icon"];
  /** Every line after the first in one screen arrives without motion. */
  still?: boolean;
  /** Announced when it appears after an act: `alert` for a failure, `status` otherwise.
      A `still` line (already true when the screen opened) is not a live region. */
  role?: "status" | "alert";
  className?: string;
}) {
  return (
    <div
      data-slot="status-line"
      role={still ? undefined : (role ?? (tone === "error" ? "alert" : "status"))}
      className={cn(
        "flex items-center gap-3 rounded-2xl p-2.5 text-foreground",
        action ? "pr-2.5" : "pr-3",
        TINT[tone],
        !still && "fb-rise",
        className,
      )}
    >
      {/* A titled line is taller, so its mark steps up to 28px. */}
      <StatusMark tone={tone} icon={icon} size={title ? 28 : 24} still={still} onTint />
      <div className="flex min-w-0 flex-1 flex-col gap-0.5 py-0.5">
        {title ? <p className="text-body-compact font-semibold text-pretty">{title}</p> : null}
        {/* Weight: a title over a detail is semibold; a line on its own is medium. */}
        <div className={cn("text-body-compact text-pretty", title ? DETAIL[tone] : "font-medium")}>{children}</div>
      </div>
      {action ? <div className={ACTION}>{action}</div> : null}
    </div>
  );
}

/**
 * Count refused presses. Pass `attempt` to `StatusFieldControl` and `StatusFieldError`:
 * the first refusal reveals the line, each repeat shakes the field and replays the line,
 * so a repeat press is never met with nothing. Call `reset` once the input is valid.
 */
export function useRefusal() {
  const [attempt, setAttempt] = React.useState(0);
  const refuse = React.useCallback(() => setAttempt((n) => n + 1), []);
  const reset = React.useCallback(() => setAttempt(0), []);
  return { attempt, refuse, reset };
}

/**
 * Wrap the refused control. On every refusal it takes focus; its red ring (from the DS
 * `aria-invalid` state, which the caller sets) grows in the first time; each repeat
 * refusal shakes it once. The control is never remounted (that would drop what was
 * typed and the focus); the animation is restarted on the wrapper instead.
 */
export function StatusFieldControl({
  attempt,
  children,
  className,
}: {
  attempt: number;
  children: React.ReactNode;
  className?: string;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  /* The attempt this wrapper last saw: mounting at attempt 3 (a remounted stage) is not a
     new refusal and must not shake or steal focus. */
  const seen = React.useRef(attempt);
  React.useEffect(() => {
    const el = ref.current;
    if (!el || attempt === seen.current) return;
    seen.current = attempt;
    if (attempt < 1) return;
    el.querySelector<HTMLElement>("input, textarea, select, button, [tabindex]")?.focus();
    if (attempt < 2) return;
    el.classList.remove("fb-shake");
    void el.offsetWidth; // restart the animation from its first frame
    el.classList.add("fb-shake");
  }, [attempt]);
  return (
    <div ref={ref} className={cn("fb-field", className)}>
      {children}
    </div>
  );
}

/** The field error line. It stays light: a 14px outline cross, no disc. */
export function StatusFieldError({
  attempt,
  children,
  still,
  className,
}: {
  /** From `useRefusal`; a new attempt replays the line. Omit for an error shown on load. */
  attempt?: number;
  children: React.ReactNode;
  /** Every error after the first in one form appears without motion. */
  still?: boolean;
  className?: string;
}) {
  const line = (
    <FieldError className={cn("flex items-center gap-1.5 pt-0.5 text-destructive-ink", !still && "fb-drop", className)}>
      <CircleXIcon className="size-3.5 shrink-0" strokeWidth={2.4} aria-hidden />
      <span>{children}</span>
    </FieldError>
  );
  return still ? (
    line
  ) : (
    <div key={attempt} className="fb-reveal">
      <div>{line}</div>
    </div>
  );
}

/** The row a dialog acted on, for one glow when the dialog closes back onto the list. */
export const LANDING = "fb-land";
