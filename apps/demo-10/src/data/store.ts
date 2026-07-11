/**
 * Store landing page data — mayanhvietnam.com adapted from Insta360 design pattern.
 * All product/category data from @mayanhvietnam/mock-data.
 */

import {
  allProducts,
  categories,
  heroSlides,
  promotionalBanners,
  stores,
  reviews,
  BRAND_META,
  getBrandBanners,
  HOTLINE_FULL,
  SITE_EMAIL,
  COMPANY_NAME,
  COMPANY_ADDRESS,
  footerPolicies,
  paymentIcons,
  paymentMethods,
  socialLinks,
} from '@mayanhvietnam/mock-data';

// ─── Helpers ────────────────────────────────────────────────────────────────

const CDN = 'https://mayanhvietnam.com';

function formatVND(amount: number): string {
  if (amount >= 100_000_000) return `${(amount / 1_000_000).toFixed(1)} triệu`;
  return new Intl.NumberFormat('vi-VN').format(amount) + 'đ';
}

// ─── Banner (hero carousel) ─────────────────────────────────────────────────

export const banners = heroSlides.map((s) => ({
  name: s.title,
  image: s.image,
  link: s.ctaHref,
}));

// ─── Category graphic nav ────────────────────────────────────────────────────

export const graphicNav = categories
  .filter((c) => c.productCount > 0)
  .map((c) => ({
    name: c.name,
    image: c.image,
    slug: c.slug,
    tag: c.id === '5' ? 'Hot' : c.id === '10' ? '⚡' : undefined,
  }));

// ─── Consumer products (top picks from each category) ────────────────────────

export const consumerProducts = allProducts.map((p) => ({
  name: p.name,
  tagline: p.description?.substring(0, 60) ?? '',
  price: formatVND(p.price),
  originalPrice: p.originalPrice ? formatVND(p.originalPrice) : undefined,
  image: p.thumbnail,
  slug: p.slug,
  category: p.category,
  tag: p.isNew ? 'Mới' : p.originalPrice ? 'KM' : undefined,
  rating: p.rating?.average ?? 0,
  reviewCount: p.rating?.count ?? 0,
}));

// ─── Shop by interest (video/interest cards) ────────────────────────────────

export const shopByInterest = [
  {
    name: 'Portrait Photography',
    poster: `${CDN}/asset/imgs/img/danhMuc_MayAnh.webp`,
    tagline: 'Cho người chụp chân dung & phong cách',
    categorySlug: 'may-anh',
  },
  {
    name: 'Drone / Flycam',
    poster: `${CDN}/asset/imgs/img/danhMuc_flycam.webp`,
    tagline: 'Bay cao, bắt trọn khoảnh khắc',
    categorySlug: 'flycam',
  },
  {
    name: 'Action & Adventure',
    poster: `${CDN}/asset/imgs/img/danhMuc_action.webp`,
    tagline: 'Cho người yêu phiêu lưu và vận động',
    categorySlug: 'action-camera',
  },
  {
    name: 'Studio & Cinema',
    poster: `${CDN}/asset/imgs/img/danhMuc_mayQuayPhim.webp`,
    tagline: 'Cho filmmaker và studio chuyên nghiệp',
    categorySlug: 'may-quay-phim',
  },
];

// ─── Trust badges ───────────────────────────────────────────────────────────

export const trustBadges = [
  { text: 'Giao hàng toàn quốc — Miễn phí đơn từ 1 triệu' },
  { text: 'Sản phẩm chính hãng 100%' },
  { text: 'Bảo hành 12-24 tháng' },
  { text: 'Đổi trả dễ dàng trong 7 ngày' },
  { text: 'Hỗ trợ kỹ thuật trọn đời' },
  { text: 'Thanh toán đa dạng, an toàn' },
  { text: '4 cửa hàng toàn quốc' },
];

// ─── Accessories (from accessory products) ──────────────────────────────────

export const accessories = allProducts
  .filter((p) => p.category === 'phu-kien' || p.category === 'thiet-bi-studio')
  .map((p) => ({
    name: p.name,
    price: formatVND(p.price),
    image: p.thumbnail,
    slug: p.slug,
  }));

// ─── Community (reviews as community cards) ─────────────────────────────────

export const communityImages = reviews.map((r) => ({
  creator: r.authorName,
  title: r.comment.substring(0, 40) + '…',
  product: r.productPurchased ?? 'Máy Ảnh Việt Nam',
}));

// ─── Footer ─────────────────────────────────────────────────────────────────

export const footerColumns = [
  {
    title: 'Danh mục sản phẩm',
    links: categories
      .filter((c) => c.productCount > 0)
      .slice(0, 7)
      .map((c) => ({ label: c.name, href: `/danh-muc/${c.slug}` })),
  },
  {
    title: 'Chính sách & Hỗ trợ',
    links: footerPolicies.map((p) => ({ label: p.name, href: p.link })),
  },
  {
    title: 'Thông tin liên hệ',
    links: [
      { label: `Hotline: ${HOTLINE_FULL}`, href: `tel:${HOTLINE_FULL.replace(/-/g, '')}` },
      { label: SITE_EMAIL, href: `mailto:${SITE_EMAIL}` },
      ...stores.slice(0, 3).map((s) => ({ label: `${s.city}: ${s.address}`, href: '#' })),
    ],
  },
  {
    title: 'Kết nối',
    links: socialLinks.map((s) => ({ label: s.platform, href: s.url })),
  },
];

// ─── Brand banners ──────────────────────────────────────────────────────────

export const brandBanners = getBrandBanners().slice(0, 6);

// ─── Helpers ────────────────────────────────────────────────────────────────

const CDN = 'https://mayanhvietnam.com';

function formatVND(amount: number): string {
  if (amount >= 100_000_000) return `${(amount / 1_000_000).toFixed(1)} triệu`;
  return new Intl.NumberFormat('vi-VN').format(amount) + 'đ';
}

// Re-export for component imports
export {
  stores,
  reviews,
  COMPANY_NAME,
  BRAND_META,
  HOTLINE_FULL,
  SITE_EMAIL,
  COMPANY_ADDRESS,
  paymentIcons,
};
