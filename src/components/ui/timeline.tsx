import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

function Timeline({ className, ...props }: React.ComponentProps<"ol">) {
  return (
    <ol
      data-slot="timeline"
      className={cn("relative flex w-full flex-col", className)}
      {...props}
    />
  )
}

/* Past: solid grey. Current: teal with a slow breath (still, at its resting halo, under
   reduced motion). Future: a hollow outline. */
const timelineDotVariants = cva(
  "relative z-10 mt-1.5 size-2.5 shrink-0 rounded-full border",
  {
    variants: {
      status: {
        past: "border-muted-foreground bg-muted-foreground",
        current:
          "animate-halo-pulse border-primary bg-primary motion-reduce:animate-none motion-reduce:ring-4 motion-reduce:ring-halo",
        future: "border-input bg-background",
      },
    },
    defaultVariants: {
      status: "future",
    },
  }
)

/**
 * One step. The line runs unbroken through every dot: it starts at the first dot, runs
 * through each step's bottom gap (`pb-6`) to the next, and ends at the last dot.
 * `date` sits on the right of the title, on the title's baseline; on a narrow screen a
 * long title wraps and the date stays put. `description` is a second line under the
 * title, for anything that is not the date.
 */
function TimelineItem({
  className,
  status = "future",
  title,
  date,
  description,
  children,
  ...props
}: Omit<React.ComponentProps<"li">, "title"> &
  VariantProps<typeof timelineDotVariants> & {
    title?: React.ReactNode
    date?: React.ReactNode
    description?: React.ReactNode
  }) {
  return (
    <li
      data-slot="timeline-item"
      data-status={status}
      aria-current={status === "current" ? "step" : undefined}
      className={cn(
        "group/timeline-item relative flex gap-3 pb-6 last:pb-0",
        className
      )}
      {...props}
    >
      <div className="relative flex w-2.5 shrink-0 flex-col items-center">
        <span
          aria-hidden
          data-slot="timeline-rail"
          className="absolute top-0 -bottom-6 w-px bg-border group-first/timeline-item:top-3 group-last/timeline-item:bottom-auto group-last/timeline-item:h-3 group-only/timeline-item:hidden"
        />
        <span
          data-slot="timeline-dot"
          className={cn(timelineDotVariants({ status }))}
        />
      </div>
      <div className="min-w-0 flex-1 pt-0.5">
        {title || date ? (
          <div className="flex items-baseline justify-between gap-3">
            {title ? (
              <p
                className={cn(
                  "min-w-0 text-sm font-medium",
                  status === "future"
                    ? "text-muted-foreground"
                    : "text-foreground"
                )}
              >
                {title}
              </p>
            ) : null}
            {date ? (
              <p className="shrink-0 text-sm text-muted-foreground tabular-nums">
                {date}
              </p>
            ) : null}
          </div>
        ) : null}
        {description ? (
          <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>
        ) : null}
        {children}
      </div>
    </li>
  )
}

export { Timeline, TimelineItem }
