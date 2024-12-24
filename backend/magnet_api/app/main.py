from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1.endpoints import admin, magnet, sync, offline
from app.api.v1.endpoints.auth import router as auth_router
from app.core.config import settings
from app.models.base import Base, engine
from app.core.rate_limit import RateLimiter
from fastapi.responses import JSONResponse

# Import all models to ensure they are registered with SQLAlchemy
from app.models.user import User, Membership, UserSettings
from app.models.magnet import MagnetLink, Download, Favorite

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

# Disable CORS. Do not remove this for full-stack development.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

# Add rate limiting
app.add_middleware(RateLimiter, requests_per_minute=60, requests_per_hour=1000)

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    """Global exception handler for proper error handling"""
    import traceback
    error_details = "".join(traceback.format_exception(type(exc), exc, exc.__traceback__))
    print(f"Error details: {error_details}")  # Log the full error
    return JSONResponse(
        status_code=500,
        content={
            "detail": str(exc),
            "path": request.url.path,
            "traceback": error_details
        }
    )

# Include routers
app.include_router(auth_router, prefix=f"{settings.API_V1_STR}/auth", tags=["auth"])
app.include_router(admin.router, prefix=f"{settings.API_V1_STR}/admin", tags=["admin"])
app.include_router(magnet.router, prefix=f"{settings.API_V1_STR}/magnet", tags=["magnet"])
app.include_router(sync.router, prefix=f"{settings.API_V1_STR}/sync", tags=["sync"])
app.include_router(offline.router, prefix=f"{settings.API_V1_STR}/offline", tags=["offline"])

@app.on_event("startup")
async def startup():
    """Initialize database and create tables on startup"""
    try:
        print("Starting database initialization...")
        async with engine.begin() as conn:
            print("Creating database tables...")
            await conn.run_sync(Base.metadata.create_all)
            print("Database tables created successfully")
    except Exception as e:
        print(f"Error during database initialization: {str(e)}")
        import traceback
        print(f"Traceback: {traceback.format_exc()}")
        raise  # Re-raise the exception to prevent startup if DB init fails

@app.get("/healthz")
async def healthz():
    return {"status": "ok"}
