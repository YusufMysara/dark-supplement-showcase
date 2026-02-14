import { useTranslation } from "react-i18next";

const LanguageToggle = () => {
  const { i18n } = useTranslation();
  const isAr = i18n.language === "ar";

  const switchLang = (lang: string) => {
    i18n.changeLanguage(lang);
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  };

  return (
    <div className="flex items-center gap-1 rounded-md border border-border px-2 py-1 font-body text-xs">
      <button
        onClick={() => switchLang("en")}
        className={`rounded px-1.5 py-0.5 font-semibold transition-colors ${
          !isAr ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
        }`}
      >
        EN
      </button>
      <span className="text-muted-foreground">|</span>
      <button
        onClick={() => switchLang("ar")}
        className={`rounded px-1.5 py-0.5 font-semibold transition-colors ${
          isAr ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
        }`}
      >
        AR
      </button>
    </div>
  );
};

export default LanguageToggle;
