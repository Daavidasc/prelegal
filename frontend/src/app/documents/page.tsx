import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DocumentList from "@/components/documents/DocumentList";
import { getCatalog } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Templates — Prelegal",
  description:
    "Browse Prelegal's library of attorney-drafted legal document templates and generate a customized copy.",
};

export default function DocumentsPage() {
  const catalog = getCatalog();

  return (
    <>
      <Header />
      <main className="flex-1">
        <DocumentList catalog={catalog} />
      </main>
      <Footer />
    </>
  );
}
