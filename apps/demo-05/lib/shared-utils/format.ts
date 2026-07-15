/**
 * Format VND price theo chuẩn Việt Nam: 12.990.000₫
 */
export function formatVND(price: number): string {
  if (!price && price !== 0) return 'Liên hệ';
  return new Intl.NumberFormat('vi-VN').format(price) + '₫';
}

/**
 * Format số điện thoại VN: 0937.148.222
 */
export function formatPhone(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 10) {
    return `${digits.slice(0, 4)}.${digits.slice(4, 7)}.${digits.slice(7)}`;
  }
  return phone;
}

/**
 * Tính phần trăm giảm giá
 */
export function calcDiscountPercent(current: number, original?: number): number {
  if (!original || original <= current) return 0;
  return Math.round(((original - current) / original) * 100);
}

/**
 * Tính giá trả góp: trả góp 0% qua thẻ tín dụng
 * monthly = price / months
 */
export function calcInstallment(price: number, months = 12): number {
  return Math.round(price / months);
}
