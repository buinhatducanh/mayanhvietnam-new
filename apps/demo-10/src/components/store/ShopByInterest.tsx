"use client";
import Link from "next/link";
import Image from "next/image";
import { shopByInterest } from "@/data/store";

export default function ShopByInterest() {
  return (
    <section className="bg-black py-14 px-6">
      <div className="max-w-[1440px] mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white">Mua theo nhu cầu</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {shopByInterest.map((item) => (
            <Link
              key={item.categorySlug}
              href={`/danh-muc/${item.categorySlug}`}
              className="group relative rounded-2xl overflow-hidden bg-black aspect-[16/10]"
            >
              <Image
                src={item.poster}
                alt={item.name}
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-white/70 text-sm mb-1">{item.tagline}</p>
                <h3 className="text-white text-xl font-bold">{item.name}</h3>
                <div className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-white border border-white/40 rounded-full px-4 py-1.5 group-hover:bg-white/10 transition-colors">
                  Khám phá
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
