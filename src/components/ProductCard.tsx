import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, MessageCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

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

const WHATSAPP_NUMBER = "+201120011390";

const ProductCard = ({ id, name, category, price, originalPrice, image, images, inStock, onSale }: ProductCardProps) => {
  const { t } = useTranslation();
  const productUrl = `${window.location.origin}/products/${id}`;
  const allImages = images && images.length > 0 ? images : [image];
  const [currentIndex, setCurrentIndex] = useState(0);

  const message = `Hello, I want to order: ${name} - ${productUrl}`;
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER.replace(/\s/g, "")}?text=${encodeURIComponent(message)}`;

  const prevSlide = (e: React.MouseEvent) => { e.preventDefault(); e.stopPropagation(); setCurrentIndex((p) => (p === 0 ? allImages.length - 1 : p - 1)); };
  const nextSlide = (e: React.MouseEvent) => { e.preventDefault(); e.stopPropagation(); setCurrentIndex((p) => (p === allImages.length - 1 ? 0 : p + 1)); };

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
        <img src={allImages[currentIndex]} alt={`${name} - image ${currentIndex + 1}`} className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105" />
        {allImages.length > 1 && (
          <>
            <button onClick={prevSlide} className="absolute start-2 top-1/2 z-10 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-background/80 text-foreground opacity-0 shadow transition-opacity hover:bg-background group-hover:opacity-100" aria-label="Previous image">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button onClick={nextSlide} className="absolute end-2 top-1/2 z-10 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-background/80 text-foreground opacity-0 shadow transition-opacity hover:bg-background group-hover:opacity-100" aria-label="Next image">
              <ChevronRight className="h-4 w-4" />
            </button>
            <div className="absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
              {allImages.map((_, i) => (
                <span key={i} className={`h-1.5 w-1.5 rounded-full transition-colors ${i === currentIndex ? "bg-primary" : "bg-foreground/30"}`} />
              ))}
            </div>
          </>
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <p className="mb-1 font-body text-xs uppercase tracking-wider text-muted-foreground">{category}</p>
        <h3 className="mb-2 font-display text-lg font-semibold text-foreground">{name}</h3>
        <div className="mt-auto flex items-center gap-2">
          <p className="font-display text-xl font-bold text-primary">{price.toFixed(2)} EGP</p>
          {originalPrice && originalPrice > price && (
            <p className="font-display text-sm text-muted-foreground line-through">{originalPrice.toFixed(2)} EGP</p>
          )}
        </div>
        <div className="mt-3">
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="flex items-center justify-center gap-2 rounded-lg bg-[#25D366] px-4 py-2 font-display text-sm font-semibold text-white transition-colors hover:bg-[#20bd5a]">
            <MessageCircle className="h-5 w-5" />
            <span>{t("products.orderWhatsApp")}</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
