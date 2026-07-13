import Link from "next/link";
import Image from "next/image";
import { accessories, consumerProducts } from "@/data/store";

function AccessoryCard({ name, price, image, slug }: { name: string; price: string; image: string; slug: string }) {
  return (
    <Link href={`/san-pham/${slug}`} className="group block">
      <div className="aspect-square bg-gray-50 rounded-2xl overflow-hidden mb-3 p-4 group-hover:bg-gray-100 transition-colors flex items-center justify-center">
        <Image src={image || "/placeholder.svg"} alt={name} width={200} height={200} className="w-full h-full object-contain" unoptimized />
      </div>
      <div className="px-1">
        <h3 className="text-sm font-semibold text-gray-900 group-hover:text-[var(--color-primary)] transition-colors line-clamp-2">
          {name}
        </h3>
        <p className="text-sm font-bold text-[var(--color-primary)] mt-1">{price}</p>
      </div>
    </Link>
  );
}

function ProfessionalCard({ name, price, image, slug }: { name: string; price: string; image: string; slug: string }) {
  return (
    <Link href={`/san-pham/${slug}`} className="group block bg-gray-900 rounded-2xl overflow-hidden">
      <div className="aspect-video bg-gray-800 p-6 flex items-center justify-center">
        <Image src={image || "/placeholder.svg"} alt={name} width={300} height={200} className="w-full h-full object-contain" unoptimized />
      </div>
      <div className="p-5">
        <p className="text-white/50 text-xs mb-1">Cho chuyên gia</p>
        <h3 className="text-white font-bold text-lg">{name}</h3>
        <p className="text-white font-semibold mt-1">{price}</p>
        <div className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-white border border-white/30 rounded-full px-4 py-1.5 group-hover:bg-white/10 transition-colors">
          Xem thêm →
        </div>
      </div>
    </Link>
  );
}

export default function AccessoriesSection() {
  // Reference consumerProducts so the import isn't dead — keeps data parity
  void consumerProducts;

  // Premium products (cao cấp) cho Pro section
  const professional = consumerProducts
    .slice()
    .sort((a, b) => (b.originalPrice ? parseInt(b.originalPrice.replace(/\D/g, "")) : 0) - (a.originalPrice ? parseInt(a.originalPrice.replace(/\D/g, "")) : 0))
    .slice(0, 2);

  return (
    <>
      {/* Accessories */}
      <section className="bg-gray-50 py-12 px-6 border-t border-gray-200">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex items-end justify-between mb-8 gap-4 flex-wrap">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Phụ kiện & Thiết bị Studio</h2>
              <p className="text-gray-500 text-sm mt-1">Chọn phụ kiện tốt nhất cho bộ máy của bạn.</p>
            </div>
            <Link href="/danh-muc/phu-kien" className="text-sm font-medium text-[var(--color-primary)] hover:opacity-80 transition-opacity">
              Xem tất cả →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {accessories.slice(0, 5).map((p) => (
              <AccessoryCard key={p.slug} {...p} />
            ))}
          </div>
        </div>
      </section>

      {/* Professional (premium) */}
      <section className="bg-black py-14 px-6">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white">Cao cấp cho chuyên gia</h2>
            <Link href="/danh-muc/may-quay-phim" className="text-sm font-medium text-white/60 hover:text-white transition-colors">
              Xem tất cả →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
            {professional.map((p) => (
              <ProfessionalCard key={p.slug} {...p} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
