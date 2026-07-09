/**
 * mayanhvietnam.com image registry — Demo assets
 * Direct URLs từ hệ thống CDN mayanhvietnam.com (internal demo use only).
 */

const CDN = "https://mayanhvietnam.com";

export const MAYANH_IMAGES = {
  logo: `${CDN}/asset/imgs/icon/Logo_white01.png`,
  logoFull: `${CDN}/asset/imgs/img/Logo_white.png`,
  logoBCT: `${CDN}/asset/imgs/icon/logoBCT.png`,

  banners: {
    km1200x400: `${CDN}/asset/imgs/img/1200x400_banner_sanPhamKhuyenMai20250108.png`,
    kmDesktop: `${CDN}/asset/imgs/icon/bannerSanPhamKM-v1.png`,
    kmMobile: `${CDN}/asset/imgs/icon/bannerSanPhamKM-mobile-v2.webp`,
    eosR50: `${CDN}/asset/imgs/img/SPKM_banner/SPKM_eosR50.webp`,
    tet01: `${CDN}/asset/imgs/img/tet/banner_tet_01.png`,
    tetWide: `${CDN}/asset/imgs/img/tet/bannerTet.png`,
  },

  categories: {
    "may-anh": `${CDN}/asset/imgs/img/danhMuc_MayAnh.webp`,
    "ong-kinh": `${CDN}/asset/imgs/img/danhMuc_ongkinh.webp`,
    "san-pham-cu": `${CDN}/asset/imgs/img/danhMuc_spCu.webp`,
    "lap-phong-studio": `${CDN}/asset/imgs/img/danhMuc_setupPhong.webp`,
    "action-camera": `${CDN}/asset/imgs/img/danhMuc_action.webp`,
    "flycam": `${CDN}/asset/imgs/img/danhMuc_flycam.webp`,
    "thiet-bi-studio": `${CDN}/asset/imgs/img/danhMuc_thietBiStudio.webp`,
    "phu-kien": `${CDN}/asset/imgs/img/danhMuc_phuKien.webp`,
    "may-quay-phim": `${CDN}/asset/imgs/img/danhMuc_mayQuayPhim.webp`,
  },

  paymentIcons: [
    `${CDN}/asset/imgs/icon/hinhThucThanhToan/visa_icon_44fe6e15ed.svg`,
    `${CDN}/asset/imgs/icon/hinhThucThanhToan/mastercard_icon_c75f94f6a5.svg`,
    `${CDN}/asset/imgs/icon/hinhThucThanhToan/jcb_icon_214783937c.svg`,
    `${CDN}/asset/imgs/icon/hinhThucThanhToan/napas_icon_94d5330e3c.svg`,
    `${CDN}/asset/imgs/icon/hinhThucThanhToan/homepaylater_icon_adef600842.svg`,
    `${CDN}/asset/imgs/icon/hinhThucThanhToan/momo_icon_baef21b5f7.svg`,
  ],

  // Hero/flagship products trên landing
  heroCameras: {
    "canon-r50-black":
      `${CDN}/image-data/san-pham/24-12/24-12-28/241228112737843/avatar/638709822567106100_may-anh-canon-eos-r50-black-kem-lens-rf-s-18-45mm-chinh-hang.jpg`,
    "sony-a7r-vi":
      `${CDN}/image-data/san-pham/26-03/26-03-28/260328143107303/avatar/639103051286629766-Alpha-A7R-Mark-VI-png_may-anh-sony-alpha-a7r-vi.jpg`,
    "sony-a7-iv":
      `${CDN}/image-data/san-pham/23-02/23-02-10/230210223540859/avatar/01_may-anh-sony-alpha-a7-mark-iv-body-only-chinh-hang.jpg`,
    "nikon-zf-silver":
      `${CDN}/image-data/san-pham/25-10/25-10-13/251013142244128/avatar/638959622090221101_may-anh-nikon-zf-body-only-silver-chinh-hang.jpg`,
  },

  // Sản phẩm theo category (dùng cho category landing blocks)
  cameras: [
    `${CDN}/image-data/san-pham/24-12/24-12-28/241228112737843/avatar/638709822567106100_may-anh-canon-eos-r50-black-kem-lens-rf-s-18-45mm-chinh-hang.jpg`,
    `${CDN}/image-data/san-pham/26-03/26-03-28/260328143107303/avatar/639103051286629766-Alpha-A7R-Mark-VI-png_may-anh-sony-alpha-a7r-vi.jpg`,
    `${CDN}/image-data/san-pham/23-02/23-02-10/230210223540859/avatar/01_may-anh-sony-alpha-a7-mark-iv-body-only-chinh-hang.jpg`,
    `${CDN}/image-data/san-pham/25-10/25-10-13/251013142244128/avatar/638959622090221101_may-anh-nikon-zf-body-only-silver-chinh-hang.jpg`,
    `${CDN}/image-data/san-pham/23-02/23-02-10/230210223540394/avatar/01_may-anh-fujifilm-x-h2s-body-only-chinh-hang.jpg`,
    `${CDN}/image-data/san-pham/25-04/25-04-01/250401154750200/avatar/638791195089528514_may-anh-canon-powershot-v1-chinh-hang.jpg`,
  ],

  lenses: [
    `${CDN}/image-data/san-pham/23-02/23-02-10/230210234357844/avatar/01_ong-kinh-canon-rf-24-70mm-f-2-8l-is-usm-chinh-hang.jpg`,
    `${CDN}/image-data/san-pham/24-08/24-08-02/240802101451137/avatar/638692749614202751_ong-kinh-canon-rf-70-200mm-f2-8-l-is-usm.jpg`,
    `${CDN}/image-data/san-pham/24-08/24-08-03/240803094242227/avatar/638692469929544019_ong-kinh-sony-fe-70-200mm-f2-8-gm-ii-oss.jpg`,
    `${CDN}/image-data/san-pham/25-09/25-09-22/250922103851025/avatar/638941343754731632_ong-kinh-nikon-z-24-70mm-f-2-8-s-ii.jpg`,
    `${CDN}/image-data/san-pham/25-08/25-08-20/250820095043213/avatar/638912804942323908_ong-kinh-sigma-200mm-f2-dg-os-sports-for-sony-e-chinh-hang.jpg`,
    `${CDN}/image-data/san-pham/24-08/24-08-03/240803094047373/avatar/638847186653427391_canon-rf-50mm-f1-8-stm-chinh-hang.jpg`,
  ],

  drones: [
    `${CDN}/image-data/san-pham/25-05/25-05-15/250515085035248/avatar/638828964891489787_dji-mavic-4-pro-512gb-creator-combo.jpg`,
    `${CDN}/image-data/san-pham/25-09/25-09-12/250912094317313/avatar/638932671190111464_dji-mini-5-pro-base-chinh-hang.jpg`,
    `${CDN}/image-data/san-pham/24-11/24-11-02/241102144506281/avatar/638661555984717416_flycam-dji-air-3s-fly-more-combo-dji-rc-2-chinh-hang.jpg`,
    `${CDN}/image-data/san-pham/24-10/24-10-16/241016174248442/avatar/638646974460200712_dji-neo-chinh-hang.jpg`,
    `${CDN}/image-data/san-pham/24-11/24-11-02/241102151301701/avatar/638836956737704928_dji-avata-2-fly-more-combo-three-batteries-chinh-hang.jpg`,
  ],

  action: [
    `${CDN}/image-data/san-pham/26-02/26-02-26/260226105739670/avatar/639077003951312982_dji-osmo-action-5-pro-adventure-combo.jpg`,
    `${CDN}/image-data/san-pham/25-01/25-01-02/250102113303811/avatar/638714152413009638_gopro-hero-13-black.jpg`,
    `${CDN}/image-data/san-pham/26-03/26-03-30/260330085702564/avatar/639120324002834549-dji-pocket-4-4-2000x2000-jpg_may-quay-dji-osmo-pocket-4-creator-combo.jpg`,
    `${CDN}/image-data/san-pham/24-05/24-05-08/240508164520756/avatar/638516255074470789_insta360-x4-one-x4.jpg`,
  ],

  studio: [
    `${CDN}/image-data/san-pham/23-02/23-02-14/230214175317364/avatar/01_den-godox-la200d-daylight-led-light-230w.jpeg`,
    `${CDN}/image-data/san-pham/23-11/23-11-15/231115113349123/avatar/638356451394903043_den-led-nanlite-fc-300b-bi-color.jpg`,
    `${CDN}/image-data/san-pham/23-02/23-02-14/230214175149302/avatar/01_den-led-studio-nanlite-compac-100.jpg`,
  ],

  cinema: [
    `${CDN}/image-data/san-pham/26-03/26-03-28/260328145950429/avatar/639103067985726326-Sony-FX3-II-png_may-quay-sony-fx3-ii.jpg`,
    `${CDN}/image-data/san-pham/23-02/23-02-11/230211125329527/avatar/01_blackmagic-pocket-cinema-camera-6k-pro.jpg`,
    `${CDN}/image-data/san-pham/26-04/26-04-02/260402143727010/avatar/639107374778868359-656832580-18245241562306215-4681453307279503595-n-jpg_may-quay-phim-viltrox-cinemaster-v.jpg`,
  ],

  bags: [
    `${CDN}/image-data/san-pham/25-07/25-07-14/250714115219429/avatar/638881651497354295_tui-may-anh-billingham-335-mkii-black-fibrenyte-black.jpg`,
    `${CDN}/image-data/san-pham/25-07/25-07-14/250714115455350/avatar/638881652160623169_tui-may-anh-billingham-335-mkii-navy-chocolate.jpg`,
    `${CDN}/image-data/san-pham/25-06/25-06-23/250623144030041/avatar/638865516721951426_tui-may-anh-billingham-207-khaki-fibrenyte-chocolate.jpg`,
  ],
} as const;