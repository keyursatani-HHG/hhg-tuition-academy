"""Generic async CRUD repository shared by all entity repositories."""

from typing import Any, Generic, Sequence, TypeVar

from sqlalchemy import delete as sa_delete
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import Base

ModelType = TypeVar("ModelType", bound=Base)


class BaseRepository(Generic[ModelType]):
    """Reusable data-access operations for a single ORM model."""

    def __init__(self, model: type[ModelType], session: AsyncSession) -> None:
        self.model = model
        self.session = session

    def _apply_filters(self, stmt, filters: dict[str, Any]):
        for field, value in filters.items():
            if value is not None and hasattr(self.model, field):
                stmt = stmt.where(getattr(self.model, field) == value)
        return stmt

    async def get(self, obj_id: int) -> ModelType | None:
        return await self.session.get(self.model, obj_id)

    async def list(
        self,
        *,
        skip: int = 0,
        limit: int = 100,
        order_by: str | None = None,
        **filters: Any,
    ) -> Sequence[ModelType]:
        stmt = self._apply_filters(select(self.model), filters)
        if order_by and hasattr(self.model, order_by):
            stmt = stmt.order_by(getattr(self.model, order_by))
        elif hasattr(self.model, "id"):
            stmt = stmt.order_by(self.model.id)
        stmt = stmt.offset(skip).limit(limit)
        result = await self.session.execute(stmt)
        return result.scalars().all()

    async def count(self, **filters: Any) -> int:
        stmt = self._apply_filters(
            select(func.count()).select_from(self.model), filters
        )
        result = await self.session.execute(stmt)
        return int(result.scalar_one())

    async def create(self, data: dict[str, Any]) -> ModelType:
        obj = self.model(**data)
        self.session.add(obj)
        await self.session.commit()
        await self.session.refresh(obj)
        return obj

    async def update(self, obj: ModelType, data: dict[str, Any]) -> ModelType:
        for field, value in data.items():
            setattr(obj, field, value)
        await self.session.commit()
        await self.session.refresh(obj)
        return obj

    async def delete(self, obj: ModelType) -> None:
        await self.session.delete(obj)
        await self.session.commit()

    async def delete_by_id(self, obj_id: int) -> int:
        result = await self.session.execute(
            sa_delete(self.model).where(self.model.id == obj_id)
        )
        await self.session.commit()
        return result.rowcount or 0
