import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DocumentForm from "@/components/documents/DocumentForm";
import { getCatalog, getTemplateRaw } from "@/lib/catalog";
import { extractPlaceholders } from "@/lib/templates";

export const dynamicParams = false;

export function generateStaticParams() {
  return getCatalog().map((template) => ({ slug: template.slug }));
}

export async function generateMetadata({ params }: PageProps<"/documents/[slug]">) {
  const { slug } = await params;
  const meta = getCatalog().find((template) => template.slug === slug);
  return { title: meta ? `${meta.name} — Prelegal` : "Template — Prelegal" };
}

export default async function DocumentPage({ params }: PageProps<"/documents/[slug]">) {
  const { slug } = await params;
  const meta = getCatalog().find((template) => template.slug === slug);
  if (!meta) notFound();

  const raw = getTemplateRaw(meta.filename);
  const fields = extractPlaceholders(raw);

  return (
    <>
      <Header />
      <main className="flex-1">
        <DocumentForm meta={meta} raw={raw} fields={fields} />
      </main>
      <Footer />
    </>
  );
}
