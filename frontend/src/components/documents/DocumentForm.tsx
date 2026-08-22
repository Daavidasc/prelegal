"use client";

import { useState } from "react";
import { generateDocument, type PlaceholderField, type TemplateMeta } from "@/lib/templates";

function downloadMarkdown(filename: string, content: string) {
  const blob = new Blob([content], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}

export default function DocumentForm({
  meta,
  raw,
  fields,
}: {
  meta: TemplateMeta;
  raw: string;
  fields: PlaceholderField[];
}) {
  const [values, setValues] = useState<Record<string, string>>({});

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const generated = generateDocument(raw, values);
    const filename = `${meta.name.trim().replace(/\s+/g, "-")}.md`;
    downloadMarkdown(filename, generated);
  }

  return (
    <section className="mx-auto max-w-2xl px-6 py-24">
      <p className="text-sm font-semibold uppercase tracking-wide text-brand">
        {meta.name}
      </p>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight">
        Fill in your details
      </h1>
      <p className="mt-4 text-lg leading-8 text-foreground/70 text-pretty">
        {meta.description}
      </p>

      <form onSubmit={handleSubmit} className="mt-12 space-y-6">
        {fields.map((field) => (
          <div key={field.id}>
            <label
              htmlFor={field.id}
              className="block text-sm font-medium text-foreground"
            >
              {field.label}
            </label>
            <input
              id={field.id}
              type="text"
              placeholder={field.label}
              value={values[field.label] ?? ""}
              onChange={(event) =>
                setValues((prev) => ({ ...prev, [field.label]: event.target.value }))
              }
              className="mt-2 block w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-brand focus:outline-none"
            />
          </div>
        ))}

        <button
          type="submit"
          className="rounded-full bg-brand px-6 py-3 text-sm font-semibold text-brand-foreground transition-colors hover:bg-blue-700"
        >
          Download document
        </button>
      </form>
    </section>
  );
}
