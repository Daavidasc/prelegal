export type TemplateMeta = {
  name: string;
  description: string;
  filename: string;
  slug: string;
};

export type PlaceholderField = {
  label: string;
  id: string;
};

const PLACEHOLDER_CLASSES =
  "coverpage_link|orderform_link|keyterms_link|businessterms_link|sow_link";

// e.g. <span class="coverpage_link">Governing Law</span> or
// <span class="coverpage_link" id="7.1">Provider</span>
const PLACEHOLDER_SPAN_RE = new RegExp(
  `<span class="(?:${PLACEHOLDER_CLASSES})"(?:\\s+id="[^"]*")?\\s*>([^<]*)</span>`,
  "g",
);

// Structural section headers, e.g. <span class="header_2" id="1">Uptime</span>
const HEADER_SPAN_RE = /<span class="header_[23]"(?:\s+id="[^"]*")?\s*>([^<]*)<\/span>/g;

// Structural anchor-only spans with no class, e.g. <span id="4.1">**"Term"**</span>
const BARE_ID_SPAN_RE = /<span id="[^"]*">([^<]*)<\/span>/g;

// Safety net for any span left over, including malformed/orphan tags found in
// the source data (e.g. an unmatched trailing </span>).
const ANY_REMAINING_SPAN_TAG_RE = /<\/?span[^>]*>/g;

export function slugify(label: string): string {
  return label
    .normalize("NFKD")
    .replace(/[’']/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function filenameToSlug(filename: string): string {
  return filename.replace(/\.md$/i, "");
}

export function slugToFilename(slug: string): string {
  return `${slug}.md`;
}

/**
 * Ordered, de-duplicated list of fill-in-the-blank fields in a template.
 * Dedup key is the exact trimmed span text, in first-appearance order.
 */
export function extractPlaceholders(raw: string): PlaceholderField[] {
  const seen = new Map<string, PlaceholderField>();
  PLACEHOLDER_SPAN_RE.lastIndex = 0;
  let match: RegExpExecArray | null;
  while ((match = PLACEHOLDER_SPAN_RE.exec(raw)) !== null) {
    const label = match[1].trim();
    if (!label || seen.has(label)) continue;
    seen.set(label, { label, id: slugify(label) });
  }
  return Array.from(seen.values());
}

/**
 * Substitutes user-entered values into the raw template and unwraps all
 * structural spans, returning clean Markdown with no leftover HTML. A blank
 * or missing value falls back to the original placeholder label text.
 */
export function generateDocument(
  raw: string,
  values: Record<string, string>,
): string {
  let out = raw.replace(PLACEHOLDER_SPAN_RE, (_full, inner: string) => {
    const label = inner.trim();
    const replacement = values[label]?.trim();
    return replacement ? replacement : label;
  });

  out = out.replace(HEADER_SPAN_RE, (_full, inner: string) => inner);
  out = out.replace(BARE_ID_SPAN_RE, (_full, inner: string) => inner);
  out = out.replace(ANY_REMAINING_SPAN_TAG_RE, "");

  return out;
}
