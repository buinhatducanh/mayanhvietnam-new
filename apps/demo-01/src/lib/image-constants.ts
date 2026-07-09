/**
 * Real image URLs from mayanhvietnam.com
 * Source: docs/mayanhvietnam-image-urls.md
 *
 * Use these instead of unsplash placeholders for production-ready demo.
 */

const CDN = 'https://mayanhvietnam.com';

// ─── Logo ─────────────────────────────────────────────────────────────────────

export const LOGO = {
  white: `${CDN}/asset/imgs/icon/Logo_white01.png`,
  fullWhite: `${CDN}/asset/imgs/img/Logo_white.png`,
  bct: `${CDN}/asset/imgs/icon/logoBCT.png`,
};

// ─── Banner ───────────────────────────────────────────────────────────────────

export const BANNERS = {
  kmDesktop: `${CDN}/asset/imgs/icon/bannerSanPhamKM-v1.png`,
  kmMobile: `${CDN}/asset/imgs/icon/bannerSanPhamKM-mobile-v2.webp`,
  km1200x400: `${CDN}/asset/imgs/img/1200x400_banner_sanPhamKhuyenMai20250108.png`,
  eosR50: `${CDN}/asset/imgs/img/SPKM_banner/SPKM_eosR50.webp`,
  tet1: `${CDN}/asset/imgs/img/tet/banner_tet_01.png`,
  tetWide: `${CDN}/asset/imgs/img/tet/bannerTet.png`,
};

// ─── UI Icons ─────────────────────────────────────────────────────────────────

export const UI_ICONS = {
  highQuality: `${CDN}/asset/imgs/icon/high-quality-unscreen2025-01-18.webp`,
  truck: `${CDN}/asset/imgs/icon/truck-icon.png`,
  tick: `${CDN}/asset/imgs/icon/tick-icon.png`,
  setting: `${CDN}/asset/imgs/icon/setting-icon.png`,
  payment: `${CDN}/asset/imgs/icon/icon_pay-white.png`,
  search: `${CDN}/asset/imgs/icon/icon_search_white.png`,
};

// ─── Category Thumbnails ──────────────────────────────────────────────────────

export const CATEGORY_IMAGES = {
  'may-anh': `${CDN}/asset/imgs/img/danhMuc_MayAnh.webp`,
  'ong-kinh': `${CDN}/asset/imgs/img/danhMuc_ongkinh.webp`,
  'san-pham-cu': `${CDN}/asset/imgs/img/danhMuc_spCu.webp`,
  'setup-phong': `${CDN}/asset/imgs/img/danhMuc_setupPhong.webp`,
  'action-camera': `${CDN}/asset/imgs/img/danhMuc_action.webp`,
  'flycam': `${CDN}/asset/imgs/img/danhMuc_flycam.webp`,
  'thiet-bi-studio': `${CDN}/asset/imgs/img/danhMuc_thietBiStudio.webp`,
  'phu-kien': `${CDN}/asset/imgs/img/danhMuc_phuKien.webp`,
  'may-quay-phim': `${CDN}/asset/imgs/img/danhMuc_mayQuayPhim.webp`,
};

// ─── Cameras ──────────────────────────────────────────────────────────────────

export const CAMERA_IMAGES: Record<string, string> = {
  'canon-eos-r50-black-kem-lens-rf-s-18-45mm':
    `${CDN}/image-data/san-pham/24-12/24-12-28/241228112737843/avatar/638709822567106100_may-anh-canon-eos-r50-black-kem-lens-rf-s-18-45mm-chinh-hang.jpg`,
  'canon-eos-r8':
    `${CDN}/image-data/san-pham/23-04/23-04-19/230419151242054/avatar/canon-eos-r8-6-500x500_may-anh-canon-eos-r8-body-only.jpg`,
  'canon-eos-r7':
    `${CDN}/image-data/san-pham/24-08/24-08-01/240801175147151/avatar/638692586740986637_may-anh-canon-eos-r7-chinh-hang.jpg`,
  'canon-eos-r3':
    `${CDN}/image-data/san-pham/23-02/23-02-10/230210223530566/avatar/01_may-anh-canon-eos-r3-body-only.jpg`,
  'canon-eos-rp':
    `${CDN}/image-data/san-pham/23-02/23-02-10/230210224704223/avatar/01_may-anh-canon-eos-rp-body-only.jpg`,
  'canon-powershot-v1':
    `${CDN}/image-data/san-pham/25-04/25-04-01/250401154750200/avatar/638791195089528514_may-anh-canon-powershot-v1-chinh-hang.jpg`,
  'canon-eos-r6-mark-ii':
    `${CDN}/image-data/san-pham/23-02/23-02-10/230210223748534/avatar/01.jpg`,
  'sony-alpha-a7r-vi':
    `${CDN}/image-data/san-pham/26-03/26-03-28/260328143107303/avatar/639103051286629766-Alpha-A7R-Mark-VI-png_may-anh-sony-alpha-a7r-vi.jpg`,
  'sony-a7-mark-v':
    `${CDN}/image-data/san-pham/25-11/25-11-26/251126090035598/avatar/639005206164966322_may-anh-sony-a7-mark-v-a7m5-chinh-hang.jpg`,
  'sony-a9-iii':
    `${CDN}/image-data/san-pham/25-12/25-12-09/251209090438536/avatar/639008696959464299_may-anh-sony-a9-iii-chinh-hang.jpg`,
  'sony-alpha-a7-mark-iv':
    `${CDN}/image-data/san-pham/23-02/23-02-10/230210223540859/avatar/01_may-anh-sony-alpha-a7-mark-iv-body-only-chinh-hang.jpg`,
  'sony-a7r-v':
    `${CDN}/image-data/san-pham/24-08/24-08-02/240802084419498/avatar/638692697759009422_may-anh-sony-alpha-a7r-mark-v-chinh-hang.jpg`,
  'sony-a7s-iii':
    `${CDN}/image-data/san-pham/24-08/24-08-02/240802084518870/avatar/638719291858080629_may-anh-sony-alpha-a7s-mark-iii-ilce-7sm3.jpg`,
  'sony-a7c-ii':
    `${CDN}/image-data/san-pham/23-08/23-08-30/230830134714949/avatar/638308197638831519_may-anh-sony-alpha-a7c-ii-body-only-silver-chinh-hang.jpg`,
  'nikon-z6-mark-iii':
    `${CDN}/image-data/san-pham/25-05/25-05-20/250520145943720/avatar/638833501469480006_nikon-z6-mark-iii-kem-lens-z-24-70-mm-f-4-s-chinh-hang-vic.jpg`,
  'nikon-z5-ii':
    `${CDN}/image-data/san-pham/25-07/25-07-04/250704114217939/avatar/638872262359118095_may-anh-nikon-z5-ii-hang.jpg`,
  'nikon-zf-black':
    `${CDN}/image-data/san-pham/25-05/25-05-30/250530073748218/avatar/638841874800416073_may-anh-nikon-zf-kit-z-40mm-f2-se.jpg`,
  'nikon-z6-ii':
    `${CDN}/image-data/san-pham/23-04/23-04-18/230418180440520/avatar/nikon-z6-ii-500x500_may-anh-nikon-z6-ii-body-only-chinh-hang.jpg`,
  'nikon-z50-ii':
    `${CDN}/image-data/san-pham/25-02/25-02-06/250206095656295/avatar/638745179216782096_may-anh-nikon-z50-ii-body.jpg`,
  'nikon-z30':
    `${CDN}/image-data/san-pham/25-06/25-06-20/250620115535850/avatar/638889641077470341_may-anh-nikon-z30-den-kem-lens-nikkor-z-dx-16-50mm-f-3-5-6-3-vr-chinh-hang.jpg`,
  'nikon-z-fc':
    `${CDN}/image-data/san-pham/23-02/23-02-10/230210230648622/avatar/01_may-anh-nikon-z-fc-body-only-nhap-khau.jpg`,
  'fujifilm-x-h2s':
    `${CDN}/image-data/san-pham/23-02/23-02-10/230210223540394/avatar/01_may-anh-fujifilm-x-h2s-body-only-chinh-hang.jpg`,
};

// ─── Lenses ───────────────────────────────────────────────────────────────────

export const LENS_IMAGES: Record<string, string> = {
  'canon-rf-24-70mm-f28l-is-usm':
    `${CDN}/image-data/san-pham/23-02/23-02-10/230210234357844/avatar/01_ong-kinh-canon-rf-24-70mm-f-2-8l-is-usm-chinh-hang.jpg`,
  'canon-rf-70-200mm-f28l-is-usm':
    `${CDN}/image-data/san-pham/24-08/24-08-02/240802101451137/avatar/638692749614202751_ong-kinh-canon-rf-70-200mm-f2-8-l-is-usm.jpg`,
  'canon-rf-50mm-f18-stm':
    `${CDN}/image-data/san-pham/24-08/24-08-03/240803094047373/avatar/638847186653427391_canon-rf-50mm-f1-8-stm-chinh-hang.jpg`,
  'sony-fe-70-200mm-f28-gm-ii':
    `${CDN}/image-data/san-pham/24-08/24-08-03/240803094242227/avatar/638692469929544019_ong-kinh-sony-fe-70-200mm-f2-8-gm-ii-oss.jpg`,
  'sony-fe-200-600mm-f56-63g':
    `${CDN}/image-data/san-pham/24-08/24-08-03/240803094242227/avatar/638692469929544019_ong-kinh-sony-fe-70-200mm-f2-8-gm-ii-oss.jpg`,
  'nikon-z-24-70mm-f4-s':
    `${CDN}/image-data/san-pham/23-02/23-02-10/230210235800676/avatar/01_ong-kinh-nikon-z-24-70mm-f-4-s-chinh-hang-vic.jpg`,
  'nikon-z-24-70mm-f28-s-ii':
    `${CDN}/image-data/san-pham/25-09/25-09-22/250922103851025/avatar/638941343754731632_ong-kinh-nikon-z-24-70mm-f-2-8-s-ii.jpg`,
  'nikon-z-50mm-f12-s':
    `${CDN}/image-data/san-pham/24-08/24-08-02/240802140533671/avatar/638697012427684414_ong-kinh-nikon-z-50mm-f1-2-s.jpg`,
  'sigma-200mm-f2-dg-os-sports':
    `${CDN}/image-data/san-pham/25-08/25-08-20/250820095043213/avatar/638912804942323908_ong-kinh-sigma-200mm-f2-dg-os-sports-for-sony-e-chinh-hang.jpg`,
  'sigma-35mm-f14-dg-dn-art':
    `${CDN}/image-data/san-pham/24-12/24-12-29/241229140437296/avatar/638710780067671645_ong-kinh-sigma-35mm-f1-4-dg-dn-art-for-sony.jpg`,
  'sigma-70-200mm-f28-dg-dn-os-sports':
    `${CDN}/image-data/san-pham/24-08/24-08-03/240803083448701/avatar/638694560018058513_ong-kinh-sigma-70-200mm-f2-8-dg-dn-os-sports-for-sony.jpg`,
  'fujifilm-xf-27mm-f28':
    `${CDN}/image-data/san-pham/23-02/23-02-11/230211000754241/avatar/01_ong-kinh-fujifilm-xf-27mm-f2-8-black-chinh-hang.jpg`,
};

// ─── Drones ───────────────────────────────────────────────────────────────────

export const DRONE_IMAGES: Record<string, string> = {
  'dji-inspire-2-x5s':
    `${CDN}/image-data/san-pham/23-02/23-02-12/230212121228821/avatar/01_flycam-dji-inspire-2-x5s-standard-kit-chinh-hang.jpg`,
  'dji-mavic-4-pro':
    `${CDN}/image-data/san-pham/25-05/25-05-15/250515085035248/avatar/638828964891489787_dji-mavic-4-pro-512gb-creator-combo.jpg`,
  'dji-mavic-3-pro':
    `${CDN}/image-data/san-pham/24-08/24-08-08/240808101913354/avatar/638587093009322839_flycam-dji-mavic-3-pro-pro-combo-dji-rc-pro.jpg`,
  'dji-mavic-3-classic':
    `${CDN}/image-data/san-pham/23-02/23-02-12/230212121318146/avatar/01_dji-mavic-3-classic-dji-rc.jpg`,
  'dji-mini-4-pro':
    `${CDN}/image-data/san-pham/24-04/24-04-03/240403185605233/avatar/638477676845468135_flycam-dji-mini-4-pro-dji-rc-2.jpg`,
  'dji-mini-5-pro':
    `${CDN}/image-data/san-pham/25-09/25-09-12/250912094317313/avatar/638932671190111464_dji-mini-5-pro-base-chinh-hang.jpg`,
  'dji-air-3s':
    `${CDN}/image-data/san-pham/24-11/24-11-02/241102144506281/avatar/638661555984717416_flycam-dji-air-3s-fly-more-combo-dji-rc-2-chinh-hang.jpg`,
  'dji-air-3':
    `${CDN}/image-data/san-pham/24-08/24-08-08/240808164244702/avatar/638691612803221877_flycam-dji-air-3.jpg`,
  'dji-avata-2':
    `${CDN}/image-data/san-pham/24-11/24-11-02/241102151301701/avatar/638836956737704928_dji-avata-2-fly-more-combo-three-batteries-chinh-hang.jpg`,
  'dji-neo':
    `${CDN}/image-data/san-pham/24-10/24-10-16/241016174248442/avatar/638646974460200712_flycam-dji-neo-chinh-hang.jpg`,
};

// ─── Action Cameras ───────────────────────────────────────────────────────────

export const ACTION_CAMERA_IMAGES: Record<string, string> = {
  'gopro-hero-13-black':
    `${CDN}/image-data/san-pham/25-01/25-01-02/250102113303811/avatar/638714152413009638_gopro-hero-13-black.jpg`,
  'gopro-hero-11-black-combo':
    `${CDN}/image-data/san-pham/23-02/23-02-11/230211002016347/avatar/01_gopro-hero-11-black-combo-1-chinh-hang.jpg`,
  'gopro-hero-10-black':
    `${CDN}/image-data/san-pham/23-02/23-02-11/230211001845888/avatar/639142655317052082-gopro-hero-10-black-jpg_camera-gopro-hero-10-black-basic.jpg`,
  'dji-osmo-pocket-4':
    `${CDN}/image-data/san-pham/26-03/26-03-30/260330085702564/avatar/639120324002834549-dji-pocket-4-4-2000x2000-jpg_may-quay-dji-osmo-pocket-4-creator-combo.jpg`,
  'dji-osmo-action-5-pro':
    `${CDN}/image-data/san-pham/24-10/24-10-16/241016174737304/avatar/638646977754419710_dji-osmo-action-5-pro.jpg`,
  'dji-osmo-action-6':
    `${CDN}/image-data/san-pham/25-11/25-11-21/251121164730482/avatar/638993405876903208_dji-osmo-action-6-adventure-combo.jpg`,
  'dji-osmo-pocket-3':
    `${CDN}/image-data/san-pham/24-08/24-08-08/240808113242741/avatar/638666641107691007_dji-osmo-pocket-3-combo.jpg`,
  'insta360-x4':
    `${CDN}/image-data/san-pham/24-05/24-05-08/240508164520756/avatar/638516255074470789_insta360-x4-one-x4.jpg`,
  'insta360-go-3s':
    `${CDN}/image-data/san-pham/24-12/24-12-17/241217142735047/avatar/638700425450690776_camera-insta360-go-3s-128gb-midnight-black.jpg`,
};

// ─── Studio Equipment ─────────────────────────────────────────────────────────

export const STUDIO_IMAGES: Record<string, string> = {
  'godox-la200d':
    `${CDN}/image-data/san-pham/23-02/23-02-14/230214175317364/avatar/01_den-godox-la200d-daylight-led-light-230w.jpeg`,
  'nanlite-fc-300b':
    `${CDN}/image-data/san-pham/23-11/23-11-15/231115113349123/avatar/638356451394903043_den-led-nanlite-fc-300b-bi-color.jpg`,
  'nanlite-forza-300':
    `${CDN}/image-data/san-pham/23-02/23-02-14/230214175152305/avatar/01_den-led-nanlite-forza-300.jpg`,
  'godox-v1':
    `${CDN}/image-data/san-pham/24-08/24-08-09/240809154551397/avatar/638708171396818780_den-flash-godox-v1-for-nikon.jpg`,
  'dji-rs3':
    `${CDN}/image-data/san-pham/24-08/24-08-07/240807150040028/avatar/638692684093898306_gimbal-dji-rs3.jpg`,
};

// ─── Cinema / Camcorder ──────────────────────────────────────────────────────

export const CINEMA_IMAGES: Record<string, string> = {
  'sony-fx3-ii':
    `${CDN}/image-data/san-pham/26-03/26-03-28/260328145950429/avatar/639103067985726326-Sony-FX3-II-png_may-quay-sony-fx3-ii.jpg`,
  'sony-fx3':
    `${CDN}/image-data/san-pham/23-02/23-02-11/230211125328280/avatar/01_may-quay-phim-sony-fx3-chinh-hang.jpg`,
  'sony-fx30':
    `${CDN}/image-data/san-pham/24-08/24-08-29/240829180801135/avatar/638722123731263546_may-quay-phim-sony-ilmefx30-chinh-hang.jpg`,
  'canon-eos-c70':
    `${CDN}/image-data/san-pham/23-02/23-02-11/230211125332512/avatar/01_may-quay-phim-canon-eos-c70-body-only.jpg`,
  'blackmagic-bmpcc-6k':
    `${CDN}/image-data/san-pham/23-02/23-02-11/230211125329527/avatar/01_blackmagic-pocket-cinema-camera-6k-pro.jpg`,
  'dji-ronin-4d':
    `${CDN}/image-data/san-pham/23-02/23-02-11/230211125328649/avatar/01_may-quay-dji-ronin-4d-8k.jpg`,
};

// ─── Bags ─────────────────────────────────────────────────────────────────────

export const BAG_IMAGES: Record<string, string> = {
  'billingham-335-mkii-black':
    `${CDN}/image-data/san-pham/25-07/25-07-14/250714115219429/avatar/638881651497354295_tui-may-anh-billingham-335-mkii-black-fibrenyte-black.jpg`,
  'billingham-335-mkii-khaki':
    `${CDN}/image-data/san-pham/25-07/25-07-14/250714115139516/avatar/638881651139692471_tui-may-anh-billingham-335-mkii-khaki-tan.jpg`,
  'billingham-225-mkii-black':
    `${CDN}/image-data/san-pham/25-06/25-06-23/250623144449970/avatar/638865518694094835_tui-may-anh-billingham-225-mkii-black-fibrenyte-black.jpg`,
  'billingham-airline-stowaway':
    `${CDN}/image-data/san-pham/25-07/25-07-14/250714133814532/avatar/638881655846782891_tui-may-anh-billingham-airline-stowaway-black-black.jpg`,
};

// ─── Payment Icons ────────────────────────────────────────────────────────────

export const PAYMENT_ICONS = [
  { name: 'VISA', url: `${CDN}/asset/imgs/icon/hinhThucThanhToan/visa_icon_44fe6e15ed.svg` },
  { name: 'MasterCard', url: `${CDN}/asset/imgs/icon/hinhThucThanhToan/mastercard_icon_c75f94f6a5.svg` },
  { name: 'JCB', url: `${CDN}/asset/imgs/icon/hinhThucThanhToan/jcb_icon_214783937c.svg` },
  { name: 'NAPAS', url: `${CDN}/asset/imgs/icon/hinhThucThanhToan/napas_icon_94d5330e3c.svg` },
  { name: 'HomePayLater', url: `${CDN}/asset/imgs/icon/hinhThucThanhToan/homepaylater_icon_adef600842.svg` },
  { name: 'MoMo', url: `${CDN}/asset/imgs/icon/hinhThucThanhToan/momo_icon_baef21b5f7.svg` },
];

// ─── Unsplash → mayanhvietnam.com mapping (for homepage reviews-video, landing) ──

export const LANDING_PAGE_IMAGES = {
  // Canon R6 Mark II product images (from camera section)
  r6Main: CAMERA_IMAGES['canon-eos-r6-mark-ii'],
  r6Alt: CAMERA_IMAGES['canon-eos-r50-black-kem-lens-rf-s-18-45mm'],
  // Multi-angle showcase images (use actual product photos)
  angle1: CAMERA_IMAGES['canon-eos-r50-black-kem-lens-rf-s-18-45mm'],
  angle2: CAMERA_IMAGES['canon-eos-r8'],
  angle3: CAMERA_IMAGES['sony-alpha-a7-mark-iv'],
  angle4: CAMERA_IMAGES['nikon-z6-mark-iii'],
  // Hero carousel fallback images
  heroCarousel: [
    CAMERA_IMAGES['canon-eos-r6-mark-ii'],
    CAMERA_IMAGES['sony-alpha-a7-mark-iv'],
    LENS_IMAGES['canon-rf-24-70mm-f28l-is-usm'],
  ].filter(Boolean),
};

export const REVIEWS_VIDEO_IMAGES = {
  // Video thumbnails - use actual product images
  review1: CAMERA_IMAGES['canon-eos-r6-mark-ii'],
  review2: CAMERA_IMAGES['sony-a7-mark-v'],
  review3: CAMERA_IMAGES['nikon-z6-mark-iii'],
  review4: DRONE_IMAGES['dji-mavic-4-pro'],
};

// ─── All images combined (flat lookup) ────────────────────────────────────────

export const ALL_PRODUCT_IMAGES: Record<string, string> = {
  ...CAMERA_IMAGES,
  ...LENS_IMAGES,
  ...DRONE_IMAGES,
  ...ACTION_CAMERA_IMAGES,
  ...STUDIO_IMAGES,
  ...CINEMA_IMAGES,
  ...BAG_IMAGES,
};
