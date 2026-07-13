import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FloatingCTA } from '@/components/layout/FloatingCTA';
import { blogPosts } from '@/data/misc';
import styles from './BlogList.module.css';

export const metadata: Metadata = {
  title: 'Blog Kiến Thức & Tin Tức Nhiếp Ảnh | Máy Ảnh Việt Nam',
  description: 'Chia sẻ kiến thức, hướng dẫn chọn máy ảnh, ống kính, kỹ thuật chụp ảnh portrait, landscape và review thiết bị mới nhất.',
};

export default function BlogListPage() {
  return (
    <>
      <Header />
      <main>
        <div className={styles.wrap}>
          <div className="container">
            <div className={styles.hero}>
              <h1 className={styles.title}>Blog Kiến Thức & Review Nhiếp Ảnh</h1>
              <p className={styles.subtitle}>
                Nơi tổng hợp các bài đánh giá máy ảnh chuyên sâu, so sánh ống kính và kỹ thuật chụp ảnh từ các nhiếp ảnh gia chuyên nghiệp.
              </p>
            </div>

            <div className={styles.grid}>
              {blogPosts.map(post => (
                <Link key={post.id} href={`/blog/${post.slug}`} className={styles.card}>
                  <div className={styles.img_wrap}>
                    <img src={post.thumbnail} alt={post.title} className={styles.img} />
                    <span className={styles.category_badge}>{post.category}</span>
                  </div>
                  <div className={styles.content}>
                    <h2 className={styles.card_title}>{post.title}</h2>
                    <p className={styles.excerpt}>{post.excerpt}</p>
                    <div className={styles.footer}>
                      <span>✍️ {post.author}</span>
                      <span>📅 {new Date(post.date).toLocaleDateString('vi-VN')} · 🕒 {post.readTime} phút đọc</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}
