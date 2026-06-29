"""Aggregates all v1 API routers."""

from fastapi import APIRouter

from app.api.v1.routes import (
    achievements,
    auth,
    courses,
    dashboard,
    faculty,
    gallery,
    health,
    inquiries,
    students,
    testimonials,
)

api_router = APIRouter()

# Infrastructure & auth
api_router.include_router(health.router)
api_router.include_router(auth.router)

# Public content (read) + admin management (write)
api_router.include_router(courses.router)
api_router.include_router(faculty.router)
api_router.include_router(achievements.router)
api_router.include_router(gallery.router)
api_router.include_router(testimonials.router)

# Inquiries (public submit + admin manage), students & dashboard (admin only)
api_router.include_router(inquiries.router)
api_router.include_router(students.router)
api_router.include_router(dashboard.router)
