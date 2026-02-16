import { useState, useMemo, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SlidersHorizontal, X, Loader2, ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useProducts, type Product } from "@/hooks/useProducts";
import { useTranslation } from "react-i18next";

const CATEGORIES = ["Creatine", "Whey Protein", "Amino", "Multivitamin", "Shorts", "Shirts"];
const MAX_PRICE = 5000;

const PopularProductItem = ({ product }: { product: Product }) => (
  <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-2 transition-colors hover:border-primary/30">
    <img src={product.image} alt={product.name} className="h-14 w-14 rounded-md object-cover" />
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-1.5">
        <p className="truncate font-display text-sm font-semibold text-foreground">{product.name}</p>
        {product.onSale && (
          <Badge className="shrink-0 bg-green-500 px-1.5 py-0 text-[10px] hover:bg-green-600">SALE</Badge>
        )}
      </div>
      <p className="font-body text-sm font-bold text-primary">{product.price.toFixed(2)} EGP</p>
    </div>
  </div>
);

const FilterSidebar = ({
  availability, setAvailability, priceRange, setPriceRange, selectedCategories, toggleCategory, popularProducts,
}: {
  availability: { inStock: boolean; outOfStock: boolean };
  setAvailability: React.Dispatch<React.SetStateAction<{ inStock: boolean; outOfStock: boolean }>>;
  priceRange: number[];
  setPriceRange: (v: number[]) => void;
  selectedCategories: string[];
  toggleCategory: (cat: string) => void;
  popularProducts: Product[];
}) => {
  const { t } = useTranslation();
  return (
    <div className="space-y-8">
      <div>
        <h3 className="mb-4 font-display text-sm font-bold uppercase tracking-wider text-foreground">{t("filter.availability")}</h3>
        <div className="space-y-3">
          <label className="flex cursor-pointer items-center gap-3 font-body text-sm text-muted-foreground hover:text-foreground">
            <Checkbox checked={availability.inStock} onCheckedChange={(c) => setAvailability((prev) => ({ ...prev, inStock: !!c }))} />
            {t("filter.inStock")}
          </label>
          <label className="flex cursor-pointer items-center gap-3 font-body text-sm text-muted-foreground hover:text-foreground">
            <Checkbox checked={availability.outOfStock} onCheckedChange={(c) => setAvailability((prev) => ({ ...prev, outOfStock: !!c }))} />
            {t("filter.outOfStock")}
          </label>
        </div>
      </div>
      <div>
        <h3 className="mb-4 font-display text-sm font-bold uppercase tracking-wider text-foreground">{t("filter.price")}</h3>
        <Slider min={0} max={MAX_PRICE} step={10} value={priceRange} onValueChange={setPriceRange} className="mb-3" />
        <div className="flex items-center justify-between font-body text-sm text-muted-foreground">
          <span>{priceRange[0]} EGP</span>
          <span>{priceRange[1]} EGP</span>
        </div>
      </div>
      <div>
        <h3 className="mb-4 font-display text-sm font-bold uppercase tracking-wider text-foreground">{t("filter.category")}</h3>
        <div className="space-y-3">
          {CATEGORIES.map((cat) => (
            <label key={cat} className="flex cursor-pointer items-center gap-3 font-body text-sm text-muted-foreground hover:text-foreground">
              <Checkbox checked={selectedCategories.includes(cat)} onCheckedChange={() => toggleCategory(cat)} />
              {cat}
            </label>
          ))}
        </div>
      </div>
      {popularProducts.length > 0 && (
        <div>
          <h3 className="mb-4 font-display text-sm font-bold uppercase tracking-wider text-foreground">{t("filter.popularProducts")}</h3>
          <div className="space-y-2">
            {popularProducts.map((p) => (<PopularProductItem key={p.id} product={p} />))}
          </div>
        </div>
      )}
    </div>
  );
};

const ProductListCard = ({ product }: { product: Product }) => {
  const { t } = useTranslation();
  const { addItem } = useCart();
  const allImages = product.images && product.images.length > 0 ? product.images : [product.image];
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({ id: product.id, name: product.name, price: product.price, image: allImages[0] });
  };

  const prevSlide = (e: React.MouseEvent) => { e.preventDefault(); e.stopPropagation(); setCurrentIndex((p) => (p === 0 ? allImages.length - 1 : p - 1)); };
  const nextSlide = (e: React.MouseEvent) => { e.preventDefault(); e.stopPropagation(); setCurrentIndex((p) => (p === allImages.length - 1 ? 0 : p + 1)); };

  return (
    <Link to={`/products/${product.id}`} className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5">
      {product.onSale && (
        <Badge className="absolute start-3 top-3 z-10 bg-green-500 font-display text-[10px] font-bold uppercase tracking-wider hover:bg-green-600">{t("products.sale")}</Badge>
      )}
      {!product.inStock && (
        <span className="absolute start-3 top-3 z-10 rounded-sm bg-destructive px-2 py-1 font-display text-[10px] font-bold uppercase tracking-wider text-destructive-foreground">{t("products.outOfStock")}</span>
      )}
      <div className="relative flex aspect-square items-center justify-center overflow-hidden bg-white p-2 sm:p-6">
        <img src={allImages[currentIndex]} alt={product.name} className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105" />
        {allImages.length > 1 && (
          <>
            <button onClick={prevSlide} className="absolute start-2 top-1/2 z-10 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-background/80 text-foreground opacity-0 shadow transition-opacity hover:bg-background group-hover:opacity-100" aria-label="Previous"><ChevronLeft className="h-4 w-4" /></button>
            <button onClick={nextSlide} className="absolute end-2 top-1/2 z-10 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-background/80 text-foreground opacity-0 shadow transition-opacity hover:bg-background group-hover:opacity-100" aria-label="Next"><ChevronRight className="h-4 w-4" /></button>
            <div className="absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
              {allImages.map((_, i) => (<span key={i} className={`h-1.5 w-1.5 rounded-full transition-colors ${i === currentIndex ? "bg-primary" : "bg-foreground/30"}`} />))}
            </div>
          </>
        )}
      </div>
      <div className="flex flex-1 flex-col p-2 sm:p-4">
        <h3 className="mb-1 sm:mb-2 font-display text-sm sm:text-base font-bold text-foreground line-clamp-2">{product.name}</h3>
        <div className="mt-auto flex flex-wrap items-center gap-1 sm:gap-2">
          <span className="font-display text-sm sm:text-lg font-bold text-primary">{product.price.toFixed(2)} EGP</span>
          {product.originalPrice && (
            <span className="font-body text-[10px] sm:text-sm text-muted-foreground line-through">{product.originalPrice.toFixed(2)} EGP</span>
          )}
        </div>
        <button onClick={handleAddToCart} disabled={!product.inStock} className="mt-2 sm:mt-3 flex w-full items-center justify-center gap-1.5 sm:gap-2 rounded-lg bg-primary px-2 sm:px-4 py-1.5 sm:py-2 font-display text-[10px] sm:text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50">
          <ShoppingCart className="h-3.5 w-3.5 sm:h-5 sm:w-5" /> {t("cart.addToCart")}
        </button>
      </div>
    </Link>
  );
};

const Products = () => {
  const { t } = useTranslation();
  const { data: allProducts = [], isLoading } = useProducts();
  const [searchParams] = useSearchParams();
  const [availability, setAvailability] = useState({ inStock: true, outOfStock: true });
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("featured");
  const [priceRange, setPriceRange] = useState<number[]>([0, MAX_PRICE]);

  useEffect(() => {
    const categoryParam = searchParams.get("category");
    if (categoryParam) setSelectedCategories([categoryParam]);
  }, [searchParams]);

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) => prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]);
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
      case "price-low": result.sort((a, b) => a.price - b.price); break;
      case "price-high": result.sort((a, b) => b.price - a.price); break;
    }
    return result;
  }, [allProducts, availability, priceRange, selectedCategories, sortBy]);

  const sidebarProps = { availability, setAvailability, priceRange, setPriceRange, selectedCategories, toggleCategory, popularProducts };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-3 pt-20 pb-12 md:px-4 md:pt-24 md:pb-16">
        <div className="mb-6 text-center md:mb-8">
          <h1 className="font-display text-2xl font-bold tracking-wide text-foreground md:text-4xl lg:text-5xl">
            {t("products.allItems")} <span className="text-primary">{t("products.allItemsHighlight")}</span>
          </h1>
        </div>
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="lg:hidden">
                  <SlidersHorizontal className="me-2 h-4 w-4" /> {t("products.filters")}
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 overflow-y-auto bg-background">
                <div className="pt-6"><FilterSidebar {...sidebarProps} /></div>
              </SheetContent>
            </Sheet>
            <p className="font-body text-sm text-muted-foreground">
              {t("products.showing")} <span className="font-semibold text-foreground">{filtered.length}</span> {t("products.results")}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-body text-sm text-muted-foreground">{t("products.sortBy")}</span>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40 bg-card"><SelectValue /></SelectTrigger>
              <SelectContent className="bg-popover">
                <SelectItem value="featured">{t("products.featured")}</SelectItem>
                <SelectItem value="price-low">{t("products.priceLow")}</SelectItem>
                <SelectItem value="price-high">{t("products.priceHigh")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        {selectedCategories.length > 0 && (
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <span className="font-body text-xs text-muted-foreground">{t("products.activeFilters")}</span>
            {selectedCategories.map((cat) => (
              <Badge key={cat} variant="secondary" className="cursor-pointer gap-1 font-body text-xs" onClick={() => toggleCategory(cat)}>
                {cat} <X className="h-3 w-3" />
              </Badge>
            ))}
            <button onClick={() => setSelectedCategories([])} className="font-body text-xs text-primary underline-offset-2 hover:underline">
              {t("products.clearAll")}
            </button>
          </div>
        )}
        <div className="flex gap-8">
          <aside className="hidden w-64 shrink-0 lg:block">
            <FilterSidebar {...sidebarProps} />
          </aside>
          <div className="flex-1">
            {isLoading ? (
              <div className="flex min-h-[300px] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : filtered.length === 0 ? (
              <div className="flex min-h-[300px] flex-col items-center justify-center rounded-xl border border-border bg-card p-8 text-center">
                <p className="mb-2 font-display text-xl font-bold text-foreground">{t("products.noProducts")}</p>
                <p className="font-body text-sm text-muted-foreground">{t("products.noProductsHint")}</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3 sm:gap-6 xl:grid-cols-3">
                {filtered.map((product) => (<ProductListCard key={product.id} product={product} />))}
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
