// Mirrors the repo-root `templates/` + `catalog.json` (canonical source, shared
// with any future non-frontend consumer) into `src/data/` so the Next.js app
// only ever reads from paths relative to its own `process.cwd()`. Runs
// automatically before `dev`/`build` via the `predev`/`prebuild` npm scripts.
import { mkdirSync, readdirSync, copyFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const frontendDir = dirname(dirname(fileURLToPath(import.meta.url)));
const repoRoot = dirname(frontendDir);

const srcTemplatesDir = join(repoRoot, "templates");
const srcCatalogFile = join(repoRoot, "catalog.json");

const destDataDir = join(frontendDir, "src", "data");
const destTemplatesDir = join(destDataDir, "templates");

mkdirSync(destTemplatesDir, { recursive: true });

copyFileSync(srcCatalogFile, join(destDataDir, "catalog.json"));

for (const entry of readdirSync(srcTemplatesDir)) {
  if (!entry.endsWith(".md")) continue;
  copyFileSync(join(srcTemplatesDir, entry), join(destTemplatesDir, entry));
}

console.log("Synced templates/ and catalog.json into frontend/src/data/");
