import { Dumbbell } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const Footer = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <footer className="border-t border-border bg-card py-12" ref={ref}>
      <div
        className={`container mx-auto px-4 transition-all duration-700 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <Dumbbell className="h-6 w-6 text-primary" />
              <span className="font-display text-lg font-bold text-foreground">
                FUEL<span className="text-primary">X</span>
              </span>
            </div>
            <p className="font-body text-sm text-muted-foreground">
              Premium performance nutrition for athletes who demand results.
            </p>
          </div>
          <div>
            <h4 className="mb-3 font-display text-sm font-semibold text-foreground">Quick Links</h4>
            <div className="space-y-2">
              {["Products", "Categories", "About", "Contact"].map((l) => (
                <a key={l} href={`#${l.toLowerCase()}`} className="block font-body text-sm text-muted-foreground hover:text-primary">
                  {l}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="mb-3 font-display text-sm font-semibold text-foreground">Contact</h4>
            <p className="font-body text-sm text-muted-foreground">info@fuelx.com</p>
            <p className="font-body text-sm text-muted-foreground">+1 (555) 123-4567</p>
          </div>
        </div>
        <div className="mt-8 border-t border-border pt-6 text-center font-body text-xs text-muted-foreground">
          © 2026 FuelX. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
