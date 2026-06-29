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

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <WhyChooseUs />
      <FeaturedCourses />
      <Faculty />
      <Achievements />
      <Gallery />
      <Testimonials />
      <CTASection />
    </>
  );
}
