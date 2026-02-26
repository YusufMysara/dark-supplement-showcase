import { Link } from "react-router-dom";
import { Settings, Facebook, Instagram } from "lucide-react";
import { FaWhatsapp, FaTiktok } from "react-icons/fa";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { ref, isVisible } = useScrollReveal();
  const { t } = useTranslation();

  return (
    <footer className="border-t border-border bg-card py-8 md:py-12" ref={ref}>
      <div
        className={`container mx-auto px-3 md:px-4 transition-all duration-700 ${isVisible
          ? "translate-y-0 opacity-100"
          : "translate-y-10 opacity-0"
          }`}
      >
        <div className="grid gap-6 md:flex md:items-start md:justify-between md:gap-8">
          <div className="md:w-1/2">
            <div className="mb-3 md:mb-4">
              <span className="font-display text-base md:text-lg font-bold">
                <span className="text-primary">CHAMPION</span>{" "}
                <span className="text-foreground">SUPPLEMENT</span>
              </span>
            </div>
            <p className="font-body text-xs md:text-sm text-muted-foreground">
              {t("footer.tagline")}
            </p>
          </div>

          <div className="md:text-left">
            <h4 className="mb-4 font-display text-xs md:text-sm font-semibold text-foreground">
              {t("footer.contact")}
            </h4>

            {/* Social Icons Row */}
            <div className="flex items-center gap-5">

              {/* WhatsApp */}
              <a
                href="https://wa.me/201120011390?text=Hello%20Champion%20Supplement"
                target="_blank"
                rel="noopener noreferrer"
                className="group transition-transform hover:scale-110"
              >
                <FaWhatsapp className="h-5 w-5 text-green-500 group-hover:text-green-600 transition-colors" />
              </a>

              {/* Facebook */}
              <a
                href="https://www.facebook.com/share/1KN983cHp1/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="group transition-transform hover:scale-110"
              >
                <Facebook className="h-5 w-5 text-blue-600 group-hover:text-blue-700 transition-colors" />
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/champion.supplement?igsh=OWdsZmZ0YmowaThu"
                target="_blank"
                rel="noopener noreferrer"
                className="group transition-transform hover:scale-110"
              >
                <Instagram className="h-5 w-5 text-pink-500 group-hover:text-pink-600 transition-colors" />
              </a>

              {/* TikTok */}
              <a
                href="https://www.tiktok.com/@champion.supplement?_r=1&_t=ZS-94FiDj4FOHl"
                target="_blank"
                rel="noopener noreferrer"
                className="group transition-transform hover:scale-110"
              >
                <FaTiktok className="h-5 w-5 text-black dark:text-white group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors" />
              </a>

            </div>
          </div>
        </div>

        <div className="mt-6 md:mt-8 flex flex-col-reverse sm:flex-row items-center justify-between gap-3 border-t border-border pt-4 md:pt-6 font-body text-[10px] md:text-xs text-muted-foreground">
          <span>{t("footer.rights")}</span>

          <Link
            to="/admin/login"
            className="text-muted-foreground/30 transition-colors hover:text-muted-foreground"
            aria-label="Admin"
          >
            <Settings className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;