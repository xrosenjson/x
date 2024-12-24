from fastapi import BackgroundTasks
from typing import Dict, Any, Optional
import asyncio
import aiofiles
import os
from datetime import datetime
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.user import Download, MagnetLink
from app.core.config import settings

class DownloadManager:
    DOWNLOAD_DIR = "/tmp/magnet_downloads"  # In production, use proper storage path

    @staticmethod
    async def update_download_status(
        db: AsyncSession,
        download_id: int,
        status: str,
        progress: float = 0
    ):
        """Update download status and progress"""
        download = await db.get(Download, download_id)
        if download:
            download.status = status
            download.progress = progress
            download.updated_at = datetime.utcnow()
            await db.commit()

    @staticmethod
    async def process_download(
        db: AsyncSession,
        download_id: int,
        magnet_hash: str
    ):
        """Process download in background"""
        try:
            # Ensure download directory exists
            os.makedirs(DownloadManager.DOWNLOAD_DIR, exist_ok=True)
            
            # Update status to downloading
            await DownloadManager.update_download_status(
                db, download_id, "DOWNLOADING", 0
            )
            
            # Simulate download progress (replace with actual torrent download logic)
            for progress in range(0, 101, 10):
                await asyncio.sleep(2)  # Simulate download time
                await DownloadManager.update_download_status(
                    db, download_id, "DOWNLOADING", progress
                )
            
            # Create placeholder file (replace with actual downloaded content)
            file_path = os.path.join(DownloadManager.DOWNLOAD_DIR, f"{magnet_hash}.data")
            async with aiofiles.open(file_path, 'w') as f:
                await f.write(f"Downloaded content for {magnet_hash}")
            
            # Update status to completed
            await DownloadManager.update_download_status(
                db, download_id, "COMPLETED", 100
            )
            
        except Exception as e:
            # Update status to failed
            await DownloadManager.update_download_status(
                db, download_id, "FAILED", 0
            )
            raise e

class OfflineManager:
    @staticmethod
    def get_offline_path(user_id: int, content_id: str) -> str:
        """Get path for offline content"""
        return os.path.join(DownloadManager.DOWNLOAD_DIR, f"user_{user_id}", content_id)

    @staticmethod
    async def save_for_offline(
        user_id: int,
        content_id: str,
        data: Dict[str, Any]
    ):
        """Save content for offline access"""
        offline_path = OfflineManager.get_offline_path(user_id, content_id)
        os.makedirs(os.path.dirname(offline_path), exist_ok=True)
        
        async with aiofiles.open(f"{offline_path}.json", 'w') as f:
            await f.write(str(data))

    @staticmethod
    async def get_offline_content(
        user_id: int,
        content_id: str
    ) -> Optional[Dict[str, Any]]:
        """Retrieve offline content"""
        offline_path = OfflineManager.get_offline_path(user_id, content_id)
        try:
            async with aiofiles.open(f"{offline_path}.json", 'r') as f:
                content = await f.read()
                return eval(content)  # Convert string back to dict
        except FileNotFoundError:
            return None
