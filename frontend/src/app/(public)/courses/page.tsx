import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/PageHeader";
import { CoursesCatalog } from "@/components/sections/CoursesCatalog";
import { Icon } from "@/components/ui/Icon";
import { getCourses } from "@/lib/public-api";

export const metadata: Metadata = {
  title: "Our Courses | HHG Tuition Academy",
  description:
    "Explore our specialized courses across Secondary, Higher Secondary, Commerce, Test Prep and more — designed to accelerate academic achievement.",
};

const progressBars = [
  { label: "Conceptual Clarity", value: 92 },
  { label: "Exam Readiness", value: 88 },
  { label: "Confidence", value: 95 },
];

export default async function CoursesPage() {
  const courses = await getCourses();
  return (
    <>
      <PageHeader
        eyebrow="Specialized Programs"
        title="Explore Our Specialized Courses"
        subtitle="Empowering students through rigorous academic support and modern learning techniques. Choose your path to excellence."
      />

      <CoursesCatalog courses={courses} />

      {/* Track Your Learning Journey */}
      <section className="bg-surface-container-low py-24">
        <div className="mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop">
          <div className="grid grid-cols-1 items-center gap-16 rounded-2xl border border-surface-container-high bg-white p-10 ambient-shadow lg:grid-cols-2 lg:p-16">
            <div>
              <h2 className="mb-4 text-headline-lg font-bold text-on-surface">
                Track Your Learning Journey
              </h2>
              <p className="mb-8 text-body-md text-on-surface-variant">
                Our students don&apos;t just study — they measure measurable
                growth. Every program is built around clear milestones so
                progress is always visible.
              </p>
              <div className="flex flex-col gap-6">
                {progressBars.map((bar) => (
                  <div key={bar.label}>
                    <div className="mb-2 flex justify-between text-label-md font-medium text-on-surface">
                      <span>{bar.label}</span>
                      <span className="text-primary">{bar.value}%</span>
                    </div>
                    <div className="h-2.5 w-full overflow-hidden rounded-full bg-surface-container">
                      <div
                        className="h-full rounded-full bg-accent"
                        style={{ width: `${bar.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Score ring */}
            <div className="flex justify-center">
              <div className="relative flex h-64 w-64 items-center justify-center rounded-full bg-surface-container-low">
                <svg className="absolute inset-0 -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="44"
                    fill="none"
                    stroke="#e7eefe"
                    strokeWidth="8"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="44"
                    fill="none"
                    stroke="#003fb1"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray="276.5"
                    strokeDashoffset="41"
                  />
                </svg>
                <div className="text-center">
                  <div className="text-5xl font-bold tracking-[-0.02em] text-primary">
                    95+
                  </div>
                  <div className="mt-1 flex items-center justify-center gap-1 text-label-md font-semibold text-on-surface-variant">
                    <Icon name="trending_up" className="text-base text-accent" />
                    Score Rate
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
