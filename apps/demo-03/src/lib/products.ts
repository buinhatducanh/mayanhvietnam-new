export type CameraColor = {
  name: string
  hex: string
}

export type Highlight = {
  label: string
  score: number // 0-100
}

export type Product = {
  id: string
  brand: string
  name: string
  sku: string
  price: number
  originalPrice: number
  discountPercent: number
  rating: number
  reviewCount: number
  soldCount: number
  colors: CameraColor[]
  highlights: Highlight[]
  specs: { label: string; value: string }[]
  lensSpec: string
  screenSpec: string
  image?: string // Primary product image URL from mayanhvietnam.com
}

const CDN = 'https://mayanhvietnam.com'

export const products: Product[] = [
  // ── 1. Canon EOS R6 Mark II (Body) ────────────────────────────
  {
    id: 'canon-eos-r6-mark-ii',
    brand: 'Canon',
    name: 'Canon EOS R6 Mark II',
    sku: 'EOS-R6M2-BODY',
    price: 40_500_000,
    originalPrice: 40_500_000,
    discountPercent: 0,
    rating: 4.9,
    reviewCount: 312,
    soldCount: 1247,
    colors: [{ name: 'Đen', hex: '#1c1c1c' }],
    highlights: [
      { label: 'Full-frame CMOS 24.2MP + DIGIC X', score: 96 },
      { label: 'Burst 40fps electronic / 12fps mechanical', score: 93 },
      { label: 'IBIS 5 trục — 8 stops chống rung', score: 95 },
    ],
    specs: [
      { label: 'Cảm biến', value: 'Full-frame 24.2MP CMOS' },
      { label: 'Bộ xử lý', value: 'DIGIC X' },
      { label: 'ISO', value: '100 – 102400 (mở rộng 50 – 204800)' },
      { label: 'Tốc độ chụp', value: '12fps (màn trập cơ) / 40fps (electronic)' },
      { label: 'Quay video', value: '4K UHD 60fps, Full HD 180fps' },
      { label: 'Lấy nét', value: 'Dual Pixel CMOS AF II — 1053 vùng' },
      { label: 'Chống rung', value: 'IBIS 5 trục — 8 stops' },
      { label: 'Thẻ nhớ', value: '2× SD UHS-II' },
      { label: 'Trọng lượng', value: '588g (body)' },
    ],
    lensSpec: 'Full-frame CMOS 24.2MP, DIGIC X, AF II 1053 vùng lấy nét',
    screenSpec: 'LCD 3.0" cảm ứng 1.62MP + EVF OLED 0.5" 3.69MP',
    image: `${CDN}/image-data/san-pham/23-02/23-02-10/230210223748534/avatar/01_may-anh-canon-eos-r6-mark-ii-chinh-hang.jpg`,
  },

  // ── 2. Sony A7 IV (Body) ───────────────────────────────────────
  {
    id: 'sony-a7-iv',
    brand: 'Sony',
    name: 'Sony A7 IV Body',
    sku: 'ILCE-7M4-BODY',
    price: 47_500_000,
    originalPrice: 47_500_000,
    discountPercent: 0,
    rating: 4.9,
    reviewCount: 187,
    soldCount: 890,
    colors: [
      { name: 'Đen', hex: '#1c1c1c' },
      { name: 'Bạc', hex: '#c0c0c0' },
    ],
    highlights: [
      { label: 'Full-frame BSI Exmor R 33.0MP', score: 97 },
      { label: 'AI AF 759 điểm + Eye-tracking', score: 95 },
      { label: '4K 60p 10-bit 4:2:2 S-Cinetone', score: 92 },
    ],
    specs: [
      { label: 'Cảm biến', value: 'BSI Exmor R CMOS 33.0MP Full-frame' },
      { label: 'Bộ xử lý', value: 'BIONZ XR' },
      { label: 'ISO', value: '100 – 51200 (mở rộng 50 – 204800)' },
      { label: 'Tốc độ chụp', value: '10fps (828 ảnh RAW, JPEG unlimited)' },
      { label: 'Quay video', value: '4K UHD 60fps 10-bit 4:2:2' },
      { label: 'Lấy nét', value: 'Fast Hybrid AF — 759 phase + 425 contrast' },
      { label: 'Chống rung', value: 'IBIS 5 trục — 5.5 stops' },
      { label: 'Thẻ nhớ', value: 'CFexpress Type A + SD UHS-II' },
      { label: 'Trọng lượng', value: '658g (body + pin)' },
    ],
    lensSpec: 'BSI Exmor R 33.0MP Full-frame, ngàm Sony E, AI AF 759 điểm',
    screenSpec: 'LCD 3.0" cảm ứng lật đa góc 1.036K + EVF OLED 3.68M',
    image: `${CDN}/image-data/san-pham/23-02/23-02-10/230210223540859/avatar/01_may-anh-sony-alpha-a7-mark-iv-body-only-chinh-hang.jpg`,
  },

  // ── 3. Sony A7R V (Body) ──────────────────────────────────────
  {
    id: 'sony-a7r-v',
    brand: 'Sony',
    name: 'Sony A7R V Body',
    sku: 'ILCE-7RM5-BODY',
    price: 62_990_000,
    originalPrice: 66_990_000,
    discountPercent: 6,
    rating: 4.9,
    reviewCount: 48,
    soldCount: 312,
    colors: [{ name: 'Đen', hex: '#1c1c1c' }],
    highlights: [
      { label: 'Full-frame BSI Exmor R 61.0MP', score: 99 },
      { label: 'AI AF — nhận diện 8 loại chủ thể', score: 97 },
      { label: '8K 24p / 4K 120fps', score: 91 },
    ],
    specs: [
      { label: 'Cảm biến', value: 'BSI Exmor R CMOS 61.0MP Full-frame' },
      { label: 'Bộ xử lý', value: 'BIONZ XR + AI Processing Unit' },
      { label: 'ISO', value: '100 – 32000 (mở rộng 50 – 102400)' },
      { label: 'Tốc độ chụp', value: '10fps' },
      { label: 'Quay video', value: '8K 24fps / 4K 120fps 10-bit' },
      { label: 'Lấy nét', value: 'AI AF — 693 phase-detect + Eye AF 8 loại' },
      { label: 'Chống rung', value: 'IBIS 8 stops' },
      { label: 'Thẻ nhớ', value: 'CFexpress Type A + SD UHS-II' },
      { label: 'Trọng lượng', value: '723g (body + pin)' },
    ],
    lensSpec: 'BSI Exmor R 61.0MP, AI AF nhận diện 8 chủ thể, 693 điểm phase',
    screenSpec: 'LCD 4-axis multi-angle 3.2" 2.1M + EVF OLED 9.44M',
    image: `${CDN}/image-data/san-pham/24-08/24-08-02/240802084419498/avatar/638692697759009422_may-anh-sony-alpha-a7r-mark-v-chinh-hang.jpg`,
  },

  // ── 4. Sony ZV-E10 II (Black) ──────────────────────────────────
  {
    id: 'sony-zv-e10-ii',
    brand: 'Sony',
    name: 'Sony ZV-E10 II',
    sku: 'ZV-E10-II-BLACK-BODY',
    price: 26_000_000,
    originalPrice: 26_000_000,
    discountPercent: 0,
    rating: 4.8,
    reviewCount: 96,
    soldCount: 534,
    colors: [
      { name: 'Đen', hex: '#1c1c1c' },
      { name: 'Trắng', hex: '#f0ede8' },
    ],
    highlights: [
      { label: 'APS-C Exmor R 26MP + BIONZ XR', score: 89 },
      { label: 'Real-time Eye AF + 4K 30fps', score: 87 },
      { label: 'Micro 3 capsule định hướng', score: 85 },
    ],
    specs: [
      { label: 'Cảm biến', value: 'APS-C Exmor R 26MP' },
      { label: 'Bộ xử lý', value: 'BIONZ XR' },
      { label: 'ISO', value: '100 – 32000 (mở rộng 50 – 102400)' },
      { label: 'Tốc độ chụp', value: '11fps' },
      { label: 'Quay video', value: '4K 30fps / FHD 120fps' },
      { label: 'Lấy nét', value: 'Fast Hybrid AF 425 điểm + Eye AF' },
      { label: 'Micro', value: '3 capsule định hướng + windscreen' },
      { label: 'Trọng lượng', value: '343g (chỉ body)' },
    ],
    lensSpec: 'APS-C Exmor R 26MP, ngàm Sony E, AF 425 điểm + Eye AF',
    screenSpec: 'LCD 3.0" cảm ứng xoay lật đa góc — không EVF',
    image: `${CDN}/image-data/san-pham/24-08/24-08-26/240826174229493/avatar/638708944659930440_may-anh-sony-zv-e10-ii-black-body-only-chinh-hang.jpg`,
  },

  // ── 5. Canon EOS R50 + RF-S 18-45mm ────────────────────────────
  {
    id: 'canon-eos-r50',
    brand: 'Canon',
    name: 'Canon EOS R50 Black + RF-S 18-45mm',
    sku: 'EOS-R50-KIT-1845',
    price: 17_500_000,
    originalPrice: 19_900_000,
    discountPercent: 12,
    rating: 4.8,
    reviewCount: 128,
    soldCount: 1247,
    colors: [
      { name: 'Đen', hex: '#1c1c1c' },
      { name: 'Trắng', hex: '#f0ede8' },
    ],
    highlights: [
      { label: 'APS-C CMOS 24.2MP + DIGIC X', score: 88 },
      { label: 'Dual Pixel CMOS AF II', score: 90 },
      { label: '4K 30fps không crop — 375g nhẹ nhất dòng R', score: 92 },
    ],
    specs: [
      { label: 'Cảm biến', value: 'APS-C CMOS 24.2MP' },
      { label: 'Bộ xử lý', value: 'DIGIC X' },
      { label: 'ISO', value: '100 – 32000 (mở rộng 51200)' },
      { label: 'Tốc độ chụp', value: '15fps (electronic)' },
      { label: 'Quay video', value: '4K 30fps không crop' },
      { label: 'Lấy nét', value: 'Dual Pixel CMOS AF II — Eye/Animal AF' },
      { label: 'Trọng lượng', value: '375g (chỉ body)' },
      { label: 'Ống kính kèm', value: 'RF-S 18-45mm f/4.5-6.3 IS STM' },
    ],
    lensSpec: 'APS-C 24.2MP CMOS, DIGIC X, Dual Pixel AF II, ngàm RF',
    screenSpec: 'LCD 3.0" Vari-angle cảm ứng 1.62MP',
    image: `${CDN}/image-data/san-pham/24-12/24-12-28/241228112737843/avatar/638709822567106100_may-anh-canon-eos-r50-black-kem-lens-rf-s-18-45mm-chinh-hang.jpg`,
  },

  // ── 6. Nikon Z6 III + 24-70mm f/4 ──────────────────────────────
  {
    id: 'nikon-z6-iii',
    brand: 'Nikon',
    name: 'Nikon Z6 III + Z 24-70mm f/4 S',
    sku: 'NIK-Z6M3-KIT-2470',
    price: 58_900_000,
    originalPrice: 58_900_000,
    discountPercent: 0,
    rating: 4.8,
    reviewCount: 32,
    soldCount: 245,
    colors: [{ name: 'Đen', hex: '#1c1c1c' }],
    highlights: [
      { label: 'Full-frame Stacked CMOS 24.5MP — Expeed 7', score: 94 },
      { label: '4K 120fps / 6K RAW external', score: 91 },
      { label: 'Bird / Animal / Vehicle Eye AF', score: 89 },
    ],
    specs: [
      { label: 'Cảm biến', value: 'Full-frame Stacked CMOS 24.5MP' },
      { label: 'Bộ xử lý', value: 'Expeed 7' },
      { label: 'ISO', value: '100 – 64000 (mở rộng 50 – 102400)' },
      { label: 'Tốc độ chụp', value: '20fps (electronic)' },
      { label: 'Quay video', value: '4K 120fps / 6K RAW (external)' },
      { label: 'Lấy nét', value: 'Hybrid AF 299 điểm — Bird/Animal/Vehicle' },
      { label: 'Chống rung', value: 'IBIS 8 stops' },
      { label: 'Thẻ nhớ', value: 'CFexpress Type B + microSD' },
      { label: 'Trọng lượng', value: '760g (body + pin)' },
    ],
    lensSpec: 'Full-frame Stacked CMOS 24.5MP, Expeed 7, Hybrid AF 299 điểm',
    screenSpec: 'LCD 4-axis multi-angle 3.2" + EVF OLED 5.76M',
    image: `${CDN}/image-data/san-pham/25-05/25-05-20/250520145943720/avatar/638833501469480006_nikon-z6-mark-iii-kem-lens-z-24-70-mm-f-4-s-chinh-hang-vic.jpg`,
  },

  // ── 7. DJI Mavic 4 Pro 512GB Creator Combo ──────────────────────
  {
    id: 'dji-mavic-4-pro',
    brand: 'DJI',
    name: 'DJI Mavic 4 Pro 512GB Creator Combo',
    sku: 'DJI-MAVIC4-512G-CREATOR',
    price: 85_000_000,
    originalPrice: 85_000_000,
    discountPercent: 0,
    rating: 4.9,
    reviewCount: 142,
    soldCount: 198,
    colors: [{ name: 'Đen', hex: '#1c1c1c' }],
    highlights: [
      { label: 'Hasselblad 100MP 4/3" — 6K HDR 60fps', score: 98 },
      { label: 'LiDAR APAS 5.0 — tránh vật cản 360°', score: 96 },
      { label: 'O4+ truyền sóng 15km — bay 35-40 phút', score: 94 },
    ],
    specs: [
      { label: 'Cụm camera', value: 'Hasselblad 100MP CMOS 4/3" + 2× Tele' },
      { label: 'Video', value: '6K HDR 60fps (chính) + 4K 60fps (tele)' },
      { label: 'Truyền sóng', value: 'O4+ — 15km (FCC)' },
      { label: 'Bay', value: '35 – 40 phút' },
      { label: 'Tránh vật cản', value: 'APAS 5.0 + LiDAR đa hướng' },
      { label: 'Gimbal', value: '3 trục — xoay 360°' },
      { label: 'Bộ nhớ', value: '512GB tích hợp' },
      { label: 'Combo', value: 'RC Pro 2 + 3 pin + hub sạc + túi' },
    ],
    lensSpec: 'Hasselblad 100MP CMOS 4/3", gimbal xoay 360°, LiDAR',
    screenSpec: 'DJI RC Pro 2 — màn hình 5.5" 1080p tích hợp',
    image: `${CDN}/image-data/san-pham/25-05/25-05-15/250515085035248/avatar/638828964891489787_dji-mavic-4-pro-512gb-creator-combo.jpg`,
  },

  // ── 8. DJI Mini 5 Pro Base ──────────────────────────────────────
  {
    id: 'dji-mini-5-pro',
    brand: 'DJI',
    name: 'DJI Mini 5 Pro Base',
    sku: 'DJI-MINI5PRO-BASE',
    price: 13_990_000,
    originalPrice: 13_990_000,
    discountPercent: 0,
    rating: 4.8,
    reviewCount: 72,
    soldCount: 456,
    colors: [{ name: 'Trắng', hex: '#f0ede8' }, { name: 'Đen', hex: '#1c1c1c' }],
    highlights: [
      { label: 'Cảm biến 1/1.3" CMOS — 4K/60fps HDR', score: 90 },
      { label: 'APAS omnidirectional — 360° obstacle sensing', score: 88 },
      { label: '249g — không cần đăng ký tại VN', score: 95 },
    ],
    specs: [
      { label: 'Cảm biến', value: '1/1.3" CMOS — 48MP' },
      { label: 'Video', value: '4K 60fps HDR' },
      { label: 'Bay', value: '34 phút' },
      { label: 'Tránh vật cản', value: 'Omnidirectional sensing' },
      { label: 'Trọng lượng', value: '249g' },
      { label: 'Truyền sóng', value: 'O4 — 20km (FCC)' },
    ],
    lensSpec: '1/1.3" CMOS 48MP, f/1.7, 82° FOV',
    screenSpec: 'Remote: RC-N2 hoặc RC 2 (mua riêng)',
    image: `${CDN}/image-data/san-pham/25-09/25-09-12/250912094317313/avatar/638932671190111464_dji-mini-5-pro-base-chinh-hang.jpg`,
  },

  // ── 9. GoPro Hero 13 Black ──────────────────────────────────────
  {
    id: 'gopro-hero-13',
    brand: 'GoPro',
    name: 'GoPro Hero 13 Black',
    sku: 'GOPRO-HERO13-BLACK',
    price: 9_690_000,
    originalPrice: 9_690_000,
    discountPercent: 0,
    rating: 4.7,
    reviewCount: 218,
    soldCount: 876,
    colors: [{ name: 'Đen', hex: '#1c1c1c' }],
    highlights: [
      { label: '5.3K 60fps — 27MP photo', score: 88 },
      { label: 'HyperSmooth 6.0 + Horizon Lock 360°', score: 91 },
      { label: 'Chống nước 10m — Pin Enduro 1900mAh', score: 86 },
    ],
    specs: [
      { label: 'Cảm biến', value: 'CMOS 1/1.9" — 27MP' },
      { label: 'Video 5.3K', value: '60fps' },
      { label: 'Video 4K', value: '120fps' },
      { label: 'Slow-motion', value: '2.7K 240fps / 8x@1080p' },
      { label: 'Chống rung', value: 'HyperSmooth 6.0 + Horizon Lock 4.0' },
      { label: 'Màn hình', value: '2.27" cảm ứng + 1.4" trước' },
      { label: 'Kết nối', value: 'Wi-Fi 6 + Bluetooth 5.0 + USB-C' },
      { label: 'Chống nước', value: '10m không cần vỏ' },
      { label: 'Trọng lượng', value: '154g' },
    ],
    lensSpec: 'CMOS 1/1.9" 27MP, FOV 155° (Ultra Wide Mod), HyperSmooth 6.0',
    screenSpec: '2.27" LCD cảm ứng + 1.4" LCD phía trước',
    image: `${CDN}/image-data/san-pham/25-01/25-01-02/250102113303811/avatar/638714152413009638_gopro-hero-13-black.jpg`,
  },

  // ── 10. DJI Osmo Pocket 4 Creator Combo ─────────────────────────
  {
    id: 'dji-osmo-pocket-4',
    brand: 'DJI',
    name: 'DJI Osmo Pocket 4 Creator Combo',
    sku: 'DJI-OSMO-POCKET4-CREATOR',
    price: 14_740_000,
    originalPrice: 14_740_000,
    discountPercent: 0,
    rating: 4.8,
    reviewCount: 142,
    soldCount: 398,
    colors: [{ name: 'Đen', hex: '#1c1c1c' }],
    highlights: [
      { label: 'Dual sensor — sensor chính 1-inch 50MP', score: 92 },
      { label: '4K 120fps — gimbal 3 trục vật lý', score: 94 },
      { label: 'Màn hình xoay — Creator Combo đầy đủ', score: 89 },
    ],
    specs: [
      { label: 'Cảm biến', value: 'Dual — 1-inch 50MP + phụ' },
      { label: 'Quay video', value: '4K 120fps' },
      { label: 'Chống rung', value: 'Gimbal 3 trục vật lý' },
      { label: 'Màn hình', value: 'OLED xoay linh hoạt' },
      { label: 'Lấy nét', value: 'Toàn điểm ảnh — nhanh' },
      { label: 'Combo', value: 'DJI Mic 2 + Gimbal Cover + tripod' },
      { label: 'Trọng lượng', value: '179g' },
    ],
    lensSpec: 'Dual sensor 1-inch 50MP + secondary, gimbal 3 trục',
    screenSpec: 'OLED cảm ứng xoay — giao diện responsive',
    image: `${CDN}/image-data/san-pham/26-03/26-03-30/260330085702564/avatar/639120324002834549-dji-pocket-4-4-2000x2000-jpg_may-quay-dji-osmo-pocket-4-creator-combo.jpg`,
  },

  // ── 11. Fujifilm X-H2S Body ─────────────────────────────────────
  {
    id: 'fujifilm-x-h2s',
    brand: 'Fujifilm',
    name: 'Fujifilm X-H2S Body',
    sku: 'FUJI-XH2S-BODY',
    price: 34_990_000,
    originalPrice: 37_990_000,
    discountPercent: 8,
    rating: 4.7,
    reviewCount: 71,
    soldCount: 342,
    colors: [
      { name: 'Đen', hex: '#1c1c1c' },
      { name: 'Bạc', hex: '#d4d4d4' },
    ],
    highlights: [
      { label: 'X-Trans 5 HS Stacked 26MP APS-C', score: 91 },
      { label: '4K 120p — 19 Film Simulation', score: 88 },
      { label: 'Burst 40fps — IBIS 7-stop', score: 90 },
    ],
    specs: [
      { label: 'Cảm biến', value: 'X-Trans 5 HS Stacked CMOS 26MP' },
      { label: 'Bộ xử lý', value: 'X-Processor 5' },
      { label: 'Tốc độ chụp', value: '40fps (electronic) / 15fps (mechanical)' },
      { label: 'Quay video', value: '4K 120fps — ProRes 422 HQ ngoài' },
      { label: 'Chống rung', value: 'IBIS 7-stop' },
      { label: 'Film Simulation', value: '19 chế độ' },
      { label: 'Thẻ nhớ', value: 'CFexpress Type B + SD UHS-II' },
      { label: 'Trọng lượng', value: '660g' },
    ],
    lensSpec: 'X-Trans 5 HS Stacked 26MP APS-C, ngàm Fujifilm X, X-Processor 5',
    screenSpec: 'LCD 3.0" cảm ứng lật 3 hướng 1.84M điểm',
    image: `${CDN}/image-data/san-pham/23-02/23-02-10/230210223540394/avatar/01_may-anh-fujifilm-x-h2s-body-only-chinh-hang.jpg`,
  },

  // ── 12. Canon RF 24-70mm f/2.8L IS USM ──────────────────────────
  {
    id: 'canon-rf-2470-f28',
    brand: 'Canon',
    name: 'Canon RF 24-70mm f/2.8L IS USM',
    sku: 'RF-2470-28L-IS-USM',
    price: 48_900_000,
    originalPrice: 48_900_000,
    discountPercent: 0,
    rating: 4.9,
    reviewCount: 94,
    soldCount: 312,
    colors: [{ name: 'Đen', hex: '#1c1c1c' }],
    highlights: [
      { label: 'f/2.8 không đổi — L-series cao cấp', score: 98 },
      { label: 'IS 5 stops — Nano USM lấy nét nhanh', score: 95 },
      { label: 'Chống bụi/ẩm — filter 82mm', score: 92 },
    ],
    specs: [
      { label: 'Mount', value: 'Canon RF (Full-frame)' },
      { label: 'Focal length', value: '24 – 70mm' },
      { label: 'Khẩu tối đa', value: 'f/2.8' },
      { label: 'IS', value: 'Có — 5 stops' },
      { label: 'Cấu tạo', value: '21 thấu kính / 15 nhóm — 9 lá khẩu bokeh' },
      { label: 'Motor', value: 'Nano USM' },
      { label: 'Khoảng cách lấy nét', value: '0.21 – 0.38m' },
      { label: 'Trọng lượng', value: '900g' },
    ],
    lensSpec: '24-70mm f/2.8 L-series, IS 5 stops, Nano USM, 21 thấu kính',
    screenSpec: 'Không có — ống kính',
    image: `${CDN}/image-data/san-pham/23-02/23-02-10/230210234357844/avatar/01_ong-kinh-canon-rf-24-70mm-f-2-8l-is-usm-chinh-hang.jpg`,
  },

  // ── 13. Sony FE 70-200mm f/2.8 GM II OSS ────────────────────────
  {
    id: 'sony-fe-70200-gm2',
    brand: 'Sony',
    name: 'Sony FE 70-200mm f/2.8 GM II OSS',
    sku: 'SEL70200GM2',
    price: 62_900_000,
    originalPrice: 62_900_000,
    discountPercent: 0,
    rating: 5.0,
    reviewCount: 28,
    soldCount: 178,
    colors: [{ name: 'Đen', hex: '#1c1c1c' }],
    highlights: [
      { label: 'f/2.8 không đổi — GM II thế hệ mới', score: 99 },
      { label: 'XA Element + Nano AR CS II — bokeh mượt', score: 97 },
      { label: 'Nhẹ nhất dòng GM — 1045g', score: 93 },
    ],
    specs: [
      { label: 'Mount', value: 'Sony E (Full-frame)' },
      { label: 'Focal length', value: '70 – 200mm' },
      { label: 'Khẩu tối đa', value: 'f/2.8' },
      { label: 'IS', value: 'OSS — 5.5 stops' },
      { label: 'Motor', value: 'XD Linear (4 motor)' },
      { label: 'Khoảng cách lấy nét', value: '0.4m (wide) — 0.82m (tele)' },
      { label: 'Filter', value: '77mm' },
      { label: 'Trọng lượng', value: '1045g' },
    ],
    lensSpec: '70-200mm f/2.8 GM II, XD Linear 4 motor, OSS 5.5 stops',
    screenSpec: 'Không có — ống kính',
    image: `${CDN}/image-data/san-pham/24-08/24-08-03/240803094242227/avatar/638692469929544019_ong-kinh-sony-fe-70-200mm-f2-8-gm-ii-oss.jpg`,
  },

  // ── 14. Canon RF 50mm f/1.8 STM ──────────────────────────────────
  {
    id: 'canon-rf-50-f18',
    brand: 'Canon',
    name: 'Canon RF 50mm f/1.8 STM',
    sku: 'RF50F18STM',
    price: 5_990_000,
    originalPrice: 5_990_000,
    discountPercent: 0,
    rating: 4.8,
    reviewCount: 185,
    soldCount: 2134,
    colors: [{ name: 'Đen', hex: '#1c1c1c' }],
    highlights: [
      { label: 'f/1.8 — portrait đẹp, giá cực mềm', score: 94 },
      { label: 'STM motor — lấy nét êm, không rung', score: 87 },
      { label: '160g — nhỏ gọn nhất dòng RF', score: 96 },
    ],
    specs: [
      { label: 'Mount', value: 'Canon RF (APS-C / Full-frame)' },
      { label: 'Focal length', value: '50mm' },
      { label: 'Khẩu tối đa', value: 'f/1.8' },
      { label: 'Cấu tạo', value: '7 thấu kính / 6 nhóm — 7 lá khẩu bokeh' },
      { label: 'Motor', value: 'STM — stepping motor' },
      { label: 'Khoảng cách lấy nét', value: '0.30m' },
      { label: 'Filter', value: '43mm' },
      { label: 'Trọng lượng', value: '160g' },
    ],
    lensSpec: '50mm f/1.8 STM, 7 lá khẩu bokeh, filter 43mm',
    screenSpec: 'Không có — ống kính',
    image: `${CDN}/image-data/san-pham/24-08/24-08-03/240803094047373/avatar/638847186653427391_canon-rf-50mm-f1-8-stm-chinh-hang.jpg`,
  },

  // ── 15. Nikon Z50 II Body ────────────────────────────────────────
  {
    id: 'nikon-z50-ii',
    brand: 'Nikon',
    name: 'Nikon Z50 II Body',
    sku: 'NIK-Z50II-BODY',
    price: 24_900_000,
    originalPrice: 24_900_000,
    discountPercent: 0,
    rating: 4.7,
    reviewCount: 42,
    soldCount: 287,
    colors: [{ name: 'Đen', hex: '#1c1c1c' }],
    highlights: [
      { label: 'APS-C CMOS 20.9MP — EXPEED 7', score: 86 },
      { label: '4K 30fps + 1080p 120fps slow-motion', score: 84 },
      { label: 'Eye AF + Bird/Eye detection', score: 82 },
    ],
    specs: [
      { label: 'Cảm biến', value: 'APS-C CMOS 20.9MP' },
      { label: 'Bộ xử lý', value: 'EXPEED 7' },
      { label: 'ISO', value: '100 – 51200 (mở rộng 100 – 102400)' },
      { label: 'Tốc độ chụp', value: '11fps (mechanical) / 20fps (electronic)' },
      { label: 'Quay video', value: '4K UHD 30fps / FHD 120fps' },
      { label: 'Lấy nét', value: 'Hybrid AF 209 điểm + Eye/Bird AF' },
      { label: 'Màn hình', value: 'LCD 3.2" cảm ứng lật' },
      { label: 'Trọng lượng', value: '397g (body + pin)' },
    ],
    lensSpec: 'APS-C 20.9MP CMOS, EXPEED 7, Hybrid AF 209 điểm, ngàm Nikon Z',
    screenSpec: 'LCD 3.2" cảm ứng lật — không EVF',
    image: `${CDN}/image-data/san-pham/25-02/25-02-06/250206095656295/avatar/638745179216782096_may-anh-nikon-z50-ii-body.jpg`,
  },
]

export function formatVND(value: number): string {
  return value.toLocaleString('vi-VN') + 'đ'
}
