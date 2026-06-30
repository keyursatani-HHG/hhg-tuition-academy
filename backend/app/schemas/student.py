"""Student schemas."""

from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field

from app.models.student import StudentStatus


class StudentBase(BaseModel):
    full_name: str = Field(min_length=1, max_length=120)
    email: str = Field(default="", max_length=255)
    phone: str = Field(default="", max_length=40)
    course_name: str = Field(default="", max_length=160)
    photo_url: str = Field(default="", max_length=255)
    status: StudentStatus = StudentStatus.active


class StudentCreate(StudentBase):
    pass


class StudentUpdate(BaseModel):
    full_name: str | None = Field(default=None, max_length=120)
    email: str | None = Field(default=None, max_length=255)
    phone: str | None = Field(default=None, max_length=40)
    course_name: str | None = Field(default=None, max_length=160)
    photo_url: str | None = Field(default=None, max_length=255)
    status: StudentStatus | None = None


class StudentRead(StudentBase):
    model_config = ConfigDict(from_attributes=True)
    id: int
    created_at: datetime
