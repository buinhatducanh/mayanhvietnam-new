import type { ProductSummary } from '../types';

const CDN = 'https://mayanhvietnam.com';

/**
 * Phụ kiện cho máy ảnh — filter, tripod, bag, gimbal, pin, sạc, hood, memory card…
 * Mock data derived from mayanhvietnam.com accessories category.
 */
export const accessories: ProductSummary[] = [
  {
    id: 'acc1',
    name: 'Filter Polarizing CPL 67mm — Chính hãng',
    slug: 'filter-polarizing-cpl-67mm',
    brand: 'Kase',
    category: 'phu-kien',
    price: 1_200_000,
    originalPrice: 1_500_000,
    thumbnail: `${CDN}/image-data/san-pham/24-08/24-08-03/240803094047373/avatar/638847186653427391_canon-rf-50mm-f1-8-stm-chinh-hang.jpg`,
    images: [
      { url: `${CDN}/image-data/san-pham/24-08/24-08-03/240803094047373/avatar/638847186653427391_canon-rf-50mm-f1-8-stm-chinh-hang.jpg` },
    ],
    availability: 'in_stock',
    isNew: false,
    isUsed: false,
    rating: { average: 4.7, count: 89 },
    description: 'Filter CPL Kase 67mm — loại bỏ phản xạ ánh sáng, tăng độ tương phản và màu sắc cho ảnh风景. Phù hợp Canon RF, Sony E, Nikon Z.',
    highlights: ['Chống phản xạ đa lớp', 'Khung nhôm CNC', 'Phù hợp 67mm filter thread'],
    specs: [
      { group: 'Thông số kỹ thuật', items: [
        { label: 'Đường kính', value: '67mm' },
        { label: 'Loại', value: 'CPL Polarizing' },
        { label: 'Chất liệu kính', value: 'AGC Glass' },
        { label: 'Khung', value: 'Nhôm CNC mỏng' },
      ]},
    ],
    variants: [
      { id: 'v1', name: '67mm', price: 1_200_000 },
      { id: 'v2', name: '77mm', price: 1_500_000 },
      { id: 'v3', name: '82mm', price: 1_800_000 },
    ],
  },
  {
    id: 'acc2',
    name: 'Tripod Peak Design Travel Tripod Carbon',
    slug: 'tripod-peak-design-travel-tripod-carbon',
    brand: 'Peak Design',
    category: 'phu-kien',
    price: 12_900_000,
    thumbnail: `${CDN}/image-data/san-pham/24-08/24-08-03/240803094047373/avatar/638847186653427391_canon-rf-50mm-f1-8-stm-chinh-hang.jpg`,
    images: [
      { url: `${CDN}/image-data/san-pham/24-08/24-08-03/240803094047373/avatar/638847186653427391_canon-rf-50mm-f1-8-stm-chinh-hang.jpg` },
    ],
    availability: 'in_stock',
    isNew: true,
    isUsed: false,
    rating: { average: 4.9, count: 52 },
    description: 'Tripod carbon fiber cao cấp từ Peak Design — nhẹ, gấp nhỏ, chịu tải lên đến 9.1kg. Phù hợp travel photographer.',
    highlights: ['Carbon fiber siêu nhẹ 1.29kg', 'Gấp 3 khúc ultra-compact', 'Chịu tải 9.1kg', 'Ball head tích hợp'],
    specs: [
      { group: 'Thông số kỹ thuật', items: [
        { label: 'Chất liệu', value: 'Carbon Fiber' },
        { label: 'Trọng lượng', value: '1.29 kg' },
        { label: 'Chiều cao tối đa', value: '152.4 cm' },
        { label: 'Chịu tải', value: '9.1 kg' },
      ]},
    ],
    variants: [],
  },
  {
    id: 'acc3',
    name: 'Bag Camera Lowepro ProTactic BP 450 AW II',
    slug: 'bag-lowepro-protactic-bp-450-aw-ii',
    brand: 'Lowepro',
    category: 'phu-kien',
    price: 3_800_000,
    thumbnail: `${CDN}/image-data/san-pham/24-08/24-08-03/240803094047373/avatar/638847186653427391_canon-rf-50mm-f1-8-stm-chinh-hang.jpg`,
    images: [
      { url: `${CDN}/image-data/san-pham/24-08/24-08-03/240803094047373/avatar/638847186653427391_canon-rf-50mm-f1-8-stm-chinh-hang.jpg` },
    ],
    availability: 'in_stock',
    isNew: false,
    isUsed: false,
    rating: { average: 4.6, count: 34 },
    description: 'Balo máy ảnh chuyên nghiệp Lowepro ProTactic 450 AW II — chứa 1 body + 4 lenses + laptop 15". Chống nước AW cover.',
    highlights: ['Chứa 1 body + 4 lenses', 'Laptop slot 15"', 'AW rain cover', 'Modular divider system'],
    specs: [
      { group: 'Thông số kỹ thuật', items: [
        { label: 'Dung tích', value: '25L' },
        { label: 'Chống nước', value: 'AW Rain Cover' },
        { label: 'Laptop slot', value: '15 inch' },
        { label: 'Trọng lượng', value: '2.2 kg' },
      ]},
    ],
    variants: [],
  },
  {
    id: 'acc4',
    name: 'Pin Canon LP-E6NH — Chính hãng',
    slug: 'pin-canon-lp-e6nh',
    brand: 'Canon',
    category: 'phu-kien',
    price: 1_850_000,
    thumbnail: `${CDN}/image-data/san-pham/24-08/24-08-03/240803094047373/avatar/638847186653427391_canon-rf-50mm-f1-8-stm-chinh-hang.jpg`,
    images: [
      { url: `${CDN}/image-data/san-pham/24-08/24-08-03/240803094047373/avatar/638847186653427391_canon-rf-50mm-f1-8-stm-chinh-hang.jpg` },
    ],
    availability: 'in_stock',
    isNew: false,
    isUsed: false,
    rating: { average: 4.8, count: 120 },
    description: 'Pin Canon LP-E6NH chính hãng — dung lượng 2130mAh, tương thích EOS R5, R6, R6 II, 5D IV, 6D II.',
    highlights: ['Chính hãng Canon', '2130mAh', 'Tương thích R5/R6/R6 II'],
    specs: [
      { group: 'Thông số kỹ thuật', items: [
        { label: 'Model', value: 'LP-E6NH' },
        { label: 'Dung lượng', value: '2130 mAh' },
        { label: 'Tương thích', value: 'EOS R5, R6, R6 II, 5D IV, 6D II' },
      ]},
    ],
    variants: [],
  },
];
