'use client';

import { useState, useEffect, use } from 'react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';

interface ExhibitionDetail {
  id: string;
  category: string;
  title: string;
  description: string;
  author: string;
  date: string;
  photoUrl: string;
  content: string[];
}

const exhibitionsData: Record<string, ExhibitionDetail> = {
  '1': {
    id: '1',
    category: 'Triển lãm đang diễn ra',
    title: 'Sắc Màu Di Sản: Hành Trình Qua Lăng Kính Nhiếp Ảnh Thế Hệ Mới',
    description: 'Một cuộc hành trình thị giác đầy chất thơ, tái hiện sinh động những lát cắt văn hóa Việt Nam từ Bắc chí Nam thông qua góc nhìn sáng tạo và phá cách của các nhiếp ảnh gia trẻ tuổi.',
    author: 'Minh Tuấn & Đồng sự',
    date: '15/07 - 30/07/2026',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop',
    content: [
      'Triển lãm "Sắc Màu Di Sản" mở ra một không gian nghệ thuật thị giác độc đáo, nơi những giá trị truyền thống Việt Nam được phản chiếu qua lăng kính đương đại đầy màu sắc của thế hệ nhiếp ảnh gia Gen Z và Millennial.',
      'Từ những thửa ruộng bậc thang kỳ vĩ phủ sương sớm tại vùng cao Tây Bắc, đến những góc phố cổ rêu phong trầm mặc dưới cơn mưa rào Hà Nội, hay nhịp sống sông nước miền Tây Nam Bộ tấp nập ghe xuồng khi bình minh lên – tất cả được tái hiện với góc nhìn tươi mới, phá cách nhưng chứa đựng chiều sâu văn hóa tôn kính.',
      'Sử dụng các thiết bị ghi hình thế hệ mới với dải tương phản động cực cao và màu sắc nguyên bản chân thực, các tác phẩm mang đến cho người xem cảm xúc chân thực như đang trực tiếp hiện diện trong khoảnh khắc đó.',
      'Triển lãm mở cửa tự do phục vụ công chúng thưởng lãm từ ngày 15/07 đến hết ngày 30/07/2026 tại Phòng triển lãm Trung tâm Nghệ thuật Đương đại.'
    ]
  },
  '2': {
    id: '2',
    category: 'Workshop Nhiếp ảnh',
    title: 'Ánh Sáng & Khung Hình: Nghệ thuật điều phối ánh sáng tự nhiên',
    description: 'Buổi chia sẻ chuyên sâu về kỹ thuật bắt trọn ánh sáng tự nhiên trong nhiếp ảnh chân dung ngoại cảnh.',
    author: 'Hoàng Lâm',
    date: '22/07/2026',
    photoUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop',
    content: [
      'Ánh sáng tự nhiên là món quà tuyệt vời nhất nhưng cũng là thách thức lớn nhất đối với các nhiếp ảnh gia chân dung. Làm sao để kiểm soát được hướng nắng, độ gắt hay bắt trọn khoảnh khắc "Giờ Vàng" (Golden Hour)?',
      'Workshop "Ánh Sáng & Khung Hình" được dẫn dắt bởi nhiếp ảnh gia Hoàng Lâm với hơn 10 năm kinh nghiệm thực chiến chân dung ngoại cảnh sẽ giúp bạn thấu hiểu và làm chủ nguồn sáng tự nhiên một cách dễ dàng.',
      'Nội dung chính của workshop bao gồm: Cách xác định hướng sáng chính, sử dụng tấm phản sáng và bộ tản sáng mini hiệu quả; Kỹ thuật đo sáng điểm và căn chỉnh khẩu độ/tốc độ tối ưu; Cách giao tiếp, định hướng tư thế và thần thái cho mẫu ảnh trong môi trường ánh sáng phức tạp.',
      'Hãy đăng ký tham gia ngay để nâng tầm tay nghề nhiếp ảnh chân dung của bạn!'
    ]
  }
};

const defaultExhibition: ExhibitionDetail = {
  id: 'generic',
  category: 'Góc Cảm Hứng',
  title: 'Khám Phá Nghệ Thuật Nhiếp Ảnh',
  description: 'Ghi lại những khoảnh khắc tuyệt vời xung quanh cuộc sống thông qua ống kính nghệ thuật.',
  author: 'CameraVietNam Editor',
  date: 'Thường kỳ',
  photoUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop',
  content: [
    'Nhiếp ảnh không chỉ đơn thuần là việc bấm máy ghi lại một hình ảnh vật lý, mà là nghệ thuật kể câu chuyện, lưu giữ cảm xúc và truyền đạt thông điệp nhân văn sâu sắc của người cầm máy.',
    'Hãy cùng CameraVietNam khám phá những góc nhìn sáng tạo mới mẻ mỗi ngày, trang bị cho bản thân những thiết bị chuyên nghiệp nhất để tự tin biến những ý tưởng nghệ thuật bay bổng thành các tác phẩm đời thực ấn tượng.'
  ]
};

export default function ExhibitionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [exhibition, setExhibition] = useState<ExhibitionDetail>(defaultExhibition);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [parallaxY, setParallaxY] = useState(0);

  useEffect(() => {
    if (resolvedParams.id && exhibitionsData[resolvedParams.id]) {
      setExhibition(exhibitionsData[resolvedParams.id]);
    }
    
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${(totalScroll / windowHeight) * 100}`;
      setScrollProgress(Number(scroll));
      setParallaxY(totalScroll * 0.4); // Parallax factor
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [resolvedParams.id]);

  return (
    <>
      <Header />
      {/* Reading Progress Bar */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: 4, background: 'rgba(0,0,0,0.05)', zIndex: 1000 }}>
        <div style={{ width: `${scrollProgress}%`, height: '100%', background: '#005EB8', transition: 'width 0.1s' }}></div>
      </div>
      
      {/* Floating Social Share */}
      <div style={{ position: 'fixed', left: 24, top: '50%', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', gap: 12, zIndex: 100 }}>
        <button style={{ width: 40, height: 40, borderRadius: '50%', background: '#fff', border: '1px solid #E9EDF5', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s' }} onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'} onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#3b5998"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
        </button>
        <button style={{ width: 40, height: 40, borderRadius: '50%', background: '#fff', border: '1px solid #E9EDF5', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s' }} onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'} onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#1da1f2"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
        </button>
        <button style={{ width: 40, height: 40, borderRadius: '50%', background: '#fff', border: '1px solid #E9EDF5', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s' }} onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'} onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6B7A99" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
        </button>
      </div>

      <main style={{ 
        paddingTop: 'var(--demo07-header-offset)',
        minHeight: '100vh',
        background: '#F4F6FA',
      }}>
        {/* Parallax Hero Banner */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: 500, overflow: 'hidden', zIndex: 0 }}>
          <div style={{ 
            width: '100%', height: '120%', 
            backgroundImage: `url(${exhibition.photoUrl})`, 
            backgroundSize: 'cover', backgroundPosition: 'center',
            transform: `translateY(${parallaxY}px)`,
            filter: 'brightness(0.6)'
          }}></div>
        </div>

        <div className="container-xl" style={{ position: 'relative', zIndex: 1, padding: '40px 24px', maxWidth: 840, marginTop: 160 }}>
          
          {/* Breadcrumbs */}
          <div style={{ fontSize: '0.875rem', color: '#6B7A99', marginBottom: 24, display: 'flex', gap: 8 }}>
            <a href="/" style={{ color: '#005EB8', textDecoration: 'none' }}>Trang chủ</a> / 
            <a href="/#inspiration" style={{ color: '#005EB8', textDecoration: 'none' }}>Góc cảm hứng</a> / 
            <span>Chi tiết</span>
          </div>

          <article style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(20px)', borderRadius: 16, padding: 40, border: '1px solid rgba(0,48,135,0.06)', boxShadow: '0 10px 40px rgba(0, 48, 135, 0.04)' }}>
            <span style={{ fontSize: '0.8125rem', fontWeight: 800, color: '#005EB8', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'inline-block', marginBottom: 12 }}>
              {exhibition.category}
            </span>
            <h1 style={{ fontSize: '2.25rem', fontWeight: 800, color: '#1A2444', marginBottom: 16, lineHeight: 1.25 }}>
              {exhibition.title}
            </h1>
            
            {/* Meta */}
            <div style={{ display: 'flex', gap: 16, fontSize: '0.875rem', color: '#6B7A99', marginBottom: 32, borderBottom: '1px solid #E9EDF5', paddingBottom: 16 }}>
              <span>Tác giả: <strong>{exhibition.author}</strong></span>
              <span>•</span>
              <span>Thời gian: <strong>{exhibition.date}</strong></span>
            </div>

            {/* Content Body */}
            <div style={{ fontSize: '1.125rem', lineHeight: 1.85, color: '#2D3748' }}>
              {exhibition.content.map((p, index) => {
                if (index === 0) {
                  return (
                    <p key={index} style={{ marginBottom: 24, fontSize: '1.25rem', color: '#1A2444', fontWeight: 500 }}>
                      <span style={{ float: 'left', fontSize: '4rem', lineHeight: '0.8', paddingTop: 8, paddingRight: 12, fontWeight: 800, color: '#005EB8', fontFamily: 'Georgia, serif' }}>
                        {p.charAt(0)}
                      </span>
                      {p.substring(1)}
                    </p>
                  );
                }
                if (index === 1) {
                  return (
                    <blockquote key={index} style={{ margin: '32px 0', padding: '24px 32px', background: '#F8FAFF', borderLeft: '4px solid #005EB8', fontStyle: 'italic', fontSize: '1.25rem', color: '#003087', borderRadius: '0 12px 12px 0' }}>
                      "{p}"
                    </blockquote>
                  );
                }
                return <p key={index} style={{ marginBottom: 24 }}>{p}</p>;
              })}
            </div>

            {/* Back Button */}
            <div style={{ marginTop: 40, borderTop: '1px solid #E9EDF5', paddingTop: 24, textAlign: 'center' }}>
              <a href="/" style={{ display: 'inline-block', background: '#003087', color: '#fff', textDecoration: 'none', fontWeight: 700, padding: '12px 28px', borderRadius: 8, transition: 'background 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.background = '#005EB8')}
                onMouseLeave={e => (e.currentTarget.style.background = '#003087')}
              >
                Quay Lại Trang Chủ
              </a>
            </div>
          </article>

        </div>
      </main>
      <Footer />
    </>
  );
}
