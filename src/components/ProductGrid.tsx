import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useProducts } from "@/hooks/useProducts";
import { Skeleton } from "@/components/ui/skeleton";

const ProductGrid = () => {
  const { ref, isVisible } = useScrollReveal();
  const { data: products, isLoading, error } = useProducts();

  if (isLoading) {
    return (
      <section id="products" className="py-20" ref={ref}>
        <div className="container mx-auto px-4">
          <div
            className={`transition-all duration-700 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <h2 className="mb-2 text-center font-display text-3xl font-bold text-foreground md:text-4xl">
              Featured <span className="text-primary">Products</span>
            </h2>
            <p className="mb-12 text-center font-body text-muted-foreground">
              Trusted by thousands of athletes worldwide
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className={`transition-all ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                }`}
                style={{ transitionDelay: `${i * 100 + 200}ms`, transitionDuration: "500ms" }}
              >
                <Skeleton className="h-[300px] w-full rounded-lg" />
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
          <div className="text-center text-red-500">
            Error loading products. Please try again later.
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="products" className="py-20" ref={ref}>
      <div className="container mx-auto px-4">
        <div
          className={`transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <h2 className="mb-2 text-center font-display text-3xl font-bold text-foreground md:text-4xl">
            Featured <span className="text-primary">Products</span>
          </h2>
          <p className="mb-12 text-center font-body text-muted-foreground">
            Trusted by thousands of athletes worldwide
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products?.slice(0, 6).map((product, i) => (
            <div
              key={product.id}
              className={`transition-all ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: `${i * 100 + 200}ms`, transitionDuration: "500ms" }}
            >
              <Link to={`/products/${product.id}`} className="block h-full">
                <ProductCard {...product} />
              </Link>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3 font-display font-bold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25"
          >
            View All Products
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14"/>
              <path d="m12 5 7 7-7 7"/>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
