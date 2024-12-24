export interface SyncMetadata {
  filename: string;
  size: number;
  timestamp: number;
  type: 'download' | 'magnet';
  isAdmin?: boolean;
  syncStatus: 'synced' | 'pending' | 'conflict';
  lastSynced: string | null;
  syncVersion: number;
  localChanges?: any;
  syncMetadata?: any;
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
