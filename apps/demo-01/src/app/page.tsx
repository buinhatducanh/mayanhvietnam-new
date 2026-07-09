import { HeroPedestal } from '@/components/home/hero-pedestal';
import { BrandTicker } from '@/components/home/brand-ticker';
import { TrustStrip } from '@/components/home/trust-strip';
import { FlashSale } from '@/components/home/flash-sale';
import { FeaturedProducts } from '@/components/home/featured-products';
import { TopCategorySection } from '@/components/home/top-category-section';
import { BrandShowcase } from '@/components/home/brand-showcase';
import { ReviewsVideo } from '@/components/home/reviews-video';
import { Testimonials } from '@/components/home/testimonials';
import { HomepageSchema } from '@/components/seo/homepage-schema';

export default function HomePage() {
  return (
    <>
      <HomepageSchema />
      <HeroPedestal />
      <BrandTicker />
      <TrustStrip />
      <FlashSale />
      <FeaturedProducts />

      <TopCategorySection
        id="may-anh"
        sectionNum="01"
        title="MÁY ẢNH"
        subtitle="Mirrorless & DSLR — Sản phẩm mới & bán chạy"
        catLink="/danh-muc/may-anh"
        category="may-anh"
      />

      <TopCategorySection
        id="ong-kinh"
        sectionNum="02"
        title="ỐNG KÍNH"
        subtitle="Canon RF · Sony FE · Nikon Z · Sigma Art"
        catLink="/danh-muc/ong-kinh"
        category="ong-kinh"
      />

      <TopCategorySection
        id="flycam"
        sectionNum="03"
        title="FLYCAM"
        subtitle="DJI Mavic · Mini · Air · FPV"
        catLink="/danh-muc/flycam"
        category="flycam"
      />

      <TopCategorySection
        id="action-cam"
        sectionNum="04"
        title="ACTION CAMERA"
        subtitle="GoPro HERO · DJI Action · Insta360"
        catLink="/danh-muc/action-camera"
        category="action-camera"
      />

      <BrandShowcase />
      <ReviewsVideo />
      <Testimonials />
    </>
  );
}
