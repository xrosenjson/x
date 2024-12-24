from cryptography.fernet import Fernet
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
import base64
import os
from app.core.config import settings

class Encryption:
    def __init__(self):
        self._key = self._generate_key()
        self._fernet = Fernet(self._key)

    def _generate_key(self) -> bytes:
        """Generate a secure key for encryption"""
        # Use a fixed salt derived from SECRET_KEY
        salt = os.urandom(16)  # Generate a random salt
        kdf = PBKDF2HMAC(
            algorithm=hashes.SHA256(),
            length=32,
            salt=salt,
            iterations=100000,
        )
        # Use SECRET_KEY as the password for key derivation
        key = base64.urlsafe_b64encode(kdf.derive(settings.SECRET_KEY.encode()))
        return key

    def encrypt(self, data: str) -> str:
        """Encrypt data"""
        return self._fernet.encrypt(data.encode()).decode()

    def decrypt(self, encrypted_data: str) -> str:
        """Decrypt data"""
        return self._fernet.decrypt(encrypted_data.encode()).decode()

# Global encryption instance
encryption = Encryption()
