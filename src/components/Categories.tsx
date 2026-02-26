import { Zap, Dumbbell, Activity, Flame } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useTranslation } from "react-i18next";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";

const CategoryCard = ({
  name,
  Icon,
  desc,
  category,
  delay,
  isVisible,
}: any) => {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth < 768) return; // disable magnetic on mobile

    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - (rect.left + rect.width / 2);
    const offsetY = e.clientY - (rect.top + rect.height / 2);

    x.set(offsetX * 0.15);
    y.set(offsetY * 0.15);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const createRipple = (e: React.MouseEvent<HTMLDivElement>) => {
    const button = e.currentTarget;
    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${e.nativeEvent.offsetX - radius}px`;
    circle.style.top = `${e.nativeEvent.offsetY - radius}px`;
    circle.classList.add("ripple");

    const ripple = button.getElementsByClassName("ripple")[0];
    if (ripple) ripple.remove();

    button.appendChild(circle);
  };

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      initial={{ opacity: 0, y: 40 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ delay }}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      className="relative"
    >
      <Link
        to={`/products?category=${encodeURIComponent(category)}`}
        className="block"
      >
        <div
          onClick={createRipple}
          className="
            relative
            overflow-hidden
            rounded-xl md:rounded-2xl
            bg-white/5
            backdrop-blur-lg
            border border-white/10
            p-4 md:p-6
            text-center
            transition-all
            duration-300
            md:hover:-translate-y-2
            md:hover:border-primary/40
            md:hover:shadow-[0_20px_50px_rgba(255,0,0,0.25)]
          "
        >
          {/* Icon */}
          <div className="
            mx-auto mb-3 md:mb-4
            flex h-12 w-12 md:h-14 md:w-14
            items-center justify-center
            rounded-full
            bg-primary/10
            text-primary
            transition-all
            duration-300
            md:group-hover:bg-primary
            md:group-hover:text-white
          ">
            <Icon className="h-5 w-5 md:h-6 md:w-6" />
          </div>

          {/* Title */}
          <h3 className="mb-1 md:mb-2 text-xs md:text-base font-semibold text-white">
            {name}
          </h3>

          {/* Description */}
          <p className="hidden md:block text-xs text-muted-foreground">
            {desc}
          </p>
        </div>
      </Link>
    </motion.div>
  );
};

const Categories = () => {
  const { ref, isVisible } = useScrollReveal();
  const { t } = useTranslation();

  const categories = [
    { name: t("categories.deals"), icon: Zap, desc: t("categories.dealsDesc"), category: "Deals" },
    { name: t("categories.protein"), icon: Dumbbell, desc: t("categories.proteinDesc"), category: "Protein" },
    { name: t("categories.creatine"), icon: Activity, desc: t("categories.creatineDesc"), category: "Creatine" },
    { name: t("categories.fatBurners"), icon: Flame, desc: t("categories.fatBurnersDesc"), category: "Fat Burners" },
  ];

  return (
    <section
      id="categories"
      className="py-16 md:py-28"
      ref={ref}
    >
      <div className="container mx-auto px-4">

        <h2 className="mb-3 text-center font-display text-2xl md:text-5xl font-bold">
          {t("categories.title")}{" "}
          <span className="text-primary">
            {t("categories.titleHighlight")}
          </span>
        </h2>

        <p className="mb-10 md:mb-16 text-center text-xs md:text-sm text-muted-foreground">
          {t("categories.subtitle")}
        </p>

        <div className="grid grid-cols-2 gap-4 md:gap-8 md:grid-cols-4">
          {categories.map(({ name, icon: Icon, desc, category }, i) => (
            <CategoryCard
              key={category}
              name={name}
              Icon={Icon}
              desc={desc}
              category={category}
              delay={i * 0.12}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;