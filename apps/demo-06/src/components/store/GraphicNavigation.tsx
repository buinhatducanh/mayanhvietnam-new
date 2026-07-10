"use client";
import { graphicNav } from "@/lib/data";

export default function GraphicNavigation() {
  return (
    <section className="bg-zinc-950 py-6 px-6 border-b border-zinc-800">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2 -mx-4 px-4">
          {graphicNav.map((cat, idx) => (
            <a
              key={idx}
              href={`/${cat.slug}`}
              className="flex-shrink-0 flex flex-col items-center gap-2 group"
            >
              <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 overflow-hidden flex items-center justify-center transition-all duration-200 group-hover:border-orange-500 group-hover:bg-zinc-800 group-hover:-translate-y-0.5 group-hover:shadow-lg group-hover:shadow-orange-500/20">
                {cat.image ? (
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                      const parent = (e.target as HTMLImageElement).parentElement;
                      if (parent) {
                        const span = document.createElement("span");
                        span.className = "text-2xl";
                        span.textContent = cat.emoji || "📦";
                        parent.appendChild(span);
                      }
                    }}
                  />
                ) : (
                  <span className="text-2xl">{cat.emoji || "📦"}</span>
                )}
              </div>
              <span className="text-xs text-zinc-300 group-hover:text-orange-400 font-medium text-center w-16 leading-tight transition-colors">
                {cat.name}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
