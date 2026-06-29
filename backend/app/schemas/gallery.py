"""Gallery image schemas."""

from pydantic import BaseModel, ConfigDict, Field


class GalleryImageBase(BaseModel):
    image_url: str = Field(min_length=1, max_length=255)
    caption: str = Field(default="", max_length=160)
    display_order: int = 0
    is_published: bool = True


class GalleryImageCreate(GalleryImageBase):
    pass


class GalleryImageUpdate(BaseModel):
    image_url: str | None = Field(default=None, max_length=255)
    caption: str | None = Field(default=None, max_length=160)
    display_order: int | None = None
    is_published: bool | None = None


class GalleryImageRead(GalleryImageBase):
    model_config = ConfigDict(from_attributes=True)
    id: int
