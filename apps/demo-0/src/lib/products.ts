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

export type Product = {
  id: string;
  name: string;
  tagline: string;
  price: number;
  originalPrice: number;
  discountPercent: number;
  rating: number;
  reviewCount: number;
  soldCount: number;
  colors: ProductColor[];
  specs: Spec[];
  callouts: SpecCallout[];
  image: string;
  // --- Real scraped data ---
  description: string;
  badges: string[];
  highlights: string[];
  promotions: string[];
  stockStatus: string;
  galleryImages: string[];
  includedItems: string[];
  warrantyMonths: number;
};

export const products: Product[] = [
  // ── Canon EOS R50 ──────────────────────────────────────────────────────────
  // Source: docs/scraped/pdp-canon-r50.json (scraped 2026-07-10)
  {
    id: 'canon-eos-r50',
    name: 'Canon EOS R50 Black + RF-S 18-45mm',
    tagline: 'Nhỏ gọn. Mạnh mẽ. Sáng tạo không giới hạn.',
    price: 17_500_000,
    originalPrice: 21_990_000,
    discountPercent: 20,
    rating: 4.9,
    reviewCount: 128,
    soldCount: 342,
    colors: [
      { name: 'Trắng', hex: '#f0ede8' },
      { name: 'Đen', hex: '#1c1c1c' },
    ],
    specs: [
      { label: 'Cảm biến', value: 'CMOS APS-C, 24.2 Megapixel' },
      { label: 'Kích thước ảnh', value: '6000 x 4000 pixel' },
      { label: 'Bộ xử lý', value: 'DIGIC X' },
      { label: 'Dải ISO', value: '100 – 32,000 (mở rộng 51,200)' },
      { label: 'Tốc độ màn trập', value: '1/4000 – 30 giây, Bulb' },
      { label: 'Chụp liên tục', value: 'Tối đa 15 fps (màn trập điện tử)' },
      { label: 'Lấy nét tự động', value: 'Dual Pixel CMOS AF II, 4,503 điểm' },
      { label: 'Lens Mount', value: 'Canon RF' },
      { label: ' Quay video', value: '4K 30fps; Full HD 120fps' },
      { label: 'Khung ngắm', value: 'EVF 2.36 triệu điểm, 0.95x' },
      { label: 'Màn hình', value: 'LCD xoay lật cảm ứng 3.0 inch' },
      { label: 'Kết nối', value: 'Wi-Fi, Bluetooth, USB-C, micro HDMI' },
      { label: 'Thẻ nhớ', value: '1 khe SD/SDHC/SDXC (UHS-II)' },
      { label: 'Pin', value: 'LP-E17, ~370 ảnh/lần sạc' },
      { label: 'Trọng lượng', value: '375g (body only)' },
    ],
    callouts: [
      { label: 'Cảm biến', value: 'APS-C 24.2MP CMOS', target: 'Sensor' },
      { label: 'Bộ xử lý', value: 'DIGIC X', target: 'Body' },
      { label: 'Dải ISO', value: '100 – 32,000', target: 'Dial' },
      { label: 'Tốc độ chụp', value: '15 fps liên tục', target: 'Lens' },
    ],
    image:
      'https://mayanhvietnam.com/image-data/san-pham/24-12/24-12-28/241228112737843/avatar/638709822567106100_may-anh-canon-eos-r50-black-kem-lens-rf-s-18-45mm-chinh-hang.jpg',
    // Real scraped fields
    description:
      'Canon EOS R50 là chiếc máy ảnh lý tưởng cho người yêu nhiếp ảnh. Nhỏ gọn, tinh tế, trọng lượng nhẹ, phù hợp cho người mới bắt đầu và chuyên nghiệp. Cảm biến 24.2MP, quay video 4K, Dual Pixel CMOS AF II 4.503 điểm, chụp liên tiếp 15fps, Wi-Fi và Bluetooth.',
    badges: ['MỚI 100%', 'CHÍNH HÃNG', 'Like new (2)', 'Ngoại hình Đẹp (1)'],
    highlights: [
      'Cảm biến CMOS APS-C 24,2MP',
      'Bộ xử lý DIGIC X',
      'Quay video 4K 30p không crop',
      ' Quay khung dọc dễ dàng',
    ],
    promotions: [
      '🎁 Tặng ngay thẻ nhớ 32Gb',
      '🛡️ Dán màn hình free trọn đời máy ảnh',
    ],
    stockStatus: 'Còn hàng',
    galleryImages: [
      'https://mayanhvietnam.com/image-data/san-pham/24-12/24-12-28/241228112737843/avatar/638709822567106100_may-anh-canon-eos-r50-black-kem-lens-rf-s-18-45mm-chinh-hang.jpg',
      'https://mayanhvietnam.com/image-data/san-pham/24-12/24-12-28/241228112737843/hinh-preview/638791169636370514.jpg',
      'https://mayanhvietnam.com/image-data/san-pham/24-12/24-12-28/241228112737843/hinh-preview/638791170527514307.jpg',
      'https://mayanhvietnam.com/image-data/san-pham/24-12/24-12-28/241228112737843/hinh-preview/638791171408544923.jpg',
      'https://mayanhvietnam.com/image-data/san-pham/24-12/24-12-28/241228112737843/hinh-preview/638791171877903330.jpg',
      'https://mayanhvietnam.com/image-data/san-pham/24-12/24-12-28/241228112737843/hinh-preview/638791172399984092.jpg',
      'https://mayanhvietnam.com/image-data/san-pham/24-12/24-12-28/241228112737843/hinh-preview/638791173356043506.jpg',
      'https://mayanhvietnam.com/image-data/san-pham/24-12/24-12-28/241228112737843/hinh-preview/638791174153167452.jpg',
      'https://mayanhvietnam.com/image-data/san-pham/24-12/24-12-28/241228112737843/hinh-preview/638791174490011075.jpg',
      'https://mayanhvietnam.com/image-data/san-pham/24-12/24-12-28/241228112737843/hinh-preview/638791175066496149.jpg',
    ],
    includedItems: [
      'Canon EOS R50 Mirrorless Camera (Black)',
      'Pin LP-E17',
      'Sạc LC-E17',
      'Nắp body R-F-5',
      'Dây đeo EM-200DB',
      'Lens RF-S 18-45mm f/4.5-6.3 IS STM',
      'Nắp lens E-49',
      'Lens Dust Cap RF',
    ],
    warrantyMonths: 12,
  },

  // ── Sony Alpha A7 IV ────────────────────────────────────────────────────────
  // Source: docs/scraped/pdp-sony-a7iv.json (scraped 2026-07-10)
  {
    id: 'sony-a7-iv',
    name: 'Sony Alpha A7 Mark IV (Body Only)',
    tagline: 'Chuyên nghiệp. Đỉnh cao. Toàn diện.',
    price: 47_500_000,
    originalPrice: 54_900_000,
    discountPercent: 13,
    rating: 4.9,
    reviewCount: 89,
    soldCount: 156,
    colors: [
      { name: 'Đen', hex: '#1c1c1c' },
    ],
    specs: [
      { label: 'Cảm biến', value: 'Full Frame CMOS 35.9 x 23.9mm, 33 Megapixel' },
      { label: 'Bộ xử lý', value: 'BIONZ XR' },
      { label: 'Dải ISO', value: '100-51,200 (mở rộng 50-204,800)' },
      { label: 'Tốc độ màn trập', value: '1/8000 – 30 giây, Bulb' },
      { label: 'Chụp liên tục', value: 'Lên đến 10 fps, tối đa 828 ảnh RAW' },
      { label: 'Lấy nét tự động', value: '759 điểm pha + 425 tương phản' },
      { label: 'Chống rung', value: 'Sensor-Shift, 5-Trục IBIS' },
      { label: 'Lens Mount', value: 'Sony E' },
      { label: ' Quay video', value: 'UHD 4K, Full HD chuyên nghiệp' },
      { label: 'Khung ngắm', value: 'OLED EVF 3,680,000 điểm, 0.78x' },
      { label: 'Màn hình', value: 'LCD cảm ứng nghiêng tự do 3.0 inch' },
      { label: 'Thẻ nhớ', value: 'CFexpress Type A / SD (UHS-II)' },
      { label: 'Pin', value: 'NP-FZ100, ~520 ảnh/lần sạc' },
      { label: 'Kết nối', value: 'HDMI A, USB-C 3.2 Gen 2, Wi-Fi/Bluetooth' },
      { label: 'Trọng lượng', value: '658g (có pin + bộ nhớ)' },
    ],
    callouts: [
      { label: 'Cảm biến', value: 'Full Frame 33MP Exmor R', target: 'Sensor' },
      { label: 'Bộ xử lý', value: 'BIONZ XR', target: 'Body' },
      { label: 'Lấy nét AI', value: '759 điểm AF', target: 'Lens' },
      { label: ' Quay video', value: '4K UHD chuyên nghiệp', target: 'Dial' },
    ],
    image:
      'https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-10/230210223540859/avatar/01_may-anh-sony-alpha-a7-mark-iv-body-only-chinh-hang.jpg',
    description:
      'Sony Alpha A7 Mark IV là sản phẩm chuyên nghiệp, thiết kế tinh tế, công nghệ hiện đại. Cảm biến full-frame độ phân giải cao, hệ thống AF nhanh chính xác, quay video 4K chuyên nghiệp, Wi-Fi/Bluetooth, GPS.',
    badges: ['MỚI 100%', 'CHÍNH HÃNG', 'Like new (1)'],
    highlights: [
      '759 điểm lấy nét pha + 425 tương phản',
      'BIONZ XR — bộ xử lý thế hệ mới',
      'Cảm biến Exmor R 33MP Full Frame',
      '10fps liên tục, ISO 100-51,200',
    ],
    promotions: [
      '🎁 Tặng thẻ nhớ chuyên nghiệp',
      '📦 Ship toàn quốc nhanh chóng',
    ],
    stockStatus: 'Còn hàng',
    galleryImages: [
      'https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-10/230210223540859/avatar/01_may-anh-sony-alpha-a7-mark-iv-body-only-chinh-hang.jpg',
      'https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-10/230210223540859/hinh-preview/638791980436673135.jpg',
      'https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-10/230210223540859/hinh-bai-viet/638791981572649806.jpg',
      'https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-10/230210223540859/hinh-bai-viet/638791982369927579.jpg',
      'https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-10/230210223540859/hinh-bai-viet/638791983493111254.jpg',
      'https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-10/230210223540859/hinh-bai-viet/638791984119120066.jpg',
    ],
    includedItems: [
      'Sony A7 IV body',
      'Pin NP-FZ100',
      'Sạc AC',
      'Nắp ALC-B1EM',
      'Dây đeo',
      'Accessory Shoe Cap',
      'Eyepiece Cup',
      'Cáp USB-C',
    ],
    warrantyMonths: 12,
  },

  // ── Sony A7C II ─────────────────────────────────────────────────────────────
  {
    id: 'sony-a7c-ii',
    name: 'Sony A7C II Silver',
    tagline: 'Full-frame trong lòng bàn tay.',
    price: 46_990_000,
    originalPrice: 51_990_000,
    discountPercent: 10,
    rating: 4.8,
    reviewCount: 96,
    soldCount: 215,
    colors: [
      { name: 'Đen', hex: '#1c1c1c' },
      { name: 'Bạc', hex: '#c0c0c0' },
    ],
    specs: [
      { label: 'Cảm biến', value: 'Full Frame 33.0MP Exmor R CMOS' },
      { label: 'Bộ xử lý', value: 'BIONZ XR' },
      { label: 'Dải ISO', value: '100-51,200 (mở rộng 50-204,800)' },
      { label: 'Chống rung', value: 'IBIS 5-trục, 7 stops' },
      { label: 'Lấy nét AI', value: 'AI-based AF, 759 điểm' },
      { label: ' Quay video', value: '4K 60p, S-Log3, S-Cinetone' },
      { label: 'Khung ngắm', value: 'OLED EVF 2.36M điểm' },
      { label: 'Màn hình', value: 'LCD cảm ứng nghiêng 3.0 inch' },
      { label: 'Trọng lượng', value: '514g (body)' },
      { label: 'Thẻ nhớ', value: '1 khe SD UHS-II' },
      { label: 'Pin', value: 'NP-FZ100, ~540 ảnh/lần sạc' },
      { label: 'Kết nối', value: 'USB-C 3.2, Wi-Fi 5GHz, Bluetooth' },
    ],
    callouts: [
      { label: 'Cảm biến', value: 'Full-frame 33.0MP Exmor R', target: 'Sensor' },
      { label: 'Bộ xử lý', value: 'BIONZ XR', target: 'Body' },
      { label: 'Lấy nét AI', value: '759 điểm AF', target: 'Lens' },
      { label: ' Quay video', value: '4K 60p', target: 'Dial' },
    ],
    image: '/images/sony-a7c-ii.png',
    description:
      'Sony A7C II là máy ảnh full-frame nhỏ gọn nhất trong dòng Alpha, kết hợp cảm biến 33MP với bộ xử lý BIONZ XR và AI AF thông minh. Thiết kế mang đậm phong cách rangefinder, phù hợp cho nhiếp ảnh gia du lịch và sáng tạo nội dung.',
    badges: ['MỚI 100%', 'CHÍNH HÃNG'],
    highlights: [
      'Cảm biến Full Frame 33MP Exmor R',
      'BIONZ XR — AI AF 759 điểm',
      'IBIS 5-trục 7 stops',
      ' Quay video 4K 60p chuyên nghiệp',
    ],
    promotions: [
      '🎁 Tặng thẻ nhớ 128GB UHS-II',
      '📦 Ship toàn quốc nhanh chóng',
    ],
    stockStatus: 'Còn hàng',
    galleryImages: [], // No scraped gallery for A7C II
    includedItems: [
      'Sony A7C II body',
      'Pin NP-FZ100',
      'Sạc BC-QZ1',
      'Nắp body',
      'Dây đeo',
      'Cáp USB-C',
    ],
    warrantyMonths: 12,
  },

  // ── Fujifilm X-T5 ───────────────────────────────────────────────────────────
  // Kept as-is (no scraped data available)
  {
    id: 'fujifilm-x-t5',
    name: 'Fujifilm X-T5 (Body)',
    tagline: 'Chất phim cổ điển. Công nghệ đỉnh cao.',
    price: 35_990_000,
    originalPrice: 40_990_000,
    discountPercent: 12,
    rating: 4.9,
    reviewCount: 154,
    soldCount: 287,
    colors: [
      { name: 'Đen', hex: '#1c1c1c' },
      { name: 'Bạc', hex: '#d4d4d4' },
      { name: 'Xanh dương', hex: '#2d4a6f' },
    ],
    specs: [
      { label: 'Cảm biến', value: 'APS-C 40.2MP X-Trans CMOS 5 HR' },
      { label: 'Bộ xử lý', value: 'X-Processor 5' },
      { label: 'Dải ISO', value: '125 – 12,800 (mở rộng 64-51,200)' },
      { label: 'Chống rung', value: 'IBIS 7 stops (5 trục)' },
      { label: 'Giả lập màu phim', value: '19 chế độ màu phim đặc trưng' },
      { label: ' Quay video', value: '6.2K 30p, 4K 60p, F-Log2' },
      { label: 'Khung ngắm', value: 'OLED EVF 3.69M điểm, 0.8x' },
      { label: 'Màn hình', value: 'LCD cảm ứng nghiêng 3.0 inch' },
      { label: 'Trọng lượng', value: '557g (body)' },
      { label: 'Thẻ nhớ', value: '2 khe SD UHS-II' },
    ],
    callouts: [
      { label: 'Cảm biến', value: '40.2MP X-Trans CMOS 5 HR', target: 'Sensor' },
      { label: 'Bộ xử lý', value: 'X-Processor 5', target: 'Body' },
      { label: 'Giả lập màu phim', value: '19 chế độ đặc trưng', target: 'Dial' },
      { label: ' Quay video', value: '6.2K 30p', target: 'Lens' },
    ],
    image: '/images/fujifilm-x-t5.png',
    description:
      'Fujifilm X-T5 là máy ảnh mirrorless cao cấp với cảm biến X-Trans 40.2MP, bộ xử lý X-Processor 5, và 19 chế độ giả lập màu phim đặc trưng của Fujifilm. Thiết kế rangefinder cổ điển kết hợp công nghệ hiện đại.',
    badges: ['MỚI 100%', 'CHÍNH HÃNG'],
    highlights: [
      'Cảm biến X-Trans 40.2MP — độ phân giải cao nhất lớp APS-C',
      'X-Processor 5 — xử lý nhanh, tiết kiệm pin',
      '19 chế độ màu phim đặc trưng Fujifilm',
      ' Quay 6.2K 30p, 4K 60p chuẩn điện ảnh',
    ],
    promotions: [
      '🎁 Tặng thẻ nhớ 64GB',
      '🛡️ Bảo hành 24 tháng chính hãng',
    ],
    stockStatus: 'Còn hàng',
    galleryImages: [], // No scraped gallery for X-T5
    includedItems: [
      'Fujifilm X-T5 body',
      'Pin NP-W235',
      'Sạc BC-W235',
      'Nắp body',
      'Dây đeo',
      'Cáp USB-C',
    ],
    warrantyMonths: 24,
  },
];

export function formatVND(amount: number): string {
  return `${amount.toLocaleString('vi-VN')}đ`;
}
