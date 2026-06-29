export interface MethodologyStep {
  icon: string;
  title: string;
  description: string;
}

export const methodology: MethodologyStep[] = [
  {
    icon: "diagnostic",
    title: "Diagnostic Assessment",
    description:
      "We begin with a precise analysis of a student's strengths and conceptual gaps before teaching begins.",
  },
  {
    icon: "construction",
    title: "Structured Scaffolding",
    description:
      "Carefully sequenced coursework only ever introduces complexity once the underlying fundamentals are secure.",
  },
  {
    icon: "autorenew",
    title: "Iterative Revision",
    description:
      "Continuous testing and low-stakes feedback loops ensure that knowledge is retained and consolidated.",
  },
];

export const aboutStats = [
  { value: "15+", label: "Years of Excellence" },
  { value: "5000+", label: "Students Mentored" },
];
