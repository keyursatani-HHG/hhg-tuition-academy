"""Shared FastAPI dependencies."""

from collections.abc import AsyncGenerator
from typing import Annotated

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import settings
from app.core.database import get_db
from app.core.security import ACCESS_TOKEN, decode_token
from app.models.admin_user import AdminUser
from app.repositories.admin_repository import AdminRepository

oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl=f"{settings.API_V1_PREFIX}/auth/login/token"
)


async def db_session() -> AsyncGenerator[AsyncSession, None]:
    """Database session dependency for the API layer."""
    async for session in get_db():
        yield session


DbSession = Annotated[AsyncSession, Depends(db_session)]


async def get_current_admin(
    token: Annotated[str, Depends(oauth2_scheme)],
    session: DbSession,
) -> AdminUser:
    """Resolve and validate the current admin from a Bearer access token."""
    credentials_error = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = decode_token(token, expected_type=ACCESS_TOKEN)
        admin_id = int(payload["sub"])
    except (JWTError, KeyError, ValueError) as exc:
        raise credentials_error from exc

    admin = await AdminRepository(session).get_by_id(admin_id)
    if admin is None or not admin.is_active:
        raise credentials_error
    return admin


CurrentAdmin = Annotated[AdminUser, Depends(get_current_admin)]
