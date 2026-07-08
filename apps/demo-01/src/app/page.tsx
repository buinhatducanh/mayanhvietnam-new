import { HeroPedestal } from '@/components/home/hero-pedestal';
import { TrustStrip } from '@/components/home/trust-strip';
import { FeaturedProducts } from '@/components/home/featured-products';

export default function HomePage() {
  return (
    <>
      <HeroPedestal />
      <TrustStrip />
      <FeaturedProducts />
    </>
  );
}