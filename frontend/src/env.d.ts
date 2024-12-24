/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_SYNC_INTERVAL: string
  readonly VITE_MAX_DOWNLOAD_SIZE: string
  readonly VITE_STREAMING_CHUNK_SIZE: string
  readonly VITE_OFFLINE_STORAGE_LIMIT: string
  readonly VITE_APP_NAME: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
