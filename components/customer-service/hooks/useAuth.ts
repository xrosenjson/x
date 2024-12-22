import { useEffect, useState } from 'react';
import type { Language } from '../config';
import { config } from '../config';

interface User {
  id: string;
  username: string;
  role: 'admin' | 'agent' | 'user';
  status: 'active' | 'inactive';
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

interface AuthMessages {
  loginFailed: string;
  authFailed: string;
  networkError: string;
}

const messages: Record<Language, AuthMessages> = {
  'zh-CN': {
    loginFailed: '登录失败',
    authFailed: '认证失败',
    networkError: '网络错误',
  },
  'en-US': {
    loginFailed: 'Login failed',
    authFailed: 'Authentication failed',
    networkError: 'Network error',
  },
};

export const useAuth = (language: Language = 'zh-CN') => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null,
  });

  const t = messages[language];

  const checkAuth = async () => {
    try {
      const response = await fetch(`${config.backendUrl}/auth/me`, {
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(t.authFailed);
      }

      const user = await response.json();
      setAuthState({ user, loading: false, error: null });
    } catch (error) {
      setAuthState({
        user: null,
        loading: false,
        error: error instanceof Error ? error.message : t.networkError,
      });
    }
  };

  const login = async (username: string, password: string) => {
    try {
      const response = await fetch(`${config.backendUrl}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(t.loginFailed);
      }

      const user = await response.json();
      setAuthState({ user, loading: false, error: null });
      return true;
    } catch (error) {
      setAuthState({
        user: null,
        loading: false,
        error: error instanceof Error ? error.message : t.loginFailed,
      });
      return false;
    }
  };

  const logout = async () => {
    try {
      await fetch(`${config.backendUrl}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });
    } finally {
      setAuthState({ user: null, loading: false, error: null });
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return {
    user: authState.user,
    loading: authState.loading,
    error: authState.error,
    login,
    logout,
    checkAuth,
  };
};
