import {
  Hero,
  Stats,
  WhyChooseUs,
  FeaturedCourses,
  Faculty,
  Achievements,
  Gallery,
  Testimonials,
  CTASection,
} from "@/components/sections/home";
import {
  getFeaturedCourses,
  getHomeFaculty,
  getAchievements,
  getGallery,
  getTestimonials,
} from "@/lib/public-api";

export default async function HomePage() {
  const [courses, faculty, achievements, gallery, testimonials] =
    await Promise.all([
      getFeaturedCourses(),
      getHomeFaculty(),
      getAchievements(),
      getGallery(),
      getTestimonials(),
    ]);

  return (
    <>
      <Hero />
      <Stats />
      <WhyChooseUs />
      <FeaturedCourses courses={courses} />
      <Faculty faculty={faculty.slice(0, 3)} />
      <Achievements achievements={achievements.slice(0, 3)} />
      <Gallery images={gallery.slice(0, 4)} />
      <Testimonials testimonials={testimonials.slice(0, 3)} />
      <CTASection />
    </>
  );
}
