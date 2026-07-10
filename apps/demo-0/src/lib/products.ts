export type ProductColor = {
  name: string;
  hex: string;
};

export type SpecCallout = {
  label: string;
  value: string;
  target: 'Lens' | 'Body' | 'Dial' | 'Sensor';
};

export type Product = {
  id: string;
  name: string;
  tagline: string;
  price: number;
  originalPrice: number;
  discountPercent: number;
  rating: number;
  reviewCount: number;
  soldCount: number;
  colors: ProductColor[];
  specs: { label: string; value: string }[];
  callouts: SpecCallout[];
  image: string;
};

export const products: Product[] = [
  {
    id: 'canon-eos-r50',
    name: 'Canon EOS R50',
    tagline: 'Nhỏ gọn. Mạnh mẽ. Sáng tạo không giới hạn.',
    price: 17_500_000,
    originalPrice: 21_990_000,
    discountPercent: 20,
    rating: 4.9,
    reviewCount: 128,
    soldCount: 342,
    colors: [
      { name: 'Trắng', hex: '#f0ede8' },
      { name: 'Đen', hex: '#1c1c1c' },
    ],
    specs: [
      { label: 'Cảm biến', value: 'APS-C 24.2MP CMOS' },
      { label: 'Bộ xử lý', value: 'Chip DIGIC X' },
      { label: 'Dải ISO', value: '100 – 32000' },
      { label: 'Tốc độ chụp', value: '15 fps' },
      { label: 'Quay video', value: '4K 30p không crop' },
    ],
    callouts: [
      { label: 'Cảm biến', value: 'APS-C 24.2MP CMOS', target: 'Sensor' },
      { label: 'Bộ xử lý', value: 'Chip DIGIC X', target: 'Body' },
      { label: 'Dải ISO', value: '100 – 32000', target: 'Dial' },
      { label: 'Tốc độ chụp', value: '15 fps liên tục', target: 'Lens' },
    ],
    image: '/images/canon-eos-r50.png',
  },
  {
    id: 'sony-a7c-ii',
    name: 'Sony A7C II',
    tagline: 'Full-frame trong lòng bàn tay.',
    price: 45_990_000,
    originalPrice: 50_990_000,
    discountPercent: 10,
    rating: 4.8,
    reviewCount: 96,
    soldCount: 215,
    colors: [
      { name: 'Đen', hex: '#1c1c1c' },
      { name: 'Bạc', hex: '#c0c0c0' },
    ],
    specs: [
      { label: 'Cảm biến', value: 'Full-frame 33.0MP Exmor R' },
      { label: 'Bộ xử lý', value: 'Chip BIONZ XR' },
      { label: 'Lấy nét', value: 'AI AF 759 điểm' },
      { label: 'Quay video', value: '4K 60p' },
      { label: 'Trọng lượng', value: '514g' },
    ],
    callouts: [
      { label: 'Cảm biến', value: 'Full-frame 33.0MP Exmor R', target: 'Sensor' },
      { label: 'Bộ xử lý', value: 'Chip BIONZ XR', target: 'Body' },
      { label: 'Lấy nét AI', value: '759 điểm AF', target: 'Lens' },
      { label: 'Quay video', value: '4K 60p', target: 'Dial' },
    ],
    image: '/images/sony-a7c-ii.png',
  },
  {
    id: 'fujifilm-x-t5',
    name: 'Fujifilm X-T5',
    tagline: 'Chất phim cổ điển. Công nghệ đỉnh cao.',
    price: 35_990_000,
    originalPrice: 40_990_000,
    discountPercent: 12,
    rating: 4.9,
    reviewCount: 154,
    soldCount: 287,
    colors: [
      { name: 'Đen', hex: '#1c1c1c' },
      { name: 'Bạc', hex: '#d4d4d4' },
      { name: 'Xanh dương', hex: '#2d4a6f' },
    ],
    specs: [
      { label: 'Cảm biến', value: 'APS-C 40.2MP X-Trans CMOS 5 HR' },
      { label: 'Bộ xử lý', value: 'X-Processor 5' },
      { label: 'Giả lập màu', value: '19 chế độ màu phim' },
      { label: 'Quay video', value: '6.2K 30p' },
      { label: 'Trọng lượng', value: '557g' },
    ],
    callouts: [
      { label: 'Cảm biến', value: '40.2MP X-Trans CMOS 5 HR', target: 'Sensor' },
      { label: 'Bộ xử lý', value: 'X-Processor 5', target: 'Body' },
      { label: 'Giả lập màu phim', value: '19 chế độ đặc trưng', target: 'Dial' },
      { label: 'Quay video', value: '6.2K 30p', target: 'Lens' },
    ],
    image: '/images/fujifilm-x-t5.png',
  },
];

export function formatVND(amount: number): string {
  return `${amount.toLocaleString('vi-VN')}đ`;
}
