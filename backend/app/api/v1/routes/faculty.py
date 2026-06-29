"""Faculty routes (generated via the CRUD factory)."""

from app.api.crud_factory import create_crud_router
from app.models.faculty import Faculty
from app.schemas.faculty import FacultyCreate, FacultyRead, FacultyUpdate

router = create_crud_router(
    prefix="faculty",
    tags=["faculty"],
    model=Faculty,
    read_schema=FacultyRead,
    create_schema=FacultyCreate,
    update_schema=FacultyUpdate,
    published_field="is_active",
    order_by="display_order",
)
