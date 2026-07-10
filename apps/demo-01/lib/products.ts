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
}

export interface Category {
  name: string
  slug: string
  image?: string
}

export const categories: Category[] = [
  { name: 'Máy ảnh', slug: 'may-anh', image: '/images/product-canon-r6.png' },
  { name: 'Ống kính', slug: 'ong-kinh', image: '/images/product-sony-2470.png' },
  { name: 'Máy quay phim', slug: 'may-quay-phim', image: '/images/product-cinema-cam.png' },
  { name: 'Flycam', slug: 'flycam', image: '/images/product-dji-mini4.png' },
  { name: 'Action camera', slug: 'action-camera', image: '/images/product-action-cam.png' },
  { name: 'Thiết bị studio', slug: 'thiet-bi-studio', image: '/images/product-godox-light.png' },
  { name: 'Phụ kiện', slug: 'phu-kien', image: '/images/product-canon-70200.png' },
  { name: 'Sản phẩm cũ', slug: 'san-pham-cu', image: '/images/product-sony-a7iv.png' },
  { name: 'Setup phòng', slug: 'setup-phong', image: '/images/product-godox-light.png' },
]

export const products: Product[] = [
  {
    name: 'Canon EOS R6 Mark II',
    slug: 'canon-eos-r6-mark-ii',
    brand: 'Canon',
    categorySlug: 'may-anh',
    price: 62900000,
    discountPrice: 55900000,
    status: 'ACTIVE',
    availability: 'IN_STOCK',
    condition: 'NEW',
    mountType: 'Canon RF',
    isNew: true,
    image: '/images/product-canon-r6.png',
    rating: 4.9,
    reviewCount: 128,
    description:
      'Máy ảnh full-frame mirrorless thế hệ mới với cảm biến 24.2MP, chụp liên tiếp 40fps và quay video 4K 60p oversampled từ 6K.',
    specs: {
      'Cảm biến': 'Full-frame CMOS 24.2MP',
      'Bộ xử lý': 'DIGIC X',
      'Chụp liên tiếp': '40 fps (màn trập điện tử)',
      'Quay video': '4K 60p / FHD 180p',
      ISO: '100 - 102.400',
      'Chống rung': 'IBIS 5 trục, tối đa 8 stops',
      'Ngàm ống kính': 'Canon RF',
      'Trọng lượng': '670g (gồm pin, thẻ)',
    },
    variants: [
      { id: 'r6ii-body', name: 'Body Only', price: 62900000, discountPrice: 55900000 },
      {
        id: 'r6ii-kit',
        name: 'Kit RF 24-105mm f/4L IS USM',
        price: 82900000,
        discountPrice: 75900000,
      },
    ],
  },
  {
    name: 'Sony FE 24-70mm f/2.8 GM II',
    slug: 'sony-fe-24-70mm-f28-gm-ii',
    brand: 'Sony',
    categorySlug: 'ong-kinh',
    price: 47900000,
    discountPrice: 42990000,
    status: 'ACTIVE',
    availability: 'IN_STOCK',
    condition: 'NEW',
    mountType: 'Sony E',
    image: '/images/product-sony-2470.png',
    rating: 4.9,
    reviewCount: 98,
    description:
      'Ống kính zoom tiêu chuẩn G Master thế hệ II — nhẹ hơn 20%, lấy nét nhanh với 4 motor XD Linear, chất lượng quang học đỉnh cao.',
    specs: {
      'Dải tiêu cự': '24-70mm',
      'Khẩu độ': 'f/2.8 - f/22',
      'Cấu trúc quang học': '20 thấu kính / 15 nhóm',
      'Motor lấy nét': '4x XD Linear Motor',
      'Kích thước filter': '82mm',
      'Ngàm ống kính': 'Sony E',
      'Trọng lượng': '695g',
    },
    variants: [{ id: 'sony2470-std', name: 'Chính hãng Sony VN', price: 47900000, discountPrice: 42990000 }],
  },
  {
    name: 'Fujifilm X-T5',
    slug: 'fujifilm-x-t5',
    brand: 'Fujifilm',
    categorySlug: 'may-anh',
    price: 42990000,
    discountPrice: 38990000,
    status: 'ACTIVE',
    availability: 'IN_STOCK',
    condition: 'NEW',
    mountType: 'Fujifilm X',
    isNew: true,
    image: '/images/product-fuji-xt5.png',
    rating: 4.8,
    reviewCount: 76,
    description:
      'Máy ảnh APS-C 40.2MP với thiết kế retro huyền thoại, 19 giả lập film Fujifilm và quay video 6.2K 30p nội bộ.',
    specs: {
      'Cảm biến': 'X-Trans CMOS 5 HR 40.2MP',
      'Bộ xử lý': 'X-Processor 5',
      'Chụp liên tiếp': '15 fps (màn trập cơ)',
      'Quay video': '6.2K 30p / 4K 60p',
      'Chống rung': 'IBIS 5 trục, 7 stops',
      'Ngàm ống kính': 'Fujifilm X',
      'Trọng lượng': '557g',
    },
    variants: [
      { id: 'xt5-body', name: 'Body Only', price: 42990000, discountPrice: 38990000 },
      { id: 'xt5-kit', name: 'Kit XF 16-80mm f/4', price: 52990000, discountPrice: 48990000 },
    ],
  },
  {
    name: 'DJI Mini 4 Pro (Fly More Combo)',
    slug: 'dji-mini-4-pro-fly-more-combo',
    brand: 'DJI',
    categorySlug: 'flycam',
    price: 24990000,
    discountPrice: 22990000,
    status: 'ACTIVE',
    availability: 'IN_STOCK',
    condition: 'NEW',
    image: '/images/product-dji-mini4.png',
    rating: 4.9,
    reviewCount: 56,
    description:
      'Flycam dưới 249g với cảm biến tránh vật cản đa hướng, quay 4K/60fps HDR và thời gian bay tối đa 45 phút với pin Plus.',
    specs: {
      'Trọng lượng': '< 249g',
      Camera: '1/1.3" CMOS, 48MP',
      'Quay video': '4K 60fps HDR / Slow-motion 4K 100fps',
      'Thời gian bay': '34 phút (45 phút pin Plus)',
      'Truyền hình ảnh': 'O4, 20km FHD',
      'Cảm biến vật cản': 'Đa hướng (Omnidirectional)',
    },
    variants: [
      { id: 'mini4-combo', name: 'Fly More Combo (RC 2)', price: 24990000, discountPrice: 22990000 },
      { id: 'mini4-std', name: 'Bản tiêu chuẩn (RC-N2)', price: 19990000 },
    ],
  },
  {
    name: 'Canon RF 70-200mm f/2.8L IS USM',
    slug: 'canon-rf-70-200mm-f28l-is-usm',
    brand: 'Canon',
    categorySlug: 'ong-kinh',
    price: 65900000,
    discountPrice: 59990000,
    status: 'ACTIVE',
    availability: 'IN_STOCK',
    condition: 'NEW',
    mountType: 'Canon RF',
    image: '/images/product-canon-70200.png',
    rating: 4.9,
    reviewCount: 112,
    description:
      'Ống kính tele zoom L-series nhỏ gọn nhất phân khúc với chống rung 5 stops, lý tưởng cho chân dung, thể thao và sự kiện.',
    specs: {
      'Dải tiêu cự': '70-200mm',
      'Khẩu độ': 'f/2.8 - f/32',
      'Cấu trúc quang học': '17 thấu kính / 13 nhóm',
      'Chống rung': 'IS 5 stops',
      'Kích thước filter': '77mm',
      'Ngàm ống kính': 'Canon RF',
      'Trọng lượng': '1070g',
    },
    variants: [{ id: 'rf70200-std', name: 'Chính hãng Canon VN', price: 65900000, discountPrice: 59990000 }],
  },
  {
    name: 'Sony Alpha A7 IV (Like New 99%)',
    slug: 'sony-alpha-a7-iv-like-new',
    brand: 'Sony',
    categorySlug: 'san-pham-cu',
    price: 45900000,
    discountPrice: 36900000,
    status: 'ACTIVE',
    availability: 'IN_STOCK',
    condition: 'USED',
    mountType: 'Sony E',
    image: '/images/product-sony-a7iv.png',
    rating: 4.8,
    reviewCount: 41,
    description:
      'Máy ảnh full-frame hybrid 33MP đã qua sử dụng, ngoại hình 99%, shutter count dưới 5.000, bảo hành 6 tháng tại Mayanhvietnam.',
    specs: {
      'Cảm biến': 'Full-frame Exmor R 33MP',
      'Tình trạng': 'Like New 99%, < 5.000 shots',
      'Quay video': '4K 60p (Super35) / 4K 30p FF',
      'Chống rung': 'IBIS 5.5 stops',
      'Ngàm ống kính': 'Sony E',
      'Bảo hành': '6 tháng tại Mayanhvietnam',
    },
    variants: [{ id: 'a7iv-used', name: 'Body Only (Used 99%)', price: 45900000, discountPrice: 36900000 }],
  },
  {
    name: 'Godox SL150W III LED Video Light',
    slug: 'godox-sl150w-iii',
    brand: 'Godox',
    categorySlug: 'thiet-bi-studio',
    price: 6490000,
    discountPrice: 5690000,
    status: 'ACTIVE',
    availability: 'IN_STOCK',
    condition: 'NEW',
    image: '/images/product-godox-light.png',
    rating: 4.7,
    reviewCount: 64,
    description:
      'Đèn LED quay phim công suất 150W, nhiệt độ màu 5600K, CRI 96+, điều khiển qua app — lựa chọn tiêu chuẩn cho studio và livestream.',
    specs: {
      'Công suất': '150W',
      'Nhiệt độ màu': '5600K ± 200K',
      CRI: '96+',
      TLCI: '97+',
      'Ngàm đèn': 'Bowens',
      'Điều khiển': 'App Godox Light / Remote',
    },
    variants: [{ id: 'sl150-std', name: 'Chính hãng Godox VN', price: 6490000, discountPrice: 5690000 }],
  },
  {
    name: 'GoPro HERO 12 Black',
    slug: 'gopro-hero-12-black',
    brand: 'GoPro',
    categorySlug: 'action-camera',
    price: 10990000,
    discountPrice: 9490000,
    status: 'ACTIVE',
    availability: 'IN_STOCK',
    condition: 'NEW',
    isNew: true,
    image: '/images/product-action-cam.png',
    rating: 4.8,
    reviewCount: 87,
    description:
      'Action camera quay 5.3K60 với HyperSmooth 6.0, chống nước 10m và thời lượng pin cải thiện gấp đôi so với thế hệ trước.',
    specs: {
      'Quay video': '5.3K 60fps / 4K 120fps',
      'Chống rung': 'HyperSmooth 6.0',
      'Chống nước': '10m (không cần vỏ)',
      'Cảm biến': '1/1.9" CMOS 27MP',
      'Màn hình': 'Trước 1.4" + Sau 2.27" cảm ứng',
    },
    variants: [{ id: 'hero12-std', name: 'Bản tiêu chuẩn', price: 10990000, discountPrice: 9490000 }],
  },
  {
    name: 'Sony FX30 Cinema Line',
    slug: 'sony-fx30-cinema-line',
    brand: 'Sony',
    categorySlug: 'may-quay-phim',
    price: 46990000,
    discountPrice: 43990000,
    status: 'ACTIVE',
    availability: 'PRE_ORDER',
    condition: 'NEW',
    mountType: 'Sony E',
    image: '/images/product-cinema-cam.png',
    rating: 4.8,
    reviewCount: 33,
    description:
      'Máy quay Cinema Line APS-C với cảm biến 26MP, quay 4K 120p 10-bit 4:2:2, hỗ trợ S-Cinetone và Log shooting chuyên nghiệp.',
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
]

export interface CameraBody {
  name: string
  mountType: string
  sensor: string
}

export const cameraBodies: CameraBody[] = [
  { name: 'Canon EOS R6 Mark II', mountType: 'Canon RF', sensor: 'Full-frame' },
  { name: 'Canon EOS R5', mountType: 'Canon RF', sensor: 'Full-frame' },
  { name: 'Canon EOS R50', mountType: 'Canon RF', sensor: 'APS-C' },
  { name: 'Sony Alpha A7 IV', mountType: 'Sony E', sensor: 'Full-frame' },
  { name: 'Sony A6700', mountType: 'Sony E', sensor: 'APS-C' },
  { name: 'Sony FX30', mountType: 'Sony E', sensor: 'APS-C' },
  { name: 'Fujifilm X-T5', mountType: 'Fujifilm X', sensor: 'APS-C' },
  { name: 'Fujifilm X-S20', mountType: 'Fujifilm X', sensor: 'APS-C' },
  { name: 'Nikon Z6 III', mountType: 'Nikon Z', sensor: 'Full-frame' },
]

export interface LensOption {
  name: string
  mountType: string
  focalRange: string
  coverage: 'Full-frame' | 'APS-C'
}

export const lensOptions: LensOption[] = [
  { name: 'Canon RF 24-105mm f/4L IS USM', mountType: 'Canon RF', focalRange: '24-105mm', coverage: 'Full-frame' },
  { name: 'Canon RF 70-200mm f/2.8L IS USM', mountType: 'Canon RF', focalRange: '70-200mm', coverage: 'Full-frame' },
  { name: 'Canon RF 50mm f/1.8 STM', mountType: 'Canon RF', focalRange: '50mm', coverage: 'Full-frame' },
  { name: 'Sony FE 24-70mm f/2.8 GM II', mountType: 'Sony E', focalRange: '24-70mm', coverage: 'Full-frame' },
  { name: 'Sony FE 85mm f/1.4 GM', mountType: 'Sony E', focalRange: '85mm', coverage: 'Full-frame' },
  { name: 'Sony E 16-55mm f/2.8 G', mountType: 'Sony E', focalRange: '16-55mm', coverage: 'APS-C' },
  { name: 'Fujifilm XF 16-80mm f/4 R OIS', mountType: 'Fujifilm X', focalRange: '16-80mm', coverage: 'APS-C' },
  { name: 'Fujifilm XF 56mm f/1.2 R WR', mountType: 'Fujifilm X', focalRange: '56mm', coverage: 'APS-C' },
  { name: 'Nikon Z 24-120mm f/4 S', mountType: 'Nikon Z', focalRange: '24-120mm', coverage: 'Full-frame' },
]

export const storeLocations = [
  { city: 'TP.HCM', address: '123 Đường 3/2, P. Xuân Khánh, Q.10, TP. Hồ Chí Minh' },
  { city: 'Cần Thơ', address: '45 Nguyễn Văn Cừ, Q. Ninh Kiều, TP. Cần Thơ' },
  { city: 'An Giang', address: '78 Trần Hưng Đạo, TP. Long Xuyên, An Giang' },
  { city: 'Tiền Giang', address: '12 Ấp Bắc, TP. Mỹ Tho, Tiền Giang' },
]

export const HOTLINE = '0937.148.222'

export function formatVND(amount: number): string {
  return new Intl.NumberFormat('vi-VN').format(amount) + 'đ'
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter((p) => p.categorySlug === categorySlug)
}
