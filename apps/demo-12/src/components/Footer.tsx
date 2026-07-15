import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer style={{ background: '#1A1A1A', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 64 }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 48, paddingBottom: 48 }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{
                width: 44, height: 44, borderRadius: 12,
                background: 'linear-gradient(135deg, #FF6B00 0%, #FF8A3C 100%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22
              }}>📷</div>
              <div>
                <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: 18, color: '#fff' }}>Máy Ảnh Việt Nam</div>
                <div style={{ fontSize: 12, color: '#999999' }}>Vì lợi ích khách hàng</div>
              </div>
            </div>
            <p style={{ fontSize: 14, color: '#999999', lineHeight: 1.7, marginBottom: 20 }}>
              Chuyên cung cấp máy ảnh, ống kính, flycam, action camera và thiết bị studio chính hãng.
              Hệ thống cửa hàng trải rộng TP.HCM, Cần Thơ, An Giang, Đồng Tháp.
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              {['📘', '🎬', '📱', '▶️'].map((icon, i) => (
                <div key={i} style={{
                  width: 36, height: 36, borderRadius: 8,
                  background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.10)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: 16
                }}>{icon}</div>
              ))}
            </div>
          </div>

          {/* Danh mục */}
          <div>
            <h4 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 14, color: '#fff', marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Danh Mục</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[['Máy Ảnh', '/danh-muc/may-anh'], ['Ống Kính', '/danh-muc/ong-kinh'], ['Flycam', '/danh-muc/flycam'], ['Action Camera', '/danh-muc/action-camera'], ['Thiết Bị Studio', '/danh-muc/studio'], ['Máy Cũ', '/danh-muc/may-cu']].map(([name, href]) => (
                <li key={name}><Link to={href} style={{ color: '#999999', textDecoration: 'none', fontSize: 14, transition: 'color 0.2s' }}
                  onMouseEnter={e => { (e.target as HTMLElement).style.color = '#FF8A3C' }}
                  onMouseLeave={e => { (e.target as HTMLElement).style.color = '#999999' }}>{name}</Link></li>
              ))}
            </ul>
          </div>

          {/* Hỗ trợ */}
          <div>
            <h4 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 14, color: '#fff', marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Hỗ Trợ</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[['Hỏi Đáp FAQ', '/hoi-dap'], ['Chính sách bảo hành', '/chinh-sach/bao-hanh'], ['Chính sách đổi trả', '/chinh-sach/doi-tra'], ['Chính sách vận chuyển', '/chinh-sach/van-chuyen'], ['Trả góp 0%', '/tra-gop'], ['Liên hệ', '/lien-he']].map(([name, href]) => (
                <li key={name}><Link to={href} style={{ color: '#999999', textDecoration: 'none', fontSize: 14 }}
                  onMouseEnter={e => { (e.target as HTMLElement).style.color = '#FF8A3C' }}
                  onMouseLeave={e => { (e.target as HTMLElement).style.color = '#999999' }}>{name}</Link></li>
              ))}
            </ul>
          </div>

          {/* Liên hệ */}
          <div>
            <h4 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 14, color: '#fff', marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Liên Hệ</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { icon: '📞', text: 'Hotline: 1900 1234', sub: '8:00 - 21:00 hàng ngày' },
                { icon: '📍', text: 'TP.HCM - Cần Thơ', sub: 'An Giang - Đồng Tháp' },
                { icon: '✉️', text: 'hotro@mayanhvietnam.com', sub: '' },
              ].map(item => (
                <div key={item.icon} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <span style={{ fontSize: 16, marginTop: 1 }}>{item.icon}</span>
                  <div>
                    <div style={{ fontSize: 13, color: '#CCCCCC' }}>{item.text}</div>
                    {item.sub && <div style={{ fontSize: 12, color: '#999999' }}>{item.sub}</div>}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 20 }}>
              <div style={{ fontSize: 12, color: '#999999', marginBottom: 8 }}>Phương thức thanh toán</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {['VISA', 'MC', 'JCB', 'ATM', 'MoMo', 'PayLater'].map(method => (
                  <span key={method} style={{
                    padding: '3px 8px', borderRadius: 4, fontSize: 10, fontWeight: 700,
                    background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', color: '#CCCCCC'
                  }}>{method}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', padding: '20px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ fontSize: 13, color: '#999999' }}>© 2025 Máy Ảnh Việt Nam. Tất cả quyền được bảo lưu.</p>
          <div style={{ display: 'flex', gap: 20 }}>
            {[['Điều khoản', '/chinh-sach/dieu-khoan'], ['Bảo mật', '/chinh-sach/bao-mat'], ['Sitemap', '/sitemap']].map(([name, href]) => (
              <Link key={name} to={href} style={{ fontSize: 13, color: '#999999', textDecoration: 'none' }}>{name}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}