// ---------------------------------------------------------------------------
// Data layer – sourced from docs/scraped (mayanhvietnam.com 2026-07-10)
// UI/UX stays exactly the same; only content text changes.
// ---------------------------------------------------------------------------

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
  rating: number
  reviewCount: number
  isNew?: boolean
  description: string
  variants: ProductVariant[]
  /** Extra thumbnails for image gallery (in addition to main image) */
  thumbnails?: string[]
  /** Short highlights (key selling points shown as bullet list) */
  highlights?: string[]
  /** Long-form overview sections (title → HTML/markdown content) */
  overviewSections?: { title: string; content: string }[]
  /** Items included in the box */
  includedItems?: string[]
  /** Related product slugs */
  relatedSlugs?: string[]
  /** Review stats */
  ratingBreakdown?: { stars: number; percentage: number }[]
  /** Long-form review article (markdown-ish) — rendered directly on PDP as a review/article section */
  article?: {
    /** Article title (e.g. "Đánh giá Canon EOS R50 — Chi tiết từ A đến Z") */
    title: string
    /** Author display name */
    author?: string
    /** Publication date ISO string */
    publishDate?: string
    /** Estimated reading time in minutes */
    readTime?: number
    /** Cover image for the article (if different from product main image) */
    coverImage?: string
    /** Table of contents items (auto-generated from headings if omitted) */
    toc?: { id: string; label: string }[]
    /** Sections — array of content blocks rendered sequentially */
    sections: {
      /** Optional heading for this section */
      heading?: string
      /** Markdown-ish body content */
      content: string
      /** Optional images to show within this section */
      images?: string[]
    }[]
  }
}

export interface Category {
  name: string
  slug: string
  image?: string
}

// ---------------------------------------------------------------------------
// Helper — derive product gallery từ ảnh chính trên mayanhvietnam.com.
// Pattern URL: /image-data/san-pham/<MM>/<YYYY-MM-DD>/<productId>/{avatar,hinh-preview,hinh-bai-viet}/<timestamp>_<slug>.{jpg,webp,png}
// Ảnh chi tiết PDP có tên file timestamp không đoán được, nên chỉ build gallery
// khi dữ liệu đã được scrape thật (xem lib/scraped/pdp-*.json). Khi không có,
// gallery chỉ hiển thị avatar — đúng với thực tế nếu PDP gốc cũng chỉ có 1 ảnh.
// ---------------------------------------------------------------------------
function withGallery(p: Product): Product {
  // No-op nếu đã có gallery thật (chỉ apply khi thiếu)
  return p
}

// ---------------------------------------------------------------------------
// Categories — 9 items matching homepage.json category_grid
// Image URLs from docs/mayanhvietnam-image-urls.md §3 (verified CDN URLs)
// ---------------------------------------------------------------------------
export const categories: Category[] = [
  { name: 'Máy ảnh - Body', slug: 'may-anh', image: 'https://mayanhvietnam.com/asset/imgs/img/danhMuc_MayAnh.webp' },
  { name: 'Ống kính - Lens', slug: 'ong-kinh', image: 'https://mayanhvietnam.com/asset/imgs/img/danhMuc_ongkinh.webp' },
  { name: 'Máy quay phim', slug: 'may-quay-phim', image: 'https://mayanhvietnam.com/asset/imgs/img/danhMuc_mayQuayPhim.webp' },
  { name: 'Flycam - Drone', slug: 'flycam', image: 'https://mayanhvietnam.com/asset/imgs/img/danhMuc_flycam.webp' },
  { name: 'Camera hành động', slug: 'action-camera', image: 'https://mayanhvietnam.com/asset/imgs/img/danhMuc_action.webp' },
  { name: 'Thiết bị studio', slug: 'thiet-bi-studio', image: 'https://mayanhvietnam.com/asset/imgs/img/danhMuc_thietBiStudio.webp' },
  { name: 'Phụ kiện cho máy ảnh', slug: 'phu-kien', image: 'https://mayanhvietnam.com/asset/imgs/img/danhMuc_phuKien.webp' },
  { name: 'Sản phẩm cũ giá tốt', slug: 'san-pham-cu', image: 'https://mayanhvietnam.com/asset/imgs/img/danhMuc_spCu.webp' },
  { name: 'Setup phòng Studio', slug: 'setup-phong', image: 'https://mayanhvietnam.com/asset/imgs/img/danhMuc_setupPhong.webp' },
]

// ---------------------------------------------------------------------------
// Products — real data from scraped top sections + PDP detail pages
// ---------------------------------------------------------------------------
export const products: Product[] = [
  // ── Top Cameras (from homepage.json top_cameras) ────────────────────────
  {
    name: 'Canon EOS R50 Black kèm Lens RF-S 18-45mm Chính Hãng',
    slug: 'may-anh-canon-eos-r50-black-kem-lens-rfs-1845-chinh-hang',
    brand: 'Canon',
    categorySlug: 'may-anh',
    price: 17500000,
    status: 'ACTIVE',
    availability: 'IN_STOCK',
    condition: 'NEW',
    isNew: true,
    mountType: 'Canon RF',
    image: 'https://mayanhvietnam.com/image-data/san-pham/24-12/24-12-28/241228112737843/avatar/638709822567106100_may-anh-canon-eos-r50-black-kem-lens-rf-s-18-45mm-chinh-hang.jpg',
    thumbnails: [
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
    highlights: [
      'Cảm biến CMOS APS-C 24,2MP',
      'Bộ xử lý DIGIC X',
      'Quay video 4K 30p',
      'Quay khung dọc dễ dàng',
    ],
    overviewSections: [
      {
        title: 'Nhỏ gọn, mạnh mẽ',
        content: 'Canon EOS R50 là chiếc máy ảnh mirrorless lý tưởng cho người yêu nhiếp ảnh ở mọi cấp độ. Thiết kế nhỏ gọn với trọng lượng chỉ 375g (body), dễ dàng mang theo mọi nơi. Màn hình LCD xoay lật cảm ứng hỗ trợ selfie và quay vlog.',
      },
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
    rating: 4.8,
    reviewCount: 156,
    description: 'Canon EOS R50 là chiếc máy ảnh lý tưởng cho người yêu nhiếp ảnh. Nhỏ gọn, tinh tế, trọng lượng nhẹ, phù hợp cho người mới bắt đầu và chuyên nghiệp. Cảm biến 24.2MP, quay video 4K, Dual Pixel CMOS AF II 4.503 điểm, chụp liên tiếp 15fps, Wi-Fi và Bluetooth.',
    article: {
      title: 'Đánh giá Canon EOS R50 — Chi tiết từ A đến Z',
      author: 'Máy Ảnh Việt Nam',
      publishDate: '2026-07-10',
      readTime: 8,
      sections: [
        {
          heading: 'Tổng quan',
          content:
            'Canon EOS R50 là chiếc máy ảnh mirrorless lý tưởng cho người yêu nhiếp ảnh đang tìm kiếm một sản phẩm mạnh mẽ, dễ sử dụng và hiện đại. Máy ảnh này sở hữu cảm biến độ phân giải cao cùng khả năng xử lý hình ảnh nhanh chóng. Với trọng lượng nhẹ và thiết kế nhỏ gọn, Canon EOS R50 mang lại trải nghiệm tuyệt vời trong mọi chuyến chụp.',
        },
        {
          heading: 'Thiết kế và chất lượng xây dựng',
          content:
            'Kiểu dáng hiện đại, phù hợp với xu hướng thiết kế tối giản. Các chi tiết được chế tác tỉ mỉ, tạo cảm giác chắc chắn và sang trọng. Với chất liệu cao cấp, Canon EOS R50 đảm bảo độ bền vượt trội. Thiết kế chống chịu thời tiết giúp bạn yên tâm sử dụng trong điều kiện khắc nghiệt.',
        },
        {
          heading: 'Tính năng và hiệu năng',
          content:
            'Trang bị cảm biến CMOS APS-C 24.2MP với bộ xử lý DIGIC X, hệ thống lấy nét Dual Pixel CMOS AF II lên tới 4.503 điểm, chụp liên tiếp 15fps, quay video 4K 30p. Kết nối Wi-Fi và Bluetooth giúp chia sẻ ảnh nhanh chóng qua smartphone. Tính năng nhận diện khuôn mặt và cảnh vật giúp tự động tối ưu hóa hình ảnh, là trợ thủ đắc lực cho cả người mới và người có kinh nghiệm.',
        },
        {
          heading: 'Ưu và nhược điểm',
          content:
            '**Ưu điểm nổi bật:** Chất lượng hình ảnh vượt trội với cảm biến cao cấp. Thiết kế nhỏ gọn, dễ dàng mang theo. Tính năng đa dạng phù hợp với nhiều mục đích sử dụng. Kết nối thông minh qua Wi-Fi và Bluetooth.\n\n**Nhược điểm cần lưu ý:** Giá thành có thể cao đối với người mới bắt đầu. Một số tính năng chuyên sâu có thể giới hạn đối với người dùng nâng cao.',
        },
        {
          heading: 'Kết luận',
          content:
            'Canon EOS R50 là một sản phẩm tuyệt vời với thiết kế tinh tế, tính năng vượt trội và hiệu năng ổn định. Máy ảnh này không chỉ phù hợp với người mới bắt đầu mà còn đáp ứng nhu cầu của các nhiếp ảnh gia chuyên nghiệp. Với nhiều ưu điểm nổi bật, Canon EOS R50 xứng đáng là sự lựa chọn hàng đầu cho những ai đam mê nhiếp ảnh.',
        },
      ],
    },
    specs: {
      'Loại cảm biến': 'CMOS APS-C',
      'Độ phân giải': '24.2 Megapixel',
      'Kích thước ảnh': '6000 x 4000 pixel',
      'Bộ xử lý': 'DIGIC X',
      ISO: '100 – 32,000 (mở rộng lên 51,200)',
      'Tốc độ màn trập': '1/4000 giây đến 30 giây, Bulb',
      'Chụp liên tiếp': 'Tối đa 15 fps (màn trập điện tử)',
      'Điểm lấy nét': 'Lên tới 4,503 điểm (Dual Pixel CMOS AF II)',
      'Ngàm ống kính': 'Canon RF',
      'Quay video': '4K 30fps; Full HD 120fps',
      'Viewfinder': 'EVF 2.36 triệu điểm ảnh, 0.95x, 100%',
      'Màn hình': 'LCD xoay lật cảm ứng 3.0 inch, 1,620,000 điểm ảnh',
      'Kết nối': 'Wi-Fi, Bluetooth',
      'Cổng': 'Micro 3.5mm, USB-C, mini HDMI',
      'Thẻ nhớ': '1 khe SD/SDHC/SDXC (UHS-II)',
      'Trọng lượng': '375g (body only)',
      'Kích thước': '116.3 x 85.5 x 68.8 mm',
      'Pin': 'LP-E17, khoảng 370 ảnh/lần sạc',
    },
    variants: [
      { id: 'r50-kit-1845', name: 'MỚI 100% — Kèm Lens RF-S 18-45mm', price: 17500000 },
      { id: 'r50-like-new', name: 'Like New — Ngoại hình đẹp, đầy đủ phụ kiện', price: 16790000 },
    ],
  },
  {
    name: 'Nikon Z6 Mark III Kèm Lens Z 24-70mm f/4 S (Chính Hãng VIC)',
    slug: 'nikon-z6-mark-iii-kem-lens-z-2470-f4-s-chinh-hang-vic',
    brand: 'Nikon',
    categorySlug: 'may-anh',
    price: 67600000,
    status: 'ACTIVE',
    availability: 'IN_STOCK',
    condition: 'NEW',
    mountType: 'Nikon Z',
    image: 'https://mayanhvietnam.com/image-data/san-pham/25-05/25-05-20/250520145943720/avatar/638833501469480006_nikon-z6-mark-iii-kem-lens-z-24-70-mm-f-4-s-chinh-hang-vic.jpg',
    thumbnails: [
      'https://mayanhvietnam.com/image-data/san-pham/25-05/25-05-20/250520145943720/hinh-500-500/638833500169131198.jpg',
      'https://mayanhvietnam.com/image-data/san-pham/25-05/25-05-20/250520145943720/hinh-bai-viet/638845637596353687.jpg',
      'https://mayanhvietnam.com/image-data/san-pham/25-05/25-05-20/250520145943720/hinh-bai-viet/638845637596441866.jpg',
      'https://mayanhvietnam.com/image-data/san-pham/25-05/25-05-20/250520145943720/hinh-bai-viet/638845637596510106.jpg',
      'https://mayanhvietnam.com/image-data/san-pham/25-05/25-05-20/250520145943720/hinh-bai-viet/638845637596586664.jpg',
      'https://mayanhvietnam.com/image-data/san-pham/25-05/25-05-20/250520145943720/hinh-bai-viet/638845637596657659.jpg',
      'https://mayanhvietnam.com/image-data/san-pham/25-05/25-05-20/250520145943720/hinh-bai-viet/638845637596736538.jpg',
      'https://mayanhvietnam.com/image-data/san-pham/25-05/25-05-20/250520145943720/hinh-bai-viet/638845642050829049.jpg',
      'https://mayanhvietnam.com/image-data/san-pham/25-05/25-05-20/250520145943720/hinh-bai-viet/638845637596812698.jpg',
      'https://mayanhvietnam.com/image-data/san-pham/25-05/25-05-20/250520145943720/hinh-bai-viet/638845642050926684.jpg',
      'https://mayanhvietnam.com/image-data/san-pham/25-05/25-05-20/250520145943720/hinh-bai-viet/638845642051049618.jpg',
      'https://mayanhvietnam.com/image-data/san-pham/25-05/25-05-20/250520145943720/hinh-bai-viet/638845642051136129.jpg',
      'https://mayanhvietnam.com/image-data/san-pham/25-05/25-05-20/250520145943720/hinh-bai-viet/638845642051218402.jpg',
    ],
    rating: 4.9,
    reviewCount: 42,
    description: 'Nikon Z6 Mark III là máy ảnh mirrorless full-frame cao cấp với cảm biến 24.5MP kết hợp bộ xử lý EXPEED 7, hệ thống lấy nét hybrid 299 điểm, quay video 6K 30p và 4K 120p.',
    article: {
      title: 'Đánh giá Nikon Z6 Mark III — Hybrid flagship tầm trung',
      author: 'Máy Ảnh Việt Nam',
      publishDate: '2026-07-10',
      readTime: 10,
      sections: [
        {
          heading: 'Tổng quan',
          content:
            'Nikon Z6 Mark III là máy ảnh không gương lật full-frame 24.5MP thuộc phân khúc tầm trung-cao cấp. Khác với Z6 II, thế hệ thứ ba sử dụng cảm biến BSI CMOS partially stacked hoàn toàn mới do Nikon tự phát triển — công nghệ từng xuất hiện trên Z8 và Z9. Bộ sản phẩm đi kèm ống kính NIKKOR Z 24-70mm f/4 S mang lại giải pháp hybrid toàn diện.',
        },
        {
          heading: 'Cảm biến Partially Stacked 24.5MP',
          content:
            'Cảm biến được thiết kế chiếu sáng sau (BSI CMOS), tốc độ đọc dữ liệu nhanh hơn Z6 II tới **3.5 lần**, gần như loại bỏ hiện tượng rolling shutter. Dải ISO 100–64000, mở rộng tới 204800. Chế độ ảnh độ phân giải cao cho tệp lên tới 96MP.',
        },
        {
          heading: 'Hệ thống lấy nét tự động',
          content:
            'Thừa hưởng gần như toàn bộ hệ thống AF từ Z8/Z9 nhờ bộ xử lý EXPEED 7. Nhận diện được **9 loại chủ thể** (người, động vật, phương tiện, máy bay…) với tính năng 3D-tracking lần đầu có mặt trên dòng Z6. AF hoạt động tốt tới **-10 EV**, nhanh hơn Z6 II khoảng 20%.',
        },
        {
          heading: 'Quay video 6K RAW',
          content:
            'Hỗ trợ quay RAW 12-bit nội bộ ở **6K/60p** (N-RAW, Apple ProRes RAW), cùng ProRes 422HQ, H.265 và H.264. Tạo slow-motion với **Full HD 240p** và **4K UHD 120p**. Thời gian ghi liên tục tối đa **125 phút**. 4K/60p không crop là điểm dẫn đầu trong phân khúc.',
        },
        {
          heading: 'EVF sáng nhất thế giới',
          content:
            'Kính ngắm EVF đạt độ sáng **4000 nits**, độ phân giải **5760k-dot (UXGA OLED)**, dải màu DCI-P3. Màn hình LCD cảm ứng 3.2 inch, 2.1 triệu điểm ảnh, xoay lật đa hướng.',
        },
        {
          heading: 'Ưu điểm và nhược điểm',
          content:
            '**Ưu điểm:** Cảm biến partially stacked mới cho tốc độ đọc cực nhanh. Hệ thống AF thừa hưởng từ Z8/Z9 với 3D-tracking. 6K RAW nội bộ hiếm có ở phân khúc tầm trung. IBIS 8 stop mạnh nhất dòng Nikon.\n\n**Nhược điểm:** Ống kính 24-70mm f/4 thiếu VR. Pin chỉ đạt ~410 ảnh/lần sạc. Apple ProRes RAW khó xử lý trên PC.',
        },
      ],
    },
    specs: {
      'Cảm biến': 'CMOS Full-frame 24.5MP',
      'Bộ xử lý': 'EXPEED 7',
      'ISO': '100 - 64,000 (mở rộng 50 - 256,000)',
      'Chụp liên tiếp': 'Tối đa 20 fps',
      'Điểm lấy nét': '299 điểm hybrid',
      'Quay video': '6K 30p / 4K 120p',
      'Ngàm ống kính': 'Nikon Z',
      'Chống rung': 'IBIS 5 trục, tối đa 8 stops',
      'Trọng lượng': '760g (body, có pin và thẻ)',
    },
    variants: [
      { id: 'z6iii-kit', name: 'Kit Z 24-70mm f/4 S', price: 67600000 },
      { id: 'z6iii-body', name: 'Body Only', price: 58500000 },
    ],
  },
  {
    name: 'Máy ảnh Sony Alpha A7 Mark IV (Body Only) | Chính hãng',
    slug: 'may-anh-sony-alpha-a7-mark-iv-body-only-chinh-hang',
    brand: 'Sony',
    categorySlug: 'may-anh',
    price: 47500000,
    status: 'ACTIVE',
    availability: 'IN_STOCK',
    condition: 'NEW',
    mountType: 'Sony E',
    image: 'https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-10/230210223540859/avatar/01_may-anh-sony-alpha-a7-mark-iv-body-only-chinh-hang.jpg',
    thumbnails: [
      'https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-10/230210223540859/hinh-preview/638791980436673135.jpg',
      'https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-10/230210223540859/hinh-bai-viet/638791981572649806.jpg',
      'https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-10/230210223540859/hinh-bai-viet/638791982369927579.jpg',
      'https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-10/230210223540859/hinh-bai-viet/638791983493111254.jpg',
      'https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-10/230210223540859/hinh-bai-viet/638791984119120066.jpg',
      'https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-10/230210223540859/hinh-bai-viet/638802183016936589.jpg',
      'https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-10/230210223540859/hinh-bai-viet/638792101048991416.jpg',
    ],
    highlights: [
      '759 điểm lấy nét pha + 425 tương phản',
      'BIONZ XR',
      'Cảm biến Exmor R 33MP',
      '10fps, ISO 100-51200',
    ],
    overviewSections: [
      {
        title: 'Chuyên nghiệp trong tầm tay',
        content: 'Sony Alpha A7 IV là máy ảnh full-frame hybrid hoàn hảo cho cả nhiếp ảnh và quay phim. Với BIONZ XR processor thế hệ mới, hệ thống AF 759 điểm phát hiện pha, quay video 4K 60p với S-Log3, đây là công cụ đắc lực cho các chuyên gia sáng tạo nội dung.',
      },
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
    rating: 4.9,
    reviewCount: 203,
    description: 'Sony Alpha A7 Mark IV là sản phẩm chuyên nghiệp, thiết kế tinh tế, công nghệ hiện đại. Cảm biến full-frame độ phân giải cao, hệ thống AF nhanh chính xác, quay video 4K chuyên nghiệp, Wi-Fi/Bluetooth.',
    article: {
      title: 'Đánh giá Sony Alpha A7 Mark IV — Trợ thủ đắc lực chuyên nghiệp',
      author: 'Máy Ảnh Việt Nam',
      publishDate: '2026-07-10',
      readTime: 8,
      sections: [
        {
          heading: 'Tổng quan',
          content:
            'Sony Alpha A7 Mark IV là máy ảnh mirrorless full-frame hướng đến nhiếp ảnh gia chuyên nghiệp, nổi bật với thiết kế nhỏ gọn, bền bỉ và công nghệ xử lý hình ảnh tiên tiến. Cảm biến CMOS Exmor R 33MP full-frame kết hợp bộ xử lý BIONZ XR cho chất lượng ảnh xuất sắc.',
        },
        {
          heading: 'Hệ thống AF và chụp ảnh',
          content:
            'Hệ thống lấy nét tự động 759 điểm lấy nét theo pha + 425 điểm tương phản cho khả năng bắt nét cực nhanh. ISO 100–51200 (mở rộng 50–204800), tốc độ màn trập 1/8000–30s, chụp liên tục lên đến 10fps tối đa 828 khung hình RAW. Hệ thống AF không chỉ nhanh mà còn chính xác, giúp theo dõi đối tượng hiệu quả trong mọi tình huống.',
        },
        {
          heading: 'Quay video',
          content:
            'Độ phân giải UHD 4K, Full HD. Mã hóa NTSC / PAL. Âm thanh AAC, PCM tuyến tính stereo, micró tích hợp + input bên ngoài. Phù hợp sản xuất video chuyên nghiệp. Chống rung Sensor-Shift 5 trục.',
        },
        {
          heading: 'Ưu và nhược điểm',
          content:
            '**Ưu điểm:** Chất lượng ảnh xuất sắc nhờ cảm biến full-frame 33MP. Thiết kế bền bỉ chống thời tiết. Quay video 4K chuyên nghiệp. Hệ thống AF nhanh và chính xác. Kết nối Wi-Fi & Bluetooth.\n\n**Nhược điểm:** Giá thành cao. Dung lượng file lớn cần không gian lưu trữ đáng kể.',
        },
      ],
    },
    specs: {
      'Cảm biến': 'CMOS Full-frame 35.9 x 23.9 mm',
      'Độ phân giải': '33 Megapixel',
      ISO: '100-51200 (Mở rộng: 50-204800)',
      'Tốc độ màn trập': '1/8000 đến 30 giây, Bulb',
      'Chụp liên tiếp': 'Lên đến 10 fps, tối đa 828 ảnh RAW',
      'Điểm lấy nét': 'Phát hiện pha: 759 / Tương phản: 425',
      'Chế độ AF': 'Continuous AF, DMF, Manual, Single AF',
      'Chống rung': 'Sensor-Shift, 5-Axis',
      'Ngàm ống kính': 'Sony E',
      'Quay video': 'UHD 4K, Full HD',
      'Viewfinder': 'OLED EVF 3,680,000 điểm, 0.78x, 100%',
      'Màn hình': 'LCD cảm ứng nghiêng tự do 3.0 inch, 1,036,800 điểm',
      'Thẻ nhớ': 'CFexpress Type A / SD (UHS-II) x2',
      'Trọng lượng': '658g (có pin + bộ nhớ)',
      'Kích thước': '131.3 x 96.4 x 79.8 mm',
      'Pin': 'NP-FZ100 2280mAh, khoảng 520 ảnh',
      'Cổng': 'HDMI A, USB-C 3.2 Gen 2, Mic 3.5mm, Headphone 3.5mm',
      'Kết nối': 'Wi-Fi / Bluetooth',
    },
    variants: [
      { id: 'a7iv-body', name: 'MỚI 100% — Body Only', price: 47500000 },
      { id: 'a7iv-kit', name: 'MỚI 100% — Body + Sony FE 24-70mm F2.8 GM II', price: 86500000 },
    ],
  },
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
    image: 'https://mayanhvietnam.com/image-data/san-pham/23-04/23-04-19/230419151242054/avatar/canon-eos-r8-6-500x500_may-anh-canon-eos-r8-body-only.jpg',
    thumbnails: [
      'https://mayanhvietnam.com/image-data/san-pham/23-04/23-04-19/230419151242054/hinh-500-500/canon-eos-r8-6-500x500.jpg',
      'https://mayanhvietnam.com/image-data/san-pham/23-04/23-04-19/230419151242054/hinh-bai-viet/638894716668124550.jpg',
      'https://mayanhvietnam.com/image-data/san-pham/23-04/23-04-19/230419151242054/hinh-bai-viet/638894716668282299.jpg',
      'https://mayanhvietnam.com/image-data/san-pham/23-04/23-04-19/230419151242054/hinh-bai-viet/638894716668370735.jpg',
      'https://mayanhvietnam.com/image-data/san-pham/23-04/23-04-19/230419151242054/hinh-bai-viet/638894716668438601.jpg',
      'https://mayanhvietnam.com/image-data/san-pham/23-04/23-04-19/230419151242054/hinh-bai-viet/638894716668523718.jpg',
      'https://mayanhvietnam.com/image-data/san-pham/23-04/23-04-19/230419151242054/hinh-bai-viet/638894716668602401.jpg',
      'https://mayanhvietnam.com/image-data/san-pham/23-04/23-04-19/230419151242054/hinh-bai-viet/638894716668700089.jpg',
    ],
    rating: 4.8,
    reviewCount: 89,
    description: 'Canon EOS R8 — máy ảnh full-frame nhẹ nhất phân khúc, cảm biến 24.2MP DIGIC X, Dual Pixel CMOS AF II, quay video 4K 60p, lý tưởng cho người chuyển từ APS-C lên full-frame.',
    article: {
      title: 'Đánh giá Canon EOS R8 — Full-frame nhẹ nhất Canon',
      author: 'Máy Ảnh Việt Nam',
      publishDate: '2026-07-10',
      readTime: 7,
      sections: [
        {
          heading: 'Tổng quan',
          content:
            'Canon EOS R8 là máy ảnh mirrorless full-frame nhẹ nhất Canon từng sản xuất, nặng chỉ **461g** (pin + thẻ nhớ). Đây được mô tả là "một cuộc cách mạng" — kế thừa công nghệ lấy nét và quay phim từ dòng cao cấp, phù hợp cho cả nhiếp ảnh gia đam mê và nhà làm phim sáng tạo.',
        },
        {
          heading: 'Hệ th��ng lấy nét và hiệu năng',
          content:
            'Dual Pixel CMOS AF II với thuật toán AI deep learning, nhận diện người, động vật (chó, mèo, chim), phương tiện. Eye AF chính xác, bám nét tốc độ cao. Chụp liên tục lên đến **40 ảnh/giây** (màn trập điện tử). ISO 100–102,400 (mở rộng 204,800).',
        },
        {
          heading: 'Quay video',
          content:
            '4K 60p (oversampled từ 6K) không crop. Full HD lên đến **180fps**. Canon Log 3, Focus Breathing Correction. Hỗ trợ H.264/H.265 10-bit.',
        },
        {
          heading: 'Ưu và nhược điểm',
          content:
            '**Ưu điểm:** Nhẹ nhất dòng full-frame Canon (461g). Dual Pixel CMOS AF II 4897 điểm. 4K 60p không crop oversampled từ 6K. Màn hình cảm ứng xoay lật.\n\n**Nhược điểm:** Khe đơn SD/SDHC/SDXC. Pin LP-E17 dung lượng trung bình. Không có IBIS.',
        },
      ],
    },
    specs: {
      'Cảm biến': 'CMOS Full-frame 24.2MP',
      'Bộ xử lý': 'DIGIC X',
      'Chụp liên tiếp': '40 fps (màn trập điện tử)',
      'Quay video': '4K 60p / FHD 180p',
      ISO: '100 - 102,400 (mở rộng 50 - 204,800)',
      'Điểm lấy nét': '4,897 điểm (Dual Pixel CMOS AF II)',
      'Ngàm ống kính': 'Canon RF',
      'Trọng lượng': '461g (body, có pin và thẻ)',
    },
    variants: [
      { id: 'r8-body', name: 'Body Only', price: 26900000 },
    ],
  },
  {
    name: 'Máy ảnh Sony ZV-E10 II Black (Body Only) | Chính hãng',
    slug: 'may-anh-sony-zv-e10-ii-black-body-only-chinh-hang',
    brand: 'Sony',
    categorySlug: 'may-anh',
    price: 26000000,
    status: 'ACTIVE',
    availability: 'IN_STOCK',
    condition: 'NEW',
    mountType: 'Sony E',
    image: 'https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-26/240826174229493/avatar/638708944659930440_may-anh-sony-zv-e10-ii-black-body-only-chinh-hang.jpg',
    thumbnails: [
      'https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-26/240826174229493/hinh-bai-viet/638896426877446780.jpg',
      'https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-26/240826174229493/hinh-bai-viet/638896427569745920.jpg',
      'https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-26/240826174229493/hinh-bai-viet/638896427999251215.jpg',
      'https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-26/240826174229493/hinh-bai-viet/638896428329760254.jpg',
      'https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-26/240826174229493/hinh-bai-viet/638896436061828013.jpg',
    ],
    rating: 4.7,
    reviewCount: 67,
    description: 'Sony ZV-E10 II — máy ảnh APS-C chuyên sáng tạo nội dung, cảm biến 26MP, quay video 4K 60p, màn hình xoay lật, lấy nét theo mắt Real-time.',
    article: {
      title: 'Đánh giá Sony ZV-E10 II — Lựa chọn mạnh phân khúc vlogging',
      author: 'Máy Ảnh Việt Nam',
      publishDate: '2026-07-10',
      readTime: 7,
      sections: [
        {
          heading: 'Tổng quan',
          content:
            'Sony ZV-E10 II là máy ảnh mirrorless thuộc dòng ZV được thiết kế chuyên biệt cho vlogging và sáng tạo nội dung. Cảm biến APS-C Exmor R CMOS 26MP, quay video 4K 30fps, hệ thống lấy nét Real-time Eye AF 759 điểm, và micro 3 capsule tích hợp — tất cả trong thân máy nhỏ gọn chỉ 343g.',
        },
        {
          heading: 'Thiết kế cho vlogging',
          content:
            'Màn hình LCD cảm ứng xoay lật 3 inch dễ dàng tự quay và kiểm tra khung hình. Micro định hướng 3 capsule tích hợp kèm kính chắn gió giảm tiếng ồn. Cổng USB-C hỗ trợ kết nối máy tính làm webcam cho livestream. Giao diện đơn giản phù hợp người mới bắt đầu.',
        },
        {
          heading: 'Ưu và nhược điểm',
          content:
            '**Ưu điểm:** Nhỏ gọn 343g phù hợp sáng tạo nội dung di động. Eye AF + Product Showcase thông minh. Ngàm E linh hoạt. Video 4K chất lượng cao với slow motion 120fps. Micro 3 capsule tích hợp. USB-C làm webcam.\n\n**Nhược điểm:** Không có kính ngắm (EVF). Chỉ 1 khe thẻ nhớ. Pin NP-FW50 tuổi thọ trung bình. Không có IBIS — chỉ có EIS điện tử.',
        },
      ],
    },
    specs: {
      'Cảm biến': 'APS-C Exmor R 26MP',
      'Quay video': '4K 60p / FHD 120fps',
      'Điểm lấy nét': '759 điểm相 detect pha',
      'Ngàm ống kính': 'Sony E',
      'Trọng lượng': '377g (body)',
    },
    variants: [
      { id: 'zve10ii-body', name: 'Body Only', price: 26000000 },
    ],
  },
  {
    name: 'Máy ảnh Nikon Z6 II (Body Only) | Chính hãng',
    slug: 'may-anh-nikon-z6-ii-body-only-chinh-hang',
    brand: 'Nikon',
    categorySlug: 'may-anh',
    price: 32500000,
    status: 'ACTIVE',
    availability: 'IN_STOCK',
    condition: 'NEW',
    mountType: 'Nikon Z',
    image: 'https://mayanhvietnam.com/image-data/san-pham/23-04/23-04-18/230418180440520/avatar/nikon-z6-ii-500x500_may-anh-nikon-z6-ii-body-only-chinh-hang.jpg',
    thumbnails: [
      'https://mayanhvietnam.com/image-data/san-pham/23-04/23-04-18/230418180440520/hinh-preview/638791119772490824.jpg',
      'https://mayanhvietnam.com/image-data/san-pham/23-04/23-04-18/230418180440520/hinh-preview/638791119188194773.jpg',
      'https://mayanhvietnam.com/image-data/san-pham/23-04/23-04-18/230418180440520/hinh-preview/638791120330384440.jpg',
      'https://mayanhvietnam.com/image-data/san-pham/23-04/23-04-18/230418180440520/hinh-preview/638791120987383909.jpg',
      'https://mayanhvietnam.com/image-data/san-pham/23-04/23-04-18/230418180440520/hinh-preview/638791122287850700.jpg',
    ],
    rating: 4.8,
    reviewCount: 115,
    description: 'Nikon Z6 II — máy ảnh mirrorless full-frame 24.5MP với bộ xử lý kép EXPEED 6, Dual CFexpress/SD, quay video 4K 60p, phù hợp nhiếp ảnh gia và quay phim.',
    specs: {
      'Cảm biến': 'BSI CMOS Full-frame 24.5MP',
      'Bộ xử lý': 'Dual EXPEED 6',
      'ISO': '100 - 51,200 (mở rộng 50 - 204,800)',
      'Chụp liên tiếp': '14 fps',
      'Điểm lấy nét': '273 điểm hybrid',
      'Quay video': '4K 60p',
      'Ngàm ống kính': 'Nikon Z',
      'Trọng lượng': '705g (body, có pin và thẻ)',
    },
    variants: [
      { id: 'z6ii-body', name: 'Body Only', price: 32500000 },
    ],
  },
  {
    name: 'Sony ZV-E10 kèm Lens Sony E PZ 16-50mm F3.5-5.6 OSS MARK II',
    slug: 'sony-zv-e10-kem-lens-sony-e-pz-1650-f3556-oss-mark-ii-chinh-hang',
    brand: 'Sony',
    categorySlug: 'may-anh',
    price: 16680000,
    status: 'ACTIVE',
    availability: 'IN_STOCK',
    condition: 'NEW',
    mountType: 'Sony E',
    image: 'https://mayanhvietnam.com/image-data/san-pham/25-07/25-07-14/250714103201041/avatar/639029506922725233_sony-zv-e10-kem-lens-sony-e-pz-16-50mm-f3-5-5-6-oss-mark-ii-chinh-hang.jpg',
    rating: 4.7,
    reviewCount: 94,
    description: 'Sony ZV-E10 — máy ảnh APS-C chuyên vlog với mic tích hợpDirectional 3 capsule, quay video 4K, màn hình xoay lật, ổn định hình ảnh điện tử.',
    specs: {
      'Cảm biến': 'APS-C Exmor 24.2MP',
      'Quay video': '4K 30p / FHD 120fps',
      'Ngàm ống kính': 'Sony E',
      'Trọng lượng': '343g (body + pin + thẻ)',
    },
    variants: [
      { id: 'zve10-kit', name: 'Kit PZ 16-50mm OSS II', price: 16680000 },
    ],
  },
  {
    name: 'Máy ảnh Nikon Z30 (đen) kèm Lens NIKKOR Z DX 16-50mm f/3.5-6.3 VR',
    slug: 'may-anh-nikon-z30-den-kem-lens-nikkor-z-dx-1650-f3563-vr-chinh-hang',
    brand: 'Nikon',
    categorySlug: 'may-anh',
    price: 17900000,
    status: 'ACTIVE',
    availability: 'IN_STOCK',
    condition: 'NEW',
    mountType: 'Nikon Z',
    image: 'https://mayanhvietnam.com/image-data/san-pham/25-06/25-06-20/250620115535850/avatar/638889641077470341_may-anh-nikon-z30-den-kem-lens-nikkor-z-dx-16-50mm-f-3-5-6-3-vr-chinh-hang.jpg',
    thumbnails: [
      'https://mayanhvietnam.com/image-data/san-pham/25-06/25-06-20/250620115535850/hinh-bai-viet/638887063382045734.jpg',
      'https://mayanhvietnam.com/image-data/san-pham/25-06/25-06-20/250620115535850/hinh-bai-viet/638887063382174639.jpg',
      'https://mayanhvietnam.com/image-data/san-pham/25-06/25-06-20/250620115535850/hinh-bai-viet/638887063382263284.jpg',
      'https://mayanhvietnam.com/image-data/san-pham/25-06/25-06-20/250620115535850/hinh-bai-viet/638887063382343993.jpg',
      'https://mayanhvietnam.com/image-data/san-pham/25-06/25-06-20/250620115535850/hinh-bai-viet/638887063382425445.jpg',
      'https://mayanhvietnam.com/image-data/san-pham/25-06/25-06-20/250620115535850/hinh-bai-viet/638887063382584587.jpg',
    ],
    rating: 4.6,
    reviewCount: 53,
    description: 'Nikon Z30 — máy ảnh APS-C nhỏ gọn dành cho vlogger và người sáng tạo nội dung, không có viewfinder, màn hình xoay lật, mic stereo tích hợp.',
    specs: {
      'Cảm biến': 'APS-C CMOS 20.9MP',
      'Quay video': '4K 30p / FHD 120fps',
      'Ngàm ống kính': 'Nikon Z',
      'Trọng lượng': '405g (body + pin + thẻ)',
    },
    variants: [
      { id: 'z30-kit', name: 'Kit NIKKOR Z DX 16-50mm VR', price: 17900000 },
    ],
  },
  {
    name: 'Nikon ZFC + Lens NIKKOR Z DX 16-50mm f/3.5-6.3 VR (Silver)',
    slug: 'nikon-zfc-lens-nikon-z-dx-1650-f3563-vr-silver',
    brand: 'Nikon',
    categorySlug: 'may-anh',
    price: 24000000,
    status: 'ACTIVE',
    availability: 'IN_STOCK',
    condition: 'NEW',
    mountType: 'Nikon Z',
    image: 'https://mayanhvietnam.com/image-data/san-pham/26-01/26-01-02/260102105356303/avatar/639029480446269883_nikon-zfc-lens-nikon-z-dx-16-50mm-f3-5-6-3-vr-silver.jpg',
    rating: 4.8,
    reviewCount: 71,
    description: 'Nikon Zfc — máy ảnh APS-C phong cách retro lấy cảm hứng từ Nikon FM2, cảm biến 20.9MP, quay video 4K, thiết kế kim loại cổ điển.',
    specs: {
      'Cảm biến': 'APS-C CMOS 20.9MP',
      'Quay video': '4K 30p / FHD 120fps',
      'Ngàm ống kính': 'Nikon Z',
      'Trọng lượng': '445g (body + pin + thẻ)',
    },
    variants: [
      { id: 'zfc-kit-silver', name: 'Kit 16-50mm VR (Silver)', price: 24000000 },
    ],
  },
  {
    name: 'Máy ảnh Nikon Z5 II (Hãng)',
    slug: 'may-anh-nikon-z5-ii-hang',
    brand: 'Nikon',
    categorySlug: 'may-anh',
    price: 43000000,
    status: 'ACTIVE',
    availability: 'IN_STOCK',
    condition: 'NEW',
    mountType: 'Nikon Z',
    image: 'https://mayanhvietnam.com/image-data/san-pham/25-07/25-07-04/250704114217939/avatar/638872262359118095_may-anh-nikon-z5-ii-hang.jpg',
    thumbnails: [
      'https://mayanhvietnam.com/image-data/san-pham/25-07/25-07-04/250704114217939/hinh-bai-viet/638914594409703048.jpg',
      'https://mayanhvietnam.com/image-data/san-pham/25-07/25-07-04/250704114217939/hinh-bai-viet/638914594826976874.jpg',
      'https://mayanhvietnam.com/image-data/san-pham/25-07/25-07-04/250704114217939/hinh-bai-viet/638914595404243145.jpg',
      'https://mayanhvietnam.com/image-data/san-pham/25-07/25-07-04/250704114217939/hinh-bai-viet/638914595660114869.jpg',
      'https://mayanhvietnam.com/image-data/san-pham/25-07/25-07-04/250704114217939/hinh-bai-viet/638914595928654722.jpg',
      'https://mayanhvietnam.com/image-data/san-pham/25-07/25-07-04/250704114217939/hinh-bai-viet/638914596296844655.jpg',
    ],
    rating: 4.8,
    reviewCount: 38,
    description: 'Nikon Z5 II — máy ảnh full-frame giá trị nhất phân khúc, cảm biến 24.5MP, IBIS 5 trục, quay video 4K 60p,双卡 SD, phù hợp nhiếp ảnh gia bán chuyên.',
    specs: {
      'Cảm biến': 'BSI CMOS Full-frame 24.5MP',
      'Bộ xử lý': 'EXPEED 7',
      'Quay video': '4K 60p',
      'Chống rung': 'IBIS 5 trục',
      'Ngàm ống kính': 'Nikon Z',
      'Thẻ nhớ': '2 khe SD (UHS-II)',
    },
    variants: [
      { id: 'z5ii-body', name: 'Body Only', price: 43000000 },
    ],
  },

  // ── Top Lenses (from homepage.json top_lenses) ──────────────────────────
  {
    name: 'Ống kính Canon RF 24-70mm f/2.8L IS USM | Chính hãng',
    slug: 'ong-kinh-canon-rf-2470-f28l-is-usm-chinh-hang',
    brand: 'Canon',
    categorySlug: 'ong-kinh',
    price: 48900000,
    status: 'ACTIVE',
    availability: 'IN_STOCK',
    condition: 'NEW',
    mountType: 'Canon RF',
    image: 'https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-10/230210234357844/avatar/01_ong-kinh-canon-rf-2470mm-f-2-8l-is-usm-chinh-hang.jpg',
    thumbnails: [
      'https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-10/230210234357844/hinh-500-500/638791812881333131.jpg',
      'https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-10/230210234357844/hinh-500-500/638791812880707750.jpg',
      'https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-10/230210234357844/hinh-500-500/638791812881020873.jpg',
      'https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-10/230210234357844/hinh-500-500/638791812880864296.jpg',
      'https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-10/230210234357844/hinh-500-500/638791812881176907.jpg',
      'https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-10/230210234357844/hinh-500-500/08.jpg',
      'https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-10/230210234357844/hinh-500-500/07.jpg',
      'https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-10/230210234357844/hinh-500-500/06.jpg',
    ],
    rating: 4.9,
    reviewCount: 87,
    description: 'Ống kính zoom tiêu chuẩn chuyên nghiệp Canon L-series với chống rung IS, khẩu độ f/2.8 xuyên suốt dải zoom, lý tưởng cho mọi thể loại.',
    specs: {
      'Dải tiêu cự': '24-70mm',
      'Khẩu độ': 'f/2.8 - f/22',
      'Cấu trúc quang học': '21 thấu kính / 15 nhóm',
      'Chống rung': 'IS, tối đa 5 stops',
      'Kích thước filter': '82mm',
      'Ngàm ống kính': 'Canon RF',
      'Trọng lượng': '900g',
    },
    variants: [
      { id: 'rf2470-f28-is', name: 'Chính hãng Canon VN', price: 48900000 },
    ],
  },
  {
    name: 'Ống kính Nikon Z 24-70mm f/2.8 S II',
    slug: 'ong-kinh-nikon-z-2470-f28-s-ii',
    brand: 'Nikon',
    categorySlug: 'ong-kinh',
    price: 69000000,
    status: 'ACTIVE',
    availability: 'IN_STOCK',
    condition: 'NEW',
    mountType: 'Nikon Z',
    image: 'https://mayanhvietnam.com/image-data/san-pham/25-09/25-09-22/250922103851025/avatar/638941343754731632_ong-kinh-nikon-z-24-70mm-f-2-8-s-ii.jpg',
    thumbnails: [
      'https://mayanhvietnam.com/image-data/san-pham/25-09/25-09-22/250922103851025/hinh-bai-viet/638950128273248847.jpg',
      'https://mayanhvietnam.com/image-data/san-pham/25-09/25-09-22/250922103851025/hinh-bai-viet/638950128555460639.jpg',
      'https://mayanhvietnam.com/image-data/san-pham/25-09/25-09-22/250922103851025/hinh-bai-viet/638950128802189315.jpg',
      'https://mayanhvietnam.com/image-data/san-pham/25-09/25-09-22/250922103851025/hinh-bai-viet/638950129043788921.jpg',
    ],
    rating: 4.9,
    reviewCount: 31,
    description: 'Ống kính Nikon Z 24-70mm f/2.8 S II — thế hệ II nhỏ gọn hơn, lấy nét nhanh hơn, chất lượng quang học đỉnh cao cho hệ máy Nikon Z.',
    specs: {
      'Dải tiêu cự': '24-70mm',
      'Khẩu độ': 'f/2.8 - f/22',
      'Ngàm ống kính': 'Nikon Z',
      'Trọng lượng': '805g',
    },
    variants: [
      { id: 'z2470-s2', name: 'Chính hãng Nikon VN', price: 69000000 },
    ],
  },
  {
    name: 'Ống kính Tamron 28-75mm F2.8 Di III VXD G2 for Nikon Z',
    slug: 'ong-kinh-tamron-2875-f28-di-iii-vxd-g2-for-nikon-z',
    brand: 'Tamron',
    categorySlug: 'ong-kinh',
    price: 17900000,
    status: 'ACTIVE',
    availability: 'IN_STOCK',
    condition: 'NEW',
    mountType: 'Nikon Z',
    image: 'https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-31/240831133137156/avatar/638722116807217083_ong-kinh-tamron-28-75mm-f2-8-di-iii-vxd-g2-for-nikon-z.jpg',
    rating: 4.7,
    reviewCount: 45,
    description: 'Tamron 28-75mm F2.8 Di III VXD G2 cho Nikon Z — ống kính zoom tiêu chuẩn giá trị, lấy nét VXD nhanh, khẩu độ f/2.8, trọng lượng nhẹ.',
    specs: {
      'Dải tiêu cự': '28-75mm',
      'Khẩu độ': 'f/2.8 - f/22',
      'Motor lấy nét': 'VXD (Voice-coil eXtreme-torque Drive)',
      'Ngàm ống kính': 'Nikon Z',
      'Trọng lượng': '540g',
    },
    variants: [
      { id: 'tamron2875-z', name: 'Chính hãng', price: 17900000 },
    ],
  },
  {
    name: 'Canon RF 50mm F1.8 STM | Chính hãng',
    slug: 'canon-rf-50-f18-stm-chinh-hang',
    brand: 'Canon',
    categorySlug: 'ong-kinh',
    price: 4500000,
    status: 'ACTIVE',
    availability: 'IN_STOCK',
    condition: 'NEW',
    mountType: 'Canon RF',
    image: 'https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-03/240803094047373/avatar/638847186653427391_canon-rf-50mm-f1-8-stm-chinh-hang.jpg',
    thumbnails: [
      'https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-03/240803094047373/hinh-bai-viet/638894765689925506.jpg',
      'https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-03/240803094047373/hinh-bai-viet/638894769934751143.jpg',
      'https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-03/240803094047373/hinh-bai-viet/638894766157268548.jpg',
      'https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-03/240803094047373/hinh-bai-viet/638894766899566625.jpg',
    ],
    rating: 4.8,
    reviewCount: 192,
    description: 'Canon RF 50mm f/1.8 STM — "ifty" kinh điển cho ngàm RF, khẩu độ lớn f/1.8 lý tưởng cho chân dung và chụp thiếu sáng, giá rất phải chăng.',
    specs: {
      'Tiêu cự': '50mm',
      'Khẩu độ': 'f/1.8 - f/22',
      'Cấu trúc quang học': '7 thấu kính / 6 nhóm',
      'Kích thước filter': '43mm',
      'Ngàm ống kính': 'Canon RF',
      'Trọng lượng': '160g',
    },
    variants: [
      { id: 'rf50-f18', name: 'Chính hãng Canon VN', price: 4500000 },
    ],
  },
  {
    name: 'Ống kính Nikon Z 24-70mm f/4 S | Chính hãng VIC',
    slug: 'ong-kinh-nikon-z-2470-f4-s-chinh-hang-vic',
    brand: 'Nikon',
    categorySlug: 'ong-kinh',
    price: 9500000,
    status: 'ACTIVE',
    availability: 'IN_STOCK',
    condition: 'NEW',
    mountType: 'Nikon Z',
    image: 'https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-10/230210235800676/avatar/01_ong-kinh-nikon-z-24-70mm-f-4-s-chinh-hang-vic.jpg',
    thumbnails: [
      'https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-10/230210235800676/hinh-bai-viet/638792746210615919.jpg',
      'https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-10/230210235800676/hinh-bai-viet/638792746210459669.jpg',
      'https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-10/230210235800676/hinh-bai-viet/638792746210771915.jpg',
      'https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-10/230210235800676/hinh-bai-viet/638792746210303376.jpg',
      'https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-10/230210235800676/hinh-bai-viet/638792746210147067.jpg',
      'https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-10/230210235800676/hinh-bai-viet/638792746209990776.jpg',
      'https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-10/230210235800676/hinh-bai-viet/638792746209834837.jpg',
    ],
    rating: 4.7,
    reviewCount: 134,
    description: 'Nikon Z 24-70mm f/4 S — ống kính zoom tiêu chuẩn nhỏ gọn, lý tưởng cho du lịch và hàng ngày, chất lượng quang học S-Line.',
    specs: {
      'Dải tiêu cự': '24-70mm',
      'Khẩu độ': 'f/4 - f/22',
      'Ngàm ống kính': 'Nikon Z',
      'Trọng lượng': '500g',
    },
    variants: [
      { id: 'z2470-f4', name: 'Chính hãng VIC', price: 9500000 },
    ],
  },

  // ── Top Flycam (from homepage.json top_flycam) ──────────────────────────
  {
    name: 'DJI Mini 5 Pro (Base) | Chính Hãng',
    slug: 'dji-mini-5-pro-base-chinh-hang',
    brand: 'DJI',
    categorySlug: 'flycam',
    price: 13990000,
    status: 'ACTIVE',
    availability: 'IN_STOCK',
    condition: 'NEW',
    image: 'https://mayanhvietnam.com/image-data/san-pham/25-09/25-09-12/250912094317313/avatar/638932671190111464_dji-mini-5-pro-base-chinh-hang.jpg',
    rating: 4.9,
    reviewCount: 28,
    description: 'DJI Mini 5 Pro — flycam dưới 249g với cảm biến 1/1.3 inch, tránh vật cản đa hướng, quay 4K/60fps, thời gian bay 34 phút.',
    specs: {
      'Trọng lượng': '< 249g',
      Camera: '1/1.3" CMOS, 50MP',
      'Quay video': '4K 60fps',
      'Thời gian bay': '34 phút',
      'Cảm biến vật cản': 'Đa hướng',
    },
    variants: [
      { id: 'mini5-base', name: 'Base (RC-N2)', price: 13990000 },
    ],
  },
  {
    name: 'DJI Mavic 4 Pro 512GB Creator Combo',
    slug: 'dji-mavic-4-pro-512gb-creator-combo',
    brand: 'DJI',
    categorySlug: 'flycam',
    price: 59990000,
    status: 'ACTIVE',
    availability: 'IN_STOCK',
    condition: 'NEW',
    image: 'https://mayanhvietnam.com/image-data/san-pham/25-05/25-05-15/250515085035248/avatar/638828964891489787_dji-mavic-4-pro-512gb-creator-combo.jpg',
    thumbnails: [
      'https://mayanhvietnam.com/image-data/san-pham/25-05/25-05-15/250515085035248/hinh-bai-viet/638892977207347856.jpg',
      'https://mayanhvietnam.com/image-data/san-pham/25-05/25-05-15/250515085035248/hinh-bai-viet/638892977681641368.jpg',
      'https://mayanhvietnam.com/image-data/san-pham/25-05/25-05-15/250515085035248/hinh-bai-viet/638892978024061086.jpg',
      'https://mayanhvietnam.com/image-data/san-pham/25-05/25-05-15/250515085035248/hinh-bai-viet/638892978550132998.jpg',
      'https://mayanhvietnam.com/image-data/san-pham/25-05/25-05-15/250515085035248/hinh-bai-viet/638892979250030103.jpg',
    ],
    rating: 4.9,
    reviewCount: 12,
    description: 'DJI Mavic 4 Pro — flycam cao cấp nhất với camera Hasselblad, cảm biến 4/3 CMOS, quay 4K 120fps,避障 omnidirectional, 46 phút bay.',
    specs: {
      Camera: '4/3" CMOS Hasselblad',
      'Quay video': '4K 120fps / 5.1K',
      'Thời gian bay': '46 phút',
      'Cảm biến vật cản': 'Đa hướng omnidirectional',
      'Truyền hình ảnh': 'O4+, 20km FHD',
    },
    variants: [
      { id: 'mavic4pro-creator', name: 'Creator Combo 512GB', price: 59990000 },
    ],
  },
  {
    name: 'Flycam DJI Air 3S Fly More Combo (DJI RC 2) (Chính hãng)',
    slug: 'flycam-dji-air-3s-fly-more-combo-dji-rc-2-chinh-hang',
    brand: 'DJI',
    categorySlug: 'flycam',
    price: 27990000,
    status: 'ACTIVE',
    availability: 'IN_STOCK',
    condition: 'NEW',
    image: 'https://mayanhvietnam.com/image-data/san-pham/24-11/24-11-02/241102144506281/avatar/638661555984717416_flycam-dji-air-3s-fly-more-combo-dji-rc-2-chinh-hang.jpg',
    thumbnails: [
      'https://mayanhvietnam.com/image-data/san-pham/24-11/24-11-02/241102144506281/hinh-500-500/01.jpg',
      'https://mayanhvietnam.com/image-data/san-pham/24-11/24-11-02/241102144506281/hinh-500-500/638661556240932444.jpg',
      'https://mayanhvietnam.com/image-data/san-pham/24-11/24-11-02/241102144506281/hinh-bai-viet/638794487148732359.jpg',
      'https://mayanhvietnam.com/image-data/san-pham/24-11/24-11-02/241102144506281/hinh-bai-viet/638794487148888707.jpg',
      'https://mayanhvietnam.com/image-data/san-pham/24-11/24-11-02/241102144506281/hinh-bai-viet/638794487149044523.jpg',
      'https://mayanhvietnam.com/image-data/san-pham/24-11/24-11-02/241102144506281/hinh-bai-viet/638794487149200725.jpg',
      'https://mayanhvietnam.com/image-data/san-pham/24-11/24-11-02/241102144506281/hinh-bai-viet/638794487149357396.jpg',
      'https://mayanhvietnam.com/image-data/san-pham/24-11/24-11-02/241102144506281/hinh-bai-viet/638794487149513869.jpg',
      'https://mayanhvietnam.com/image-data/san-pham/24-11/24-11-02/241102144506281/hinh-bai-viet/638794487149669884.jpg',
      'https://mayanhvietnam.com/image-data/san-pham/24-11/24-11-02/241102144506281/hinh-bai-viet/638794487149825982.jpg',
      'https://mayanhvietnam.com/image-data/san-pham/24-11/24-11-02/241102144506281/hinh-bai-viet/638794487149982359.jpg',
      'https://mayanhvietnam.com/image-data/san-pham/24-11/24-11-02/241102144506281/hinh-bai-viet/638794487150138623.jpg',
      'https://mayanhvietnam.com/image-data/san-pham/24-11/24-11-02/241102144506281/hinh-bai-viet/638794487150294870.jpg',
      'https://mayanhvietnam.com/image-data/san-pham/24-11/24-11-02/241102144506281/hinh-bai-viet/638794487150451088.jpg',
      'https://mayanhvietnam.com/image-data/san-pham/24-11/24-11-02/241102144506281/hinh-bai-viet/638794487150607409.jpg',
    ],
    rating: 4.8,
    reviewCount: 35,
    description: 'DJI Air 3S — flycam 2 camera với cảm biến 1 inch, flycam tầm trung mạnh nhất, quay 4K 100fps,避障 omnidirectional.',
    specs: {
      Camera: '1" CMOS + tele',
      'Quay video': '4K 100fps',
      'Thời gian bay': '46 phút',
      'Cảm biến vật cản': 'Đa hướng',
    },
    variants: [
      { id: 'air3s-fmc', name: 'Fly More Combo (RC 2)', price: 27990000 },
    ],
  },

  // ── Top Action Camera (from homepage.json top_action_camera) ────────────
  {
    name: 'DJI Osmo Nano Standard Combo (64GB) | Chính hãng',
    slug: 'dji-osmo-nano-standard-combo-64gb-chinh-hang',
    brand: 'DJI',
    categorySlug: 'action-camera',
    price: 8470000,
    status: 'ACTIVE',
    availability: 'IN_STOCK',
    condition: 'NEW',
    isNew: true,
    image: 'https://mayanhvietnam.com/image-data/san-pham/25-09/25-09-12/250912092924846/avatar/638944102167625645_dji-osmo-nano-standard-combo-64gb-chinh-hang.jpg',
    rating: 4.7,
    reviewCount: 19,
    description: 'DJI Osmo Nano — action camera nhỏ gọn nhất, cảm biến 1/1.3 inch, quay 4K 120fps, chống nước 10m, stabilisation RockSteady 3.0.',
    specs: {
      Camera: '1/1.3" CMOS, 48MP',
      'Quay video': '4K 120fps',
      'Chống nước': '10m',
      'Thời lượng pin': '160 phút',
      'Trọng lượng': '36g (camera chính)',
    },
    variants: [
      { id: 'osmo-nano-64', name: 'Standard Combo 64GB', price: 8470000 },
    ],
  },
  {
    name: 'GoPro Hero 13 Black',
    slug: 'gopro-hero-13-black',
    brand: 'GoPro',
    categorySlug: 'action-camera',
    price: 9690000,
    status: 'ACTIVE',
    availability: 'IN_STOCK',
    condition: 'NEW',
    image: 'https://mayanhvietnam.com/image-data/san-pham/25-01/25-01-02/250102113303811/avatar/638714152413009638_gopro-hero-13-black.jpg',
    thumbnails: [
      'https://mayanhvietnam.com/image-data/san-pham/25-01/25-01-02/250102113303811/hinh-bai-viet/638895789366434848.jpg',
      'https://mayanhvietnam.com/image-data/san-pham/25-01/25-01-02/250102113303811/hinh-bai-viet/638895790033794448.jpg',
      'https://mayanhvietnam.com/image-data/san-pham/25-01/25-01-02/250102113303811/hinh-bai-viet/638895790409377474.jpg',
      'https://mayanhvietnam.com/image-data/san-pham/25-01/25-01-02/250102113303811/hinh-bai-viet/638895790715155688.jpg',
      'https://mayanhvietnam.com/image-data/san-pham/25-01/25-01-02/250102113303811/hinh-bai-viet/638895791004448766.jpg',
    ],
    rating: 4.8,
    reviewCount: 64,
    description: 'GoPro Hero 13 Black — action camera flagship, HyperSmooth 6.0, quay 5.3K60, chống nước 10m, GPS và màn hình cảm ứng.',
    specs: {
      Camera: '1/1.9" CMOS 27MP',
      'Quay video': '5.3K 60fps / 4K 120fps',
      'Chống rung': 'HyperSmooth 6.0',
      'Chống nước': '10m (không cần vỏ)',
      'Màn hình': 'Trước 1.4" + Sau 2.27" cảm ứng',
    },
    variants: [
      { id: 'hero13-black', name: 'Bản tiêu chuẩn', price: 9690000 },
    ],
  },
  {
    name: 'DJI Osmo Action 4 Adventure Combo',
    slug: 'dji-osmo-action-4-adventure-combo',
    brand: 'DJI',
    categorySlug: 'action-camera',
    price: 8190000,
    status: 'ACTIVE',
    availability: 'IN_STOCK',
    condition: 'NEW',
    image: 'https://mayanhvietnam.com/image-data/san-pham/23-08/23-08-05/230805002213412/avatar/0_dji-osmo-action-4-adventure-combo.jpg',
    thumbnails: [
      'https://mayanhvietnam.com/image-data/san-pham/23-08/23-08-05/230805002213412/hinh-bai-viet/639174645035554386-camera-dji-osmo-action-4-ban-don-doc-thu-am-jpg.jpg',
      'https://mayanhvietnam.com/image-data/san-pham/23-08/23-08-05/230805002213412/hinh-bai-viet/639174645035639434-camera-dji-osmo-action-4-ban-don-doc-jpg.jpg',
      'https://mayanhvietnam.com/image-data/san-pham/23-08/23-08-05/230805002213412/hinh-bai-viet/639174645035727034-camera-dji-osmo-action-4-ban-don-moi-truong-jpg.jpg',
      'https://mayanhvietnam.com/image-data/san-pham/23-08/23-08-05/230805002213412/hinh-bai-viet/639174645035835992-camera-dji-osmo-pocket-3-ban-don-man-hinh-jpg.jpg',
      'https://mayanhvietnam.com/image-data/san-pham/23-08/23-08-05/230805002213412/hinh-bai-viet/639174645035913918-camera-dji-osmo-action-4-ban-don-pin-jpg.jpg',
      'https://mayanhvietnam.com/image-data/san-pham/23-08/23-08-05/230805002213412/hinh-bai-viet/639174645035991447-camera-dji-osmo-action-4-ban-don-doc-rung-lac-jpg.jpg',
    ],
    rating: 4.7,
    reviewCount: 52,
    description: 'DJI Osmo Action 4 — cảm biến 1/1.3 inch lớn nhất phân khúc, quay 4K 120fps, chống nước 18m,温控 cho mọi thời tiết.',
    specs: {
      Camera: '1/1.3" CMOS',
      'Quay video': '4K 120fps',
      'Chống nước': '18m',
      'Thời lượng pin': '160 phút',
    },
    variants: [
      { id: 'action4-adventure', name: 'Adventure Combo', price: 8190000 },
    ],
  },
  {
    name: 'Máy quay DJI Osmo Pocket 4',
    slug: 'may-quay-dji-osmo-pocket-4',
    brand: 'DJI',
    categorySlug: 'action-camera',
    price: 12990000,
    status: 'ACTIVE',
    availability: 'IN_STOCK',
    condition: 'NEW',
    image: 'https://mayanhvietnam.com/image-data/san-pham/26-03/26-03-30/260330091754463/avatar/639120323080226498-dji-pocket-4-4-2000x2000-jpg_may-quay-dji-osmo-pocket-4.jpg',
    rating: 4.8,
    reviewCount: 23,
    description: 'DJI Osmo Pocket 4 — gimbal camera bỏ túi, cảm biến 1/1.3 inch, quay 4K 120fps, gimball 3 trục, ActiveTrack 6.0.',
    specs: {
      Camera: '1/1.3" CMOS',
      'Quay video': '4K 120fps',
      'Gimbal': '3 trục mechanical',
      'Theo dõi': 'ActiveTrack 6.0',
    },
    variants: [
      { id: 'pocket4', name: 'Bản tiêu chuẩn', price: 12990000 },
    ],
  },

  // ── Studio / Cinema ─────────────────────────────────────────────────────
  {
    name: 'Sony FX30 Cinema Line',
    slug: 'sony-fx30-cinema-line',
    brand: 'Sony',
    categorySlug: 'may-quay-phim',
    price: 43990000,
    status: 'ACTIVE',
    availability: 'IN_STOCK',
    condition: 'NEW',
    mountType: 'Sony E',
    image: 'https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-29/240829180801135/avatar/638722123731263546_may-quay-phim-sony-ilmefx30-chinh-hang.jpg',
    rating: 4.8,
    reviewCount: 33,
    description: 'Máy quay Cinema Line APS-C với cảm biến 26MP, quay 4K 120p 10-bit 4:2:2, hỗ trợ S-Cinetone và Log shooting chuyên nghiệp.',
    specs: {
      'Cảm biến': 'APS-C Exmor R 26MP',
      'Quay video': '4K 120p / FHD 240p, 10-bit 4:2:2',
      'Log profile': 'S-Log3 / S-Cinetone',
      'Chống rung': 'Active Mode IBIS',
      'Ngàm ống kính': 'Sony E',
      'Trọng lượng': '646g (với handle XLR)',
    },
    variants: [
      { id: 'fx30-handle', name: 'Kèm XLR Handle Unit', price: 46990000, discountPrice: 43990000 },
      { id: 'fx30-body', name: 'Body Only', price: 39990000 },
    ],
  },
  {
    name: 'Godox SL150W III LED Video Light',
    slug: 'godox-sl150w-iii',
    brand: 'Godox',
    categorySlug: 'thiet-bi-studio',
    price: 5690000,
    status: 'ACTIVE',
    availability: 'IN_STOCK',
    condition: 'NEW',
    image: 'https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-14/230214175317364/avatar/01_den-godox-la200d-daylight-led-light-230w.jpeg',
    rating: 4.7,
    reviewCount: 64,
    description: 'Đèn LED quay phim công suất 150W, nhiệt độ màu 5600K, CRI 96+, điều khiển qua app — lựa chọn tiêu chuẩn cho studio và livestream.',
    specs: {
      'Công suất': '150W',
      'Nhiệt độ màu': '5600K ± 200K',
      CRI: '96+',
      TLCI: '97+',
      'Ngàm đèn': 'Bowens',
      'Điều khiển': 'App Godox Light / Remote',
    },
    variants: [
      { id: 'sl150-std', name: 'Chính hãng Godox VN', price: 6490000, discountPrice: 5690000 },
    ],
  },
]

// ---------------------------------------------------------------------------
// Lens checker — bodies & lenses with mount info
// ---------------------------------------------------------------------------
export interface CameraBody {
  name: string
  mountType: string
  sensor: string
}

export const cameraBodies: CameraBody[] = [
  { name: 'Canon EOS R50', mountType: 'Canon RF', sensor: 'APS-C' },
  { name: 'Canon EOS R8', mountType: 'Canon RF', sensor: 'Full-frame' },
  { name: 'Canon EOS R6 Mark II', mountType: 'Canon RF', sensor: 'Full-frame' },
  { name: 'Sony Alpha A7 IV', mountType: 'Sony E', sensor: 'Full-frame' },
  { name: 'Sony ZV-E10 II', mountType: 'Sony E', sensor: 'APS-C' },
  { name: 'Sony FX30', mountType: 'Sony E', sensor: 'APS-C' },
  { name: 'Nikon Z5 II', mountType: 'Nikon Z', sensor: 'Full-frame' },
  { name: 'Nikon Z6 III', mountType: 'Nikon Z', sensor: 'Full-frame' },
  { name: 'Nikon Z50 II', mountType: 'Nikon Z', sensor: 'APS-C' },
  { name: 'Nikon ZFC', mountType: 'Nikon Z', sensor: 'APS-C' },
]

export interface LensOption {
  name: string
  mountType: string
  focalRange: string
  coverage: 'Full-frame' | 'APS-C'
}

export const lensOptions: LensOption[] = [
  { name: 'Canon RF 50mm f/1.8 STM', mountType: 'Canon RF', focalRange: '50mm', coverage: 'Full-frame' },
  { name: 'Canon RF 24-70mm f/2.8L IS USM', mountType: 'Canon RF', focalRange: '24-70mm', coverage: 'Full-frame' },
  { name: 'Sony FE 24-70mm f/2.8 GM II', mountType: 'Sony E', focalRange: '24-70mm', coverage: 'Full-frame' },
  { name: 'Nikon Z 24-70mm f/4 S', mountType: 'Nikon Z', focalRange: '24-70mm', coverage: 'Full-frame' },
  { name: 'Nikon Z 24-70mm f/2.8 S II', mountType: 'Nikon Z', focalRange: '24-70mm', coverage: 'Full-frame' },
  { name: 'Tamron 28-75mm F2.8 Di III VXD G2', mountType: 'Nikon Z', focalRange: '28-75mm', coverage: 'Full-frame' },
  { name: 'Viltrox AF 14mm f/4 Air Z', mountType: 'Nikon Z', focalRange: '14mm', coverage: 'APS-C' },
]

// ---------------------------------------------------------------------------
// Store locations — from homepage.json footer
// ---------------------------------------------------------------------------
export const storeLocations = [
  { city: 'TP.Hồ Chí Minh', address: 'Số 9, Nam Quốc Cang, Phường Bến Thành, TP Hồ Chí Minh' },
  { city: 'TP. Cần Thơ', address: 'Số 58 Nguyễn Hiền, Khu Dân Cư 91B, phường Tân An, TP. Cần Thơ' },
  { city: 'An Giang', address: 'Số 1, đường số 1, khu Tây sông Hậu, Phường Long Xuyên, Tỉnh An Giang' },
  { city: 'Đồng Tháp / Tiền Giang', address: 'Số 126, Hoàng Sa, Khu phố 4, Phường Thới Sơn, Tỉnh Đồng Tháp (TP. Mỹ Tho, Tiền Giang)' },
]

// ---------------------------------------------------------------------------
// Promotional banners — from homepage.json promotional_banners
// ---------------------------------------------------------------------------
export interface PromotionalBanner {
  label: string
  title: string
  description: string
  link: string
}

export const promotionalBanners: PromotionalBanner[] = [
  {
    label: 'FLASH SALE',
    title: 'Ưu đãi sốc trong ngày',
    description: 'Giảm giá đến 50% cho các sản phẩm nổi bật.',
    link: '/danh-muc/san-pham-flash-sale',
  },
  {
    label: 'SẢN PHẨM NỔI BẬT',
    title: 'Máy ảnh và ống kính hot nhất',
    description: 'Được khách hàng tin dùng và đánh giá cao.',
    link: '/danh-muc/san-pham-khuyen-mai',
  },
  {
    label: 'SẢN PHẨM KHUYẾN MÃI',
    title: 'Quà tặng & ưu đãi đặc biệt',
    description: 'Tặng kèm phụ kiện, thẻ nhớ, dán màn hình miễn phí.',
    link: '/danh-muc/san-pham-khuyen-mai',
  },
  {
    label: 'SẢN PHẨM CŨ KHUYẾN MÃI',
    title: 'Hàng cũ giá tốt',
    description: 'Sản phẩm like-new, bảo hành chính hãng, giá hấp dẫn.',
    link: '/danh-muc/san-pham-cu',
  },
]

// ---------------------------------------------------------------------------
// Site content — from homepage.json header + footer
// ---------------------------------------------------------------------------
export const HOTLINE = '0937.148.222'
export const HOTLINE_FULL = '0907-215-252'
export const SITE_EMAIL = 'info@mayanhvietnam.com'
export const COMPANY_NAME = 'CÔNG TY TNHH DỊCH VỤ TƯ VẤN VÀ CÔNG NGHỆ SÀI GÒN'
export const COMPANY_ADDRESS = 'Số 09 Nam Quốc Cang, Phường Bến Thành, TP Hồ Chí Minh'
export const TAX_ID = '0313859872-002'

export const footerPolicies = [
  { name: 'Chính sách bảo hành', link: '/chinh-sach-bao-hanh' },
  { name: 'Chính sách thanh toán', link: '/chinh-sach-thanh-toan' },
  { name: 'Chính sách đổi trả, Hoàn Tiền', link: '/chinh-sach-bao-hanh#chinhSachDoiTraHoanTien' },
  { name: 'Chính sách vận chuyển', link: '/chinh-sach-van-chuyen' },
  { name: 'Chính sách bảo mật thông tin', link: '/chinh-sach-bao-mat-thong-tin-khach-hang' },
  { name: 'Thông tin liên hệ', link: '/thong-tin-lien-he' },
]

export const paymentMethods = ['VISA', 'MasterCard', 'JCB', 'ATM / Napas', 'Home PayLater', 'MoMo']

export interface PaymentIcon {
  name: string
  url: string
}

export const paymentIcons: PaymentIcon[] = [
  { name: 'VISA', url: 'https://mayanhvietnam.com/asset/imgs/icon/hinhThucThanhToan/visa_icon_44fe6e15ed.svg' },
  { name: 'MasterCard', url: 'https://mayanhvietnam.com/asset/imgs/icon/hinhThucThanhToan/mastercard_icon_c75f94f6a5.svg' },
  { name: 'JCB', url: 'https://mayanhvietnam.com/asset/imgs/icon/hinhThucThanhToan/jcb_icon_214783937c.svg' },
  { name: 'ATM / Napas', url: 'https://mayanhvietnam.com/asset/imgs/icon/hinhThucThanhToan/napas_icon_94d5330e3c.svg' },
  { name: 'Home PayLater', url: 'https://mayanhvietnam.com/asset/imgs/icon/hinhThucThanhToan/homepaylater_icon_adef600842.svg' },
  { name: 'MoMo', url: 'https://mayanhvietnam.com/asset/imgs/icon/hinhThucThanhToan/momo_icon_baef21b5f7.svg' },
]

export const socialLinks = [
  { platform: 'YouTube', url: 'https://www.youtube.com/@benhvienmayanhvietnam950' },
  { platform: 'TikTok', url: 'https://www.tiktok.com/@mayanhvietnam' },
  { platform: 'Facebook', url: 'https://www.facebook.com/mayanhvietnam' },
  { platform: 'Zalo', url: 'https://zalo.me/2875467351509223987' },
]

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
export function formatVND(amount: number): string {
  return new Intl.NumberFormat('vi-VN').format(amount) + 'đ'
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter((p) => p.categorySlug === categorySlug)
}
