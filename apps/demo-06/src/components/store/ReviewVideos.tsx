"use client";
import { reviewVideos } from "@/lib/data";

const VND = (n: number) => new Intl.NumberFormat("vi-VN").format(n) + "₫";

export default function ReviewVideos() {
  return (
    <section className="bg-zinc-950 py-14 px-6 border-t border-zinc-800">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs text-orange-500 font-semibold uppercase tracking-widest mb-2">
              Đánh giá & video test thực tế
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Video review máy ảnh
            </h2>
          </div>
          <a href="#" className="text-sm font-medium text-orange-400 hover:text-orange-300 transition-colors flex items-center gap-1">
            Xem thêm YouTube
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {reviewVideos.map((video, idx) => (
            <a
              key={idx}
              href={video.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group block bg-zinc-900/40 border border-zinc-800 hover:border-orange-500/50 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative aspect-video overflow-hidden bg-zinc-900">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center shadow-lg shadow-red-600/30 transition-transform duration-300 group-hover:scale-110">
                    <svg className="w-6 h-6 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
                <span className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] font-medium px-2 py-0.5 rounded">
                  YouTube
                </span>
              </div>

              <div className="p-4">
                <h3 className="text-sm font-semibold text-white group-hover:text-orange-400 transition-colors line-clamp-2">
                  {video.title}
                </h3>
                <p className="text-xs text-zinc-500 mt-2">{video.creator}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}