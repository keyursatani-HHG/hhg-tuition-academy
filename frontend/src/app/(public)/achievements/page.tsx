import type { Metadata } from "next";
import Image from "next/image";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { PageHeader } from "@/components/sections/PageHeader";
import { getAchievements, getGallery } from "@/lib/public-api";

export const metadata: Metadata = {
  title: "Achievements | HHG Tuition Academy",
  description:
    "Celebrating our students' success — board toppers, national winners and remarkable score improvements at HHG Tuition Academy.",
};

const boardResults = [
  { value: "98%", label: "Pass Percentage" },
  { value: "45+", label: "Distinctions" },
  { value: "120+", label: "Top Rankers" },
  { value: "100/100", label: "Perfect Scores" },
];

export default async function AchievementsPage() {
  const [achievements, galleryImages] = await Promise.all([
    getAchievements(),
    getGallery(),
  ]);
  return (
    <>
      <PageHeader
        eyebrow="Hall Of Fame"
        title="Celebrating Our Success"
        subtitle="Hard work, expert mentorship and consistency — the formula behind every result on this page."
      />

      {/* Board results band */}
      <section className="bg-surface py-16">
        <div className="mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop">
          <div className="flex flex-col gap-8 rounded-2xl bg-primary p-10 text-white ambient-shadow lg:flex-row lg:items-center lg:justify-between">
            <div className="grid flex-grow grid-cols-2 gap-8 md:grid-cols-4">
              {boardResults.map((r) => (
                <div key={r.label} className="text-center">
                  <div className="text-4xl font-bold tracking-[-0.02em]">
                    {r.value}
                  </div>
                  <div className="mt-1 text-label-md font-semibold uppercase tracking-widest text-white/75">
                    {r.label}
                  </div>
                </div>
              ))}
            </div>
            <Button href="/contact" variant="white" className="flex-shrink-0">
              <Icon name="download" /> 2023 Results
            </Button>
          </div>
        </div>
      </section>

      {/* Shining stars */}
      <section className="bg-surface-container-low py-24">
        <div className="mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop">
          <h2 className="mb-16 text-center text-headline-lg font-bold text-on-surface">
            Our Shining Stars
          </h2>
          <div className="grid grid-cols-1 gap-gutter md:grid-cols-3">
            {achievements.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl border border-surface-container-high bg-white p-8 text-center ambient-shadow"
              >
                <div className="relative mb-6">
                  <div className="relative mx-auto h-32 w-32 overflow-hidden rounded-full border-4 border-primary/20">
                    <Image
                      src={item.image}
                      alt={item.studentName}
                      fill
                      sizes="128px"
                      className="object-cover"
                    />
                  </div>
                  <Badge
                    variant={item.badgeColor}
                    className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-4 shadow-lg"
                  >
                    {item.badge}
                  </Badge>
                </div>
                <h4 className="mb-1 text-headline-md font-semibold">
                  {item.title}
                </h4>
                <p className="mb-4 font-bold text-primary">{item.studentName}</p>
                <p className="text-body-md text-on-surface-variant">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="bg-surface py-24">
        <div className="mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop">
          <h2 className="mb-16 text-center text-headline-lg font-bold text-on-surface">
            Life at HHG Academy
          </h2>
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {galleryImages.map((img, i) => (
              <div
                key={`${img.alt}-${i}`}
                className="group relative h-64 overflow-hidden rounded-2xl shadow-md transition-all hover:shadow-xl"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-20 text-center text-white">
        <div className="mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop">
          <h2 className="mb-6 text-4xl font-bold leading-tight tracking-[-0.02em]">
            Ready to Join Our Hall of Fame?
          </h2>
          <Button href="/contact" variant="white" size="lg" className="text-lg">
            Enroll Today
          </Button>
        </div>
      </section>
    </>
  );
}
