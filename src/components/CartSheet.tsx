import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Plus, Minus, Trash2, MessageCircle } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useTranslation } from "react-i18next";

const WHATSAPP_NUMBER = "+201120011390";

const CartSheet = () => {
  const { items, removeItem, updateQuantity, clearCart, totalItems, totalPrice } = useCart();
  const { t } = useTranslation();

  const handleWhatsAppCheckout = () => {
    const itemsList = items
      .map((item, i) => `${i + 1}. ${item.name} x${item.quantity} — ${(item.price * item.quantity).toFixed(2)} EGP`)
      .join("\n");
    const message = `Hello, I want to order:\n\n${itemsList}\n\nTotal: ${totalPrice.toFixed(2)} EGP`;
    const url = `https://wa.me/${WHATSAPP_NUMBER.replace(/\s/g, "")}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="relative text-foreground transition-colors hover:text-primary">
          <ShoppingCart className="h-5 w-5 md:h-6 md:w-6" />
          {totalItems > 0 && (
            <span className="absolute -end-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
              {totalItems}
            </span>
          )}
        </button>
      </SheetTrigger>
      <SheetContent className="flex w-80 flex-col bg-background sm:w-96">
        <SheetHeader>
          <SheetTitle className="font-display text-lg">{t("cart.title")}</SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 items-center justify-center">
            <p className="font-body text-sm text-muted-foreground">{t("cart.empty")}</p>
          </div>
        ) : (
          <>
            <div className="flex-1 space-y-3 overflow-y-auto py-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-3 rounded-lg border border-border p-2">
                  <img src={item.image} alt={item.name} className="h-14 w-14 shrink-0 rounded-md bg-white object-contain p-1" />
                  <div className="flex-1 min-w-0">
                    <p className="truncate font-display text-sm font-semibold text-foreground">{item.name}</p>
                    <p className="font-body text-xs text-primary font-bold">{item.price.toFixed(2)} EGP</p>
                    <div className="mt-1 flex items-center gap-2">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="flex h-6 w-6 items-center justify-center rounded bg-muted text-foreground hover:bg-muted/80">
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="font-display text-sm font-semibold">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="flex h-6 w-6 items-center justify-center rounded bg-muted text-foreground hover:bg-muted/80">
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                  <button onClick={() => removeItem(item.id)} className="shrink-0 text-muted-foreground hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>

            <div className="border-t border-border pt-4 space-y-3">
              <div className="flex items-center justify-between font-display">
                <span className="text-sm text-muted-foreground">{t("cart.total")}</span>
                <span className="text-lg font-bold text-foreground">{totalPrice.toFixed(2)} EGP</span>
              </div>
              <Button onClick={handleWhatsAppCheckout} className="w-full gap-2 bg-[#25D366] font-display font-semibold text-white hover:bg-[#20bd5a]">
                <MessageCircle className="h-5 w-5" />
                {t("cart.confirmWhatsApp")}
              </Button>
              <Button variant="outline" size="sm" onClick={clearCart} className="w-full font-body text-xs">
                {t("cart.clearAll")}
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
