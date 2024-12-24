from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Request, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.api.deps import get_current_active_user, get_db
from app.models.user import User
from app.schemas.magnet import MagnetLink, MagnetLinkCreate, MagnetLinkList, StreamInfo
from app.core.magnet import parse_magnet_link, get_stream_info
from app.core.rate_limit import rate_limit

router = APIRouter()

@router.post("/parse", response_model=MagnetLink)
async def parse_link(
    request: Request,
    magnet_data: MagnetLinkCreate,
    current_user: User = Depends(get_current_active_user),
    db: AsyncSession = Depends(get_db)
) -> MagnetLink:
    """Parse a magnet link and return its metadata"""
    try:
        magnet_info = await parse_magnet_link(magnet_data.magnet_url)
        # Save to database
        magnet_link = MagnetLink(
            hash=magnet_info.hash,
            title=magnet_info.title,
            size=magnet_info.size,
            files=magnet_info.files,
            created_by=current_user.id
        )
        db.add(magnet_link)
        await db.commit()
        await db.refresh(magnet_link)
        return magnet_link
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Failed to parse magnet link: {str(e)}"
        )

@router.get("/list", response_model=MagnetLinkList)
async def list_links(
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(get_current_active_user),
    db: AsyncSession = Depends(get_db)
) -> MagnetLinkList:
    """List magnet links for the current user"""
    result = await db.execute(
        MagnetLink.__table__.select()
        .where(MagnetLink.created_by == current_user.id)
        .offset(skip)
        .limit(limit)
    )
    links = result.scalars().all()
    return MagnetLinkList(links=links, total=len(links))

@router.get("/{magnet_id}/stream", response_model=StreamInfo)
@rate_limit(max_requests=5, window_seconds=60)
async def get_streaming_info(
    magnet_id: int,
    file_index: Optional[int] = None,
    current_user: User = Depends(get_current_active_user),
    db: AsyncSession = Depends(get_db)
) -> StreamInfo:
    """Get streaming information for a magnet link"""
    result = await db.execute(
        MagnetLink.__table__.select()
        .where(MagnetLink.id == magnet_id)
        .where(MagnetLink.created_by == current_user.id)
    )
    magnet_link = result.scalar_one_or_none()
    
    if not magnet_link:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Magnet link not found"
        )
    
    try:
        stream_info = await get_stream_info(magnet_link.hash, file_index)
        return stream_info
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to get streaming information: {str(e)}"
        )

@router.delete("/{magnet_id}")
async def delete_link(
    magnet_id: int,
    current_user: User = Depends(get_current_active_user),
    db: AsyncSession = Depends(get_db)
):
    """Delete a magnet link"""
    result = await db.execute(
        MagnetLink.__table__.select()
        .where(MagnetLink.id == magnet_id)
        .where(MagnetLink.created_by == current_user.id)
    )
    magnet_link = result.scalar_one_or_none()
    
    if not magnet_link:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Magnet link not found"
        )
    
    await db.delete(magnet_link)
    await db.commit()
    return {"status": "success", "message": "Magnet link deleted"}
