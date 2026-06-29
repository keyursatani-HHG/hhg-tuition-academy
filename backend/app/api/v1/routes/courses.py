"""Course routes (generated via the CRUD factory)."""

from app.api.crud_factory import create_crud_router
from app.models.course import Course
from app.schemas.course import CourseCreate, CourseRead, CourseUpdate

router = create_crud_router(
    prefix="courses",
    tags=["courses"],
    model=Course,
    read_schema=CourseRead,
    create_schema=CourseCreate,
    update_schema=CourseUpdate,
    published_field="is_published",
    order_by="id",
)
