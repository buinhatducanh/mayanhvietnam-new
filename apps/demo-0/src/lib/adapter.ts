/**
 * Adapter — bridge `@mayanhvietnam/mock-data` → demo-0 local Product type
 *
 * Demo-0 needs extra fields for the 3D experience (colors, callouts, tagline,
 * discountPercent etc.) that the shared type doesn't carry.  This adapter
 * derives those fields so we keep ONE source of truth in the shared package.
 */

import {
  allProducts,
  flashSaleData,
  getProductBySlug as _getProductBySlug,
  getProductsByCategory,
  getRelatedProducts as _getRelatedProducts,
  getFeaturedProducts,
  searchProducts as _searchProducts,
  type ProductSummary,
} from '@mayanhvietnam/mock-data';

// ─── Re-export shared data as-is ─────────────────────────────────────────────
export {
  allProducts,
  flashSaleData,
  getProductsByCategory,
  getFeaturedProducts,
};
export {
  categories,
  getCategoryBySlug,
} from '@mayanhvietnam/mock-data';
export {
  heroSlides,
  dealBanners,
} from '@mayanhvietnam/mock-data';
export {
  stores,
} from '@mayanhvietnam/mock-data';
export type {
  ProductSummary,
  Category,
  FlashSale,
  HeroSlide,
  StoreInfo,
  ProductSpecGroup,
} from '@mayanhvietnam/mock-data';

// ─── Demo-0 3D–specific types (superset of ProductSummary) ───────────────────

export type ProductColor = {
  name: string;
  hex: string;
};

export type SpecCallout = {
  label: string;
  value: string;
  target: 'Lens' | 'Body' | 'Dial' | 'Sensor';
};

export type Spec = { label: string; value: string };

/** Extended product type used by the 3D scroll experience & PDP in demo-0 */
export type Product = ProductSummary & {
  tagline: string;
  discountPercent: number;
  reviewCount: number;
  soldCount: number;
  colors: ProductColor[];
  callouts: SpecCallout[];
  flatSpecs: Spec[];
  /** Primary product image (used for selector grid) */
  image: string;
  /** Gallery images for PDP lightbox */
  galleryImages: string[];
  promotions: string[];
  stockStatus: string;
  includedItems: string[];
  warrantyMonths: number;
};

// ─── Color presets per brand ─────────────────────────────────────────────────

const BRAND_COLORS: Record<string, ProductColor[]> = {
  Canon:    [{ name: 'Đen', hex: '#1c1c1c' }, { name: 'Trắng', hex: '#f0ede8' }],
  Sony:     [{ name: 'Đen', hex: '#1c1c1c' }, { name: 'Bạc', hex: '#c0c0c0' }],
  Nikon:    [{ name: 'Đen', hex: '#1c1c1c' }],
  Fujifilm: [{ name: 'Đen', hex: '#1c1c1c' }, { name: 'Bạc', hex: '#d4d4d4' }],
  DJI:      [{ name: 'Xám', hex: '#4a4a4a' }],
  GoPro:    [{ name: 'Đen', hex: '#1c1c1c' }],
};

// ─── Taglines per product ────────────────────────────────────────────────────

const TAGLINES: Record<string, string> = {
  'p1':  'Full-frame. 40fps. Sáng tạo không giới hạn.',
  'p2':  'Chuyên nghiệp. Đỉnh cao. Toàn diện.',
  'p3a': 'Nhỏ gọn. Mạnh mẽ. Sáng tạo không giới hạn.',
  'p3':  'Vlogging hoàn hảo. Creator thực thụ.',
  'p4':  'Cỗ máy sáng tạo bất tận cho filmmaker.',
  'p5':  'Ống kính L-series đỉnh cao.',
  'p6':  'Không giới hạn. Chống nước. Siêu bền.',
  'p7':  'Gimbal 3 trục. Dual sensor. Creator Combo.',
  'p8':  'Flagship APS-C. 19 Film Simulation.',
  'p10': 'Ống kính nifty-fifty dành cho Canon RF.',
  'p11': 'GM II — Flagship tele zoom.',
  'p12': '249g. Không cần đăng ký.',
};

// ─── Adapter function ────────────────────────────────────────────────────────

function deriveCallouts(p: ProductSummary): SpecCallout[] {
  const callouts: SpecCallout[] = [];

  // Extract first spec group items as callouts
  if (p.specs && p.specs.length > 0) {
    const sensorGroup = p.specs.find((g) => g.group.includes('Cảm biến'));
    if (sensorGroup && sensorGroup.items.length > 0) {
      callouts.push({
        label: 'Cảm biến',
        value: sensorGroup.items[0].value,
        target: 'Sensor',
      });
    }

    const processorItem = p.specs
      .flatMap((g) => g.items)
      .find((i) => i.label.includes('xử lý') || i.label.includes('Bộ xử lý'));
    if (processorItem) {
      callouts.push({ label: 'Bộ xử lý', value: processorItem.value, target: 'Body' });
    }

    const afItem = p.specs
      .flatMap((g) => g.items)
      .find((i) => i.label.includes('AF') || i.label.includes('lấy nét'));
    if (afItem) {
      callouts.push({ label: 'Lấy nét', value: afItem.value, target: 'Lens' });
    }

    const isoItem = p.specs
      .flatMap((g) => g.items)
      .find((i) => i.label.includes('ISO'));
    if (isoItem) {
      callouts.push({ label: 'ISO', value: isoItem.value, target: 'Dial' });
    }
  }

  // Fallback to shortSpecs
  if (callouts.length === 0 && p.shortSpecs) {
    const targets: SpecCallout['target'][] = ['Sensor', 'Body', 'Lens', 'Dial'];
    p.shortSpecs.slice(0, 4).forEach((s, i) => {
      callouts.push({ label: s.split(' ')[0], value: s, target: targets[i] });
    });
  }

  return callouts.slice(0, 4);
}

function flattenSpecs(p: ProductSummary): Spec[] {
  if (!p.specs) return [];
  return p.specs.flatMap((g) => g.items);
}

export function adaptProduct(p: ProductSummary): Product {
  const originalPrice = p.originalPrice ?? p.price;
  const discount =
    originalPrice > p.price
      ? Math.round(((originalPrice - p.price) / originalPrice) * 100)
      : 0;

  return {
    ...p,
    tagline: TAGLINES[p.id] ?? p.description?.slice(0, 80) ?? '',
    discountPercent: discount,
    reviewCount: p.rating?.count ?? 0,
    soldCount: Math.floor((p.rating?.count ?? 50) * 2.3),
    colors: BRAND_COLORS[p.brand] ?? [{ name: 'Đen', hex: '#1c1c1c' }],
    callouts: deriveCallouts(p),
    flatSpecs: flattenSpecs(p),
    image: p.thumbnail,
    galleryImages: p.images.map((img) => img.url),
    promotions: [],
    stockStatus: p.availability === 'in_stock' ? 'Còn hàng' : 'Hết hàng',
    includedItems: p.packageIncludes ?? [],
    warrantyMonths: 12,
  };
}

// ─── Custom DJI Mavic Air 2 Product Definition ──────────────────────────────

const djiMavicAir2: Product = {
  id: 'dji-mavic-air-2',
  slug: 'flycam-dji-mavic-air-2-chinh-hang',
  name: 'Flycam DJI Mavic Air 2 | Chính hãng',
  brand: 'DJI',
  category: 'flycam',
  thumbnail: 'https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-12/230212121212567/avatar/01_flycam-dji-mavic-air-2-chinh-hang.jpg',
  images: [
    { url: 'https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-12/230212121212567/avatar/01_flycam-dji-mavic-air-2-chinh-hang.jpg', alt: 'Flycam DJI Mavic Air 2' }
  ],
  price: 17900000,
  originalPrice: 19900000,
  availability: 'in_stock',
  badges: [{ type: 'hot', label: 'Bán chạy' }, { type: 'new', label: 'Chính hãng' }],
  rating: { average: 4.8, count: 156 },
  isUsed: false,
  shortSpecs: ['Cảm biến 1/2" CMOS 48MP', 'Quay video 4K 60fps', 'Thời gian bay 34 phút', 'Truyền sóng OcuSync 2.0 10km'],
  description: 'Flycam DJI Mavic Air 2 mang đến đột phá mạnh mẽ trong phân khúc tầm trung. Với cảm biến 1/2 inch CMOS quay video 4K 60fps cực sắc nét, tính năng chụp ảnh 48MP ấn tượng, thời gian bay lên đến 34 phút và khoảng cách truyền hình ảnh xa 10km nhờ công nghệ OcuSync 2.0 tiên tiến.',
  highlights: [
    'Cảm biến CMOS 1/2 inch, chụp ảnh 48 Megapixel',
    'Quay video 4K UHD @ 60fps / Full HD @ 240fps',
    'Công nghệ truyền sóng OcuSync 2.0 xa đến 10km',
    'Thời gian bay tối đa lên tới 34 phút',
    'Hỗ trợ chế độ chụp 8K Hyperlapse đỉnh cao',
    'Tính năng ActiveTrack 3.0 bám nét thông minh',
  ],
  specs: [
    {
      group: 'Camera',
      items: [
        { label: 'Cảm biến', value: '1/2 inch CMOS' },
        { label: 'Độ phân giải', value: '48 Megapixel' },
        { label: 'Góc nhìn (FOV)', value: '84° (tương đương 24mm)' },
        { label: 'Khẩu độ', value: 'f/2.8' },
        { label: 'Quay video', value: '4K Ultra HD: 3840×2160 @ 60fps' },
        { label: 'Chống rung', value: 'Gimbal 3 trục (pitch, roll, yaw)' },
      ]
    },
    {
      group: 'Tính năng bay',
      items: [
        { label: 'Thời gian bay tối đa', value: '34 phút' },
        { label: 'Tốc độ tối đa', value: '68.4 km/h (Sport Mode)' },
        { label: 'Truyền sóng', value: 'OcuSync 2.0 (10 km)' },
        { label: 'Kháng gió', value: 'Cấp 5 (8.5-10.5 m/s)' },
      ]
    },
    {
      group: 'Vật lý',
      items: [
        { label: 'Trọng lượng', value: '570 g' },
        { label: 'Kích thước gấp', value: '180×97×84 mm' },
        { label: 'Dung lượng pin', value: '3500 mAh' },
      ]
    }
  ],
  packageIncludes: [
    '1× Thân máy Flycam DJI Mavic Air 2',
    '1× Bộ điều khiển từ xa',
    '1× Pin bay thông minh',
    '3× Cặp cánh quạt dự phòng',
    '1× Cáp USB-C / Lightning / Micro-USB',
    '1× Nắp bảo vệ Gimbal',
  ],
  tagline: 'Flycam tầm trung đột phá. 4K 60fps. Cảm biến 1/2 inch.',
  discountPercent: 10,
  reviewCount: 156,
  soldCount: 358,
  colors: [
    { name: 'Xám Titanium', hex: '#4a4a4a' },
    { name: 'Đen Carbon', hex: '#1c1c1c' }
  ],
  callouts: [
    { label: 'Cảm biến', value: '1/2" CMOS 48MP', target: 'Sensor' },
    { label: 'Quay phim', value: '4K @ 60fps Video', target: 'Body' },
    { label: 'Thời gian bay', value: '34 phút bay tối đa', target: 'Lens' },
    { label: 'Truyền sóng', value: 'OcuSync 2.0 10km', target: 'Dial' }
  ],
  flatSpecs: [
    { label: 'Cảm biến', value: '1/2 inch CMOS, 48MP' },
    { label: 'Quay video', value: '4K @ 60fps' },
    { label: 'Thời gian bay', value: '34 phút' },
    { label: 'Trọng lượng', value: '570g' }
  ],
  image: 'https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-12/230212121212567/avatar/01_flycam-dji-mavic-air-2-chinh-hang.jpg',
  galleryImages: [
    'https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-12/230212121212567/avatar/01_flycam-dji-mavic-air-2-chinh-hang.jpg'
  ],
  promotions: [
    '🎁 Tặng thẻ nhớ Sandisk Extreme 64GB chuyên dụng',
    '📦 Miễn phí giao hàng hỏa tốc toàn quốc'
  ],
  stockStatus: 'Còn hàng',
  includedItems: [
    'Flycam DJI Mavic Air 2',
    'Bộ điều khiển RC',
    'Pin thông minh',
    'Cáp kết nối',
    'Nắp bảo vệ gimbal'
  ],
  warrantyMonths: 12
};

// ─── Pre-adapted products ────────────────────────────────────────────────────

/** All products adapted for demo-0 3D experience - prepend DJI Mavic Air 2 */
export const products: Product[] = [djiMavicAir2, ...allProducts.map(adaptProduct)];

/** Get a single adapted product by slug */
export const getProductBySlug = (slug: string): Product | null => {
  if (slug === 'flycam-dji-mavic-air-2-chinh-hang') return djiMavicAir2;
  const raw = _getProductBySlug(slug);
  return raw ? adaptProduct(raw) : null;
};

/** Get related products (adapted) */
export const getRelatedProducts = (product: Product, limit = 4): Product[] => {
  if (product.id === 'dji-mavic-air-2') {
    return allProducts.filter((p) => p.category === 'flycam').slice(0, limit).map(adaptProduct);
  }
  return _getRelatedProducts(product, limit).map(adaptProduct);
};

/** Search products (adapted) */
export const searchProducts = (query: string): Product[] => {
  const lowercaseQuery = query.toLowerCase().trim();
  const matchedCustom = djiMavicAir2.name.toLowerCase().includes(lowercaseQuery) ? [djiMavicAir2] : [];
  return [...matchedCustom, ..._searchProducts(query).map(adaptProduct)];
};

// ─── VND formatter ───────────────────────────────────────────────────────────

export function formatVND(amount: number): string {
  return `${amount.toLocaleString('vi-VN')}đ`;
}
