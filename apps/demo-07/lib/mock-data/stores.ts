import type { StoreInfo } from './types';

/**
 * Store locations — verified against:
 *   scraped/homepage.json → footer.store_locations
 *   scraped/policy-warranty.md → III. THÔNG TIN LIÊN HỆ
 */
export const stores: StoreInfo[] = [
  { id: 'st1', name: 'Máy Ảnh Việt Nam TP.HCM',           address: 'Số 9, Nam Quốc Cang, Phường Bến Thành, TP Hồ Chí Minh',                              phone: '0937.148.222', hours: '09:00 – 19:00 mỗi ngày', city: 'TP.HCM' },
  { id: 'st2', name: 'Máy Ảnh Việt Nam Cần Thơ',          address: 'Số 58 Nguyễn Hiền, Khu Dân Cư 91B, Phường Tân An, TP. Cần Thơ',                      phone: '0937.148.222', hours: '08:00 – 20:00 mỗi ngày', city: 'Cần Thơ' },
  { id: 'st3', name: 'Máy Ảnh Việt Nam An Giang',         address: 'Số 1, Đường số 1, Khu Tây sông Hậu, Phường Long Xuyên, Tỉnh An Giang',               phone: '0937.148.222', hours: '08:00 – 17:30 mỗi ngày', city: 'An Giang' },
  { id: 'st4', name: 'Máy Ảnh Việt Nam Đồng Tháp',       address: 'Số 126, Hoàng Sa, Khu phố 4, Phường Thới Sơn, Tỉnh Đồng Tháp (TP. Mỹ Tho, Tiền Giang)', phone: '0937.148.222', hours: '08:00 – 18:00 mỗi ngày', city: 'Đồng Tháp / Tiền Giang' },
];
