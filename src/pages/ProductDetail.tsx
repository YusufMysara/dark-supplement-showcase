import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useProduct } from "@/hooks/useProducts";
import {
  ArrowLeft,
  Package,
  FlaskConical,
  ChartColumnStacked,
  Loader2,
  ShoppingCart,
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useTranslation } from "react-i18next";
import ProductImageCarousel from "@/components/ProductImageCarousel";
import { useCart } from "@/contexts/CartContext";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

const ProductDetail = () => {
  const { id } = useParams();
  const { data: product, isLoading } = useProduct(id);
  const { t } = useTranslation();
  const { addItem } = useCart();

  const [activeTab, setActiveTab] = useState("ingredients");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [added, setAdded] = useState(false);

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, -50]);

  // Scroll Progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll Spy
  useEffect(() => {
    const sections = ["ingredients", "nutrition", "details", "warnings"];

    const handleScroll = () => {
      let current = "ingredients";
      sections.forEach((section) => {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150) current = section;
        }
      });
      setActiveTab(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAddToCart = () => {
    if (!product) return;
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 500);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto flex min-h-[60vh] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) return null;

  return (
    <>
      <SEO title={product.name} description={product.description} image={product.image} />

      <div className="min-h-screen bg-background">

        {/* Scroll Progress */}
        <div
          className="fixed top-0 left-0 h-1 bg-primary z-[9999] transition-all duration-200"
          style={{ width: `${scrollProgress}%` }}
        />

        <Navbar />

        <motion.main
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="container mx-auto px-4 pb-20"
        >

          {/* Top Section */}
          <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-2">

            {/* Parallax Image */}
            <motion.div
              style={{ y }}
              className="rounded-2xl border border-border bg-white overflow-hidden"
            >
              <ProductImageCarousel
                images={product.images}
                fallback={product.image}
                name={product.name}
              />
            </motion.div>

            {/* Product Info */}
            <div className="flex flex-col justify-center">
              <h1 className="mb-4 text-3xl lg:text-4xl font-bold">
                {product.name}
              </h1>

              <span className="text-3xl font-bold text-primary mb-6">
                {product.price.toFixed(2)} EGP
              </span>

              <button
                onClick={handleAddToCart}
                className={`flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-white font-semibold transition transform ${added ? "scale-110 shadow-2xl" : ""
                  } hover:scale-105`}
              >
                <ShoppingCart className="h-5 w-5" />
                {t("cart.addToCart")}
              </button>
            </div>
          </div>

          {/* Sticky Tabs */}
          <div className="mt-20 sticky top-20 z-30 backdrop-blur-xl bg-background/70 border-b border-border py-4">

            <Tabs value={activeTab} className="w-full">
              <TabsList className="flex gap-6 bg-transparent p-0">

                <TabsTrigger
                  value="ingredients"
                  onClick={() =>
                    document.getElementById("ingredients")?.scrollIntoView()
                  }
                  className="font-semibold text-sm"
                >
                  <FlaskConical className="inline h-4 w-4 mr-2" />
                  Directions
                </TabsTrigger>

                {product.nutritionFacts.length > 0 && (
                  <TabsTrigger
                    value="nutrition"
                    onClick={() =>
                      document.getElementById("nutrition")?.scrollIntoView()
                    }
                    className="font-semibold text-sm"
                  >
                    <ChartColumnStacked className="inline h-4 w-4 mr-2" />
                    Nutrition
                  </TabsTrigger>
                )}

                <TabsTrigger
                  value="details"
                  onClick={() =>
                    document.getElementById("details")?.scrollIntoView()
                  }
                  className="font-semibold text-sm"
                >
                  <Package className="inline h-4 w-4 mr-2" />
                  Details
                </TabsTrigger>

                <TabsTrigger
                  value="warnings"
                  onClick={() =>
                    document.getElementById("warnings")?.scrollIntoView()
                  }
                  className="font-semibold text-sm text-yellow-400"
                >
                  ⚠ Warnings
                </TabsTrigger>

              </TabsList>
            </Tabs>
          </div>

          {/* Sections */}

          <section id="ingredients" className="mt-20">
            <h2 className="text-2xl font-bold mb-6">Directions</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {product.ingredients.map((ing, i) => (
                <li key={i} className="flex items-center gap-2 text-sm">
                  <span className="h-2 w-2 rounded-full bg-primary" />
                  {ing}
                </li>
              ))}
            </ul>
          </section>

          {product.nutritionFacts.length > 0 && (
            <section id="nutrition" className="mt-24">
              <h2 className="text-2xl font-bold mb-6">Nutrition Facts</h2>
              <Table>
                <TableBody>
                  {product.nutritionFacts.map((fact, i) => (
                    <TableRow key={i}>
                      <TableCell>{fact.label}</TableCell>
                      <TableCell className="text-right">{fact.value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </section>
          )}

          <section id="details" className="mt-24">
            <h2 className="text-2xl font-bold mb-6">Product Details</h2>
            <p>{product.description}</p>
          </section>

          <section
            id="warnings"
            className="mt-24 rounded-2xl border border-yellow-500/30 bg-yellow-500/5 p-8"
          >
            <h2 className="text-2xl font-bold text-yellow-400 mb-6">
              ⚠ Important Warnings
            </h2>
            <ul className="space-y-3 text-sm">
              <li>Do not exceed recommended dose.</li>
              <li>Not a substitute for balanced diet.</li>
              <li>Consult doctor before use.</li>
              <li>Keep away from children.</li>
            </ul>
          </section>

        </motion.main>

        <Footer />
      </div>
    </>
  );
};

export default ProductDetail;