"""Inquiry (contact form submission) ORM model."""

import enum

from sqlalchemy import Enum as SAEnum
from sqlalchemy import String, Text
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import Base
from app.models.base import TimestampMixin, intpk


class InquiryStatus(str, enum.Enum):
    new = "new"
    contacted = "contacted"
    closed = "closed"


class Inquiry(Base, TimestampMixin):
    __tablename__ = "inquiries"

    id: Mapped[intpk]
    full_name: Mapped[str] = mapped_column(String(120), nullable=False)
    email: Mapped[str] = mapped_column(String(255), nullable=False)
    phone: Mapped[str] = mapped_column(String(40), nullable=False, default="")
    student_class: Mapped[str] = mapped_column(String(80), nullable=False, default="")
    subject: Mapped[str] = mapped_column(String(160), nullable=False, default="")
    message: Mapped[str] = mapped_column(Text, nullable=False, default="")
    status: Mapped[InquiryStatus] = mapped_column(
        SAEnum(InquiryStatus, name="inquiry_status"),
        default=InquiryStatus.new,
        nullable=False,
        index=True,
    )
