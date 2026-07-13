import { useState } from 'react';
import type { Page, Product } from '../types';
import { products, formatPrice, getProductImages } from '../data';
import { getRelatedPosts } from '../data/posts';
import ProductCard from '../components/ProductCard';

interface PDPPageProps {
  product: Product;
  onNavigate: (page: Page, product?: Product) => void;
  onAddToCart: (product: Product, qty: number, variant?: string) => void;
}

const tabs = ['Mô tả chi tiết', 'Thông số kỹ thuật', 'Đánh giá khách hàng'] as const;
type Tab = typeof tabs[number];

export default function PDPPage({ product, onNavigate, onAddToCart }: PDPPageProps) {
  const [activeImage, setActiveImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('Mô tả chi tiết');
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState('Thân máy (Body Only)');
  const [added, setAdded] = useState(false);

  const images = getProductImages(product);
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  const variantPriceAdj: Record<string, number> = {
    'Thân máy (Body Only)': 0,
    'Kèm Lens Kit (28-70mm)': 4000000,
    'Kèm Lens Kit (24-105mm)': 8000000,
  };

  const currentPrice = product.price + (variantPriceAdj[selectedVariant] ?? 0);
  const currentOriginalPrice = product.originalPrice ? product.originalPrice + (variantPriceAdj[selectedVariant] ?? 0) : undefined;

  const handleAddToCart = () => {
    onAddToCart(product, quantity, selectedVariant);
    setAdded(true);
    setTimeout(() => setAdded(false), 3000);
  };

  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="bg-cream min-h-screen py-8">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6">
        {/* Breadcrumb */}
        <nav className="text-xs text-gray-500 mb-6 flex items-center gap-1.5">
          <button onClick={() => onNavigate('home')} className="hover:text-orange transition-colors">Trang chủ</button>
          <span>/</span>
          <button onClick={() => onNavigate('plp')} className="hover:text-orange transition-colors">{product.category}</button>
          <span>/</span>
          <span className="text-navy font-medium truncate max-w-xs">{product.name}</span>
        </nav>

        {/* Product Brief Layout */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-8 mb-10">
          {/* Gallery Media Column */}
          <div className="md:col-span-5 flex flex-col gap-4">
            {/* Main Image */}
            <div
              className="bg-cream/20 rounded-xl overflow-hidden border border-gray-100 aspect-square relative flex items-center justify-center cursor-zoom-in"
              onClick={() => setLightboxOpen(true)}
            >
              <img src={images[activeImage]} alt={product.name} className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" />
              {product.badge && (
                <span className={`absolute top-4 left-4 text-xs font-black text-white px-3 py-1 rounded-full ${product.badge === 'HOT' ? 'bg-badge-hot' : product.badge === 'NEW' ? 'bg-badge-new' : 'bg-badge-sale'}`}>
                  {product.badge}
                </span>
              )}
              {/* Zoom icon */}
              <span className="absolute bottom-3 right-3 bg-white/80 rounded-full w-8 h-8 flex items-center justify-center shadow-sm text-navy text-sm">🔍</span>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-2.5 overflow-x-auto pb-1">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`w-16 h-16 rounded-lg border-2 overflow-hidden shrink-0 bg-white transition-all ${idx === activeImage ? 'border-orange scale-95 shadow-md' : 'border-gray-100 opacity-70 hover:opacity-100'}`}
                >
                  <img src={img} alt={`view-${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Multi-image grid preview */}
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => { setActiveImage(idx); setLightboxOpen(true); }}
                    className="aspect-square rounded-lg overflow-hidden border border-gray-100 hover:border-orange hover:shadow-md transition-all"
                  >
                    <img src={img} alt={`preview-${idx + 1}`} className="w-full h-full object-cover hover:scale-110 transition-transform duration-300" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Lightbox overlay */}
          {lightboxOpen && (
            <div
              className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-8"
              onClick={() => setLightboxOpen(false)}
            >
              <button
                className="absolute top-6 right-6 text-white text-3xl font-bold hover:text-orange transition-colors z-50"
                onClick={() => setLightboxOpen(false)}
              >✕</button>
              <button
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white text-3xl bg-white/10 rounded-full w-10 h-10 flex items-center justify-center hover:bg-white/20 transition-colors"
                onClick={(e) => { e.stopPropagation(); setActiveImage(i => (i - 1 + images.length) % images.length); }}
              >‹</button>
              <img
                src={images[activeImage]}
                alt={product.name}
                className="max-h-[85vh] max-w-[90vw] object-contain rounded-lg"
                onClick={(e) => e.stopPropagation()}
              />
              <button
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white text-3xl bg-white/10 rounded-full w-10 h-10 flex items-center justify-center hover:bg-white/20 transition-colors"
                onClick={(e) => { e.stopPropagation(); setActiveImage(i => (i + 1) % images.length); }}
              >›</button>
              {/* Thumbnails in lightbox */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => { e.stopPropagation(); setActiveImage(idx); }}
                    className={`w-14 h-14 rounded-lg overflow-hidden border-2 transition-all ${idx === activeImage ? 'border-orange' : 'border-white/30 opacity-60 hover:opacity-100'}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Checkout & Detail Information */}
          <div className="md:col-span-7 flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">{product.brand} · {product.condition === 'New' ? 'Hàng Mới Chính Hãng' : 'Hàng Qua Sử Dụng'}</div>
              <h1 className="text-2xl md:text-3xl font-black text-navy mt-1.5 leading-tight">{product.name}</h1>
              
              <div className="flex items-center gap-4 mt-3 pb-4 border-b border-gray-100">
                <div className="flex items-center gap-1 bg-star/10 text-star px-2 py-0.5 rounded text-sm font-bold">
                  ⭐ {product.rating}
                </div>
                <span className="text-xs text-gray-400 font-medium">({product.reviews} đánh giá từ khách hàng)</span>
                <span className="text-xs font-bold text-emerald-500 flex items-center gap-1">
                  ● {product.inStock ? 'Còn hàng sẵn tại showroom' : 'Liên hệ đặt hàng'}
                </span>
              </div>

              {/* Pricing section */}
              <div className="my-5 bg-cream/40 rounded-xl p-4 flex items-center gap-4 flex-wrap">
                <span className="text-3xl font-black text-orange">{formatPrice(currentPrice)}</span>
                {currentOriginalPrice && (
                  <>
                    <span className="text-base text-gray-400 line-through font-medium">{formatPrice(currentOriginalPrice)}</span>
                    <span className="bg-badge-sale text-white text-xs font-black px-2 py-0.5 rounded">-{discount}% GIẢM</span>
                  </>
                )}
              </div>

              {/* Gói Tùy chọn ống kính kèm theo */}
              <div className="mb-5">
                <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2.5">Chọn phiên bản / Gói Combo:</label>
                <div className="flex flex-wrap gap-2.5">
                  {Object.keys(variantPriceAdj).map(v => (
                    <button
                      key={v}
                      onClick={() => setSelectedVariant(v)}
                      className={`text-xs font-semibold px-4 py-3 rounded-lg border transition-all text-left min-w-[140px] ${selectedVariant === v ? 'border-orange bg-orange/5 text-orange shadow-sm font-bold' : 'border-gray-200 text-gray-600 hover:border-navy hover:text-navy bg-white'}`}
                    >
                      <div>{v}</div>
                      <div className="text-[10px] text-gray-400 mt-0.5 font-medium">
                        {variantPriceAdj[v] === 0 ? 'Mặc định' : `+${formatPrice(variantPriceAdj[v])}`}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Số lượng */}
              <div className="mb-6 flex items-center gap-3">
                <span className="text-xs font-bold text-navy uppercase tracking-wider">Số lượng:</span>
                <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
                  <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-3 py-1.5 hover:bg-gray-50 text-gray-500 font-bold">-</button>
                  <span className="px-4 py-1.5 text-sm font-bold text-navy min-w-[40px] text-center bg-cream/20">{quantity}</span>
                  <button onClick={() => setQuantity(q => q + 1)} className="px-3 py-1.5 hover:bg-gray-50 text-gray-500 font-bold">+</button>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-3 pt-4 border-t border-gray-100">
              <div className="flex gap-3 flex-wrap sm:flex-nowrap">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-orange hover:bg-orange-dark text-white font-bold text-sm px-6 py-3.5 rounded-xl transition-all shadow-lg shadow-orange/20 text-center flex items-center justify-center gap-2"
                >
                  🛒 Thêm vào giỏ hàng
                </button>
                <button
                  onClick={() => { onAddToCart(product, quantity, selectedVariant); onNavigate('cart'); }}
                  className="flex-1 bg-navy hover:bg-navy-light text-white font-bold text-sm px-6 py-3.5 rounded-xl transition-all shadow-lg shadow-navy/10 text-center"
                >
                  Mua ngay giao tận nơi
                </button>
              </div>

              {added && (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold px-4 py-3 rounded-xl flex items-center gap-2 animate-fade-in shadow-sm">
                  ✓ Đã thêm thành công {quantity} x {product.name} ({selectedVariant}) vào giỏ hàng của bạn!
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tab System Info Blocks */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm mb-12">
          <div className="flex border-b border-gray-100 gap-6 mb-6 overflow-x-auto">
            {tabs.map(t => (
              <button
                key={t}
                onClick={() => setActiveTab(t)}
                className={`pb-3 font-bold text-sm transition-all relative whitespace-nowrap ${activeTab === t ? 'text-orange font-black' : 'text-gray-400 hover:text-navy'}`}
              >
                {t}
                {activeTab === t && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange rounded" />}
              </button>
            ))}
          </div>

          <div className="text-sm text-gray-600 leading-relaxed min-h-[150px]">
            {activeTab === 'Mô tả chi tiết' && (
              <div className="space-y-4">
                <p className="font-medium text-navy">{product.description || 'Thông tin mô tả sản phẩm đang được cập nhật...'}</p>
                <p>Thiết bị công nghệ sở hữu hiệu năng mạnh mẽ, khả năng xử lý hình ảnh tối ưu đáp ứng tốt mọi tiêu chuẩn khắt khe từ nhiếp ảnh gia chuyên nghiệp lẫn các videographer thế hệ mới. Cam kết sản phẩm phân phối chính hãng 100%.</p>
              </div>
            )}

            {activeTab === 'Thông số kỹ thuật' && (
              <div className="max-w-xl">
                <table className="w-full border-collapse rounded-lg overflow-hidden border border-gray-100 text-xs">
                  <tbody>
                    {Object.entries(product.specs ?? { 'Đặc tính': 'Đang cập nhật' }).map(([k, v], i) => (
                      <tr key={k} className={i % 2 === 0 ? 'bg-cream/30' : 'bg-white'}>
                        <td className="px-4 py-3 font-bold text-navy w-1/3 border-b border-gray-50">{k}</td>
                        <td className="px-4 py-3 text-gray-600 border-b border-gray-50">{v}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'Đánh giá khách hàng' && (
              <div className="space-y-5">
                {[
                  { user: 'Nguyễn Văn Hùng', rating: 5, date: '2 ngày trước', text: 'Sản phẩm dùng cực mượt, lấy nét siêu nhanh đúng như mong đợi. Đóng gói rất cẩn thận, showroom tư vấn nhiệt tình.' },
                  { user: 'Lê Trần Minh Anh', rating: 4, date: '1 tuần trước', text: 'Máy ảnh tốt, chất lượng build đầm tay cao cấp, tuy nhiên lens kit đi kèm chụp đêm hơi thiếu sáng một chút, nên nâng cấp ống fix.' }
                ].map((review, i) => (
                  <div key={i} className="border-b border-gray-50 pb-4 last:border-0 last:pb-0">
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-navy">{review.user}</span>
                        <div className="flex gap-0.5">
                          {[1, 2, 3, 4, 5].map(s => (
                            <svg key={s} className={`w-3 h-3 ${s <= review.rating ? 'text-star' : 'text-gray-200'}`} fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                      <span className="text-[11px] text-gray-400">{review.date}</span>
                    </div>
                    <p className="text-xs text-gray-600">{review.text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sản phẩm liên quan */}
        {relatedProducts.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xl font-bold text-navy mb-5">📸 Sản phẩm liên quan</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} onNavigate={onNavigate} onAddToCart={(prod) => onAddToCart(prod, 1)} />
              ))}
            </div>
          </section>
        )}

        {/* Bài viết liên quan */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-navy mb-5">📰 Bài viết liên quan</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {getRelatedPosts(product.categorySlug).map(post => (
              <article
                key={post.id}
                className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-lg transition-all group cursor-pointer"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <span className="text-[10px] font-bold text-orange uppercase tracking-wider bg-orange-50 px-2 py-0.5 rounded">
                    {post.category}
                  </span>
                  <h3 className="text-sm font-bold text-navy mt-2 leading-snug line-clamp-2 group-hover:text-orange transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-xs text-gray-400 mt-2 line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-3 mt-3 pt-3 border-t border-gray-50 text-[11px] text-gray-400">
                    <span>{post.author}</span>
                    <span>·</span>
                    <span>{post.date}</span>
                    <span>·</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}