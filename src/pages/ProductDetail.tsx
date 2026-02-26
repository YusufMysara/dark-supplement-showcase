import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useProduct } from "@/hooks/useProducts";
import { ArrowLeft, Package, FlaskConical, ChartColumnStacked, Loader2, ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useTranslation } from "react-i18next";
import ProductImageCarousel from "@/components/ProductImageCarousel";
import { useCart } from "@/contexts/CartContext";

const ProductDetail = () => {
  const { id } = useParams();
  const { data: product, isLoading } = useProduct(id);
  const { t } = useTranslation();
  const { addItem } = useCart();

  const handleAddToCart = () => {
    if (product) {
      addItem({ id: product.id, name: product.name, price: product.price, image: product.image });
    }
  };

  if (isLoading) {
    return (
      <>
        <SEO title="Loading..." />
        <div className="min-h-screen bg-background">
          <Navbar />
          <main className="container mx-auto flex min-h-[60vh] items-center justify-center px-3 md:px-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </main>
          <Footer />
        </div>
      </>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center px-3 md:px-4">
          <h1 className="mb-4 font-display text-2xl md:text-3xl font-bold text-foreground">{t("products.productNotFound")}</h1>
          <Link to="/products" className="font-body text-primary hover:underline">← {t("products.backToProducts")}</Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <SEO
        title={product.name}
        description={product.description || `Buy ${product.name} - Premium quality ${product.category} at Champion Supplement. Best price guaranteed.`}
        image={product.image}
      />
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-3 pb-12 md:px-4 md:pb-16">
          <Link to="/products" className="mb-4 md:mb-8 inline-flex items-center gap-1.5 font-body text-xs md:text-sm text-muted-foreground transition-colors hover:text-primary md:gap-2">
            <ArrowLeft className="h-3.5 w-3.5 md:h-4 md:w-4" /> {t("products.backToProducts")}
          </Link>

          <div className="mt-4 md:mt-6 grid grid-cols-1 gap-8 md:gap-10 lg:grid-cols-2">
            {/* Product Image */}
            <div className="relative overflow-hidden rounded-xl border border-border bg-white md:rounded-2xl">
              {product.onSale && (
                <Badge className="absolute left-3 top-3 z-10 bg-green-500 font-display text-[10px] font-bold uppercase hover:bg-green-600 md:left-4 md:top-4 md:text-xs">
                  {t("products.sale")}
                </Badge>
              )}
              {!product.inStock && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/60 backdrop-blur-[2px]">
                  <span className="rounded-md bg-muted px-4 py-2 font-display text-xs font-bold uppercase tracking-wider text-muted-foreground md:px-6 md:text-sm">{t("products.outOfStock")}</span>
                </div>
              )}
              <ProductImageCarousel images={product.images} fallback={product.image} name={product.name} />
            </div>

            {/* Product Info */}
            <div className="flex flex-col justify-center">
              <p className="mb-1 md:mb-2 font-body text-[10px] uppercase tracking-widest text-muted-foreground md:text-xs">{product.category}</p>
              <h1 className="mb-3 md:mb-4 font-display text-xl md:text-3xl lg:text-4xl font-bold text-foreground">{product.name}</h1>

              <div className="mb-4 md:mb-6 flex flex-col gap-2">
                <div className="flex items-center gap-2 md:gap-3">
                  <span className="font-display text-xl md:text-3xl font-bold text-primary">{product.price.toFixed(2)} EGP</span>
                  {product.originalPrice && (
                    <span className="font-body text-sm md:text-lg text-muted-foreground line-through">{product.originalPrice.toFixed(2)} EGP</span>
                  )}
                </div>
                {product.onSale && product.originalPrice && (
                  <Badge variant="secondary" className="w-fit font-display text-[10px] md:text-xs">
                    Save {(product.originalPrice - product.price).toFixed(2)} EGP
                  </Badge>
                )}
              </div>

              <p className="mb-6 md:mb-8 font-body text-sm leading-relaxed text-muted-foreground md:text-base">{product.description}</p>

              <div className="flex">
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="mt-2 sm:mt-3 flex items-center justify-center gap-1.5 rounded-lg bg-primary px-3 py-2 font-display text-xs sm:text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50 sm:px-4 sm:py-2.5"
                >
                  <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5" /> {t("cart.addToCart")}
                </button>
              </div>
            </div>
          </div>

          {/* Tabs Section */}
          <div className="mt-10 md:mt-12 overflow-x-auto">
            <Tabs defaultValue="ingredients" className="w-full">
              <TabsList className="mb-4 md:mb-6 w-full min-w-[500px] justify-start gap-1 bg-secondary flex-wrap">
                <TabsTrigger value="ingredients" className="gap-1.5 md:gap-2 font-display text-[10px] md:text-xs uppercase tracking-wider">
                  <FlaskConical className="h-3 w-3 md:h-3.5 md:w-3.5" /> Directions
                </TabsTrigger>
                {product.nutritionFacts.length > 0 && (
                  <TabsTrigger value="nutrition" className="gap-1.5 md:gap-2 font-display text-[10px] md:text-xs uppercase tracking-wider">
                    <ChartColumnStacked className="h-3 w-3 md:h-3.5 md:w-3.5" /> Nutrition Facts
                  </TabsTrigger>
                )}
                <TabsTrigger value="details" className="gap-1.5 md:gap-2 font-display text-[10px] md:text-xs uppercase tracking-wider">
                  <Package className="h-3 w-3 md:h-3.5 md:w-3.5" /> Details
                </TabsTrigger>
              </TabsList>

              <TabsContent value="ingredients">
                <div className="rounded-xl border border-border bg-card p-4 md:p-6">
                  <h3 className="mb-3 md:mb-4 font-display text-base md:text-lg font-bold text-foreground">Directions</h3>
                  <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {product.ingredients.map((ing, i) => (
                      <li key={i} className="flex items-center gap-2 font-body text-xs md:text-sm text-muted-foreground">
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" /> {ing}
                      </li>
                    ))}
                  </ul>
                </div>
              </TabsContent>

              {product.nutritionFacts.length > 0 && (
                <TabsContent value="nutrition">
                  <div className="rounded-xl border border-border bg-card p-4 md:p-6">
                    <h3 className="mb-3 md:mb-4 font-display text-base md:text-lg font-bold text-foreground">Nutrition Facts</h3>
                    <p className="mb-3 md:mb-4 font-body text-[10px] md:text-xs text-muted-foreground">Per serving</p>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableBody>
                          {product.nutritionFacts.map((fact, i) => (
                            <TableRow key={i}>
                              <TableCell className="font-body text-xs md:text-sm font-medium text-foreground">{fact.label}</TableCell>
                              <TableCell className="text-right font-body text-xs md:text-sm text-muted-foreground">{fact.value}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </TabsContent>
              )}

              <TabsContent value="details">
                <div className="rounded-xl border border-border bg-card p-4 md:p-6">
                  <h3 className="mb-3 md:mb-4 font-display text-base md:text-lg font-bold text-foreground">Product Details</h3>
                  <div className="grid grid-cols-1 gap-3 font-body text-xs md:text-sm sm:grid-cols-2">
                    <div className="flex justify-between rounded-lg bg-secondary p-3">
                      <span className="text-muted-foreground">Category</span>
                      <span className="font-medium text-foreground">{product.category}</span>
                    </div>
                    <div className="flex justify-between rounded-lg bg-secondary p-3">
                      <span className="text-muted-foreground">Availability</span>
                      <span className={`font-medium ${product.inStock ? "text-green-400" : "text-red-400"}`}>
                        {product.inStock ? "In Stock" : "Out of Stock"}
                      </span>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default ProductDetail;
