"""Testimonial routes (generated via the CRUD factory)."""

from app.api.crud_factory import create_crud_router
from app.models.testimonial import Testimonial
from app.schemas.testimonial import (
    TestimonialCreate,
    TestimonialRead,
    TestimonialUpdate,
)

router = create_crud_router(
    prefix="testimonials",
    tags=["testimonials"],
    model=Testimonial,
    read_schema=TestimonialRead,
    create_schema=TestimonialCreate,
    update_schema=TestimonialUpdate,
    published_field="is_published",
    order_by="id",
)
