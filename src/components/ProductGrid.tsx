import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useProducts } from "@/hooks/useProducts";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslation } from "react-i18next";

const ProductGrid = () => {
  const { ref, isVisible } = useScrollReveal();
  const { data: products, isLoading, error } = useProducts();
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <section id="products" className="py-20" ref={ref}>
        <div className="container mx-auto px-4">
          <div className={`transition-all duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
            <h2 className="mb-2 text-center font-display text-3xl font-bold text-foreground md:text-4xl">
              {t("products.featuredTitle")} <span className="text-primary">{t("products.featuredHighlight")}</span>
            </h2>
            <p className="mb-12 text-center font-body text-muted-foreground">{t("products.featuredSubtitle")}</p>
          </div>
          <div className="grid grid-cols-2 gap-3 md:gap-6 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className={`transition-all ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`} style={{ transitionDelay: `${i * 100 + 200}ms`, transitionDuration: "500ms" }}>
                <Skeleton className="h-[250px] md:h-[300px] w-full rounded-lg" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="products" className="py-20" ref={ref}>
        <div className="container mx-auto px-4">
          <div className="text-center text-destructive">{t("footer.errorLoading")}</div>
        </div>
      </section>
    );
  }

  return (
    <section id="products" className="py-12 md:py-20" ref={ref}>
      <div className="container mx-auto px-3 md:px-4">
        <div className={`transition-all duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
          <h2 className="mb-2 text-center font-display text-xl md:text-3xl lg:text-4xl font-bold text-foreground">
            {t("products.featuredTitle")} <span className="text-primary">{t("products.featuredHighlight")}</span>
          </h2>
          <p className="mb-8 md:mb-12 text-center font-body text-xs md:text-sm text-muted-foreground">{t("products.featuredSubtitle")}</p>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3">
          {products?.slice(0, 6).map((product, i) => (
            <div key={product.id} className={`transition-all ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`} style={{ transitionDelay: `${i * 100 + 200}ms`, transitionDuration: "500ms" }}>
              <Link to={`/products/${product.id}`} className="block h-full">
                <ProductCard {...product} />
              </Link>
            </div>
          ))}
        </div>
        <div className="mt-8 md:mt-12 text-center">
          <Link to="/products" className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2 md:px-8 md:py-3 font-display text-xs md:text-sm font-bold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25">
            {t("products.viewAll")}
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 md:h-5 md:w-5">
              <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
