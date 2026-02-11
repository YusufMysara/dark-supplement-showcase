import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, Plus, Settings } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";

export default function AdminDashboard() {
  const [totalProducts, setTotalProducts] = useState(0);
  const [activeProducts, setActiveProducts] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      const { count: total } = await supabase.from("products").select("*", { count: "exact", head: true });
      const { count: active } = await supabase.from("products").select("*", { count: "exact", head: true }).eq("status", "active");
      setTotalProducts(total ?? 0);
      setActiveProducts(active ?? 0);
    };
    fetchStats();
  }, []);

  return (
    <AdminLayout>
      <div className="space-y-8">
        <h1 className="font-display text-3xl tracking-wider">Dashboard</h1>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Products</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold font-display">{totalProducts}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Products</CardTitle>
              <Settings className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold font-display">{activeProducts}</div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-wrap gap-4">
          <Button asChild>
            <Link to="/admin/products/new">
              <Plus className="mr-2 h-4 w-4" /> Add Product
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/admin/products">
              <Package className="mr-2 h-4 w-4" /> Manage Products
            </Link>
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
}
