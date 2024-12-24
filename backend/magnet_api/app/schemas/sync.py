from typing import List, Optional, Literal
from pydantic import BaseModel

class Metadata(BaseModel):
    filename: str
    size: int
    timestamp: int
    hash: str
    type: Literal['download', 'magnet']

class Change(BaseModel):
    id: str
    data: Optional[str] = None  # Base64 encoded data
    metadata: Metadata
    operation: str  # 'create', 'update', or 'delete'
    timestamp: int

class SyncPushRequest(BaseModel):
    changes: List[Change]
    lastSyncTimestamp: int
    deviceId: str

class SyncPullResponse(BaseModel):
    changes: List[Change]
    timestamp: int
