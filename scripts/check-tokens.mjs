#!/usr/bin/env node
/**
 * Enforces the token rules in AGENTS.md that would otherwise decay into prose.
 *
 *   1. No literal colour inside an arbitrary Tailwind value (`bg-[#007e7e]`).
 *      Arbitrary values that reference a token (`shadow-[…var(--border)]`) are fine.
 *   2. No raw grey ladder utilities (`bg-neutral-3`) — go through a semantic token.
 *   3. No default palette colours (`bg-white`, `text-black`) — use a token.
 *   4. No raw-unit arbitrary spacing or radius (`rounded-[7px]`, `p-[13px]`).
 *      Values that contain `var(` are allowed.
 *   5. Every `--color-*` token resolves in both `:root` and `.dark`.
 *   6. The generated token block in AGENTS.md is in sync with globals.css.
 *   7. Spacing stays on the ladder (AGENTS 7a): no `p-5`, `gap-10`. Existing upstream
 *      primitives and docs chrome that predate this check are listed in SPACING_BACKLOG.
 *   8. No translucent status fill (`bg-destructive/10`): use the opaque `-muted` token
 *      (AGENTS 6). Focus rings and borders on invalid controls stay translucent on purpose.
 *   9. No raw-pixel control height (`h-[42px]`): use the 32/36/40/44 steps (Laws).
 *
 * Escape hatch: put `ds-tokens-ignore` in a comment on the offending line or the
 * line above it — used for documentation that deliberately shows an anti-example.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

import {
  currentDoc,
  findModeGaps,
  readTokens,
  renderBlock,
  withBlock,
} from "./sync-tokens.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SRC = join(ROOT, "src");
const TOKEN_SOURCE = join(ROOT, "src/app/globals.css");
const IGNORE = "ds-tokens-ignore";

const COLOR_UTILITIES =
  "bg|text|border|ring|outline|fill|stroke|shadow|from|via|to|decoration|accent|caret|divide|placeholder";
const LITERAL_COLOR = new RegExp(
  `\\b(?:${COLOR_UTILITIES})-\\[[^\\]]*(?:#[0-9a-fA-F]{3,8}|oklch\\(|rgba?\\(|hsla?\\()`,
  "g"
);
const RAW_GREY = /\b(?:bg|text|border|ring|fill|stroke|from|via|to|divide|outline)-neutral-\d/g;
const NAMED_PALETTE =
  /\b(?:bg|text|border|ring|fill|stroke|from|via|to|divide|outline)-(?:white|black)(?:\/[\d.]+)?\b/g;
/** Spacing + radius with a raw length unit and no var() inside the brackets. */
const ARBITRARY_METRIC =
  /\b(?:rounded(?:-[trblxyse]{1,2})?|p|px|py|pt|pb|pl|pr|ps|pe|m|mx|my|mt|mb|ml|mr|ms|me|gap|space-[xy])-\[(?![^\]]*var\()([0-9]+\.?[0-9]*(?:px|rem|em))\]/g;

/** Spacing utilities with a numeric step off the ladder. */
const LADDER = new Set(["0", "0.5", "1", "1.5", "2", "2.5", "3", "4", "6", "8", "12", "16"]);
const SPACING_STEP =
  /(?<![\w-])-?(?:p|px|py|pt|pb|pl|pr|ps|pe|m|mx|my|mt|mb|ml|mr|ms|me|gap|gap-x|gap-y|space-x|space-y)-(\d+(?:\.\d+)?)(?![\w.[/])/g;
/** Off-ladder steps that predate the check: upstream primitives (left as installed,
    AGENTS rule 2) and docs-site chrome. New code may not add to this list. */
const SPACING_BACKLOG = new Set([
  "src/components/ui/alert.tsx|pr-18",
  "src/components/ui/button.tsx|px-5",
  "src/components/ui/context-menu.tsx|pl-7",
  "src/components/ui/drawer.tsx|mt-24",
  "src/components/ui/drawer.tsx|mb-24",
  "src/components/ui/dropdown-menu.tsx|pl-7",
  "src/components/ui/field.tsx|gap-5",
  "src/components/ui/menubar.tsx|pl-7",
  "src/components/ui/sidebar.tsx|mx-3.5",
  "src/components/docs/component-doc-page.tsx|pl-5",
  "src/components/docs/docs-shell.tsx|px-10",
  "src/components/docs/docs-shell.tsx|py-10",
  "src/components/docs/page-header.tsx|mb-10",
  "src/app/(docs)/page.tsx|pl-5",
  "src/app/(docs)/getting-started/page.tsx|pl-5",
  "src/app/(docs)/foundations/accessibility/page.tsx|pl-5",
  "src/app/(docs)/foundations/colors/page.tsx|gap-5",
  "src/app/(docs)/foundations/elevation/page.tsx|pl-5",
  "src/app/(docs)/foundations/typography/page.tsx|pl-5",
]);
/** A status fill made translucent instead of using its opaque -muted token. */
const STATUS_ALPHA_FILL = /(?<![\w-])bg-(?:success|destructive|warning|info)(?:-muted)?\/[\d.]+/g;
/** A height in raw pixels. */
const RAW_HEIGHT = /(?<![\w-])(?:h|min-h|max-h)-\[(?![^\]]*var\()[0-9]+\.?[0-9]*px\]/g;

function sourceFiles(dir) {
  return readdirSync(dir).flatMap((entry) => {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) return sourceFiles(full);
    return /\.(tsx?|css)$/.test(entry) && full !== TOKEN_SOURCE ? [full] : [];
  });
}

function scan(file, findings) {
  const lines = readFileSync(file, "utf8").split("\n");
  lines.forEach((line, index) => {
    if (line.includes(IGNORE) || lines[index - 1]?.includes(IGNORE)) return;
    for (const [rule, pattern] of [
      ["literal colour in an arbitrary value", LITERAL_COLOR],
      ["raw grey ladder utility", RAW_GREY],
      ["default palette colour (use a token)", NAMED_PALETTE],
      ["raw-unit arbitrary spacing or radius", ARBITRARY_METRIC],
      ["translucent status fill (use the -muted token)", STATUS_ALPHA_FILL],
      ["raw-pixel height (use 32/36/40/44)", RAW_HEIGHT],
    ]) {
      for (const match of line.matchAll(pattern)) {
        findings.push({
          file: relative(ROOT, file),
          line: index + 1,
          rule,
          match: match[0],
        });
      }
    }
    const rel = relative(ROOT, file);
    for (const match of line.matchAll(SPACING_STEP)) {
      const utility = match[0].replace(/^-/, "");
      if (LADDER.has(match[1]) || SPACING_BACKLOG.has(`${rel}|${utility}`)) continue;
      findings.push({ file: rel, line: index + 1, rule: "spacing off the ladder", match: match[0] });
    }
  });
}

const findings = [];
for (const file of sourceFiles(SRC)) scan(file, findings);

for (const { file, line, rule, match } of findings) {
  console.error(`${file}:${line}  ${rule} — ${match}`);
}

const tokens = readTokens();
let failed = findings.length > 0;

for (const { token, alias, missing } of findModeGaps(tokens)) {
  console.error(
    `src/app/globals.css  ${token} → ${alias} is missing from ${missing.join(" and ")}`
  );
  failed = true;
}

const doc = currentDoc();
if (withBlock(doc, renderBlock(tokens)) !== doc) {
  console.error("AGENTS.md  token block is stale — run `npm run sync:tokens`");
  failed = true;
}

if (failed) {
  console.error("\nToken check failed. See AGENTS.md for the rules.");
  process.exit(1);
}
console.log("Token check passed.");
