import type { Category } from './types';

const CDN = 'https://mayanhvietnam.com';

/**
 * Unified categories — combines demo-03/04/05/06/01/02 needs.
 * Includes 'lap-phong-studio', 'may-quay-phim', 'san-pham-flash-sale',
 * 'san-pham-khuyen-mai' that some demos use.
 */
export const categories: Category[] = [
  { id: '1', name: 'Máy ảnh Body',    slug: 'may-anh',            icon: '📷', image: `${CDN}/asset/imgs/img/danhMuc_MayAnh.webp`, productCount: 156, description: 'Máy ảnh mirrorless, DSLR chính hãng từ Canon, Sony, Nikon, Fujifilm' },
  { id: '2', name: 'Ống kính Lens',    slug: 'ong-kinh',           icon: '🔭', image: `${CDN}/asset/imgs/img/danhMuc_ongkinh.webp`, productCount: 243, description: 'Ống kính cho mọi hệ máy: Canon RF, Sony E, Nikon Z, Fujifilm X' },
  { id: '3', name: 'Sản phẩm cũ',      slug: 'san-pham-cu',        icon: '♻️', image: `${CDN}/asset/imgs/img/danhMuc_spCu.webp`, productCount: 89, description: 'Máy ảnh & lens like-new, đã qua sử dụng còn bảo hành' },
  { id: '4', name: 'Lắp phông studio', slug: 'lap-phong-studio',   icon: '🎬', image: `${CDN}/asset/imgs/img/danhMuc_setupPhong.webp`, productCount: 34, description: 'Dịch vụ lắp đặt phòng studio chuyên nghiệp' },
  { id: '5', name: 'Camera hành động', slug: 'action-camera',      icon: '🏃', image: `${CDN}/asset/imgs/img/danhMuc_action.webp`, productCount: 67, description: 'Action camera GoPro, DJI Osmo, Insta360' },
  { id: '6', name: 'Flycam — Drone',   slug: 'flycam',             icon: '🚁', image: `${CDN}/asset/imgs/img/danhMuc_flycam.webp`, productCount: 45, description: 'Flycam DJI Mini, Air, Mavic — chính hãng, bảo hành 12 tháng' },
  { id: '7', name: 'Thiết bị studio',  slug: 'thiet-bi-studio',    icon: '💡', image: `${CDN}/asset/imgs/img/danhMuc_thietBiStudio.webp`, productCount: 112, description: 'Đèn LED, softbox, micro, phụ kiện studio' },
  { id: '8', name: 'Phụ kiện',         slug: 'phu-kien',           icon: '🎒', image: `${CDN}/asset/imgs/img/danhMuc_phuKien.webp`, productCount: 320, description: 'Filter, hood, bag, tripod, gimbal, pin, sạc' },
  { id: '9', name: 'Máy quay phim',    slug: 'may-quay-phim',      icon: '📹', image: `${CDN}/asset/imgs/img/danhMuc_mayQuayPhim.webp`, productCount: 28, description: 'Cinema camera Sony FX, Canon C, Blackmagic' },
  { id: '10', name: 'Flash Sale',       slug: 'san-pham-flash-sale', icon: '⚡', image: `${CDN}/asset/imgs/img/1200x200_flycam.png`, productCount: 12, description: 'Sản phẩm đang giảm giá sốc trong tuần' },
  { id: '11', name: 'Khuyến mãi',       slug: 'san-pham-khuyen-mai', icon: '🎁', image: `${CDN}/asset/imgs/img/SPKM_banner/banner-khuyen-mai-2026.webp`, productCount: 48, description: 'Sản phẩm đang có chương trình khuyến mãi đặc biệt' },
];

export const getCategoryBySlug = (slug: string) =>
  categories.find((c) => c.slug === slug) ?? null;

/** Get all categories that have at least 1 product in catalog */
export const getActiveCategories = () =>
  categories.filter((c) => c.productCount > 0);