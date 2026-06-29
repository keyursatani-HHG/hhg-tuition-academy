"""Inquiry schemas."""

from datetime import datetime

from pydantic import BaseModel, ConfigDict, EmailStr, Field

from app.models.inquiry import InquiryStatus


class InquiryCreate(BaseModel):
    """Public contact-form submission."""

    full_name: str = Field(min_length=1, max_length=120)
    email: EmailStr
    phone: str = Field(default="", max_length=40)
    student_class: str = Field(default="", max_length=80)
    subject: str = Field(default="", max_length=160)
    message: str = Field(default="")


class InquiryUpdate(BaseModel):
    """Admin status management."""

    status: InquiryStatus


class InquiryRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    full_name: str
    email: EmailStr
    phone: str
    student_class: str
    subject: str
    message: str
    status: InquiryStatus
    created_at: datetime
