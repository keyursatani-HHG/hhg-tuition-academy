"""Dashboard / analytics schemas."""

from pydantic import BaseModel

from app.schemas.inquiry import InquiryRead


class DashboardStats(BaseModel):
    total_students: int
    active_courses: int
    total_inquiries: int
    new_inquiries: int
    total_faculty: int
    recent_inquiries: list[InquiryRead]
