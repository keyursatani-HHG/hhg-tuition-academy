"""Achievement routes (generated via the CRUD factory)."""

from app.api.crud_factory import create_crud_router
from app.models.achievement import Achievement
from app.schemas.achievement import (
    AchievementCreate,
    AchievementRead,
    AchievementUpdate,
)

router = create_crud_router(
    prefix="achievements",
    tags=["achievements"],
    model=Achievement,
    read_schema=AchievementRead,
    create_schema=AchievementCreate,
    update_schema=AchievementUpdate,
    published_field="is_published",
    order_by="display_order",
)
