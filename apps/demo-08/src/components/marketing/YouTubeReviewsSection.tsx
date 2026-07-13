'use client';

import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './YouTubeReviewsSection.module.css';

// Video IDs thật từ kênh YouTube Máy Ảnh Việt Nam (bê y chang từ demo-05)
const VIDEOS = [
  { id: 'z9hJFwVLS4A', title: 'X-H2S' },
  { id: 'BIUttXDonuo', title: 'CHỊ KHÁCH XINH GHÉ SHOP TIỀN GIANG CHỐT NGAY CANON R50' },
  { id: 'jz42ostc6K8', title: 'CẦM 200 TRIỆU ĐI MUA MÁY ẢNH LÀ CẢM' },
  { id: 'i5wmKTdzJHo', title: 'NAY KHÁCH GHÉ SHOP - CHỐT LUÔN LUMIX S5 II & ĐẬP HỘP TẠI CHỖ' },
  { id: 'xdoZXGbUQJE', title: 'KASE 85MM F/1.4 RF' },
  { id: 'v2oxxlfzsBM', title: 'R50' },
];

// YouTube play icon SVG — giống chính xác mayanhvietnam.com / demo-05
function YouTubePlayIcon() {
  return (
    <svg fill="none" height="30" viewBox="0 0 87 115" width="30">
      <path
        clipRule="evenodd"
        d="M83.99 10.81C90.08 21.24 86.62 34.66 76.26 40.79L69.05 45.06L74.17 47.38C81.58 50.74 86.52 57.99 86.96 66.17C87.40 74.34 83.27 82.09 76.26 86.24L32.76 111.97C22.41 118.10 9.08 114.61 3.00 104.18C-3.08 93.75 .37 80.33 10.73 74.20L17.94 69.93L12.82 67.61C5.41 64.25 .47 57.00 .03 48.82C-0.40 40.65 3.72 32.90 10.73 28.75L54.23 3.02C64.58 -3.10 77.91 .38 83.99 10.81Z"
        fill="#f00"
        fillRule="evenodd"
      />
      <path
        clipRule="evenodd"
        d="M33 74L33 41L61 57.5L33 74Z"
        fill="white"
        fillRule="evenodd"
      />
    </svg>
  );
}

// Arrow icon — giống mayanhvietnam.com / demo-05
function ArrowIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
      <path
        d="M9.71069 18.2929C10.1012 18.6834 10.7344 18.6834 11.1249 18.2929L16.0123 13.4006C16.7927 12.6195 16.7924 11.3537 16.0117 10.5729L11.1213 5.68254C10.7308 5.29202 10.0976 5.29202 9.70708 5.68254C9.31655 6.07307 9.31655 6.70623 9.70708 7.09676L13.8927 11.2824C14.2833 11.6729 14.2833 12.3061 13.8927 12.6966L9.71069 16.8787C9.32016 17.2692 9.32016 17.9023 9.71069 18.2929Z"
        fill="#ff6a00"
      />
    </svg>
  );
}

export function YouTubeReviewsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: number) => {
    if (!scrollRef.current) return;
    const w = scrollRef.current.offsetWidth;
    scrollRef.current.scrollBy({ left: dir * w * 0.65, behavior: 'smooth' });
  };

  return (
    <section className={styles.section} aria-label="Reviews Sản Phẩm">
      <div className="container">
        <div className={styles.header}>
          <div className={styles.title_wrap}>
            <YouTubePlayIcon />
            <h2 className={styles.title}>REVIEWS SẢN PHẨM</h2>
          </div>
          <a
            href="https://www.youtube.com/@mayanhvietnam"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.view_channel}
          >
            <span>Xem youtube</span>
            <ArrowIcon />
          </a>
        </div>

        <div className={styles.carousel_wrap}>
          <button
            type="button"
            onClick={() => scroll(-1)}
            className={[styles.nav_btn, styles.nav_prev].join(' ')}
            aria-label="Video trước"
          >
            <ChevronLeft size={22} />
          </button>

          <div ref={scrollRef} className={styles.scroll_container}>
            {VIDEOS.map((v) => (
              <div key={v.id} className={styles.video_card}>
                <iframe
                  src={`https://www.youtube.com/embed/${v.id}?vq=hd1080&rel=0`}
                  title={v.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                  className={styles.iframe}
                />
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => scroll(1)}
            className={[styles.nav_btn, styles.nav_next].join(' ')}
            aria-label="Video tiếp theo"
          >
            <ChevronRight size={22} />
          </button>
        </div>
      </div>
    </section>
  );
}
