export const config = {
  apiUrl: import.meta.env.VITE_API_URL,
  syncInterval: parseInt(import.meta.env.VITE_SYNC_INTERVAL, 10),
  maxDownloadSize: parseInt(import.meta.env.VITE_MAX_DOWNLOAD_SIZE, 10),
  streamingChunkSize: parseInt(import.meta.env.VITE_STREAMING_CHUNK_SIZE, 10),
  offlineStorageLimit: parseInt(import.meta.env.VITE_OFFLINE_STORAGE_LIMIT, 10),
  appName: import.meta.env.VITE_APP_NAME,
  deviceId: localStorage.getItem('deviceId') || 
    (() => {
      const newId = crypto.randomUUID();
      localStorage.setItem('deviceId', newId);
      return newId;
    })(),
} as const;
