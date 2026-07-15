/**
 * demo-04 data layer
 * ─────────────────────────────────────────────────────────────
 * Real scraped data từ mayanhvietnam.com (2026-07-10)
 * Source: /docs/scraped/homepage.json + plp-*.json
 *
 * ⚠️ Lưu ý: PLP scraped files không có thumbnail images.
 * Chỉ homepage và PDP files có ảnh thật.
 * Flycam/Action Camera sections sử dụng ảnh từ homepage hero banners.
 */

import {
  allProducts as _allProducts,
  heroSlides,
  flashSaleData,
  categories,
  stores as _sharedStores,
  reviews,
} from '../../lib/mock-data';
import { formatVND } from '../../lib/shared-utils';
import type { ProductSummary } from '../../lib/mock-data';

/* ── Re-exports từ shared package ──────────────────────────────── */
export { heroSlides, flashSaleData, categories, reviews };
export { _allProducts as allProducts };
export type { ProductSummary };

/* ── Constants ───────────────────────────────────────────────── */
export const ACCENT = '#FF6B35';
export const vnd = formatVND;
const CDN = 'https://mayanhvietnam.com';

/* ── Hero banners (scraped from homepage.json) ──────────────────── */
export interface HomepageBanner {
  id: string;
  imageUrl: string;
  link: string;
}

export const HOMEPAGE_BANNERS: HomepageBanner[] = [
  { id: 'b1', imageUrl: `${CDN}/asset/imgs/img/tet/banner_tet_01.png`,  link: '/san-pham/may-anh-canon-eos-r50-black-kem-lens-rfs-1845-chinh-hang_may-anh-mirrorless-241228112737843' },
  { id: 'b2', imageUrl: `${CDN}/asset/imgs/img/tet/bannerTet.png`,        link: '/san-pham/may-anh-sony-alpha-a7-mark-iv-body-only-chinh-hang_may-anh-mirrorless-230210223540859' },
  { id: 'b3', imageUrl: `${CDN}/asset/imgs/img/tet/20.webp`,            link: '/san-pham/may-anh-canon-eos-r8-body-only_may-anh-mirrorless-230419151242054' },
  { id: 'b4', imageUrl: `${CDN}/asset/imgs/img/tet/21.webp`,            link: '/san-pham/may-anh-nikon-z6-ii-body-only-chinh-hang_may-anh-mirrorless-230418180440520' },
  { id: 'b5', imageUrl: `${CDN}/asset/imgs/img/tet/7.webp`,             link: '/san-pham/may-anh-sony-zve10-ii-black-body-only-chinh-hang_may-anh-mirrorless-240826174229493' },
];

/* ── HomepageProduct shape ────────────────────────────────────── */
export interface HomepageProduct {
  id: string;
  name: string;
  priceDisplay: string;
  img: string;
  link: string;
}

/* ── Top Cameras — 10 sản phẩm có ảnh thật từ scraped ─────── */
export const TOP_CAMERAS: HomepageProduct[] = [
  { id: 'cam1',  name: 'Canon EOS R50 (Black) kèm Lens RF-S 18-45mm | Chính Hãng',     priceDisplay: '17,500,000đ', img: `${CDN}/image-data/san-pham/24-12/24-12-28/241228112737843/avatar/638709822567106100_may-anh-canon-eos-r50-black-kem-lens-rf-s-18-45mm-chinh-hang.jpg`,              link: '/san-pham/may-anh-canon-eos-r50-black-kem-lens-rfs-1845-chinh-hang_may-anh-mirrorless-241228112737843' },
  { id: 'cam2',  name: 'Nikon Z6 Mark III Kèm Lens Z 24-70mm f/4 S (Chính Hãng VIC)', priceDisplay: '67,600,000đ', img: `${CDN}/image-data/san-pham/25-05/25-05-20/250520145943720/avatar/638833501469480006_nikon-z6-mark-iii-kem-lens-z-24-70-mm-f-4-s-chinh-hang-vic.jpg`,       link: '/san-pham/nikon-z6-mark-iii-kem-lens-z-2470-f4-s-chinh-hang-vic_may-anh-mirrorless-250520145943720' },
  { id: 'cam3',  name: 'Sony Alpha A7 Mark IV (Body Only) | Chính hãng',                priceDisplay: '47,500,000đ', img: `${CDN}/image-data/san-pham/23-02/23-02-10/230210223540859/avatar/01_may-anh-sony-alpha-a7-mark-iv-body-only-chinh-hang.jpg`,                           link: '/san-pham/may-anh-sony-alpha-a7-mark-iv-body-only-chinh-hang_may-anh-mirrorless-230210223540859' },
  { id: 'cam4',  name: 'Canon EOS R8 (Body Only)',                                       priceDisplay: '26,900,000đ', img: `${CDN}/image-data/san-pham/23-04/23-04-19/230419151242054/avatar/canon-eos-r8-6-500x500_may-anh-canon-eos-r8-body-only.jpg`,                             link: '/san-pham/may-anh-canon-eos-r8-body-only_may-anh-mirrorless-230419151242054' },
  { id: 'cam5',  name: 'Sony ZV-E10 II Black (Body Only) | Chính hãng',              priceDisplay: '26,000,000đ', img: `${CDN}/image-data/san-pham/24-08/24-08-26/240826174229493/avatar/638708944659930440_may-anh-sony-zv-e10-ii-black-body-only-chinh-hang.jpg`,            link: '/san-pham/may-anh-sony-zve10-ii-black-body-only-chinh-hang_may-anh-mirrorless-240826174229493' },
  { id: 'cam6',  name: 'Nikon Z6 II (Body Only) | Chính hãng',                           priceDisplay: '32,500,000đ', img: `${CDN}/image-data/san-pham/23-04/23-04-18/230418180440520/avatar/nikon-z6-ii-500x500_may-anh-nikon-z6-ii-body-only-chinh-hang.jpg`,                           link: '/san-pham/may-anh-nikon-z6-ii-body-only-chinh-hang_may-anh-mirrorless-230418180440520' },
  { id: 'cam7',  name: 'Sony ZV-E10 kèm Lens Sony E PZ 16-50mm F3.5-5.6 OSS MARK II | Chính hãng', priceDisplay: '16,680,000đ', img: `${CDN}/image-data/san-pham/25-07/25-07-14/250714103201041/avatar/639029506922725233_sony-zv-e10-kem-lens-sony-e-pz-16-50mm-f3-5-5-6-oss-mark-ii-chinh-hang.jpg`, link: '/san-pham/sony-zve10-kem-lens-sony-e-pz-1650-f3556-oss-mark-ii-chinh-hang_may-anh-mirrorless-250714103201041' },
  { id: 'cam8',  name: 'Nikon Z5 II - (Hãng)',                                         priceDisplay: '43,000,000đ', img: `${CDN}/image-data/san-pham/25-07/25-07-04/250704114217939/avatar/638872262359118095_may-anh-nikon-z5-ii-hang.jpg`,                                           link: '/san-pham/may-anh-nikon-z5-iihang_may-anh-mirrorless-250704114217939' },
  { id: 'cam9',  name: 'Nikon Z30 (đen) kèm Lens NIKKOR Z DX 16-50mm f/3.5-6.3 VR | chính hãng', priceDisplay: '17,900,000đ', img: `${CDN}/image-data/san-pham/25-06/25-06-20/250620115535850/avatar/638889641077470341_may-anh-nikon-z30-den-kem-lens-nikkor-z-dx-16-50mm-f-3-5-6-3-vr-chinh-hang.jpg`, link: '/san-pham/may-anh-nikon-z30-den-kem-lens-nikkor-z-dx-1650-f3563-vr-chinh-hang_may-anh-mirrorless-250620115535850' },
  { id: 'cam10', name: 'NIKON ZFC + LENS NIKON Z DX 16-50mm F3.5-6.3 VR (SILVER)',   priceDisplay: '24,000,000đ', img: `${CDN}/image-data/san-pham/26-01/26-01-02/260102105356303/avatar/639029480446269883_nikon-zfc-lens-nikon-z-dx-16-50mm-f3-5-6-3-vr-silver.jpg`,  link: '/san-pham/nikon-zfc-lens-nikon-z-dx-1650-f3563-vr-silver_may-anh-mirrorless-260102105356303' },
];

/* ── Top Lenses — 10 ống kính có ảnh thật từ scraped ──────────── */
export const TOP_LENSES: HomepageProduct[] = [
  { id: 'len1',  name: 'Canon RF 24-70mm f/2.8L IS USM | Chính hãng',               priceDisplay: '48,900,000đ', img: `${CDN}/image-data/san-pham/23-02/23-02-10/230210234357844/avatar/01_ong-kinh-canon-rf-24-70mm-f-2-8l-is-usm-chinh-hang.jpg`,                                    link: '/san-pham/ong-kinh-canon-rf-2470-f28l-is-usm-chinh-hang_ong-kinh-mirrorless-230210234357844' },
  { id: 'len2',  name: 'Nikon Z 24-70mm f/2.8 S II',                                priceDisplay: '69,000,000đ', img: `${CDN}/image-data/san-pham/25-09/25-09-22/250922103851025/avatar/638941343754731632_ong-kinh-nikon-z-24-70mm-f-2-8-s-ii.jpg`,                                      link: '/san-pham/ong-kinh-nikon-z-2470-f28-s-ii_ong-kinh-mirrorless-250922103851025' },
  { id: 'len3',  name: 'Tamron 28-75mm F2.8 Di III VXD G2 for Nikon Z',              priceDisplay: '17,900,000đ', img: `${CDN}/image-data/san-pham/24-08/24-08-31/240831133137156/avatar/638722116807217083_ong-kinh-tamron-28-75mm-f2-8-di-iii-vxd-g2-for-nikon-z.jpg`,             link: '/san-pham/ong-kinh-tamron-2875-f28-di-iii-vxd-g2-for-nikon-z_ong-kinh-mirrorless-240831133137156' },
  { id: 'len4',  name: 'Sigma 200mm F2 DG OS Sports for Sony E | Chính hãng',       priceDisplay: '85,320,000đ', img: `${CDN}/image-data/san-pham/25-08/25-08-20/250820095043213/avatar/638912804942323908_ong-kinh-sigma-200mm-f2-dg-os-sports-for-sony-e-chinh-hang.jpg`,         link: '/san-pham/ong-kinh-sigma-200-f2-dg-os-sports-for-sony-e-chinh-hang_ong-kinh-mirrorless-250820095043213' },
  { id: 'len5',  name: 'Sigma 200mm F2 DG OS Sports ngàm L',                           priceDisplay: '85,320,000đ', img: `${CDN}/image-data/san-pham/25-08/25-08-20/250820100004596/avatar/638912808715148082_ong-kinh-sigma-200mm-f2-dg-os-sports-ngam-l.jpg`,                                   link: '/san-pham/ong-kinh-sigma-200-f2-dg-os-sports-ngam-l_ong-kinh-mirrorless-250820100004596' },
  { id: 'len6',  name: 'Canon RF 50mm F1.8 STM | Chính hãng',                        priceDisplay: '4,500,000đ',  img: `${CDN}/image-data/san-pham/24-08/24-08-03/240803094047373/avatar/638847186653427391_canon-rf-50mm-f1-8-stm-chinh-hang.jpg`,                                     link: '/san-pham/canon-rf-50-f18-stm-chinh-hang_ong-kinh-mirrorless-240803094047373' },
  { id: 'len7',  name: 'Kase 85mm f/1.4 AF Lens (Nikon Z)',                      priceDisplay: '9,900,000đ',  img: `${CDN}/image-data/san-pham/25-10/25-10-06/251006173300230/avatar/638966646032677503_kase-85mm-f-1-4-af-lens-nikon-z.jpg`,                                     link: '/san-pham/kase-85-f14-af-lens-nikon-z_ong-kinh-mirrorless-251006173300230' },
  { id: 'len8',  name: 'Viltrox 85mm f/1.4 Pro Nikon Z',                             priceDisplay: '13,500,000đ', img: `${CDN}/image-data/san-pham/25-11/25-11-03/251103143407180/avatar/638977774249552971_ong-kinh-viltrox-85mm-f-1-4-pro-nikon-z.jpg`,                                link: '/san-pham/ong-kinh-viltrox-85-f14-pro-nikon-z_ong-kinh-mirrorless-251103143407180' },
  { id: 'len9',  name: 'Nikon Z 24-70mm f/4 S | Chính hãng VIC',                   priceDisplay: '9,500,000đ',  img: `${CDN}/image-data/san-pham/23-02/23-02-10/230210235800676/avatar/01_ong-kinh-nikon-z-24-70mm-f-4-s-chinh-hang-vic.jpg`,                                   link: '/san-pham/ong-kinh-nikon-z-2470-f4-s-chinh-hang-vic_ong-kinh-mirrorless-230210235800676' },
  { id: 'len10', name: 'Canon RF 45mm F/1.2 STM | Chính Hãng',                       priceDisplay: '11,500,000đ', img: `${CDN}/image-data/san-pham/25-11/25-11-06/251106133811267/avatar/638982144738436897_ong-kinh-canon-rf-45mm-f-1-2-stm-chinh-hang.jpg`,                              link: '/san-pham/ong-kinh-canon-rf-45-f12-stm-chinh-hang_ong-kinh-mirrorless-251106133811267' },
];

/* ── Featured product (scraped) ──────────────────────────────── */
export const FEATURED_PRODUCT = {
  name: 'Máy ảnh Nikon Z6 II (Body Only)',
  description: 'Nikon Z6 II là mẫu máy ảnh mirrorless kế nhiệm của Nikon Z6. Giống như Nikon Z6, Nikon Z6 II được thiết kế hoàn toàn bằng hợp kim Magiê tạo độ chắc chắn. Hệ thống lấy nét tự động nhanh chóng, chính xác cùng khả năng chụp liên tiếp 14fps cho phép bạn bắt trọn từng khoảnh khắc quan trọng.',
  detailUrl: '/san-pham/may-anh-nikon-z6-ii-body-only_may-anh-mirrorless-230418180440520',
  badges: ['Giao hàng Toàn quốc', 'Sản phẩm Chính hãng', 'Bảo hành Lâu dài', 'Thanh toán Đa dạng'],
};

/* ── Reviews section ──────────────────────────────────────── */
export const REVIEWS_SECTION = {
  youtubeUrl: 'https://www.youtube.com/@mayanhvietnam',
};

/* ── Footer data (scraped từ homepage.json) ─────────────── */
export interface FooterLink { name: string; href: string; }
export interface SocialLink { platform: string; url: string; }
export interface StoreLocation { region: string; address: string; hours: string; }
export interface FooterData {
  tagline: string;
  policies: FooterLink[];
  paymentMethods: string[];
  paymentIcons: string[];
  socialLinks: SocialLink[];
  storeLocations: StoreLocation[];
}

export const FOOTER: FooterData = {
  tagline: 'Máy Ảnh Việt Nam là đơn vị tiên phong trong lĩnh vực phân phối và bán lẻ các sản phẩm máy ảnh tại thị trường Việt Nam.',
  policies: [
    { name: 'Chính sách bảo hành',                       href: '/chinh-sach-bao-hanh' },
    { name: 'Chính sách thanh toán',                     href: '/chinh-sach-thanh-toan' },
    { name: 'Chính sách đổi trả, Hoàn Tiền',            href: '/chinh-sach-bao-hanh#chinhSachDoiTraHoanTien' },
    { name: 'Chính sách vận chuyển',                    href: '/chinh-sach-van-chuyen' },
    { name: 'Chính sách bảo mật thông tin khách hàng', href: '/chinh-sach-bao-mat-thong-tin-khach-hang' },
    { name: 'Thông tin liên hệ',                         href: '/thong-tin-lien-he' },
  ],
  paymentMethods: ['VISA', 'MasterCard', 'JCB', 'ATM / Napas', 'Home PayLater', 'MoMo'],
  paymentIcons: [
    `${CDN}/asset/imgs/icon/hinhThucThanhToan/visa_icon_44fe6e15ed.svg`,
    `${CDN}/asset/imgs/icon/hinhThucThanhToan/mastercard_icon_c75f94f6a5.svg`,
    `${CDN}/asset/imgs/icon/hinhThucThanhToan/jcb_icon_214783937c.svg`,
    `${CDN}/asset/imgs/icon/hinhThucThanhToan/napas_icon_94d5330e3c.svg`,
    `${CDN}/asset/imgs/icon/hinhThucThanhToan/homepaylater_icon_adef600842.svg`,
    `${CDN}/asset/imgs/icon/hinhThucThanhToan/momo_icon_baef21b5f7.svg`,
  ],
  socialLinks: [
    { platform: 'YouTube',  url: 'https://www.youtube.com/@benhvienmayanhvietnam950' },
    { platform: 'TikTok',   url: 'https://www.tiktok.com/@mayanhvietnam' },
    { platform: 'Facebook', url: 'https://www.facebook.com/mayanhvietnam' },
    { platform: 'Email',   url: 'mailto:info@mayanhvietnam.com' },
    { platform: 'Hotline', url: 'tel:0907215252' },
  ],
  storeLocations: [
    { region: 'TP. Hồ Chí Minh', address: 'Số 9, Nam Quốc Cang, Phường Bến Thành, TP Hồ Chí Minh', hours: '09:00 – 19:00 mỗi ngày' },
    { region: 'TP. Cần Thơ',    address: 'Số 58 Nguyễn Hiền, Khu Dân Cư 91B, phường Tân An, TP. Cần Thơ',      hours: '08:00 – 20:00 mỗi ngày' },
  ],
};

/* ── Category banners (scraped từ banner_header_sider/ — mayanhvietnam.com) ── */
export interface CategoryBanner {
  title: string;
  subtitle?: string;
  image: string;
  href: string;
}

export const CATEGORY_BANNERS: Record<string, CategoryBanner[]> = {
  'may-anh': [
    { title: 'Sony A6700', image: `${CDN}/asset/imgs/img/banner/sonet-some_sony-a6700.png`, href: '/san-pham?cat=may-anh' },
    { title: 'Sony A7C II', image: `${CDN}/asset/imgs/img/banner/sonet-some_a7cii.png`, href: '/san-pham?cat=may-anh' },
    { title: 'Sony ZV-E10 II & ZV-1 II', image: `${CDN}/asset/imgs/img/banner/Sonet-some-zv-e10ii_zv-1ii.png`, href: '/san-pham?cat=may-anh' },
    { title: 'Sony A7 V', image: `${CDN}/asset/imgs/img/banner/uuDai-sonya7v-DCHS.webp`, href: '/san-pham?cat=may-anh' },
    { title: 'Sony A7R VI', image: `${CDN}/asset/imgs/img/banner/sony-a7r-vi-1.webp`, href: '/san-pham?cat=may-anh' },
    { title: 'Canon EOS R50', image: `${CDN}/asset/imgs/img/banner/canon_r50_trang_den.webp`, href: '/san-pham?cat=may-anh' },
    { title: 'Canon EOS R6 Mark III', image: `${CDN}/asset/imgs/img/banner/canon-r6-mark-III.webp`, href: '/san-pham?cat=may-anh' },
  ],
  'ong-kinh': [
    { title: 'Sony Ưu đãi sáng tạo', image: `${CDN}/asset/imgs/img/banner/tetSieuChuansangtaoSony.webp`, href: '/san-pham?cat=ong-kinh' },
    { title: 'Nhận ngay hộp quà Sony', image: `${CDN}/asset/imgs/img/banner/nhan-ngay-hop-qua-sony.webp`, href: '/san-pham?cat=ong-kinh' },
    { title: 'Canon RF 50mm F1.4L VCM', image: `${CDN}/asset/imgs/img/banner/CANON-RF-50mm-F1.4L-VCM.webp`, href: '/san-pham?cat=ong-kinh' },
    { title: 'Khuyến mãi ống kính', image: `${CDN}/asset/imgs/img/banner/Km-lens.webp`, href: '/san-pham?cat=ong-kinh' },
    { title: 'Canon RF 45mm F1.2 STM', image: `${CDN}/asset/imgs/img/banner/RF-45mm-F1.2-STM.webp`, href: '/san-pham?cat=ong-kinh' },
    { title: 'Nikkor Z DX 35mm f/1.7', image: `${CDN}/asset/imgs/img/banner/NIKKOR-Z-DX-MC-35mm-f_1.7.png`, href: '/san-pham?cat=ong-kinh' },
    { title: 'Kase AF 85mm F1.4 Nikon Z', image: `${CDN}/asset/imgs/img/banner/LENS-KASE-AF-85mm-F1.4-FOR-NIKON-Z.webp`, href: '/san-pham?cat=ong-kinh' },
  ],
  'action-camera': [
    { title: 'DJI Osmo Pocket 4 Creator Combo', image: `${CDN}/asset/imgs/img/banner/Dji_osm_pocket_4.webp`, href: '/san-pham?cat=action-camera' },
    { title: 'DJI Osmo Action 6', image: `${CDN}/asset/imgs/img/banner/action-6.webp`, href: '/san-pham?cat=action-camera' },
    { title: 'DJI Osmo Pocket 3 Combo', image: `${CDN}/asset/imgs/img/banner/DJI-Osmo-Pocket-3.webp`, href: '/san-pham?cat=action-camera' },
    { title: 'Insta360 Go Ultra Standard', image: `${CDN}/asset/imgs/img/banner/Go-ultra-standard-bundle.webp`, href: '/san-pham?cat=action-camera' },
    { title: 'DJI Osmo Nano', image: `${CDN}/asset/imgs/img/banner/DJI-OSMO-NANO-01.webp`, href: '/san-pham?cat=action-camera' },
    { title: 'DJI Osmo Action 5 Pro', image: `${CDN}/asset/imgs/img/banner/action5pro.webp`, href: '/san-pham?cat=action-camera' },
  ],
  'flycam': [
    { title: 'DJI Mini 5 Pro', image: `${CDN}/asset/imgs/img/banner/dji-mini-5-pro.webp`, href: '/san-pham?cat=flycam' },
    { title: 'DJI Mavic 4 Pro', image: `${CDN}/asset/imgs/img/banner/Mavic-4-Pro.webp`, href: '/san-pham?cat=flycam' },
    { title: 'DJI Mini 4K Fly More', image: `${CDN}/asset/imgs/img/banner/FLYCAM-DJI-MINI-4K-FLY-MORE-COMBO.webp`, href: '/san-pham?cat=flycam' },
    { title: 'DJI Avata 2 Fly More', image: `${CDN}/asset/imgs/img/banner/dji-avata-2.webp`, href: '/san-pham?cat=flycam' },
    { title: 'DJI Neo', image: `${CDN}/asset/imgs/img/banner/1200x400DJI_Neo.webp`, href: '/san-pham?cat=flycam' },
    { title: 'DJI Mini 4 Pro Fly More', image: `${CDN}/asset/imgs/img/banner/1200X400_Flycam_DJI_Mini_4-Pro_Fly_More.webp`, href: '/san-pham?cat=flycam' },
  ],
  'may-quay-phim': [
    { title: 'DJI Osmo Pocket 4 Creator Combo', image: `${CDN}/asset/imgs/img/banner/Dji_osm_pocket_4.webp`, href: '/san-pham?cat=may-quay-phim' },
  ],
  'thiet-bi-studio': [],
};

export const CATEGORY_SECTION_SLUGS = ['may-anh', 'ong-kinh', 'flycam', 'action-camera', 'may-quay-phim', 'thiet-bi-studio'] as const;

/* ── Header real data ──────────────────────────────────────── */
export const SITE_HOTLINE = { short: '0907-215-252', full: '0907-215-252' };

/* ── Local UI types ─────────────────────────────────────────── */
export interface Product {
  id: number;
  /** Canonical key — use this for routing & lookups, NOT `id`. */
  slug: string;
  brand: string; name: string; category: string;
  price: number; originalPrice: number | null; badge: string | null;
  rating: number; reviews: number; img: string; thumbs: string[];
  specs: { group: string; items: { label: string; value: string }[] }[]; desc: string;
  features: string[]; inBox: string[];
}
export interface Brand {
  id: string; name: string; logo: string; country: string;
  founded: number; products: number; desc: string; color: string; img: string;
}
export interface Store {
  city: string; address: string; phone: string; hours: string; map: string;
}

/* ── Adapter: ProductSummary → Product ──────────────────────── */
// NOTE: assign numeric `id` as a stable, collision-free running index
// (NOT derived from the string `p.id`, which collides for "p1" vs "p1b",
// "p3a" vs "p3b" vs "p3c" vs "p3d" — `getProductById` then returns the
// wrong product). Use `slug` (always unique) as the canonical key.
export const PRODUCTS: Product[] = _allProducts.map((p, idx) => ({
  id: idx + 1,
  slug: p.slug,
  brand: p.brand, name: p.name, category: p.category,
  price: p.price, originalPrice: p.originalPrice ?? null,
  badge: p.badges?.[0]?.label ?? null,
  rating: p.rating?.average ?? 0, reviews: p.rating?.count ?? 0,
  img: p.thumbnail || p.images?.[0]?.url || '',
  thumbs: (p.images ?? []).map((i) => i.url),
  specs: p.specs ?? [],  // giữ grouped specs (group + items) cho PDP render theo nhóm
  desc: p.description ?? '', features: p.highlights ?? [],
  inBox: p.packageIncludes ?? [],
}));

export const PRODUCT_BY_SLUG: Record<string, Product> = Object.fromEntries(
  PRODUCTS.map((p) => [p.slug as string, p]),
);

export const getProductBySlug = (slug: string): Product | undefined =>
  PRODUCT_BY_SLUG[slug];

export const getProductById = (id: number): Product | undefined =>
  PRODUCTS.find((p) => p.id === id);

/* ── Brand data ───────────────────────────────────────────── */
export const BRANDS: Brand[] = [
  { id: 'canon',    name: 'Canon',    logo: '🔴', country: 'Nhật Bản', founded: 1937, products: 156, desc: 'Thương hiệu máy ảnh hàng đầu thế giới, nổi tiếng với công nghệ Dual Pixel AF và hệ sinh thái ống kính RF phong phú.', color: '#CC0000', img: `${CDN}/image-data/san-pham/23-02/23-02-10/230210223748534/avatar/01_may-anh-canon-eos-r6-mark-ii-chinh-hang.jpg` },
  { id: 'sony',     name: 'Sony',     logo: '🔵', country: 'Nhật Bản', founded: 1946, products: 98,  desc: 'Pioneer của cảm biến BSI CMOS và hệ thống AF tiên tiến nhất. Sony Alpha là lựa chọn hàng đầu của content creator toàn cầu.', color: '#003087', img: `${CDN}/image-data/san-pham/23-01/23-01-16/230116131956524/avatar/01_may-anh-sony-a7-iv-body-chinh-hang.jpg` },
  { id: 'nikon',    name: 'Nikon',    logo: '🟡', country: 'Nhật Bản', founded: 1917, products: 87,  desc: 'Thương hiệu máy ảnh lâu đời nhất thế giới. Hệ thống Z-mount với đường kính lớn nhất ngành.', color: '#1C3F94', img: `${CDN}/image-data/san-pham/24-10/24-10-15/241015142345678/avatar/01_may-anh-nikon-z8-body-chinh-hang.jpg` },
  { id: 'fujifilm', name: 'Fujifilm', logo: '🟢', country: 'Nhật Bản', founded: 1934, products: 74,  desc: 'Độc đáo với hệ thống Film Simulation tái tạo màu sắc phim analog. Thiết kế retro và chất lượng ảnh tuyệt vời.', color: '#E4002B', img: `${CDN}/image-data/san-pham/23-01/23-01-16/230116131956524/avatar/01_may-anh-fujifilm-x-t5-body-chinh-hang.jpg` },
  { id: 'dji',      name: 'DJI',      logo: '⬛', country: 'Trung Quốc', founded: 2006, products: 47, desc: 'Dẫn đầu thị trường drone và gimbal toàn cầu. Trải nghiệm quay phim aerial chuyên nghiệp.', color: '#333',    img: `${CDN}/image-data/san-pham/23-09/23-09-05/230905154321/avatar/01_dji-mini-4-pro-chinh-hang.jpg` },
  { id: 'sigma',    name: 'Sigma',    logo: '⚫', country: 'Nhật Bản', founded: 1961, products: 63,  desc: 'Chuyên gia ống kính Art, Contemporary và Sports. Tiêu chuẩn vàng về chất lượng quang học.', color: '#555',    img: `${CDN}/image-data/san-pham/23-01/23-01-16/230116131956524/avatar/01_ong-kinh-sigma-35mm-art.jpg` },
  { id: 'tamron',   name: 'Tamron',   logo: '🔷', country: 'Nhật Bản', founded: 1950, products: 38,  desc: 'Ống kính giá tốt, chất lượng cao. Dòng 17-70mm f/2.8 và 28-75mm f/2.8 phổ biến nhất.', color: '#0047AB', img: `${CDN}/image-data/san-pham/23-01/23-01-16/230116131956524/avatar/01_ong-kinh-tamron.jpg` },
  { id: 'godox',   name: 'Godox',   logo: '🟠', country: 'Trung Quốc', founded: 2004, products: 89, desc: 'Đèn flash chuyên nghiệp phổ biến nhất Việt Nam. Hệ thống X 2.4GHz điều khiển không dây.', color: '#FF6600', img: `${CDN}/image-data/san-pham/23-01/23-01-16/230116131956524/avatar/01_den-godox-ad300pro.jpg` },
];

export const STORES: Store[] = _sharedStores.map((s) => ({
  city: s.city, address: s.address, phone: s.phone, hours: s.hours,
  map: `${s.name} — ${s.address}`,
}));
export const sharedStores = _sharedStores;
