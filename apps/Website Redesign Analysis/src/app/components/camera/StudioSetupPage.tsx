import { useState, useEffect } from 'react'
import { SharedNavbar } from '../homepage/SharedNavbar'
import { Footer } from '../homepage/Footer'
import { useSEO } from '../../hooks/useSEO'
import { ArrowRight, Video, CheckCircle2 } from 'lucide-react'
import { studio } from '../../../../packages/mock-data/src/products/studio'

export function StudioSetupPage({ 
  onNavigate,
  cartCount = 0
}: { 
  onNavigate?: (label: string, id?: string) => void,
  cartCount?: number
}) {
  useSEO(
    'Dịch vụ Setup Studio Trọn Gói | Máy Ảnh Việt Nam',
    'Dịch vụ tư vấn, thiết kế và thi công lắp đặt phòng studio chuyên nghiệp, livestream, podcast, phim trường ảo trọn gói.'
  )

  const topGear = studio.slice(0, 4)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div style={{
      background: '#FAFAF8',
      minHeight: '100vh',
      fontFamily: 'var(--font-body)',
      color: '#141414',
      overflowX: 'hidden',
    }}>
      <SharedNavbar activeItem="Setup studio" onNavigate={onNavigate} cartCount={cartCount} />

      <main style={{ paddingTop: '72px' }}>
        
        {/* ── HERO BANNER ── */}
        <section style={{ height: '85vh', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', background: '#FFFFFF' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 30%, rgba(232, 106, 36, 0.08) 0%, transparent 70%)' }} />
          
          <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', maxWidth: '1000px', padding: '0 4vw' }}>
            <span style={{ color: '#E86A24', fontSize: '13px', fontWeight: 600, letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '32px', display: 'inline-flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ width: '40px', height: '1px', background: '#E86A24' }}></span>
              Giải pháp toàn diện
              <span style={{ width: '40px', height: '1px', background: '#E86A24' }}></span>
            </span>
            <h1 style={{ color: '#141414', fontSize: 'clamp(48px, 6vw, 84px)', fontFamily: 'var(--font-display)', fontWeight: 300, lineHeight: 1.1, marginBottom: '32px', letterSpacing: '-0.03em' }}>
              KIẾN TẠO KHÔNG GIAN <br/> <span style={{ color: '#E86A24', fontStyle: 'italic', paddingRight: '10px' }}>SÁNG TẠO</span>
            </h1>
            <p style={{ color: '#6B6B6B', fontSize: '18px', maxWidth: '600px', margin: '0 auto 48px auto', lineHeight: 1.6, fontWeight: 300 }}>
              Từ phòng livestream cá nhân đến phim trường chuyên nghiệp. Chúng tôi cung cấp giải pháp setup ánh sáng, hình ảnh và âm thanh chuẩn điện ảnh.
            </p>
            <button style={{ 
              background: '#E86A24', color: '#FFF', padding: '18px 48px', borderRadius: '32px', border: 'none', 
              fontSize: '15px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              display: 'inline-flex', alignItems: 'center', gap: '12px',
              boxShadow: '0 8px 32px rgba(232, 106, 36, 0.25)'
            }} className="hover:bg-[#d45d1d] hover:scale-105 hover:shadow-[0_12px_40px_rgba(232,106,36,0.35)]">
              Nhận tư vấn miễn phí <ArrowRight size={18} />
            </button>
          </div>

          <div style={{ position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', opacity: 0.5 }}>
             <div style={{ width: '1px', height: '60px', background: 'linear-gradient(to bottom, transparent, #E86A24)' }}></div>
             <span style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#E86A24', fontWeight: 600 }}>Khám phá</span>
          </div>
        </section>

        {/* ── GIỚI THIỆU / BENTO ── */}
        <section style={{ padding: '120px 4vw', maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '24px', gridAutoRows: 'minmax(300px, auto)' }}>
            
            {/* Box 1 - Text */}
            <div style={{ gridColumn: 'span 5', background: '#FFFFFF', borderRadius: '24px', padding: '64px 48px', display: 'flex', flexDirection: 'column', justifyContent: 'center', border: '1px solid rgba(0,0,0,0.04)', boxShadow: '0 4px 40px rgba(0,0,0,0.02)' }}>
              <h2 style={{ fontSize: '32px', fontFamily: 'var(--font-display)', marginBottom: '24px', fontWeight: 300, lineHeight: 1.2, color: '#141414' }}>
                Làm chủ <br/><span style={{ color: '#E86A24' }}>Ánh Sáng</span>
              </h2>
              <p style={{ color: '#6B6B6B', lineHeight: 1.7, marginBottom: '40px' }}>
                Yếu tố quan trọng nhất của một bức ảnh hay thước phim đẹp chính là ánh sáng. Chúng tôi giúp bạn kiểm soát hoàn toàn hệ thống đèn key, fill, hair và background light.
              </p>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <span style={{ background: '#F5F5F5', padding: '8px 16px', borderRadius: '20px', fontSize: '13px', color: '#6B6B6B' }}>Key Light</span>
                <span style={{ background: '#F5F5F5', padding: '8px 16px', borderRadius: '20px', fontSize: '13px', color: '#6B6B6B' }}>Fill Light</span>
                <span style={{ background: '#F5F5F5', padding: '8px 16px', borderRadius: '20px', fontSize: '13px', color: '#6B6B6B' }}>RGB Accent</span>
              </div>
            </div>

            {/* Box 2 - Image (Ánh sáng) */}
            <div style={{ gridColumn: 'span 7', background: '#FFFFFF', borderRadius: '24px', overflow: 'hidden', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px', transition: 'all 0.5s ease', border: '1px solid rgba(0,0,0,0.04)', boxShadow: '0 4px 40px rgba(0,0,0,0.02)' }} className="group">
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, rgba(232,106,36,0.05) 0%, transparent 70%)' }}></div>
              <img src={studio[0].thumbnail} style={{ width: '70%', height: '70%', objectFit: 'contain', mixBlendMode: 'multiply', zIndex: 1, filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.05))', transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)' }} className="group-hover:scale-110" alt="Ánh sáng" />
              <div style={{ position: 'absolute', bottom: '32px', left: '32px', zIndex: 2 }}>
                <div style={{ color: '#141414', fontWeight: 600, fontSize: '18px' }}>{studio[0].name}</div>
                <div style={{ color: '#6B6B6B', fontSize: '14px' }}>Hệ thống chiếu sáng chuyên nghiệp</div>
              </div>
            </div>

            {/* Box 3 - Image (Phụ kiện) */}
            <div style={{ gridColumn: 'span 7', background: '#FFFFFF', borderRadius: '24px', overflow: 'hidden', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px', transition: 'all 0.5s ease', border: '1px solid rgba(0,0,0,0.04)', boxShadow: '0 4px 40px rgba(0,0,0,0.02)' }} className="group">
              <img src={studio[3].thumbnail} style={{ width: '60%', height: '60%', objectFit: 'contain', mixBlendMode: 'multiply', zIndex: 1, filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.05))', transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)' }} className="group-hover:scale-110" alt="Phụ kiện Studio" />
              <div style={{ position: 'absolute', bottom: '32px', right: '32px', zIndex: 2, textAlign: 'right' }}>
                <div style={{ color: '#141414', fontWeight: 600, fontSize: '18px' }}>Setup Thông Minh</div>
                <div style={{ color: '#6B6B6B', fontSize: '14px' }}>Tối ưu hóa không gian làm việc</div>
              </div>
            </div>

            {/* Box 4 - Services */}
            <div style={{ gridColumn: 'span 5', background: '#E86A24', color: '#FFF', borderRadius: '24px', padding: '64px 48px', display: 'flex', flexDirection: 'column', justifyContent: 'center', boxShadow: '0 12px 40px rgba(232, 106, 36, 0.2)' }}>
              <Video size={32} style={{ marginBottom: '24px', opacity: 0.9 }} />
              <h3 style={{ fontSize: '28px', fontFamily: 'var(--font-display)', marginBottom: '32px', fontWeight: 400 }}>Giải pháp Đa dụng</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '16px' }}><CheckCircle2 size={20} opacity={0.8} /> Phòng Livestream Bán Hàng</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '16px' }}><CheckCircle2 size={20} opacity={0.8} /> Studio Chụp Ảnh Sản Phẩm</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '16px' }}><CheckCircle2 size={20} opacity={0.8} /> Phòng Podcast & Thu Âm</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '16px' }}><CheckCircle2 size={20} opacity={0.8} /> Phim Trường Ảo (Chroma Key)</li>
              </ul>
            </div>

          </div>
        </section>

        {/* ── THIẾT BỊ THỰC TẾ ── */}
        <section style={{ padding: '0 4vw 120px 4vw', maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ marginBottom: '64px' }}>
             <h2 style={{ fontSize: '36px', fontFamily: 'var(--font-display)', fontWeight: 300, marginBottom: '16px', color: '#141414' }}>Hình Ảnh Thực Tế</h2>
             <p style={{ color: '#6B6B6B', fontSize: '16px' }}>Các thiết bị sẵn sàng triển khai setup studio chuyên nghiệp tại cửa hàng Máy Ảnh Việt Nam.</p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '20px', gridAutoRows: 'minmax(280px, auto)' }}>
             {/* Large — Godox AD600BM & DP III */}
             <div style={{ gridColumn: 'span 7', background: '#FFFFFF', borderRadius: '20px', padding: '12px', border: '1px solid rgba(0,0,0,0.04)', boxShadow: '0 4px 40px rgba(0,0,0,0.02)', overflow: 'hidden', position: 'relative' }}>
               <div style={{ width: '100%', height: '100%', borderRadius: '12px', overflow: 'hidden', position: 'relative' }}>
                 <img src="/studio/image1.jpg" alt="Godox AD600BM & DP III V Series" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.8s ease' }} className="hover:scale-105" />
                 <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '24px', background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)' }}>
                   <div style={{ color: '#E86A24', fontSize: '12px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '4px' }}>GODOX</div>
                   <div style={{ color: '#FFF', fontSize: '16px', fontWeight: 500 }}>AD600BM & DP III V Series</div>
                 </div>
               </div>
             </div>

             {/* Medium — Nanlite */}
             <div style={{ gridColumn: 'span 5', background: '#FFFFFF', borderRadius: '20px', padding: '12px', border: '1px solid rgba(0,0,0,0.04)', boxShadow: '0 4px 40px rgba(0,0,0,0.02)', overflow: 'hidden', position: 'relative' }}>
               <div style={{ width: '100%', height: '100%', borderRadius: '12px', overflow: 'hidden', position: 'relative' }}>
                 <img src="/studio/image2.jpg" alt="Nanlite FS-150B & FC-500B" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.8s ease' }} className="hover:scale-105" />
                 <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '24px', background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)' }}>
                   <div style={{ color: '#E86A24', fontSize: '12px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '4px' }}>NANLITE</div>
                   <div style={{ color: '#FFF', fontSize: '16px', fontWeight: 500 }}>FS-150B & FC-500B LED Bi-Color</div>
                 </div>
               </div>
             </div>

             {/* Small — Softbox */}
             <div style={{ gridColumn: 'span 4', background: '#FFFFFF', borderRadius: '20px', padding: '12px', border: '1px solid rgba(0,0,0,0.04)', boxShadow: '0 4px 40px rgba(0,0,0,0.02)', overflow: 'hidden', position: 'relative' }}>
               <div style={{ width: '100%', height: '100%', borderRadius: '12px', overflow: 'hidden', position: 'relative' }}>
                 <img src="/studio/image3.jpg" alt="Godox DP400 II với Softbox" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.8s ease' }} className="hover:scale-105" />
                 <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px', background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)' }}>
                   <div style={{ color: '#FFF', fontSize: '14px', fontWeight: 500 }}>Godox DP400 II + Softbox</div>
                 </div>
               </div>
             </div>

             {/* Small — Umbrella */}
             <div style={{ gridColumn: 'span 4', background: '#FFFFFF', borderRadius: '20px', padding: '12px', border: '1px solid rgba(0,0,0,0.04)', boxShadow: '0 4px 40px rgba(0,0,0,0.02)', overflow: 'hidden', position: 'relative' }}>
               <div style={{ width: '100%', height: '100%', borderRadius: '12px', overflow: 'hidden', position: 'relative' }}>
                 <img src="/studio/image4.jpg" alt="Dù tản sáng Studio" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.8s ease' }} className="hover:scale-105" />
                 <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px', background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)' }}>
                   <div style={{ color: '#FFF', fontSize: '14px', fontWeight: 500 }}>Dù Tản Sáng Studio</div>
                 </div>
               </div>
             </div>

             {/* Small — Light stands */}
             <div style={{ gridColumn: 'span 4', background: '#FFFFFF', borderRadius: '20px', padding: '12px', border: '1px solid rgba(0,0,0,0.04)', boxShadow: '0 4px 40px rgba(0,0,0,0.02)', overflow: 'hidden', position: 'relative' }}>
               <div style={{ width: '100%', height: '100%', borderRadius: '12px', overflow: 'hidden', position: 'relative' }}>
                 <img src="/studio/image5.jpg" alt="Chân đèn Studio" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.8s ease' }} className="hover:scale-105" />
                 <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px', background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)' }}>
                   <div style={{ color: '#FFF', fontSize: '14px', fontWeight: 500 }}>Chân Đèn Chuyên Nghiệp</div>
                 </div>
               </div>
             </div>
          </div>
        </section>

        {/* ── THIẾT BỊ KHUYÊN DÙNG ── */}
        <section style={{ padding: '0 4vw 120px 4vw', maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '64px' }}>
             <div>
               <h2 style={{ fontSize: '36px', fontFamily: 'var(--font-display)', fontWeight: 300, marginBottom: '16px', color: '#141414' }}>Thiết Bị Tiêu Chuẩn</h2>
               <p style={{ color: '#6B6B6B', fontSize: '16px' }}>Những trang thiết bị được chúng tôi tin dùng trong các dự án setup.</p>
             </div>
             <button onClick={() => onNavigate?.('Thiết bị studio')} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'transparent', border: 'none', color: '#E86A24', fontSize: '15px', fontWeight: 600, cursor: 'pointer' }} className="hover:underline">
               Xem tất cả <ArrowRight size={16} />
             </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
             {topGear.map(item => (
                <div key={item.id} onClick={() => onNavigate?.('Product Detail', item.id)} className="group" style={{
                  background: '#FFFFFF', borderRadius: '20px', padding: '32px', cursor: 'pointer', border: '1px solid rgba(0,0,0,0.04)', boxShadow: '0 4px 40px rgba(0,0,0,0.02)', transition: 'all 0.4s ease'
                }}>
                  <div style={{ height: '220px', background: '#FAFAF8', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '32px', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle, rgba(232,106,36,0.05) 0%, transparent 70%)', opacity: 0, transition: 'opacity 0.4s ease' }} className="group-hover:opacity-100"></div>
                    <img src={item.thumbnail} alt={item.name} style={{ width: '75%', height: '75%', objectFit: 'contain', mixBlendMode: 'multiply', transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)' }} className="group-hover:scale-110" />
                  </div>
                  <div style={{ color: '#E86A24', fontSize: '12px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '12px' }}>{item.brand}</div>
                  <h4 style={{ fontSize: '18px', fontWeight: 400, color: '#141414', marginBottom: '16px', lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', fontFamily: 'var(--font-display)' }}>{item.name}</h4>
                  <div style={{ fontSize: '20px', fontWeight: 600, color: '#141414' }}>{item.price.toLocaleString('vi-VN')}đ</div>
                </div>
             ))}
          </div>
        </section>

        {/* ── QUY TRÌNH ── */}
        <section style={{ borderTop: '1px solid rgba(0,0,0,0.04)', borderBottom: '1px solid rgba(0,0,0,0.04)', padding: '120px 4vw', background: '#FFFFFF' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{ textAlign: 'center', fontSize: '32px', fontFamily: 'var(--font-display)', fontWeight: 300, marginBottom: '80px', color: '#141414' }}>Quy Trình Triển Khai</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '40px' }}>
              {[
                { step: '01', title: 'Khảo sát & Tư vấn', desc: 'Khảo sát không gian thực tế, lắng nghe nhu cầu và định mức đầu tư.' },
                { step: '02', title: 'Bản vẽ & Báo giá', desc: 'Thiết kế sơ đồ ánh sáng 3D và gửi danh sách thiết bị chi tiết minh bạch.' },
                { step: '03', title: 'Lắp đặt chuyên nghiệp', desc: 'Thi công hệ thống điện, treo đèn, phông nền và tiêu âm an toàn.' },
                { step: '04', title: 'Bàn giao & Hướng dẫn', desc: 'Nghiệm thu chất lượng ánh sáng, đào tạo vận hành thiết bị bài bản.' },
              ].map((item, idx) => (
                <div key={idx} style={{ position: 'relative', paddingLeft: '24px', borderLeft: '1px solid rgba(0,0,0,0.08)' }}>
                  <div style={{ position: 'absolute', top: 0, left: '-1px', width: '3px', height: '40px', background: '#E86A24' }}></div>
                  <div style={{ fontSize: '14px', color: '#E86A24', fontWeight: 600, letterSpacing: '0.1em', marginBottom: '16px' }}>PHASE {item.step}</div>
                  <h3 style={{ fontSize: '20px', fontWeight: 500, marginBottom: '16px', color: '#141414', fontFamily: 'var(--font-display)' }}>{item.title}</h3>
                  <p style={{ color: '#6B6B6B', lineHeight: 1.6, fontSize: '15px' }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section style={{ padding: '120px 4vw', textAlign: 'center', position: 'relative' }}>
          <div style={{ background: '#E86A24', borderRadius: '32px', padding: '80px 4vw', color: '#FFF', maxWidth: '1000px', margin: '0 auto', boxShadow: '0 20px 48px rgba(232, 106, 36, 0.25)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.15) 0%, transparent 60%)' }} />
            <div style={{ position: 'relative', zIndex: 10 }}>
              <h2 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontFamily: 'var(--font-display)', fontWeight: 300, marginBottom: '24px', lineHeight: 1.2 }}>
                Sẵn sàng nâng cấp <br/>chất lượng hình ảnh của bạn?
              </h2>
              <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.9)', marginBottom: '48px', fontWeight: 300, maxWidth: '600px', margin: '0 auto 48px auto' }}>
                Liên hệ ngay với đội ngũ kỹ thuật viên của Máy Ảnh Việt Nam để nhận giải pháp setup tối ưu nhất cho không gian của bạn.
              </p>
              <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                 <button style={{ 
                   background: '#FFF', color: '#E86A24', padding: '16px 40px', borderRadius: '32px', border: 'none', 
                   fontSize: '15px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.3s ease',
                   boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
                 }} className="hover:bg-[#FAFAF8] hover:scale-105">
                   Gọi tư vấn: 0937.148.222
                 </button>
                 <button style={{ 
                   background: 'transparent', color: '#FFF', padding: '16px 40px', borderRadius: '32px', border: '1px solid rgba(255,255,255,0.4)', 
                   fontSize: '15px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.3s ease'
                 }} className="hover:border-[#FFF] hover:bg-[rgba(255,255,255,0.1)]">
                   Gửi yêu cầu qua Email
                 </button>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  )
}

