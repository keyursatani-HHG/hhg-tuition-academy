"""Health and readiness endpoints."""

from fastapi import APIRouter, Depends
from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import db_session
from app.core.config import settings

router = APIRouter(tags=["health"])


@router.get("/health", summary="Liveness probe")
async def health() -> dict:
    """Lightweight liveness check — does not touch the database."""
    return {
        "status": "ok",
        "service": settings.PROJECT_NAME,
        "environment": settings.ENVIRONMENT,
    }


@router.get("/health/db", summary="Database readiness probe")
async def health_db(db: AsyncSession = Depends(db_session)) -> dict:
    """Readiness check that verifies database connectivity."""
    result = await db.execute(text("SELECT 1"))
    return {"status": "ok", "database": "reachable", "result": result.scalar()}
