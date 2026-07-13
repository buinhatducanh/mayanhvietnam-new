'use client';

const footerLinks = {
  'Sản Phẩm': [
    'Máy Ảnh Mirrorless', 'Máy Ảnh DSLR', 'Máy Ảnh Compact',
    'Ống Kính', 'Flycam / Drone', 'Phụ Kiện Nhiếp Ảnh',
  ],
  'Dịch Vụ': [
    'Bảo Hành Sửa Chữa', 'Thu Cũ Đổi Mới', 'Cho Thuê Thiết Bị',
    'Trả Góp 0%', 'Giao Hàng Tận Nơi', 'Tư Vấn Chọn Máy',
  ],
  'Hỗ Trợ': [
    'Hướng Dẫn Mua Hàng', 'Chính Sách Đổi Trả', 'Tra Cứu Bảo Hành',
    'FAQ – Câu Hỏi Thường Gặp', 'Liên Hệ Chúng Tôi', 'Khiếu Nại',
  ],
  'Công Ty': [
    'Về CameraVietNam', 'Hệ Thống Cửa Hàng', 'Tuyển Dụng',
    'Blog Nhiếp Ảnh', 'Tin Tức & Sự Kiện', 'Đối Tác',
  ],
};

const stores = [
  { city: 'Hồ Chí Minh', addr: '123 Nguyễn Trãi, Q.1, TP.HCM', tel: '028 3825 xxxx' },
  { city: 'Hà Nội', addr: '456 Cầu Giấy, Q. Cầu Giấy, HN', tel: '024 3826 xxxx' },
  { city: 'Đà Nẵng', addr: '789 Nguyễn Văn Linh, Q. Thanh Khê', tel: '0236 382 xxxx' },
];

export default function Footer() {
  return (
    <footer style={{ background: '#001040', color: '#fff' }}>
      {/* CTA Banner */}
      <div style={{ background: 'linear-gradient(135deg, #003087 0%, #005EB8 100%)', padding: '48px 0' }}>
        <div className="container-xl" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 24 }}>
          <div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', marginBottom: 8 }}>
              Đăng Ký Nhận Ưu Đãi Độc Quyền
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.9375rem' }}>
              Nhận thông báo flash sale, sản phẩm mới và tips nhiếp ảnh hàng tuần.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 0, minWidth: 380, flexShrink: 0 }}>
            <input
              type="email"
              placeholder="Nhập email của bạn..."
              style={{
                flex: 1,
                padding: '14px 18px',
                border: 'none',
                borderRadius: '8px 0 0 8px',
                fontSize: '0.9375rem',
                fontFamily: 'inherit',
                outline: 'none',
                background: 'rgba(255,255,255,0.15)',
                color: '#fff',
                backdropFilter: 'blur(8px)',
              }}
            />
            <button style={{
              background: '#fff',
              color: '#003087',
              border: 'none',
              padding: '14px 24px',
              fontFamily: 'inherit',
              fontSize: '0.9375rem',
              fontWeight: 700,
              borderRadius: '0 8px 8px 0',
              cursor: 'pointer',
              transition: 'background 0.2s',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = '#E8F1FB')}
            onMouseLeave={e => (e.currentTarget.style.background = '#fff')}
            >
              Đăng Ký
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div style={{ padding: '60px 0 40px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="container-xl">
          <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: 60 }}>
            {/* Brand Column */}
            <div>
              {/* Logo */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                <div style={{
                  width: 40, height: 40,
                  background: 'linear-gradient(135deg, #003087, #005EB8)',
                  borderRadius: 8,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <rect x="2" y="6" width="20" height="14" rx="3" stroke="white" strokeWidth="1.8"/>
                    <circle cx="12" cy="13" r="3.5" stroke="white" strokeWidth="1.8"/>
                    <path d="M7 6V5a2 2 0 012-2h2" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
                  </svg>
                </div>
                <div>
                  <div style={{ fontSize: '1.125rem', fontWeight: 900, color: '#fff', lineHeight: 1 }}>Camera</div>
                  <div style={{ fontSize: '0.625rem', fontWeight: 700, color: '#93C5FD', letterSpacing: '0.12em' }}>VIỆT NAM</div>
                </div>
              </div>
              <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, marginBottom: 24 }}>
                Hệ thống phân phối thiết bị nhiếp ảnh chính hãng hàng đầu Việt Nam. Uy tín – Chất lượng – Tận tâm.
              </p>
              {/* Socials */}
              <div style={{ display: 'flex', gap: 12 }}>
                {['f', 'in', 'yt', 'ig'].map(s => (
                  <a key={s} href="#" style={{
                    width: 36, height: 36,
                    borderRadius: 8,
                    background: 'rgba(255,255,255,0.1)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.75rem', fontWeight: 800, color: '#fff',
                    textDecoration: 'none',
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.2)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
                  >
                    {s.toUpperCase()}
                  </a>
                ))}
              </div>

              {/* Stores */}
              <div style={{ marginTop: 28 }}>
                <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 14 }}>Cửa Hàng</div>
                {stores.map(s => (
                  <div key={s.city} style={{ marginBottom: 12 }}>
                    <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#93C5FD' }}>{s.city}</div>
                    <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.5 }}>{s.addr}</div>
                    <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.55)' }}>{s.tel}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Links Columns */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32 }}>
              {Object.entries(footerLinks).map(([heading, links]) => (
                <div key={heading}>
                  <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>
                    {heading}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {links.map(link => (
                      <a key={link} href="#" style={{
                        fontSize: '0.875rem',
                        color: 'rgba(255,255,255,0.65)',
                        textDecoration: 'none',
                        transition: 'color 0.2s',
                      }}
                      onMouseEnter={e => (e.currentTarget.style.color = '#93C5FD')}
                      onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.65)')}
                      >
                        {link}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={{ padding: '20px 0' }}>
        <div className="container-xl" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.45)' }}>
            © 2026 CameraVietNam. GPKD số 0123456789 – Sở KHĐT TP.HCM.
          </div>
          <div style={{ display: 'flex', gap: 20 }}>
            {['Điều Khoản', 'Bảo Mật', 'Cookie'].map(item => (
              <a key={item} href="#" style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.45)', textDecoration: 'none' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#93C5FD')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}
              >
                {item}
              </a>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            {['VISA', 'MC', 'JCB', 'MoMo', 'VNPay'].map(pay => (
              <span key={pay} style={{
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: 4,
                padding: '3px 8px',
                fontSize: '0.625rem',
                fontWeight: 700,
                color: 'rgba(255,255,255,0.6)',
              }}>
                {pay}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
