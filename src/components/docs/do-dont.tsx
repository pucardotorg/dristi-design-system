import { ChangedStar } from "@/components/docs/changed-mark";
import { cn } from "@/lib/utils";

export function DoDont({
  do: doItems,
  dont: dontItems,
  className,
  changed = [],
}: {
  do: string[];
  dont: string[];
  className?: string;
  /** Items to star as changed. */
  changed?: string[];
}) {
  return (
    <div className={cn("grid gap-4 md:grid-cols-2", className)}>
      <div className="rounded-xl border border-success-muted bg-success-muted p-4 text-success-muted-foreground">
        <p className="mb-3 text-sm font-semibold">Do</p>
        <ul className="flex flex-col gap-2 text-sm text-foreground">
          {doItems.map((item) => (
            <li key={item} className="leading-relaxed">
              {changed.includes(item) ? <ChangedStar className="mr-1.5" /> : null}
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-xl border border-destructive-muted bg-destructive-muted p-4 text-destructive-muted-foreground">
        <p className="mb-3 text-sm font-semibold">Don&apos;t</p>
        <ul className="flex flex-col gap-2 text-sm text-foreground">
          {dontItems.map((item) => (
            <li key={item} className="leading-relaxed">
              {changed.includes(item) ? <ChangedStar className="mr-1.5" /> : null}
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
