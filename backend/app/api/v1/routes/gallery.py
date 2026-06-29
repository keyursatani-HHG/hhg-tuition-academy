"""Gallery routes (generated via the CRUD factory)."""

from app.api.crud_factory import create_crud_router
from app.models.gallery import GalleryImage
from app.schemas.gallery import (
    GalleryImageCreate,
    GalleryImageRead,
    GalleryImageUpdate,
)

router = create_crud_router(
    prefix="gallery",
    tags=["gallery"],
    model=GalleryImage,
    read_schema=GalleryImageRead,
    create_schema=GalleryImageCreate,
    update_schema=GalleryImageUpdate,
    published_field="is_published",
    order_by="display_order",
)
