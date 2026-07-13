import { useState, useMemo } from 'react';
import type { Page, Product } from '../types';
import { products, brands, mounts, formatPrice, categories } from '../data';

import ProductCard from '../components/ProductCard';

interface PLPPageProps {
  onNavigate: (page: Page, product?: Product) => void;
  onAddToCart: (product: Product) => void;
  searchQuery?: string;
  selectedCategory?: string | null;
}

const sortOptions = [
  { value: 'default', label: 'Mặc định' },
  { value: 'price-asc', label: 'Giá: Thấp đến Cao' },
  { value: 'price-desc', label: 'Giá: Cao đến Thấp' },
  { value: 'rating', label: 'Đánh giá tốt nhất' },
  { value: 'popularity', label: 'Bán chạy nhất' },
  { value: 'newest', label: 'Mới nhất trước' },
];

export default function PLPPage({ onNavigate, onAddToCart, searchQuery, selectedCategory }: PLPPageProps) {
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedMounts, setSelectedMounts] = useState<string[]>([]);
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000000]);
  const [sortBy, setSortBy] = useState('default');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev => prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]);
  };

  const toggleMount = (mount: string) => {
    setSelectedMounts(prev => prev.includes(mount) ? prev.filter(m => m !== mount) : [...prev, mount]);
  };

  const toggleCondition = (cond: string) => {
    setSelectedConditions(prev => prev.includes(cond) ? prev.filter(c => c !== cond) : [...prev, cond]);
  };

  const filteredProducts = useMemo(() => {
    const activeCategory = selectedCategory
      ? categories.find(c => c.slug === selectedCategory)
      : null;
    const categoryName = activeCategory?.name;
    return products
      .filter(p => {
        if (categoryName && p.category !== categoryName) return false;
        if (searchQuery && !p.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
        if (selectedBrands.length > 0 && !selectedBrands.includes(p.brand)) return false;
        if (selectedMounts.length > 0 && (!p.mount || !selectedMounts.includes(p.mount))) return false;
        if (selectedConditions.length > 0 && !selectedConditions.includes(p.condition)) return false;
        if (p.price < priceRange[0] || p.price > priceRange[1]) return false;
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return (b.rating ?? 0) - (a.rating ?? 0);
        if (sortBy === 'popularity') return (b.reviews ?? 0) - (a.reviews ?? 0);
        if (sortBy === 'newest') return b.id - a.id;
        return 0;
      });
  }, [selectedBrands, selectedMounts, selectedConditions, priceRange, sortBy, searchQuery, selectedCategory]);

  return (
    <div className="bg-cream min-h-screen py-8">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6">
        {/* Breadcrumb */}
        <nav className="text-xs text-gray-500 mb-6 flex items-center gap-1.5">
          <button onClick={() => onNavigate('home')} className="hover:text-orange transition-colors">Trang chủ</button>
          <span>/</span>
          <span className="text-navy font-medium">Sản phẩm máy ảnh & Thiết bị</span>
        </nav>

        {/* Top Control Bar */}
        <div className="bg-white rounded-xl p-4 mb-6 border border-gray-100 flex flex-wrap items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="flex items-center gap-2 border border-gray-200 hover:border-orange px-4 py-2 rounded-lg text-sm font-semibold text-navy transition-colors bg-cream/50"
            >
              📊 {sidebarOpen ? 'Ẩn bộ lọc' : 'Hiện bộ lọc'}
            </button>
            <p className="text-sm text-gray-500 font-medium">
              Tìm thấy <span className="text-navy font-bold">{filteredProducts.length}</span> sản phẩm phù hợp
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <label className="text-xs font-semibold text-gray-500 whitespace-nowrap">Sắp xếp theo:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-200 rounded-lg text-sm px-3 py-2 text-navy outline-none bg-white font-medium focus:border-orange transition-colors cursor-pointer"
              >
                {sortOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-cream/30">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 transition-colors ${viewMode === 'grid' ? 'bg-navy text-white' : 'text-gray-400 hover:text-navy'}`}
              >
                🎛️
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 transition-colors ${viewMode === 'list' ? 'bg-navy text-white' : 'text-gray-400 hover:text-navy'}`}
              >
                📝
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-6 items-start">
          {/* Sidebar Filter */}
          {sidebarOpen && (
            <aside className="w-64 bg-white rounded-xl p-5 border border-gray-100 shrink-0 shadow-sm sticky top-24">
              <div className="flex items-center justify-between mb-5 pb-3 border-b border-gray-100">
                <h3 className="font-bold text-navy text-base">Bộ lọc tìm kiếm</h3>
                {(selectedBrands.length > 0 || selectedMounts.length > 0 || selectedConditions.length > 0) && (
                  <button
                    onClick={() => { setSelectedBrands([]); setSelectedMounts([]); setSelectedConditions([]); }}
                    className="text-xs text-orange hover:underline font-semibold"
                  >
                    Xóa tất cả
                  </button>
                )}
              </div>

              {/* Thương hiệu */}
              <div className="mb-6">
                <h4 className="text-xs font-bold text-navy uppercase tracking-wider mb-3">Thương hiệu</h4>
                <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                  {brands.map(brand => (
                    <label key={brand} className="flex items-center gap-2.5 text-sm font-medium text-gray-600 hover:text-navy cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(brand)}
                        onChange={() => toggleBrand(brand)}
                        className="rounded border-gray-300 text-orange focus:ring-orange w-4 h-4"
                      />
                      {brand}
                    </label>
                  ))}
                </div>
              </div>

              {/* Ngàm ống kính */}
              <div className="mb-6 pt-4 border-t border-gray-100">
                <h4 className="text-xs font-bold text-navy uppercase tracking-wider mb-3">Ngàm ống kính</h4>
                <div className="space-y-2">
                  {mounts.map(mount => (
                    <label key={mount} className="flex items-center gap-2.5 text-sm font-medium text-gray-600 hover:text-navy cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedMounts.includes(mount)}
                        onChange={() => toggleMount(mount)}
                        className="rounded border-gray-300 text-orange focus:ring-orange w-4 h-4"
                      />
                      {mount}
                    </label>
                  ))}
                </div>
              </div>

              {/* Tình trạng sản phẩm */}
              <div className="mb-6 pt-4 border-t border-gray-100">
                <h4 className="text-xs font-bold text-navy uppercase tracking-wider mb-3">Tình trạng</h4>
                <div className="space-y-2">
                  {[
                    { val: 'New', label: 'Hàng Mới Chính Hãng' },
                    { val: 'Used', label: 'Hàng Lướt / Qua Sử Dụng' }
                  ].map(c => (
                    <label key={c.val} className="flex items-center gap-2.5 text-sm font-medium text-gray-600 hover:text-navy cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedConditions.includes(c.val)}
                        onChange={() => toggleCondition(c.val)}
                        className="rounded border-gray-300 text-orange focus:ring-orange w-4 h-4"
                      />
                      {c.label}
                    </label>
                  ))}
                </div>
              </div>

              {/* Khoảng giá */}
              <div className="pt-4 border-t border-gray-100">
                <h4 className="text-xs font-bold text-navy uppercase tracking-wider mb-3">Khoảng giá</h4>
                <div className="space-y-3">
                  <input
                    type="range"
                    min="0"
                    max="100000000"
                    step="5000000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full accent-orange cursor-pointer"
                  />
                  <div className="flex items-center justify-between text-xs font-bold text-navy">
                    <span>0đ</span>
                    <span className="text-orange">{formatPrice(priceRange[1])}</span>
                  </div>
                </div>
              </div>
            </aside>
          )}

          {/* Product Feed Grid / List */}
          <main className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-xl border border-gray-100 p-12 text-center shadow-sm">
                <span className="text-4xl block mb-3">🔍</span>
                <h3 className="text-lg font-bold text-navy mb-1">Không tìm thấy sản phẩm</h3>
                <p className="text-sm text-gray-400 mb-5">Vui lòng thử điều chỉnh lại bộ lọc tìm kiếm của bạn.</p>
                <button
                  onClick={() => { setSelectedBrands([]); setSelectedMounts([]); setSelectedConditions([]); setPriceRange([0, 100000000]); }}
                  className="bg-navy hover:bg-navy-light text-white text-xs font-semibold px-5 py-2.5 rounded-lg transition-colors"
                >
                  Đặt lại bộ lọc
                </button>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} onNavigate={onNavigate} onAddToCart={onAddToCart} />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredProducts.map(product => {
                  const discount = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;
                  return (
                    <div
                      key={product.id}
                      className="bg-white rounded-xl border border-gray-100 p-4 flex gap-5 hover:shadow-lg transition-all shadow-sm group"
                    >
                      <div className="w-40 h-40 bg-cream/30 border border-gray-50 rounded-lg overflow-hidden shrink-0 relative cursor-pointer" onClick={() => onNavigate('pdp', product)}>
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                        {product.badge && (
                          <span className={`absolute top-2 left-2 text-[10px] font-extrabold text-white px-2 py-0.5 rounded-full ${product.badge === 'HOT' ? 'bg-badge-hot' : product.badge === 'NEW' ? 'bg-badge-new' : 'bg-badge-sale'}`}>
                            {product.badge}
                          </span>
                        )}
                      </div>
                      <div className="flex-1 flex flex-col justify-between py-1">
                        <div>
                          <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">{product.brand} · {product.condition === 'New' ? 'Mới Chính Hãng' : 'Lướt'}</div>
                          <h3 onClick={() => onNavigate('pdp', product)} className="font-bold text-base text-navy mt-1 group-hover:text-orange transition-colors cursor-pointer line-clamp-2 leading-snug">{product.name}</h3>
                          <div className="flex items-center gap-1 mt-2">
                            <span className="text-xs font-bold text-star">⭐ {product.rating}</span>
                            <span className="text-xs text-gray-400">({product.reviews} đánh giá)</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-50">
                          <div className="flex items-baseline gap-2">
                            <span className="text-xl font-black text-orange">{formatPrice(product.price)}</span>
                            {product.originalPrice && (
                              <>
                                <span className="text-sm text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
                                <span className="text-xs font-bold text-badge-sale">-{discount}%</span>
                              </>
                            )}
                          </div>
                          <button
                            onClick={() => onAddToCart(product)}
                            className="bg-orange hover:bg-orange-dark text-white font-semibold text-xs px-5 py-2.5 rounded-lg transition-colors flex items-center gap-1.5"
                          >
                             Thêm vào giỏ
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}