"""Admin authentication endpoints."""

from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm

from app.api.deps import CurrentAdmin, DbSession
from app.schemas.auth import AdminLogin, AdminRead, RefreshRequest, Token
from app.services.auth_service import AuthError, AuthService

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/login", response_model=Token, summary="Admin login (JSON)")
async def login(payload: AdminLogin, session: DbSession) -> Token:
    """Authenticate with email + password and receive access/refresh tokens."""
    try:
        return await AuthService(session).login(payload.email, payload.password)
    except AuthError as exc:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail=str(exc)
        ) from exc


@router.post(
    "/login/token",
    response_model=Token,
    summary="Admin login (OAuth2 form — powers Swagger Authorize)",
)
async def login_form(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
    session: DbSession,
) -> Token:
    """OAuth2 password-flow variant so the Swagger 'Authorize' button works.
    The username field is the admin email."""
    try:
        return await AuthService(session).login(form_data.username, form_data.password)
    except AuthError as exc:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail=str(exc)
        ) from exc


@router.post("/refresh", response_model=Token, summary="Refresh access token")
async def refresh(payload: RefreshRequest, session: DbSession) -> Token:
    try:
        return await AuthService(session).refresh(payload.refresh_token)
    except AuthError as exc:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail=str(exc)
        ) from exc


@router.get("/me", response_model=AdminRead, summary="Current admin profile")
async def me(current_admin: CurrentAdmin) -> AdminRead:
    return current_admin
