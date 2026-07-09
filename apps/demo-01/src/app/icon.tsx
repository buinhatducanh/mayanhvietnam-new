/**
 * Dynamic favicon generator — Next.js App Router
 * Tự động tạo favicon.png size 32×32 từ code, không cần file tĩnh trong public/
 */
import { ImageResponse } from 'next/og';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#FF6B35',
          color: 'white',
          fontSize: 20,
          fontWeight: 800,
          fontFamily: 'Arial, sans-serif',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 6,
        }}
      >
        M
      </div>
    ),
    { ...size }
  );
}
