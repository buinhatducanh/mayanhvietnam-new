'use client';

import { Play } from 'lucide-react';
import { REVIEWS_VIDEO_IMAGES } from '@/lib/image-constants';

const VIDEOS = [
  {
    title: 'Canon EOS R6 Mark II — Review chi tiết',
    img: REVIEWS_VIDEO_IMAGES.review1,
    href: '#',
  },
  {
    title: 'Sony A7 V — Có đáng để nâng cấp?',
    img: REVIEWS_VIDEO_IMAGES.review2,
    href: '#',
  },
  {
    title: 'DJI Mavic 4 Pro — Bay thực tế',
    img: REVIEWS_VIDEO_IMAGES.review4,
    href: '#',
  },
];

export function ReviewsVideo() {
  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 py-10 sm:py-14">
        <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-start lg:gap-12">
          {/* Text side */}
          <div className="flex-1 text-center lg:text-left">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-error/15 px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-[0.18em] text-error">
              <Play className="h-3 w-3" /> YouTube
            </span>
            <h2
              className="mt-4 text-2xl font-bold sm:text-3xl"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Review Sản Phẩm Mới Nhất
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground max-w-md lg:max-w-none">
              Video đánh giá chi tiết, thực tế từ các reviewer chuyên nghiệp. Cập nhật mỗi tuần.
            </p>
            <a
              href="#"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-error px-5 py-2.5 text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-[0.98]"
            >
              <Play className="h-4 w-4" /> Xem kênh YouTube
            </a>
          </div>

          {/* Video grid */}
          <div className="flex-1 grid grid-cols-3 gap-3">
            {VIDEOS.map((v) => (
              <a
                key={v.title}
                href={v.href}
                className="group relative overflow-hidden rounded-lg"
              >
                <div className="aspect-video bg-muted overflow-hidden">
                  <img
                    src={v.img}
                    alt={v.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-error/90 opacity-90 transition-transform group-hover:scale-110">
                    <Play className="ml-0.5 h-4 w-4 fill-white text-white" />
                  </div>
                </div>
                <p className="absolute bottom-2 left-2 right-2 truncate text-[11px] font-bold text-white">
                  {v.title}
                </p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
