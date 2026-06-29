export interface FacultyMember {
  id: string;
  name: string;
  role: string;
  subject: string;
  qualification: string;
  bio: string;
  image: string;
}

/** Full faculty roster for the /faculty page. Mirrors the planned Faculty API DTO. */
export const facultyMembers: FacultyMember[] = [
  {
    id: "rajesh-sharma",
    name: "Dr. Rajesh Sharma",
    role: "Senior Physics Faculty",
    subject: "Physics",
    qualification: "PhD, Quantum Physics",
    bio: "Fifteen years of turning abstract physics into intuition students never forget.",
    image: "/images/faculty-1.png",
  },
  {
    id: "anjali-gupta",
    name: "Ms. Anjali Gupta",
    role: "HOD — Mathematics",
    subject: "Mathematics",
    qualification: "M.Sc. Mathematics",
    bio: "Renowned for simplifying complex calculus into elegant, memorable steps.",
    image: "/images/faculty-2.png",
  },
  {
    id: "amit-verma",
    name: "Mr. Amit Verma",
    role: "Business Studies Expert",
    subject: "Commerce",
    qualification: "Chartered Accountant",
    bio: "A practising CA who brings real boardroom case studies into the classroom.",
    image: "/images/faculty-3.png",
  },
  {
    id: "sarah-jenkins",
    name: "Dr. Sarah Jenkins",
    role: "Chemistry Lead",
    subject: "Chemistry",
    qualification: "PhD, Organic Chemistry",
    bio: "Makes reactions click with vivid demonstrations and exam-focused frameworks.",
    image: "/images/faculty-2.png",
  },
  {
    id: "david-chen",
    name: "Prof. David Chen",
    role: "Computer Science",
    subject: "Coding",
    qualification: "M.Tech, Computer Science",
    bio: "Mentors young innovators from first principles to full project builds.",
    image: "/images/faculty-1.png",
  },
  {
    id: "linda-yao",
    name: "Mrs. Linda Yao",
    role: "English & IELTS Coach",
    subject: "English",
    qualification: "MA, English Literature",
    bio: "Helps students find their voice and ace high-stakes language assessments.",
    image: "/images/faculty-3.png",
  },
];

export const trustedBy = [
  "University of Oxford",
  "Cambridge Int'l",
  "Imperial College",
  "Ivy League Assoc.",
];
