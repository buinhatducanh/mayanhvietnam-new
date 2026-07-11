export type ProductStatus = 'ACTIVE' | 'INACTIVE'
export type Availability = 'IN_STOCK' | 'OUT_OF_STOCK' | 'PRE_ORDER'
export type Condition = 'NEW' | 'USED'

export interface ProductVariant {
  id: string
  name: string
  price: number
  discountPrice?: number
}

export interface Product {
  name: string
  slug: string
  brand: string
  categorySlug: string
  price: number
  discountPrice?: number
  status: ProductStatus
  availability: Availability
  condition: Condition
  mountType?: string
  specs: Record<string, string>
  model3dUrl?: string
  image: string
  gallery?: string[]
  rating: number
  reviewCount: number
  isNew?: boolean
  description: string
  variants: ProductVariant[]
}

export interface ArticleSection {
  heading: string
  body: string
}

export interface ProductArticle {
  title: string
  intro: string
  sections: ArticleSection[]
  faqs?: { q: string; a: string }[]
}

export interface Category {
  name: string
  slug: string
  image?: string
}

// ── Categories from mayanhvietnam.com homepage (local images) ──
export const categories: Category[] = [
  { name: 'Máy ảnh - Body', slug: 'may-anh', image: '/images/category-may-anh.webp' },
  { name: 'Ống kính - Lens', slug: 'ong-kinh', image: '/images/category-ong-kinh.webp' },
  { name: 'Máy quay phim', slug: 'may-quay-phim', image: '/images/category-may-quay-phim.webp' },
  { name: 'Flycam - Drone', slug: 'flycam', image: '/images/category-flycam.webp' },
  { name: 'Camera hành động', slug: 'action-camera', image: '/images/category-action.webp' },
  { name: 'Thiết bị studio', slug: 'thiet-bi-studio', image: '/images/category-studio.webp' },
  { name: 'Phụ kiện cho máy ảnh', slug: 'phu-kien', image: '/images/category-phu-kien.webp' },
  { name: 'Sản phẩm cũ giá tốt', slug: 'san-pham-cu', image: '/images/category-san-pham-cu.webp' },
  { name: 'Dịch vụ lắp phông', slug: 'setup-phong', image: '/images/category-setup-phong.webp' },
]

// ── Products from mayanhvietnam.com PLP + PDP pages (scraped 2026-07-10) ──
export const products: Product[] = [
  // ── Máy ảnh Canon EOS R50 (best-seller on homepage) ──
  {
    name: 'Máy ảnh Canon EOS R50 Black kèm Lens RF-S 18-45mm Chính Hãng',
    slug: 'may-anh-canon-eos-r50-black-kem-lens-rfs-1845',
    brand: 'Canon',
    categorySlug: 'may-anh',
    price: 17500000,
    status: 'ACTIVE',
    availability: 'IN_STOCK',
    condition: 'NEW',
    isNew: true,
    mountType: 'Canon RF',
    image: '/images/product-can-r50.png',
    gallery: [
      '/images/product-can-r50.png',
      '/images/product-canon-r6-back.png',
      '/images/product-canon-r6-top.png',
      '/images/product-canon-r6-hand.png',
    ],
    rating: 4.8,
    reviewCount: 85,
    description: 'Canon EOS R50 là chiếc máy ảnh lý tưởng cho người yêu nhiếp ảnh. Nhỏ gọn, tinh tế, trọng lượng nhẹ, phù hợp cho người mới bắt đầu và chuyên nghiệp. Cảm biến 24.2MP, quay video 4K, Dual Pixel CMOS AF II 4.503 điểm, chụp liên tiếp 15fps.',
    specs: {
      'Cảm biến': 'CMOS APS-C 24.2MP',
      'Bộ xử lý': 'DIGIC X',
      'Kích thước ảnh': '6000 x 4000 pixel',
      'ISO': '100 – 32,000 (mở rộng 51,200)',
      'Tốc độ màn trập': '1/4000s – 30s, Bulb',
      'Chụp liên tiếp': 'Tối đa 15fps (màn trập điện tử)',
      'Điểm lấy nét': 'Lên tới 4,503 điểm (Dual Pixel CMOS AF II)',
      'Quay video': '4K 30fps; Full HD 120fps',
      'Kính ngắm': 'EVF 2.36MP, 0.95x, 100%',
      'Màn hình': 'LCD xoay lật cảm ứng 3.0", 1,620,000 điểm ảnh',
      'Kết nối': 'Wi-Fi, Bluetooth',
      'Cổng': 'Micro 3.5mm, USB-C, mini HDMI',
      'Thẻ nhớ': '1 khe SD/SDHC/SDXC (UHS-II)',
      'Ngàm ống kính': 'Canon RF',
      'Trọng lượng': '375g (body only)',
      'Kích thước': '116.3 x 85.5 x 68.8 mm',
      'Pin': 'LP-E17, khoảng 370 ảnh/lần sạc',
    },
    variants: [
      { id: 'r50-kit-black', name: 'Body + Lens RF-S 18-45mm (Black)', price: 17500000 },
      { id: 'r50-kit-white', name: 'Body + Lens RF-S 18-45mm (White)', price: 17500000 },
    ],
  },
  // ── Sony Alpha A7 Mark IV ──
  {
    name: 'Máy ảnh Sony Alpha A7 Mark IV (Body Only) | Chính hãng',
    slug: 'may-anh-sony-alpha-a7-mark-iv-body-only',
    brand: 'Sony',
    categorySlug: 'may-anh',
    price: 47500000,
    status: 'ACTIVE',
    availability: 'IN_STOCK',
    condition: 'NEW',
    mountType: 'Sony E',
    image: '/images/banner-a7iv.jpg',
    gallery: [
      '/images/product-sony-a7iv.png',
      '/images/product-canon-r6-back.png',
      '/images/product-canon-r6-top.png',
      '/images/product-canon-r6-hand.png',
    ],
    rating: 4.9,
    reviewCount: 128,
    description: 'Sony Alpha A7 Mark IV là sản phẩm chuyên nghiệp, thiết kế tinh tế, công nghệ hiện đại. Cảm biến full-frame độ phân giải cao, hệ thống AF nhanh chính xác, quay video 4K chuyên nghiệp.',
    specs: {
      'Cảm biến': 'Exmor R Full Frame 35.9 x 23.9mm, 33MP',
      'ISO': '100-51,200 (mở rộng: 50-204,800)',
      'Tốc độ màn trập': '1/8000s – 30s, Bulb',
      'Chụp liên tiếp': 'Lên đến 10fps, tối đa 828 ảnh RAW',
      'Điểm lấy nét': 'Phát hiện pha: 759 / Phát hiện tương phản: 425',
      'Chế độ AF': 'Continuous AF (C), DMF, Manual (M), Single AF (S)',
      'Chống rung': 'Sensor-Shift, 5-Axis',
      'Quay video': 'UHD 4K, Full HD',
      'Kính ngắm': 'OLED EVF 3,680,000 điểm, 0.78x, 100%',
      'Màn hình': 'LCD cảm ứng nghiêng tự do 3.0", 1,036,800 điểm',
      'Thẻ nhớ': 'Khe 1: CFexpress Type A / SD (UHS-II) / Khe 2: SD (UHS-II)',
      'Ngàm ống kính': 'Sony E',
      'Trọng lượng': '658g (có pin + bộ nhớ)',
      'Kích thước': '131.3 x 96.4 x 79.8 mm',
      'Pin': 'NP-FZ100 2280mAh, khoảng 520 ảnh',
      'Cổng': 'HDMI A, USB-C 3.2 Gen 2, USB Micro-B, Mic 3.5mm, Headphone 3.5mm',
      'Kết nối': 'Wi-Fi / Bluetooth',
    },
    variants: [
      { id: 'a7iv-body', name: 'Body Only', price: 47500000 },
      { id: 'a7iv-kit-gm', name: 'Body + Sony FE 24-70mm F2.8 GM II', price: 86500000 },
    ],
  },
  // ── Nikon Z6 Mark III ──
  {
    name: 'Nikon Z6 Mark III Kèm Lens Z 24-70mm f/4 S (Chính Hãng VIC)',
    slug: 'nikon-z6-mark-iii-kem-lens-z-2470-f4-s',
    brand: 'Nikon',
    categorySlug: 'may-anh',
    price: 67600000,
    status: 'ACTIVE',
    availability: 'IN_STOCK',
    condition: 'NEW',
    mountType: 'Nikon Z',
    isNew: true,
    image: '/images/product-nikon-z6iii.png',
    rating: 4.9,
    reviewCount: 42,
    description: 'Nikon Z6 Mark III kế thừa Z6 II với cảm biến partial-stacked CMOS mới, quay video 6K, lấy nét phase-detect toàn cảm biến.',
    specs: {
      'Cảm biến': 'Partial Stacked CMOS 24.5MP',
      'ISO': '100-64,000 (mở rộng 50-256,000)',
      'Chụp liên tiếp': 'Lên đến 20fps (RAW), 120fps (JPEG)',
      'Quay video': '6K 60p N-RAW / 4K 120p',
      'Điểm lấy nét': '299 điểm phase-detect',
      'Chống rung': 'VR 8 stops',
      'Kính ngắm': 'EVF 3,690,000 điểm, 0.8x',
      'Màn hình': 'LCD nghiêng-lật 4.0", 2,100,000 điểm',
      'Thẻ nhớ': 'CFexpress Type B / SD (UHS-II)',
      'Ngàm ống kính': 'Nikon Z',
      'Trọng lượng': '760g (body, có pin)',
      'Pin': 'EN-EL15c, khoảng 340 ảnh',
    },
    variants: [
      { id: 'z6iii-kit', name: 'Kit Z 24-70mm f/4 S', price: 67600000 },
    ],
  },
  // ── Sony Alpha A7R Mark V ──
  {
    name: 'Máy ảnh Sony Alpha A7R Mark V (Chính hãng)',
    slug: 'may-anh-sony-alpha-a7r-mark-v',
    brand: 'Sony',
    categorySlug: 'may-anh',
    price: 86390000,
    status: 'ACTIVE',
    availability: 'IN_STOCK',
    condition: 'NEW',
    mountType: 'Sony E',
    image: '/images/product-sony-a7iv.png',
    rating: 4.9,
    reviewCount: 31,
    description: 'Sony A7R V với cảm biến 61MP, AI-based AF, quay video 8K, chống rung 8 stops — flagship độ phân giải cao nhất phân khúc.',
    specs: {
      'Cảm biến': 'Exmor R Full Frame 61MP',
      'ISO': '100-32,000 (mở rộng 50-102,400)',
      'Chụp liên tiếp': 'Lên đến 10fps',
      'Quay video': '8K 24p / 4K 60p',
      'Điểm lấy nét': '693 điểm phase-detect',
      'Chống rung': '8 stops',
      'Kính ngắm': 'OLED EVF 9,440,000 điểm',
      'Màn hình': 'LCD 4-axis multi-angle 3.2"',
      'Thẻ nhớ': 'CFexpress Type A / SD (UHS-II)',
      'Ngàm ống kính': 'Sony E',
      'Trọng lượng': '723g (body)',
    },
    variants: [
      { id: 'a7rv-body', name: 'Body Only', price: 86390000 },
    ],
  },
  // ── Canon EOS R8 ──
  {
    name: 'Máy ảnh Canon EOS R8 (Body Only)',
    slug: 'may-anh-canon-eos-r8-body-only',
    brand: 'Canon',
    categorySlug: 'may-anh',
    price: 26900000,
    status: 'ACTIVE',
    availability: 'IN_STOCK',
    condition: 'NEW',
    mountType: 'Canon RF',
    image: '/images/product-canon-r6.png',
    rating: 4.7,
    reviewCount: 63,
    description: 'Canon EOS R8 — máy ảnh full-frame mirrorless nhẹ nhất dòng R, cảm biến 24.2MP DIGIC X, lấy nét Dual Pixel AF II, quay 4K 60p.',
    specs: {
      'Cảm biến': 'Full-frame CMOS 24.2MP',
      'Bộ xử lý': 'DIGIC X',
      'Chụp liên tiếp': '40fps (màn trập điện tử)',
      'Quay video': '4K 60p / FHD 180p',
      'ISO': '100 - 102,400',
      'Điểm lấy nét': '1,053 điểm (Dual Pixel CMOS AF II)',
      'Ngàm ống kính': 'Canon RF',
      'Trọng lượng': '461g (body, có pin)',
    },
    variants: [
      { id: 'r8-body', name: 'Body Only', price: 26900000 },
    ],
  },
  // ── Sony ZV-E10 II ──
  {
    name: 'Máy ảnh Sony ZV-E10 II Black (Body Only) | Chính hãng',
    slug: 'may-anh-sony-zve10-ii-black-body-only',
    brand: 'Sony',
    categorySlug: 'may-anh',
    price: 26000000,
    status: 'ACTIVE',
    availability: 'IN_STOCK',
    condition: 'NEW',
    mountType: 'Sony E',
    image: '/images/product-canon-r6.png',
    rating: 4.8,
    reviewCount: 74,
    description: 'Sony ZV-E10 II — máy ảnh APS-C cho content creator, quay 4K 60p, lấy nét nhanh, màn hình xoay lật, micro 3 Capsule tích hợp.',
    specs: {
      'Cảm biến': 'APS-C Exmor R 26MP',
      'Quay video': '4K 60p / FHD 120fps',
      'Điểm lấy nét': '425 điểm phase-detect',
      'Màn hình': 'LCD xoay lật 3.0" cảm ứng',
      'Micro': '3 Capsule mic tích hợp',
      'Ngàm ống kính': 'Sony E',
      'Trọng lượng': '292g (body)',
    },
    variants: [
      { id: 'zve10ii-body', name: 'Body Only (Black)', price: 26000000 },
    ],
  },
  // ── Nikon Z6 II ──
  {
    name: 'Máy ảnh Nikon Z6 II (Body Only) | Chính hãng',
    slug: 'may-anh-nikon-z6-ii-body-only',
    brand: 'Nikon',
    categorySlug: 'may-anh',
    price: 32500000,
    status: 'ACTIVE',
    availability: 'IN_STOCK',
    condition: 'NEW',
    mountType: 'Nikon Z',
    image: '/images/product-sony-a7iv.png',
    rating: 4.8,
    reviewCount: 96,
    description: 'Nikon Z6 II — máy ảnh hybrid full-frame 24.5MP, Dual EXPEED 6, quay 4K 60p, dùng pin EN-EL15c.',
    specs: {
      'Cảm biến': 'BSI CMOS Full Frame 24.5MP',
      'Bộ xử lý': 'Dual EXPEED 6',
      'Chụp liên tiếp': 'Lên đến 14fps',
      'Quay video': '4K 60p',
      'ISO': '100-51,200 (mở rộng 50-204,800)',
      'Điểm lấy nét': '273 điểm phase-detect',
      'Chống rung': 'VR 5 stops',
      'Ngàm ống kính': 'Nikon Z',
      'Trọng lượng': '615g (body, có pin)',
    },
    variants: [
      { id: 'z6ii-body', name: 'Body Only', price: 32500000 },
    ],
  },
  // ── Ống kính Canon RF 70-200mm ──
  {
    name: 'ỐNG KÍNH CANON RF 70-200mm F2.8 L IS USM',
    slug: 'ong-kinh-canon-rf-70-200mm-f28-l-is-usm',
    brand: 'Canon',
    categorySlug: 'ong-kinh',
    price: 50600000,
    status: 'ACTIVE',
    availability: 'IN_STOCK',
    condition: 'NEW',
    mountType: 'Canon RF',
    image: '/images/product-canon-rf-70200.png',
    rating: 4.9,
    reviewCount: 87,
    description: 'Ống kính tele zoom L-series Canon RF 70-200mm f/2.8, nhỏ gọn nhất phân khúc, chống rung IS, lý tưởng cho chân dung và sự kiện.',
    specs: {
      'Dải tiêu cự': '70-200mm',
      'Khẩu độ': 'f/2.8 - f/32',
      'Cấu trúc quang học': '17 thấu kính / 13 nhóm',
      'Chống rung': 'IS up to 5 stops',
      'Kích thước filter': '77mm',
      'Ngàm ống kính': 'Canon RF',
      'Trọng lượng': '1070g',
    },
    variants: [
      { id: 'rf70200-std', name: 'Chính hãng Canon VN', price: 50600000 },
    ],
  },
  // ── Ống kính Sony FE 70-200mm F2.8 GM II ──
  {
    name: 'ỐNG KÍNH SONY FE 70-200mm F2.8 GM II OSS',
    slug: 'ong-kinh-sony-fe-70-200mm-f28-gm-ii-oss',
    brand: 'Sony',
    categorySlug: 'ong-kinh',
    price: 55950000,
    status: 'ACTIVE',
    availability: 'IN_STOCK',
    condition: 'NEW',
    mountType: 'Sony E',
    image: '/images/product-sony-2470.png',
    rating: 4.9,
    reviewCount: 45,
    description: 'Ống kính tele zoom Sony G Master 70-200mm f/2.8 thế hệ II, nhẹ hơn, lấy nét nhanh hơn với 4 XD Linear Motor.',
    specs: {
      'Dải tiêu cự': '70-200mm',
      'Khẩu độ': 'f/2.8',
      'Motor lấy nét': '4x XD Linear Motor',
      'Chống rung': 'Optical SteadyShot',
      'Ngàm ống kính': 'Sony E (FE)',
      'Trọng lượng': '1045g',
    },
    variants: [
      { id: 's70200gm2-std', name: 'Chính hãng Sony VN', price: 55950000 },
    ],
  },
  // ── Canon RF 50mm F1.8 STM ──
  {
    name: 'Canon RF 50mm F1.8 STM | Chính hãng',
    slug: 'canon-rf-50mm-f18-stm',
    brand: 'Canon',
    categorySlug: 'ong-kinh',
    price: 4500000,
    status: 'ACTIVE',
    availability: 'IN_STOCK',
    condition: 'NEW',
    mountType: 'Canon RF',
    image: '/images/product-sony-2470.png',
    rating: 4.8,
    reviewCount: 152,
    description: 'Canon RF 50mm f/1.8 STM — ống kính chân dung "quốc dân" giá rẻ, bokeh mượt, lấy nét êm, phù hợp mọi nhiếp ảnh gia.',
    specs: {
      'Tiêu cự': '50mm',
      'Khẩu độ': 'f/1.8 - f/22',
      'Cấu trúc quang học': '6 thấu kính / 5 nhóm',
      'Motor lấy nét': 'STM',
      'Kích thước filter': '43mm',
      'Ngàm ống kính': 'Canon RF',
      'Trọng lượng': '160g',
    },
    variants: [
      { id: 'rf50-std', name: 'Chính hãng Canon VN', price: 4500000 },
    ],
  },
  // ── DJI Mini 4 Pro (top flycam) ──
  {
    name: 'Flycam DJI Mini 4 Pro Fly More Combo (DJI RC 2)',
    slug: 'flycam-dji-mini-4-pro-fly-more-combo-dji-rc-2',
    brand: 'DJI',
    categorySlug: 'flycam',
    price: 19990000,
    status: 'ACTIVE',
    availability: 'IN_STOCK',
    condition: 'NEW',
    image: '/images/product-dji-mini4.png',
    rating: 4.9,
    reviewCount: 56,
    description: 'DJI Mini 4 Pro — flycam dưới 249g, cảm biến tránh vật cản đa hướng, quay 4K/60fps HDR, thời gian bay 34 phút (45 phút pin Plus).',
    specs: {
      'Trọng lượng': '< 249g',
      'Camera': '1/1.3" CMOS, 48MP',
      'Quay video': '4K 60fps HDR / Slow-motion 4K 100fps',
      'Thời gian bay': '34 phút (45 phút pin Plus)',
      'Truyền hình ảnh': 'O4, 20km FHD',
      'Cảm biến vật cản': 'Đa hướng (Omnidirectional)',
    },
    variants: [
      { id: 'mini4-combo', name: 'Fly More Combo (RC 2)', price: 19990000 },
      { id: 'mini4-std', name: 'Base (RC-N2)', price: 15990000 },
    ],
  },
  // ── DJI NEO ──
  {
    name: 'FLYCAM DJI NEO (CHÍNH HÃNG)',
    slug: 'flycam-dji-neo',
    brand: 'DJI',
    categorySlug: 'flycam',
    price: 3900000,
    status: 'ACTIVE',
    availability: 'IN_STOCK',
    condition: 'NEW',
    image: '/images/banner-flycam.png',
    rating: 4.6,
    reviewCount: 34,
    description: 'DJI Neo — flycam mini siêu nhỏ, nặng 135g, quay 4K, Follow Me không cần điều khiển từ xa, lý tưởng cho vlog cá nhân.',
    specs: {
      'Trọng lượng': '135g',
      'Camera': '1/2" CMOS, 12MP',
      'Quay video': '4K 30fps',
      'Thời gian bay': '18 phút',
      'Điều khiển': 'Không cần tay cầm, follow tracking',
    },
    variants: [
      { id: 'neo-std', name: 'Bản tiêu chuẩn', price: 3900000 },
    ],
  },
  // ── GoPro Hero 13 Black (top action camera) ──
  {
    name: 'GoPro Hero 13 Black',
    slug: 'gopro-hero-13-black',
    brand: 'GoPro',
    categorySlug: 'action-camera',
    price: 9690000,
    status: 'ACTIVE',
    availability: 'IN_STOCK',
    condition: 'NEW',
    isNew: true,
    image: '/images/product-gopro13.png',
    rating: 4.8,
    reviewCount: 41,
    description: 'GoPro Hero 13 Black — action camera quay 5.3K, HyperSmooth 6.0, GPS, chống nước 10m.',
    specs: {
      'Quay video': '5.3K 60fps / 4K 120fps',
      'Chống rung': 'HyperSmooth 6.0',
      'Chống nước': '10m (không cần vỏ)',
      'Cảm biến': '1/1.9" CMOS 27MP',
      'GPS': 'Có',
    },
    variants: [
      { id: 'hero13-std', name: 'Bản tiêu chuẩn', price: 9690000 },
    ],
  },
  // ── DJI Osmo Action 5 Pro ──
  {
    name: 'DJI Osmo Action 5 Pro Adventure Combo',
    slug: 'dji-osmo-action-5-pro-adventure-combo',
    brand: 'DJI',
    categorySlug: 'action-camera',
    price: 9900000,
    status: 'ACTIVE',
    availability: 'IN_STOCK',
    condition: 'NEW',
    image: '/images/product-action-cam.png',
    rating: 4.7,
    reviewCount: 28,
    description: 'DJI Osmo Action 5 Pro — action camera chống nước 20m, màn hình前后 OLED, RockSteady 3.0.',
    specs: {
      'Quay video': '4K 120fps',
      'Chống nước': '20m',
      'Màn hình': '前后双 OLED',
      'Chống rung': 'RockSteady 3.0',
    },
    variants: [
      { id: 'action5pro-combo', name: 'Adventure Combo', price: 9900000 },
    ],
  },
  // ── Sony FX30 (máy quay phim) ──
  {
    name: 'Máy quay Sony FX30 Cinema Line',
    slug: 'sony-fx30-cinema-line',
    brand: 'Sony',
    categorySlug: 'may-quay-phim',
    price: 46990000,
    status: 'ACTIVE',
    availability: 'IN_STOCK',
    condition: 'NEW',
    mountType: 'Sony E',
    image: '/images/product-cinema-cam.png',
    rating: 4.8,
    reviewCount: 33,
    description: 'Sony FX30 thuộc dòng Cinema Line với cảm biến APS-C 26MP, quay 4K 120p 10-bit 4:2:2, S-Cinetone và Log.',
    specs: {
      'Cảm biến': 'APS-C Exmor R 26MP',
      'Quay video': '4K 120p / FHD 240p, 10-bit 4:2:2',
      'Log profile': 'S-Log3 / S-Cinetone',
      'Chống rung': 'Active Mode IBIS',
      'Ngàm ống kính': 'Sony E',
      'Trọng lượng': '646g (với handle XLR)',
    },
    variants: [
      { id: 'fx30-handle', name: 'Kèm XLR Handle Unit', price: 46990000 },
      { id: 'fx30-body', name: 'Body Only', price: 39990000 },
    ],
  },
]

export interface CameraBody {
  name: string
  mountType: string
  sensor: string
}

// ── Camera bodies từ mayanhvietnam.com ──
export const cameraBodies: CameraBody[] = [
  { name: 'Canon EOS R50', mountType: 'Canon RF', sensor: 'APS-C' },
  { name: 'Canon EOS R8', mountType: 'Canon RF', sensor: 'Full-frame' },
  { name: 'Canon EOS R7', mountType: 'Canon RF', sensor: 'APS-C' },
  { name: 'Canon EOS R3', mountType: 'Canon RF', sensor: 'Full-frame' },
  { name: 'Canon EOS RP', mountType: 'Canon RF', sensor: 'Full-frame' },
  { name: 'Sony Alpha A7 IV', mountType: 'Sony E', sensor: 'Full-frame' },
  { name: 'Sony Alpha A7R V', mountType: 'Sony E', sensor: 'Full-frame' },
  { name: 'Sony Alpha A7S III', mountType: 'Sony E', sensor: 'Full-frame' },
  { name: 'Sony A6400', mountType: 'Sony E', sensor: 'APS-C' },
  { name: 'Sony ZV-E10 II', mountType: 'Sony E', sensor: 'APS-C' },
  { name: 'Sony FX30', mountType: 'Sony E', sensor: 'APS-C' },
  { name: 'Nikon Z6 Mark III', mountType: 'Nikon Z', sensor: 'Full-frame' },
  { name: 'Nikon Z5 II', mountType: 'Nikon Z', sensor: 'Full-frame' },
  { name: 'Nikon Z50 II', mountType: 'Nikon Z', sensor: 'APS-C' },
  { name: 'Nikon Zf', mountType: 'Nikon Z', sensor: 'Full-frame' },
  { name: 'Fujifilm X-H2S', mountType: 'Fujifilm X', sensor: 'APS-C' },
]

export interface LensOption {
  name: string
  mountType: string
  focalRange: string
  coverage: 'Full-frame' | 'APS-C'
}

// ── Ống kính từ mayanhvietnam.com ──
export const lensOptions: LensOption[] = [
  { name: 'Canon RF 50mm f/1.8 STM', mountType: 'Canon RF', focalRange: '50mm', coverage: 'Full-frame' },
  { name: 'Canon RF 70-200mm f/2.8L IS USM', mountType: 'Canon RF', focalRange: '70-200mm', coverage: 'Full-frame' },
  { name: 'Sony FE 70-200mm f/2.8 GM II OSS', mountType: 'Sony E', focalRange: '70-200mm', coverage: 'Full-frame' },
  { name: 'Nikon Z 24-70mm f/4 S', mountType: 'Nikon Z', focalRange: '24-70mm', coverage: 'Full-frame' },
  { name: 'Nikon Z 50mm f/1.2 S', mountType: 'Nikon Z', focalRange: '50mm', coverage: 'Full-frame' },
  { name: 'Sigma 35mm f/1.4 DG DN Art (Sony E)', mountType: 'Sony E', focalRange: '35mm', coverage: 'Full-frame' },
  { name: 'Viltrox AF 50mm f/1.4 Pro (Sony E)', mountType: 'Sony E', focalRange: '50mm', coverage: 'Full-frame' },
  { name: 'Fujifilm XF 27mm f/2.8', mountType: 'Fujifilm X', focalRange: '27mm', coverage: 'APS-C' },
  { name: 'Fujifilm XF 8-16mm f/2.8 R LM WR', mountType: 'Fujifilm X', focalRange: '8-16mm', coverage: 'APS-C' },
]

// ── Cửa hàng mayanhvietnam.com ──
export const storeLocations = [
  {
    city: 'TP.Hồ Chí Minh',
    address: 'Số 9, Nam Quốc Cang, Phường Bến Thành, TP Hồ Chí Minh',
    hours: '09:00 – 19:00 mỗi ngày',
  },
  {
    city: 'TP. Cần Thơ',
    address: 'Số 58 Nguyễn Hiền, Khu Dân Cư 91B, phường Tân An, TP. Cần Thơ',
    hours: '08:00 - 20:00 mỗi ngày',
  },
  {
    city: 'An Giang',
    address: 'Số 1, đường số 1, khu Tây sông Hậu, Phường Long Xuyên, Tỉnh An Giang',
    hours: '08:00 - 17:30 mỗi ngày',
  },
  {
    city: 'Đồng Tháp / Tiền Giang',
    address: 'Số 126, Hoàng Sa, Khu phố 4, Phường Thới Sơn, Tỉnh Đồng Tháp (TP. Mỹ Tho, Tiền Giang)',
    hours: '08:00 - 18:00 mỗi ngày',
  },
]

export const HOTLINE = '0907.215.252'
export const HOTLINE_ALT = '0937.148.222'

export function formatVND(amount: number): string {
  return new Intl.NumberFormat('vi-VN').format(amount) + 'đ'
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter((p) => p.categorySlug === categorySlug)
}

export function getProductGallery(product: Product): string[] {
  return product.gallery && product.gallery.length > 0 ? product.gallery : [product.image]
}

// ── Product articles (SEO content) ──
export const productArticles: Record<string, ProductArticle> = {
  'may-anh-canon-eos-r50-black-kem-lens-rfs-1845': {
    title: 'Canon EOS R50 Black kèm Lens RF-S 18-45mm — Máy ảnh APS-C lý tưởng cho người mới',
    intro:
      'Canon EOS R50 là chiếc máy ảnh mirrorless APS-C nhỏ gọn với cảm biến 24.2MP DIGIC X, Dual Pixel CMOS AF II 4.503 điểm, quay 4K 30p và nặng chỉ 375g. Phù hợp cho người mới bắt đầu và vlogger.',
    sections: [
      {
        heading: 'Cảm biến 24.2MP + DIGIC X',
        body: 'Cảm biến CMOS APS-C 24.2MP kết hợp bộ xử lý DIGIC X mang lại chất lượng ảnh sắc nét, màu sắc trung thực với dải nhạy sáng ISO 100-32,000.',
      },
      {
        heading: 'Dual Pixel CMOS AF II 4,503 điểm',
        body: 'Hệ thống lấy nét tự động 4,503 điểm nhận diện người, động vật, phương tiện — bám nét nhanh và chính xác ngay cả khi quay video 4K.',
      },
      {
        heading: 'Quay video 4K 30p + Full HD 120fps',
        body: 'Quay video 4K 30fps chi tiết sắc nét, Full HD 120fps cho slow-motion mượt mà. Màn hình xoay lật lý tưởng cho vlog và selfie.',
      },
    ],
    faqs: [
      {
        q: 'Canon EOS R50 dùng ngàm gì?',
        a: 'Máy sử dụng ngàm Canon RF, tương thích với dòng ống kính RF và RF-S. Có thể dùng ống kính EF/EF-S thông qua ngàm chuyển EF-EOS R.',
      },
      {
        q: 'R50 có chống rung không?',
        a: 'Máy không có IBIS (chống rung cảm biến), nhưng hỗ trợ IS điện tử và tương thích với các ống kính RF có IS tích hợp.',
      },
    ],
  },
  'may-anh-sony-alpha-a7-mark-iv-body-only': {
    title: 'Sony Alpha A7 Mark IV — Máy ảnh hybrid full-frame 33MP cho nhiếp ảnh & video',
    intro:
      'Sony Alpha A7 Mark IV là máy ảnh full-frame hybrid 33MP với hệ thống AF 759 điểm phase-detect, quay video 4K chuyên nghiệp, thiết kế tinh tế dành cho nhiếp ảnh gia và nhà làm phim.',
    sections: [
      {
        heading: 'Cảm biến Exmor R 33MP',
        body: 'Cảm biến full-frame 33MP BSI CMOS kết hợp bộ xử lý BIONZ XR mang lại dải nhạy sáng ISO 100-51,200 (mở rộng 50-204,800) và chất lượng ảnh vượt trội.',
      },
      {
        heading: '759 điểm lấy nét pha + 425 tương phản',
        body: 'Hệ thống AF lai với 759 điểm phase-detect bao phủ 94% cảm biến, nhận diện người/động vật/mặt trời với độ bám nét cao.',
      },
      {
        heading: 'Quay video UHD 4K + dual card slot',
        body: 'Quay video UHD 4K, dual card slot CFexpress Type A / SD UHS-II cho workflow chuyên nghiệp, pin NP-FZ100 dung lượng cao.',
      },
    ],
  },
}

export function getProductArticle(slug: string): ProductArticle | undefined {
  return productArticles[slug]
}
