import { Zap, Dumbbell, Heart, Activity } from "lucide-react";
import { Link } from "react-router-dom";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useTranslation } from "react-i18next";

const Categories = () => {
  const { ref, isVisible } = useScrollReveal();
  const { t } = useTranslation();

  const categories = [
    { name: t("categories.preWorkout"), icon: Zap, desc: t("categories.preWorkoutDesc"), category: "Amino" },
    { name: t("categories.protein"), icon: Dumbbell, desc: t("categories.proteinDesc"), category: "Whey Protein" },
    { name: t("categories.vitamins"), icon: Heart, desc: t("categories.vitaminsDesc"), category: "Multivitamin" },
    { name: t("categories.creatine"), icon: Activity, desc: t("categories.creatineDesc"), category: "Creatine" },
  ];

  return (
    <section id="categories" className="py-12 md:py-20" ref={ref}>
      <div
        className={`container mx-auto px-3 md:px-4 transition-all duration-700 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <h2 className="mb-2 text-center font-display text-xl md:text-3xl lg:text-4xl font-bold text-foreground">
          {t("categories.title")} <span className="text-primary">{t("categories.titleHighlight")}</span>
        </h2>
        <p className="mb-8 md:mb-12 text-center font-body text-xs md:text-sm text-muted-foreground">
          {t("categories.subtitle")}
        </p>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {categories.map(({ name, icon: Icon, desc, category }, i) => (
            <Link
              key={category}
              to={`/products?category=${encodeURIComponent(category)}`}
              className={`group cursor-pointer rounded-lg border border-border bg-card p-3 text-center transition-all hover:border-primary/50 hover:bg-secondary md:p-6 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: `${i * 100 + 200}ms`, transitionDuration: "500ms" }}
            >
              <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground md:mb-4 md:h-14 md:w-14">
                <Icon className="h-4 w-4 md:h-6 md:w-6" />
              </div>
              <h3 className="mb-0.5 md:mb-1 font-display text-xs md:text-base font-semibold text-foreground">{name}</h3>
              <p className="font-body text-[10px] md:text-xs text-muted-foreground">{desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
