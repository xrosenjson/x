import axios from 'axios';
import { MagnetLink, StreamInfo, MagnetLinkList } from '@/types/magnet';
import { offlineStorage } from './offline-storage';

const DEFAULT_API_URL = 'http://localhost:8000';
const DEFAULT_TIMEOUT = 30000;

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || DEFAULT_API_URL,
  timeout: Number(import.meta.env.VITE_API_TIMEOUT) || DEFAULT_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for API calls
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for API calls
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    
    // Handle 401 Unauthorized
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    
    // Handle network errors
    if (!error.response) {
      throw new Error('Network error. Please check your connection.');
    }
    
    return Promise.reject(error);
  }
);

export { api };

// Magnet-specific API endpoints
export const magnetApi = {
  parse: async (magnetUrl: string): Promise<MagnetLink> => {
    const response = await api.post<MagnetLink>('/api/v1/magnet/parse', {
      magnet_url: magnetUrl,
    });
    return response.data;
  },

  getStreamInfo: async (magnetId: number, fileIndex?: number): Promise<StreamInfo> => {
    try {
      // Try to get from offline storage first
      const offlineData = await offlineStorage.getMetadata(`stream_${magnetId}`);
      if (offlineData) {
        const streamData = await offlineStorage.getDownload(`stream_${magnetId}`);
        if (streamData) {
          return JSON.parse(new TextDecoder().decode(streamData)) as StreamInfo;
        }
      }

      // If not in offline storage, fetch from API
      const response = await api.get<StreamInfo>(`/api/v1/magnet/${magnetId}/stream`, {
        params: { file_index: fileIndex },
      });
      
      // Save to offline storage
      const streamInfo = response.data;
      await offlineStorage.addDownload(
        `stream_${magnetId}`,
        new TextEncoder().encode(JSON.stringify(streamInfo)).buffer,
        {
          filename: `stream_${magnetId}.json`,
          size: new TextEncoder().encode(JSON.stringify(streamInfo)).length,
          type: 'magnet'
        }
      );

      return streamInfo;
    } catch (error) {
      console.error('Error fetching stream info:', error);
      throw error;
    }
  },

  list: async (skip = 0, limit = 100): Promise<MagnetLinkList> => {
    try {
      // Try to get from offline storage first
      const offlineData = await offlineStorage.getMetadata('magnet_list');
      if (offlineData) {
        const listData = await offlineStorage.getDownload('magnet_list');
        if (listData) {
          const parsedData = JSON.parse(new TextDecoder().decode(listData)) as MagnetLinkList;
          return parsedData;
        }
      }

      // If not in offline storage or data is stale, fetch from API
      const response = await api.get<MagnetLinkList>('/api/v1/magnet/list', {
        params: { skip, limit },
      });
      
      // Save to offline storage
      const listData = response.data;
      await offlineStorage.addDownload(
        'magnet_list',
        new TextEncoder().encode(JSON.stringify(listData)).buffer,
        {
          filename: 'magnet_list.json',
          size: new TextEncoder().encode(JSON.stringify(listData)).length,
          type: 'magnet'
        }
      );

      return listData;
    } catch (error) {
      console.error('Error fetching magnet list:', error);
      throw error;
    }
  },

  delete: async (magnetId: number): Promise<void> => {
    try {
      await api.delete(`/api/v1/magnet/${magnetId}`);
      
      // Remove from offline storage
      await offlineStorage.removeDownload(`stream_${magnetId}`);
      
      // Update magnet list in offline storage
      const offlineData = await offlineStorage.getMetadata('magnet_list');
      if (offlineData) {
        const listData = await offlineStorage.getDownload('magnet_list');
        if (listData) {
          const parsedData = JSON.parse(new TextDecoder().decode(listData)) as MagnetLinkList;
          const updatedList: MagnetLinkList = {
            ...parsedData,
            links: parsedData.links.filter((item: MagnetLink) => item.id !== magnetId),
            total: parsedData.links.filter((item: MagnetLink) => item.id !== magnetId).length
          };
          
          await offlineStorage.addDownload(
            'magnet_list',
            new TextEncoder().encode(JSON.stringify(updatedList)).buffer,
            {
              filename: 'magnet_list.json',
              size: new TextEncoder().encode(JSON.stringify(updatedList)).length,
              type: 'magnet'
            }
          );
        }
      }
    } catch (error) {
      console.error('Error deleting magnet:', error);
      throw error;
    }
  },

  download: async (magnetId: number, fileIndex?: number): Promise<{ downloadId: string }> => {
    try {
      const response = await api.post<{ downloadId: string }>(`/api/v1/magnet/${magnetId}/download`, {
        file_index: fileIndex,
      });

      // Save download info to offline storage
      await offlineStorage.addDownload(
        `download_${response.data.downloadId}`,
        new TextEncoder().encode(JSON.stringify({ magnetId, fileIndex })).buffer,
        {
          filename: `download_${response.data.downloadId}.json`,
          size: new TextEncoder().encode(JSON.stringify({ magnetId, fileIndex })).length,
          type: 'download'
        }
      );

      return response.data;
    } catch (error) {
      console.error('Error starting download:', error);
      throw error;
    }
  },

  getDownloadStatus: async (downloadId: string): Promise<{
    status: 'queued' | 'downloading' | 'completed' | 'failed';
    progress: number;
    error?: string;
  }> => {
    const response = await api.get<{
      status: 'queued' | 'downloading' | 'completed' | 'failed';
      progress: number;
      error?: string;
    }>(`/api/v1/magnet/download/${downloadId}/status`);
    return response.data;
  },
};

// Cache management for admin API
const requestCache = new Map<string, { promise: Promise<any>; timestamp: number; }>();
const CACHE_TIME = 5 * 60 * 1000; // 5 minutes

// Admin API endpoints
export const adminApi = {
  // Cache management methods
  getCachedRequest: async <T>(cacheKey: string): Promise<T | null> => {
    const cached = requestCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_TIME) {
      return cached.promise;
    }
    return null;
  },

  setCachedRequest: <T>(cacheKey: string, promise: Promise<T>): void => {
    requestCache.set(cacheKey, {
      promise,
      timestamp: Date.now()
    });
  },

  clearCachedRequest: (cacheKey: string): void => {
    requestCache.delete(cacheKey);
  },

  getUsers: async (skip = 0, limit = 100): Promise<{
    users: Array<{
      id: number;
      email: string;
      is_active: boolean;
      created_at: string;
      last_login: string;
    }>;
    total: number;
  }> => {
    try {
      // Try to get from offline storage first
      const cacheKey = `admin_users_${skip}_${limit}`;
      const offlineData = await offlineStorage.getMetadata(cacheKey);
      
      if (offlineData && Date.now() - offlineData.timestamp < 5 * 60 * 1000) { // 5 minutes cache
        const cachedData = await offlineStorage.getDownload(cacheKey);
        if (cachedData) {
          return JSON.parse(new TextDecoder().decode(cachedData));
        }
      }

      // If not in cache or expired, fetch from API
      const response = await api.get<{
        users: Array<{
          id: number;
          email: string;
          is_active: boolean;
          created_at: string;
          last_login: string;
        }>;
        total: number;
      }>('/api/v1/admin/users', {
        params: { skip, limit },
      });

      // Cache the response
      await offlineStorage.addDownload(
        cacheKey,
        new TextEncoder().encode(JSON.stringify(response.data)).buffer,
        {
          filename: `${cacheKey}.json`,
          size: new TextEncoder().encode(JSON.stringify(response.data)).length,
          type: 'magnet',
          isAdmin: true,
          timestamp: Date.now()
        }
      );

      // Cache in memory
      const dataPromise = Promise.resolve(response.data);
      adminApi.setCachedRequest(cacheKey, dataPromise);

      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      if (!navigator.onLine) {
        const cacheKey = `admin_users_${skip}_${limit}`;
        const offlineData = await offlineStorage.getMetadata(cacheKey);
        if (offlineData) {
          const cachedData = await offlineStorage.getDownload(cacheKey);
          if (cachedData) {
            return JSON.parse(new TextDecoder().decode(cachedData));
          }
        }
      }
      throw error;
    }
  },

  updateUser: async (userId: number, data: {
    is_active?: boolean;
    role?: string;
  }): Promise<void> => {
    try {
      await api.patch(`/api/v1/admin/users/${userId}`, data);
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  },

  getUserStats: async (): Promise<{
    total_users: number;
    active_users: number;
    downloads_today: number;
    total_downloads: number;
  }> => {
    try {
      // Try to get from offline storage first
      const cacheKey = 'admin_stats';
      const offlineData = await offlineStorage.getMetadata(cacheKey);
      
      if (offlineData && Date.now() - offlineData.timestamp < 5 * 60 * 1000) { // 5 minutes cache
        const cachedData = await offlineStorage.getDownload(cacheKey);
        if (cachedData) {
          return JSON.parse(new TextDecoder().decode(cachedData));
        }
      }

      // If not in cache or expired, fetch from API
      const response = await api.get<{
        total_users: number;
        active_users: number;
        downloads_today: number;
        total_downloads: number;
      }>('/api/v1/admin/stats');

      // Cache the response
      await offlineStorage.addDownload(
        cacheKey,
        new TextEncoder().encode(JSON.stringify(response.data)).buffer,
        {
          filename: `${cacheKey}.json`,
          size: new TextEncoder().encode(JSON.stringify(response.data)).length,
          type: 'magnet',
          isAdmin: true,
          timestamp: Date.now()
        }
      );

      // Cache in memory
      adminApi.setCachedRequest(cacheKey, Promise.resolve(response.data));

      return response.data;
    } catch (error) {
      console.error('Error fetching user stats:', error);
      if (!navigator.onLine) {
        const cacheKey = 'admin_stats';
        const offlineData = await offlineStorage.getMetadata(cacheKey);
        if (offlineData) {
          const cachedData = await offlineStorage.getDownload(cacheKey);
          if (cachedData) {
            return JSON.parse(new TextDecoder().decode(cachedData));
          }
        }
      }
      throw error;
    }
  },

  getUserActivity: async (userId: number): Promise<{
    downloads: Array<{
      id: number;
      magnet_id: number;
      created_at: string;
      file_name: string;
    }>;
    total: number;
  }> => {
    try {
      // Try to get from offline storage first
      const cacheKey = `admin_user_activity_${userId}`;
      const offlineData = await offlineStorage.getMetadata(cacheKey);
      
      if (offlineData && Date.now() - offlineData.timestamp < 5 * 60 * 1000) { // 5 minutes cache
        const cachedData = await offlineStorage.getDownload(cacheKey);
        if (cachedData) {
          return JSON.parse(new TextDecoder().decode(cachedData));
        }
      }

      // If not in cache or expired, fetch from API
      const response = await api.get<{
        downloads: Array<{
          id: number;
          magnet_id: number;
          created_at: string;
          file_name: string;
        }>;
        total: number;
      }>(`/api/v1/admin/users/${userId}/activity`);

      // Cache the response
      await offlineStorage.addDownload(
        cacheKey,
        new TextEncoder().encode(JSON.stringify(response.data)).buffer,
        {
          filename: `${cacheKey}.json`,
          size: new TextEncoder().encode(JSON.stringify(response.data)).length,
          type: 'magnet',
          isAdmin: true,
          timestamp: Date.now()
        }
      );

      // Cache in memory
      adminApi.setCachedRequest(cacheKey, Promise.resolve(response.data));

      return response.data;
    } catch (error) {
      console.error('Error fetching user activity:', error);
      if (!navigator.onLine) {
        const cacheKey = `admin_user_activity_${userId}`;
        const offlineData = await offlineStorage.getMetadata(cacheKey);
        if (offlineData) {
          const cachedData = await offlineStorage.getDownload(cacheKey);
          if (cachedData) {
            return JSON.parse(new TextDecoder().decode(cachedData));
          }
        }
      }
      throw error;
    }
  },
};

// Offline storage API endpoints
export const offlineApi = {
  sync: async (): Promise<void> => {
    try {
      // Get all offline changes
      const metadata = await offlineStorage.getAllMetadata();
      const changes = Object.entries(metadata).map(([id, meta]) => ({
        id,
        type: meta.type,
        timestamp: meta.timestamp
      }));

      // Send changes to server
      await api.post('/api/v1/offline/sync', { changes });

      // Get server changes
      const response = await api.get<{
        changes: Array<{
          id: string;
          type: 'download' | 'magnet';
          data: any;
          timestamp: number;
        }>;
      }>('/api/v1/offline/changes');

      // Apply server changes to local storage
      for (const change of response.data.changes) {
        const localMeta = await offlineStorage.getMetadata(change.id);
        if (!localMeta || localMeta.timestamp < change.timestamp) {
          await offlineStorage.addDownload(
            change.id,
            new TextEncoder().encode(JSON.stringify(change.data)).buffer,
            {
              filename: `${change.id}.json`,
              size: new TextEncoder().encode(JSON.stringify(change.data)).length,
              type: change.type
            }
          );
        }
      }
    } catch (error) {
      console.error('Error during sync:', error);
      if (!navigator.onLine) {
        throw new Error('No internet connection. Changes will be synced when online.');
      }
      throw error;
    }
  },

  getOfflineContent: async (): Promise<MagnetLinkList> => {
    try {
      const metadata = await offlineStorage.getAllMetadata();
      const links: MagnetLink[] = [];

      for (const [id, meta] of Object.entries(metadata)) {
        if (meta.type === 'magnet') {
          const data = await offlineStorage.getDownload(id);
          if (data) {
            links.push(JSON.parse(new TextDecoder().decode(data)));
          }
        }
      }

      return {
        links,
        total: links.length
      };
    } catch (error) {
      console.error('Error getting offline content:', error);
      throw error;
    }
  },

  clearOldData: async (maxAge: number = 7 * 24 * 60 * 60 * 1000): Promise<void> => {
    try {
      await offlineStorage.clearOldDownloads(maxAge);
    } catch (error) {
      console.error('Error clearing old data:', error);
      throw error;
    }
  }
};
