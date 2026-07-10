// mayanhvietnam.com — Business Data Layer
// Real product data scraped from mayanhvietnam.com (2026-07-09)

// ─── BRAND ASSETS ───────────────────────────────────────────────────────────

export const brandAssets = {
  logo: "https://mayanhvietnam.com/asset/imgs/icon/Logo_white01.png",
  logoFull: "https://mayanhvietnam.com/asset/imgs/img/Logo_white.png",
  logoBCT: "https://mayanhvietnam.com/asset/imgs/icon/logoBCT.png",
  paymentIcons: {
    visa: "https://mayanhvietnam.com/asset/imgs/icon/hinhThucThanhToan/visa_icon_44fe6e15ed.svg",
    mastercard: "https://mayanhvietnam.com/asset/imgs/icon/hinhThucThanhToan/mastercard_icon_c75f94f6a5.svg",
    jcb: "https://mayanhvietnam.com/asset/imgs/icon/hinhThucThanhToan/jcb_icon_214783937c.svg",
    napas: "https://mayanhvietnam.com/asset/imgs/icon/hinhThucThanhToan/napas_icon_94d5330e3c.svg",
    homePayLater: "https://mayanhvietnam.com/asset/imgs/icon/hinhThucThanhToan/homepaylater_icon_adef600842.svg",
    momo: "https://mayanhvietnam.com/asset/imgs/icon/hinhThucThanhToan/momo_icon_baef21b5f7.svg",
  },
};

// ─── TYPES ──────────────────────────────────────────────────────────────────

export type Brand =
  | "Canon" | "Nikon" | "Sony" | "Fujifilm" | "Tamron" | "Sigma"
  | "Viltrox" | "Kase" | "DJI" | "Insta360" | "GoPro"
  | "Godox" | "Nanlite" | "Blackmagic" | "Panasonic" | "Billingham";

export type Category =
  | "camera" | "lens" | "flycam" | "action"
  | "camcorder" | "accessory" | "studio" | "used";

export interface Product {
  id: string;
  name: string;
  brand: Brand;
  category: Category;
  /** Starting price in VND */
  price: number;
  /** Original / list price before discount */
  originalPrice?: number;
  /** Price range upper bound */
  priceMax?: number;
  /** Product image URL (mayanhvietnam.com CDN) */
  image: string;
  /** Hover / secondary image */
  hoverImage?: string;
  condition?: "new" | "used";
  badge?: string;
  slug: string;
  specs?: string[];
  callForPrice?: boolean;
  bgColor?: string;
}

export interface Banner {
  title: string;
  subtitle: string;
  image: string;
  link: string;
  bgColor?: string;
  badge?: string;
}

export interface ReviewVideo {
  title: string;
  thumbnail: string;
  videoUrl: string;
  creator: string;
  category: Category;
}

export interface FooterColumn {
  title: string;
  links: string[];
}

export interface StoreLocation {
  city: string;
  address: string;
  hours: string;
  phone: string;
}

export interface TrustBadge {
  text: string;
  icon: string;
}

// ─── BANNERS ────────────────────────────────────────────────────────────────

export const banners: Banner[] = [
  {
    title: "Canon EOS R50 — Giá tốt nhất thị trường",
    subtitle: "Chỉ từ 17.500.000đ — Camera APS-C 24.2MP + RF-S 18-45mm",
    image: "https://mayanhvietnam.com/asset/imgs/img/SPKM_banner/SPKM_eosR50.webp",
    link: "/camera/canon-eos-r50",
    bgColor: "#1a1a2e",
  },
  {
    title: "Sản phẩm khuyến mãi hot 2025",
    subtitle: "Giảm đến 30% — Canon, Sony, Nikon, DJI chính hãng",
    image: "https://mayanhvietnam.com/asset/imgs/img/1200x400_banner_sanPhamKhuyenMai20250108.png",
    link: "/khuyen-mai",
    bgColor: "#0f172a",
  },
  {
    title: "DJI Mini 5 Pro — Tín hiệu mới",
    subtitle: "Tốc độ bay 57.6 km/h · Camera 4K · Obstacle Avoidance",
    image: "https://mayanhvietnam.com/asset/imgs/icon/bannerSanPhamKM-v1.png",
    link: "/flycam/dji-mini-5-pro",
    bgColor: "#18181b",
  },
];

// ─── GRAPHIC NAVIGATION (category thumbnails) ───────────────────────────────

export const graphicNav = [
  { name: "Máy Ảnh", slug: "camera", emoji: "📷", image: "https://mayanhvietnam.com/asset/imgs/img/danhMuc_MayAnh.webp" },
  { name: "Ống Kính", slug: "lens", emoji: "🔭", image: "https://mayanhvietnam.com/asset/imgs/img/danhMuc_ongkinh.webp" },
  { name: "Flycam", slug: "flycam", emoji: "🚁", image: "https://mayanhvietnam.com/asset/imgs/img/danhMuc_flycam.webp" },
  { name: "Action Cam", slug: "action", emoji: "🏃", image: "https://mayanhvietnam.com/asset/imgs/img/danhMuc_action.webp" },
  { name: "Máy Quay Phim", slug: "camcorder", emoji: "📹", image: "https://mayanhvietnam.com/asset/imgs/img/danhMuc_mayQuayPhim.webp" },
  { name: "Thiết Bị Studio", slug: "studio", emoji: "💡", image: "https://mayanhvietnam.com/asset/imgs/img/danhMuc_thietBiStudio.webp" },
  { name: "Phụ Kiện", slug: "accessory", emoji: "🎒", image: "https://mayanhvietnam.com/asset/imgs/img/danhMuc_phuKien.webp" },
  { name: "Hàng Cũ", slug: "used", emoji: "♻️", image: "https://mayanhvietnam.com/asset/imgs/img/danhMuc_spCu.webp" },
  { name: "Lắp Phòng", slug: "studio-setup", emoji: "🎬", image: "https://mayanhvietnam.com/asset/imgs/img/danhMuc_setupPhong.webp" },
];

// ─── PRODUCTS (real scraped data) ───────────────────────────────────────────

const CDN = "https://mayanhvietnam.com";

export const products: Product[] = [
  // ── CAMERAS ────────────────────────────────────────────────────────────────
  {
    id: "p1",
    name: "Canon EOS R6 Mark II (Body)",
    brand: "Canon",
    category: "camera",
    price: 40500000,
    image: `${CDN}/image-data/san-pham/23-02/23-02-10/230210223748534/avatar/01_may-anh-canon-eos-r6-mark-ii-chinh-hang.jpg`,
    badge: "Bán chạy",
    slug: "canon-eos-r6-mark-ii-body-only",
    specs: ["Full-frame 24.2MP", "DIGIC X", "4K 60fps", "IBIS 5-Axis"],
    callForPrice: true,
  },
  {
    id: "p2",
    name: "Sony Alpha A7 Mark IV (Body)",
    brand: "Sony",
    category: "camera",
    price: 47500000,
    image: `${CDN}/image-data/san-pham/23-02/23-02-10/230210223540859/avatar/01_may-anh-sony-alpha-a7-mark-iv-body-only-chinh-hang.jpg`,
    badge: "Chính hãng",
    slug: "may-anh-sony-alpha-a7-mark-iv-body-only-chinh-hang",
    specs: ["Full-frame 33MP", "BIONZ XR", "4K 60p 10-bit", "Eye AF"],
  },
  {
    id: "p3",
    name: "Sony ZV-E10 II (Black Body)",
    brand: "Sony",
    category: "camera",
    price: 26000000,
    image: `${CDN}/image-data/san-pham/24-08/24-08-26/240826174229493/avatar/638708944659930440_may-anh-sony-zv-e10-ii-black-body-only-chinh-hang.jpg`,
    badge: "Vlogger",
    slug: "may-anh-sony-zve10-ii-black-body-only-chinh-hang",
    specs: ["APS-C 26MP", "4K 30p", "Eye AF", "Micro 3 capsule"],
  },
  {
    id: "p3b",
    name: "Sony Alpha A7R VI",
    brand: "Sony",
    category: "camera",
    price: 85000000,
    image: `${CDN}/image-data/san-pham/26-03/26-03-28/260328143107303/avatar/639103051286629766-Alpha-A7R-Mark-VI-png_may-anh-sony-alpha-a7r-vi.jpg`,
    badge: "Mới",
    slug: "may-anh-sony-alpha-a7r-vi",
    specs: ["Full-frame 61MP", "AI Processor", "8K Video", "IBIS 8-stop"],
    callForPrice: true,
  },
  {
    id: "p3c",
    name: "Sony A7 V (A7M5)",
    brand: "Sony",
    category: "camera",
    price: 62000000,
    image: `${CDN}/image-data/san-pham/25-11/25-11-26/251126090035598/avatar/639005206164966322_may-anh-sony-a7-mark-v-a7m5-chinh-hang.jpg`,
    badge: "Mới",
    slug: "may-anh-sony-a7-mark-v",
    specs: ["Full-frame 33MP", "AI AF", "4K 120p", "Dual CFexpress"],
    callForPrice: true,
  },
  {
    id: "p4",
    name: "Canon EOS R50 Black + RF-S 18-45mm",
    brand: "Canon",
    category: "camera",
    price: 17500000,
    image: `${CDN}/image-data/san-pham/24-12/24-12-28/241228112737843/avatar/638709822567106100_may-anh-canon-eos-r50-black-kem-lens-rf-s-18-45mm-chinh-hang.jpg`,
    badge: "Phổ biến",
    slug: "may-anh-canon-eos-r50-black-kem-lens-rf-s-18-45mm",
    specs: ["APS-C 24.2MP", "4K 30fps", "RF-S 18-45mm", "299g"],
  },
  {
    id: "p5",
    name: "Nikon Z6 III + 24-70mm f/4",
    brand: "Nikon",
    category: "camera",
    price: 45900000,
    image: `${CDN}/image-data/san-pham/25-05/25-05-20/250520145943720/avatar/638833501469480006_nikon-z6-mark-iii-kem-lens-z-24-70-mm-f-4-s-chinh-hang-vic.jpg`,
    slug: "nikon-z6-iii-24-70mm",
    specs: ["Full-frame 24.5MP", "6K Video", "IBIS 8-stop", "Dual Card"],
    callForPrice: true,
  },
  {
    id: "p6",
    name: "Nikon Zf (Black)",
    brand: "Nikon",
    category: "camera",
    price: 43500000,
    image: `${CDN}/image-data/san-pham/25-05/25-05-30/250530073748218/avatar/638841874800416073_may-anh-nikon-zf-kit-z-40mm-f2-se.jpg`,
    slug: "nikon-zf-black",
    specs: ["Full-frame 24.5MP", "Retro design", "4K 60p", "IBIS"],
    callForPrice: true,
  },
  {
    id: "p7",
    name: "Canon EOS R8 (Body)",
    brand: "Canon",
    category: "camera",
    price: 28500000,
    image: `${CDN}/image-data/san-pham/23-04/23-04-19/230419151242054/avatar/canon-eos-r8-6-500x500_may-anh-canon-eos-r8-body-only.jpg`,
    slug: "may-anh-canon-eos-r8-body",
    specs: ["Full-frame 24.2MP", "DIGIC X", "4K 60p", "461g"],
    callForPrice: true,
  },
  {
    id: "p8",
    name: "Nikon Z50 II (Body)",
    brand: "Nikon",
    category: "camera",
    price: 19500000,
    image: `${CDN}/image-data/san-pham/25-02/25-02-06/250206095656295/avatar/638745179216782096_may-anh-nikon-z50-ii-body.jpg`,
    slug: "nikon-z50-ii-body",
    specs: ["APS-C 20.9MP", "4K 30p", "EXPEED 7", "350g"],
  },
  {
    id: "p9",
    name: "Fujifilm X-H2S (Body)",
    brand: "Fujifilm",
    category: "camera",
    price: 34990000,
    originalPrice: 37990000,
    image: `${CDN}/image-data/san-pham/23-02/23-02-10/230210223540394/avatar/01_may-anh-fujifilm-x-h2s-body-only-chinh-hang.jpg`,
    badge: "-8%",
    slug: "fujifilm-x-h2s-body",
    specs: ["APS-C 26MP Stacked", "4K 120p", "IBIS 7-stop", "Film Simulation"],
  },
  {
    id: "p10",
    name: "Sony A7C II (Silver)",
    brand: "Sony",
    category: "camera",
    price: 42000000,
    image: `${CDN}/image-data/san-pham/23-08/23-08-30/230830134714949/avatar/638308197638831519_may-anh-sony-alpha-a7c-ii-body-only-silver-chinh-hang.jpg`,
    slug: "sony-a7c-ii-silver",
    specs: ["Full-frame 33MP", "Compact body", "Real-time AF", "5-stop IBIS"],
    callForPrice: true,
  },
  {
    id: "p10b",
    name: "Sony A9 III",
    brand: "Sony",
    category: "camera",
    price: 110000000,
    image: `${CDN}/image-data/san-pham/25-12/25-12-09/251209090438536/avatar/639008696959464299_may-anh-sony-a9-iii-chinh-hang.jpg`,
    badge: "Flagship",
    slug: "sony-a9-iii",
    specs: ["Full-frame 24.6MP Stacked", "120fps", "Global Shutter", "4K 120p"],
    callForPrice: true,
  },
  {
    id: "p10c",
    name: "Sony A7R V",
    brand: "Sony",
    category: "camera",
    price: 65000000,
    image: `${CDN}/image-data/san-pham/24-08/24-08-02/240802084419498/avatar/638692697759009422_may-anh-sony-alpha-a7r-mark-v-chinh-hang.jpg`,
    slug: "sony-a7r-v",
    specs: ["61MP Full-frame", "AI Processor", "8-stop IBIS", "8K Video"],
    callForPrice: true,
  },

  // ── LENSES ─────────────────────────────────────────────────────────────────
  {
    id: "l1",
    name: "Canon RF 24-70mm f/2.8L IS USM",
    brand: "Canon",
    category: "lens",
    price: 48900000,
    image: `${CDN}/image-data/san-pham/23-02/23-02-10/230210234357844/avatar/01_ong-kinh-canon-rf-24-70mm-f-2-8l-is-usm-chinh-hang.jpg`,
    slug: "ong-kinh-canon-rf-2470-f28-l-is-usm",
    specs: ["24-70mm f/2.8", "IS 5-stop", "Nano USM", "L-series"],
    callForPrice: true,
  },
  {
    id: "l2",
    name: "Sony FE 70-200mm f/2.8 GM II OSS",
    brand: "Sony",
    category: "lens",
    price: 52000000,
    image: `${CDN}/image-data/san-pham/24-08/24-08-03/240803094242227/avatar/638692469929544019_ong-kinh-sony-fe-70-200mm-f2-8-gm-ii-oss.jpg`,
    slug: "sony-fe-70-200mm-f2-8-gm-ii",
    specs: ["70-200mm f/2.8", "GM II", "Nano XD", "1045g"],
    callForPrice: true,
  },
  {
    id: "l3",
    name: "Nikon Z 24-70mm f/2.8 S II",
    brand: "Nikon",
    category: "lens",
    price: 45000000,
    image: `${CDN}/image-data/san-pham/25-09/25-09-22/250922103851025/avatar/638941343754731632_ong-kinh-nikon-z-24-70mm-f-2-8-s-ii.jpg`,
    slug: "nikon-z-24-70mm-f28-s-ii",
    specs: ["24-70mm f/2.8", "S-line", "Multi-focus", "635g"],
    callForPrice: true,
  },
  {
    id: "l4",
    name: "Sigma 200mm f/2 DG OS Sports (Sony E)",
    brand: "Sigma",
    category: "lens",
    price: 72000000,
    image: `${CDN}/image-data/san-pham/25-08/25-08-20/250820095043213/avatar/638912804942323908_ong-kinh-sigma-200mm-f2-dg-os-sports-for-sony-e-chinh-hang.jpg`,
    slug: "sigma-200mm-f2-dg-os-sony",
    specs: ["200mm f/2", "Sports", "OS", "Telephoto Legend"],
    callForPrice: true,
  },
  {
    id: "l5",
    name: "Canon RF 70-200mm f/2.8L IS USM",
    brand: "Canon",
    category: "lens",
    price: 47500000,
    image: `${CDN}/image-data/san-pham/24-08/24-08-02/240802101451137/avatar/638692749614202751_ong-kinh-canon-rf-70-200mm-f2-8-l-is-usm.jpg`,
    slug: "canon-rf-70-200mm-f28",
    specs: ["70-200mm f/2.8", "IS 5-stop", "Nano USM", "L-series"],
    callForPrice: true,
  },
  {
    id: "l6",
    name: "Sigma 35mm f/1.4 DG II Art (Sony E)",
    brand: "Sigma",
    category: "lens",
    price: 18500000,
    image: `${CDN}/image-data/san-pham/26-02/26-02-26/260226193416226/avatar/639077312681395005_ong-kinh-sigma-35mm-f1-4-dg-ii-for-sony-e-chinh-hang.jpg`,
    slug: "sigma-35mm-f14-dg-ii-sony",
    specs: ["35mm f/1.4", "Art II", "HSL System", "545g"],
  },
  {
    id: "l7",
    name: "Tamron 28-75mm f/2.8 Di III VXD G2 (Nikon Z)",
    brand: "Tamron",
    category: "lens",
    price: 14500000,
    image: `${CDN}/image-data/san-pham/24-08/24-08-31/240831133137156/avatar/638722116807217083_ong-kinh-tamron-28-75mm-f2-8-di-iii-vxd-g2-for-nikon-z.jpg`,
    slug: "tamron-28-75mm-nikon-z",
    specs: ["28-75mm f/2.8", "VXD Motor", "G2", "540g"],
  },
  {
    id: "l8",
    name: "Viltrox 85mm f/1.4 Pro (Nikon Z)",
    brand: "Viltrox",
    category: "lens",
    price: 12800000,
    image: `${CDN}/image-data/san-pham/25-11/25-11-03/251103143407180/avatar/638977774249552971_ong-kinh-viltrox-85mm-f-1-4-pro-nikon-z.jpg`,
    slug: "viltrox-85mm-f14-pro-nikon-z",
    specs: ["85mm f/1.4", "Pro", "STM Motor", "Portrait"],
  },
  {
    id: "l9",
    name: "Fujifilm XF 27mm f/2.8",
    brand: "Fujifilm",
    category: "lens",
    price: 12500000,
    image: `${CDN}/image-data/san-pham/23-02/23-02-11/230211000754241/avatar/01_ong-kinh-fujifilm-xf-27mm-f2-8-black-chinh-hang.jpg`,
    slug: "fujifilm-xf-27mm-f28",
    specs: ["27mm f/2.8", "Pancake", "84g", "XF Mount"],
  },

  // ── FLYCAM ─────────────────────────────────────────────────────────────────
  {
    id: "f1",
    name: "DJI Mavic 4 Pro 512GB Creator Combo",
    brand: "DJI",
    category: "flycam",
    price: 85000000,
    image: `${CDN}/image-data/san-pham/25-05/25-05-15/250515085035248/avatar/638828964891489787_dji-mavic-4-pro-512gb-creator-combo.jpg`,
    badge: "Flagship",
    slug: "dji-mavic-4-pro-creator-combo",
    specs: ["Hasselblad 100MP", "6K 60fps", "LiDAR", "35-40 phút bay"],
    callForPrice: true,
  },
  {
    id: "f2",
    name: "DJI Mini 5 Pro Base",
    brand: "DJI",
    category: "flycam",
    price: 14900000,
    image: `${CDN}/image-data/san-pham/25-09/25-09-12/250912094317313/avatar/638932671190111464_dji-mini-5-pro-base-chinh-hang.jpg`,
    badge: "Mới",
    slug: "dji-mini-5-pro-base",
    specs: ["<249g", "4K HDR", "Obstacle Avoidance", "O4"],
  },
  {
    id: "f3",
    name: "DJI Air 3S Fly More Combo + RC 2",
    brand: "DJI",
    category: "flycam",
    price: 28500000,
    image: `${CDN}/image-data/san-pham/24-11/24-11-02/241102144506281/avatar/638661555984717416_flycam-dji-air-3s-fly-more-combo-dji-rc-2-chinh-hang.jpg`,
    slug: "dji-air-3s-fly-more-combo-rc2",
    specs: ["1-inch CMOS", "4K 60fps", "O4+", "46 phút bay"],
    callForPrice: true,
  },
  {
    id: "f4",
    name: "DJI Mavic 3 Pro + RC Pro",
    brand: "DJI",
    category: "flycam",
    price: 47500000,
    image: `${CDN}/image-data/san-pham/24-08/24-08-08/240808101913354/avatar/638587093009322839_flycam-dji-mavic-3-pro-pro-combo-dji-rc-pro.jpg`,
    slug: "dji-mavic-3-pro-rc-pro",
    specs: ["Triple Camera", "Hasselblad 20MP", "43 phút bay", "APAS 5.0"],
    callForPrice: true,
  },
  {
    id: "f5",
    name: "DJI Mini 4 Pro Fly More Plus + RC 2",
    brand: "DJI",
    category: "flycam",
    price: 19900000,
    image: `${CDN}/image-data/san-pham/23-09/23-09-26/230926111234846/avatar/638313238790810792_dji-mini-4-pro-fly-more-combo-plus-dji-rc-2-gl.jpg`,
    slug: "dji-mini-4-pro-fly-more-plus-rc2",
    specs: ["<249g", "4K HDR", "O4", "34 phút bay"],
    callForPrice: true,
  },
  {
    id: "f6",
    name: "DJI Avata 2 Fly More Combo",
    brand: "DJI",
    category: "flycam",
    price: 17900000,
    image: `${CDN}/image-data/san-pham/24-11/24-11-02/241102151301701/avatar/638836956737704928_dji-avata-2-fly-more-combo-three-batteries-chinh-hang.jpg`,
    slug: "dji-avata-2-fly-more-combo",
    specs: ["4K 100fps", "FPV", "EIS", "27 phút bay"],
    callForPrice: true,
  },
  {
    id: "f7",
    name: "DJI Neo",
    brand: "DJI",
    category: "flycam",
    price: 5990000,
    image: `${CDN}/image-data/san-pham/24-10/24-10-16/241016174248442/avatar/638646974460200712_flycam-dji-neo-chinh-hang.jpg`,
    slug: "dji-neo",
    specs: ["135g", "AI Follow", "4K", "Palm Takeoff"],
  },
  {
    id: "f8",
    name: "DJI Inspire 2 + X5S",
    brand: "DJI",
    category: "flycam",
    price: 120000000,
    image: `${CDN}/image-data/san-pham/23-02/23-02-12/230212121228821/avatar/01_flycam-dji-inspire-2-x5s-standard-kit-chinh-hang.jpg`,
    slug: "dji-inspire-2-x5s",
    specs: ["5.2K CinemaDNG", "Dual Battery", "Professional", "X5S Mount"],
    callForPrice: true,
  },

  // ── ACTION CAM ─────────────────────────────────────────────────────────────
  {
    id: "a1",
    name: "GoPro Hero 13 Black",
    brand: "GoPro",
    category: "action",
    price: 9690000,
    image: `${CDN}/image-data/san-pham/25-01/25-01-02/250102113303811/avatar/638714152413009638_gopro-hero-13-black.jpg`,
    badge: "Bán chạy",
    slug: "gopro-hero-13-black",
    specs: ["5.3K 60p", "27MP", "HyperSmooth 6.0", "Chống nước 10m"],
  },
  {
    id: "a2",
    name: "DJI Osmo Pocket 4 Creator Combo",
    brand: "DJI",
    category: "action",
    price: 14740000,
    image: `${CDN}/image-data/san-pham/26-03/26-03-30/260330085702564/avatar/639120324002834549-dji-pocket-4-4-2000x2000-jpg_may-quay-dji-osmo-pocket-4-creator-combo.jpg`,
    badge: "Creator",
    slug: "dji-osmo-pocket-4-creator-combo",
    specs: ["1-inch 50MP", "4K 120fps", "Gimbal 3 trục", "Màn hình xoay"],
  },
  {
    id: "a3",
    name: "DJI Osmo Action 5 Pro Adventure Combo",
    brand: "DJI",
    category: "action",
    price: 12900000,
    image: `${CDN}/image-data/san-pham/26-02/26-02-26/260226105739670/avatar/639077003951312982_dji-osmo-action-5-pro-adventure-combo.jpg`,
    slug: "dji-osmo-action-5-pro-adventure",
    specs: ["1/1.3-inch", "4K 120fps", "Magnetic Mount", "Chống nước 20m"],
  },
  {
    id: "a4",
    name: "Insta360 GO Ultra Creator Bundle",
    brand: "Insta360",
    category: "action",
    price: 8500000,
    image: `${CDN}/image-data/san-pham/25-10/25-10-13/251013163315254/avatar/638959702653451679_insta360-go-ultra-creator-bundle-arctic-white.jpg`,
    slug: "insta360-go-ultra-creator",
    specs: ["4K", "Tiny", "IPX4", "FlowState"],
  },
  {
    id: "a5",
    name: "Insta360 X4",
    brand: "Insta360",
    category: "action",
    price: 12990000,
    image: `${CDN}/image-data/san-pham/24-05/24-05-08/240508164520756/avatar/638516255074470789_insta360-x4-one-x4.jpg`,
    slug: "insta360-x4",
    specs: ["8K 30fps 360°", "72MP Ảnh", "4K Wide-Angle", "Me Mode"],
  },
  {
    id: "a6",
    name: "DJI Osmo Action 6 Adventure Combo",
    brand: "DJI",
    category: "action",
    price: 13900000,
    image: `${CDN}/image-data/san-pham/25-11/25-11-21/251121164730482/avatar/638993405876903208_dji-osmo-action-6-adventure-combo.jpg`,
    badge: "Mới",
    slug: "dji-osmo-action-6-adventure",
    specs: ["1/1.3-inch", "4K 120fps", "HorizonLock", "Chống nước 30m"],
  },
  {
    id: "a7",
    name: "Insta360 GO 3S 128GB (Black)",
    brand: "Insta360",
    category: "action",
    price: 7490000,
    image: `${CDN}/image-data/san-pham/24-12/24-12-17/241217142735047/avatar/638700425450690776_camera-insta360-go-3s-128gb-midnight-black.jpg`,
    slug: "insta360-go-3s-128gb-black",
    specs: ["4K", "Tiny Cam", "128GB", "FlowState"],
  },

  // ── CAMCORDER ──────────────────────────────────────────────────────────────
  {
    id: "c1",
    name: "Sony FX3 II",
    brand: "Sony",
    category: "camcorder",
    price: 110000000,
    image: `${CDN}/image-data/san-pham/26-03/26-03-28/260328145950429/avatar/639103067985726326-Sony-FX3-II-png_may-quay-sony-fx3-ii.jpg`,
    badge: "Mới",
    slug: "sony-fx3-ii",
    specs: ["Full-frame Cinema", "4K 120p", "S-Cinetone", "Dual CFexpress"],
    callForPrice: true,
  },
  {
    id: "c2",
    name: "Blackmagic BMPCC 6K Pro",
    brand: "Blackmagic",
    category: "camcorder",
    price: 52000000,
    image: `${CDN}/image-data/san-pham/23-02/23-02-11/230211125329527/avatar/01_blackmagic-pocket-cinema-camera-6k-pro.jpg`,
    slug: "blackmagic-bmpcc-6k-pro",
    specs: ["Super 35 6K", "HDR", "Blackmagic RAW", "EF Mount"],
    callForPrice: true,
  },
  {
    id: "c3",
    name: "Canon EOS C70 Body",
    brand: "Canon",
    category: "camcorder",
    price: 78000000,
    image: `${CDN}/image-data/san-pham/23-02/23-02-11/230211125332512/avatar/01_may-quay-phim-canon-eos-c70-body-only.jpg`,
    slug: "canon-eos-c70-body",
    specs: ["Super 35 DGO", "4K 120fps", "RF Mount", "Dual Pixel AF"],
    callForPrice: true,
  },
  {
    id: "c4",
    name: "Sony FX30",
    brand: "Sony",
    category: "camcorder",
    price: 32000000,
    image: `${CDN}/image-data/san-pham/24-08/24-08-29/240829180801135/avatar/638722123731263546_may-quay-phim-sony-ilmefx30-chinh-hang.jpg`,
    slug: "sony-fx30",
    specs: ["APS-C 20.1MP", "4K 120p", "S-Cinetone", "Cinema Line"],
    callForPrice: true,
  },
  {
    id: "c5",
    name: "Sony FX6V",
    brand: "Sony",
    category: "camcorder",
    price: 95000000,
    image: `${CDN}/image-data/san-pham/25-02/25-02-21/250221083627908/avatar/638757242585374342_ilme-fx6v-may-quay-full-frame-sony.jpg`,
    slug: "sony-fx6v",
    specs: ["Full-frame 10.2MP", "4K 120p", "S-Log3", "Cinema Line"],
    callForPrice: true,
  },
  {
    id: "c6",
    name: "DJI Ronin 4D 8K",
    brand: "DJI",
    category: "camcorder",
    price: 200000000,
    image: `${CDN}/image-data/san-pham/23-02/23-02-11/230211125328649/avatar/01_may-quay-dji-ronin-4d-8k.jpg`,
    slug: "dji-ronin-4d-8k",
    specs: ["8K Full-frame", "4-axis Gimbal", "LiDAR Focus", "Cinema"],
    callForPrice: true,
  },

  // ── STUDIO ─────────────────────────────────────────────────────────────────
  {
    id: "s1",
    name: "Godox LA200D Daylight 230W",
    brand: "Godox",
    category: "studio",
    price: 4500000,
    image: `${CDN}/image-data/san-pham/23-02/23-02-14/230214175317364/avatar/01_den-godox-la200d-daylight-led-light-230w.jpeg`,
    slug: "godox-la200d",
    specs: ["230W Daylight", "5600K", "Bowens Mount", "CRI 96"],
  },
  {
    id: "s2",
    name: "Nanlite FC-300B Bi-Color",
    brand: "Nanlite",
    category: "studio",
    price: 6200000,
    image: `${CDN}/image-data/san-pham/23-11/23-11-15/231115113349123/avatar/638356451394903043_den-led-nanlite-fc-300b-bi-color.jpg`,
    slug: "nanlite-fc-300b",
    specs: ["300W Bi-Color", "2700-6500K", "Bowens", "CRI 96"],
  },
  {
    id: "s3",
    name: "DJI RS3 Pro Gimbal",
    brand: "DJI",
    category: "studio",
    price: 14500000,
    image: `${CDN}/image-data/san-pham/24-08/24-08-07/240807150216916/avatar/638692682554257580_gimbal-dji-rs3-pro.jpg`,
    slug: "dji-rs3-pro",
    specs: ["LiDAR Focus", "4.5kg Payload", "OLED", "48000Hz sampling"],
  },
  {
    id: "s4",
    name: "Godox V1 Flash (Sony)",
    brand: "Godox",
    category: "studio",
    price: 4200000,
    image: `${CDN}/image-data/san-pham/23-04/23-04-14/230414234924385/avatar/godox-v1-500x500.jpg111_den-flash-godox-v1-cho-sony.jpg`,
    slug: "godox-v1-sony",
    specs: ["264Ws", "Li-ion Battery", "Round Head", "TTL"],
  },

  // ── ACCESSORY (Billingham bags) ────────────────────────────────────────────
  {
    id: "ac1",
    name: "Billingham 335 MKII Black/Black",
    brand: "Billingham",
    category: "accessory",
    price: 12500000,
    image: `${CDN}/image-data/san-pham/25-07/25-07-14/250714115219429/avatar/638881651497354295_tui-may-anh-billingham-335-mkii-black-fibrenyte-black.jpg`,
    slug: "billingham-335-mkii-black",
    specs: ["Premium Leather", "Khaki/Black", "Camera Bag", "Handmade UK"],
  },
  {
    id: "ac2",
    name: "Billingham S3 Navy/Chocolate",
    brand: "Billingham",
    category: "accessory",
    price: 8900000,
    image: `${CDN}/image-data/san-pham/25-06/25-06-23/250623143447741/avatar/638865510530013117_tui-may-anh-billingham-s3-navy-chocolate.jpg`,
    slug: "billingham-s3-navy",
    specs: ["Compact", "Navy/Chocolate", "Waterproof", "Handmade UK"],
  },
  {
    id: "ac3",
    name: "Billingham 445 MKII Khaki/Tan",
    brand: "Billingham",
    category: "accessory",
    price: 16500000,
    image: `${CDN}/image-data/san-pham/25-07/25-07-14/250714115506308/avatar/638881653081594250_tui-may-anh-billingham-445-mkii-khaki-tan.jpg`,
    slug: "billingham-445-mkii-khaki",
    specs: ["Large", "Khaki/Tan", "Pro Level", "Handmade UK"],
  },
  {
    id: "ac4",
    name: "Billingham 555 MKII Black/Black",
    brand: "Billingham",
    category: "accessory",
    price: 19500000,
    image: `${CDN}/image-data/san-pham/25-07/25-07-14/250714115538076/avatar/638881654932543708_tui-may-anh-billingham-555-mkii-black-fibrenyte-black.jpg`,
    slug: "billingham-555-mkii-black",
    specs: ["XL", "Black/Black", "Heavy Duty", "Handmade UK"],
  },
];

// ─── REVIEW VIDEOS ──────────────────────────────────────────────────────────

export const reviewVideos: ReviewVideo[] = [
  {
    title: "Canon EOS R50 — Review chi tiết cho người mới",
    thumbnail: products.find((p) => p.id === "p4")?.image ?? "",
    videoUrl: "https://youtube.com/@mayanhvietnam",
    creator: "Máy Ảnh Việt Nam",
    category: "camera",
  },
  {
    title: "DJI Mavic 4 Pro — Test bay thực tế & camera Hasselblad",
    thumbnail: products.find((p) => p.id === "f1")?.image ?? "",
    videoUrl: "https://youtube.com/@mayanhvietnam",
    creator: "Máy Ảnh Việt Nam",
    category: "flycam",
  },
  {
    title: "GoPro Hero 13 — 5.3K hay nhất từ trước đến nay?",
    thumbnail: products.find((p) => p.id === "a1")?.image ?? "",
    videoUrl: "https://youtube.com/@mayanhvietnam",
    creator: "Máy Ảnh Việt Nam",
    category: "action",
  },
  {
    title: "Sony A7 IV vs Canon R6 II — So sánh 2 flagship phổ thông",
    thumbnail: products.find((p) => p.id === "p2")?.image ?? "",
    videoUrl: "https://youtube.com/@mayanhvietnam",
    creator: "Máy Ảnh Việt Nam",
    category: "camera",
  },
];

// ─── TRUST BADGES ───────────────────────────────────────────────────────────

export const trustBadges: TrustBadge[] = [
  { text: "Hàng chính hãng 100%", icon: "shield" },
  { text: "Giao hàng toàn quốc", icon: "truck" },
  { text: "Bảo hành lên đến 5 năm", icon: "warranty" },
  { text: "Thu cũ đổi mới — Trả góp 0%", icon: "return" },
  { text: "Hotline tư vấn 24/7", icon: "card" },
  { text: "Đội ngũ chuyên gia tư vấn", icon: "star" },
  { text: "Tặng kèm phụ kiện khi mua", icon: "gift" },
];

// ─── STORE LOCATIONS ────────────────────────────────────────────────────────

export const storeLocations: StoreLocation[] = [
  { city: "TP.Hồ Chí Minh", address: "Số 9, Nam Quốc Cang, Phường Bến Thành, Q.1", hours: "09:00–19:00", phone: "0907.215.252" },
  { city: "TP. Cần Thơ", address: "Số 58 Nguyễn Hiền, Khu Dân Cư 91B", hours: "08:00–20:00", phone: "0937.148.222" },
  { city: "An Giang", address: "Số 1, đường số 1, khu Tây sông Hậu, Long Xuyên", hours: "08:00–17:30", phone: "0937.148.222" },
  { city: "Tiền Giang", address: "Số 126 Hoàng Sa, P. Thới Sơn, TP. Mỹ Tho", hours: "08:00–18:00", phone: "0937.148.222" },
];

// ─── FOOTER COLUMNS ─────────────────────────────────────────────────────────

export const footerColumns: FooterColumn[] = [
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

// ─── HOMEPAGE SECTIONS ──────────────────────────────────────────────────────
// Theo observation-report: mỗi nhóm hàng chính có ProductSection riêng trên homepage

// ─── MAIN NAVIGATION ────────────────────────────────────────────────────────
// Theo observation-report §2.2 — Main Navigation
// Lưu ý: Không có "Máy Ảnh" trên menu vì landing page đã show toàn bộ hãng

export interface NavItem {
  label: string;
  href: string;
  /** Badge hiển thị cạnh label (e.g. "Hot", "New") */
  badge?: string;
  /** Highlight CTA */
  cta?: boolean;
}

export const mainNav: NavItem[] = [
  { label: "Trang chủ", href: "/" },
  { label: "Sản phẩm mới", href: "/san-pham-moi" },
  { label: "Sản phẩm cũ", href: "/san-pham-cu" },
  { label: "Flash Sale", href: "/flash-sale", badge: "Hot" },
];

export interface ProductSectionMeta {
  id: string;
  title: string;
  subtitle: string;
  category: Category;
  /** Giới hạn sản phẩm hiển thị — ví dụ top 8 */
  limit: number;
  /** Gradient section background (tạo cảm giác phân vùng) */
  accent?: string;
  /** Emoji icon cho section */
  emoji?: string;
  /** Link xem tất cả */
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
    viewAllHref: "/may-anh",
  },
  {
    id: "lens",
    title: "Top Ống Kính",
    subtitle: "Canon RF · Sony FE · Nikon Z · Sigma · Tamron · Viltrox",
    category: "lens",
    limit: 6,
    accent: "from-blue-500/5 to-transparent",
    emoji: "🔭",
    viewAllHref: "/ong-kinh",
  },
  {
    id: "flycam",
    title: "Top Flycam",
    subtitle: "DJI Mavic · Mini · Air · Avata · Inspire · Phantom",
    category: "flycam",
    limit: 6,
    accent: "from-cyan-500/5 to-transparent",
    emoji: "🚁",
    viewAllHref: "/flycam",
  },
  {
    id: "action",
    title: "Top Action Camera",
    subtitle: "GoPro · DJI Osmo · Insta360 — Chống rung HyperSmooth",
    category: "action",
    limit: 6,
    accent: "from-rose-500/5 to-transparent",
    emoji: "🏃",
    viewAllHref: "/action-camera",
  },
  {
    id: "camcorder",
    title: "Máy Quay Phim Cinema",
    subtitle: "Sony FX · Canon Cinema · Blackmagic · DJI Ronin 4D",
    category: "camcorder",
    limit: 6,
    accent: "from-violet-500/5 to-transparent",
    emoji: "📹",
    viewAllHref: "/may-quay-phim",
  },
  {
    id: "studio",
    title: "Thiết Bị Studio",
    subtitle: "Godox · Nanlite · DJI Gimbal · Flash chuyên nghiệp",
    category: "studio",
    limit: 4,
    accent: "from-amber-500/5 to-transparent",
    emoji: "💡",
    viewAllHref: "/thiet-bi-studio",
  },
];

export const getProductsByCategory = (category: Category, limit?: number) => {
  const list = products.filter((p) => p.category === category);
  return typeof limit === "number" ? list.slice(0, limit) : list;
};

