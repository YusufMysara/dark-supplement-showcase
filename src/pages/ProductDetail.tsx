import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useProduct } from "@/hooks/useProducts";
import { ArrowLeft, Package, FlaskConical, ChartColumnStacked, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import WhatsAppButton from "@/components/WhatsAppButton";

const ProductDetail = () => {
  const { id } = useParams();
  const { data: product, isLoading } = useProduct(id);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto flex min-h-[60vh] items-center justify-center px-4 pt-24">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center px-4 pt-24">
          <h1 className="mb-4 font-display text-3xl font-bold text-foreground">Product Not Found</h1>
          <Link to="/products" className="font-body text-primary hover:underline">← Back to Products</Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-3 pt-20 pb-12 md:px-4 md:pt-24 md:pb-16">
        <Link to="/products" className="mb-4 md:mb-8 inline-flex items-center gap-1.5 font-body text-xs md:text-sm text-muted-foreground transition-colors hover:text-primary md:gap-2">
          <ArrowLeft className="h-3.5 w-3.5 md:h-4 md:w-4" /> Back to Products
        </Link>

        <div className="mt-4 md:mt-6 grid gap-6 md:gap-10 lg:grid-cols-2">
          <div className="relative overflow-hidden rounded-xl md:rounded-2xl border border-border bg-white">
            {product.onSale && (
              <Badge className="absolute left-4 top-4 z-10 bg-green-500 font-display text-xs font-bold uppercase hover:bg-green-600">Sale</Badge>
            )}
            {!product.inStock && (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/60 backdrop-blur-[2px]">
                <span className="rounded-md bg-muted px-6 py-2 font-display text-sm font-bold uppercase tracking-wider text-muted-foreground">Out of Stock</span>
              </div>
            )}
            <img src={product.image} alt={product.name} className="aspect-square w-full object-contain bg-white p-8" />
          </div>

          <div className="flex flex-col justify-center">
            <p className="mb-1.5 md:mb-2 font-body text-[10px] uppercase tracking-widest text-muted-foreground md:text-xs">{product.category}</p>
            <h1 className="mb-3 md:mb-4 font-display text-xl md:text-3xl lg:text-4xl font-bold text-foreground">{product.name}</h1>

            <div className="mb-4 md:mb-6 flex items-center gap-2 md:gap-3">
              <span className="font-display text-xl md:text-3xl font-bold text-primary">{product.price.toFixed(2)} EGP</span>
              {product.originalPrice && (
                <span className="font-body text-sm md:text-lg text-muted-foreground line-through">{product.originalPrice.toFixed(2)} EGP</span>
              )}
              {product.onSale && product.originalPrice && (
                <Badge variant="secondary" className="font-display text-[10px] md:text-xs">
                  Save {(product.originalPrice - product.price).toFixed(2)} EGP
                </Badge>
              )}
            </div>

            <p className="mb-6 md:mb-8 font-body text-sm leading-relaxed text-muted-foreground md:text-base">{product.description}</p>

            <div className="flex gap-3 md:gap-4">
              <WhatsAppButton 
                productName={product.name} 
                productPrice={product.price} 
                productUrl={window.location.href} 
              />
            </div>
          </div>
        </div>

        <div className="mt-12">
          <Tabs defaultValue="ingredients" className="w-full">
            <TabsList className="mb-6 w-full justify-start gap-1 bg-secondary">
              <TabsTrigger value="ingredients" className="gap-2 font-display text-xs uppercase tracking-wider">
                <FlaskConical className="h-3.5 w-3.5" /> Ingredients
              </TabsTrigger>
              {product.nutritionFacts.length > 0 && (
                <TabsTrigger value="nutrition" className="gap-2 font-display text-xs uppercase tracking-wider">
                  <ChartColumnStacked className="h-3.5 w-3.5" /> Nutrition Facts
                </TabsTrigger>
              )}
              <TabsTrigger value="details" className="gap-2 font-display text-xs uppercase tracking-wider">
                <Package className="h-3.5 w-3.5" /> Details
              </TabsTrigger>
            </TabsList>

            <TabsContent value="ingredients">
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="mb-4 font-display text-lg font-bold text-foreground">Ingredients</h3>
                <ul className="grid gap-2 sm:grid-cols-2">
                  {product.ingredients.map((ing, i) => (
                    <li key={i} className="flex items-center gap-2 font-body text-sm text-muted-foreground">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" /> {ing}
                    </li>
                  ))}
                </ul>
              </div>
            </TabsContent>

            {product.nutritionFacts.length > 0 && (
              <TabsContent value="nutrition">
                <div className="rounded-xl border border-border bg-card p-6">
                  <h3 className="mb-4 font-display text-lg font-bold text-foreground">Nutrition Facts</h3>
                  <p className="mb-4 font-body text-xs text-muted-foreground">Per serving</p>
                  <Table>
                    <TableBody>
                      {product.nutritionFacts.map((fact, i) => (
                        <TableRow key={i}>
                          <TableCell className="font-body text-sm font-medium text-foreground">{fact.label}</TableCell>
                          <TableCell className="text-right font-body text-sm text-muted-foreground">{fact.value}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            )}

            <TabsContent value="details">
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="mb-4 font-display text-lg font-bold text-foreground">Product Details</h3>
                <div className="grid gap-3 font-body text-sm sm:grid-cols-2">
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
  );
};

export default ProductDetail;
