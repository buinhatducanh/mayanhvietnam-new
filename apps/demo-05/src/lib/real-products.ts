/**
 * mayanhvietnam.com — Real data crawled từ trang gốc
 * Logo, brands, categories, slugs, banners từ jsonTopBanner.js, jsonPhanLoaiList.js, jsonHangSanXuatList.js
 */

const CDN = "https://mayanhvietnam.com";

// Logo & brand assets
export const REAL_ASSETS = {
  logo: `${CDN}/asset/imgs/icon/Logo_white01.png`,
  logoFull: `${CDN}/asset/imgs/img/Logo_white.png`,
  logoBCT: `${CDN}/asset/imgs/icon/logoBCT.png`,
  favicon: `${CDN}/asset/imgs/icon/iconFavicon/favicon-32x32.png`,
  flashSaleFlycam: `${CDN}/asset/imgs/img/1200x200_flycam.png`,
  paymentVisa: `${CDN}/asset/imgs/icon/hinhThucThanhToan/visa_icon_44fe6e15ed.svg`,
  paymentMastercard: `${CDN}/asset/imgs/icon/hinhThucThanhToan/mastercard_icon_c75f94f6a5.svg`,
  paymentJCB: `${CDN}/asset/imgs/icon/hinhThucThanhToan/jcb_icon_214783937c.svg`,
  paymentNapas: `${CDN}/asset/imgs/icon/hinhThucThanhToan/napas_icon_94d5330e3c.svg`,
  paymentHomePayLater: `${CDN}/asset/imgs/icon/hinhThucThanhToan/homepaylater_icon_adef600842.svg`,
  paymentMoMo: `${CDN}/asset/imgs/icon/hinhThucThanhToan/momo_icon_baef21b5f7.svg`,
  paymentIcons: [
    `${CDN}/asset/imgs/icon/hinhThucThanhToan/visa_icon_44fe6e15ed.svg`,
    `${CDN}/asset/imgs/icon/hinhThucThanhToan/mastercard_icon_c75f94f6a5.svg`,
    `${CDN}/asset/imgs/icon/hinhThucThanhToan/jcb_icon_214783937c.svg`,
    `${CDN}/asset/imgs/icon/hinhThucThanhToan/napas_icon_94d5330e3c.svg`,
    `${CDN}/asset/imgs/icon/hinhThucThanhToan/homepaylater_icon_adef600842.svg`,
    `${CDN}/asset/imgs/icon/hinhThucThanhToan/momo_icon_baef21b5f7.svg`,
  ],
};

// Categories từ trang chủ mayanhvietnam.com (10 danh mục chính)
export const REAL_CATEGORIES = [
  { slug: 'may-anh',           name: 'Máy Ảnh',         image: `${CDN}/asset/imgs/img/danhMuc_MayAnh.webp` },
  { slug: 'ong-kinh',          name: 'Ống Kính',         image: `${CDN}/asset/imgs/img/danhMuc_ongkinh.webp` },
  { slug: 'may-quay-phim',     name: 'Máy Quay Phim',    image: `${CDN}/asset/imgs/img/danhMuc_mayQuayPhim.webp` },
  { slug: 'action-camera',     name: 'Action Camera',    image: `${CDN}/asset/imgs/img/danhMuc_action.webp` },
  { slug: 'flycam',            name: 'Flycam / Drone',   image: `${CDN}/asset/imgs/img/danhMuc_flycam.webp` },
  { slug: 'thiet-bi-studio',   name: 'Thiết Bị Studio',  image: `${CDN}/asset/imgs/img/danhMuc_thietBiStudio.webp` },
  { slug: 'phu-kien',          name: 'Phụ Kiện',         image: `${CDN}/asset/imgs/img/danhMuc_phuKien.webp` },
  { slug: 'lap-phong-studio',  name: 'Lắp Phòng Studio', image: `${CDN}/asset/imgs/img/danhMuc_setupPhong.webp` },
  { slug: 'san-pham-flash-sale', name: 'Flash Sale',     image: `${CDN}/asset/imgs/img/1200x200_flycam.png` },
  { slug: 'san-pham-khuyen-mai', name: 'Sản phẩm Khuyến mãi', image: `${CDN}/asset/imgs/img/SPKM_banner/banner-khuyen-mai-2026.webp` },
] as const;

// Brands từ jsonHangSanXuatList.js
export const REAL_BRANDS = [
  'Canon', 'Nikon', 'Sony', 'Sigma', 'Fujifilm', 'Viltrox',
  'Zeiss', 'Leica', 'Tamron', 'Panasonic', 'OM System', 'Olympus',
  'DJI', 'Lumix', 'Godox', 'Opteka',
] as const;

// Hero banners từ jsonTopBanner.js (canonical main hero — mayanhvietnam.com)
// NOTE: banner ảnh nhỏ (Sonet-some*) bị loại khỏi carousel chính; chỉ dùng banner panoramic.
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
    title: 'Canon EOS R50 Black + RF-S 18-45mm',
    subtitle: 'Máy ảnh entry-level tốt nhất 2025',
    image: `${CDN}/asset/imgs/img/banner/canon_r50_trang_den.webp`,
    href: '/san-pham/may-anh-canon-eos-r50-black-kem-lens-rfs-1845-chinh-hang_may-anh-mirrorless-241228112737843',
  },
  {
    title: 'DJI Neo — Thiết kế siêu nhỏ gọn 135g',
    subtitle: 'Flash Sale: Bỏ túi, mang theo mọi nơi',
    image: `${CDN}/asset/imgs/img/1200x200_flycam.png`,
    href: '/san-pham/dji-neo_flycam-241016174248442',
  },
  {
    title: 'Ống kính Sony — Ưu đãi tháng 1',
    subtitle: 'Đăng ký Sony CTKM — Nhận ngay quà tặng hấp dẫn',
    image: `${CDN}/asset/imgs/img/banner/sony-uu-dai-thang-1.webp`,
    href: '/danh-muc/may-anh-khuyen-mai-brd-sony',
  },
  {
    title: 'Ống kính Sony — Tết siêu chuẩn sáng tạo',
    subtitle: 'Chào đón năm mới với ống kính Sony chính hãng',
    image: `${CDN}/asset/imgs/img/banner/tetSieuChuansangtaoSony.webp`,
    href: '/danh-muc/ong-kinh-khuyen-mai-brd-sony',
  },
] as const;

// Real products từ live site (slugs, prices, images, brand đã verify)
export interface RealProduct {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  description: string;
  shortSpecs: string[];
  specs?: { group: string; items: { label: string; value: string }[] }[];
}

export const REAL_PRODUCTS: RealProduct[] = [
  {
    id: '1',
    slug: 'may-anh-canon-eos-r50-black-kem-lens-rfs-1845-chinh-hang_may-anh-mirrorless-241228112737843',
    name: 'Máy ảnh Canon EOS R50 Black kèm Lens RF-S 18-45mm Chính Hãng',
    brand: 'Canon',
    category: 'may-anh',
    price: 17500000,
    originalPrice: 18900000,
    image: `${CDN}/image-data/san-pham/24-12/24-12-28/241228112737843/avatar/638709822567106100_may-anh-canon-eos-r50-black-kem-lens-rf-s-18-45mm-chinh-hang.jpg`,
    description: 'Canon EOS R50 Black kèm Lens RF-S 18-45mm sở hữu cảm biến APS-C 24.2MP DIGIC X lấy nét Dual Pixel AF II thông minh quay 4K 30fps nhỏ gọn dễ dùng.',
    shortSpecs: ['APS-C 24.2MP', 'DIGIC X', 'Dual Pixel AF II', '4K 30fps', 'Lens RF-S 18-45mm'],
  },
  {
    id: '2',
    slug: 'may-anh-sony-alpha-a7-mark-iv-body-only-chinh-hang_may-anh-mirrorless-230210223540859',
    name: 'Máy ảnh Sony Alpha A7 Mark IV (Body Only) | Chính hãng',
    brand: 'Sony',
    category: 'may-anh',
    price: 47500000,
    image: `${CDN}/image-data/san-pham/23-02/23-02-10/230210223540859/avatar/01_may-anh-sony-alpha-a7-mark-iv-body-only-chinh-hang.jpg`,
    description: 'Sony Alpha A7 Mark IV (Body Only) là máy ảnh mirrorless full-frame đa dụng cao cấp trang bị cảm biến CMOS BSI 33MP bộ xử lý BIONZ XR lấy nét Real-time AF tracking chính xác quay 4K 60fps.',
    shortSpecs: ['Full-frame 33MP BSI', 'BIONZ XR', 'Real-time AF', '4K 60fps'],
  },
  {
    id: '3',
    slug: 'may-anh-canon-eos-r8-body-only_may-anh-mirrorless-230419151242054',
    name: 'Máy ảnh Canon EOS R8 (Body Only)',
    brand: 'Canon',
    category: 'may-anh',
    price: 26900000,
    image: `${CDN}/image-data/san-pham/23-04/23-04-19/230419151242054/avatar/canon-eos-r8-6-500x500_may-anh-canon-eos-r8-body-only.jpg`,
    description: 'Canon EOS R8 (Body Only) là máy ảnh mirrorless full-frame nhỏ gọn trang bị cảm biến CMOS 24.2MP bộ xử lý DIGIC X lấy nét Dual Pixel CMOS AF II thông minh quay 4K 60p không crop.',
    shortSpecs: ['Full-frame 24.2MP', '4K 60p', 'DIGIC X', 'Dual Pixel AF II'],
  },
  {
    id: '4',
    slug: 'may-anh-nikon-z5-iihang_may-anh-mirrorless-250704114217939',
    name: 'Máy ảnh Nikon Z5 II (Hãng)',
    brand: 'Nikon',
    category: 'may-anh',
    price: 43000000,
    image: `${CDN}/image-data/san-pham/25-07/25-07-04/250704114217939/avatar/638872262359118095_may-anh-nikon-z5-ii-hang.jpg`,
    description: 'Máy ảnh mirrorless full-frame Nikon Z5 II (Z-mount) — Cảm biến 24.5MP BSI-CMOS, xử lý EXPEED 7, VR in-body 5-axis đến 7.5 stops, AF hybrid nhận diện chủ thể AI.',
    shortSpecs: ['Full-frame 24.5MP', 'EXPEED 7', 'IBIS 7.5 stops', 'AF AI'],
  },
  {
    id: '5',
    slug: 'may-anh-nikon-z6-ii-body-only-chinh-hang_may-anh-mirrorless-230418180440520',
    name: 'Máy ảnh Nikon Z6 II Body Only Chính Hãng',
    brand: 'Nikon',
    category: 'may-anh',
    price: 38900000,
    image: `${CDN}/image-data/san-pham/23-04/23-04-18/230418180440520/avatar/nikon-z6-ii-500x500_may-anh-nikon-z6-ii-body-only-chinh-hang.jpg`,
    description: 'Nikon Z6 II — mirrorless full-frame với 2 chip xử lý EXPEED 6, AF cải tiến, 4K 60p, dual card slot.',
    shortSpecs: ['Full-frame 24.5MP', 'EXPEED 6 x2', '4K 60p', 'Dual card'],
  },
  {
    id: '6',
    slug: 'nikon-z6-mark-iii-kem-lens-z-2470-f4-s-chinh-hang-vic_may-anh-mirrorless-250520145943720',
    name: 'Nikon Z6 Mark III Kèm Lens Z 24-70mm f/4 S (Chính Hãng VIC)',
    brand: 'Nikon',
    category: 'may-anh',
    price: 67600000,
    image: `${CDN}/image-data/san-pham/25-05/25-05-20/250520145943720/avatar/638833501469480006_nikon-z6-mark-iii-kem-lens-z-24-70-mm-f-4-s-chinh-hang-vic.jpg`,
    description: 'Nikon Z6 Mark III kèm Lens Z 24-70mm f/4 S (Chính Hãng VIC) là bộ máy mirrorless full-frame thế hệ mới, trang bị cảm biến CMOS 24.5MP partially stacked cùng EXPEED 7, quay 6K RAW, AF AI tiên tiến.',
    shortSpecs: ['24.5MP Stacked', '6K RAW', '4K 120p', 'EXPEED 7', 'Kit 24-70mm f/4 S'],
  },
  {
    id: '7',
    slug: 'may-anh-nikon-z30-den-kem-lens-nikkor-z-dx-1650-f3563-vr-chinh-hang_may-anh-mirrorless-250620115535850',
    name: 'Máy ảnh Nikon Z30 đen kèm Lens Nikkor Z DX 16-50mm',
    brand: 'Nikon',
    category: 'may-anh',
    price: 16900000,
    image: `${CDN}/image-data/san-pham/25-06/25-06-20/250620115535850/avatar/638889641077470341_may-anh-nikon-z30-den-kem-lens-nikkor-z-dx-16-50mm-f-3-5-6-3-vr-chinh-hang.jpg`,
    description: 'Nikon Z30 — mirrorless APS-C nhỏ gọn cho vlogger và content creator. Quay 4K UHD không crop.',
    shortSpecs: ['APS-C 20.9MP', '4K UHD', 'Vlogger', 'Kit 16-50mm VR'],
  },
  {
    id: '8',
    slug: 'may-anh-sony-zve10-ii-black-body-only-chinh-hang_may-anh-mirrorless-240826174229493',
    name: 'Máy ảnh Sony ZV-E10 II (Black Body Only) | Chính hãng',
    brand: 'Sony',
    category: 'may-anh',
    price: 26000000,
    image: `${CDN}/image-data/san-pham/24-08/24-08-26/240826174229493/avatar/638708944659930440_may-anh-sony-zv-e10-ii-black-body-only-chinh-hang.jpg`,
    description: 'Sony ZV-E10 II Black (Body Only) là dòng mirrorless APS-C thế hệ mới tối ưu cho vlog và sáng tạo nội dung. Cảm biến độ phân giải cao Real-time AF thông minh quay 4K sắc nét màu sắc chân thực.',
    shortSpecs: ['APS-C 26MP', 'Real-time AF', '4K sắc nét', 'Vlog'],
  },
  {
    id: '9',
    slug: 'dji-mavic-4-pro-512gb-creator-combo_flycam-250515085035248',
    name: 'DJI Mavic 4 Pro 512GB Creator Combo',
    brand: 'DJI',
    category: 'flycam',
    price: 75900000,
    image: `${CDN}/image-data/san-pham/25-05/25-05-15/250515085035248/avatar/638828964891489787_dji-mavic-4-pro-512gb-creator-combo.jpg`,
    description: 'Cụm 3 camera đỉnh cao với camera chính từ Hasselblad với độ phân giải 100MP. Quay video tối đa HDR 6K/60fps với camera chính. Quay video tối đa HDR 4K/60fps với camera tele và wide.',
    shortSpecs: ['Hasselblad 4/3 100MP', '6K HDR 60fps', '4K 60fps tele', '512GB'],
  },
  {
    id: '10',
    slug: 'dji-mini-5-pro-base-chinh-hang_flycam-250912094317313',
    name: 'DJI Mini 5 Pro (Base) | Chính Hãng',
    brand: 'DJI',
    category: 'flycam',
    price: 21900000,
    image: `${CDN}/image-data/san-pham/25-09/25-09-12/250912094317313/avatar/638932671190111464_dji-mini-5-pro-base-chinh-hang.jpg`,
    description: 'ActiveTrack 360° nâng cấp. Bộ nhớ trong 42GB. Cảm biến camera CMOS 1 inch. Cảm biến chướng ngại vật đa hướng ban đêm.',
    shortSpecs: ['Dưới 249g', '1 inch CMOS', '42GB onboard', 'ActiveTrack 360°', 'Night vision'],
  },
  {
    id: '11',
    slug: 'dji-mini-4-pro-fly-more-combo-plus-dji-rc-2-gl_flycam-230926111234846',
    name: 'DJI Mini 4 Pro Fly More Combo Plus + DJI RC 2 (GL)',
    brand: 'DJI',
    category: 'flycam',
    price: 25900000,
    image: `${CDN}/image-data/san-pham/23-09/23-09-26/230926111234846/avatar/638313238790810792_dji-mini-4-pro-fly-more-combo-plus-dji-rc-2-gl.jpg`,
    description: 'DJI Mini 4 Pro Fly More Combo Plus — drone cao cấp dưới 249g, 4K HDR, omnidirectional obstacle sensing.',
    shortSpecs: ['Dưới 249g', '4K HDR', 'Omnidirectional sensing', 'RC 2', 'Plus combo'],
  },
  {
    id: '12',
    slug: 'dji-avata-2-fly-more-combo-three-batteries-chinh-hang_flycam-241102151301701',
    name: 'DJI Avata 2 Fly More Combo (3 batteries)',
    brand: 'DJI',
    category: 'flycam',
    price: 32900000,
    image: `${CDN}/image-data/san-pham/24-11/24-11-02/241102151301701/avatar/638836956737704928_dji-avata-2-fly-more-combo-three-batteries-chinh-hang.jpg`,
    description: 'DJI Avata 2 — FPV drone, 4K HDR, Goggles 3, Motion Controller, propeller guard an toàn.',
    shortSpecs: ['FPV 4K HDR', 'Goggles 3', 'Motion Controller', '3 batteries'],
  },
  {
    id: '13',
    slug: 'gopro-hero-13-black_action-camera-250102113303811',
    name: 'GoPro Hero 13 Black',
    brand: 'GoPro',
    category: 'action-camera',
    price: 9690000,
    image: `${CDN}/image-data/san-pham/25-01/25-01-02/250102113303811/avatar/638714152413009638_gopro-hero-13-black.jpg`,
    description: 'GoPro Hero 13 Black là camera hành trình cao cấp mới của GoPro, thiết kế bền bỉ chống nước, quay video độ phân giải cao với chất lượng hình ảnh sắc nét.',
    shortSpecs: ['5.3K 60p', 'HyperSmooth 6.0', 'Chống nước 10m', 'HB-Series lens'],
  },
  {
    id: '14',
    slug: 'dji-osmo-action-5-pro-adventure-combo_action-camera-260226105739670',
    name: 'DJI Osmo Action 5 Pro Adventure Combo',
    brand: 'DJI',
    category: 'action-camera',
    price: 11900000,
    image: `${CDN}/image-data/san-pham/26-02/26-02-26/260226105739670/avatar/639077003951312982_dji-osmo-action-5-pro-adventure-combo.jpg`,
    description: 'DJI Osmo Action 5 Pro — action cam 1/1.3 inch sensor, 4K 120p, màn hình OLED kép, chống nước 20m.',
    shortSpecs: ['1/1.3 inch sensor', '4K 120p', 'OLED dual screen', '20m waterproof'],
  },
  {
    id: '15',
    slug: 'may-quay-dji-osmo-pocket-4-creator-combo_action-camera-260330085702564',
    name: 'Máy quay DJI Osmo Pocket 4 Creator Combo',
    brand: 'DJI',
    category: 'may-quay-phim',
    price: 14740000,
    image: `${CDN}/image-data/san-pham/26-03/26-03-30/260330085702564/avatar/639120324002834549-dji-pocket-4-4-2000x2000-jpg_may-quay-dji-osmo-pocket-4-creator-combo.jpg`,
    description: 'DJI Osmo Pocket 4 là chiếc máy quay vlog cầm tay nhỏ gọn nhưng cực kỳ mạnh mẽ được trang bị cảm biến cải tiến cho chất lượng hình ảnh vượt trội cùng khả năng quay video 4K sắc nét. Hệ thống chống rung gimbal 3 trục đặc trưng từ DJI mang lại những thước phim mượt mà chuyên nghiệp.',
    shortSpecs: ['Cảm biến cải tiến', '4K sắc nét', 'Gimbal 3 trục', 'Vlog cầm tay'],
  },
  {
    id: '16',
    slug: 'action-camera-insta360-go-ultra-standard-bundle-arctic-white_action-camera-250814102845826',
    name: 'Action Camera Insta360 GO Ultra Standard Bundle Arctic White',
    brand: 'Insta360',
    category: 'action-camera',
    price: 13900000,
    image: `${CDN}/image-data/san-pham/25-08/25-08-14/250814102845826/avatar/638907647815459400_action-camera-insta360-go-ultra-standard-bundle-arctic-white.jpg`,
    description: 'Insta360 GO Ultra — camera nhỏ gọn nhất, 4K 60p, FlowState stabilization, thiết kế nam châm.',
    shortSpecs: ['4K 60p', 'FlowState', 'Magnetic mount', 'Nhỏ gọn'],
  },
  {
    id: '17',
    slug: 'dji-neo-chinh-hang_flycam-241016174248442',
    name: 'DJI Neo',
    brand: 'DJI',
    category: 'flycam',
    price: 6900000,
    image: `${CDN}/image-data/san-pham/24-10/24-10-16/241016174248442/avatar/638646974460200712_dji-neo-chinh-hang.jpg`,
    description: 'DJI Neo — drone selfie 135g nhỏ nhất DJI, AI tracking, takeoff từ lòng bàn tay, 4K UHD.',
    shortSpecs: ['135g nhỏ nhất', 'AI tracking', '4K UHD', 'Takeoff từ tay'],
  },
  {
    id: '18',
    slug: 'canon-rf-50-f18-stm-chinh-hang_ong-kinh-mirrorless-240803094047373',
    name: 'Ống kính Canon RF 50mm F1.8 STM | Chính hãng',
    brand: 'Canon',
    category: 'ong-kinh',
    price: 5290000,
    image: `${CDN}/image-data/san-pham/24-08/24-08-03/240803094047373/avatar/638847186653427391_canon-rf-50mm-f1-8-stm-chinh-hang.jpg`,
    description: 'Ống kính Canon RF 50mm F1.8 STM | Chính hãng là lens fix tiêu cự chuẩn cho hệ mirrorless Canon RF, sở hữu khẩu độ lớn f/1.8 cho khả năng chụp thiếu sáng tốt, STM yên tĩnh.',
    shortSpecs: ['50mm f/1.8', 'RF mount', 'STM motor', 'Compact'],
  },
  {
    id: '19',
    slug: 'kase-85-f14-af-lens-nikon-z_ong-kinh-mirrorless-251006173300230',
    name: 'Kase 85mm f/1.4 AF Lens Nikon Z',
    brand: 'Kase',
    category: 'ong-kinh',
    price: 14900000,
    image: `${CDN}/image-data/san-pham/25-10/25-10-06/251006173300230/avatar/638966646032677503_kase-85mm-f-1-4-af-lens-nikon-z.jpg`,
    description: 'Kase 85mm f/1.4 AF — ống kính portrait cao cấp cho Nikon Z, bokeh mịn, AF nhanh.',
    shortSpecs: ['85mm f/1.4', 'Nikon Z', 'AF', 'Portrait'],
  },
  {
    id: '20',
    slug: 'may-anh-canon-eos-r6-body-only_may-anh-mirrorless-230210223532542',
    name: 'Máy ảnh Canon EOS R6 Body Only',
    brand: 'Canon',
    category: 'may-anh',
    price: 37900000,
    image: `${CDN}/image-data/san-pham/23-02/23-02-10/230210223532542/avatar/01_may-anh-canon-eos-r6-body-only.jpg`,
    description: 'Canon EOS R6 — full-frame 20MP, 20fps, IBIS 8 stops, 4K 60p. Lựa chọn hoàn hảo cho thể thao và động vật.',
    shortSpecs: ['Full-frame 20MP', '20fps', 'IBIS 8 stops', '4K 60p'],
  },
];

// Per-category banners từ banner_header_sider/ (jsonBannerSanPhamNoiBat.js)
export interface CategoryBanner {
  title: string;
  subtitle?: string;
  image: string;
  href: string;
}

// Banner carousel nhỏ (bannerSileSmall-2) — ảnh thật 1305x435 từ mayanhvietnam.com
export const CATEGORY_BANNERS: Record<string, CategoryBanner[]> = {
  'may-anh': [
    { title: 'Sony A6700', image: `${CDN}/asset/imgs/img/banner/sonet-some_sony-a6700.png`, href: '/tim-kiem?v=sony%206700' },
    { title: 'Sony A7C II', image: `${CDN}/asset/imgs/img/banner/sonet-some_a7cii.png`, href: '/tim-kiem?v=sony%207c%20ii' },
    { title: 'Sony ZV-E10 II & ZV-1 II', image: `${CDN}/asset/imgs/img/banner/Sonet-some-zv-e10ii_zv-1ii.png`, href: '/danh-muc/may-anh-brd-sony' },
    { title: 'Sony A7 V', image: `${CDN}/asset/imgs/img/banner/uuDai-sonya7v-DCHS.webp`, href: '/san-pham/may-anh-sony-a7-mark-v-a7m5-chinh-hang_may-anh-mirrorless-251126090035598' },
    { title: 'Sony A7R VI', image: `${CDN}/asset/imgs/img/banner/sony-a7r-vi-1.webp`, href: '/san-pham/may-anh-sony-alpha-a7r-vi_may-anh-mirrorless-260328143107303' },
    { title: 'Canon EOS R50', image: `${CDN}/asset/imgs/img/banner/canon_r50_trang_den.webp`, href: '/san-pham/may-anh-canon-eos-r50-black-kem-lens-rfs-1845-chinh-hang_may-anh-mirrorless-241228112737843' },
    { title: 'Canon EOS R6 Mark III', image: `${CDN}/asset/imgs/img/banner/canon-r6-mark-III.webp`, href: '/san-pham/may-anh-canon-eos-r6-mark-iii-body_may-anh-mirrorless-250315190440715' },
  ],
  'ong-kinh': [
    { title: 'Sony Ưu đãi sáng tạo', image: `${CDN}/asset/imgs/img/banner/tetSieuChuansangtaoSony.webp`, href: '/danh-muc/ong-kinh-khuyen-mai-brd-sony' },
    { title: 'Nhận ngay hộp quà Sony', image: `${CDN}/asset/imgs/img/banner/nhan-ngay-hop-qua-sony.webp`, href: '/danh-muc/ong-kinh-khuyen-mai' },
    { title: 'Canon RF 50mm F1.4L VCM', image: `${CDN}/asset/imgs/img/banner/CANON-RF-50mm-F1.4L-VCM.webp`, href: '/san-pham/ong-kinh-canon-rf-50-f14l-vcm_ong-kinh-mirrorless-251129161537656' },
    { title: 'Khuyến mãi ống kính', image: `${CDN}/asset/imgs/img/banner/Km-lens.webp`, href: '/danh-muc/ong-kinh-khuyen-mai-brd-sony' },
    { title: 'Canon RF 45mm F1.2 STM', image: `${CDN}/asset/imgs/img/banner/RF-45mm-F1.2-STM.webp`, href: '/san-pham/ong-kinh-canon-rf-45-f12-stm_ong-kinh-mirrorless-251106133811267' },
    { title: 'Nikkor Z DX 35mm f/1.7', image: `${CDN}/asset/imgs/img/banner/NIKKOR-Z-DX-MC-35mm-f_1.7.png`, href: '/san-pham/nikkor-z-dx-mc-35-f17_may-anh-mirrorless-251018134123898' },
    { title: 'Kase AF 85mm F1.4 Nikon Z', image: `${CDN}/asset/imgs/img/banner/LENS-KASE-AF-85mm-F1.4-FOR-NIKON-Z.webp`, href: '/san-pham/kase-85-f14-af-lens-nikon-z_ong-kinh-mirrorless-251006173300230' },
  ],
  'action-camera': [
    { title: 'DJI Osmo Pocket 4 Creator Combo', image: `${CDN}/asset/imgs/img/banner/Dji_osm_pocket_4.webp`, href: '/san-pham/may-quay-dji-osmo-pocket-4-creator-combo_action-camera-260330085702564' },
    { title: 'DJI Osmo Action 6', image: `${CDN}/asset/imgs/img/banner/action-6.webp`, href: '/san-pham/may-quay-hanh-trinh-dji-osmo-action-6-standard-combo_action-camera-251114083734433' },
    { title: 'DJI Osmo Pocket 3 Combo', image: `${CDN}/asset/imgs/img/banner/DJI-Osmo-Pocket-3.webp`, href: '/san-pham/dji-osmo-pocket-3-combo_action-camera-240808113242741' },
    { title: 'Insta360 Go Ultra Standard', image: `${CDN}/asset/imgs/img/banner/Go-ultra-standard-bundle.webp`, href: '/san-pham/action-camera-insta360-go-ultra-standard-bundle-arctic-white_action-camera-250814102845826' },
    { title: 'DJI Osmo Nano', image: `${CDN}/asset/imgs/img/banner/DJI-OSMO-NANO-01.webp`, href: '/san-pham/dji-osmo-nano-standard-combo-128gb-chinh-hang_action-camera-250925153519860' },
    { title: 'DJI Osmo Action 5 Pro', image: `${CDN}/asset/imgs/img/banner/action5pro.webp`, href: '/san-pham/dji-osmo-action-5-pro_action-camera-241016174737304' },
  ],
  'flycam': [
    { title: 'DJI Mini 5 Pro', image: `${CDN}/asset/imgs/img/banner/dji-mini-5-pro.webp`, href: '/san-pham/flycam-dji-mini-5-pro-fly-more-combo-dji-rcn3-chinh-hang_flycam-250929144721576' },
    { title: 'DJI Mavic 4 Pro', image: `${CDN}/asset/imgs/img/banner/Mavic-4-Pro.webp`, href: '/san-pham/dji-mavic-4-pro_flycam-250515084647647' },
    { title: 'DJI Mini 4K Fly More', image: `${CDN}/asset/imgs/img/banner/FLYCAM-DJI-MINI-4K-FLY-MORE-COMBO.webp`, href: '/san-pham/flycam-dji-mini-4k-fly-more-combo-gl-chinh-hang_flycam-241016175318300' },
    { title: 'DJI Avata 2 Fly More', image: `${CDN}/asset/imgs/img/banner/dji-avata-2.webp`, href: '/san-pham/dji-avata-2-fly-more-combo-three-batteries-chinh-hang_flycam-241102151301701' },
    { title: 'DJI Neo', image: `${CDN}/asset/imgs/img/banner/1200x400DJI_Neo.webp`, href: '/san-pham/flycam-dji-neo-chinh-hang_flycam-241016174248442' },
    { title: 'DJI Mini 4 Pro Fly More', image: `${CDN}/asset/imgs/img/banner/1200X400_Flycam_DJI_Mini_4-Pro_Fly_More.webp`, href: '/san-pham/flycam-dji-mini-4-pro-fly-more-combo-dji-rc-2_flycam-240403190729530' },
  ],
  'may-quay-phim': [
    { title: 'DJI Osmo Pocket 4 Creator Combo', image: `${CDN}/asset/imgs/img/banner/Dji_osm_pocket_4.webp`, href: '/san-pham/may-quay-dji-osmo-pocket-4-creator-combo_action-camera-260330085702564' },
  ],
  'thiet-bi-studio': [],
};

// Helper: lấy sản phẩm theo slug
export function findProductBySlug(slug: string): RealProduct | undefined {
  return REAL_PRODUCTS.find((p) => p.slug === slug);
}

// Helper: sản phẩm theo category
export function productsByCategory(cat: string): RealProduct[] {
  return REAL_PRODUCTS.filter((p) => p.category === cat);
}

// Helper: sản phẩm theo brand
export function productsByBrand(brand: string): RealProduct[] {
  return REAL_PRODUCTS.filter((p) => p.brand.toLowerCase() === brand.toLowerCase());
}
