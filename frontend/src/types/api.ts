export interface ApiResponse<T> {
  data: T;
  message?: string;
  error?: string;
}

export interface SyncResolveData {
  data: string;
  metadata: {
    filename: string;
    size: number;
    type: 'download' | 'magnet';
    isAdmin?: boolean;
    timestamp?: number;
    syncStatus: 'synced' | 'pending' | 'conflict';
    lastSynced: string | null;
    syncVersion: number;
  };
}

export interface SyncResolveResponse {
  data: {
    data: string;
    metadata: {
      filename: string;
      size: number;
      type: 'download' | 'magnet';
      isAdmin?: boolean;
      timestamp?: number;
      syncStatus: 'synced' | 'pending' | 'conflict';
      lastSynced: string | null;
      syncVersion: number;
    };
  };
  message?: string;
  error?: string;
}

export interface AdminSyncResponse {
  success: boolean;
  message: string;
  errors?: string[];
}

export interface SyncConflictResolution {
  id: string;
  resolution: 'local' | 'remote';
  deviceId: string;
  timestamp: number;
}

export interface UserSyncStatus {
  userId: number;
  lastSyncTimestamp: number;
  deviceCount: number;
  pendingChanges: number;
  conflicts: number;
}

export interface AdminSyncStatusResponse {
  data: UserSyncStatus[];
  total: number;
  page: number;
  pageSize: number;
}
