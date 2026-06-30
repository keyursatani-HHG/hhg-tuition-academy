"""Blog post ORM model."""

from sqlalchemy import Boolean, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import Base
from app.models.base import TimestampMixin, intpk


class BlogPost(Base, TimestampMixin):
    __tablename__ = "blog_posts"

    id: Mapped[intpk]
    title: Mapped[str] = mapped_column(String(200), nullable=False)
    slug: Mapped[str] = mapped_column(String(220), unique=True, index=True, nullable=False)
    excerpt: Mapped[str] = mapped_column(String(400), nullable=False, default="")
    content: Mapped[str] = mapped_column(Text, nullable=False, default="")
    cover_image_url: Mapped[str] = mapped_column(String(255), nullable=False, default="")
    author: Mapped[str] = mapped_column(String(120), nullable=False, default="HHG Academy")
    is_published: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)
