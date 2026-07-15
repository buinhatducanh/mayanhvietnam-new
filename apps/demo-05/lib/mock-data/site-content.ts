import type { SiteContent, PromotionalBanner } from './types';

const CDN = 'https://mayanhvietnam.com';

/**
 * Site-wide content: hotline, policies, payment, social.
 * Source: mayanhvietnam.com homepage 2026-07-10
 */
export const siteContent: SiteContent = {
  hotline: '0937.148.222',
  hotlineFull: '0907-215-252',
  siteEmail: 'info@mayanhvietnam.com',
  companyName: 'CÔNG TY TNHH DỊCH VỤ TƯ VẤN VÀ CÔNG NGHỆ SÀI GÒN',
  companyAddress: 'Số 09 Nam Quốc Cang, Phường Bến Thành, TP Hồ Chí Minh',
  taxId: '0313859872-002',
  footerPolicies: [
    { name: 'Chính sách bảo hành', link: '/chinh-sach-bao-hanh' },
    { name: 'Chính sách thanh toán', link: '/chinh-sach-thanh-toan' },
    { name: 'Chính sách đổi trả, Hoàn Tiền', link: '/chinh-sach-bao-hanh#chinhSachDoiTraHoanTien' },
    { name: 'Chính sách vận chuyển', link: '/chinh-sach-van-chuyen' },
    { name: 'Chính sách bảo mật thông tin', link: '/chinh-sach-bao-mat-thong-tin-khach-hang' },
    { name: 'Thông tin liên hệ', link: '/thong-tin-lien-he' },
  ],
  paymentMethods: ['VISA', 'MasterCard', 'JCB', 'ATM / Napas', 'Home PayLater', 'MoMo'],
  paymentIcons: [
    { name: 'VISA', url: `${CDN}/asset/imgs/icon/hinhThucThanhToan/visa_icon_44fe6e15ed.svg` },
    { name: 'MasterCard', url: `${CDN}/asset/imgs/icon/hinhThucThanhToan/mastercard_icon_c75f94f6a5.svg` },
    { name: 'JCB', url: `${CDN}/asset/imgs/icon/hinhThucThanhToan/jcb_icon_214783937c.svg` },
    { name: 'ATM / Napas', url: `${CDN}/asset/imgs/icon/hinhThucThanhToan/napas_icon_94d5330e3c.svg` },
    { name: 'Home PayLater', url: `${CDN}/asset/imgs/icon/hinhThucThanhToan/homepaylater_icon_adef600842.svg` },
    { name: 'MoMo', url: `${CDN}/asset/imgs/icon/hinhThucThanhToan/momo_icon_baef21b5f7.svg` },
  ],
  socialLinks: [
    { platform: 'YouTube', url: 'https://www.youtube.com/@benhvienmayanhvietnam950' },
    { platform: 'TikTok', url: 'https://www.tiktok.com/@mayanhvietnam' },
    { platform: 'Facebook', url: 'https://www.facebook.com/mayanhvietnam' },
    { platform: 'Zalo', url: 'https://zalo.me/2875467351509223987' },
  ],
};

/**
 * Promotional banners — from homepage.json
 */
export const promotionalBanners: PromotionalBanner[] = [
  {
    label: 'FLASH SALE',
    title: 'Ưu đãi sốc trong ngày',
    description: 'Giảm giá đến 50% cho các sản phẩm nổi bật.',
    link: '/danh-muc/san-pham-flash-sale',
  },
  {
    label: 'SẢN PHẨM NỔI BẬT',
    title: 'Máy ảnh và ống kính hot nhất',
    description: 'Được khách hàng tin dùng và đánh giá cao.',
    link: '/danh-muc/san-pham-khuyen-mai',
  },
  {
    label: 'SẢN PHẨM KHUYẾN MÃI',
    title: 'Quà tặng & ưu đãi đặc biệt',
    description: 'Tặng kèm phụ kiện, thẻ nhớ, dán màn hình miễn phí.',
    link: '/danh-muc/san-pham-khuyen-mai',
  },
  {
    label: 'SẢN PHẨM CŨ KHUYẾN MÃI',
    title: 'Hàng cũ giá tốt',
    description: 'Sản phẩm like-new, bảo hành chính hãng, giá hấp dẫn.',
    link: '/danh-muc/san-pham-cu',
  },
];

// ─── Legacy shorthand exports (backward compat with demo-01) ─────────────────
export const HOTLINE = siteContent.hotline;
export const HOTLINE_FULL = siteContent.hotlineFull;
export const SITE_EMAIL = siteContent.siteEmail;
export const COMPANY_NAME = siteContent.companyName;
export const COMPANY_ADDRESS = siteContent.companyAddress;
export const TAX_ID = siteContent.taxId;
export const footerPolicies = siteContent.footerPolicies;
export const paymentMethods = siteContent.paymentMethods;
export const paymentIcons = siteContent.paymentIcons;
export const socialLinks = siteContent.socialLinks;
