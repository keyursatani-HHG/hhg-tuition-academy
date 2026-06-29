"""Testimonial ORM model."""

from sqlalchemy import Boolean, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import Base
from app.models.base import TimestampMixin, intpk


class Testimonial(Base, TimestampMixin):
    __tablename__ = "testimonials"

    id: Mapped[intpk]
    quote: Mapped[str] = mapped_column(Text, nullable=False)
    name: Mapped[str] = mapped_column(String(120), nullable=False)
    role: Mapped[str] = mapped_column(String(80), nullable=False, default="Student")
    rating: Mapped[int] = mapped_column(Integer, default=5, nullable=False)
    image_url: Mapped[str] = mapped_column(String(255), nullable=False, default="")
    is_published: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)
