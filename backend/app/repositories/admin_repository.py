"""Data-access layer for AdminUser."""

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.admin_user import AdminUser


class AdminRepository:
    def __init__(self, session: AsyncSession) -> None:
        self.session = session

    async def get_by_id(self, admin_id: int) -> AdminUser | None:
        return await self.session.get(AdminUser, admin_id)

    async def get_by_email(self, email: str) -> AdminUser | None:
        result = await self.session.execute(
            select(AdminUser).where(AdminUser.email == email)
        )
        return result.scalar_one_or_none()

    async def create(self, admin: AdminUser) -> AdminUser:
        self.session.add(admin)
        await self.session.commit()
        await self.session.refresh(admin)
        return admin
