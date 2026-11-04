import type { MetadataRoute } from "next";

import { docsNav, docsNavFolded } from "@/lib/docs-nav";

const SITE = "https://pucar-design-system-five.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = docsNav.flatMap((section) =>
    section.items.map((item) => item.href)
  ).filter((path) => !docsNavFolded[path]);

  return paths.map((path) => ({
    url: `${SITE}${path === "/" ? "" : path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "/" ? 1 : 0.7,
  }));
}
