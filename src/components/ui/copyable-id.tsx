"use client"

/*
 * CopyableId (promoted from Dristi's `Identifier`, components/chrome/identifier.tsx on
 * main, 2026-11-10). A case number, CNR, receipt or any other ID, in the one treatment
 * the product gives them: monospaced with tabular figures, and copied by clicking the
 * value itself.
 *
 * Mono by kind of fact, not by "has digits": IDs are read character by character and
 * typed into other systems, so `412` and `4l2` must not look alike. Counts, totals and
 * dates stay proportional.
 *
 * The value is the control. At rest it reads as text; on hover or focus it takes a
 * sunken pill and a copy glyph slides in on its right. Whatever follows eases aside by
 * the glyph's width (14px, 180ms), so nothing is covered. Inside a table cell the glyph
 * sits over the cell's padding instead, so an auto-sized column never widens under the
 * pointer. Clicking copies: the glyph becomes a tick, and a neutral toast names the
 * value ("Copied ST 412/2025"). Where the clipboard is unavailable it is plain text.
 *
 * The value is shown and copied exactly as given. (The app renumbers case numbers for
 * the selected court before passing them in.)
 */

import * as React from "react"
import { CheckIcon, CopyIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { notify } from "@/components/ui/notify"

const noSubscribe = () => () => {}

/* `false` on the server and through the first client render, so server and client agree
   and the button arrives on the pass after hydration. */
function useClipboard(): boolean {
  return React.useSyncExternalStore(
    noSubscribe,
    () => !!navigator.clipboard,
    () => false
  )
}

function CopyableId({
  value,
  label = "ID",
  copyable = true,
  className,
}: {
  /** What is shown and what is copied. */
  value: string
  /** What it is, for the accessible name and the hover hint: "case number", "receipt". */
  label?: string
  /** Off where the ID is decorative or already inside something clickable. */
  copyable?: boolean
  className?: string
}) {
  const [copied, setCopied] = React.useState(false)
  const timer = React.useRef<number | null>(null)
  const supported = useClipboard()
  const face = "font-mono tabular-nums"

  React.useEffect(
    () => () => {
      if (timer.current) window.clearTimeout(timer.current)
    },
    []
  )

  if (!copyable || !supported) {
    return (
      <span data-slot="copyable-id" className={cn(face, className)}>
        {value}
      </span>
    )
  }

  const copy = () => {
    void navigator.clipboard
      .writeText(value)
      .then(() => {
        setCopied(true)
        if (timer.current) window.clearTimeout(timer.current)
        timer.current = window.setTimeout(() => setCopied(false), 1600)
        notify.neutral(
          <span>
            Copied <span className={face}>{value}</span>
          </span>,
          { icon: CopyIcon }
        )
      })
      .catch(() => {
        /* A refused clipboard is not worth a message: the value is still on screen. */
      })
  }

  return (
    <button
      type="button"
      data-slot="copyable-id"
      title={copied ? "Copied" : `Copy ${label}`}
      onClick={(event) => {
        /* Often inside a row that opens its record on click; copying is not that. */
        event.stopPropagation()
        copy()
      }}
      aria-label={copied ? `${label} copied` : `Copy the ${label}, ${value}`}
      className={cn(
        face,
        /* Negative margin against the pill's padding: at rest the text sits exactly
           where plain text would, and the fill grows outside it. */
        "group/id relative isolate -mx-1 inline-flex cursor-pointer items-center rounded-sm px-1 text-left align-baseline",
        "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset",
        className
      )}
    >
      {/* The pill, its own layer so it can reach past the button. Outside a table the
          glyph is inside the button, so the pill covers it as is. In a table the glyph
          sits out of flow over the cell's padding; the pill reaches 12px further right to
          take it in (2px past the glyph, as everywhere), still without widening the
          column. On anything already surface-sunken (a hovered table row, a beige box such
          as OutcomeSummary) the pill takes one step more, accent-strong: the same contrast
          against it as the plain pill has on white. On white it stays as it is. */}
      <span
        aria-hidden
        className="absolute inset-y-0 right-0 left-0 -z-10 rounded-sm transition-colors group-hover/id:bg-surface-sunken in-[td]:-right-3 in-[tr]:group-hover/id:bg-accent-strong in-[.bg-surface-sunken]:group-hover/id:bg-accent-strong"
      />
      <span className="relative inline-flex items-center">
        <span>{value}</span>
        {/* Outside a table: closed at rest, opens to 14px on hover, focus and while the
            tick shows, pushing what follows aside. In a table cell: out of flow over
            the cell's padding, so the column never changes width. */}
        <span
          aria-hidden
          className={cn(
            "flex shrink-0 justify-end overflow-hidden",
            "transition-[width,opacity] duration-[180ms] ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-none",
            "in-[td]:absolute in-[td]:top-1/2 in-[td]:left-full in-[td]:-translate-y-1/2",
            copied
              ? "w-3.5 opacity-100"
              : "w-0 opacity-0 group-hover/id:w-3.5 group-hover/id:opacity-100 group-focus-visible/id:w-3.5 group-focus-visible/id:opacity-100"
          )}
        >
          {copied ? (
            <CheckIcon className="size-3 shrink-0 text-success-ink" />
          ) : (
            <CopyIcon className="size-3 shrink-0 text-muted-foreground" />
          )}
        </span>
      </span>
    </button>
  )
}

export { CopyableId }
