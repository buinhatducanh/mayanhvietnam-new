'use client';

import { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const articles = [
  { id: 1, title: 'Đánh giá chi tiết Sony A7 IV: Kẻ thừa kế hoàn hảo', category: 'Review', date: '10 Tháng 7, 2026', img: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=800', height: 400 },
  { id: 2, title: 'Top 5 ống kính chân dung tốt nhất cho hệ máy Canon RF', category: 'Kinh nghiệm', date: '08 Tháng 7, 2026', img: 'https://images.unsplash.com/photo-1588607142435-081e6cbcc206?auto=format&fit=crop&q=80&w=800', height: 300 },
  { id: 3, title: 'Hướng dẫn chụp ảnh phong cảnh phơi sáng lâu (Long Exposure)', category: 'Hướng dẫn', date: '05 Tháng 7, 2026', img: 'https://images.unsplash.com/photo-1542037104857-ffbb0b9155fb?auto=format&fit=crop&q=80&w=800', height: 450 },
  { id: 4, title: 'Nikon Z8 ra mắt: Cú hích mạnh mẽ vào thị trường máy ảnh cao cấp', category: 'Tin tức', date: '02 Tháng 7, 2026', img: 'https://images.unsplash.com/photo-1542567455-cd733f23fbb1?auto=format&fit=crop&q=80&w=800', height: 320 },
  { id: 5, title: 'Cách bảo quản máy ảnh trong mùa mưa ẩm', category: 'Mẹo vặt', date: '28 Tháng 6, 2026', img: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&q=80&w=800', height: 380 },
  { id: 6, title: 'Fujifilm X100VI: Có đáng mua với mức giá đắt đỏ?', category: 'Review', date: '20 Tháng 6, 2026', img: 'https://images.unsplash.com/photo-1516961642265-531546e84af2?auto=format&fit=crop&q=80&w=800', height: 300 },
];

export default function BlogPage() {
  const [hoveredArticle, setHoveredArticle] = useState<number | null>(null);

  return (
    <>
      <Header />
      <main style={{ 
        paddingTop: 100, 
        minHeight: '100vh',
        background: '#FAFCFF',
      }}>
        {/* Banner */}
        <div style={{ padding: '60px 24px', textAlign: 'center', background: '#fff', borderBottom: '1px solid #E9EDF5' }}>
          <div style={{ color: '#005EB8', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>Camera VN Blog</div>
          <h1 style={{ fontSize: '3.5rem', fontWeight: 800, color: '#1A2444', letterSpacing: '-0.03em', marginBottom: 16 }}>Tin Tức & Kinh Nghiệm</h1>
          <p style={{ fontSize: '1.2rem', color: '#6B7A99', maxWidth: 600, margin: '0 auto' }}>Cập nhật những xu hướng nhiếp ảnh mới nhất, bài đánh giá thiết bị và các mẹo chụp ảnh hữu ích.</p>
        </div>

        <div className="container-xl" style={{ padding: '60px 24px' }}>
          
          <div style={{ columnCount: 3, columnGap: '24px', animation: 'fadeInUp 0.8s ease' }}>
            {articles.map((article, idx) => (
              <div key={article.id} 
                onMouseEnter={() => setHoveredArticle(article.id)}
                onMouseLeave={() => setHoveredArticle(null)}
                style={{ 
                  breakInside: 'avoid', 
                  marginBottom: 24, 
                  background: '#fff', 
                  borderRadius: 16, 
                  overflow: 'hidden',
                  cursor: 'pointer',
                  border: '1px solid #E9EDF5',
                  transition: 'all 0.3s ease',
                  transform: hoveredArticle === article.id ? 'translateY(-6px)' : 'translateY(0)',
                  boxShadow: hoveredArticle === article.id ? '0 12px 30px rgba(0,48,135,0.08)' : '0 4px 12px rgba(0,0,0,0.02)'
                }}
              >
                <div style={{ height: article.height, position: 'relative', overflow: 'hidden' }}>
                  <div style={{ 
                    position: 'absolute', inset: 0, 
                    backgroundImage: `url(${article.img})`, 
                    backgroundSize: 'cover', backgroundPosition: 'center',
                    transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                    transform: hoveredArticle === article.id ? 'scale(1.05)' : 'scale(1)'
                  }} />
                  <div style={{ position: 'absolute', top: 16, left: 16, background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(4px)', padding: '6px 12px', borderRadius: 20, fontSize: '0.8rem', fontWeight: 700, color: '#003087' }}>
                    {article.category}
                  </div>
                </div>

                <div style={{ padding: 24 }}>
                  <div style={{ fontSize: '0.85rem', color: '#A8B3C9', marginBottom: 12 }}>{article.date}</div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: hoveredArticle === article.id ? '#003087' : '#1A2444', transition: 'color 0.2s', lineHeight: 1.4 }}>
                    {article.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          <style>{`
            @media (max-width: 1024px) { div[style*="columnCount: 3"] { column-count: 2 !important; } }
            @media (max-width: 640px) { div[style*="columnCount: 3"] { column-count: 1 !important; } }
          `}</style>
        </div>
      </main>
      <Footer />
    </>
  );
}
