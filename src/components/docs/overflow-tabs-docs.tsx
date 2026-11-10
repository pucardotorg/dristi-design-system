"use client";

import * as React from "react";

import { OverflowTabsList } from "@/components/ui/overflow-tabs";
import { Tabs, TabsContent } from "@/components/ui/tabs";

/* View Case's sections, as the app lists them (Hearings is reached by link, not in the strip). */
export const CASE_SECTIONS = [
  { value: "overview", label: "Overview" },
  { value: "case-file", label: "Case File" },
  { value: "complaint", label: "Complaint" },
  { value: "notice", label: "Notice / Process Status" },
  { value: "orders", label: "Orders & Notifications" },
  { value: "applications", label: "Applications" },
  { value: "documents", label: "Documents" },
  { value: "parties", label: "Parties" },
  { value: "history", label: "Case History" },
];

/* The app's strip classes (case-section-tabs.tsx): a hairline rule under the row, 40px
   tabs that keep their own widths. */
const STRIP_ROW = "border-b border-hairline";
const STRIP_LIST = "h-10 w-full justify-start rounded-none";
const STRIP_ITEM = "h-10 flex-none px-3 text-body-compact";

/** View Case's tab row: what fits stays, the rest fold under More. */
export function CaseTabs({ initial = "overview" }: { initial?: string }) {
  const [value, setValue] = React.useState(initial);
  return (
    <Tabs value={value} onValueChange={setValue} className="flex min-w-0 flex-col gap-4">
      <div className={STRIP_ROW}>
        <OverflowTabsList
          aria-label="Case sections"
          value={value}
          onSelect={setValue}
          className={STRIP_LIST}
          triggerClassName={STRIP_ITEM}
          items={CASE_SECTIONS}
        />
      </div>
      {CASE_SECTIONS.map((s) => (
        <TabsContent key={s.value} value={s.value} className="text-body-compact text-muted-foreground">
          {s.label} panel.
        </TabsContent>
      ))}
    </Tabs>
  );
}

/** Docs preview: the row in a box you can drag narrower. */
export function OverflowTabsDocsDemo() {
  return (
    <div className="flex w-full flex-col gap-3">
      <div className="w-full max-w-full min-w-48 resize-x overflow-hidden rounded-xl border border-hairline bg-card p-4" style={{ width: 720 }}>
        <CaseTabs />
      </div>
      <p className="text-caption text-muted-foreground">
        Drag the box&apos;s bottom-right corner to narrow it: tabs that no longer fit fold into More. Pick one from
        More and More takes the underline.
      </p>
    </div>
  );
}
