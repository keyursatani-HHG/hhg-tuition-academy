import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { PageHeader } from "@/components/sections/PageHeader";
import { methodology, aboutStats } from "@/data/about";

export const metadata: Metadata = {
  title: "About Us | HHG Tuition Academy",
  description:
    "Redefining education through precision and care. Learn about HHG Tuition Academy's story, mission, vision, and proven methodology.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="Education Is About Building Futures"
        title={
          <>
            Redefining Education
            <br />
            Through Precision and Care.
          </>
        }
        subtitle="We bridge the gap between traditional rigour and modern academic success, providing students with the tools to master their curriculum and exceed their potential."
      >
        <div className="flex flex-wrap gap-4">
          <Button href="/courses" size="lg">
            View Our Courses
          </Button>
          <Button href="/faculty" variant="secondary" size="lg">
            Meet Our Faculty
          </Button>
        </div>
      </PageHeader>

      {/* Our Tuition Story */}
      <section className="bg-surface py-24">
        <div className="mx-auto grid max-w-container-max grid-cols-1 items-center gap-16 px-margin-mobile md:px-margin-desktop lg:grid-cols-2">
          <div className="relative h-[420px] overflow-hidden rounded-2xl ambient-shadow">
            <Image
              src="/images/classroom-1.png"
              alt="HHG Academy classroom"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="mb-6 text-headline-lg font-bold text-on-surface">
              Our Tuition Story
            </h2>
            <p className="mb-4 text-body-md text-on-surface-variant">
              HHG Tuition Academy began with a single observation: that every
              student possesses an untapped reservoir of potential that standard
              classroom settings often fail to reach.
            </p>
            <p className="mb-8 text-body-md text-on-surface-variant">
              Founded by a group of dedicated educators and industry experts, we
              set out to create a sanctuary for focused learning — built on
              precision, accountability and genuine care for every learner.
            </p>
            <div className="grid grid-cols-2 gap-8 border-t border-outline-variant/30 pt-8">
              {aboutStats.map((stat) => (
                <div key={stat.label}>
                  <div className="text-5xl font-bold tracking-[-0.02em] text-primary">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-label-md font-semibold uppercase tracking-widest text-on-surface-variant">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission / Vision */}
      <section className="bg-surface-container-low py-24">
        <div className="mx-auto grid max-w-container-max grid-cols-1 gap-gutter px-margin-mobile md:grid-cols-2 md:px-margin-desktop">
          <div className="rounded-2xl border border-surface-container-high bg-white p-10 ambient-shadow">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-surface-container">
              <Icon name="target" className="text-4xl text-primary" />
            </div>
            <h3 className="mb-3 text-headline-md font-semibold text-on-surface">
              Our Mission
            </h3>
            <p className="text-body-md text-on-surface-variant">
              To empower the next generation of leaders and thinkers by delivering
              world-class, personalised academic support. We instil confidence,
              critical thinking and a lifelong passion for learning in every
              student we mentor.
            </p>
          </div>
          <div className="rounded-2xl bg-primary p-10 text-white ambient-shadow">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15">
              <Icon name="visibility" className="text-4xl text-white" />
            </div>
            <h3 className="mb-3 text-headline-md font-semibold">Our Vision</h3>
            <p className="text-body-md text-white/85">
              To be the global standard for supplementary education — recognised
              for transforming student outcomes and fostering a lifelong passion
              for learning. We envision a future where geographical and
              institutional barriers to high-quality tuition are dissolved through
              our innovative delivery model.
            </p>
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section className="bg-surface py-24">
        <div className="mx-auto grid max-w-container-max grid-cols-1 items-center gap-16 px-margin-mobile md:px-margin-desktop lg:grid-cols-2">
          <div>
            <h2 className="mb-10 text-headline-lg font-bold text-on-surface">
              The HHG Methodology
            </h2>
            <div className="flex flex-col gap-8">
              {methodology.map((step) => (
                <div key={step.title} className="flex gap-5">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-surface-container">
                    <Icon name={step.icon} className="text-2xl text-primary" />
                  </div>
                  <div>
                    <h3 className="mb-1 text-headline-md font-semibold text-on-surface">
                      {step.title}
                    </h3>
                    <p className="text-body-md text-on-surface-variant">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative h-[420px] overflow-hidden rounded-2xl ambient-shadow">
            <Image
              src="/images/classroom-2.png"
              alt="Students tracking progress"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-20 text-center text-white">
        <div className="mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop">
          <h2 className="mb-6 text-4xl font-bold leading-tight tracking-[-0.02em]">
            Ready to achieve academic excellence?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-body-lg text-white/85">
            Join the academy that prioritises your child&apos;s success through
            systematic tutoring and professional mentorship.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button href="/contact" variant="white" size="lg" className="text-lg">
              Start Enrollment
            </Button>
            <Button
              href="/contact"
              variant="outline-light"
              size="lg"
              className="text-lg"
            >
              Book a Consultation
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
