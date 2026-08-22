import fs from "node:fs";
import path from "node:path";
import catalogJson from "@/data/catalog.json";
import { filenameToSlug, type TemplateMeta } from "@/lib/templates";

const TEMPLATES_DIR = path.join(process.cwd(), "src/data/templates");

type CatalogEntry = { name: string; description: string; filename: string };

export function getCatalog(): TemplateMeta[] {
  return (catalogJson as CatalogEntry[]).map((entry) => ({
    ...entry,
    slug: filenameToSlug(entry.filename),
  }));
}

export function getTemplateRaw(filename: string): string {
  return fs.readFileSync(path.join(TEMPLATES_DIR, filename), "utf-8");
}
