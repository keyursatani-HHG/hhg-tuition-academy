import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

export function Hero() {
  return (
    <section className="relative flex min-h-[90vh] items-center overflow-hidden">
      {/* Background image + overlays */}
      <div className="absolute inset-0 z-0">
        <div
          className="h-full w-full bg-cover bg-center"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('/images/classroom-2.png')",
          }}
        />
        <div className="hero-gradient absolute inset-0" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-container-max px-margin-mobile py-20 text-white md:px-margin-desktop">
        <div className="max-w-3xl">
          <span className="mb-6 inline-block rounded-full border border-primary/30 bg-primary/20 px-4 py-2 text-label-md text-primary-fixed backdrop-blur-md">
            Admissions Open 2026-27
          </span>
          <h1 className="mb-6 text-[40px] font-bold leading-tight tracking-[-0.02em] drop-shadow-md sm:text-[44px] md:text-display">
            Best Tuition Classes for Academic Excellence
          </h1>
          <p className="mb-10 max-w-2xl text-body-lg text-white/90">
            Expert Teachers | Small Batches | Proven Results. Empowering the next
            generation of leaders through focused, results-driven pedagogy and
            personalized mentorship.
          </p>
          <div className="flex flex-wrap gap-6">
            <Button href="#contact" size="xl" className="shadow-2xl">
              Join Now <Icon name="trending_flat" />
            </Button>
            <Button href="#contact" variant="outline-light" size="xl">
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
