/**
 * Copy the pdf.js worker into `public/vendor/pdf.worker.min.mjs`, where DocumentViewer
 * loads it. The same path the app uses (its scripts/copy-runtime-assets.mjs), so the
 * component works unchanged there. Runs before `dev` and `build`; `public/vendor/` is
 * generated and git-ignored.
 */
import { copyFileSync, mkdirSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const from = require.resolve("pdfjs-dist/build/pdf.worker.min.mjs");
const to = resolve(root, "public/vendor/pdf.worker.min.mjs");

mkdirSync(dirname(to), { recursive: true });
copyFileSync(from, to);
console.log("Copied the pdf.js worker to public/vendor/.");
