import type { TemplateMeta } from "@/lib/templates";
import DocumentCard from "./DocumentCard";

export default function DocumentList({ catalog }: { catalog: TemplateMeta[] }) {
  return (
    <section className="mx-auto max-w-5xl px-6 py-24">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand">
          Template library
        </p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight">
          Pick a template to get started
        </h1>
        <p className="mt-4 text-lg leading-8 text-foreground/70 text-pretty">
          Every template is a standard, attorney-drafted agreement from Common
          Paper, available under CC BY 4.0. Fill in your details and download a
          customized document in minutes.
        </p>
      </div>
      <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {catalog.map((template) => (
          <DocumentCard key={template.slug} template={template} />
        ))}
      </div>
    </section>
  );
}
