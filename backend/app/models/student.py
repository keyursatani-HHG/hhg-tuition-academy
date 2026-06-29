"""Student record ORM model (admin-managed)."""

import enum

from sqlalchemy import Enum as SAEnum
from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import Base
from app.models.base import TimestampMixin, intpk


class StudentStatus(str, enum.Enum):
    active = "active"
    inactive = "inactive"
    alumni = "alumni"


class Student(Base, TimestampMixin):
    __tablename__ = "students"

    id: Mapped[intpk]
    full_name: Mapped[str] = mapped_column(String(120), nullable=False)
    email: Mapped[str] = mapped_column(String(255), nullable=False, default="")
    phone: Mapped[str] = mapped_column(String(40), nullable=False, default="")
    course_name: Mapped[str] = mapped_column(String(160), nullable=False, default="")
    status: Mapped[StudentStatus] = mapped_column(
        SAEnum(StudentStatus, name="student_status"),
        default=StudentStatus.active,
        nullable=False,
        index=True,
    )
