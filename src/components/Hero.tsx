import test from "@/assets/Final.png";
import { useTranslation } from "react-i18next";

const Hero = () => {
  const { t } = useTranslation();

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-x-0 top-12 bottom-0">
        <img
          src={test}
          alt="Champion Supplement"
          className="w-full h-full object-cover"
          style={{ objectPosition: "center top 40px" }}
        />
      </div>
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 flex gap-3 mt-12">
        <a
          href="#products"
          className="rounded-sm bg-primary px-3 py-1.5 font-display text-[9px] font-semibold uppercase tracking-wider text-primary-foreground transition-all hover:brightness-110"
        >
          {t("hero.shopNow")}
        </a>
        <a
          href="#categories"
          className="rounded-sm border border-white px-3 py-1.5 font-display text-[9px] font-semibold uppercase tracking-wider text-white transition-colors hover:bg-white hover:text-black"
        >
          {t("hero.explore")}
        </a>
      </div>
    </section>
  );
};

export default Hero;
