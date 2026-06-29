import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { courses } from "@/data/home";

export function FeaturedCourses() {
  return (
    <section id="courses" className="bg-surface-container-low py-24">
      <div className="mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop">
        <div className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="mb-2 text-headline-lg font-bold text-on-surface">
              Featured Courses
            </h2>
            <p className="text-body-md text-on-surface-variant">
              Find the perfect program for your academic goals.
            </p>
          </div>
          <Link
            href="#courses"
            className="group flex items-center gap-2 font-bold text-primary"
          >
            View All Courses
            <Icon
              name="arrow_forward"
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-gutter md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <div
              key={course.id}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-surface-container-high bg-white ambient-shadow ambient-shadow-hover"
            >
              <div
                className="h-56 w-full overflow-hidden bg-cover bg-center"
                style={{ backgroundImage: `url('${course.image}')` }}
              >
                <div className="h-full w-full bg-black/10 transition-colors group-hover:bg-black/0" />
              </div>
              <div className="flex flex-grow flex-col p-8">
                <div className="mb-4 flex items-start justify-between">
                  <Badge>{course.category}</Badge>
                  <span className="text-lg font-bold text-primary">
                    {course.price}
                  </span>
                </div>
                <h3 className="mb-2 text-headline-md font-semibold">
                  {course.title}
                </h3>
                <p className="mb-6 flex-grow text-body-md text-on-surface-variant">
                  {course.description}
                </p>
                <div className="grid grid-cols-2 gap-4 border-t border-outline-variant/30 pt-6 text-label-md font-medium text-on-surface-variant">
                  <div className="flex items-center gap-2">
                    <Icon name="schedule" className="text-base text-primary" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon
                      name="calendar_month"
                      className="text-base text-primary"
                    />
                    <span>{course.schedule}</span>
                  </div>
                </div>
                <Button
                  href="#contact"
                  variant="secondary"
                  className="mt-8 w-full py-4"
                >
                  Learn More
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
