'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, ChevronDown, Sparkles, Star, Zap, Shield, Truck, ArrowRight } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import { getProductBySlug } from '@/lib/mock-data';
import { LANDING_PAGE_IMAGES } from '@/lib/image-constants';

const CANON_R6_SLUG = 'canon-eos-r6-mark-ii-body-only';

const KEY_FEATURES = [
  {
    icon: '📸',
    title: '24.2MP Full-Frame',
    desc: 'Cảm biến CMOS Full-Frame thế hệ mới, xử lý hình ảnh đỉnh cao cả trong điều kiện thiếu sáng.',
  },
  {
    icon: '🎬',
    title: '8K RAW Video',
    desc: 'Quay video 8K 60fps RAW nội bộ + 4K 120fps cho slow-motion cinema.',
  },
  {
    icon: '🤖',
    title: 'AI Focus Dual Pixel',
    desc: 'Tự động lấy nét thông minh nhận diện mắt, khuôn mặt, động vật — lock đối tượng chính xác tuyệt đối.',
  },
  {
    icon: '⚡',
    title: '30fps Burst',
    desc: 'Chụp liên tục 30fps với AF/AE tracking — không bỏ lỡ bất kỳ khoảnh khắc nào.',
  },
  {
    icon: '🛡️',
    title: 'IBIS 8-stop',
    desc: 'Ổn định hình ảnh 8 stops — chụp手持rảnh tay siêu mượt.',
  },
  {
    icon: '🔋',
    title: 'Pin LP-E6P',
    desc: 'Thời lượng pin cải tiến 630 shot/charge — quay phim cả ngày không lo hết pin.',
  },
];

const COMPARISON = [
  { label: 'Độ phân giải', newVal: '24.2MP', oldVal: '20.1MP', diff: '+21%' },
  { label: 'Burst rate', newVal: '40fps', oldVal: '20fps', diff: '+100%' },
  { label: 'Video max', newVal: '8K 60fps', oldVal: '4K 60fps', diff: '8K' },
  { label: 'IBIS', newVal: '8 stops', oldVal: '8 stops', diff: '=' },
  { label: 'Pin', newVal: '630 shot', oldVal: '580 shot', diff: '+9%' },
  { label: 'Trọng lượng', newVal: '670g', oldVal: '738g', diff: '-9%' },
];

export function ProductLandingHero() {
  const { addItem } = useCart();
  const product = getProductBySlug(CANON_R6_SLUG);
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowScroll(true), 2500);
    return () => clearTimeout(t);
  }, []);

  const mainImage = product?.images?.[0]?.url ?? product?.thumbnail;

  return (
    <div className="landing-page">
      {/* === SECTION 1: CINEMATIC HERO === */}
      <section className="landing-hero-v2">
        {/* Ambient gradient background */}
        <div className="landing-hero-v2__bg" aria-hidden="true" />
        <div className="landing-hero-v2__orb landing-hero-v2__orb--1" aria-hidden="true" />
        <div className="landing-hero-v2__orb landing-hero-v2__orb--2" aria-hidden="true" />

        <div className="landing-hero-v2__inner">
          {/* Top badge */}
          <div className="landing-hero-v2__badge">
            <Sparkles size={14} />
            <span>Canon · Mirrorless · Flagship</span>
          </div>

          {/* Headline */}
          <h1 className="landing-hero-v2__title">
            Canon EOS<br />
            R6 Mark II
          </h1>

          <p className="landing-hero-v2__subtitle">
            Thế hệ mirrorless chuyên nghiệp mới nhất.<br />
            Hiệu suất đỉnh cao. Sáng tạo không giới hạn.
          </p>

          {/* Rating */}
          <div className="landing-hero-v2__rating">
            <div className="flex gap-0.5">
              {[1,2,3,4,5].map(i => (
                <Star key={i} className="h-4 w-4 fill-primary text-primary" />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              4.9/5 · {product?.rating?.count ?? 312} đánh giá · 50+ video review
            </span>
          </div>

          {/* Product image — centered */}
          <div className="landing-hero-v2__image-wrap">
            <div className="landing-hero-v2__pedestal-glow" aria-hidden="true" />
            {mainImage && (
              <Image
                src={mainImage}
                alt="Canon EOS R6 Mark II"
                width={560}
                height={560}
                priority
                className="landing-hero-v2__image"
              />
            )}
          </div>

          {/* CTA */}
          <div className="landing-hero-v2__cta-row">
            <a
              href="#features"
              className="landing-hero-v2__cta-primary"
            >
              Khám phá công nghệ
              <ArrowRight size={16} />
            </a>
            <button
              onClick={() => product && addItem(product)}
              className="landing-hero-v2__cta-secondary"
            >
              <ShoppingCart size={16} />
              Thêm vào giỏ
            </button>
          </div>

          {/* Scroll hint */}
          <div className={`landing-hero-v2__scroll ${showScroll ? 'landing-hero-v2__scroll--visible' : ''}`}>
            <ChevronDown size={18} />
            <span>CUỘN XUỐNG ĐỂ KHÁM PHÁ</span>
          </div>
        </div>
      </section>

      {/* === SECTION 2: KEY FEATURES GRID === */}
      <section id="features" className="landing-features">
        <div className="landing-features__inner">
          <p className="landing-features__eyebrow">Công nghệ tiên tiến nhất</p>
          <h2 className="landing-features__heading">
            Được thiết kế cho nhiếp ảnh gia chuyên nghiệp
          </h2>
          <div className="landing-features__grid">
            {KEY_FEATURES.map(f => (
              <div key={f.title} className="landing-features__card">
                <span className="landing-features__card-icon">{f.icon}</span>
                <h3 className="landing-features__card-title">{f.title}</h3>
                <p className="landing-features__card-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === SECTION 3: PHOTO STRIP — Multi-angle showcase === */}
      <section className="landing-strip">
        <div className="landing-strip__inner">
          <p className="landing-strip__eyebrow">Thiết kế đỉnh cao</p>
          <h2 className="landing-strip__heading">Mỗi góc nhìn — Một kiệt tác</h2>
          <div className="landing-strip__grid">
            {[
              { img: LANDING_PAGE_IMAGES.angle1, label: 'Mặt trước — Bố cục controls' },
              { img: LANDING_PAGE_IMAGES.angle2, label: 'Góc cạnh — Ergonomic grip' },
              { img: LANDING_PAGE_IMAGES.angle3, label: 'Màn hình — Vari-angle LCD' },
              { img: LANDING_PAGE_IMAGES.angle4, label: 'Kết nối — Dual card slots' },
            ].map((item, i) => (
              <div key={i} className="landing-strip__item">
                <div className="landing-strip__img-wrap">
                  <img
                    src={item.img}
                    alt={item.label}
                    loading="lazy"
                    className="landing-strip__img"
                  />
                </div>
                <p className="landing-strip__label">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === SECTION 4: COMPARISON TABLE === */}
      <section className="landing-compare">
        <div className="landing-compare__inner">
          <div className="landing-compare__header">
            <p className="landing-compare__eyebrow">So sánh thế hệ</p>
            <h2 className="landing-compare__heading">R6 Mark II vs R6 Mark I</h2>
          </div>
          <div className="landing-compare__table">
            <div className="landing-compare__row landing-compare__row--header">
              <span>Thông số</span>
              <span className="landing-compare__cell--new">R6 Mark II</span>
              <span className="landing-compare__cell--old">R6 Mark I</span>
              <span>Nâng cấp</span>
            </div>
            {COMPARISON.map(row => (
              <div key={row.label} className="landing-compare__row">
                <span className="landing-compare__label">{row.label}</span>
                <span className="landing-compare__cell landing-compare__cell--new">{row.newVal}</span>
                <span className="landing-compare__cell landing-compare__cell--old">{row.oldVal}</span>
                <span className={`landing-compare__diff ${row.diff !== '=' ? 'landing-compare__diff--up' : ''}`}>
                  {row.diff}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === SECTION 5: FINAL CTA === */}
      <section className="landing-final-cta">
        <div className="landing-final-cta__inner">
          <div className="landing-final-cta__bg" aria-hidden="true" />
          <p className="landing-final-cta__eyebrow">Canon EOS R6 Mark II — Limited Stock</p>
          <h2 className="landing-final-cta__heading">
            Sẵn sàng nâng cấp?<br />Gọi ngay hoặc đặt hàng online
          </h2>
          <div className="landing-final-cta__price">
            <span className="landing-final-cta__price-current">49.990.000₫</span>
            <span className="landing-final-cta__price-old">54.900.000₫</span>
            <span className="landing-final-cta__discount">-9%</span>
          </div>
          <div className="landing-final-cta__trust-row">
            <span className="landing-final-cta__trust-item"><Truck size={14} /> Freeship toàn quốc</span>
            <span className="landing-final-cta__trust-item"><Shield size={14} /> Bảo hành 24 tháng</span>
            <span className="landing-final-cta__trust-item"><Zap size={14} /> Trả góp 0%</span>
          </div>
          <div className="landing-final-cta__buttons">
            <Link
              href={`/san-pham/${CANON_R6_SLUG}`}
              className="landing-final-cta__btn-primary"
            >
              Xem chi tiết & Mua ngay
            </Link>
            <a
              href="tel:+84937148222"
              className="landing-final-cta__btn-secondary"
            >
              Gọi: 0937.148.222
            </a>
          </div>
          <p className="landing-final-cta__note">
            Hỗ trợ trả góp 0% lãi suất · 14 ngày đổi trả · Thu cũ trợ giá 30%
          </p>
        </div>
      </section>

      {/* Fixed bottom bar */}
      <div className="landing-bottom-bar-v2">
        <div className="landing-bottom-bar-v2__inner">
          <div className="landing-bottom-bar-v2__price">
            <p className="landing-bottom-bar-v2__price-label">Giá hôm nay</p>
            <p className="landing-bottom-bar-v2__price-val">49.990.000₫</p>
          </div>
          <div className="landing-bottom-bar-v2__actions">
            <button
              onClick={() => product && addItem(product)}
              className="landing-bottom-bar-v2__cart"
            >
              <ShoppingCart size={16} />
              Thêm vào giỏ
            </button>
            <Link
              href={`/san-pham/${CANON_R6_SLUG}`}
              className="landing-bottom-bar-v2__buy"
            >
              Mua ngay
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}