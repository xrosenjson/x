from typing import Dict, Any, Optional, List
from datetime import datetime
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, and_
from app.models.user import UserSettings, User, Download, MagnetLink
from app.core.encryption import encryption
from app.schemas.sync import Change, Metadata

class DataSync:
    @staticmethod
    async def process_changes(
        db: AsyncSession,
        user_id: int,
        changes: List[Change],
        last_sync_timestamp: int
    ) -> Dict[str, Any]:
        """Process changes from client"""
        for change in changes:
            if change.metadata.type == 'download':
                await DataSync._process_download_change(db, user_id, change)
            elif change.metadata.type == 'magnet':
                await DataSync._process_magnet_change(db, user_id, change)
        
        await db.commit()
        return {"processed": len(changes)}

    @staticmethod
    async def _process_download_change(
        db: AsyncSession,
        user_id: int,
        change: Change
    ):
        """Process download-related change"""
        if change.operation == 'delete':
            result = await db.execute(
                select(Download).where(
                    and_(
                        Download.user_id == user_id,
                        Download.id == change.id
                    )
                )
            )
            download = result.scalar_one_or_none()
            if download:
                await db.delete(download)
        else:
            result = await db.execute(
                select(Download).where(
                    and_(
                        Download.user_id == user_id,
                        Download.id == change.id
                    )
                )
            )
            download = result.scalar_one_or_none()
            
            if download:
                # Update existing download
                download.data = change.data
                download.metadata = change.metadata.dict()
                download.updated_at = datetime.fromtimestamp(change.timestamp)
            else:
                # Create new download
                download = Download(
                    id=change.id,
                    user_id=user_id,
                    data=change.data,
                    metadata=change.metadata.dict(),
                    created_at=datetime.fromtimestamp(change.timestamp),
                    updated_at=datetime.fromtimestamp(change.timestamp)
                )
                db.add(download)

    @staticmethod
    async def _process_magnet_change(
        db: AsyncSession,
        user_id: int,
        change: Change
    ):
        """Process magnet-related change"""
        if change.operation == 'delete':
            result = await db.execute(
                select(MagnetLink).where(
                    and_(
                        MagnetLink.user_id == user_id,
                        MagnetLink.id == change.id
                    )
                )
            )
            magnet = result.scalar_one_or_none()
            if magnet:
                await db.delete(magnet)
        else:
            result = await db.execute(
                select(MagnetLink).where(
                    and_(
                        MagnetLink.user_id == user_id,
                        MagnetLink.id == change.id
                    )
                )
            )
            magnet = result.scalar_one_or_none()
            
            if magnet:
                # Update existing magnet
                magnet.metadata = change.metadata.dict()
                magnet.updated_at = datetime.fromtimestamp(change.timestamp)
            else:
                # Create new magnet
                magnet = MagnetLink(
                    id=change.id,
                    user_id=user_id,
                    metadata=change.metadata.dict(),
                    created_at=datetime.fromtimestamp(change.timestamp),
                    updated_at=datetime.fromtimestamp(change.timestamp)
                )
                db.add(magnet)


    @staticmethod
    async def get_changes(
        db: AsyncSession,
        user_id: int,
        last_sync_timestamp: int
    ) -> List[Change]:
        """Get changes since last sync"""
        changes: List[Change] = []
        
        # Get download changes
        downloads_result = await db.execute(
            select(Download).where(
                and_(
                    Download.user_id == user_id,
                    Download.updated_at > datetime.fromtimestamp(last_sync_timestamp)
                )
            )
        )
        downloads = downloads_result.scalars().all()
        
        for download in downloads:
            changes.append(Change(
                id=download.id,
                data=download.data,
                metadata=Metadata(**download.metadata),
                operation='update',
                timestamp=int(download.updated_at.timestamp())
            ))
        
        # Get magnet changes
        magnets_result = await db.execute(
            select(MagnetLink).where(
                and_(
                    MagnetLink.user_id == user_id,
                    MagnetLink.updated_at > datetime.fromtimestamp(last_sync_timestamp)
                )
            )
        )
        magnets = magnets_result.scalars().all()
        
        for magnet in magnets:
            changes.append(Change(
                id=magnet.id,
                metadata=Metadata(**magnet.metadata),
                operation='update',
                timestamp=int(magnet.updated_at.timestamp())
            ))
        
        return changes


class DeviceSync:
    @staticmethod
    async def get_user_settings(
        db: AsyncSession,
        user_id: int,
        device_id: str
    ) -> Optional[Dict[str, Any]]:
        """Get user settings for a specific device"""
        result = await db.execute(
            select(UserSettings).where(
                UserSettings.user_id == user_id,
                UserSettings.device_id == device_id
            )
        )
        settings = result.scalar_one_or_none()
        
        if settings:
            # Decrypt settings data
            decrypted_data = encryption.decrypt(settings.settings_data)
            return {
                "settings": decrypted_data,
                "last_sync": settings.last_sync
            }
        return None

    @staticmethod
    async def update_user_settings(
        db: AsyncSession,
        user_id: int,
        device_id: str,
        settings_data: Dict[str, Any]
    ) -> UserSettings:
        """Update user settings for a specific device"""
        result = await db.execute(
            select(UserSettings).where(
                UserSettings.user_id == user_id,
                UserSettings.device_id == device_id
            )
        )
        settings = result.scalar_one_or_none()
        
        # Encrypt settings data
        encrypted_data = encryption.encrypt(str(settings_data))
        
        if settings:
            settings.settings_data = encrypted_data
            settings.last_sync = datetime.utcnow()
        else:
            settings = UserSettings(
                user_id=user_id,
                device_id=device_id,
                settings_data=encrypted_data,
                last_sync=datetime.utcnow()
            )
            db.add(settings)
        
        await db.commit()
        await db.refresh(settings)
        return settings

    @staticmethod
    async def sync_devices(
        db: AsyncSession,
        user_id: int,
        source_device_id: str
    ) -> Dict[str, Any]:
        """Sync settings across all user devices"""
        # Get source device settings
        source_settings = await DeviceSync.get_user_settings(
            db, user_id, source_device_id
        )
        
        if not source_settings:
            return {"status": "error", "message": "Source device settings not found"}
        
        # Get all user devices
        result = await db.execute(
            select(UserSettings).where(UserSettings.user_id == user_id)
        )
        all_devices = result.scalars().all()
        
        # Update settings for all devices
        for device in all_devices:
            if device.device_id != source_device_id:
                await DeviceSync.update_user_settings(
                    db,
                    user_id,
                    device.device_id,
                    source_settings["settings"]
                )
        
        return {
            "status": "success",
            "message": f"Synced {len(all_devices)} devices",
            "last_sync": datetime.utcnow()
        }
