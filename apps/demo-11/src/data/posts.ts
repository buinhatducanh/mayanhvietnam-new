import { products } from '../data';

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  relatedSlugs?: string[];
}

// ============================================
// BÀI VIẾT GỢI Ý THEO SẢN PHẨM
// ============================================
// Có thể liên kết với sản phẩm cụ thể qua slug (product.slug chưa có trong data-11
// nên dùng id hoặc category để match — đơn giản hơn: lấy theo category)

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'Đánh giá Sony A7R VI: Cảm biến 61MP có đáng để nâng cấp?',
    excerpt: 'Phân tích chi tiết hiệu năng, chất lượng ảnh và khả năng quay video của flagship Sony mới nhất. So sánh với A7R V và đối thủ Canon R5.',
    image: products[0].image,
    category: 'Đánh giá',
    author: 'Nguyễn Minh Khoa',
    date: '10/07/2026',
    readTime: '8 phút đọc',
    relatedSlugs: ['may-anh'],
  },
  {
    id: 2,
    title: 'Hướng dẫn chọn ống kính cho người mới bắt đầu',
    excerpt: 'Từ prime đến zoom, từ 35mm đến 70-200mm — cách chọn ống kính phù hợp với phong cách chụp và ngân sách của bạn.',
    image: products[25].image,
    category: 'Hướng dẫn',
    author: 'Trần Hà Linh',
    date: '08/07/2026',
    readTime: '12 phút đọc',
    relatedSlugs: ['ong-kinh'],
  },
  {
    id: 3,
    title: 'So sánh DJI Mavic 4 Pro vs Mavic 3 Pro: Có nên nâng cấp?',
    excerpt: 'Phân tích 7 điểm khác biệt chính giữa 2 thế hệ flycam flagship. Camera 4/3 CMOS 50MP có thực sự vượt trội?',
    image: products[32].image,
    category: 'So sánh',
    author: 'Lê Quang Đức',
    date: '05/07/2026',
    readTime: '10 phút đọc',
    relatedSlugs: ['flycam'],
  },
  {
    id: 4,
    title: 'Top 10 máy ảnh mirrorless đáng mua nhất 2026',
    excerpt: 'Cập nhật danh sách máy ảnh mirrorless tốt nhất theo từng phân khúc giá — từ entry-level đến chuyên nghiệp.',
    image: products[4].image,
    category: 'Top List',
    author: 'Nguyễn Minh Khoa',
    date: '01/07/2026',
    readTime: '15 phút đọc',
    relatedSlugs: ['may-anh'],
  },
  {
    id: 5,
    title: 'Kinh nghiệm chụp ảnh đêm với máy ảnh full-frame',
    excerpt: 'Bí quyết cài đặt ISO, khẩu độ và tốc độ màn trập để có bức ảnh đêm sắc nét, ít noise nhất.',
    image: products[11].image,
    category: 'Kỹ thuật',
    author: 'Phạm Thị Mai',
    date: '28/06/2026',
    readTime: '7 phút đọc',
    relatedSlugs: ['may-anh'],
  },
  {
    id: 6,
    title: 'Trải nghiệm GoPro HERO 13 Black: Có đáng để dân phượt lên đời?',
    excerpt: 'Test thực tế khả năng quay 5.3K/60fps, HyperSmooth 6.0 và thời lượng pin trong các điều kiện khắc nghiệt.',
    image: products[37].image,
    category: 'Đánh giá',
    author: 'Hoàng Nam',
    date: '25/06/2026',
    readTime: '9 phút đọc',
    relatedSlugs: ['action-cam'],
  },
];

// Helper: lấy bài viết liên quan theo category slug
export const getRelatedPosts = (categorySlug?: string, limit = 3): BlogPost[] => {
  if (!categorySlug) return blogPosts.slice(0, limit);
  const matched = blogPosts.filter(p => p.relatedSlugs?.includes(categorySlug));
  return (matched.length > 0 ? matched : blogPosts).slice(0, limit);
};