"use client";

import * as React from "react";
import { BellIcon, PanelLeftIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  BreadcrumbTrail,
  BreadcrumbTrailRow,
  type BreadcrumbTrailItem,
} from "@/components/ui/breadcrumb-trail";
import { LanguageSwitch, type Language } from "@/components/ui/language-switch";
import { Separator } from "@/components/ui/separator";

export const SAMPLE_TRAILS: { label: string; items: BreadcrumbTrailItem[] }[] = [
  { label: "A list page", items: [{ label: "Cases" }] },
  {
    label: "A case",
    items: [{ label: "Cases", href: "#" }, { label: "ST 412/2025", mono: true }],
  },
  {
    label: "Court staff, a record",
    items: [
      { label: "Court home", href: "#" },
      { label: "Actions", href: "#" },
      { label: "Register cases", href: "#" },
      { label: "CMP/1840/2025", mono: true },
    ],
  },
  {
    label: "Raise application",
    items: [
      { label: "Cases", href: "#" },
      { label: "CC 847/2026", href: "#", mono: true },
      { label: "Raise application" },
    ],
  },
];

export const SECOND_LANGUAGES: Language[] = [
  { code: "hi", name: "हिन्दी" },
  { code: "gu", name: "ગુજરાતી" },
  { code: "pa", name: "ਪੰਜਾਬੀ" },
  { code: "ml", name: "മലയാളം" },
];

/** The product's top bar as the two components compose it: the nav button, the trail,
    the language switch, the bell, and the trail's row under it. */
export function TopBarDemo({ trail = 2, framed = true }: { trail?: number; framed?: boolean }) {
  const items = SAMPLE_TRAILS[trail].items;
  const [open, setOpen] = React.useState(false);
  const [fits, setFits] = React.useState(true);
  const [lang, setLang] = React.useState("en");
  const [second, setSecond] = React.useState<Language>(SECOND_LANGUAGES[0]);
  const shown = open && !fits;

  return (
    <header
      className={
        framed
          ? "w-full overflow-hidden rounded-xl border border-hairline bg-card"
          : "sticky top-0 z-30 w-full border-b border-hairline bg-card"
      }
    >
      <div className="flex h-14 items-center gap-3 px-4 sm:px-6">
        <Button size="icon" variant="ghost" aria-label="Expand main navigation" className="shrink-0 text-muted-foreground [&_svg]:size-5">
          <PanelLeftIcon aria-hidden />
        </Button>
        <Separator orientation="vertical" className="h-5! shrink-0 self-center! bg-hairline" />
        <BreadcrumbTrail
          key={trail}
          items={items}
          open={shown}
          onOpenChange={setOpen}
          onFitsChange={setFits}
        />
        <LanguageSwitch
          value={lang}
          onValueChange={setLang}
          second={second}
          seconds={SECOND_LANGUAGES}
          onSecondChange={(l) => {
            if (lang === second.code) setLang(l.code);
            setSecond(l);
          }}
        />
        <Button size="icon" variant="ghost" aria-label="Notifications" className="shrink-0 text-muted-foreground">
          <BellIcon aria-hidden />
        </Button>
      </div>
      <BreadcrumbTrailRow items={items} open={shown} />
    </header>
  );
}

/** Breadcrumb trail docs: the trail alone, in a box you can drag narrower (bottom-right
    corner) to watch it fold, with its row under it. */
export function BreadcrumbTrailDocsDemo() {
  const [trail, setTrail] = React.useState(2);
  const [open, setOpen] = React.useState(false);
  const [fits, setFits] = React.useState(true);
  const items = SAMPLE_TRAILS[trail].items;
  const shown = open && !fits;
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        {SAMPLE_TRAILS.map((t, i) => (
          <Button
            key={t.label}
            size="sm"
            variant={trail === i ? "default" : "outline"}
            onClick={() => {
              setTrail(i);
              setOpen(false);
            }}
          >
            {t.label}
          </Button>
        ))}
      </div>
      <div className="w-full max-w-full min-w-48 resize-x overflow-hidden rounded-xl border border-hairline bg-card" style={{ width: 640 }}>
        <div className="flex h-14 items-center px-4">
          <BreadcrumbTrail
            key={trail}
            items={items}
            open={shown}
            onOpenChange={setOpen}
            onFitsChange={setFits}
          />
        </div>
        <BreadcrumbTrailRow items={items} open={shown} />
      </div>
      <p className="text-caption text-muted-foreground">
        Drag the box&apos;s bottom-right corner to narrow it: entries fold from the start into the grey disc; tap it
        for the whole trail.
      </p>
    </div>
  );
}

/** Language switch docs: the switch alone, its menu working. */
export function LanguageSwitchDocsDemo() {
  const [lang, setLang] = React.useState("en");
  const [second, setSecond] = React.useState<Language>(SECOND_LANGUAGES[0]);
  return (
    <div className="flex flex-col items-start gap-3">
      <LanguageSwitch
        value={lang}
        onValueChange={setLang}
        second={second}
        seconds={SECOND_LANGUAGES}
        onSecondChange={(l) => {
          if (lang === second.code) setLang(l.code);
          setSecond(l);
        }}
      />
      <p className="text-caption text-muted-foreground">
        In use: {lang === "en" ? "English" : second.name}. The chevron picks the second language.
      </p>
    </div>
  );
}
