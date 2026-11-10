"use client"

/*
 * BreadcrumbTrail (promoted from Dristi's top bar, components/shell/top-bar.tsx on main,
 * 2026-11-10). The breadcrumb as the product's top bar carries it, on every screen size.
 *
 * Room decides, not a breakpoint (owner, 2026-09-21). The whole trail is drawn once,
 * unseen, and measured. Where it fits, it shows whole. Where it does not, entries fold
 * away from the START, one at a time, until what is left fits beside a small disc
 * button; where you are is the last thing to go. Tapping the disc opens the whole trail
 * on its own row (`BreadcrumbTrailRow`) under the bar: in the flow, so the page moves
 * down rather than being covered, and scrolling sideways when long.
 *
 * The trail ends with where you are (lead designer, 2026-09-11): a list page ends with
 * its own name; a record ends with its number (`mono`), not its title, which the page's
 * heading already says.
 *
 * Usage, inside a bar:
 *   const [open, setOpen] = useState(false)
 *   const [fits, setFits] = useState(true)
 *   <BreadcrumbTrail items={items} open={open && !fits} onOpenChange={setOpen} onFitsChange={setFits} />
 *   …
 *   <BreadcrumbTrailRow items={items} open={open && !fits} />   // under the bar's row
 * Close it on navigation (the app keys `open` to the path).
 */

import * as React from "react"
import { ChevronDownIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible"

export type BreadcrumbTrailItem = {
  label: string
  /** Where it leads. The last item is where you are and is never a link. */
  href?: string
  /** An ID (a case number): shown in mono with tabular figures, like CopyableId but
      without the copy (a crumb is already a link). */
  mono?: boolean
}

type LinkComponent = React.ElementType<{
  href: string
  className?: string
  children?: React.ReactNode
}>

const idFace = (item: BreadcrumbTrailItem) =>
  item.mono ? "font-mono tabular-nums" : undefined

/** Every item, in order. `skip` leaves out leading items; `lead` stands in for them. */
function TrailList({
  items,
  skip = 0,
  lead,
  linkAs: LinkAs = "a",
  className,
}: {
  items: BreadcrumbTrailItem[]
  skip?: number
  lead?: React.ReactNode
  linkAs?: LinkComponent
  className?: string
}) {
  const last = items.length - 1
  return (
    <BreadcrumbList className={cn("flex-nowrap", className)}>
      {lead ? <BreadcrumbItem className="shrink-0">{lead}</BreadcrumbItem> : null}
      {items.map((item, i) => {
        if (i < skip) return null
        const isLast = i === last
        return (
          <React.Fragment key={`${i}-${item.label}`}>
            {i > skip || lead ? (
              <BreadcrumbSeparator className="shrink-0" data-trail-separator />
            ) : null}
            <BreadcrumbItem
              data-trail-entry
              className={isLast ? "min-w-0" : "shrink-0"}
            >
              {isLast ? (
                <BreadcrumbPage className={cn("truncate font-medium", idFace(item))}>
                  {item.label}
                </BreadcrumbPage>
              ) : item.href ? (
                <BreadcrumbLink asChild>
                  <LinkAs href={item.href} className={idFace(item)}>
                    {item.label}
                  </LinkAs>
                </BreadcrumbLink>
              ) : (
                <span className={idFace(item)}>{item.label}</span>
              )}
            </BreadcrumbItem>
          </React.Fragment>
        )
      })}
    </BreadcrumbList>
  )
}

/** The fold button's footprint in the row: a 40px target pulled in 8px a side. */
const FOLD_BUTTON_WIDTH = 24

function BreadcrumbTrail({
  items,
  open = false,
  onOpenChange,
  onFitsChange,
  linkAs,
  rowId = "breadcrumb-trail-row",
  className,
}: {
  items: BreadcrumbTrailItem[]
  /** Whether the full-trail row is open (only meaningful while the trail is folded). */
  open?: boolean
  onOpenChange?: (open: boolean) => void
  /** Reports whether the whole trail fits, so the opened row can stand down. */
  onFitsChange?: (fits: boolean) => void
  /** The link element, e.g. Next's `Link`. Defaults to `a`. */
  linkAs?: LinkComponent
  /** The id of the `BreadcrumbTrailRow` this disc controls. */
  rowId?: string
  className?: string
}) {
  const slot = React.useRef<HTMLDivElement>(null)
  const measure = React.useRef<HTMLDivElement>(null)
  const [skip, setSkip] = React.useState(0)
  const key = items.map((i) => i.label).join("|")
  const report = React.useRef(onFitsChange)
  React.useEffect(() => {
    report.current = onFitsChange
  })

  React.useLayoutEffect(() => {
    const s = slot.current
    const m = measure.current
    if (!s || !m) return
    const check = () => {
      const list = m.firstElementChild as HTMLElement | null
      if (!list) return
      const room = s.clientWidth
      const gap = parseFloat(getComputedStyle(list).columnGap) || 0
      const widths = [...list.querySelectorAll<HTMLElement>("[data-trail-entry]")].map(
        (n) => n.getBoundingClientRect().width
      )
      const separator =
        list.querySelector<HTMLElement>("[data-trail-separator]")?.getBoundingClientRect()
          .width ?? 0
      const step = separator + gap * 2
      const total = widths.reduce((a, w) => a + w, 0) + step * (widths.length - 1)
      let next = 0
      if (total > room) {
        let used = FOLD_BUTTON_WIDTH + step
        let kept = 0
        for (let i = widths.length - 1; i >= 0; i -= 1) {
          const cost = widths[i] + (kept ? step : 0)
          if (used + cost > room && kept > 0) break
          used += cost
          kept += 1
        }
        next = widths.length - kept
      }
      setSkip(next)
      report.current?.(next === 0)
    }
    check()
    const ro = new ResizeObserver(check)
    ro.observe(s)
    return () => ro.disconnect()
  }, [key])

  return (
    <div
      ref={slot}
      data-slot="breadcrumb-trail"
      data-folded={skip || undefined}
      className={cn("relative flex min-w-0 flex-1 items-center", className)}
    >
      {/* The measuring copy: out of sight, out of the tab order and the a11y tree. */}
      <div
        ref={measure}
        aria-hidden
        inert
        className="pointer-events-none invisible absolute inset-x-0 top-0 h-0 overflow-hidden"
      >
        <TrailList items={items} linkAs={linkAs} className="w-max" />
      </div>
      <Breadcrumb className="min-w-0 flex-1">
        <TrailList
          items={items}
          skip={skip}
          linkAs={linkAs}
          lead={
            skip > 0 ? (
              <button
                type="button"
                aria-expanded={open}
                aria-controls={rowId}
                aria-label="Show the full path"
                onClick={() => onOpenChange?.(!open)}
                className="-mx-2 flex size-10 cursor-pointer items-center justify-center rounded-lg outline-none transition-colors active:bg-accent focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                <span
                  aria-hidden
                  className="flex size-5 items-center justify-center rounded-full border border-border bg-accent-strong text-muted-foreground"
                >
                  <ChevronDownIcon
                    className={cn(
                      "size-3.5 transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-none",
                      open && "rotate-180"
                    )}
                  />
                </span>
              </button>
            ) : undefined
          }
        />
      </Breadcrumb>
    </div>
  )
}

/** The whole trail on its own row under the bar, opened by the disc. In the flow, so the
    page moves down; a long trail scrolls sideways. */
function BreadcrumbTrailRow({
  items,
  open,
  linkAs,
  id = "breadcrumb-trail-row",
  className,
}: {
  items: BreadcrumbTrailItem[]
  open: boolean
  linkAs?: LinkComponent
  id?: string
  className?: string
}) {
  return (
    <Collapsible open={open}>
      <CollapsibleContent
        id={id}
        className="overflow-hidden ease-[cubic-bezier(0.23,1,0.32,1)] data-open:animate-collapsible-down data-open:duration-200 data-closed:animate-collapsible-up data-closed:duration-150 motion-reduce:animate-none"
      >
        <Breadcrumb
          className={cn("overflow-x-auto border-t border-hairline px-4 py-3 sm:px-6", className)}
        >
          <TrailList items={items} linkAs={linkAs} className="w-max" />
        </Breadcrumb>
      </CollapsibleContent>
    </Collapsible>
  )
}

export { BreadcrumbTrail, BreadcrumbTrailRow }
