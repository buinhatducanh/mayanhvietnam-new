import Link from "next/link";
import { Star, ShoppingCart } from "lucide-react";
import type { ProductSummary } from "@mayanhvietnam/mock-data";
import { formatVND, calcDiscountPercent } from "@mayanhvietnam/shared-utils";
import { useCart } from "@/app/context/CartContext";

interface ProductCardProps {
  product: ProductSummary;
  layout?: "grid" | "list";
  showAddBtn?: boolean;
}

function StarRow({ rating }: { rating: number }) {
  const filled = Math.round(rating);
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} size={11} className={i <= filled ? "fill-amber-400 text-amber-400" : "text-zinc-200"} />
      ))}
    </div>
  );
}

export default function ProductCard({ product, layout = "grid", showAddBtn = true }: ProductCardProps) {
  const { addItem } = useCart();
  const discount = calcDiscountPercent(product.price, product.originalPrice);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      id: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.thumbnail,
    });
  };

  if (layout === "list") {
    return (
      <Link
        href={`/san-pham/${product.slug}`}
        className="group bg-white rounded-2xl border border-zinc-100 hover:border-orange-100 hover:shadow-lg hover:shadow-orange-100/50 transition-all p-4 flex gap-4"
      >
        <div className="aspect-square w-28 sm:w-36 bg-zinc-50 rounded-xl overflow-hidden shrink-0 relative">
          <img src={product.thumbnail} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          {discount > 0 && (
            <span className="absolute top-2 right-2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md">
              -{discount}%
            </span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs text-zinc-400">{product.brand}{product.mount ? ` · ${product.mount}` : ""}</p>
          <h3 className="text-sm font-semibold text-zinc-800 line-clamp-2 mb-2 leading-snug">{product.name}</h3>
          <div className="flex items-center gap-2 mb-2">
            {product.rating && <StarRow rating={product.rating.average} />}
            {product.rating && <span className="text-[11px] text-zinc-400">({product.rating.count})</span>}
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-base font-bold text-[#ff6b00]">{formatVND(product.price)}</span>
            {product.originalPrice && (
              <span className="text-xs text-zinc-400 line-through">{formatVND(product.originalPrice)}</span>
            )}
          </div>
          {product.shortSpecs && product.shortSpecs.length > 0 && (
            <div className="mt-2 hidden sm:flex flex-wrap gap-1.5">
              {product.shortSpecs.slice(0, 3).map((s) => (
                <span key={s} className="text-[10px] text-zinc-500 bg-zinc-50 px-2 py-0.5 rounded">{s}</span>
              ))}
            </div>
          )}
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/san-pham/${product.slug}`}
      className="group bg-white rounded-2xl border border-zinc-100 hover:border-orange-100 hover:shadow-xl hover:shadow-orange-100/50 transition-all overflow-hidden flex flex-col"
    >
      <div className="aspect-square bg-zinc-50 overflow-hidden relative">
        <img src={product.thumbnail} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        {discount > 0 && (
          <span className="absolute top-3 right-3 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md">
            -{discount}%
          </span>
        )}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {product.badges.slice(0, 2).map((b) => (
            <span
              key={b.label}
              className={`text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                b.type === "hot" ? "bg-red-600" :
                b.type === "new" ? "bg-emerald-600" :
                "bg-[#ff6b00]"
              }`}
            >
              {b.label}
            </span>
          ))}
        </div>
      </div>
      <div className="p-4 flex flex-col flex-1">
        <p className="text-[11px] text-zinc-400 mb-1">{product.brand}</p>
        <h3 className="text-sm font-medium text-zinc-800 line-clamp-2 mb-2 leading-snug min-h-[40px]">{product.name}</h3>
        <div className="flex items-center gap-1.5 mb-2">
          {product.rating && <StarRow rating={product.rating.average} />}
          {product.rating && <span className="text-[11px] text-zinc-400">({product.rating.count})</span>}
        </div>
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-base font-bold text-[#ff6b00]">{formatVND(product.price)}</span>
          {product.originalPrice && (
            <span className="text-xs text-zinc-400 line-through">{formatVND(product.originalPrice)}</span>
          )}
        </div>
        {showAddBtn && (
          <button
            onClick={handleAdd}
            className="mt-auto w-full text-xs py-1.5 border border-[#ff6b00] text-[#ff6b00] rounded-lg hover:bg-orange-50 transition-colors font-medium flex items-center justify-center gap-1"
          >
            <ShoppingCart size={12} /> Thêm vào giỏ
          </button>
        )}
      </div>
    </Link>
  );
}