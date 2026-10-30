"use client"

import * as React from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DescriptionDetails,
  DescriptionList,
  DescriptionRow,
  DescriptionTerm,
} from "@/components/ui/description-list"
import { SegmentedControl, SegmentedControlItem } from "@/components/ui/segmented-control"
import { SIDE_PANEL_PUSH, SidePanel, SidePanelRegion } from "@/components/ui/side-panel"
import { cn } from "@/lib/utils"

const CASES = [
  { id: "ST 412/2026", parties: "Sunil Varghese v. Anand Traders", stage: "Evidence" },
  { id: "ST 418/2026", parties: "Meenakshi Nair v. Coastal Agro", stage: "Appearance" },
  { id: "ST 431/2026", parties: "Kiran Mathew v. Harbour Line", stage: "Cognizance" },
]

type Push = "content" | "none" | "marked"

const SAYS: Record<Push, string> = {
  content: "“Push the content” · everything steps aside (Raise application)",
  none: "“The panel goes over the content” · nothing moves (advocate home)",
  marked: "“Push the header, the panel goes over the table” (Cases)",
}

/** All three behaviours on one list, named the way a designer says them. */
export function SidePanelDemo() {
  const [push, setPush] = React.useState<Push>("content")
  const [open, setOpen] = React.useState<(typeof CASES)[number] | null>(null)
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex flex-col gap-2">
        <SegmentedControl
          type="single"
          size="compact"
          value={push}
          onValueChange={(v) => v && setPush(v as Push)}
          aria-label="What makes room for the panel"
        >
          <SegmentedControlItem value="content">push=&quot;content&quot;</SegmentedControlItem>
          <SegmentedControlItem value="none">push=&quot;none&quot;</SegmentedControlItem>
          <SegmentedControlItem value="marked">push=&quot;marked&quot;</SegmentedControlItem>
        </SegmentedControl>
        <p className="text-caption text-muted-foreground">{SAYS[push]}</p>
      </div>
      <SidePanelRegion open={Boolean(open)} push={push} className="flex w-full flex-col gap-4">
        <div className={cn("flex items-center justify-between gap-4", push === "marked" && SIDE_PANEL_PUSH)}>
          <p className="text-body font-semibold">Cases</p>
          <p className="text-caption text-muted-foreground">{push === "marked" ? "Marked: this header moves." : "Header"}</p>
        </div>
        <div className="flex flex-col divide-y divide-hairline rounded-xl border border-hairline">
          {CASES.map((c) => (
            <div key={c.id} className="flex items-center justify-between gap-4 px-4 py-3">
              <div className="flex min-w-0 flex-col">
                <span className="text-body-compact font-medium">{c.parties}</span>
                <span className="text-caption text-muted-foreground">{c.id}</span>
              </div>
              <Button variant="outline" size="sm" onClick={() => setOpen(c)}>
                Peek
              </Button>
            </div>
          ))}
        </div>
        <SidePanel open={Boolean(open)} onOpenChange={(next) => !next && setOpen(null)} title={open?.parties ?? ""}>
          {open ? (
            <DescriptionList>
              <DescriptionRow className="border-hairline">
                <DescriptionTerm>Case number</DescriptionTerm>
                <DescriptionDetails>{open.id}</DescriptionDetails>
              </DescriptionRow>
              <DescriptionRow className="border-hairline">
                <DescriptionTerm>Stage</DescriptionTerm>
                <DescriptionDetails>
                  <Badge variant="info">{open.stage}</Badge>
                </DescriptionDetails>
              </DescriptionRow>
            </DescriptionList>
          ) : null}
        </SidePanel>
      </SidePanelRegion>
    </div>
  )
}
