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
    password_hash = Column(String)
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



class UserSettings(Base):
    __tablename__ = "user_settings"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    device_id = Column(String)
    settings_data = Column(JSON)
    last_sync = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="settings")
