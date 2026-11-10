"use client"

/*
 * LanguageSwitch (promoted from Dristi's top bar `LanguageToggle`, components/shell/
 * top-bar.tsx on main, 2026-11-10; second-language menu by the lead designer,
 * 2026-10-08). English and one second language, side by side in the bar, one tap
 * apart: the switch the usability tests settled on. The chevron beside it picks which
 * language is the second one (Hindi, Gujarati, Punjabi…); the switch then shows that.
 */

import * as React from "react"
import { ChevronDownIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SegmentedControl,
  SegmentedControlItem,
} from "@/components/ui/segmented-control"

export type Language = {
  /** A BCP 47 code, used as the value and as each label's `lang`. */
  code: string
  /** The language's own name, in its own script: "हिन्दी", "ગુજરાતી". */
  name: string
}

function LanguageSwitch({
  value,
  onValueChange,
  primary = { code: "en", name: "English" },
  second,
  seconds,
  onSecondChange,
  label = "Language",
  menuLabel = "Second language",
  className,
}: {
  /** The language in use (a `code`). */
  value: string
  onValueChange: (code: string) => void
  primary?: Language
  /** The language shown beside the primary one. */
  second: Language
  /** Every language that can be the second one. Without it (or with one) no chevron. */
  seconds?: Language[]
  onSecondChange?: (language: Language) => void
  /** The switch's accessible name. */
  label?: string
  /** The menu's heading and the chevron's name. */
  menuLabel?: string
  className?: string
}) {
  const choosable = seconds && seconds.length > 1 && onSecondChange
  return (
    <div
      data-slot="language-switch"
      className={cn("flex shrink-0 items-center gap-0.5", className)}
    >
      <SegmentedControl
        size="compact"
        type="single"
        value={value}
        onValueChange={(next) => next && onValueChange(next)}
        aria-label={label}
      >
        {[primary, second].map((l) => (
          <SegmentedControlItem key={l.code} value={l.code} lang={l.code}>
            {l.name}
          </SegmentedControlItem>
        ))}
      </SegmentedControl>
      {choosable ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon-xs"
              aria-label={`Choose the ${menuLabel.toLowerCase()}`}
              /* 32px drawn, 40px to the finger. */
              className="relative after:absolute after:-inset-1"
            >
              <ChevronDownIcon className="size-4" aria-hidden />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-auto min-w-40">
            <DropdownMenuLabel>{menuLabel}</DropdownMenuLabel>
            <DropdownMenuRadioGroup
              value={second.code}
              onValueChange={(code) => {
                const next = seconds.find((l) => l.code === code)
                if (next) onSecondChange(next)
              }}
            >
              {seconds.map((l) => (
                <DropdownMenuRadioItem key={l.code} value={l.code} lang={l.code}>
                  {l.name}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : null}
    </div>
  )
}

export { LanguageSwitch }
