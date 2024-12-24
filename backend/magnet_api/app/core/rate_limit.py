from fastapi import HTTPException, Request, FastAPI
from starlette.middleware.base import BaseHTTPMiddleware
from collections import defaultdict
import time
from typing import Dict, Tuple, Callable
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

    async def __call__(self, request: Request) -> bool:
        """Check if request should be rate limited"""
        client_id = request.client.host
        is_limited, message = self._is_rate_limited(client_id)
        
        if is_limited:
            raise HTTPException(status_code=429, detail=message)
        
        self.request_history[client_id].append(time.time())
        return False

def rate_limit(max_requests: int = 60, window_seconds: int = 60):
    """Rate limiting decorator"""
    limiter = RateLimiter(max_requests, window_seconds)
    
    def decorator(func: Callable):
        @functools.wraps(func)
        async def wrapper(*args, **kwargs):
            request = kwargs.get('request')
            if not request:
                for arg in args:
                    if isinstance(arg, Request):
                        request = arg
                        break
            
            if not request:
                raise ValueError("No request object found in function arguments")
            
            await limiter(request)
            return await func(*args, **kwargs)
        
        return wrapper
    
    return decorator

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
        await self.minute_limiter(request)
        await self.hour_limiter(request)
        return await call_next(request)
