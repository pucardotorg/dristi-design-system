import type { Metadata } from "next";

import { Callout } from "@/components/docs/callout";
import { PageHeader } from "@/components/docs/page-header";
import { DocsSection } from "@/components/docs/section";

export const metadata: Metadata = {
  title: "Status & feedback",
};

const tones = [
  ["success", "It happened.", "A draft saved or an archive (neutral)."],
  ["error", "It did not happen, or was refused.", "A missed lookup or a typo-level miss (neutral)."],
  ["warning", "It happened with a catch, or needs a look.", "A gate, a question, a dead end, an irreversible act."],
  ["info", "Sent, not decided yet.", "General tips."],
  ["neutral", "Not news: gates, drafts, dead ends, no match, waiting on you.", "Anything that went wrong."],
  ["danger", "The question before a removal or discard.", "Outcomes. Confirms only."],
];

const pieces = [
  ["Refused input", "Status line · field error", "On the field. Never a toast."],
  ["Question before a risky act", "Alert dialog + confirm mark", "Danger for removals; neutral with a lock line for sign, pay, file."],
  ["Act reaching the court, moving money or adding a signature", "Outcome header", "Takes over the top of the same dialog."],
  ["Some went through, some did not", "Outcome header (neutral, checklist) + tally", "The header says only what fully happened."],
  ["Quick act, page stays put", "Notify", "2.75s, click-away. Errors stay until closed."],
  ["A note inside a page or dialog", "Status line", "Stays as long as it is true."],
  ["The whole page is the outcome, or a dead end", "Page outcome", "Dead ends are neutral and flat."],
  ["A standing state on a row", "Badge with a 14px mark", "Concentric in the pill."],
  ["A dialog closed back onto a list", "Landing", "The changed row glows once."],
];

export default function StatusPage() {
  return (
    <div className="flex flex-col gap-12">
      <PageHeader
        title="Status & feedback"
        description="How the product says something worked, failed, partly failed, needs a look, or is not news. One mark in six tones, at the weight the act deserves."
      />

      <Callout>
        Pick the piece by what happened, then the tone. Never hand-build a success disc, a
        green strip, a red banner, a coloured toast or a confirm layout: the components carry
        the motion, sizes, tones and accessibility, and a screen supplies only words and facts.
      </Callout>

      <DocsSection title="Tones" description="When unsure between warning and neutral, choose neutral. Warning only where the product already treats the thing as a warning.">
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-left text-sm">
            <thead className="bg-surface-sunken text-xs text-muted-foreground">
              <tr>
                <th className="px-4 py-2 font-medium">Tone</th>
                <th className="px-4 py-2 font-medium">Means</th>
                <th className="px-4 py-2 font-medium">Never for</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {tones.map(([tone, means, never]) => (
                <tr key={tone}>
                  <td className="px-4 py-2 font-mono text-xs text-foreground">{tone}</td>
                  <td className="px-4 py-2 text-foreground">{means}</td>
                  <td className="px-4 py-2 text-muted-foreground">{never}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DocsSection>

      <DocsSection title="Which piece" description="Ask in this order; the first that fits wins.">
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-left text-sm">
            <thead className="bg-surface-sunken text-xs text-muted-foreground">
              <tr>
                <th className="px-4 py-2 font-medium">What happened</th>
                <th className="px-4 py-2 font-medium">Piece</th>
                <th className="px-4 py-2 font-medium">Note</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {pieces.map(([what, piece, note]) => (
                <tr key={what}>
                  <td className="px-4 py-2 text-foreground">{what}</td>
                  <td className="px-4 py-2 text-foreground">{piece}</td>
                  <td className="px-4 py-2 text-muted-foreground">{note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DocsSection>

      <DocsSection title="Rules">
        <ul className="list-disc space-y-2 pl-6 text-sm leading-relaxed text-muted-foreground">
          <li>
            <span className="text-foreground">Never colour alone.</span> Every mark has its own
            glyph: check, cross, !, hourglass, or the act&apos;s icon. A tally&apos;s failed share
            also carries stripes. Glyphs must read at 16–20px in greyscale.
          </li>
          <li>
            <span className="text-foreground">The title sits under the mark,</span> never in a
            header above it, and every outcome closes on the footer band (
            <code>border-t border-hairline bg-surface-sunken</code>) with its buttons on it.
          </li>
          <li>
            <span className="text-foreground">Rails are straight,</span> full height and flush
            left, clipped by the corner radius. They never bend with it.
          </li>
          <li>
            <span className="text-foreground">A mark in a pill is concentric:</span> equal inset at
            the top, bottom and end.
          </li>
          <li>
            <span className="text-foreground">Labels that state an outcome use success green,</span>{" "}
            never teal. Teal is the action colour and reads as clickable.
          </li>
          <li>
            <span className="text-foreground">Errors in a dialog are said in the dialog.</span> A
            toast behind a dialog cannot be closed.
          </li>
          <li>
            <span className="text-foreground">Dark mode lifts feedback surfaces.</span> The toast
            sits on <code>surface-raised</code> with a full border; on <code>popover</code> alone it
            disappears into the page.
          </li>
          <li>
            <span className="text-foreground">Copy:</span> keep the product&apos;s own words; a
            failure says what did not happen and what to do (Nothing was paid; try again). Never
            add a button a flow did not have.
          </li>
        </ul>
      </DocsSection>

      <DocsSection
        title="The one exception to rule 6"
        description="Three treatments per status still holds. These blends mix two opaque tokens; none uses alpha."
      >
        <ul className="list-disc space-y-2 pl-6 text-sm leading-relaxed text-muted-foreground">
          <li>The outcome band fades from the status <code>-muted</code> fill into the surface behind it.</li>
          <li>A page outcome sits on a soft radial glow of the same fill. Neutral dead ends stay flat.</li>
          <li>A tally&apos;s failed share stripes the status solid with a 40% mix into <code>card</code>.</li>
        </ul>
      </DocsSection>

      <DocsSection title="Retired for outcomes" description="Leave them only where a flow has not moved yet; each has a replacement above.">
        <ul className="list-disc space-y-2 pl-6 text-sm leading-relaxed text-muted-foreground">
          <li>The tinted 56px disc header → Outcome header.</li>
          <li>The thin success or failure strip on a card → Status line.</li>
          <li>Solid green slabs, panels and bands → Outcome header.</li>
          <li>Banner, Alert or a section notice as a success or failure confirmation → Status line or Outcome.</li>
          <li><code>toast.success</code>, <code>toast.error</code>, <code>toast()</code> → Notify.</li>
          <li>The receipt&apos;s solid disc above an unlabelled amount → Outcome amount.</li>
        </ul>
      </DocsSection>
    </div>
  );
}
