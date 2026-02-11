import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { allProducts } from "@/data/products";
import { Star, ArrowLeft, Package, FlaskConical, ChartColumnStacked } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

const ProductDetail = () => {
  const { id } = useParams();
  const product = allProducts.find((p) => p.id === Number(id));

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
      <main className="container mx-auto px-4 pt-24 pb-16">
        {/* Breadcrumb */}
        <Link to="/products" className="mb-8 inline-flex items-center gap-2 font-body text-sm text-muted-foreground transition-colors hover:text-primary">
          <ArrowLeft className="h-4 w-4" />
          Back to Products
        </Link>

        {/* Product hero */}
        <div className="mt-6 grid gap-10 lg:grid-cols-2">
          {/* Image */}
          <div className="relative overflow-hidden rounded-2xl border border-border bg-secondary">
            {product.onSale && (
              <Badge className="absolute left-4 top-4 z-10 bg-red-500 font-display text-xs font-bold uppercase hover:bg-red-600">Sale</Badge>
            )}
            {!product.inStock && (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/60 backdrop-blur-[2px]">
                <span className="rounded-md bg-muted px-6 py-2 font-display text-sm font-bold uppercase tracking-wider text-muted-foreground">Out of Stock</span>
              </div>
            )}
            <img src={product.image} alt={product.name} className="aspect-square w-full object-cover" />
          </div>

          {/* Info */}
          <div className="flex flex-col justify-center">
            <p className="mb-2 font-body text-xs uppercase tracking-widest text-muted-foreground">{product.category}</p>
            <h1 className="mb-4 font-display text-3xl font-bold text-foreground md:text-4xl">{product.name}</h1>

            {/* Rating */}
            <div className="mb-6 flex items-center gap-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className={`h-4 w-4 ${star <= Math.round(product.rating) ? "fill-amber-400 text-amber-400" : "fill-muted text-muted"}`} />
                ))}
              </div>
              <span className="font-body text-sm text-muted-foreground">{product.rating} ({product.reviews} reviews)</span>
            </div>

            {/* Price */}
            <div className="mb-6 flex items-center gap-3">
              <span className="font-display text-3xl font-bold text-primary">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="font-body text-lg text-muted-foreground line-through">${product.originalPrice.toFixed(2)}</span>
              )}
              {product.onSale && product.originalPrice && (
                <Badge variant="secondary" className="font-display text-xs">
                  Save ${(product.originalPrice - product.price).toFixed(2)}
                </Badge>
              )}
            </div>

            {/* Description */}
            <p className="mb-8 font-body leading-relaxed text-muted-foreground">{product.description}</p>
          </div>
        </div>

        {/* Tabs */}
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
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      {ing}
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
                  <div className="flex justify-between rounded-lg bg-secondary p-3">
                    <span className="text-muted-foreground">Rating</span>
                    <span className="font-medium text-foreground">{product.rating}/5</span>
                  </div>
                  <div className="flex justify-between rounded-lg bg-secondary p-3">
                    <span className="text-muted-foreground">Reviews</span>
                    <span className="font-medium text-foreground">{product.reviews}</span>
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
