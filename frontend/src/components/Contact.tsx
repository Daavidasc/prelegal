const CONTACT_EMAIL = "hello@prelegal.com";

export default function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-5xl px-6 py-24">
      <div className="rounded-2xl border border-border bg-surface px-8 py-14 text-center sm:px-16">
        <h2 className="text-3xl font-semibold tracking-tight">
          Let&apos;s talk about your legal documents
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg leading-8 text-foreground/70 text-pretty">
          Prelegal is in active development. Reach out to learn more or get early
          access.
        </p>
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="mt-8 inline-block rounded-full bg-brand px-6 py-3 text-sm font-semibold text-brand-foreground transition-colors hover:bg-blue-700"
        >
          {CONTACT_EMAIL}
        </a>
      </div>
    </section>
  );
}
