import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div style={{ backgroundColor: 'var(--color-bg)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '32px 24px' }}>
      <div style={{ textAlign: 'center', maxWidth: 600 }}>
        {/* 2.5D Camera illustration */}
        <div style={{ marginBottom: 32, position: 'relative', display: 'inline-block' }}>
          <svg width="200" height="160" viewBox="0 0 200 160" style={{ opacity: 0.6 }}>
            <defs>
              <linearGradient id="cam404" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--color-secondary)" />
                <stop offset="100%" stopColor="var(--color-accent)" />
              </linearGradient>
            </defs>
            {/* Camera body isometric */}
            <rect x="40" y="50" width="120" height="80" rx="12" fill="url(#cam404)" opacity="0.7" />
            <rect x="40" y="50" width="120" height="80" rx="12" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
            {/* Lens */}
            <circle cx="100" cy="90" r="28" fill="var(--color-bg)" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
            <circle cx="100" cy="90" r="20" fill="var(--color-card-bg)" />
            <circle cx="100" cy="90" r="12" fill="rgba(255,107,53,0.2)" />
            {/* Shutter */}
            <rect x="55" y="55" width="30" height="12" rx="4" fill="rgba(255,255,255,0.15)" />
            {/* Flash */}
            <rect x="140" y="55" width="14" height="10" rx="3" fill="rgba(245,158,11,0.5)" />
            {/* Question marks floating */}
            <text x="20" y="40" fontSize="24" fill="rgba(227,30,36,0.4)" style={{ animation: 'none' }}>?</text>
            <text x="160" y="35" fontSize="18" fill="rgba(255,107,53,0.3)">?</text>
            <text x="30" y="130" fontSize="16" fill="rgba(227,30,36,0.25)">?</text>
            <text x="155" y="140" fontSize="20" fill="rgba(255,107,53,0.3)">?</text>
          </svg>
        </div>

        <h1 style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 80, fontWeight: 900, lineHeight: 1, marginBottom: 8 }}>
          <span className="gradient-text">404</span>
        </h1>
        <h2 style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 28, fontWeight: 800, color: 'var(--color-text-strong)', marginBottom: 12 }}>
          Trang Không Tìm Thấy
        </h2>
        <p style={{ fontSize: 16, color: 'var(--color-text-soft)', lineHeight: 1.7, marginBottom: 32 }}>
          Trang bạn tìm không tồn tại hoặc đã bị di chuyển.<br />
          Hãy thử tìm kiếm hoặc quay về trang chủ.
        </p>

        {/* Search */}
        <div style={{ position: 'relative', maxWidth: 400, margin: '0 auto 32px' }}>
          <input placeholder="Tìm kiếm sản phẩm..." style={{
            width: '100%', padding: '14px 50px 14px 18px',
            background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: 14, color: '#fff', fontSize: 15, outline: 'none'
          }} />
          <span style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-soft)' }}>🔍</span>
        </div>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginBottom: 40 }}>
          <Link to="/" style={{ padding: '14px 32px', borderRadius: 12, textDecoration: 'none', background: 'linear-gradient(135deg, var(--color-secondary), var(--color-accent))', color: '#fff', fontWeight: 700, fontSize: 15, fontFamily: 'Plus Jakarta Sans' }}>
            🏠 Về trang chủ
          </Link>
          <Link to="/lien-he" style={{ padding: '14px 24px', borderRadius: 12, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.15)', color: 'var(--color-text-strong)', fontSize: 15 }}>
            Liên hệ hỗ trợ
          </Link>
        </div>

        {/* Popular categories */}
        <div>
          <p style={{ fontSize: 13, color: 'var(--color-text-soft)', marginBottom: 12 }}>Danh mục phổ biến:</p>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
            {[['📷 Máy Ảnh', '/danh-muc/may-anh'], ['🚁 Flycam', '/danh-muc/flycam'], ['🎥 Action Camera', '/danh-muc/action-camera'], ['🔭 Ống Kính', '/danh-muc/ong-kinh']].map(([name, href]) => (
              <Link key={name as string} to={href as string} style={{ padding: '8px 16px', borderRadius: 20, textDecoration: 'none', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--color-text-muted)', fontSize: 13 }}>
                {name as string}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
