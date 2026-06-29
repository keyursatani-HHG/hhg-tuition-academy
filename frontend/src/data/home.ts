/**
 * Static content for the Home page sections.
 * In Phase 7 the dynamic parts (courses, faculty, achievements, testimonials)
 * are replaced by live data from the FastAPI backend. The shapes here mirror
 * the planned API DTOs so the swap is mechanical.
 */

export interface Stat {
  value: string;
  label: string;
}

export interface Feature {
  icon: string; // Material Symbols name
  title: string;
  description: string;
}

export interface Course {
  id: string;
  title: string;
  category: string;
  price: string;
  description: string;
  duration: string;
  schedule: string;
  image: string;
}

export interface Faculty {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
}

export interface Achievement {
  id: string;
  title: string;
  studentName: string;
  detail: string;
  badge: string;
  badgeColor: "primary" | "tertiary" | "primary-container";
  image: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  rating: number;
  image: string;
}

export const stats: Stat[] = [
  { value: "10+", label: "Years Experience" },
  { value: "500+", label: "Active Students" },
  { value: "95%", label: "Success Rate" },
  { value: "25+", label: "Expert Teachers" },
];

export const features: Feature[] = [
  {
    icon: "school",
    title: "Experienced Faculty",
    description:
      "Learn from industry veterans and PhD holders dedicated to your academic growth.",
  },
  {
    icon: "person_search",
    title: "Personalized Learning",
    description:
      "Customized attention in small batch sizes to target individual strengths and weaknesses.",
  },
  {
    icon: "assignment_turned_in",
    title: "Weekly Tests",
    description:
      "Regular assessments to track progress and refine competitive exam-taking strategies.",
  },
  {
    icon: "payments",
    title: "Affordable Fees",
    description:
      "Quality education shouldn't be a luxury. We offer competitive and transparent pricing.",
  },
];

export const courses: Course[] = [
  {
    id: "class-8-10-foundation",
    title: "Class 8-10 Foundation",
    category: "Secondary School",
    price: "₹2,500/month",
    description:
      "Comprehensive curriculum covering Mathematics, Science, and Social Studies with board exam focus.",
    duration: "12 Months",
    schedule: "Mon-Wed-Fri",
    image: "/images/classroom-1.png",
  },
  {
    id: "science-stream-pcmb",
    title: "Science Stream (PCM/B)",
    category: "Higher Secondary",
    price: "₹4,500/month",
    description:
      "Specialized coaching for Physics, Chemistry, Biology, and Math for Boards and Entrance exams.",
    duration: "24 Months",
    schedule: "Daily Batches",
    image: "/images/classroom-2.png",
  },
  {
    id: "commerce-excellence",
    title: "Commerce Excellence",
    category: "Professional",
    price: "₹3,800/month",
    description:
      "Master Accountancy, Economics, and Business Studies with practical case studies and board preparation.",
    duration: "24 Months",
    schedule: "Tue-Thu-Sat",
    image: "/images/classroom-1.png",
  },
];

export const faculty: Faculty[] = [
  {
    id: "rajesh-sharma",
    name: "Dr. Rajesh Sharma",
    role: "Senior Physics Faculty",
    bio: "PhD in Quantum Physics with 15+ years of teaching excellence.",
    image: "/images/faculty-1.png",
  },
  {
    id: "anjali-gupta",
    name: "Ms. Anjali Gupta",
    role: "HOD - Mathematics",
    bio: "M.Sc. Mathematics, known for simplifying complex calculus concepts.",
    image: "/images/faculty-2.png",
  },
  {
    id: "amit-verma",
    name: "Mr. Amit Verma",
    role: "Business Studies Expert",
    bio: "Chartered Accountant with a passion for academic mentoring.",
    image: "/images/faculty-3.png",
  },
];

export const achievements: Achievement[] = [
  {
    id: "priya-singhania",
    title: "99.8% Board Topper",
    studentName: "Priya Singhania",
    detail: "Class 10 State Board - 2023",
    badge: "Rank #1",
    badgeColor: "primary",
    image: "/images/student-1.png",
  },
  {
    id: "aryan-mehta",
    title: "Best Science Project",
    studentName: "Aryan Mehta",
    detail: "National STEM Innovation Award",
    badge: "National Winner",
    badgeColor: "tertiary",
    image: "/images/student-2.png",
  },
  {
    id: "sneha-kapoor",
    title: "Score Increase",
    studentName: "Sneha Kapoor",
    detail: "+18% Average Score Improvement",
    badge: "Most Improved",
    badgeColor: "primary-container",
    image: "/images/student-3.png",
  },
];

export const galleryImages: { src: string; alt: string }[] = [
  { src: "/images/classroom-1.png", alt: "Classroom" },
  { src: "/images/classroom-2.png", alt: "Group Study" },
  { src: "/images/classroom-2.png", alt: "Lab Work" },
  { src: "/images/classroom-1.png", alt: "Seminar" },
];

export const testimonials: Testimonial[] = [
  {
    id: "rahul-sharma",
    quote: "Best tuition classes. Improved my marks from 65% to 92%.",
    name: "Rahul Sharma",
    role: "Student",
    rating: 5,
    image: "/images/student-1.png",
  },
  {
    id: "priya-singh",
    quote:
      "The teachers are very supportive. My fundamentals are much stronger now.",
    name: "Priya Singh",
    role: "Student",
    rating: 5,
    image: "/images/student-2.png",
  },
  {
    id: "ishaan-verma",
    quote: "Great environment for learning. Highly recommended!",
    name: "Ishaan Verma",
    role: "Student",
    rating: 5,
    image: "/images/student-3.png",
  },
];
