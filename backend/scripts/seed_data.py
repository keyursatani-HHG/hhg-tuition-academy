"""Seed sample content matching the frontend design data.

Usage:  python -m scripts.seed_data
Idempotent per table: skips a table that already has rows.
"""

import asyncio

from app.core.database import AsyncSessionLocal
from app.models.achievement import Achievement
from app.models.blog import BlogPost
from app.models.course import Course
from app.models.faculty import Faculty
from app.models.gallery import GalleryImage
from app.models.inquiry import Inquiry, InquiryStatus
from app.models.student import Student, StudentStatus
from app.models.testimonial import Testimonial
from app.repositories.base import BaseRepository

COURSES = [
    dict(title="Integrated Science & Maths", category="Secondary School",
         price="₹2,500/month", duration="12 Months", schedule="Mon-Wed-Fri",
         image_url="/images/classroom-1.png",
         description="Comprehensive foundation in Physics, Chemistry, Biology and Mathematics aligned to the board curriculum."),
    dict(title="Advanced Senior Mathematics", category="Higher Secondary",
         price="₹4,500/month", duration="24 Months", schedule="Daily Batches",
         image_url="/images/classroom-2.png",
         description="Rigorous calculus, algebra and statistics preparation for boards and competitive entrance examinations."),
    dict(title="Commerce Excellence Program", category="Professional",
         price="₹3,800/month", duration="24 Months", schedule="Tue-Thu-Sat",
         image_url="/images/classroom-1.png",
         description="Accountancy, Economics and Business Studies taught through real-world case studies and board drills."),
    dict(title="IELTS Prep Masterclass", category="Test Prep",
         price="₹5,000/month", duration="6 Months", schedule="Sat-Sun",
         image_url="/images/classroom-2.png",
         description="Intensive listening, reading, writing and speaking modules with weekly mock tests and feedback."),
    dict(title="Coding for Young Innovators", category="Secondary School",
         price="₹3,200/month", duration="12 Months", schedule="Mon-Thu",
         image_url="/images/classroom-1.png",
         description="Hands-on programming, logic building and project work that nurtures computational thinking early."),
]

FACULTY = [
    dict(name="Dr. Rajesh Sharma", role="Senior Physics Faculty", subject="Physics",
         qualification="PhD, Quantum Physics", image_url="/images/faculty-1.png", display_order=1,
         bio="Fifteen years of turning abstract physics into intuition students never forget."),
    dict(name="Ms. Anjali Gupta", role="HOD — Mathematics", subject="Mathematics",
         qualification="M.Sc. Mathematics", image_url="/images/faculty-2.png", display_order=2,
         bio="Renowned for simplifying complex calculus into elegant, memorable steps."),
    dict(name="Mr. Amit Verma", role="Business Studies Expert", subject="Commerce",
         qualification="Chartered Accountant", image_url="/images/faculty-3.png", display_order=3,
         bio="A practising CA who brings real boardroom case studies into the classroom."),
    dict(name="Dr. Sarah Jenkins", role="Chemistry Lead", subject="Chemistry",
         qualification="PhD, Organic Chemistry", image_url="/images/faculty-2.png", display_order=4,
         bio="Makes reactions click with vivid demonstrations and exam-focused frameworks."),
    dict(name="Prof. David Chen", role="Computer Science", subject="Coding",
         qualification="M.Tech, Computer Science", image_url="/images/faculty-1.png", display_order=5,
         bio="Mentors young innovators from first principles to full project builds."),
    dict(name="Mrs. Linda Yao", role="English & IELTS Coach", subject="English",
         qualification="MA, English Literature", image_url="/images/faculty-3.png", display_order=6,
         bio="Helps students find their voice and ace high-stakes language assessments."),
]

ACHIEVEMENTS = [
    dict(title="99.8% Board Topper", student_name="Priya Singhania", detail="Class 10 State Board - 2023",
         badge="Rank #1", badge_color="primary", image_url="/images/student-1.png", display_order=1),
    dict(title="Best Science Project", student_name="Aryan Mehta", detail="National STEM Innovation Award",
         badge="National Winner", badge_color="tertiary", image_url="/images/student-2.png", display_order=2),
    dict(title="Score Increase", student_name="Sneha Kapoor", detail="+18% Average Score Improvement",
         badge="Most Improved", badge_color="primary-container", image_url="/images/student-3.png", display_order=3),
]

GALLERY = [
    dict(image_url="/images/classroom-1.png", caption="Classroom", display_order=1),
    dict(image_url="/images/classroom-2.png", caption="Group Study", display_order=2),
    dict(image_url="/images/classroom-2.png", caption="Lab Work", display_order=3),
    dict(image_url="/images/classroom-1.png", caption="Seminar", display_order=4),
]

TESTIMONIALS = [
    dict(quote="Best tuition classes. Improved my marks from 65% to 92%.", name="Rahul Sharma",
         role="Student", rating=5, image_url="/images/student-1.png"),
    dict(quote="The teachers are very supportive. My fundamentals are much stronger now.",
         name="Priya Singh", role="Student", rating=5, image_url="/images/student-2.png"),
    dict(quote="Great environment for learning. Highly recommended!", name="Ishaan Verma",
         role="Student", rating=5, image_url="/images/student-3.png"),
]

STUDENTS = [
    dict(full_name="John Smith", email="john.smith@email.com", phone="+44 7700 900111",
         course_name="Advanced Senior Mathematics", status=StudentStatus.active),
    dict(full_name="Emma Watson", email="emma.w@email.com", phone="+44 7700 900222",
         course_name="IELTS Prep Masterclass", status=StudentStatus.active),
    dict(full_name="Liam Brown", email="liam.b@email.com", phone="+44 7700 900333",
         course_name="Commerce Excellence Program", status=StudentStatus.active),
]

BLOG = [
    dict(
        title="5 Proven Study Techniques for Board Exam Success",
        slug="5-proven-study-techniques-for-board-exam-success",
        excerpt="From active recall to spaced repetition, here are the methods our toppers swear by.",
        cover_image_url="/images/classroom-1.png",
        author="Dr. Rajesh Sharma",
        content=(
            "Preparing for board exams can feel overwhelming, but the right techniques make all the difference.\n\n"
            "1. Active Recall — Instead of re-reading notes, quiz yourself. Retrieving information strengthens memory far more than passive review.\n\n"
            "2. Spaced Repetition — Review material over increasing intervals. This combats the forgetting curve and locks knowledge in for the long term.\n\n"
            "3. Practice Papers — Simulate exam conditions weekly. Timed practice builds speed, stamina and confidence.\n\n"
            "4. Teach What You Learn — Explaining a concept to someone else exposes the gaps in your own understanding.\n\n"
            "5. Rest and Routine — Sleep consolidates memory. A consistent schedule beats last-minute cramming every time.\n\n"
            "At HHG Academy, every one of these techniques is built into our weekly programme."
        ),
    ),
    dict(
        title="Why Small Batch Sizes Transform Learning",
        slug="why-small-batch-sizes-transform-learning",
        excerpt="Personal attention isn't a luxury — it's the single biggest driver of student outcomes.",
        cover_image_url="/images/classroom-2.png",
        author="Ms. Anjali Gupta",
        content=(
            "There is a reason we cap our batches at a small number of students.\n\n"
            "When a teacher works with fewer students, they can identify exactly where each learner struggles and tailor explanations accordingly.\n\n"
            "Questions get answered immediately. Misconceptions are corrected before they take root. Quieter students get the space to participate.\n\n"
            "The result is measurable: stronger fundamentals, higher confidence, and consistently better exam performance.\n\n"
            "Quality education is about connection — and connection scales down, not up."
        ),
    ),
]

INQUIRIES = [
    dict(full_name="John Smith", email="john.smith@email.com", phone="+44 7700 900111",
         student_class="Higher Secondary (PCM/B)", subject="Advanced Mathematics",
         message="Interested in the demo class.", status=InquiryStatus.new),
    dict(full_name="Sophia Lee", email="sophia.lee@email.com", phone="+44 7700 900444",
         student_class="Test Prep / IELTS", subject="IELTS coaching",
         message="What are the weekend batch timings?", status=InquiryStatus.contacted),
]


async def _seed_table(session, model, rows: list[dict]) -> None:
    repo = BaseRepository(model, session)
    if await repo.count() > 0:
        print(f"  {model.__tablename__}: already populated — skipped")
        return
    for row in rows:
        await repo.create(row)
    print(f"  {model.__tablename__}: inserted {len(rows)} rows")


async def main() -> None:
    print("Seeding sample data...")
    async with AsyncSessionLocal() as session:
        await _seed_table(session, Course, COURSES)
        await _seed_table(session, Faculty, FACULTY)
        await _seed_table(session, Achievement, ACHIEVEMENTS)
        await _seed_table(session, GalleryImage, GALLERY)
        await _seed_table(session, Testimonial, TESTIMONIALS)
        await _seed_table(session, BlogPost, BLOG)
        await _seed_table(session, Student, STUDENTS)
        await _seed_table(session, Inquiry, INQUIRIES)
    print("Done.")


if __name__ == "__main__":
    asyncio.run(main())
