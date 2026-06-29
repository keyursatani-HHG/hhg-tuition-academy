"use client";

import { useMemo, useState } from "react";
import { CourseCard } from "@/components/CourseCard";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { allCourses, courseCategories } from "@/data/courses";

/**
 * Searchable, filterable course catalog. Includes a "not sure which course"
 * promo card mixed into the grid, matching the design.
 */
export function CoursesCatalog() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(courseCategories[0]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allCourses.filter((c) => {
      const matchesCategory =
        category === courseCategories[0] || c.category === category;
      const matchesQuery =
        !q ||
        c.title.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [query, category]);

  return (
    <section className="bg-surface py-16">
      <div className="mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop">
        {/* Controls */}
        <div className="mb-12 flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-grow">
            <Icon
              name="search"
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search courses by name or subject..."
              className="w-full rounded-lg border border-outline-variant/60 bg-surface-container-low py-3.5 pl-12 pr-4 text-body-md transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="appearance-none rounded-lg border border-outline-variant/60 bg-surface-container-low px-4 py-3.5 text-body-md font-medium text-on-surface transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 sm:w-56"
          >
            {courseCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <p className="py-16 text-center text-body-lg text-on-surface-variant">
            No courses match your search. Try a different keyword or category.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-gutter md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}

            {/* Promo card */}
            <div className="flex flex-col justify-center rounded-2xl bg-primary p-8 text-white ambient-shadow">
              <h3 className="mb-3 text-headline-md font-semibold">
                Not sure which course to pick?
              </h3>
              <p className="mb-8 text-body-md text-white/85">
                Schedule a free counselling session with our expert academic
                advisors to chart the right path for your goals.
              </p>
              <Button href="/contact" variant="white">
                Book Free Consultation
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
