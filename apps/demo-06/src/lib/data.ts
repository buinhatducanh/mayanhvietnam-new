// ============================================================
// mayanhvietnam.com — Business Data Layer
// Scraped 2026-07-10 from mayanhvietnam.com
// ============================================================

// ─── HELPERS ────────────────────────────────────────────────────────────────

/** Parse product slug from scraped fullSlug like "/san-pham/xxx_yyy-123" */
export function parseSlug(fullSlug: string): string {
  const m = fullSlug.match(/^\/san-pham\/(.+?)_/);
  return m ? m[1] : fullSlug.replace("/san-pham/", "");
}

/** Convert priceDisplay string like "Giá giao động: 17,500,000đ" to number */
export function parsePrice(priceDisplay: string): number {
  const m = priceDisplay.replace(/\./g, "").match(/([\d,]+)/);
  if (!m) return 0;
  return parseInt(m[1].replace(/,/g, ""), 10);
}

const VND = (n: number) =>
  n > 0 ? new Intl.NumberFormat("vi-VN").format(n) + "đ" : "Vui lòng gọi";

const CDN = "https://mayanhvietnam.com";

// ─── TYPES ────────────────────────────────────────────────────────────────

export type Category =
  | "camera"
  | "lens"
  | "flycam"
  | "action"
  | "camcorder"
  | "accessory"
  | "studio"
  | "used";

export type Brand = string;

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: Category;
  /** Starting price in VND (0 = call for price) */
  price: number;
  /** Display string from scraped data */
  priceDisplay: string;
  /** Full slug from scraped data, e.g. "/san-pham/xxx_yyy-123" */
  fullSlug: string;
  /** CDN thumbnail URL */
  thumbnail: string;
  /** Additional images (for PDP gallery) */
  images?: string[];
  /** Short specs */
  specs?: string[];
  /** Rich PDP specs table: [{label, value}] */
  detailedSpecs?: { label: string; value: string; group?: string }[];
  /** Badge like "Chính hãng", "Mới", "Hot" */
  badge?: string;
  /** Badges từ scraped PDP (e.g. "MỚI 100%", "Like new (2)") */
  badges?: string[];
  /** Stock status */
  stockStatus?: string;
  /** Condition */
  condition?: "new" | "used" | "like-new";
  /** Original price before discount */
  originalPrice?: number;
  /** Variants/conditions (for PDP) */
  variants?: { condition: string; price: number; quantity?: number }[];
  /** Highlights bullets */
  highlights?: string[];
  /** Promotions */
  promotions?: string[];
  /** Package includes */
  packageIncludes?: string[];
  /** Long-form description */
  description?: string;
  /** Long-form overview article (markdown-ish) for PDP "Tổng quan" tab */
  overview?: string;
  /** Pros & cons */
  pros?: string[];
  cons?: string[];
  /** Tags for SEO */
  tags?: string[];
  /** Other (new) products for "Sản phẩm khác" tab — product IDs */
  otherIds?: string[];
  /** Used products for "Sản phẩm cũ" tab — product IDs */
  usedIds?: string[];
  /** Rich article content (markdown) — rendered directly on PDP as a review/article section */
  article?: {
    /** Article title (e.g. "Đánh giá Canon EOS R50 — Chi tiết từ A đến Z") */
    title: string;
    /** Author display name */
    author?: string;
    /** Publication date ISO string */
    publishDate?: string;
    /** Estimated reading time in minutes */
    readTime?: number;
    /** Cover image for the article (if different from product main image) */
    coverImage?: string;
    /** Table of contents items (auto-generated from headings if omitted) */
    toc?: { id: string; label: string }[];
    /** Sections — array of content blocks rendered sequentially */
    sections: {
      /** Optional heading for this section */
      heading?: string;
      /** Markdown-ish body content */
      content: string;
      /** Optional images to show within this section */
      images?: string[];
    }[];
  };
}

export interface Banner {
  title?: string;
  subtitle?: string;
  image: string;
  link: string;
  bgColor?: string;
  badge?: string;
}

export interface CategoryItem {
  name: string;
  iconUrl: string;
  link: string;
}

// ─── BRAND ASSETS ─────────────────────────────────────────────────────────

export const brandAssets = {
  logo: `${CDN}/asset/imgs/icon/Logo_white01.png`,
  logoFull: `${CDN}/asset/imgs/img/Logo_white.png`,
  logoBCT: `${CDN}/asset/imgs/icon/logoBCT.png`,
  paymentIcons: {
    visa: `${CDN}/asset/imgs/icon/hinhThucThanhToan/visa_icon_44fe6e15ed.svg`,
    mastercard: `${CDN}/asset/imgs/icon/hinhThucThanhToan/mastercard_icon_c75f94f6a5.svg`,
    jcb: `${CDN}/asset/imgs/icon/hinhThucThanhToan/jcb_icon_214783937c.svg`,
    napas: `${CDN}/asset/imgs/icon/hinhThucThanhToan/napas_icon_94d5330e3c.svg`,
    homePayLater: `${CDN}/asset/imgs/icon/hinhThucThanhToan/homepaylater_icon_adef600842.svg`,
    momo: `${CDN}/asset/imgs/icon/hinhThucThanhToan/momo_icon_baef21b5f7.svg`,
  },
};

// ─── SCRAPED HOMEPAGE DATA ─────────────────────────────────────────────────

// Hero banners (canonical main hero + real product banners from mayanhvietnam.com)
export const banners: Banner[] = [
  {
    image: `${CDN}/asset/imgs/img/banner/canon-r6-mark-III.webp`,
    link: "/san-pham/may-anh-canon-eos-r6-mark-iii-body_may-anh-mirrorless-250315190440715",
    title: "Canon EOS R6 Mark III",
    subtitle: "Cảm biến Full-frame 24.2MP · IBIS 5 trục · Quay 4K 60p 10-bit — đỉnh cao mirrorless phổ thông cho cả chụp ảnh và quay phim chuyên nghiệp.",
    badge: "Mới ra mắt",
  },
  {
    image: `${CDN}/asset/imgs/img/banner/sony-a7r-vi-1.webp`,
    link: "/san-pham/may-anh-sony-alpha-a7r-vi_may-anh-mirrorless-260328143107303",
    title: "Sony Alpha A7R VI",
    subtitle: "Cảm biến BSI CMOS 61MP · Bộ xử lý AI · 8K Video · IBIS 8-stop — flagship mirrorless dành cho nhiếp ảnh gia chuyên nghiệp.",
    badge: "Flagship 2026",
  },
  {
    image: `${CDN}/asset/imgs/img/banner/uuDai-sonya7v-DCHS.webp`,
    link: "/san-pham/may-anh-sony-a7-mark-v-a7m5-chinh-hang_may-anh-mirrorless-251126090035598",
    title: "Sony Alpha A7 Mark V (A7M5)",
    subtitle: "33MP Full-frame · AI AF thế hệ mới · 4K 120p · 2 khe CFexpress Type A — chiếc máy hybrid hoàn hảo cho sáng tạo nội dung 2026.",
    badge: "Ưu đãi đặc biệt",
  },
  {
    image: `${CDN}/asset/imgs/img/banner/canon_r50_trang_den.webp`,
    link: "/san-pham/may-anh-canon-eos-r50-black-kem-lens-rfs-1845-chinh-hang_may-anh-mirrorless-241228112737843",
    title: "Canon EOS R50 kèm Lens Kit",
    subtitle: "24.2MP APS-C · Dual Pixel CMOS AF II 4.503 điểm · 4K 30p không crop · 375g — máy ảnh lý tưởng cho người mới bắt đầu và vlogger.",
    badge: "Bán chạy nhất",
  },
  {
    image: `${CDN}/asset/imgs/img/banner/sony-uu-dai-thang-1.webp`,
    link: "/danh-muc/may-anh-khuyen-mai-brd-sony",
    title: "Ưu đãi Sony tháng này",
    subtitle: "Trả góp 0% qua thẻ tín dụng · Tặng thẻ nhớ 64GB · Dán màn hình miễn phí trọn đời cho mọi máy ảnh Sony chính hãng.",
    badge: "Khuyến mãi hot",
  },
];

// Category grid from scraped homepage.json
export const graphicNav: CategoryItem[] = [
  { name: "Máy ảnh - Body", iconUrl: `${CDN}/asset/imgs/img/danhMuc_MayAnh.webp`, link: "/danh-muc/may-anh" },
  { name: "Ống kính - Lens", iconUrl: `${CDN}/asset/imgs/img/danhMuc_ongkinh.webp`, link: "/danh-muc/ong-kinh" },
  { name: "Sản phẩm cũ giá tốt", iconUrl: `${CDN}/asset/imgs/img/danhMuc_spCu.webp`, link: "/danh-muc-2nd/tat-ca-san-pham" },
  { name: "Dịch vụ lắp phông", iconUrl: `${CDN}/asset/imgs/img/danhMuc_setupPhong.webp`, link: "/dich-vu-lap-phong" },
  { name: "Camera hành động", iconUrl: `${CDN}/asset/imgs/img/danhMuc_action.webp`, link: "/danh-muc/action-camera" },
  { name: "Flycam - Drone", iconUrl: `${CDN}/asset/imgs/img/danhMuc_flycam.webp`, link: "/danh-muc/flycam" },
  { name: "Thiết bị studio", iconUrl: `${CDN}/asset/imgs/img/danhMuc_thietBiStudio.webp`, link: "/danh-muc/thiet-bi-studio" },
  { name: "Phụ kiện cho máy ảnh", iconUrl: `${CDN}/asset/imgs/img/danhMuc_phuKien.webp`, link: "/danh-muc/phu-kien" },
  { name: "Máy quay phim", iconUrl: `${CDN}/asset/imgs/img/danhMuc_mayQuayPhim.webp`, link: "/danh-muc/may-quay-phim" },
];

// ─── PRODUCTS ───────────────────────────────────────────────────────────────

export const products: Product[] = [
  // ══════════════════════════════════════════════════════
  // CAMERAS — 24 products (scraped from plp-may-anh.json)
  // ══════════════════════════════════════════════════════

  {
    id: "may-anh-sony-alpha-a7r-vi",
    name: "Máy ảnh Sony Alpha A7R VI",
    brand: "Sony",
    category: "camera",
    price: 113990000,
    priceDisplay: "Giá giao động: 113,990,000đ",
    fullSlug: "/san-pham/may-anh-sony-alpha-a7r-vi_may-anh-mirrorless-260328143107303",
    thumbnail: "https://mayanhvietnam.com/image-data/san-pham/26-03/26-03-28/260328143107303/avatar/639103051286629766-Alpha-A7R-Mark-VI-png_may-anh-sony-alpha-a7r-vi.jpg",

    images: [
      "https://mayanhvietnam.com/image-data/san-pham/26-03/26-03-28/260328143107303/avatar/639103051286629766-Alpha-A7R-Mark-VI-png_may-anh-sony-alpha-a7r-vi.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-10/230210223540394/avatar/01.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-02/240802084518870/avatar/638719291858080629.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-02/240802084419498/avatar/638692697759009422.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-24/240824141547867/avatar/638601115883421748.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/25-07/25-07-11/250711141506840/avatar/638955413887000088.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/25-11/25-11-26/251126090035598/avatar/639005206164966322.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/25-12/25-12-09/251209090438536/avatar/639008696959464299.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/25-04/25-04-01/250401154750200/avatar/638791195089528514.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-01/240801175147151/avatar/638692586740986637.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-10/230210223530566/avatar/01.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-10/230210224704223/avatar/01.jpg"
    ],    specs: ["61MP Full-frame BSI CMOS", "AI Processing Unit", "8K Video", "8-stop IBIS"],
    badge: "Flagship",
  },
  {
    id: "may-anh-sony-alpha-a7s-mark-iii-ilce7sm3",
    name: "Sony Alpha A7S Mark III | ILCE-7SM3",
    brand: "Sony",
    category: "camera",
    price: 75590000,
    priceDisplay: "Giá giao động: 75,590,000đ",
    fullSlug: "/san-pham/may-anh-sony-alpha-a7s-mark-iii-ilce7sm3_may-anh-mirrorless-240802084518870",
    thumbnail: "https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-02/240802084518870/avatar/638719291858080629_may-anh-sony-alpha-a7s-mark-iii-ilce-7sm3.jpg",

    images: [
      "https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-02/240802084518870/avatar/638719291858080629_may-anh-sony-alpha-a7s-mark-iii-ilce-7sm3.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/26-03/26-03-28/260328143107303/avatar/639103051286629766-Alpha-A7R-Mark-VI-png.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-10/230210223540394/avatar/01.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-02/240802084419498/avatar/638692697759009422.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-24/240824141547867/avatar/638601115883421748.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/25-07/25-07-11/250711141506840/avatar/638955413887000088.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/25-11/25-11-26/251126090035598/avatar/639005206164966322.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/25-12/25-12-09/251209090438536/avatar/639008696959464299.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/25-04/25-04-01/250401154750200/avatar/638791195089528514.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-01/240801175147151/avatar/638692586740986637.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-10/230210223530566/avatar/01.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-10/230210224704223/avatar/01.jpg"
    ],    specs: ["12.1MP Full-frame", "BIONZ XR", "4K 120p 16-bit RAW", "ISO up to 409,600"],
    badge: "Video",
  },
  {
    id: "may-anh-sony-alpha-a7r-mark-v-chinh-hang",
    name: "Sony Alpha A7R Mark V (Chính hãng)",
    brand: "Sony",
    category: "camera",
    price: 86390000,
    priceDisplay: "Giá giao động: 86,390,000đ",
    fullSlug: "/san-pham/may-anh-sony-alpha-a7r-mark-v-chinh-hang_may-anh-mirrorless-240802084419498",
    thumbnail: "https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-02/240802084419498/avatar/638692697759009422_may-anh-sony-alpha-a7r-mark-v-chinh-hang.jpg",

    images: [
      "https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-02/240802084419498/avatar/638692697759009422_may-anh-sony-alpha-a7r-mark-v-chinh-hang.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/26-03/26-03-28/260328143107303/avatar/639103051286629766-Alpha-A7R-Mark-VI-png.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-10/230210223540394/avatar/01.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-02/240802084518870/avatar/638719291858080629.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-24/240824141547867/avatar/638601115883421748.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/25-07/25-07-11/250711141506840/avatar/638955413887000088.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/25-11/25-11-26/251126090035598/avatar/639005206164966322.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/25-12/25-12-09/251209090438536/avatar/639008696959464299.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/25-04/25-04-01/250401154750200/avatar/638791195089528514.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-01/240801175147151/avatar/638692586740986637.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-10/230210223530566/avatar/01.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-10/230210224704223/avatar/01.jpg"
    ],    specs: ["61MP Full-frame", "AI AF", "8K Video", "8-stop IBIS"],
    badge: "Chính hãng",
  },
  {
    id: "may-anh-sony-alpha-a7r-mark-iv-chinh-hang",
    name: "Sony Alpha A7R Mark IV (Chính Hãng)",
    brand: "Sony",
    category: "camera",
    price: 78500000,
    priceDisplay: "Giá giao động: 78,500,000đ",
    fullSlug: "/san-pham/may-anh-sony-alpha-a7r-mark-iv-chinh-hang_may-anh-mirrorless-240824141547867",
    thumbnail: "https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-24/240824141547867/avatar/638601115883421748_may-anh-sony-alpha-a7r-mark-iv-chinh-hang.jpg",

    images: [
      "https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-24/240824141547867/avatar/638601115883421748_may-anh-sony-alpha-a7r-mark-iv-chinh-hang.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-24/240824141547867/avatar/638601115883421748.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/26-03/26-03-28/260328143107303/avatar/639103051286629766-Alpha-A7R-Mark-VI-png.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-10/230210223540394/avatar/01.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-02/240802084518870/avatar/638719291858080629.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-02/240802084419498/avatar/638692697759009422.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/25-07/25-07-11/250711141506840/avatar/638955413887000088.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/25-11/25-11-26/251126090035598/avatar/639005206164966322.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/25-12/25-12-09/251209090438536/avatar/639008696959464299.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/25-04/25-04-01/250401154750200/avatar/638791195089528514.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-01/240801175147151/avatar/638692586740986637.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-10/230210223530566/avatar/01.jpg"
    ],    specs: ["61MP Full-frame", "5-axis IBIS", "4K 60p", "Pixel Shift Multi-shot"],
    badge: "Chính hãng",
  },
  {
    id: "may-anh-sony-a7-mark-v-a7m5-chinh-hang",
    name: "Sony A7 Mark V (A7M5) | Chính Hãng",
    brand: "Sony",
    category: "camera",
    price: 69990000,
    priceDisplay: "Giá giao động: 69,990,000đ",
    fullSlug: "/san-pham/may-anh-sony-a7-mark-v-a7m5-chinh-hang_may-anh-mirrorless-251126090035598",
    thumbnail: "https://mayanhvietnam.com/image-data/san-pham/25-11/25-11-26/251126090035598/avatar/639005206164966322_may-anh-sony-a7-mark-v-a7m5-chinh-hang.jpg",

    images: [
      "https://mayanhvietnam.com/image-data/san-pham/25-11/25-11-26/251126090035598/avatar/639005206164966322_may-anh-sony-a7-mark-v-a7m5-chinh-hang.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/26-03/26-03-28/260328143107303/avatar/639103051286629766-Alpha-A7R-Mark-VI-png.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-10/230210223540394/avatar/01.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-02/240802084518870/avatar/638719291858080629.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-02/240802084419498/avatar/638692697759009422.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-24/240824141547867/avatar/638601115883421748.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/25-07/25-07-11/250711141506840/avatar/638955413887000088.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/25-12/25-12-09/251209090438536/avatar/639008696959464299.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/25-04/25-04-01/250401154750200/avatar/638791195089528514.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-01/240801175147151/avatar/638692586740986637.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-10/230210223530566/avatar/01.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-10/230210224704223/avatar/01.jpg"
    ],    specs: ["33MP Full-frame", "AI AF", "4K 120p", "Dual CFexpress"],
    badge: "Mới",
  },
  {
    id: "may-anh-sony-a9-iii-chinh-hang",
    name: "Sony A9 III | Chính hãng",
    brand: "Sony",
    category: "camera",
    price: 143300000,
    priceDisplay: "Giá giao động: 143,300,000đ",
    fullSlug: "/san-pham/may-anh-sony-a9-iii-chinh-hang_may-anh-mirrorless-251209090438536",
    thumbnail: "https://mayanhvietnam.com/image-data/san-pham/25-12/25-12-09/251209090438536/avatar/639008696959464299_may-anh-sony-a9-iii-chinh-hang.jpg",

    images: [
      "https://mayanhvietnam.com/image-data/san-pham/25-12/25-12-09/251209090438536/avatar/639008696959464299_may-anh-sony-a9-iii-chinh-hang.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/26-03/26-03-28/260328143107303/avatar/639103051286629766-Alpha-A7R-Mark-VI-png.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-10/230210223540394/avatar/01.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-02/240802084518870/avatar/638719291858080629.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-02/240802084419498/avatar/638692697759009422.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-24/240824141547867/avatar/638601115883421748.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/25-07/25-07-11/250711141506840/avatar/638955413887000088.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/25-11/25-11-26/251126090035598/avatar/639005206164966322.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/25-04/25-04-01/250401154750200/avatar/638791195089528514.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-01/240801175147151/avatar/638692586740986637.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-10/230210223530566/avatar/01.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-10/230210224704223/avatar/01.jpg"
    ],    specs: ["24.6MP Stacked Global Shutter", "120fps", "1/80000s shutter", "4K 120p"],
    badge: "Flagship",
  },
  {
    id: "may-anh-sony-alpha-a7-mark-iv-body-only-chinh-hang",
    name: "Máy ảnh Sony Alpha A7 Mark IV (Body Only) | Chính hãng",
    brand: "Sony",
    category: "camera",
    price: 47500000,
    priceDisplay: "Giá giao động: 47,500,000đ",
    fullSlug: "/san-pham/may-anh-sony-alpha-a7-mark-iv-body-only-chinh-hang_may-anh-mirrorless-230210223540859",
    thumbnail: "https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-10/230210223540859/avatar/01_may-anh-sony-alpha-a7-mark-iv-body-only-chinh-hang.jpg",
    specs: ["33MP Full-frame", "BIONZ XR", "4K 60p", "Eye AF"],
    badge: "Chính hãng",
    badges: ["MỚI 100%", "Like new (1)", "CHÍNH HÃNG"],
    stockStatus: "Còn hàng",
    images: [
      "https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-10/230210223540859/avatar/01_may-anh-sony-alpha-a7-mark-iv-body-only-chinh-hang.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-10/230210223540859/avatar/02_may-anh-sony-alpha-a7-mark-iv-body-only-chinh-hang.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-10/230210223540859/avatar/03_may-anh-sony-alpha-a7-mark-iv-body-only-chinh-hang.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-10/230210223540859/avatar/04_may-anh-sony-alpha-a7-mark-iv-body-only-chinh-hang.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-10/230210223540859/avatar/05_may-anh-sony-alpha-a7-mark-iv-body-only-chinh-hang.jpg",
    ],
    highlights: [
      "759 điểm lấy nét pha + 425 tương phản",
      "Bộ xử lý BIONZ XR",
      "Cảm biến Exmor R 33MP",
      "10fps, ISO 100-51200",
    ],
    promotions: [
      "🎁 Trả góp 0% qua thẻ tín dụng",
      "⭐ Tặng thẻ nhớ 64GB khi mua kèm lens",
    ],
    description: "Sony Alpha A7 Mark IV là máy ảnh mirrorless Full-frame thế hệ mới với cảm biến BSI Exmor R CMOS 33MP kết hợp bộ xử lý BIONZ XR mạnh mẽ. Hệ thống AF lai 759 điểm phase + 425 điểm tương phản cùng Real-time Eye AF cho cả người, động vật và chim.",
    detailedSpecs: [
      { group: "Cảm biến", label: "Định dạng cảm biến", value: "CMOS 35.9 x 23.9 mm (Full Frame)" },
      { group: "Cảm biến", label: "Độ phân giải", value: "33 Megapixel" },
      { group: "Cảm biến", label: "Bộ xử lý", value: "BIONZ XR" },
      { group: "Cảm biến", label: "Định dạng ảnh", value: "JPEG, RAW, HEIF (10-bit)" },
      { group: "Lấy nét", label: "Hệ thống AF", value: "Fast Hybrid AF" },
      { group: "Lấy nét", label: "Điểm AF pha", value: "759 điểm" },
      { group: "Lấy nét", label: "Điểm AF tương phản", value: "425 điểm" },
      { group: "Chụp ảnh", label: "Tốc độ màn trập", value: "1/8000 đến 30 giây, Bulb" },
      { group: "Chụp ảnh", label: "Burst rate", value: "10 fps (828 ảnh RAW, không giới hạn JPEG)" },
      { group: "Chụp ảnh", label: "Dải ISO", value: "100 - 51200 (mở rộng 50 - 204800)" },
      { group: "Video", label: "4K UHD", value: "60p / 30p / 24p (10-bit 4:2:2)" },
      { group: "Video", label: "Full HD", value: "120p / 60p / 30p / 24p" },
      { group: "Video", label: "Codec", value: "XAVC HS, XAVC S-I, XAVC S" },
      { group: "Video", label: "Gamma", value: "S-Log2, S-Log3, S-Cinetone, HLG" },
      { group: "Hiển thị", label: "LCD", value: "LCD cảm ứng nghiêng tự do 3.0 inch, 1.036.800 điểm" },
      { group: "Hiển thị", label: "EVF", value: "OLED 0.5 inch, 3.68M điểm, 0.78x, 100%" },
      { group: "Lưu trữ", label: "Khe 1", value: "CFexpress Type A / SD UHS-II" },
      { group: "Lưu trữ", label: "Khe 2", value: "SD / SDHC / SDXC (UHS-II)" },
      { group: "Lưu trữ", label: "USB", value: "USB-C 3.2 Gen 2 + USB Micro-B" },
      { group: "Lưu trữ", label: "HDMI", value: "HDMI Type A (full size)" },
      { group: "Vật lý", label: "Mount", value: "Sony E" },
      { group: "Vật lý", label: "Pin", value: "NP-FZ100 (~580 ảnh EVF / 700 LCD)" },
      { group: "Vật lý", label: "Trọng lượng", value: "658g (body + pin + thẻ)" },
      { group: "Vật lý", label: "Kích thước", value: "131.3 × 96.4 × 79.8 mm" },
    ],
    variants: [
      { condition: "MỚI 100%", price: 47500000, quantity: 5 },
      { condition: "Like new", price: 42500000, quantity: 1 },
    ],
    packageIncludes: [
      "Sony A7 IV body",
      "Pin NP-FZ100",
      "Sạc AC",
      "Nắp ALC-B1EM",
      "Dây đeo vai",
      "Accessory Shoe Cap",
      "Eyepiece Cup",
      "Cáp USB-C",
    ],
    overview: "## Tổng quan Sony A7 Mark IV\n\nSony Alpha A7 Mark IV là máy ảnh mirrorless Full-frame thế hệ mới với cảm biến BSI Exmor R CMOS 33MP kết hợp bộ xử lý BIONZ XR mạnh mẽ. Hệ thống AF lai 759 điểm phase + 425 điểm tương phản, Real-time Eye AF cho người, động vật và chim. Quay video 4K 60p 10-bit 4:2:2, hỗ trợ S-Log3 và S-Cinetone cho post-production chuyên nghiệp.\n\nĐiểm mạnh lớn nhất của A7 IV là sự kết hợp giữa độ phân giải cao (33MP) và tốc độ chụp nhanh (10fps) — phù hợp cho cả nhiếp ảnh tĩnh và video. EVF OLED 3.68M điểm, LCD cảm ứng nghiêng tự do, 2 khe thẻ (CFexpress Type A + SD), và pin NP-FZ100 cho khoảng 580 ảnh.\n\nThiết kế ergonomics cải tiến với grip lớn hơn, nút điều khiển mới, và micro stereo tích hợp. Phù hợp cho photographer chuyên nghiệp, wedding photographer, và filmmaker cần máy hybrid mạnh mẽ.",
    pros: ["Cảm biến Full-frame 33MP + BIONZ XR", "AF 759 phase + 425 contrast điểm", "4K 60p 10-bit 4:2:2 + S-Cinetone", "EVF OLED 3.68M điểm, 0.78x", "2 khe thẻ CFexpress + SD", "USB-C 3.2 Gen 2 + HDMI full size"],
    cons: ["Không có 8K video", "Máy nặng 658g", "Không có màn hình xoay lật đầy đủ"],
    tags: ["Sony A7 IV", "A7IV", "Sony Alpha", "Mirrorless Full-frame", "33MP", "Body Only", "Máy ảnh Sony"],
    otherIds: ["may-anh-sony-a9-iii-chinh-hang", "may-anh-sony-alpha-a7r-mark-v-chinh-hang", "may-anh-canon-eos-r8-body-only", "may-anh-sony-zve10-ii-black-body-only-chinh-hang"],
    usedIds: ["may-anh-sony-alpha-a7r-mark-iv-chinh-hang", "may-anh-sony-alpha-a7s-mark-iii-ilce7sm3"],
    article: {
      title: "Đánh giá Sony Alpha A7 Mark IV — Hybrid Full-frame hoàn hảo 2026",
      author: "Biên tập Máy Ảnh Việt Nam",
      publishDate: "2026-07-05",
      readTime: 12,
      toc: [
        { id: "thiet-ke", label: "Thiết kế & Cảm biến" },
        { id: "hieu-nang", label: "Hiệu năng lấy nét" },
        { id: "video", label: "Khả năng quay Video" },
        { id: "thuc-te", label: "Trải nghiệm thực tế" },
        { id: "ket-luan", label: "Kết luận & Đối tượng phù hợp" },
      ],
      sections: [
        {
          heading: "Thiết kế & Cảm biến",
          content: "Sony A7 IV là sự kết hợp tinh tế giữa cảm biến BSI Exmor R CMOS 33MP mới và bộ xử lý BIONZ XR — bộ đôi cho phép cân bằng giữa độ phân giải cao và tốc độ xử lý nhanh. Thân máy được làm từ hợp kim magiê, grip sâu hơn giúp cầm nắm thoải mái trong các buổi chụp dài.\n\nMàn hình LCD 3 inch cảm ứng nghiêng tự do 1.04 triệu điểm, EVF OLED 3.68M điểm phóng đại 0.78x. Trọng lượng body khoảng 658g (kèm pin và thẻ) — nặng hơn đáng kể so với dòng entry nhưng vẫn dễ chịu cho phiên chụp cả ngày.",
          images: [],
        },
        {
          heading: "Hiệu năng lấy nét",
          content: "Hệ thống AF lai với 759 điểm phase + 425 điểm tương phản phủ 94% khung hình. Real-time Eye AF nay đã hỗ trợ cả người, động vật và chim — lý tưởng cho wildlife và pet photographer.\n\nĐiểm nổi bật là AI xử lý của BIONZ XR giúp tracking bám sát chủ thể ngay cả khi chúng di chuyển nhanh hoặc bị che khuất tạm thời. Trong thử nghiệm thực tế, A7 IV lock nét chính xác trong điều kiện ánh sáng yếu (ISO 6400) mà không bị hunting.",
        },
        {
          heading: "Khả năng quay Video",
          content: "A7 IV quay 4K 60p 10-bit 4:2:2 nội bộ — chất lượng đủ cho sản xuất chuyên nghiệp. Hỗ trợ S-Log3, HLG, S-Cinetone giúp dễ dàng color grading và edit. Full HD 120p cho slow-motion mượt.\n\nSo với A7 III tiền nhiệm, A7 IV có khả năng tản nhiệt tốt hơn — quay 4K 60p liên tục ~60 phút mà không bị giới hạn nhiệt. Pin NP-FZ100 cho phép quay liên tục ~150 phút (LCD) hoặc ~120 phút (EVF) ở chế độ 4K 30p.",
        },
        {
          heading: "Trải nghiệm thực tế",
          content: "Trong một tuần trải nghiệm, A7 IV cho cảm giác là chiếc máy hybrid linh hoạt nhất mà Sony từng sản xuất ở tầm giá này. Ảnh JPEG ra màu đẹp ngay với Creative Look mới, ảnh RAW có dynamic range rộng ~15 stops.\n\nKhi gắn với lens GM (G Master), hệ thống Eye AF hoạt động cực kỳ chính xác cho chụp chân dung. Quay video tutorial, vlog, hay thậm chí short film đều ổn. Hạn chế lớn nhất là không quay được 8K — bạn cần lên A7R V hoặc A1 nếu cần độ phân giải này.",
        },
        {
          heading: "Kết luận & Đối tượng phù hợp",
          content: "Sony Alpha A7 Mark IV là lựa chọn đáng tiền nhất ở phân khúc hybrid cao cấp năm 2026. Phù hợp cho:\n\n- Photographer hybrid (chụp + quay) chuyên nghiệp\n- Wedding/event photographer cần máy đáng tin cậy\n- Content creator / YouTuber chuyên nghiệp\n- Wildlife/pet photographer cần Eye AF tốt\n\nNếu bạn cần 8K video, cân nhắc Sony A7R V hoặc Canon R5 Mark II. Nếu cần máy nhẹ cho vlog, hãy xem Sony ZV-E10 II hoặc Canon R50.",
        },
      ],
    },
  },
  {
    id: "sony-a6400-kem-lens-1650-f3556-oss-ii-black-chinh-hang",
    name: "Sony A6400 kèm Lens 16-50mm f/3.5-5.6 OSS II (Black) | Chính Hãng",
    brand: "Sony",
    category: "camera",
    price: 23060000,
    priceDisplay: "Giá giao động: 23,060,000đ",
    fullSlug: "/san-pham/sony-a6400-kem-lens-1650-f3556-oss-ii-black-chinh-hang_may-anh-mirrorless-250711141506840",
    thumbnail: "https://mayanhvietnam.com/image-data/san-pham/25-07/25-07-11/250711141506840/avatar/638955413887000088_sony-a6400-kem-lens-16-50mm-f-3-5-5-6-oss-ii-black-chinh-hang.jpg",

    images: [
      "https://mayanhvietnam.com/image-data/san-pham/25-07/25-07-11/250711141506840/avatar/638955413887000088_sony-a6400-kem-lens-16-50mm-f-3-5-5-6-oss-ii-black-chinh-hang.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/25-07/25-07-11/250711141506840/avatar/638878401203332710.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/26-03/26-03-28/260328143107303/avatar/639103051286629766-Alpha-A7R-Mark-VI-png.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-10/230210223540394/avatar/01.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-02/240802084518870/avatar/638719291858080629.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-02/240802084419498/avatar/638692697759009422.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-24/240824141547867/avatar/638601115883421748.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/25-11/25-11-26/251126090035598/avatar/639005206164966322.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/25-12/25-12-09/251209090438536/avatar/639008696959464299.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/25-04/25-04-01/250401154750200/avatar/638791195089528514.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-01/240801175147151/avatar/638692586740986637.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-10/230210223530566/avatar/01.jpg"
    ],    specs: ["24.2MP APS-C", "Real-time Eye AF", "4K 30p", "11fps"],
    badge: "Chính hãng",
  },
  {
    id: "may-anh-canon-powershot-v1-chinh-hang",
    name: "Canon PowerShot V1 | Chính Hãng",
    brand: "Canon",
    category: "camera",
    price: 21000000,
    priceDisplay: "Giá giao động: 21,000,000đ",
    fullSlug: "/san-pham/may-anh-canon-powershot-v1-chinh-hang_may-anh-compact-250401154750200",
    thumbnail: "https://mayanhvietnam.com/image-data/san-pham/25-04/25-04-01/250401154750200/avatar/638791195089528514_may-anh-canon-powershot-v1-chinh-hang.jpg",

    images: [
      "https://mayanhvietnam.com/image-data/san-pham/25-04/25-04-01/250401154750200/avatar/638791195089528514_may-anh-canon-powershot-v1-chinh-hang.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/26-03/26-03-28/260328143107303/avatar/639103051286629766-Alpha-A7R-Mark-VI-png.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-10/230210223540394/avatar/01.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-02/240802084518870/avatar/638719291858080629.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-02/240802084419498/avatar/638692697759009422.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-24/240824141547867/avatar/638601115883421748.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/25-07/25-07-11/250711141506840/avatar/638955413887000088.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/25-11/25-11-26/251126090035598/avatar/639005206164966322.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/25-12/25-12-09/251209090438536/avatar/639008696959464299.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-01/240801175147151/avatar/638692586740986637.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-10/230210223530566/avatar/01.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-10/230210224704223/avatar/01.jpg"
    ],    specs: ["1\" CMOS 20.4MP", "f/1.8-2.8 Lens", "4K 30p", "Compact"],
    badge: "Mới",
  },
  {
    id: "may-anh-canon-eos-r7-chinh-hang",
    name: "Canon EOS R7 | Chính Hãng",
    brand: "Canon",
    category: "camera",
    price: 31000000,
    priceDisplay: "Giá giao động: 31,000,000đ",
    fullSlug: "/san-pham/may-anh-canon-eos-r7-chinh-hang_may-anh-mirrorless-240801175147151",
    thumbnail: "https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-01/240801175147151/avatar/638692586740986637_may-anh-canon-eos-r7-chinh-hang.jpg",

    images: [
      "https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-01/240801175147151/avatar/638692586740986637_may-anh-canon-eos-r7-chinh-hang.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-01/240801175147151/avatar/638692586740986637.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/26-03/26-03-28/260328143107303/avatar/639103051286629766-Alpha-A7R-Mark-VI-png.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-10/230210223540394/avatar/01.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-02/240802084518870/avatar/638719291858080629.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-02/240802084419498/avatar/638692697759009422.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-24/240824141547867/avatar/638601115883421748.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/25-07/25-07-11/250711141506840/avatar/638955413887000088.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/25-11/25-11-26/251126090035598/avatar/639005206164966322.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/25-12/25-12-09/251209090438536/avatar/639008696959464299.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/25-04/25-04-01/250401154750200/avatar/638791195089528514.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-10/230210223530566/avatar/01.jpg"
    ],    specs: ["32.5MP APS-C", "DIGIC X", "4K 60p", "In-body IS"],
    badge: "Chính hãng",
  },
  {
    id: "may-anh-canon-eos-r50-black-kem-lens-rfs-1845-chinh-hang",
    name: "Máy ảnh Canon EOS R50 Black kèm Lens RF-S 18-45mm | Chính Hãng",
    brand: "Canon",
    category: "camera",
    price: 17500000,
    priceDisplay: "Giá giao động: 17,500,000đ",
    fullSlug: "/san-pham/may-anh-canon-eos-r50-black-kem-lens-rfs-1845-chinh-hang_may-anh-mirrorless-241228112737843",
    thumbnail: "https://mayanhvietnam.com/image-data/san-pham/24-12/24-12-28/241228112737843/avatar/638709822567106100_may-anh-canon-eos-r50-black-kem-lens-rf-s-18-45mm-chinh-hang.jpg",
    specs: ["24.2MP APS-C", "DIGIC X", "4K 30p", "299g"],
    badge: "Bán chạy",
    badges: ["MỚI 100%", "Like new (2)", "Ngoại hình Đẹp (1)", "CHÍNH HÃNG"],
    stockStatus: "Còn hàng",
    images: [
      "https://mayanhvietnam.com/image-data/san-pham/24-12/24-12-28/241228112737843/avatar/638709822567106100_may-anh-canon-eos-r50-black-kem-lens-rf-s-18-45mm-chinh-hang.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/24-12/24-12-28/241228112737843/hinh-preview/638791169636370514.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/24-12/24-12-28/241228112737843/hinh-preview/638791170527514307.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/24-12/24-12-28/241228112737843/hinh-preview/638791171408544923.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/24-12/24-12-28/241228112737843/hinh-preview/638791171877903330.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/24-12/24-12-28/241228112737843/hinh-preview/638791172399984092.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/24-12/24-12-28/241228112737843/hinh-preview/638791173356043506.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/24-12/24-12-28/241228112737843/hinh-preview/638791174153167452.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/24-12/24-12-28/241228112737843/hinh-preview/638791174490011075.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/24-12/24-12-28/241228112737843/hinh-preview/638791175066496149.jpg",
    ],
    description: "Canon EOS R50 là chiếc máy ảnh lý tưởng cho người yêu nhiếp ảnh. Nhỏ gọn, tinh tế, trọng lượng nhẹ, phù hợp cho người mới bắt đầu và chuyên nghiệp. Cảm biến 24.2MP, quay video 4K, Dual Pixel CMOS AF II 4.503 điểm, chụp liên tiếp 15fps, Wi-Fi và Bluetooth.",
    highlights: [
      "Cảm biến CMOS APS-C 24,2MP",
      "Bộ xử lý DIGIC X",
      "Quay video 4K 30p",
      "Quay khung dọc dễ dàng",
    ],
    promotions: [
      "🎁 Tặng ngay thẻ nhớ 32Gb",
      "⭐ ƯU ĐÃI ĐẶC BIỆT: Dán màn hình free trọn đời máy ảnh",
    ],
    detailedSpecs: [
      { group: "Cảm biến", label: "Loại cảm biến", value: "CMOS" },
      { group: "Cảm biến", label: "Định dạng", value: "APS-C" },
      { group: "Cảm biến", label: "Độ phân giải", value: "24.2 megapixel" },
      { group: "Cảm biến", label: "Kích thước ảnh", value: "6000 x 4000 pixel" },
      { group: "Xử lý", label: "Bộ xử lý", value: "DIGIC X" },
      { group: "Xử lý", label: "ISO", value: "100 – 32,000 (mở rộng lên 51,200)" },
      { group: "Xử lý", label: "Tốc độ màn trập", value: "1/4000 giây đến 30 giây, chế độ Bulb" },
      { group: "Chụp ảnh", label: "Tốc độ chụp liên tiếp", value: "Tối đa 15 khung hình/giây (màn trập điện tử)" },
      { group: "Lấy nét", label: "Số điểm AF", value: "Lên tới 4,503 điểm (Dual Pixel CMOS AF II)" },
      { group: "Lấy nét", label: "Mount", value: "RF" },
      { group: "Video", label: "Độ phân giải", value: "4K 30fps; Full HD 120fps" },
      { group: "Hiển thị", label: "Kính ngắm", value: "EVF 2.36 triệu điểm ảnh, 0.95x, 100%" },
      { group: "Hiển thị", label: "Màn hình", value: "LCD xoay lật cảm ứng 3.0 inch, 1,620,000 điểm ảnh" },
      { group: "Kết nối", label: "Wireless", value: "Wi-Fi, Bluetooth" },
      { group: "Kết nối", label: "Cổng", value: "Micro 3.5mm, USB-C, mini HDMI" },
      { group: "Lưu trữ", label: "Thẻ nhớ", value: "1 khe SD/SDHC/SDXC (UHS-II)" },
      { group: "Vật lý", label: "Trọng lượng", value: "375g (body only)" },
      { group: "Vật lý", label: "Kích thước", value: "116.3 x 85.5 x 68.8 mm" },
      { group: "Vật lý", label: "Pin", value: "LP-E17, khoảng 370 ảnh/lần sạc" },
    ],
    variants: [
      { condition: "MỚI 100%", price: 17500000, quantity: 10 },
      { condition: "Like new", price: 16790000, quantity: 2 },
      { condition: "Ngoại hình Đẹp", price: 0, quantity: 1 },
    ],
    packageIncludes: [
      "Canon EOS R50 Mirrorless Camera (Black)",
      "Pin LP-E17",
      "Sạc LC-E17",
      "Nắp thân R-F-5",
      "Dây đeo EM-200DB",
      "Lens RF-S 18-45mm f/4.5-6.3 IS STM",
      "Nắp lens E-49",
      "Lens Dust Cap RF",
    ],
    overview: "## Tổng quan Canon EOS R50\n\nCanon EOS R50 là chiếc máy ảnh lý tưởng cho người yêu nhiếp ảnh. Nhỏ gọn, tinh tế, trọng lượng nhẹ chỉ 375g — phù hợp cho cả người mới bắt đầu và chuyên nghiệp cần một máy nhẹ làm backup.\n\nSở hữu cảm biến CMOS APS-C 24,2MP thế hệ mới, kết hợp bộ xử lý DIGIC X cho chất lượng hình ảnh sắc nét. Hệ thống Dual Pixel CMOS AF II với 4.503 điểm lấy nét, Eye Tracking thông minh cho người, động vật và phương tiện. Quay video 4K 30p không crop, Full HD 120p slow-motion. Tốc độ chụp liên tiếp 15fps với màn trập điện tử.\n\nLens kit RF-S 18-45mm f/4.5-6.3 IS STM đi kèm phù hợp cho chụp phong cảnh, chân dung, du lịch hàng ngày. Hệ sinh thái RF mount rộng lớn của Canon cho phép nâng cấp lên ống kính chuyên nghiệp dễ dàng.\n\nMáy hỗ trợ Wi-Fi và Bluetooth để chuyển ảnh nhanh sang điện thoại, livestream qua USB-C, quay dọc dễ dàng cho TikTok/Reels. Màn hình LCD cảm ứng 3 inch xoay lật 1,62 triệu điểm, EVF OLED 2,36M điểm.",
    pros: ["Cảm biến APS-C 24.2MP + DIGIC X", "Dual Pixel CMOS AF II 4.503 điểm", "4K 30p không crop + FHD 120p", "15fps chụp liên tiếp", "Trọng lượng chỉ 375g", "Lens kit RF-S 18-45mm đi kèm", "Wi-Fi + Bluetooth + Live Stream USB-C"],
    cons: ["Không có weather-sealing", "Pin LP-E17 chỉ ~370 ảnh/charge", "Chỉ 1 khe thẻ SD"],
    tags: ["Canon R50", "EOS R50", "Canon Mirrorless", "APS-C", "Máy ảnh cho người mới", "Vlog camera", "Body + Lens 18-45mm", "Chính hãng Canon"],
    otherIds: ["may-anh-canon-eos-r8-body-only", "may-anh-canon-eos-r6-mark-ii-body-only", "may-anh-canon-eos-r7-chinh-hang", "may-anh-sony-zve10-ii-black-body-only-chinh-hang"],
    usedIds: ["may-anh-canon-eos-r5-c-body-only", "may-anh-canon-eos-r3-body-only"],
    article: {
      title: "Đánh giá Canon EOS R50 — Máy ảnh mirrorless lý tưởng cho người mới",
      author: "Biên tập Máy Ảnh Việt Nam",
      publishDate: "2026-06-22",
      readTime: 8,
      toc: [
        { id: "tong-quan", label: "Tổng quan" },
        { id: "thiet-ke", label: "Thiết kế nhỏ gọn" },
        { id: "hieu-nang", label: "Chất lượng hình ảnh" },
        { id: "video", label: "Khả năng quay Video & Vlog" },
        { id: "ket-luan", label: "Kết luận" },
      ],
      sections: [
        {
          heading: "Tổng quan",
          content: "Canon EOS R50 là máy ảnh mirrorless APS-C thuộc hệ sinh thái RF/RF-S của Canon. Kế thừa công nghệ từ EOS R5/R6 và R7, R50 là lựa chọn entry-level cao cấp cho người mới bắt đầu nhiếp ảnh hoặc content creator cần máy nhỏ gọn quay video 4K.",
        },
        {
          heading: "Thiết kế nhỏ gọn",
          content: "Với trọng lượng chỉ 375g (body only), EOS R50 là một trong những máy ảnh mirrorless nhẹ nhất hiện nay. Grip vừa vặn cho cả người tay nhỏ. Màn hình LCD 3 inch xoay lật 1,62 triệu điểm lý tưởng cho vlog selfie. EVF OLED 2,36M điểm phóng đại 0.95x cho preview rõ ràng dưới nắng.\n\nVỏ ngoài plastic cao cấp giảm giá thành nhưng vẫn cho cảm giác chắc chắn. Đáng tiếc là không có weather-sealing — cần cẩn thận khi chụp dưới mưa nhẹ.",
        },
        {
          heading: "Chất lượng hình ảnh",
          content: "Cảm biến APS-C 24,2MP + bộ xử lý DIGIC X cho ảnh JPEG ra màu đẹp ngay, đặc biệt tone da rất tốt — lý tưởng cho chân dung và vlog. RAW 14-bit cho dynamic range rộng, dễ dàng khôi phục highlight/shadow trong post.\n\nHệ thống Dual Pixel CMOS AF II với 4.503 điểm AF phủ 100% khung hình — đây là một trong những hệ thống AF tốt nhất ở phân khúc entry. Eye Tracking cho người, động vật và cả phương tiện (xe cộ).",
        },
        {
          heading: "Khả năng quay Video & Vlog",
          content: "EOS R50 quay 4K 30p không crop — điểm cộng lớn so với các đối thủ vẫn crop ở 4K. Full HD 120p cho slow-motion mượt. Hỗ trợ Movie Servo AF, focus breathing correction, và live stream qua USB-C không cần capture card.\n\nĐiểm trừ: không có headphone jack để monitor audio, thời lượng quay 4K 30p giới hạn ~30 phút (do giới hạn EU). Pin LP-E17 chỉ ~370 ảnh/charge — cần pin dự phòng nếu đi chụp cả ngày.",
        },
        {
          heading: "Kết luận",
          content: "Canon EOS R50 là lựa chọn hàng đầu cho người mới bắt đầu và vlogger trong tầm giá dưới 20 triệu. Ưu điểm: nhỏ gọn, AF xuất sắc, 4K không crop, hệ sinh thái RF đa dạng. Hạn chế: pin yếu, không weather-seal, 1 khe thẻ SD.\n\nNếu bạn cần máy hybrid nghiêm túc hơn, xem Canon EOS R10 hoặc Sony ZV-E10 II. Nếu muốn full-frame, Canon EOS R8 là lựa chọn đáng cân nhắc.",
        },
      ],
    },
  },
  {
    id: "may-anh-canon-eos-r8-body-only",
    name: "Canon EOS R8 (Body Only)",
    brand: "Canon",
    category: "camera",
    price: 26900000,
    priceDisplay: "Giá giao động: 26,900,000đ",
    fullSlug: "/san-pham/may-anh-canon-eos-r8-body-only_may-anh-mirrorless-230419151242054",
    thumbnail: "https://mayanhvietnam.com/image-data/san-pham/23-04/23-04-19/230419151242054/avatar/canon-eos-r8-6-500x500_may-anh-canon-eos-r8-body-only.jpg",

    images: [
      "https://mayanhvietnam.com/image-data/san-pham/23-04/23-04-19/230419151242054/avatar/canon-eos-r8-6-500x500_may-anh-canon-eos-r8-body-only.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/26-03/26-03-28/260328143107303/avatar/639103051286629766-Alpha-A7R-Mark-VI-png.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-10/230210223540394/avatar/01.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-02/240802084518870/avatar/638719291858080629.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-02/240802084419498/avatar/638692697759009422.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-24/240824141547867/avatar/638601115883421748.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/25-07/25-07-11/250711141506840/avatar/638955413887000088.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/25-11/25-11-26/251126090035598/avatar/639005206164966322.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/25-12/25-12-09/251209090438536/avatar/639008696959464299.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/25-04/25-04-01/250401154750200/avatar/638791195089528514.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-01/240801175147151/avatar/638692586740986637.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-10/230210223530566/avatar/01.jpg"
    ],    specs: ["24.2MP Full-frame", "DIGIC X", "4K 60p", "461g"],
    badge: "Chính hãng",
  },
  {
    id: "may-anh-canon-eos-r6-mark-ii-body-only",
    name: "Canon EOS R6 Mark II (Body Only)",
    brand: "Canon",
    category: "camera",
    price: 54000000,
    priceDisplay: "Giá giao động: 54,000,000đ",
    fullSlug: "/san-pham/may-anh-canon-eos-r6-mark-ii-body-only_may-anh-mirrorless-230419151241880",
    thumbnail: "https://mayanhvietnam.com/image-data/san-pham/23-04/23-04-19/230419151241880/avatar/canon-eos-r6-ii-6-500x500_may-anh-canon-eos-r6-mark-ii-body-only.jpg",
    specs: ["24.2MP Full-frame", "DIGIC X", "4K 60p", "IBIS 5-axis"],
    badge: "Chính hãng",
  },
  {
    id: "may-anh-canon-eos-r6-body-only",
    name: "Canon EOS R6 (Body Only)",
    brand: "Canon",
    category: "camera",
    price: 38000000,
    priceDisplay: "Giá giao động: 38,000,000đ",
    fullSlug: "/san-pham/may-anh-canon-eos-r6-body-only_may-anh-mirrorless-230210223532542",
    thumbnail: "https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-10/230210223532542/avatar/01_may-anh-canon-eos-r6-body-only.jpg",

    images: [
      "https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-10/230210223532542/avatar/01_may-anh-canon-eos-r6-body-only.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/26-03/26-03-28/260328143107303/avatar/639103051286629766-Alpha-A7R-Mark-VI-png.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-10/230210223540394/avatar/01.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-02/240802084518870/avatar/638719291858080629.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-02/240802084419498/avatar/638692697759009422.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-24/240824141547867/avatar/638601115883421748.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/25-07/25-07-11/250711141506840/avatar/638955413887000088.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/25-11/25-11-26/251126090035598/avatar/639005206164966322.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/25-12/25-12-09/251209090438536/avatar/639008696959464299.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/25-04/25-04-01/250401154750200/avatar/638791195089528514.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-01/240801175147151/avatar/638692586740986637.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-10/230210223530566/avatar/01.jpg"
    ],    specs: ["20.1MP Full-frame", "DIGIC X", "4K 60p", "IBIS"],
    badge: "Chính hãng",
  },
  {
    id: "may-anh-sony-zve10-ii-black-body-only-chinh-hang",
    name: "Sony ZV-E10 II (Black Body) | Chính hãng",
    brand: "Sony",
    category: "camera",
    price: 26000000,
    priceDisplay: "Giá giao động: 26,000,000đ",
    fullSlug: "/san-pham/may-anh-sony-zve10-ii-black-body-only-chinh-hang_may-anh-mirrorless-240826174229493",
    thumbnail: "https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-26/240826174229493/avatar/638708944659930440_may-anh-sony-zv-e10-ii-black-body-only-chinh-hang.jpg",

    images: [
      "https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-26/240826174229493/avatar/638708944659930440_may-anh-sony-zv-e10-ii-black-body-only-chinh-hang.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/26-03/26-03-28/260328143107303/avatar/639103051286629766-Alpha-A7R-Mark-VI-png.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-10/230210223540394/avatar/01.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-02/240802084518870/avatar/638719291858080629.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-02/240802084419498/avatar/638692697759009422.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-24/240824141547867/avatar/638601115883421748.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/25-07/25-07-11/250711141506840/avatar/638955413887000088.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/25-11/25-11-26/251126090035598/avatar/639005206164966322.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/25-12/25-12-09/251209090438536/avatar/639008696959464299.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/25-04/25-04-01/250401154750200/avatar/638791195089528514.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-01/240801175147151/avatar/638692586740986637.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-10/230210223530566/avatar/01.jpg"
    ],    specs: ["26MP APS-C", "4K 30p", "AI AF", "Vlog Camera"],
    badge: "Vlogger",
  },
  {
    id: "sony-zve10-kem-lens-sony-e-pz-1650-f3556-oss-mark-ii-chinh-hang",
    name: "Sony ZV-E10 kèm Lens E PZ 16-50mm F3.5-5.6 OSS MARK II | Chính hãng",
    brand: "Sony",
    category: "camera",
    price: 16680000,
    priceDisplay: "Giá giao động: 16,680,000đ",
    fullSlug: "/san-pham/sony-zve10-kem-lens-sony-e-pz-1650-f3556-oss-mark-ii-chinh-hang_may-anh-mirrorless-250714103201041",
    thumbnail: "https://mayanhvietnam.com/image-data/san-pham/25-07/25-07-14/250714103201041/avatar/639029506922725233_sony-zv-e10-kem-lens-sony-e-pz-16-50mm-f3-5-5-6-oss-mark-ii-chinh-hang.jpg",

    images: [
      "https://mayanhvietnam.com/image-data/san-pham/25-07/25-07-14/250714103201041/avatar/639029506922725233_sony-zv-e10-kem-lens-sony-e-pz-16-50mm-f3-5-5-6-oss-mark-ii-chinh-hang.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/25-07/25-07-14/250714103201041/avatar/638880859404577715.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/26-03/26-03-28/260328143107303/avatar/639103051286629766-Alpha-A7R-Mark-VI-png.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-10/230210223540394/avatar/01.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-02/240802084518870/avatar/638719291858080629.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-02/240802084419498/avatar/638692697759009422.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-24/240824141547867/avatar/638601115883421748.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/25-07/25-07-11/250711141506840/avatar/638955413887000088.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/25-11/25-11-26/251126090035598/avatar/639005206164966322.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/25-12/25-12-09/251209090438536/avatar/639008696959464299.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/25-04/25-04-01/250401154750200/avatar/638791195089528514.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-01/240801175147151/avatar/638692586740986637.jpg"
    ],    specs: ["24.2MP APS-C", "Vlog Camera", "4K 30p", "Product Showcase"],
    badge: "Vlogger",
  },
  {
    id: "may-anh-nikon-z6-ii-body-only-chinh-hang",
    name: "Nikon Z6 II (Body Only) | Chính hãng",
    brand: "Nikon",
    category: "camera",
    price: 32500000,
    priceDisplay: "Giá giao động: 32,500,000đ",
    fullSlug: "/san-pham/may-anh-nikon-z6-ii-body-only-chinh-hang_may-anh-mirrorless-230418180440520",
    thumbnail: "https://mayanhvietnam.com/image-data/san-pham/23-04/23-04-18/230418180440520/avatar/nikon-z6-ii-500x500_may-anh-nikon-z6-ii-body-only-chinh-hang.jpg",

    images: [
      "https://mayanhvietnam.com/image-data/san-pham/23-04/23-04-18/230418180440520/avatar/nikon-z6-ii-500x500_may-anh-nikon-z6-ii-body-only-chinh-hang.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/26-03/26-03-28/260328143107303/avatar/639103051286629766-Alpha-A7R-Mark-VI-png.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-10/230210223540394/avatar/01.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-02/240802084518870/avatar/638719291858080629.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-02/240802084419498/avatar/638692697759009422.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-24/240824141547867/avatar/638601115883421748.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/25-07/25-07-11/250711141506840/avatar/638955413887000088.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/25-11/25-11-26/251126090035598/avatar/639005206164966322.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/25-12/25-12-09/251209090438536/avatar/639008696959464299.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/25-04/25-04-01/250401154750200/avatar/638791195089528514.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-01/240801175147151/avatar/638692586740986637.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-10/230210223530566/avatar/01.jpg"
    ],    specs: ["24.5MP Full-frame", "Dual EXPEED 6", "4K 60p", "Dual Card Slots"],
    badge: "Chính hãng",
  },
  {
    id: "nikon-z6-mark-iii-kem-lens-z-2470-f4-s-chinh-hang-vic",
    name: "Nikon Z6 Mark III Kèm Lens Z 24-70mm f/4 S (Chính Hãng VIC)",
    brand: "Nikon",
    category: "camera",
    price: 67600000,
    priceDisplay: "Giá giao động: 67,600,000đ",
    fullSlug: "/san-pham/nikon-z6-mark-iii-kem-lens-z-2470-f4-s-chinh-hang-vic_may-anh-mirrorless-250520145943720",
    thumbnail: "https://mayanhvietnam.com/image-data/san-pham/25-05/25-05-20/250520145943720/avatar/638833501469480006_nikon-z6-mark-iii-kem-lens-z-24-70-mm-f-4-s-chinh-hang-vic.jpg",

    images: [
      "https://mayanhvietnam.com/image-data/san-pham/25-05/25-05-20/250520145943720/avatar/638833501469480006_nikon-z6-mark-iii-kem-lens-z-24-70-mm-f-4-s-chinh-hang-vic.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/26-03/26-03-28/260328143107303/avatar/639103051286629766-Alpha-A7R-Mark-VI-png.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-10/230210223540394/avatar/01.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-02/240802084518870/avatar/638719291858080629.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-02/240802084419498/avatar/638692697759009422.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-24/240824141547867/avatar/638601115883421748.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/25-07/25-07-11/250711141506840/avatar/638955413887000088.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/25-11/25-11-26/251126090035598/avatar/639005206164966322.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/25-12/25-12-09/251209090438536/avatar/639008696959464299.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/25-04/25-04-01/250401154750200/avatar/638791195089528514.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-01/240801175147151/avatar/638692586740986637.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-10/230210223530566/avatar/01.jpg"
    ],    specs: ["24.5MP Full-frame", "6K 30p / 4K 60p", "Nikon Z mount", "Partially stacked sensor"],
    badge: "Chính hãng",
  },
  {
    id: "may-anh-nikon-z5-ii-hang",
    name: "Nikon Z5 II - (Hãng)",
    brand: "Nikon",
    category: "camera",
    price: 43000000,
    priceDisplay: "Giá giao động: 43,000,000đ",
    fullSlug: "/san-pham/may-anh-nikon-z5-iihang_may-anh-mirrorless-250704114217939",
    thumbnail: "https://mayanhvietnam.com/image-data/san-pham/25-07/25-07-04/250704114217939/avatar/638872262359118095_may-anh-nikon-z5-ii-hang.jpg",

    images: [
      "https://mayanhvietnam.com/image-data/san-pham/25-07/25-07-04/250704114217939/avatar/638872262359118095_may-anh-nikon-z5-ii-hang.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/26-03/26-03-28/260328143107303/avatar/639103051286629766-Alpha-A7R-Mark-VI-png.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-10/230210223540394/avatar/01.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-02/240802084518870/avatar/638719291858080629.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-02/240802084419498/avatar/638692697759009422.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-24/240824141547867/avatar/638601115883421748.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/25-07/25-07-11/250711141506840/avatar/638955413887000088.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/25-11/25-11-26/251126090035598/avatar/639005206164966322.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/25-12/25-12-09/251209090438536/avatar/639008696959464299.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/25-04/25-04-01/250401154750200/avatar/638791195089528514.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-01/240801175147151/avatar/638692586740986637.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-10/230210223530566/avatar/01.jpg"
    ],    specs: ["24.5MP Full-frame", "AI AF", "4K 60p", "IBIS"],
    badge: "Mới",
  },
  {
    id: "may-anh-nikon-z30-den-kem-lens-nikkor-z-dx-1650-f3563-vr-chinh-hang",
    name: "Nikon Z30 (đen) kèm Lens NIKKOR Z DX 16-50mm f/3.5-6.3 VR | chính hãng",
    brand: "Nikon",
    category: "camera",
    price: 17900000,
    priceDisplay: "Giá giao động: 17,900,000đ",
    fullSlug: "/san-pham/may-anh-nikon-z30-den-kem-lens-nikkor-z-dx-1650-f3563-vr-chinh-hang_may-anh-mirrorless-250620115535850",
    thumbnail: "https://mayanhvietnam.com/image-data/san-pham/25-06/25-06-20/250620115535850/avatar/638889641077470341_may-anh-nikon-z30-den-kem-lens-nikkor-z-dx-16-50mm-f-3-5-6-3-vr-chinh-hang.jpg",

    images: [
      "https://mayanhvietnam.com/image-data/san-pham/25-06/25-06-20/250620115535850/avatar/638889641077470341_may-anh-nikon-z30-den-kem-lens-nikkor-z-dx-16-50mm-f-3-5-6-3-vr-chinh-hang.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/26-03/26-03-28/260328143107303/avatar/639103051286629766-Alpha-A7R-Mark-VI-png.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-10/230210223540394/avatar/01.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-02/240802084518870/avatar/638719291858080629.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-02/240802084419498/avatar/638692697759009422.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-24/240824141547867/avatar/638601115883421748.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/25-07/25-07-11/250711141506840/avatar/638955413887000088.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/25-11/25-11-26/251126090035598/avatar/639005206164966322.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/25-12/25-12-09/251209090438536/avatar/639008696959464299.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/25-04/25-04-01/250401154750200/avatar/638791195089528514.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-01/240801175147151/avatar/638692586740986637.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-10/230210223530566/avatar/01.jpg"
    ],    specs: ["20.9MP APS-C", "Vlog Camera", "4K 30p", "Flip LCD"],
    badge: "Chính hãng",
  },
  {
    id: "nikon-zfc-lens-nikon-z-dx-1650-f3563-vr-silver",
    name: "NIKON ZFC + LENS NIKON Z DX 16-50mm F3.5-6.3 VR (SILVER)",
    brand: "Nikon",
    category: "camera",
    price: 24000000,
    priceDisplay: "Giá giao động: 24,000,000đ",
    fullSlug: "/san-pham/nikon-zfc-lens-nikon-z-dx-1650-f3563-vr-silver_may-anh-mirrorless-260102105356303",
    thumbnail: "https://mayanhvietnam.com/image-data/san-pham/26-01/26-01-02/260102105356303/avatar/639029480446269883_nikon-zfc-lens-nikon-z-dx-16-50mm-f3-5-6-3-vr-silver.jpg",

    images: [
      "https://mayanhvietnam.com/image-data/san-pham/26-01/26-01-02/260102105356303/avatar/639029480446269883_nikon-zfc-lens-nikon-z-dx-16-50mm-f3-5-6-3-vr-silver.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/26-03/26-03-28/260328143107303/avatar/639103051286629766-Alpha-A7R-Mark-VI-png.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-10/230210223540394/avatar/01.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-02/240802084518870/avatar/638719291858080629.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-02/240802084419498/avatar/638692697759009422.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-24/240824141547867/avatar/638601115883421748.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/25-07/25-07-11/250711141506840/avatar/638955413887000088.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/25-11/25-11-26/251126090035598/avatar/639005206164966322.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/25-12/25-12-09/251209090438536/avatar/639008696959464299.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/25-04/25-04-01/250401154750200/avatar/638791195089528514.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-01/240801175147151/avatar/638692586740986637.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-10/230210223530566/avatar/01.jpg"
    ],    specs: ["20.9MP APS-C", "Retro Design", "4K 30p", "Vari-angle LCD"],
    badge: "Retro",
  },
  {
    id: "may-anh-fujifilm-xh2s-body-only-chinh-hang",
    name: "Fujifilm X-H2S (Body Only) | Chính hãng",
    brand: "Fujifilm",
    category: "camera",
    price: 37990000,
    priceDisplay: "Giá giao động: 37,990,000đ",
    fullSlug: "/san-pham/may-anh-fujifilm-xh2s-body-only-chinh-hang_may-anh-mirrorless-230210223540394",
    thumbnail: "https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-10/230210223540394/avatar/01_may-anh-fujifilm-x-h2s-body-only-chinh-hang.jpg",

    images: [
      "https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-10/230210223540394/avatar/01_may-anh-fujifilm-x-h2s-body-only-chinh-hang.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-10/230210223540394/avatar/01.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/26-03/26-03-28/260328143107303/avatar/639103051286629766-Alpha-A7R-Mark-VI-png.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-02/240802084518870/avatar/638719291858080629.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-02/240802084419498/avatar/638692697759009422.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-24/240824141547867/avatar/638601115883421748.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/25-07/25-07-11/250711141506840/avatar/638955413887000088.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/25-11/25-11-26/251126090035598/avatar/639005206164966322.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/25-12/25-12-09/251209090438536/avatar/639008696959464299.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/25-04/25-04-01/250401154750200/avatar/638791195089528514.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-01/240801175147151/avatar/638692586740986637.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-10/230210223530566/avatar/01.jpg"
    ],    specs: ["26.2MP APS-C X-Trans", "Stacked CMOS", "4K 120p", "7-stop IBIS"],
    badge: "Chính hãng",
  },
  {
    id: "may-anh-canon-eos-r3-body-only",
    name: "Canon EOS R3 (Body Only)",
    brand: "Canon",
    category: "camera",
    price: 115000000,
    priceDisplay: "Giá giao động: 115,000,000đ",
    fullSlug: "/san-pham/may-anh-canon-eos-r3-body-only_may-anh-mirrorless-230210223530566",
    thumbnail: "https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-10/230210223530566/avatar/01_may-anh-canon-eos-r3-body-only.jpg",

    images: [
      "https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-10/230210223530566/avatar/01_may-anh-canon-eos-r3-body-only.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-10/230210223530566/avatar/01.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/26-03/26-03-28/260328143107303/avatar/639103051286629766-Alpha-A7R-Mark-VI-png.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-10/230210223540394/avatar/01.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-02/240802084518870/avatar/638719291858080629.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-02/240802084419498/avatar/638692697759009422.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-24/240824141547867/avatar/638601115883421748.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/25-07/25-07-11/250711141506840/avatar/638955413887000088.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/25-11/25-11-26/251126090035598/avatar/639005206164966322.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/25-12/25-12-09/251209090438536/avatar/639008696959464299.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/25-04/25-04-01/250401154750200/avatar/638791195089528514.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-01/240801175147151/avatar/638692586740986637.jpg"
    ],    specs: ["24.2MP Stacked", "Eye Control AF", "4K 120p", "30fps"],
    badge: "Flagship",
  },
  {
    id: "may-anh-canon-eos-r5-mark-ii-body",
    name: "Canon EOS R5 Mark II (Body)",
    brand: "Canon",
    category: "camera",
    price: 108000000,
    priceDisplay: "Giá giao động: 108,000,000đ",
    fullSlug: "/san-pham/may-anh-canon-eos-r5-mark-ii-body_may-anh-mirrorless-240925161839678",
    thumbnail: "https://mayanhvietnam.com/image-data/san-pham/24-09/24-09-25/240925161839678/avatar/638658035830187408_may-anh-canon-eos-r5-mark-ii.jpg",
    specs: ["45MP Full-frame", "Stacked CMOS", "8K 30p RAW", "AI AF"],
    badge: "Flagship",
  },
  {
    id: "may-anh-canon-eos-r5-c-body-only",
    name: "Canon EOS R5 C (Body Only)",
    brand: "Canon",
    category: "camera",
    price: 93000000,
    priceDisplay: "Giá giao động: 93,000,000đ",
    fullSlug: "/san-pham/may-anh-canon-eos-r5-c-body-only_may-anh-mirrorless-240925161831078",
    thumbnail: "https://mayanhvietnam.com/image-data/san-pham/24-09/24-09-25/240925161831078/avatar/638658025848687408_may-anh-canon-eos-r5-c-body-only.jpg",
    specs: ["45MP Full-frame", "Cinema EOS", "8K 30p", "Active Cooling"],
    badge: "Cinema",
  },

  // ══════════════════════════════════════════════════════
  // LENSES — 30 products (scraped from plp-ong-kinh.json)
  // ══════════════════════════════════════════════════════

  {
    id: "ong-kinh-canon-rf-2470-f28l-is-usm-chinh-hang",
    name: "Ống kính Canon RF 24-70mm f/2.8L IS USM | Chính hãng",
    brand: "Canon",
    category: "lens",
    price: 48900000,
    priceDisplay: "Giá giao động: 48,900,000đ",
    fullSlug: "/san-pham/ong-kinh-canon-rf-2470-f28l-is-usm-chinh-hang_ong-kinh-mirrorless-230210234357844",
    thumbnail: "https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-10/230210234357844/avatar/01_ong-kinh-canon-rf-24-70mm-f-2-8l-is-usm-chinh-hang.jpg",

    images: [
      "https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-10/230210234357844/avatar/01_ong-kinh-canon-rf-24-70mm-f-2-8l-is-usm-chinh-hang.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-11/230211000754241/avatar/01.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-10/230210234138629/avatar/01.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/26-02/26-02-26/260226193416226/avatar/639077312681395005.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/26-02/26-02-26/260226193618145/avatar/639077314147947388.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-10/230210235800676/avatar/01.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/25-10/25-10-02/251002110911885/avatar/638956078646498942.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/25-11/25-11-04/251104163539639/avatar/639030467584578943.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/25-11/25-11-22/251122164647599/avatar/639030467065532802.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/26-01/26-01-03/260103141436632/avatar/639030465474557304.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-02/240802101451137/avatar/638692749614202751.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-03/240803094242227/avatar/638692469929544019.jpg"
    ],    specs: ["24-70mm f/2.8", "L-series", "IS 5-stop", "Nano USM"],
    badge: "Chính hãng",
  },
  {
    id: "ong-kinh-nikon-z-2470-f28-s-ii",
    name: "Ống kính Nikon Z 24-70mm f/2.8 S II",
    brand: "Nikon",
    category: "lens",
    price: 69000000,
    priceDisplay: "Giá giao động: 69,000,000đ",
    fullSlug: "/san-pham/ong-kinh-nikon-z-2470-f28-s-ii_ong-kinh-mirrorless-250922103851025",
    thumbnail: "https://mayanhvietnam.com/image-data/san-pham/25-09/25-09-22/250922103851025/avatar/638941343754731632_ong-kinh-nikon-z-24-70mm-f-2-8-s-ii.jpg",

    images: [
      "https://mayanhvietnam.com/image-data/san-pham/25-09/25-09-22/250922103851025/avatar/638941343754731632_ong-kinh-nikon-z-24-70mm-f-2-8-s-ii.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-11/230211000754241/avatar/01.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-10/230210234138629/avatar/01.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/26-02/26-02-26/260226193416226/avatar/639077312681395005.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/26-02/26-02-26/260226193618145/avatar/639077314147947388.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-10/230210235800676/avatar/01.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/25-10/25-10-02/251002110911885/avatar/638956078646498942.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/25-11/25-11-04/251104163539639/avatar/639030467584578943.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/25-11/25-11-22/251122164647599/avatar/639030467065532802.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/26-01/26-01-03/260103141436632/avatar/639030465474557304.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-02/240802101451137/avatar/638692749614202751.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-03/240803094242227/avatar/638692469929544019.jpg"
    ],    specs: ["24-70mm f/2.8", "S-line", "Multi-focus", "635g"],
    badge: "Chính hãng",
  },
  {
    id: "ong-kinh-tamron-2875-f28-di-iii-vxd-g2-for-nikon-z",
    name: "Ống kính Tamron 28-75mm F2.8 Di III VXD G2 for Nikon Z",
    brand: "Tamron",
    category: "lens",
    price: 17900000,
    priceDisplay: "Giá giao động: 17,900,000đ",
    fullSlug: "/san-pham/ong-kinh-tamron-2875-f28-di-iii-vxd-g2-for-nikon-z_ong-kinh-mirrorless-240831133137156",
    thumbnail: "https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-31/240831133137156/avatar/638722116807217083_ong-kinh-tamron-28-75mm-f2-8-di-iii-vxd-g2-for-nikon-z.jpg",

    images: [
      "https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-31/240831133137156/avatar/638722116807217083_ong-kinh-tamron-28-75mm-f2-8-di-iii-vxd-g2-for-nikon-z.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-11/230211000754241/avatar/01.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-10/230210234138629/avatar/01.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/26-02/26-02-26/260226193416226/avatar/639077312681395005.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/26-02/26-02-26/260226193618145/avatar/639077314147947388.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-10/230210235800676/avatar/01.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/25-10/25-10-02/251002110911885/avatar/638956078646498942.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/25-11/25-11-04/251104163539639/avatar/639030467584578943.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/25-11/25-11-22/251122164647599/avatar/639030467065532802.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/26-01/26-01-03/260103141436632/avatar/639030465474557304.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-02/240802101451137/avatar/638692749614202751.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-03/240803094242227/avatar/638692469929544019.jpg"
    ],    specs: ["28-75mm f/2.8", "VXD Motor", "G2", "540g"],
    badge: "Giá tốt",
  },
  {
    id: "ong-kinh-sigma-200-f2-dg-os-sports-for-sony-e-chinh-hang",
    name: "Ống kính Sigma 200mm F2 DG OS Sports for Sony E | Chính hãng",
    brand: "Sigma",
    category: "lens",
    price: 85320000,
    priceDisplay: "Giá giao động: 85,320,000đ",
    fullSlug: "/san-pham/ong-kinh-sigma-200-f2-dg-os-sports-for-sony-e-chinh-hang_ong-kinh-mirrorless-250820095043213",
    thumbnail: "https://mayanhvietnam.com/image-data/san-pham/25-08/25-08-20/250820095043213/avatar/638912804942323908_ong-kinh-sigma-200mm-f2-dg-os-sports-for-sony-e-chinh-hang.jpg",
    specs: ["200mm f/2", "Sports", "OS", "Telephoto"],
    badge: "Chính hãng",
  },
  {
    id: "ong-kinh-sigma-200-f2-dg-os-sports-ngam-l",
    name: "Ống kính Sigma 200mm F2 DG OS Sports ngàm L",
    brand: "Sigma",
    category: "lens",
    price: 85320000,
    priceDisplay: "Giá giao động: 85,320,000đ",
    fullSlug: "/san-pham/ong-kinh-sigma-200-f2-dg-os-sports-ngam-l_ong-kinh-mirrorless-250820100004596",
    thumbnail: "https://mayanhvietnam.com/image-data/san-pham/25-08/25-08-20/250820100004596/avatar/638912808715148082_ong-kinh-sigma-200mm-f2-dg-os-sports-ngam-l.jpg",
    specs: ["200mm f/2", "Sports", "OS", "L-Mount"],
    badge: "Chính hãng",
  },
  {
    id: "canon-rf-50-f18-stm-chinh-hang",
    name: "Canon RF 50mm F1.8 STM | Chính hãng",
    brand: "Canon",
    category: "lens",
    price: 4500000,
    priceDisplay: "Giá từ: 4,500,000đ",
    fullSlug: "/san-pham/canon-rf-50-f18-stm-chinh-hang_ong-kinh-mirrorless-240803094047373",
    thumbnail: "https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-03/240803094047373/avatar/638847186653427391_canon-rf-50mm-f1-8-stm-chinh-hang.jpg",

    images: [
      "https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-03/240803094047373/avatar/638847186653427391_canon-rf-50mm-f1-8-stm-chinh-hang.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-11/230211000754241/avatar/01.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-10/230210234138629/avatar/01.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/26-02/26-02-26/260226193416226/avatar/639077312681395005.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/26-02/26-02-26/260226193618145/avatar/639077314147947388.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-10/230210235800676/avatar/01.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/25-10/25-10-02/251002110911885/avatar/638956078646498942.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/25-11/25-11-04/251104163539639/avatar/639030467584578943.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/25-11/25-11-22/251122164647599/avatar/639030467065532802.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/26-01/26-01-03/260103141436632/avatar/639030465474557304.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-02/240802101451137/avatar/638692749614202751.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-03/240803094242227/avatar/638692469929544019.jpg"
    ],    specs: ["50mm f/1.8", "STM Motor", "Lightweight", "160g"],
    badge: "Bán chạy",
  },
  {
    id: "kase-85-f14-af-lens-nikon-z",
    name: "Kase 85mm f/1.4 AF Lens (Nikon Z)",
    brand: "Kase",
    category: "lens",
    price: 9900000,
    priceDisplay: "Giá từ: 9,900,000đ",
    fullSlug: "/san-pham/kase-85-f14-af-lens-nikon-z_ong-kinh-mirrorless-251006173300230",
    thumbnail: "https://mayanhvietnam.com/image-data/san-pham/25-10/25-10-06/251006173300230/avatar/638966646032677503_kase-85mm-f-1-4-af-lens-nikon-z.jpg",
    specs: ["85mm f/1.4", "AF Motor", "Nikon Z", "Weather-sealed"],
    badge: "Mới",
  },
  {
    id: "ong-kinh-viltrox-85-f14-pro-nikon-z",
    name: "Ống kính Viltrox 85mm f/1.4 Pro Nikon Z",
    brand: "Viltrox",
    category: "lens",
    price: 13500000,
    priceDisplay: "Giá giao động: 13,500,000đ",
    fullSlug: "/san-pham/ong-kinh-viltrox-85-f14-pro-nikon-z_ong-kinh-mirrorless-251103143407180",
    thumbnail: "https://mayanhvietnam.com/image-data/san-pham/25-11/25-11-03/251103143407180/avatar/638977774249552971_ong-kinh-viltrox-85mm-f-1-4-pro-nikon-z.jpg",
    specs: ["85mm f/1.4", "Pro", "STM Motor", "Portrait"],
    badge: "Chính hãng",
  },
  {
    id: "ong-kinh-nikon-z-2470-f4-s-chinh-hang-vic",
    name: "Ống kính Nikon Z 24-70mm f/4 S | Chính hãng VIC",
    brand: "Nikon",
    category: "lens",
    price: 9500000,
    priceDisplay: "Giá từ: 9,500,000đ",
    fullSlug: "/san-pham/ong-kinh-nikon-z-2470-f4-s-chinh-hang-vic_ong-kinh-mirrorless-230210235800676",
    thumbnail: "https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-10/230210235800676/avatar/01_ong-kinh-nikon-z-24-70mm-f-4-s-chinh-hang-vic.jpg",
    specs: ["24-70mm f/4", "S-line", "Compact", "500g"],
    badge: "Chính hãng",
  },
  {
    id: "ong-kinh-canon-rf-70-200-f28l-is-usm-chinh-hang",
    name: "Ống kính Canon RF 70-200mm f/2.8L IS USM | Chính hãng",
    brand: "Canon",
    category: "lens",
    price: 47500000,
    priceDisplay: "Giá giao động: 47,500,000đ",
    fullSlug: "/san-pham/ong-kinh-canon-rf-70200-f28l-is-usm-chinh-hang_ong-kinh-mirrorless-240802101451137",
    thumbnail: "https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-02/240802101451137/avatar/638692749614202751_ong-kinh-canon-rf-70-200mm-f2-8-l-is-usm.jpg",

    images: [
      "https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-02/240802101451137/avatar/638692749614202751_ong-kinh-canon-rf-70-200mm-f2-8-l-is-usm.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-11/230211000754241/avatar/01.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-10/230210234138629/avatar/01.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/26-02/26-02-26/260226193416226/avatar/639077312681395005.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/26-02/26-02-26/260226193618145/avatar/639077314147947388.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-10/230210235800676/avatar/01.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/25-10/25-10-02/251002110911885/avatar/638956078646498942.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/25-11/25-11-04/251104163539639/avatar/639030467584578943.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/25-11/25-11-22/251122164647599/avatar/639030467065532802.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/26-01/26-01-03/260103141436632/avatar/639030465474557304.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-03/240803094242227/avatar/638692469929544019.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-03/240803083448701/avatar/638694560018058513.jpg"
    ],    specs: ["70-200mm f/2.8", "L-series", "IS 5-stop", "Nano USM"],
    badge: "Chính hãng",
  },
  {
    id: "sony-fe-70200-gm-oss-ii",
    name: "Sony FE 70-200mm f/2.8 GM II OSS",
    brand: "Sony",
    category: "lens",
    price: 52000000,
    priceDisplay: "Giá giao động: 52,000,000đ",
    fullSlug: "/san-pham/sony-fe-70200-gm-oss-ii_ong-kinh-mirrorless-240803094242227",
    thumbnail: "https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-03/240803094242227/avatar/638692469929544019_ong-kinh-sony-fe-70-200mm-f2-8-gm-ii-oss.jpg",

    images: [
      "https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-03/240803094242227/avatar/638692469929544019_ong-kinh-sony-fe-70-200mm-f2-8-gm-ii-oss.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-03/240803094242227/avatar/638692469929544019.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-11/230211000754241/avatar/01.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-10/230210234138629/avatar/01.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/26-02/26-02-26/260226193416226/avatar/639077312681395005.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/26-02/26-02-26/260226193618145/avatar/639077314147947388.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-10/230210235800676/avatar/01.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/25-10/25-10-02/251002110911885/avatar/638956078646498942.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/25-11/25-11-04/251104163539639/avatar/639030467584578943.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/25-11/25-11-22/251122164647599/avatar/639030467065532802.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/26-01/26-01-03/260103141436632/avatar/639030465474557304.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-02/240802101451137/avatar/638692749614202751.jpg"
    ],    specs: ["70-200mm f/2.8", "GM II", "Nano XD", "1045g"],
    badge: "Chính hãng",
  },
  {
    id: "fujifilm-xf-27-f28-chinh-hang",
    name: "Fujifilm XF 27mm f/2.8 (Black) | Chính hãng",
    brand: "Fujifilm",
    category: "lens",
    price: 12500000,
    priceDisplay: "Giá giao động: 12,500,000đ",
    fullSlug: "/san-pham/fujifilm-xf-27-f28-chinh-hang_ong-kinh-mirrorless-230211000754241",
    thumbnail: "https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-11/230211000754241/avatar/01_ong-kinh-fujifilm-xf-27mm-f2-8-black-chinh-hang.jpg",

    images: [
      "https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-11/230211000754241/avatar/01_ong-kinh-fujifilm-xf-27mm-f2-8-black-chinh-hang.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-10/230210234138629/avatar/01.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/26-02/26-02-26/260226193416226/avatar/639077312681395005.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/26-02/26-02-26/260226193618145/avatar/639077314147947388.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-10/230210235800676/avatar/01.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/25-10/25-10-02/251002110911885/avatar/638956078646498942.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/25-11/25-11-04/251104163539639/avatar/639030467584578943.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/25-11/25-11-22/251122164647599/avatar/639030467065532802.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/26-01/26-01-03/260103141436632/avatar/639030465474557304.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-02/240802101451137/avatar/638692749614202751.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-03/240803094242227/avatar/638692469929544019.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-03/240803083448701/avatar/638694560018058513.jpg"
    ],    specs: ["27mm f/2.8", "Pancake", "84g", "XF Mount"],
    badge: "Chính hãng",
  },
  {
    id: "sigma-35-f14-dg-ii-art-for-sony-e",
    name: "Sigma 35mm f/1.4 DG II Art (Sony E) | Chính hãng",
    brand: "Sigma",
    category: "lens",
    price: 18500000,
    priceDisplay: "Giá giao động: 18,500,000đ",
    fullSlug: "/san-pham/sigma-35-f14-dg-ii-art-for-sony-e_ong-kinh-mirrorless-260226193416226",
    thumbnail: "https://mayanhvietnam.com/image-data/san-pham/26-02/26-02-26/260226193416226/avatar/639077312681395005_ong-kinh-sigma-35mm-f1-4-dg-ii-for-sony-e-chinh-hang.jpg",

    images: [
      "https://mayanhvietnam.com/image-data/san-pham/26-02/26-02-26/260226193416226/avatar/639077312681395005_ong-kinh-sigma-35mm-f1-4-dg-ii-for-sony-e-chinh-hang.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-11/230211000754241/avatar/01.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-10/230210234138629/avatar/01.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/26-02/26-02-26/260226193618145/avatar/639077314147947388.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-10/230210235800676/avatar/01.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/25-10/25-10-02/251002110911885/avatar/638956078646498942.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/25-11/25-11-04/251104163539639/avatar/639030467584578943.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/25-11/25-11-22/251122164647599/avatar/639030467065532802.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/26-01/26-01-03/260103141436632/avatar/639030465474557304.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-02/240802101451137/avatar/638692749614202751.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-03/240803094242227/avatar/638692469929544019.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-03/240803083448701/avatar/638694560018058513.jpg"
    ],    specs: ["35mm f/1.4", "Art II", "HSL System", "545g"],
    badge: "Chính hãng",
  },
  {
    id: "viltrox-85-f14-pro-sony-e",
    name: "Viltrox 85mm f/1.4 Pro (Sony E)",
    brand: "Viltrox",
    category: "lens",
    price: 11800000,
    priceDisplay: "Giá giao động: 11,800,000đ",
    fullSlug: "/san-pham/viltrox-85-f14-pro-sony-e_ong-kinh-mirrorless-251103143415280",
    thumbnail: "https://mayanhvietnam.com/image-data/san-pham/25-11/25-11-03/251103143415280/avatar/638977774249552980_ong-kinh-viltrox-85mm-f-1-4-pro-sony-e.jpg",
    specs: ["85mm f/1.4", "Pro", "STM Motor", "Portrait"],
    badge: "Chính hãng",
  },

  // ══════════════════════════════════════════════════════
  // FLYCAM — 30 products (scraped from plp-flycam.json)
  // ══════════════════════════════════════════════════════

  {
    id: "flycam-dji-mavic-4-pro-512gb-creator-combo",
    name: "DJI Mavic 4 Pro 512GB Creator Combo",
    brand: "DJI",
    category: "flycam",
    price: 0,
    priceDisplay: "Vui lòng gọi",
    fullSlug: "/san-pham/flycam-dji-mavic-4-pro-512gb-creator-combo_flycam-250515085035248",
    thumbnail: "https://mayanhvietnam.com/image-data/san-pham/25-05/25-05-15/250515085035248/avatar/638828964891489787_dji-mavic-4-pro-512gb-creator-combo.jpg",

    images: [
      "https://mayanhvietnam.com/image-data/san-pham/25-05/25-05-15/250515085035248/avatar/638828964891489787_dji-mavic-4-pro-512gb-creator-combo.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-12/230212121228821/avatar/01.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-12/230212121318146/avatar/01.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-12/230212121223462/avatar/01.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/24-11/24-11-02/241102151301701/avatar/638836956737704928.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-12/230212121328915/avatar/01.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/24-04/24-04-03/240403190729530/avatar/638477681327613275.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/24-11/24-11-02/241102144506281/avatar/638661555984717416.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-08/240808100041911/avatar/638587081597210818.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-12/230212121323915/avatar/01.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-12/230212121158931/avatar/01.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-12/230212121246538/avatar/01.jpg"
    ],    specs: ["Hasselblad 100MP", "6K 60fps", "LiDAR", "35-40 phút bay"],
    badge: "Flagship",
  },
  {
    id: "flycam-dji-mavic-3-pro-pro-combo-dji-rc-pro",
    name: "Flycam DJI Mavic 3 Pro (Pro Combo | DJI RC Pro)",
    brand: "DJI",
    category: "flycam",
    price: 0,
    priceDisplay: "Vui lòng gọi",
    fullSlug: "/san-pham/flycam-dji-mavic-3-pro-pro-combo-dji-rc-pro_flycam-240808101913354",
    thumbnail: "https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-08/240808101913354/avatar/638587093009322839_flycam-dji-mavic-3-pro-pro-combo-dji-rc-pro.jpg",
    specs: ["Triple Camera", "Hasselblad 20MP", "43 phút bay", "APAS 5.0"],
    badge: "Pro",
  },
  {
    id: "flycam-dji-mavic-3-classic-dji-rcn1",
    name: "DJI Mavic 3 Classic (DJI RC-N1)",
    brand: "DJI",
    category: "flycam",
    price: 0,
    priceDisplay: "Vui lòng gọi",
    fullSlug: "/san-pham/dji-mavic-3-classic-dji-rcn1_flycam-240808101128383",
    thumbnail: "https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-08/240808101128383/avatar/638587088171290663_dji-mavic-3-classic-dji-rc-n1.jpg",
    specs: ["Hasselblad 4/3 CMOS", "5.1K 50fps", "46 phút bay", "O3+"],
    badge: "Chính hãng",
  },
  {
    id: "flycam-dji-air-3",
    name: "FLYCAM DJI AIR 3",
    brand: "DJI",
    category: "flycam",
    price: 0,
    priceDisplay: "Vui lòng gọi",
    fullSlug: "/san-pham/flycam-dji-air-3_flycam-240808164244702",
    thumbnail: "https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-08/240808164244702/avatar/638691612803221877_flycam-dji-air-3.jpg",
    specs: ["Dual Camera 1/1.3\"", "4K 60p HDR", "46 phút bay", "O4"],
    badge: "Chính hãng",
  },
  {
    id: "flycam-dji-air-3s-dji-rc-n3",
    name: "FLYCAM DJI AIR 3S (DJI RC-N3) (CHÍNH HÃNG)",
    brand: "DJI",
    category: "flycam",
    price: 0,
    priceDisplay: "Vui lòng gọi",
    fullSlug: "/san-pham/flycam-dji-air-3s-dji-rc-n3_flycam-241102144506281",
    thumbnail: "https://mayanhvietnam.com/image-data/san-pham/24-10/24-10-16/241016164616684/avatar/638646940951085832_flycam-dji-air-3s-dji-rc-n3-chinh-hang.jpg",
    specs: ["1-inch CMOS", "4K 60fps", "45 phút bay", "O4+"],
    badge: "Mới",
  },
  {
    id: "flycam-dji-mini-4-pro-dji-rc-2",
    name: "Flycam DJI Mini 4 Pro (DJI RC 2)",
    brand: "DJI",
    category: "flycam",
    price: 0,
    priceDisplay: "Vui lòng gọi",
    fullSlug: "/san-pham/flycam-dji-mini-4-pro-dji-rc-2_flycam-240403185605233",
    thumbnail: "https://mayanhvietnam.com/image-data/san-pham/24-04/24-04-03/240403185605233/avatar/638477676845468135_flycam-dji-mini-4-pro-dji-rc-2.jpg",

    images: [
      "https://mayanhvietnam.com/image-data/san-pham/24-04/24-04-03/240403185605233/avatar/638477676845468135_flycam-dji-mini-4-pro-dji-rc-2.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-12/230212121228821/avatar/01.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-12/230212121318146/avatar/01.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-12/230212121223462/avatar/01.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/24-11/24-11-02/241102151301701/avatar/638836956737704928.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-12/230212121328915/avatar/01.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/24-04/24-04-03/240403190729530/avatar/638477681327613275.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/24-11/24-11-02/241102144506281/avatar/638661555984717416.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-08/240808100041911/avatar/638587081597210818.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-12/230212121323915/avatar/01.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-12/230212121158931/avatar/01.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-12/230212121246538/avatar/01.jpg"
    ],    specs: ["<249g", "4K HDR", "O4", "34 phút bay"],
    badge: "Chính hãng",
  },
  {
    id: "flycam-dji-mini-2-se-fly-more-combo",
    name: "FLYCAM DJI MINI 2 SE FLY MORE COMBO",
    brand: "DJI",
    category: "flycam",
    price: 0,
    priceDisplay: "Vui lòng gọi",
    fullSlug: "/san-pham/flycam-dji-mini-2-se-fly-more-combo_flycam-240808174114421",
    thumbnail: "https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-08/240808174114421/avatar/638587357420429273_flycam-dji-mini-2-se-fly-more-combo.jpg",
    specs: ["<249g", "4K 30fps", "QuickShots", "31 phút bay"],
    badge: "Tiết kiệm",
  },
  {
    id: "flycam-dji-mini-4-pro-base",
    name: "Flycam DJI Mini 4 Pro (Base)",
    brand: "DJI",
    category: "flycam",
    price: 0,
    priceDisplay: "Vui lòng gọi",
    fullSlug: "/san-pham/flycam-dji-mini-4-pro-base_flycam-240403163228320",
    thumbnail: "https://mayanhvietnam.com/image-data/san-pham/24-04/24-04-03/240403163228320/avatar/638477665177928590_flycam-dji-mini-4-pro-base.jpg",
    specs: ["<249g", "4K HDR", "O4", "Obstacle Avoidance"],
    badge: "Chính hãng",
  },
  {
    id: "flycam-dji-mavic-air-2-chinh-hang",
    name: "Flycam DJI Mavic Air 2 | Chính hãng",
    brand: "DJI",
    category: "flycam",
    price: 0,
    priceDisplay: "Vui lòng gọi",
    fullSlug: "/san-pham/flycam-dji-mavic-air-2-chinh-hang_flycam-230212121212567",
    thumbnail: "https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-12/230212121212567/avatar/01_flycam-dji-mavic-air-2-chinh-hang.jpg",
    specs: ["48MP", "4K 60fps", "34 phút bay", "O3"],
    badge: "Chính hãng",
  },
  {
    id: "flycam-dji-mavic-2-pro-chinh-hang",
    name: "Flycam DJI Mavic 2 Pro | Chính hãng",
    brand: "DJI",
    category: "flycam",
    price: 0,
    priceDisplay: "Vui lòng gọi",
    fullSlug: "/san-pham/flycam-dji-mavic-2-pro-chinh-hang_flycam-230212121251339",
    thumbnail: "https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-12/230212121251339/avatar/01_flycam-dji-mavic-2-pro-chinh-hang.jpg",
    specs: ["Hasselblad 1\" CMOS", "4K 30fps", "31 phút bay", "APAS"],
    badge: "Chính hãng",
  },
  {
    id: "flycam-dji-air-2s-chinh-hang",
    name: "Flycam DJI Air 2S | Chính hãng",
    brand: "DJI",
    category: "flycam",
    price: 0,
    priceDisplay: "Vui lòng gọi",
    fullSlug: "/san-pham/flycam-dji-air-2s-chinh-hang_flycam-230212121207132",
    thumbnail: "https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-12/230212121207132/avatar/01_flycam-dji-air-2s-chinh-hang.jpg",
    specs: ["1-inch CMOS", "5.4K 30fps", "31 phút bay", "Mastershots"],
    badge: "Chính hãng",
  },
  {
    id: "flycam-dji-avata-2-fly-more-combo",
    name: "DJI Avata 2 Fly More Combo",
    brand: "DJI",
    category: "flycam",
    price: 0,
    priceDisplay: "Vui lòng gọi",
    fullSlug: "/san-pham/flycam-dji-avata-2-fly-more-combo_flycam-241102151301701",
    thumbnail: "https://mayanhvietnam.com/image-data/san-pham/24-11/24-11-02/241102151301701/avatar/638836956737704928_dji-avata-2-fly-more-combo-three-batteries-chinh-hang.jpg",
    specs: ["4K 100fps", "FPV", "EIS", "27 phút bay"],
    badge: "FPV",
  },
  {
    id: "flycam-dji-neo-chinh-hang",
    name: "FLYCAM DJI NEO (CHÍNH HÃNG)",
    brand: "DJI",
    category: "flycam",
    price: 3900000,
    priceDisplay: "3,900,000đ",
    fullSlug: "/san-pham/flycam-dji-neo-chinh-hang_flycam-241016174248442",
    thumbnail: "https://mayanhvietnam.com/image-data/san-pham/24-10/24-10-16/241016174248442/avatar/638646974460200712_flycam-dji-neo-chinh-hang.jpg",
    specs: ["135g", "AI Follow", "4K", "Palm Takeoff"],
    badge: "Bán chạy",
  },
  {
    id: "dji-avata-1-combo",
    name: "DJI AVATA 1 COMBO",
    brand: "DJI",
    category: "flycam",
    price: 0,
    priceDisplay: "Vui lòng gọi",
    fullSlug: "/san-pham/dji-avata-1-combo_flycam-240801153347034",
    thumbnail: "https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-01/240801153347034/avatar/638581233985436619_dji-avata-1-combo.jpg",
    specs: ["4K 60fps", "FPV", "EIS", "18 phút bay"],
    badge: "FPV",
  },
  {
    id: "flycam-fimi-x8se-2020",
    name: "Flycam Fimi X8SE 2020",
    brand: "Fimi",
    category: "flycam",
    price: 0,
    priceDisplay: "Vui lòng gọi",
    fullSlug: "/san-pham/flycam-fimi-x8se-2020_flycam-230212121317501",
    thumbnail: "https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-12/230212121317501/avatar/01_flycam-fimi-x8se-2020.jpg",
    specs: ["4K HDR", "33 mins", "GPS", "Foldable"],
    badge: "Chính hãng",
  },
  {
    id: "dji-mini-3-fly-more-combo-plus-dji-rcn1",
    name: "DJI Mini 3 Fly More Combo Plus (+ DJI RC-N1)",
    brand: "DJI",
    category: "flycam",
    price: 0,
    priceDisplay: "Vui lòng gọi",
    fullSlug: "/san-pham/dji-mini-3-fly-more-combo-plus-dji-rcn1_flycam-230212121334389",
    thumbnail: "https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-12/230212121334389/avatar/01_dji-mini-3-fly-more-combo-plus-dji-rc-n1.jpg",
    specs: ["<249g", "4K HDR", "45 phút bay", "O3"],
    badge: "Chính hãng",
  },
  {
    id: "flycam-dji-mavic-air-2-fly-more-combo-chinh-hang",
    name: "Flycam DJI Mavic Air 2 Fly More Combo | Chính hãng",
    brand: "DJI",
    category: "flycam",
    price: 0,
    priceDisplay: "Vui lòng gọi",
    fullSlug: "/san-pham/flycam-dji-mavic-air-2-fly-more-combo-chinh-hang_flycam-230212121303611",
    thumbnail: "https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-12/230212121303611/avatar/01_flycam-dji-mavic-air-2-fly-more-combo-chinh-hang.jpg",
    specs: ["48MP", "4K 60fps", "34 phút bay", "O3"],
    badge: "Chính hãng",
  },
  {
    id: "flycam-dji-mini-3-pro-no-rc-chinh-hang",
    name: "Flycam DJI Mini 3 Pro (No RC) | Chính Hãng",
    brand: "DJI",
    category: "flycam",
    price: 0,
    priceDisplay: "Vui lòng gọi",
    fullSlug: "/san-pham/flycam-dji-mini-3-pro-no-rc-chinh-hang_flycam-230212121345122",
    thumbnail: "https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-12/230212121345122/avatar/01_flycam-dji-mini-3-pro-no-rc-chinh-hang.jpg",
    specs: ["<249g", "4K 60fps", "34 phút bay", "O3"],
    badge: "Chính hãng",
  },
  {
    id: "dji-mini-3-dji-rc",
    name: "DJI Mini 3 (+ DJI RC)",
    brand: "DJI",
    category: "flycam",
    price: 0,
    priceDisplay: "Vui lòng gọi",
    fullSlug: "/san-pham/dji-mini-3-dji-rc_flycam-230212121340426",
    thumbnail: "https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-12/230212121340426/avatar/01_dji-mini-3-dji-rc.jpg",
    specs: ["<249g", "4K HDR", "38 phút bay", "O3"],
    badge: "Chính hãng",
  },
  {
    id: "flycam-dji-mini-1-combo",
    name: "FLYCAM DJI MINI 1 COMBO",
    brand: "DJI",
    category: "flycam",
    price: 0,
    priceDisplay: "Vui lòng gọi",
    fullSlug: "/san-pham/flycam-dji-mini-1-combo_flycam-240801155307984",
    thumbnail: "https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-01/240801155307984/avatar/638581244591466697_flycam-dji-mini-1-combo.jpg",
    specs: ["<249g", "2.7K 30fps", "30 phút bay", "QuickShots"],
    badge: "Tiết kiệm",
  },
  {
    id: "flycam-dji-mini-4k-fly-more-combo-gl-chinh-hang",
    name: "FLYCAM DJI MINI 4K FLY MORE COMBO (GL) (CHÍNH HÃNG)",
    brand: "DJI",
    category: "flycam",
    price: 0,
    priceDisplay: "Vui lòng gọi",
    fullSlug: "/san-pham/flycam-dji-mini-4k-fly-more-combo-gl-chinh-hang_flycam-241016175318300",
    thumbnail: "https://mayanhvietnam.com/image-data/san-pham/24-10/24-10-16/241016175318300/avatar/638646980856354781_flycam-dji-mini-4k-fly-more-combo-gl-chinh-hang.jpg",
    specs: ["<249g", "4K 30fps", "O2", "51 phút bay"],
    badge: "Chính hãng",
  },

  // ══════════════════════════════════════════════════════
  // ACTION CAMERA — representative products
  // ══════════════════════════════════════════════════════

  {
    id: "gopro-hero-13-black",
    name: "GoPro Hero 13 Black",
    brand: "GoPro",
    category: "action",
    price: 9690000,
    priceDisplay: "Giá: 9,690,000đ",
    fullSlug: "/san-pham/gopro-hero-13-black_action-camera-250102113303811",
    thumbnail: "https://mayanhvietnam.com/image-data/san-pham/25-01/25-01-02/250102113303811/avatar/638714152413009638_gopro-hero-13-black.jpg",

    images: [
      "https://mayanhvietnam.com/image-data/san-pham/25-01/25-01-02/250102113303811/avatar/638714152413009638_gopro-hero-13-black.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/26-03/26-03-30/260330085702564/avatar/639120324002834549-dji-pocket-4-4-2000x2000-jpg.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/26-02/26-02-26/260226105739670/avatar/639077003951312982.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/25-11/25-11-21/251121164730482/avatar/638993405876903208.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-11/230211001859280/avatar/01.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/24-06/24-06-13/240613101243439/avatar/638538719049533488.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-11/230211001959018/avatar/01.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-11/230211002049598/avatar/01.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-08/240808103727368/avatar/638692606494745882.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-11/230211002016347/avatar/01.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-11/230211001822989/avatar/01.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-11/230211001923445/avatar/01.jpg"
    ],    specs: ["5.3K 60p", "27MP", "HyperSmooth 6.0", "Chống nước 10m"],
    badge: "Bán chạy",
  },
  {
    id: "dji-osmo-pocket-4-creator-combo",
    name: "DJI Osmo Pocket 4 Creator Combo",
    brand: "DJI",
    category: "action",
    price: 14740000,
    priceDisplay: "Giá: 14,740,000đ",
    fullSlug: "/san-pham/dji-osmo-pocket-4-creator-combo_action-camera-260330085702564",
    thumbnail: "https://mayanhvietnam.com/image-data/san-pham/26-03/26-03-30/260330085702564/avatar/639120324002834549-dji-pocket-4-4-2000x2000-jpg_may-quay-dji-osmo-pocket-4-creator-combo.jpg",

    images: [
      "https://mayanhvietnam.com/image-data/san-pham/26-03/26-03-30/260330085702564/avatar/639120324002834549-dji-pocket-4-4-2000x2000-jpg_may-quay-dji-osmo-pocket-4-creator-combo.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/26-02/26-02-26/260226105739670/avatar/639077003951312982.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/25-11/25-11-21/251121164730482/avatar/638993405876903208.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-11/230211001859280/avatar/01.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/24-06/24-06-13/240613101243439/avatar/638538719049533488.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-11/230211001959018/avatar/01.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-11/230211002049598/avatar/01.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-08/240808103727368/avatar/638692606494745882.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-11/230211002016347/avatar/01.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-11/230211001822989/avatar/01.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-11/230211001923445/avatar/01.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-11/230211001920168/avatar/01.jpg"
    ],    specs: ["1-inch 50MP", "4K 120fps", "Gimbal 3 trục", "Màn hình xoay"],
    badge: "Creator",
  },
  {
    id: "insta360-x4",
    name: "Insta360 X4",
    brand: "Insta360",
    category: "action",
    price: 12990000,
    priceDisplay: "Giá: 12,990,000đ",
    fullSlug: "/san-pham/insta360-x4_action-camera-240508164520756",
    thumbnail: "https://mayanhvietnam.com/image-data/san-pham/24-05/24-05-08/240508164520756/avatar/638516255074470789_insta360-x4-one-x4.jpg",

    images: [
      "https://mayanhvietnam.com/image-data/san-pham/24-05/24-05-08/240508164520756/avatar/638516255074470789_insta360-x4-one-x4.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/26-03/26-03-30/260330085702564/avatar/639120324002834549-dji-pocket-4-4-2000x2000-jpg.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/26-02/26-02-26/260226105739670/avatar/639077003951312982.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/25-11/25-11-21/251121164730482/avatar/638993405876903208.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-11/230211001859280/avatar/01.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/24-06/24-06-13/240613101243439/avatar/638538719049533488.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-11/230211001959018/avatar/01.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-11/230211002049598/avatar/01.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-08/240808103727368/avatar/638692606494745882.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-11/230211002016347/avatar/01.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-11/230211001822989/avatar/01.jpg",
      "https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-11/230211001923445/avatar/01.jpg"
    ],    specs: ["8K 30fps 360°", "72MP Ảnh", "4K Wide-Angle", "Me Mode"],
    badge: "Mới",
  },

  // ══════════════════════════════════════════════════════
  // STUDIO EQUIPMENT — representative products
  // ══════════════════════════════════════════════════════

  {
    id: "godox-la200d",
    name: "Godox LA200D Daylight 230W",
    brand: "Godox",
    category: "studio",
    price: 4500000,
    priceDisplay: "Giá: 4,500,000đ",
    fullSlug: "/san-pham/godox-la200d_studio-230214175317364",
    thumbnail: "https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-14/230214175317364/avatar/01_den-godox-la200d-daylight-led-light-230w.jpeg",
    specs: ["230W Daylight", "5600K", "Bowens Mount", "CRI 96"],
    badge: "Bán chạy",
  },
  {
    id: "dji-rs3-pro",
    name: "DJI RS3 Pro Gimbal",
    brand: "DJI",
    category: "studio",
    price: 14500000,
    priceDisplay: "Giá: 14,500,000đ",
    fullSlug: "/san-pham/dji-rs3-pro_studio-240807150216916",
    thumbnail: "https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-07/240807150216916/avatar/638692682554257580_gimbal-dji-rs3-pro.jpg",
    specs: ["LiDAR Focus", "4.5kg Payload", "OLED", "48000Hz sampling"],
    badge: "Pro",
  },

  // ══════════════════════════════════════════════════════
  // ACCESSORY — Billingham bags
  // ══════════════════════════════════════════════════════

  {
    id: "billingham-335-mkii-black-fibrenyte-black",
    name: "Billingham 335 MKII Black/Fibrenyte Black",
    brand: "Billingham",
    category: "accessory",
    price: 12500000,
    priceDisplay: "Giá: 12,500,000đ",
    fullSlug: "/san-pham/billingham-335-mkii-black-fibrenyte-black_phu-kien-250714115219429",
    thumbnail: "https://mayanhvietnam.com/image-data/san-pham/25-07/25-07-14/250714115219429/avatar/638881651497354295_tui-may-anh-billingham-335-mkii-black-fibrenyte-black.jpg",
    specs: ["Premium", "Black", "Camera Bag", "Handmade UK"],
    badge: "Premium",
  },
  {
    id: "billingham-445-mkii-khaki-tan",
    name: "Billingham 445 MKII Khaki/Tan",
    brand: "Billingham",
    category: "accessory",
    price: 16500000,
    priceDisplay: "Giá: 16,500,000đ",
    fullSlug: "/san-pham/billingham-445-mkii-khaki-tan_phu-kien-250714115506308",
    thumbnail: "https://mayanhvietnam.com/image-data/san-pham/25-07/25-07-14/250714115506308/avatar/638881653081594250_tui-may-anh-billingham-445-mkii-khaki-tan.jpg",
    specs: ["Large", "Khaki/Tan", "Pro Level", "Handmade UK"],
    badge: "Premium",
  },
];

// ─── NAVIGATION ────────────────────────────────────────────────────────────

export interface NavItem {
  label: string;
  href: string;
  badge?: string;
}

// Theo observation §2.2 + scraped homepage.json topNavTabs
// "Xem tất cả" = homepage với full product grid (không phải category)
// Flash Sale nằm ở body section, không phải nav item
export const mainNav: NavItem[] = [
  { label: "Xem tất cả", href: "/" },
  { label: "Sản phẩm mới", href: "/san-pham-moi" },
  { label: "Sản phẩm cũ", href: "/san-pham-cu" },
];

// ─── HOMEPAGE SECTIONS ──────────────────────────────────────────────────────

export interface ProductSectionMeta {
  id: string;
  title: string;
  subtitle: string;
  category: Category;
  limit: number;
  accent?: string;
  emoji?: string;
  viewAllHref: string;
}

export const productSections: ProductSectionMeta[] = [
  {
    id: "camera",
    title: "Top Máy Ảnh",
    subtitle: "Canon · Sony · Nikon · Fujifilm chính hãng",
    category: "camera",
    limit: 8,
    accent: "from-orange-500/5 to-transparent",
    emoji: "📷",
    viewAllHref: "/danh-muc/may-anh",
  },
  {
    id: "lens",
    title: "Top Ống Kính",
    subtitle: "Canon RF · Sony FE · Nikon Z · Sigma · Tamron · Viltrox",
    category: "lens",
    limit: 6,
    accent: "from-blue-500/5 to-transparent",
    emoji: "🔭",
    viewAllHref: "/danh-muc/ong-kinh",
  },
  {
    id: "flycam",
    title: "Top Flycam",
    subtitle: "DJI Mavic · Mini · Air · Avata · Inspire · Phantom",
    category: "flycam",
    limit: 6,
    accent: "from-cyan-500/5 to-transparent",
    emoji: "🚁",
    viewAllHref: "/danh-muc/flycam",
  },
  {
    id: "action",
    title: "Top Action Camera",
    subtitle: "GoPro · DJI Osmo · Insta360 — Chống rung HyperSmooth",
    category: "action",
    limit: 6,
    accent: "from-rose-500/5 to-transparent",
    emoji: "🏃",
    viewAllHref: "/danh-muc/action-camera",
  },
  {
    id: "studio",
    title: "Thiết Bị Studio",
    subtitle: "Godox · Nanlite · DJI Gimbal · Flash chuyên nghiệp",
    category: "studio",
    limit: 4,
    accent: "from-amber-500/5 to-transparent",
    emoji: "💡",
    viewAllHref: "/danh-muc/thiet-bi-studio",
  },
];

// ─── HELPER FUNCTIONS ──────────────────────────────────────────────────────

export const getProductsByCategory = (category: Category, limit?: number) => {
  const list = products.filter((p) => p.category === category);
  return typeof limit === "number" ? list.slice(0, limit) : list;
};

export const getProductByFullSlug = (fullSlug: string) =>
  products.find((p) => p.fullSlug === fullSlug) ?? null;

export const getRelatedProducts = (product: Product, limit = 4) =>
  products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, limit);

// ─── CATEGORY BANNERS (bannerSileSmall-2) ──────────────────────────────────
// Banner carousel nhỏ 1305x435 từ mayanhvietnam.com — mỗi category có 1 row

export interface CategoryBanner {
  title: string;
  image: string;
  href: string;
}

export const categoryBanners: Record<string, CategoryBanner[]> = {
  camera: [
    { title: 'Sony A6700', image: `${CDN}/asset/imgs/img/banner/sonet-some_sony-a6700.png`, href: '/tim-kiem?v=sony%206700' },
    { title: 'Sony A7C II', image: `${CDN}/asset/imgs/img/banner/sonet-some_a7cii.png`, href: '/tim-kiem?v=sony%207c%20ii' },
    { title: 'Sony ZV-E10 II', image: `${CDN}/asset/imgs/img/banner/Sonet-some-zv-e10ii_zv-1ii.png`, href: '/danh-muc/may-anh-brd-sony' },
    { title: 'Sony A7 V', image: `${CDN}/asset/imgs/img/banner/uuDai-sonya7v-DCHS.webp`, href: '/san-pham/may-anh-sony-a7-mark-v-a7m5-chinh-hang_may-anh-mirrorless-251126090035598' },
    { title: 'Sony A7R VI', image: `${CDN}/asset/imgs/img/banner/sony-a7r-vi-1.webp`, href: '/san-pham/may-anh-sony-alpha-a7r-vi_may-anh-mirrorless-260328143107303' },
    { title: 'Canon EOS R50', image: `${CDN}/asset/imgs/img/banner/canon_r50_trang_den.webp`, href: '/san-pham/may-anh-canon-eos-r50-black-kem-lens-rfs-1845-chinh-hang_may-anh-mirrorless-241228112737843' },
    { title: 'Canon EOS R6 III', image: `${CDN}/asset/imgs/img/banner/canon-r6-mark-III.webp`, href: '/san-pham/may-anh-canon-eos-r6-mark-iii-body_may-anh-mirrorless-250315190440715' },
  ],
  lens: [
    { title: 'Sony Ưu đãi sáng tạo', image: `${CDN}/asset/imgs/img/banner/tetSieuChuansangtaoSony.webp`, href: '/danh-muc/ong-kinh-khuyen-mai-brd-sony' },
    { title: 'Hộp quà Sony', image: `${CDN}/asset/imgs/img/banner/nhan-ngay-hop-qua-sony.webp`, href: '/danh-muc/ong-kinh-khuyen-mai' },
    { title: 'Canon RF 50mm F1.4L', image: `${CDN}/asset/imgs/img/banner/CANON-RF-50mm-F1.4L-VCM.webp`, href: '/san-pham/ong-kinh-canon-rf-50-f14l-vcm_ong-kinh-mirrorless-251129161537656' },
    { title: 'KM ống kính', image: `${CDN}/asset/imgs/img/banner/Km-lens.webp`, href: '/danh-muc/ong-kinh-khuyen-mai-brd-sony' },
    { title: 'Canon RF 45mm F1.2', image: `${CDN}/asset/imgs/img/banner/RF-45mm-F1.2-STM.webp`, href: '/san-pham/ong-kinh-canon-rf-45-f12-stm_ong-kinh-mirrorless-251106133811267' },
    { title: 'Nikkor Z DX 35mm', image: `${CDN}/asset/imgs/img/banner/NIKKOR-Z-DX-MC-35mm-f_1.7.png`, href: '/san-pham/nikkor-z-dx-mc-35-f17_may-anh-mirrorless-251018134123898' },
    { title: 'Kase AF 85mm', image: `${CDN}/asset/imgs/img/banner/LENS-KASE-AF-85mm-F1.4-FOR-NIKON-Z.webp`, href: '/san-pham/kase-85-f14-af-lens-nikon-z_ong-kinh-mirrorless-251006173300230' },
  ],
  flycam: [
    { title: 'DJI Mini 5 Pro', image: `${CDN}/asset/imgs/img/banner/dji-mini-5-pro.webp`, href: '/san-pham/flycam-dji-mini-5-pro-fly-more-combo-dji-rcn3-chinh-hang_flycam-250929144721576' },
    { title: 'DJI Mavic 4 Pro', image: `${CDN}/asset/imgs/img/banner/Mavic-4-Pro.webp`, href: '/san-pham/dji-mavic-4-pro_flycam-250515084647647' },
    { title: 'DJI Mini 4K', image: `${CDN}/asset/imgs/img/banner/FLYCAM-DJI-MINI-4K-FLY-MORE-COMBO.webp`, href: '/san-pham/flycam-dji-mini-4k-fly-more-combo-gl-chinh-hang_flycam-241016175318300' },
    { title: 'DJI Avata 2', image: `${CDN}/asset/imgs/img/banner/dji-avata-2.webp`, href: '/san-pham/dji-avata-2-fly-more-combo-three-batteries-chinh-hang_flycam-241102151301701' },
    { title: 'DJI Neo', image: `${CDN}/asset/imgs/img/banner/1200x400DJI_Neo.webp`, href: '/san-pham/flycam-dji-neo-chinh-hang_flycam-241016174248442' },
    { title: 'DJI Mini 4 Pro', image: `${CDN}/asset/imgs/img/banner/1200X400_Flycam_DJI_Mini_4-Pro_Fly_More.webp`, href: '/san-pham/flycam-dji-mini-4-pro-fly-more-combo-dji-rc-2_flycam-240403190729530' },
  ],
  action: [
    { title: 'DJI Pocket 4', image: `${CDN}/asset/imgs/img/banner/Dji_osm_pocket_4.webp`, href: '/san-pham/may-quay-dji-osmo-pocket-4-creator-combo_action-camera-260330085702564' },
    { title: 'DJI Action 6', image: `${CDN}/asset/imgs/img/banner/action-6.webp`, href: '/san-pham/may-quay-hanh-trinh-dji-osmo-action-6-standard-combo_action-camera-251114083734433' },
    { title: 'DJI Pocket 3', image: `${CDN}/asset/imgs/img/banner/DJI-Osmo-Pocket-3.webp`, href: '/san-pham/dji-osmo-pocket-3-combo_action-camera-240808113242741' },
    { title: 'Insta360 Go Ultra', image: `${CDN}/asset/imgs/img/banner/Go-ultra-standard-bundle.webp`, href: '/san-pham/action-camera-insta360-go-ultra-standard-bundle-arctic-white_action-camera-250814102845826' },
    { title: 'DJI Osmo Nano', image: `${CDN}/asset/imgs/img/banner/DJI-OSMO-NANO-01.webp`, href: '/san-pham/dji-osmo-nano-standard-combo-128gb-chinh-hang_action-camera-250925153519860' },
    { title: 'DJI Action 5 Pro', image: `${CDN}/asset/imgs/img/banner/action5pro.webp`, href: '/san-pham/dji-osmo-action-5-pro_action-camera-241016174737304' },
  ],
  studio: [],
};

// ─── REVIEW VIDEOS ────────────────────────────────────────────────────────
// ĐÚNG theo danh sách video YouTube thật trên trang mayanhvietnam.com
// (yanked from layout-preview-gp section — IDs: z9hJFwVLS4A, BIUttXDonuo, jz42ostc6K8, i5wmKTdzJHo, xdoZXGbUQJE, v2oxxlfzsBM)

export interface ReviewVideo {
  /** ID YouTube — dùng để build embed URL chuẩn */
  youtubeId: string;
  title: string;
  embedUrl: string;
  watchUrl: string;
}

export const reviewVideos: ReviewVideo[] = [
  {
    youtubeId: "z9hJFwVLS4A",
    title: "X-H2S",
    embedUrl: "https://www.youtube.com/embed/z9hJFwVLS4A",
    watchUrl: "https://www.youtube.com/watch?v=z9hJFwVLS4A",
  },
  {
    youtubeId: "BIUttXDonuo",
    title: "Chị khách xinh ghé shop Tiền Giang chốt ngay Canon R50",
    embedUrl: "https://www.youtube.com/embed/BIUttXDonuo",
    watchUrl: "https://www.youtube.com/watch?v=BIUttXDonuo",
  },
  {
    youtubeId: "jz42ostc6K8",
    title: "Cầm 200 triệu đi mua máy ảnh là cảm",
    embedUrl: "https://www.youtube.com/embed/jz42ostc6K8",
    watchUrl: "https://www.youtube.com/watch?v=jz42ostc6K8",
  },
  {
    youtubeId: "i5wmKTdzJHo",
    title: "Nay khách ghé shop — chốt luôn Lumix S5 II & đập hộp tại chỗ",
    embedUrl: "https://www.youtube.com/embed/i5wmKTdzJHo",
    watchUrl: "https://www.youtube.com/watch?v=i5wmKTdzJHo",
  },
  {
    youtubeId: "xdoZXGbUQJE",
    title: "KASE 85mm f/1.4 RF",
    embedUrl: "https://www.youtube.com/embed/xdoZXGbUQJE",
    watchUrl: "https://www.youtube.com/watch?v=xdoZXGbUQJE",
  },
  {
    youtubeId: "v2oxxlfzsBM",
    title: "R50",
    embedUrl: "https://www.youtube.com/embed/v2oxxlfzsBM",
    watchUrl: "https://www.youtube.com/watch?v=v2oxxlfzsBM",
  },
];

// ─── TRUST BADGES ─────────────────────────────────────────────────────────

export const trustBadges = [
  { text: "Hàng chính hãng 100%", icon: "shield" },
  { text: "Giao hàng toàn quốc", icon: "truck" },
  { text: "Bảo hành lên đến 5 năm", icon: "warranty" },
  { text: "Thu cũ đổi mới — Trả góp 0%", icon: "return" },
  { text: "Hotline tư vấn 24/7", icon: "card" },
  { text: "Đội ngũ chuyên gia tư vấn", icon: "star" },
  { text: "Tặng kèm phụ kiện khi mua", icon: "gift" },
];

// ─── STORE LOCATIONS ──────────────────────────────────────────────────────

export const storeLocations = [
  { city: "TP.Hồ Chí Minh", address: "Số 9, Nam Quốc Cang, Phường Bến Thành, Q.1", hours: "09:00–19:00", phone: "0907.215.252", zalo: "https://zalo.me/2875467351509223987", messenger: "https://www.facebook.com/mayanhvietnam" },
  { city: "TP. Cần Thơ", address: "Số 58 Nguyễn Hiền, Khu Dân Cư 91B, P. Tân An", hours: "08:00–20:00", phone: "0937.148.222", zalo: "https://zalo.me/2875467351509223987", messenger: "https://www.facebook.com/mayanhvietnam" },
  { city: "An Giang", address: "Số 1, đường số 1, khu Tây sông Hậu, Phường Long Xuyên", hours: "08:00–17:30", phone: "0937.148.222", zalo: "https://zalo.me/2875467351509223987", messenger: "https://www.facebook.com/mayanhvietnam" },
  { city: "Tiền Giang", address: "Số 126 Hoàng Sa, Phường Thới Sơn, TP. Mỹ Tho", hours: "08:00–18:00", phone: "0937.148.222", zalo: "https://zalo.me/2875467351509223987", messenger: "https://www.facebook.com/mayanhvietnam" },
];

// ─── FOOTER COLUMNS ───────────────────────────────────────────────────────

export const footerColumns = [
  {
    title: "Danh mục sản phẩm",
    links: [
      "Máy ảnh",
      "Ống kính",
      "Máy cũ giá tốt",
      "Setup phòng studio",
      "Action camera",
      "Flycam",
      "Thiết bị phòng studio",
      "Phụ kiện máy ảnh",
      "Máy quay phim",
    ],
  },
  {
    title: "Chính sách",
    links: [
      "Chính sách bảo hành",
      "Chính sách thanh toán",
      "Chính sách đổi trả, Hoàn tiền",
      "Chính sách vận chuyển",
      "Chính sách bảo mật thông tin",
      "Thông tin liên hệ",
      "Thu cũ đổi mới",
    ],
  },
];

// ─── PAYMENT METHODS ────────────────────────────────────────────────────────

export const paymentMethods = ["Visa", "MasterCard", "JCB", "NAPAS", "MoMo", "Home PayLater"];
