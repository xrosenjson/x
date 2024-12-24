import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../lib/api';
import { User, LoginCredentials, RegisterCredentials, AuthResponse, UserSettings } from '../types/auth';

interface UpdateProfileData {
  username?: string;
  email?: string;
  profile_picture_url?: string;
  settings?: UserSettings;
}

interface AuthContextType {
  user: User | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  updateProfile: (data: UpdateProfileData) => Promise<void>;
  updateSettings: (settings: UserSettings) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api.get<User>('/api/v1/users/me')
        .then(response => setUser(response.data))
        .catch(() => localStorage.removeItem('token'))
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = async (credentials: LoginCredentials) => {
    const response = await api.post<AuthResponse>('/api/v1/auth/login', credentials);
    localStorage.setItem('token', response.data.access_token);
    setUser(response.data.user);
  };

  const register = async (credentials: RegisterCredentials) => {
    const response = await api.post<AuthResponse>('/api/v1/auth/register', credentials);
    localStorage.setItem('token', response.data.access_token);
    setUser(response.data.user);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const updateProfile = async (data: UpdateProfileData) => {
    const response = await api.patch<User>('/api/v1/users/me', data);
    setUser(response.data);
  };

  const updateSettings = async (settings: UserSettings) => {
    const response = await api.patch<User>('/api/v1/users/me/settings', { settings });
    setUser(response.data);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      register, 
      logout, 
      isLoading, 
      updateProfile,
      updateSettings 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
