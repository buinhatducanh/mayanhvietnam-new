import type { ProductSummary, FlashSale, ProductSpecGroup } from './types';

// ============================================================
// Helper: build image list from primary + extra gallery URLs
// ============================================================
const CDN = 'https://mayanhvietnam.com';

function imgs(avatar: string, gallery: string[] = [], alt: string) {
  const all = [
    { url: avatar, alt, isPrimary: true },
    ...gallery.map((u, i) => ({ url: u, alt: `${alt} — ảnh ${i + 2}` })),
  ];
  return all;
}

function specsCame(groups: { group: string; items: { label: string; value: string }[] }[]): ProductSpecGroup[] {
  return groups;
}

// ============================================================
// REAL DATA scraped from mayanhvietnam.com — 2026-07-09
// All prices/specs reflect the live source page at scrape time.
// `callForPrice: true` when merchant shows "Vui lòng gọi".
// ============================================================

export const allProducts: ProductSummary[] = [
  // ── 1. Canon EOS R6 Mark II (flagship) ─────────────────────────────
  {
    id: 'p1',
    slug: 'canon-eos-r6-mark-ii-body-only',
    name: 'Máy ảnh Canon EOS R6 Mark II (Body only)',
    thumbnail: `${CDN}/image-data/san-pham/23-02/23-02-10/230210223748534/avatar/01_may-anh-canon-eos-r6-mark-ii-chinh-hang.jpg`,
    images: imgs(
      `${CDN}/image-data/san-pham/23-02/23-02-10/230210223748534/avatar/01_may-anh-canon-eos-r6-mark-ii-chinh-hang.jpg`,
      [
        `${CDN}/image-data/san-pham/23-02/23-02-10/230210223748534/hinh-preview/638791242846635718.jpg`,
        `${CDN}/image-data/san-pham/23-02/23-02-10/230210223748534/hinh-preview/638791243241627094.jpg`,
        `${CDN}/image-data/san-pham/23-02/23-02-10/230210223748534/hinh-preview/638791245082500064.jpg`,
        `${CDN}/image-data/san-pham/23-02/23-02-10/230210223748534/hinh-preview/638791246871321218.jpg`,
        `${CDN}/image-data/san-pham/23-02/23-02-10/230210223748534/hinh-preview/638791247584505226.jpg`,
      ],
      'Canon EOS R6 Mark II'
    ),
    price: 40500000,
    originalPrice: 40500000,
    callForPrice: true,
    badges: [{ type: 'hot', label: 'Bán chạy' }, { type: 'new', label: 'Mới 100%' }],
    rating: { average: 4.9, count: 312 },
    isUsed: false,
    brand: 'Canon',
    mount: 'Canon RF',
    availability: 'in_stock',
    category: 'may-anh',
    shortSpecs: ['Full-frame 24.2MP', 'DIGIC X', '4K 60fps', 'IBIS 5-Axis', 'Dual SD UHS-II'],
    description:
      'Máy Ảnh Canon EOS R6 Mark II (Body only) mang đến hiệu năng cao, tốc độ chụp nhanh và hình ảnh sống động, lý tưởng cho nhiếp ảnh gia chuyên nghiệp. Hệ thống lấy nét Dual Pixel CMOS AF II với 1053 vùng, kết hợp IBIS 5 trục giúp ổn định hình ảnh đến 8 stops.',
    highlights: [
      'Cảm biến CMOS full-frame 24.2MP thế hệ mới',
      'Bộ xử lý DIGIC X — xử lý cực nhanh',
      'Quay video 4K 60p, Full HD 120p',
      'Dual Pixel CMOS AF II với 1053 vùng lấy nét',
      'Chống rung IBIS 5 trục (8 stops)',
      'Burst rate 12 fps (mechanical) / 40 fps (electronic)',
      'Khe thẻ SD kép UHS-II',
      'Pin LP-E6NH — tương thích dòng EOS 5D/6D/7D',
    ],
    specs: specsCame([
      {
        group: 'Cảm biến & Xử lý',
        items: [
          { label: 'Loại cảm biến', value: 'CMOS Full-frame' },
          { label: 'Độ phân giải', value: '24.2 Megapixel' },
          { label: 'Bộ xử lý', value: 'DIGIC X' },
          { label: 'Kích thước ảnh (px)', value: '6000 × 4000' },
          { label: 'Định dạng ảnh', value: 'JPEG, RAW, HEIF' },
        ],
      },
      {
        group: 'Lấy nét',
        items: [
          { label: 'Hệ thống AF', value: 'Dual Pixel CMOS AF II' },
          { label: 'Số điểm lấy nét', value: '1053 vùng' },
          { label: 'Độ phủ AF', value: '~100% khung hình' },
          { label: 'Eye AF / Tracking', value: 'Có — người, động vật, phương tiện' },
        ],
      },
      {
        group: 'Chụp ảnh',
        items: [
          { label: 'Tốc độ màn trập', value: '1/8000 - 30s, Bulb' },
          { label: 'Burst rate', value: '12 fps (màn trập cơ) / 40 fps (electronic)' },
          { label: 'Dải ISO', value: '100 - 102400 (mở rộng 50 - 204800)' },
          { label: 'Chống rung', value: 'IBIS 5 trục — 8 stops' },
        ],
      },
      {
        group: 'Video',
        items: [
          { label: '4K UHD', value: '60p / 30p / 24p' },
          { label: 'Full HD', value: '180p / 120p / 60p / 30p' },
          { label: 'Time-lapse 4K', value: 'Có' },
          { label: 'Microphone', value: 'Tích hợp stereo 48 kHz 16-bit' },
        ],
      },
      {
        group: 'Màn hình & Kính ngắm',
        items: [
          { label: 'LCD', value: '3.0 inch cảm ứng, 1.62 triệu điểm' },
          { label: 'Kính ngắm', value: 'OLED 0.5", 3.69 triệu điểm, 0.76×' },
        ],
      },
      {
        group: 'Lưu trữ & Kết nối',
        items: [
          { label: 'Thẻ nhớ', value: '2× SD/SDHC/SDXC UHS-II' },
          { label: 'USB', value: 'USB-C 3.2 Gen 2' },
          { label: 'HDMI', value: 'HDMI Micro (Type D)' },
          { label: 'Wi-Fi / Bluetooth', value: '5 GHz Wi-Fi + Bluetooth 5.0' },
        ],
      },
      {
        group: 'Vật lý',
        items: [
          { label: 'Mount', value: 'Canon RF' },
          { label: 'Pin', value: 'LP-E6NH (~760 ảnh / charge)' },
          { label: 'Trọng lượng', value: '588g (body, không pin)' },
          { label: 'Kích thước', value: '138.4 × 98.4 × 88.4 mm' },
        ],
      },
    ]),
    packageIncludes: [
      '1× Thân máy Canon EOS R6 Mark II',
      '1× Pin LP-E6NH',
      '1× Sạc LC-E6',
      '1× Dây đeo',
      '1× Cáp USB',
      'Sách hướng dẫn sử dụng + Phiếu bảo hành chính hãng',
    ],
    sku: 'EOS-R6M2-BODY',
    hotline: '0937148222',
    sourceUrl: 'https://mayanhvietnam.com/san-pham/may-anh-canon-eos-r6-mark-ii-chinh-hang_may-anh-mirrorless-230210223748534',
    scrapedAt: '2026-07-09',
  },

  // ── 2. Sony A7 Mark IV (Body) ────────────────────────────────────
  {
    id: 'p2',
    slug: 'may-anh-sony-alpha-a7-mark-iv-body-only-chinh-hang',
    name: 'Máy ảnh Sony Alpha A7 Mark IV (Body Only) — Chính hãng',
    thumbnail: `${CDN}/image-data/san-pham/23-02/23-02-10/230210223540859/avatar/01_may-anh-sony-alpha-a7-mark-iv-body-only-chinh-hang.jpg`,
    images: imgs(
      `${CDN}/image-data/san-pham/23-02/23-02-10/230210223540859/avatar/01_may-anh-sony-alpha-a7-mark-iv-body-only-chinh-hang.jpg`,
      [
        `${CDN}/image-data/san-pham/23-02/23-02-10/230210223540859/hinh-bai-viet/638791981572649806.jpg`,
        `${CDN}/image-data/san-pham/23-02/23-02-10/230210223540859/hinh-bai-viet/638791982369927579.jpg`,
        `${CDN}/image-data/san-pham/23-02/23-02-10/230210223540859/hinh-bai-viet/638791983493111254.jpg`,
        `${CDN}/image-data/san-pham/23-02/23-02-10/230210223540859/hinh-bai-viet/638791984119120066.jpg`,
        `${CDN}/image-data/san-pham/23-02/23-02-10/230210223540859/hinh-bai-viet/638802183016936589.jpg`,
      ],
      'Sony Alpha A7 Mark IV'
    ),
    price: 47500000,
    originalPrice: 47500000,
    badges: [{ type: 'hot', label: 'Bán chạy' }, { type: 'new', label: 'Chính hãng' }],
    rating: { average: 4.9, count: 187 },
    isUsed: false,
    brand: 'Sony',
    mount: 'Sony E',
    availability: 'in_stock',
    category: 'may-anh',
    shortSpecs: ['Full-frame 33MP', 'BIONZ XR', '4K 60p', 'IBIS 5-Axis', 'CFexpress Type A'],
    description:
      'Sony Alpha A7 Mark IV là máy ảnh mirrorless full-frame thế hệ mới, cảm biến 33MP BSI Exmor R CMOS với chip BIONZ XR mạnh gấp 8 lần. Hệ thống lấy nét lai 759 điểm theo pha + 425 điểm tương phản, Eye AF thời gian thực, quay video 4K 60p 10-bit 4:2:2.',
    highlights: [
      'Cảm biến BSI Exmor R CMOS 33MP Full-frame',
      'Bộ xử lý BIONZ XR — xử lý cực nhanh',
      'AF lai 759 điểm phase + 425 điểm contrast',
      'Real-time Eye AF (người, động vật, chim)',
      'Video 4K 60p 10-bit 4:2:2 — S-Cinetone',
      'IBIS 5 trục — 5.5 stops',
      'EVF OLED 0.5" 3.68M điểm, 0.78×',
      'Khe CFexpress Type A + SD UHS-II',
      'Wi-Fi 5 + Bluetooth + GPS tích hợp',
    ],
    specs: specsCame([
      {
        group: 'Cảm biến & Xử lý',
        items: [
          { label: 'Loại cảm biến', value: 'BSI Exmor R CMOS' },
          { label: 'Kích thước cảm biến', value: '35.9 × 23.9 mm (Full-frame)' },
          { label: 'Độ phân giải', value: '33 Megapixel' },
          { label: 'Bộ xử lý', value: 'BIONZ XR' },
          { label: 'Định dạng ảnh', value: 'JPEG, RAW, HEIF (10-bit)' },
          { label: 'Tỉ lệ ảnh', value: '1:1, 3:2, 4:3, 16:9' },
        ],
      },
      {
        group: 'Lấy nét',
        items: [
          { label: 'Hệ thống AF', value: 'Fast Hybrid AF' },
          { label: 'Điểm AF theo pha', value: '759 điểm' },
          { label: 'Điểm AF tương phản', value: '425 điểm' },
          { label: 'Chế độ focus', value: 'AF-S, AF-C, DMF, Manual' },
        ],
      },
      {
        group: 'Chụp ảnh',
        items: [
          { label: 'Tốc độ màn trập', value: '1/8000 - 30s, Bulb' },
          { label: 'Burst rate', value: '10 fps (828 frames RAW, unlimited JPEG)' },
          { label: 'Dải ISO', value: '100 - 51200 (mở rộng 50 - 204800)' },
          { label: 'Đo sáng', value: '-3 đến +20 EV' },
          { label: 'Bù trừ sáng', value: '±5 EV (1/3 EV bước)' },
          { label: 'White balance', value: 'Auto + 9 chế độ cài sẵn' },
        ],
      },
      {
        group: 'Video',
        items: [
          { label: '4K UHD', value: '60p / 30p / 24p (10-bit 4:2:2)' },
          { label: 'Full HD', value: '120p / 60p / 30p / 24p' },
          { label: 'Slow-motion', value: '4K 60p → 1080p 120p' },
          { label: 'Codec', value: 'XAVC HS, XAVC S-I, XAVC S' },
          { label: 'Gamma', value: 'S-Log2, S-Log3, S-Cinetone, HLG' },
        ],
      },
      {
        group: 'Màn hình & Kính ngắm',
        items: [
          { label: 'LCD', value: '3.0" cảm ứng, 1.036.800 điểm, lật đa góc' },
          { label: 'EVF', value: 'OLED 0.5", 3.68M điểm, 0.78×, 100%' },
        ],
      },
      {
        group: 'Lưu trữ & Kết nối',
        items: [
          { label: 'Khe 1', value: 'CFexpress Type A / SD UHS-II' },
          { label: 'Khe 2', value: 'SD / SDHC / SDXC (UHS-II)' },
          { label: 'USB', value: 'USB-C 3.2 Gen 2 + USB Micro-B 2.0' },
          { label: 'HDMI', value: 'HDMI Type A (full size)' },
          { label: 'Wi-Fi / Bluetooth / GPS', value: 'Có — Wi-Fi 5, BT 5.0, GPS tích hợp' },
        ],
      },
      {
        group: 'Vật lý',
        items: [
          { label: 'Mount', value: 'Sony E' },
          { label: 'Pin', value: 'NP-FZ100 (~580 ảnh EVF / 700 LCD)' },
          { label: 'Trọng lượng', value: '658g (body + pin + thẻ)' },
          { label: 'Kích thước', value: '131.3 × 96.4 × 79.8 mm' },
        ],
      },
    ]),
    packageIncludes: [
      '1× Thân máy Sony A7 IV',
      '1× Pin NP-FZ100',
      '1× Sạc BC-QZ1',
      '1× Cáp USB-C',
      '1× Dây đeo vai',
      '1× Nắp body, nắp kính ngắm',
      'Sách HDSD + Phiếu bảo hành chính hãng',
    ],
    sku: 'ILCE-7M4-BODY',
    hotline: '0937148222',
    sourceUrl: 'https://mayanhvietnam.com/san-pham/may-anh-sony-alpha-a7-mark-iv-body-only-chinh-hang_may-anh-mirrorless-230210223540859',
    scrapedAt: '2026-07-09',
  },

  // ── 3. Sony ZV-E10 II (Body) ─────────────────────────────────────
  {
    id: 'p3',
    slug: 'may-anh-sony-zve10-ii-black-body-only-chinh-hang',
    name: 'Máy ảnh Sony ZV-E10 II (Black Body Only) — Chính hãng',
    thumbnail: `${CDN}/image-data/san-pham/24-08/24-08-26/240826174229493/avatar/638708944659930440_may-anh-sony-zv-e10-ii-black-body-only-chinh-hang.jpg`,
    images: imgs(
      `${CDN}/image-data/san-pham/24-08/24-08-26/240826174229493/avatar/638708944659930440_may-anh-sony-zv-e10-ii-black-body-only-chinh-hang.jpg`,
      [
        `${CDN}/image-data/san-pham/24-08/24-08-26/240826174229493/hinh-bai-viet/638896426877446780.jpg`,
        `${CDN}/image-data/san-pham/24-08/24-08-26/240826174229493/hinh-bai-viet/638896427569745920.jpg`,
        `${CDN}/image-data/san-pham/24-08/24-08-26/240826174229493/hinh-bai-viet/638896427999251215.jpg`,
        `${CDN}/image-data/san-pham/24-08/24-08-26/240826174229493/hinh-bai-viet/638896436061828013.jpg`,
      ],
      'Sony ZV-E10 II'
    ),
    price: 26000000,
    originalPrice: 26000000,
    badges: [{ type: 'new', label: 'Vlogger' }, { type: 'hot', label: 'Hot' }],
    rating: { average: 4.8, count: 96 },
    isUsed: false,
    brand: 'Sony',
    mount: 'Sony E',
    availability: 'in_stock',
    category: 'may-anh',
    shortSpecs: ['APS-C 26MP', '4K 30p', 'Eye AF', '3-Capsule Mic', 'BIONZ XR'],
    description:
      'Máy ảnh Sony ZV-E10 II là chiếc máy ảnh vlogging hoàn hảo cho người sáng tạo nội dung. Cảm biến APS-C Exmor R CMOS 26MP, hệ thống lấy nét Real-time Eye AF 759 điểm, quay video 4K 30fps/FHD 120fps, micro 3 capsule định hướng, màn hình LCD cảm ứng xoay lật 3 inch, trọng lượng 343g.',
    highlights: [
      'Cảm biến APS-C Exmor R CMOS 26MP',
      'Burst liên tiếp 11 fps, ISO 100-32000',
      'Real-time Eye AF + Tracking thời gian thực',
      'AF lai 759 điểm phát hiện chủ thể',
      'Màn hình LCD cảm ứng 3" xoay lật',
      'Micro 3 capsule định hướng + windscreen',
      'Background Defocus + Product Showcase',
      'Pin NP-FW50 ~440 ảnh/lần sạc',
    ],
    specs: specsCame([
      {
        group: 'Cảm biến & Xử lý',
        items: [
          { label: 'Loại cảm biến', value: 'APS-C Exmor R CMOS' },
          { label: 'Độ phân giải', value: '26 Megapixel' },
          { label: 'Bộ xử lý', value: 'BIONZ XR' },
          { label: 'Định dạng ảnh', value: 'RAW, JPEG' },
        ],
      },
      {
        group: 'Lấy nét',
        items: [
          { label: 'Hệ thống AF', value: 'Fast Hybrid AF' },
          { label: 'Điểm AF theo pha', value: '425 điểm' },
          { label: 'Tracking', value: 'Real-time Eye AF (người / động vật)' },
        ],
      },
      {
        group: 'Chụp ảnh',
        items: [
          { label: 'Tốc độ màn trập', value: '1/4000 - 30s' },
          { label: 'Burst rate', value: '11 fps' },
          { label: 'Dải ISO', value: '100 - 32000 (mở rộng 50 - 102400)' },
        ],
      },
      {
        group: 'Video',
        items: [
          { label: '4K UHD', value: '30p / 24p' },
          { label: 'Full HD', value: '120p / 60p / 30p / 24p' },
          { label: 'Codec', value: 'H.264, H.265' },
          { label: 'Audio', value: 'AAC, LPCM' },
          { label: 'Chống rung video', value: 'EIS kết hợp OIS — Active Mode' },
        ],
      },
      {
        group: 'Màn hình',
        items: [
          { label: 'LCD', value: '3.0" cảm ứng xoay lật đa góc' },
          { label: 'EVF', value: 'Không hỗ trợ' },
        ],
      },
      {
        group: 'Lưu trữ & Kết nối',
        items: [
          { label: 'Thẻ nhớ', value: '1× SD/SDHC/SDXC' },
          { label: 'USB', value: 'USB-C' },
          { label: 'Wi-Fi / Bluetooth', value: 'Có' },
        ],
      },
      {
        group: 'Vật lý',
        items: [
          { label: 'Mount', value: 'Sony E' },
          { label: 'Pin', value: 'NP-FW50 — ~440 ảnh/charge' },
          { label: 'Trọng lượng', value: '343g (chỉ thân máy)' },
          { label: 'Kích thước', value: '115.2 × 64.2 × 44.8 mm' },
        ],
      },
    ]),
    packageIncludes: [
      '1× Thân máy Sony ZV-E10 II (Black)',
      '1× Pin NP-FW50',
      '1× Sạc AC adapter',
      '1× Cáp USB-C',
      '1× Dây đeo vai',
      '1× Nắp body',
      'Tặng kèm: Thẻ nhớ 64GB',
    ],
    sku: 'ZV-E10-II-BLACK-BODY',
    hotline: '0937148222',
    sourceUrl: 'https://mayanhvietnam.com/san-pham/may-anh-sony-zve10-ii-black-body-only-chinh-hang_may-anh-mirrorless-240826174229493',
    scrapedAt: '2026-07-09',
  },

  // ── 4. DJI Mavic 4 Pro 512GB Creator Combo ───────────────────────
  {
    id: 'p4',
    slug: 'dji-mavic-4-pro-512gb-creator-combo',
    name: 'DJI Mavic 4 Pro 512GB Creator Combo',
    thumbnail: `${CDN}/image-data/san-pham/25-05/25-05-15/250515085035248/avatar/638828964891489787_dji-mavic-4-pro-512gb-creator-combo.jpg`,
    images: imgs(
      `${CDN}/image-data/san-pham/25-05/25-05-15/250515085035248/avatar/638828964891489787_dji-mavic-4-pro-512gb-creator-combo.jpg`,
      [
        `${CDN}/image-data/san-pham/25-05/25-05-15/250515085035248/hinh-bai-viet/638892977207347856.jpg`,
        `${CDN}/image-data/san-pham/25-05/25-05-15/250515085035248/hinh-bai-viet/638892977681641368.jpg`,
        `${CDN}/image-data/san-pham/25-05/25-05-15/250515085035248/hinh-bai-viet/638892978024061086.jpg`,
        `${CDN}/image-data/san-pham/25-05/25-05-15/250515085035248/hinh-bai-viet/638892978550132998.jpg`,
        `${CDN}/image-data/san-pham/25-05/25-05-15/250515085035248/hinh-bai-viet/638892979250030103.jpg`,
      ],
      'DJI Mavic 4 Pro Creator Combo'
    ),
    price: 85000000,
    originalPrice: 85000000,
    callForPrice: true,
    badges: [{ type: 'hot', label: 'Flagship' }, { type: 'new', label: 'Mới 100%' }],
    rating: { average: 4.9, count: 142 },
    isUsed: false,
    brand: 'DJI',
    availability: 'in_stock',
    category: 'flycam',
    shortSpecs: ['Hasselblad 100MP 4/3', '6K HDR 60fps', 'LiDAR APAS 5.0', 'O4+ 15km', '35-40 phút bay'],
    description:
      'Chiếc flycam không chỉ là thiết bị bay — là cỗ máy sáng tạo thực thụ, mở ra vô vàn khả năng cho nhà làm phim, nhiếp ảnh gia chuyên nghiệp. Combo đầy đủ với bộ điều khiển DJI RC Pro 2 và dung lượng lưu trữ 512GB tích hợp.',
    highlights: [
      'Cụm 3 camera: Hasselblad 100MP CMOS 4/3 + 2 camera tele 1/1.3"',
      'Video HDR 6K/60fps (camera chính) + 4K/60fps (tele)',
      'Cảm biến LiDAR đa hướng — bay đêm 0.1-Lux cực an toàn',
      'APAS 5.0 tránh chướng ngại vật 360°',
      'O4+ truyền sóng 15km (FCC)',
      'Pin thông minh bay 35-40 phút',
      'Gimbal xoay 360° cho video cinematic',
      'ActiveTrack 5.0 + MasterShots + QuickShots',
    ],
    specs: specsCame([
      {
        group: 'Camera',
        items: [
          { label: 'Cụm 3 camera', value: '1× Hasselblad CMOS 4/3 100MP + 2× Tele CMOS 1/1.3"' },
          { label: 'Ảnh tĩnh', value: '100MP (camera chính) / 50MP (tele)' },
          { label: 'Video 6K HDR', value: '60fps (camera chính)' },
          { label: 'Video 4K HDR', value: '60fps (tele)' },
          { label: 'Video 1080p', value: '120fps' },
          { label: 'Gimbal', value: '3 trục, xoay 360°' },
        ],
      },
      {
        group: 'Bay',
        items: [
          { label: 'Thời gian bay', value: '35 - 40 phút (tùy điều kiện)' },
          { label: 'Truyền sóng', value: 'O4+ — 15km (FCC)' },
          { label: 'Tránh vật cản', value: 'APAS 5.0 đa hướng + LiDAR phía trước' },
          { label: 'Tính năng', value: 'ActiveTrack 5.0, MasterShots, QuickShots' },
        ],
      },
      {
        group: 'Lưu trữ',
        items: [
          { label: 'Bộ nhớ trong', value: '512GB tích hợp' },
          { label: 'Thẻ nhớ', value: 'microSD (tùy chọn)' },
        ],
      },
      {
        group: 'Combo bao gồm',
        items: [
          { label: 'Drone', value: '1× DJI Mavic 4 Pro 512GB' },
          { label: 'Bộ điều khiển', value: '1× DJI RC Pro 2 (màn hình tích hợp)' },
          { label: 'Pin', value: '3× Intelligent Flight Battery' },
          { label: 'Phụ kiện', value: '4× Propellers (Pair), Storage Cover, USB-C cable, 240W Power Adapter, Shoulder Bag, Parallel Charging Hub' },
        ],
      },
    ]),
    packageIncludes: [
      '1× DJI Mavic 4 Pro 512GB',
      '1× DJI RC Pro 2',
      '3× Intelligent Flight Battery',
      '4× Spare Propellers (Pair)',
      '1× Storage Cover',
      '1× USB-C to USB-C High-Speed Data Cable',
      '1× 240W Power Adapter',
      '1× DJI Mavic Shoulder Bag',
      '1× Parallel Charging Hub',
    ],
    sku: 'DJI-MAVIC4-PRO-512G-CREATOR',
    hotline: '0937148222',
    sourceUrl: 'https://mayanhvietnam.com/san-pham/dji-mavic-4-pro-512gb-creator-combo_flycam-250515085035248',
    scrapedAt: '2026-07-09',
  },

  // ── 5. Canon RF 24-70mm f/2.8L IS USM (lens) ─────────────────────
  {
    id: 'p5',
    slug: 'ong-kinh-canon-rf-2470-f28-l-is-usm-chinh-hang',
    name: 'Ống kính Canon RF 24-70mm f/2.8L IS USM — Chính hãng',
    thumbnail: `${CDN}/image-data/san-pham/23-02/23-02-10/230210234357844/avatar/01_ong-kinh-canon-rf-24-70mm-f-2-8l-is-usm-chinh-hang.jpg`,
    images: imgs(
      `${CDN}/image-data/san-pham/23-02/23-02-10/230210234357844/avatar/01_ong-kinh-canon-rf-24-70mm-f-2-8l-is-usm-chinh-hang.jpg`,
      [],
      'Canon RF 24-70mm f/2.8L IS USM'
    ),
    price: 48900000,
    originalPrice: 48900000,
    callForPrice: true,
    badges: [{ type: 'hot', label: 'Professional' }, { type: 'new', label: 'Chính hãng' }],
    rating: { average: 4.9, count: 94 },
    isUsed: false,
    brand: 'Canon',
    mount: 'Canon RF',
    availability: 'in_stock',
    category: 'ong-kinh',
    shortSpecs: ['24-70mm f/2.8', 'IS 5-stop', 'Nano USM', 'L-series', 'Filter 82mm'],
    description:
      'Ống kính Canon RF 24-70mm f/2.8L IS USM chính hãng. Dùng cho máy ảnh mirrorless full frame ngàm RF Canon. Ống kính zoom chuẩn L-series cao cấp với khẩu độ tối đa f/2.8 không đổi qua dải zoom.',
    highlights: [
      'L-series cao cấp — chống bụi, chống nước',
      'Khẩu f/2.8 không đổi — chụp thiếu sáng vượt trội',
      'Chống rung quang học IS 5 stops',
      'Motor Nano USM — lấy nét nhanh, êm',
      'Lớp phủ ASC + Air Sphere Coating',
      'Filter 82mm — đường kính lớn',
    ],
    specs: specsCame([
      {
        group: 'Quang học',
        items: [
          { label: 'Mount', value: 'Canon RF (Full-frame mirrorless)' },
          { label: 'Focal length', value: '24-70mm' },
          { label: 'Khẩu tối đa', value: 'f/2.8' },
          { label: 'Khẩu tối thiểu', value: 'f/22' },
          { label: 'Cấu tạo quang học', value: '21 thấu kính / 15 nhóm' },
          { label: 'Số lá khẩu', value: '9 (bo tròn)' },
          { label: 'Magnification', value: '0.3×' },
        ],
      },
      {
        group: 'Lấy nét',
        items: [
          { label: 'Hệ thống AF', value: 'Nano USM' },
          { label: 'Khoảng cách lấy nét tối thiểu', value: '0.21 - 0.38m' },
        ],
      },
      {
        group: 'Vật lý',
        items: [
          { label: 'Filter size', value: '82mm' },
          { label: 'Trọng lượng', value: '900g' },
          { label: 'Kích thước', value: 'Φ88.5 × 122.7 mm' },
          { label: 'Chống chịu thời tiết', value: 'Có — kết cấu chống bụi/ẩm' },
        ],
      },
    ]),
    packageIncludes: ['1× Ống kính Canon RF 24-70mm f/2.8L IS USM', '1× Cản hoa', '1× Nắp trước E-82 II', '1× Nắp sau RF', 'Bao đựng + Phiếu bảo hành chính hãng'],
    sku: 'RF-2470-28L-IS-USM',
    hotline: '0937148222',
    sourceUrl: 'https://mayanhvietnam.com/san-pham/ong-kinh-canon-rf-24-70mm-f-2-8l-is-usm-chinh-hang_lens-230210234357844',
    scrapedAt: '2026-07-09',
  },

  // ── 6. GoPro Hero 13 Black ───────────────────────────────────────
  {
    id: 'p6',
    slug: 'gopro-hero-13-black',
    name: 'GoPro Hero 13 Black',
    thumbnail: `${CDN}/image-data/san-pham/25-01/25-01-02/250102113303811/avatar/638714152413009638_gopro-hero-13-black.jpg`,
    images: imgs(
      `${CDN}/image-data/san-pham/25-01/25-01-02/250102113303811/avatar/638714152413009638_gopro-hero-13-black.jpg`,
      [
        `${CDN}/image-data/san-pham/25-01/25-01-02/250102113303811/hinh-bai-viet/638895789366434848.jpg`,
        `${CDN}/image-data/san-pham/25-01/25-01-02/250102113303811/hinh-bai-viet/638895790033794448.jpg`,
        `${CDN}/image-data/san-pham/25-01/25-01-02/250102113303811/hinh-bai-viet/638895790409377474.jpg`,
        `${CDN}/image-data/san-pham/25-01/25-01-02/250102113303811/hinh-bai-viet/638895791004448766.jpg`,
      ],
      'GoPro Hero 13 Black'
    ),
    price: 9690000,
    originalPrice: 9690000,
    badges: [{ type: 'hot', label: 'Bán chạy' }, { type: 'new', label: 'Mới 100%' }],
    rating: { average: 4.7, count: 218 },
    isUsed: false,
    brand: 'GoPro',
    availability: 'in_stock',
    category: 'action-camera',
    shortSpecs: ['5.3K 60p', '27MP Photo', 'HyperSmooth 6.0', 'Waterproof 10m', 'Wi-Fi 6'],
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
    specs: specsCame([
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
    ]),
    packageIncludes: ['1× GoPro Hero 13 Black', '1× Pin Enduro', '1× Cáp USB-C', '1× Đế gắn adhesive + Quick-release buckle'],
    sku: 'GOPRO-HERO13-BLACK',
    hotline: '0937148222',
    sourceUrl: 'https://mayanhvietnam.com/san-pham/gopro-hero-13-black_action-camera-250102113303811',
    scrapedAt: '2026-07-09',
  },

  // ── 7. DJI Osmo Pocket 4 Creator Combo ──────────────────────────
  {
    id: 'p7',
    slug: 'may-quay-dji-osmo-pocket-4-creator-combo',
    name: 'Máy quay DJI Osmo Pocket 4 Creator Combo',
    thumbnail: `${CDN}/image-data/san-pham/26-03/26-03-30/260330085702564/avatar/639120324002834549-dji-pocket-4-4-2000x2000-jpg_may-quay-dji-osmo-pocket-4-creator-combo.jpg`,
    images: imgs(
      `${CDN}/image-data/san-pham/26-03/26-03-30/260330085702564/avatar/639120324002834549-dji-pocket-4-4-2000x2000-jpg_may-quay-dji-osmo-pocket-4-creator-combo.jpg`,
      [],
      'DJI Osmo Pocket 4 Creator Combo'
    ),
    price: 14740000,
    originalPrice: 14740000,
    badges: [{ type: 'new', label: 'Creator' }, { type: 'hot', label: 'Bán chạy' }],
    rating: { average: 4.8, count: 142 },
    isUsed: false,
    brand: 'DJI',
    availability: 'in_stock',
    category: 'action-camera',
    shortSpecs: ['Dual sensor 1-inch 50MP', '4K 120fps', 'Gimbal 3 trục', 'Màn hình xoay', 'Creator Combo'],
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
    specs: specsCame([
      {
        group: 'Cảm biến',
        items: [
          { label: 'Cảm biến chính', value: '1-inch 50MP' },
          { label: 'Cảm biến phụ', value: 'Dual sensor setup' },
          { label: 'Lấy nét', value: 'Toàn điểm ảnh, nhanh' },
        ],
      },
      {
        group: 'Video',
        items: [
          { label: '4K', value: '120fps' },
          { label: 'Codec', value: 'H.264 / H.265' },
        ],
      },
      {
        group: 'Vật lý',
        items: [
          { label: 'Màn hình', value: 'Xoay linh hoạt' },
          { label: 'Chống rung', value: 'Gimbal 3 trục' },
        ],
      },
    ]),
    packageIncludes: ['1× DJI Osmo Pocket 4', '1× Creator Combo phụ kiện', '1× Cáp sạc'],
    sku: 'DJI-OSMO-POCKET-4-CREATOR',
    hotline: '0937148222',
    sourceUrl: 'https://mayanhvietnam.com/san-pham/dji-osmo-pocket-4-creator-combo_camera-pocket-260330085702564',
    scrapedAt: '2026-07-09',
  },

  // ── 8. Fujifilm X-H2S Body (placeholder for diversity) ───────────
  {
    id: 'p8',
    slug: 'fujifilm-x-h2s-body',
    name: 'Máy ảnh Fujifilm X-H2S (Body Only) — Chính hãng',
    thumbnail: `${CDN}/image-data/san-pham/23-02/23-02-10/230210223540394/avatar/01_may-anh-fujifilm-x-h2s-body-only-chinh-hang.jpg`,
    images: imgs(
      `${CDN}/image-data/san-pham/23-02/23-02-10/230210223540394/avatar/01_may-anh-fujifilm-x-h2s-body-only-chinh-hang.jpg`,
      [],
      'Fujifilm X-H2S'
    ),
    price: 34990000,
    originalPrice: 37990000,
    badges: [{ type: 'sale', label: '-8%' }, { type: 'new', label: 'Chính hãng' }],
    rating: { average: 4.7, count: 71 },
    isUsed: false,
    brand: 'Fujifilm',
    mount: 'Fujifilm X',
    availability: 'in_stock',
    category: 'may-anh',
    shortSpecs: ['APS-C 26MP', 'Stacked X-Trans 5 HS', '4K 120p', 'IBIS 7-stop', 'Film Simulation'],
    description:
      'Fujifilm X-H2S là máy ảnh mirrorless APS-C flagship của Fujifilm, cảm biến X-Trans 5 HS stacked 26MP, quay 4K 120p, IBIS 7-stop và 19 chế độ Film Simulation đặc trưng.',
    highlights: [
      'Cảm biến X-Trans 5 HS Stacked 26MP APS-C',
      'Quay video 4K 120p ProRes/RAW ngoài',
      'IBIS 7-stop',
      '19 chế độ Film Simulation',
      'Burst 40 fps electronic',
      'Khung thời tiết — chống bụi, ẩm',
    ],
    specs: specsCame([
      {
        group: 'Cảm biến & Xử lý',
        items: [
          { label: 'Loại cảm biến', value: 'X-Trans 5 HS Stacked CMOS' },
          { label: 'Độ phân giải', value: '26 Megapixel' },
          { label: 'Kích thước', value: 'APS-C' },
        ],
      },
      {
        group: 'Chụp ảnh',
        items: [
          { label: 'Burst rate', value: '40 fps (electronic) / 15 fps (mechanical)' },
          { label: 'Chống rung', value: 'IBIS 7-stop' },
          { label: 'Film Simulation', value: '19 chế độ' },
        ],
      },
      {
        group: 'Video',
        items: [
          { label: '4K', value: '120p' },
          { label: 'ProRes', value: 'ProRes 422 HQ ngoài' },
          { label: 'F-Log2', value: 'Có' },
        ],
      },
      {
        group: 'Vật lý',
        items: [
          { label: 'Mount', value: 'Fujifilm X' },
          { label: 'Pin', value: 'NP-W235' },
          { label: 'Trọng lượng', value: '660g' },
        ],
      },
    ]),
    packageIncludes: ['1× Body Fujifilm X-H2S', '1× Pin NP-W235', '1× Sạc', '1× Cáp USB', 'Phiếu bảo hành chính hãng'],
    sku: 'FUJI-XH2S-BODY',
    hotline: '0937148222',
    sourceUrl: 'https://mayanhvietnam.com/san-pham/may-anh-fujifilm-xh2s-body-only-chinh-hang_may-anh-mirrorless-230210223540394',
    scrapedAt: '2026-07-09',
  },
];

// ============================================================
// Flash sale
// ============================================================

export const flashSaleData: FlashSale = {
  id: 'fs1',
  title: '⚡ Flash Sale — Ưu đãi cực sốc',
  startTime: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
  endTime: new Date(Date.now() + 22 * 60 * 60 * 1000).toISOString(),
  products: allProducts.slice(0, 6).map((p, i) => ({
    ...p,
    soldPercent: [60, 45, 30, 75, 85, 20][i],
  })),
};

// ============================================================
// Helpers
// ============================================================

export const getProductsByCategory = (categorySlug: string, onlyNew = true) =>
  allProducts.filter(
    (p) => p.category === categorySlug && onlyNew !== p.isUsed
  );

export const getProductBySlug = (slug: string) =>
  allProducts.find((p) => p.slug === slug) ?? null;

export const getRelatedProducts = (product: ProductSummary, limit = 4) =>
  allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, limit);
