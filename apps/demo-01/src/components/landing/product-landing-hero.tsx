'use client';

import { useState } from 'react';
import { ShoppingCart, ChevronDown, RotateCcw, Box, Maximize2, Camera, Film, Focus, Wifi } from 'lucide-react';
import { CameraR6 } from './camera-r6';

const CDN = 'https://mayanhvietnam.com';

const THUMBS = [
  { id: 1, alt: 'Canon R6 Mark II — mặt trước', img: `${CDN}/image-data/san-pham/23-02/23-02-10/230210223748534/avatar/01.jpg` },
  { id: 2, alt: 'Canon EOS R50 Kit', img: `${CDN}/asset/imgs/img/banner_header_sider/canon-r50-trang-den.webp` },
  { id: 3, alt: 'DJI Osmo Pocket 4', img: `${CDN}/asset/imgs/img/banner_header_sider/DJI_Osmo_Pocket_4-v1.webp` },
  { id: 4, alt: 'Insta360 Luna Ultra', img: `${CDN}/asset/imgs/img/banner_header_sider/Luna-pocket.png` },
];

const SPECS = [
  { icon: Camera, label: '24.2MP', desc: 'Cảm biến\nFull-frame' },
  { icon: Film, label: '8K', desc: 'Video 8K\n60fps RAW' },
  { icon: Focus, label: 'AI FOCUS', desc: 'Nhận diện\nthông minh' },
  { icon: Wifi, label: 'Wi-Fi 6', desc: 'Kết nối\nsiêu tốc' },
];

export function ProductLandingHero() {
  const [activeThumb, setActiveThumb] = useState(1);

  return (
    <section className="landing-hero" role="region" aria-label="Sản phẩm nổi bật">

      {/* === LEFT: Thumbnail Strip === */}
      <div className="landing-hero__thumbs" aria-label="Hình ảnh sản phẩm">
        {THUMBS.map((thumb) => (
          <button
            key={thumb.id}
            className={`landing-hero__thumb ${activeThumb === thumb.id ? 'landing-hero__thumb--active' : ''}`}
            onClick={() => setActiveThumb(thumb.id)}
            aria-label={thumb.alt}
            aria-pressed={activeThumb === thumb.id}
          >
            <img
              src={thumb.img}
              alt={thumb.alt}
              width={64}
              height={64}
              loading={thumb.id === 1 ? 'eager' : 'lazy'}
              decoding="async"
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 8 }}
            />
          </button>
        ))}
        <div className="landing-hero__thumb-scroll" aria-hidden="true">
          <ChevronDown size={18} />
        </div>
      </div>

      {/* === CENTER: Product Image + Pedestal === */}
      <div className="landing-hero__product">
        <div className="landing-hero__pedestal">
          <img
            src={`${CDN}/image-data/san-pham/23-02/23-02-10/230210223748534/avatar/01.jpg`}
            alt="Canon EOS R6 Mark II — máy ảnh mirrorless full-frame chuyên nghiệp"
            className="landing-hero__camera-img"
            width={480}
            height={480}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
          />
          <div className="landing-hero__platform" aria-hidden="true" />
        </div>
      </div>

      {/* === RIGHT: Action Sidebar === */}
      <div className="landing-hero__actions" aria-label="Tùy chọn xem sản phẩm">
        <div className="landing-hero__action" role="button" tabIndex={0} aria-label="Xoay 360 độ">
          <div className="landing-hero__action-icon">
            <RotateCcw size={20} />
          </div>
          <span className="landing-hero__action-label">Xoay 360°</span>
        </div>
        <div className="landing-hero__action" role="button" tabIndex={0} aria-label="Xem thực tế bằng AR">
          <div className="landing-hero__action-icon">
            <Maximize2 size={20} />
          </div>
          <span className="landing-hero__action-label">Xem thực tế</span>
        </div>
        <div className="landing-hero__action" role="button" tabIndex={0} aria-label="Xem kích thước sản phẩm">
          <div className="landing-hero__action-icon">
            <Box size={20} />
          </div>
          <span className="landing-hero__action-label">Kích thước</span>
        </div>
      </div>

      {/* === LEFT CONTENT: Product Info === */}
      <div className="landing-hero__content">
        <div className="landing-hero__badge">NEW ARRIVAL</div>

        <h1 className="landing-hero__title">
          Canon EOS<br />R6 Mark II
        </h1>

        <p className="landing-hero__subtitle">
          Hiệu suất định cao. Sáng tạo không giới hạn.
        </p>

        {/* Spec Grid */}
        <div className="landing-hero__specs">
          {SPECS.map((spec) => (
            <div key={spec.label} className="landing-hero__spec">
              <div className="landing-hero__spec-icon">
                <spec.icon size={20} aria-hidden="true" />
              </div>
              <div className="landing-hero__spec-label">{spec.label}</div>
              <div className="landing-hero__spec-desc">{spec.desc}</div>
            </div>
          ))}
        </div>

        {/* Price */}
        <div className="landing-hero__price">46.800.000 VND</div>

        {/* CTA Buttons */}
        <div className="landing-hero__ctas">
          <button className="landing-hero__cta-buy">Mua ngay</button>
          <button className="landing-hero__cta-cart" aria-label="Thêm Canon R6 Mark II vào giỏ hàng">
            <ShoppingCart size={18} aria-hidden="true" />
            Thêm vào giỏ
          </button>
        </div>

        {/* Scroll indicator */}
        <div className="landing-hero__scroll" aria-hidden="true">
          <ChevronDown size={16} />
          <span>Xem thêm bên dưới</span>
        </div>
      </div>
    </section>
  );
}
