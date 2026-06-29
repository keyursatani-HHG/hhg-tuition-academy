import Image from "next/image";
import { Badge } from "@/components/ui/Badge";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Achievement } from "@/data/home";

export function Achievements({ achievements }: { achievements: Achievement[] }) {
  return (
    <section id="achievements" className="bg-surface-container-low py-24">
      <div className="mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop">
        <SectionHeading
          className="mb-16"
          title="Our Hall of Fame"
          subtitle="Celebrating the hard work and success of our brightest stars."
        />
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
  );
}
