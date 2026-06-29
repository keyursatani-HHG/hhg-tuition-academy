import { Button } from "@/components/ui/Button";

export function CTASection() {
  return (
    <section className="bg-primary py-20 text-center text-white">
      <div className="mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop">
        <h2 className="mb-6 text-4xl font-bold leading-tight tracking-[-0.02em]">
          Admissions Open for 2026-27 | Limited Seats Available
        </h2>
        <Button href="#contact" variant="white" size="lg" className="text-lg">
          Enroll Now
        </Button>
      </div>
    </section>
  );
}
