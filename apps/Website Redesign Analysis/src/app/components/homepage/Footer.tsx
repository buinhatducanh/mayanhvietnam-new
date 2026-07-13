import {
  siteContent,
  footerPolicies,
  paymentIcons,
  socialLinks,
  stores,
  HOTLINE,
  HOTLINE_FULL,
  SITE_EMAIL,
  COMPANY_NAME,
  COMPANY_ADDRESS,
  TAX_ID,
} from '../../../../packages/mock-data/src'

// ─── SVG Icons ───────────────────────────────────────────────────────────────

function YouTubeIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  )
}

function TikTokIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34v-7a8.16 8.16 0 0 0 4.77 1.52V6.4a4.85 4.85 0 0 1-1-.29z" />
    </svg>
  )
}

function FacebookIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  )
}

function ZaloIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="currentColor">
      <path d="M24 4C12.954 4 4 12.954 4 24s8.954 20 20 20 20-8.954 20-20S35.046 4 24 4zm-2.2 27.8h-2.4l6.2-9.4h-5.4v-2h8.6l-6.2 9.4h5.6v2h-6.4zm-5.8-3.2c-1.6 0-2.8-1.2-2.8-2.8s1.2-2.8 2.8-2.8 2.8 1.2 2.8 2.8-1.2 2.8-2.8 2.8zm0-3.6c-.4 0-.8.4-.8.8s.4.8.8.8.8-.4.8-.8-.4-.8-.8-.8zm16 3.6c-1.6 0-2.8-1.2-2.8-2.8s1.2-2.8 2.8-2.8 2.8 1.2 2.8 2.8-1.2 2.8-2.8 2.8zm0-3.6c-.4 0-.8.4-.8.8s.4.8.8.8.8-.4.8-.8-.4-.8-.8-.8z"/>
    </svg>
  )
}

function PhoneIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}

function MapPinIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

function GlobeIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  )
}

function MailIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  )
}

function PhoneCallIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15.05 5A5 5 0 0 1 19 8.95M15.05 1A9 9 0 0 1 23 8.94m-1 7.98v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}

// ─── Social icon mapper ──────────────────────────────────────────────────────
const SOCIAL_ICON_MAP: Record<string, React.FC<{ size?: number }>> = {
  YouTube: YouTubeIcon,
  TikTok: TikTokIcon,
  Facebook: FacebookIcon,
  Zalo: ZaloIcon,
}

// ─── Styles ──────────────────────────────────────────────────────────────────
const S = {
  footer: {
    background: '#1a1a1a',
    color: '#c8c8c8',
    fontFamily: "'Inter', 'Segoe UI', Arial, sans-serif",
    fontSize: '13px',
    lineHeight: '1.7',
  } as React.CSSProperties,

  container: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '48px 32px 36px',
  } as React.CSSProperties,

  grid: {
    display: 'grid',
    gridTemplateColumns: '280px 180px 240px 1fr',
    gap: '40px',
  } as React.CSSProperties,

  heading: {
    color: '#ffffff',
    fontSize: '15px',
    fontWeight: 600,
    marginBottom: '18px',
    letterSpacing: '0.01em',
  } as React.CSSProperties,

  link: {
    color: '#b0b0b0',
    textDecoration: 'none',
    display: 'block',
    padding: '3px 0',
    fontSize: '13px',
    transition: 'color 0.2s ease',
    cursor: 'pointer',
  } as React.CSSProperties,

  socialBtn: {
    width: '36px',
    height: '36px',
    borderRadius: '6px',
    background: '#2a2a2a',
    border: '1px solid #3a3a3a',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#c8c8c8',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    textDecoration: 'none',
  } as React.CSSProperties,

  paymentIcon: {
    height: '28px',
    width: '44px',
    objectFit: 'contain' as const,
    background: '#f0f0f0',
    borderRadius: '4px',
    padding: '3px 5px',
  } as React.CSSProperties,

  bottomBar: {
    borderTop: '1px solid #2a2a2a',
    background: '#141414',
    color: '#888',
    fontSize: '11.5px',
    lineHeight: '1.8',
  } as React.CSSProperties,

  bottomContainer: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '20px 32px',
    textAlign: 'center' as const,
  } as React.CSSProperties,

  storeItem: {
    display: 'flex',
    gap: '8px',
    marginBottom: '12px',
    fontSize: '12.5px',
    lineHeight: '1.6',
    color: '#b0b0b0',
  } as React.CSSProperties,

  contactRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '14px',
    color: '#b0b0b0',
    fontSize: '13px',
  } as React.CSSProperties,

  contactIcon: {
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    background: '#2a2a2a',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#E86A24',
    flexShrink: 0,
  } as React.CSSProperties,
}

// ─── Footer component ────────────────────────────────────────────────────────

export function Footer() {
  return (
    <footer style={S.footer} id="footer-main">
      {/* ── Main content ── */}
      <div style={S.container}>
        <div style={S.grid}>

          {/* ═══ COL 1: Brand + Social + Payments ═══ */}
          <div>
            {/* Logo */}
            <div style={{ marginBottom: '20px' }}>
              <img src="https://mayanhvietnam.com/asset/imgs/img/Logo_white.png" alt="Máy Ảnh Việt Nam" style={{ height: '46px', objectFit: 'contain' }} />
            </div>

            {/* Description */}
            <p style={{ color: '#999', fontSize: '12.5px', lineHeight: '1.75', marginBottom: '20px' }}>
              Máy Ảnh Việt Nam là đơn vị tiên phong trong lĩnh vực phân phối và
              bán lẻ các sản phẩm máy ảnh tại thị trường Việt Nam.
            </p>

            {/* Social icons */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '28px', flexWrap: 'wrap' }}>
              {socialLinks.map(({ platform, url }) => {
                const Icon = SOCIAL_ICON_MAP[platform]
                return Icon ? (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={platform}
                    style={S.socialBtn}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#E86A24'
                      e.currentTarget.style.borderColor = '#E86A24'
                      e.currentTarget.style.color = '#fff'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = '#2a2a2a'
                      e.currentTarget.style.borderColor = '#3a3a3a'
                      e.currentTarget.style.color = '#c8c8c8'
                    }}
                  >
                    <Icon size={17} />
                  </a>
                ) : null
              })}
              {/* Phone icon */}
              <a
                href={`tel:${HOTLINE}`}
                aria-label="Hotline"
                style={S.socialBtn}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#E86A24'
                  e.currentTarget.style.borderColor = '#E86A24'
                  e.currentTarget.style.color = '#fff'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#2a2a2a'
                  e.currentTarget.style.borderColor = '#3a3a3a'
                  e.currentTarget.style.color = '#c8c8c8'
                }}
              >
                <PhoneIcon size={17} />
              </a>
            </div>

            {/* Payment methods heading */}
            <div style={{
              color: '#ffffff', fontSize: '13px', fontWeight: 600,
              marginBottom: '14px', textTransform: 'uppercase' as const,
              letterSpacing: '0.05em',
            }}>
              Phương thức thanh toán
            </div>

            {/* Payment icons */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
              {paymentIcons.map(({ name, url }) => (
                <img
                  key={name}
                  src={url}
                  alt={name}
                  title={name}
                  style={S.paymentIcon}
                  onError={(e) => {
                    // Fallback: show name text if icon fails to load
                    const target = e.currentTarget
                    target.style.display = 'none'
                    const span = document.createElement('span')
                    span.textContent = name
                    span.style.cssText = 'display:inline-flex;align-items:center;justify-content:center;height:28px;padding:0 8px;background:#2a2a2a;border-radius:4px;color:#999;font-size:10px;border:1px solid #3a3a3a;'
                    target.parentNode?.insertBefore(span, target.nextSibling)
                  }}
                />
              ))}
            </div>

            {/* Bộ Công Thương badge */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 14px',
              background: '#222',
              borderRadius: '6px',
              border: '1px solid #333',
            }}>
              <div style={{
                width: '24px', height: '24px',
                background: '#E86A24', borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '12px', color: '#fff', fontWeight: 700,
              }}>
                ✓
              </div>
              <div>
                <div style={{ color: '#fff', fontSize: '10px', fontWeight: 600, lineHeight: 1.3 }}>
                  ĐÃ THÔNG BÁO
                </div>
                <div style={{ color: '#888', fontSize: '9px', lineHeight: 1.3 }}>
                  BỘ CÔNG THƯƠNG
                </div>
              </div>
            </div>
          </div>

          {/* ═══ COL 2: Chính sách ═══ */}
          <div>
            <h3 style={S.heading}>Chính sách</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {footerPolicies.map(({ name, link }) => (
                <a
                  key={name}
                  href={link}
                  style={S.link}
                  onMouseEnter={(e) => { e.currentTarget.style.color = '#E86A24' }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = '#b0b0b0' }}
                >
                  {name}
                </a>
              ))}
            </div>
          </div>

          {/* ═══ COL 3: Thông tin liên hệ ═══ */}
          <div>
            <h3 style={S.heading}>Thông tin liên hệ</h3>

            {/* Fanpage */}
            <div style={S.contactRow}>
              <div style={S.contactIcon}>
                <GlobeIcon size={14} />
              </div>
              <div>
                <span style={{ fontWeight: 600, color: '#ddd' }}>Fanpage: </span>
                <a
                  href={socialLinks.find(s => s.platform === 'Facebook')?.url || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#b0b0b0', textDecoration: 'none' }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = '#E86A24' }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = '#b0b0b0' }}
                >
                  Máy Ảnh Việt Nam
                </a>
              </div>
            </div>

            {/* Hotline */}
            <div style={S.contactRow}>
              <div style={S.contactIcon}>
                <PhoneCallIcon size={14} />
              </div>
              <div>
                <span style={{ fontWeight: 600, color: '#ddd' }}>Hotline: </span>
                <a
                  href={`tel:${HOTLINE_FULL.replace(/[.\s-]/g, '')}`}
                  style={{ color: '#E86A24', textDecoration: 'none', fontWeight: 600 }}
                >
                  {HOTLINE_FULL}
                </a>
                <span style={{ color: '#888' }}> | </span>
                <a
                  href={`tel:${HOTLINE.replace(/[.\s-]/g, '')}`}
                  style={{ color: '#E86A24', textDecoration: 'none', fontWeight: 600 }}
                >
                  {HOTLINE}
                </a>
              </div>
            </div>

            {/* Email */}
            <div style={S.contactRow}>
              <div style={S.contactIcon}>
                <MailIcon size={14} />
              </div>
              <div>
                <span style={{ fontWeight: 600, color: '#ddd' }}>Email: </span>
                <a
                  href={`mailto:${SITE_EMAIL}`}
                  style={{ color: '#b0b0b0', textDecoration: 'none' }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = '#E86A24' }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = '#b0b0b0' }}
                >
                  {SITE_EMAIL}
                </a>
              </div>
            </div>
          </div>

          {/* ═══ COL 4: Hệ thống cửa hàng ═══ */}
          <div>
            <h3 style={S.heading}>Hệ thống cửa hàng</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {stores.map((store) => (
                <div key={store.id} style={S.storeItem}>
                  <div style={{ color: '#E86A24', flexShrink: 0, marginTop: '2px' }}>
                    <MapPinIcon size={14} />
                  </div>
                  <div>
                    <span style={{ fontWeight: 600, color: '#ddd' }}>
                      Khu vực {store.city}:
                    </span>{' '}
                    <span style={{ color: '#999' }}>
                      {store.address} ({store.hours})
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div style={S.bottomBar}>
        <div style={S.bottomContainer}>
          {/* Company info line */}
          <p style={{ color: '#999', fontSize: '11px', lineHeight: '1.9', marginBottom: '4px' }}>
            © 2022 {COMPANY_NAME} 🔵
          </p>
          <p style={{ color: '#777', fontSize: '10.5px', lineHeight: '1.8', marginBottom: '2px' }}>
            • Địa chỉ: {COMPANY_ADDRESS}. Mã số thuế: {TAX_ID}
          </p>
          <p style={{ color: '#777', fontSize: '10.5px', lineHeight: '1.8', marginBottom: '2px' }}>
            • GPĐKD số: {TAX_ID}. Đơn vị cấp: Sở Kế hoạch và Đầu Tư TP.HCM, cấp ngày 09 tháng 09 năm 2024.
          </p>
          <p style={{ color: '#777', fontSize: '10.5px', lineHeight: '1.8', marginBottom: '2px' }}>
            • GP số: 0313859872-002. Xem tại cổng: Sở Kế hoạch và Đầu Tư TP.HCM, cấp ngày 09 tháng 06 năm 2024.
          </p>
          <p style={{ color: '#777', fontSize: '10.5px', lineHeight: '1.8', marginBottom: '12px' }}>
            • Điện thoại: {HOTLINE}. Email: {SITE_EMAIL} - Chịu trách nhiệm nội dung: Nguyễn Hồng Chương.
          </p>

          {/* Navigation links */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '28px',
            flexWrap: 'wrap',
            borderTop: '1px solid #2a2a2a',
            paddingTop: '14px',
          }}>
            {[
              'Trang chủ',
              'Sản phẩm',
              'Setup phòng studio',
              'Chính sách bảo hành',
              'Liên hệ',
            ].map((item) => (
              <a
                key={item}
                href="#"
                style={{
                  color: '#999',
                  textDecoration: 'none',
                  fontSize: '12px',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#E86A24' }}
                onMouseLeave={(e) => { e.currentTarget.style.color = '#999' }}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
