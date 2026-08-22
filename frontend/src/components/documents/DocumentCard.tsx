import Link from "next/link";
import type { TemplateMeta } from "@/lib/templates";

export default function DocumentCard({ template }: { template: TemplateMeta }) {
  return (
    <Link
      href={`/documents/${template.slug}`}
      className="block rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-brand"
    >
      <h3 className="text-base font-semibold">{template.name}</h3>
      <p className="mt-2 text-sm leading-6 text-foreground/70">
        {template.description}
      </p>
    </Link>
  );
}
