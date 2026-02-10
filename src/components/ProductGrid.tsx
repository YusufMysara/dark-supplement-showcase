import ProductCard from "./ProductCard";
import productProtein from "@/assets/product-protein.jpg";
import productPreworkout from "@/assets/product-preworkout.jpg";
import productBcaa from "@/assets/product-bcaa.jpg";
import productCreatine from "@/assets/product-creatine.jpg";
import productVitamins from "@/assets/product-vitamins.jpg";
import productOmega from "@/assets/product-omega.jpg";

const products = [
  { name: "Whey Isolate Pro", category: "Protein", price: "$54.99", image: productProtein, badge: "Best Seller" },
  { name: "Ignite Pre-Workout", category: "Pre-Workout", price: "$39.99", image: productPreworkout, badge: "New" },
  { name: "BCAA Recovery", category: "Amino Acids", price: "$29.99", image: productBcaa },
  { name: "Creatine Monohydrate", category: "Performance", price: "$24.99", image: productCreatine },
  { name: "Daily Multivitamin", category: "Vitamins", price: "$19.99", image: productVitamins },
  { name: "Omega-3 Fish Oil", category: "Health", price: "$22.99", image: productOmega },
];

const ProductGrid = () => {
  return (
    <section id="products" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="mb-2 text-center font-display text-3xl font-bold text-foreground md:text-4xl">
          Featured <span className="text-primary">Products</span>
        </h2>
        <p className="mb-12 text-center font-body text-muted-foreground">
          Trusted by thousands of athletes worldwide
        </p>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.name} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
