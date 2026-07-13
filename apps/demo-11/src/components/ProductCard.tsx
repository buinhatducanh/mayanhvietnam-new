import type { Product } from '../types';
import { formatPrice } from '../data';
import type { Page } from '../types';

interface ProductCardProps {
  product: Product;
  onNavigate: (page: Page, product?: Product) => void;
  onAddToCart: (product: Product) => void;
}

const badgeColors: Record<string, string> = {
  NEW: 'bg-badge-new text-white',
  HOT: 'bg-badge-hot text-white',
  SALE: 'bg-badge-sale text-white',
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(star => (
        <svg
          key={star}
          className={`w-3.5 h-3.5 ${star <= Math.round(rating) ? 'text-star' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function ProductCard({ product, onNavigate, onAddToCart }: ProductCardProps) {
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  return (
    <div className="group bg-white rounded-[8px] border border-gray-100 hover:border-orange/30 hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col">
      {/* Image container */}
      <div
        className="relative aspect-square bg-cream cursor-pointer overflow-hidden"
        onClick={() => onNavigate('pdp', product)}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5">
          {product.badge && (
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${badgeColors[product.badge]}`}>
              {product.badge === 'NEW' ? 'Mới' : product.badge === 'HOT' ? 'Hot' : 'Giảm giá'}
            </span>
          )}
          {discount > 0 && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-orange text-white">
              -{discount}%
            </span>
          )}
          {product.condition === 'Used' && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-gray-600 text-white">
              Đã qua sử dụng
            </span>
          )}
        </div>

        {/* Quick view overlay */}
        <div className="absolute inset-0 bg-navy/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button
            onClick={e => { e.stopPropagation(); onNavigate('pdp', product); }}
            className="bg-white text-navy text-xs font-semibold px-4 py-2 rounded-full shadow-lg hover:bg-orange hover:text-white transition-colors"
          >
            Xem nhanh
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-3.5">
        <div className="text-[11px] font-semibold text-orange/80 uppercase tracking-wider mb-1">
          {product.brand}
        </div>
        <button
          onClick={() => onNavigate('pdp', product)}
          className="text-sm font-semibold text-navy leading-snug mb-2 text-left hover:text-orange transition-colors line-clamp-2"
        >
          {product.name}
        </button>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-2.5">
          <StarRating rating={product.rating} />
          <span className="text-[11px] text-gray-500">({product.reviews})</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-3 mt-auto">
          <span className="text-base font-bold text-orange">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="text-xs text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
          )}
        </div>

        {/* Add to Cart */}
        <button
          onClick={() => onAddToCart(product)}
          disabled={!product.inStock}
          className="w-full py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 group/btn
            bg-orange-50 text-orange border border-orange/20
            hover:bg-orange hover:text-white hover:border-orange hover:shadow-md hover:shadow-orange/20
            disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-orange-50 disabled:hover:text-orange"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          {product.inStock ? 'Thêm vào giỏ' : 'Hết hàng'}
        </button>
      </div>
    </div>
  );
}