"""Achievement / results ORM model."""

from sqlalchemy import Boolean, Integer, String
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import Base
from app.models.base import TimestampMixin, intpk


class Achievement(Base, TimestampMixin):
    __tablename__ = "achievements"

    id: Mapped[intpk]
    title: Mapped[str] = mapped_column(String(160), nullable=False)
    student_name: Mapped[str] = mapped_column(String(120), nullable=False)
    detail: Mapped[str] = mapped_column(String(255), nullable=False, default="")
    badge: Mapped[str] = mapped_column(String(60), nullable=False, default="")
    badge_color: Mapped[str] = mapped_column(String(40), nullable=False, default="primary")
    image_url: Mapped[str] = mapped_column(String(255), nullable=False, default="")
    display_order: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    is_published: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)
