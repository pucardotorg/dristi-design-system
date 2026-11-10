"use client"

/*
 * DocumentViewer (owner, 2026-11-10). One viewer for every document: a fresh upload, a
 * file on the record, a photo or a PDF. Built on the app's case-file viewer
 * (components/cases/pdf-viewer.tsx on main): the same pdf.js, worker path, page
 * rendering and zoom island, plus what the app's two viewers lacked: the full name,
 * Download everywhere, turning photos, a page count, keyboard zoom, Change and Remove.
 *
 * Phones and upright touch iPads: a tray from the bottom, almost full height, dragged
 * down by its header only (fingers inside the document pinch and pan). Elsewhere: the
 * centred dialog. The same line the app's peeks use (REGISTER_CARDS_QUERY).
 */

import * as React from "react"
import type { PDFDocumentProxy } from "pdfjs-dist"
import { DownloadIcon, EyeOffIcon, MinusIcon, PlusIcon, RotateCwIcon, XIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
} from "@/components/ui/drawer"
import { PageOutcome } from "@/components/ui/outcome"
import { Spinner } from "@/components/ui/spinner"

export type DocumentViewerFile = {
  name: string
  /** Already formatted ("2.4 MB"). */
  size?: string
  /** MIME type. `application/pdf` renders pages; `image/*` shows the picture. */
  type: string
  url: string
}

type Copy = {
  close?: string
  download?: (name: string) => string
  downloadButton?: string
  change?: string
  remove?: string
  zoomIn?: string
  zoomOut?: string
  zoomLevel?: (percent: number) => string
  turn?: string
  page?: (current: number, total: number) => string
  failedTitle?: string
  failedBody?: string
  image?: string
  pages?: (n: number) => string
}

const TRAY_QUERY =
  "(max-width: 767.98px), ((pointer: coarse) and (orientation: portrait))"

function useMedia(query: string) {
  return React.useSyncExternalStore(
    (cb) => {
      const m = window.matchMedia(query)
      m.addEventListener("change", cb)
      return () => m.removeEventListener("change", cb)
    },
    () => window.matchMedia(query).matches,
    () => false
  )
}

/* pdf.js loads once, on the first PDF. The worker is copied to /vendor by
   scripts/copy-pdf-worker.mjs (the app: scripts/copy-runtime-assets.mjs). */
let pdfjsPromise: Promise<typeof import("pdfjs-dist")> | null = null
function pdfjs() {
  if (!pdfjsPromise) {
    pdfjsPromise = import("pdfjs-dist").then((lib) => {
      lib.GlobalWorkerOptions.workerSrc = "/vendor/pdf.worker.min.mjs"
      return lib
    })
  }
  return pdfjsPromise
}

/* ---------------------------------------------------------------- */
/* Zoom, pan, turn: one state for every input                        */
/* ---------------------------------------------------------------- */

/* Images: fitted (100%) up to 500%, as the app's upload viewer. PDFs: 50% to 300% in
   25% steps, as its case-file viewer, so a long PDF can be shrunk to scan its pages. */
type Range = { min: number; max: number; pdf: boolean }
const IMAGE: Range = { min: 1, max: 5, pdf: false }
const PDF: Range = { min: 0.5, max: 3, pdf: true }

/** `turn` counts quarter turns clockwise and is never wrapped, so each turn animates
    the short way. */
type View = { zoom: number; x: number; y: number; turn: number }
const FIT: View = { zoom: 1, x: 0, y: 0, turn: 0 }
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v))

/** Where a zoom was aimed, in the well's own pixels: under the cursor, between the two
    fingers, or at the tap. Null zooms around the middle (the island's buttons). */
type Aim = { px: number; py: number; w: number; h: number } | null

function useView(range: Range) {
  const [v, setV] = React.useState<View>(FIT)
  const aim = React.useRef<Aim>(null)
  /* Glide (150ms) only for one-off jumps: the island, a turn, a double tap. A pinch or a
     trackpad zoom follows the fingers directly; a glide there chases every step and
     feels like dragging through mud. */
  const glide = React.useRef(false)
  /** Whether the next change glides (a one-off jump) or follows the fingers. */
  const setGlide = React.useCallback((on: boolean) => {
    glide.current = on
  }, [])
  /* Zooms keep the aimed point still: a photo moves so the spot under the cursor stays
     under it (a PDF does the same through its scroll, in PdfBody). Coming back close to
     fitted snaps to it and recentres, so a pinch can land on it. */
  const settle = React.useCallback(
    (s: View, z: number): View => {
      const zoom = clamp(z, range.min, range.max)
      /* Snap to fitted only on the way back to it. Snapping on the way out held a slow
         pinch at 100%: each small step landed inside the snap and was pulled back. */
      const homing = (s.zoom > 1 && zoom < s.zoom) || (s.zoom < 1 && zoom > s.zoom)
      if (zoom === 1 || (homing && Math.abs(zoom - 1) < 0.04))
        return { ...s, zoom: 1, x: 0, y: 0 }
      if (range.pdf) return { ...s, zoom }
      const a = aim.current
      const px = a ? a.px - a.w / 2 : 0
      const py = a ? a.py - a.h / 2 : 0
      const r = zoom / s.zoom
      return { ...s, zoom, x: px - (px - s.x) * r, y: py - (py - s.y) * r }
    },
    [range]
  )
  /** Point the next zoom at a spot on screen (client pixels), or at the middle. */
  const aimAt = React.useCallback(
    (el: Element | null, clientX?: number, clientY?: number) => {
      if (!el || clientX === undefined || clientY === undefined) {
        aim.current = null
        return
      }
      /* In the well's own pixels: undo any scale on the way (the dialog grows in from
         95% as it opens). */
      const r = el.getBoundingClientRect()
      const box = el as HTMLElement
      const k = box.offsetWidth ? r.width / box.offsetWidth : 1
      aim.current = {
        px: (clientX - r.left) / k,
        py: (clientY - r.top) / k,
        w: r.width / k,
        h: r.height / k,
      }
    },
    []
  )
  const zoomTo = React.useCallback((z: number) => setV((s) => settle(s, z)), [settle])
  const zoomBy = React.useCallback(
    (f: number) => setV((s) => settle(s, s.zoom * f)),
    [settle]
  )
  const step = (dir: 1 | -1) => {
    aim.current = null
    glide.current = true
    setV((s) =>
      settle(
        s,
        range.pdf
          ? Math.round((s.zoom + dir * 0.25) * 4) / 4
          : s.zoom * (dir > 0 ? 1.25 : 0.8)
      )
    )
  }
  return {
    v,
    setV,
    range,
    aim,
    aimAt,
    glide,
    setGlide,
    zoomTo,
    zoomBy,
    zoomIn: () => step(1),
    zoomOut: () => step(-1),
    fit: () => {
      aim.current = null
      glide.current = true
      setV((s) => ({ ...s, zoom: 1, x: 0, y: 0 }))
    },
    turn: () => {
      glide.current = true
      setV((s) => ({ ...FIT, turn: s.turn + 1 }))
    },
    reset: () => setV(FIT),
  }
}
type ViewApi = ReturnType<typeof useView>

/**
 * A trackpad pinch (and ctrl/cmd + scroll) arrives as a wheel event with ctrlKey set;
 * Safari sends its own gesture events. Both are caught by hand, not through React,
 * whose wheel listener is passive and cannot stop the browser zooming the whole page.
 */
function useNoPageZoom(ref: React.RefObject<HTMLElement | null>, view: ViewApi) {
  const { zoomBy, zoomTo, aimAt, setGlide } = view
  const zoomNow = React.useRef(1)
  React.useEffect(() => {
    zoomNow.current = view.v.zoom
  })
  React.useEffect(() => {
    const el = ref.current
    if (!el) return
    let start = 1
    const wheel = (e: WheelEvent) => {
      if (!e.ctrlKey && !e.metaKey) return
      e.preventDefault()
      aimAt(el, e.clientX, e.clientY)
      setGlide(false)
      /* A trackpad pinch sends small deltas many times a second; a mouse wheel with
         ctrl sends big ones. Quicker than the app's /300, capped per event so one wheel
         notch is a step, not a leap. */
      zoomBy(clamp(Math.exp(-e.deltaY / 120), 0.8, 1.25))
    }
    const gStart = (e: Event) => {
      e.preventDefault()
      start = zoomNow.current
      const g = e as unknown as { clientX?: number; clientY?: number }
      aimAt(el, g.clientX, g.clientY)
    }
    const gChange = (e: Event) => {
      e.preventDefault()
      setGlide(false)
      zoomTo(start * ((e as unknown as { scale?: number }).scale ?? 1))
    }
    el.addEventListener("wheel", wheel, { passive: false })
    el.addEventListener("gesturestart", gStart)
    el.addEventListener("gesturechange", gChange)
    el.addEventListener("gestureend", gChange)
    return () => {
      el.removeEventListener("wheel", wheel)
      el.removeEventListener("gesturestart", gStart)
      el.removeEventListener("gesturechange", gChange)
      el.removeEventListener("gestureend", gChange)
    }
  }, [ref, zoomBy, zoomTo, aimAt, setGlide])
}

/** Two fingers pinch; one finger (or the mouse) drags when zoomed in; a double tap or
    double click toggles between fitted and 2×. */
function useGestures(view: ViewApi, pan: boolean) {
  const pointers = React.useRef(new Map<number, { x: number; y: number }>())
  const pinch = React.useRef<{ d: number; z: number } | null>(null)
  const drag = React.useRef<{ x: number; y: number; tx: number; ty: number } | null>(null)
  const lastTap = React.useRef(0)
  const { v, setV, zoomTo, aimAt, setGlide } = view
  const end = (e: React.PointerEvent) => {
    pointers.current.delete(e.pointerId)
    pinch.current = null
    drag.current = null
  }
  return {
    onPointerDown(e: React.PointerEvent) {
      e.currentTarget.setPointerCapture(e.pointerId)
      pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY })
      const p = [...pointers.current.values()]
      if (p.length === 2) {
        pinch.current = { d: Math.hypot(p[0].x - p[1].x, p[0].y - p[1].y), z: v.zoom }
        drag.current = null
      } else if (p.length === 1) {
        const now = Date.now()
        if (now - lastTap.current < 300) {
          aimAt(e.currentTarget, e.clientX, e.clientY)
          setGlide(true)
          zoomTo(v.zoom !== 1 ? 1 : 2)
          lastTap.current = 0
          return
        }
        lastTap.current = now
        if (pan && v.zoom > 1) drag.current = { x: e.clientX, y: e.clientY, tx: v.x, ty: v.y }
      }
    },
    onPointerMove(e: React.PointerEvent) {
      if (!pointers.current.has(e.pointerId)) return
      pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY })
      const p = [...pointers.current.values()]
      if (p.length === 2 && pinch.current) {
        const d = Math.hypot(p[0].x - p[1].x, p[0].y - p[1].y)
        aimAt(e.currentTarget, (p[0].x + p[1].x) / 2, (p[0].y + p[1].y) / 2)
        setGlide(false)
        zoomTo(pinch.current.z * (d / pinch.current.d))
      } else if (drag.current) {
        const s = drag.current
        setGlide(false)
        setV((c) => ({ ...c, x: s.tx + e.clientX - s.x, y: s.ty + e.clientY - s.y }))
      }
    },
    onPointerUp: end,
    onPointerCancel: end,
  }
}

/* ---------------------------------------------------------------- */
/* The document                                                       */
/* ---------------------------------------------------------------- */

function ImageBody({
  file,
  view,
  onFail,
}: {
  file: DocumentViewerFile
  view: ViewApi
  onFail: () => void
}) {
  const well = React.useRef<HTMLDivElement>(null)
  const [box, setBox] = React.useState({ w: 0, h: 0 })
  const [nat, setNat] = React.useState({ w: 0, h: 0 })
  const img = React.useRef<HTMLImageElement>(null)
  const g = useGestures(view, true)

  /* A photo already in the browser's cache can finish loading before React listens for
     `load`, which left it at zero size and invisible. Read its size if it is ready. */
  React.useEffect(() => {
    const el = img.current
    if (el?.complete && el.naturalWidth)
      setNat({ w: el.naturalWidth, h: el.naturalHeight })
  }, [file.url])
  useNoPageZoom(well, view)

  React.useEffect(() => {
    const el = well.current
    if (!el) return
    /* Read once straight away (the observer waits for the next frame), then follow. */
    setBox({ w: el.clientWidth, h: el.clientHeight })
    const ro = new ResizeObserver(([e]) =>
      setBox({ w: e.contentRect.width, h: e.contentRect.height })
    )
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  /* Fitted for the current turn, with 16px of well all round so the paper's edge shows.
     Sideways swaps the picture's width and height. */
  const side = Math.abs(view.v.turn) % 2 === 1
  const fit =
    nat.w && box.w
      ? Math.min(
          (box.w - 32) / (side ? nat.h : nat.w),
          (box.h - 32) / (side ? nat.w : nat.h),
          1.5
        )
      : 0

  return (
    <div
      ref={well}
      {...g}
      className={cn(
        "relative min-h-0 flex-1 touch-none overflow-hidden select-none",
        view.v.zoom > 1 ? "cursor-grab active:cursor-grabbing" : "cursor-zoom-in"
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={img}
        src={file.url}
        alt={file.name}
        draggable={false}
        onError={onFail}
        onLoad={(e) =>
          setNat({ w: e.currentTarget.naturalWidth, h: e.currentTarget.naturalHeight })
        }
        className={cn(
          "absolute top-1/2 left-1/2 max-w-none rounded-sm shadow-raised",
          view.glide.current &&
            "transition-transform duration-150 ease-out motion-reduce:transition-none"
        )}
        style={{
          width: nat.w * fit,
          height: nat.h * fit,
          transform: `translate(-50%, -50%) translate(${view.v.x}px, ${view.v.y}px) scale(${view.v.zoom}) rotate(${view.v.turn * 90}deg)`,
          opacity: fit ? 1 : 0,
        }}
      />
    </div>
  )
}

/** One PDF page, drawn only when near the view, sharp at the screen's density (the
    app's PdfPage). */
function PdfPage({
  doc,
  number,
  width,
  aspect,
  root,
  label,
}: {
  doc: PDFDocumentProxy
  number: number
  width: number
  aspect: number
  root: React.RefObject<HTMLDivElement | null>
  label: string
}) {
  const holder = React.useRef<HTMLDivElement | null>(null)
  const canvas = React.useRef<HTMLCanvasElement | null>(null)
  const [near, setNear] = React.useState(false)
  const [ratio, setRatio] = React.useState(aspect)

  React.useEffect(() => {
    const node = holder.current
    if (!node) return
    const io = new IntersectionObserver(([e]) => setNear(e.isIntersecting), {
      root: root.current,
      rootMargin: "100% 0px",
    })
    io.observe(node)
    return () => io.disconnect()
  }, [root])

  React.useEffect(() => {
    if (!near || width <= 0) return
    const signal = { cancelled: false }
    const timer = window.setTimeout(async () => {
      try {
        const target = canvas.current
        if (!target) return
        const page = await doc.getPage(number)
        if (signal.cancelled) return
        const base = page.getViewport({ scale: 1 })
        setRatio(base.width / base.height)
        const density = Math.min(window.devicePixelRatio || 1, 2)
        const viewport = page.getViewport({ scale: (width / base.width) * density })
        const buffer = document.createElement("canvas")
        buffer.width = Math.ceil(viewport.width)
        buffer.height = Math.ceil(viewport.height)
        const ctx = buffer.getContext("2d")
        if (!ctx) return
        await page.render({ canvas: buffer, canvasContext: ctx, viewport }).promise
        if (signal.cancelled) return
        target.width = buffer.width
        target.height = buffer.height
        target.getContext("2d")?.drawImage(buffer, 0, 0)
      } catch {
        /* A page that fails stays a blank sheet; the others still draw. */
      }
    }, 220)
    return () => {
      signal.cancelled = true
      window.clearTimeout(timer)
    }
  }, [near, width, doc, number])

  return (
    <div
      ref={holder}
      data-page={number}
      className="shrink-0 overflow-hidden rounded-sm bg-paper shadow-raised ring-1 ring-paper-border"
      style={{ width, height: width / ratio }}
    >
      <canvas ref={canvas} role="img" aria-label={label} className="block size-full" />
    </div>
  )
}

function PdfBody({
  file,
  view,
  onPage,
  onCount,
  onFail,
  pageLabel,
}: {
  file: DocumentViewerFile
  view: ViewApi
  onPage: (n: number) => void
  onCount: (n: number) => void
  onFail: () => void
  pageLabel: (n: number) => string
}) {
  const scroller = React.useRef<HTMLDivElement>(null)
  const g = useGestures(view, false)
  useNoPageZoom(scroller, view)
  const [doc, setDoc] = React.useState<PDFDocumentProxy | null>(null)
  const [aspect, setAspect] = React.useState(1 / Math.SQRT2)
  const [well, setWell] = React.useState(0)

  React.useEffect(() => {
    let cancelled = false
    let destroy: (() => Promise<void>) | null = null
    ;(async () => {
      try {
        const lib = await pdfjs()
        const task = lib.getDocument({ url: file.url })
        destroy = () => task.destroy()
        const next = await task.promise
        if (cancelled) return
        const first = await next.getPage(1)
        const base = first.getViewport({ scale: 1 })
        if (cancelled) return
        setAspect(base.width / base.height)
        setDoc(next)
        onCount(next.numPages)
      } catch {
        if (!cancelled) onFail()
      }
    })()
    return () => {
      cancelled = true
      void destroy?.()
    }
  }, [file.url, onCount, onFail])

  React.useEffect(() => {
    const el = scroller.current
    if (!el) return
    setWell(el.clientWidth)
    const ro = new ResizeObserver(([e]) => setWell(Math.floor(e.contentRect.width)))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  /* Which page fills most of the view, for the page tag. */
  React.useEffect(() => {
    const root = scroller.current
    if (!root || !doc) return
    const io = new IntersectionObserver(
      (entries) => {
        const seen = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (seen) onPage(Number((seen.target as HTMLElement).dataset.page))
      },
      { root, threshold: [0.25, 0.5, 0.75] }
    )
    root.querySelectorAll("[data-page]").forEach((p) => io.observe(p))
    return () => io.disconnect()
  }, [doc, onPage, view.v.zoom])

  /* Fitted: the well's width less 16px each side, up to a comfortable reading width
     (40rem). Zoom scales from there. */
  const fitted = Math.min(Math.max(0, well - 32), 640)
  const width = Math.round(fitted * view.v.zoom)

  /* When the pages grow or shrink, scroll so the aimed point (or the middle) stays
     where it was on screen. */
  const last = React.useRef<{ width: number; left: number; top: number } | null>(null)
  React.useLayoutEffect(() => {
    const el = scroller.current
    const first = el?.querySelector<HTMLElement>("[data-page]")
    if (!el || !first) return
    /* Page 1's corner in the scrolled content's own coordinates. */
    const box = el.getBoundingClientRect()
    const at = first.getBoundingClientRect()
    const left = at.left - box.left + el.scrollLeft
    const top = at.top - box.top + el.scrollTop
    const before = last.current
    if (before && before.width !== width) {
      const r = width / before.width
      const a = view.aim.current
      const px = a ? a.px : el.clientWidth / 2
      const py = a ? a.py : el.clientHeight / 2
      /* The aimed point, measured from page 1's corner, grows with the pages (the gaps
         between pages stay 16px, close enough). Put it back under the aim. */
      el.scrollLeft = left + (el.scrollLeft + px - before.left) * r - px
      el.scrollTop = top + (el.scrollTop + py - before.top) * r - py
    }
    /* Measured before the scroll moved: content coordinates do not depend on it. */
    last.current = { width, left, top }
  }, [width, view.aim, doc])

  return (
    <div
      ref={scroller}
      {...g}
      className="min-h-0 flex-1 touch-pan-x touch-pan-y overflow-auto"
    >
      {doc && width > 0 ? (
        <div className="flex min-w-fit flex-col items-center gap-4 p-4 pb-16">
          {Array.from({ length: doc.numPages }, (_, i) => (
            <PdfPage
              key={i}
              doc={doc}
              number={i + 1}
              width={width}
              aspect={aspect}
              root={scroller}
              label={pageLabel(i + 1)}
            />
          ))}
        </div>
      ) : (
        <div className="flex h-full items-center justify-center">
          <Spinner className="size-6 text-muted-foreground" />
        </div>
      )}
    </div>
  )
}

/* ---------------------------------------------------------------- */
/* The viewer                                                         */
/* ---------------------------------------------------------------- */

function DocumentViewer({
  open,
  onOpenChange,
  file,
  onChange,
  onRemove,
  onTurn,
  onDownload,
  copy,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  file: DocumentViewerFile
  /** Opened from a slot: Change and Remove sit in the viewer, so a bad scan can be
      replaced without closing first. */
  onChange?: () => void
  onRemove?: () => void
  /** Keep the turn. Called once, on close, with quarter turns clockwise (1 to 3), and
      only if the photo ended up turned. Leave it off and turning is for reading only.
      Use it only for the person's own upload that is not filed yet; never on a file
      already on the record. */
  onTurn?: (quarterTurns: 1 | 2 | 3) => void
  /** Replaces the default (a link to `file.url` with the file's name). */
  onDownload?: () => void
  copy?: Copy
}) {
  const tray = useMedia(TRAY_QUERY)
  const isPdf = file.type === "application/pdf"
  const view = useView(isPdf ? PDF : IMAGE)
  const [page, setPage] = React.useState(1)
  const [count, setCount] = React.useState(0)
  const [failed, setFailed] = React.useState(false)
  const fail = React.useCallback(() => setFailed(true), [])

  /* Every open starts fitted, upright and on page 1: a leftover zoom from the last
     document reads as a broken image. */
  const change = (next: boolean) => {
    if (!next) {
      const q = ((view.v.turn % 4) + 4) % 4
      if (onTurn && !isPdf && !failed && q) onTurn(q as 1 | 2 | 3)
      view.reset()
      setPage(1)
      setFailed(false)
    }
    onOpenChange(next)
  }

  const download =
    onDownload ??
    (() => {
      const a = document.createElement("a")
      a.href = file.url
      a.download = file.name
      a.click()
    })

  /* + and - zoom, 0 fits, R turns a photo. Escape closes (the dialog's own). */
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (failed) return
    if (e.key === "+" || e.key === "=") view.zoomIn()
    else if (e.key === "-") view.zoomOut()
    else if (e.key === "0") view.fit()
    else if (!isPdf && (e.key === "r" || e.key === "R")) view.turn()
    else return
    e.preventDefault()
  }

  const pct = Math.round(view.v.zoom * 100)
  const kind = isPdf
    ? count
      ? (copy?.pages?.(count) ?? `PDF · ${count} ${count === 1 ? "page" : "pages"}`)
      : "PDF"
    : (copy?.image ?? "Image")

  const header = (
    Title: typeof DialogTitle | typeof DrawerTitle,
    Desc: typeof DialogDescription | typeof DrawerDescription
  ) => (
    <div className="flex shrink-0 items-start gap-2 border-b border-hairline px-4 pt-3 pb-3 sm:px-6 sm:pt-6 sm:pb-4">
      <div className="min-w-0 flex-1">
        {/* The whole name, wrapped: the slot cuts it; the viewer is where it is read. */}
        <Title className="text-body font-semibold break-all">{file.name}</Title>
        <Desc className="mt-0.5 text-body-compact text-muted-foreground">
          {kind}
          {file.size ? ` · ${file.size}` : ""}
        </Desc>
      </div>
      {!failed ? (
        <Button
          size="icon"
          variant="ghost"
          aria-label={copy?.download?.(file.name) ?? `Download ${file.name}`}
          onClick={download}
        >
          <DownloadIcon aria-hidden />
        </Button>
      ) : null}
      <Button
        size="icon"
        variant="ghost"
        aria-label={copy?.close ?? "Close"}
        onClick={() => change(false)}
      >
        <XIcon aria-hidden />
      </Button>
    </div>
  )

  /* The island: on the document, bottom right, as the app's case-file viewer. 32px
     buttons with a mouse, 40px on touch. */
  const island = failed ? null : (
    <div
      data-vaul-no-drag
      role="toolbar"
      aria-label="Zoom"
      className="absolute right-3 bottom-3 flex items-center gap-0.5 rounded-lg border border-hairline bg-card p-0.5 shadow-raised"
    >
      <Button
        size="icon-xs"
        variant="ghost"
        className="pointer-coarse:size-10"
        aria-label={copy?.zoomOut ?? "Zoom out"}
        onClick={view.zoomOut}
        disabled={view.v.zoom <= view.range.min}
      >
        <MinusIcon aria-hidden />
      </Button>
      <Button
        size="xs"
        variant="ghost"
        className="w-12 tabular-nums pointer-coarse:h-10 pointer-coarse:w-14"
        aria-label={copy?.zoomLevel?.(pct) ?? `Zoom ${pct} percent. Fit to screen`}
        onClick={view.fit}
      >
        {pct}%
      </Button>
      <Button
        size="icon-xs"
        variant="ghost"
        className="pointer-coarse:size-10"
        aria-label={copy?.zoomIn ?? "Zoom in"}
        onClick={view.zoomIn}
        disabled={view.v.zoom >= view.range.max}
      >
        <PlusIcon aria-hidden />
      </Button>
      {/* Turning is for photos, which arrive sideways from phones. A PDF's pages come the
          right way up from whatever made it. */}
      {isPdf ? null : (
        <>
          <span aria-hidden className="mx-0.5 h-5 w-px bg-hairline" />
          <Button
            size="icon-xs"
            variant="ghost"
            className="pointer-coarse:size-10"
            aria-label={copy?.turn ?? "Turn a quarter clockwise"}
            onClick={view.turn}
          >
            <RotateCwIcon aria-hidden />
          </Button>
        </>
      )}
    </div>
  )

  /* Where you are in a PDF, bottom left, the island's quieter twin. */
  const pageTag =
    !failed && isPdf && count ? (
      <p
        aria-live="polite"
        className="pointer-events-none absolute bottom-3 left-3 rounded-lg border border-hairline bg-card px-2.5 py-1.5 text-caption text-muted-foreground tabular-nums shadow-raised"
      >
        {copy?.page?.(page, count) ?? `Page ${page} of ${count}`}
      </p>
    ) : null

  /* A file that will not show: the system's dead end, neutral and flat. The file is
     fine and still on the record; only this preview failed. */
  const body = failed ? (
    <div className="flex min-h-0 flex-1 items-center justify-center">
      <PageOutcome
        tone="neutral"
        icon={EyeOffIcon}
        as="p"
        title={copy?.failedTitle ?? "This document can't be shown here"}
        body={copy?.failedBody ?? "The file is safe. Download it to open it on your device."}
        action={
          <Button variant="outline" onClick={download}>
            <DownloadIcon data-icon="inline-start" aria-hidden />
            {copy?.downloadButton ?? "Download"}
          </Button>
        }
      />
    </div>
  ) : isPdf ? (
    <PdfBody
      file={file}
      view={view}
      onPage={setPage}
      onCount={setCount}
      onFail={fail}
      pageLabel={(n) => `Page ${n}`}
    />
  ) : (
    <ImageBody file={file} view={view} onFail={fail} />
  )

  const well = (
    <div
      data-vaul-no-drag
      data-slot="document-viewer-well"
      className="relative flex min-h-0 flex-1 flex-col bg-surface-sunken"
    >
      {body}
      {pageTag}
      {island}
    </div>
  )

  /* White, not the usual sunken footer band (owner, 2026-11-10): the document sits on a
     sunken well, so a sunken footer ran into it. White header and footer frame the well. */
  const actions =
    onChange || onRemove ? (
      <div
        data-vaul-no-drag
        className="grid shrink-0 grid-cols-2 gap-2 border-t border-hairline bg-popover px-4 pt-3 pb-[calc(--spacing(3)+env(safe-area-inset-bottom))] sm:flex sm:justify-end sm:px-6 sm:pb-4"
      >
        {onChange ? (
          <Button variant="outline" onClick={onChange}>
            {copy?.change ?? "Change"}
          </Button>
        ) : null}
        {onRemove ? (
          <Button variant="destructive" onClick={onRemove}>
            {copy?.remove ?? "Remove"}
          </Button>
        ) : null}
      </div>
    ) : null

  if (tray)
    return (
      <Drawer open={open} onOpenChange={change}>
        <DrawerContent
          data-slot="document-viewer"
          onKeyDown={onKeyDown}
          className="h-[94dvh] data-[vaul-drawer-direction=bottom]:max-h-[94dvh]"
        >
          {header(DrawerTitle, DrawerDescription)}
          {well}
          {actions}
        </DrawerContent>
      </Drawer>
    )

  return (
    <Dialog open={open} onOpenChange={change}>
      <DialogContent
        data-slot="document-viewer"
        showCloseButton={false}
        onKeyDown={onKeyDown}
        className="flex h-[88dvh] max-h-[52rem] w-[calc(100vw-2rem)] flex-col gap-0 overflow-hidden p-0 sm:max-w-3xl"
      >
        {header(DialogTitle, DialogDescription)}
        {well}
        {actions}
      </DialogContent>
    </Dialog>
  )
}

export { DocumentViewer }
