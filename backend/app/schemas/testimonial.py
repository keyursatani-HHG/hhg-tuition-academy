"""Testimonial schemas."""

from pydantic import BaseModel, ConfigDict, Field


class TestimonialBase(BaseModel):
    quote: str = Field(min_length=1)
    name: str = Field(min_length=1, max_length=120)
    role: str = Field(default="Student", max_length=80)
    rating: int = Field(default=5, ge=1, le=5)
    image_url: str = Field(default="", max_length=255)
    is_published: bool = True


class TestimonialCreate(TestimonialBase):
    pass


class TestimonialUpdate(BaseModel):
    quote: str | None = None
    name: str | None = Field(default=None, max_length=120)
    role: str | None = Field(default=None, max_length=80)
    rating: int | None = Field(default=None, ge=1, le=5)
    image_url: str | None = Field(default=None, max_length=255)
    is_published: bool | None = None


class TestimonialRead(TestimonialBase):
    model_config = ConfigDict(from_attributes=True)
    id: int
