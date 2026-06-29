"""Achievement schemas."""

from pydantic import BaseModel, ConfigDict, Field


class AchievementBase(BaseModel):
    title: str = Field(min_length=1, max_length=160)
    student_name: str = Field(min_length=1, max_length=120)
    detail: str = Field(default="", max_length=255)
    badge: str = Field(default="", max_length=60)
    badge_color: str = Field(default="primary", max_length=40)
    image_url: str = Field(default="", max_length=255)
    display_order: int = 0
    is_published: bool = True


class AchievementCreate(AchievementBase):
    pass


class AchievementUpdate(BaseModel):
    title: str | None = Field(default=None, max_length=160)
    student_name: str | None = Field(default=None, max_length=120)
    detail: str | None = Field(default=None, max_length=255)
    badge: str | None = Field(default=None, max_length=60)
    badge_color: str | None = Field(default=None, max_length=40)
    image_url: str | None = Field(default=None, max_length=255)
    display_order: int | None = None
    is_published: bool | None = None


class AchievementRead(AchievementBase):
    model_config = ConfigDict(from_attributes=True)
    id: int
