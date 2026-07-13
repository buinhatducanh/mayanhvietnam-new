import { Link } from 'react-router-dom'

const posts = [
  {
    title: 'Review Sony A7 IV: Máy Ảnh Toàn Năng Cho Nhiếp Ảnh Và Video',
    excerpt: 'Sony Alpha A7 IV vừa ra mắt với cảm biến 33MP mới, bộ xử lý BIONZ XR và khả năng quay 4K 60fps. Hãy cùng khám phá chi tiết những tính năng ấn tượng...',
    category: 'Review',
    date: '15/12/2024',
    readTime: '8 phút',
    author: 'Hoàng Minh',
    image: 'https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-10/230210223540859/avatar/01_may-anh-sony-alpha-a7-mark-iv-body-only-chinh-hang.jpg',
    slug: 'review-sony-a7-iv'
  },
  {
    title: 'Top 5 Flycam Tốt Nhất 2024: Từ Cơ Bản Đến Chuyên Nghiệp',
    excerpt: 'Từ DJI Mini 4 Pro cho người mới đến Mavic 3 Pro cho filmmaker chuyên nghiệp, đây là những lựa chọn flycam đáng tiền nhất năm 2024...',
    category: 'Hướng Dẫn',
    date: '10/12/2024',
    readTime: '12 phút',
    author: 'Trần Phú',
    image: 'https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-08/240808100041911/avatar/638587081597210818_flycam-dji-mavic-air-3-fly-more-combo-dji-rc-n2-hang.jpg',
    slug: 'top-5-flycam-2024'
  },
  {
    title: 'Cách Thiết Lập Phòng Studio Chụp Ảnh Tại Nhà Với Ngân Sách 10 Triệu',
    excerpt: 'Bạn muốn có một phòng studio chụp ảnh chuyên nghiệp tại nhà nhưng lo ngại về chi phí? Bài viết này sẽ hướng dẫn bạn thiết lập studio cơ bản chỉ từ 10 triệu đồng...',
    category: 'Hướng Dẫn',
    date: '05/12/2024',
    readTime: '10 phút',
    author: 'Lê Thuận',
    image: 'https://mayanhvietnam.com/asset/imgs/img/danhMuc_setupPhong.webp',
    slug: 'thiet-lap-studio-tai-nha'
  },
  {
    title: 'Canon R6 Mark II vs Sony A7 IV: Chọn Máy Ảnh Nào Tốt Hơn?',
    excerpt: 'Hai máy ảnh fullframe mirrorless hàng đầu trong tầm giá 50-60 triệu. Chúng tôi so sánh chi tiết hiệu năng, video, pin và ergonomics...',
    category: 'So Sánh',
    date: '01/12/2024',
    readTime: '15 phút',
    author: 'Nguyễn Hùng',
    image: 'https://mayanhvietnam.com/asset/imgs/img/danhMuc_MayAnh.webp',
    slug: 'canon-r6-mark-ii-vs-sony-a7-iv'
  },
  {
    title: 'Hướng Dẫn Chọn Ống Kính Đầu Tiên Cho Máy Ảnh Mirrorless',
    excerpt: 'Mới mua máy ảnh mirrorless nhưng chưa biết chọn ống kính nào phù hợp? Bài viết này giải thích những thông số quan trọng và gợi ý lựa chọn tốt nhất...',
    category: 'Hướng Dẫn',
    date: '25/11/2024',
    readTime: '10 phút',
    author: 'Mai Lan',
    image: 'https://mayanhvietnam.com/asset/imgs/img/danhMuc_ongkinh.webp',
    slug: 'chon-ong-kinh-dau-tien'
  },
  {
    title: 'GoPro HERO12 Black Review: Action Camera Tốt Nhất Cho Phiêu Lưu',
    excerpt: 'GoPro HERO12 Black mang lại HyperSmooth 6.0 cải tiến, quay 5.3K/60fps và thời lượng pin tốt hơn đáng kể so với thế hệ trước...',
    category: 'Review',
    date: '20/11/2024',
    readTime: '7 phút',
    author: 'Việt Anh',
    image: 'https://mayanhvietnam.com/image-data/san-pham/25-01/25-01-02/250102113303811/avatar/638714152413009638_gopro-hero-13-black.jpg',
    slug: 'review-gopro-hero12-black'
  },
]

const categoryColors: Record<string, string> = {
  'Review': 'var(--color-secondary)',
  'Hướng Dẫn': '#10B981',
  'So Sánh': '#0EA5E9',
}

export default function BlogPage() {
  return (
    <div style={{ backgroundColor: 'var(--color-bg)', minHeight: '100vh', padding: '32px 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 24, fontSize: 13, color: 'var(--color-text-soft)' }}>
          <Link to="/" style={{ color: 'var(--color-text-soft)', textDecoration: 'none' }}>Trang chủ</Link>
          <span>/</span>
          <span style={{ color: 'var(--color-accent)' }}>Blog</span>
        </div>

        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <h1 style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 40, fontWeight: 800, color: 'var(--color-text-strong)', marginBottom: 12 }}>Blog Nhiếp Ảnh</h1>
          <p style={{ fontSize: 16, color: 'var(--color-text-soft)' }}>Review, hướng dẫn và tin tức mới nhất về máy ảnh, flycam, thiết bị quay phim</p>
        </div>

        <div style={{ marginBottom: 48, borderRadius: 20, overflow: 'hidden', position: 'relative', minHeight: 360 }}>
          <img src={posts[0].image} alt={posts[0].title} style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(10,22,40,0.95) 50%, rgba(10,22,40,0.2))' }} />
          <div style={{ position: 'relative', padding: 48, maxWidth: 600 }}>
            <span style={{ display: 'inline-block', padding: '4px 12px', borderRadius: 6, fontSize: 11, fontWeight: 700, background: categoryColors[posts[0].category], color: '#fff', marginBottom: 16 }}>
              {posts[0].category}
            </span>
            <h2 style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 28, fontWeight: 800, color: 'var(--color-text-strong)', lineHeight: 1.3, marginBottom: 16 }}>{posts[0].title}</h2>
            <p style={{ fontSize: 15, color: 'var(--color-text-muted)', lineHeight: 1.7, marginBottom: 20 }}>{posts[0].excerpt}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24, fontSize: 13, color: 'var(--color-text-soft)' }}>
              <span>✍️ {posts[0].author}</span>
              <span>📅 {posts[0].date}</span>
              <span>⏱ {posts[0].readTime} đọc</span>
            </div>
            <Link to={`/blog/${posts[0].slug}`} style={{ padding: '12px 28px', borderRadius: 10, textDecoration: 'none', background: 'linear-gradient(135deg, var(--color-secondary), var(--color-accent))', color: '#fff', fontWeight: 700, fontSize: 14 }}>
              Đọc tiếp →
            </Link>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {posts.slice(1).map(post => (
            <Link key={post.slug} to={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
              <div className="transition-smooth" style={{
                background: 'var(--color-card-bg)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, overflow: 'hidden'
              }}
                onMouseEnter={e => { ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(227,30,36,0.3)' }}
                onMouseLeave={e => { ;(e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)' }}
              >
                <div style={{ aspectRatio: '16/9', overflow: 'hidden', background: 'var(--color-bg)' }}>
                  <img src={post.image} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s' }}
                    onMouseEnter={e => (e.target as HTMLElement).style.transform = 'scale(1.05)'}
                    onMouseLeave={e => (e.target as HTMLElement).style.transform = 'scale(1)'}
                  />
                </div>
                <div style={{ padding: '20px' }}>
                  <span style={{ display: 'inline-block', padding: '3px 10px', borderRadius: 4, fontSize: 11, fontWeight: 700, background: categoryColors[post.category] + '20', color: categoryColors[post.category], marginBottom: 10 }}>
                    {post.category}
                  </span>
                  <h3 style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 16, fontWeight: 700, color: 'var(--color-text-strong)', lineHeight: 1.4, marginBottom: 10, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {post.title}
                  </h3>
                  <p style={{ fontSize: 13, color: 'var(--color-text-soft)', lineHeight: 1.6, marginBottom: 14, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {post.excerpt}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 12, color: 'var(--color-text-muted)' }}>
                    <span>{post.author}</span>
                    <span>·</span>
                    <span>{post.date}</span>
                    <span>·</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}