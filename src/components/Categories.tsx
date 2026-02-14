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
    <section id="categories" className="py-20" ref={ref}>
      <div
        className={`container mx-auto px-4 transition-all duration-700 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <h2 className="mb-2 text-center font-display text-3xl font-bold text-foreground md:text-4xl">
          {t("categories.title")} <span className="text-primary">{t("categories.titleHighlight")}</span>
        </h2>
        <p className="mb-12 text-center font-body text-muted-foreground">
          {t("categories.subtitle")}
        </p>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {categories.map(({ name, icon: Icon, desc, category }, i) => (
            <Link
              key={category}
              to={`/products?category=${encodeURIComponent(category)}`}
              className={`group cursor-pointer rounded-lg border border-border bg-card p-6 text-center transition-all hover:border-primary/50 hover:bg-secondary ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: `${i * 100 + 200}ms`, transitionDuration: "500ms" }}
            >
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mb-1 font-display text-base font-semibold text-foreground">{name}</h3>
              <p className="font-body text-xs text-muted-foreground">{desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
