import { useEffect, useRef, useState } from 'react'
import { MapPin, Clock, Phone, ArrowRight, ExternalLink } from 'lucide-react'

// Store photography — camera display showcase (white bg per brief, NOT dark)
const STORE_IMG = 'https://images.unsplash.com/photo-1719936447627-3b8bc40c2cee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1400'

const STORES = [
  {
    id: 'hn-cau-giay',
    city: 'Hà Nội',
    name: 'Chi nhánh Cầu Giấy',
    address: '123 Trần Duy Hưng, Cầu Giấy, Hà Nội',
    hours: 'T2–T7: 9:00–20:00 · CN: 9:00–18:00',
    phone: '024 3200 1234',
    tag: 'Flagship',
  },
  {
    id: 'hn-hk',
    city: 'Hà Nội',
    name: 'Chi nhánh Hoàn Kiếm',
    address: '45 Hàng Bài, Hoàn Kiếm, Hà Nội',
    hours: 'T2–CN: 9:00–21:00',
    phone: '024 3200 5678',
    tag: null,
  },
  {
    id: 'hcm',
    city: 'TP. Hồ Chí Minh',
    name: 'Chi nhánh Quận 3',
    address: '88 Võ Văn Tần, Q.3, TP. Hồ Chí Minh',
    hours: 'T2–CN: 9:00–21:00',
    phone: '028 3500 4321',
    tag: null,
  },
  {
    id: 'dn',
    city: 'Đà Nẵng',
    name: 'Chi nhánh Đà Nẵng',
    address: '27 Trần Phú, Hải Châu, Đà Nẵng',
    hours: 'T2–T7: 9:00–20:00 · CN: 9:00–18:00',
    phone: '0236 3200 9999',
    tag: 'Mới mở',
  },
]

export function PhysicalPresence() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="bg-white"
      style={{ paddingTop: '96px', paddingBottom: '96px' }}
    >
      <div className="mx-auto px-12" style={{ maxWidth: '1320px' }}>

        {/* Section header */}
        <div
          className={`mb-12 transition-all duration-600 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-[3px] bg-[#E8611E]" />
            <p
              className="text-[#E8611E] text-[11px] tracking-[0.22em] uppercase font-semibold"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              4 Showroom toàn quốc
            </p>
          </div>
          <div className="flex items-end justify-between">
            <h2
              className="text-[#141414]"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(28px, 3vw, 44px)',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                maxWidth: '520px',
              }}
            >
              Trải nghiệm trực tiếp tại cửa hàng
            </h2>
            <button
              className="flex items-center gap-2 text-[#3A3A3A] text-sm font-medium group"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              <span className="border-b border-[#D4D4D4] pb-px group-hover:border-[#E8611E] group-hover:text-[#E8611E] transition-colors">
                Đặt lịch tư vấn miễn phí
              </span>
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Layout: 7/12 store image LEFT + 5/12 location grid RIGHT */}
        <div className="flex gap-10 items-start">

          {/* Store photography — 7/12 */}
          <div
            className={`overflow-hidden flex-shrink-0 transition-all duration-800 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ flex: '7', transitionDelay: '80ms' }}
          >
            <div className="relative aspect-[4/3] overflow-hidden group">
              <img
                src={STORE_IMG}
                alt="Không gian showroom Máy Ảnh Việt Nam"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
              {/* Light overlay at bottom for legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

              {/* Store label overlay */}
              <div className="absolute bottom-6 left-6">
                <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2.5">
                  <div className="w-2 h-2 bg-[#E8611E] rounded-full" />
                  <span
                    className="text-[#141414] text-sm font-semibold"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    Showroom Cầu Giấy — Hà Nội
                  </span>
                </div>
              </div>
            </div>

            {/* Store invitation copy below image */}
            <p
              className="mt-5 text-[#3A3A3A] leading-relaxed"
              style={{ fontFamily: 'var(--font-body)', fontSize: '15px', maxWidth: '480px' }}
            >
              Đến showroom để cầm thử thiết bị, được tư vấn trực tiếp từ nhiếp ảnh gia — và quyết định mua khi bạn thực sự sẵn sàng.
            </p>

            <div className="flex items-center gap-4 mt-6">
              <button
                className="flex items-center gap-2 px-7 h-11 bg-[#E8611E] text-white text-sm font-semibold hover:bg-[#C44E14] transition-colors duration-200"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                Tìm showroom gần nhất
              </button>
              <button
                className="px-7 h-11 border-2 border-[#141414] text-[#141414] text-sm font-semibold hover:bg-[#141414] hover:text-white transition-colors duration-200"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                Đặt lịch tư vấn
              </button>
            </div>
          </div>

          {/* 4 Location cards — 5/12 */}
          <div
            className={`flex flex-col gap-3 transition-all duration-800 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ flex: '5', transitionDelay: '160ms' }}
          >
            {STORES.map((store) => (
              <div
                key={store.id}
                className="border border-[#EBEBEB] p-5 hover:border-[#E8611E]/40 transition-colors duration-300 group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <p
                        className="text-[#E8611E] text-xs font-semibold tracking-wider uppercase"
                        style={{ fontFamily: 'var(--font-body)' }}
                      >
                        {store.city}
                      </p>
                      {store.tag && (
                        <span
                          className="px-2 py-0.5 bg-[#E8611E] text-white text-[9px] font-bold tracking-wider uppercase"
                          style={{ fontFamily: 'var(--font-body)' }}
                        >
                          {store.tag}
                        </span>
                      )}
                    </div>
                    <h4
                      className="text-[#141414] leading-tight"
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '15px',
                        fontWeight: 700,
                      }}
                    >
                      {store.name}
                    </h4>
                  </div>
                  <a
                    href="#"
                    className="flex items-center gap-1 text-[#8C8C8C] text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    Bản đồ
                    <ExternalLink size={11} />
                  </a>
                </div>

                <div className="flex flex-col gap-1.5">
                  <div className="flex items-start gap-2">
                    <MapPin size={12} className="text-[#8C8C8C] mt-0.5 flex-shrink-0" />
                    <p
                      className="text-[#6B6B6B] text-sm leading-snug"
                      style={{ fontFamily: 'var(--font-body)' }}
                    >
                      {store.address}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={12} className="text-[#8C8C8C] flex-shrink-0" />
                    <p
                      className="text-[#6B6B6B] text-xs"
                      style={{ fontFamily: 'var(--font-body)' }}
                    >
                      {store.hours}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={12} className="text-[#8C8C8C] flex-shrink-0" />
                    <a
                      href={`tel:${store.phone}`}
                      className="text-[#3A3A3A] text-xs hover:text-[#E8611E] transition-colors"
                      style={{ fontFamily: 'var(--font-mono-brand)' }}
                    >
                      {store.phone}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
