from fastapi import HTTPException, Request, FastAPI, Depends
from starlette.middleware.base import BaseHTTPMiddleware
from collections import defaultdict
import time
from typing import Dict, Tuple, Callable, Optional
from datetime import datetime, timedelta
import functools

class RateLimiter:
    def __init__(self, max_requests: int = 60, window_seconds: int = 60):
        self.max_requests = max_requests
        self.window_seconds = window_seconds
        self.request_history: Dict[str, list] = defaultdict(list)
    
    def _clean_old_requests(self, client_id: str):
        """Remove requests older than the window"""
        current_time = time.time()
        self.request_history[client_id] = [
            req_time for req_time in self.request_history[client_id]
            if current_time - req_time < self.window_seconds
        ]
    
    def _is_rate_limited(self, client_id: str) -> Tuple[bool, str]:
        """Check if request should be rate limited"""
        current_time = time.time()
        self._clean_old_requests(client_id)
        
        # Get requests in the window
        requests = len(self.request_history[client_id])
        
        if requests >= self.max_requests:
            return True, f"Too many requests. Maximum {self.max_requests} requests per {self.window_seconds} seconds."
        
        return False, ""

    async def check_rate_limit(self, request: Request) -> None:
        """Check if request should be rate limited"""
        client_id = request.client.host
        is_limited, message = self._is_rate_limited(client_id)
        
        if is_limited:
            raise HTTPException(status_code=429, detail=message)
        
        self.request_history[client_id].append(time.time())
        return None

def create_rate_limiter(max_requests: int = 60, window_seconds: int = 60):
    """Create a rate limiter dependency"""
    limiter = RateLimiter(max_requests, window_seconds)

    async def check_rate_limit(request: Request = Depends()) -> None:
        return await limiter.check_rate_limit(request)
    
    return check_rate_limit

def rate_limit(max_requests: int = 60, window_seconds: int = 60):
    """Rate limiting decorator that uses FastAPI dependency injection"""
    return Depends(create_rate_limiter(max_requests, window_seconds))

class RateLimitMiddleware(BaseHTTPMiddleware):
    """Middleware for global rate limiting"""
    def __init__(
        self,
        app,
        requests_per_minute: int = 60,
        requests_per_hour: int = 1000
    ):
        super().__init__(app)
        self.minute_limiter = RateLimiter(requests_per_minute, 60)
        self.hour_limiter = RateLimiter(requests_per_hour, 3600)
    
    async def dispatch(self, request: Request, call_next):
        """Process the request through rate limiting"""
        try:
            # Skip rate limiting for healthz endpoint
            if request.url.path == "/healthz":
                return await call_next(request)
            
            # Apply rate limiting
            await self.minute_limiter.check_rate_limit(request)
            await self.hour_limiter.check_rate_limit(request)
            
            # Continue with request
            response = await call_next(request)
            return response
            
        except Exception as e:
            # Log the error but allow the request to continue
            print(f"Rate limiting error in middleware: {str(e)}")
            return await call_next(request)
