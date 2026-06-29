import type { Metadata } from "next";
import Image from "next/image";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { PageHeader } from "@/components/sections/PageHeader";
import { trustedBy } from "@/data/faculty";
import { getFaculty } from "@/lib/public-api";

export const metadata: Metadata = {
  title: "Our Faculty | HHG Tuition Academy",
  description:
    "Learn from world-class educators — PhD holders, chartered accountants and master teachers dedicated to your academic success.",
};

export default async function FacultyPage() {
  const facultyMembers = await getFaculty();
  return (
    <>
      <PageHeader
        eyebrow="Meet The Mentors"
        title="Learn from World-Class Educators"
        subtitle="Our faculty combine deep subject knowledge with a genuine passion for teaching — the standard for student success."
      />

      <section className="bg-surface py-24">
        <div className="mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop">
          <div className="grid grid-cols-1 gap-gutter sm:grid-cols-2 lg:grid-cols-3">
            {facultyMembers.map((member) => (
              <div
                key={member.id}
                className="flex flex-col items-center rounded-2xl border border-surface-container-high bg-white p-8 text-center ambient-shadow ambient-shadow-hover"
              >
                <div className="relative mb-5 h-28 w-28 overflow-hidden rounded-full border-4 border-primary/10">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="112px"
                    className="object-cover"
                  />
                </div>
                <h3 className="text-headline-md font-semibold text-on-surface">
                  {member.name}
                </h3>
                <p className="mb-3 font-bold text-primary">{member.role}</p>
                <div className="mb-4 flex flex-wrap justify-center gap-2">
                  <Badge>{member.subject}</Badge>
                  <Badge variant="chip">{member.qualification}</Badge>
                </div>
                <p className="mb-5 flex-grow text-body-md text-on-surface-variant">
                  {member.bio}
                </p>
                <div className="flex gap-3 text-on-surface-variant">
                  <Icon name="mail" className="text-xl hover:text-primary" />
                  <Icon name="call" className="text-xl hover:text-primary" />
                  <Icon name="public" className="text-xl hover:text-primary" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted by */}
      <section className="bg-primary py-16 text-white">
        <div className="mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop">
          <h2 className="mb-10 text-center text-headline-md font-semibold">
            Expertise You Can Trust
          </h2>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {trustedBy.map((name) => (
              <div
                key={name}
                className="flex items-center justify-center gap-2 text-center text-label-md font-bold uppercase tracking-widest text-white/80"
              >
                <Icon name="verified" className="text-xl" />
                {name}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
