import StoreHeader from '@/components/store/StoreHeader';
import HeroBanner from '@/components/store/HeroBanner';
import GraphicNavigation from '@/components/store/GraphicNavigation';
import TrustBar from '@/components/store/TrustBar';
import ProductGrid from '@/components/store/ProductGrid';
import ShopByInterest from '@/components/store/ShopByInterest';
import CommunityGallery from '@/components/store/CommunityGallery';
import AccessoriesSection from '@/components/store/AccessoriesSection';
import StoreFooter from '@/components/store/StoreFooter';

export default function Home() {
  return (
    <>
      <StoreHeader />
      <main>
        <HeroBanner />
        <GraphicNavigation />
        <TrustBar />
        <ProductGrid />
        <ShopByInterest />
        <CommunityGallery />
        <AccessoriesSection />
      </main>
      <StoreFooter />
    </>
  );
}
