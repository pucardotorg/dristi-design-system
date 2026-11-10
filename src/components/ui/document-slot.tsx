"use client"

import * as React from "react"
import { FileTextIcon, LockIcon, Maximize2Icon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FieldError } from "@/components/ui/field"
import { Progress } from "@/components/ui/progress"
import { Spinner } from "@/components/ui/spinner"

/* The viewer's code (and pdf.js) loads only when someone opens a thumbnail. */
const DocumentViewer = React.lazy(() =>
  import("@/components/ui/document-viewer").then((m) => ({ default: m.DocumentViewer }))
)

/*
 * Where the buttons go (owner, 2026-11-10). On a phone (under 640px, the app's flow-window
 * line) they sit below the name, full width. Everywhere else they sit on the right, unless
 * the slot itself is narrower than 440px (a squeezed page with the side panel open), when
 * they go below too. Every responsive class below therefore reads
 * `sm:@min-[440px]/document-slot:`, the screen and the slot both wide enough.
 */

export type DocumentSlotFile = {
  name: string
  /** Shown after the name, already formatted ("1.2 MB"). */
  size?: string
  /** MIME type. An image with a `url` shows itself whole; anything else shows as a page. */
  type?: string
  url?: string
}

type DocumentSlotCopy = {
  optional?: string
  noFile?: string
  goodScan?: string
  poorScan?: string
  chooseFile?: string
  change?: string
  remove?: string
  uploading?: string
  /** The thumbnail's accessible name. */
  preview?: (name: string) => string
}

type DocumentSlotProps = Omit<React.ComponentProps<"div">, "onChange"> & {
  label: React.ReactNode
  required?: boolean
  optional?: boolean
  /** What the slot takes ("JPG, PNG or PDF · up to 10 MB"), as its second line while empty. */
  hint?: React.ReactNode
  file?: DocumentSlotFile
  quality?: "good" | "poor"
  /** 0 to 100 while the file goes up. The thumbnail turns into a spinner, the second line
      reads the percentage, a bar runs under it, and the buttons wait until it lands. */
  progress?: number
  /** Why the file cannot change now. The buttons go and the reason sits under the name
      with a lock; the thumbnail still opens the full view. */
  locked?: React.ReactNode
  /** A refused file or a required slot missing on Submit. Red edge, the reason under the
      slot. On Submit, move focus to the slot's button (`actionRef`). */
  error?: React.ReactNode
  onChooseFile?: () => void
  /** Change. Defaults to `onChooseFile`. */
  onChange?: () => void
  /** Remove. Without it the slot shows no Remove. */
  onRemove?: () => void
  /** The thumbnail opens the DocumentViewer, with this slot's Change and Remove inside
      (needs `file.url` and `file.type`). `false` turns it off; `onPreview` replaces it. */
  viewer?: boolean
  /** Your own action for the thumbnail, instead of the built-in viewer. */
  onPreview?: () => void
  /** The empty slot's button (Add or Choose file), for moving focus to it on Submit. */
  actionRef?: React.Ref<HTMLButtonElement>
  /** Replaces the drawn thumbnail. */
  thumbnail?: React.ReactNode
  disabled?: boolean
  copy?: DocumentSlotCopy
  /** @deprecated Derived from `file`, `progress` and `quality`. Still read, so callers
      written before 2026-11-10 keep working. */
  status?: "filled" | "processing" | "empty" | "empty-optional" | "filled-poor"
  /** @deprecated The thumbnail picks its own size. */
  media?: "thumbnail" | "icon"
  /** @deprecated Use `file.name`. */
  filename?: string
  /** @deprecated Use `file.size`. */
  meta?: string
}

/**
 * A long name is cut in the middle, never at the end: the start says what it is, the end
 * keeps the last characters and the type ("Bank_return_me… Oct2026.pdf"). The size
 * drops to its own line when there is no room.
 */
function FileLine({ name, size }: { name: string; size?: string }) {
  const dot = name.lastIndexOf(".")
  const cut = Math.max(0, (dot > 0 ? dot : name.length) - 7)
  return (
    /* One line, the name giving way first. Only when the slot is under 18rem (in rem, so
       it trips at large text on a phone, not at normal size) does the size wrap. */
    <p
      title={name}
      className="mt-0.5 flex min-w-0 gap-x-1 text-sm text-muted-foreground @max-[18rem]/document-slot:flex-wrap"
    >
      <span className="flex max-w-full min-w-0">
        <span className="truncate">{name.slice(0, cut)}</span>
        <span className="shrink-0">{name.slice(cut)}</span>
      </span>
      {size ? <span className="shrink-0">· {size}</span> : null}
    </p>
  )
}

/** A page of the document as a small sheet on the paper tokens, marked with its type. */
function PageSheet({ type }: { type?: string }) {
  const tag = type?.includes("pdf") ? "PDF" : undefined
  return (
    <span className="relative">
      <span className="flex h-9 w-6 flex-col gap-px rounded-xs bg-paper p-1 shadow-raised ring-1 ring-paper-border sm:@min-[440px]/document-slot:h-12 sm:@min-[440px]/document-slot:w-9 sm:@min-[440px]/document-slot:gap-0.5 sm:@min-[440px]/document-slot:p-1.5">
        <span className="h-0.5 w-3/5 rounded-full bg-paper-foreground" />
        {[92, 78, 86, 70, 88].map((w) => (
          <span
            key={w}
            className="h-px rounded-full bg-paper-muted"
            style={{ width: `${w}%` }}
          />
        ))}
      </span>
      {tag ? (
        <span className="absolute -right-1 -bottom-1 rounded-xs bg-destructive px-1 text-caption leading-none font-semibold text-destructive-foreground">
          {tag}
        </span>
      ) : null}
    </span>
  )
}

/* The thumbnail tile. Its hairline edge (owner, 2026-11-10): a pale scan on the muted
   tile on the beige well had no visible boundary; a tile you can press inside a well
   carries a hairline (AGENTS: nested wells with interactive content). */
const MEDIA =
  "relative flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-md bg-muted text-muted-foreground ring-1 ring-hairline sm:@min-[440px]/document-slot:size-16"

function DocumentSlot({
  className,
  label,
  required = false,
  optional = false,
  hint,
  file,
  quality,
  progress,
  locked,
  error,
  onChooseFile,
  onChange,
  onRemove,
  onPreview,
  viewer = true,
  actionRef,
  thumbnail,
  disabled = false,
  copy,
  status,
  media: _media,
  filename,
  meta,
  ...props
}: DocumentSlotProps) {
  void _media // read off so it never reaches the DOM; the thumbnail sizes itself
  const errorId = React.useId()
  const current: DocumentSlotFile | undefined =
    file ?? (filename ? { name: filename, size: meta } : undefined)
  const busy = progress !== undefined || status === "processing"
  const filled = !!current && !busy && status !== "empty" && status !== "empty-optional"
  const poor = quality === "poor" || status === "filled-poor"
  const showOptional = optional || status === "empty-optional"
  const change = onChange ?? onChooseFile
  const image = current?.type?.startsWith("image/") && current.url

  /* The built-in viewer: on unless switched off or replaced, and only for a file the
     viewer can show (a link and a type). */
  const [viewing, setViewing] = React.useState(false)
  const builtIn = viewer && !onPreview && !!current?.url && !!current?.type
  const preview = onPreview ?? (builtIn ? () => setViewing(true) : undefined)

  /* Below: full width, the default 40px. On the right: the small type and padding, still
     40px tall for touch (iPads take this layout). */
  const action =
    "w-full sm:@min-[440px]/document-slot:w-auto sm:@min-[440px]/document-slot:px-3 sm:@min-[440px]/document-slot:text-xs"

  const thumb = thumbnail ?? (
    image ? (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={current!.url}
        alt=""
        className="max-h-full max-w-full rounded-xs object-contain shadow-raised"
      />
    ) : (
      <PageSheet type={current?.type} />
    )
  )

  return (
    <div
      data-slot="document-slot"
      data-state={busy ? "uploading" : filled ? "filled" : "empty"}
      className="@container/document-slot w-full"
    >
      <div
        aria-invalid={error ? true : undefined}
        aria-busy={busy || undefined}
        className={cn(
          "flex w-full flex-col gap-3 rounded-lg border p-4 sm:@min-[440px]/document-slot:flex-row sm:@min-[440px]/document-slot:items-center sm:@min-[440px]/document-slot:gap-4",
          filled || busy
            ? "border-transparent bg-surface-sunken"
            : "border-dashed bg-transparent",
          !(filled || busy) && (error ? "border-destructive" : "border-input"),
          className
        )}
        {...props}
      >
        <div className="flex min-w-0 flex-1 items-center gap-3 sm:@min-[440px]/document-slot:gap-4">
          {busy ? (
            <span data-slot="document-slot-media" className={MEDIA}>
              <Spinner className="size-5" />
            </span>
          ) : filled ? (
            preview ? (
              /* With a mouse, hovering darkens it and shows the enlarge arrows; a touch
                 screen never hovers, so the thumbnail stays clean and a tap opens it. */
              <button
                type="button"
                data-slot="document-slot-media"
                onClick={preview}
                aria-label={
                  copy?.preview?.(current!.name) ?? `Full view of ${current!.name}`
                }
                className={cn(
                  MEDIA,
                  "group/thumb p-1 outline-none focus-visible:ring-3 focus-visible:ring-ring/50 sm:@min-[440px]/document-slot:p-1.5"
                )}
              >
                {thumb}
                <span className="absolute inset-0 transition-colors group-hover/thumb:bg-scrim" />
                <Maximize2Icon
                  aria-hidden
                  className="absolute inset-0 m-auto size-5 text-background opacity-0 transition-opacity group-hover/thumb:opacity-100 group-focus-visible/thumb:opacity-100"
                />
              </button>
            ) : (
              <span data-slot="document-slot-media" className={cn(MEDIA, "p-1")}>
                {thumb}
              </span>
            )
          ) : (
            <span
              data-slot="document-slot-media"
              className="flex size-10 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground"
            >
              <FileTextIcon className="size-5" aria-hidden />
            </span>
          )}

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <p className="text-sm font-medium text-foreground">
                {label}
                {required && !filled && !busy ? (
                  <span className="text-destructive" aria-hidden>
                    {" "}
                    *
                  </span>
                ) : null}
              </p>
              {showOptional && !filled && !busy ? (
                <Badge variant="secondary" className="h-auto whitespace-normal">
                  {copy?.optional ?? "Optional"}
                </Badge>
              ) : null}
              {filled && poor ? (
                <Badge variant="warning" className="h-auto whitespace-normal">
                  {copy?.poorScan ?? "Poor scan"}
                </Badge>
              ) : filled && quality === "good" ? (
                <Badge variant="success" className="h-auto whitespace-normal">
                  {copy?.goodScan ?? "Good scan"}
                </Badge>
              ) : null}
            </div>

            {busy ? (
              <>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  {copy?.uploading ?? "Uploading"}
                  {progress !== undefined ? ` · ${Math.round(progress)}%` : "…"}
                </p>
                {progress !== undefined ? (
                  <Progress value={progress} aria-label={`${copy?.uploading ?? "Uploading"}`} className="mt-2" />
                ) : null}
              </>
            ) : filled ? (
              <FileLine name={current!.name} size={current!.size} />
            ) : (
              <p className="mt-0.5 text-sm text-muted-foreground">
                {hint ?? copy?.noFile ?? "No file chosen yet"}
              </p>
            )}

            {filled && locked ? (
              <p className="mt-1 flex items-start gap-1.5 text-caption text-muted-foreground">
                <LockIcon className="mt-0.5 size-3.5 shrink-0" aria-hidden />
                <span>{locked}</span>
              </p>
            ) : null}
          </div>
        </div>

        {filled && !locked && (change || onRemove) ? (
          <div
            className={cn(
              "grid gap-2 sm:@min-[440px]/document-slot:flex sm:@min-[440px]/document-slot:shrink-0 sm:@min-[440px]/document-slot:items-center",
              change && onRemove ? "grid-cols-2" : "grid-cols-1"
            )}
          >
            {change ? (
              <Button type="button" variant="outline" disabled={disabled} onClick={change} className={action}>
                {copy?.change ?? "Change"}
              </Button>
            ) : null}
            {onRemove ? (
              <Button type="button" variant="destructive" disabled={disabled} onClick={onRemove} className={action}>
                {copy?.remove ?? "Remove"}
              </Button>
            ) : null}
          </div>
        ) : null}

        {!filled && !busy ? (
          <Button
            ref={actionRef}
            type="button"
            variant="outline"
            disabled={disabled}
            onClick={onChooseFile}
            aria-describedby={error ? errorId : undefined}
            className={cn("shrink-0", action)}
          >
            {copy?.chooseFile ?? "Choose file"}
          </Button>
        ) : null}
      </div>

      {error ? (
        <FieldError id={errorId} className="mt-2 text-body-compact">
          {error}
        </FieldError>
      ) : null}

      {builtIn && viewing ? (
        <React.Suspense fallback={null}>
          <DocumentViewer
            open
            onOpenChange={setViewing}
            file={{
              name: current!.name,
              size: current!.size,
              type: current!.type!,
              url: current!.url!,
            }}
            onChange={
              change && !locked
                ? () => {
                    setViewing(false)
                    change()
                  }
                : undefined
            }
            onRemove={
              onRemove && !locked
                ? () => {
                    setViewing(false)
                    onRemove()
                  }
                : undefined
            }
            copy={{ change: copy?.change, remove: copy?.remove }}
          />
        </React.Suspense>
      ) : null}
    </div>
  )
}

export { DocumentSlot }
