import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/dat-hang-thanh-cong',
          '/dang-nhap',
          '/tai-khoan',
          '/gio-hang',
          '/don-dat-hang',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/dat-hang-thanh-cong',
          '/dang-nhap',
          '/tai-khoan',
          '/gio-hang',
          '/don-dat-hang',
        ],
      },
      // Block các crawlers không mong muốn
      {
        userAgent: 'AhrefsBot',
        disallow: '/',
      },
      {
        userAgent: 'SemrushBot',
        disallow: '/',
      },
    ],
    sitemap: [
      'https://mayanhvietnam.com/sitemap.xml',
    ],
    host: 'https://mayanhvietnam.com',
  };
}
