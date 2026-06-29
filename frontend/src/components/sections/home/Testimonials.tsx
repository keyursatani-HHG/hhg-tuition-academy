import Image from "next/image";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { testimonials } from "@/data/home";

export function Testimonials() {
  return (
    <section className="overflow-hidden bg-surface-container-highest/20 py-24">
      <div className="mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop">
        <SectionHeading
          className="mb-16"
          title="What Our Community Says"
          subtitle="Feedback that motivates us to keep excelling."
        />
        <div className="grid grid-cols-1 gap-gutter md:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="flex h-full flex-col rounded-2xl border border-surface-container-high bg-white p-8 ambient-shadow"
            >
              <div className="mb-4 flex gap-1 text-[#FFD700]">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Icon key={i} name="star" filled className="text-xl" />
                ))}
              </div>
              <p className="mb-6 flex-grow text-body-md text-on-surface">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-4">
                <div className="relative h-12 w-12 overflow-hidden rounded-full">
                  <Image
                    src={t.image}
                    alt={t.name}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-on-surface">{t.name}</h4>
                  <p className="text-label-sm text-on-surface-variant">
                    {t.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
