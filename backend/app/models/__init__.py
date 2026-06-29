"""SQLAlchemy ORM models. Importing them here registers their tables on
`Base.metadata` so Alembic autogenerate can discover them."""

from app.models.achievement import Achievement
from app.models.admin_user import AdminUser
from app.models.course import Course
from app.models.faculty import Faculty
from app.models.gallery import GalleryImage
from app.models.inquiry import Inquiry, InquiryStatus
from app.models.student import Student, StudentStatus
from app.models.testimonial import Testimonial

__all__ = [
    "Achievement",
    "AdminUser",
    "Course",
    "Faculty",
    "GalleryImage",
    "Inquiry",
    "InquiryStatus",
    "Student",
    "StudentStatus",
    "Testimonial",
]
