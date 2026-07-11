import { demos } from '../lib/demos';

export default function GalleryPage() {
  return (
    <div className="min-h-screen px-6 py-12 md:px-12 md:py-20">
      <header className="max-w-6xl mx-auto mb-12 md:mb-16">
        <p className="text-sm font-semibold uppercase tracking-wider text-[var(--color-primary)] mb-3">
          mayanhvietnam.com
        </p>
        <h1 className="text-4xl md:text-5xl font-bold mb-3">
          Demo Gallery
        </h1>
        <p className="text-[var(--color-text-secondary)] text-lg">
          {demos.length} FE projects tách bạch — chạy độc lập, share design tokens.
        </p>
      </header>

      <main className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {demos.map((demo) => (
            <a
              key={demo.id}
              href={demo.url ?? '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="group block rounded-xl border border-[var(--color-border)] bg-[var(--color-muted)] p-6 transition-all hover:border-[var(--color-primary)] hover:bg-[var(--color-elevated)] hover:shadow-[0_0_24px_rgba(0,212,170,0.15)]"
            >
              <div className="flex items-start justify-between mb-4">
                <span className="text-xs font-mono text-[var(--color-text-secondary)]">
                  {demo.id}
                </span>
                <span className="text-xs px-2 py-1 rounded-full bg-[var(--color-elevated)] text-[var(--color-text-secondary)]">
                  :{demo.port}
                </span>
              </div>

              <h2 className="text-xl font-semibold mb-2 group-hover:text-[var(--color-primary)] transition-colors">
                {demo.name}
              </h2>
              <p className="text-sm text-[var(--color-text-secondary)] mb-4">
                {demo.description}
              </p>

              <div className="flex items-center gap-2 text-xs text-[var(--color-primary)] font-medium">
                <span>Mở demo</span>
                <svg
                  className="w-3 h-3 transition-transform group-hover:translate-x-0.5"
                  viewBox="0 0 12 12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M3 6h6M6 3l3 3-3 3" />
                </svg>
              </div>
            </a>
          ))}
        </div>
      </main>

      <footer className="max-w-6xl mx-auto mt-16 pt-8 border-t border-[var(--color-border)]">
        <p className="text-sm text-[var(--color-text-secondary)]">
          Mỗi demo chạy trên port riêng. Chạy <code className="px-1.5 py-0.5 rounded bg-[var(--color-elevated)] text-[var(--color-primary)] font-mono">pnpm --filter demo-{`{NN}`} dev</code> để start individual demo.
        </p>
      </footer>
    </div>
  );
}
