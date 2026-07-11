"use client";
import { communityImages } from "@/data/store";

export default function CommunityGallery() {
  return (
    <section className="bg-white py-14 px-6">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-widest mb-2">Cộng đồng</p>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Cảm hứng từ cộng đồng</h2>
          </div>
          <a href="#" className="text-sm font-medium text-[var(--color-primary)] hover:opacity-80 transition-opacity">Xem tất cả →</a>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {communityImages.map((item, idx) => (
            <a
              key={idx}
              href="#"
              className="group relative rounded-2xl overflow-hidden aspect-square"
            >
              <div
                className="absolute inset-0 opacity-80 group-hover:scale-110 transition-transform duration-700"
                style={{
                  background: `linear-gradient(135deg, hsl(${(idx * 47) % 360}, 65%, 50%) 0%, hsl(${(idx * 73 + 120) % 360}, 55%, 40%) 100%)`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-white/70 text-xs mb-0.5 line-clamp-1">{item.title}</p>
                <p className="text-white text-sm font-semibold">{item.creator}</p>
                <p className="text-white/60 text-xs mt-0.5">{item.product}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
