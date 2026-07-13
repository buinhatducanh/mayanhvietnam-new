import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FloatingCTA } from '@/components/layout/FloatingCTA';
import { blogPosts } from '@/data/misc';
import styles from './BlogDetail.module.css';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map(post => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find(p => p.slug === slug);
  if (!post) return { title: 'Không tìm thấy bài viết' };

  return {
    title: `${post.title} | Blog Máy Ảnh Việt Nam`,
    description: post.excerpt,
    alternates: { canonical: `https://mayanhvietnam.com/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.thumbnail],
    },
  };
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find(p => p.slug === slug);
  if (!post) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: post.title,
            description: post.excerpt,
            image: post.thumbnail,
            author: { '@type': 'Person', name: post.author },
            datePublished: post.date,
            publisher: {
              '@type': 'Organization',
              name: 'Máy Ảnh Việt Nam',
              logo: { '@type': 'ImageObject', url: 'https://mayanhvietnam.com/logo.png' },
            },
          }),
        }}
      />

      <Header />
      <main>
        <div className={styles.wrap}>
          <div className="container">
            <article className={styles.article}>
              <nav className={styles.breadcrumb}>
                <Link href="/">Trang chủ</Link>
                <span>›</span>
                <Link href="/blog">Blog</Link>
                <span>›</span>
                <span>{post.category}</span>
              </nav>

              <h1 className={styles.title}>{post.title}</h1>

              <div className={styles.meta_row}>
                <span className={styles.badge}>{post.category}</span>
                <span>✍️ {post.author}</span>
                <span>📅 {new Date(post.date).toLocaleDateString('vi-VN')}</span>
                <span>🕒 {post.readTime} phút đọc</span>
                <span>👁️ {post.views.toLocaleString('vi-VN')} lượt xem</span>
              </div>

              <img src={post.thumbnail} alt={post.title} className={styles.hero_img} />

              <div className={styles.body}>
                <p><strong>{post.excerpt}</strong></p>
                <p>
                  Trong những năm qua, nhiếp ảnh mirrorless ngày càng bùng nổ mạnh mẽ. Sự phát triển của cảm biến, vi xử lý và hệ thống lấy nét AI đã giúp người dùng dễ dàng nắm bắt được khoảnh khắc sắc nét trong mọi điều kiện ánh sáng.
                </p>
                <h2>1. Đánh giá chất lượng hình ảnh & cảm biến</h2>
                <p>
                  Cảm biến thế hệ mới cho phép tái tạo màu sắc trung thực, đặc biệt là tông màu da người luôn mịn màng, ấm áp. Khả năng khử nhiễu (ISO noise reduction) vượt trội ngay cả ở mức ISO 6400 hay 12800.
                </p>
                <h2>2. Hệ thống lấy nét tự động thông minh (AI Autofocus)</h2>
                <p>
                  Khả năng bám đuổi chủ thể như mắt người, động vật (chó, mèo, chim), xe cộ giúp bạn không bỏ lỡ bất kỳ khung hình hành động nào, dù là quay phim hay chụp ảnh tốc độ cao.
                </p>
                <h2>3. Lời khuyên chọn mua thiết bị</h2>
                <p>
                  Nếu bạn là người mới bắt đầu hoặc đam mê nhiếp ảnh bán chuyên, đây chắc chắn là khoản đầu tư vô cùng xứng đáng để bắt đầu hành trình sáng tạo hình ảnh.
                </p>

                <div className={styles.cta_box}>
                  <h3>Bạn Đang Cần Tư Vấn Bộ Máy Ảnh Phù Hợp Nhất?</h3>
                  <p>Hãy đến trực tiếp 4 showroom Máy Ảnh Việt Nam hoặc liên hệ hotline để nhận ưu đãi hấp dẫn ngay hôm nay!</p>
                  <Link href="/danh-muc/may-anh" className={styles.cta_btn}>
                    Xem Bảng Giá Máy Ảnh Chính Hãng →
                  </Link>
                </div>
              </div>
            </article>
          </div>
        </div>
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}
