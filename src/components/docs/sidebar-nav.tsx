"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { docsNav, docsNavFolded, docsNavTags } from "@/lib/docs-nav";
import { cn } from "@/lib/utils";

export function DocsSidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-6 px-3 py-4" aria-label="Documentation">
      {docsNav.map((section) => (
        <div key={section.title} className="flex flex-col gap-1">
          <p className="px-2 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
            {section.title}
          </p>
          <ul className="flex flex-col gap-0.5">
            {section.items
              .filter((item) => !docsNavFolded[item.href])
              .map((item) => {
              const tag = docsNavTags[item.href];
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname === item.href ||
                    pathname.startsWith(`${item.href}/`);

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onNavigate}
                    className={cn(
                      "flex items-center justify-between gap-2 rounded-md px-2 py-1.5 text-sm transition-colors",
                      active
                        ? "bg-accent font-medium text-accent-foreground"
                        : "text-muted-foreground hover:bg-accent hover:text-foreground"
                    )}
                  >
                    {item.title}
                    {tag ? (
                      <Badge
                        variant={tag === "new" ? "info" : "outline"}
                        className="h-5 px-1.5 font-normal"
                      >
                        {tag === "new" ? "New" : "Updated"}
                      </Badge>
                    ) : null}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
