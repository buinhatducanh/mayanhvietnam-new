'use client';

import { siteContent, stores } from '@mayanhvietnam/mock-data';
import { REAL_ASSETS, REAL_CATEGORIES } from '@/lib/real-products';

export default function Footer() {
  const { hotline, hotlineFull, companyName, companyAddress, taxId,
    footerPolicies, socialLinks } = siteContent;

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
          <div style={{ display: 'flex', minWidth: 380, flexShrink: 0 }}>
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
            }}>
              Đăng Ký
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div style={{ padding: '60px 0 40px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="container-xl">
          <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: 60 }}>
            {/* Brand Column */}
            <div>
              {/* Logo */}
              <a href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 20, textDecoration: 'none' }}>
                <img src={REAL_ASSETS.logoFull} alt="Máy Ảnh Việt Nam" style={{ height: 40, width: 'auto', objectFit: 'contain' }} />
              </a>

              {/* Hotline CTA */}
              <a
                href={`tel:+84${hotlineFull.replace(/-/g, '')}`}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: 8,
                  padding: '10px 14px',
                  marginBottom: 16,
                  textDecoration: 'none',
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#93C5FD" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.63A2 2 0 012 .91h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.09a16 16 0 006.18 6.18l1.45-1.45a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                </svg>
                <div>
                  <div style={{ fontSize: '0.6875rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1 }}>Hotline 24/7</div>
                  <div style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#fff', lineHeight: 1.4 }}>{hotlineFull}</div>
                </div>
              </a>

              {/* Company info */}
              <p style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, marginBottom: 8 }}>
                {companyName}
              </p>
              <p style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, marginBottom: 24 }}>
                {companyAddress}
              </p>

              {/* Socials */}
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 10 }}>Kết nối</div>
              <div style={{ display: 'flex', gap: 8 }}>
                {socialLinks.map((s) => (
                  <a key={s.platform} href={s.url} target="_blank" rel="noopener noreferrer"
                    aria-label={s.platform}
                    style={{
                      width: 34, height: 34,
                      borderRadius: 6,
                      background: 'rgba(255,255,255,0.1)',
                      border: '1px solid rgba(255,255,255,0.12)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      textDecoration: 'none',
                      transition: 'background 0.2s',
                    }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.2)')}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.1)')}
                  >
                    <SocialIcon platform={s.platform} />
                  </a>
                ))}
              </div>

              {/* Stores */}
              <div style={{ marginTop: 28 }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12 }}>Hệ Thống Cửa Hàng</div>
                {stores.slice(0, 3).map((s) => (
                  <div key={s.id} style={{ marginBottom: 12 }}>
                    <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#93C5FD' }}>{s.city}</div>
                    <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.5 }}>{s.address}</div>
                    <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.55)' }}>{s.phone}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Links Columns */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
              {/* Sản phẩm */}
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>Sản Phẩm</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {REAL_CATEGORIES.filter(c => !c.slug.startsWith('san-pham-')).map((cat) => (
                    <a key={cat.slug} href={`/danh-muc/${cat.slug}`} style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.65)', textDecoration: 'none', transition: 'color 0.2s' }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#93C5FD')}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.65)')}
                    >
                      {cat.name}
                    </a>
                  ))}
                </div>
              </div>

              {/* Hỗ trợ */}
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>Hỗ Trợ</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {footerPolicies.map((p) => (
                    <a key={p.link} href={p.link} style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.65)', textDecoration: 'none', transition: 'color 0.2s' }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#93C5FD')}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.65)')}
                    >
                      {p.name}
                    </a>
                  ))}
                  <a href={`tel:+84${hotline.replace(/\./g, '')}`} style={{ fontSize: '0.875rem', color: '#93C5FD', textDecoration: 'none', fontWeight: 600, marginTop: 4 }}>
                    📞 {hotline}
                  </a>
                </div>
              </div>

              {/* Về chúng tôi */}
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>Về Chúng Tôi</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {['Về CameraVietNam', 'Hệ Thống Cửa Hàng', 'Tuyển Dụng', 'Blog Nhiếp Ảnh', 'Tin Tức & Sự Kiện', 'Chương Trình Đại Lý'].map(item => (
                    <a key={item} href="#" style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.65)', textDecoration: 'none', transition: 'color 0.2s' }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#93C5FD')}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.65)')}
                    >
                      {item}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={{ padding: '20px 0' }}>
        <div className="container-xl" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.4)' }}>
            © 2026 {companyName}. GPKD số {taxId}
          </div>
          <div style={{ display: 'flex', gap: 20 }}>
            {['Điều Khoản', 'Bảo Mật', 'Cookie'].map(item => (
              <a key={item} href="#" style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.4)', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#93C5FD')}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.4)')}
              >
                {item}
              </a>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            {REAL_ASSETS.paymentIcons.map((p) => (
              <img key={p.name} src={p.url} alt={p.name} title={p.name}
                style={{ height: 22, width: 'auto', objectFit: 'contain', opacity: 0.7 }} />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ platform }: { platform: string }) {
  const color = '#fff';
  if (platform === 'Facebook') return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill={color}><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
  );
  if (platform === 'YouTube') return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill={color}><path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.5C5.12 20 12 20 12 20s6.88 0 8.59-.5a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#001040"/></svg>
  );
  if (platform === 'TikTok') return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill={color}><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V9.02a8.16 8.16 0 004.77 1.52V7.02a4.85 4.85 0 01-1-.33z"/></svg>
  );
  if (platform === 'Zalo') return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill={color}><circle cx="12" cy="12" r="10" fill="none" stroke={color} strokeWidth="2"/><text x="12" y="16" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#001040">Z</text></svg>
  );
  return null;
}
