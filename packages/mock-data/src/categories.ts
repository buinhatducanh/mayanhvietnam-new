import type { Category } from './types';

const CDN = 'https://mayanhvietnam.com';

export const categories: Category[] = [
  { id: '1', name: 'Máy ảnh Body',    slug: 'may-anh',            icon: '📷', image: `${CDN}/asset/imgs/img/danhMuc_MayAnh.webp`, productCount: 156 },
  { id: '2', name: 'Ống kính Lens',    slug: 'ong-kinh',           icon: '🔭', image: `${CDN}/asset/imgs/img/danhMuc_ongkinh.webp`, productCount: 243 },
  { id: '3', name: 'Sản phẩm cũ',      slug: 'san-pham-cu',        icon: '♻️', image: `${CDN}/asset/imgs/img/danhMuc_spCu.webp`, productCount: 89 },
  { id: '4', name: 'Lắp phông studio', slug: 'lap-phong-studio',   icon: '🎬', image: `${CDN}/asset/imgs/img/danhMuc_setupPhong.webp`, productCount: 34 },
  { id: '5', name: 'Camera hành động', slug: 'action-camera',      icon: '🏃', image: `${CDN}/asset/imgs/img/danhMuc_action.webp`, productCount: 67 },
  { id: '6', name: 'Flycam — Drone',   slug: 'flycam',             icon: '🚁', image: `${CDN}/asset/imgs/img/danhMuc_flycam.webp`, productCount: 45 },
  { id: '7', name: 'Thiết bị studio',  slug: 'thiet-bi-studio',    icon: '💡', image: `${CDN}/asset/imgs/img/danhMuc_thietBiStudio.webp`, productCount: 112 },
  { id: '8', name: 'Phụ kiện',         slug: 'phu-kien',           icon: '🎒', image: `${CDN}/asset/imgs/img/danhMuc_phuKien.webp`, productCount: 320 },
  { id: '9', name: 'Máy quay phim',    slug: 'may-quay-phim',      icon: '📹', image: `${CDN}/asset/imgs/img/danhMuc_mayQuayPhim.webp`, productCount: 28 },
];

export const getCategoryBySlug = (slug: string) =>
  categories.find((c) => c.slug === slug) ?? null;