// lib/products.ts — Máy Ảnh Việt Nam · shared data module (derived from packages/mock-data)
const CDN = 'https://mayanhvietnam.com';

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  image: string;
  productCount: number;
  description: string;
}

export interface Store {
  id: string;
  name: string;
  address: string;
  phone: string;
  hours: string;
}

export interface Badge {
  type: 'hot' | 'new' | 'sale';
  label: string;
}

export interface Rating {
  average: number;
  count: number;
}

export interface SpecGroup {
  group: string;
  items: { label: string; value: string }[];
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: string;
  thumbnail: string;
  price: number;
  originalPrice?: number;
  badges: Badge[];
  rating?: Rating;
  soldPercent: number;
  shortSpecs: string[];
  description: string;
  highlights?: string[];
  gallery?: string[];
  promotions?: string[];
  packageIncludes?: string[];
  warrantyMonths?: number;
  specs?: SpecGroup[];
  callForPrice?: boolean;
}

export const formatVND = (n: number) => `${n.toLocaleString('vi-VN')}đ`;

export const discountOf = (p: Product) =>
  p.originalPrice && p.originalPrice > p.price
    ? Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100)
    : 0;

export const categories: Category[] = [
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

export const stores: Store[] = [
  { id: 'st1', name: 'Máy Ảnh Việt Nam TP.HCM', address: 'Số 9, Nam Quốc Cang, Phường Bến Thành, TP Hồ Chí Minh', phone: '0937.148.222', hours: '09:00 – 19:00 mỗi ngày' },
  { id: 'st2', name: 'Máy Ảnh Việt Nam Cần Thơ', address: 'Số 58 Nguyễn Hiền, Khu Dân Cư 91B, Phường Tân An, TP. Cần Thơ', phone: '0937.148.222', hours: '08:00 – 20:00 mỗi ngày' },
  { id: 'st3', name: 'Máy Ảnh Việt Nam An Giang', address: 'Số 1, Đường số 1, Khu Tây sông Hậu, Phường Long Xuyên, Tỉnh An Giang', phone: '0937.148.222', hours: '08:00 – 17:30 mỗi ngày' },
  { id: 'st4', name: 'Máy Ảnh Việt Nam Đồng Tháp', address: 'Số 126, Hoàng Sa, Khu phố 4, Phường Thới Sơn, Tỉnh Đồng Tháp', phone: '0937.148.222', hours: '08:00 – 18:00 mỗi ngày' },
];

const P = (o: Partial<Product> & { id: string; slug: string; name: string; brand: string; category: string; thumbnail: string; price: number }): Product => ({
  callForPrice: false,
  soldPercent: 0,
  specs: [],
  highlights: [],
  badges: [],
  shortSpecs: [],
  description: '',
  ...o
});

export const products: Product[] = [
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
        { label: 'Độ phân giải', value: '24.2 megapixels' },
        { label: 'Bộ xử lý hình ảnh', value: 'DIGIC X' },
      ]},
      { group: 'Lấy nét & Chống rung', items: [
        { label: 'Hệ thống lấy nét', value: 'Dual Pixel CMOS AF II' },
        { label: 'Số điểm lấy nét', value: '651 điểm (bao phủ 100% khung hình)' },
        { label: 'Chống rung thân máy', value: 'Không (Hỗ trợ chống rung số Movie Digital IS)' },
      ]},
      { group: 'Quay phim & Chụp ảnh', items: [
        { label: 'Độ phân giải video', value: '4K UHD 30p (oversampled từ 6K), Full HD 120p' },
        { label: 'Giới hạn quay phim', value: 'Lên tới 1 giờ liên tục' },
        { label: 'Tốc độ màn trập', value: '1/4000s - 30s' },
        { label: 'Tốc độ chụp liên tục', value: '12 fps (màn trập điện tử trước), 15 fps (màn trập điện tử)' },
      ]},
      { group: 'Thiết kế & Kết nối', items: [
        { label: 'Màn hình LCD', value: '3.0 inch xoay lật đa hướng, cảm ứng 1.04 triệu điểm' },
        { label: 'Kính ngắm EVF', value: 'OLED EVF 2.36 triệu điểm, độ phóng đại 0.96x' },
        { label: 'Cổng kết nối', value: 'USB-C (USB 2.0), Micro HDMI, Jack Micro 3.5mm' },
        { label: 'Không dây', value: 'Wi-Fi 2.4GHz, Bluetooth 4.2' },
        { label: 'Pin / Thẻ nhớ', value: 'Pin LP-E17, 1× Khe thẻ SD/SDHC/SDXC (UHS-I)' },
        { label: 'Kích thước / Nặng', value: '116.3 × 85.5 × 68.8 mm / 375g (đã lắp pin + thẻ)' },
      ]},
    ],
  }),
  P({
    id: 'p3b', slug: 'canon-eos-r50-white-kem-lens-rf-s-18-45mm-chinh-hang', name: 'Máy ảnh Canon EOS R50 White + Lens RF-S 18-45mm — Chính hãng', brand: 'Canon', category: 'may-anh',
    thumbnail: `${CDN}/image-data/san-pham/24-12/24-12-28/241228113334503/avatar/638767703742439631_may-anh-canon-eos-r50-white-kem-lens-rf-s-18-45mm-chinh-hang.jpg`,
    price: 18500000, originalPrice: 19900000,
    badges: [{ type: 'new', label: 'Bản màu trắng' }],
    rating: { average: 4.8, count: 42 }, soldPercent: 50,
    shortSpecs: ['APS-C 24.2MP', 'Màu trắng bạc', '4K 30fps', 'Nhỏ gọn sang trọng'],
    description: 'Phiên bản màu trắng sữa cực kỳ thời trang và sang trọng, thích hợp cho vlogger nữ.',
    gallery: [
      `${CDN}/image-data/san-pham/24-12/24-12-28/241228113334503/avatar/638767703742439631_may-anh-canon-eos-r50-white-kem-lens-rf-s-18-45mm-chinh-hang.jpg`,
      `${CDN}/image-data/san-pham/24-12/24-12-28/241228113334503/hinh-500-500/01.jpg`,
    ],
  }),
  P({
    id: 'p4', slug: 'may-anh-sony-alpha-a7c-ii-body-only-chinh-hang', name: 'Máy ảnh Sony Alpha A7C II (Body Only) — Chính hãng', brand: 'Sony', category: 'may-anh',
    thumbnail: `${CDN}/image-data/san-pham/23-10/23-10-18/231018084650392/avatar/01_may-anh-sony-alpha-a7c-ii-body-only-chinh-hang.jpg`,
    price: 50900000, originalPrice: 50900000,
    badges: [{ type: 'hot', label: 'Bán chạy' }, { type: 'new', label: 'Mới' }],
    rating: { average: 4.9, count: 96 }, soldPercent: 40,
    shortSpecs: ['Full-frame 33MP', 'BIONZ XR + AI unit', '4K 60p', 'IBIS 7 stops', 'Kích thước compact'],
    description: 'Thân máy siêu nhỏ gọn nhưng mang sức mạnh Full-frame 33MP, bộ xử lý AI chuyên biệt nhận diện AF.',
  }),
  P({
    id: 'p5', slug: 'may-anh-fujifilm-x-t5-body-only-chinh-hang', name: 'Máy ảnh Fujifilm X-T5 (Body Only) — Chính hãng', brand: 'Fujifilm', category: 'may-anh',
    thumbnail: `${CDN}/image-data/san-pham/23-02/23-02-12/230212102919920/avatar/01_may-anh-fujifilm-x-t5-body-only-chinh-hang.jpg`,
    price: 43900000, originalPrice: 43900000,
    badges: [{ type: 'hot', label: 'Retro design' }],
    rating: { average: 4.8, count: 114 }, soldPercent: 55,
    shortSpecs: ['APS-C 40.2MP', 'X-Processor 5', '6.2K 30p', 'IBIS 7 stops', 'Màn hình lật 3 hướng'],
    description: 'Thiết kế hoài cổ núm xoay cơ học, cảm biến X-Trans CMOS 5 HR lên tới 40.2MP.',
  }),
  P({
    id: 'p6', slug: 'flycam-dji-mavic-air-2-chinh-hang', name: 'Flycam DJI Mavic Air 2 — Chính hãng', brand: 'DJI', category: 'flycam',
    thumbnail: `${CDN}/image-data/san-pham/23-02/23-02-12/230212121212567/avatar/01_flycam-dji-mavic-air-2-chinh-hang.jpg`,
    price: 17900000, originalPrice: 19900000,
    badges: [{ type: 'hot', label: 'Bán chạy' }, { type: 'sale', label: '-10%' }],
    rating: { average: 4.8, count: 156 }, soldPercent: 90,
    shortSpecs: ['Cảm biến 1/2" 48MP', '4K 60fps video', '34 phút bay', 'OcuSync 2.0 10km', 'Gimbal 3 trục'],
    description: 'Flycam tầm trung quốc dân với camera 48MP sắc nét, thời gian bay 34 phút ấn tượng và truyền sóng 10km.',
  }),
  P({
    id: 'p26', slug: 'dji-mavic-4-pro-512gb-creator-combo', name: 'Flycam DJI Mavic 4 Pro 512GB Creator Combo', brand: 'DJI', category: 'flycam',
    thumbnail: `${CDN}/image-data/san-pham/25-05/25-05-15/250515085035248/avatar/638828964891489787_dji-mavic-4-pro-512gb-creator-combo.jpg`,
    price: 85000000, originalPrice: 85000000,
    badges: [{ type: 'hot', label: 'Flagship' }, { type: 'new', label: 'Mới 100%' }],
    rating: { average: 4.9, count: 142 }, soldPercent: 22,
    shortSpecs: ['Camera Hasselblad L2D-20c', '4/3 CMOS 100MP', '4K 120fps HDR', '51 phút bay', 'O4 30km'],
    description: 'Flagship cao cấp nhất DJI 2025 — camera Hasselblad L2D-20c 100MP, 4K 120fps HDR, thời gian bay 51 phút, truyền sóng O4 30km.',
  }),
  P({
    id: 'p14', slug: 'flycam-dji-air-3s-fly-more-combo-dji-rc-2-chinh-hang', name: 'Flycam DJI Air 3S Fly More Combo (DJI RC 2) — Chính hãng', brand: 'DJI', category: 'flycam',
    thumbnail: `${CDN}/image-data/san-pham/24-11/24-11-02/241102144506281/avatar/638661555984717416_flycam-dji-air-3s-fly-more-combo-dji-rc-2-chinh-hang.jpg`,
    price: 32990000, originalPrice: 32990000,
    badges: [{ type: 'hot', label: 'Tầm trung mạnh nhất' }, { type: 'new', label: 'Mới' }],
    rating: { average: 4.8, count: 35 }, soldPercent: 18,
    shortSpecs: ['Dual camera 1-inch + 1/1.3"', '4K 120fps HDR', '45 phút bay', 'O4 20km', 'DJI RC 2 kèm'],
    description: 'Dual camera đỉnh cao — cảm biến 1-inch + 1/1.3", quay 4K HDR 120fps, 45 phút bay, kèm tay cầm DJI RC 2 màn hình sáng.',
  }),
  P({
    id: 'p12', slug: 'dji-mini-5-pro-base-chinh-hang', name: 'Flycam DJI Mini 5 Pro Base — Chính hãng', brand: 'DJI', category: 'flycam',
    thumbnail: `${CDN}/image-data/san-pham/25-09/25-09-12/250912094317313/avatar/638932671190111464_dji-mini-5-pro-base-chinh-hang.jpg`,
    price: 13990000, originalPrice: 13990000,
    badges: [{ type: 'new', label: 'Mới' }, { type: 'hot', label: '249g' }],
    rating: { average: 4.8, count: 72 }, soldPercent: 55,
    shortSpecs: ['Cảm biến 1/1.3"', '4K HDR 60fps', '36 phút bay', 'O4 20km', '249g không cần đăng ký'],
    description: 'Mini drone nhẹ nhất phân khúc 249g — cảm biến 1/1.3" 50MP, video 4K HDR 60fps, 36 phút bay, OcuSync 4 20km.',
  }),
  P({
    id: 'p6', slug: 'flycam-dji-mavic-air-2-chinh-hang', name: 'Flycam DJI Mavic Air 2 — Chính hãng', brand: 'DJI', category: 'flycam',
    thumbnail: `${CDN}/image-data/san-pham/23-02/23-02-12/230212121212567/avatar/01_flycam-dji-mavic-air-2-chinh-hang.jpg`,
    price: 17900000, originalPrice: 19900000,
    badges: [{ type: 'hot', label: 'Bán chạy' }, { type: 'sale', label: '-10%' }],
    rating: { average: 4.8, count: 215 }, soldPercent: 90,
    shortSpecs: ['Cảm biến 1/2" 48MP', '4K 60fps video', '34 phút bay', 'OcuSync 2.0 10km', 'Gimbal 3 trục'],
    description: 'Flycam tầm trung quốc dân với camera 48MP sắc nét, thời gian bay 34 phút ấn tượng và truyền sóng 10km.',
    highlights: [
      'Cảm biến 1/2" CMOS chụp ảnh 48MP chuyên nghiệp',
      'Quay video 4K/60fps 120Mbps + HDR video',
      'Thời gian bay tối đa lên tới 34 phút liên tục',
      'Hệ thống truyền sóng OcuSync 2.0 xa tới 10km',
      'Chống rung gimbal cơ học 3 trục ổn định',
      'Cảm biến tránh vật cản trước, sau, bụng (APAS 3.0)',
      'Tính năng bay thông minh: FocusTrack, QuickShots, Hyperlapse 8K',
    ],
    gallery: [
      `${CDN}/image-data/san-pham/23-02/23-02-12/230212121212567/avatar/01_flycam-dji-mavic-air-2-chinh-hang.jpg`,
      `${CDN}/image-data/san-pham/23-02/23-02-12/230212121212567/hinh-preview/02.jpg`,
      `${CDN}/image-data/san-pham/23-02/23-02-12/230212121212567/hinh-preview/03.jpg`,
      `${CDN}/image-data/san-pham/23-02/23-02-12/230212121212567/hinh-preview/04.jpg`,
      `${CDN}/image-data/san-pham/23-02/23-02-12/230212121212567/hinh-preview/05.jpg`,
    ],
    promotions: ['🎁 Tặng kèm thẻ nhớ Sandisk Extreme 64GB', '🛡️ Bảo hành chính hãng DJI Việt Nam 12 tháng'],
    packageIncludes: ['1× Máy bay Mavic Air 2', '1× Bộ điều khiển từ xa', '1× Pin thông minh', '3× Cặp cánh quạt chống ồn', '1× Cáp sạc + Củ sạc', 'Cáp nối điều khiển (Lightning, Type-C, Micro-USB)'],
    warrantyMonths: 12,
    specs: [
      { group: 'Camera & Hình ảnh', items: [
        { label: 'Cảm biến ảnh', value: '1/2 inch CMOS, ống kính 24mm (35mm eq.), f/2.8' },
        { label: 'Độ phân giải ảnh', value: '48 megapixels (chụp RAW/JPEG)' },
        { label: 'Video tối đa', value: '4K Ultra HD (3840×2160) @ 60fps, 1080p @ 240fps (slow-mo)' },
        { label: 'Color Profiles', value: 'D-Cinelike, Normal (8-bit)' },
      ]},
      { group: 'Khả năng bay', items: [
        { label: 'Thời gian bay', value: 'Tối đa 34 phút (không gió)' },
        { label: 'Tốc độ bay tối đa', value: '68 km/h (chế độ Sport)' },
        { label: 'Kháng gió tối đa', value: 'Cấp 5 (8.5 - 10.5 m/s)' },
        { label: 'Khoảng cách bay', value: '18.5 km tối đa' },
      ]},
      { group: 'Truyền sóng & Cảm biến', items: [
        { label: 'Công nghệ truyền sóng', value: 'OcuSync 2.0 (tần số kép 2.4/5.8GHz)' },
        { label: 'Khoảng cách truyền hình ảnh', value: 'Tối đa 10 km (FCC), 6 km (CE)' },
        { label: 'Tránh vật cản', value: 'APAS 3.0 (Cảm biến trước, sau và cảm biến bụng)' },
      ]},
      { group: 'Trọng lượng & Kích thước', items: [
        { label: 'Trọng lượng cất cánh', value: '570g (yêu cầu đăng ký bay tại một số quốc gia)' },
        { label: 'Kích thước gấp gọn', value: '180 × 97 × 84 mm' },
        { label: 'Kích thước mở ra', value: '183 × 253 × 77 mm' },
      ]},
    ],
  }),
  P({
    id: 'p6b', slug: 'insta360-one-rs-1-inch-360-edition', name: 'Camera hành động Insta360 ONE RS 1-Inch 360 Edition', brand: 'Insta360', category: 'action-camera',
    thumbnail: `${CDN}/image-data/san-pham/23-02/23-02-11/230211001818256/avatar/01_insta360-one-rs-1-inch-360-edition.jpg`,
    price: 20550000, originalPrice: 20550000,
    badges: [{ type: 'hot', label: 'Leica 360°' }, { type: 'new', label: 'Sensor 1 inch' }],
    rating: { average: 4.9, count: 32 }, soldPercent: 35,
    shortSpecs: ['Quay 360°', 'Cảm biến 1-inch Leica', '6K 360°', 'FlowState', 'IPX8'],
    description: 'Camera 360 flagship với cảm biến kép 1-inch đồng phát triển cùng Leica — quay 6K 360°, ảnh 21MP, chống rung FlowState và Horizon Lock 360°.',
    highlights: [
      'Quay 360°. Cảm biến 1-inch Leica.',
      '6K 360°. FlowState · IPX8',
      'Cảm biến kép 1-inch — đồng phát triển cùng Leica',
      'Video 360° 6K — dải nhạy sáng vượt trội ban đêm',
      'Ảnh 360° 21MP (6528×3264) sắc nét',
      'FlowState Stabilization + 360 Horizon Lock',
      'Gậy selfie tàng hình — góc quay thứ ba ấn tượng',
    ],
    gallery: [
      `${CDN}/image-data/san-pham/23-02/23-02-11/230211001818256/avatar/01_insta360-one-rs-1-inch-360-edition.jpg`,
      `${CDN}/image-data/san-pham/23-02/23-02-11/230211001818256/hinh-preview/02_insta360-one-rs-1-inch-360-edition.jpg`,
      `${CDN}/image-data/san-pham/23-02/23-02-11/230211001818256/hinh-preview/04_insta360-one-rs-1-inch-360-edition.jpg`,
      `${CDN}/image-data/san-pham/23-02/23-02-11/230211001818256/hinh-preview/06_insta360-one-rs-1-inch-360-edition.jpg`,
      `${CDN}/image-data/san-pham/23-02/23-02-11/230211001818256/hinh-preview/08_insta360-one-rs-1-inch-360-edition.jpg`,
      `${CDN}/image-data/san-pham/23-02/23-02-11/230211001818256/hinh-preview/10_insta360-one-rs-1-inch-360-edition.jpg`,
      `${CDN}/image-data/san-pham/23-02/23-02-11/230211001818256/hinh-preview/12_insta360-one-rs-1-inch-360-edition.jpg`,
      `${CDN}/image-data/san-pham/23-02/23-02-11/230211001818256/hinh-preview/14_insta360-one-rs-1-inch-360-edition.jpg`,
    ],
    promotions: ['🎁 Tặng thẻ nhớ 128GB UHS-I V30', '🛡️ Bảo hành chính hãng 12 tháng'],
    packageIncludes: [
      '1× Insta360 ONE RS 1-Inch 360 Edition Camera',
      '1× 1-Inch RS 360 Lens',
      '1× ONE RS Core Module',
      '1× Vertical Battery Base',
      '1× Mounting Bracket',
      '1× Lens Cap',
    ],
    warrantyMonths: 12,
    specs: [
      { group: 'Ống kính & Cảm biến', items: [
        { label: 'Cảm biến', value: 'Dual 1-inch CMOS (Leica co-engineered)' },
        { label: 'Khẩu độ', value: 'f/2.2' },
        { label: 'Góc nhìn', value: '360 độ' },
        { label: 'Tỷ lệ ảnh', value: '2:1' },
      ]},
      { group: 'Video & Ảnh', items: [
        { label: 'Video 360° 6K', value: '6144×3072 @ 30fps' },
        { label: 'Ảnh 360°', value: '21MP' },
        { label: 'Bitrate tối đa', value: '120 Mbps' },
        { label: 'Chống rung', value: 'FlowState 6-Axis + 360 Horizon Lock' },
      ]},
      { group: 'Độ bền & Pin', items: [
        { label: 'Chống nước', value: 'IPX3 · nhiệt độ -20°C đến 40°C' },
        { label: 'Pin', value: '1350mAh — ~62 phút quay 6K' },
        { label: 'Trọng lượng', value: '239g' },
        { label: 'Kích thước', value: '53.2 × 49.5 × 129.3 mm' },
      ]},
      { group: 'Kết nối', items: [
        { label: 'Wi-Fi / Bluetooth', value: 'Wi-Fi 5GHz + BT 5.0' },
        { label: 'USB', value: 'USB Type-C' },
        { label: 'Thẻ nhớ', value: 'microSD tối đa 1TB (UHS-I V30)' },
      ]},
    ],
  }),
  // ── ỐNG KINH ───────────────────────────────────────────────────────────
  P({
    id: 'lens1', slug: 'ong-kinh-canon-rf-2470-f28-l-is-usm-chinh-hang', name: 'Ống kính Canon RF 24-70mm f/2.8L IS USM — Chính hãng', brand: 'Canon', category: 'ong-kinh',
    thumbnail: `${CDN}/image-data/san-pham/23-02/23-02-10/230210234357844/avatar/01_ong-kinh-canon-rf-2470mm-f-2-8l-is-usm-chinh-hang.jpg`,
    price: 48900000, originalPrice: 48900000,
    badges: [{ type: 'hot', label: 'Professional' }, { type: 'new', label: 'Chính hãng' }],
    rating: { average: 4.9, count: 94 }, soldPercent: 30,
    shortSpecs: ['24-70mm f/2.8', 'Canon RF Mount', 'IS Optical 5 stops', 'Nano USM', 'Weather-sealed'],
    description: 'Ống kính zoom tiêu chuẩn chuyên nghiệp cho hệ RF — quang học L-series, chống rung IS 5 stops, motor Nano USM lấy nét cực nhanh.',
  }),
  P({
    id: 'lens2', slug: 'ong-kinh-canon-rf-50mm-f1-8-stm-chinh-hang', name: 'Ống kính Canon RF 50mm f/1.8 STM — Chính hãng', brand: 'Canon', category: 'ong-kinh',
    thumbnail: `${CDN}/image-data/san-pham/24-08/24-08-03/240803094047373/avatar/638847186653427391_canon-rf-50mm-f1-8-stm-chinh-hang.jpg`,
    price: 5990000, originalPrice: 5990000,
    badges: [{ type: 'hot', label: 'Best seller' }, { type: 'new', label: 'Giá tốt' }],
    rating: { average: 4.8, count: 192 }, soldPercent: 80,
    shortSpecs: ['50mm f/1.8', 'Canon RF Mount', 'STM Motor', 'Aspherical', '160g siêu nhẹ'],
    description: 'Nifty-fifty cho hệ RF — bokeh mịn f/1.8, motor STM mượt mà, kích thước nhỏ gọn chỉ 160g lý tưởng cho portrait hàng ngày.',
  }),
  P({
    id: 'lens3', slug: 'ong-kinh-sony-fe-70-200mm-f2-8-gm-ii-oss-chinh-hang', name: 'Ống kính Sony FE 70-200mm f/2.8 GM OSS II — Chính hãng', brand: 'Sony', category: 'ong-kinh',
    thumbnail: `${CDN}/image-data/san-pham/24-08/24-08-03/240803094242227/avatar/638692469929544019_ong-kinh-sony-fe-70-200mm-f2-8-gm-ii-oss.jpg`,
    price: 62900000, originalPrice: 62900000,
    badges: [{ type: 'hot', label: 'Flagship' }, { type: 'new', label: 'GM II' }],
    rating: { average: 5.0, count: 28 }, soldPercent: 15,
    shortSpecs: ['70-200mm f/2.8', 'Sony E Mount', 'XA + ED Elements', 'DMF + AF/MF', 'Weather-sealed'],
    description: 'Telephoto zoom flagship thế hệ II — nhẹ hơn 29%, lấy nét nhanh gấp 4x so với thế hệ trước, quang học G Master ultra-sharp.',
  }),
  P({
    id: 'lens4', slug: 'ong-kinh-nikon-z-2470-f28-s-ii', name: 'Ống kính Nikon Z 24-70mm f/2.8 S II — Chính hãng', brand: 'Nikon', category: 'ong-kinh',
    thumbnail: `${CDN}/image-data/san-pham/25-09/25-09-22/250922103851025/avatar/638941343754731632_ong-kinh-nikon-z-24-70mm-f-2-8-s-ii.jpg`,
    price: 69000000, originalPrice: 69000000,
    badges: [{ type: 'hot', label: 'Professional' }, { type: 'new', label: 'S-Line II' }],
    rating: { average: 4.9, count: 31 }, soldPercent: 10,
    shortSpecs: ['24-70mm f/2.8', 'Nikon Z Mount', 'S-Line', 'ARNEO + Nano Crystal', '11-blade iris'],
    description: 'Ống kính zoom tiêu chuẩn S-Line thế hệ II cho Nikon Z — quang học cao cấp nhất, chốngflare ARNEO + Nano Crystal, bokeh tròn 11 lá.',
  }),

  // ── ACTION CAMERA ─────────────────────────────────────────────────────
  P({
    id: 'p7', slug: 'may-quay-dji-osmo-pocket-4-creator-combo', name: 'Máy quay DJI Osmo Pocket 4 Creator Combo', brand: 'DJI', category: 'action-camera',
    thumbnail: `${CDN}/image-data/san-pham/26-03/26-03-30/260330085702564/avatar/639120324002834549-dji-pocket-4-4-2000x2000-jpg_may-quay-dji-osmo-pocket-4-creator-combo.jpg`,
    price: 14740000, originalPrice: 14740000,
    badges: [{ type: 'new', label: 'Creator' }, { type: 'hot', label: 'Bán chạy' }],
    rating: { average: 4.8, count: 142 }, soldPercent: 12,
    shortSpecs: ['Dual sensor 1-inch 50MP', '4K 120fps', 'Gimbal 3 trục', 'Màn hình xoay'],
    description: 'Cảm biến kép 1-inch 50MP, 4K 120fps, gimbal cơ học 3 trục — combo đủ đồ cho creator.',
  }),
];

export const getByCategory = (slug: string) => products.filter((p) => p.category === slug && p.thumbnail);
export const getBySlug = (slug: string) => products.find((p) => p.slug === slug) ?? null;
export const flashSaleProducts = products.filter((p) => p.soldPercent > 0).slice(0, 6);
export const searchProducts = (q: string) => {
  const s = q.toLowerCase().trim();
  if (!s) return [];
  return products.filter((p) =>
    p.name.toLowerCase().includes(s) || p.brand.toLowerCase().includes(s) ||
    (p.shortSpecs || []).some((x) => x.toLowerCase().includes(s)));
};

export const categoryBanners: Record<string, { title: string; image: string; href: string }[]> = {
  'may-anh': [
    { title: 'Sony A6700', image: `${CDN}/asset/imgs/img/banner/sonet-some_sony-a6700.png`, href: 'danh-muc#may-anh' },
    { title: 'Sony A7C II', image: `${CDN}/asset/imgs/img/banner/sonet-some_a7cii.png`, href: 'danh-muc#may-anh' },
    { title: 'Sony ZV-E10 II & ZV-1 II', image: `${CDN}/asset/imgs/img/banner/Sonet-some-zv-e10ii_zv-1ii.png`, href: 'san-pham#may-anh-sony-zve10-ii-black-body-only-chinh-hang' },
    { title: 'Sony A7 V — Ưu đãi đặt trước', image: `${CDN}/asset/imgs/img/banner/uuDai-sonya7v-DCHS.webp`, href: 'danh-muc#may-anh' },
    { title: 'Sony A7R VI', image: `${CDN}/asset/imgs/img/banner/sony-a7r-vi-1.webp`, href: 'danh-muc#may-anh' },
    { title: 'Canon EOS R50 Trắng / Đen', image: `${CDN}/asset/imgs/img/banner/canon_r50_trang_den.webp`, href: 'may-anh-canon-r50' },
    { title: 'Canon EOS R6 Mark III', image: `${CDN}/asset/imgs/img/banner/canon-r6-mark-III.webp`, href: 'san-pham#may-anh-canon-eos-r6-mark-iii-body' },
  ],
  'ong-kinh': [
    { title: 'Sony — Tết siêu chuẩn sáng tạo', image: `${CDN}/asset/imgs/img/banner/tetSieuChuansangtaoSony.webp`, href: 'danh-muc#ong-kinh' },
    { title: 'Nhận ngay hộp quà Sony', image: `${CDN}/asset/imgs/img/banner/nhan-ngay-hop-qua-sony.webp`, href: 'danh-muc#ong-kinh' },
    { title: 'Canon RF 50mm F1.4L VCM', image: `${CDN}/asset/imgs/img/banner/CANON-RF-50mm-F1.4L-VCM.webp`, href: 'danh-muc#ong-kinh' },
    { title: 'Khuyến mãi ống kính', image: `${CDN}/asset/imgs/img/banner/Km-lens.webp`, href: 'danh-muc#ong-kinh' },
    { title: 'Canon RF 45mm F1.2 STM', image: `${CDN}/asset/imgs/img/banner/RF-45mm-F1.2-STM.webp`, href: 'danh-muc#ong-kinh' },
    { title: 'Nikkor Z DX 35mm f/1.7', image: `${CDN}/asset/imgs/img/banner/NIKKOR-Z-DX-MC-35mm-f_1.7.png`, href: 'danh-muc#ong-kinh' },
    { title: 'Kase AF 85mm F1.4 Nikon Z', image: `${CDN}/asset/imgs/img/banner/LENS-KASE-AF-85mm-F1.4-FOR-NIKON-Z.webp`, href: 'danh-muc#ong-kinh' },
  ],
  'action-camera': [
    { title: 'DJI Osmo Pocket 4 Creator Combo', image: `${CDN}/asset/imgs/img/banner/Dji_osm_pocket_4.webp`, href: 'san-pham#may-quay-dji-osmo-pocket-4-creator-combo' },
    { title: 'DJI Osmo Action 6', image: `${CDN}/asset/imgs/img/banner/action-6.webp`, href: 'danh-muc#action-camera' },
    { title: 'DJI Osmo Pocket 3 Combo', image: `${CDN}/asset/imgs/img/banner/DJI-Osmo-Pocket-3.webp`, href: 'danh-muc#action-camera' },
    { title: 'Insta360 ONE RS 1-Inch 360', image: `${CDN}/image-data/san-pham/23-02/23-02-11/230211001818256/avatar/01_insta360-one-rs-1-inch-360-edition.jpg`, href: 'action-camera-insta360' },
    { title: 'DJI Osmo Nano', image: `${CDN}/asset/imgs/img/banner/DJI-OSMO-NANO-01.webp`, href: 'danh-muc#action-camera' },
    { title: 'DJI Osmo Action 5 Pro', image: `${CDN}/asset/imgs/img/banner/action5pro.webp`, href: 'danh-muc#action-camera' },
  ],
  'flycam': [
    { title: 'DJI Mini 5 Pro', image: `${CDN}/asset/imgs/img/banner/dji-mini-5-pro.webp`, href: 'san-pham#dji-mini-5-pro-base-chinh-hang' },
    { title: 'DJI Mavic 4 Pro', image: `${CDN}/asset/imgs/img/banner/Mavic-4-Pro.webp`, href: 'san-pham#dji-mavic-4-pro-512gb-creator-combo' },
    { title: 'DJI Mini 4K Fly More Combo', image: `${CDN}/asset/imgs/img/banner/FLYCAM-DJI-MINI-4K-FLY-MORE-COMBO.webp`, href: 'flycam-dji' },
    { title: 'DJI Avata 2 Fly More', image: `${CDN}/asset/imgs/img/banner/dji-avata-2.webp`, href: 'danh-muc#flycam' },
    { title: 'DJI Neo', image: `${CDN}/asset/imgs/img/banner/1200x400DJI_Neo.webp`, href: 'danh-muc#flycam' },
    { title: 'DJI Mini 4 Pro Fly More', image: `${CDN}/asset/imgs/img/banner/1200X400_Flycam_DJI_Mini_4-Pro_Fly_More.webp`, href: 'danh-muc#flycam' },
  ],
  'may-quay-phim': [
    { title: 'DJI Osmo Pocket 4 Creator Combo', image: `${CDN}/asset/imgs/img/banner/Dji_osm_pocket_4.webp`, href: 'san-pham#may-quay-dji-osmo-pocket-4-creator-combo' },
    { title: 'DJI Osmo Pocket 3 Combo', image: `${CDN}/asset/imgs/img/banner/DJI-Osmo-Pocket-3.webp`, href: 'danh-muc#may-quay-phim' },
    { title: 'Sony Cinema Line', image: `${CDN}/asset/imgs/img/banner/sony-uu-dai-thang-1.webp`, href: 'danh-muc#may-quay-phim' },
  ],
  'thiet-bi-studio': [
    { title: 'Thiết bị studio chuyên nghiệp', image: `${CDN}/asset/imgs/img/danhMuc_thietBiStudio.webp`, href: 'danh-muc#thiet-bi-studio' },
    { title: 'Combo đèn LED · Softbox', image: `${CDN}/asset/imgs/img/danhMuc_setupPhong.webp`, href: 'danh-muc#thiet-bi-studio' },
  ],
  'phu-kien': [
    { title: 'Phụ kiện máy ảnh đa dạng', image: `${CDN}/asset/imgs/img/danhMuc_phuKien.webp`, href: 'danh-muc#phu-kien' },
    { title: 'Filter · Hood · Bag', image: `${CDN}/asset/imgs/img/danhMuc_phuKien.webp`, href: 'danh-muc#phu-kien' },
  ],
  'san-pham-cu': [
    { title: 'Sản phẩm cũ like-new', image: `${CDN}/asset/imgs/img/danhMuc_spCu.webp`, href: 'danh-muc#san-pham-cu' },
  ],
  'flash-sale': [
    { title: 'Flash Sale Flycam — Bỏ túi DJI Neo', image: `${CDN}/asset/imgs/img/1200x200_flycam.png`, href: 'danh-muc#flycam' },
    { title: 'Ống kính Sony — Tết siêu chuẩn sáng tạo', image: `${CDN}/asset/imgs/img/banner/tetSieuChuansangtaoSony.webp`, href: 'danh-muc#ong-kinh' },
    { title: 'Sony ưu đãi tháng 1', image: `${CDN}/asset/imgs/img/banner/sony-uu-dai-thang-1.webp`, href: 'danh-muc#ong-kinh' },
  ],
};

export const getCategoryBanners = (slug: string) => {
  if (slug === 'tat-ca') {
    return ['may-anh', 'flycam', 'action-camera', 'ong-kinh'].flatMap((k) => (categoryBanners[k] || []).slice(0, 2));
  }
  return categoryBanners[slug] || [];
};

export interface Experience {
  key: string;
  href: string;
  label: string;
  productSlug: string;
  title: string;
  tagline: string;
  stat: string;
}

// ── 3 dòng trải nghiệm 3D ──────────────────────────────────────────────
export const experiences: Experience[] = [
  {
    key: 'flycam', href: 'flycam-dji', label: 'Flycam — Drone',
    productSlug: 'flycam-dji-mavic-air-2-chinh-hang',
    title: 'DJI Mavic Air 2', tagline: 'Bầu trời trong tầm tay. 4K 60fps.',
    stat: '34 phút bay · OcuSync 10km',
  },
  {
    key: 'action', href: 'action-camera-insta360', label: 'Camera hành động',
    productSlug: 'insta360-one-rs-1-inch-360-edition',
    title: 'Insta360 ONE RS 1-Inch', tagline: 'Quay 360°. Cảm biến 1-inch Leica.',
    stat: '6K 360° · FlowState · IPX8',
  },
  {
    key: 'camera', href: 'may-anh-canon-r50', label: 'Máy ảnh Mirrorless',
    productSlug: 'canon-eos-r50-black-kem-lens-rfs-1845-chinh-hang',
    title: 'Canon EOS R50', tagline: 'Nhỏ gọn. Mạnh mẽ. Sáng tạo không giới hạn.',
    stat: 'APS-C 24.2MP · 4K 30p · 375g',
  },
];

export const getProductUrl = (slug: string) => {
  if (slug === 'canon-eos-r50-black-kem-lens-rfs-1845-chinh-hang') {
    return 'may-anh-canon-r50';
  }
  if (slug === 'flycam-dji-mavic-air-2-chinh-hang') {
    return 'flycam-dji';
  }
  if (slug === 'insta360-one-rs-1-inch-360-edition') {
    return 'action-camera-insta360';
  }
  return `san-pham#${slug}`;
};
