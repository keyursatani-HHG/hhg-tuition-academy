import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { faculty } from "@/data/home";

export function Faculty() {
  return (
    <section id="faculty" className="bg-surface py-24">
      <div className="mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop">
        <SectionHeading
          className="mb-16"
          title="Meet Our Expert Faculty"
          subtitle="Our educators are more than teachers; they are mentors who guide students towards brilliance."
        />
        <div className="grid grid-cols-1 gap-gutter md:grid-cols-3">
          {faculty.map((member) => (
            <div key={member.id} className="group text-center">
              <div className="relative mx-auto mb-6 h-64 w-64 overflow-hidden rounded-full border-4 border-primary/10 p-2 transition-all group-hover:border-primary">
                <div className="relative h-full w-full overflow-hidden rounded-full">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="256px"
                    className="object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
                  />
                </div>
              </div>
              <h4 className="text-headline-md font-semibold text-on-surface">
                {member.name}
              </h4>
              <p className="mb-2 font-bold text-primary">{member.role}</p>
              <p className="px-8 text-body-md text-on-surface-variant">
                {member.bio}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
