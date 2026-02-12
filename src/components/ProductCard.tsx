import { useLocation } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import WhatsAppButton from "./WhatsAppButton";

interface ProductCardProps {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  onSale: boolean;
  description: string;
}

const ProductCard = ({ id, name, category, price, originalPrice, image, rating, reviews, inStock, onSale, description }: ProductCardProps) => {
  const location = useLocation();
  const productUrl = `${window.location.origin}${location.pathname}/${id}`;

  return (
    <div className="group relative overflow-hidden rounded-lg border border-border bg-card transition-all hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5">
      {onSale && (
        <Badge className="absolute left-3 top-3 z-10 bg-green-500 font-display text-[10px] font-bold uppercase tracking-wider hover:bg-green-600">
          Sale
        </Badge>
      )}
      {!inStock && (
        <span className="absolute left-3 top-3 z-10 rounded-sm bg-destructive px-2 py-1 font-display text-[10px] font-bold uppercase tracking-wider text-destructive-foreground">
          Out of Stock
        </span>
      )}
      <div className="flex aspect-square items-center justify-center overflow-hidden bg-white p-4">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <p className="mb-1 font-body text-xs uppercase tracking-wider text-muted-foreground">
          {category}
        </p>
        <h3 className="mb-2 font-display text-lg font-semibold text-foreground">
          {name}
        </h3>
        <div className="flex items-center gap-2">
          <p className="font-display text-xl font-bold text-primary">
            {price.toFixed(2)} EGP
          </p>
          {originalPrice && originalPrice > price && (
            <p className="font-display text-sm text-muted-foreground line-through">
              {originalPrice.toFixed(2)} EGP
            </p>
          )}
        </div>
        <div className="mt-3">
          <WhatsAppButton productName={name} productPrice={price} productUrl={productUrl} />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
