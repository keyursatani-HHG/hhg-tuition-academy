"""Blog post schemas."""

from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


class BlogBase(BaseModel):
    title: str = Field(min_length=1, max_length=200)
    excerpt: str = Field(default="", max_length=400)
    content: str = Field(default="")
    cover_image_url: str = Field(default="", max_length=255)
    author: str = Field(default="HHG Academy", max_length=120)
    is_published: bool = True


class BlogCreate(BlogBase):
    # Optional — generated from the title when omitted.
    slug: str = Field(default="", max_length=220)


class BlogUpdate(BaseModel):
    title: str | None = Field(default=None, max_length=200)
    slug: str | None = Field(default=None, max_length=220)
    excerpt: str | None = Field(default=None, max_length=400)
    content: str | None = None
    cover_image_url: str | None = Field(default=None, max_length=255)
    author: str | None = Field(default=None, max_length=120)
    is_published: bool | None = None


class BlogRead(BlogBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
    slug: str
    created_at: datetime
    updated_at: datetime
