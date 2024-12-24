from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime
from app.models.user import UserRole, MembershipType

class UserBase(BaseModel):
    email: EmailStr
    username: str

class UserCreate(UserBase):
    password: str

class UserUpdate(BaseModel):
    email: Optional[EmailStr] = None
    username: Optional[str] = None
    password: Optional[str] = None
    profile_picture_url: Optional[str] = None

class UserInDB(UserBase):
    id: int
    role: UserRole
    is_active: bool
    created_at: datetime
    last_login: Optional[datetime]
    profile_picture_url: Optional[str]

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None

class MembershipBase(BaseModel):
    type: MembershipType
    start_date: datetime
    end_date: Optional[datetime]
    is_active: bool

class MembershipCreate(MembershipBase):
    user_id: int

class MembershipInDB(MembershipBase):
    id: int
    user_id: int

    class Config:
        from_attributes = True

class AdminUserList(BaseModel):
    total_users: int
    active_users: int
    users: List[UserInDB]

class AdminUserStats(BaseModel):
    total_users: int
    active_users: int
    premium_users: int
    basic_users: int
    free_users: int
    new_users_today: int
    new_users_this_week: int
    new_users_this_month: int


class UserResponse(UserInDB):
    """Response model for user data, excluding sensitive information"""
    class Config:
        from_attributes = True
        exclude = {"password_hash"}
