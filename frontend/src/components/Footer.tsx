export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-foreground/60 sm:flex-row">
        <p>© {new Date().getFullYear()} Prelegal.</p>
        <a href="mailto:hello@prelegal.com" className="hover:text-foreground">
          hello@prelegal.com
        </a>
      </div>
    </footer>
  );
}
