import Link from "next/link";

const FEATURES = [
  {
    title: "Curated template library",
    description:
      "Start from a library of standard, attorney-quality templates covering NDAs, service agreements, DPAs, and more — not a blank page.",
    href: "/documents",
    linkLabel: "Browse the library",
  },
  {
    title: "AI-assisted customization",
    description:
      "Describe your deal in plain language and let Prelegal adapt the right template to your specific terms and parties.",
  },
  {
    title: "Plain-English guidance",
    description:
      "Understand every clause with contextual explanations, so you're never signing something you don't understand.",
  },
];

export default function About() {
  return (
    <section id="about" className="border-t border-border bg-surface">
      <div className="mx-auto max-w-5xl px-6 py-24">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight">
            What Prelegal does
          </h2>
          <p className="mt-4 text-lg leading-8 text-foreground/70 text-pretty">
            Prelegal is building an AI-assisted legal document assistant that helps
            teams draft and understand the agreements their business runs on,
            without waiting on outside counsel for every routine document.
          </p>
        </div>
        <div className="mt-16 grid gap-10 sm:grid-cols-3">
          {FEATURES.map((feature) => (
            <div key={feature.title}>
              <h3 className="text-base font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm leading-6 text-foreground/70">
                {feature.description}
              </p>
              {feature.href && (
                <Link
                  href={feature.href}
                  className="mt-2 inline-block text-sm font-medium text-brand hover:underline"
                >
                  {feature.linkLabel} →
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
