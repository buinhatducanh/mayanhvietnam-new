import type { HeroSlide, DealBanner, CategoryBanner } from './types';

const CDN = 'https://mayanhvietnam.com';

// Real banner images from mayanhvietnam.com — horizontal banners (1200×400+)
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
    title: 'Sản phẩm khuyến mãi',
    subtitle: 'Giảm giá đến 30% — Số lượng có hạn\nÁp dụng toàn bộ danh mục máy ảnh & ống kính.',
    ctaLabel: 'Xem ngay →',
    ctaHref: '/danh-muc/may-anh',
    gradient: 'linear-gradient(135deg, #1a100a 0%, #281810 100%)',
    image: `${CDN}/asset/imgs/img/1200x400_banner_sanPhamKhuyenMai20250108.png`,
    product: 'Khuyến mãi',
  },
  {
    id: 's3',
    title: 'Flycam / Drone DJI',
    subtitle: 'Mavic · Air · Mini — Chính hãng\nBảo hành 12 tháng, hỗ trợ kỹ thuật trọn đời.',
    ctaLabel: 'Mua ngay →',
    ctaHref: '/danh-muc/flycam',
    gradient: 'linear-gradient(135deg, #0a1a1a 0%, #0d1c1c 50%, #081a18 100%)',
    image: `${CDN}/asset/imgs/img/1200x200_flycam.png`,
    product: 'DJI Flycam',
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

// ─── Per-category banners (carousel trên đầu mỗi ProductSection) ──────────
// Banner thật 1305×435 từ mayanhvietnam.com/asset/imgs/img/banner/
// Carousel tự động chuyển slide, mỗi banner click vào sản phẩm/danh mục tương ứng.
export const categoryBanners: Record<string, CategoryBanner[]> = {
  'may-anh': [
    { title: 'Sony A6700', image: `${CDN}/asset/imgs/img/banner/sonet-some_sony-a6700.png`, href: '/tim-kiem?v=sony%206700' },
    { title: 'Sony A7C II', image: `${CDN}/asset/imgs/img/banner/sonet-some_a7cii.png`, href: '/tim-kiem?v=sony%207c%20ii' },
    { title: 'Sony ZV-E10 II & ZV-1 II', image: `${CDN}/asset/imgs/img/banner/Sonet-some-zv-e10ii_zv-1ii.png`, href: '/danh-muc/may-anh' },
    { title: 'Sony A7 V', image: `${CDN}/asset/imgs/img/banner/uuDai-sonya7v-DCHS.webp`, href: '/san-pham/may-anh-sony-a7-mark-v-a7m5-chinh-hang' },
    { title: 'Sony A7R VI', image: `${CDN}/asset/imgs/img/banner/sony-a7r-vi-1.webp`, href: '/san-pham/may-anh-sony-alpha-a7r-vi' },
    { title: 'Canon EOS R50', image: `${CDN}/asset/imgs/img/banner/canon_r50_trang_den.webp`, href: '/san-pham/canon-eos-r50-kem-lens-rf-s-18-45mm' },
    { title: 'Canon EOS R6 Mark III', image: `${CDN}/asset/imgs/img/banner/canon-r6-mark-III.webp`, href: '/san-pham/canon-eos-r6-mark-iii' },
  ],
  'ong-kinh': [
    { title: 'Sony Ưu đãi sáng tạo', image: `${CDN}/asset/imgs/img/banner/tetSieuChuansangtaoSony.webp`, href: '/danh-muc/ong-kinh' },
    { title: 'Nhận ngay hộp quà Sony', image: `${CDN}/asset/imgs/img/banner/nhan-ngay-hop-qua-sony.webp`, href: '/danh-muc/ong-kinh' },
    { title: 'Canon RF 50mm F1.4L VCM', image: `${CDN}/asset/imgs/img/banner/CANON-RF-50mm-F1.4L-VCM.webp`, href: '/san-pham/ong-kinh-canon-rf-50-f14l-vcm' },
    { title: 'Khuyến mãi ống kính', image: `${CDN}/asset/imgs/img/banner/Km-lens.webp`, href: '/danh-muc/ong-kinh' },
    { title: 'Canon RF 45mm F1.2 STM', image: `${CDN}/asset/imgs/img/banner/RF-45mm-F1.2-STM.webp`, href: '/san-pham/ong-kinh-canon-rf-45-f12-stm' },
    { title: 'Nikkor Z DX 35mm f/1.7', image: `${CDN}/asset/imgs/img/banner/NIKKOR-Z-DX-MC-35mm-f_1.7.png`, href: '/san-pham/nikkor-z-dx-mc-35-f17' },
    { title: 'Kase AF 85mm F1.4 Nikon Z', image: `${CDN}/asset/imgs/img/banner/LENS-KASE-AF-85mm-F1.4-FOR-NIKON-Z.webp`, href: '/san-pham/kase-85-f14-af-lens-nikon-z' },
  ],
  'action-camera': [
    { title: 'DJI Osmo Pocket 4 Creator Combo', image: `${CDN}/asset/imgs/img/banner/Dji_osm_pocket_4.webp`, href: '/san-pham/dji-osmo-pocket-4-creator-combo' },
    { title: 'DJI Osmo Action 6', image: `${CDN}/asset/imgs/img/banner/action-6.webp`, href: '/san-pham/dji-osmo-action-6' },
    { title: 'DJI Osmo Pocket 3 Combo', image: `${CDN}/asset/imgs/img/banner/DJI-Osmo-Pocket-3.webp`, href: '/san-pham/dji-osmo-pocket-3-combo' },
    { title: 'Insta360 Go Ultra Standard', image: `${CDN}/asset/imgs/img/banner/Go-ultra-standard-bundle.webp`, href: '/san-pham/insta360-go-ultra-standard' },
    { title: 'DJI Osmo Nano', image: `${CDN}/asset/imgs/img/banner/DJI-OSMO-NANO-01.webp`, href: '/san-pham/dji-osmo-nano-standard-combo-128gb' },
    { title: 'DJI Osmo Action 5 Pro', image: `${CDN}/asset/imgs/img/banner/action5pro.webp`, href: '/san-pham/dji-osmo-action-5-pro' },
  ],
  'flycam': [
    { title: 'DJI Mini 5 Pro', image: `${CDN}/asset/imgs/img/banner/dji-mini-5-pro.webp`, href: '/san-pham/dji-mini-5-pro' },
    { title: 'DJI Mavic 4 Pro', image: `${CDN}/asset/imgs/img/banner/Mavic-4-Pro.webp`, href: '/san-pham/dji-mavic-4-pro' },
    { title: 'DJI Mini 4K Fly More', image: `${CDN}/asset/imgs/img/banner/FLYCAM-DJI-MINI-4K-FLY-MORE-COMBO.webp`, href: '/san-pham/dji-mini-4k-fly-more-combo' },
    { title: 'DJI Avata 2 Fly More', image: `${CDN}/asset/imgs/img/banner/dji-avata-2.webp`, href: '/san-pham/dji-avata-2-fly-more-combo' },
    { title: 'DJI Neo', image: `${CDN}/asset/imgs/img/banner/1200x400DJI_Neo.webp`, href: '/san-pham/dji-neo' },
    { title: 'DJI Mini 4 Pro Fly More', image: `${CDN}/asset/imgs/img/banner/1200X400_Flycam_DJI_Mini_4-Pro_Fly_More.webp`, href: '/san-pham/dji-mini-4-pro-fly-more-combo' },
  ],
  'may-quay-phim': [
    { title: 'DJI Osmo Pocket 4 Creator Combo', image: `${CDN}/asset/imgs/img/banner/Dji_osm_pocket_4.webp`, href: '/san-pham/dji-osmo-pocket-4-creator-combo' },
    { title: 'Sony FX3 II', image: `${CDN}/asset/imgs/img/banner/uuDai-sonya7v-DCHS.webp`, href: '/san-pham/sony-fx3-ii' },
  ],
  'thiet-bi-studio': [
    { title: 'Godox LA200D', image: `${CDN}/asset/imgs/img/banner/Km-lens.webp`, href: '/danh-muc/thiet-bi-studio' },
    { title: 'Nanlite FC-500B', image: `${CDN}/asset/imgs/img/banner/RF-45mm-F1.2-STM.webp`, href: '/danh-muc/thiet-bi-studio' },
  ],
};