export interface UserSettings {
  theme: 'light' | 'dark' | 'system';
  autoDownload: boolean;
  streamingQuality: 'auto' | 'low' | 'medium' | 'high';
  notifications: boolean;
  syncEnabled: boolean;
}

export interface User {
  id: number;
  username: string;
  email: string;
  profile_picture_url?: string;
  avatar?: string;
  membership_type: 'FREE' | 'BASIC' | 'PREMIUM';
  role: 'user' | 'admin';
  created_at: string;
  last_login?: string;
  settings?: UserSettings;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  user: User;
}
