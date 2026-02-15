import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  images: string[];
  fallback: string;
  name: string;
}

const ProductImageCarousel = ({ images, fallback, name }: Props) => {
  const allImages = images && images.length > 0 ? images : [fallback];
  const [index, setIndex] = useState(0);
  const hasMultiple = allImages.length > 1;

  const prev = () => setIndex((i) => (i === 0 ? allImages.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === allImages.length - 1 ? 0 : i + 1));

  return (
    <div className="flex flex-col gap-3">
      {/* Main Image */}
      <div className="relative">
        <img
          src={allImages[index]}
          alt={`${name} - image ${index + 1}`}
          className="aspect-square w-full object-contain bg-white p-4 md:p-8"
        />
        {hasMultiple && (
          <>
            <button
              onClick={prev}
              className="absolute start-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-background/80 text-foreground shadow transition-colors hover:bg-background"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={next}
              className="absolute end-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-background/80 text-foreground shadow transition-colors hover:bg-background"
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {hasMultiple && (
        <div className="flex gap-2 overflow-x-auto px-2 pb-1">
          {allImages.map((src, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`shrink-0 overflow-hidden rounded-md border-2 transition-all ${
                i === index
                  ? "border-primary ring-1 ring-primary"
                  : "border-border opacity-60 hover:opacity-100"
              }`}
              aria-label={`View image ${i + 1}`}
            >
              <img
                src={src}
                alt={`${name} - thumbnail ${i + 1}`}
                className="h-16 w-16 object-contain bg-white p-1 md:h-20 md:w-20"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductImageCarousel;
