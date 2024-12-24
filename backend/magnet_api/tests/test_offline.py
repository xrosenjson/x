import pytest
import asyncio
from datetime import datetime
from httpx import AsyncClient

pytestmark = pytest.mark.asyncio

async def test_offline_endpoints(async_client: AsyncClient):
    """Test offline endpoints with rate limiting"""
    # Test data
    test_data = {
        "username": f"test_user_{int(datetime.now().timestamp())}",
        "email": f"test_{int(datetime.now().timestamp())}@example.com",
        "password": "testpassword123"
    }
    
    # Register user
    response = await async_client.post("/api/v1/auth/register", json=test_data)
    assert response.status_code == 200
    user_data = response.json()
    
    # Login
    login_data = {
        "username": test_data["username"],
        "password": test_data["password"]
    }
    response = await async_client.post("/api/v1/auth/login", json=login_data)
    assert response.status_code == 200
    token_data = response.json()
    access_token = token_data["access_token"]
    
    headers = {"Authorization": f"Bearer {access_token}"}
    
    
    # Test rate limiting by making multiple requests
    tasks = []
    for _ in range(10):
        tasks.append(
            async_client.post(
                "/api/v1/offline/1/save",
                headers=headers
            )
        )
    
    responses = await asyncio.gather(*tasks, return_exceptions=True)
    rate_limited = False
    for resp in responses:
        if hasattr(resp, 'status_code') and resp.status_code == 429:
            rate_limited = True
            break
    
    assert rate_limited, "Rate limiting not working as expected"
