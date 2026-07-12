import { useEffect, useRef, useState } from 'react'
import { ShieldCheck, Users, MapPin, Wrench, CreditCard, ArrowRight } from 'lucide-react'

const PILLARS = [
  {
    icon: ShieldCheck,
    headline: 'Đại lý ủy quyền trực tiếp',
    sub: 'Không qua trung gian',
    body: 'Hóa đơn VAT chính hãng. Tem VINA đầy đủ. Bạn có thể verify serial number trực tiếp với nhà sản xuất.',
    detail: 'Sony · Canon · Nikon · DJI · Fujifilm · Godox',
  },
  {
    icon: Users,
    headline: 'Nhân viên là nhiếp ảnh gia',
    sub: 'Không phải nhân viên bán hàng',
    body: 'Đội ngũ dùng chính thiết bị họ tư vấn bạn mua. Họ biết sự khác biệt thực sự giữa các dòng máy.',
    detail: 'Tư vấn miễn phí trước khi mua',
  },
  {
    icon: MapPin,
    headline: 'Thử trước, quyết định sau',
    sub: 'Tại 4 showroom toàn quốc',
    body: 'Đặt lịch cầm thử bất kỳ thiết bị trước khi mua. Không camera store nào ở Việt Nam làm điều này tốt hơn.',
    detail: 'Hà Nội · TP.HCM · Đà Nẵng · Cần Thơ',
  },
  {
    icon: Wrench,
    headline: 'Bảo hành tại cửa hàng',
    sub: 'Không cần gửi đi đâu',
    body: 'Sửa chữa, bảo hành, hiệu chỉnh ngay tại 4 cửa hàng. Không mất thời gian. Không lo lắng.',
    detail: '24 tháng bảo hành chính hãng',
  },
  {
    icon: CreditCard,
    headline: 'Thanh toán linh hoạt',
    sub: 'Mua cách nào cũng dễ',
    body: 'Trả góp 0% lên đến 24 tháng, ví điện tử, chuyển khoản ngân hàng, COD toàn quốc.',
    detail: 'VNPay · MoMo · ZaloPay',
  },
]

export function WhyChooseUs() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="bg-white"
      style={{ paddingTop: '0', paddingBottom: '96px' }}
    >
      {/* Orange header strip — matches FeaturedProducts treatment */}
      <div className="bg-[#141414] mb-12">
        <div className="mx-auto px-12" style={{ maxWidth: '1320px' }}>
          <div className="flex items-center justify-between py-5">
            <div>
              <p
                className="text-white/50 text-[10px] tracking-[0.2em] uppercase mb-0.5"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                Vì sao chọn chúng tôi
              </p>
              <h2
                className="text-white"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(20px, 2.2vw, 28px)',
                  fontWeight: 800,
                  letterSpacing: '-0.02em',
                }}
              >
                Những điều <span className="text-[#E8611E]">chỉ chúng tôi</span> mang lại
              </h2>
            </div>
            <button
              className="flex items-center gap-2 text-white/70 text-sm font-medium group hover:text-white transition-colors"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              <span className="border-b border-white/30 pb-px group-hover:border-white">
                Tìm hiểu thêm
              </span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto px-12" style={{ maxWidth: '1320px' }}>
        {/* 5 pillars */}
        <div className="grid grid-cols-5 gap-5">
          {PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon
            return (
              <div
                key={idx}
                className={`group flex flex-col gap-4 bg-white p-6 border border-[#EBEBEB] hover:border-[#E8611E] hover:shadow-md transition-all duration-300 cursor-default ${
                  visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
                style={{ transitionDelay: `${idx * 60}ms` }}
              >
                {/* Icon — always orange, energetic */}
                <div className="w-12 h-12 bg-[#E8611E] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Icon size={22} className="text-white" strokeWidth={1.8} />
                </div>

                {/* Text */}
                <div className="flex flex-col gap-0.5">
                  <h3
                    className="text-[#141414] leading-tight"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '15px',
                      fontWeight: 700,
                    }}
                  >
                    {pillar.headline}
                  </h3>
                  <p
                    className="text-[#E8611E] text-xs font-semibold"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    {pillar.sub}
                  </p>
                </div>

                <p
                  className="text-[#6B6B6B] text-sm leading-[1.7] flex-1"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {pillar.body}
                </p>

                {/* Detail tag */}
                <div className="border-t border-[#EBEBEB] pt-3">
                  <p
                    className="text-[#8C8C8C] text-[11px]"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    {pillar.detail}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
