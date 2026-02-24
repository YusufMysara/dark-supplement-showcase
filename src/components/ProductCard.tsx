import { Badge } from "@/components/ui/badge";
import { ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useCart } from "@/contexts/CartContext";
import { useState } from "react";

interface ProductCardProps {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  rating: number;
  reviews: number;
  inStock: boolean;
  onSale: boolean;
  description: string;
}

const ProductCard = ({ id, name, category, price, originalPrice, image, images, inStock, onSale }: ProductCardProps) => {
  const { t } = useTranslation();
  const { addItem } = useCart();
  const mainImage = images && images.length > 0 ? images[0] : image;
  const allImages = images && images.length > 0 ? images : [image];
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({ id, name, price, image: mainImage });
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card transition-all hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5">
      {onSale && (
        <Badge className="absolute start-3 top-3 z-10 bg-green-500 font-display text-[10px] font-bold uppercase tracking-wider hover:bg-green-600">
          {t("products.sale")}
        </Badge>
      )}
      {!inStock && (
        <span className="absolute start-3 top-3 z-10 rounded-sm bg-destructive px-2 py-1 font-display text-[10px] font-bold uppercase tracking-wider text-destructive-foreground">
          {t("products.outOfStock")}
        </span>
      )}
      <div className="relative flex aspect-square items-center justify-center overflow-hidden bg-white p-4">
        <img 
          src={allImages[currentIndex]} 
          alt={name} 
          loading="lazy"
          className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105" 
        />
        {allImages.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute start-2 top-1/2 z-10 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white opacity-0 transition-opacity group-hover:opacity-100 hover:bg-black/70"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={handleNext}
              className="absolute end-2 top-1/2 z-10 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white opacity-0 transition-opacity group-hover:opacity-100 hover:bg-black/70"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
            <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1">
              {allImages.map((_, idx) => (
                <span
                  key={idx}
                  className={`block h-1.5 rounded-full transition-all ${
                    idx === currentIndex ? "w-4 bg-primary" : "w-1.5 bg-white/50"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
      <div className="flex flex-1 flex-col p-2 sm:p-4">
        <p className="mb-0.5 font-body text-[10px] sm:text-xs uppercase tracking-wider text-muted-foreground">{category}</p>
        <h3 className="mb-1 sm:mb-2 font-display text-sm sm:text-lg font-semibold text-foreground line-clamp-2">{name}</h3>
        <div className="mt-auto flex flex-wrap items-center gap-1 sm:gap-2">
          <p className="font-display text-sm sm:text-xl font-bold text-primary">{price.toFixed(2)} EGP</p>
          {originalPrice && originalPrice > price && (
            <p className="font-display text-[10px] sm:text-sm text-muted-foreground line-through">{originalPrice.toFixed(2)} EGP</p>
          )}
        </div>
        <div className="mt-2 sm:mt-3">
          <button
            onClick={handleAddToCart}
            disabled={!inStock}
            className="flex w-full items-center justify-center gap-1.5 sm:gap-2 rounded-lg bg-primary px-2 sm:px-4 py-1.5 sm:py-2 font-display text-[10px] sm:text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
          >
            <ShoppingCart className="h-3.5 w-3.5 sm:h-5 sm:w-5" />
            <span>{t("cart.addToCart")}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
