import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const LanguageToggle = () => {
  const { i18n } = useTranslation();
  const isAr = i18n.language === "ar";

  const switchLang = (lang: string) => {
    i18n.changeLanguage(lang);
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  };

  return (
    <div className="relative flex items-center rounded-full border border-border bg-card p-1 text-xs shadow-sm">

      {/* Animated Background */}
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`absolute top-1 bottom-1 w-1/2 rounded-full bg-primary ${isAr ? "right-1" : "left-1"
          }`}
      />

      {/* EN Button */}
      <button
        onClick={() => switchLang("en")}
        className={`relative z-10 w-12 md:w-14 rounded-full py-1 font-semibold transition-colors ${!isAr
          ? "text-primary-foreground"
          : "text-muted-foreground hover:text-foreground"
          }`}
      >
        EN
      </button>

      {/* AR Button */}
      <button
        onClick={() => switchLang("ar")}
        className={`relative z-10 w-12 md:w-14 rounded-full py-1 font-semibold transition-colors ${isAr
          ? "text-primary-foreground"
          : "text-muted-foreground hover:text-foreground"
          }`}
      >
        AR
      </button>

    </div>
  );
};

export default LanguageToggle;