'use client';

import { useState, useRef, useEffect } from 'react';

interface JournalArticle {
  id: string;
  category: string;
  title: string;
  description: string;
  author: string;
  date: string;
  photoUrl: string;
  articleUrl: string;
}

const articles: JournalArticle[] = [
  {
    id: '1',
    category: 'Triển lãm đang diễn ra',
    title: 'Sắc Màu Di Sản: Hành Trình Qua Lăng Kính Nhiếp Ảnh Thế Hệ Mới',
    description: 'Một cuộc hành trình thị giác đầy chất thơ, tái hiện sinh động những lát cắt văn hóa Việt Nam từ Bắc chí Nam thông qua góc nhìn sáng tạo và phá cách của các nhiếp ảnh gia trẻ tuổi.',
    author: 'Minh Tuấn & Đồng sự',
    date: '15/07 - 30/07/2026',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop',
    articleUrl: '/exhibitions/1',
  },
  {
    id: '2',
    category: 'Workshop Nhiếp ảnh',
    title: 'Ánh Sáng & Khung Hình: Nghệ thuật điều phối ánh sáng tự nhiên',
    description: 'Buổi chia sẻ chuyên sâu về kỹ thuật bắt trọn ánh sáng tự nhiên trong nhiếp ảnh chân dung ngoại cảnh.',
    author: 'Hoàng Lâm',
    date: '22/07/2026',
    photoUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop',
    articleUrl: '/exhibitions/2',
  },
  {
    id: '3',
    category: 'Góc Tạp chí',
    title: 'Săn tìm Kỳ quan: Bình minh trên những rẻo cao Đông Tây Bắc',
    description: 'Kinh nghiệm định vị tọa độ và chuẩn bị thiết bị để chụp khoảnh khắc sương sớm mờ ảo tại Mù Cang Chải.',
    author: 'Khánh An',
    date: 'Số tạp chí 42',
    photoUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop',
    articleUrl: '/exhibitions/3',
  },
  {
    id: '4',
    category: 'Triển lãm sắp diễn ra',
    title: 'Nhịp Sống Phố Thị: Khi truyền thống giao thoa cùng tương lai',
    description: 'Triển lãm ảnh đen trắng đường phố ghi lại những chuyển động tương phản tinh tế của đô thị lớn.',
    author: 'Quốc Hùng',
    date: 'Khai mạc 05/08/2026',
    photoUrl: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=800&auto=format&fit=crop',
    articleUrl: '/exhibitions/4',
  },
];

export default function InspirationGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const heroPhotoRef = useRef<HTMLDivElement>(null);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [photoRect, setPhotoRect] = useState<{ top: number; left: number; width: number; height: number } | null>(null);
  const [windowSize, setWindowSize] = useState({ width: 1200, height: 800 });

  const updateRect = () => {
    if (heroPhotoRef.current && stickyRef.current) {
      const parentRect = stickyRef.current.getBoundingClientRect();
      const childRect = heroPhotoRef.current.getBoundingClientRect();
      setPhotoRect({
        top: childRect.top - parentRect.top,
        left: childRect.left - parentRect.left,
        width: childRect.width,
        height: childRect.height,
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScroll = rect.height - window.innerHeight;
      if (totalScroll <= 0) return;
      
      const currentScroll = -rect.top;
      const progress = Math.max(0, Math.min(0.99, currentScroll / totalScroll));
      setScrollProgress(progress);
    };

    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
      updateRect();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    handleScroll();
    handleResize();
    const timer = setTimeout(updateRect, 150);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
    };
  }, []);

  const featured = articles[0];
  const listArticles = articles.slice(1);

  return (
    <section 
      ref={containerRef} 
      id="inspiration" 
      style={{ 
        height: '240vh', // scroll track for shrink transition
        background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 1) 100%), url("https://images.unsplash.com/photo-1557672172-298e090bd0f1?q=80&w=2560")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        position: 'relative',
        borderTop: '1px solid #f1f5f9',
        overflowX: 'clip', // clip animated overlay without breaking sticky
      }}
    >
      <style>{`
        /* ===  Marquee Strip === */
        .ig-marquee-wrap { overflow: hidden; white-space: nowrap; border-top: 1px solid rgba(0,94,184,0.08); border-bottom: 1px solid rgba(0,94,184,0.08); padding: 8px 0; marginBottom: 24px; }
        .ig-marquee-inner { display: inline-flex; gap: 0; animation: igMarquee 22s linear infinite; }
        .ig-marquee-inner span { font-size: 0.72rem; font-weight: 800; color: rgba(15,23,42,0.12); letter-spacing: 0.12em; text-transform: uppercase; padding: 0 32px; }
        .ig-marquee-inner .dot { color: #005EB8; }
        @keyframes igMarquee { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }

        /* === Art Journal Hover Effects === */
        .journal-link {
          display: inline-flex;
          align-items: center;
          font-weight: 700;
          font-size: 0.88rem;
          color: #005EB8;
          text-decoration: none;
          position: relative;
          padding-bottom: 2px;
          margin-top: 12px;
          transition: color 0.3s;
        }
        .journal-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 1.5px;
          background: #005EB8;
          transform: scaleX(0);
          transform-origin: right;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .journal-link:hover {
          color: #003087;
        }
        .journal-link:hover::after {
          transform: scaleX(1);
          transform-origin: left;
        }

        .journal-item {
          display: flex;
          gap: 20px;
          align-items: center;
          padding: 16px 0;
          border-bottom: 1px solid #f1f5f9;
          transition: all 0.3s ease;
          text-decoration: none;
          cursor: pointer;
        }
        .journal-item:last-child {
          border-bottom: none;
        }
        .journal-item:hover {
          padding-left: 8px;
        }
        .journal-item:hover .journal-item-title {
          color: #005EB8;
        }
        .journal-item:hover .journal-thumb img {
          transform: scale(1.05);
        }
      `}</style>

      {/* Blobs */}
      <div style={{ position:'absolute', top:'10%', left:'-5%', width:500, height:500, borderRadius:'50%', background:'#005EB8', filter:'blur(130px)', opacity:0.03, pointerEvents:'none' }} />
      <div style={{ position:'absolute', bottom:'15%', right:'-5%', width:400, height:400, borderRadius:'50%', background:'#93c5fd', filter:'blur(120px)', opacity:0.02, pointerEvents:'none' }} />

      {/* Sticky viewport frame */}
      <div 
        ref={stickyRef}
        style={{ 
          position: 'sticky', 
          top: 0, 
          height: '100dvh',
          width: '100%', 
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {/* Absolute full-screen to cover image animator */}
        {featured && photoRect && scrollProgress < 0.99 && (
          <div 
            style={{
              position: 'absolute',
              top: photoRect.top * scrollProgress,
              left: photoRect.left * scrollProgress,
              width: windowSize.width - (windowSize.width - photoRect.width) * scrollProgress,
              height: windowSize.height - (windowSize.height - photoRect.height) * scrollProgress,
              borderRadius: 16 * scrollProgress,
              overflow: 'hidden',
              zIndex: 10,
              pointerEvents: 'none',
              boxShadow: '0 20px 50px rgba(0,0,0,0.1)',
              transform: 'translate3d(0,0,0)',
            }}
          >
            <img
              src={featured.photoUrl}
              alt={featured.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
              background: `linear-gradient(to top, rgba(15,23,42,${0.6 * scrollProgress}) 0%, transparent 100%)`,
              zIndex: 1,
            }} />
          </div>
        )}

        <div 
          className="container-xl" 
          style={{ 
            position:'relative', 
            zIndex:2,
            opacity: Math.max(0, Math.min(1, (scrollProgress - 0.15) / 0.8)),
            transform: `translateY(${(1 - scrollProgress) * 15}px)`,
            transition: 'opacity 0.1s ease-out, transform 0.1s ease-out',
            width: '100%'
          }}
        >
          {/* Header */}
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:20, flexWrap:'wrap', gap:20 }}>
            <div>
              <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:6 }}>
                <div style={{ width:32, height:2, background:'#005EB8' }} />
                <span style={{ fontSize:'0.72rem', fontWeight:800, color:'#005EB8', letterSpacing:'0.15em', textTransform:'uppercase' }}>TIN TỨC & TRIỂN LÃM</span>
              </div>
              <h2 style={{ fontSize:'clamp(1.8rem,3vw,2.4rem)', fontWeight:900, color:'#0f172a', letterSpacing:'-0.03em', lineHeight:1.05, margin:0 }}>
                Không Gian<br/>
                <span style={{ color:'#005EB8' }}>Triển Lãm Ảnh</span>{' '}
                <span style={{ color:'rgba(15,23,42,0.4)' }}>&</span>{' '}
                <span style={{ color:'#0f172a' }}>Tạp Chí Nghệ Thuật</span>
              </h2>
            </div>
            <p style={{ maxWidth:360, color:'rgba(15,23,42,0.5)', fontSize:'0.85rem', lineHeight:1.5, margin:0 }}>
              Cập nhật những hoạt động triển lãm ảnh nghệ thuật mới nhất, các buổi workshop chuyên sâu và những bài viết chia sẻ đầy cảm hứng từ cộng đồng.
            </p>
          </div>

          {/* Marquee */}
          <div className="ig-marquee-wrap">
            <div className="ig-marquee-inner">
              {Array.from({ length: 4 }).map((_, i) => (
                <span key={i}>
                  TRIỂN LÃM ẢNH <span className="dot">◆</span> WORKSHOP NHIẾP ẢNH <span className="dot">◆</span> NGHỆ THUẬT THỊ GIÁC <span className="dot">◆</span> KÝ SỰ ẢNH <span className="dot">◆</span> TẠP CHÍ <span className="dot">◆</span>{' '}
                </span>
              ))}
            </div>
          </div>

          {/* Asymmetrical Magazine Spread Layout */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 48, alignItems: 'start' }}>
            
            {/* Left Column: Featured cover exhibition */}
            {featured && (
              <div>
                {/* Photo cover slot */}
                <div 
                  ref={heroPhotoRef}
                  style={{
                    height: 350,
                    borderRadius: 16,
                    overflow: 'hidden',
                    background: '#f8faff',
                    position: 'relative',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.03)',
                  }}
                >
                  <img
                    src={featured.photoUrl}
                    alt={featured.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      opacity: scrollProgress < 0.99 ? 0 : 1,
                      transition: 'opacity 0.4s ease',
                    }}
                  />
                  <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                    background: 'linear-gradient(to top, rgba(15,23,42,0.5) 0%, transparent 100%)',
                    zIndex: 1,
                    pointerEvents: 'none',
                  }} />
                </div>

                {/* Cover info */}
                <div style={{ marginTop: 20 }}>
                  <span style={{
                    fontSize: '0.68rem',
                    fontWeight: 800,
                    color: '#005EB8',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                  }}>
                    {featured.category}
                  </span>
                  
                  <h3 style={{
                    fontSize: '1.75rem',
                    fontWeight: 900,
                    color: '#0f172a',
                    letterSpacing: '-0.02em',
                    lineHeight: 1.15,
                    margin: '8px 0 10px',
                  }}>
                    {featured.title}
                  </h3>

                  <p style={{
                    fontSize: '0.9rem',
                    color: 'rgba(15,23,42,0.6)',
                    lineHeight: 1.55,
                    margin: '0 0 12px',
                  }}>
                    {featured.description}
                  </p>

                  <div style={{
                    fontSize: '0.8rem',
                    color: 'rgba(15,23,42,0.45)',
                  }}>
                    Giám tuyển: <strong style={{ color: '#0f172a' }}>{featured.author}</strong> | Thời gian: <strong style={{ color: '#0f172a' }}>{featured.date}</strong>
                  </div>

                  <a href={featured.articleUrl} className="journal-link">
                    Khám Phá Phòng Triển Lãm
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginLeft: 6 }}>
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </a>
                </div>
              </div>
            )}

            {/* Right Column: Art Journal & Workshop list stack */}
            <div style={{ borderLeft: '1px solid #f1f5f9', paddingLeft: 36 }}>
              <h4 style={{
                fontSize: '0.72rem',
                fontWeight: 800,
                color: 'rgba(15,23,42,0.4)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: 10,
              }}>
                BÀI VIẾT & SỰ KIỆN KHÁC
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {listArticles.map(art => (
                  <a key={art.id} href={art.articleUrl} className="journal-item">
                    {/* Thumbnail image */}
                    <div 
                      className="journal-thumb"
                      style={{
                        width: 120,
                        height: 80,
                        borderRadius: 10,
                        overflow: 'hidden',
                        flexShrink: 0,
                        background: '#f8faff',
                      }}
                    >
                      <img
                        src={art.photoUrl}
                        alt={art.title}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          transition: 'transform 0.4s ease',
                        }}
                      />
                    </div>

                    {/* Article Details */}
                    <div>
                      <span style={{
                        fontSize: '0.625rem',
                        fontWeight: 800,
                        color: '#005EB8',
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                      }}>
                        {art.category}
                      </span>
                      
                      <h5 
                        className="journal-item-title"
                        style={{
                          fontSize: '0.92rem',
                          fontWeight: 700,
                          color: '#0f172a',
                          lineHeight: 1.3,
                          margin: '3px 0 6px',
                          transition: 'color 0.2s',
                          overflow: 'hidden',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                        }}
                      >
                        {art.title}
                      </h5>

                      <div style={{
                        fontSize: '0.72rem',
                        color: 'rgba(15,23,42,0.4)',
                      }}>
                        Tác giả: <strong style={{ color: 'rgba(15,23,42,0.6)' }}>{art.author}</strong> | {art.date}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
