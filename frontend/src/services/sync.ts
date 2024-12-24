import { toast } from '../lib/use-toast';
import type { SyncMetadata } from '../types/sync';
import { offlineStorage } from '../lib/offline-storage';
import apiClient from '../lib/api-client';
import { config } from '../lib/config';
import { cacheManager } from '../lib/cache';
import type { SyncState, SyncPullResponse, SyncChange } from '../types/sync';
import type { SyncResolveResponse } from '../types/api';

class SyncService {
  private static instance: SyncService;
  private state: SyncState = {
    lastSyncTimestamp: 0,
    isSyncing: false,
    error: null,
  };
  private syncInterval: number | null = null;
  private listeners: ((state: SyncState) => void)[] = [];

  private constructor() {
    this.startSync();
  }

  static getInstance(): SyncService {
    if (!SyncService.instance) {
      SyncService.instance = new SyncService();
    }
    return SyncService.instance;
  }

  private setState(newState: Partial<SyncState>) {
    this.state = { ...this.state, ...newState };
    this.notifyListeners();
  }

  private notifyListeners() {
    this.listeners.forEach(listener => listener(this.state));
  }

  public subscribe(listener: (state: SyncState) => void) {
    this.listeners.push(listener);
    listener(this.state);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  public async startSync() {
    if (this.syncInterval) {
      return;
    }

    this.syncInterval = window.setInterval(
      () => this.sync(),
      config.syncInterval
    );

    // Initial sync
    await this.sync();
  }

  public stopSync() {
    if (this.syncInterval) {
      clearInterval(this.syncInterval);
      this.syncInterval = null;
    }
  }

  private async sync() {
    if (this.state.isSyncing) {
      return;
    }

    try {
      this.setState({ isSyncing: true, error: null });

      // Get all local changes since last sync
      const metadata = await offlineStorage.getAllMetadata();
      const changedItems = Object.entries(metadata)
        .filter(([_, meta]) => meta.timestamp > this.state.lastSyncTimestamp);

      // Send changes to server
      if (changedItems.length > 0) {
        const changes: SyncChange[] = await Promise.all(
          changedItems.map(async ([id, meta]) => {
            const data = await offlineStorage.getDownload(id);
            return {
              id,
              data: data ? btoa(Array.from(new Uint8Array(data)).map(byte => String.fromCharCode(byte)).join('')) : null,
              metadata: meta as SyncMetadata,
              operation: 'update',
              timestamp: meta.timestamp,
            };
          })
        );

        await apiClient.post<void>('/api/v1/sync/push', {
          changes,
          lastSyncTimestamp: this.state.lastSyncTimestamp,
          deviceId: config.deviceId,
        });
      }

      // Get server changes with caching
      const cacheKey = `sync_${this.state.lastSyncTimestamp}`;
      let syncData = await cacheManager.get<SyncPullResponse>(cacheKey);
      
      if (!syncData) {
        const response = await apiClient.get<SyncPullResponse>('/api/v1/sync/pull', {
          params: {
            last_sync_timestamp: this.state.lastSyncTimestamp,
          },
        });
        syncData = response.data;
        await cacheManager.set(cacheKey, syncData);
      }

      if (!syncData || !syncData.data) {
        throw new Error('Failed to fetch sync data');
      }

      // Apply server changes locally
      const serverChanges: SyncChange[] = syncData.data.changes;
      for (const change of serverChanges) {
        if (change.operation === 'delete') {
          await offlineStorage.removeDownload(change.id);
        } else if (change.data) {
          const buffer = new Uint8Array(atob(change.data).split('').map(c => c.charCodeAt(0)));
          await offlineStorage.addDownload(
            change.id,
            buffer,
            change.metadata
          );
        }
      }

      this.setState({
        lastSyncTimestamp: syncData.data.timestamp,
        isSyncing: false,
        error: null,
      });

      toast({
        title: 'Sync Complete',
        description: 'Your data has been synchronized successfully.',
      });
    } catch (error) {
      console.error('Sync failed:', error);
      const errorMessage = error instanceof Error ? error.message : 'Sync failed';
      this.setState({
        isSyncing: false,
        error: errorMessage,
      });
      toast({
        title: 'Sync Failed',
        description: errorMessage,
        variant: 'destructive',
      });
    }
  }

  public async forceSyncNow() {
    await this.sync();
  }

  public async resolveConflict(id: string, resolution: 'local' | 'remote') {
    try {
      const metadata = await offlineStorage.getMetadata(id);
      if (!metadata) {
        throw new Error('Item not found');
      }

      if (resolution === 'remote') {
        // Fetch latest version from server
        const response = await apiClient.get<SyncResolveResponse>(`/api/v1/sync/resolve/${id}`);
        if (response.data) {
          const { data: resolveData } = response;
          if (typeof resolveData.data !== 'string') {
            throw new Error('Invalid data format received from server');
          }
          const binaryData = new Uint8Array(atob(resolveData.data).split('').map(c => c.charCodeAt(0))).buffer;
          await offlineStorage.addDownload(id, binaryData, {
            filename: metadata.filename,
            size: metadata.size,
            type: metadata.type,
            isAdmin: metadata.isAdmin,
            timestamp: Date.now()
          });
        }
      } else {
        // Keep local version and mark as synced
        await offlineStorage.addDownload(
          id,
          await offlineStorage.getDownload(id) as ArrayBuffer,
          {
            filename: metadata.filename,
            size: metadata.size,
            type: metadata.type,
            isAdmin: metadata.isAdmin,
            timestamp: Date.now()
          }
        );
      }

      // Notify server of resolution
      await apiClient.post(`/api/v1/sync/resolve/${id}`, {
        resolution,
        deviceId: config.deviceId,
      });

    } catch (error) {
      console.error('Failed to resolve conflict:', error);
      throw error;
    }
  }

  public async forceSyncAllUsers() {
    if (!config.isAdmin) {
      throw new Error('Unauthorized: Admin access required');
    }

    try {
      await apiClient.post('/api/v1/admin/sync/all');
      toast({
        title: 'Global Sync Initiated',
        description: 'Synchronization for all users has been initiated.',
      });
    } catch (error) {
      console.error('Failed to sync all users:', error);
      throw error;
    }
  }

  public getState(): SyncState {
    return { ...this.state };
  }
}

export const syncService = SyncService.getInstance();
