import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Upload, X, Plus } from "lucide-react";

const CATEGORIES = ["Creatine", "Whey Protein", "Amino", "Multivitamin", "Shorts", "Shirts"];

interface NutritionFact {
  label: string;
  value: string;
}

export default function AdminProductForm() {
  const { id } = useParams();
  const isEditing = !!id;
  const navigate = useNavigate();
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEditing);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Multi-image state
  const [additionalImages, setAdditionalImages] = useState<string[]>([]);
  const [newImageFiles, setNewImageFiles] = useState<File[]>([]);
  const [newImagePreviews, setNewImagePreviews] = useState<string[]>([]);

  const [form, setForm] = useState({
    name: "",
    description: "",
    ingredients: "",
    price: "",
    original_price: "",
    category: "Creatine",
    stock_quantity: "0",
    status: "active" as "active" | "inactive",
    image_url: "",
  });

  const [nutritionFacts, setNutritionFacts] = useState<NutritionFact[]>([{ label: "", value: "" }]);

  useEffect(() => {
    if (!isEditing) return;
    const fetchProduct = async () => {
      const { data, error } = await supabase.from("products").select("*").eq("id", id).maybeSingle();
      if (error || !data) {
        toast({ title: "Product not found", variant: "destructive" });
        navigate("/admin/products");
        return;
      }
      setForm({
        name: data.name,
        description: data.description ?? "",
        ingredients: (data.ingredients as string[] ?? []).join(", "),
        price: String(data.price),
        original_price: data.original_price ? String(data.original_price) : "",
        category: data.category,
        stock_quantity: String(data.stock_quantity),
        status: data.status as "active" | "inactive",
        image_url: data.image_url ?? "",
      });
      setImagePreview(data.image_url ?? null);
      setAdditionalImages((data.images as string[]) ?? []);
      const nf = data.nutrition_facts as unknown as NutritionFact[] | null;
      if (nf && nf.length > 0) {
        setNutritionFacts(nf);
      }
      setFetching(false);
    };
    fetchProduct();
  }, [id]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    setForm((f) => ({ ...f, image_url: "" }));
  };

  const handleAdditionalImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;
    setNewImageFiles((prev) => [...prev, ...files]);
    setNewImagePreviews((prev) => [...prev, ...files.map((f) => URL.createObjectURL(f))]);
  };

  const removeAdditionalImage = (index: number) => {
    setAdditionalImages((prev) => prev.filter((_, i) => i !== index));
  };

  const removeNewImage = (index: number) => {
    setNewImageFiles((prev) => prev.filter((_, i) => i !== index));
    setNewImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const addNutritionFact = () => setNutritionFacts((nf) => [...nf, { label: "", value: "" }]);
  const removeNutritionFact = (i: number) => setNutritionFacts((nf) => nf.filter((_, idx) => idx !== i));
  const updateNutritionFact = (i: number, field: keyof NutritionFact, val: string) =>
    setNutritionFacts((nf) => nf.map((f, idx) => (idx === i ? { ...f, [field]: val } : f)));

  const uploadFile = async (file: File): Promise<string | null> => {
    const ext = file.name.split(".").pop();
    const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const { error } = await supabase.storage.from("product-images").upload(path, file);
    if (error) return null;
    const { data } = supabase.storage.from("product-images").getPublicUrl(path);
    return data.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.price) {
      toast({ title: "Please fill required fields", variant: "destructive" });
      return;
    }
    setLoading(true);

    let imageUrl = form.image_url;

    if (imageFile) {
      const url = await uploadFile(imageFile);
      if (!url) {
        toast({ title: "Main image upload failed", variant: "destructive" });
        setLoading(false);
        return;
      }
      imageUrl = url;
    }

    // Upload new additional images
    const uploadedUrls: string[] = [];
    for (const file of newImageFiles) {
      const url = await uploadFile(file);
      if (url) uploadedUrls.push(url);
    }
    const allImages = [...additionalImages, ...uploadedUrls];

    const ingredients = form.ingredients.split(",").map((s) => s.trim()).filter(Boolean);
    const validNF = nutritionFacts.filter((nf) => nf.label.trim() && nf.value.trim());

    const productData = {
      name: form.name.trim(),
      description: form.description.trim() || null,
      ingredients,
      nutrition_facts: JSON.parse(JSON.stringify(validNF)),
      price: parseFloat(form.price),
      original_price: form.original_price ? parseFloat(form.original_price) : null,
      category: form.category,
      stock_quantity: parseInt(form.stock_quantity) || 0,
      status: form.status,
      image_url: imageUrl || null,
      images: allImages,
    };

    let error;
    if (isEditing) {
      ({ error } = await supabase.from("products").update(productData).eq("id", id));
    } else {
      ({ error } = await supabase.from("products").insert(productData));
    }

    if (error) {
      toast({ title: "Error saving product", description: error.message, variant: "destructive" });
    } else {
      toast({ title: isEditing ? "Product updated" : "Product created" });
      navigate("/admin/products");
    }
    setLoading(false);
  };

  if (fetching) {
    return (
      <AdminLayout>
        <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="mx-auto max-w-3xl space-y-6">
        <h1 className="font-display text-3xl tracking-wider">{isEditing ? "Edit Product" : "Add Product"}</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader><CardTitle className="text-lg">Basic Info</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Product Name *</Label>
                <Input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} required />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} rows={4} />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Price *</Label>
                  <Input type="number" step="0.01" min="0" value={form.price} onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))} required />
                </div>
                <div className="space-y-2">
                  <Label>Original Price (for sale)</Label>
                  <Input type="number" step="0.01" min="0" value={form.original_price} onChange={(e) => setForm((f) => ({ ...f, original_price: e.target.value }))} />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select value={form.category} onValueChange={(v) => setForm((f) => ({ ...f, category: v }))}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Stock Quantity</Label>
                  <Input type="number" min="0" value={form.stock_quantity} onChange={(e) => setForm((f) => ({ ...f, stock_quantity: e.target.value }))} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <Select value={form.status} onValueChange={(v: "active" | "inactive") => setForm((f) => ({ ...f, status: v }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-lg">Main Image</CardTitle></CardHeader>
            <CardContent>
              {imagePreview ? (
                <div className="relative inline-block">
                  <img src={imagePreview} alt="Preview" className="h-40 w-40 rounded-lg object-cover" />
                  <button type="button" onClick={removeImage} className="absolute -right-2 -top-2 rounded-full bg-destructive p-1 text-destructive-foreground">
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ) : (
                <label className="flex h-40 w-40 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-border text-muted-foreground hover:border-primary hover:text-primary transition-colors">
                  <Upload className="mb-2 h-6 w-6" />
                  <span className="text-xs">Upload Image</span>
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                </label>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Additional Images</CardTitle>
                <label className="cursor-pointer">
                  <Button type="button" variant="outline" size="sm" asChild>
                    <span><Plus className="mr-1 h-4 w-4" /> Add Images</span>
                  </Button>
                  <input type="file" accept="image/*" multiple className="hidden" onChange={handleAdditionalImages} />
                </label>
              </div>
            </CardHeader>
            <CardContent>
              {additionalImages.length === 0 && newImagePreviews.length === 0 ? (
                <p className="text-sm text-muted-foreground">No additional images. Click "Add Images" to upload.</p>
              ) : (
                <div className="flex flex-wrap gap-3">
                  {additionalImages.map((url, i) => (
                    <div key={`existing-${i}`} className="relative">
                      <img src={url} alt={`Additional ${i + 1}`} className="h-24 w-24 rounded-lg object-cover border border-border" />
                      <button type="button" onClick={() => removeAdditionalImage(i)} className="absolute -right-2 -top-2 rounded-full bg-destructive p-1 text-destructive-foreground">
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                  {newImagePreviews.map((url, i) => (
                    <div key={`new-${i}`} className="relative">
                      <img src={url} alt={`New ${i + 1}`} className="h-24 w-24 rounded-lg object-cover border border-border" />
                      <button type="button" onClick={() => removeNewImage(i)} className="absolute -right-2 -top-2 rounded-full bg-destructive p-1 text-destructive-foreground">
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-lg">Ingredients</CardTitle></CardHeader>
            <CardContent>
              <Textarea
                value={form.ingredients}
                onChange={(e) => setForm((f) => ({ ...f, ingredients: e.target.value }))}
                placeholder="Comma-separated, e.g. Creatine Monohydrate (5g), Citric Acid"
                rows={3}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Nutrition Facts</CardTitle>
                <Button type="button" variant="outline" size="sm" onClick={addNutritionFact}>+ Add Row</Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {nutritionFacts.map((nf, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Input placeholder="Label" value={nf.label} onChange={(e) => updateNutritionFact(i, "label", e.target.value)} />
                  <Input placeholder="Value" value={nf.value} onChange={(e) => updateNutritionFact(i, "value", e.target.value)} />
                  <Button type="button" variant="ghost" size="icon" onClick={() => removeNutritionFact(i)} className="shrink-0 text-muted-foreground">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="flex gap-4">
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isEditing ? "Update Product" : "Create Product"}
            </Button>
            <Button type="button" variant="outline" onClick={() => navigate("/admin/products")}>Cancel</Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
