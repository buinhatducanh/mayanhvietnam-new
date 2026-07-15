/**
 * Adapter — bridge `../../lib/mock-data` (ProductSummary) → demo-08 local types
 *
 * Đây là nguồn dữ liệu trung tâm duy nhất của demo-08.
 * Các file `src/data/*.ts` re-export từ đây để backward compat.
 */

import type { ProductSummary } from '../../lib/mock-data';

// ─── Demo-08 local types ──────────────────────────────────────────────────────

export interface ProductImage {
  url: string;
  alt: string;
  isPrimary: boolean;
}

export interface ProductVariant {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  sku: string;
  available: boolean;
  type: 'kit' | 'color' | 'mount' | 'storage' | 'condition';
  condition?: string;
  quantity?: number;
  priceText?: string;
}

export interface SpecItem {
  label: string;
  value: string;
}

export interface SpecGroup {
  groupName: string;
  items: SpecItem[];
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  categoryId: string;
  categorySlug: string;
  categoryName: string;
  isUsed: boolean;
  price: number;
  priceText?: string;
  originalPrice?: number;
  thumbnail: string;
  images: ProductImage[];
  badges: string[];
  rating: { average: number; count: number };
  availability: 'in_stock' | 'out_of_stock' | 'pre_order' | 'call';
  mount?: string;
  compatibleMounts?: string[];
  shortDescription: string;
  description: string;
  variants?: ProductVariant[];
  specs?: SpecGroup[];
  promotions?: string[];
  featured: boolean;
  flashSale?: boolean;
  flashSalePrice?: number;
  soldCount: number;
  sku: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
  productCount: number;
  color: string;
  bgColor: string;
  featured: boolean;
  image?: string;
  cardLabel?: string;
}

export interface Store {
  id: string;
  name: string;
  address: string;
  city: string;
  phone: string;
  email: string;
  hours: string;
  mapsUrl: string;
  coordinates: { lat: number; lng: number };
  imageUrl: string;
  isPrimary: boolean;
}

export interface Review {
  id: string;
  authorName: string;
  avatar: string;
  rating: number;
  comment: string;
  productPurchased: string;
  productSlug: string;
  date: string;
  verified: boolean;
  helpful: number;
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  logo: string;
  website: string;
  country: string;
  productCount: number;
}

export interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaHref: string;
  desktopImage: string;
  mobileImage: string;
  alt: string;
  priority: boolean;
  bgGradient: string;
}

export interface PromoBanner {
  id: string;
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaHref: string;
  image: string;
  bgColor: string;
  textColor: string;
}

export interface FlashSale {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  discountPercent: number;
  bannerColor: string;
}

// ─── Import shared data ───────────────────────────────────────────────────────

import {
  allProducts as _allProducts,
  categories as _categories,
  stores as _stores,
  reviews as _reviews,
  getAllBrands,
  flashSaleData,
  heroSlides as _heroSlides,
  promotionalBanners as _promotionalBanners,
  HOTLINE,
  HOTLINE_FULL,
  SITE_EMAIL,
  COMPANY_NAME,
  COMPANY_ADDRESS,
  TAX_ID,
  footerPolicies,
  paymentIcons,
  paymentMethods,
  socialLinks,
  cameraBodies,
  lensOptions,
} from '../../lib/mock-data';

// Re-export site constants
export {
  HOTLINE,
  HOTLINE_FULL,
  SITE_EMAIL,
  COMPANY_NAME,
  COMPANY_ADDRESS,
  TAX_ID,
  footerPolicies,
  paymentIcons,
  paymentMethods,
  socialLinks,
  cameraBodies,
  lensOptions,
};

export const heroSlides: HeroSlide[] = [
  {
    id: 'hs-1',
    title: 'Canon EOS R50 Black + RF-S 18-45mm',
    subtitle: 'Máy ảnh entry-level tốt nhất 2025',
    desktopImage: 'https://mayanhvietnam.com/asset/imgs/img/banner/canon_r50_trang_den.webp',
    mobileImage: 'https://mayanhvietnam.com/asset/imgs/img/banner/canon_r50_trang_den.webp',
    alt: 'Canon EOS R50 Black',
    ctaLabel: 'Xem chi tiết',
    ctaHref: '/san-pham/may-anh-canon-eos-r50-black-kem-lens-rfs-1845-chinh-hang_may-anh-mirrorless-241228112737843',
    priority: true,
    bgGradient: 'from-gray-900 to-gray-800'
  },
  {
    id: 'hs-2',
    title: 'Sony A7 V (A7M5) chính hãng',
    subtitle: 'Ưu đãi đặc biệt khi đặt trước tại mayanhvietnam',
    desktopImage: 'https://mayanhvietnam.com/asset/imgs/img/banner/uuDai-sonya7v-DCHS.webp',
    mobileImage: 'https://mayanhvietnam.com/asset/imgs/img/banner/uuDai-sonya7v-DCHS.webp',
    alt: 'Sony A7 V',
    ctaLabel: 'Xem ngay',
    ctaHref: '/san-pham/may-anh-sony-a7-mark-v-a7m5-chinh-hang_may-anh-mirrorless-251126090035598',
    priority: false,
    bgGradient: 'from-blue-900 to-indigo-800'
  }
];

// ─── Formatters ───────────────────────────────────────────────────────────────

export const formatPrice = (price?: number, priceText?: string): string => {
  if (priceText) return priceText;
  if (!price || price === 0) return 'Vui lòng gọi';
  return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
};

export const getDiscountPercent = (price: number, originalPrice: number): number => {
  return Math.round(((originalPrice - price) / originalPrice) * 100);
};

export function formatVND(amount: number): string {
  return new Intl.NumberFormat('vi-VN').format(amount) + 'đ';
}

// ─── Categories Cục Bộ ────────────────────────────────────────────────────────

export const categories: Category[] = [
  {
    id: 'cat-1',
    name: 'Máy ảnh',
    slug: 'may-anh',
    icon: 'camera',
    description: 'Máy ảnh Mirrorless Canon, Sony, Nikon chính hãng',
    productCount: 48,
    color: '#F97316',
    bgColor: '#FFF7ED',
    featured: true,
    cardLabel: 'Máy ảnh - Body',
    image: 'https://mayanhvietnam.com/asset/imgs/img/danhMuc_MayAnh.webp',
  },
  {
    id: 'cat-2',
    name: 'Ống kính',
    slug: 'ong-kinh',
    icon: 'aperture',
    description: 'Canon RF, Sony E, Nikon Z, Sigma, Tamron, Viltrox',
    productCount: 86,
    color: '#EA580C',
    bgColor: '#FFF7ED',
    featured: true,
    cardLabel: 'Ống kính - Lens',
    image: 'https://mayanhvietnam.com/asset/imgs/img/danhMuc_ongkinh.webp',
  },
  {
    id: 'cat-3',
    name: 'Máy quay phim',
    slug: 'may-quay-phim',
    icon: 'video',
    description: 'DJI Osmo Pocket, máy quay phim chuyên nghiệp',
    productCount: 16,
    color: '#DC2626',
    bgColor: '#FEF2F2',
    featured: true,
    cardLabel: 'Máy quay phim',
    image: 'https://mayanhvietnam.com/asset/imgs/img/danhMuc_mayQuayPhim.webp',
  },
  {
    id: 'cat-4',
    name: 'Action Camera',
    slug: 'action-camera',
    icon: 'activity',
    description: 'DJI Osmo, Insta360, GoPro hành động',
    productCount: 24,
    color: '#16A34A',
    bgColor: '#F0FDF4',
    featured: true,
    cardLabel: 'Camera hành động',
    image: 'https://mayanhvietnam.com/asset/imgs/img/danhMuc_action.webp',
  },
  {
    id: 'cat-5',
    name: 'Flycam',
    slug: 'flycam',
    icon: 'navigation',
    description: 'DJI Mini, Mavic, Air, Avata các dòng flycam',
    productCount: 18,
    color: '#2563EB',
    bgColor: '#EFF6FF',
    featured: true,
    cardLabel: 'Flycam - Drone',
    image: 'https://mayanhvietnam.com/asset/imgs/img/danhMuc_flycam.webp',
  },
  {
    id: 'cat-6',
    name: 'Thiết bị Studio',
    slug: 'thiet-bi-studio',
    icon: 'lightbulb',
    description: 'Đèn chụp ảnh, phông nền, phụ kiện studio',
    productCount: 35,
    color: '#D97706',
    bgColor: '#FFFBEB',
    featured: true,
    cardLabel: 'Thiết bị Studio',
    image: 'https://mayanhvietnam.com/asset/imgs/img/danhMuc_thietBiStudio.webp',
  },
  {
    id: 'cat-7',
    name: 'Phụ kiện máy ảnh',
    slug: 'phu-kien',
    icon: 'layers',
    description: 'Dây đeo, túi máy ảnh, filter, chân máy, pin',
    productCount: 120,
    color: '#DB2777',
    bgColor: '#FDF2F8',
    featured: true,
    cardLabel: 'Phụ kiện máy ảnh',
    image: 'https://mayanhvietnam.com/asset/imgs/img/danhMuc_phuKien.webp',
  },
  {
    id: 'cat-8',
    name: 'Sản phẩm cũ',
    slug: '2nd-hand',
    icon: 'refresh-cw',
    description: 'Máy ảnh & ống kính cũ chất lượng, giá tốt',
    productCount: 63,
    color: '#7C3AED',
    bgColor: '#F5F3FF',
    featured: true,
    cardLabel: 'Sản phẩm cũ giá tốt',
    image: 'https://mayanhvietnam.com/asset/imgs/img/danhMuc_spCu.webp',
  }
];

// ─── Adapters ─────────────────────────────────────────────────────────────────

export function adaptProduct(p: ProductSummary): Product {
  const cat = categories.find(c => c.slug === p.category);
  return {
    id: p.id,
    slug: p.slug,
    name: p.name,
    brand: p.brand,
    categoryId: cat?.id || p.category,
    categorySlug: p.category,
    categoryName: cat?.name || p.category,
    isUsed: p.isUsed || p.category === '2nd-hand',
    price: p.price,
    priceText: formatPrice(p.price, p.callForPrice ? 'Vui lòng gọi' : undefined),
    originalPrice: p.originalPrice,
    thumbnail: p.thumbnail,
    images: (p.images ?? []).map(img => ({
      url: img.url,
      alt: img.alt || p.name,
      isPrimary: img.isPrimary ?? false,
    })),
    badges: (p.badges ?? []).map(b => typeof b === 'string' ? b : b.label),
    rating: p.rating || { average: 5.0, count: 12 },
    availability: p.callForPrice ? 'call' : (p.availability || 'in_stock'),
    mount: p.mount,
    compatibleMounts: p.mount ? [p.mount] : [],
    shortDescription: p.shortSpecs?.join(', ') || p.description || '',
    description: p.description || '',
    variants: (p.variants ?? []).map(v => ({
      id: v.id,
      name: v.name,
      price: v.price,
      sku: v.id,
      available: true,
      type: 'condition',
      condition: v.name,
    })),
    specs: (p.specs ?? []).map(s => ({
      groupName: s.group,
      items: s.items,
    })),
    promotions: p.highlights || [],
    featured: p.isNew || false,
    flashSale: flashSaleData?.products?.some((fp: { id: string }) => fp.id === p.id) || false,
    flashSalePrice: p.price,
    soldCount: 15,
    sku: p.sku || p.id,
  };
}

// ─── Public data merging ──────────────────────────────────────────────────────

import scrapedProducts from '../data/scraped-products.json';

const getAdaptedProducts = (): Product[] => {
  const localProducts = (scrapedProducts as any[]).map(p => {
    const cat = _categories.find(c => c.slug === p.category);
    const isUsed = p.isUsed ?? (p.category === '2nd-hand');
    return {
      ...p,
      categoryId: cat?.id || p.category,
      categorySlug: p.category,
      categoryName: cat?.name || p.category,
      isUsed: isUsed,
      priceText: p.priceText || (p.price === 0 ? 'Vui lòng gọi' : new Intl.NumberFormat('vi-VN').format(p.price) + 'đ'),
      images: p.images ?? [{ url: p.thumbnail, alt: p.name, isPrimary: true }],
      compatibleMounts: p.compatibleMounts ?? [],
      variants: p.variants ?? [],
      specs: p.specs ?? [],
      promotions: p.promotions ?? [],
      featured: p.featured ?? false,
      soldCount: p.soldCount ?? 15,
    } as Product;
  });

  const sharedProducts = _allProducts.map(adaptProduct);

  // Khóa định danh gộp (slug + trạng thái sử dụng) để lọc trùng hàng cũ/mới an toàn
  const localProductKeys = new Set(localProducts.map(p => `${p.slug}-${p.isUsed}`));
  const uniqueSharedProducts = sharedProducts.filter(p => !localProductKeys.has(`${p.slug}-${p.isUsed}`));

  return [...localProducts, ...uniqueSharedProducts];
};

export const products: Product[] = getAdaptedProducts();

// ─── Showrooms & Reviews ──────────────────────────────────────────────────────

export const stores: Store[] = _stores.map((s, index) => ({
  id: s.id,
  name: s.name,
  address: s.address,
  city: s.city,
  phone: s.phone,
  email: 'info@mayanhvietnam.com',
  hours: s.hours,
  mapsUrl: `https://maps.google.com/?q=${encodeURIComponent(s.address)}`,
  coordinates: index === 0 ? { lat: 10.7688, lng: 106.6895 } : { lat: 10.0289, lng: 105.7725 },
  imageUrl: `https://images.unsplash.com/photo-${1567401893414 + index * 10000}?w=400&q=80`,
  isPrimary: index === 0,
}));

export const mainStore = stores.find(s => s.isPrimary) || stores[0];

export const reviews: Review[] = [
  {
    id: 'r-1',
    authorName: 'Nguyễn Minh Quang',
    avatar: 'https://ui-avatars.com/api/?name=Minh+Quang&background=FFF7ED&color=EA580C&bold=true&size=128',
    rating: 5,
    comment: 'Shop tư vấn rất nhiệt tình, mình mới chơi máy ảnh được các bạn hướng dẫn thông số và cách chụp cặn kẽ.',
    productPurchased: 'Canon EOS R50 Kit 18-45mm',
    productSlug: 'canon-eos-r50',
    date: '2026-07-08',
    verified: true,
    helpful: 24,
  },
  {
    id: 'r-2',
    authorName: 'Trần Thu Hà',
    avatar: 'https://ui-avatars.com/api/?name=Thu+Ha&background=FFF7ED&color=EA580C&bold=true&size=128',
    rating: 5,
    comment: 'Đóng gói kỹ, giao hàng về miền Tây chỉ mất 1 ngày là nhận được. Máy ảnh Sony A6700 dùng rất thích, quay phim lấy nét mắt cực nhanh. Sẽ ủng hộ shop dài lâu!',
    productPurchased: 'Sony Alpha A6700 Body',
    productSlug: 'sony-a6700',
    date: '2026-07-10',
    verified: true,
    helpful: 18,
  },
  {
    id: 'r-3',
    authorName: 'Lê Hoàng Long',
    avatar: 'https://ui-avatars.com/api/?name=Hoang+Long&background=FFF7ED&color=EA580C&bold=true&size=128',
    rating: 5,
    comment: 'Đã trade-in lên đời flycam ở shop, giá thu lại máy cũ cực kỳ hợp lý, không bị ép giá như mấy chỗ khác. Kỹ thuật viên hướng dẫn bay thử rất chuyên nghiệp.',
    productPurchased: 'DJI Mini 4 Pro Fly More Combo',
    productSlug: 'dji-mini-4-pro',
    date: '2026-07-05',
    verified: true,
    helpful: 31,
  },
  {
    id: 'r-4',
    authorName: 'Phạm Văn Hùng',
    avatar: 'https://ui-avatars.com/api/?name=Van+Hung&background=FFF7ED&color=EA580C&bold=true&size=128',
    rating: 5,
    comment: 'Không gian shop rộng rãi, nhiều máy trải nghiệm thực tế trước khi mua. Hàng chính hãng đầy đủ hóa đơn VAT, chế độ bảo hành yên tâm, nhân viên thân thiện.',
    productPurchased: 'Fujifilm X-T5 Silver',
    productSlug: 'fujifilm-x-t5',
    date: '2026-06-28',
    verified: true,
    helpful: 15,
  },
  {
    id: 'r-5',
    authorName: 'Vũ Thị Mai',
    avatar: 'https://ui-avatars.com/api/?name=Thi+Mai&background=FFF7ED&color=EA580C&bold=true&size=128',
    rating: 5,
    comment: 'Lens chụp chân dung xóa phông mịn màng, độ nét căng ngay tại khẩu F2.8. Shop tặng kèm filter bảo vệ ống kính xịn sò. Rất đáng tiền!',
    productPurchased: 'Sigma 18-50mm F2.8 DC DN',
    productSlug: 'sigma-18-50',
    date: '2026-06-25',
    verified: true,
    helpful: 19,
  },
  {
    id: 'r-6',
    authorName: 'Đặng Quốc Bảo',
    avatar: 'https://ui-avatars.com/api/?name=Quoc+Bao&background=FFF7ED&color=EA580C&bold=true&size=128',
    rating: 5,
    comment: 'Dịch vụ sau bán hàng tuyệt vời! Mình mua combo đèn và phông nền về setup studio mini tại nhà, lỗi kỹ thuật nhỏ được các bạn hỗ trợ đổi mới ngay lập tức qua video call.',
    productPurchased: 'Đèn Godox LA200D Daylight LED',
    productSlug: 'den-godox-la200d-daylight-led-light-230w',
    date: '2026-06-20',
    verified: true,
    helpful: 27,
  }

];

export const brands: Brand[] = getAllBrands().map((b, index) => ({
  id: `b-${index + 1}`,
  name: b,
  slug: b.toLowerCase(),
  logo: `https://via.placeholder.com/200x80?text=${b}`,
  website: `https://${b.toLowerCase()}.com`,
  country: 'Nhật Bản',
  productCount: 15,
}));

export const promoBanners: PromoBanner[] = _promotionalBanners.map((b, index) => ({
  id: `promo-${index}`,
  title: b.title,
  subtitle: b.description,
  ctaLabel: b.label,
  ctaHref: b.link,
  image: '',
  bgColor: index === 0 ? '#FFF7ED' : '#F0FDF4',
  textColor: index === 0 ? '#C2410C' : '#16A34A',
}));

const now = new Date();
export const currentFlashSale: FlashSale = {
  id: flashSaleData?.id || 'fs-1',
  title: flashSaleData?.title || 'FLASH SALE TUẦN',
  startTime: flashSaleData?.startTime || now.toISOString(),
  endTime: flashSaleData?.endTime || new Date(now.getTime() + 86400000).toISOString(),
  discountPercent: 30,
  bannerColor: '#F97316',
};

// FIX BỔ SUNG: Đã thêm từ khóa "export" để linh hoạt tương thích với Marketing component
export const reviewStats = {
  totalReviews: 2847,
  averageRating: 4.8,
  totalCustomers: 12500,
  totalOrders: 18900,
  ratingDistribution: { 5: 2186, 4: 512, 3: 102, 2: 31, 1: 16 },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

export const getProductsByCategory = (categorySlug: string, isUsed?: boolean): Product[] => {
  return products.filter(p => {
    if (isUsed !== undefined) {
      return p.categorySlug === categorySlug && p.isUsed === isUsed;
    }
    if (categorySlug === '2nd-hand') {
      return p.isUsed === true;
    }
    return p.categorySlug === categorySlug;
  });
};

export const getFeaturedProducts = (categorySlug?: string, limit = 4): Product[] => {
  if (categorySlug) {
    const inCategory = products.filter(p => p.categorySlug === categorySlug && !p.isUsed);
    return inCategory.slice(0, limit);
  }
  const feat = products.filter(p => p.featured && !p.isUsed);
  return (feat.length > 0 ? feat : products.filter(p => !p.isUsed)).slice(0, limit);
};

export const getFlashSaleProducts = (): Product[] => {
  return products.filter(p => p.flashSale === true);
};

export const getProductBySlug = (slug: string): Product | undefined => {
  const normalized = slug.replace(/^\/san-pham\//, '').replace(/^\/san-pham-2nd\//, '');
  return products.find(p =>
    p.slug === slug ||
    p.slug === normalized ||
    `/san-pham/${p.slug}` === slug ||
    `/san-pham-2nd/${p.slug}` === slug ||
    p.slug.endsWith(normalized)
  );
};

export const getRelatedProducts = (product: Product, limit = 4): Product[] => {
  return products
    .filter(p => p.id !== product.id && p.categorySlug === product.categorySlug)
    .slice(0, limit);
};

export const searchProducts = (query: string, limit = 10): Product[] => {
  const q = query.toLowerCase();
  return products
    .filter(p =>
      p.name?.toLowerCase().includes(q) ||
      p.brand?.toLowerCase().includes(q) ||
      p.categoryName?.toLowerCase().includes(q) ||
      (p.shortDescription || '').toLowerCase().includes(q)
    )
    .slice(0, limit);
};

export const getCategoryBySlug = (slug: string): Category | undefined => {
  return categories.find(c => c.slug === slug);
};

export const storeLocations = stores.map(s => ({ city: s.city, address: s.address }));

// ─── Blog posts (static content, không có trong mock-data) ───────────────────

export const blogPosts = [
  {
    id: 'blog-1',
    slug: 'canon-eos-r50-review-chi-tiet',
    title: 'Review Canon EOS R50: Máy ảnh tốt nhất cho người mới năm 2026',
    excerpt: 'Canon EOS R50 với cảm biến APS-C 24.2MP, video 4K và giá dưới 14 triệu — Có xứng đáng với lựa chọn entry mirrorless?',
    thumbnail: 'https://mayanhvietnam.com/asset/imgs/img/SPKM_banner/SPKM_eosR50.webp',
    category: 'Review',
    author: 'Minh Quang',
    date: '2026-07-01',
    readTime: 8,
    views: 12400,
  },
  {
    id: 'blog-2',
    slug: 'huong-dan-chon-ong-kinh-cho-nguoi-moi',
    title: 'Hướng Dẫn Chọn Ống Kính Máy Ảnh Phù Hợp Cho Người Mới',
    excerpt: 'Focal length, khẩu độ, mount tương thích — Tất cả những gì bạn cần biết để chọn ống kính đầu tiên.',
    thumbnail: 'https://mayanhvietnam.com/asset/imgs/img/banner/Km-lens.webp',
    category: 'Kiến thức',
    author: 'Thanh Liêm',
    date: '2026-06-25',
    readTime: 12,
    views: 8900,
  },
  {
    id: 'blog-3',
    slug: 'dji-mini-4-pro-vs-air-3-so-sanh',
    title: 'DJI Mini 4 Pro vs DJI Air 3: Nên Mua Flycam Nào Năm 2026?',
    excerpt: 'So sánh chi tiết hai flagship flycam DJI — Camera, thời lượng pin, giá cả và những tính năng khác biệt.',
    thumbnail: 'https://mayanhvietnam.com/asset/imgs/img/banner/dji-mini-5-pro.webp',
    category: 'So sánh',
    author: 'Hữu Phước',
    date: '2026-06-20',
    readTime: 10,
    views: 15600,
  },
  {
    id: 'blog-4',
    slug: 'ky-thuat-chup-anh-portrait-dep',
    title: '10 Kỹ Thuật Chụp Ảnh Portrait Đẹp Bằng Máy Ảnh Mirrorless',
    excerpt: 'Khẩu độ rộng, ánh sáng tự nhiên, góc chụp — Những bí quyết để có bộ ảnh portrait chuyên nghiệp.',
    thumbnail: 'https://mayanhvietnam.com/asset/imgs/img/banner/sonet-some_sony-a6700.png',
    category: 'Kỹ thuật',
    author: 'Kim Anh',
    date: '2026-06-15',
    readTime: 6,
    views: 7800,
  },
  {
    id: 'blog-5',
    slug: 'setup-studio-mini-tai-nha',
    title: 'Cách Setup Studio Mini Tại Nhà Với Chi Phí Dưới 5 Triệu',
    excerpt: 'Đèn LED, phông nền, phản quang — Hướng dẫn tạo góc chụp studio chuyên nghiệp ngay tại nhà.',
    thumbnail: 'https://mayanhvietnam.com/asset/imgs/img/danhMuc_setupPhong.webp',
    category: 'Hướng dẫn',
    author: 'Quốc Bảo',
    date: '2026-06-10',
    readTime: 9,
    views: 11200,
  },
  {
    id: 'blog-6',
    slug: 'top-5-action-camera-2026',
    title: 'Top 5 Action Camera Tốt Nhất 2026: GoPro, DJI, Insta360 So Sánh',
    excerpt: 'GoPro HERO 12, DJI Osmo Action 4, Insta360 X4 — Camera nào xứng đáng với tiền của bạn?',
    thumbnail: 'https://mayanhvietnam.com/asset/imgs/img/banner/action-6.webp',
    category: 'So sánh',
    author: 'Minh Tuấn',
    date: '2026-06-05',
    readTime: 11,
    views: 19300,
  },
];
