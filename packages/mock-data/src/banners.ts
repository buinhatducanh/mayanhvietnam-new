import type { HeroSlide, DealBanner } from './types';

export const heroSlides: HeroSlide[] = [
  {
    id: 's1',
    title: 'Canon EOS R50',
    subtitle: 'APS-C Mirrorless · 24.2MP · 4K Video\nDành cho creator bắt đầu hành trình chuyên nghiệp.',
    ctaLabel: 'Khám phá ngay →',
    ctaHref: '/san-pham/canon-eos-r50-kit-18-45mm',
    gradient: 'from-[#0a1520] via-[#0d1a28] to-[#0a1420]',
    product: 'Canon',
  },
  {
    id: 's2',
    title: 'Sony A7 IV',
    subtitle: 'Full-frame 33MP · Real-time AF\nĐịnh hình tương lai nhiếp ảnh.',
    ctaLabel: 'Xem chi tiết →',
    ctaHref: '/san-pham/sony-a7-iv-body',
    gradient: 'from-[#120a1a] via-[#1a1028] to-[#140c1c]',
    product: 'Sony',
  },
  {
    id: 's3',
    title: 'Flycam DJI Mini 4 Pro',
    subtitle: '249g · 4K HDR · O4 Transmission\nBay tự do, thu phóng không giới hạn.',
    ctaLabel: 'Mua ngay →',
    ctaHref: '/san-pham/dji-mini-4-pro',
    gradient: 'from-[#0a1a1a] via-[#0d1c1c] to-[#081a18]',
    product: 'DJI',
  },
];

export const dealBanners: DealBanner[] = [
  {
    id: 'db1',
    title: 'Dịch vụ lắp phông studio',
    subtitle: 'Giải pháp phòng ảnh chuyên nghiệp · Tư vấn miễn phí',
    ctaLabel: 'Xem ngay',
    ctaHref: '/danh-muc/lap-phong-studio',
    gradient: 'from-[#0a1a28] to-[#0f2838]',
  },
  {
    id: 'db2',
    title: 'Thu cũ đổi mới — Trả góp 0%',
    subtitle: 'Máy cũ bạn · Máy mới giá tốt · Thủ tục nhanh gọn',
    ctaLabel: 'Đánh giá ngay',
    ctaHref: '/thu-cu-doi-moi',
    gradient: 'from-[#1a100a] to-[#281810]',
  },
];
