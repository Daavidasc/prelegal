export default function Hero() {
  return (
    <section id="top" className="mx-auto max-w-5xl px-6 pt-20 pb-24 sm:pt-28 sm:pb-32">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand">
          AI-assisted legal documents
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
          Legal agreements, drafted at the speed of your business.
        </h1>
        <p className="mt-6 text-lg leading-8 text-foreground/70 text-pretty">
          Prelegal pairs a curated library of attorney-drafted templates with AI to
          help you generate, customize, and understand legal documents in minutes,
          not days.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href="#contact"
            className="rounded-full bg-brand px-6 py-3 text-sm font-semibold text-brand-foreground transition-colors hover:bg-blue-700"
          >
            Get in touch
          </a>
          <a
            href="#about"
            className="rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-surface"
          >
            See how it works
          </a>
        </div>
      </div>
    </section>
  );
}
