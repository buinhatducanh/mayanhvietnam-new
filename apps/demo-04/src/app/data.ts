/**
 * demo-04 data layer
 * ─────────────────────────────────────────────────────────────
 * Real scraped data từ mayanhvietnam.com (2026-07-10)
 * Source: /docs/scraped/homepage.json
 *
 * Sections:
 * - Hero banners (5 real banners từ CDN)
 * - Category grid (9 real categories)
 * - Top Cameras / Top Lenses / Top Flycam / Top Action Camera (10 each)
 * - Reviews (YouTube section)
 * - Footer (company, policies, payment, social, stores)
 */

import {
  allProducts as _allProducts,
  heroSlides,
  flashSaleData,
  categories,
  stores as _sharedStores,
  reviews,
} from '@mayanhvietnam/mock-data';
import { formatVND } from '@mayanhvietnam/shared-utils';

import type { ProductSummary } from '@mayanhvietnam/mock-data';

/* ── Re-exports từ shared package ──────────────────────────────── */
export { heroSlides, flashSaleData, categories, reviews };
export { _allProducts as allProducts };
export type { ProductSummary };

/* ── Constants ───────────────────────────────────────────────── */
export const ACCENT = '#FF6B35';
export const vnd = formatVND;
const CDN = 'https://mayanhvietnam.com';

/* ── Real hero banners (scraped) ────────────────────────────── */
export interface HomepageBanner {
  id: string;
  imageUrl: string;
  link: string;
}

export const HOMEPAGE_BANNERS: HomepageBanner[] = [
  { id: 'b1', imageUrl: `${CDN}/asset/imgs/img/tet/banner_tet_01.png`, link: '/san-pham/may-anh-canon-eos-r8-body-only_may-anh-mirrorless-230419151242054' },
  { id: 'b2', imageUrl: `${CDN}/asset/imgs/img/tet/bannerTet.png`,       link: '/san-pham/may-anh-canon-eos-r6-body-only_may-anh-mirrorless-230210223532542' },
  { id: 'b3', imageUrl: `${CDN}/asset/imgs/img/tet/20.webp`,             link: '/san-pham/may-anh-canon-eos-r8-body-only_may-anh-mirrorless-230419151242054' },
  { id: 'b4', imageUrl: `${CDN}/asset/imgs/img/tet/21.webp`,             link: '/san-pham/may-anh-canon-eos-r6-body-only_may-anh-mirrorless-230210223532542' },
  { id: 'b5', imageUrl: `${CDN}/asset/imgs/img/tet/7.webp`,             link: '/san-pham/may-anh-canon-eos-r6-body-only_may-anh-mirrorless-230210223532542' },
];

/* ── Top Cameras (scraped từ homepage.json) ────────────────── */
export interface HomepageProduct {
  id: string;
  name: string;
  priceDisplay: string;
  img: string;
  link: string;
}

export const TOP_CAMERAS: HomepageProduct[] = [
  { id: 'cam1',  name: 'Canon EOS R50 (Black) kèm Lens RF-S 18-45mm | Chính Hãng',    priceDisplay: '17,500,000đ',  img: 'https://mayanhvietnam.com/image-data/san-pham/24-12/24-12-28/241228112737843/avatar/638709822567106100_may-anh-canon-eos-r50-black-kem-lens-rf-s-18-45mm-chinh-hang.jpg',             link: '/san-pham/may-anh-canon-eos-r50-black-kem-lens-rfs-1845-chinh-hang_may-anh-mirrorless-241228112737843' },
  { id: 'cam2',  name: 'Nikon Z6 Mark III Kèm Lens Z 24-70mm f/4 S (Chính Hãng VIC)', priceDisplay: '67,600,000đ', img: 'https://mayanhvietnam.com/image-data/san-pham/25-05/25-05-20/250520145943720/avatar/638833501469480006_nikon-z6-mark-iii-kem-lens-z-24-70-mm-f-4-s-chinh-hang-vic.jpg',         link: '/san-pham/nikon-z6-mark-iii-kem-lens-z-2470-f4-s-chinh-hang-vic_may-anh-mirrorless-250520145943720' },
  { id: 'cam3',  name: 'Sony Alpha A7 Mark IV (Body Only) | Chính hãng',                 priceDisplay: '47,500,000đ', img: 'https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-10/230210223540859/avatar/01_may-anh-sony-alpha-a7-mark-iv-body-only-chinh-hang.jpg',                            link: '/san-pham/may-anh-sony-alpha-a7-mark-iv-body-only-chinh-hang_may-anh-mirrorless-230210223540859' },
  { id: 'cam4',  name: 'Canon EOS R8 (Body Only)',                                             priceDisplay: '26,900,000đ', img: 'https://mayanhvietnam.com/image-data/san-pham/23-04/23-04-19/230419151242054/avatar/canon-eos-r8-6-500x500_may-anh-canon-eos-r8-body-only.jpg',                                link: '/san-pham/may-anh-canon-eos-r8-body-only_may-anh-mirrorless-230419151242054' },
  { id: 'cam5',  name: 'Sony ZV-E10 II Black (Body Only) | Chính hãng',                   priceDisplay: '26,000,000đ', img: 'https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-26/240826174229493/avatar/638708944659930440_may-anh-sony-zv-e10-ii-black-body-only-chinh-hang.jpg',             link: '/san-pham/may-anh-sony-zve10-ii-black-body-only-chinh-hang_may-anh-mirrorless-240826174229493' },
  { id: 'cam6',  name: 'Nikon Z6 II (Body Only) | Chính hãng',                            priceDisplay: '32,500,000đ', img: 'https://mayanhvietnam.com/image-data/san-pham/23-04/23-04-18/230418180440520/avatar/nikon-z6-ii-500x500_may-anh-nikon-z6-ii-body-only-chinh-hang.jpg',                            link: '/san-pham/may-anh-nikon-z6-ii-body-only-chinh-hang_may-anh-mirrorless-230418180440520' },
  { id: 'cam7',  name: 'Sony ZV-E10 kèm Lens Sony E PZ 16-50mm F3.5-5.6 OSS MARK II | Chính hãng', priceDisplay: '16,680,000đ', img: 'https://mayanhvietnam.com/image-data/san-pham/25-07/25-07-14/250714103201041/avatar/639029506922725233_sony-zv-e10-kem-lens-sony-e-pz-16-50mm-f3-5-5-6-oss-mark-ii-chinh-hang.jpg', link: '/san-pham/sony-zve10-kem-lens-sony-e-pz-1650-f3556-oss-mark-ii-chinh-hang_may-anh-mirrorless-250714103201041' },
  { id: 'cam8',  name: 'Nikon Z5 II - (Hãng)',                                               priceDisplay: '43,000,000đ', img: 'https://mayanhvietnam.com/image-data/san-pham/25-07/25-07-04/250704114217939/avatar/638872262359118095_may-anh-nikon-z5-ii-hang.jpg',                                            link: '/san-pham/may-anh-nikon-z5-iihang_may-anh-mirrorless-250704114217939' },
  { id: 'cam9',  name: 'Nikon Z30 (đen) kèm Lens NIKKOR Z DX 16-50mm f/3.5-6.3 VR | chính hãng', priceDisplay: '17,900,000đ', img: 'https://mayanhvietnam.com/image-data/san-pham/25-06/25-06-20/250620115535850/avatar/638889641077470341_may-anh-nikon-z30-den-kem-lens-nikkor-z-dx-16-50mm-f-3-5-6-3-vr-chinh-hang.jpg', link: '/san-pham/may-anh-nikon-z30-den-kem-lens-nikkor-z-dx-1650-f3563-vr-chinh-hang_may-anh-mirrorless-250620115535850' },
  { id: 'cam10', name: 'NIKON ZFC + LENS NIKON Z DX 16-50mm F3.5-6.3 VR (SILVER)',          priceDisplay: '24,000,000đ', img: 'https://mayanhvietnam.com/image-data/san-pham/26-01/26-01-02/260102105356303/avatar/639029480446269883_nikon-zfc-lens-nikon-z-dx-16-50mm-f3-5-6-3-vr-silver.jpg',   link: '/san-pham/nikon-zfc-lens-nikon-z-dx-1650-f3563-vr-silver_may-anh-mirrorless-260102105356303' },
];

export const TOP_LENSES: HomepageProduct[] = [
  { id: 'len1',  name: 'Canon RF 24-70mm f/2.8L IS USM | Chính hãng',                    priceDisplay: '48,900,000đ', img: 'https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-10/230210234357844/avatar/01_ong-kinh-canon-rf-24-70mm-f-2-8l-is-usm-chinh-hang.jpg',                                     link: '/san-pham/ong-kinh-canon-rf-2470-f28l-is-usm-chinh-hang_ong-kinh-mirrorless-230210234357844' },
  { id: 'len2',  name: 'Nikon Z 24-70mm f/2.8 S II',                                     priceDisplay: '69,000,000đ', img: 'https://mayanhvietnam.com/image-data/san-pham/25-09/25-09-22/250922103851025/avatar/638941343754731632_ong-kinh-nikon-z-24-70mm-f-2-8-s-ii.jpg',                                       link: '/san-pham/ong-kinh-nikon-z-2470-f28-s-ii_ong-kinh-mirrorless-250922103851025' },
  { id: 'len3',  name: 'Tamron 28-75mm F2.8 Di III VXD G2 for Nikon Z',                 priceDisplay: '17,900,000đ', img: 'https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-31/240831133137156/avatar/638722116807217083_ong-kinh-tamron-28-75mm-f2-8-di-iii-vxd-g2-for-nikon-z.jpg',              link: '/san-pham/ong-kinh-tamron-2875-f28-di-iii-vxd-g2-for-nikon-z_ong-kinh-mirrorless-240831133137156' },
  { id: 'len4',  name: 'Sigma 200mm F2 DG OS Sports for Sony E | Chính hãng',            priceDisplay: '85,320,000đ', img: 'https://mayanhvietnam.com/image-data/san-pham/25-08/25-08-20/250820095043213/avatar/638912804942323908_ong-kinh-sigma-200mm-f2-dg-os-sports-for-sony-e-chinh-hang.jpg',          link: '/san-pham/ong-kinh-sigma-200-f2-dg-os-sports-for-sony-e-chinh-hang_ong-kinh-mirrorless-250820095043213' },
  { id: 'len5',  name: 'Sigma 200mm F2 DG OS Sports ngàm L',                            priceDisplay: '85,320,000đ', img: 'https://mayanhvietnam.com/image-data/san-pham/25-08/25-08-20/250820100004596/avatar/638912808715148082_ong-kinh-sigma-200mm-f2-dg-os-sports-ngam-l.jpg',                                      link: '/san-pham/ong-kinh-sigma-200-f2-dg-os-sports-ngam-l_ong-kinh-mirrorless-250820100004596' },
  { id: 'len6',  name: 'Canon RF 50mm F1.8 STM | Chính hãng',                             priceDisplay: '4,500,000đ',  img: 'https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-03/240803094047373/avatar/638847186653427391_canon-rf-50mm-f1-8-stm-chinh-hang.jpg',                                           link: '/san-pham/canon-rf-50-f18-stm-chinh-hang_ong-kinh-mirrorless-240803094047373' },
  { id: 'len7',  name: 'Kase 85mm f/1.4 AF Lens (Nikon Z)',                               priceDisplay: '9,900,000đ',  img: 'https://mayanhvietnam.com/image-data/san-pham/25-10/25-10-06/251006173300230/avatar/638966646032677503_kase-85mm-f-1-4-af-lens-nikon-z.jpg',                                         link: '/san-pham/kase-85-f14-af-lens-nikon-z_ong-kinh-mirrorless-251006173300230' },
  { id: 'len8',  name: 'Viltrox 85mm f/1.4 Pro Nikon Z',                                  priceDisplay: '13,500,000đ', img: 'https://mayanhvietnam.com/image-data/san-pham/25-11/25-11-03/251103143407180/avatar/638977774249552971_ong-kinh-viltrox-85mm-f-1-4-pro-nikon-z.jpg',                                   link: '/san-pham/ong-kinh-viltrox-85-f14-pro-nikon-z_ong-kinh-mirrorless-251103143407180' },
  { id: 'len9',  name: 'Nikon Z 24-70mm f/4 S | Chính hãng VIC',                        priceDisplay: '9,500,000đ',  img: 'https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-10/230210235800676/avatar/01_ong-kinh-nikon-z-24-70mm-f-4-s-chinh-hang-vic.jpg',                                   link: '/san-pham/ong-kinh-nikon-z-2470-f4-s-chinh-hang-vic_ong-kinh-mirrorless-230210235800676' },
  { id: 'len10', name: 'Canon RF 45mm F/1.2 STM | Chính Hãng',                            priceDisplay: '11,500,000đ', img: 'https://mayanhvietnam.com/image-data/san-pham/25-11/25-11-06/251106133811267/avatar/638982144738436897_ong-kinh-canon-rf-45mm-f-1-2-stm-chinh-hang.jpg',                               link: '/san-pham/ong-kinh-canon-rf-45-f12-stm-chinh-hang_ong-kinh-mirrorless-251106133811267' },
];

export const TOP_FLYCAM: HomepageProduct[] = [
  { id: 'fly1',  name: 'DJI Mini 5 Pro (Base) | Chính Hãng',                                     priceDisplay: 'Vui lòng gọi', img: '', link: '/san-pham/dji-mini-5-pro-base-chinh-hang_flycam-250912094317313' },
  { id: 'fly2',  name: 'DJI Mavic 4 Pro 512GB Creator Combo',                                      priceDisplay: 'Vui lòng gọi', img: '', link: '/san-pham/dji-mavic-4-pro-512gb-creator-combo_flycam-250515085035248' },
  { id: 'fly3',  name: 'FLYCAM DJI AIR 3S FLY MORE COMBO (DJI RC 2) (CHÍNH HÃNG)',              priceDisplay: 'Vui lòng gọi', img: '', link: '/san-pham/flycam-dji-air-3s-fly-more-combo-dji-rc-2-chinh-hang_flycam-241102144506281' },
  { id: 'fly4',  name: 'DJI Mini 4 Pro Fly More combo Plus (DJI RC 2) (GL)',                     priceDisplay: 'Vui lòng gọi', img: '', link: '/san-pham/dji-mini-4-pro-fly-more-combo-plus-dji-rc-2-gl_flycam-230926111234846' },
  { id: 'fly5',  name: 'DJI Mini 3 Fly More Combo Plus (+ DJI RC)',                                priceDisplay: 'Vui lòng gọi', img: '', link: '/san-pham/dji-mini-3-fly-more-combo-plus-dji-rcn1_flycam-230212121334389' },
  { id: 'fly6',  name: 'FLYCAM DJI Mini SE Fly More Combo | Chính hãng',                         priceDisplay: 'Vui lòng gọi', img: '', link: '/san-pham/flycam-dji-mini-se-fly-more-combo-chinh-hang_flycam-230212121217801' },
  { id: 'fly7',  name: 'DJI AVATA 2 FLY MORE COMBO (THREE BATTERIES) (CHÍNH HÃNG)',             priceDisplay: 'Vui lòng gọi', img: '', link: '/san-pham/dji-avata-2-fly-more-combo-three-batteries-chinh-hang_flycam-241102151301701' },
  { id: 'fly8',  name: 'DJI Mini 2 SE',                                                          priceDisplay: 'Vui lòng gọi', img: '', link: '/san-pham/dji-mini-2-se_flycam-230212121328449' },
  { id: 'fly9',  name: 'FLYCAM DJI MINI 4K FLY MORE COMBO (GL) (CHÍNH HÃNG)',                   priceDisplay: 'Vui lòng gọi', img: '', link: '/san-pham/flycam-dji-mini-4k-fly-more-combo-gl-chinh-hang_flycam-241016175318300' },
  { id: 'fly10', name: 'DJI MAVIC 3 PRO (DJI RC)',                                              priceDisplay: 'Vui lòng gọi', img: '', link: '/san-pham/dji-mavic-3-pro-dji-rc_flycam-240808121546027' },
];

export const TOP_ACTION_CAMERA: HomepageProduct[] = [
  { id: 'act1',  name: 'DJI Osmo Nano Standard Combo (64GB) | Chính hãng',                    priceDisplay: '8,470,000đ',  img: '', link: '/san-pham/dji-osmo-nano-standard-combo-64gb-chinh-hang_action-camera-250912092924846' },
  { id: 'act2',  name: 'DJI Osmo Action 5 Pro Adventure Combo',                              priceDisplay: '9,900,000đ',  img: '', link: '/san-pham/dji-osmo-action-5-pro-adventure-combo_action-camera-260226105739670' },
  { id: 'act3',  name: 'Insta360 GO Ultra Creator Bundle (Arctic White)',                   priceDisplay: 'Vui lòng gọi', img: '', link: '/san-pham/insta360-go-ultra-creator-bundle-arctic-white_action-camera-251013163315254' },
  { id: 'act4',  name: 'Insta360 GO Ultra Standard Bundle (Arctic White)',                    priceDisplay: '11,900,000đ', img: '', link: '/san-pham/action-camera-insta360-go-ultra-standard-bundle-arctic-white_action-camera-250814102845826' },
  { id: 'act5',  name: 'DJI Osmo Nano Standard Combo (128GB) | Chính hãng',                 priceDisplay: '8,400,000đ',  img: '', link: '/san-pham/dji-osmo-nano-standard-combo-128gb-chinh-hang_action-camera-250925153519860' },
  { id: 'act6',  name: 'Insta360 GO Ultra Standard Bundle (Midnight Black)',                  priceDisplay: '11,900,000đ', img: '', link: '/san-pham/action-camera-insta360-go-ultra-standard-bundle-midnight-black_action-camera-250814103031910' },
  { id: 'act7',  name: 'DJI Osmo Action 4 Adventure Combo',                                 priceDisplay: '8,190,000đ',  img: '', link: '/san-pham/dji-osmo-action-4-adventure-combo_action-camera-230805002213412' },
  { id: 'act8',  name: 'GoPro Hero 13 Black',                                                priceDisplay: '9,690,000đ',  img: '', link: '/san-pham/gopro-hero-13-black_action-camera-250102113303811' },
  { id: 'act9',  name: 'DJI Osmo Pocket 4 Creator Combo',                                    priceDisplay: '14,740,000đ', img: '', link: '/san-pham/may-quay-dji-osmo-pocket-4-creator-combo_action-camera-260330085702564' },
  { id: 'act10', name: 'DJI Osmo Pocket 4',                                                  priceDisplay: '12,990,000đ', img: '', link: '/san-pham/may-quay-dji-osmo-pocket-4_action-camera-260330091754463' },
];

/* ── Featured product (scraped) ──────────────────────────────── */
export const FEATURED_PRODUCT = {
  name: 'Máy ảnh Nikon Z6 II (Body Only)',
  description: 'Nikon Z6 II là mẫu máy ảnh mirrorless kế nhiệm của Nikon Z6. Giống như Nikon Z6, Nikon Z6 II được thiết kế hoàn toàn bằng hợp kim Magiê tạo độ chắc chắn...',
  detailUrl: 'https://mayanhvietnam.com/san-pham/may-anh-nikon-z6-ii-body-only_may-anh-mirrorless-230418180440520',
  badges: ['Giao hàng Toàn quốc', 'Sản phẩm Chính hãng', 'Bảo hành Lâu dài', 'Thanh toán Đa dạng'],
};

/* ── Reviews section (scraped) ──────────────────────────────── */
export const REVIEWS_SECTION = {
  title: 'REVIEWS SẢN PHẨM',
  youtubeUrl: 'https://www.youtube.com/@mayanhvietnam',
};

/* ── Footer data (scraped) ─────────────────────────────────── */
export interface FooterLink { name: string; href: string; }
export interface SocialLink { platform: string; url: string; }
export interface StoreLocation { region: string; address: string; hours: string; }
export interface FooterData {
  tagline: string;
  policies: FooterLink[];
  paymentMethods: string[];
  paymentIcons: string[]; // relative paths → prepend CDN
  socialLinks: SocialLink[];
  storeLocations: StoreLocation[];
}

export const FOOTER: FooterData = {
  tagline: 'Máy Ảnh Việt Nam là đơn vị tiên phong trong lĩnh vực phân phối và bán lẻ các sản phẩm máy ảnh tại thị trường Việt Nam.',
  policies: [
    { name: 'Chính sách bảo hành',                      href: '/chinh-sach-bao-hanh' },
    { name: 'Chính sách thanh toán',                    href: '/chinh-sach-thanh-toan' },
    { name: 'Chính sách đổi trả, Hoàn Tiền',           href: '/chinh-sach-bao-hanh#chinhSachDoiTraHoanTien' },
    { name: 'Chính sách vận chuyển',                   href: '/chinh-sach-van-chuyen' },
    { name: 'Chính sách bảo mật thông tin khách hàng', href: '/chinh-sach-bao-mat-thong-tin-khach-hang' },
    { name: 'Thông tin liên hệ',                        href: '/thong-tin-lien-he' },
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
    { platform: 'YouTube',   url: 'https://www.youtube.com/@benhvienmayanhvietnam950' },
    { platform: 'TikTok',    url: 'https://www.tiktok.com/@mayanhvietnam' },
    { platform: 'Facebook',  url: 'https://www.facebook.com/mayanhvietnam' },
    { platform: 'Email',      url: 'mailto:info@mayanhvietnam.com' },
    { platform: 'Hotline',   url: 'tel:0907215252' },
  ],
  storeLocations: [
    { region: 'TP.Hồ Chí Minh', address: 'Số 9, Nam Quốc Cang, Phường Bến Thành, TP Hồ Chí Minh', hours: '09:00 – 19:00 mỗi ngày' },
    { region: 'TP. Cần Thơ',   address: 'Số 58 Nguyễn Hiền, Khu Dân Cư 91B, phường Tân An, TP. Cần Thơ', hours: '08:00 – 20:00 mỗi ngày' },
  ],
};

/* ── Header real data ──────────────────────────────────────── */
export const SITE_HOTLINE = { short: '0907-215-252', full: '0907-215-252' };
export const TOP_NAV_TABS = ['Xem tất cả', 'Sản phẩm mới', 'Sản phẩm cũ'];

/* ── Local UI types ─────────────────────────────────────────── */
export interface Product {
  id: number; brand: string; name: string; category: string;
  price: number; originalPrice: number | null; badge: string | null;
  rating: number; reviews: number; img: string; thumbs: string[];
  specs: { label: string; value: string }[]; desc: string;
  features: string[]; inBox: string[];
}

export interface Brand {
  id: string; name: string; logo: string; country: string;
  founded: number; products: number; desc: string; color: string; img: string;
}

export interface NewsItem {
  id: number; category: string; tag: string | null; title: string;
  excerpt: string; author: string; authorRole: string;
  date: string; readTime: string; img: string;
}

export interface Store {
  city: string; address: string; phone: string; hours: string; map: string;
}

/* ── Adapter: ProductSummary → Product ──────────────────────── */
export const PRODUCTS: Product[] = _allProducts.map((p) => ({
  id: parseInt(p.id.replace(/\D/g, '') || '0', 10),
  brand: p.brand, name: p.name, category: p.category,
  price: p.price, originalPrice: p.originalPrice ?? null,
  badge: p.badges?.[0]?.label ?? null,
  rating: p.rating?.average ?? 0, reviews: p.rating?.count ?? 0,
  img: p.thumbnail || p.images?.[0]?.url || '',
  thumbs: (p.images ?? []).map((i) => i.url),
  specs: (p.specs ?? []).flatMap((g) => g.items),
  desc: p.description ?? '', features: p.highlights ?? [],
  inBox: p.packageIncludes ?? [],
}));

export const getProductById = (id: number): Product | undefined =>
  PRODUCTS.find((p) => p.id === id);

/* ── Local demo data ────────────────────────────────────────── */
export const BRANDS: Brand[] = [
  { id: 'canon',    name: 'Canon',    logo: '🔴', country: 'Nhật Bản', founded: 1937, products: 156, desc: 'Thương hiệu máy ảnh hàng đầu thế giới, nổi tiếng với công nghệ Dual Pixel AF và hệ sinh thái ống kính RF phong phú.', color: '#CC0000', img: 'https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-10/230210223748534/avatar/01_may-anh-canon-eos-r6-mark-ii-chinh-hang.jpg' },
  { id: 'sony',     name: 'Sony',     logo: '🔵', country: 'Nhật Bản', founded: 1946, products: 98,  desc: 'Pioneer của cảm biến BSI CMOS và hệ thống AF tiên tiến nhất. Sony Alpha là lựa chọn hàng đầu của content creator toàn cầu.', color: '#003087', img: 'https://mayanhvietnam.com/image-data/san-pham/23-01/23-01-16/230116131956524/avatar/01_may-anh-sony-a7-iv-body-chinh-hang.jpg' },
  { id: 'nikon',    name: 'Nikon',    logo: '🟡', country: 'Nhật Bản', founded: 1917, products: 87,  desc: 'Thương hiệu máy ảnh lâu đời nhất thế giới. Hệ thống Z-mount với đường kính lớn nhất ngành.', color: '#1C3F94', img: 'https://mayanhvietnam.com/image-data/san-pham/24-10/24-10-15/241015142345678/avatar/01_may-anh-nikon-z8-body-chinh-hang.jpg' },
  { id: 'fujifilm', name: 'Fujifilm', logo: '🟢', country: 'Nhật Bản', founded: 1934, products: 74,  desc: 'Độc đáo với hệ thống Film Simulation tái tạo màu sắc phim analog. Thiết kế retro và chất lượng ảnh tuyệt vời.', color: '#E4002B', img: 'https://mayanhvietnam.com/image-data/san-pham/23-01/23-01-16/230116131956524/avatar/01_may-anh-fujifilm-x-t5-body-chinh-hang.jpg' },
  { id: 'dji',      name: 'DJI',      logo: '⬛', country: 'Trung Quốc', founded: 2006, products: 47, desc: 'Dẫn đầu thị trường drone và gimbal toàn cầu. Trải nghiệm quay phim aerial chuyên nghiệp.', color: '#333', img: 'https://mayanhvietnam.com/image-data/san-pham/23-09/23-09-05/230905154321/avatar/01_dji-mini-4-pro-chinh-hang.jpg' },
  { id: 'sigma',    name: 'Sigma',    logo: '⚫', country: 'Nhật Bản', founded: 1961, products: 63,  desc: 'Chuyên gia ống kính Art, Contemporary và Sports. Tiêu chuẩn vàng về chất lượng quang học.', color: '#555', img: 'https://mayanhvietnam.com/image-data/san-pham/23-01/23-01-16/230116131956524/avatar/01_ong-kinh-sigma-35mm-art.jpg' },
  { id: 'tamron',   name: 'Tamron',   logo: '🔷', country: 'Nhật Bản', founded: 1950, products: 38,  desc: 'Ống kính giá tốt, chất lượng cao. Dòng 17-70mm f/2.8 và 28-75mm f/2.8 phổ biến nhất.', color: '#0047AB', img: 'https://mayanhvietnam.com/image-data/san-pham/23-01/23-01-16/230116131956524/avatar/01_ong-kinh-tamron.jpg' },
  { id: 'godox',    name: 'Godox',    logo: '🟠', country: 'Trung Quốc', founded: 2004, products: 89, desc: 'Đèn flash chuyên nghiệp phổ biến nhất Việt Nam. Hệ thống X 2.4GHz điều khiển không dây.', color: '#FF6600', img: 'https://mayanhvietnam.com/image-data/san-pham/23-01/23-01-16/230116131956524/avatar/01_den-godox-ad300pro.jpg' },
];

export const NEWS: NewsItem[] = [
  { id: 1, category: 'Review',     tag: 'HOT',  title: 'Canon EOS R6 Mark II: Đánh giá sau 3 tháng sử dụng thực tế',       excerpt: 'Sau 3 tháng cầm trên tay Canon EOS R6 Mark II, chúng tôi có đủ dữ liệu để đưa ra đánh giá toàn diện nhất.', author: 'Minh Tuấn', authorRole: 'Senior Reviewer', date: '10/06/2025', readTime: '12 phút đọc', img: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=700&h=420&fit=crop&auto=format' },
  { id: 2, category: 'Hướng dẫn', tag: 'NEW',  title: 'Chụp ảnh chân dung nghệ thuật với Sony A7 IV và FE 85mm f/1.4',         excerpt: 'Bộ đôi Sony A7 IV và ống kính FE 85mm f/1.4 GM II là combination hoàn hảo cho nhiếp ảnh chân dung.', author: 'Thu Hà', authorRole: 'Portrait Photographer', date: '05/06/2025', readTime: '8 phút đọc', img: 'https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?w=700&h=420&fit=crop&auto=format' },
  { id: 3, category: 'Tin tức',   tag: null,    title: 'DJI Mini 4 Pro ra mắt tại Việt Nam: Giá bán và nơi mua chính hãng',  excerpt: 'DJI chính thức ra mắt Mini 4 Pro tại thị trường Việt Nam. Flycam nhỏ gọn nhất tích hợp tránh vật cản 4 chiều.', author: 'Hoàng Phúc', authorRole: 'Tech Journalist', date: '01/06/2025', readTime: '5 phút đọc', img: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=700&h=420&fit=crop&auto=format' },
  { id: 4, category: 'So sánh',   tag: null,    title: 'Fujifilm X-T5 vs Canon EOS R7: Đâu là lựa chọn tốt hơn cho bạn?',      excerpt: 'Hai máy ảnh APS-C tốt nhất đối đầu trực tiếp. So sánh chi tiết về cảm biến, tốc độ, video và Film Simulation vs DPAF.', author: 'Minh Tuấn', authorRole: 'Senior Reviewer', date: '28/05/2025', readTime: '15 phút đọc', img: 'https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?w=700&h=420&fit=crop&auto=format' },
  { id: 5, category: 'Hướng dẫn', tag: null,   title: '5 thiết lập giúp bạn chụp ảnh thiên hà đẹp nhất với máy ảnh mirrorless', excerpt: 'Chụp ảnh thiên hà không còn là đặc quyền của chuyên gia. Với máy ảnh mirrorless hiện đại và vài thiết lập đúng.', author: 'Thu Hà', authorRole: 'Landscape Photographer', date: '22/05/2025', readTime: '10 phút đọc', img: 'https://images.unsplash.com/photo-1536632087471-3cf3f2986328?w=700&h=420&fit=crop&auto=format' },
  { id: 6, category: 'Review',     tag: null,    title: 'Sigma 35mm f/1.4 DG DN Art: Ống kính góc rộng tốt nhất cho Sony E-Mount', excerpt: 'Sigma Art series tiếp tục gây ấn tượng với 35mm f/1.4 DN phiên bản mới. Test toàn diện trên Sony A7 IV.', author: 'Hoàng Phúc', authorRole: 'Gear Reviewer', date: '18/05/2025', readTime: '9 phút đọc', img: 'https://images.unsplash.com/photo-1546434946-1185c1319364?w=700&h=420&fit=crop&auto=format' },
];

export const STORES: Store[] = _sharedStores.map((s) => ({
  city: s.city, address: s.address, phone: s.phone, hours: s.hours,
  map: `${s.name} — ${s.address}`,
}));
export const sharedStores = _sharedStores;
