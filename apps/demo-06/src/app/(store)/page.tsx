import HeroBanner from "@/components/store/HeroBanner";
import GraphicNavigation from "@/components/store/GraphicNavigation";
import ProductGrid from "@/components/store/ProductGrid";
import TrustBar from "@/components/store/TrustBar";
import ShopByInterest from "@/components/store/ShopByInterest";
import ReviewVideos from "@/components/store/ReviewVideos";
import AccessoriesSection from "@/components/store/AccessoriesSection";

export default function Home() {
  return (
    <>
      <HeroBanner />
      <GraphicNavigation />
      <TrustBar />
      <ProductGrid />
      <ShopByInterest />
      <ReviewVideos />
      <AccessoriesSection />
    </>
  );
}
