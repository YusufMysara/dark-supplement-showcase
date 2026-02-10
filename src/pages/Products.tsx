import { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, SlidersHorizontal, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import productProtein from "@/assets/product-protein.jpg";
import productPreworkout from "@/assets/product-preworkout.jpg";
import productBcaa from "@/assets/product-bcaa.jpg";
import productCreatine from "@/assets/product-creatine.jpg";
import productVitamins from "@/assets/product-vitamins.jpg";
import productOmega from "@/assets/product-omega.jpg";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  onSale: boolean;
}

const allProducts: Product[] = [
  { id: 1, name: "Whey Isolate Pro", category: "Whey Protein", price: 54.99, image: productProtein, rating: 4.8, reviews: 342, inStock: true, onSale: false },
  { id: 2, name: "Ignite Pre-Workout", category: "Amino", price: 29.99, originalPrice: 39.99, image: productPreworkout, rating: 4.6, reviews: 218, inStock: true, onSale: true },
  { id: 3, name: "BCAA Recovery", category: "Amino", price: 29.99, image: productBcaa, rating: 4.5, reviews: 156, inStock: true, onSale: false },
  { id: 4, name: "Creatine Monohydrate", category: "Creatine", price: 24.99, image: productCreatine, rating: 4.9, reviews: 487, inStock: true, onSale: false },
  { id: 5, name: "Daily Multivitamin", category: "Multivitamin", price: 14.99, originalPrice: 19.99, image: productVitamins, rating: 4.3, reviews: 89, inStock: true, onSale: true },
  { id: 6, name: "Omega-3 Fish Oil", category: "Multivitamin", price: 22.99, image: productOmega, rating: 4.4, reviews: 134, inStock: false, onSale: false },
  { id: 7, name: "Mass Gainer Elite", category: "Whey Protein", price: 64.99, image: productProtein, rating: 4.2, reviews: 76, inStock: true, onSale: false },
  { id: 8, name: "Creatine HCL", category: "Creatine", price: 34.99, originalPrice: 44.99, image: productCreatine, rating: 4.7, reviews: 203, inStock: true, onSale: true },
  { id: 9, name: "Performance Shorts", category: "Shorts", price: 39.99, image: productBcaa, rating: 4.1, reviews: 45, inStock: true, onSale: false },
  { id: 10, name: "Training Tee", category: "Shirts", price: 29.99, originalPrice: 34.99, image: productPreworkout, rating: 4.0, reviews: 62, inStock: false, onSale: true },
  { id: 11, name: "Amino Energy+", category: "Amino", price: 27.99, image: productBcaa, rating: 4.6, reviews: 178, inStock: true, onSale: false },
  { id: 12, name: "Casein Protein", category: "Whey Protein", price: 49.99, image: productOmega, rating: 4.5, reviews: 112, inStock: true, onSale: false },
];

const categories = ["Creatine", "Whey Protein", "Amino", "Multivitamin", "Shorts", "Shirts"];

const StarRating = ({ rating, reviews }: { rating: number; reviews: number }) => (
  <div className="flex items-center gap-1.5">
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-3.5 w-3.5 ${
            star <= Math.round(rating)
              ? "fill-amber-400 text-amber-400"
              : "fill-muted text-muted"
          }`}
        />
      ))}
    </div>
    <span className="font-body text-xs text-muted-foreground">({reviews})</span>
  </div>
);

const PopularProductItem = ({ product }: { product: Product }) => (
  <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-2 transition-colors hover:border-primary/30">
    <img src={product.image} alt={product.name} className="h-14 w-14 rounded-md object-cover" />
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-1.5">
        <p className="truncate font-display text-sm font-semibold text-foreground">{product.name}</p>
        {product.onSale && (
          <Badge className="shrink-0 bg-red-500 px-1.5 py-0 text-[10px] hover:bg-red-600">SALE</Badge>
        )}
      </div>
      <p className="font-body text-sm font-bold text-primary">${product.price.toFixed(2)}</p>
    </div>
  </div>
);

const FilterSidebar = ({
  availability,
  setAvailability,
  priceRange,
  setPriceRange,
  selectedCategories,
  toggleCategory,
  popularProducts,
}: {
  availability: { inStock: boolean; outOfStock: boolean };
  setAvailability: React.Dispatch<React.SetStateAction<{ inStock: boolean; outOfStock: boolean }>>;
  priceRange: number[];
  setPriceRange: (v: number[]) => void;
  selectedCategories: string[];
  toggleCategory: (cat: string) => void;
  popularProducts: Product[];
}) => (
  <div className="space-y-8">
    {/* Availability */}
    <div>
      <h3 className="mb-4 font-display text-sm font-bold uppercase tracking-wider text-foreground">Availability</h3>
      <div className="space-y-3">
        <label className="flex cursor-pointer items-center gap-3 font-body text-sm text-muted-foreground hover:text-foreground">
          <Checkbox
            checked={availability.inStock}
            onCheckedChange={(c) => setAvailability((prev) => ({ ...prev, inStock: !!c }))}
          />
          In Stock
        </label>
        <label className="flex cursor-pointer items-center gap-3 font-body text-sm text-muted-foreground hover:text-foreground">
          <Checkbox
            checked={availability.outOfStock}
            onCheckedChange={(c) => setAvailability((prev) => ({ ...prev, outOfStock: !!c }))}
          />
          Out of Stock
        </label>
      </div>
    </div>

    {/* Price */}
    <div>
      <h3 className="mb-4 font-display text-sm font-bold uppercase tracking-wider text-foreground">Price</h3>
      <Slider
        min={0}
        max={99}
        step={1}
        value={priceRange}
        onValueChange={setPriceRange}
        className="mb-3"
      />
      <div className="flex items-center justify-between font-body text-sm text-muted-foreground">
        <span>${priceRange[0]}</span>
        <span>${priceRange[1]}</span>
      </div>
    </div>

    {/* Categories */}
    <div>
      <h3 className="mb-4 font-display text-sm font-bold uppercase tracking-wider text-foreground">Category</h3>
      <div className="space-y-3">
        {categories.map((cat) => (
          <label key={cat} className="flex cursor-pointer items-center gap-3 font-body text-sm text-muted-foreground hover:text-foreground">
            <Checkbox
              checked={selectedCategories.includes(cat)}
              onCheckedChange={() => toggleCategory(cat)}
            />
            {cat}
          </label>
        ))}
      </div>
    </div>

    {/* Popular Products */}
    <div>
      <h3 className="mb-4 font-display text-sm font-bold uppercase tracking-wider text-foreground">Popular Products</h3>
      <div className="space-y-2">
        {popularProducts.map((p) => (
          <PopularProductItem key={p.id} product={p} />
        ))}
      </div>
    </div>
  </div>
);

const ProductCard = ({ product }: { product: Product }) => (
  <div className="group relative overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5">
    {product.onSale && (
      <Badge className="absolute left-3 top-3 z-10 bg-red-500 font-display text-[10px] font-bold uppercase tracking-wider hover:bg-red-600">
        Sale
      </Badge>
    )}
    {!product.inStock && (
      <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/60 backdrop-blur-[2px]">
        <span className="rounded-md bg-muted px-4 py-1.5 font-display text-xs font-bold uppercase tracking-wider text-muted-foreground">
          Out of Stock
        </span>
      </div>
    )}
    <div className="flex aspect-square items-center justify-center overflow-hidden bg-secondary p-6">
      <img
        src={product.image}
        alt={product.name}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
    </div>
    <div className="p-4">
      <h3 className="mb-1 font-display text-base font-bold text-foreground">{product.name}</h3>
      <StarRating rating={product.rating} reviews={product.reviews} />
      <div className="mt-2 flex items-center gap-2">
        <span className="font-display text-lg font-bold text-primary">${product.price.toFixed(2)}</span>
        {product.originalPrice && (
          <span className="font-body text-sm text-muted-foreground line-through">
            ${product.originalPrice.toFixed(2)}
          </span>
        )}
      </div>
    </div>
  </div>
);

const Products = () => {
  const [availability, setAvailability] = useState({ inStock: true, outOfStock: true });
  const [priceRange, setPriceRange] = useState([0, 99]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("featured");

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const popularProducts = allProducts.filter((p) => p.reviews > 150).slice(0, 4);

  const filtered = useMemo(() => {
    let result = allProducts.filter((p) => {
      if (!availability.inStock && p.inStock) return false;
      if (!availability.outOfStock && !p.inStock) return false;
      if (p.price < priceRange[0] || p.price > priceRange[1]) return false;
      if (selectedCategories.length > 0 && !selectedCategories.includes(p.category)) return false;
      return true;
    });

    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "reviews":
        result.sort((a, b) => b.reviews - a.reviews);
        break;
    }
    return result;
  }, [availability, priceRange, selectedCategories, sortBy]);

  const sidebarProps = { availability, setAvailability, priceRange, setPriceRange, selectedCategories, toggleCategory, popularProducts };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-16">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="font-display text-4xl font-bold tracking-wide text-foreground md:text-5xl">
            ALL <span className="text-primary">ITEMS</span>
          </h1>
        </div>

        {/* Results bar */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {/* Mobile filter trigger */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="lg:hidden">
                  <SlidersHorizontal className="mr-2 h-4 w-4" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 overflow-y-auto bg-background">
                <div className="pt-6">
                  <FilterSidebar {...sidebarProps} />
                </div>
              </SheetContent>
            </Sheet>
            <p className="font-body text-sm text-muted-foreground">
              Showing <span className="font-semibold text-foreground">{filtered.length}</span> Results
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-body text-sm text-muted-foreground">Sort by:</span>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40 bg-card">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-popover">
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Top Rated</SelectItem>
                <SelectItem value="reviews">Most Reviewed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Active filters */}
        {selectedCategories.length > 0 && (
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <span className="font-body text-xs text-muted-foreground">Active filters:</span>
            {selectedCategories.map((cat) => (
              <Badge
                key={cat}
                variant="secondary"
                className="cursor-pointer gap-1 font-body text-xs"
                onClick={() => toggleCategory(cat)}
              >
                {cat}
                <X className="h-3 w-3" />
              </Badge>
            ))}
            <button
              onClick={() => setSelectedCategories([])}
              className="font-body text-xs text-primary underline-offset-2 hover:underline"
            >
              Clear all
            </button>
          </div>
        )}

        {/* Content */}
        <div className="flex gap-8">
          {/* Desktop sidebar */}
          <aside className="hidden w-64 shrink-0 lg:block">
            <FilterSidebar {...sidebarProps} />
          </aside>

          {/* Product grid */}
          <div className="flex-1">
            {filtered.length === 0 ? (
              <div className="flex min-h-[300px] flex-col items-center justify-center rounded-xl border border-border bg-card p-8 text-center">
                <p className="mb-2 font-display text-xl font-bold text-foreground">No products found</p>
                <p className="font-body text-sm text-muted-foreground">Try adjusting your filters</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Products;
