import photoweb from "@/assets/Final (1).webp";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useTransform } from "framer-motion";

const Hero = () => {
  const { t } = useTranslation();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-300, 300], [5, -5]);
  const rotateY = useTransform(mouseX, [-300, 300], [-5, 5]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative flex min-h-[75vh] items-center justify-center overflow-hidden md:min-h-screen"
    >
      {/* Background with cinematic zoom */}
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <img
          src={photoweb}
          alt="Champion Supplement"
          className="h-full w-full object-cover object-center"
        />
      </motion.div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Subtle spotlight */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,0,0,0.12),transparent_60%)]" />

      {/* 3D Button */}
      <div className="relative z-10 flex items-center justify-center w-full">
        <motion.div
          style={{ rotateX, rotateY }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mt-28 md:mt-10 perspective-1000"
        >
          <Link
            to="/products"
            className="
              group
              relative
              inline-flex
              items-center
              justify-center
              overflow-hidden
              px-6 py-2
              md:px-100 md:py-30
              text-xs md:text-sm
              font-bold
              uppercase
              tracking-widest
              text-white
              bg-primary
              rounded-lg
              transition-all
              duration-300
              shadow-lg
              hover:scale-105
              hover:shadow-[0_15px_40px_rgba(255,0,0,0.6)]
            "
          >
            {/* Light sweep */}
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 transition-all duration-700 group-hover:translate-x-full group-hover:opacity-100" />

            <span className="relative z-10">
              {t("hero.shopNow")}
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;