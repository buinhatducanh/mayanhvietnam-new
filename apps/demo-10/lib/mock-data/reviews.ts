import type { Review } from './types';

export const reviews: Review[] = [
  { id: 'r1', authorName: 'Dũng',  rating: 5, comment: 'Canon R50 quá tuyệt! Ảnh sắc nét, autofocus chính xác, phù hợp cho người mới bắt đầu.', productPurchased: 'Canon EOS R50', date: '2026-06-20', verified: true },
  { id: 'r2', authorName: 'Minh',  rating: 5, comment: 'DJI Mini 4 Pro bay siêu ổn, camera HDR đẹp ngoài mong đợi. Giao hàng nhanh!', productPurchased: 'DJI Mini 4 Pro', date: '2026-06-15', verified: true },
  { id: 'r3', authorName: 'Thanh', rating: 4, comment: 'Sony A7IV body rất nhẹ so với thế hệ trước. AF Eye-tracking cực đỉnh.', productPurchased: 'Sony A7 IV', date: '2026-06-10', verified: true },
  { id: 'r4', authorName: 'Hương', rating: 5, comment: 'Lắp phòng studio ở shop rất chuyên nghiệp. Setup đèn + background đẹp mê.', productPurchased: 'Dịch vụ lắp phông', date: '2026-05-28', verified: true },
  { id: 'r5', authorName: 'Tuấn',  rating: 4, comment: 'GoPro HERO13 chống rung đỉnh cao, quay-underwater rất ổn. Shop tư vấn nhiệt tình.', productPurchased: 'GoPro HERO13', date: '2026-05-15', verified: true },
];
