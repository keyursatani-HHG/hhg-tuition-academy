"""Admin dashboard analytics route."""

from fastapi import APIRouter

from app.api.deps import CurrentAdmin, DbSession
from app.schemas.dashboard import DashboardStats
from app.services.dashboard_service import DashboardService

router = APIRouter(prefix="/dashboard", tags=["dashboard"])


@router.get("/stats", response_model=DashboardStats, summary="Dashboard overview (admin)")
async def dashboard_stats(session: DbSession, _admin: CurrentAdmin) -> DashboardStats:
    return await DashboardService(session).get_stats()
