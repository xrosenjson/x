import localforage from 'localforage';

interface CacheConfig {
  maxAge: number;
  maxSize: number;
}

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  size: number;
}

class CacheManager {
  private static instance: CacheManager;
  private cache: LocalForage;
  private config: CacheConfig = {
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    maxSize: 100 * 1024 * 1024, // 100MB
  };

  private constructor() {
    this.cache = localforage.createInstance({
      name: 'magnetApp',
      storeName: 'cache',
    });
  }

  static getInstance(): CacheManager {
    if (!CacheManager.instance) {
      CacheManager.instance = new CacheManager();
    }
    return CacheManager.instance;
  }

  async set<T>(key: string, data: T, size?: number): Promise<void> {
    const entry: CacheEntry<T> = {
      data,
      timestamp: Date.now(),
      size: size || JSON.stringify(data).length,
    };

    await this.ensureSpace(entry.size);
    await this.cache.setItem(key, entry);
  }

  async get<T>(key: string): Promise<T | null> {
    const entry = await this.cache.getItem<CacheEntry<T>>(key);
    
    if (!entry) {
      return null;
    }

    if (Date.now() - entry.timestamp > this.config.maxAge) {
      await this.cache.removeItem(key);
      return null;
    }

    return entry.data;
  }

  async remove(key: string): Promise<void> {
    await this.cache.removeItem(key);
  }

  async clear(): Promise<void> {
    await this.cache.clear();
  }

  private async ensureSpace(requiredSize: number): Promise<void> {
    let currentSize = 0;
    const entries: [string, CacheEntry<unknown>][] = [];

    await this.cache.iterate((entry: CacheEntry<unknown>, key: string) => {
      currentSize += entry.size;
      entries.push([key, entry]);
    });

    if (currentSize + requiredSize > this.config.maxSize) {
      // Sort by timestamp (oldest first)
      entries.sort((a, b) => a[1].timestamp - b[1].timestamp);

      // Remove oldest entries until we have enough space
      for (const [key] of entries) {
        await this.cache.removeItem(key);
        currentSize -= entries[0][1].size;
        if (currentSize + requiredSize <= this.config.maxSize) {
          break;
        }
      }
    }
  }

  setConfig(config: Partial<CacheConfig>): void {
    this.config = { ...this.config, ...config };
  }
}

export const cacheManager = CacheManager.getInstance();
