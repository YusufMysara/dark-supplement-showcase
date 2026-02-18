import { Link } from "react-router-dom";
import { Settings, MessageCircle, Facebook, Instagram } from "lucide-react";
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
        <div className="grid gap-6 md:flex md:items-start md:justify-between md:gap-8">
          <div className="md:w-1/2">
            <div className="mb-3 md:mb-4">
              <span className="font-display text-base md:text-lg font-bold">
                <span className="text-primary">CHAMPION</span> <span className="text-foreground">SUPPLEMENT</span>
              </span>
            </div>
            <p className="font-body text-xs md:text-sm text-muted-foreground">{t("footer.tagline")}</p>
          </div>
          <div className="md:text-left">
            <h4 className="mb-2 md:mb-3 font-display text-xs md:text-sm font-semibold text-foreground">{t("footer.contact")}</h4>
            <div className="space-y-2">
              <a href="https://wa.me/201234567890" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-body text-xs md:text-sm text-muted-foreground hover:text-primary">
                <MessageCircle className="h-4 w-4" />
                <span>+20 123 456 7890</span>
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-body text-xs md:text-sm text-muted-foreground hover:text-primary">
                <Facebook className="h-4 w-4" />
                <span>Champion Supplement</span>
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-body text-xs md:text-sm text-muted-foreground hover:text-primary">
                <Instagram className="h-4 w-4" />
                <span>Champion Supplement</span>
              </a>
            </div>
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
