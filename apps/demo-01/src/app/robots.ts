import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/dat-hang-thanh-cong', '/dang-nhap', '/tai-khoan'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/', '/admin/', '/dat-hang-thanh-cong', '/dang-nhap', '/tai-khoan'],
      },
    ],
    sitemap: 'https://mayanhvietnam.com/sitemap.xml',
  };
}
