import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  return (
    <section className="relative flex min-h-[90vh] items-center overflow-hidden pt-16">
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="Premium supplements"
          className="h-full w-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="max-w-2xl">
          <p className="mb-4 animate-fade-in-up font-body text-sm font-semibold uppercase tracking-widest text-primary">
            Premium Performance Nutrition
          </p>
          <h1 className="mb-6 font-display text-5xl font-bold leading-tight text-foreground md:text-7xl" style={{ animationDelay: "0.1s" }}>
            Fuel Your
            <br />
            <span className="text-primary text-glow">Potential</span>
          </h1>
          <p className="mb-8 max-w-md animate-fade-in-up font-body text-lg text-muted-foreground" style={{ animationDelay: "0.2s" }}>
            Science-backed supplements engineered for athletes who demand results. No fillers, no compromise.
          </p>
          <div className="flex animate-fade-in-up gap-4" style={{ animationDelay: "0.3s" }}>
            <a
              href="#products"
              className="glow-green rounded-sm bg-primary px-8 py-3 font-display text-sm font-semibold uppercase tracking-wider text-primary-foreground transition-all hover:brightness-110"
            >
              Shop Now
            </a>
            <a
              href="#categories"
              className="rounded-sm border border-border px-8 py-3 font-display text-sm font-semibold uppercase tracking-wider text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              Explore
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
