import { Metadata } from 'next';
import { ProductLandingHero } from '@/components/landing/product-landing-hero';
import { TrustSignalsBar } from '@/components/landing/trust-signals-bar';
import { LensCarousel } from '@/components/landing/lens-carousel';
import { LandingNav } from '@/components/landing/landing-nav';
import './landing.css';

export const metadata: Metadata = {
  title: 'Canon EOS R6 Mark II — Camera Store | Máy Ảnh Việt Nam',
  description: 'Hiệu suất định cao. Sáng tạo không giới hạn. Canon EOS R6 Mark II - Full-frame 24.2MP, 8K Video, AI Focus, Wi-Fi 6.',
};

export default function ProductLandingPage() {
  return (
    <div className="landing-page">
      <LandingNav />
      <ProductLandingHero />
      <div className="landing-bottom-bar">
        <TrustSignalsBar />
        <LensCarousel />
      </div>
    </div>
  );
}
