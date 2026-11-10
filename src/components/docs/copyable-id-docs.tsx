"use client";

import { HistoryIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CopyableId } from "@/components/ui/copyable-id";
import { FeedbackToaster } from "@/components/ui/feedback-toaster";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

/** Hover each one: in a sentence and beside an icon what follows moves aside; in the
    table the glyph sits over the cell's padding and no column moves. */
export function CopyableIdDemo() {
  return (
    <div className="flex w-full max-w-2xl flex-col gap-8">
      <p className="text-body">
        <CopyableId value="ST 412/2025" label="case number" /> · 24×7 ON Court, Kollam
      </p>

      <div className="flex items-center gap-1">
        <span className="text-title-s font-semibold">
          <CopyableId value="CC 847/2026" label="case number" />
        </span>
        <Button size="icon-sm" variant="ghost" aria-label="Case history">
          <HistoryIcon aria-hidden />
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Case number</TableHead>
            <TableHead>CNR</TableHead>
            <TableHead>Next hearing</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[
            ["ST 412/2025", "KLKM520008472025", "19 August 2026"],
            ["CC 847/2026", "KLKM520008472026", "18 September 2026"],
          ].map(([no, cnr, date]) => (
            <TableRow key={no}>
              <TableCell>
                <CopyableId value={no} label="case number" />
              </TableCell>
              <TableCell>
                <CopyableId value={cnr} label="CNR" />
              </TableCell>
              <TableCell>{date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <p className="text-body-compact text-muted-foreground">
        Inside something already clickable (a case card that opens the case):{" "}
        <CopyableId value="ST 412/2025" label="case number" copyable={false} />
      </p>

      <FeedbackToaster />
    </div>
  );
}
