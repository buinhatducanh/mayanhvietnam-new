import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import CategorySection from '../components/CategorySection';
import FeaturedProducts from '../components/FeaturedProducts';
import InspirationGallery from '../components/InspirationGallery';
import PromoSection from '../components/PromoSection';
import BrandSection from '../components/BrandSection';
import WhyUs from '../components/WhyUs';
import GearQuiz from '../components/GearQuiz';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <CategorySection />
        <FeaturedProducts />
        <InspirationGallery />
        <PromoSection />
        <BrandSection />
        <WhyUs />
        <GearQuiz />
        <Testimonials />
      </main>
      <Footer />
    </>
  );
}
