import type { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumb?: { label: string; href?: string }[];
  children?: ReactNode;
}

/** Tiêu đề trang chuẩn cho mọi page (category, policy, contact...) */
export default function PageHeader({ title, subtitle, breadcrumb, children }: PageHeaderProps) {
  return (
    <section className="bg-zinc-950 py-10 px-6 border-b border-zinc-800">
      <div className="max-w-[1440px] mx-auto">
        {breadcrumb && breadcrumb.length > 0 && (
          <nav className="flex items-center gap-2 text-xs text-zinc-500 mb-4">
            {breadcrumb.map((b, i) => (
              <span key={i} className="flex items-center gap-2">
                {i > 0 && <span className="text-zinc-700">/</span>}
                {b.href ? (
                  <a href={b.href} className="hover:text-orange-400 transition-colors">
                    {b.label}
                  </a>
                ) : (
                  <span className="text-zinc-300">{b.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{title}</h1>
        {subtitle && <p className="text-base text-zinc-400 max-w-3xl">{subtitle}</p>}
        {children}
      </div>
    </section>
  );
}
