import test from "@/assets/Final.png";
import { useTranslation } from "react-i18next";

const Hero = () => {
  const { t } = useTranslation();

  return (
    <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden md:min-h-screen">
      <div className="absolute inset-0">
        <img
          src={test}
          alt="Champion Supplement"
          className="h-full w-full object-cover md:object-[center_30%]"
        />
      </div>
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 flex gap-2 px-4 md:gap-3 md:px-0 md:mt-12">
        <a
          href="#products"
          className="rounded-sm bg-primary px-3 py-1.5 font-display text-[9px] font-semibold uppercase tracking-wider text-primary-foreground transition-all hover:brightness-110 md:px-6 md:py-3 md:text-sm"
        >
          {t("hero.shopNow")}
        </a>
        <a
          href="#categories"
          className="rounded-sm border border-white px-3 py-1.5 font-display text-[9px] font-semibold uppercase tracking-wider text-white transition-colors hover:bg-white hover:text-black md:px-6 md:py-3 md:text-sm"
        >
          {t("hero.explore")}
        </a>
      </div>
    </section>
  );
};

export default Hero;
