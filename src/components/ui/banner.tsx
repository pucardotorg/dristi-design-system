"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { StatusMark, type MarkTone } from "@/components/ui/status-mark"

/**
 * A condition true for the whole page from the moment it loads (the court is closed that
 * day, you are viewing read-only, filing closes at 5 pm). Not feedback on an act, and never
 * a note inside a dialog or a card: those are `StatusLine`.
 *
 * The band (owner, 2026-11-06): it runs across the whole area it belongs to (the page
 * column under the page header, never under the rail), square, in its tone's opaque tint,
 * with the status line's marks and weight rule a step larger: a 28px mark, 40px with a
 * detail line, at least 56px tall. No rail and no edge lines, except a neutral band on
 * anything but white, which takes a hairline above and below it (`onWarm`).
 *
 * Its content lines up with the page's own content: pass the page's side padding as
 * `inset` (default 16px, 24px from `sm`). Its one action sits on the right (under the words
 * on a phone, so the sentence keeps its width): an underlined
 * link in the tone's ink when it takes the person somewhere, a small outline button when it
 * does something (with a working state while it runs). When the act succeeds, the banner
 * itself changes to the new condition or goes away; no extra message on top.
 */

type Variant = "info" | "warning" | "success" | "error" | "neutral"

const TINT: Record<Variant, string> = {
  info: "bg-info-muted",
  warning: "bg-warning-muted",
  success: "bg-success-muted",
  error: "bg-destructive-muted",
  neutral: "bg-surface-sunken",
}

const DETAIL: Record<Variant, string> = {
  info: "text-info-muted-foreground",
  warning: "text-warning-muted-foreground",
  success: "text-success-muted-foreground",
  error: "text-destructive-muted-foreground",
  neutral: "text-muted-foreground",
}

/* The link's ink: the tone's own text colour, never teal (one teal action per view stays
   with the page). */
const INK: Record<Variant, string> = {
  info: "text-info-ink",
  warning: "text-warning-ink",
  success: "text-success-ink",
  error: "text-destructive-ink",
  neutral: "text-foreground",
}

/* The same press as every Button (a 1px drop), a heavier underline on hover, the focus
   ring, and a 40px hit area on touch screens. */
const LINK =
  "relative shrink-0 rounded-sm text-body-compact font-medium underline decoration-1 underline-offset-4 outline-none hover:decoration-2 focus-visible:ring-3 focus-visible:ring-ring/50 active:translate-y-px pointer-coarse:after:absolute pointer-coarse:after:-inset-3"

/* One action. `href`: it takes the person somewhere, so it is a link. `onClick`: it does
   something and the person stays, so it is a button, with the working state while `busy`.
   Anything else is rendered as given. */
type ActionSpec = {
  label: string
  href?: string
  onClick?: () => void
  /** The act is running: the button shows a spinner and `busyLabel`, and cannot be pressed. */
  busy?: boolean
  busyLabel?: string
}
type Action = React.ReactNode | ActionSpec

function isSpec(a: Action): a is ActionSpec {
  return typeof a === "object" && a !== null && !React.isValidElement(a) && "label" in a
}

function Banner({
  className,
  variant = "info",
  title,
  icon,
  glyph,
  action,
  inset = "px-4 sm:px-6",
  onWarm = false,
  children,
  ...props
}: Omit<React.ComponentProps<"div">, "title"> & {
  variant?: Variant
  /** A short title; `children` becomes its detail line. */
  title?: React.ReactNode
  /** Neutral only: the condition's own icon (a calendar for a holiday, an eye for read-only). */
  icon?: React.ComponentProps<typeof StatusMark>["icon"]
  /** Info only: the hourglass (waiting) or the "i" (worth knowing; the usual banner). */
  glyph?: "hourglass" | "i"
  /** One action. `{ label, href }` takes the person somewhere: an underlined link.
      `{ label, onClick, busy?, busyLabel? }` does something: a small outline button with its
      working state. Anything else is rendered as given. */
  action?: Action
  /** The page's own side padding, so the banner's content lines up with the page's. */
  inset?: string
  /** Neutral only: the band sits on anything but white, so hairlines run above and below. */
  onWarm?: boolean
}) {
  const tone: MarkTone = variant
  const spec = action && isSpec(action) ? action : null

  return (
    <div
      data-slot="banner"
      data-variant={variant}
      role="status"
      className={cn(
        "w-full text-foreground",
        TINT[variant],
        onWarm && variant === "neutral" && "border-y border-border",
        className
      )}
      {...props}
    >
      <div className={cn("flex min-h-14 items-center gap-3 py-3", inset)}>
        <StatusMark tone={tone} icon={icon} glyph={glyph ?? "i"} size={title ? 40 : 28} still onTint />
        {/* On a phone the action sits under the words, so the sentence keeps the full
            width; from 640px it sits on the right. */}
        <div className="flex min-w-0 flex-1 flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-4">
          <div className="flex w-full min-w-0 flex-col gap-0.5 py-0.5 sm:w-auto sm:flex-1">
            <p className={cn("text-body-compact text-pretty", title ? "font-semibold" : "font-medium")}>
              {title ?? children}
            </p>
            {title && children ? (
              <p className={cn("text-body-compact text-pretty", DETAIL[variant])}>{children}</p>
            ) : null}
          </div>
          {spec ? (
            spec.href ? (
              <a href={spec.href} className={cn(LINK, INK[variant])}>
                {spec.label}
              </a>
            ) : (
              <Button
                size="sm"
                variant="outline"
                onClick={spec.onClick}
                disabled={spec.busy}
                aria-busy={spec.busy || undefined}
                className="shrink-0 pointer-coarse:after:absolute pointer-coarse:after:-inset-0.5"
              >
                {/* Both labels share one cell, so the button is sized for the longer one
                    and never changes width when it starts working. */}
                <span className="grid">
                  <span className={cn("col-start-1 row-start-1 inline-flex items-center justify-center gap-1.5", spec.busy && "invisible")}>
                    {spec.label}
                  </span>
                  <span
                    aria-hidden={!spec.busy}
                    className={cn("col-start-1 row-start-1 inline-flex items-center justify-center gap-1.5", !spec.busy && "invisible")}
                  >
                    <Spinner aria-hidden />
                    {spec.busyLabel ?? spec.label}
                  </span>
                </span>
              </Button>
            )
          ) : action ? (
            <div data-slot="banner-action" className="shrink-0">
              {action as React.ReactNode}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export { Banner }
