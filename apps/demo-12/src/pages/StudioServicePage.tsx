import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const packages = [
  {
    name: 'Gói Cơ Bản',
    price: '5.000.000₫',
    icon: '📸',
    highlight: false,
    features: ['1 phông nền giấy (2x6m)', '1 đèn LED 60W Godox', '1 tripod đèn', '1 backdrop stand', 'Lắp đặt 1 ngày', 'Hướng dẫn sử dụng'],
  },
  {
    name: 'Gói Chuyên Nghiệp',
    price: '12.000.000₫',
    icon: '🎬',
    highlight: true,
    features: ['3 phông nền (màu tùy chọn)', '2 đèn LED 60W + 1 softbox', '2 tripod đèn', '2 backdrop stand', 'Phản sáng 5 in 1', 'Lắp đặt 2 ngày', 'Bảo trì 6 tháng'],
  },
  {
    name: 'Gói Studio Trọn Gói',
    price: 'Liên hệ báo giá',
    icon: '🏢',
    highlight: false,
    features: ['Phông nền theo yêu cầu', 'Hệ thống đèn chuyên nghiệp', 'Rail treo phông tự động', 'Cyclorama cong (nếu cần)', 'Tư vấn layout studio', 'Lắp đặt trọn gói', 'Bảo trì 12 tháng'],
  },
]

const faqItems = [
  { q: 'Thời gian lắp đặt bao lâu?', a: 'Gói Cơ Bản: 1 ngày làm việc. Gói Chuyên Nghiệp: 1-2 ngày. Gói Trọn Gói: 3-7 ngày tùy quy mô.' },
  { q: 'Có bảo hành thiết bị không?', a: 'Tất cả thiết bị đều có bảo hành theo nhà sản xuất (12-24 tháng). Riêng dịch vụ lắp đặt bảo trì 6-12 tháng tùy gói.' },
  { q: 'Khu vực phục vụ?', a: 'TP. Hồ Chí Minh, Bình Dương, Đồng Nai, TP. Cần Thơ, An Giang, Đồng Tháp. Các tỉnh khác liên hệ để được tư vấn phụ phí.' },
  { q: 'Diện tích tối thiểu để lắp studio?', a: 'Tối thiểu 12m² cho studio cơ bản (3x4m). Khuyến nghị từ 20m² trở lên để có không gian thoải mái làm việc.' },
]

const projects = [
  {
    image: 'https://mayanhvietnam.com/asset/imgs/img/danhMuc_thietBiStudio.webp',
    title: 'Studio Chụp Sản Phẩm',
    location: 'TP. Hồ Chí Minh',
    category: 'Gói Chuyên Nghiệp'
  },
  {
    image: 'https://mayanhvietnam.com/asset/imgs/img/danhMuc_setupPhong.webp',
    title: 'Phòng Studio Thời Trang',
    location: 'TP. Cần Thơ',
    category: 'Gói Trọn Gói'
  },
  {
    image: 'https://mayanhvietnam.com/asset/imgs/img/danhMuc_MayAnh.webp',
    title: 'Studio Chụp Chân Dung',
    location: 'TP. Hồ Chí Minh',
    category: 'Gói Cơ Bản'
  },
  {
    image: 'https://mayanhvietnam.com/asset/imgs/img/danhMuc_action.webp',
    title: 'Studio Quảng Cáo',
    location: 'Bình Dương',
    category: 'Gói Chuyên Nghiệp'
  },
  {
    image: 'https://mayanhvietnam.com/asset/imgs/img/danhMuc_flycam.webp',
    title: 'Studio 360° Product',
    location: 'TP. Hồ Chí Minh',
    category: 'Gói Trọn Gói'
  },
  {
    image: 'https://mayanhvietnam.com/asset/imgs/img/danhMuc_mayQuayPhim.webp',
    title: 'Studio Chụp Mỹ Thuật',
    location: 'Đồng Nai',
    category: 'Gói Chuyên Nghiệp'
  },
]

const benefits = [
  {
    icon: '🎯',
    title: 'Tư vấn chuyên sâu',
    desc: 'Đội ngũ nhiếp ảnh gia và kỹ thuật viên giàu kinh nghiệm sẽ tư vấn giải pháp tối ưu nhất cho không gian của bạn.'
  },
  {
    icon: '📐',
    title: 'Thiết kế 3D miễn phí',
    desc: 'Nhận bản vẽ 3D chi tiết trước khi thi công, giúp bạn hình dung rõ ràng không gian studio tương lai.'
  },
  {
    icon: '⚡',
    title: 'Lắp đặt nhanh chóng',
    desc: 'Quy trình lắp đặt chuyên nghiệp, đảm bảo hoàn thiện đúng tiến độ với chất lượng tốt nhất.'
  },
  {
    icon: '🔧',
    title: 'Bảo trì trọn đời',
    desc: 'Hỗ trợ bảo trì và sửa chữa trong suốt quá trình sử dụng, đảm bảo studio luôn hoạt động ổn định.'
  },
]

export default function StudioServicePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [currentSlide, setCurrentSlide] = useState(0)
  const heroRef = useRef<HTMLDivElement>(null)
  const processRef = useRef<HTMLDivElement>(null)
  const packagesRef = useRef<HTMLDivElement>(null)
  const galleryRef = useRef<HTMLDivElement>(null)
  const faqRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((s) => (s + 1) % 3)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    gsap.from('.process-step', {
      scrollTrigger: {
        trigger: processRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
      y: 60,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power3.out',
    })

    gsap.from('.package-card', {
      scrollTrigger: {
        trigger: packagesRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
      y: 60,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out',
    })

    gsap.from('.gallery-item', {
      scrollTrigger: {
        trigger: galleryRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out',
    })

    gsap.from('.faq-item', {
      scrollTrigger: {
        trigger: faqRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
      y: 40,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power3.out',
    })
  }, [])

  const heroSlides = [
    {
      image: 'https://mayanhvietnam.com/asset/imgs/img/danhMuc_setupPhong.webp',
      title: 'Studio Chụp Ảnh Chuyên Nghiệp',
      subtitle: 'Tư vấn - Thiết kế - Lắp đặt trọn gói'
    },
    {
      image: 'https://mayanhvietnam.com/asset/imgs/img/danhMuc_thietBiStudio.webp',
      title: 'Giải Pháp Studio Toàn Diện',
      subtitle: 'Phù hợp mọi không gian và ngân sách'
    },
    {
      image: 'https://mayanhvietnam.com/asset/imgs/img/danhMuc_MayAnh.webp',
      title: 'Đối Tác Tin Cậy Của Nhiếp Ảnh Gia',
      subtitle: 'Hơn 150+ dự án studio đã hoàn thành'
    }
  ]

  const slide = heroSlides[currentSlide]

  return (
    <div style={{ backgroundColor: '#FFFFFF', minHeight: '100vh' }}>
      <section ref={heroRef} style={{ position: 'relative', height: '560px', overflow: 'hidden', margin: 0 }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.1, opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
            }}
          >
            <img
              src={slide.image}
              alt="Studio Service"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </motion.div>
        </AnimatePresence>

        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, rgba(11,19,38,0.92) 0%, rgba(27,40,68,0.75) 40%, rgba(45,63,90,0.5) 70%, transparent 100%)',
          zIndex: 1,
        }} />

        <div style={{
          position: 'absolute',
          right: '-5%',
          top: '-10%',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(226,74,80,0.1) 0%, transparent 70%)',
          zIndex: 1,
          pointerEvents: 'none',
        }} />

        <div style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: 1200,
          margin: '0 auto',
          padding: '0 48px',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{ display: 'flex', gap: 8, marginBottom: 20, fontSize: 13, color: 'rgba(255,255,255,0.6)' }}
          >
            <Link to="/" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', transition: 'color 0.3s' }}
              onMouseEnter={e => e.currentTarget.style.color = '#FF8A5B'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}
            >
              Trang chủ
            </Link>
            <span>/</span>
            <span style={{ color: '#FF8A5B' }}>Dịch Vụ Lắp Phông Studio</span>
          </motion.div>

          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            style={{
              display: 'inline-block',
              padding: '5px 16px',
              borderRadius: 20,
              fontSize: 11,
              fontWeight: 700,
              background: 'linear-gradient(45deg, #E24A50 0%, #FF8A5B 100%)',
              color: '#fff',
              marginBottom: 16,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              width: 'fit-content',
            }}
          >
            DỊCH VỤ ĐẶC BIỆT
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            style={{
              fontFamily: 'Plus Jakarta Sans',
              fontSize: 48,
              fontWeight: 800,
              color: '#FFFFFF',
              lineHeight: 1.1,
              marginBottom: 16,
              maxWidth: 600,
              textShadow: '0 4px 20px rgba(0,0,0,0.3)',
            }}
          >
            {slide.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            style={{
              fontSize: 18,
              color: 'rgba(255,255,255,0.85)',
              marginBottom: 32,
              maxWidth: 500,
              lineHeight: 1.6,
            }}
          >
            {slide.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            style={{ display: 'flex', gap: 12 }}
          >
            <a
              href="tel:19001234"
              style={{
                padding: '14px 36px',
                borderRadius: 12,
                textDecoration: 'none',
                background: 'linear-gradient(45deg, #E24A50 0%, #FF8A5B 100%)',
                color: '#fff',
                fontWeight: 700,
                fontSize: 15,
                fontFamily: 'Plus Jakarta Sans',
                boxShadow: '0 8px 24px rgba(226,74,80,0.3)',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 12px 32px rgba(226,74,80,0.4)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(226,74,80,0.3)'
              }}
            >
              📞 Nhận Tư Vấn Miễn Phí
            </a>
            <Link
              to="/lien-he"
              style={{
                padding: '14px 36px',
                borderRadius: 12,
                textDecoration: 'none',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.15)',
                color: '#fff',
                fontWeight: 600,
                fontSize: 15,
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.12)'
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'
              }}
            >
              Gửi yêu cầu
            </Link>
          </motion.div>
        </div>

        <div style={{
          position: 'absolute',
          bottom: 24,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: 8,
          zIndex: 3,
        }}>
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              style={{
                width: i === currentSlide ? 32 : 8,
                height: 8,
                borderRadius: 4,
                background: i === currentSlide
                  ? 'linear-gradient(45deg, #E24A50 0%, #FF8A5B 100%)'
                  : 'rgba(255,255,255,0.25)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
            />
          ))}
        </div>

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            bottom: 64,
            right: 48,
            zIndex: 3,
            color: 'rgba(255,255,255,0.3)',
            fontSize: 20,
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 4,
          }}
          onClick={() => {
            window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })
          }}
        >
          <span style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Cuộn xuống</span>
          <span>↓</span>
        </motion.div>
      </section>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px 64px' }}>
        <section style={{ padding: '64px 0' }}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: 48 }}
          >
            <h2 style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 32, fontWeight: 800, color: '#1A2332', marginBottom: 8 }}>
              Tại Sao Chọn Chúng Tôi?
            </h2>
            <p style={{ color: '#5D6B7F', fontSize: 16 }}>Đội ngũ chuyên nghiệp với hơn 5 năm kinh nghiệm</p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                style={{
                  background: '#F6F8FB',
                  border: '1px solid #E8ECF0',
                  borderRadius: 16,
                  padding: 28,
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                  cursor: 'default',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#E24A50'
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.boxShadow = '0 12px 32px rgba(27,40,68,0.08)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#E8ECF0'
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <div style={{ fontSize: 40, marginBottom: 12 }}>{benefit.icon}</div>
                <h3 style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 16, fontWeight: 700, color: '#1A2332', marginBottom: 8 }}>
                  {benefit.title}
                </h3>
                <p style={{ fontSize: 13, color: '#5D6B7F', lineHeight: 1.6 }}>{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section ref={processRef} style={{ padding: '64px 0', borderTop: '1px solid #E8ECF0', borderBottom: '1px solid #E8ECF0' }}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: 48 }}
          >
            <h2 style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 32, fontWeight: 800, color: '#1A2332', marginBottom: 8 }}>
              Quy Trình Dịch Vụ
            </h2>
            <p style={{ color: '#5D6B7F', fontSize: 16 }}>4 bước đơn giản để có một studio chuyên nghiệp</p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, position: 'relative' }}>
            <div style={{
              position: 'absolute',
              top: 28,
              left: '12%',
              right: '12%',
              height: 2,
              background: 'linear-gradient(to right, #E24A50, #FF8A5B)',
              zIndex: 0,
            }} />
            {[
              { n: '01', title: 'Khảo sát & Tư vấn', desc: 'Đội kỹ thuật đến tận nơi đo đạc, tư vấn layout phù hợp không gian và ngân sách' },
              { n: '02', title: 'Thiết kế Bố Cục', desc: 'Lên bản vẽ 3D, tư vấn vị trí đèn, phông nền tối ưu cho từng loại chụp' },
              { n: '03', title: 'Lắp Đặt Thiết Bị', desc: 'Lắp đặt chuyên nghiệp, cố định chắc chắn, kiểm tra kỹ trước khi bàn giao' },
              { n: '04', title: 'Bàn Giao & Hướng Dẫn', desc: 'Demo thực tế, hướng dẫn vận hành, cung cấp tài liệu kỹ thuật đầy đủ' },
            ].map((step, i) => (
              <div key={i} className="process-step" style={{ textAlign: 'center', padding: '0 20px', position: 'relative', zIndex: 1 }}>
                <div style={{
                  width: 56,
                  height: 56,
                  borderRadius: '50%',
                  background: 'linear-gradient(45deg, #E24A50 0%, #FF8A5B 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                  fontSize: 18,
                  fontWeight: 800,
                  color: '#fff',
                  fontFamily: 'Plus Jakarta Sans',
                  boxShadow: '0 8px 24px rgba(226,74,80,0.3)',
                }}>
                  {step.n}
                </div>
                <h3 style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 16, fontWeight: 700, color: '#1A2332', marginBottom: 8 }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: 13, color: '#5D6B7F', lineHeight: 1.6 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section ref={packagesRef} style={{ padding: '64px 0', borderBottom: '1px solid #E8ECF0' }}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: 48 }}
          >
            <h2 style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 32, fontWeight: 800, color: '#1A2332', marginBottom: 8 }}>
              Các Gói Dịch Vụ
            </h2>
            <p style={{ color: '#5D6B7F', fontSize: 16 }}>Lựa chọn gói phù hợp nhất với nhu cầu của bạn</p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {packages.map((pkg, index) => (
              <motion.div
                key={pkg.name}
                className="package-card"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                style={{
                  background: pkg.highlight ? 'linear-gradient(135deg, rgba(226,74,80,0.06), rgba(255,138,91,0.04))' : '#F6F8FB',
                  border: `1px solid ${pkg.highlight ? 'rgba(226,74,80,0.3)' : '#E8ECF0'}`,
                  borderRadius: 20,
                  padding: 32,
                  position: 'relative',
                  transition: 'all 0.3s ease',
                  cursor: 'default',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px)'
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(27,40,68,0.08)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                {pkg.highlight && (
                  <span style={{
                    position: 'absolute',
                    top: -12,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    padding: '4px 16px',
                    borderRadius: 20,
                    background: 'linear-gradient(45deg, #E24A50 0%, #FF8A5B 100%)',
                    color: '#fff',
                    fontSize: 11,
                    fontWeight: 700,
                    whiteSpace: 'nowrap',
                    boxShadow: '0 4px 12px rgba(226,74,80,0.3)',
                  }}>
                    PHỔ BIẾN NHẤT
                  </span>
                )}
                <div style={{ fontSize: 40, marginBottom: 12 }}>{pkg.icon}</div>
                <h3 style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 20, fontWeight: 800, color: '#1A2332', marginBottom: 6 }}>
                  {pkg.name}
                </h3>
                <div style={{
                  fontSize: 24,
                  fontWeight: 800,
                  color: pkg.price === 'Liên hệ báo giá' ? '#E24A50' : '#FF8A5B',
                  fontFamily: 'Plus Jakarta Sans',
                  marginBottom: 20
                }}>
                  {pkg.price}
                </div>
                <ul style={{ listStyle: 'none', marginBottom: 28 }}>
                  {pkg.features.map(f => (
                    <li key={f} style={{
                      display: 'flex',
                      gap: 8,
                      alignItems: 'flex-start',
                      marginBottom: 8,
                      fontSize: 14,
                      color: '#5D6B7F',
                    }}>
                      <span style={{ color: '#10B981', flexShrink: 0 }}>✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/lien-he"
                  style={{
                    display: 'block',
                    textAlign: 'center',
                    padding: '12px',
                    borderRadius: 10,
                    textDecoration: 'none',
                    background: pkg.highlight
                      ? 'linear-gradient(45deg, #E24A50 0%, #FF8A5B 100%)'
                      : 'transparent',
                    border: pkg.highlight ? 'none' : '1px solid #E24A50',
                    color: pkg.highlight ? '#fff' : '#E24A50',
                    fontWeight: 700,
                    fontSize: 14,
                    fontFamily: 'Plus Jakarta Sans',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    if (!pkg.highlight) {
                      e.currentTarget.style.background = '#E24A50'
                      e.currentTarget.style.color = '#fff'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!pkg.highlight) {
                      e.currentTarget.style.background = 'transparent'
                      e.currentTarget.style.color = '#E24A50'
                    }
                  }}
                >
                  Liên hệ báo giá →
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        <section ref={galleryRef} style={{ padding: '64px 0', borderBottom: '1px solid #E8ECF0' }}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: 48 }}
          >
            <h2 style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 32, fontWeight: 800, color: '#1A2332', marginBottom: 8 }}>
              Dự Án Đã Thực Hiện
            </h2>
            <p style={{ color: '#5D6B7F', fontSize: 16 }}>Hơn 150+ studio đã được chúng tôi lắp đặt</p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {projects.map((project, index) => (
              <motion.div
                key={index}
                className="gallery-item"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
                style={{
                  borderRadius: 16,
                  overflow: 'hidden',
                  position: 'relative',
                  aspectRatio: '4/3',
                  background: '#F6F8FB',
                  cursor: 'pointer',
                }}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.6s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.1)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '20px',
                  background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
                  color: '#fff',
                }}>
                  <div style={{ fontSize: 11, color: '#FF8A5B', fontWeight: 600, marginBottom: 4 }}>
                    {project.category}
                  </div>
                  <div style={{ fontSize: 16, fontWeight: 700, fontFamily: 'Plus Jakarta Sans' }}>
                    {project.title}
                  </div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>
                    📍 {project.location}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section style={{ padding: '64px 0', borderBottom: '1px solid #E8ECF0' }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            style={{
              background: 'linear-gradient(135deg, #0B1326 0%, #1B2844 50%, #2D3F5A 100%)',
              borderRadius: 20,
              padding: '48px 56px',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div style={{
              position: 'absolute',
              inset: 0,
              opacity: 0.05,
              backgroundImage: 'url(https://mayanhvietnam.com/asset/imgs/img/danhMuc_setupPhong.webp)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }} />

            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🎯</div>
              <h2 style={{
                fontFamily: 'Plus Jakarta Sans',
                fontSize: 36,
                fontWeight: 800,
                color: '#fff',
                marginBottom: 12,
              }}>
                Sẵn Sàng Nâng Cấp Studio Của Bạn?
              </h2>
              <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.8)', marginBottom: 28, maxWidth: 500, margin: '0 auto 28px' }}>
                Nhận tư vấn miễn phí và báo giá chi tiết ngay hôm nay
              </p>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                <a
                  href="tel:19001234"
                  style={{
                    padding: '14px 36px',
                    borderRadius: 12,
                    textDecoration: 'none',
                    background: 'linear-gradient(45deg, #E24A50 0%, #FF8A5B 100%)',
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: 15,
                    fontFamily: 'Plus Jakarta Sans',
                    boxShadow: '0 8px 24px rgba(226,74,80,0.3)',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)'
                    e.currentTarget.style.boxShadow = '0 12px 32px rgba(226,74,80,0.4)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(226,74,80,0.3)'
                  }}
                >
                  📞 Gọi Ngay: 1900 1234
                </a>
                <Link
                  to="/lien-he"
                  style={{
                    padding: '14px 36px',
                    borderRadius: 12,
                    textDecoration: 'none',
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    color: '#fff',
                    fontWeight: 600,
                    fontSize: 15,
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.12)'
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'
                  }}
                >
                  Gửi yêu cầu tư vấn
                </Link>
              </div>
            </div>
          </motion.div>
        </section>

        <section ref={faqRef} style={{ padding: '64px 0' }}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: 48 }}
          >
            <h2 style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 32, fontWeight: 800, color: '#1A2332', marginBottom: 8 }}>
              Câu Hỏi Thường Gặp
            </h2>
            <p style={{ color: '#5D6B7F', fontSize: 16 }}>Những thắc mắc phổ biến về dịch vụ lắp đặt studio</p>
          </motion.div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 800, margin: '0 auto' }}>
            {faqItems.map((item, i) => (
              <motion.div
                key={i}
                className="faq-item"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                style={{
                  background: '#F6F8FB',
                  border: `1px solid ${openFaq === i ? 'rgba(226,74,80,0.3)' : '#E8ECF0'}`,
                  borderRadius: 12,
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{
                    width: '100%',
                    padding: '18px 24px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  <span style={{
                    fontSize: 15,
                    fontWeight: 600,
                    color: '#1A2332',
                    fontFamily: 'Plus Jakarta Sans',
                  }}>
                    {item.q}
                  </span>
                  <span style={{
                    fontSize: 24,
                    color: '#E24A50',
                    transform: openFaq === i ? 'rotate(45deg)' : 'rotate(0)',
                    transition: 'transform 0.3s ease',
                    flexShrink: 0,
                  }}>
                    +
                  </span>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      style={{ padding: '0 24px 18px', fontSize: 14, color: '#5D6B7F', lineHeight: 1.7 }}
                    >
                      {item.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}