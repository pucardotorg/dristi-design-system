import type { Metadata } from "next";
import Link from "next/link";

import { Callout } from "@/components/docs/callout";
import { DoDont } from "@/components/docs/do-dont";
import { PageHeader } from "@/components/docs/page-header";
import { DocsSection } from "@/components/docs/section";
import { Preview } from "@/components/docs/preview";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Spacing",
};

/**
 * Abhiram Figma "Spacing & radius" ladder — Tailwind default scale, not custom
 * CSS variables. Micro steps (0.5 / 1.5 / 2.5) are for inside controls only.
 */
const ladder = [
  { token: "space/0-5", px: 2, tw: "p-0.5", role: "micro", micro: true },
  { token: "space/1", px: 4, tw: "p-1", role: "micro-adjacent", micro: true },
  { token: "space/1-5", px: 6, tw: "p-1.5", role: "micro", micro: true },
  { token: "space/2", px: 8, tw: "p-2", role: "inside controls", micro: false },
  { token: "space/2-5", px: 10, tw: "p-2.5", role: "micro", micro: true },
  { token: "space/3", px: 12, tw: "p-3", role: "tight groups", micro: false },
  { token: "space/4", px: 16, tw: "p-4", role: "related content", micro: false },
  { token: "space/6", px: 24, tw: "p-6", role: "card padding", micro: false },
  { token: "space/8", px: 32, tw: "p-8", role: "section gaps", micro: false },
  { token: "space/12", px: 48, tw: "p-12", role: "large sections", micro: false },
  { token: "space/16", px: 64, tw: "p-16", role: "page regions", micro: false },
] as const;

const recipes = [
  {
    title: "Tight control group",
    classes: "gap-2 / gap-3",
    description: "Related buttons, badge clusters, inline form controls.",
  },
  {
    title: "Related content",
    classes: "gap-4",
    description: "Section internals, stacked form fields, list rows.",
  },
  {
    title: "Card / panel padding",
    classes: "p-6 (sm: p-4)",
    description: "Default Card uses 24px; size=sm uses 16px.",
  },
  {
    title: "Section gaps",
    classes: "gap-8 / gap-12",
    description: "Between major page sections and documentation blocks.",
  },
  {
    title: "Page regions",
    classes: "gap-16 / p-16",
    description: "Largest structural separation — page-level regions only.",
  },
];

export default function SpacingPage() {
  return (
    <div className="flex flex-col gap-12">
      <PageHeader
        title="Spacing"
        description="The 4px grid, 8px rhythm. Ladder: 1 · 2 · 3 · 4 · 6 · 8 · 12 · 16. Micro steps (0.5 / 1.5 / 2.5) live inside controls only. Proximity is meaning — spacing states what belongs together."
      />

      <Callout title="No custom spacing tokens in code">
        Code ships no custom spacing CSS variables — the 4px grid is
        Tailwind&apos;s default scale (<code>p-4</code> = 16px).
        Figma variables exist so auto-layout gap and padding bind to the ladder;
        the source of truth stays Tailwind. Arbitrary values like{" "}
        {/* ds-tokens-ignore — anti-example in docs prose */}
        <code>gap-[13px]</code> and off-ladder steps like{" "}
        {/* ds-tokens-ignore — anti-example in docs prose */}
        <code>p-5</code> / <code>p-7</code> / <code>gap-10</code> are banned.
      </Callout>

      <DocsSection
        title="Ladder"
        description="Every step maps 1:1 to a Tailwind spacing utility. Use the same numbers for gap, padding, and margin."
      >
        <div className="overflow-hidden rounded-xl border border-border">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border bg-muted/50">
              <tr>
                <th className="px-4 py-2.5 font-medium">Figma</th>
                <th className="px-4 py-2.5 font-medium">px</th>
                <th className="px-4 py-2.5 font-medium">Tailwind</th>
                <th className="hidden px-4 py-2.5 font-medium sm:table-cell">
                  Role
                </th>
                <th className="px-4 py-2.5 font-medium">Scale</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {ladder.map((row) => (
                <tr key={row.token}>
                  <td className="px-4 py-3 font-mono text-xs text-foreground">
                    {row.token}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                    {row.px}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-foreground">
                    {row.tw}
                  </td>
                  <td className="hidden px-4 py-3 text-muted-foreground sm:table-cell">
                    {row.role}
                    {row.micro ? (
                      <span className="ml-1 text-caption text-muted-foreground">
                        · controls only
                      </span>
                    ) : null}
                  </td>
                  <td className="px-4 py-3">
                    <div
                      className="h-6 rounded-sm bg-track"
                      style={{ width: row.px }}
                      aria-hidden
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DocsSection>

      <DocsSection
        title="Control metrics"
        description="Heights and paddings that keep interactive chrome on the same rhythm as the ladder."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex flex-col gap-2 rounded-xl bg-surface-sunken px-4 py-4">
            <p className="text-body font-medium text-foreground">
              Fields &amp; buttons
            </p>
            <p className="text-body-compact text-muted-foreground">
              Default height <code className="text-foreground">40px</code>{" "}
              (<code className="text-foreground">h-10</code>. Allowed ladder:{" "}
              <code className="text-foreground">32 / 36 / 40 / 44</code> (
              <code className="text-foreground">h-8</code> ·{" "}
              <code className="text-foreground">h-9</code> ·{" "}
              <code className="text-foreground">h-10</code> ·{" "}
              <code className="text-foreground">h-11</code>). Touch targets ≥{" "}
              <code className="text-foreground">40×40</code> on citizen-facing
              UI.
            </p>
          </div>
          <div className="flex flex-col gap-2 rounded-xl bg-surface-sunken px-4 py-4">
            <p className="text-body font-medium text-foreground">
              Containers &amp; chips
            </p>
            <p className="text-body-compact text-muted-foreground">
              Container padding <code className="text-foreground">24px</code>{" "}
              (<code className="text-foreground">p-6</code>; small card{" "}
              <code className="text-foreground">16px</code>{" "}
              <code className="text-foreground">p-4</code>. Chip height{" "}
              <code className="text-foreground">24px</code>.
            </p>
          </div>
        </div>
      </DocsSection>

      <DocsSection title="Common recipes">
        <div className="overflow-hidden rounded-xl border border-border">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border bg-muted/50">
              <tr>
                <th className="px-4 py-2.5 font-medium">Pattern</th>
                <th className="px-4 py-2.5 font-medium">Classes</th>
                <th className="px-4 py-2.5 font-medium">When</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {recipes.map((row) => (
                <tr key={row.title}>
                  <td className="px-4 py-3 font-medium text-foreground">
                    {row.title}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-foreground">
                    {row.classes}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {row.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DocsSection>

      <DocsSection
        title="Rules"
        description="Spacing is a law, not a preference. See also Radius for corner roles."
      >
        <DoDont
          do={[
            "Stay on the ladder: 0.5 · 1 · 1.5 · 2 · 2.5 · 3 · 4 · 6 · 8 · 12 · 16",
            "Reserve 0.5 / 1.5 / 2.5 for inside controls",
            "Default Card padding p-6; related stacks gap-4; section breaks gap-8+",
          ]}
          dont={[
            // ds-tokens-ignore — anti-example in docs prose
            "Off-ladder steps: p-5, p-7, gap-5, gap-10, mb-10…",
            // ds-tokens-ignore — anti-example in docs prose
            "Arbitrary lengths: p-[13px], gap-[18px]",
            "Micro steps (0.5 / 1.5 / 2.5) between page sections",
          ]}
        />
        <Callout className="mt-4">
          Corner radius is a separate foundation — one 10px knob, assigned by
          role. See{" "}
          <Link
            href="/foundations/radius"
            className="underline underline-offset-3"
          >
            Radius
          </Link>
          .
        </Callout>
      </DocsSection>

      <DocsSection title="Live example">
        <Preview label="gap-3 button group" className="gap-3">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
        </Preview>
      </DocsSection>
    </div>
  );
}
