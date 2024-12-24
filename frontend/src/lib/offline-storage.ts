import localforage from 'localforage';

const OFFLINE_STORAGE_KEY = 'magnet_app_offline_data';
const MAX_STORAGE_SIZE = parseInt(import.meta.env.VITE_OFFLINE_STORAGE_LIMIT as string, 10);

interface OfflineData {
  downloads: {
    [key: string]: ArrayBuffer;
  };
  metadata: {
    [key: string]: {
      filename: string;
      size: number;
      timestamp: number;
      type: 'download' | 'magnet' | 'admin';
    };
  };
}

class OfflineStorage {
  private storage: LocalForage;
  private data: OfflineData = {
    downloads: {},
    metadata: {},
  };

  constructor() {
    this.storage = localforage.createInstance({
      name: 'magnet_app',
      storeName: 'offline_storage',
    });
    this.loadData();
  }

  private async loadData() {
    try {
      const storedData = await this.storage.getItem<OfflineData>(OFFLINE_STORAGE_KEY);
      if (storedData) {
        this.data = storedData;
      }
    } catch (error) {
      console.error('Error loading offline data:', error);
    }
  }

  private async saveData() {
    try {
      await this.storage.setItem(OFFLINE_STORAGE_KEY, this.data);
    } catch (error) {
      console.error('Error saving offline data:', error);
      throw new Error('Failed to save offline data');
    }
  }

  async addDownload(id: string, data: ArrayBuffer, metadata: { filename: string; size: number; type: 'download' | 'magnet' }) {
    const currentSize = Object.values(this.data.metadata).reduce((acc, item) => acc + item.size, 0);
    const newSize = currentSize + metadata.size;

    if (newSize > MAX_STORAGE_SIZE) {
      throw new Error('Storage limit exceeded');
    }

    this.data.downloads[id] = data;
    this.data.metadata[id] = {
      ...metadata,
      timestamp: Date.now(),
    };

    await this.saveData();
  }


  async getDownload(id: string): Promise<ArrayBuffer | null> {
    return this.data.downloads[id] || null;
  }

  async removeDownload(id: string) {
    delete this.data.downloads[id];
    delete this.data.metadata[id];
    await this.saveData();
  }

  async getMetadata(id: string) {
    return this.data.metadata[id] || null;
  }

  async getAllMetadata() {
    return this.data.metadata;
  }

  async clearOldDownloads(maxAge: number) {
    const now = Date.now();
    const idsToRemove = Object.entries(this.data.metadata)
      .filter(([_, meta]) => now - meta.timestamp > maxAge)
      .map(([id]) => id);

    for (const id of idsToRemove) {
      await this.removeDownload(id);
    }
  }

  async getStorageUsage() {
    return Object.values(this.data.metadata).reduce((acc, item) => acc + item.size, 0);
  }
}

export const offlineStorage = new OfflineStorage();
