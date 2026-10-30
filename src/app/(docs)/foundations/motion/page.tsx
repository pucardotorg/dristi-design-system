import type { Metadata } from "next";

import { Callout } from "@/components/docs/callout";
import { PageHeader } from "@/components/docs/page-header";
import { DocsSection } from "@/components/docs/section";

export const metadata: Metadata = {
  title: "Motion",
};

const budget = [
  {
    size: "Hero mark · 44px and up",
    where: "Outcome header, page outcome",
    motion:
      "Waits 160ms, holds until painted, then the disc pops (420ms) and the glyph plays: the tick draws, the cross springs stroke by stroke, the ! drops and settles. Success rings once.",
    total: "about 600ms after the start",
  },
  {
    size: "Small mark · under 44px",
    where: "Toast, status line, tally line, badge",
    motion:
      "The disc pops (250ms). A tick draws itself inside it (280ms, from 120ms); any other glyph scales in after it.",
    total: "under 500ms",
  },
  {
    size: "Text",
    where: "Titles, bodies, facts",
    motion:
      "Rises 8px and fades in (360ms), after the mark. Never scales and never slides sideways: a line that moves while it is read is harder to read.",
    total: "follows the mark",
  },
  {
    size: "Field error",
    where: "StatusFieldError",
    motion:
      "The red ring grows in (260ms), the line opens its own room (220ms) and drops in from under the field (300ms). A repeat press shakes the field once (260ms) and replays the line.",
    total: "about 400ms",
  },
];

const values = [
  ["fb-pop", "420ms", "cubic-bezier(0.34, 1.56, 0.64, 1)", "Hero disc"],
  ["fb-pop-quick", "250ms", "cubic-bezier(0.2, 0.9, 0.3, 1.2)", "Small disc"],
  ["fb-draw", "360ms from 260ms", "cubic-bezier(0.65, 0, 0.35, 1)", "Hero tick"],
  ["fb-draw-quick", "280ms from 120ms", "cubic-bezier(0.65, 0, 0.35, 1)", "Small tick"],
  ["fb-stroke", "400ms from 200ms, 140ms apart", "cubic-bezier(0.34, 1.56, 0.64, 1)", "Hero cross"],
  ["fb-ring", "900ms from 200ms", "ease-out", "Success ring, once"],
  ["fb-sway", "420ms from 330ms", "ease-in-out", "Warning, ±5° once"],
  ["fb-rise", "360ms", "cubic-bezier(0.2, 0.8, 0.2, 1)", "Text after the mark"],
  ["fb-shake", "260ms", "ease-in-out", "Refused input only"],
  ["fb-drain", "2.75s linear", "linear", "Toast timer bar"],
  ["fb-land", "2600ms", "ease-out", "Row a dialog closed onto"],
];

export default function MotionPage() {
  return (
    <div className="flex flex-col gap-12">
      <PageHeader
        title="Motion"
        description="Motion says that something changed, at a size that matches how much it matters. It is budgeted by size, played once, and gone when reduced motion is on."
      />

      <Callout>
        Every value here lives in <code>src/app/feedback.css</code> and is applied by the
        status components (status mark, outcome, status line, notify). Screens never use
        the classes directly; they pick the component and its motion comes with it.
      </Callout>

      <DocsSection
        title="The budget, by size"
        description="The bigger the mark, the more it may do. Nothing loops."
      >
        <div className="flex flex-col divide-y divide-hairline rounded-xl border border-border">
          {budget.map((row) => (
            <div key={row.size} className="grid gap-2 p-4 sm:grid-cols-[12rem_1fr]">
              <div className="flex flex-col gap-0.5">
                <p className="text-sm font-medium text-foreground">{row.size}</p>
                <p className="text-xs text-muted-foreground">{row.where}</p>
              </div>
              <div className="flex flex-col gap-0.5">
                <p className="text-sm text-foreground">{row.motion}</p>
                <p className="text-xs text-muted-foreground">{row.total}</p>
              </div>
            </div>
          ))}
        </div>
      </DocsSection>

      <DocsSection title="Rules">
        <ul className="list-disc space-y-2 pl-6 text-sm leading-relaxed text-muted-foreground">
          <li>
            <span className="text-foreground">A hero mark waits 160ms and holds until painted.</span>{" "}
            The window has just changed; people need about that long to look back at it, and a
            slow first render must not eat the opening frames. The outcome&apos;s words wait with it.
            Under 200ms it reads as the window settling, not as lag.
          </li>
          <li>
            <span className="text-foreground">One animated mark per screen.</span> Everything after
            the first, and anything already true when the screen opens, is <code>still</code>. Marks
            that belong together play in order with <code>delay</code>.
          </li>
          <li>
            <span className="text-foreground">Success rings once, then rests.</span> An endless loop
            and three pulses (even slowing and fading) were tried and dropped: a pulse that never
            stops reads as still going, pulls the eye off the facts, and past 5s would need a pause
            control (WCAG 2.2.2).
          </li>
          <li>
            <span className="text-foreground">Shake means your input was refused.</span> Only a
            repeat refusal of a field or a refused code. Never a system failure: a shake reads as
            you did it wrong.
          </li>
          <li>
            <span className="text-foreground">States are still unless they change.</span> A badge
            or a line that was already true does not animate on arrival.
          </li>
          <li>
            <span className="text-foreground">Reduced motion shows the final state.</span> Every
            class is switched off under <code>prefers-reduced-motion</code>; rings disappear, ticks
            show complete, and timers still run.
          </li>
        </ul>
      </DocsSection>

      <DocsSection title="Values" description="Duration, start and curve of every motion the status components use.">
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-left text-sm">
            <thead className="bg-surface-sunken text-xs text-muted-foreground">
              <tr>
                <th className="px-4 py-2 font-medium">Class</th>
                <th className="px-4 py-2 font-medium">Duration</th>
                <th className="px-4 py-2 font-medium">Curve</th>
                <th className="px-4 py-2 font-medium">Used for</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {values.map(([name, duration, curve, used]) => (
                <tr key={name}>
                  <td className="px-4 py-2 font-mono text-xs text-foreground">{name}</td>
                  <td className="px-4 py-2 text-foreground">{duration}</td>
                  <td className="px-4 py-2 font-mono text-xs text-muted-foreground">{curve}</td>
                  <td className="px-4 py-2 text-muted-foreground">{used}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DocsSection>
    </div>
  );
}
