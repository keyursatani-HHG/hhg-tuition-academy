"""Aggregates summary metrics for the admin dashboard overview."""

from sqlalchemy.ext.asyncio import AsyncSession

from app.models.course import Course
from app.models.faculty import Faculty
from app.models.inquiry import Inquiry, InquiryStatus
from app.models.student import Student, StudentStatus
from app.repositories.base import BaseRepository
from app.schemas.dashboard import DashboardStats
from app.schemas.inquiry import InquiryRead


class DashboardService:
    def __init__(self, session: AsyncSession) -> None:
        self.session = session

    async def get_stats(self, recent_limit: int = 5) -> DashboardStats:
        students = BaseRepository(Student, self.session)
        courses = BaseRepository(Course, self.session)
        faculty = BaseRepository(Faculty, self.session)
        inquiries = BaseRepository(Inquiry, self.session)

        total_students = await students.count(status=StudentStatus.active)
        active_courses = await courses.count(is_published=True)
        total_faculty = await faculty.count(is_active=True)
        total_inquiries = await inquiries.count()
        new_inquiries = await inquiries.count(status=InquiryStatus.new)

        # Most recent inquiries (highest ids first).
        latest = await inquiries.list(skip=0, limit=recent_limit, order_by="id")
        recent = list(reversed(latest))

        return DashboardStats(
            total_students=total_students,
            active_courses=active_courses,
            total_inquiries=total_inquiries,
            new_inquiries=new_inquiries,
            total_faculty=total_faculty,
            recent_inquiries=[InquiryRead.model_validate(i) for i in recent],
        )
