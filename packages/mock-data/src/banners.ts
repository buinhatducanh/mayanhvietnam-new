import type { HeroSlide, DealBanner } from './types';

const CDN = 'https://mayanhvietnam.com';

// Real banner images from mayanhvietnam.com
export const heroSlides: HeroSlide[] = [
  {
    id: 's1',
    title: 'Canon EOS R50',
    subtitle: 'APS-C Mirrorless · 24.2MP · 4K Video\nDành cho creator bắt đầu hành trình chuyên nghiệp.',
    ctaLabel: 'Khám phá ngay →',
    ctaHref: '/san-pham/canon-eos-r50-kem-lens-rf-s-18-45mm',
    gradient: 'linear-gradient(135deg, #0a1520 0%, #0d1a28 50%, #0a1420 100%)',
    image: `${CDN}/asset/imgs/img/SPKM_banner/SPKM_eosR50.webp`,
    product: 'Canon',
  },
  {
    id: 's2',
    title: 'Sony A7 Mark IV',
    subtitle: 'Full-frame 33MP · Real-time Eye AF\nĐịnh hình tương lai nhiếp ảnh chuyên nghiệp.',
    ctaLabel: 'Xem chi tiết →',
    ctaHref: '/san-pham/may-anh-sony-alpha-a7-mark-iv-body-only-chinh-hang',
    gradient: 'linear-gradient(135deg, #120a1a 0%, #1a1028 50%, #140c1c 100%)',
    image: `${CDN}/image-data/san-pham/23-02/23-02-10/230210223540859/avatar/01_may-anh-sony-alpha-a7-mark-iv-body-only-chinh-hang.jpg`,
    product: 'Sony',
  },
  {
    id: 's3',
    title: 'DJI Mavic 4 Pro Creator Combo',
    subtitle: 'Hasselblad 100MP · 6K HDR · O4+ 15km\nCỗ máy sáng tạo bất tận cho filmmaker.',
    ctaLabel: 'Mua ngay →',
    ctaHref: '/san-pham/dji-mavic-4-pro-512gb-creator-combo',
    gradient: 'linear-gradient(135deg, #0a1a1a 0%, #0d1c1c 50%, #081a18 100%)',
    image: `${CDN}/image-data/san-pham/25-05/25-05-15/250515085035248/avatar/638828964891489787_dji-mavic-4-pro-512gb-creator-combo.jpg`,
    product: 'DJI',
  },
];

// Real deal banner URLs from mayanhvietnam.com
export const dealBanners: DealBanner[] = [
  {
    id: 'db1',
    title: 'Dịch vụ lắp phông studio',
    subtitle: 'Giải pháp phòng ảnh chuyên nghiệp · Tư vấn miễn phí',
    ctaLabel: 'Xem ngay',
    ctaHref: '/danh-muc/lap-phong-studio',
    gradient: 'linear-gradient(135deg, #0a1a28 0%, #0f2838 100%)',
    image: `${CDN}/asset/imgs/img/danhMuc_setupPhong.webp`,
  },
  {
    id: 'db2',
    title: 'Sản phẩm khuyến mãi',
    subtitle: 'Giảm giá đến 30% — Số lượng có hạn',
    ctaLabel: 'Xem ngay',
    ctaHref: '/danh-muc/may-anh',
    gradient: 'linear-gradient(135deg, #1a100a 0%, #281810 100%)',
    image: `${CDN}/asset/imgs/img/1200x400_banner_sanPhamKhuyenMai20250108.png`,
  },
];