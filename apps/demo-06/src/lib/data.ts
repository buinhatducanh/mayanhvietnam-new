// mayanhvietnam.com — Business Data Layer
// Real product data from mayanhvietnam.com

// ─── BRAND ASSETS ───────────────────────────────────────────────────────────

export const brandAssets = {
  logo: "https://mayanhvietnam.com/asset/imgs/icon/Logo_white01.png",
  logoFull: "https://mayanhvietnam.com/asset/imgs/img/Logo_white.png",
  paymentIcons: {
    visa: "https://mayanhvietnam.com/asset/imgs/icon/hinhThucThanhToan/visa_icon_44fe6e15ed.svg",
    mastercard: "https://mayanhvietnam.com/asset/imgs/icon/hinhThucThanhToan/mastercard_icon_c75f94f6a5.svg",
    jcb: "https://mayanhvietnam.com/asset/imgs/icon/hinhThucThanhToan/jcb_icon_214783937c.svg",
    napas: "https://mayanhvietnam.com/asset/imgs/icon/hinhThucThanhToan/napas_icon_94d5330e3c.svg",
    homePayLater: "https://mayanhvietnam.com/asset/imgs/icon/hinhThucThanhToan/homepaylater_icon_adef600842.svg",
    momo: "https://mayanhvietnam.com/asset/imgs/icon/hinhThucThanhToan/momo_icon_baef21b5f7.svg",
  },
  banners: [
    {
      title: "Canon EOS R50 — Giá tốt nhất thị trường",
      subtitle: "Chỉ từ 17.500.000đ — Camera APS-C 24.2MP + RF-S 18-45mm",
      image: "https://mayanhvietnam.com/asset/imgs/img/SPKM_banner/SPKM_eosR50.webp",
      link: "/camera/canon-eos-r50",
    },
    {
      title: "Sản phẩm khuyến mãi hot 2025",
      subtitle: "Giảm đến 30% — Canon, Sony, Nikon, DJI chính hãng",
      image: "https://mayanhvietnam.com/asset/imgs/img/1200x400_banner_sanPhamKhuyenMai20250108.png",
      link: "/khuyen-mai",
    },
    {
      title: "DJI Mini 5 Pro — Tín hiệu mới",
      subtitle: "Tốc độ bay 57.6 km/h · Camera 4K · Obstacle Avoidance",
      image: "https://mayanhvietnam.com/asset/imgs/icon/bannerSanPhamKM-v1.png",
      link: "/flycam/dji-mini-5-pro",
    },
  ],
};

// ─── TYPES ──────────────────────────────────────────────────────────────────

export type Brand = "Canon" | "Nikon" | "Sony" | "Tamron" | "Sigma" | "Viltrox" | "Kase" | "DJI" | "Insta360" | "GoPro";

export type Category = "camera" | "lens" | "flycam" | "action" | "camcorder" | "accessory" | "used";

export interface Product {
  id: string;
  name: string;
  brand: Brand;
  category: Category;
  /** Starting price in VND */
  price: number;
  /** Price range upper bound for display */
  priceMax?: number;
  /** Product image URL */
  image: string;
  /** Hover / secondary image */
  hoverImage?: string;
  /** "Mới" | "Cũ" */
  condition?: "new" | "used";
  /** Product badge */
  badge?: string;
  /** Product slug for URL */
  slug: string;
  /** Specs for the card hover detail */
  specs?: string[];
  /** Is this a "call for price" item? */
  callForPrice?: boolean;
  /** Background color for product card */
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

// ─── BANNERS ────────────────────────────────────────────────────────────────

export const banners: Banner[] = [
  {
    title: "Canon EOS R8 + Ống RF 24-50mm",
    subtitle: "Giảm sốc — Chỉ từ 26.900.000đ",
    image: "https://mayanhvietnam.com/asset/imgs/img/1200x400_banner_sanPhamKhuyenMai20250108.png",
    link: "/camera/canon-eos-r8",
    bgColor: "#1a1a2e",
  },
  {
    title: "DJI Mini 5 Pro — Tín hiệu mới",
    subtitle: "Tốc độ bay 57.6 km/h · Camera 4K · Obstacle Avoidance",
    image: "https://mayanhvietnam.com/asset/imgs/img/SPKM_banner/SPKM_eosR50.webp",
    link: "/flycam/dji-mini-5-pro",
    bgColor: "#0f172a",
  },
  {
    title: "Nikon Z6 III — Chiếu sáng tương lai",
    subtitle: "Quay video 6K · stabilization 7 stops · Dual Card",
    image: "https://mayanhvietnam.com/asset/imgs/icon/bannerSanPhamKM-v1.png",
    link: "/camera/nikon-z6-iii",
    bgColor: "#18181b",
  },
  {
    title: "Sigma 200mm F2 — Telephoto Legend",
    subtitle: "Chân dung thể thao · Bokeh tuyệt đẹp",
    image: "https://mayanhvietnam.com/asset/imgs/img/1200x400_banner_sanPhamKhuyenMai20250108.png",
    link: "/lens/sigma-200mm-f2",
    bgColor: "#1a1a2e",
  },
];

// ─── GRAPHIC NAVIGATION (category icons) ────────────────────────────────────

export const graphicNav = [
  { name: "Máy Ảnh", slug: "camera", emoji: "📷", image: "https://mayanhvietnam.com/asset/imgs/img/danhMuc_MayAnh.webp" },