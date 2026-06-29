"""Faculty schemas."""

from pydantic import BaseModel, ConfigDict, Field


class FacultyBase(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    role: str = Field(min_length=1, max_length=120)
    subject: str = Field(min_length=1, max_length=80)
    qualification: str = Field(min_length=1, max_length=120)
    bio: str = Field(default="")
    image_url: str = Field(default="", max_length=255)
    display_order: int = 0
    is_active: bool = True


class FacultyCreate(FacultyBase):
    pass


class FacultyUpdate(BaseModel):
    name: str | None = Field(default=None, max_length=120)
    role: str | None = Field(default=None, max_length=120)
    subject: str | None = Field(default=None, max_length=80)
    qualification: str | None = Field(default=None, max_length=120)
    bio: str | None = None
    image_url: str | None = Field(default=None, max_length=255)
    display_order: int | None = None
    is_active: bool | None = None


class FacultyRead(FacultyBase):
    model_config = ConfigDict(from_attributes=True)
    id: int
