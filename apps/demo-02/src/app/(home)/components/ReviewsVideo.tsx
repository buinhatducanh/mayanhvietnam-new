'use client';

import Link from 'next/link';
import { Play, Youtube } from 'lucide-react';

export default function ReviewsVideo() {
  return (
    <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-12">
      <div className="max-w-[1280px] mx-auto px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          <div className="flex-1 text-center lg:text-left">
            <span className="inline-flex items-center gap-1.5 bg-red-500/20 text-red-400 text-[11px] font-bold px-3 py-1 rounded-full">
              <Youtube size={12} /> YOUTUBE
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-3 mb-3 tracking-tight">
              Review Sản Phẩm Mới Nhất
            </h2>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed max-w-md lg:max-w-none">
              Video đánh giá chi tiết, thực tế từ các reviewer chuyên nghiệp. Cập nhật mỗi tuần.
            </p>
            <Link
              href="#"
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold text-sm px-5 py-2.5 rounded-lg transition-colors"
            >
              <Play size={14} /> Xem kênh YouTube
            </Link>
          </div>

          <div className="flex-1 grid grid-cols-3 gap-3">
            {[
              { img: 'https://mayanhvietnam.com/image-data/san-pham/26-03/26-03-28/260328145950429/avatar/639103067985726326-Sony-FX3-II-png_may-quay-sony-fx3-ii.jpg', title: 'Sony FX3 II Cinema' },
              { img: 'https://mayanhvietnam.com/image-data/san-pham/26-02/26-02-26/260226105739670/avatar/639077003951312982_dji-osmo-action-5-pro-adventure-combo.jpg', title: 'DJI Action 5 Pro' },
              { img: 'https://mayanhvietnam.com/image-data/san-pham/25-05/25-05-15/250515085035248/avatar/638828964891489787_dji-mavic-4-pro-512gb-creator-combo.jpg', title: 'DJI Mavic 4 Pro Creator Combo' },
            ].map((v) => (
              <Link
                key={v.title}
                href="#"
                className="group relative aspect-video rounded-lg overflow-hidden bg-gray-700"
              >
                <img
                  src={v.img}
                  alt={v.title}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center opacity-90 group-hover:scale-110 transition-transform">
                    <Play size={16} className="text-white fill-white ml-0.5" />
                  </div>
                </div>
                <p className="absolute bottom-2 left-2 right-2 text-white text-[11px] font-bold truncate">
                  {v.title}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
