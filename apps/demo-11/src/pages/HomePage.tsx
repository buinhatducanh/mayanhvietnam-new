import { useState, useEffect } from 'react';
import type { Page, Product } from '../types';
import { products, heroSlides, categories, trustBadges } from '../data';
import ProductCard from '../components/ProductCard';

interface HomePageProps {
  onNavigate: (page: Page, product?: Product) => void;
  onAddToCart: (product: Product) => void;
}

export default function HomePage({ onNavigate, onAddToCart }: HomePageProps) {
  const [slideIndex, setSlideIndex] = useState(0);
  const [hotDealIndex, setHotDealIndex] = useState(0);
  const hotDeals = products.filter(p => p.badge === 'HOT' || p.badge === 'SALE');
  const itemsPerView = 4;

  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIndex(i => (i + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handlePrevHotDeal = () => {
    setHotDealIndex(prev => Math.max(0, prev - 1));
  };
  const handleNextHotDeal = () => {
    setHotDealIndex(prev => Math.min(hotDeals.length - itemsPerView, prev + 1));
  };

  const newArrivals = products.filter(p => p.badge === 'NEW');
  const allFeatured = products.slice(0, 8);

  // Lọc sản phẩm Flycam & Action Camera
  const flycamProducts = products.filter(p => p.category === 'Flycam').slice(0, 4);
  const actionProducts = products.filter(p => p.category === 'Action Camera').slice(0, 4);
  const flycamAndAction = [...flycamProducts, ...actionProducts].slice(0, 8);

  return (
    <div className="bg-cream">
      {/* Hero Slider */}
      <section className="relative overflow-hidden bg-navy" style={{ height: 520 }}>
        {heroSlides.map((slide, i) => {
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-700 ${i === slideIndex ? 'opacity-100' : 'opacity-0'}`}
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover object-center"
                style={{ transform: 'scale(1.02)' }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/60 to-transparent" />
              <div className="absolute inset-0 flex items-center">
                <div className="max-w-[1440px] mx-auto px-6 w-full">
                  <div className="max-w-xl">
                    <span className="inline-block bg-orange text-white text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wider">
                      {slide.badge}
                    </span>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-3">
                      {slide.title}
                    </h1>
                    <p className="text-lg text-white/90 font-medium mb-2">{slide.subtitle}</p>
                    <p className="text-sm text-white/70 mb-5">{slide.description}</p>
                    <div className="flex items-center gap-4 flex-wrap">
                      <span className="text-2xl font-bold text-orange">{slide.price}</span>
                      <button
                        onClick={() => onNavigate('plp')}
                        className="bg-orange hover:bg-orange-dark text-white font-semibold px-7 py-3 rounded-lg transition-colors shadow-lg shadow-orange/30 flex items-center gap-2"
                      >
                        {slide.cta}
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </button>
                      <button
                        onClick={() => onNavigate('plp')}
                        className="text-white/80 hover:text-white text-sm font-medium border border-white/30 hover:border-white px-5 py-3 rounded-lg transition-colors"
                      >
                        Xem tất cả
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setSlideIndex(i)}
              className={`rounded-full transition-all duration-300 ${
                i === slideIndex ? 'bg-orange w-7 h-2.5' : 'bg-white/40 hover:bg-white/70 w-2.5 h-2.5'
              }`}
            />
          ))}
        </div>

        <button
          onClick={() => setSlideIndex(i => (i - 1 + heroSlides.length) % heroSlides.length)}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white rounded-full w-10 h-10 flex items-center justify-center transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={() => setSlideIndex(i => (i + 1) % heroSlides.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white rounded-full w-10 h-10 flex items-center justify-center transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </section>

      {/* Trust Badges */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {trustBadges.map(({ icon, title, desc }) => (
              <div key={title} className="flex items-center gap-3">
                <span className="text-2xl">{icon}</span>
                <div>
                  <div className="text-sm font-semibold text-navy">{title}</div>
                  <div className="text-xs text-gray-500">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Grid */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 py-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-navy">Danh mục sản phẩm</h2>
          <button onClick={() => onNavigate('plp')} className="text-sm text-orange font-semibold hover:text-orange-dark transition-colors flex items-center gap-1 whitespace-nowrap">
            Tất cả
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        <div className="flex overflow-x-auto gap-3 pb-4 md:grid md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 md:overflow-visible md:pb-0 scrollbar-hide">
          {categories.map(cat => (
            <button
              key={cat.slug}
              onClick={() => onNavigate('plp')}
              className="group flex-shrink-0 flex flex-col items-center gap-2 p-3 w-24 md:w-auto bg-white rounded-[8px] border border-gray-100 hover:border-orange/30 hover:shadow-lg transition-all duration-200"
            >
              <span className="text-2xl">{cat.icon}</span>
              <span className="text-xs font-semibold text-navy group-hover:text-orange transition-colors text-center leading-tight">
                {cat.name}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Hot Deals */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 pb-10">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-xl font-bold text-navy">🔥 Đang Hot</h2>
            <p className="text-sm text-gray-500 mt-0.5">Ưu đãi có hạn - Đừng bỏ lỡ</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handlePrevHotDeal}
              disabled={hotDealIndex === 0}
              className="p-2 rounded-full border border-gray-300 hover:bg-orange hover:text-white hover:border-orange transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={handleNextHotDeal}
              disabled={hotDealIndex >= hotDeals.length - itemsPerView}
              className="p-2 rounded-full border border-gray-300 hover:bg-orange hover:text-white hover:border-orange transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out gap-4"
            style={{ transform: `translateX(-${hotDealIndex * (100 / itemsPerView)}%)` }}
          >
            {hotDeals.map((p) => (
              <div key={p.id} className="w-1/2 sm:w-1/3 md:w-1/4 flex-shrink-0">
                <ProductCard product={p} onNavigate={onNavigate} onAddToCart={onAddToCart} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Promo Banner */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 pb-10">
        <div className="relative rounded-xl overflow-hidden bg-gradient-to-r from-navy via-navy-light to-navy-mid min-h-[220px] flex items-center shadow-xl">
          <img
            src="https://mayanhvietnam.com/asset/imgs/img/danhMuc_setupPhong.webp"
            alt="Ưu đãi thiết bị studio"
            className="absolute inset-0 w-full h-full object-cover object-center"
            style={{ opacity: 0.35 }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/80 via-navy/40 to-transparent" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between w-full p-6 md:p-10">
            <div>
              <span className="inline-block bg-orange text-white text-xs font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-wider shadow-lg">
                Ưu đãi có hạn
              </span>
              <h3 className="text-2xl md:text-4xl font-extrabold text-white mb-2 drop-shadow-lg">
                Thiết bị Studio Chuyên Nghiệp
              </h3>
              <p className="text-white/90 text-sm md:text-base drop-shadow-md">
                Giảm đến <span className="font-bold text-orange text-lg">15%</span> cho các thiết bị đèn và phụ kiện studio
              </p>
            </div>
            <button
              onClick={() => onNavigate('plp')}
              className="mt-4 md:mt-0 shrink-0 bg-orange hover:bg-orange-dark text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 shadow-lg shadow-orange/30 hover:shadow-orange/50 hover:scale-105"
            >
              Mua ngay
            </button>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 pb-10">
        <SectionHeader
          title="✨ Hàng mới về"
          subtitle="Những sản phẩm mới nhất vừa cập bến"
          onViewAll={() => onNavigate('plp')}
        />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {newArrivals.slice(0, 4).map(p => (
            <ProductCard key={p.id} product={p} onNavigate={onNavigate} onAddToCart={onAddToCart} />
          ))}
        </div>
      </section>

      {/* Flycam & Action Camera */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 pb-10">
        <SectionHeader
          title="🚁 Flycam & Action Camera"
          subtitle="Thiết bị bay và camera hành động chính hãng"
          onViewAll={() => onNavigate('plp')}
        />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {flycamAndAction.length > 0 ? (
            flycamAndAction.map(p => (
              <ProductCard key={p.id} product={p} onNavigate={onNavigate} onAddToCart={onAddToCart} />
            ))
          ) : (
            products.slice(0, 4).map(p => (
              <ProductCard key={p.id} product={p} onNavigate={onNavigate} onAddToCart={onAddToCart} />
            ))
          )}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 pb-10">
        <SectionHeader
          title="⭐ Sản phẩm nổi bật"
          subtitle="Những thiết bị được yêu thích nhất"
          onViewAll={() => onNavigate('plp')}
        />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {allFeatured.map(p => (
            <ProductCard key={p.id} product={p} onNavigate={onNavigate} onAddToCart={onAddToCart} />
          ))}
        </div>
        <div className="text-center mt-8">
          <button
            onClick={() => onNavigate('plp')}
            className="inline-flex items-center gap-2 bg-navy hover:bg-navy-light text-white font-semibold px-8 py-3 rounded-lg transition-colors"
          >
            Xem tất cả sản phẩm
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-navy py-12">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 text-center">
          <h3 className="text-2xl font-bold text-white mb-2">Nhận thông tin mới nhất</h3>
          <p className="text-white/60 mb-6 text-sm">
            Đăng ký để nhận ưu đãi độc quyền, sản phẩm mới và mẹo nhiếp ảnh.
          </p>
          <div className="flex max-w-md mx-auto gap-3">
            <input
              type="email"
              placeholder="Nhập email của bạn"
              className="flex-1 bg-white/10 border border-white/20 text-white placeholder:text-white/40 rounded-lg px-4 py-3 text-sm outline-none focus:border-orange transition-colors"
            />
            <button className="bg-orange hover:bg-orange-dark text-white font-semibold px-5 py-3 rounded-lg transition-colors whitespace-nowrap">
              Đăng ký
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

function SectionHeader({ title, subtitle, onViewAll, accent }: {
  title: string;
  subtitle: string;
  onViewAll: () => void;
  accent?: boolean;
}) {
  return (
    <div className="flex items-end justify-between mb-5">
      <div>
        <h2 className={`text-xl font-bold ${accent ? 'text-navy' : 'text-navy'}`}>{title}</h2>
        <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>
      </div>
      <button
        onClick={onViewAll}
        className="text-sm text-orange font-semibold hover:text-orange-dark transition-colors flex items-center gap-1 shrink-0"
      >
        Xem tất cả
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}