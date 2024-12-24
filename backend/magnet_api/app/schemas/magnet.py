from typing import List, Optional
from pydantic import BaseModel, Field
from datetime import datetime

class MagnetLinkCreate(BaseModel):
    magnet_url: str = Field(..., description="Magnet URL to parse")

class MagnetFile(BaseModel):
    path: str
    size: int
    index: int

class MagnetLink(BaseModel):
    id: int
    hash: str
    title: str
    size: int
    files: List[MagnetFile]
    created_by: int
    created_at: datetime = Field(default_factory=datetime.utcnow)
    
    class Config:
        from_attributes = True

class MagnetLinkList(BaseModel):
    links: List[MagnetLink]
    total: int

class StreamInfo(BaseModel):
    stream_url: str
    file_name: str
    file_size: int
    mime_type: str
    duration: Optional[float] = None
