/**
 * Dynamic OG Image — 1200×630
 * Next.js App Router tự sinh PNG từ code, không cần file tĩnh trong public/
 * Dùng ImageResponse từ next/og — render HTML/CSS thành ảnh
 */
import { ImageResponse } from 'next/og';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0a0a0f',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'Arial, Helvetica, sans-serif',
        }}
      >
        {/* Logo badge */}
        <div
          style={{
            background: '#FF6B35',
            width: 72,
            height: 72,
            borderRadius: 14,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 28,
          }}
        >
          <span
            style={{
              color: '#fff',
              fontSize: 40,
              fontWeight: 800,
            }}
          >
            M
          </span>
        </div>
        {/* Brand */}
        <div
          style={{
            color: '#f0ebe3',
            fontSize: 52,
            fontWeight: 800,
            letterSpacing: -1,
            marginBottom: 10,
          }}
        >
          Máy Ảnh Việt Nam
        </div>
        {/* Tagline */}
        <div
          style={{
            color: '#6b6478',
            fontSize: 24,
            fontWeight: 400,
            marginBottom: 32,
          }}
        >
          Máy ảnh · ống kính · flycam chính hãng
        </div>
        {/* Accent line */}
        <div
          style={{
            width: 120,
            height: 4,
            background: '#FF6B35',
            borderRadius: 4,
          }}
        />
      </div>
    ),
    { ...size }
  );
}
