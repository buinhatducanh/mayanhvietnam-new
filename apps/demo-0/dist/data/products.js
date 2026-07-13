// data/products.js — Máy Ảnh Việt Nam · shared data module (derived from packages/mock-data)
const CDN = 'https://mayanhvietnam.com';

export const formatVND = (n) => `${n.toLocaleString('vi-VN')}đ`;
export const discountOf = (p) =>
  p.originalPrice && p.originalPrice > p.price
    ? Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100)
    : 0;

export const categories = [
  { id: '1', name: 'Máy ảnh Body', slug: 'may-anh', icon: '📷', image: `${CDN}/asset/imgs/img/danhMuc_MayAnh.webp`, productCount: 156, description: 'Máy ảnh mirrorless, DSLR chính hãng từ Canon, Sony, Nikon, Fujifilm' },
  { id: '2', name: 'Ống kính Lens', slug: 'ong-kinh', icon: '🔭', image: `${CDN}/asset/imgs/img/danhMuc_ongkinh.webp`, productCount: 243, description: 'Ống kính cho mọi hệ máy: Canon RF, Sony E, Nikon Z, Fujifilm X' },
  { id: '3', name: 'Sản phẩm cũ', slug: 'san-pham-cu', icon: '♻️', image: `${CDN}/asset/imgs/img/danhMuc_spCu.webp`, productCount: 89, description: 'Máy ảnh & lens like-new, đã qua sử dụng còn bảo hành' },
  { id: '4', name: 'Lắp phông studio', slug: 'lap-phong-studio', icon: '🎬', image: `${CDN}/asset/imgs/img/danhMuc_setupPhong.webp`, productCount: 34, description: 'Dịch vụ lắp đặt phòng studio chuyên nghiệp' },
  { id: '5', name: 'Camera hành động', slug: 'action-camera', icon: '🏃', image: `${CDN}/asset/imgs/img/danhMuc_action.webp`, productCount: 67, description: 'Action camera GoPro, DJI Osmo, Insta360' },
  { id: '6', name: 'Flycam — Drone', slug: 'flycam', icon: '🚁', image: `${CDN}/asset/imgs/img/danhMuc_flycam.webp`, productCount: 45, description: 'Flycam DJI Mini, Air, Mavic — chính hãng, bảo hành 12 tháng' },
  { id: '7', name: 'Thiết bị studio', slug: 'thiet-bi-studio', icon: '💡', image: `${CDN}/asset/imgs/img/danhMuc_thietBiStudio.webp`, productCount: 112, description: 'Đèn LED, softbox, micro, phụ kiện studio' },
  { id: '8', name: 'Phụ kiện', slug: 'phu-kien', icon: '🎒', image: `${CDN}/asset/imgs/img/danhMuc_phuKien.webp`, productCount: 320, description: 'Filter, hood, bag, tripod, gimbal, pin, sạc' },
  { id: '9', name: 'Máy quay phim', slug: 'may-quay-phim', icon: '📹', image: `${CDN}/asset/imgs/img/danhMuc_mayQuayPhim.webp`, productCount: 28, description: 'Cinema camera Sony FX, Canon C, Blackmagic' },
];

export const navCategories = categories.filter((c) => !['san-pham-cu', 'lap-phong-studio'].includes(c.slug)).slice(0, 5);

export const stores = [
  { id: 'st1', name: 'Máy Ảnh Việt Nam TP.HCM', address: 'Số 9, Nam Quốc Cang, Phường Bến Thành, TP Hồ Chí Minh', phone: '0937.148.222', hours: '09:00 – 19:00 mỗi ngày' },
  { id: 'st2', name: 'Máy Ảnh Việt Nam Cần Thơ', address: 'Số 58 Nguyễn Hiền, Khu Dân Cư 91B, Phường Tân An, TP. Cần Thơ', phone: '0937.148.222', hours: '08:00 – 20:00 mỗi ngày' },
  { id: 'st3', name: 'Máy Ảnh Việt Nam An Giang', address: 'Số 1, Đường số 1, Khu Tây sông Hậu, Phường Long Xuyên, Tỉnh An Giang', phone: '0937.148.222', hours: '08:00 – 17:30 mỗi ngày' },
  { id: 'st4', name: 'Máy Ảnh Việt Nam Đồng Tháp', address: 'Số 126, Hoàng Sa, Khu phố 4, Phường Thới Sơn, Tỉnh Đồng Tháp', phone: '0937.148.222', hours: '08:00 – 18:00 mỗi ngày' },
];

const P = (o) => ({ callForPrice: false, soldPercent: 0, specs: [], highlights: [], ...o });

export const products = [
  P({
    id: 'p1', slug: 'canon-eos-r6-mark-ii-body-only', name: 'Máy ảnh Canon EOS R6 Mark II (Body only)', brand: 'Canon', category: 'may-anh',
    thumbnail: `${CDN}/image-data/san-pham/23-02/23-02-10/230210223748534/avatar/01_may-anh-canon-eos-r6-mark-ii-chinh-hang.jpg`,
    price: 40500000, originalPrice: 40500000,
    badges: [{ type: 'hot', label: 'Bán chạy' }, { type: 'new', label: 'Mới 100%' }],
    rating: { average: 4.9, count: 312 }, soldPercent: 60,
    shortSpecs: ['Full-frame 24.2MP', 'DIGIC X', '4K 60fps', 'IBIS 5-Axis', 'Dual SD UHS-II'],
    description: 'Hiệu năng cao, tốc độ chụp nhanh — Dual Pixel CMOS AF II 1053 vùng, IBIS 5 trục 8 stops.',
  }),
  P({
    id: 'p1b', slug: 'canon-eos-r5-mark-ii-body', name: 'Máy ảnh Canon EOS R5 Mark II (Body) — Chính hãng', brand: 'Canon', category: 'may-anh',
    thumbnail: `${CDN}/image-data/san-pham/24-12/24-12-06/241206115709218/avatar/638691049140819873_may-anh-canon-eos-r5-mark-ii-chinh-hang.jpg`,
    price: 78900000, originalPrice: 78900000,
    badges: [{ type: 'new', label: 'Mới 100%' }],
    rating: { average: 4.9, count: 89 }, soldPercent: 45,
    shortSpecs: ['Full-frame 45MP', 'DIGIC X +Accelerator', '8K 60p RAW', 'IBIS 5 trục 8 stops'],
    description: 'Cảm biến 45MP Stacked, 8K 60p RAW, Eye Control AF — điều khiển AF bằng mắt.',
  }),
  P({
    id: 'p1c', slug: 'may-anh-canon-eos-r6-mark-iii-body', name: 'Máy ảnh Canon EOS R6 Mark III (Body) — Chính hãng', brand: 'Canon', category: 'may-anh',
    thumbnail: `${CDN}/image-data/san-pham/25-03/25-03-15/250315190440715/avatar/638776622915433167_may-anh-canon-eos-r6-iii-chinh-hang.jpg`,
    price: 60500000, originalPrice: 60500000,
    badges: [{ type: 'new', label: 'Mới' }],
    rating: { average: 4.9, count: 42 }, soldPercent: 30,
    shortSpecs: ['Full-frame 24.2MP', 'Stacked CMOS', '4K 120fps', 'IBIS 5 trục'],
    description: 'Stacked CMOS đọc nhanh, burst 40fps không blackout, 4K 120fps slow-mo.',
  }),
  P({
    id: 'p2', slug: 'may-anh-sony-alpha-a7-mark-iv-body-only-chinh-hang', name: 'Máy ảnh Sony Alpha A7 Mark IV (Body Only) — Chính hãng', brand: 'Sony', category: 'may-anh',
    thumbnail: `${CDN}/image-data/san-pham/23-02/23-02-10/230210223540859/avatar/01_may-anh-sony-alpha-a7-mark-iv-body-only-chinh-hang.jpg`,
    price: 47500000, originalPrice: 47500000,
    badges: [{ type: 'hot', label: 'Bán chạy' }, { type: 'new', label: 'Chính hãng' }],
    rating: { average: 4.9, count: 187 }, soldPercent: 75,
    shortSpecs: ['Full-frame 33MP', 'BIONZ XR', '4K 60p', 'IBIS 5-Axis', 'CFexpress Type A'],
    description: 'Cảm biến 33MP BSI Exmor R, BIONZ XR mạnh gấp 8 lần, Eye AF thời gian thực.',
  }),
  P({
    id: 'p3a', slug: 'canon-eos-r50-black-kem-lens-rfs-1845-chinh-hang', name: 'Máy ảnh Canon EOS R50 Black + Lens RF-S 18-45mm — Chính hãng', brand: 'Canon', category: 'may-anh',
    thumbnail: `${CDN}/image-data/san-pham/24-12/24-12-28/241228112737843/avatar/638709822567106100_may-anh-canon-eos-r50-black-kem-lens-rf-s-18-45mm-chinh-hang.jpg`,
    price: 17500000, originalPrice: 19900000,
    badges: [{ type: 'hot', label: 'Bán chạy' }, { type: 'sale', label: '-12%' }],
    rating: { average: 4.8, count: 128 }, soldPercent: 85,
    shortSpecs: ['APS-C 24.2MP', 'DIGIC X', '4K 30fps', 'Dual Pixel AF II', 'RF-S Mount'],
    description: 'Mirrorless APS-C nhỏ gọn nhất dòng EOS R — thân máy chỉ 375g, quay 4K 30fps không crop.',
    highlights: [
      'Cảm biến APS-C CMOS 24.2MP + DIGIC X',
      'Dual Pixel CMOS AF II — nhận diện mắt, động vật',
      '4K 30fps không crop — ảnh 15fps',
      'Body nhẹ 375g — nhỏ gọn nhất dòng EOS R',
      'LCD cảm ứng 3" Vari-angle selfie-friendly',
      'Wi-Fi + Bluetooth tích hợp — chia sẻ nhanh',
    ],
    gallery: [
      `${CDN}/image-data/san-pham/24-12/24-12-28/241228112737843/avatar/638709822567106100_may-anh-canon-eos-r50-black-kem-lens-rf-s-18-45mm-chinh-hang.jpg`,
      `${CDN}/image-data/san-pham/24-12/24-12-28/241228112737843/hinh-preview/638791169636370514.jpg`,
      `${CDN}/image-data/san-pham/24-12/24-12-28/241228112737843/hinh-preview/638791170527514307.jpg`,
      `${CDN}/image-data/san-pham/24-12/24-12-28/241228112737843/hinh-preview/638791171408544923.jpg`,
      `${CDN}/image-data/san-pham/24-12/24-12-28/241228112737843/hinh-preview/638791171877903330.jpg`,
      `${CDN}/image-data/san-pham/24-12/24-12-28/241228112737843/hinh-preview/638791172399984092.jpg`,
      `${CDN}/image-data/san-pham/24-12/24-12-28/241228112737843/hinh-preview/638791173356043506.jpg`,
    ],
    promotions: ['🎁 Tặng ngay thẻ nhớ 32Gb', '🛡️ Dán màn hình free trọn đời máy ảnh'],
    packageIncludes: ['1× Thân máy Canon EOS R50', '1× Lens RF-S 18-45mm f/4.5-6.3 IS STM', '1× Pin LP-E17', '1× Sạc LC-E17', '1× Dây đeo', 'Bao đựng + Phiếu bảo hành chính hãng'],
    warrantyMonths: 12,
    specs: [
      { group: 'Cảm biến & Xử lý', items: [
        { label: 'Loại cảm biến', value: 'APS-C CMOS' },
        { label: 'Độ phân giải', value: '24.2 Megapixel' },
        { label: 'Bộ xử lý', value: 'DIGIC X' },
        { label: 'Kích thước ảnh', value: '6000 × 4000 pixel' },
      ]},
      { group: 'Lấy nét', items: [
        { label: 'Hệ thống AF', value: 'Dual Pixel CMOS AF II' },
        { label: 'Điểm AF', value: '651 điểm theo pha' },
        { label: 'Eye AF', value: 'Người + Động vật' },
      ]},
      { group: 'Chụp ảnh', items: [
        { label: 'Tốc độ màn trập', value: '1/4000 - 30s, Bulb' },
        { label: 'Burst rate', value: '15 fps (electronic shutter)' },
        { label: 'Dải ISO', value: '100 - 32000 (mở rộng 51200)' },
      ]},
      { group: 'Video', items: [
        { label: '4K UHD', value: '30p không crop' },
        { label: 'Full HD', value: '120p / 60p / 30p' },
      ]},
      { group: 'Màn hình & Kính ngắm', items: [
        { label: 'LCD', value: 'Cảm ứng xoay lật 3.0 inch' },
        { label: 'EVF', value: '2.36 triệu điểm, 0.95×' },
      ]},
      { group: 'Ống kính kèm theo', items: [
        { label: 'Lens', value: 'RF-S 18-45mm f/4.5-6.3 IS STM' },
        { label: 'Mount', value: 'Canon RF (APS-C)' },
        { label: 'Filter size', value: '49mm' },
      ]},
      { group: 'Vật lý', items: [
        { label: 'Kết nối', value: 'Wi-Fi, Bluetooth, USB-C, micro HDMI' },
        { label: 'Pin', value: 'LP-E17, ~370 ảnh/lần sạc' },
        { label: 'Trọng lượng', value: '375g (body) / ~510g (kèm lens)' },
        { label: 'Kích thước', value: '116.3 × 85.5 × 68.8 mm' },
      ]},
    ],
  }),
  P({
    id: 'p3', slug: 'may-anh-sony-zve10-ii-black-body-only-chinh-hang', name: 'Máy ảnh Sony ZV-E10 II (Black Body Only) — Chính hãng', brand: 'Sony', category: 'may-anh',
    thumbnail: `${CDN}/image-data/san-pham/24-08/24-08-26/240826174229493/avatar/638708944659930440_may-anh-sony-zv-e10-ii-black-body-only-chinh-hang.jpg`,
    price: 26000000, originalPrice: 26000000,
    badges: [{ type: 'new', label: 'Vlogger' }, { type: 'hot', label: 'Hot' }],
    rating: { average: 4.8, count: 96 }, soldPercent: 20,
    shortSpecs: ['APS-C 26MP', '4K 30p', 'Eye AF', '3-Capsule Mic', 'BIONZ XR'],
    description: 'Máy ảnh vlogging hoàn hảo — 26MP Exmor R, Eye AF 759 điểm, micro 3 capsule, 343g.',
  }),
  P({
    id: 'p3b', slug: 'may-anh-sony-alpha-a7r-v-body-chinh-hang', name: 'Máy ảnh Sony A7R V (Body) — Chính hãng', brand: 'Sony', category: 'may-anh',
    thumbnail: `${CDN}/image-data/san-pham/24-08/24-08-02/240802084419498/hinh-500-500/638692697572301947_may-anh-sony-alpha-a7r-mark-v-chinh-hang.jpg`,
    price: 86390000, originalPrice: 86390000,
    badges: [{ type: 'new', label: 'Mới 100%' }],
    rating: { average: 4.9, count: 48 },
    shortSpecs: ['Full-frame 61MP', 'AI AF', '8K 24p', 'IBIS 8 stops'],
    description: 'Độ phân giải cao nhất dòng Alpha — 61MP, AI AF nhận diện 8 loại chủ thể.',
  }),
  P({
    id: 'p3c', slug: 'may-anh-nikon-z50-ii-body', name: 'Máy ảnh Nikon Z50 II (Body) — Chính hãng', brand: 'Nikon', category: 'may-anh',
    thumbnail: `${CDN}/image-data/san-pham/25-06/25-06-23/250623090801566/avatar/638864677258042523_nikon-z50-ii-mirrorless-camera-kem-nikkor-z-dx-16-50mm-f-3-5-6-3-vr-va-nikkor-z-dx-50-250mm-f-4-5-6-3-vr-lenses-kit.jpg`,
    price: 24900000, originalPrice: 24900000,
    badges: [{ type: 'new', label: 'Mới' }],
    rating: { average: 4.7, count: 42 },
    shortSpecs: ['APS-C 20.9MP', 'EXPEED 7', '4K 30fps', '11fps mechanical'],
    description: 'EXPEED 7 cải tiến AF, burst 11fps, 4K 30fps — cho người mới bắt đầu chuyên nghiệp.',
  }),
  P({
    id: 'p3d', slug: 'may-anh-fujifilm-x-t5-body', name: 'Máy ảnh Fujifilm X-T5 (Body) — Chính hãng', brand: 'Fujifilm', category: 'may-anh',
    thumbnail: `${CDN}/image-data/san-pham/23-02/23-02-10/230210225801678/avatar/01_may-anh-fujifilm-x-t5-chinh-hang.jpg`,
    price: 36990000, originalPrice: 36990000,
    badges: [{ type: 'hot', label: 'Retro' }],
    rating: { average: 4.8, count: 95 },
    shortSpecs: ['APS-C 40.2MP', 'X-Processor 5', '7.0fps mechanical', '19 Film Sim'],
    description: 'Thiết kế retro, cảm biến 40.2MP X-Trans, 19 Film Simulation đặc trưng.',
  }),
  P({
    id: 'p8', slug: 'fujifilm-x-h2s-body', name: 'Máy ảnh Fujifilm X-H2S (Body Only) — Chính hãng', brand: 'Fujifilm', category: 'may-anh',
    thumbnail: `${CDN}/image-data/san-pham/23-02/23-02-10/230210223540394/avatar/01_may-anh-fujifilm-x-h2s-body-only-chinh-hang.jpg`,
    price: 34990000, originalPrice: 37990000,
    badges: [{ type: 'sale', label: '-8%' }, { type: 'new', label: 'Chính hãng' }],
    rating: { average: 4.7, count: 71 },
    shortSpecs: ['APS-C 26MP', 'Stacked X-Trans 5 HS', '4K 120p', 'IBIS 7-stop'],
    description: 'Flagship APS-C — X-Trans 5 HS stacked 26MP, 4K 120p, burst 40fps electronic.',
  }),
  P({
    id: 'p5', slug: 'ong-kinh-canon-rf-2470-f28-l-is-usm-chinh-hang', name: 'Ống kính Canon RF 24-70mm f/2.8L IS USM — Chính hãng', brand: 'Canon', category: 'ong-kinh',
    thumbnail: `${CDN}/image-data/san-pham/23-02/23-02-10/230210234357844/avatar/01_ong-kinh-canon-rf-24-70mm-f-2-8l-is-usm-chinh-hang.jpg`,
    price: 48900000, originalPrice: 48900000,
    badges: [{ type: 'hot', label: 'Professional' }, { type: 'new', label: 'Chính hãng' }],
    rating: { average: 4.9, count: 94 }, soldPercent: 55,
    shortSpecs: ['24-70mm f/2.8', 'IS 5-stop', 'Nano USM', 'L-series', 'Filter 82mm'],
    description: 'Zoom chuẩn L-series — khẩu f/2.8 không đổi, chống rung IS 5 stops, Nano USM.',
  }),
  P({
    id: 'p10', slug: 'ong-kinh-canon-rf-50mm-f1-8-stm-chinh-hang', name: 'Ống kính Canon RF 50mm f/1.8 STM — Chính hãng', brand: 'Canon', category: 'ong-kinh',
    thumbnail: `${CDN}/image-data/san-pham/24-08/24-08-03/240803094047373/avatar/638847186653427391_canon-rf-50mm-f1-8-stm-chinh-hang.jpg`,
    price: 5990000, originalPrice: 5990000,
    badges: [{ type: 'hot', label: 'Best seller' }],
    rating: { average: 4.8, count: 185 },
    shortSpecs: ['f/1.8', 'STM Motor', '50mm', '160g'],
    description: 'Nifty-fifty dòng RF — bokeh mượt, lấy nét êm, chỉ 160g.',
  }),
  P({
    id: 'p11', slug: 'ong-kinh-sony-fe-70-200mm-f2-8-gm-ii-oss-chinh-hang', name: 'Ống kính Sony FE 70-200mm f/2.8 GM OSS II — Chính hãng', brand: 'Sony', category: 'ong-kinh',
    thumbnail: `${CDN}/image-data/san-pham/24-08/24-08-03/240803094242227/avatar/638692469929544019_ong-kinh-sony-fe-70-200mm-f2-8-gm-ii-oss.jpg`,
    price: 62900000, originalPrice: 62900000,
    badges: [{ type: 'hot', label: 'Flagship' }, { type: 'new', label: 'GM II' }],
    rating: { average: 5.0, count: 28 },
    shortSpecs: ['f/2.8 GM II', 'XD Linear', 'OSS 5.5 stops', '70-200mm'],
    description: 'GM II thế hệ mới — 1045g nhẹ nhất dòng f/2.8, 4× XD Linear Motor.',
  }),
  P({
    id: 'mavic-air-2', slug: 'flycam-dji-mavic-air-2-chinh-hang', name: 'Flycam DJI Mavic Air 2 | Chính hãng', brand: 'DJI', category: 'flycam',
    thumbnail: `${CDN}/image-data/san-pham/23-02/23-02-12/230212121212567/avatar/01_flycam-dji-mavic-air-2-chinh-hang.jpg`,
    price: 17900000, originalPrice: 19900000,
    badges: [{ type: 'hot', label: 'Bán chạy' }, { type: 'new', label: 'Chính hãng' }],
    rating: { average: 4.8, count: 156 }, soldPercent: 68,
    shortSpecs: ['Cảm biến 1/2" CMOS 48MP', '4K 60fps', 'Bay 34 phút', 'OcuSync 2.0 10km'],
    description: 'Đột phá phân khúc tầm trung — 4K 60fps sắc nét, 48MP, bay 34 phút, truyền hình ảnh 10km.',
    highlights: [
      'Cảm biến CMOS 1/2 inch, chụp ảnh 48 Megapixel',
      'Quay video 4K UHD @ 60fps / Full HD @ 240fps',
      'Công nghệ truyền sóng OcuSync 2.0 xa đến 10km',
      'Thời gian bay tối đa lên tới 34 phút',
      'Hỗ trợ chế độ chụp 8K Hyperlapse đỉnh cao',
      'ActiveTrack 3.0 bám nét thông minh',
    ],
    promotions: ['🎁 Tặng thẻ nhớ Sandisk Extreme 64GB chuyên dụng', '📦 Miễn phí giao hàng hỏa tốc toàn quốc'],
    packageIncludes: ['1× Thân máy Flycam DJI Mavic Air 2', '1× Bộ điều khiển từ xa', '1× Pin bay thông minh', '3× Cặp cánh quạt dự phòng', '1× Cáp USB-C / Lightning / Micro-USB', '1× Nắp bảo vệ Gimbal'],
    warrantyMonths: 12,
    specs: [
      { group: 'Camera', items: [
        { label: 'Cảm biến', value: '1/2 inch CMOS' },
        { label: 'Độ phân giải', value: '48 Megapixel' },
        { label: 'Góc nhìn (FOV)', value: '84° (tương đương 24mm)' },
        { label: 'Khẩu độ', value: 'f/2.8' },
        { label: 'Quay video', value: '4K Ultra HD: 3840×2160 @ 60fps' },
        { label: 'Chống rung', value: 'Gimbal 3 trục (pitch, roll, yaw)' },
      ]},
      { group: 'Tính năng bay', items: [
        { label: 'Thời gian bay tối đa', value: '34 phút' },
        { label: 'Tốc độ tối đa', value: '68.4 km/h (Sport Mode)' },
        { label: 'Truyền sóng', value: 'OcuSync 2.0 (10 km)' },
        { label: 'Kháng gió', value: 'Cấp 5 (8.5-10.5 m/s)' },
      ]},
      { group: 'Vật lý', items: [
        { label: 'Trọng lượng', value: '570 g' },
        { label: 'Kích thước gấp', value: '180×97×84 mm' },
        { label: 'Dung lượng pin', value: '3500 mAh' },
      ]},
    ],
  }),
  P({
    id: 'p4', slug: 'dji-mavic-4-pro-512gb-creator-combo', name: 'DJI Mavic 4 Pro 512GB Creator Combo', brand: 'DJI', category: 'flycam',
    thumbnail: `${CDN}/image-data/san-pham/25-05/25-05-15/250515085035248/avatar/638828964891489787_dji-mavic-4-pro-512gb-creator-combo.jpg`,
    price: 85000000, originalPrice: 85000000, callForPrice: true,
    badges: [{ type: 'hot', label: 'Flagship' }, { type: 'new', label: 'Mới 100%' }],
    rating: { average: 4.9, count: 142 },
    shortSpecs: ['Hasselblad 100MP 4/3', '6K HDR 60fps', 'LiDAR APAS 5.0', 'O4+ 15km'],
    description: 'Cỗ máy sáng tạo thực thụ — cụm 3 camera Hasselblad 100MP, 6K HDR, bay 35-40 phút.',
  }),
  P({
    id: 'p12', slug: 'dji-mini-5-pro-base-chinh-hang', name: 'DJI Mini 5 Pro Base — Chính hãng', brand: 'DJI', category: 'flycam',
    thumbnail: `${CDN}/image-data/san-pham/25-09/25-09-12/250912094317313/avatar/638932671190111464_dji-mini-5-pro-base-chinh-hang.jpg`,
    price: 13990000, originalPrice: 13990000,
    badges: [{ type: 'new', label: 'Mới' }, { type: 'hot', label: '249g' }],
    rating: { average: 4.8, count: 72 },
    shortSpecs: ['249g', '1/1.3" CMOS 48MP', 'O4 20km', '34 phút'],
    description: '249g — không cần đăng ký tại VN. 4K/60fps HDR, truyền sóng O4 20km.',
  }),
  P({
    id: 'p6', slug: 'gopro-hero-13-black', name: 'GoPro Hero 13 Black', brand: 'GoPro', category: 'action-camera',
    thumbnail: `${CDN}/image-data/san-pham/25-01/25-01-02/250102113303811/avatar/638714152413009638_gopro-hero-13-black.jpg`,
    price: 9690000, originalPrice: 9690000,
    badges: [{ type: 'hot', label: 'Bán chạy' }, { type: 'new', label: 'Mới 100%' }],
    rating: { average: 4.7, count: 218 }, soldPercent: 40,
    shortSpecs: ['5.3K 60p', '27MP Photo', 'HyperSmooth 6.0', 'Waterproof 10m', 'Wi-Fi 6'],
    description: '5.3K/60fps, ảnh 27MP, HyperSmooth 6.0, chống nước 10m, pin Enduro 1900mAh.',
    specs: [
      { group: 'Camera', items: [
        { label: 'Cảm biến', value: 'CMOS 1/1.9 inch' },
        { label: 'Ảnh tĩnh', value: '27 Megapixel' },
        { label: 'Video 5.3K', value: '60fps' },
        { label: 'Video 4K', value: '120fps' },
        { label: 'Video 2.7K', value: '240fps' },
      ]},
      { group: 'Ổn định', items: [
        { label: 'Chống rung', value: 'HyperSmooth 6.0' },
        { label: 'Horizon Lock', value: '4.0 — 360°' },
      ]},
      { group: 'Vật lý', items: [
        { label: 'Pin', value: 'Enduro 1900mAh' },
        { label: 'Chống nước', value: '10m (không cần vỏ)' },
        { label: 'Trọng lượng', value: '154g' },
      ]},
    ],
  }),
  P({
    id: 'insta360-one-rs-1inch-360', slug: 'insta360-one-rs-1-inch-360-edition', name: 'Insta360 ONE RS 1-Inch 360 Edition', brand: 'Insta360', category: 'action-camera',
    thumbnail: `${CDN}/image-data/san-pham/23-02/23-02-11/230211001818256/avatar/01_insta360-one-rs-1-inch-360-edition.jpg`,
    price: 18990000, originalPrice: 20990000,
    badges: [{ type: 'hot', label: 'Co-engineered Leica' }, { type: 'new', label: 'Chính hãng' }],
    rating: { average: 4.9, count: 87 }, soldPercent: 52,
    shortSpecs: ['Dual 1-inch sensor', '6K 360°', '21MP 360 Photo', 'FlowState', 'IPX8 10m'],
    description: 'Camera 360 flagship với cảm biến kép 1-inch đồng phát triển cùng Leica — quay 6K 360°, ảnh 21MP, chống rung FlowState và Horizon Lock 360°.',
    highlights: [
      'Cảm biến kép 1-inch — đồng phát triển cùng Leica',
      'Video 360° 6K — dải nhạy sáng vượt trội ban đêm',
      'Ảnh 360° 21MP (6528×3264) sắc nét',
      'FlowState Stabilization + 360 Horizon Lock',
      'Chống nước IPX8 tới 10m',
      'Gậy selfie tàng hình — góc quay thứ ba ấn tượng',
    ],
    promotions: ['🎁 Tặng thẻ nhớ 128GB UHS-I V30', '🛡️ Bảo hành chính hãng 12 tháng'],
    packageIncludes: ['1× ONE RS 1-Inch 360 Lens', '1× ONE RS Core', '1× Pin 1350mAh', '1× Khung gắn 1-Inch 360', '1× Cáp USB-C', '1× Túi bảo vệ'],
    warrantyMonths: 12,
    specs: [
      { group: 'Ống kính & Cảm biến', items: [
        { label: 'Cảm biến', value: 'Dual 1-inch CMOS (Leica co-engineered)' },
        { label: 'Khẩu độ', value: 'f/2.2' },
        { label: 'Tiêu cự (35mm eq.)', value: '6.52mm' },
      ]},
      { group: 'Video & Ảnh', items: [
        { label: 'Video 360°', value: '6K (6144×3072) @ 30fps' },
        { label: 'Ảnh 360°', value: '21MP (6528×3264)' },
        { label: 'Định dạng', value: 'INSV, INSP, DNG RAW' },
        { label: 'Chống rung', value: 'FlowState + 360 Horizon Lock' },
      ]},
      { group: 'Độ bền & Pin', items: [
        { label: 'Chống nước', value: 'IPX8 — 10m' },
        { label: 'Pin', value: '1350mAh — ~62 phút quay 6K' },
        { label: 'Trọng lượng', value: '239g' },
      ]},
      { group: 'Kết nối', items: [
        { label: 'Wi-Fi / Bluetooth', value: 'Wi-Fi 5GHz + BT 5.0' },
        { label: 'USB', value: 'USB-C' },
        { label: 'Thẻ nhớ', value: 'microSD tối đa 1TB (UHS-I V30)' },
      ]},
    ],
  }),
  P({
    id: 'p7', slug: 'may-quay-dji-osmo-pocket-4-creator-combo', name: 'Máy quay DJI Osmo Pocket 4 Creator Combo', brand: 'DJI', category: 'action-camera',
    thumbnail: `${CDN}/image-data/san-pham/26-03/26-03-30/260330085702564/avatar/639120324002834549-dji-pocket-4-4-2000x2000-jpg_may-quay-dji-osmo-pocket-4-creator-combo.jpg`,
    price: 14740000, originalPrice: 14740000,
    badges: [{ type: 'new', label: 'Creator' }, { type: 'hot', label: 'Bán chạy' }],
    rating: { average: 4.8, count: 142 },
    shortSpecs: ['Dual sensor 1-inch 50MP', '4K 120fps', 'Gimbal 3 trục', 'Màn hình xoay'],
    description: 'Cảm biến kép 1-inch 50MP, 4K 120fps, gimbal cơ học 3 trục — combo đủ đồ cho creator.',
  }),
];

export const getByCategory = (slug) => products.filter((p) => p.category === slug && p.thumbnail);
export const getBySlug = (slug) => products.find((p) => p.slug === slug) ?? null;
export const flashSaleProducts = products.filter((p) => p.soldPercent > 0).slice(0, 6);
export const searchProducts = (q) => {
  const s = q.toLowerCase().trim();
  if (!s) return [];
  return products.filter((p) =>
    p.name.toLowerCase().includes(s) || p.brand.toLowerCase().includes(s) ||
    (p.shortSpecs || []).some((x) => x.toLowerCase().includes(s)));
};

// ── Banner slide theo danh mục (bannerSileSmall — ảnh thật 1305×435 từ mayanhvietnam.com) ──
export const categoryBanners = {
  'may-anh': [
    { title: 'Sony A6700', image: `${CDN}/asset/imgs/img/banner/sonet-some_sony-a6700.png`, href: 'Danh Mục.dc.html#may-anh' },
    { title: 'Sony A7C II', image: `${CDN}/asset/imgs/img/banner/sonet-some_a7cii.png`, href: 'Danh Mục.dc.html#may-anh' },
    { title: 'Sony ZV-E10 II & ZV-1 II', image: `${CDN}/asset/imgs/img/banner/Sonet-some-zv-e10ii_zv-1ii.png`, href: 'Sản Phẩm.dc.html#may-anh-sony-zve10-ii-black-body-only-chinh-hang' },
    { title: 'Sony A7 V — Ưu đãi đặt trước', image: `${CDN}/asset/imgs/img/banner/uuDai-sonya7v-DCHS.webp`, href: 'Danh Mục.dc.html#may-anh' },
    { title: 'Sony A7R VI', image: `${CDN}/asset/imgs/img/banner/sony-a7r-vi-1.webp`, href: 'Danh Mục.dc.html#may-anh' },
    { title: 'Canon EOS R50 Trắng / Đen', image: `${CDN}/asset/imgs/img/banner/canon_r50_trang_den.webp`, href: 'Sản Phẩm.dc.html#canon-eos-r50-black-kem-lens-rfs-1845-chinh-hang' },
    { title: 'Canon EOS R6 Mark III', image: `${CDN}/asset/imgs/img/banner/canon-r6-mark-III.webp`, href: 'Sản Phẩm.dc.html#may-anh-canon-eos-r6-mark-iii-body' },
  ],
  'ong-kinh': [
    { title: 'Sony — Tết siêu chuẩn sáng tạo', image: `${CDN}/asset/imgs/img/banner/tetSieuChuansangtaoSony.webp`, href: 'Danh Mục.dc.html#ong-kinh' },
    { title: 'Nhận ngay hộp quà Sony', image: `${CDN}/asset/imgs/img/banner/nhan-ngay-hop-qua-sony.webp`, href: 'Danh Mục.dc.html#ong-kinh' },
    { title: 'Canon RF 50mm F1.4L VCM', image: `${CDN}/asset/imgs/img/banner/CANON-RF-50mm-F1.4L-VCM.webp`, href: 'Danh Mục.dc.html#ong-kinh' },
    { title: 'Khuyến mãi ống kính', image: `${CDN}/asset/imgs/img/banner/Km-lens.webp`, href: 'Danh Mục.dc.html#ong-kinh' },
    { title: 'Canon RF 45mm F1.2 STM', image: `${CDN}/asset/imgs/img/banner/RF-45mm-F1.2-STM.webp`, href: 'Danh Mục.dc.html#ong-kinh' },
    { title: 'Nikkor Z DX 35mm f/1.7', image: `${CDN}/asset/imgs/img/banner/NIKKOR-Z-DX-MC-35mm-f_1.7.png`, href: 'Danh Mục.dc.html#ong-kinh' },
    { title: 'Kase AF 85mm F1.4 Nikon Z', image: `${CDN}/asset/imgs/img/banner/LENS-KASE-AF-85mm-F1.4-FOR-NIKON-Z.webp`, href: 'Danh Mục.dc.html#ong-kinh' },
  ],
  'action-camera': [
    { title: 'DJI Osmo Pocket 4 Creator Combo', image: `${CDN}/asset/imgs/img/banner/Dji_osm_pocket_4.webp`, href: 'Sản Phẩm.dc.html#may-quay-dji-osmo-pocket-4-creator-combo' },
    { title: 'DJI Osmo Action 6', image: `${CDN}/asset/imgs/img/banner/action-6.webp`, href: 'Danh Mục.dc.html#action-camera' },
    { title: 'DJI Osmo Pocket 3 Combo', image: `${CDN}/asset/imgs/img/banner/DJI-Osmo-Pocket-3.webp`, href: 'Danh Mục.dc.html#action-camera' },
    { title: 'Insta360 Go Ultra', image: `${CDN}/asset/imgs/img/banner/Go-ultra-standard-bundle.webp`, href: 'Action Camera Insta360.dc.html' },
    { title: 'DJI Osmo Nano', image: `${CDN}/asset/imgs/img/banner/DJI-OSMO-NANO-01.webp`, href: 'Danh Mục.dc.html#action-camera' },
    { title: 'DJI Osmo Action 5 Pro', image: `${CDN}/asset/imgs/img/banner/action5pro.webp`, href: 'Danh Mục.dc.html#action-camera' },
  ],
  'flycam': [
    { title: 'DJI Mini 5 Pro', image: `${CDN}/asset/imgs/img/banner/dji-mini-5-pro.webp`, href: 'Sản Phẩm.dc.html#dji-mini-5-pro-base-chinh-hang' },
    { title: 'DJI Mavic 4 Pro', image: `${CDN}/asset/imgs/img/banner/Mavic-4-Pro.webp`, href: 'Sản Phẩm.dc.html#dji-mavic-4-pro-512gb-creator-combo' },
    { title: 'DJI Mini 4K Fly More Combo', image: `${CDN}/asset/imgs/img/banner/FLYCAM-DJI-MINI-4K-FLY-MORE-COMBO.webp`, href: 'Flycam DJI.dc.html' },
    { title: 'DJI Avata 2 Fly More', image: `${CDN}/asset/imgs/img/banner/dji-avata-2.webp`, href: 'Danh Mục.dc.html#flycam' },
    { title: 'DJI Neo', image: `${CDN}/asset/imgs/img/banner/1200x400DJI_Neo.webp`, href: 'Danh Mục.dc.html#flycam' },
    { title: 'DJI Mini 4 Pro Fly More', image: `${CDN}/asset/imgs/img/banner/1200X400_Flycam_DJI_Mini_4-Pro_Fly_More.webp`, href: 'Danh Mục.dc.html#flycam' },
  ],
};

export const getCategoryBanners = (slug) => {
  if (slug === 'tat-ca') {
    return ['may-anh', 'flycam', 'action-camera', 'ong-kinh'].flatMap((k) => (categoryBanners[k] || []).slice(0, 2));
  }
  return categoryBanners[slug] || [];
};

// ── 3 dòng trải nghiệm 3D ──────────────────────────────────────────────
export const experiences = [
  {
    key: 'flycam', href: 'Flycam DJI.dc.html', label: 'Flycam — Drone',
    productSlug: 'flycam-dji-mavic-air-2-chinh-hang',
    title: 'DJI Mavic Air 2', tagline: 'Bầu trời trong tầm tay. 4K 60fps.',
    stat: '34 phút bay · OcuSync 10km',
  },
  {
    key: 'action', href: 'Action Camera Insta360.dc.html', label: 'Camera hành động',
    productSlug: 'insta360-one-rs-1-inch-360-edition',
    title: 'Insta360 ONE RS 1-Inch', tagline: 'Quay 360°. Cảm biến 1-inch Leica.',
    stat: '6K 360° · FlowState · IPX8',
  },
  {
    key: 'camera', href: 'Máy Ảnh Canon R50.dc.html', label: 'Máy ảnh Mirrorless',
    productSlug: 'canon-eos-r50-black-kem-lens-rfs-1845-chinh-hang',
    title: 'Canon EOS R50', tagline: 'Nhỏ gọn. Mạnh mẽ. Sáng tạo không giới hạn.',
    stat: 'APS-C 24.2MP · 4K 30p · 375g',
  },
];

export const getProductUrl = (slug) => {
  if (slug === 'canon-eos-r50-black-kem-lens-rfs-1845-chinh-hang') {
    return 'Máy Ảnh Canon R50.dc.html';
  }
  if (slug === 'flycam-dji-mavic-air-2-chinh-hang') {
    return 'Flycam DJI.dc.html';
  }
  if (slug === 'insta360-one-rs-1-inch-360-edition') {
    return 'Action Camera Insta360.dc.html';
  }
  return `Sản Phẩm.dc.html#${slug}`;
};

