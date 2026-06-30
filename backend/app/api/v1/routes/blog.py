"""Blog routes: public list/detail + admin management.

Public reads return only published posts. Slugs are generated from the title
on create (and kept stable on update unless explicitly changed).
"""

import re

from fastapi import APIRouter, HTTPException, Query, status
from sqlalchemy import select

from app.api.deps import CurrentAdmin, DbSession
from app.models.blog import BlogPost
from app.repositories.base import BaseRepository
from app.schemas.blog import BlogCreate, BlogRead, BlogUpdate
from app.schemas.common import Message, Page

router = APIRouter(prefix="/blog", tags=["blog"])


def _repo(session) -> BaseRepository:
    return BaseRepository(BlogPost, session)


def _slugify(value: str) -> str:
    slug = re.sub(r"[^a-z0-9]+", "-", value.lower()).strip("-")
    return slug or "post"


async def _unique_slug(session, base: str, exclude_id: int | None = None) -> str:
    slug = base
    n = 2
    while True:
        stmt = select(BlogPost).where(BlogPost.slug == slug)
        existing = (await session.execute(stmt)).scalar_one_or_none()
        if existing is None or existing.id == exclude_id:
            return slug
        slug = f"{base}-{n}"
        n += 1


@router.get("", response_model=Page[BlogRead], summary="List published posts (public)")
async def list_posts(
    session: DbSession,
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=200),
):
    r = _repo(session)
    items = await r.list(skip=skip, limit=limit, order_by="id", is_published=True)
    items = list(reversed(items)) if not skip else items  # newest first
    total = await r.count(is_published=True)
    return Page(items=items, total=total, skip=skip, limit=limit)


@router.get("/all", response_model=Page[BlogRead], summary="List all posts (admin)")
async def list_all_posts(
    session: DbSession,
    _admin: CurrentAdmin,
    skip: int = Query(0, ge=0),
    limit: int = Query(200, ge=1, le=500),
):
    r = _repo(session)
    items = await r.list(skip=skip, limit=limit, order_by="id")
    total = await r.count()
    return Page(items=list(reversed(items)) if not skip else items, total=total, skip=skip, limit=limit)


@router.get("/slug/{slug}", response_model=BlogRead, summary="Get a published post by slug (public)")
async def get_post_by_slug(slug: str, session: DbSession):
    stmt = select(BlogPost).where(BlogPost.slug == slug, BlogPost.is_published.is_(True))
    post = (await session.execute(stmt)).scalar_one_or_none()
    if post is None:
        raise HTTPException(status_code=404, detail="Post not found")
    return post


@router.post("", response_model=BlogRead, status_code=status.HTTP_201_CREATED, summary="Create a post (admin)")
async def create_post(payload: BlogCreate, session: DbSession, _admin: CurrentAdmin):
    data = payload.model_dump()
    base = _slugify(data.get("slug") or data["title"])
    data["slug"] = await _unique_slug(session, base)
    return await _repo(session).create(data)


@router.put("/{post_id}", response_model=BlogRead, summary="Update a post (admin)")
async def update_post(post_id: int, payload: BlogUpdate, session: DbSession, _admin: CurrentAdmin):
    r = _repo(session)
    post = await r.get(post_id)
    if post is None:
        raise HTTPException(status_code=404, detail="Post not found")
    data = payload.model_dump(exclude_unset=True)
    if data.get("slug"):
        data["slug"] = await _unique_slug(session, _slugify(data["slug"]), exclude_id=post_id)
    return await r.update(post, data)


@router.delete("/{post_id}", response_model=Message, summary="Delete a post (admin)")
async def delete_post(post_id: int, session: DbSession, _admin: CurrentAdmin):
    if not await _repo(session).delete_by_id(post_id):
        raise HTTPException(status_code=404, detail="Post not found")
    return Message(detail=f"Post {post_id} deleted")
