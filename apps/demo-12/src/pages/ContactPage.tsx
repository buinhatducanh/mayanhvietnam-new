import { Link } from 'react-router-dom'

const branches = [
  { city: 'TP. Hồ Chí Minh', address: '123 Điện Biên Phủ, Phường 15, Quận Bình Thạnh', phone: '028 3899 1234', hours: '8:00 - 21:00' },
  { city: 'TP. Cần Thơ', address: '456 Trần Hưng Đạo, Phường An Nghiệp, Quận Ninh Kiều', phone: '0292 3999 456', hours: '8:00 - 20:30' },
  { city: 'An Giang', address: '789 Trần Hưng Đạo, Phường Mỹ Long, TP. Long Xuyên', phone: '0296 3888 789', hours: '8:00 - 20:00' },
  { city: 'Đồng Tháp', address: '321 Nguyễn Huệ, Phường 1, TP. Cao Lãnh', phone: '0277 3777 321', hours: '8:00 - 20:00' },
]

export default function ContactPage() {
  return (
    <div style={{ backgroundColor: 'var(--color-bg)', minHeight: '100vh', padding: '32px 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 24, fontSize: 13, color: 'var(--color-text-soft)' }}>
          <Link to="/" style={{ color: 'var(--color-text-soft)', textDecoration: 'none' }}>Trang chủ</Link>
          <span>/</span>
          <span style={{ color: 'var(--color-accent)' }}>Liên Hệ</span>
        </div>

        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <h1 style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 40, fontWeight: 800, color: 'var(--color-text-strong)', marginBottom: 12 }}>Liên Hệ Với Chúng Tôi</h1>
          <p style={{ fontSize: 16, color: 'var(--color-text-soft)' }}>Chúng tôi luôn sẵn sàng hỗ trợ bạn 7 ngày/tuần</p>
        </div>

        {/* Quick contact channels */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 48 }}>
          {[
            { icon: '📞', title: 'Hotline', desc: '1900 1234', sub: 'Miễn phí, 8:00 - 21:00' },
            { icon: '💬', title: 'Messenger', desc: 'Máy Ảnh Việt Nam', sub: 'Chat trực tuyến 24/7' },
            { icon: '🔵', title: 'Zalo', desc: '0901 234 567', sub: 'Zalo chat ngay' },
            { icon: '✉️', title: 'Email', desc: 'hotro@mayanhvietnam.com', sub: 'Phản hồi trong 2 giờ' },
          ].map(item => (
            <div key={item.title} style={{
              background: 'var(--color-card-bg)', border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 16, padding: 24, textAlign: 'center', cursor: 'pointer'
            }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(227,30,36,0.3)'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)'}
            >
              <div style={{ fontSize: 36, marginBottom: 10 }}>{item.icon}</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--color-text-strong)', fontFamily: 'Plus Jakarta Sans', marginBottom: 4 }}>{item.title}</div>
              <div style={{ fontSize: 13, color: 'var(--color-accent)', fontWeight: 600, marginBottom: 2 }}>{item.desc}</div>
              <div style={{ fontSize: 12, color: 'var(--color-text-soft)' }}>{item.sub}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, marginBottom: 48 }}>
          {/* Contact form */}
          <div style={{ background: 'var(--color-card-bg)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: 32 }}>
            <h2 style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 22, fontWeight: 700, color: 'var(--color-text-strong)', marginBottom: 24 }}>Gửi Tin Nhắn</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[['Họ và tên *', 'text', ''], ['Số điện thoại *', 'tel', ''], ['Email', 'email', '']].map(([label, type]) => (
                <div key={label as string}>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: 6 }}>{label as string}</label>
                  <input type={type as string} style={{ width: '100%', padding: '12px 14px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 10, color: '#fff', fontSize: 14 }} />
                </div>
              ))}
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: 6 }}>Chủ đề</label>
                <select style={{ width: '100%', padding: '12px 14px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 10, color: '#fff', fontSize: 14 }}>
                  <option>Tư vấn sản phẩm</option>
                  <option>Bảo hành / Sửa chữa</option>
                  <option>Đổi trả hàng</option>
                  <option>Dịch vụ lắp phông studio</option>
                  <option>Khác</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: 6 }}>Nội dung *</label>
                <textarea rows={5} style={{ width: '100%', padding: '12px 14px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 10, color: '#fff', fontSize: 14, resize: 'vertical' }} />
              </div>
              <button style={{ padding: '14px', borderRadius: 12, border: 'none', background: 'linear-gradient(135deg, var(--color-secondary), var(--color-accent))', color: '#fff', fontWeight: 700, fontSize: 15, cursor: 'pointer', fontFamily: 'Plus Jakarta Sans' }}>
                📤 Gửi Tin Nhắn
              </button>
            </div>
          </div>

          {/* Branch list */}
          <div>
            <h2 style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 22, fontWeight: 700, color: 'var(--color-text-strong)', marginBottom: 24 }}>Hệ Thống Cửa Hàng</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {branches.map(b => (
                <div key={b.city} style={{ background: 'var(--color-card-bg)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: 20 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                    <h3 style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 16, fontWeight: 700, color: 'var(--color-text-strong)' }}>📍 {b.city}</h3>
                    <span style={{ padding: '3px 8px', borderRadius: 4, background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)', color: '#10B981', fontSize: 11, fontWeight: 600 }}>Đang mở</span>
                  </div>
                  <p style={{ fontSize: 13, color: 'var(--color-text-muted)', marginBottom: 6 }}>{b.address}</p>
                  <div style={{ display: 'flex', gap: 16, fontSize: 13 }}>
                    <span style={{ color: 'var(--color-accent)' }}>📞 {b.phone}</span>
                    <span style={{ color: 'var(--color-text-soft)' }}>🕐 {b.hours}</span>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/he-thong-cua-hang" style={{ display: 'block', textAlign: 'center', marginTop: 16, padding: '12px', borderRadius: 10, textDecoration: 'none', border: '1px solid rgba(227,30,36,0.3)', color: 'var(--color-secondary)', fontSize: 14, fontWeight: 600 }}>
              Xem trên bản đồ →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
