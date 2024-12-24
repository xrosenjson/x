from sqlalchemy import Column, Integer, String, DateTime, Enum, ForeignKey, Float, JSON, Boolean
from sqlalchemy.orm import relationship
from datetime import datetime
from .base import Base
import enum

class UserRole(str, enum.Enum):
    ADMIN = "admin"
    USER = "user"

class MembershipType(str, enum.Enum):
    FREE = "free"
    BASIC = "basic"
    PREMIUM = "premium"

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    role = Column(Enum(UserRole), default=UserRole.USER)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    last_login = Column(DateTime, nullable=True)
    profile_picture_url = Column(String, nullable=True)
    
    # Relationships
    membership = relationship("Membership", back_populates="user", uselist=False)
    downloads = relationship("Download", back_populates="user")
    favorites = relationship("Favorite", back_populates="user")
    settings = relationship("UserSettings", back_populates="user")

class Membership(Base):
    __tablename__ = "memberships"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    type = Column(Enum(MembershipType), default=MembershipType.FREE)
    start_date = Column(DateTime, default=datetime.utcnow)
    end_date = Column(DateTime, nullable=True)
    is_active = Column(Boolean, default=True)
    
    user = relationship("User", back_populates="membership")

class MagnetLink(Base):
    __tablename__ = "magnet_links"

    id = Column(Integer, primary_key=True, index=True)
    hash = Column(String, unique=True, index=True)
    title = Column(String)
    size = Column(Integer)  # in bytes
    created_at = Column(DateTime, default=datetime.utcnow)
    category = Column(String)
    magnet_metadata = Column(JSON)

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

class UserSettings(Base):
    __tablename__ = "user_settings"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    device_id = Column(String)
    settings_data = Column(JSON)
    last_sync = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="settings")
