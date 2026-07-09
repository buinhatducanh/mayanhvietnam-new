/**
 * SEO Metadata Helper — Tier 1.2
 *
 * Hỗ trợ tạo metadata chuẩn SEO cho static pages.
 * Đảm bảo canonical, OG image, robots luôn đồng bộ.
 */

import type { Metadata } from 'next';

export const SITE_URL = 'https://mayanhvietnam.com';
export const BRAND = 'Máy Ảnh Việt Nam';
export const OG_DEFAULT_IMAGE = '/opengraph-image';

const DEFAULT_KEYWORDS = [
  'máy ảnh',
  'mua máy ảnh',
  'máy ảnh chính hãng',
  'ống kính',
  'flycam',
  'máy ảnh mirrorless',
  'thu cũ đổi mới',
  'trả góp máy ảnh',
  'máy ảnh Việt Nam',
];

interface BuildPageMetadataOptions {
  /** Absolute path, e.g. '/chinh-sach-bao-hanh'. Không bao gồm domain. */
  path: string;
  /** Title riêng của trang (không bao gồm brand suffix). */
  title: string;
  /** Meta description, 140–160 chars tối ưu. */
  description: string;
  /** Custom keywords (mặc định: các từ khóa chính của brand). */
  keywords?: string[];
  /** Đường dẫn ảnh OG (relative hoặc absolute). Mặc định: OG_DEFAULT_IMAGE */
  ogImage?: string;
  /** Có index page này không? Mặc định: true */
  indexable?: boolean;
  /** OG type. Mặc định: 'website' */
  ogType?: 'website' | 'article';
}

export function buildPageMetadata({
  path,
  title,
  description,
  keywords = DEFAULT_KEYWORDS,
  ogImage = OG_DEFAULT_IMAGE,
  indexable = true,
  ogType = 'website',
}: BuildPageMetadataOptions): Metadata {
  const canonicalUrl = `${SITE_URL}${path}`;
  const isAbsoluteImage = ogImage.startsWith('http');
  const fullImage = isAbsoluteImage ? ogImage : `${SITE_URL}${ogImage}`;

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: ogType,
      locale: 'vi_VN',
      url: canonicalUrl,
      title: `${title} | ${BRAND}`,
      description,
      images: [
        {
          url: fullImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${BRAND}`,
      description,
      images: [fullImage],
    },
    robots: indexable
      ? {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-snippet': -1,
          },
        }
      : {
          index: false,
          follow: false,
        },
  };
}

/** Append canonical base URL. Hữu ích cho dynamic routes. */
export function absoluteUrl(path: string): string {
  if (path.startsWith('http')) return path;
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}
