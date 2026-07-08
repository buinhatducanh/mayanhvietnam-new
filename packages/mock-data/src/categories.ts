import type { Category } from './types';

export const categories: Category[] = [
  { id: '1', name: 'Máy ảnh Body',    slug: 'may-anh',            icon: '📷', productCount: 156 },
  { id: '2', name: 'Ống kính Lens',    slug: 'ong-kinh',           icon: '🔭', productCount: 243 },
  { id: '3', name: 'Sản phẩm cũ',      slug: 'san-pham-cu',        icon: '♻️', productCount: 89 },
  { id: '4', name: 'Lắp phông studio', slug: 'lap-phong-studio',   icon: '🎬', productCount: 34 },
  { id: '5', name: 'Camera hành động', slug: 'action-camera',      icon: '🏃', productCount: 67 },
  { id: '6', name: 'Flycam — Drone',   slug: 'flycam',             icon: '🚁', productCount: 45 },
  { id: '7', name: 'Thiết bị studio',  slug: 'thiet-bi-studio',    icon: '💡', productCount: 112 },
  { id: '8', name: 'Phụ kiện',         slug: 'phu-kien',           icon: '🎒', productCount: 320 },
  { id: '9', name: 'Máy quay phim',    slug: 'may-quay-phim',      icon: '📹', productCount: 28 },
];

export const getCategoryBySlug = (slug: string) =>
  categories.find((c) => c.slug === slug) ?? null;
