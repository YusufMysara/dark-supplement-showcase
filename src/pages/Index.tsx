import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import ProductGrid from "@/components/ProductGrid";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const Index = () => {
  return (
    <>
      <SEO 
        title="Home"
        description="Premium performance nutrition for athletes who demand results. Shop the best supplements including protein, creatine, pre-workout, vitamins, and more at Champion Supplement."
      />
      <div className="min-h-screen bg-background">
        <Navbar />
        <Hero />
        <Categories />
        <ProductGrid />
        <Footer />
      </div>
    </>
  );
};

export default Index;
