import { useState } from 'react';
import type { Page } from '../types';
import { categories } from '../data';

interface HeaderProps {
  cartCount: number;
  onNavigate: (page: Page) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onCategorySelect?: (slug: string) => void;
}

export default function Header({ cartCount, onNavigate, searchQuery, onSearchChange, onCategorySelect }: HeaderProps) {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full shadow-lg">
      {/* Top bar */}
      <div className="bg-navy-mid text-white text-xs py-2 px-4">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-orange" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              <span className="text-orange font-semibold">Hotline: 0937.148.222</span>
              <span className="text-white/60 mx-1">|</span>
              <span className="text-white/80">Thứ 2–Thứ 7 8:00–21:00</span>
            </span>
            <span className="hidden md:flex items-center gap-1.5 text-white/70">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              45 Nguyễn Huệ, Quận 1, TP.HCM
            </span>
          </div>
          <div className="flex items-center gap-4 text-white/70">
            <span className="hidden sm:block">🚚 Miễn phí đơn từ 5.000.000₫</span>
            <span className="hidden sm:block">|</span>
            <a href="#" className="hover:text-orange transition-colors">VI</a>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="bg-navy text-white py-3 px-4">
        <div className="max-w-[1440px] mx-auto flex items-center gap-4">
          {/* Logo — pill nền primary như demo-05 */}
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 shrink-0 group"
          >
            <div className="flex items-center justify-center rounded-lg bg-primary px-3 py-1.5 shadow-sm">
              <img
                src="https://mayanhvietnam.com/asset/imgs/img/Logo_white.png"
                alt="Máy Ảnh Việt Nam"
                className="h-8 w-auto object-contain"
              />
            </div>
          </button>

          {/* Search bar */}
          <div className="flex-1 max-w-2xl mx-auto">
            <div className="flex rounded-lg overflow-hidden shadow-sm">
              <input
                type="text"
                placeholder="Tìm kiếm máy ảnh, ống kính, flycam..."
                value={searchQuery}
                onChange={e => onSearchChange(e.target.value)}
                className="flex-1 bg-white text-navy text-sm px-4 py-2.5 outline-none placeholder:text-gray-400"
              />
              <button
                onClick={() => onNavigate('plp')}
                className="bg-orange hover:bg-orange-dark transition-colors px-5 flex items-center justify-center"
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-1 shrink-0">
            <button className="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg hover:bg-white/10 transition-colors group">
              <svg className="w-5 h-5 text-white/80 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="text-[10px] text-white/70 group-hover:text-white hidden sm:block">Tài khoản</span>
            </button>

            <button className="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg hover:bg-white/10 transition-colors group">
              <svg className="w-5 h-5 text-white/80 group-hover:text-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span className="text-[10px] text-white/70 group-hover:text-white hidden sm:block">Yêu thích</span>
            </button>

            <button
              onClick={() => onNavigate('cart')}
              className="relative flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg hover:bg-white/10 transition-colors group"
            >
              <div className="relative">
                <svg className="w-5 h-5 text-white/80 group-hover:text-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-orange text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center leading-none">
                    {cartCount > 9 ? '9+' : cartCount}
                  </span>
                )}
              </div>
              <span className="text-[10px] text-white/70 group-hover:text-white hidden sm:block">Giỏ hàng</span>
            </button>

            <button
              className="md:hidden ml-1 p-2 rounded-lg hover:bg-white/10 transition-colors"
              onClick={() => setMobileMenuOpen(v => !v)}
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation bar */}
      <nav className="bg-navy-light border-t border-white/10 hidden md:block">
        <div className="max-w-[1440px] mx-auto px-4">
          <ul className="flex items-center">
            {categories.map(cat => (
              <li
                key={cat.slug}
                className="relative"
                onMouseEnter={() => setActiveDropdown(cat.slug)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  onClick={() => onCategorySelect?.(cat.slug)}
                  className={`flex items-center gap-1.5 px-4 py-3.5 text-sm font-medium transition-all border-b-2 ${
                    activeDropdown === cat.slug
                      ? 'text-orange border-orange'
                      : 'text-white/80 hover:text-white border-transparent hover:border-orange/50'
                  }`}
                >
                  <span>{cat.name}</span>
                  <svg className="w-3 h-3 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {activeDropdown === cat.slug && (
                  <div className="absolute top-full left-0 bg-white rounded-b-lg shadow-xl min-w-[200px] z-50 border-t-2 border-orange py-2">
                    {cat.subcategories.map(sub => (
                      <button
                        key={sub}
                        onClick={() => { onCategorySelect?.(cat.slug); setActiveDropdown(null); }}
                        className="w-full text-left px-4 py-2 text-sm text-navy hover:bg-orange-50 hover:text-orange transition-colors flex items-center gap-2"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-orange/40" />
                        {sub}
                      </button>
                    ))}
                  </div>
                )}
              </li>
            ))}

            <li className="ml-auto">
              <button
                onClick={() => onNavigate('plp')}
                className="flex items-center gap-1.5 px-4 py-3.5 text-sm font-semibold text-orange hover:text-orange-light transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                </svg>
                Flash Sale
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-navy-mid border-t border-white/10">
          <div className="px-4 py-2 space-y-0.5">
            {categories.map(cat => (
              <button
                key={cat.slug}
                onClick={() => { onCategorySelect?.(cat.slug); setMobileMenuOpen(false); }}
                className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}