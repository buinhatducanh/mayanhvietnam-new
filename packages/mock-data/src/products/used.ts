import type { ProductSummary } from '../types';

const CDN = 'https://mayanhvietnam.com';

/**
 * Sản phẩm cũ — hàng like-new, đã qua sử dụng còn bảo hành.
 * Mock data cho danh mục "san-pham-cu".
 */
export const used: ProductSummary[] = [
  {
    id: 'used1',
    name: '[Cũ] Canon EOS R6 Mark II Body Only — Like-new 99%',
    slug: 'cu-canon-eos-r6-mark-ii-body-only-99',
    brand: 'Canon',
    category: 'san-pham-cu',
    price: 38_500_000,
    originalPrice: 52_900_000,
    thumbnail: `${CDN}/image-data/san-pham/23-04/23-04-19/230419151242054/avatar/canon-eos-r8-6-500x500_may-anh-canon-eos-r8-body-only.jpg`,
    images: [
      { url: `${CDN}/image-data/san-pham/23-04/23-04-19/230419151242054/avatar/canon-eos-r8-6-500x500_may-anh-canon-eos-r8-body-only.jpg`, alt: '' },
    ],
    availability: 'in_stock',
    isNew: false,
    isUsed: true,
    rating: { average: 4.7, count: 18 },
    description: 'Canon EOS R6 Mark II body only — like-new 99%, sử dụng kỹ, còn bảo hành 6 tháng. Đầy đủ hộp, phụ kiện zin.',
    highlights: ['Like-new 99%', 'Bảo hành 6 tháng', 'Đầy đủ hộp + phụ kiện'],
    specs: [
      { group: 'Tình trạng', items: [
        { label: 'Độ mới', value: '99%' },
        { label: 'Bảo hành', value: '6 tháng' },
        { label: 'Phụ kiện', value: 'Hộp + pin + sạc + strap' },
      ]},
    ],
    variants: [],
  },
  {
    id: 'used2',
    name: '[Cũ] Sony Alpha A7 IV Body Only — Like-new 95%',
    slug: 'cu-sony-alpha-a7-iv-body-only-95',
    brand: 'Sony',
    category: 'san-pham-cu',
    price: 36_900_000,
    originalPrice: 47_500_000,
    thumbnail: `${CDN}/image-data/san-pham/23-02/23-02-10/230210223540859/avatar/01_may-anh-sony-alpha-a7-mark-iv-body-only-chinh-hang.jpg`,
    images: [
      { url: `${CDN}/image-data/san-pham/23-02/23-02-10/230210223540859/avatar/01_may-anh-sony-alpha-a7-mark-iv-body-only-chinh-hang.jpg`, alt: '' },
    ],
    availability: 'in_stock',
    isNew: false,
    isUsed: true,
    rating: { average: 4.6, count: 14 },
    description: 'Sony A7 IV body — like-new 95%, còn bảo hành chính hãng 4 tháng. Full box, có vết xước nhẹ mặt đáy.',
    highlights: ['Like-new 95%', 'Bảo hành 4 tháng', 'Full box'],
    specs: [
      { group: 'Tình trạng', items: [
        { label: 'Độ mới', value: '95%' },
        { label: 'Bảo hành', value: '4 tháng' },
      ]},
    ],
    variants: [],
  },
  {
    id: 'used3',
    name: '[Cũ] Ống kính Canon RF 24-70mm f/2.8L IS USM — 98%',
    slug: 'cu-ong-kinh-canon-rf-24-70-f28l-98',
    brand: 'Canon',
    category: 'san-pham-cu',
    price: 36_500_000,
    originalPrice: 48_900_000,
    thumbnail: `${CDN}/image-data/san-pham/23-02/23-02-10/230210234357844/avatar/01_ong-kinh-canon-rf-24-70mm-f-2-8l-is-usm-chinh-hang.jpg`,
    images: [
      { url: `${CDN}/image-data/san-pham/23-02/23-02-10/230210234357844/avatar/01_ong-kinh-canon-rf-24-70mm-f-2-8l-is-usm-chinh-hang.jpg`, alt: '' },
    ],
    availability: 'in_stock',
    isNew: false,
    isUsed: true,
    rating: { average: 4.9, count: 9 },
    description: 'Lens Canon RF 24-70L IS USM — like-new 98%, đã qua sử dụng kỹ lưỡng, không xước, đầy đủ hood + filter.',
    highlights: ['98%', 'Có hood + filter', 'Không xước'],
    specs: [
      { group: 'Tình trạng', items: [
        { label: 'Độ mới', value: '98%' },
        { label: 'Phụ kiện', value: 'Hood + filter zin' },
      ]},
    ],
    variants: [],
  },
  {
    id: 'used4',
    name: '[Cũ] DJI Mavic 3 Pro — Fly More Combo DJI RC',
    slug: 'cu-dji-mavic-3-pro-fly-more-combo',
    brand: 'DJI',
    category: 'san-pham-cu',
    price: 38_900_000,
    originalPrice: 56_900_000,
    thumbnail: `${CDN}/image-data/san-pham/24-08/24-08-31/240831133137156/avatar/638722116807217083_ong-kinh-tamron-28-75mm-f2-8-di-iii-vxd-g2-for-nikon-z.jpg`,
    images: [
      { url: `${CDN}/image-data/san-pham/24-08/24-08-31/240831133137156/avatar/638722116807217083_ong-kinh-tamron-28-75mm-f2-8-di-iii-vxd-g2-for-nikon-z.jpg`, alt: '' },
    ],
    availability: 'pre_order',
    isNew: false,
    isUsed: true,
    rating: { average: 4.8, count: 6 },
    description: 'DJI Mavic 3 Pro Fly More Combo (DJI RC) — like-new 96%, bay dưới 8h, 3 pin + sạc, bảo hành 3 tháng.',
    highlights: ['96%', '3 pin + sạc', 'Bay <8h'],
    specs: [
      { group: 'Tình trạng', items: [
        { label: 'Độ mới', value: '96%' },
        { label: 'Bay', value: '<8 giờ' },
        { label: 'Bảo hành', value: '3 tháng' },
      ]},
    ],
    variants: [],
  },
];
