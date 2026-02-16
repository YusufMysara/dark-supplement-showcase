import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useCart } from "@/contexts/CartContext";

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

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({ id, name, price, image: mainImage });
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
        <img src={mainImage} alt={name} className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105" />
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
