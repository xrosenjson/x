from sqlalchemy import Column, Integer, String, BigInteger, ForeignKey, JSON, DateTime, Float, Boolean
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from datetime import datetime
from app.models.base import Base

class MagnetLink(Base):
    __tablename__ = "magnet_links"
    
    id = Column(Integer, primary_key=True, index=True)
    hash = Column(String(40), unique=True, index=True)
    title = Column(String(255), nullable=False)
    size = Column(BigInteger, nullable=False)
    files = Column(JSON, nullable=False)
    created_by = Column(Integer, ForeignKey("users.id"))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    category = Column(String, nullable=True)
    magnet_metadata = Column(JSON, nullable=True)
    
    # Fields for offline sync
    sync_status = Column(String, default="synced")  # synced, pending, conflict
    last_synced = Column(DateTime(timezone=True), nullable=True)
    sync_version = Column(Integer, default=1)  # For conflict resolution
    local_changes = Column(JSON, nullable=True)  # Store local modifications

    # Relationships
    downloads = relationship("Download", back_populates="magnet")
    favorites = relationship("Favorite", back_populates="magnet")

class Download(Base):
    __tablename__ = "downloads"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    magnet_id = Column(Integer, ForeignKey("magnet_links.id"))
    status = Column(String)  # QUEUED, DOWNLOADING, COMPLETED, FAILED
    progress = Column(Float, default=0)
    local_path = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    # Fields for offline sync
    sync_status = Column(String, default="pending")  # synced, pending, conflict
    last_synced = Column(DateTime(timezone=True), nullable=True)
    sync_version = Column(Integer, default=1)  # For conflict resolution
    sync_metadata = Column(JSON, nullable=True)  # Additional sync information

    user = relationship("User", back_populates="downloads")
    magnet = relationship("MagnetLink", back_populates="downloads")

class Favorite(Base):
    __tablename__ = "favorites"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    magnet_id = Column(Integer, ForeignKey("magnet_links.id"))
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="favorites")
    magnet = relationship("MagnetLink", back_populates="favorites")
