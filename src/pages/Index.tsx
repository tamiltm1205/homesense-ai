import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturedProperties from "@/components/FeaturedProperties";
import MapSearch from "@/components/MapSearch";
import AIFeatures from "@/components/AIFeatures";
import EMICalculator from "@/components/EMICalculator";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import AIChatbot from "@/components/AIChatbot";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <FeaturedProperties />
      <MapSearch />
      <AIFeatures />
      <EMICalculator />
      <Testimonials />
      <Footer />
      <AIChatbot />
    </div>
  );
};

export default Index;
