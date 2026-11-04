import { ChangedStar } from "@/components/docs/changed-mark";
import { cn } from "@/lib/utils";

export function DocsSection({
  title,
  description,
  children,
  className,
  changed,
}: {
  title: string;
  changed?: boolean;
  description?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("flex flex-col gap-4", className)}>
      <div className="flex flex-col gap-1.5">
        <h2 className="flex items-center gap-2 text-title-s font-semibold tracking-tight text-foreground">
          {title}
          {changed ? <ChangedStar className="size-4" /> : null}
        </h2>
        {description ? (
          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>
        ) : null}
      </div>
      {children}
    </section>
  );
}
