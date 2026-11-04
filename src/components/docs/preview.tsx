import { ChangedStar } from "@/components/docs/changed-mark";
import { cn } from "@/lib/utils";

export function Preview({
  children,
  className,
  label = "Preview",
  changed,
}: {
  children: React.ReactNode;
  className?: string;
  label?: string;
  changed?: boolean;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <div className="border-b border-border px-4 py-2">
        <p className="flex items-center gap-1.5 text-xs font-medium tracking-wide text-muted-foreground uppercase">
          {label}
          {changed ? <ChangedStar /> : null}
        </p>
      </div>
      <div
        className={cn(
          "flex min-h-32 flex-wrap items-center justify-center gap-3 p-6",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
}

/** Full-bleed preview body — use for wide matrices that need horizontal scroll. */
export function PreviewStart({
  children,
  className,
  label,
}: {
  children: React.ReactNode;
  className?: string;
  label: string;
}) {
  return (
    <Preview
      label={label}
      className={cn(
        "items-stretch justify-start overflow-x-auto",
        className
      )}
    >
      {children}
    </Preview>
  );
}
