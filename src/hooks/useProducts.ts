import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Product {
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
  ingredients: string[];
  nutritionFacts: { label: string; value: string }[];
  stockQuantity: number;
}

function mapProduct(row: any): Product {
  return {
    id: row.id,
    name: row.name,
    category: row.category,
    price: Number(row.price),
    originalPrice: row.original_price ? Number(row.original_price) : undefined,
    image: row.image_url ?? "/placeholder.svg",
    rating: Number(row.rating ?? 0),
    reviews: Number(row.reviews ?? 0),
    inStock: row.stock_quantity > 0,
    onSale: !!row.original_price && row.original_price > row.price,
    description: row.description ?? "",
    ingredients: row.ingredients ?? [],
    nutritionFacts: (row.nutrition_facts as { label: string; value: string }[]) ?? [],
    stockQuantity: row.stock_quantity,
  };
}

export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("status", "active")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []).map(mapProduct);
    },
  });
}

export function useProduct(id: string | undefined) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      if (!id) throw new Error("No product ID");
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .eq("status", "active")
        .maybeSingle();
      if (error) throw error;
      if (!data) return null;
      return mapProduct(data);
    },
    enabled: !!id,
  });
}
