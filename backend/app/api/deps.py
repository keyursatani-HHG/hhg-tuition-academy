"""Shared FastAPI dependencies."""

from collections.abc import AsyncGenerator

from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db


async def db_session() -> AsyncGenerator[AsyncSession, None]:
    """Re-export of the database session dependency for the API layer."""
    async for session in get_db():
        yield session
