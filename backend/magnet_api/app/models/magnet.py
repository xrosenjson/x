from sqlalchemy import Column, Integer, String, BigInteger, ForeignKey, JSON, DateTime
from sqlalchemy.sql import func
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
