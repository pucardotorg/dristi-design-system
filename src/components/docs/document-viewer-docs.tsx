"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import { DocumentSlot } from "@/components/ui/document-slot";
import { DocumentViewer, type DocumentViewerFile } from "@/components/ui/document-viewer";

const FILES: { key: string; label: string; file: DocumentViewerFile }[] = [
  {
    key: "photo",
    label: "Cheque photo",
    file: { name: "cheque.jpg", size: "640 KB", type: "image/svg+xml", url: "/samples/cheque.svg" },
  },
  {
    key: "sideways",
    label: "Photo taken sideways",
    file: {
      name: "IMG_20261002_114503.jpg",
      size: "2.1 MB",
      type: "image/svg+xml",
      url: "/samples/cheque-sideways.svg",
    },
  },
  {
    key: "pdf",
    label: "PDF, 3 pages",
    file: {
      name: "Bank_return_memo_South_Indian_Bank_Kollam_branch_Oct2026.pdf",
      size: "7 KB",
      type: "application/pdf",
      url: "/samples/bank-return-memo.pdf",
    },
  },
  {
    key: "broken",
    label: "File that will not load",
    file: { name: "legal-notice.pdf", size: "1.1 MB", type: "application/pdf", url: "/samples/missing.pdf" },
  },
];

/** The viewer opened from a real slot (Change and Remove inside), and from a button
    for each kind of file. The slot opens the viewer itself. */
export function DocumentViewerDemo() {
  const [open, setOpen] = React.useState<string | null>(null);
  const [filled, setFilled] = React.useState(true);
  const current = FILES.find((f) => f.key === open);

  return (
    <div className="flex w-full max-w-xl flex-col gap-6">
      <DocumentSlot
        label="Cheque"
        required
        hint="JPG, PNG or PDF · up to 10 MB"
        copy={{ chooseFile: "Add cheque" }}
        file={filled ? FILES[0].file : undefined}
        quality="good"
        onChooseFile={() => setFilled(true)}
        onChange={() => {}}
        onRemove={() => setFilled(false)}
      />
      <div className="flex flex-wrap gap-2">
        {FILES.map((f) => (
          <Button
            key={f.key}
            variant="outline"
            size="sm"
            onClick={() => setOpen(f.key)}
          >
            {f.label}
          </Button>
        ))}
      </div>
      {current ? (
        <DocumentViewer
          key={current.key}
          open
          onOpenChange={(o) => !o && setOpen(null)}
          file={current.file}
        />
      ) : null}
    </div>
  );
}
