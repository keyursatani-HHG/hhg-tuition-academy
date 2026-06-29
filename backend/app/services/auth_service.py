"""Authentication business logic: credential verification and token issuance."""

from jose import JWTError
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.security import (
    REFRESH_TOKEN,
    create_access_token,
    create_refresh_token,
    decode_token,
    hash_password,
    verify_password,
)
from app.models.admin_user import AdminUser
from app.repositories.admin_repository import AdminRepository
from app.schemas.auth import Token


class AuthError(Exception):
    """Raised on authentication failures (mapped to HTTP 401 in the API layer)."""


class AuthService:
    def __init__(self, session: AsyncSession) -> None:
        self.repo = AdminRepository(session)

    async def authenticate(self, email: str, password: str) -> AdminUser:
        admin = await self.repo.get_by_email(email)
        if admin is None or not verify_password(password, admin.hashed_password):
            raise AuthError("Invalid email or password")
        if not admin.is_active:
            raise AuthError("This account is inactive")
        return admin

    @staticmethod
    def issue_tokens(admin: AdminUser) -> Token:
        return Token(
            access_token=create_access_token(admin.id),
            refresh_token=create_refresh_token(admin.id),
        )

    async def login(self, email: str, password: str) -> Token:
        admin = await self.authenticate(email, password)
        return self.issue_tokens(admin)

    async def refresh(self, refresh_token: str) -> Token:
        try:
            payload = decode_token(refresh_token, expected_type=REFRESH_TOKEN)
        except JWTError as exc:
            raise AuthError("Invalid or expired refresh token") from exc

        admin = await self.repo.get_by_id(int(payload["sub"]))
        if admin is None or not admin.is_active:
            raise AuthError("Account no longer valid")
        return self.issue_tokens(admin)

    async def create_admin(
        self,
        email: str,
        full_name: str,
        password: str,
        is_superadmin: bool = False,
    ) -> AdminUser:
        admin = AdminUser(
            email=email,
            full_name=full_name,
            hashed_password=hash_password(password),
            is_superadmin=is_superadmin,
        )
        return await self.repo.create(admin)
