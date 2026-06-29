"""Course schemas."""

from pydantic import BaseModel, ConfigDict, Field


class CourseBase(BaseModel):
    title: str = Field(min_length=1, max_length=160)
    category: str = Field(min_length=1, max_length=80)
    price: str = Field(min_length=1, max_length=60)
    description: str = Field(min_length=1)
    duration: str = Field(max_length=60)
    schedule: str = Field(max_length=80)
    image_url: str = Field(default="", max_length=255)
    is_published: bool = True


class CourseCreate(CourseBase):
    pass


class CourseUpdate(BaseModel):
    title: str | None = Field(default=None, max_length=160)
    category: str | None = Field(default=None, max_length=80)
    price: str | None = Field(default=None, max_length=60)
    description: str | None = None
    duration: str | None = Field(default=None, max_length=60)
    schedule: str | None = Field(default=None, max_length=80)
    image_url: str | None = Field(default=None, max_length=255)
    is_published: bool | None = None


class CourseRead(CourseBase):
    model_config = ConfigDict(from_attributes=True)
    id: int
