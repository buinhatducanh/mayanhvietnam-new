/**
 * Dynamic apple-touch-icon generator — 180×180
 */
import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#FF6B35',
          color: 'white',
          fontSize: 100,
          fontWeight: 800,
          fontFamily: 'Arial, sans-serif',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 20,
        }}
      >
        M
      </div>
    ),
    { ...size }
  );
}
