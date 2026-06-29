/**
 * Server-side data access for the public site.
 *
 * Fetches published content from the FastAPI backend and maps the API DTOs to
 * the frontend component types. If the backend is unreachable or returns no
 * rows, falls back to the typed seed data in `src/data/*` so the public site
 * never renders broken.
 */

import type { Course, Faculty as HomeFaculty, Achievement, Testimonial } from "@/data/home";
import {
  courses as seedCourses,
  faculty as seedHomeFaculty,
  achievements as seedAchievements,
  galleryImages as seedGallery,
  testimonials as seedTestimonials,
} from "@/data/home";
import { allCourses as seedAllCourses } from "@/data/courses";
import { facultyMembers as seedFaculty, type FacultyMember } from "@/data/faculty";

const API =
  process.env.API_BASE_URL ??
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "http://localhost:8000/api/v1";

interface GalleryItem {
  src: string;
  alt: string;
}

async function fetchItems<T>(path: string): Promise<T[] | null> {
  try {
    const res = await fetch(`${API}${path}`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    const data = await res.json();
    const items = data?.items;
    return Array.isArray(items) && items.length > 0 ? (items as T[]) : null;
  } catch {
    return null;
  }
}

// ───────────── API DTO shapes ─────────────
interface ApiCourse {
  id: number;
  title: string;
  category: string;
  price: string;
  description: string;
  duration: string;
  schedule: string;
  image_url: string;
}
interface ApiFaculty {
  id: number;
  name: string;
  role: string;
  subject: string;
  qualification: string;
  bio: string;
  image_url: string;
}
interface ApiAchievement {
  id: number;
  title: string;
  student_name: string;
  detail: string;
  badge: string;
  badge_color: Achievement["badgeColor"];
  image_url: string;
}
interface ApiGallery {
  id: number;
  image_url: string;
  caption: string;
}
interface ApiTestimonial {
  id: number;
  quote: string;
  name: string;
  role: string;
  rating: number;
  image_url: string;
}

// ───────────── Mappers ─────────────
const toCourse = (c: ApiCourse): Course => ({
  id: String(c.id),
  title: c.title,
  category: c.category,
  price: c.price,
  description: c.description,
  duration: c.duration,
  schedule: c.schedule,
  image: c.image_url || "/images/classroom-1.png",
});

const toFaculty = (f: ApiFaculty): FacultyMember & HomeFaculty => ({
  id: String(f.id),
  name: f.name,
  role: f.role,
  subject: f.subject,
  qualification: f.qualification,
  bio: f.bio,
  image: f.image_url || "/images/faculty-1.png",
});

const toAchievement = (a: ApiAchievement): Achievement => ({
  id: String(a.id),
  title: a.title,
  studentName: a.student_name,
  detail: a.detail,
  badge: a.badge,
  badgeColor: a.badge_color,
  image: a.image_url || "/images/student-1.png",
});

const toGallery = (g: ApiGallery): GalleryItem => ({
  src: g.image_url,
  alt: g.caption,
});

const toTestimonial = (t: ApiTestimonial): Testimonial => ({
  id: String(t.id),
  quote: t.quote,
  name: t.name,
  role: t.role,
  rating: t.rating,
  image: t.image_url || "/images/student-1.png",
});

// ───────────── Public getters (with seed fallback) ─────────────
export async function getCourses(): Promise<Course[]> {
  const items = await fetchItems<ApiCourse>("/courses?limit=100");
  return items ? items.map(toCourse) : seedAllCourses;
}

export async function getFeaturedCourses(): Promise<Course[]> {
  const items = await fetchItems<ApiCourse>("/courses?limit=3");
  return items ? items.map(toCourse) : seedCourses;
}

export async function getFaculty(): Promise<(FacultyMember & HomeFaculty)[]> {
  const items = await fetchItems<ApiFaculty>("/faculty?limit=100");
  return items ? items.map(toFaculty) : (seedFaculty as (FacultyMember & HomeFaculty)[]);
}

export async function getHomeFaculty(): Promise<HomeFaculty[]> {
  const items = await fetchItems<ApiFaculty>("/faculty?limit=3");
  return items ? items.map(toFaculty) : seedHomeFaculty;
}

export async function getAchievements(): Promise<Achievement[]> {
  const items = await fetchItems<ApiAchievement>("/achievements?limit=100");
  return items ? items.map(toAchievement) : seedAchievements;
}

export async function getGallery(): Promise<GalleryItem[]> {
  const items = await fetchItems<ApiGallery>("/gallery?limit=100");
  return items ? items.map(toGallery) : seedGallery;
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const items = await fetchItems<ApiTestimonial>("/testimonials?limit=100");
  return items ? items.map(toTestimonial) : seedTestimonials;
}
