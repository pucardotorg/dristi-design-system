"use client";

import Link from "next/link";

import { PageHeader } from "@/components/docs/page-header";
import { Preview } from "@/components/docs/preview";
import { DocsSection } from "@/components/docs/section";
import { DoDont } from "@/components/docs/do-dont";
import { getComponentDoc } from "@/components/docs/component-registry";
import { ChangedStar, ChangesBox } from "@/components/docs/changed-mark";
import { docsChanges } from "@/lib/docs-changes";
import { Callout } from "@/components/docs/callout";
import { ToastDocPage } from "@/components/docs/toast-docs";

export function ComponentDocPage({ slug }: { slug: string }) {
  /* Notify and Feedback toaster are one toast: shown together on the Toast page. */
  if (slug === "notify") return <ToastDocPage />;
  return <RegistryDocPage slug={slug} />;
}

function RegistryDocPage({ slug }: { slug: string }) {
  const doc = getComponentDoc(slug);

  if (!doc) {
    return (
      <div className="flex flex-col gap-4">
        <PageHeader
          title="Component not found"
          description="This component is not in the documentation registry yet."
        />
      </div>
    );
  }

  const changes = docsChanges[slug];
  const changedItems = changes?.items ?? [];
  const star = (item: string) =>
    changedItems.includes(item) ? <ChangedStar className="mr-1.5" /> : null;

  return (
    <div className="flex flex-col gap-12">
      <PageHeader title={doc.title} description={doc.description} />

      {changes ? <ChangesBox items={changes.summary} /> : null}

      {slug === "sonner" ? (
        <Callout title="Not for product screens">
          This is the library underneath the toast, kept here so it can be upgraded. Screens
          raise toasts with Notify. See <Link href="/components/notify" className="underline">Toast</Link>.
        </Callout>
      ) : null}

      <code className="w-fit rounded-md bg-muted px-2 py-1 font-mono text-xs text-foreground">
        {doc.importPath}
      </code>

      <DocsSection
        title="When to use"
        changed={doc.whenToUse.some((item) => changedItems.includes(item))}
      >
        <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">
          {doc.whenToUse.map((item) => (
            <li key={item}>
              {star(item)}
              {item}
            </li>
          ))}
        </ul>
      </DocsSection>

      <DocsSection
        title={doc.previewLabel ?? "Preview"}
        changed={changes?.preview}
      >
        <Preview
          label={doc.previewLabel ?? "Preview"}
          className={
            doc.previewLabel === "Examples"
              ? "items-stretch justify-start"
              : undefined
          }
        >
          {doc.preview}
        </Preview>
      </DocsSection>

      {doc.variantSections?.length || doc.variants ? (
        <DocsSection title={doc.variantsLabel ?? "Variants & sizes"}>
          <div className="flex flex-col gap-4">
            {doc.variantSections?.map((section) => (
              <Preview
                key={section.label}
                label={section.label}
                className={section.className}
                changed={changes?.sections.includes(section.label)}
              >
                {section.content}
              </Preview>
            ))}
            {doc.variants ? (
              <Preview label="Variants">{doc.variants}</Preview>
            ) : null}
          </div>
        </DocsSection>
      ) : null}

      {doc.doItems && doc.dontItems ? (
        <DocsSection
          title="Do and don’t"
          changed={[...doc.doItems, ...doc.dontItems].some((item) =>
            changedItems.includes(item)
          )}
        >
          <DoDont
            do={doc.doItems}
            dont={doc.dontItems}
            changed={changedItems}
          />
        </DocsSection>
      ) : null}

      <DocsSection
        title="Token coupling"
        changed={doc.tokens.some((token) => changedItems.includes(token))}
      >
        <div className="flex flex-wrap gap-2">
          {doc.tokens.map((token) => (
            <code
              key={token}
              className="inline-flex items-center gap-1 rounded-md border border-border bg-card px-2 py-1 font-mono text-xs text-foreground"
            >
              {star(token)}
              {token}
            </code>
          ))}
        </div>
      </DocsSection>

      <DocsSection
        title="Usage notes"
        changed={doc.usageNotes.some((item) => changedItems.includes(item))}
      >
        <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">
          {doc.usageNotes.map((item) => (
            <li key={item}>
              {star(item)}
              {item}
            </li>
          ))}
        </ul>
      </DocsSection>
    </div>
  );
}
