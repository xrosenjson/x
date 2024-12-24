from fastapi import APIRouter, Depends, HTTPException, Body
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Dict, Any, List
from app.models.base import get_db
from app.models.user import User
from app.core.sync import DeviceSync, DataSync
from app.api.deps import get_current_active_user
from app.schemas.sync import SyncPushRequest, SyncPullResponse, Change

router = APIRouter()

@router.get("/settings/{device_id}")
async def get_device_settings(
    device_id: str,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Get user settings for a specific device"""
    settings = await DeviceSync.get_user_settings(
        db, current_user.id, device_id
    )
    if not settings:
        raise HTTPException(status_code=404, detail="Settings not found")
    return settings

@router.post("/settings/{device_id}")
async def update_device_settings(
    device_id: str,
    settings: Dict[str, Any],
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Update user settings for a specific device"""
    updated_settings = await DeviceSync.update_user_settings(
        db, current_user.id, device_id, settings
    )
    return {
        "status": "success",
        "message": "Settings updated successfully",
        "last_sync": updated_settings.last_sync
    }

@router.post("/sync/{device_id}")
async def sync_all_devices(
    device_id: str,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Sync settings across all user devices"""
    result = await DeviceSync.sync_devices(
        db, current_user.id, device_id
    )
    return result

@router.post("/push")
async def push_changes(
    request: SyncPushRequest = Body(...),
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Push local changes to server"""
    try:
        result = await DataSync.process_changes(
            db,
            current_user.id,
            request.changes,
            request.lastSyncTimestamp
        )
        return {"status": "success", "processed": len(request.changes)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/pull")
async def pull_changes(
    last_sync_timestamp: int,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
) -> SyncPullResponse:
    """Get changes from server since last sync"""
    try:
        changes = await DataSync.get_changes(
            db,
            current_user.id,
            last_sync_timestamp
        )
        return SyncPullResponse(changes=changes)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
