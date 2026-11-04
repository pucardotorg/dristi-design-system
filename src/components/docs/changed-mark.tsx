import { StarIcon } from "lucide-react";

import { cn } from "@/lib/utils";

/** Star beside anything that changed in the latest round (local preview only). */
export function ChangedStar({ className }: { className?: string }) {
  return (
    <StarIcon
      role="img"
      aria-label="Changed on Oct 30"
      className={cn(
        "inline size-3.5 shrink-0 fill-current align-[-2px] text-warning-ink",
        className
      )}
    >
      <title>Changed on Oct 30</title>
    </StarIcon>
  );
}

/** Plain list of what changed on a page, shown under its title. */
export function ChangesBox({ items }: { items: string[] }) {
  return (
    <aside className="rounded-lg border border-warning-muted bg-warning-muted px-4 py-3 text-sm leading-relaxed text-warning-muted-foreground">
      <p className="mb-1 flex items-center gap-1.5 font-medium">
        <ChangedStar />
        Changed on Oct 30
      </p>
      <ul className="list-disc space-y-1 pl-4 text-foreground">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <p className="mt-2 text-xs text-muted-foreground">
        Starred parts below are the ones that changed.
      </p>
    </aside>
  );
}
