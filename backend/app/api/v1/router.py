"""Aggregates all v1 API routers."""

from fastapi import APIRouter

from app.api.v1.routes import auth, health

api_router = APIRouter()
api_router.include_router(health.router)
api_router.include_router(auth.router)

# Future routers (Phase 5+): courses, faculty, inquiries, etc.
