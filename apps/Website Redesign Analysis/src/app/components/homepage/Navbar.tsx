import { useState, useEffect } from 'react'
import { Search, ShoppingBag, ChevronDown, Menu, X } from 'lucide-react'

const NAV_CATEGORIES = [
  { label: 'Máy ảnh', sub: true },
  { label: 'Ống kính', sub: true },
  { label: 'Flycam', sub: false },
  { label: 'Action Camera', sub: false },
  { label: 'Studio', sub: true },
  { label: 'Phụ kiện', sub: false },
  { label: 'Sản phẩm cũ', sub: false },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchVal, setSearchVal] = useState('')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.85)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-white/96 backdrop-blur-xl border-b border-[#EBEBEB] shadow-[0_1px_20px_rgba(0,0,0,0.06)]'
            : 'bg-white/95 backdrop-blur-sm border-b border-[#EBEBEB]'
        }`}
      >
        <div className="mx-auto px-12" style={{ maxWidth: '1920px' }}>
          <div className="flex items-center h-[72px] gap-8">

            {/* Logo */}
            <a
              href="#"
              className="flex-shrink-0 text-[#141414]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              <span className="text-sm font-bold tracking-[0.25em] uppercase">MÁY ẢNH</span>
              <span className={`ml-2 text-sm font-light tracking-[0.25em] uppercase transition-colors duration-500 ${
                scrolled ? 'text-[#E8611E]' : 'text-[#E8611E]'
              }`}>VIỆT NAM</span>
            </a>

            {/* Center nav — only in scrolled mode */}
            <div
              className={`flex-1 flex items-center justify-center gap-1 transition-all duration-500 ${
                scrolled ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
              }`}
            >
              {NAV_CATEGORIES.map((cat) => (
                <button
                  key={cat.label}
                  className="flex items-center gap-0.5 px-3.5 py-2 rounded-sm text-sm text-[#3A3A3A] hover:text-[#141414] hover:bg-[#F4F3F0] transition-colors duration-200"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {cat.label}
                  {cat.sub && <ChevronDown size={13} className="text-[#8C8C8C] mt-px" />}
                </button>
              ))}
            </div>

            {/* Right utilities */}
            <div className="flex-shrink-0 flex items-center gap-3 ml-auto">

              {/* Search bar — visible when scrolled */}
              <div
                className={`flex items-center transition-all duration-500 ${
                  scrolled ? 'opacity-100 w-56' : 'opacity-0 w-0 overflow-hidden'
                }`}
              >
                <div className="relative w-full">
                  <Search
                    size={15}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8C8C8C]"
                  />
                  <input
                    type="text"
                    value={searchVal}
                    onChange={(e) => setSearchVal(e.target.value)}
                    placeholder="Tìm kiếm sản phẩm..."
                    className="w-full h-9 pl-9 pr-3 bg-[#F4F3F0] border border-transparent rounded-sm text-sm text-[#141414] placeholder-[#8C8C8C] focus:outline-none focus:border-[#D4D4D4] focus:bg-white transition-colors"
                    style={{ fontFamily: 'var(--font-body)' }}
                  />
                </div>
              </div>

              {/* Search icon — only on hero (not scrolled) */}
              <button
                className={`transition-all duration-500 ${
                  scrolled
                    ? 'opacity-0 pointer-events-none w-0'
                    : 'opacity-100 w-9 h-9 flex items-center justify-center text-[#6B6B6B] hover:text-[#141414]'
                }`}
                onClick={() => setSearchOpen(true)}
              >
                <Search size={20} />
              </button>

              {/* Cart */}
              <button
                className="relative flex items-center justify-center w-9 h-9 text-[#3A3A3A] hover:text-[#141414] transition-colors duration-300"
              >
                <ShoppingBag size={20} />
                <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-[#E8611E] text-white text-[9px] font-bold flex items-center justify-center rounded-full">
                  0
                </span>
              </button>

              {/* CTA button — only scrolled */}
              <div className={`transition-all duration-500 ${scrolled ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <button
                  className="px-5 h-9 bg-[#E8611E] text-white text-sm font-medium hover:bg-[#C44E14] transition-colors duration-200"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  Tư vấn miễn phí
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Full-screen search overlay */}
      {searchOpen && (
        <div className="fixed inset-0 z-[60] bg-[#141414]/95 backdrop-blur-sm flex flex-col items-center justify-center">
          <button
            onClick={() => setSearchOpen(false)}
            className="absolute top-8 right-8 text-white/60 hover:text-white transition-colors"
          >
            <X size={28} />
          </button>
          <div className="w-full max-w-2xl px-8">
            <p className="text-[#6B6B6B] text-xs tracking-[0.2em] uppercase mb-6" style={{ fontFamily: 'var(--font-body)' }}>
              Tìm kiếm sản phẩm
            </p>
            <div className="relative">
              <Search size={20} className="absolute left-0 top-1/2 -translate-y-1/2 text-[#6B6B6B]" />
              <input
                autoFocus
                type="text"
                placeholder="Sony A7 IV, Canon RF, DJI Mini..."
                className="w-full bg-transparent border-b border-white/20 pb-4 pl-8 text-2xl text-white placeholder-white/20 focus:outline-none focus:border-white/40 transition-colors"
                style={{ fontFamily: 'var(--font-display)' }}
              />
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              {['Sony Alpha', 'Canon EOS R', 'DJI Mini', 'Fujifilm X', 'Ống kính góc rộng'].map(tag => (
                <button
                  key={tag}
                  className="px-4 py-2 border border-white/10 text-white/50 text-sm hover:border-white/30 hover:text-white/80 transition-colors"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
