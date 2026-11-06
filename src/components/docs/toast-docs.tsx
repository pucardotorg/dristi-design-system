"use client";

import Link from "next/link";

import { ChangesBox } from "@/components/docs/changed-mark";
import { Callout } from "@/components/docs/callout";
import { DoDont } from "@/components/docs/do-dont";
import { PageHeader } from "@/components/docs/page-header";
import { Preview } from "@/components/docs/preview";
import { DocsSection } from "@/components/docs/section";
import { getComponentDoc } from "@/components/docs/component-registry";
import { docsChanges } from "@/lib/docs-changes";
import type { ComponentDoc } from "@/lib/component-doc-types";

/*
 * One docs page for the toast. The toast is built from two pieces of code (Notify and
 * Feedback toaster) on top of a library primitive (Sonner). Their registry entries stay
 * separate and unchanged, because agents, the registry build and check:ds read them;
 * this page only shows them together and says which piece is which.
 */

const pieces: [string, string, string, string][] = [
  [
    "What it is",
    "The toast itself: its words, mark, tint, timer and how long it stays.",
    "The place toasts appear: bottom centre, 380px wide, click-away.",
    "The Sonner library both sit on.",
  ],
  [
    "What you see",
    "The card.",
    "Nothing. It has no look of its own.",
    "Its own coloured variants, which the product no longer uses.",
  ],
  [
    "Who touches it",
    "Every screen, each time a quick act finishes.",
    "A developer, once per product area.",
    "Nobody in product code.",
  ],
  [
    "In code",
    "notify.success(\"Access given\")",
    "<FeedbackToaster /> in the area's layout",
    "Never imported by a screen",
  ],
];

const toastCases: [string, string][] = [
  ["A quick act worked and the page stays put (access given, reminder sent, task archived)", "notify.success"],
  ["A quick act raised from a page did not happen", "notify.error. Stays until closed."],
  ["Worth knowing after an act (who can now see a case; sent and waiting)", "notify.info: glyph \"i\" to take in, the hourglass when waiting"],
  ["Quiet housekeeping: a draft saved, a task archived", "notify.neutral, with the act's icon"],
  ["A catch the product already treats as a warning", "notify.warning"],
];

const notToastCases: [string, string][] = [
  ["The person's own input was refused (empty field, wrong code)", "Field error on the field (Status line)"],
  ["Something failed while a dialog is open", "Status line or Outcome inside the dialog"],
  ["An act that reaches the court, moves money or adds a signature finished", "Outcome"],
  ["A note that should stay on the page", "Status line"],
  ["A condition true for the whole page when it loads", "Banner"],
  ["A question before a risky act", "Alert dialog with Confirm mark"],
];

function Table({
  head,
  rows,
  mono,
}: {
  head: string[];
  rows: string[][];
  /** Column indexes (after the first) shown as code. */
  mono?: number[];
}) {
  return (
    <div className="overflow-x-auto rounded-xl border border-border">
      <table className="w-full text-left text-sm">
        <thead className="bg-surface-sunken text-xs text-muted-foreground">
          <tr>
            {head.map((cell) => (
              <th key={cell} className="px-4 py-2 font-medium">
                {cell}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-hairline">
          {rows.map((row) => (
            <tr key={row[0]}>
              {row.map((cell, index) => (
                <td
                  key={index}
                  className={
                    index === 0
                      ? "px-4 py-2 align-top text-foreground"
                      : mono?.includes(index)
                        ? "px-4 py-2 align-top font-mono text-xs text-foreground"
                        : "px-4 py-2 align-top text-muted-foreground"
                  }
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="list-disc space-y-2 pl-6 text-sm leading-relaxed text-muted-foreground">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

function Subheading({ children }: { children: React.ReactNode }) {
  return <h3 className="text-sm font-semibold text-foreground">{children}</h3>;
}

function Tokens({ tokens }: { tokens: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tokens.map((token) => (
        <code
          key={token}
          className="inline-flex items-center rounded-md border border-border bg-card px-2 py-1 font-mono text-xs text-foreground"
        >
          {token}
        </code>
      ))}
    </div>
  );
}

/** One piece of the toast, from its registry entry, word for word. */
function Piece({
  id,
  lead,
  doc,
  preview,
}: {
  id: string;
  lead: string;
  doc: ComponentDoc;
  preview?: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="flex scroll-mt-16 flex-col gap-6 border-t border-border pt-8"
    >
      <div className="flex flex-col gap-2">
        <h2 className="text-title-s font-semibold tracking-tight text-foreground">
          {doc.title}
        </h2>
        <p className="max-w-2xl text-sm leading-relaxed text-foreground">{lead}</p>
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
          {doc.description}
        </p>
        <code className="mt-1 w-fit rounded-md bg-muted px-2 py-1 font-mono text-xs text-foreground">
          {doc.importPath}
        </code>
      </div>

      <div className="flex flex-col gap-3">
        <Subheading>When to use</Subheading>
        <List items={doc.whenToUse} />
      </div>

      {preview ? <Preview>{preview}</Preview> : null}

      <div className="flex flex-col gap-3">
        <Subheading>Usage notes</Subheading>
        <List items={doc.usageNotes} />
      </div>

      {doc.doItems?.length && doc.dontItems?.length ? (
        <DoDont do={doc.doItems} dont={doc.dontItems} />
      ) : doc.dontItems?.length ? (
        <div className="flex flex-col gap-3">
          <Subheading>Don&apos;t</Subheading>
          <List items={doc.dontItems} />
        </div>
      ) : null}

      <div className="flex flex-col gap-3">
        <Subheading>Token coupling</Subheading>
        <Tokens tokens={doc.tokens} />
      </div>
    </section>
  );
}

export function ToastDocPage() {
  const notifyDoc = getComponentDoc("notify");
  const toasterDoc = getComponentDoc("feedback-toaster");
  if (!notifyDoc || !toasterDoc) return null;
  const changes = docsChanges.notify;

  return (
    <div className="flex flex-col gap-12">
      <PageHeader
        title="Toast"
        description="A short message at the bottom of the screen after a quick act, when the page stays where it is. One toast, built from two pieces of code: Notify is the toast, Feedback toaster is the place it appears. A designer only ever deals with Notify."
      />

      {changes ? <ChangesBox items={changes.summary} /> : null}

      <DocsSection
        title="Two pieces, one toast"
        description="Think of a letter and a letterbox. You read the letter (Notify). The letterbox (Feedback toaster) is fixed to the wall once and never thought about again."
      >
        <Table
          head={["", "Notify", "Feedback toaster", "Toast (primitive)"]}
          rows={pieces}
          mono={[]}
        />
        <Callout title="Why two pieces">
          The place is set once for the whole product; the toast is raised from hundreds of
          screens. Keeping the place in one spot means no screen can move, resize or restyle a
          toast. The primitive stays untouched underneath so the library can be upgraded.
        </Callout>
      </DocsSection>

      <DocsSection
        title="When to use a toast"
        description="Only for a quick act where the page stays put. A toast leaves on its own, so nothing the person must read or act on goes in one."
      >
        <Table head={["What happened", "Use"]} rows={toastCases} mono={[1]} />
      </DocsSection>

      <DocsSection
        title="When not to use a toast"
        description="Each of these has its own piece. The full order is on Foundations, Status & feedback."
      >
        <Table head={["What happened", "Use instead"]} rows={notToastCases} />
      </DocsSection>

      <Piece
        id="notify"
        lead="The toast itself. Call it from a screen each time a quick act finishes."
        doc={notifyDoc}
        preview={notifyDoc.preview}
      />

      <Piece
        id="feedback-toaster"
        lead="The place toasts appear. Mounted once per product area by a developer. It has no look of its own, so it has no preview: the toasts above draw into it."
        doc={toasterDoc}
      />

      <section
        id="primitive"
        className="flex scroll-mt-16 flex-col gap-3 border-t border-border pt-8"
      >
        <h2 className="text-title-s font-semibold tracking-tight text-foreground">
          Toast (primitive)
        </h2>
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
          The Sonner library that both pieces sit on. It is not a third kind of toast and
          product code never imports it. Its page is kept apart, and shows the library&apos;s
          own coloured variants, which the product no longer uses.
        </p>
        <Link
          href="/components/sonner"
          className="w-fit text-sm font-medium text-primary underline-offset-4 hover:underline"
        >
          Open Toast (primitive)
        </Link>
      </section>
    </div>
  );
}
