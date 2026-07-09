import StoreHeader from "@/components/store/StoreHeader";
import HeroBanner from "@/components/store/HeroBanner";
import GraphicNavigation from "@/components/store/GraphicNavigation";
import ProductGrid from "@/components/store/ProductGrid";
import TrustBar from "@/components/store/TrustBar";
import ShopByInterest from "@/components/store/ShopByInterest";
import ReviewVideos from "@/components/store/ReviewVideos";
import AccessoriesSection from "@/components/store/AccessoriesSection";
import StoreFooter from "@/components/store/StoreFooter";

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
        <ReviewVideos />
        <AccessoriesSection />
      </main>
      <StoreFooter />
    </>
  );
}