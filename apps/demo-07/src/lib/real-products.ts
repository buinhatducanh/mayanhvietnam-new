/**
 * mayanhvietnam.com — Real data từ trang gốc
 * Logo, brands, categories, slugs từ jsonTopBanner.js, jsonPhanLoaiList.js, jsonHangSanXuatList.js
 */

const CDN = 'https://mayanhvietnam.com';

// Logo & brand assets
export const REAL_ASSETS = {
  logo: `${CDN}/asset/imgs/icon/Logo_white01.png`,
  logoFull: `${CDN}/asset/imgs/img/Logo_white.png`,
  logoBCT: `${CDN}/asset/imgs/icon/logoBCT.png`,
  favicon: `${CDN}/asset/imgs/icon/iconFavicon/favicon-32x32.png`,
  paymentIcons: [
    { name: 'VISA',        url: `${CDN}/asset/imgs/icon/hinhThucThanhToan/visa_icon_44fe6e15ed.svg` },
    { name: 'MasterCard',  url: `${CDN}/asset/imgs/icon/hinhThucThanhToan/mastercard_icon_c75f94f6a5.svg` },
    { name: 'JCB',          url: `${CDN}/asset/imgs/icon/hinhThucThanhToan/jcb_icon_214783937c.svg` },
    { name: 'ATM / Napas',  url: `${CDN}/asset/imgs/icon/hinhThucThanhToan/napas_icon_94d5330e3c.svg` },
    { name: 'Home PayLater', url: `${CDN}/asset/imgs/icon/hinhThucThanhToan/homepaylater_icon_adef600842.svg` },
    { name: 'MoMo',        url: `${CDN}/asset/imgs/icon/hinhThucThanhToan/momo_icon_baef21b5f7.svg` },
  ],
};

// Categories từ trang chủ mayanhvietnam.com (10 danh mục chính)
export const REAL_CATEGORIES = [
  { slug: 'may-anh',           name: 'Máy Ảnh',          image: `${CDN}/asset/imgs/img/danhMuc_MayAnh.webp` },
  { slug: 'ong-kinh',          name: 'Ống Kính',          image: `${CDN}/asset/imgs/img/danhMuc_ongkinh.webp` },
  { slug: 'may-quay-phim',     name: 'Máy Quay Phim',     image: `${CDN}/asset/imgs/img/danhMuc_mayQuayPhim.webp` },
  { slug: 'action-camera',      name: 'Action Camera',      image: `${CDN}/asset/imgs/img/danhMuc_action.webp` },
  { slug: 'flycam',             name: 'Flycam / Drone',     image: `${CDN}/asset/imgs/img/danhMuc_flycam.webp` },
  { slug: 'thiet-bi-studio',    name: 'Thiết Bị Studio',    image: `${CDN}/asset/imgs/img/danhMuc_thietBiStudio.webp` },
  { slug: 'phu-kien',          name: 'Phụ Kiện',           image: `${CDN}/asset/imgs/img/danhMuc_phuKien.webp` },
  { slug: 'lap-phong-studio',   name: 'Lắp Phòng Studio',  image: `${CDN}/asset/imgs/img/danhMuc_setupPhong.webp` },
  { slug: 'san-pham-flash-sale',name: 'Flash Sale',         image: `${CDN}/asset/imgs/img/1200x200_flycam.png` },
  { slug: 'san-pham-khuyen-mai',name: 'Sản phẩm Khuyến mãi', image: `${CDN}/asset/imgs/img/SPKM_banner/banner-khuyen-mai-2026.webp` },
] as const;

// Hero banners từ jsonTopBanner.js
export const REAL_BANNERS = [
  {
    title: 'Canon EOS R6 Mark III — Chính hãng',
    subtitle: 'Máy ảnh hybrid đỉnh cao · Phù hợp mọi nhiếp ảnh gia',
    image: `${CDN}/asset/imgs/img/banner/canon-r6-mark-III.webp`,
    href: '/san-pham/may-anh-canon-eos-r6-mark-iii-body_may-anh-mirrorless-250315190440715',
  },
  {
    title: 'Ra mắt Sony A7R VI',
    subtitle: 'Máy ảnh Full-frame đỉnh cao mới nhất từ Sony',
    image: `${CDN}/asset/imgs/img/banner/sony-a7r-vi-1.webp`,
    href: '/san-pham/may-anh-sony-alpha-a7r-vi_may-anh-mirrorless-260328143107303',
  },
  {
    title: 'Sony A7 V (A7M5) chính hãng',
    subtitle: 'Ưu đãi đặc biệt khi đặt trước tại mayanhvietnam',
    image: `${CDN}/asset/imgs/img/banner/uuDai-sonya7v-DCHS.webp`,
    href: '/san-pham/may-anh-sony-a7-mark-v-a7m5-chinh-hang_may-anh-mirrorless-251126090035598',
  },
  {
    title: 'DJI Neo — Thiết kế siêu nhỏ gọn 135g',
    subtitle: 'Flash Sale: Bỏ túi, mang theo mọi nơi',
    image: `${CDN}/asset/imgs/img/1200x200_flycam.png`,
    href: '/san-pham/dji-neo_flycam-241016174248442',
  },
] as const;
