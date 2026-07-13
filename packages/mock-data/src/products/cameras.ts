import type { ProductSummary } from '../types';
import { imgs, COMMON_HOTLINE, buildArticle, r50Paths, a7ivPaths, r6m2Paths, z6iiiPaths } from './utils';

const CDN = 'https://mayanhvietnam.com';

export const cameras: ProductSummary[] = [
  // ── 1. Canon EOS R6 Mark II ──────────────────────────────────────────────
  {
    id: 'p1',
    slug: 'canon-eos-r6-mark-ii-body-only',
    name: 'Máy ảnh Canon EOS R6 Mark II (Body only) — Chính hãng',
    thumbnail: r6m2Paths.avatar,
    images: imgs(r6m2Paths.avatar, r6m2Paths.previews, 'Canon EOS R6 Mark II'),
    price: 40500000,
    originalPrice: 40500000,
    badges: [{ type: 'hot', label: 'Bán chạy' }, { type: 'new', label: 'Mới 100%' }],
    rating: { average: 4.9, count: 312 },
    isUsed: false,
    brand: 'Canon',
    mount: 'Canon RF',
    availability: 'in_stock',
    category: 'may-anh',
    shortSpecs: [
      'Full-frame 24.2MP',
      'DIGIC X',
      '4K 60fps',
      'IBIS 5-Axis 8 stops',
      'Dual SD UHS-II',
      'Burst 12/40fps',
      'Dual Pixel AF II 1053 vùng',
      'Pin LP-E6NH ~760 ảnh',
    ],
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
    specs: [
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
          { label: 'Full HD', value: '120p / 60p / 30p' },
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
    ],
    packageIncludes: [
      '1× Thân máy Canon EOS R6 Mark II',
      '1× Pin LP-E6NH',
      '1× Sạc LC-E6',
      '1× Dây đeo',
      '1× Cáp USB',
      'Sách hướng dẫn sử dụng + Phiếu bảo hành chính hãng',
    ],
    article: buildArticle({
      title: 'Đánh giá Canon EOS R6 Mark II — Full-frame hiệu năng cao',
      readTime: 10,
      sections: [
        { heading: 'Tổng quan', content: 'Canon EOS R6 Mark II là thế hệ nâng cấp toàn diện từ R6 gốc, với cảm biến CMOS full-frame 24.2MP kết hợp DIGIC X cho phép chụp liên tiếp lên đến 40fps ở chế độ electronic shutter. Đây là máy ảnh hybrid lý tưởng cho nhiếp ảnh gia cần tốc độ cao và video 4K 60fps.' },
        { heading: 'Hệ thống AF và chụp ảnh', content: 'Dual Pixel CMOS AF II với 1053 vùng lấy nét bao phủ ~100% khung hình, hỗ trợ Eye AF nhận diện người, động vật và phương tiện. Dải ISO 100–102400 mở rộng lên 204800. IBIS 5 trục hỗ trợ đến 8 stops — mạnh nhất lịch sử EOS.' },
        { heading: 'Quay video', content: '4K 60p không crop, Full HD 120p slow motion. Hỗ trợ Canon Log 3, HDR PQ. Time-lapse 4K tích hợp sẵn. Microphone stereo 48kHz 16-bit cho âm thanh chất lượng cao.' },
        { heading: 'Ưu và nhược điểm', content: '**Ưu điểm:** Chất lượng ảnh出色 với DIGIC X. Burst 40fps electronic. IBIS 8 stops mạnh nhất. 4K 60p không crop. Pin LP-E6NH dung lượng lớn.\n\n**Nhược điểm:** Chỉ có 1 khe CFexpress Type B. Không có 8K video. Giá cao hơn R6 gốc.' },
        { heading: 'Kết luận', content: 'Canon EOS R6 Mark II là lựa chọn hàng đầu cho nhiếp ảnh gia cần hiệu năng cao trong thân máy nhỏ gọn. Với sự cân bằng giữa ảnh tĩnh 24MP và video 4K 60fps, đây là công cụ hybrid toàn diện.' },
      ],
    }),
    variants: [
      { id: 'r6m2-body', name: 'Body Only', price: 40500000 },
    ],
    sku: 'EOS-R6M2-BODY',
    hotline: COMMON_HOTLINE,
    sourceUrl: 'https://mayanhvietnam.com/san-pham/may-anh-canon-eos-r6-mark-ii-chinh-hang_may-anh-mirrorless-230210223748534',
    scrapedAt: '2026-07-09',
  },

  // ── 2. Sony A7 Mark IV ──────────────────────────────────────────────────
  {
    id: 'p2',
    slug: 'may-anh-sony-alpha-a7-mark-iv-body-only-chinh-hang',
    name: 'Máy ảnh Sony Alpha A7 Mark IV (Body Only) — Chính hãng',
    thumbnail: a7ivPaths.avatar,
    images: imgs(a7ivPaths.avatar, a7ivPaths.previews, 'Sony Alpha A7 Mark IV'),
    price: 47500000,
    originalPrice: 47500000,
    badges: [{ type: 'hot', label: 'Bán chạy' }, { type: 'new', label: 'Chính hãng' }],
    rating: { average: 4.9, count: 203 },
    isUsed: false,
    brand: 'Sony',
    mount: 'Sony E',
    availability: 'in_stock',
    category: 'may-anh',
    shortSpecs: [
      'Full-frame 33MP BSI Exmor R',
      'BIONZ XR',
      '4K 60p 10-bit 4:2:2',
      'IBIS 5-Axis 5.5 stops',
      'AF lai 759 điểm',
      'Khe CFexpress Type A + SD',
      'Wi-Fi 5 + Bluetooth 5.0',
      'EVF OLED 3.68M điểm',
    ],
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
    specs: [
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
    ],
    packageIncludes: [
      '1× Thân máy Sony A7 IV',
      '1× Pin NP-FZ100',
      '1× Sạc BC-QZ1',
      '1× Cáp USB-C',
      '1× Dây đeo vai',
      '1× Nắp body, nắp kính ngắm',
      'Sách HDSD + Phiếu bảo hành chính hãng',
    ],
    article: buildArticle({
      title: 'Đánh giá Sony Alpha A7 Mark IV — Trợ thủ đắc lực chuyên nghiệp',
      readTime: 10,
      sections: [
        { heading: 'Tổng quan', content: 'Sony Alpha A7 Mark IV là máy ảnh mirrorless full-frame hướng đến nhiếp ảnh gia chuyên nghiệp, nổi bật với thiết kế nhỏ gọn, bền bỉ và công nghệ xử lý hình ảnh tiên tiến. Cảm biến CMOS Exmor R 33MP full-frame kết hợp bộ xử lý BIONZ XR cho chất lượng ảnh xuất sắc.' },
        { heading: 'Hệ thống AF và chụp ảnh', content: 'Hệ thống lấy nét tự động 759 điểm lấy nét theo pha + 425 điểm tương phản cho khả năng bắt nét cực nhanh. ISO 100–51200 (mở rộng 50–204800), tốc độ màn trập 1/8000–30s, chụp liên tục lên đến 10fps tối đa 828 khung hình RAW. Real-time Eye AF nhận diện người, động vật, chim.' },
        { heading: 'Quay video', content: 'UHD 4K 60p 10-bit 4:2:2, Full HD 120p slow motion. Hỗ trợ S-Cinetone, S-Log2/S-Log3 cho grading chuyên nghiệp. Codec XAVC HS/S-I/S. Âm thanh AAC/LPCM stereo 48kHz.' },
        { heading: 'Ưu và nhược điểm', content: '**Ưu điểm:** Cảm biến full-frame 33MP cho ảnh chi tiết cao. Hệ thống AF 759 điểm cực nhanh. 4K 60p 10-bit 4:2:2 chất lượng cinema. EVF OLED 3.68M điểm sáng rõ.\n\n**Nhược điểm:** Chỉ 10fps burst. CFexpress Type A thẻ đắt tiền. Pin NP-FZ100 tuổi thọ trung bình.' },
        { heading: 'Kết luận', content: 'Sony A7 IV là lựa chọn xuất sắc cho nhiếp ảnh gia và videographer cần một máy ảnh hybrid toàn diện. Với 33MP, 4K 60p và hệ thống AF thông minh, đây là công cụ sáng tạo không giới hạn.' },
      ],
    }),
    variants: [
      { id: 'a7iv-body', name: 'Body Only', price: 47500000 },
      { id: 'a7iv-kit', name: 'Body + Sony FE 24-70mm F2.8 GM II', price: 86500000 },
    ],
    sku: 'ILCE-7M4-BODY',
    hotline: COMMON_HOTLINE,
    sourceUrl: 'https://mayanhvietnam.com/san-pham/may-anh-sony-alpha-a7-mark-iv-body-only-chinh-hang_may-anh-mirrorless-230210223540859',
    scrapedAt: '2026-07-09',
  },

  // ── 3. Canon EOS R50 + RF-S 18-45mm Kit ────────────────────────────────
  {
    id: 'p3a',
    slug: 'may-anh-canon-eos-r50-black-kem-lens-rfs-1845-chinh-hang',
    name: 'Máy ảnh Canon EOS R50 Black + Lens RF-S 18-45mm — Chính hãng',
    thumbnail: r50Paths.avatar,
    images: imgs(r50Paths.avatar, r50Paths.previews.slice(0, 9), 'Canon EOS R50 Kit'),
    price: 17500000,
    originalPrice: 19900000,
    badges: [{ type: 'hot', label: 'Bán chạy' }, { type: 'sale', label: '-12%' }],
    rating: { average: 4.8, count: 156 },
    isUsed: false,
    brand: 'Canon',
    mount: 'Canon RF',
    availability: 'in_stock',
    category: 'may-anh',
    shortSpecs: [
      'APS-C CMOS 24.2MP',
      'DIGIC X',
      'Dual Pixel CMOS AF II 4503 điểm',
      '4K 30fps không crop',
      'RF-S Mount',
      'LCD xoay lật 3"',
      '15fps electronic',
      'Body 375g nhẹ nhất dòng EOS R',
    ],
    description:
      'Canon EOS R50 là máy ảnh mirrorless APS-C nhỏ gọn nhất dòng EOS R, thân máy chỉ 375g. Cảm biến 24.2MP, DIGIC X, Dual Pixel CMOS AF II nhận diện mắt/động vật, quay 4K 30fps không crop.',
    highlights: [
      'Cảm biến APS-C CMOS 24.2MP + DIGIC X',
      'Dual Pixel CMOS AF II — nhận diện mắt, động vật',
      '4K 30fps không crop — ảnh 15fps',
      'Body nhẹ 375g — nhỏ gọn nhất dòng EOS R',
      'LCD cảm ứng 3" Vari-angle selfie-friendly',
      'Wi-Fi + Bluetooth tích hợp — chia sẻ nhanh',
    ],
    specs: [
      {
        group: 'Cảm biến & Xử lý',
        items: [
          { label: 'Loại cảm biến', value: 'APS-C CMOS' },
          { label: 'Độ phân giải', value: '24.2 Megapixel' },
          { label: 'Bộ xử lý', value: 'DIGIC X' },
          { label: 'Kích thước ảnh', value: '6000 × 4000 pixel' },
        ],
      },
      {
        group: 'Lấy nét',
        items: [
          { label: 'Hệ thống AF', value: 'Dual Pixel CMOS AF II' },
          { label: 'Điểm AF', value: '651 điểm theo pha' },
          { label: 'Eye AF', value: 'Người + Động vật' },
        ],
      },
      {
        group: 'Chụp ảnh',
        items: [
          { label: 'Tốc độ màn trập', value: '1/4000 - 30s, Bulb' },
          { label: 'Burst rate', value: '15 fps (electronic shutter)' },
          { label: 'Dải ISO', value: '100 - 32000 (mở rộng 51200)' },
        ],
      },
      {
        group: 'Video',
        items: [
          { label: '4K UHD', value: '30p không crop' },
          { label: 'Full HD', value: '120p / 60p / 30p' },
        ],
      },
      {
        group: 'Ống kính kèm theo',
        items: [
          { label: 'Lens', value: 'RF-S 18-45mm f/4.5-6.3 IS STM' },
          { label: 'Mount', value: 'Canon RF (APS-C)' },
          { label: 'Filter size', value: '49mm' },
        ],
      },
      {
        group: 'Màn hình & Kết nối',
        items: [
          { label: 'LCD', value: '3.0" cảm ứng xoay lật, 1.62M điểm' },
          { label: 'Viewfinder', value: 'EVF 2.36M điểm, 0.95×' },
          { label: 'Kết nối', value: 'Wi-Fi, Bluetooth' },
        ],
      },
      {
        group: 'Vật lý',
        items: [
          { label: 'Trọng lượng', value: '375g (body) / ~510g (with lens)' },
          { label: 'Kích thước', value: '116.3 × 85.5 × 68.8 mm' },
          { label: 'Pin', value: 'LP-E17, khoảng 310 ảnh/charge' },
        ],
      },
    ],
    packageIncludes: [
      '1× Thân máy Canon EOS R50',
      '1× Lens RF-S 18-45mm f/4.5-6.3 IS STM',
      '1× Pin LP-E17',
      '1× Sạc LC-E17',
      '1× Dây đeo',
      'Bao đựng + Phiếu bảo hành chính hãng',
    ],
    article: buildArticle({
      title: 'Đánh giá Canon EOS R50 — Chi tiết từ A đến Z',
      readTime: 8,
      sections: [
        { heading: 'Tổng quan', content: 'Canon EOS R50 là chiếc máy ảnh mirrorless lý tưởng cho người yêu nhiếp ảnh đang tìm kiếm một sản phẩm mạnh mẽ, dễ sử dụng và hiện đại. Với cảm biến APS-C 24.2MP, DIGIC X và Dual Pixel CMOS AF II, Canon R50 mang lại trải nghiệm tuyệt vời trong mọi chuyến chụp.' },
        { heading: 'Thiết kế và chất lượng xây dựng', content: 'Kiểu dáng hiện đại, phù hợp với xu hướng thiết kế tối giản. Các chi tiết được chế tác tỉ mỉ, tạo cảm giác chắc chắn. Trọng lượng chỉ 375g (body) — nhỏ gọn nhất dòng EOS R. Màn hình LCD xoay lật cảm ứng hỗ trợ selfie và quay vlog.' },
        { heading: 'Tính năng và hiệu năng', content: 'Trang bị cảm biến CMOS APS-C 24.2MP với DIGIC X, AF Dual Pixel CMOS AF II lên tới 4503 điểm, chụp liên tiếp 15fps, quay video 4K 30p không crop. Nhận diện khuôn mặt và cảnh vật tự động tối ưu hóa hình ảnh. Kết nối Wi-Fi và Bluetooth chia sẻ nhanh.' },
        { heading: 'Ưu và nhược điểm', content: '**Ưu điểm:** Nhỏ gọn 375g, AF thông minh 4503 điểm. 4K 30p không crop. LCD xoay lật selfie. Giá phải chăng cho người mới.\n\n**Nhược điểm:** Không có IBIS. EVF chỉ 2.36M điểm. Pin dung lượng trung bình.' },
        { heading: 'Kết luận', content: 'Canon EOS R50 là lựa chọn xuất sắc cho người mới bắt đầu và creator cần một chiếc máy ảnh nhỏ gọn, mạnh mẽ. Với Dual Pixel CMOS AF II, 4K video và thiết kế tiện lợi, R50 xứng đáng là sự lựa chọn hàng đầu.' },
      ],
    }),
    variants: [
      { id: 'r50-kit-1845', name: 'MỚI 100% — Kèm Lens RF-S 18-45mm', price: 17500000 },
      { id: 'r50-like-new', name: 'Like New — Ngoại hình đẹp, đầy đủ phụ kiện', price: 16790000 },
    ],
    sku: 'EOS-R50-KIT-1845',
    hotline: COMMON_HOTLINE,
    sourceUrl: 'https://mayanhvietnam.com/san-pham/may-anh-canon-eos-r50-black-kem-lens-rfs-1845-chinh-hang_may-anh-mirrorless-241228112737843',
    scrapedAt: '2026-07-10',
  },

  // ── 4. Nikon Z6 Mark III Kit ────────────────────────────────────────────
  {
    id: 'p4',
    slug: 'nikon-z6-mark-iii-kem-lens-z-2470-f4-s-chinh-hang-vic',
    name: 'Nikon Z6 Mark III Kèm Lens Z 24-70mm f/4 S (Chính hãng VIC)',
    thumbnail: z6iiiPaths.avatar,
    images: imgs(z6iiiPaths.avatar, z6iiiPaths.previews, 'Nikon Z6 Mark III Kit'),
    price: 67600000,
    originalPrice: 67600000,
    badges: [{ type: 'hot', label: 'Flagship' }, { type: 'new', label: 'Mới 100%' }],
    rating: { average: 4.9, count: 89 },
    isUsed: false,
    brand: 'Nikon',
    mount: 'Nikon Z',
    availability: 'in_stock',
    category: 'may-anh',
    shortSpecs: [
      'Full-frame 24.5MP Partially Stacked CMOS',
      'EXPEED 7',
      '6K 30p RAW / 4K 120p',
      'AF 299 điểm hybrid 3D-tracking',
      'IBIS 8 stops',
      'EVF 5760k-dot 4000 nits',
      'Khe thẻ kép microSD',
      'Pin EN-EL15c',
    ],
    description: 'Nikon Z6 Mark III là máy ảnh mirrorless full-frame cao cấp với cảm biến 24.5MP Partially Stacked CMOS kết hợp bộ xử lý EXPEED 7, hệ thống lấy nét hybrid 299 điểm với 3D-tracking lần đầu trên dòng Z6, quay video 6K 30p RAW nội bộ và 4K 120p slow motion.',
    highlights: [
      'Cảm biến Partially Stacked 24.5MP — đọc nhanh hơn Z6 II 3.5 lần',
      'Bộ xử lý EXPEED 7 — thừa hưởng từ Z8/Z9',
      'Quay video 6K 30p RAW nội bộ (N-RAW, ProRes RAW)',
      '4K UHD 120p slow motion — không crop',
      'AF 299 điểm hybrid + 3D-tracking (lần đầu trên Z6)',
      'EVF 4000 nits sáng nhất thế giới, 5760k-dot',
      'IBIS 5 trục — tối đa 8 stops',
      'Thời gian ghi video liên tục 125 phút',
    ],
    specs: [
      {
        group: 'Cảm biến & Xử lý',
        items: [
          { label: 'Loại cảm biến', value: 'Partially Stacked BSI CMOS' },
          { label: 'Độ phân giải', value: '24.5 Megapixel' },
          { label: 'Bộ xử lý', value: 'EXPEED 7' },
          { label: 'Dải ISO', value: '100 – 64000 (mở rộng 50 – 256000)' },
          { label: 'Ảnh tĩnh độ phân giải cao', value: 'Up to 96MP (chế độ HR)' },
        ],
      },
      {
        group: 'Lấy nét',
        items: [
          { label: 'Hệ thống AF', value: 'Hybrid 299 điểm (pha + tương phản)' },
          { label: 'Nhận diện chủ thể', value: '9 loại — người, động vật, phương tiện, máy bay…' },
          { label: '3D-tracking', value: 'Có — lần đầu trên dòng Z6' },
          { label: 'Độ nhạy AF', value: '-10 EV' },
        ],
      },
      {
        group: 'Chụp ảnh',
        items: [
          { label: 'Tốc độ màn trập', value: '1/8000 - 30s, Bulb' },
          { label: 'Burst rate', value: '20 fps (electronic) / 14 fps (mechanical)' },
          { label: 'Chống rung', value: 'IBIS 5 trục — tối đa 8 stops' },
        ],
      },
      {
        group: 'Video',
        items: [
          { label: '6K RAW nội bộ', value: '30p (N-RAW, Apple ProRes RAW 12-bit)' },
          { label: '4K UHD', value: '120p / 60p / 30p — không crop' },
          { label: 'Full HD', value: '240p / 120p / 60p' },
          { label: 'Codec', value: 'N-RAW, ProRes RAW HQ, ProRes 422HQ, H.265, H.264' },
          { label: 'Thời gian ghi liên tục', value: 'Tối đa 125 phút' },
        ],
      },
      {
        group: 'Màn hình & Kính ngắm',
        items: [
          { label: 'EVF', value: 'OLED 5760k-dot (UXGA), 4000 nits — sáng nhất thế giới' },
          { label: 'LCD', value: '3.2" cảm ứng, 2.1M điểm, xoay lật đa hướng' },
        ],
      },
      {
        group: 'Lưu trữ & Kết nối',
        items: [
          { label: 'Khe 1', value: 'microSD (SDXC UHS-II)' },
          { label: 'Khe 2', value: 'microSD (SDXC UHS-II)' },
          { label: 'USB', value: 'USB-C 3.2 Gen 2' },
          { label: 'HDMI', value: 'HDMI Type A (full-size)' },
          { label: 'Wi-Fi / Bluetooth', value: 'Wi-Fi 6E + Bluetooth 5.3' },
        ],
      },
      {
        group: 'Vật lý',
        items: [
          { label: 'Pin', value: 'EN-EL15c (~410 ảnh)' },
          { label: 'Trọng lượng', value: '760g (body, có pin và thẻ)' },
          { label: 'Chống chịu thời tiết', value: 'Có — magnesium alloy' },
        ],
      },
    ],
    packageIncludes: [
      '1× Thân máy Nikon Z6 Mark III',
      '1× Lens NIKKOR Z 24-70mm f/4 S',
      '1× Pin EN-EL15c',
      '1× Sạc MH-25a',
      '1× Dây đeo',
      'Sách hướng dẫn sử dụng + Phiếu bảo hành chính hãng',
    ],
    article: buildArticle({
      title: 'Đánh giá Nikon Z6 Mark III — Hybrid flagship tầm trung',
      readTime: 10,
      sections: [
        { heading: 'Tổng quan', content: 'Nikon Z6 Mark III là máy ảnh không gương lật full-frame 24.5MP thuộc phân khúc tầm trung-cao cấp. Khác với Z6 II, thế hệ thứ ba sử dụng cảm biến BSI CMOS partially stacked hoàn toàn mới — công nghệ từng xuất hiện trên Z8 và Z9. Bộ sản phẩm đi kèm ống kính NIKKOR Z 24-70mm f/4 S mang lại giải pháp hybrid toàn diện.' },
        { heading: 'Cảm biến Partially Stacked 24.5MP', content: 'Cảm biến được thiết kế chiếu sáng sau (BSI CMOS), tốc độ đọc dữ liệu nhanh hơn Z6 II tới 3.5 lần, gần như loại bỏ hiện tượng rolling shutter. Dải ISO 100–64000, mở rộng tới 256000. Chế độ ảnh độ phân giải cao cho tệp lên tới 96MP.' },
        { heading: 'Hệ thống lấy nét tự động', content: 'Thừa hưởng gần như toàn bộ hệ thống AF từ Z8/Z9 nhờ bộ xử lý EXPEED 7. Nhận diện được 9 loại chủ thể (người, động vật, phương tiện, máy bay…) với tính năng 3D-tracking lần đầu có mặt trên dòng Z6. AF hoạt động tốt tới -10 EV, nhanh hơn Z6 II khoảng 20%.' },
        { heading: 'Quay video 6K RAW', content: 'Hỗ trợ quay RAW 12-bit nội bộ ở 6K/60p (N-RAW, Apple ProRes RAW), cùng ProRes 422HQ, H.265 và H.264. Tạo slow-motion với Full HD 240p và 4K UHD 120p. Thời gian ghi liên tục tối đa 125 phút. 4K/60p không crop là điểm dẫn đầu trong phân khúc.' },
        { heading: 'EVF sáng nhất thế giới', content: 'Kính ngắm EVF đạt độ sáng 4000 nits, độ phân giải 5760k-dot (UXGA OLED), dải màu DCI-P3. Màn hình LCD cảm ứng 3.2 inch, 2.1 triệu điểm ảnh, xoay lật đa hướng.' },
        { heading: 'Ưu và nhược điểm', content: '**Ưu điểm:** Cảm biến partially stacked mới cho tốc độ đọc cực nhanh. Hệ thống AF thừa hưởng từ Z8/Z9 với 3D-tracking. 6K RAW nội bộ hiếm có ở phân khúc tầm trung. IBIS 8 stop mạnh nhất dòng Nikon. EVF 4000 nits sáng nhất.\n\n**Nhược điểm:** Khe thẻ microSD (không phải SD full-size). Pin chỉ đạt ~410 ảnh/lần sạc. Apple ProRes RAW khó xử lý trên PC.' },
      ],
    }),
    variants: [
      { id: 'z6iii-kit', name: 'Kit Z 24-70mm f/4 S', price: 67600000 },
      { id: 'z6iii-body', name: 'Body Only', price: 58500000 },
    ],
    hotline: COMMON_HOTLINE,
    sourceUrl: 'https://mayanhvietnam.com/san-pham/nikon-z6-mark-iii-kem-lens-z-24-70-mm-f-4-s-chinh-hang-vic_may-anh-mirrorless-250520145943720',
    scrapedAt: '2026-07-10',
  },
];
