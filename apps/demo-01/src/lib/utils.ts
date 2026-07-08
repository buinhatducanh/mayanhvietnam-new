import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combine class names with Tailwind merge to dedupe conflicting utilities.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Re-export shared utilities — keeps existing @/lib/utils imports working
export { formatVND, formatPhone, calcDiscountPercent, calcInstallment } from '@mayanhvietnam/shared-utils';
export { slugify } from '@mayanhvietnam/shared-utils';
