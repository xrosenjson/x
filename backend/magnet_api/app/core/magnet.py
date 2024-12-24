import re
import aiohttp
from typing import Optional
from app.schemas.magnet import MagnetLink, StreamInfo, MagnetFile
from app.core.config import settings
from fastapi import HTTPException

async def parse_magnet_link(magnet_url: str) -> MagnetLink:
    """Parse a magnet link and return its metadata"""
    try:
        # Extract hash from magnet URL
        hash_match = re.search(r'btih:([a-fA-F0-9]{40})', magnet_url)
        if not hash_match:
            raise ValueError("Invalid magnet URL format")
        
        hash_value = hash_match.group(1)
        
        # In a real implementation, we would:
        # 1. Connect to DHT network
        # 2. Fetch metadata from peers
        # 3. Parse and validate the metadata
        # For now, we'll return mock data
        mock_files = [
            MagnetFile(
                path="sample/video.mp4",
                size=1024*1024*100,  # 100MB
                index=0
            )
        ]
        
        return MagnetLink(
            id=0,  # Will be set by database
            hash=hash_value,
            title=f"Sample Content ({hash_value[:8]})",
            size=sum(f.size for f in mock_files),
            files=mock_files,
            created_by=0  # Will be set by endpoint
        )
    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=f"Failed to parse magnet link: {str(e)}"
        )

async def get_stream_info(
    hash_value: str,
    file_index: Optional[int] = None
) -> StreamInfo:
    """Get streaming information for a magnet link"""
    try:
        # In a real implementation, we would:
        # 1. Check if content is cached
        # 2. Start downloading if needed
        # 3. Set up streaming server
        # 4. Return stream URL
        # For now, we'll return mock data
        
        stream_url = f"{settings.STREAM_BASE_URL}/stream/{hash_value}"
        if file_index is not None:
            stream_url += f"/{file_index}"
        
        return StreamInfo(
            stream_url=stream_url,
            file_name="video.mp4",
            file_size=1024*1024*100,  # 100MB
            mime_type="video/mp4",
            duration=3600.0  # 1 hour
        )
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to get stream info: {str(e)}"
        )
