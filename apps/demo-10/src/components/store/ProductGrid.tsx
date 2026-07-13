"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { consumerProducts } from "@/data/store";

function ProductCard({
  name,
  tagline,
  price,
  originalPrice,
  image,
  tag,
  slug,
  rating,
}: {
  name: string;
  tagline: string;
  price: string;
  originalPrice?: string;
  image: string;
  tag?: string;
  slug: string;
  rating: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={`/san-pham/${slug}`}
      className="group block"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative aspect-square bg-gray-50 rounded-2xl overflow-hidden mb-3">
        <Image
          src={image || "/placeholder.svg"}
          alt={name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          className="object-cover p-2 transition-all duration-500 group-hover:scale-105"
          unoptimized
        />
        {tag && (
          <span className={`absolute top-3 left-3 text-white text-xs font-semibold px-2.5 py-1 rounded-full ${tag === "KM" ? "bg-blue-600" : "bg-gray-800"}`}>
            {tag === "KM" ? `Giảm ${tag}` : tag}
          </span>
        )}
        {originalPrice && (
          <span className="absolute top-3 right-3 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
            GIẢM SỐC
          </span>
        )}
      </div>
      <div className="px-1">
        <p className="text-[11px] text-gray-500 mb-0.5 line-clamp-1">{tagline}</p>
        <h3 className="text-sm font-semibold text-gray-900 leading-tight group-hover:text-[var(--color-primary)] transition-colors line-clamp-2">
          {name}
        </h3>
        <div className="flex items-center gap-2 mt-1.5">
          <span className="text-sm font-bold text-[var(--color-primary)]">{price}</span>
          {originalPrice && <span className="text-xs text-gray-400 line-through">{originalPrice}</span>}
        </div>
        {rating > 0 && (
          <div className="flex items-center gap-1 mt-1">
            <span className="text-xs text-yellow-500">{'★'.repeat(Math.round(rating))}</span>
            <span className="text-[10px] text-gray-400">{rating}</span>
          </div>
        )}
      </div>
    </Link>
  );
}

export default function ProductGrid() {
  return (
    <section className="bg-white py-12 px-6">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Tất cả sản phẩm</h2>
          <Link href="/danh-muc/may-anh" className="text-sm font-medium text-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors">
            Xem thêm →
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
          {consumerProducts.map((product) => (
            <ProductCard key={product.slug} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
}
