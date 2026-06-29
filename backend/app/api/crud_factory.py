"""Factory that builds a standard CRUD APIRouter for a content entity.

Generated routes:
    GET    /{prefix}            public  — list published items
    GET    /{prefix}/all        admin   — list every item (management view)
    GET    /{prefix}/{id}       public  — retrieve one
    POST   /{prefix}            admin   — create
    PUT    /{prefix}/{id}       admin   — update
    DELETE /{prefix}/{id}       admin   — delete

Entities with bespoke rules (inquiries, students, dashboard) define their own routers.
"""

from typing import Type

from fastapi import APIRouter, HTTPException, Query, status
from pydantic import BaseModel

from app.api.deps import CurrentAdmin, DbSession
from app.core.database import Base
from app.repositories.base import BaseRepository
from app.schemas.common import Message, Page


def create_crud_router(
    *,
    prefix: str,
    tags: list[str],
    model: Type[Base],
    read_schema: Type[BaseModel],
    create_schema: Type[BaseModel],
    update_schema: Type[BaseModel],
    published_field: str | None = None,
    order_by: str | None = None,
) -> APIRouter:
    router = APIRouter(prefix=f"/{prefix}", tags=tags)

    def repo(session) -> BaseRepository:
        return BaseRepository(model, session)

    not_found = HTTPException(
        status_code=status.HTTP_404_NOT_FOUND, detail=f"{model.__name__} not found"
    )

    @router.get("", response_model=Page[read_schema], summary=f"List {prefix} (public)")
    async def list_items(
        session: DbSession,
        skip: int = Query(0, ge=0),
        limit: int = Query(100, ge=1, le=500),
    ):
        filters = {published_field: True} if published_field else {}
        r = repo(session)
        items = await r.list(skip=skip, limit=limit, order_by=order_by, **filters)
        total = await r.count(**filters)
        return Page(items=items, total=total, skip=skip, limit=limit)

    @router.get(
        "/all",
        response_model=Page[read_schema],
        summary=f"List all {prefix} incl. unpublished (admin)",
    )
    async def list_all(
        session: DbSession,
        _admin: CurrentAdmin,
        skip: int = Query(0, ge=0),
        limit: int = Query(100, ge=1, le=500),
    ):
        r = repo(session)
        items = await r.list(skip=skip, limit=limit, order_by=order_by)
        total = await r.count()
        return Page(items=items, total=total, skip=skip, limit=limit)

    @router.get("/{item_id}", response_model=read_schema, summary=f"Get a {prefix[:-1]}")
    async def get_item(item_id: int, session: DbSession):
        obj = await repo(session).get(item_id)
        if obj is None:
            raise not_found
        return obj

    @router.post(
        "",
        response_model=read_schema,
        status_code=status.HTTP_201_CREATED,
        summary=f"Create a {prefix[:-1]} (admin)",
    )
    async def create_item(
        payload: create_schema, session: DbSession, _admin: CurrentAdmin
    ):
        return await repo(session).create(payload.model_dump())

    @router.put("/{item_id}", response_model=read_schema, summary=f"Update a {prefix[:-1]} (admin)")
    async def update_item(
        item_id: int,
        payload: update_schema,
        session: DbSession,
        _admin: CurrentAdmin,
    ):
        r = repo(session)
        obj = await r.get(item_id)
        if obj is None:
            raise not_found
        return await r.update(obj, payload.model_dump(exclude_unset=True))

    @router.delete("/{item_id}", response_model=Message, summary=f"Delete a {prefix[:-1]} (admin)")
    async def delete_item(item_id: int, session: DbSession, _admin: CurrentAdmin):
        deleted = await repo(session).delete_by_id(item_id)
        if not deleted:
            raise not_found
        return Message(detail=f"{model.__name__} {item_id} deleted")

    return router
