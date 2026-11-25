"use client"

import * as React from "react"

/**
 * The words the components say on their own: screen-reader labels ("Close", "Loading"),
 * placeholders and small hints. English is the default. A product that translates its
 * interface wraps its root once in `CopyProvider` and passes its own words; the
 * components then never need editing to be translated, and stay exact copies of the DS.
 */
const DEFAULT_COPY = {
  /** Close buttons on Dialog, Sheet, SidePanel and Notify. */
  close: "Close",
  /** Spinner's accessible name. */
  loading: "Loading",
  /** Breadcrumb's landmark name. */
  breadcrumb: "breadcrumb",
  /** BreadcrumbEllipsis, for the collapsed middle of a trail. */
  breadcrumbMore: "More",
  /** CommandDialog's hidden title and description, when none are passed. */
  commandTitle: "Command Palette",
  commandDescription: "Search for a command to run...",
  /** DatePicker and DateRangePicker placeholders, when none are passed. */
  datePickerPlaceholder: "Pick a date",
  dateRangePickerPlaceholder: "Pick a date range",
  /** Input and Textarea, under a value the machine filled and nobody has checked. */
  machineFilled: "Machine filled, not yet verified",
  /** DocumentSlot labels. Its `copy` prop still wins for one slot. */
  optional: "Optional",
  noFileChosen: "No file chosen yet",
  goodScan: "Good scan",
  poorScan: "Poor scan",
  chooseFile: "Choose file",
  /** Outcome's count of a partial result. */
  doneOfTotal: (done: number, total: number) => `${done} of ${total}`,
  /** Pagination's landmark name and control labels. `text` on Previous/Next still wins. */
  pagination: "pagination",
  previous: "Previous",
  next: "Next",
  previousPage: "Go to previous page",
  nextPage: "Go to next page",
  morePages: "More pages",
  /** Sidebar, on phones, where it opens as a sheet. */
  sidebarTitle: "Sidebar",
  sidebarDescription: "Displays the mobile sidebar.",
  toggleSidebar: "Toggle Sidebar",
}

type Copy = typeof DEFAULT_COPY

const CopyContext = React.createContext<Copy>(DEFAULT_COPY)

/** Give the components their words. Anything left out stays in English. */
function CopyProvider({
  copy,
  children,
}: {
  copy: Partial<Copy>
  children: React.ReactNode
}) {
  const value = React.useMemo(() => ({ ...DEFAULT_COPY, ...copy }), [copy])
  return <CopyContext.Provider value={value}>{children}</CopyContext.Provider>
}

/** The words for the components, from the nearest CopyProvider, or English. */
function useCopy(): Copy {
  return React.useContext(CopyContext)
}

export { CopyProvider, useCopy, DEFAULT_COPY, type Copy }
