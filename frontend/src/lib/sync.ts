import { toast } from './use-toast';
import { SyncStatus } from '../types/components';

class SyncManager {
  private static instance: SyncManager;
  private syncStatus: SyncStatus = {
    lastSynced: null,
    isSyncing: false,
  };

  private constructor() {}

  static getInstance(): SyncManager {
    if (!SyncManager.instance) {
      SyncManager.instance = new SyncManager();
    }
    return SyncManager.instance;
  }

  async syncData(): Promise<void> {
    if (this.syncStatus.isSyncing) {
      return;
    }

    try {
      this.syncStatus.isSyncing = true;
      
      // Sync user settings
      await this.syncUserSettings();
      
      // Sync downloads
      await this.syncDownloads();
      
      // Update last sync time
      this.syncStatus.lastSynced = new Date().toISOString();
      this.syncStatus.error = undefined;
      
      toast({
        title: 'Sync Complete',
        description: 'Your data has been synchronized across devices',
      });
    } catch (error) {
      this.syncStatus.error = error instanceof Error ? error.message : 'Sync failed';
      toast({
        title: 'Sync Failed',
        description: this.syncStatus.error,
        variant: 'destructive',
      });
    } finally {
      this.syncStatus.isSyncing = false;
    }
  }

  private async syncUserSettings(): Promise<void> {
    const response = await fetch('/api/sync/settings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to sync user settings');
    }
  }

  private async syncDownloads(): Promise<void> {
    const response = await fetch('/api/sync/downloads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to sync downloads');
    }
  }

  getSyncStatus(): SyncStatus {
    return { ...this.syncStatus };
  }
}

export const syncManager = SyncManager.getInstance();
