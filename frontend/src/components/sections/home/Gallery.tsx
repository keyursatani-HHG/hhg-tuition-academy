import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { galleryImages } from "@/data/home";
import { cn } from "@/lib/utils";

export function Gallery() {
  return (
    <section className="bg-surface py-24">
      <div className="mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop">
        <div className="mb-16 flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="text-center md:text-left">
            <h2 className="mb-2 text-headline-lg font-bold text-on-surface">
              Life at HHG Academy
            </h2>
            <p className="text-body-md text-on-surface-variant">
              Peek into our vibrant classrooms and activities.
            </p>
          </div>
          <Button href="#achievements" variant="soft" className="px-8 py-3">
            View Gallery
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {galleryImages.map((img, i) => (
            <div
              key={`${img.alt}-${i}`}
              className={cn(
                "group relative h-80 overflow-hidden rounded-2xl shadow-md transition-all hover:shadow-xl",
                i % 2 === 1 && "lg:mt-8",
              )}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
