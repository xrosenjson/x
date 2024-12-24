from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    PROJECT_NAME: str = "Magnet App API"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"
    SECRET_KEY: str = "c2VjcmV0LWtleS1iYXNlNjQtZW5jb2RlZC1mb3ItbWFnbmV0LWFwcA=="  # Base64 encoded secret key
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 8  # 8 days
    DATABASE_URL: str = "sqlite+aiosqlite:///./magnet_app.db"
    ADMIN_EMAIL: str = "admin@example.com"
    ADMIN_PASSWORD: str = "admin123"  # Change in production

    class Config:
        case_sensitive = True

settings = Settings()
