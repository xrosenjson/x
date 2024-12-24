from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from typing import List
from datetime import datetime, timedelta
from app.models.base import get_db
from app.models.user import User, Membership, UserRole
from app.schemas.user import AdminUserList, AdminUserStats, UserInDB
from app.core.security import get_current_active_user
from app.api.deps import get_current_admin_user

router = APIRouter()

@router.get("/users", response_model=AdminUserList)
async def list_users(
    skip: int = 0,
    limit: int = 100,
    db: AsyncSession = Depends(get_db),
    current_admin: User = Depends(get_current_admin_user)
):
    """
    List all users with pagination.
    Only accessible by admin users.
    """
    total = await db.scalar(select(func.count(User.id)))
    active = await db.scalar(select(func.count(User.id)).where(User.is_active == True))
    
    users = await db.execute(
        select(User)
        .offset(skip)
        .limit(limit)
        .order_by(User.created_at.desc())
    )
    return {
        "total_users": total,
        "active_users": active,
        "users": users.scalars().all()
    }

@router.get("/stats", response_model=AdminUserStats)
async def get_user_stats(
    db: AsyncSession = Depends(get_db),
    current_admin: User = Depends(get_current_admin_user)
):
    """
    Get user statistics for admin dashboard.
    Only accessible by admin users.
    """
    now = datetime.utcnow()
    today = now.replace(hour=0, minute=0, second=0, microsecond=0)
    week_ago = today - timedelta(days=7)
    month_ago = today - timedelta(days=30)

    total_users = await db.scalar(select(func.count(User.id)))
    active_users = await db.scalar(select(func.count(User.id)).where(User.is_active == True))
    premium_users = await db.scalar(
        select(func.count(User.id))
        .join(Membership)
        .where(Membership.type == "premium", Membership.is_active == True)
    )
    basic_users = await db.scalar(
        select(func.count(User.id))
        .join(Membership)
        .where(Membership.type == "basic", Membership.is_active == True)
    )
    free_users = total_users - premium_users - basic_users

    new_users_today = await db.scalar(
        select(func.count(User.id)).where(User.created_at >= today)
    )
    new_users_week = await db.scalar(
        select(func.count(User.id)).where(User.created_at >= week_ago)
    )
    new_users_month = await db.scalar(
        select(func.count(User.id)).where(User.created_at >= month_ago)
    )

    return {
        "total_users": total_users,
        "active_users": active_users,
        "premium_users": premium_users,
        "basic_users": basic_users,
        "free_users": free_users,
        "new_users_today": new_users_today,
        "new_users_this_week": new_users_week,
        "new_users_this_month": new_users_month
    }

@router.post("/users/{user_id}/activate", response_model=UserInDB)
async def activate_user(
    user_id: int,
    db: AsyncSession = Depends(get_db),
    current_admin: User = Depends(get_current_admin_user)
):
    """
    Activate a user account.
    Only accessible by admin users.
    """
    user = await db.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    user.is_active = True
    await db.commit()
    await db.refresh(user)
    return user

@router.post("/users/{user_id}/deactivate", response_model=UserInDB)
async def deactivate_user(
    user_id: int,
    db: AsyncSession = Depends(get_db),
    current_admin: User = Depends(get_current_admin_user)
):
    """
    Deactivate a user account.
    Only accessible by admin users.
    """
    user = await db.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    user.is_active = False
    await db.commit()
    await db.refresh(user)
    return user

@router.delete("/users/{user_id}")
async def delete_user(
    user_id: int,
    db: AsyncSession = Depends(get_db),
    current_admin: User = Depends(get_current_admin_user)
):
    """
    Delete a user account.
    Only accessible by admin users.
    """
    user = await db.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    await db.delete(user)
    await db.commit()
    return {"message": "User deleted successfully"}
