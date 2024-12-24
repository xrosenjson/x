from fastapi import HTTPException, Request, FastAPI
from starlette.middleware.base import BaseHTTPMiddleware
from collections import defaultdict
import time
from typing import Dict, Tuple
from datetime import datetime, timedelta

class RateLimiter(BaseHTTPMiddleware):
    def __init__(
        self,
        app,
        requests_per_minute: int = 60,
        requests_per_hour: int = 1000
    ):
        super().__init__(app)
        self.requests_per_minute = requests_per_minute
        self.requests_per_hour = requests_per_hour
        self.request_history: Dict[str, list] = defaultdict(list)
    
    def _clean_old_requests(self, client_id: str):
        """Remove requests older than 1 hour"""
        current_time = time.time()
        self.request_history[client_id] = [
            req_time for req_time in self.request_history[client_id]
            if current_time - req_time < 3600
        ]
    
    def _is_rate_limited(self, client_id: str) -> Tuple[bool, str]:
        """Check if request should be rate limited"""
        current_time = time.time()
        self._clean_old_requests(client_id)
        
        # Get requests in the last minute
        minute_requests = len([
            req_time for req_time in self.request_history[client_id]
            if current_time - req_time < 60
        ])
        
        # Get requests in the last hour
        hour_requests = len(self.request_history[client_id])
        
        if minute_requests >= self.requests_per_minute:
            return True, "Too many requests per minute"
        
        if hour_requests >= self.requests_per_hour:
            return True, "Too many requests per hour"
        
        return False, ""
    
    async def dispatch(self, request: Request, call_next):
        """Process the request through rate limiting"""
        # Get client identifier (IP address or user token)
        client_id = request.client.host
        
        # Check rate limits
        is_limited, message = self._is_rate_limited(client_id)
        if is_limited:
            raise HTTPException(
                status_code=429,
                detail=message
            )
        
        # Record the request
        self.request_history[client_id].append(time.time())
        
        # Process the request
        response = await call_next(request)
        return response

# Create a dummy FastAPI app for the rate limiter instance
_app = FastAPI()
rate_limit = RateLimiter(_app)
