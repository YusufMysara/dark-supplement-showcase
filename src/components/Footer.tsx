import { Link } from "react-router-dom";
import { Settings } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { ref, isVisible } = useScrollReveal();
  const { t } = useTranslation();

  return (
    <footer className="border-t border-border bg-card py-8 md:py-12" ref={ref}>
      <div
        className={`container mx-auto px-3 md:px-4 transition-all duration-700 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 md:gap-8">
          <div>
            <div className="mb-3 md:mb-4">
              <span className="font-display text-base md:text-lg font-bold">
                <span className="text-primary">CHAMPION</span> <span className="text-foreground">SUPPLEMENT</span>
              </span>
            </div>
            <p className="font-body text-xs md:text-sm text-muted-foreground">{t("footer.tagline")}</p>
          </div>
          <div>
            <h4 className="mb-2 md:mb-3 font-display text-xs md:text-sm font-semibold text-foreground">{t("footer.quickLinks")}</h4>
            <div className="space-y-1.5 md:space-y-2">
              {[
                { key: "nav.products", href: "#products" },
                { key: "nav.categories", href: "#categories" },
                { key: "nav.about", href: "#about" },
                { key: "nav.contact", href: "#contact" },
              ].map((l) => (
                <a key={l.key} href={l.href} className="block font-body text-xs md:text-sm text-muted-foreground hover:text-primary">
                  {t(l.key)}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="mb-2 md:mb-3 font-display text-xs md:text-sm font-semibold text-foreground">{t("footer.contact")}</h4>
            <p className="font-body text-xs md:text-sm text-muted-foreground">info@championsupplement.com</p>
            <p className="font-body text-xs md:text-sm text-muted-foreground">+20 123 456 7890</p>
          </div>
        </div>
        <div className="mt-6 md:mt-8 flex flex-col-reverse sm:flex-row items-center justify-between gap-3 border-t border-border pt-4 md:pt-6 font-body text-[10px] md:text-xs text-muted-foreground">
          <span>{t("footer.rights")}</span>
          <Link to="/admin/login" className="text-muted-foreground/30 transition-colors hover:text-muted-foreground" aria-label="Admin">
            <Settings className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
