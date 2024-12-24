// Component Types for the application
import { UserSettings } from './auth';

export interface StreamingPlayerProps {
  title: string;
  url: string;
  onError?: (error: Error) => void;
  onProgress?: (progress: number) => void;
  quality?: 'auto' | 'low' | 'medium' | 'high';
}

export interface Download {
  id: string;
  filename: string;
  progress: number;
  status: 'queued' | 'downloading' | 'paused' | 'completed' | 'failed';
  error?: string;
  size?: number;
  speed?: number;
  eta?: number;
  magnetUrl: string;
  createdAt: string;
  lastUpdated: string;
}

export interface DownloadManagerProps {
  downloads: Download[];
  onPauseResume: (id: string) => void;
  onCancel: (id: string) => void;
  onRetry: (id: string) => void;
  onAdd?: (magnetUrl: string) => void;
  settings?: UserSettings;
}

export interface SyncStatus {
  lastSynced: string | null;
  isSyncing: boolean;
  error?: string;
}

export interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

export interface LoadingProps {
  size?: 'small' | 'medium' | 'large';
  message?: string;
}

export interface SyncStatus {
  lastSynced: string | null;
  isSyncing: boolean;
  error?: string;
}

export interface ToastProps {
  title?: string;
  description?: string;
  type?: 'default' | 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}
