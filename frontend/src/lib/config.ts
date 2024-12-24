interface Config {
  readonly apiUrl: string;
  readonly syncInterval: number;
  readonly maxDownloadSize: number;
  readonly streamingChunkSize: number;
  readonly offlineStorageLimit: number;
  readonly appName: string;
  readonly deviceId: string;
  readonly isAdmin: boolean;
}

export const config: Config = {
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  syncInterval: parseInt(import.meta.env.VITE_SYNC_INTERVAL || '300000', 10),
  maxDownloadSize: parseInt(import.meta.env.VITE_MAX_DOWNLOAD_SIZE || '104857600', 10),
  streamingChunkSize: parseInt(import.meta.env.VITE_STREAMING_CHUNK_SIZE || '1048576', 10),
  offlineStorageLimit: parseInt(import.meta.env.VITE_OFFLINE_STORAGE_LIMIT || '1073741824', 10),
  appName: import.meta.env.VITE_APP_NAME || 'Magnet Streaming App',
  deviceId: localStorage.getItem('deviceId') || 
    (() => {
      const newId = crypto.randomUUID();
      localStorage.setItem('deviceId', newId);
      return newId;
    })(),
  isAdmin: localStorage.getItem('userRole') === 'admin',
} as const;

export type { Config };
