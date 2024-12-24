from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    PROJECT_NAME: str = "Magnet App API"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"
    
    # Security settings
    SECRET_KEY: str = "JETIK7Y4XLNJDWLxNsWjc16lp2t8WvMfREcu_POWzAM"  # Override in production
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 8  # 8 days
    
    # Service URLs
    STREAM_BASE_URL: str = "https://app-bcklweyr.fly.dev"  # Base URL for streaming service
    DATABASE_URL: str = "sqlite+aiosqlite:///./magnet_app.db"
    
    # Admin credentials - Override these in production!
    ADMIN_EMAIL: str = "admin@example.com"
    ADMIN_PASSWORD: str = "change_in_production_123!"

    class Config:
        case_sensitive = True

settings = Settings()
