import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { features } from "@/data/home";

export function WhyChooseUs() {
  return (
    <section id="about" className="bg-surface py-24">
      <div className="mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop">
        <SectionHeading
          className="mb-16"
          title="Why Choose HHG Academy?"
          subtitle="We provide a holistic learning environment that combines traditional academic rigor with modern digital tools to ensure every student succeeds."
        />
        <div className="grid grid-cols-1 gap-gutter md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <Card key={feature.title} interactive className="p-8">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-surface-container">
                <Icon name={feature.icon} className="text-4xl text-primary" />
              </div>
              <h3 className="mb-3 text-headline-md font-semibold text-on-surface">
                {feature.title}
              </h3>
              <p className="text-body-md text-on-surface-variant">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
