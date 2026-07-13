"use client";
import { useState, useEffect } from "react";

interface ArticleSection {
  heading?: string;
  content: string;
  images?: string[];
}

interface ProductArticleProps {
  product: { name: string; thumbnail: string };
  article: {
    title: string;
    author?: string;
    publishDate?: string;
    readTime?: number;
    coverImage?: string;
    toc?: { id: string; label: string }[];
    sections: ArticleSection[];
  };
}

const VND_DATE_FMT = new Intl.DateTimeFormat("vi-VN", {
  day: "2-digit",
  month: "long",
  year: "numeric",
});

/** Slug cho heading (dùng cho anchor cũng như id sinh ra từ section) */
function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

/** Render markdown-ish sang HTML cho nội dung bài viết */
function renderArticleBody(content: string): string {
  const lines = content.split("\n");
  let html = "";
  let inList = false;
  const bold = (s: string) =>
    s.replace(/\*\*(.+?)\*\*/g, "<strong class='text-white font-semibold'>$1</strong>");

  for (const raw of lines) {
    const line = raw;
    const trimmed = line.trim();

    if (trimmed === "") {
      if (inList) {
        html += "</ul>";
        inList = false;
      }
      continue;
    }

    if (trimmed.startsWith("- ")) {
      if (!inList) {
        html += "<ul class='space-y-2 my-4 list-none'>";
        inList = true;
      }
      html += `<li class="flex items-start gap-2 text-zinc-300 leading-relaxed"><span class="text-orange-500 mt-1.5 flex-shrink-0">▸</span><span>${bold(trimmed.slice(2))}</span></li>`;
      continue;
    }

    if (inList) {
      html += "</ul>";
      inList = false;
    }
    html += `<p class="text-zinc-300 leading-relaxed mb-4">${bold(trimmed)}</p>`;
  }
  if (inList) html += "</ul>";
  return html;
}

/** Format ngày ISO → tiếng Việt */
function fmtDate(iso?: string) {
  if (!iso) return null;
  try {
    return VND_DATE_FMT.format(new Date(iso));
  } catch {
    return iso;
  }
}

export default function ProductArticle({ product, article }: ProductArticleProps) {
  const [activeHeading, setActiveHeading] = useState<string | null>(null);

  const sectionsToRender = article.sections.filter((s) => s.heading || s.content);
  const cover = article.coverImage ?? product.thumbnail;

  // Lấy danh sách id của các heading có mặt
  const headingIds = sectionsToRender
    .map((s) => (s.heading ? slugify(s.heading) : null))
    .filter((x): x is string => !!x);

  // Quan sát heading nào đang hiển thị để highlight TOC
  useEffect(() => {
    if (headingIds.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveHeading(visible[0].target.id);
      },
      { rootMargin: "-100px 0px -60% 0px", threshold: [0, 1] }
    );
    headingIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [headingIds.join("|")]);

  return (
    <article className="bg-zinc-950 text-zinc-300">
      {/* ─── Article Header (cover + title) ─── */}
      <div className="relative">
        {cover && (
          <div className="aspect-[21/9] max-h-[420px] w-full overflow-hidden bg-zinc-900">
            <img
              src={cover}
              alt={article.title}
              className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent" />
          </div>
        )}
        <header className={`${cover ? "absolute bottom-0 left-0 right-0" : ""} px-6 pb-6 pt-4 max-w-3xl mx-auto`}>
          <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-orange-400 mb-3">
            <span className="px-2.5 py-1 bg-orange-500/15 border border-orange-500/30 rounded">
              Bài viết
            </span>
            {article.readTime && (
              <span className="px-2.5 py-1 bg-white/5 border border-white/10 rounded text-zinc-300">
                ⏱ {article.readTime} phút đọc
              </span>
            )}
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-3">
            {article.title}
          </h1>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-zinc-400">
            {article.author && (
              <span>
                ✍️ Tác giả: <span className="text-white">{article.author}</span>
              </span>
            )}
            {article.publishDate && (
              <span>
                📅 Cập nhật: <span className="text-white">{fmtDate(article.publishDate)}</span>
              </span>
            )}
            <span>
              🔗 Sản phẩm: <span className="text-white">{product.name}</span>
            </span>
          </div>
        </header>
      </div>

      {/* ─── Body: TOC + Content ─── */}
      <div className="px-6 py-12">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-[1fr_3fr] gap-10">
          {/* TOC sidebar */}
          <aside className="lg:sticky lg:top-6 lg:self-start space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500">
              Mục lục bài viết
            </h3>
            <nav>
              <ul className="space-y-1 border-l-2 border-zinc-800 pl-3">
                {sectionsToRender
                  .filter((s) => s.heading)
                  .map((s) => {
                    const id = slugify(s.heading!);
                    const isActive = activeHeading === id;
                    return (
                      <li key={id}>
                        <a
                          href={`#${id}`}
                          className={`block py-1.5 pr-2 text-sm transition-all border-l-2 -ml-[14px] pl-3 ${
                            isActive
                              ? "text-orange-400 border-orange-500 font-semibold"
                              : "text-zinc-400 border-transparent hover:text-white hover:border-zinc-600"
                          }`}
                        >
                          {s.heading}
                        </a>
                      </li>
                    );
                  })}
              </ul>
            </nav>

            {/* CTA card trong aside */}
            <div className="bg-gradient-to-br from-orange-500/20 to-red-500/10 border border-orange-500/30 rounded-2xl p-5 mt-6">
              <p className="text-xs text-zinc-400 mb-1">Đang đọc về</p>
              <p className="text-sm font-bold text-white mb-3 line-clamp-2">{product.name}</p>
              <a
                href="#mua-hang"
                className="block w-full text-center bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold py-2.5 rounded-full transition-colors"
              >
                🛒 Xem giá & Đặt hàng
              </a>
            </div>
          </aside>

          {/* Nội dung bài viết */}
          <div className="min-w-0">
            {sectionsToRender.map((section, i) => {
              const headingId = section.heading ? slugify(section.heading) : undefined;
              return (
                <section
                  key={i}
                  id={headingId}
                  className={i > 0 ? "mt-10" : ""}
                >
                  {section.heading && (
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-snug">
                      {section.heading}
                    </h2>
                  )}
                  <div dangerouslySetInnerHTML={{ __html: renderArticleBody(section.content) }} />
                  {section.images && section.images.length > 0 && (
                    <div className="grid grid-cols-2 gap-3 my-5">
                      {section.images.map((src, j) => (
                        <img
                          key={j}
                          src={src}
                          alt=""
                          className="w-full aspect-video object-cover rounded-lg border border-zinc-800"
                          loading="lazy"
                        />
                      ))}
                    </div>
                  )}
                </section>
              );
            })}

            {/* Footer bài viết */}
            <div className="mt-12 pt-6 border-t border-zinc-800 text-center text-xs text-zinc-500">
              <p>
                Bài viết được biên tập bởi{" "}
                <span className="text-white font-medium">{article.author ?? "Máy Ảnh Việt Nam"}</span>{" "}
                — mọi thông tin mang tính tham khảo. Vui lòng liên hệ cửa hàng để được tư vấn chính xác nhất.
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
