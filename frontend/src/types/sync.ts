export interface SyncMetadata {
  filename: string;
  size: number;
  timestamp: number;
  type: 'download' | 'magnet' | 'admin';
}

export interface SyncChange {
  id: string;
  data: string | null;
  metadata: SyncMetadata;
  operation: 'create' | 'update' | 'delete';
  timestamp: number;
}

export interface SyncPushRequest {
  changes: SyncChange[];
  lastSyncTimestamp: number;
  deviceId: string;
}

export interface SyncPullResponse {
  data: {
    changes: SyncChange[];
    timestamp: number;
  };
}

export interface SyncState {
  lastSyncTimestamp: number;
  isSyncing: boolean;
  error: string | null;
}
