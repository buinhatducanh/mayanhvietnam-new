import type { ProductSummary } from '../types';
import { imgs, COMMON_HOTLINE, buildArticle, gopro13Paths, action4Paths } from './utils';

const CDN = 'https://mayanhvietnam.com';

export const actionCameras: ProductSummary[] = [
  // ── 1. GoPro Hero 13 Black ──────────────────────────────────────────────
  {
    id: 'p6',
    slug: 'gopro-hero-13-black',
    name: 'GoPro Hero 13 Black',
    thumbnail: gopro13Paths.avatar,
    images: imgs(gopro13Paths.avatar, gopro13Paths.previews, 'GoPro Hero 13 Black'),
    price: 9690000,
    originalPrice: 9690000,
    badges: [{ type: 'hot', label: 'Bán chạy' }, { type: 'new', label: 'Mới 100%' }],
    rating: { average: 4.7, count: 218 },
    isUsed: false,
    brand: 'GoPro',
    availability: 'in_stock',
    category: 'action-camera',
    shortSpecs: [
      '5.3K 60fps / 4K 120fps',
      'Ảnh tĩnh 27MP',
      'HyperSmooth 6.0',
      'Chống nước 10m không cần vỏ',
      'Pin Enduro 1900mAh',
      'Wi-Fi 6 + Bluetooth 5.0',
      'Màn hình kép cảm ứng',
      'Horizon Lock 4.0 (360°)',
    ],
    description:
      'Camera hành trình với chất lượng ghi hình 5.3K/60fps, ảnh tĩnh 27MP, chống rung HyperSmooth 6.0, chống nước 10m, pin Enduro 1900mAh. Trang bị Bluetooth 5.0, Wi-Fi 6, màn hình kép cảm ứng, thiết kế bền bỉ phù hợp mọi điều kiện.',
    highlights: [
      '5.3K (5312×2988) 60fps / 4K 120fps / 2.7K 240fps',
      'Ảnh tĩnh 27MP',
      'HyperSmooth 6.0 + Horizon Lock 4.0 (360°)',
      'Chống nước 10m không cần vỏ',
      'Pin Enduro 1900mAh — bền bỉ hơn',
      'Màn hình kép cảm ứng 2.27" + 1.4"',
      'Wi-Fi 6 + Bluetooth 5.0',
      'Hỗ trợ ống kính Ultra Wide Mod lên đến 155°',
    ],
    specs: [
      {
        group: 'Camera',
        items: [
          { label: 'Cảm biến', value: 'CMOS 1/1.9 inch' },
          { label: 'Ảnh tĩnh', value: '27 Megapixel' },
          { label: 'Video 5.3K', value: '60fps' },
          { label: 'Video 4K', value: '120fps' },
          { label: 'Video 2.7K', value: '240fps' },
          { label: 'Video Codec', value: 'H.265 (HEVC)' },
          { label: 'Slow-motion', value: '8x ở 2.7K/1080p, 4x ở 4K, 2x ở 5.3K' },
        ],
      },
      {
        group: 'Ống kính & Ổn định',
        items: [
          { label: 'Field of view', value: 'Lên đến 155° (Ultra Wide Mod)' },
          { label: 'Chống rung', value: 'HyperSmooth 6.0' },
          { label: 'Horizon Lock', value: '4.0 — 360°' },
          { label: 'HDR', value: 'Có — video & ảnh' },
        ],
      },
      {
        group: 'Hiển thị & Audio',
        items: [
          { label: 'Màn hình chính', value: '2.27" cảm ứng' },
          { label: 'Màn hình phụ', value: '1.4" phía trước' },
          { label: 'Micro', value: '3 mic tích hợp + giảm tiếng ồn gió' },
        ],
      },
      {
        group: 'Kết nối & Lưu trữ',
        items: [
          { label: 'Bluetooth', value: '5.0' },
          { label: 'Wi-Fi', value: 'Wi-Fi 6 (2.4GHz + 5GHz)' },
          { label: 'USB', value: 'USB-C' },
          { label: 'Thẻ nhớ', value: 'microSD tối đa 512GB' },
        ],
      },
      {
        group: 'Vật lý',
        items: [
          { label: 'Pin', value: 'Enduro 1900mAh' },
          { label: 'Chống nước', value: '10m (không cần vỏ)' },
          { label: 'Mount', value: 'Ngón tay gắn tích hợp + ren 1/4"-20' },
          { label: 'Trọng lượng', value: '154g (gồm pin và đế)' },
          { label: 'Kích thước', value: '71.8 × 50.8 × 33.6 mm' },
          { label: 'Nhiệt độ hoạt động', value: '-10°C đến 40°C' },
        ],
      },
    ],
    packageIncludes: [
      '1× GoPro Hero 13 Black',
      '1× Pin Enduro',
      '1× Cáp USB-C',
      '1× Đế gắn adhesive + Quick-release buckle',
    ],
    article: buildArticle({
      title: 'Đánh giá GoPro Hero 13 Black — Action camera flagship 2025',
      readTime: 8,
      sections: [
        { heading: 'Tổng quan', content: 'GoPro Hero 13 Black là action camera flagship, với video 5.3K/60fps, ảnh 27MP, HyperSmooth 6.0, Horizon Lock 4.0, màn hình cảm ứng kép. Chống nước 10m không cần vỏ, pin Enduro 1900mAh bền bỉ.' },
        { heading: 'Video 5.3K/60fps', content: 'Độ phân giải 5312×2988 pixel — cao nhất phân khúc action camera. 4K 120fps slow motion, 2.7K 240fps ultra slow-mo. H.265 HEVC codec cho chất lượng cao, dung lượng thấp hơn.' },
        { heading: 'HyperSmooth 6.0', content: 'Thế hệ 6.0 cho video cực mượt — hoạt động tốt ở 5.3K/60fps. Horizon Lock 4.0 tự động giữ đường chân trời ở mọi góc quay, lên đến 360°.' },
        { heading: 'Ưu và nhược điểm', content: '**Ưu điểm:** Video 5.3K/60fps xuất sắc. HyperSmooth 6.0 cực mượt. Horizon Lock 4.0 360°. Màn hình kép. Pin Enduro 1900mAh.\n\n**Nhược điểm:** Giá cao cho action camera. Pin thay đổi mỗi thế hệ. Dung lượng file lớn (5.3K).' },
      ],
    }),
    variants: [
      { id: 'hero13-black', name: 'Bản tiêu chuẩn', price: 9690000 },
    ],
    sku: 'GOPRO-HERO13-BLACK',
    hotline: COMMON_HOTLINE,
    sourceUrl: 'https://mayanhvietnam.com/san-pham/gopro-hero-13-black_action-camera-250102113303811',
    scrapedAt: '2026-07-09',
  },

  // ── 2. DJI Osmo Action 4 Adventure Combo ──────────────────────────────
  {
    id: 'p16',
    slug: 'dji-osmo-action-4-adventure-combo',
    name: 'DJI Osmo Action 4 Adventure Combo',
    thumbnail: action4Paths.avatar,
    images: imgs(action4Paths.avatar, action4Paths.previews, 'DJI Osmo Action 4 Adventure Combo'),
    price: 8190000,
    originalPrice: 8190000,
    badges: [{ type: 'hot', label: 'Cảm biến lớn nhất' }],
    rating: { average: 4.7, count: 52 },
    isUsed: false,
    brand: 'DJI',
    availability: 'in_stock',
    category: 'action-camera',
    shortSpecs: [
      '1/1.3" CMOS — cảm biến lớn nhất',
      '4K 120fps',
      'Chống nước 18m',
      '160 phút (pin',
    ],
    description: 'DJI Osmo Action 4 — cảm biến 1/1.3 inch lớn nhất phân khúc, quay 4K 120fps, chống nước 18m, pin 160 phút,温控 cho mọi thời tiết.',
    highlights: [
      'Cảm biến 1/1.3" — lớn nhất phân khúc action camera',
      '4K 120fps slow motion',
      'Chống nước 18m — sâu nhất phân khúc',
      'Pin 160 phút — dài nhất',
    ],
    specs: [
      { group: 'Camera', items: [
        { label: 'Cảm biến', value: '1/1.3" CMOS' },
        { label: 'Video', value: '4K 120fps' },
      ]},
      { group: 'Vật lý', items: [
        { label: 'Chống nước', value: '18m' },
        { label: 'Pin', value: '160 phút' },
      ]},
    ],
    packageIncludes: [
      '1× DJI Osmo Action 4',
      '1× Battery Handle',
      '1× Mount Adapter',
      '1× Cáp USB-C',
      '2× Pin',
      '1× Quick-Release Adapter Mount',
    ],
    article: buildArticle({
      title: 'Đánh giá DJI Osmo Action 4 — Action camera cảm biến 1/1.3"',
      readTime: 6,
      sections: [
        { heading: 'Tổng quan', content: 'DJI Osmo Action 4 sở hữu cảm biến 1/1.3 inch — lớn nhất phân khúc action camera. Quay 4K 120fps, chống nước 18m, pin 160 phút. Lựa chọn tốt nhất cho vlogger và adventure photographer.' },
        { heading: 'Cảm biến lớn nhất phân khúc', content: 'Cảm biến 1/1.3" CMOS cho chất lượng ảnh thiếu sáng vượt trội so với GoPro Hero 12. 4K 120fps slow motion mượt, 2.7K 120fps. D-Log M 10-bit cho grading chuyên nghiệp.' },
        { heading: 'Chống nước 18m', content: 'Chống nước 18m không cần vỏ — sâu nhất phân khúc. Pin 160 phút (dài nhất). Magnetic quick-release mount cho phép chuyển đổi nhanh giữa các mount.' },
        { heading: 'Ưu và nhược điểm', content: '**Ưu điểm:** Cảm biến 1/1.3" lớn nhất. 4K 120fps. Chống nước 18m. Pin 160 phút.\n\n**Nhược điểm:** Hệ sinh thái phụ kiện chưa rộng bằng GoPro. Màn hình phía trước không cảm ứng.' },
      ],
    }),
    variants: [
      { id: 'action4-adventure', name: 'Adventure Combo', price: 8190000 },
    ],
    hotline: COMMON_HOTLINE,
    sourceUrl: 'https://mayanhvietnam.com/san-pham/dji-osmo-action-4-adventure-combo_action-camera-230805002213412',
    scrapedAt: '2026-07-09',
  },

  // ── 3. DJI Osmo Pocket 4 Creator Combo ────────────────────────────────
  {
    id: 'p7',
    slug: 'may-quay-dji-osmo-pocket-4-creator-combo',
    name: 'Máy quay DJI Osmo Pocket 4 Creator Combo',
    thumbnail: `${CDN}/image-data/san-pham/26-03/26-03-30/260330085702564/avatar/639120324002834549-dji-pocket-4-4-2000x2000-jpg_may-quay-dji-osmo-pocket-4-creator-combo.jpg`,
    images: imgs(
      `${CDN}/image-data/san-pham/26-03/26-03-30/260330085702564/avatar/639120324002834549-dji-pocket-4-4-2000x2000-jpg_may-quay-dji-osmo-pocket-4-creator-combo.jpg`,
      [],
      'DJI Osmo Pocket 4 Creator Combo',
    ),
    price: 14740000,
    originalPrice: 14740000,
    badges: [{ type: 'new', label: 'Creator' }, { type: 'hot', label: 'Bán chạy' }],
    rating: { average: 4.8, count: 142 },
    isUsed: false,
    brand: 'DJI',
    availability: 'in_stock',
    category: 'action-camera',
    shortSpecs: [
      'Dual sensor 1-inch 50MP',
      '4K 120fps',
      'Gimbal 3 trục',
      'Màn hình xoay',
      'Creator Combo đầy đủ',
    ],
    description:
      'Máy quay DJI Osmo Pocket 4 Creator Combo — cảm biến kép, sensor chính 1-inch 50MP, lấy nét nhanh toàn điểm ảnh, màn hình xoay linh hoạt, chống rung 3 trục. Combo đầy đủ cho người sáng tạo.',
    highlights: [
      'Dual sensor với sensor chính 1-inch 50MP',
      'Video 4K 120fps — slow motion cực mượt',
      'Chống rung 3 trục — gimbal cơ học',
      'Lấy nét toàn điểm ảnh — không bị out-of-focus',
      'Màn hình xoay linh hoạt',
      'Creator Combo đầy đủ phụ kiện',
    ],
    specs: [
      { group: 'Cảm biến', items: [
        { label: 'Cảm biến chính', value: '1-inch 50MP' },
        { label: 'Cảm biến phụ', value: 'Dual sensor setup' },
        { label: 'Lấy nét', value: 'Toàn điểm ảnh, nhanh' },
      ]},
      { group: 'Video', items: [
        { label: '4K', value: '120fps' },
        { label: 'Codec', value: 'H.264 / H.265' },
      ]},
      { group: 'Vật lý & Combo', items: [
        { label: 'Màn hình', value: 'Xoay linh hoạt' },
        { label: 'Chống rung', value: 'Gimbal 3 trục' },
        { label: 'Combo', value: 'DJI Mic 2, Wide-Angle Lens, Tripod, Charging Case' },
      ]},
    ],
    packageIncludes: [
      '1× DJI Osmo Pocket 4',
      '1× DJI Mic 2 Transmitter',
      '1× Wide-Angle Lens',
      '1× Mini Tripod',
      '1× Charging Case',
      '1× Cáp sạc USB-C',
    ],
    variants: [
      { id: 'pocket4-creator', name: 'Creator Combo', price: 14740000 },
    ],
    hotline: COMMON_HOTLINE,
    sourceUrl: 'https://mayanhvietnam.com/san-pham/dji-osmo-pocket-4-creator-combo_camera-pocket-260330085702564',
    scrapedAt: '2026-07-09',
  },

  // ── 4. DJI Osmo Nano Standard Combo ────────────────────────────────────
  {
    id: 'p17',
    slug: 'dji-osmo-nano-standard-combo-64gb-chinh-hang',
    name: 'DJI Osmo Nano Standard Combo (64GB) — Chính hãng',
    thumbnail: `${CDN}/image-data/san-pham/25-09/25-09-12/250912092924846/avatar/638944102167625645_dji-osmo-nano-standard-combo-64gb-chinh-hang.jpg`,
    images: imgs(
      `${CDN}/image-data/san-pham/25-09/25-09-12/250912092924846/avatar/638944102167625645_dji-osmo-nano-standard-combo-64gb-chinh-hang.jpg`,
      [],
      'DJI Osmo Nano Standard Combo',
    ),
    price: 8470000,
    originalPrice: 8470000,
    badges: [{ type: 'new', label: 'Nhỏ nhất' }, { type: 'hot', label: 'Mới 2025' }],
    rating: { average: 4.7, count: 19 },
    isUsed: false,
    brand: 'DJI',
    availability: 'in_stock',
    category: 'action-camera',
    isNew: true,
    shortSpecs: [
      '1/1.3" CMOS 48MP',
      '4K 120fps',
      'Chống nước 10m',
      '160 phút pin',
      '36g camera chính',
      '64GB tích hợp',
    ],
    description: 'DJI Osmo Nano — action camera nhỏ gọn nhất, cảm biến 1/1.3 inch, quay 4K 120fps, chống nước 10m, stabilisation RockSteady 3.0.',
    highlights: [
      'Cảm biến 1/1.3" CMOS — 48MP',
      '4K 120fps slow motion',
      'Chống nước 10m',
      'Thời lượng pin 160 phút',
      'Chỉ 36g camera chính — nhỏ nhất',
    ],
    specs: [
      { group: 'Camera', items: [
        { label: 'Cảm biến', value: '1/1.3" CMOS, 48MP' },
        { label: 'Video', value: '4K 120fps' },
        { label: 'Chống rung', value: 'RockSteady 3.0' },
      ]},
      { group: 'Vật lý', items: [
        { label: 'Chống nước', value: '10m' },
        { label: 'Thời lượng pin', value: '160 phút' },
        { label: 'Trọng lượng', value: '36g (camera chính)' },
        { label: 'Bộ nhớ', value: '64GB tích hợp' },
      ]},
    ],
    packageIncludes: [
      '1× DJI Osmo Nano',
      '1× Magnetic Mount',
      '1× Charging Cable',
      '1× Quick Start Guide',
    ],
    article: buildArticle({
      title: 'Đánh giá DJI Osmo Nano — Action camera nhỏ gọn nhất 2025',
      readTime: 5,
      sections: [
        { heading: 'Tổng quan', content: 'DJI Osmo Nano là action camera nhỏ gọn nhất với cảm biến 1/1.3" 48MP, 4K 120fps, chống nước 10m, 64GB tích hợp, chỉ 36g. Lựa chọn hoàn hảo cho vlog di động và POV action.' },
        { heading: 'Cảm biến 1/1.3" trong 36g', content: 'Trọng lượng chỉ 36g (camera chính) — nhẹ nhất phân khúc. Cảm biến 1/1.3" 48MP cho ảnh thiếu sáng tốt. RockSteady 3.0 + HorizonSteady chống rung video.' },
        { heading: 'Pin 160 phút', content: '160 phút pin — đủ cho cả ngày quay. 64GB tích hợp sẵn. Sạc nhanh USB-C PD. Magnetic mount cho phép gắn nhanh lên quần áo, mũ, ba lô.' },
        { heading: 'Ưu và nhược điểm', content: '**Ưu điểm:** Nhỏ nhẹ 36g. Cảm biến 1/1.3". 4K 120fps. Pin 160 phút.\n\n**Nhược điểm:** Màn hình chính nhỏ. Không có Bluetooth mic riêng.' },
      ],
    }),
    variants: [
      { id: 'osmo-nano-64', name: 'Standard Combo 64GB', price: 8470000 },
    ],
    hotline: COMMON_HOTLINE,
    sourceUrl: 'https://mayanhvietnam.com/san-pham/dji-osmo-nano-standard-combo-64gb-chinh-hang_action-camera-250912092924846',
    scrapedAt: '2026-07-10',
  },
];
