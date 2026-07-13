"use client";
import Link from "next/link";
import Image from "next/image";
import { graphicNav } from "@/data/store";

export default function GraphicNavigation() {
  return (
    <section className="bg-white py-8 px-6 border-b border-gray-100">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2 -mx-4 px-4">
          {graphicNav.map((cat) => (
            <Link key={cat.slug} href={`/danh-muc/${cat.slug}`} className="flex-shrink-0 flex flex-col items-center gap-2 group">
              <div className="w-16 h-16 rounded-2xl bg-gray-50 border border-gray-200 overflow-hidden flex items-center justify-center p-2 transition-all duration-200 group-hover:border-[var(--color-primary)] group-hover:shadow-md group-hover:-translate-y-0.5">
                <Image src={cat.image || "/placeholder.svg"} alt={cat.name} width={48} height={48} className="w-full h-full object-contain" unoptimized />
              </div>
              <div className="relative">
                <span className="text-xs text-gray-600 font-medium text-center leading-tight block w-16 text-wrap text-center">
                  {cat.name}
                </span>
                {cat.tag && (
                  <span className="absolute -top-2 -right-3 text-[9px] font-bold text-white bg-[var(--color-primary)] px-1 rounded-full leading-none">
                    {cat.tag}
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
