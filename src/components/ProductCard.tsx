interface ProductCardProps {
  name: string;
  category: string;
  price: string;
  image: string;
  badge?: string;
}

const ProductCard = ({ name, category, price, image, badge }: ProductCardProps) => {
  return (
    <div className="group relative overflow-hidden rounded-lg border border-border bg-card transition-all hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5">
      {badge && (
        <span className="absolute right-3 top-3 z-10 rounded-sm bg-primary px-2 py-1 font-display text-[10px] font-bold uppercase tracking-wider text-primary-foreground">
          {badge}
        </span>
      )}
      <div className="aspect-square overflow-hidden bg-secondary">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <p className="mb-1 font-body text-xs uppercase tracking-wider text-muted-foreground">
          {category}
        </p>
        <h3 className="mb-2 font-display text-lg font-semibold text-foreground">
          {name}
        </h3>
        <p className="font-display text-xl font-bold text-primary">{price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
