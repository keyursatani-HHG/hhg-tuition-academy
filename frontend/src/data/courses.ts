import type { Course } from "@/data/home";

/**
 * Full course catalog for the /courses page. Mirrors the planned Course API DTO.
 */
export const allCourses: Course[] = [
  {
    id: "integrated-science-maths",
    title: "Integrated Science & Maths",
    category: "Secondary School",
    price: "₹2,500/month",
    description:
      "Comprehensive foundation in Physics, Chemistry, Biology and Mathematics aligned to the board curriculum.",
    duration: "12 Months",
    schedule: "Mon-Wed-Fri",
    image: "/images/classroom-1.png",
  },
  {
    id: "advanced-senior-mathematics",
    title: "Advanced Senior Mathematics",
    category: "Higher Secondary",
    price: "₹4,500/month",
    description:
      "Rigorous calculus, algebra and statistics preparation for boards and competitive entrance examinations.",
    duration: "24 Months",
    schedule: "Daily Batches",
    image: "/images/classroom-2.png",
  },
  {
    id: "commerce-excellence-program",
    title: "Commerce Excellence Program",
    category: "Professional",
    price: "₹3,800/month",
    description:
      "Accountancy, Economics and Business Studies taught through real-world case studies and board drills.",
    duration: "24 Months",
    schedule: "Tue-Thu-Sat",
    image: "/images/classroom-1.png",
  },
  {
    id: "ielts-prep-masterclass",
    title: "IELTS Prep Masterclass",
    category: "Test Prep",
    price: "₹5,000/month",
    description:
      "Intensive listening, reading, writing and speaking modules with weekly mock tests and feedback.",
    duration: "6 Months",
    schedule: "Sat-Sun",
    image: "/images/classroom-2.png",
  },
  {
    id: "coding-for-young-innovators",
    title: "Coding for Young Innovators",
    category: "Secondary School",
    price: "₹3,200/month",
    description:
      "Hands-on programming, logic building and project work that nurtures computational thinking early.",
    duration: "12 Months",
    schedule: "Mon-Thu",
    image: "/images/classroom-1.png",
  },
];

/** Distinct categories for the filter control (with an "All" sentinel). */
export const courseCategories = [
  "All Subjects",
  ...Array.from(new Set(allCourses.map((c) => c.category))),
];
