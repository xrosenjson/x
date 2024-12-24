from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks, Request
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import List, Dict, Any
import os
from datetime import datetime, timedelta
from app.models.base import get_db
from app.models.user import User, MagnetLink, Download
from app.core.tasks import DownloadManager, OfflineManager
from app.api.deps import get_current_active_user

router = APIRouter()

@router.post("/{magnet_id}/save")
async def save_for_offline(
    request: Request,
    magnet_id: int,
    background_tasks: BackgroundTasks,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Save content for offline access"""
    # Check if magnet exists
    result = await db.execute(
        select(MagnetLink).where(MagnetLink.id == magnet_id)
    )
    magnet = result.scalar_one_or_none()
    
    if not magnet:
        raise HTTPException(status_code=404, detail="Content not found")
    
    # Create download entry
    download = Download(
        user_id=current_user.id,
        magnet_id=magnet.id,
        status="QUEUED",
        progress=0
    )
    db.add(download)
    await db.commit()
    await db.refresh(download)
    
    # Start background download task
    background_tasks.add_task(
        DownloadManager.process_download,
        db,
        download.id,
        magnet.hash
    )
    
    # Save metadata for offline access
    await OfflineManager.save_for_offline(
        current_user.id,
        str(magnet.id),
        {
            "title": magnet.title,
            "hash": magnet.hash,
            "size": magnet.size,
            "category": magnet.category
        }
    )
    
    return {
        "message": "Content queued for offline access",
        "download_id": download.id
    }

@router.get("/content")
async def list_offline_content(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """List all offline content for user"""
    result = await db.execute(
        select(Download)
        .where(
            (Download.user_id == current_user.id) &
            (Download.status == "COMPLETED")
        )
        .join(MagnetLink)
    )
    downloads = result.scalars().all()
    
    offline_content = []
    for download in downloads:
        content = await OfflineManager.get_offline_content(
            current_user.id,
            str(download.magnet_id)
        )
        if content:
            offline_content.append({
                "download_id": download.id,
                "content": content,
                "downloaded_at": download.updated_at
            })
    
    return offline_content

@router.delete("/{magnet_id}")
async def remove_offline_content(
    magnet_id: int,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Remove content from offline storage"""
    result = await db.execute(
        select(Download)
        .where(
            (Download.user_id == current_user.id) &
            (Download.magnet_id == magnet_id)
        )
    )
    download = result.scalar_one_or_none()
    
    if not download:
        raise HTTPException(status_code=404, detail="Offline content not found")
    
    # Remove offline content
    offline_path = OfflineManager.get_offline_path(current_user.id, str(magnet_id))
    try:
        os.remove(f"{offline_path}.json")
    except FileNotFoundError:
        pass
    
    # Update download status
    download.status = "REMOVED"
    await db.commit()
    
    return {"message": "Offline content removed successfully"}
